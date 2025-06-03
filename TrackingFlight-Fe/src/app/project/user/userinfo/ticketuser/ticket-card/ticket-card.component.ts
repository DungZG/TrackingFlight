import { Component, Input, OnInit } from '@angular/core';
import { Ticket, TicketStatus } from '../../ticket.model';
import { DatePipe } from '@angular/common';

interface StatusDisplay {
  text: string;
  type: 'success' | 'processing' | 'default' | 'error' | 'warning'; // nz-badge types
}

@Component({
  selector: 'app-ticket-card',
  standalone:false,
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent implements OnInit {
  @Input() ticket!: Ticket;

  statusDisplayMap: Record<TicketStatus, StatusDisplay> = {
    active: { text: 'Đang hoạt động', type: 'success' },
    upcoming: { text: 'Sắp diễn ra', type: 'processing' },
    used: { text: 'Đã sử dụng', type: 'default' },
    expired: { text: 'Đã hết hạn', type: 'warning' },
    cancelled: { text: 'Đã hủy', type: 'error' },
  };
  currentStatusDisplay: StatusDisplay | undefined;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    if (this.ticket && this.ticket.status) {
      this.currentStatusDisplay = this.statusDisplayMap[this.ticket.status];
    }
  }

  formatDate(dateInput: string | Date | undefined, format: string = 'dd/MM/yyyy'): string | null {
    if (!dateInput) return 'N/A';
    try {
      return this.datePipe.transform(dateInput, format, undefined, 'vi');
    } catch (e) {
      return dateInput.toString(); // fallback
    }
  }

  formatTime(dateInput: string | Date | undefined): string {
     if (!dateInput) return '';
     try {
       const date = new Date(dateInput);
       if (!isNaN(date.getTime())) {
         return this.datePipe.transform(date, 'HH:mm', undefined, 'vi') || '';
       }
       const parts = dateInput.toString().split(':');
       if (parts.length >= 2) {
         return `${parts[0]}:${parts[1]}`;
       }
     } catch (e) { /* ignore */ }
     return dateInput.toString();
  }
}