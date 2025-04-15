package com.teca.application.common.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaginatedDTO<T> extends ListItemDTO<T> {

    private PaginatedMeta meta;

}
