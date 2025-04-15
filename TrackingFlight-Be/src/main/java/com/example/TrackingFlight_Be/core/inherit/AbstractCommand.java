package com.teca.core.inherit;

import com.google.gson.Gson;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public abstract class AbstractCommand {

    @Autowired
    @Qualifier("skipNull")
    protected ModelMapper skipNullMapper;

    @Autowired
    @Qualifier("nonSkipNull")
    protected ModelMapper nonSkipNullMapper;

    @Autowired
    protected Gson gson;
}
