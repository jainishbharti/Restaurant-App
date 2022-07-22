package com.datagrokr.restaurant.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.datagrokr.restaurant.entity.Reservation;
import com.datagrokr.restaurant.entity.ReservationTable;
import com.datagrokr.restaurant.repository.ReservationRepository;
import com.datagrokr.restaurant.repository.ReservationTableRepository;

import jakarta.ws.rs.core.Response;

public class ReservationService {
	private final ReservationRepository reservationRepo;
	private final ReservationTableRepository reservationTableRepo;
	
	public ReservationService() {
		reservationRepo = new ReservationRepository();
		reservationTableRepo = new ReservationTableRepository();
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
        if(LocalDateTime.now().getHour() > 20){
            return Response.serverError().entity("You can't book after 8 PM!").build();
        }
        
        if(reservation.getSeats() != 0 && reservation.getSeats() < 2) reservation.setSeats(2);
        if(reservation.getSeats() > 2 && reservation.getSeats() < 4) reservation.setSeats(4);

        if(reservationRepo.noOfReservations().equals("10")){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Sorry! We are fully booked").build();
        } else if(!reservation.getTimeOfReservation().toLocalDate().isEqual(LocalDate.now()) || reservation.getTimeOfReservation().toLocalTime().isAfter(LocalTime.now())){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Bookings allowed for current day only!").build();
        } else {
        	if(reservation.getSeats() == 2) {
        		ReservationTable vacantTable = reservationTableRepo.getTwoSeaterVacantTables();
        		if(vacantTable == null) return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Sorry! No table for two available tonight!").build();
        		reservation.setTable(vacantTable);
        		reservationTableRepo.engageTableById(vacantTable.getTableId());
        	}
        	if(reservation.getSeats() == 4) {
        		ReservationTable vacantTable = reservationTableRepo.getFourSeaterVacantTables();
        		if(vacantTable == null) return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Sorry! No table for four available tonight!").build();
        		reservation.setTable(vacantTable);
        		reservationTableRepo.engageTableById(vacantTable.getTableId());
        	}

            Reservation createdReservation = reservationRepo.addReservation(reservation);
            if(createdReservation == null) return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Something went wrong while creating reservation!").build();
            else return Response.status(Response.Status.ACCEPTED).entity(createdReservation).build();
        }
    }
    
    public Response updateReservation(Reservation reservation) {
    	
    	   if(reservation.getSeats() != 0 && reservation.getSeats() < 2) reservation.setSeats(2);
           if(reservation.getSeats() > 2 && reservation.getSeats() < 4) reservation.setSeats(4);
 
        	   if(!reservation.getTimeOfReservation().toLocalDate().isEqual(LocalDate.now()) || reservation.getTimeOfReservation().toLocalTime().isAfter(LocalTime.now())){
               return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Bookings allowed for current day only!").build();
           } else {
        	   
        	   Reservation olderReservation = reservationRepo.findByReservationId(reservation.getReservationId());
           	if((reservation.getSeats() > olderReservation.getSeats() && reservationTableRepo.getFourSeaterVacantTables() != null) || 
           			(reservation.getSeats() < olderReservation.getSeats() && reservationTableRepo.getTwoSeaterVacantTables() != null)) {
           		reservationTableRepo.disengageTableById(olderReservation.getTable().getTableId());
           		if(reservation.getSeats() == 4) {
               		ReservationTable vacantTable = reservationTableRepo.getFourSeaterVacantTables();
               		reservation.setTable(vacantTable);
               		reservationTableRepo.engageTableById(vacantTable.getTableId());
               	}
           		
           		if(reservation.getSeats() == 2) {
               		ReservationTable vacantTable = reservationTableRepo.getTwoSeaterVacantTables();
               		reservation.setTable(vacantTable);
               		reservationTableRepo.engageTableById(vacantTable.getTableId());
               	}
           	} else if(reservation.getSeats() == olderReservation.getSeats()) {
           		Reservation updatedReservation = reservationRepo.updateReservation(reservation);
                if(updatedReservation == null) return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Something went wrong while updating reservation. Please try again!").build();
                else return Response.status(Response.Status.OK).entity(updatedReservation).build();
           	} else return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Sorry! No seat extension would be possible available tonight! You can to continue with the previously alloted seats.").build();

               Reservation updatedReservation = reservationRepo.updateReservation(reservation);
               if(updatedReservation == null) return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Something went wrong while updating reservation. Please try again!").build();
               else return Response.status(Response.Status.OK).entity(updatedReservation).build();
           }	
    }
    
    public Response removeReservation(String mobile) {
    	List<Reservation> reservationsToDelete = reservationRepo.findByMobile(mobile);
    	reservationsToDelete.forEach((reservation) -> reservationTableRepo.disengageTableById(reservation.getTable().getTableId()));
    	reservationRepo.deleteByMobile(mobile);
    	return Response.status(Response.Status.OK)
    			.entity("All bookings from "+ mobile +" removed!")
    			.build();
    }
    
    public List<Reservation> getReservationsByMobile(String mobile) {
    	return reservationRepo.findByMobile(mobile);
	}
    
    public void close() {
    	reservationRepo.close();
    	reservationTableRepo.close();
    }

	

}
