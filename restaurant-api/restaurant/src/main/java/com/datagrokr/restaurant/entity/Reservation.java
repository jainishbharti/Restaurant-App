package com.datagrokr.restaurant.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Reservation implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer reservationId;
	private String userName;
	private String mobile;
	private Integer seats;
	private LocalDateTime timeOfReservation;
	
	@OneToOne
	private ReservationTable table;
	
	public Reservation() {}

	public Reservation(Integer reservationId, String userName, String mobile, Integer seats,
			LocalDateTime timeOfReservation, ReservationTable table) {
		super();
		this.reservationId = reservationId;
		this.userName = userName;
		this.mobile = mobile;
		this.seats = seats;
		this.timeOfReservation = timeOfReservation;
		this.table = table;
	}

	public Reservation(String userName, String mobile, Integer seats, LocalDateTime timeOfReservation,
			ReservationTable table) {
		super();
		this.userName = userName;
		this.mobile = mobile;
		this.seats = seats;
		this.timeOfReservation = timeOfReservation;
		this.table = table;
	}

	public ReservationTable getTable() {
		return table;
	}

	public void setTable(ReservationTable table) {
		this.table = table;
	}

	public Integer getReservationId() {
		return reservationId;
	}

	public void setReservationId(Integer reservationId) {
		this.reservationId = reservationId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Integer getSeats() {
		return seats;
	}

	public void setSeats(Integer seats) {
		this.seats = seats;
	}

	public LocalDateTime getTimeOfReservation() {
		return timeOfReservation;
	}

	public void setTimeOfReservation(LocalDateTime timeOfReservation) {
		this.timeOfReservation = timeOfReservation;
	}

	@Override
	public String toString() {
		return "Reservation [reservationId=" + reservationId + ", userName=" + userName + ", mobile=" + mobile
				+ ", seats=" + seats + ", timeOfReservation=" + timeOfReservation + "]";
	}
	
	  @Override
	    public int hashCode() {
	        int hash = 0;
	        hash += (reservationId != null ? reservationId.hashCode() : 0);
	        return hash;
	    }

	    @Override
	    public boolean equals(Object object) {
	        // TODO: Warning - this method won't work in the case the id fields are not set
	        if (!(object instanceof Reservation)) {
	            return false;
	        }
	        Reservation other = (Reservation) object;
	        if ((this.reservationId == null && other.reservationId != null) || (this.reservationId != null && !this.reservationId.equals(other.reservationId))) {
	            return false;
	        }
	        return true;
	    }

	
}
