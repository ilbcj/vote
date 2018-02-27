package com.ilbcj.service;

import java.util.List;

import com.ilbcj.dao.MajorDAO;
import com.ilbcj.dao.impl.MajorDAOImpl;
import com.ilbcj.model.MajorType;

public class MajorInfoService {

	public List<MajorType> QueryAllMajorTypes() throws Exception {
		MajorDAO dao = new MajorDAOImpl();
		List<MajorType> majors = dao.GetAllMajorTypes();
		return majors;
	}
	
}
