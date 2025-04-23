package com.example.TrackingFlight_Be.v1.entity;

import com.example.TrackingFlight_Be.auth.common.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;

    private String ticketType;
    private String seatNumber;
    private String status;

    @Column(name = "booking_time")
    private LocalDateTime bookingTime;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    private String ticketClass;
    private Float price;

    @ManyToOne
    @JoinColumn(name = "discount_id")
    private Discount discount;


}
