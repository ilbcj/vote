package com.ilbcj.controller;

import java.util.List;

import com.ilbcj.model.MajorType;
import com.ilbcj.service.MajorInfoService;
import com.opensymphony.xwork2.ActionSupport;

public class MajorInfoAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5946776012856292809L;
	
	private String message;
	private boolean result;
	private List<MajorType> majors;
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public boolean isResult() {
		return result;
	}
	public void setResult(boolean result) {
		this.result = result;
	}
	public List<MajorType> getMajors() {
		return majors;
	}
	public void setMajors(List<MajorType> majors) {
		this.majors = majors;
	}

	public String QueryMajorTypes() {
		try {
			MajorInfoService service = new MajorInfoService();
			majors = service.QueryAllMajorTypes();
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
}
