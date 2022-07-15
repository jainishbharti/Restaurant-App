package com.datagrokr.restaurant.repository;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.datagrokr.restaurant.entity.ReservationTable;

class ReservationTableRepositoryTest {
	
	ReservationTableRepository underTest;

	@BeforeEach
	void setUp() throws Exception {
		underTest = new ReservationTableRepository();
	}

	@AfterEach
	void tearDown() throws Exception {
		underTest.close();
	}

	@Test
	void testReservationTableRepository() {
	}

	@Test
	void testAddReservationTable() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = underTest.addReservationTable(table);
		assertNotNull(addedTable);
		assertEquals(table, addedTable);
	}

	@Test
	void testGetFourSeaterVacantTables() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = underTest.addReservationTable(table);
		assertEquals(addedTable, underTest.getFourSeaterVacantTables());
	}

	@Test
	void testGetTwoSeaterVacantTables() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"vacant");
		ReservationTable addedTable = underTest.addReservationTable(table);
		assertEquals(addedTable, underTest.getTwoSeaterVacantTables());
	}

	@Test
	void testEngageTableById() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"vacant");
		ReservationTable addedTable = underTest.addReservationTable(table);
		underTest.engageTableById(addedTable.getTableId());
		assertNull(underTest.getTwoSeaterVacantTables());
	}

	@Test
	void testDisengageTableById() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"booked");
		ReservationTable addedTable = underTest.addReservationTable(table);
		underTest.disengageTableById(addedTable.getTableId());
		assertNotNull(underTest.getTwoSeaterVacantTables());
	}

	@Test
	void testClose() {
		
	}

}
