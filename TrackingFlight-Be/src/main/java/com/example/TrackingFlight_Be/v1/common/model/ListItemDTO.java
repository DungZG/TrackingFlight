package com.example.TrackingFlight_Be.v1.common.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ListItemDTO<T> {

    private List<T> items = new ArrayList<>();

}
