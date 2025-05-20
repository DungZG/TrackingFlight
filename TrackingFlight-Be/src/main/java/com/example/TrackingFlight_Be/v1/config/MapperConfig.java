package com.example.TrackingFlight_Be.v1.config;

import com.example.TrackingFlight_Be.v1.mapper.FlightMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig{
    @Bean
    public FlightMapper flightMapper() {
        return Mappers.getMapper(FlightMapper.class);
    }
}
