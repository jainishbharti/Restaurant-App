package com.datagrokr.restaurant.resource;

import java.util.List;

import com.datagrokr.restaurant.entity.Reservation;
import com.datagrokr.restaurant.service.ReservationService;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("bookings")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ReservationResource {
	
    private final ReservationService reservationService = new ReservationService();

	
	@GET
    public Response getAllReservations() {
		List<Reservation> reservations = reservationService.getAllReservations();
		return Response.status(Response.Status.OK).entity(reservations).build();
	}
	
	@GET
	@Path("/{id}")
	public Response getReservation(@PathParam("id") Integer reservationId) {
		Reservation reservation = reservationService.getReservation(reservationId);
		if(reservation != null) return Response.status(Response.Status.OK).entity(reservation).build();
		else return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("No reservations found").build();
	}
	
	@GET
	@Path("/getbyMobile/{contact}")
	public Response getReservationsByMobileNo(@PathParam("contact") String mobileNumber) {
		List<Reservation> reservations = reservationService.getReservationsByMobile(mobileNumber);
		return Response.status(Response.Status.OK).entity(reservations).build();
	}
	
    @POST
    public Response addReservation(Reservation reservation){
        return reservationService.addReservation(reservation);
    }
    
    @PUT
    @Path("/{id}")
    public Response updateReservation(@PathParam("id") Integer reservationId, Reservation reservation) {
    	reservation.setReservationId(reservationId);
    	return reservationService.updateReservation(reservation);
    }
    
    @DELETE
    public Response deleteReservation(Reservation reservation) {
    	return reservationService.removeReservation(reservation.getMobile());
    }
    
    @DELETE
    @Path("/{mobile}")
    public Response deleteReservation(@PathParam("mobile") String mobile) {
    	return reservationService.removeReservation(mobile);
    }
    
    

}
