package com.ilbcj.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.ilbcj.dao.MajorDAO;
import com.ilbcj.model.ExpertMajorType;
import com.ilbcj.model.HibernateUtil;
import com.ilbcj.model.MajorType;

public class MajorDAOImpl implements MajorDAO {

	@SuppressWarnings("unchecked")
	@Override
	public List<MajorType> GetAllMajorTypes() throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		List<MajorType> rs = null;
		String sqlString = "SELECT * FROM major_type ";
		
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(MajorType.class);
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

	@Override
	public ExpertMajorType AddExpertMajorType(ExpertMajorType emt)
			throws Exception {
		//打开线程安全的session对象
		Session session = HibernateUtil.currentSession();
		//打开事务
		Transaction tx = session.beginTransaction();
		try
		{
			emt = (ExpertMajorType)session.merge(emt);
			tx.commit();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			tx.rollback();
			System.out.println(e.getMessage());
			throw e;
		}
		finally
		{
			HibernateUtil.closeSession();
		}
		return emt;
	}

}
