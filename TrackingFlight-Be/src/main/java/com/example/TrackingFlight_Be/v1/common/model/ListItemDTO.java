package com.teca.application.common.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListItemDTO<T> {

    private List<T> items = new ArrayList<>();

}
