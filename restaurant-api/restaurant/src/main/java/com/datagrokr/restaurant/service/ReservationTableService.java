package com.datagrokr.restaurant.service;

import com.datagrokr.restaurant.entity.ReservationTable;
import com.datagrokr.restaurant.repository.ReservationTableRepository;


public class ReservationTableService {
	
	ReservationTableRepository reservationTableRepo;
	
	public ReservationTableService() {
		reservationTableRepo = new ReservationTableRepository();
	}
	
	public ReservationTable addReservationTable(ReservationTable reservationTable) {
		return reservationTableRepo.addReservationTable(reservationTable);
	}
	
	public ReservationTable getFourSeaterVacantTable() {
		ReservationTable result = reservationTableRepo.getFourSeaterVacantTables();
		return result;
	}
	
	public ReservationTable getTwoSeaterVacantTable() {
		ReservationTable result = reservationTableRepo.getTwoSeaterVacantTables();
		return result;
	}
	
	public void engageTableById(Integer tableId) {
		reservationTableRepo.engageTableById(tableId);
	}
	
	public void disengageTableById(Integer tableId) {
		reservationTableRepo.disengageTableById(tableId);
	}
	
	public void close() {
		reservationTableRepo.close();
	}
}
