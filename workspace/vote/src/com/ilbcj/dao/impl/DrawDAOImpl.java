package com.ilbcj.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.ilbcj.dao.DrawDAO;
import com.ilbcj.model.Expert;
import com.ilbcj.model.HibernateUtil;

public class DrawDAOImpl implements DrawDAO {

	@Override
	public int GetChosenExpertCountByProjectId(int projectId, int status) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		Long rs;
		String sqlString = "SELECT COUNT(*) FROM Choose WHERE project_id=:project_id and status=:status ";
		
		try {
			Query q = session.createQuery(sqlString);
			q.setInteger("project_id", projectId);
			q.setInteger("status", status);
			rs = (Long)q.uniqueResult();
			tx.commit();
		} catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
			System.out.println(e.getMessage());
			throw e;
		} finally {
			HibernateUtil.closeSession();
		}
		return rs.intValue();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Expert> GetExpertWithoutAvoidUnit() throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		List<Expert> rs = null;
		String sqlString = "SELECT * FROM expert where unit_id not in (select unit_id from avoid_unit ) ";
		
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(Expert.class);
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
