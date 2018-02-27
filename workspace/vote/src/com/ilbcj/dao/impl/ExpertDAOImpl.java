package com.ilbcj.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.exception.ConstraintViolationException;

import com.ilbcj.dao.ExpertDAO;
import com.ilbcj.model.Expert;
import com.ilbcj.model.HibernateUtil;

public class ExpertDAOImpl implements ExpertDAO {

	@SuppressWarnings("unchecked")
	@Override
	public List<Expert> GetExperts(Expert criteria, int start, int length)
			throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		List<Expert> rs = null;
		String sqlString = "SELECT * FROM Expert WHERE 1=1 ";
		
		if( criteria != null ) {
			sqlString += " and status = :status ";
			if(criteria.getId() != 0) {
				sqlString += " and id = :id ";
			}
			if(criteria.getName() != null && criteria.getName().length() > 0) {
				sqlString += " and name like :name ";
			}
			if(criteria.getUnitId() != 0) {
				sqlString += " and unit_id = :unit_id ";
			}
			if(criteria.getCity() != null && criteria.getCity().length() > 0) {
				sqlString += " and city like :city ";
			}
		}
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(Expert.class);
			if( criteria != null ) {
				q.setInteger("status", criteria.getStatus());
				if(criteria.getId() != 0) {
					q.setInteger("id", criteria.getId());
				}
				if(criteria.getName() != null && criteria.getName().length() > 0) {
					q.setString( "name", "%" + criteria.getName() + "%" );
				}
				if(criteria.getUnitId() != 0) {
					q.setInteger( "unit_id", criteria.getUnitId() );
				}
				if(criteria.getCity() != null && criteria.getCity().length() > 0) {
					q.setString( "city", "%" + criteria.getCity() + "%" );
				}
			}
			if( start > 0 || length >0 ) {
				q.setFirstResult(start);
				q.setMaxResults(length);
			}
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
	public long QueryExpertsCount(Expert criteria) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		Long rs;
		String sqlString = "SELECT COUNT(*) FROM Expert WHERE 1=1 ";
		
		if( criteria != null ) {
			sqlString += " and status = :status ";
			if(criteria.getId() != 0) {
				sqlString += " and id = :id ";
			}
			if(criteria.getName() != null && criteria.getName().length() > 0) {
				sqlString += " and name like :name ";
			}
			if(criteria.getUnitId() != 0) {
				sqlString += " and unit_id = :unit_id ";
			}
			if(criteria.getCity() != null && criteria.getCity().length() > 0) {
				sqlString += " and city like :city ";
			}
		}
		try {
			Query q = session.createQuery(sqlString);
			if( criteria != null ) {
				q.setInteger("status", criteria.getStatus());
				if(criteria.getId() != 0) {
					q.setInteger("id", criteria.getId());
				}
				if(criteria.getName() != null && criteria.getName().length() > 0) {
					q.setString( "name", "%" + criteria.getName() + "%" );
				}
				if(criteria.getUnitId() != 0) {
					q.setInteger( "unit_id", criteria.getUnitId() );
				}
				if(criteria.getCity() != null && criteria.getCity().length() > 0) {
					q.setString( "city", "%" + criteria.getCity() + "%" );
				}
			}
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
		return rs;
	}

	@Override
	public Expert GetExpertById(int id) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		Expert rs = null;
		String sqlString = "SELECT * FROM Expert WHERE id=:id ";
		
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(Expert.class);
			q.setInteger("id", id);
			rs = (Expert)q.uniqueResult();
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
	public Expert AddExpert(Expert expert) throws Exception {
		//打开线程安全的session对象
		Session session = HibernateUtil.currentSession();
		//打开事务
		Transaction tx = session.beginTransaction();
		try
		{
			expert = (Expert)session.merge(expert);
			tx.commit();
		}
		catch(ConstraintViolationException cne){
			tx.rollback();
			System.out.println(cne.getSQLException().getMessage());
			throw new Exception("存在重名专家");
		}
		catch(org.hibernate.exception.SQLGrammarException e)
		{
			tx.rollback();
			System.out.println(e.getSQLException().getMessage());
			throw e.getSQLException();
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
		return expert;
	}

}
