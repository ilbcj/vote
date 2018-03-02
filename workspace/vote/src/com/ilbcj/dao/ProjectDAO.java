package com.ilbcj.dao;

import java.util.List;

import com.ilbcj.model.AvoidUnit;
import com.ilbcj.model.Project;

public interface ProjectDAO {
	//project
	public Project AddProject(Project expert) throws Exception;
	public List<Project> GetProjects(Project criteria, int start, int length) throws Exception;
	public long QueryProjectsCount(Project criteria)throws Exception;
	public Project GetProjectById(int id) throws Exception;
	public void DelProject(Project target) throws Exception;
	
	//avoid unit
	public List<AvoidUnit> GetAvoidUnits(int start, int length) throws Exception;
	public long QueryAvoidUnitCount() throws Exception;
	public AvoidUnit AddAvoidUnit(AvoidUnit au) throws Exception;
	public AvoidUnit GetAvoidUnitByUnitid(int unitId) throws Exception;
	public void DelAvoidUnit(AvoidUnit target) throws Exception;
}
