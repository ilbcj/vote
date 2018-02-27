package com.ilbcj.dao;

import java.util.List;

import com.ilbcj.model.Expert;

public interface ExpertDAO {
	//expert
	public Expert AddExpert(Expert expert) throws Exception;
	public List<Expert> GetExperts(Expert criteria, int start, int length) throws Exception;
	public long QueryExpertsCount(Expert criteria)throws Exception;
	public Expert GetExpertById(int id) throws Exception;
}
