import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit,
  QueryList,
  ViewChildren,
} from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

interface Destination {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  airportCode?: string // Sân bay gợi ý
  airportName?: string // Tên sân bay gợi ý
}
@Component({
  selector: 'app-location',
  standalone: false,
  
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  formGroup!: FormGroup;
  flightBookingForm: FormGroup;
  currentYear = new Date().getFullYear();
  @ViewChildren("destinationCard") destinationCards!: QueryList<ElementRef>
  @ViewChildren("whyBookCard") whyBookCards!: QueryList<ElementRef>
  featuredDestinations: Destination[] = [
    {
      id: "ha-long-bay",
      name: "Vịnh Hạ Long",
      tagline: "Kỳ quan thiên nhiên thế giới",
      description: "Khám phá hàng ngàn đảo đá vôi hùng vĩ và làn nước xanh ngọc bích.",
      image: "assets/images/quynhon.webp",
      airportCode: "VDO",
      airportName: "Vân Đồn (VDO)",
    },
    {
      id: "ha-noi",
      name: "Hà Nội",
      tagline: "Thủ đô ngàn năm văn hiến",
      description: "Trải nghiệm sự cổ kính của phố cổ, ẩm thực đường phố đặc sắc và các di tích lịch sử.",
      image: "assets/images/hanoi.jpg",
      airportCode: "HAN",
      airportName: "Nội Bài (HAN)",
    },
    {
      id: "ho-chi-minh-city",
      name: "TP. Hồ Chí Minh",
      tagline: "Thành phố năng động và hiện đại",
      description: "Khám phá nhịp sống sôi động, các công trình kiến trúc Pháp và những khu chợ sầm uất.",
      image: "assets/images/hcm.webp",
      airportCode: "SGN",
      airportName: "Tân Sơn Nhất (SGN)",
    },
    {
      id: "nha-trang",
      name: "Nha Trang",
      tagline: "Thiên đường biển nhiệt đới",
      description: "Tận hưởng những bãi biển cát trắng, làn nước trong xanh và các hoạt động vui chơi dưới nước.",
      image: "assets/images/nhatrang.webp",
      airportCode: "CXR",
      airportName: "Cam Ranh (CXR)",
    },
  ]

  whyBookWithUs = [
    {
      title: "Giá Tốt Nhất",
      description: "Luôn cập nhật giá vé ưu đãi từ các hãng hàng không.",
      iconPlaceholder: "🎟️",
    },
    {
      title: "Đặt Vé Dễ Dàng",
      description: "Giao diện thân thiện, quy trình đặt vé đơn giản chỉ trong vài phút.",
      iconPlaceholder: "🔍",
    },
    {
      title: "Hỗ Trợ 24/7",
      description: "Đội ngũ hỗ trợ chuyên nghiệp sẵn sàng giúp đỡ bạn mọi lúc.",
      iconPlaceholder: "👥",
    },
  ]
  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
     private el: ElementRef,
  ){
    this.flightBookingForm = this.fb.group({
      origin: ["", Validators.required],
      destination: [{ value: "Vân Đồn (VDO)", disabled: false }, Validators.required], // Can be enabled if needed
      departureDate: ["", Validators.required],
      returnDate: [""],
      passengers: ["1", Validators.required],
    })
  }
  ngAfterViewInit(): void {
    // Áp dụng animation cho các card khi view đã khởi tạo
    this.applyStaggeredAnimation(this.destinationCards, 100)
    this.applyStaggeredAnimation(this.whyBookCards, 100)
  }

  private applyStaggeredAnimation(elements: QueryList<ElementRef>, delayIncrement: number) {
    elements.forEach((elRef, index) => {
      const cardElement = elRef.nativeElement
      // Đảm bảo card ẩn ban đầu để animation có hiệu lực
      this.renderer.setStyle(cardElement, "opacity", "0")
      setTimeout(() => {
        this.renderer.addClass(cardElement, "animate-fade-in-up")
        // Xóa opacity sau khi animation bắt đầu để nó không ghi đè keyframes
        this.renderer.removeStyle(cardElement, "opacity")
      }, index * delayIncrement)
    })
  }

  onFlightSearch() {
    if (this.flightBookingForm.valid) {
      console.log("Searching for flights:", this.flightBookingForm.getRawValue())
    } else {
      console.log("Form is invalid")
      this.flightBookingForm.markAllAsTouched()
    }
  }

  selectDestinationAndFocusForm(destination: Destination) {
    this.flightBookingForm.patchValue({
      destination: destination.airportName || destination.name,
    })
    const originInput = this.el.nativeElement.querySelector("#origin")
    if (originInput) {
      originInput.focus()
    }
  }
}
