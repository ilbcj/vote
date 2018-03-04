package com.ilbcj.dao;

import java.util.List;

import com.ilbcj.model.Expert;


public interface DrawDAO {
	// all noticed, and confirm success expert's count
	public int GetChosenExpertCountByProjectId(int projectId, int status) throws Exception;

	public List<Expert> GetExpertWithoutAvoidUnit() throws Exception;

	//public List<Choose> GetChosenExpertByProjectId(int id) throws Exception;
}
