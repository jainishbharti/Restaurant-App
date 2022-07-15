package com.datagrokr.restaurant.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ReservationTable {
	
	@Id
	private Integer tableId;
	private String tableType;
	private Integer capacity;
	private String status;
	
	public ReservationTable() {}
	
	
	

	public ReservationTable(Integer tableId, String tableType, Integer capacity, String status) {
		super();
		this.tableId = tableId;
		this.tableType = tableType;
		this.capacity = capacity;
		this.status = status;
	}



	public Integer getTableId() {
		return tableId;
	}

	public void setTableId(Integer tableId) {
		this.tableId = tableId;
	}

	public String getTableType() {
		return tableType;
	}

	public void setTableType(String tableType) {
		this.tableType = tableType;
	}

	public Integer getCapacity() {
		return capacity;
	}

	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
}
