import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket.model'; // Adjust path as needed

@Component({
  selector: 'app-ticketuser',
  standalone: false,
  templateUrl: './ticketuser.component.html',
  styleUrls: ['./ticketuser.component.css']
})
export class TicketuserComponent implements OnInit {
  purchasedTickets: Ticket[] = [];

  constructor() { }

  ngOnInit(): void {
    // Dữ liệu mẫu - Thay thế bằng API call thực tế
    this.purchasedTickets = [
      {
        id: "ticket001",
        category: "flight",
        title: "Chuyến bay đến Đà Nẵng",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        price: 1500000,
        currency: "VND",
        qrCodeUrl: "../../../asset/hanoi.jpg",
        bookingReference: "VNFLIGHT001",
        status: "upcoming",
        purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        flightDetails: {
          fromCity: "Hà Nội",
          toCity: "Đà Nẵng",
          airline: "Vietnam Airlines",
          flightNumber: "VN123",
          departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000), // 8 AM
          arrivalTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 9.5 * 60 * 60 * 1000), // 9:30 AM
          departureAirportCode: "HAN",
          arrivalAirportCode: "DAD",
          gate: "A5",
          seat: "22A",
          class: "Phổ thông",
        },
      },
      {
        id: "ticket002",
        category: "event",
        title: "Đại nhạc hội Mùa Hè",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 19 * 60 * 60 * 1000).toISOString(), // 7 PM
        location: "Sân vận động Mỹ Đình, Hà Nội",
        price: 750000,
        currency: "VND",
        qrCodeUrl: "../../../asset/hanoi.jpg",
        bookingReference: "EVENTXYZ789",
        status: "upcoming",
        purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        organizer: "Summer Fest Group",
      },
    ];
  }
}