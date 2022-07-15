package com.datagrokr.restaurant.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.time.LocalDateTime;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.datagrokr.restaurant.entity.Reservation;
import com.datagrokr.restaurant.entity.ReservationTable;

import jakarta.ws.rs.core.Response;

class ReservationServiceTest {
	ReservationService underTest;
	ReservationTableService tableUnderTest;

	@BeforeEach
	void setUp() throws Exception {
		underTest = new ReservationService();
		tableUnderTest = new ReservationTableService();
	}

	@AfterEach
	void tearDown() throws Exception {
		underTest.close();
		tableUnderTest.close();
	}

	@Test
	void testReservationService() {
	}

	@Test
	void testGetAllReservations() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.now(), addedTable);
		Response addedReservation = underTest.addReservation(reservation);
		Reservation result =  underTest.getAllReservations().get(0);
		assertEquals(addedReservation.getEntity(), result);
	}

	@Test
	void testGetNoOfReservations() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.now(), addedTable);
		underTest.addReservation(reservation);
		String count = underTest.getNoOfReservations();
		assertEquals("1", count );
	}

	@Test
	void testGetNoOfTwoSeatsReservations() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 2, LocalDateTime.now(), addedTable);
		underTest.addReservation(reservation);
		assertEquals("1", underTest.getNoOfTwoSeatsReservations());
	}

	@Test
	void testGetNoOfFourSeatsReservation() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.now(), addedTable);
		underTest.addReservation(reservation);
		assertEquals("1", underTest.getNoOfFourSeatsReservation());
	}

	@Test
	void testGetReservation() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 2, LocalDateTime.now(), addedTable);
		Response addedReservation =  underTest.addReservation(reservation);
		Reservation result = underTest.getReservation(1);
		assertNotNull(result);
		assertEquals(addedReservation.getEntity(), underTest.getReservation(1));
	}

	@Test
	void testAddReservation() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 2, LocalDateTime.now(), addedTable);
		Response addedReservation =  underTest.addReservation(reservation);
		assertEquals(addedReservation.getStatus(), 202);
		assertNotNull(addedReservation.getEntity());
	}

	@Test
	void testUpdateReservation() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 2, LocalDateTime.now(), addedTable);
		underTest.addReservation(reservation);
		Reservation newReservation = new Reservation("Johnny Depp", "9876543210", 2, LocalDateTime.now(), addedTable);
		newReservation.setReservationId(1);
		Response updatedReservation = underTest.updateReservation(newReservation);
		assertEquals(updatedReservation.getStatus(), 200);
		assertNotNull(updatedReservation.getEntity());
	}

	@Test
	void testRemoveReservation() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 2, LocalDateTime.now(), addedTable);
		underTest.addReservation(reservation);
		underTest.removeReservation("1234567890");
		assertNull(underTest.getReservation(1));
	}

	@Test
	void testClose() {
		underTest.close();
		tableUnderTest.close();
	}

}
