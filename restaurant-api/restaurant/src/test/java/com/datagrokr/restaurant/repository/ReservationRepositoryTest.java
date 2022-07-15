package com.datagrokr.restaurant.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.datagrokr.restaurant.entity.Reservation;
import com.datagrokr.restaurant.entity.ReservationTable;

class ReservationRepositoryTest {
	ReservationRepository underTest;
	ReservationTableRepository tableUnderTest;

	@BeforeEach
	void setUp() throws Exception {
		underTest = new ReservationRepository();
		tableUnderTest = new ReservationTableRepository();
	}

	@AfterEach
	void tearDown() throws Exception {
		underTest.close();
		tableUnderTest.close();
	}

	@Test
	void testReservationRepository() {
	}

	@Test
	void testAddReservation() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.of(2022, 07, 14, 17, 35, 48, 460000), addedTable);
		Reservation addedReservation = underTest.addReservation(reservation);
		assertEquals(reservation, addedReservation);
	}

	@Test
	void testFindAll() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.of(2022, 07, 14, 17, 35, 48, 460000), addedTable);
		Reservation addedReservation = underTest.addReservation(reservation);
		List<Reservation> results = underTest.findAll();
		assertNotNull(results);
		assertEquals(results.get(0), addedReservation);
	}

	@Test
	void testFindByReservationId() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.of(2022, 07, 14, 17, 35, 48, 460000), addedTable);
		Reservation addedReservation = underTest.addReservation(reservation);
		assertNotNull(underTest.findByReservationId(addedReservation.getReservationId()));
		assertEquals(addedReservation,underTest.findByReservationId(addedReservation.getReservationId()));
	}

	@Test
	void testFindByMobile() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.of(2022, 07, 14, 17, 35, 48, 460000), addedTable);
		Reservation addedReservation = underTest.addReservation(reservation);
		assertNotNull(underTest.findByMobile(addedReservation.getMobile()));
		assertEquals(addedReservation,underTest.findByMobile(addedReservation.getMobile()).get(0));
	}

	@Test
	void testUpdateReservation() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.of(2022, 07, 14, 17, 35, 48, 460000), addedTable);
		underTest.addReservation(reservation);
		Reservation newReservation = new Reservation(1,"Johnny Depp", "9874563210", 4, LocalDateTime.of(2022, 07, 14, 17, 35, 48, 460000), addedTable);
		Reservation updatedReservation = underTest.updateReservation(newReservation);
		assertEquals(newReservation, updatedReservation);	
	}

	@Test
	void testDeleteByReservationId() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.of(2022, 07, 14, 17, 35, 48, 460000), addedTable);
		Reservation addedReservation = underTest.addReservation(reservation);
		underTest.deleteByReservationId(addedReservation.getReservationId());
		assertNotNull(underTest.findByReservationId(1));
	}

	@Test
	void testDeleteByMobile() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.of(2022, 07, 14, 17, 35, 48, 460000), addedTable);
		Reservation addedReservation = underTest.addReservation(reservation);
		underTest.deleteByMobile(addedReservation.getMobile());
		assertNull(underTest.findByMobile(addedReservation.getMobile()));
	}

	@Test
	void testNoOfReservations() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.of(2022, 07, 14, 17, 35, 48, 460000), addedTable);
		underTest.addReservation(reservation);
		assertEquals("1", underTest.noOfReservations());
	}

	@Test
	void testNoOfFourSeatReservations() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 4, LocalDateTime.of(2022, 07, 14, 17, 35, 48, 460000), addedTable);
		underTest.addReservation(reservation);
		assertEquals("1", underTest.noOfFourSeatReservations());
	}

	@Test
	void testNoOfTwoSeatReservations() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"vacant");
		ReservationTable addedTable = tableUnderTest.addReservationTable(table);
		Reservation reservation = new Reservation("John Doe", "1234567890", 2, LocalDateTime.of(2022, 07, 14, 17, 35, 48, 460000), addedTable);
		underTest.addReservation(reservation);
		assertEquals("1", underTest.noOfTwoSeatReservations());
	}

	@Test
	void testClose() {
		underTest.close();
		assertThrows(IllegalStateException.class, () -> underTest.findAll());
	}

}
