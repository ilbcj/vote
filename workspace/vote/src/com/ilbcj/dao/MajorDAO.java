package com.ilbcj.dao;

import java.util.List;

import com.ilbcj.model.ExpertMajorType;
import com.ilbcj.model.MajorType;
import com.ilbcj.model.ProjectMajorType;


public interface MajorDAO {
	//MajorType
	public List<MajorType> GetAllMajorTypes() throws Exception;
	
	//ExpertMajorType
	public ExpertMajorType AddExpertMajorType(ExpertMajorType emt) throws Exception;
	public List<ExpertMajorType> GetExpertMajorTypeByExpertid(int id) throws Exception;

	//ProjectMajorType
	public ProjectMajorType AddProjectMajorType(ProjectMajorType pmt) throws Exception;
	public List<ProjectMajorType> GetProjectMajorTypeByProjectid(int id) throws Exception;		
}
