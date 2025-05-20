package com.example.TrackingFlight_Be.v1.services;


import com.example.TrackingFlight_Be.v1.dto.request.FlightCreationRequest;
import com.example.TrackingFlight_Be.v1.repositories.SeatsRepository;
import com.example.TrackingFlight_Be.v1.entity.*;
import com.example.TrackingFlight_Be.v1.repositories.AircraftRepository;
import com.example.TrackingFlight_Be.v1.repositories.AirlineRepository;
import com.example.TrackingFlight_Be.v1.repositories.FlightRepository;
import com.example.TrackingFlight_Be.v1.repositories.TicketRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FlightService {
   private final FlightRepository flightRepository;
   private final AirlineRepository airlineRepository;
   private final AircraftRepository aircraftRepository;
   private final SeatsRepository seatsRepository;
   private final TicketRepository ticketRepository;

   public Flight createFlight(FlightCreationRequest request) {
      // Nếu chuyến này thuộc chuyến khứ hồi mà chưa có groupId thì tạo mới
      if (Boolean.TRUE.equals(request.getIsReturnFlight()) || (request.getTypeFlight() != null && request.getTypeFlight() == 2L)) {
         if (request.getGroupId() == null) {
            request.setGroupId(Math.abs(UUID.randomUUID().getMostSignificantBits()));
         }
      }

      // Tiếp tục tạo flight như bình thường
      Airline airline = airlineRepository.findById(request.getAirlineId())
              .orElseThrow(() -> new RuntimeException("Airline not found"));

      Aircraft aircraft = aircraftRepository.findById(request.getAircraftId())
              .orElseThrow(() -> new RuntimeException("Aircraft not found"));

      Flight flight = new Flight();
      flight.setAirline(airline);
      flight.setAircraft(aircraft);
      flight.setFlightNumber(request.getFlightNumber());
      flight.setDepartureLocation(request.getDepartureLocation());
      flight.setArrivalLocation(request.getArrivalLocation());
      flight.setDepartureTime(request.getDepartureTime());
      flight.setArrivalTime(request.getArrivalTime());
      flight.setPrice(request.getPrice());
      flight.setStatus(1L);
      flight.setTypeFlight(request.getTypeFlight());
      flight.setIsReturnFlight(request.getIsReturnFlight() != null ? request.getIsReturnFlight() : false);
      flight.setGroupId(request.getGroupId());

      return flightRepository.save(flight);
   }

   public List<Flight> createRoundTripFlight(FlightCreationRequest outboundRequest,
                                             FlightCreationRequest returnRequest) {
      Long groupId = Math.abs(UUID.randomUUID().getMostSignificantBits());
      outboundRequest.setIsReturnFlight(false);
      outboundRequest.setGroupId(groupId);

      returnRequest.setIsReturnFlight(true);
      returnRequest.setGroupId(groupId);

      List<Flight> result = new ArrayList<>();
      result.add(createFlight(outboundRequest));
      result.add(createFlight(returnRequest));
      return result;
   }



   public Flight getFlight(Long id) {
      return flightRepository.findById(id)
              .orElseThrow(() -> new RuntimeException("Flight not found"));
   }

   public Page<Flight> getAllFlights(Pageable pageable) {
      return flightRepository.findAll(pageable);
   }

   public Flight updateFlight(Long id, FlightCreationRequest request) {
      Flight flight = getFlight(id);

      Airline airline = airlineRepository.findById(request.getAirlineId())
              .orElseThrow(() -> new RuntimeException("Airline not found"));

      flight.setAirline(airline);
      flight.setFlightNumber(request.getFlightNumber());
      flight.setDepartureLocation(request.getDepartureLocation());
      flight.setArrivalLocation(request.getArrivalLocation());
      flight.setDepartureTime(request.getDepartureTime());
      flight.setArrivalTime(request.getArrivalTime());
      flight.setPrice(request.getPrice());

      if (request.getStatus() != null) {
         flight.setStatus(request.getStatus());
         if (request.getStatus() == 2L) {
            List<Ticket> tickets = ticketRepository.findByFlight(flight);
            tickets.forEach(ticket -> ticket.setStatus("INACTIVE"));
            ticketRepository.saveAll(tickets);
         }
      }

      return flightRepository.save(flight);
   }

   public void deleteFlight(Long id) {
      Flight flight = getFlight(id);
      ticketRepository.deleteAll(ticketRepository.findByFlight(flight));
      flightRepository.delete(flight);
   }

   public Page<Flight> searchFlights(Long departureLocation, Long arrivalLocation,
                                     OffsetDateTime departureTime, OffsetDateTime returnTime, boolean isRoundTrip,
                                     Pageable pageable) {
      OffsetDateTime departureStart = departureTime.minusHours(3);
      OffsetDateTime departureEnd = departureTime.plusHours(3);

      if (isRoundTrip) {
         OffsetDateTime returnStart = returnTime.minusHours(3);
         OffsetDateTime returnEnd = returnTime.plusHours(3);

         Page<Flight> outboundFlights = flightRepository
                 .findByDepartureLocationAndArrivalLocationAndDepartureTimeBetweenAndIsReturnFlight(
                         departureLocation, arrivalLocation, departureStart, departureEnd, false, pageable);

         Page<Flight> returnFlights = flightRepository
                 .findByDepartureLocationAndArrivalLocationAndDepartureTimeBetweenAndIsReturnFlight(
                         arrivalLocation, departureLocation, returnStart, returnEnd, true, pageable);

         return outboundFlights;
      } else {
         return flightRepository
                 .findByDepartureLocationAndArrivalLocationAndDepartureTimeBetweenAndIsReturnFlight(
                         departureLocation, arrivalLocation, departureStart, departureEnd, false, pageable);
      }
   }

}
