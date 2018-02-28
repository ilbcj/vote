package com.ilbcj.dao;

import java.util.List;

import com.ilbcj.model.ExpertMajorType;
import com.ilbcj.model.MajorType;


public interface MajorDAO {
	//MajorType
	public List<MajorType> GetAllMajorTypes() throws Exception;
	
	//ExpertMajorType
	public ExpertMajorType AddExpertMajorType(ExpertMajorType emt) throws Exception;
	public List<ExpertMajorType> GetExpertMajorTypeByExpertid(int id) throws Exception;		
}
