package com.ilbcj.service;

import java.util.List;

import com.ilbcj.dao.ExpertDAO;
import com.ilbcj.dao.impl.ExpertDAOImpl;
import com.ilbcj.model.Expert;

public class ExpertInfoService {
	public long QueryPlayer(String name, int unitId, String city, int start, int length, List<Expert> experts) throws Exception {
		ExpertDAO dao = new ExpertDAOImpl();
		Expert criteria = new Expert();
		criteria.setName(name);
		criteria.setUnitId(unitId);
		criteria.setCity(city);
		criteria.setStatus(Expert.STATUS_USING);
		List<Expert> tmp = dao.GetExperts(criteria, start, length);
		experts.addAll(tmp);
		
		long count = 0;
		count = dao.QueryExpertsCount(criteria);
		return count;
	}
}
