package com.ilbcj.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ilbcj.dao.ProjectDAO;
import com.ilbcj.dao.UnitDAO;
import com.ilbcj.dao.impl.ProjectDAOImpl;
import com.ilbcj.dao.impl.UnitDAOImpl;
import com.ilbcj.model.Project;
import com.ilbcj.model.Unit;
import com.ilbcj.util.DateTimeUtil;

public class ProjectInfoService {
	public long QueryProject(String name, String sn, int start, int length, List<Project> projects) throws Exception {
		ProjectDAO dao = new ProjectDAOImpl();
		Project criteria = new Project();
		criteria.setName(name);
		criteria.setSn(sn);
		List<Project> tmp = dao.GetProjects(criteria, start, length);
		projects.addAll(tmp);
		
		convertExpertData(projects);
		
		long count = 0;
		count = dao.QueryProjectsCount(criteria);
		return count;
	}
	
	private void convertExpertData(List<Project> projects) throws Exception {
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
		if(count > 0) {
			throw new Exception("项目信息已存在，请检查项目名称和编号是否正确。");
		}
		
		project.setStatus(Project.STATUS_NEW);
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
}
