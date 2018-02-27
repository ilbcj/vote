package com.ilbcj.service;

import java.util.List;

import com.ilbcj.dao.UnitDAO;
import com.ilbcj.dao.impl.UnitDAOImpl;
import com.ilbcj.model.Unit;

public class UnitInfoService {

	public List<Unit> QueryAllUnits() throws Exception {
		UnitDAO dao = new UnitDAOImpl();
		List<Unit> units = dao.GetAllUnits();
		return units;
	}
	
}
