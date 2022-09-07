package com.datagrokr.restaurant.resource;

import java.util.List;

import com.datagrokr.restaurant.entity.ReservationTable;
import com.datagrokr.restaurant.service.ReservationTableService;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("tables")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ReservationTableResource {
	
    private final ReservationTableService reservationTableService = new ReservationTableService();
    
    @GET
    public Response getAllReservationTables() {
		List<ReservationTable> reservationTables = reservationTableService.getAllReservationTables();
		return Response.status(Response.Status.OK).entity(reservationTables).build();
	}

}
