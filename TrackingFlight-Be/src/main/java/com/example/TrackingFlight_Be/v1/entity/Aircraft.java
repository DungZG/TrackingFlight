package com.example.TrackingFlight_Be.v1.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Aircraft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long aircraftId;

    String aircraftCode;
    String aircraftName;
    String aircraftType;
    String airline;

    Long seatBusiness;
    Long seatEconomy;
    Long seatPremiumEconomy;
    Long quantity;

    @Lob
    byte[] aircraftPicture;

    String ghichu;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Aircraft aircraft = (Aircraft) o;
        return getAircraftId() != null && Objects.equals(getAircraftId(), aircraft.getAircraftId());
    }
}
