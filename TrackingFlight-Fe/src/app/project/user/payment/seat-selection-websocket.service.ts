import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

export interface SeatSelectionMessage {
  flightId: number;
  seatNumber: string;
  action: 'select' | 'book' | 'release';
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})

export class SeatSelectionWebsocketService {
  private client: Client;
  private seatUpdates$ = new Subject<SeatSelectionMessage>();
  private flightId: number | null = null;

  connect(flightId: number) {
    this.flightId = flightId;
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-seat',undefined, { withCredentials: true }),
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
    });

    this.client.onConnect = () => {
      this.client.subscribe(`/topic/seats/${flightId}`, (message: IMessage) => {
        const seatMsg: SeatSelectionMessage = JSON.parse(message.body);
        this.seatUpdates$.next(seatMsg);
      });
    };

    this.client.activate();
  }

  disconnect() {
    if (this.client) this.client.deactivate();
  }

  getSeatUpdates(): Observable<SeatSelectionMessage> {
    return this.seatUpdates$.asObservable();
  }

  sendSeatAction(message: SeatSelectionMessage) {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: '/app/seat/select',
        body: JSON.stringify(message)
      });
    }
  }
}