package com.teca.domain.common;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;

import com.teca.application.common.utilities.DateUtil;
import com.teca.application.common.utilities.StringUtil;

import lombok.Getter;
import lombok.Setter;

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