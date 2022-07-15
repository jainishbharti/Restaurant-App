package com.datagrokr.restaurant.service;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.datagrokr.restaurant.entity.ReservationTable;

class ReservationTableServiceTest {
	
	ReservationTableService underTest;

	@BeforeEach
	void setUp() throws Exception {
		underTest = new ReservationTableService();
	}

	@AfterEach
	void tearDown() throws Exception {
		underTest.close();
	}

	@Test
	void testReservationTableService() {
	}

	@Test
	void testAddReservationTable() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = underTest.addReservationTable(table);
		assertNotNull(addedTable);
		assertEquals(table, addedTable);
	}

	@Test
	void testGetFourSeaterVacantTable() {
		ReservationTable table = new ReservationTable(1, "four-seater", 4,"vacant");
		ReservationTable addedTable = underTest.addReservationTable(table);
		assertNotNull(underTest.getFourSeaterVacantTable());
		assertEquals(addedTable, underTest.getFourSeaterVacantTable());
	}

	@Test
	void testGetTwoSeaterVacantTable() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"vacant");
		ReservationTable addedTable = underTest.addReservationTable(table);
		assertNotNull(underTest.getTwoSeaterVacantTable());
		assertEquals(addedTable, underTest.getTwoSeaterVacantTable());
	}

	@Test
	void testEngageTableById() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"vacant");
		ReservationTable addedTable = underTest.addReservationTable(table);
		underTest.engageTableById(addedTable.getTableId());
		assertNull(underTest.getTwoSeaterVacantTable());
	}

	@Test
	void testDisengageTableById() {
		ReservationTable table = new ReservationTable(1, "two-seater", 2,"booked");
		ReservationTable addedTable = underTest.addReservationTable(table);
		underTest.disengageTableById(addedTable.getTableId());
		assertNotNull(underTest.getTwoSeaterVacantTable());
		assertEquals(addedTable,underTest.getTwoSeaterVacantTable());
	}

	@Test
	void testClose() {
		underTest.close();
	}

}
