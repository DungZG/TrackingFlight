package com.example.TrackingFlight_Be.v1.domain.comon;

import com.example.TrackingFlight_Be.v1.common.utilities.DateUtil;
import com.example.TrackingFlight_Be.v1.common.utilities.StringUtil;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;

@Getter
@Setter
@MappedSuperclass
public class BaseEntity {
    @Id
    @Column(length = 32)
    private String id;

    @Column(nullable = false, updatable = false)
    private Long createdAt;

    @PrePersist
    public void prePersist() {
        if (StringUtil.isNullOrEmpty(id)) {
            id = StringUtil.uuid();
        }
        createdAt = DateUtil.now();
    }
}