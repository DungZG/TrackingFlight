import { Component, OnInit, Input, EventEmitter, Output,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, firstValueFrom } from 'rxjs';
import { AircraftService } from '../../../../services/aircraft.service';
import { FlightService } from '../../../../services/flight.service';
import { LocationService } from '../../../../services/location.service';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-flightdetail',
  standalone: false,
  templateUrl: './flightdetail.component.html',
  styleUrls: ['./flightdetail.component.css']
})
export class FlightdetailComponent implements OnInit {
  @Input() items: { label: string; value: any }[] = [];
  @Input() itemsAircraft: { label: string; value: any }[] = [];
  @Input() mode: string = '';
  @Input() item: any;

  @Output() onClose = new EventEmitter<any | null>();

  validateForm: FormGroup;
  isRoundTrip: boolean = false;
  listType = [
    { label: 'Khứ Hồi', value: 2 },
    { label: 'Một Chiều', value: 1 },
  ];
  status = [
    { label: 'Đang hoạt động', value: 1 },
    { label: 'Tạm Ngưng', value: 2 },
  ];

  selectedCavities: any[] = [];
  listAircraft: any[] = [];
  listLocation: any[] = [];
  isLoading = false;
  outboundFlight: any = null;  // chuyến đi
  returnFlight: any = null;    // chuyến về
  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private aircraftService: AircraftService,
    private flightService: FlightService,
    @Inject(NZ_MODAL_DATA) public data: any,
  ) {
    this.validateForm = this.fb.group({
      aircraftId: [null],
      departureLocation: [null],
      arrivalLocation: [null],
      typeFlight: [null],
      dateRangeStart: [null],        // Khoảng ngày giờ đi (mảng 2 phần tử)
      dateRangeReturn: [{ value: null, disabled: true }],  // Khoảng ngày giờ về (mảng 2 phần tử)
      status: [null],
      price: [null],
    });
  }

  ngOnInit(): void {
    this.loadData();
    console.log('this.data.item:', this.data.item);
    if ((this.data.mode === 'view' || this.data.mode === 'edit') && this.data.item) {
      if (this.data.item) {
        this.outboundFlight = this.data.item;
        this.patchForm(this.outboundFlight);
      
        if (this.outboundFlight.groupId) {
          this.loadReturnFlight(this.outboundFlight.groupId);
        }
      }
      if (this.data.mode === 'view') {
        this.validateForm.disable();
      } else if (this.mode === 'edit') {
        this.validateForm.enable();
      }
    }
  
    this.validateForm.get('typeFlight')?.valueChanges.subscribe(value => {
      this.isRoundTrip = value === 2;
      const dateRangeReturn = this.validateForm.get('dateRangeReturn');
      if (this.isRoundTrip) {
        dateRangeReturn?.enable();
      } else {
        dateRangeReturn?.reset();
        dateRangeReturn?.disable();
      }
    });
  
    this.validateForm.get('price')?.valueChanges.subscribe(() => {
      const aircraftId = this.validateForm.get('aircraftId')?.value;
      if (aircraftId) {
        this.onAircraftChange(aircraftId);
      }
    });
  }

  async loadReturnFlight(groupId: number) {
    this.returnFlight = await this.flightService.getReturnFlightByGroupId(groupId).toPromise();
  }

   // patchForm như cũ (chỉ đổ dữ liệu chuyến đi)
   patchForm(item: any) {
    this.validateForm.patchValue({
      aircraftId: item.aircraft?.aircraftId || null,
      departureLocation: item.departureLocation || null,
      arrivalLocation: item.arrivalLocation || null,
      typeFlight: item.typeFlight || null,
      status: item.status || null,
      price: item.price || null,
      dateRangeStart: item.departureTime && item.arrivalTime ? [new Date(item.departureTime), new Date(item.arrivalTime)] : null,
      dateRangeReturn: item.isReturnFlight && item.rtdepartureTime && item.rtarrivalTime
        ? [new Date(item.rtdepartureTime), new Date(item.rtarrivalTime)]
        : null,
    });

    this.isRoundTrip = item.typeFlight === 2;
    if (this.isRoundTrip) {
      this.validateForm.get('dateRangeReturn')?.enable();
    } else {
      this.validateForm.get('dateRangeReturn')?.disable();
    }

    if (item.aircraft?.aircraftId) {
      this.onAircraftChange(item.aircraft.aircraftId);
    }
  }

  async loadData() {
    this.isLoading = true;
    const [locations, aircrafts] = await firstValueFrom(forkJoin([
      this.locationService.getAllItems(),
      this.aircraftService.getAllItems()
    ]));

    this.listLocation = locations;
    this.listAircraft = aircrafts.result || [];

    this.items = this.listLocation.map(item => ({ label: item.name, value: item.locationId }));
    this.itemsAircraft = this.listAircraft.map(item => ({
      label: `${item.aircraftName} - ${item.aircraftCode} - ${item.airline.name}`,
      value: item.aircraftId
    }));

    this.isLoading = false;
  }

  onChangeDateStart(dates: Date[]): void {
    if (dates && dates.length === 2) {
      // dates[0]: ngày giờ đi bắt đầu
      // dates[1]: ngày giờ đi kết thúc
      console.log('Khoảng ngày giờ đi:', dates);
    }
  }

  onChangeDateReturn(dates: Date[]): void {
    if (dates && dates.length === 2) {
      // dates[0]: ngày giờ về bắt đầu
      // dates[1]: ngày giờ về kết thúc
      console.log('Khoảng ngày giờ về:', dates);
    }
  }

  onAircraftChange(aircraftId: number): void {
    const aircraft = this.listAircraft.find(a => a.aircraftId === aircraftId);
    const flightCost = Number(this.validateForm.get('price')?.value || 0);

    if (aircraft && aircraft.cavityList) {
      this.selectedCavities = aircraft.cavityList.map((cavity: any) => {
        const cavityPrice = Number(cavity.price || 0);
        return {
          ...cavity,
          seatCount: cavity.carvityFrom - cavity.carvityTo + 1,
          calculatedPrice: cavityPrice + flightCost
        };
      });
    } else {
      this.selectedCavities = [];
    }
  }

  onCostChange(): void {
    const flightCost = Number(this.validateForm.value.price || 0);
    this.selectedCavities = this.selectedCavities.map(cavity => ({
      ...cavity,
      calculatedPrice: cavity.price + flightCost
    }));
  }

  async onSubmit() {
    if (this.validateForm.invalid) {
      return;
    }
    const aircraftId = this.validateForm.value.aircraftId;
    const selectedAircraft = this.listAircraft.find(a => a.aircraftId === aircraftId);
    if (!selectedAircraft) {
      alert('Vui lòng chọn máy bay');
      return;
    }

    const typeFlight = this.validateForm.value.typeFlight;
    const isRoundTrip = typeFlight === 2;

    // Lấy khoảng ngày giờ đi dạng [start, end]
    const dateRangeStart = this.validateForm.value.dateRangeStart;
    if (!dateRangeStart || dateRangeStart.length !== 2) {
      alert('Vui lòng nhập khoảng thời gian đi');
      return;
    }

    // Tạo payload cho chuyến đi
    const outboundPayload = {
      airlineId: selectedAircraft.airline.airlineId,
      aircraftId: aircraftId,
      departureLocation: this.validateForm.value.departureLocation,
      arrivalLocation: this.validateForm.value.arrivalLocation,
      departureTime: dateRangeStart[0],
      arrivalTime: dateRangeStart[1],
      price: this.validateForm.value.price,
      typeFlight: typeFlight,
      status: 1,
      isReturnFlight: false
    };

    if (isRoundTrip) {
      // Lấy khoảng ngày giờ về
      const dateRangeReturn = this.validateForm.value.dateRangeReturn;
      if (!dateRangeReturn || dateRangeReturn.length !== 2) {
        alert('Vui lòng nhập khoảng thời gian về cho chuyến khứ hồi');
        return;
      }

      const returnPayload = {
        airlineId: selectedAircraft.airline.airlineId,
        aircraftId: aircraftId,
        departureLocation: this.validateForm.value.arrivalLocation,
        arrivalLocation: this.validateForm.value.departureLocation,
        departureTime: dateRangeReturn[0],
        arrivalTime: dateRangeReturn[1],
        price: this.validateForm.value.price,
        typeFlight: typeFlight,
        status: 1,
        isReturnFlight: true
      };

      this.isLoading = true;
      await this.flightService.createRoundTripFlight(outboundPayload, returnPayload).toPromise();
      this.isLoading = false;
      this.onClose.emit();
    } else {
      this.isLoading = true;
      await this.flightService.createFlight(outboundPayload).toPromise();
      this.isLoading = false;
      this.onClose.emit();
    }
  }

  async closeDialog() {
    this.onClose.emit(null);
  }
}
