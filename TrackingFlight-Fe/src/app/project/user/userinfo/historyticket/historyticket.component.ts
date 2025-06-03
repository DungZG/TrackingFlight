import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket.model'; // Adjust path as needed

@Component({
  selector: 'app-historyticket',
  standalone:false,
  templateUrl: './historyticket.component.html',
  styleUrls: ['./historyticket.component.css']
})
export class HistoryticketComponent implements OnInit {
  ticketHistory: Ticket[] = [];

  constructor() { }

  ngOnInit(): void {
    // Dữ liệu mẫu - Thay thế bằng API call thực tế
    this.ticketHistory = [
      {
        id: "hist001",
        category: "flight",
        title: "Chuyến bay đến Phú Quốc",
        date: "2024-03-10",
        price: 1200000,
        currency: "VND",
        qrCodeUrl: "../../../asset/hanoi.jpg",
        bookingReference: "PQFLIGHT0324",
        status: "used",
        purchaseDate: "2024-02-20",
        flightDetails: {
          fromCity: "TP. Hồ Chí Minh",
          toCity: "Phú Quốc",
          airline: "Vietjet Air",
          flightNumber: "VJ456",
          departureTime: "2024-03-10T09:00:00Z",
          arrivalTime: "2024-03-10T10:00:00Z",
          departureAirportCode: "SGN",
          arrivalAirportCode: "PQC",
          seat: "15B",
          class: "Phổ thông",
        },
      },
      {
        id: "hist002",
        category: "event",
        title: "Hội sách mùa xuân",
        date: "2024-04-05",
        time: "14:00",
        location: "Nhà văn hóa Thanh Niên, TP HCM",
        price: 50000,
        currency: "VND",
        qrCodeUrl: "../../../asset/hanoi.jpg",
        bookingReference: "BOOKFAIR04",
        status: "expired",
        purchaseDate: "2024-03-25",
        organizer: "NXB Trẻ",
      },
    ];
  }
}