package com.datagrokr.restaurant.repository;


import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.datagrokr.restaurant.entity.ReservationTable;

public class ReservationTableRepository {
	
	EntityManager entityManager;
	EntityManagerFactory emf;
	
	public ReservationTableRepository() {
		emf = Persistence.createEntityManagerFactory("reservation_pu");
		entityManager = emf.createEntityManager();	
	}
	
	public ReservationTable getFourSeaterVacantTables() {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<ReservationTable> cq = cb.createQuery(ReservationTable.class);
		Root<ReservationTable> root = cq.from(ReservationTable.class);
		CriteriaQuery<ReservationTable> all = cq.select(root)
				.where(cb.equal(root.get("status"), "vacant"), cb.equal(root.get("capacity"), 4));
		TypedQuery<ReservationTable> allQuery = entityManager.createQuery(all);
		try {
			ReservationTable vacantTable = (ReservationTable) allQuery.getResultList().get(0);
			if(vacantTable == null) return null;
			else return vacantTable;
		} catch (IndexOutOfBoundsException e) {
			return null;
		}	
	}
	
	public ReservationTable getTwoSeaterVacantTables() {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<ReservationTable> cq = cb.createQuery(ReservationTable.class);
		Root<ReservationTable> root = cq.from(ReservationTable.class);
		CriteriaQuery<ReservationTable> all = cq.select(root)
				.where(cb.equal(root.get("status"), "vacant"), cb.equal(root.get("capacity"), 2));
		TypedQuery<ReservationTable> allQuery = entityManager.createQuery(all);
		try {
			ReservationTable vacantTable = (ReservationTable) allQuery.getResultList().get(0);
			if(vacantTable == null) return null;
			else return vacantTable;
		} catch (IndexOutOfBoundsException e) {
			return null;
		}		
	}
	
	public void engageTableById(Integer tableId) {
		ReservationTable foundTable = entityManager.find(ReservationTable.class, tableId);
		entityManager.getTransaction().begin();
		foundTable.setStatus("booked");
		entityManager.persist(foundTable);
		entityManager.getTransaction().commit();
	}
	
	public void disengageTableById(Integer tableId) {
		ReservationTable foundTable = entityManager.find(ReservationTable.class, tableId);
		entityManager.getTransaction().begin();
		foundTable.setStatus("vacant");
		entityManager.persist(foundTable);
		entityManager.getTransaction().commit();	
	}
	
	public void close() {
		entityManager.close();
		emf.close();
	}

}
