package com.example.TrackingFlight_Be.core.inherit;

import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public abstract class AbstractCommand {

    @Autowired
    @Qualifier("skipNull")
    protected Mapper skipNullMapper;

    @Autowired
    @Qualifier("nonSkipNull")
    protected Mapper nonSkipNullMapper;

}
