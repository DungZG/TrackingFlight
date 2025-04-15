package com.teca.application.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OrderDirection {

    ASC("asc"),
    DESC("desc"),
    ;

    private final String value;

    public static OrderDirection fromValue(String value) {
        var result = OrderDirection.ASC;
        if ("desc".equals(value)) {
            result = OrderDirection.DESC;
        }
        return result;
    }

}
