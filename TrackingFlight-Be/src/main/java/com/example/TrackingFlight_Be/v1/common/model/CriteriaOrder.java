package com.example.TrackingFlight_Be.v1.common.model;

import com.example.TrackingFlight_Be.v1.common.enums.OrderDirection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CriteriaOrder {

    private String key;

    private OrderDirection direction;

    public CriteriaOrder(String key) {
        this.key = key;
        direction = OrderDirection.DESC;
    }

}
