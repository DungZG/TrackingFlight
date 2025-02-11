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
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long staffCode;

    String staffName;
    String staffEmail;
    String staffPhoneNumber;
    String staffPassword;
    String staffAddress;
    String staffIdentity;

    @Lob
    byte[] staffPicture;

    Long staffRole;
    Long staffFacility;
    Long staffGender;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Staff staff = (Staff) o;
        return getStaffCode() != null && Objects.equals(getStaffCode(), staff.getStaffCode());
    }
}
