package com.ilbcj.dao;

import java.util.List;

import com.ilbcj.model.Project;

public interface ProjectDAO {
	//project
	public Project AddProject(Project expert) throws Exception;
	public List<Project> GetProjects(Project criteria, int start, int length) throws Exception;
	public long QueryProjectsCount(Project criteria)throws Exception;
	public Project GetProjectById(int id) throws Exception;	
}
