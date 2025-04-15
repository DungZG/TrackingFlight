package com.teca.application.common.model;

import com.teca.application.common.enums.CriteriaOperator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CriteriaFilter {

    private String key;

    private CriteriaOperator operator;

    private Object value;

    public CriteriaFilter(CriteriaOperator operator, Object value) {
        this.operator = operator;
        this.value = value;
    }

    public CriteriaFilter(String key, Object value) {
        this.key = key;
        this.value = value;
        operator = value == null ? CriteriaOperator.IS_NULL : CriteriaOperator.EQUAL;
    }

}
