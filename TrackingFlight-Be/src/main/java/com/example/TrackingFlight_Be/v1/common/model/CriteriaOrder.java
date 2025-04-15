package com.teca.application.common.model;

import com.teca.application.common.enums.OrderDirection;

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
