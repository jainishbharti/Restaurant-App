package com.datagrokr.restaurant.resource;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.time.LocalDateTime;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import com.datagrokr.restaurant.entity.Reservation;
import com.datagrokr.restaurant.entity.ReservationTable;
import com.datagrokr.restaurant.service.ReservationService;
import com.datagrokr.restaurant.service.ReservationTableService;

import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

class ReservationResourceTest extends JerseyTest{
	
	ReservationService reservationService;
	ReservationTableService reservationTableService;
	
	@Override
    protected Application configure() {
        return new ResourceConfig(ReservationResource.class);
    }

	@BeforeEach
	public void init() throws Exception {
		reservationService = new ReservationService();
		reservationTableService = new ReservationTableService();
	}

	@AfterEach
	public void tearDown() throws Exception {
		reservationService.close();
		reservationTableService.close();
	}

	@Test
	void testGetAllReservations() {
		ReservationTable addedTable = reservationTableService.addReservationTable(new ReservationTable(1,"four-seater", 4, "vacant"));
		reservationService.addReservation(new Reservation("John Doe", "1234567890", 4, LocalDateTime.now(), addedTable));
		Response result = target("bookings").request().get();
		assertNotNull(result);
		assertEquals(result.getStatus(), 200);
	}

	@Test
	void testGetReservation() {
		ReservationTable addedTable = reservationTableService.addReservationTable(new ReservationTable(1,"four-seater", 4, "vacant"));
		reservationService.addReservation(new Reservation("John Doe", "1234567890", 4, LocalDateTime.now(), addedTable));
		Response result = target("bookings/1").request().get();
		assertNotNull(result);
		assertEquals(result.getStatus(), 200);
	}

	@Test
	void testAddReservation() {
		ReservationTable addedTable = reservationTableService.addReservationTable(new ReservationTable(1,"four-seater", 4, "vacant"));
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.now().plusHours(1), addedTable);
		Response result = target("bookings").request().post(Entity.entity(reservation, MediaType.APPLICATION_JSON));
		assertNotNull(result.getEntity());
	}

	@Test
	void testUpdateReservation() {
		ReservationTable addedTable = reservationTableService.addReservationTable(new ReservationTable(1,"four-seater", 4, "vacant"));
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.now().plusHours(1), addedTable);
		reservationService.addReservation(reservation);
		Reservation newReservation = new Reservation("Johnny Depp", "9876543210", 4, LocalDateTime.now().plusHours(1), addedTable);
		Response result = target("bookings/1").request().put(Entity.entity(newReservation, MediaType.APPLICATION_JSON));
		assertNotNull(result.getEntity());
	}

	@Test
	@Disabled
	void testDeleteReservation() {
		ReservationTable addedTable = reservationTableService.addReservationTable(new ReservationTable(1,"four-seater", 4, "vacant"));
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.now().plusHours(1), addedTable);
		reservationService.addReservation(reservation);
		Response result = target("bookings/1234567890").request().delete();
		assertNull(result.getEntity());
	}



}
