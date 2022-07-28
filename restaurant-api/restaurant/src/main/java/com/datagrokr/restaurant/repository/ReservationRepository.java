package com.datagrokr.restaurant.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.datagrokr.restaurant.entity.Reservation;

public class ReservationRepository {
	
	EntityManager entityManager;
	EntityManagerFactory emf;
	
	public ReservationRepository() {
		emf = Persistence.createEntityManagerFactory("reservation_pu");
		entityManager = emf.createEntityManager();	
	}
	
	public Reservation addReservation(Reservation reservation) {
		entityManager.getTransaction().begin();
		entityManager.persist(reservation);
		entityManager.getTransaction().commit();
		return reservation;	
	}
	
	public List<Reservation> findAll(){
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Reservation> cq = cb.createQuery(Reservation.class);
		Root<Reservation> root = cq.from(Reservation.class);
		CriteriaQuery<Reservation> all = cq.select(root);
		TypedQuery<Reservation> allQuery = entityManager.createQuery(all);
		List<Reservation> result = allQuery.getResultList();
		if(result.isEmpty()) return null;
		else return result;
	}
	
	public Reservation findByReservationId(Integer reservationId) {
		Reservation foundReservation = entityManager.find(Reservation.class, reservationId);
		if(foundReservation == null) return null;
		else return foundReservation;
	}
	
	public List<Reservation> findByMobile(String mobileNumber){
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Reservation> cq = cb.createQuery(Reservation.class);
		Root<Reservation> root = cq.from(Reservation.class);
		CriteriaQuery<Reservation> all = cq.select(root)
				.where(cb.equal(root.get("mobile"), mobileNumber));
		TypedQuery<Reservation> allQuery = entityManager.createQuery(all);
		List<Reservation> result = allQuery.getResultList();
		if(result.isEmpty()) return null;
		else return result;		
	}
	
	public Reservation updateReservation(Reservation reservation) {
		Reservation reservationToUpdate = entityManager.find(Reservation.class, reservation.getReservationId());
        entityManager.getTransaction().begin();
        if(reservation.getSeats() != 0){
            reservationToUpdate.setSeats(reservation.getSeats());
        }
        if(reservation.getTimeOfReservation() != null){
            reservationToUpdate.setTimeOfReservation(reservation.getTimeOfReservation());
        }
        reservationToUpdate.setUserName(reservation.getUserName());
        reservationToUpdate.setMobile(reservation.getMobile());
        entityManager.persist(reservationToUpdate);
        entityManager.getTransaction().commit();
        return reservationToUpdate;
	}
	
	public void deleteByReservationId(Integer reservationId) {
		entityManager.getTransaction().begin();
		Query query = entityManager.createQuery("DELETE FROM Reservation WHERE reservationId="+ reservationId);
		query.executeUpdate();
		entityManager.getTransaction().commit();
	}
	
	public void deleteByMobile(String mobileNumber) {
		entityManager.getTransaction().begin();
		List<Reservation> result = findByMobile(mobileNumber);
		result.forEach((reservation) -> entityManager.remove(reservation));
		entityManager.getTransaction().commit();
	}
	
	public String noOfReservations() {
		Query query = entityManager.createQuery("SELECT COUNT(s) FROM Reservation s");
	    return query.getSingleResult().toString();
	}
	
	public String noOfFourSeatReservations() {
		Query query = entityManager.createQuery("SELECT COUNT(s) FROM Reservation s WHERE seats = 4");
	    return query.getSingleResult().toString();
	}
	
	public String noOfTwoSeatReservations() {
		Query query = entityManager.createQuery("SELECT COUNT(s) FROM Reservation s WHERE seats = 2");
	    return query.getSingleResult().toString();
	}
	
	public void close() {
		emf.close();
		entityManager.close();
	}


}
