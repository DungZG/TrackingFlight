package com.example.TrackingFlight_Be.v1.common.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaginatedMeta {

    private Integer page;

    private Integer size;

    private Long total;

    private Boolean hasNextPage;

    public PaginatedMeta(Integer page, Integer size, Long total) {
        this.page = page;
        this.size = size;
        this.total = total;
        hasNextPage = null;
    }

}
