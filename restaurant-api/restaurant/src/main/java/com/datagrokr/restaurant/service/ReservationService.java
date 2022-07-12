package com.datagrokr.restaurant.service;

import java.time.LocalDate;
//import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.datagrokr.restaurant.entity.Reservation;
import com.datagrokr.restaurant.repository.ReservationRepository;

import jakarta.ws.rs.core.Response;

public class ReservationService {
	private final ReservationRepository reservationRepo;
	
	public ReservationService() {
		reservationRepo = new ReservationRepository();
	}
	
	public List<Reservation> getAllReservations(){
		return reservationRepo.findAll();
	}
	
	public String getNoOfReservations() {
		return reservationRepo.noOfReservations();
	}
	
	public String getNoOfTwoSeatsReservations(){
        return reservationRepo.noOfTwoSeatReservations();
    }
    
    public String getNoOfFourSeatsReservation(){
        return reservationRepo.noOfFourSeatReservations();
    }
    
    public Reservation getReservation(Integer reservationId) {
    	return reservationRepo.findByReservationId(reservationId);
    }
    
    public Response addReservation(Reservation reservation){
//        if(LocalDateTime.now().getHour() > 20){
//            return Response.serverError().entity("You can't book after 8 PM!").build();
//        }
        if(reservationRepo.noOfReservations().equals("10")){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Sorry! We are fully booked").build();
        } else if(reservation.getSeats() == 2 && reservationRepo.noOfTwoSeatReservations().equals("5")){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Sorry! No table for two available tonight!").build();
        } else if(reservation.getSeats() == 4 && reservationRepo.noOfFourSeatReservations().equals("5")){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Sorry! No table for four available tonight!").build();
        } else if(reservation.getSeats() != 0 && reservation.getSeats() != 2 && reservation.getSeats() != 4){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("You can book the table for 2 people or 4 people only").build();
//        } else if(!reservation.getTimeOfReservation().toLocalDate().isEqual(LocalDate.now()) || reservation.getTimeOfReservation().toLocalTime().isBefore(LocalTime.now())){
//            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Bookings allowed for current day only!").build();
        } else {
            Reservation createdReservation = reservationRepo.addReservation(reservation);
            if(createdReservation == null) return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Something went wrong while creating reservation!").build();
            else return Response.status(Response.Status.ACCEPTED).entity(createdReservation).build();
        }
    }
    
    public Response updateReservation(Reservation reservation) {
    	
    	   if(reservationRepo.noOfReservations().equals("10")){
               return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Sorry! We are fully booked").build();
           }
           else if(reservation.getSeats() == 2 && reservationRepo.noOfTwoSeatReservations().equals("5")){
               return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Sorry! No table for two available tonight!").build();
           } else if(reservation.getSeats() == 4 && reservationRepo.noOfFourSeatReservations().equals("5")){
               return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Sorry! No table for four available tonight!").build();
           } else if(reservation.getSeats() != 2 && reservation.getSeats() != 4){
               return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("You can book the table for 2 people or 4 people only").build();
//           } else if(!reservation.getTimeOfReservation().toLocalDate().isEqual(LocalDate.now()) || reservation.getTimeOfReservation().toLocalTime().isBefore(LocalTime.now())){
//               return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Bookings allowed for current day only!").build();
           } else {
               Reservation updatedReservation = reservationRepo.updateReservation(reservation);
               if(updatedReservation == null) return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Something went wrong while creating reservation!").build();
               else return Response.status(Response.Status.ACCEPTED).entity(updatedReservation).build();
           }	
    }
    
    public Response removeReservation(String mobile) {
    	reservationRepo.deleteByMobile(mobile);
    	return Response.status(Response.Status.OK)
    			.entity("All bookings from "+ mobile +" removed!")
    			.build();
    }

}
