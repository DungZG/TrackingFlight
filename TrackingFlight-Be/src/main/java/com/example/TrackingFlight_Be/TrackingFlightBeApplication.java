package com.example.TrackingFlight_Be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication(scanBasePackages = {"com.example.TrackingFlight_Be.v1"})
public class TrackingFlightBeApplication {

	public static void main(String[] args) {

		SpringApplication.run(TrackingFlightBeApplication.class, args);
	}

}
