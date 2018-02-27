package com.ilbcj.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.ilbcj.dao.UnitDAO;
import com.ilbcj.model.HibernateUtil;
import com.ilbcj.model.Unit;

public class UnitDAOImpl implements UnitDAO {

	@SuppressWarnings("unchecked")
	@Override
	public List<Unit> GetAllUnits() throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		List<Unit> rs = null;
		String sqlString = "SELECT * FROM unit ";
		
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(Unit.class);
			rs = q.list();
			tx.commit();
		} catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
			System.out.println(e.getMessage());
			throw e;
		} finally {
			HibernateUtil.closeSession();
		}
		return rs;
	}

}
