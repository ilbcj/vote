package com.ilbcj.service;

import java.util.List;
import com.ilbcj.dao.MajorDAO;
import com.ilbcj.dao.ProjectDAO;
import com.ilbcj.dao.impl.MajorDAOImpl;
import com.ilbcj.dao.impl.ProjectDAOImpl;
import com.ilbcj.model.AvoidUnit;
import com.ilbcj.model.Project;

public class ProjectInfoService {
	public long QueryProject(String name, String sn, int start, int length, List<Project> projects) throws Exception {
		ProjectDAO dao = new ProjectDAOImpl();
		Project criteria = new Project();
		criteria.setName(name);
		criteria.setSn(sn);
		List<Project> tmp = dao.GetProjects(criteria, start, length);
		projects.addAll(tmp);
		
		convertProjectData(projects);
		
		long count = 0;
		count = dao.QueryProjectsCount(criteria);
		return count;
	}
	
	private void convertProjectData(List<Project> projects) throws Exception {
//		UnitDAO udao = new UnitDAOImpl();
//		List<Unit> units = udao.GetAllUnits();
//		Map<Integer, Unit> unitMap = new HashMap<Integer, Unit>();
//		for(Unit unit : units) {
//			unitMap.put(unit.getId(), unit);
//		}
//		for(Project project:projects) {
//			Unit u = unitMap.get(project.getUnitId());
//			if(u != null) {
//				project.setUnit(u.getName());
//			}
//		}
//		return;
	}

	public void SaveProject(Project project) throws Exception {
		ProjectDAO dao = new ProjectDAOImpl();
		
		Project criteria = new Project();
		criteria.setName(project.getName());
		criteria.setSn(project.getSn());
		long count = 0;
		count = dao.QueryProjectsCount(criteria);
		if (project.getId() == 0) {
			if(count > 0) {
				throw new Exception("项目信息已存在，请检查项目名称和编号是否正确。");
			}
			project.setStatus(Project.STATUS_NEW);
		}
		else {
			Project current = dao.GetProjectById(project.getId());
			project.setStatus(current.getStatus());
		}
		
		project = dao.AddProject(project);
		
		return;
	}

	public void SaveProjectMemo(int projectId, String memo) throws Exception {
		ProjectDAO dao = new ProjectDAOImpl();
		
		Project project = new Project();
		project = dao.GetProjectById(projectId);
		if(project == null) {
			throw new Exception("项目信息不存在。");
		}
		
		if( memo == null ) {
			memo = "";
		}
		project.setMemo(memo);
		project = dao.AddProject(project);
		
		return;
	}

	public void DeleteProjects(List<Integer> delIds) throws Exception {
		ProjectDAO pdao = new ProjectDAOImpl();
		MajorDAO mdao = new MajorDAOImpl();
		Project target;
		for(int i = 0; i < delIds.size(); i++) {
			int id = delIds.get(i);
			mdao.DeleteProjectMajorTypeByProjectid(id);
			
			target = new Project();
			target.setId(id);
			pdao.DelProject(target);
		}
		return;
	}
	
	public Project QueryProjectById(int pid) throws Exception {
		ProjectDAO dao = new ProjectDAOImpl();
		Project project = dao.GetProjectById(pid);
		return project;
	}

	public long QueryAvoidUnits(int start, int length, List<AvoidUnit> aus) throws Exception {
		ProjectDAO dao = new ProjectDAOImpl();
		List<AvoidUnit> tmp = dao.GetAvoidUnits(start, length);
		aus.addAll(tmp);
		
		long count = 0;
		count = dao.QueryAvoidUnitCount();
		return count;
	}

	public void SaveAvoidUnit(AvoidUnit au) throws Exception {
		ProjectDAO dao = new ProjectDAOImpl();
		AvoidUnit tmp = dao.GetAvoidUnitByUnitid(au.getUnitId());
		if(tmp == null) {
			dao.AddAvoidUnit(au);
		}
		return;
	}

	public void DelAvoidUnitById(int avoidId) throws Exception {
		ProjectDAO dao = new ProjectDAOImpl();
		AvoidUnit target = new AvoidUnit();
		target.setId(avoidId);
		dao.DelAvoidUnit(target);
		
		return;
	}

	public void UpdateProjectStatus(int id, int status) throws Exception {
		ProjectDAO dao = new ProjectDAOImpl();
		Project project = dao.GetProjectById(id);
		project.setStatus(status);
		dao.AddProject(project);
		return;
	}
}
