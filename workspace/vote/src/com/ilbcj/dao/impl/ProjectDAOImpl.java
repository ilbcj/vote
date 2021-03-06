package com.ilbcj.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.exception.ConstraintViolationException;

import com.ilbcj.dao.ProjectDAO;
import com.ilbcj.model.AvoidUnit;
import com.ilbcj.model.Project;
import com.ilbcj.model.HibernateUtil;

public class ProjectDAOImpl implements ProjectDAO {

	@SuppressWarnings("unchecked")
	@Override
	public List<Project> GetProjects(Project criteria, int start, int length)
			throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		List<Project> rs = null;
		String sqlString = "SELECT * FROM Project WHERE 1=1 ";
		
		if( criteria != null ) {
			if(criteria.getId() != 0) {
				sqlString += " and id = :id ";
			}
			if(criteria.getName() != null && criteria.getName().length() > 0) {
				sqlString += " and name like :name ";
			}
			if(criteria.getSn() != null && criteria.getSn().length() > 0) {
				sqlString += " and sn = :sn ";
			}
		}
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(Project.class);
			if( criteria != null ) {
				if(criteria.getId() != 0) {
					q.setInteger("id", criteria.getId());
				}
				if(criteria.getName() != null && criteria.getName().length() > 0) {
					q.setString( "name", "%" + criteria.getName() + "%" );
				}
				if(criteria.getSn() != null && criteria.getSn().length() > 0) {
					q.setString( "sn", "%" + criteria.getSn() + "%" );
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
	public long QueryProjectsCount(Project criteria) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		Long rs;
		String sqlString = "SELECT COUNT(*) FROM Project WHERE 1=1 ";
		
		if( criteria != null ) {
			if(criteria.getId() != 0) {
				sqlString += " and id = :id ";
			}
			if(criteria.getName() != null && criteria.getName().length() > 0) {
				sqlString += " and name like :name ";
			}
			if(criteria.getSn() != null && criteria.getSn().length() > 0) {
				sqlString += " and sn like :sn ";
			}
		}
		try {
			Query q = session.createQuery(sqlString);
			if( criteria != null ) {
				if(criteria.getId() != 0) {
					q.setInteger("id", criteria.getId());
				}
				if(criteria.getName() != null && criteria.getName().length() > 0) {
					q.setString( "name", "%" + criteria.getName() + "%" );
				}
				if(criteria.getSn() != null && criteria.getSn().length() > 0) {
					q.setString( "sn", "%" + criteria.getSn() + "%" );
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
	public Project GetProjectById(int id) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		Project rs = null;
		String sqlString = "SELECT * FROM Project WHERE id=:id ";
		
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(Project.class);
			q.setInteger("id", id);
			rs = (Project)q.uniqueResult();
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
	public Project AddProject(Project project) throws Exception {
		//打开线程安全的session对象
		Session session = HibernateUtil.currentSession();
		//打开事务
		Transaction tx = session.beginTransaction();
		try
		{
			project = (Project)session.merge(project);
			tx.commit();
		}
		catch(ConstraintViolationException cne){
			tx.rollback();
			System.out.println(cne.getSQLException().getMessage());
			throw new Exception("存在重名项目");
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
		return project;
	}

	@Override
	public void DelProject(Project target) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		String sqlString = "DELETE FROM Project WHERE id=:id ";
		int rs = 0;
		
		try {
			Query q = session.createQuery(sqlString);
			q.setInteger("id", target.getId());
			rs = q.executeUpdate();
			System.out.println("delete " + rs + "recored from project");
			tx.commit();
		} catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
			System.out.println(e.getMessage());
			throw e;
		} finally {
			HibernateUtil.closeSession();
		}
		return;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<AvoidUnit> GetAvoidUnits(int start, int length) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		List<AvoidUnit> rs = null;
		String sqlString = "SELECT * FROM avoid_unit ";
		
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(AvoidUnit.class);
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
	public long QueryAvoidUnitCount() throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		Long rs;
		String sqlString = "SELECT COUNT(*) FROM AvoidUnit ";
		
		try {
			Query q = session.createQuery(sqlString);
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
	public AvoidUnit AddAvoidUnit(AvoidUnit au) throws Exception {
		//打开线程安全的session对象
		Session session = HibernateUtil.currentSession();
		//打开事务
		Transaction tx = session.beginTransaction();
		try
		{
			au = (AvoidUnit)session.merge(au);
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
		return au;
	}

	@Override
	public AvoidUnit GetAvoidUnitByUnitid(int unitId) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		AvoidUnit rs = null;
		String sqlString = "SELECT * FROM avoid_unit WHERE unit_id=:unit_id ";
		
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(AvoidUnit.class);
			q.setInteger("unit_id", unitId);
			rs = (AvoidUnit)q.uniqueResult();
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
	public void DelAvoidUnit(AvoidUnit target) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		String sqlString = "DELETE FROM AvoidUnit WHERE id=:id ";
		int rs = 0;
		
		try {
			Query q = session.createQuery(sqlString);
			q.setInteger("id", target.getId());
			rs = q.executeUpdate();
			System.out.println("delete " + rs + " recored from avoid_unit");
			tx.commit();
		} catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
			System.out.println(e.getMessage());
			throw e;
		} finally {
			HibernateUtil.closeSession();
		}
		return;
	}

}
