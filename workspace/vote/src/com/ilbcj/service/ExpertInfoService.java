package com.ilbcj.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ilbcj.dao.ExpertDAO;
import com.ilbcj.dao.UnitDAO;
import com.ilbcj.dao.impl.ExpertDAOImpl;
import com.ilbcj.dao.impl.UnitDAOImpl;
import com.ilbcj.model.Expert;
import com.ilbcj.model.Unit;

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
		
		convertExpertData(experts);
		
		long count = 0;
		count = dao.QueryExpertsCount(criteria);
		return count;
	}
	
	private void convertExpertData(List<Expert> experts) throws Exception {
		UnitDAO udao = new UnitDAOImpl();
		List<Unit> units = udao.GetAllUnits();
		Map<Integer, Unit> unitMap = new HashMap<Integer, Unit>();
		for(Unit unit : units) {
			unitMap.put(unit.getId(), unit);
		}
		for(Expert expert:experts) {
			Unit u = unitMap.get(expert.getUnitId());
			if(u != null) {
				expert.setUnit(u.getName());
			}
		}
		return;
	}
}
