package com.ilbcj.controller;

import java.util.List;

import com.ilbcj.model.Unit;
import com.ilbcj.service.UnitInfoService;
import com.opensymphony.xwork2.ActionSupport;

public class UnitInfoAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5946776012856292809L;
	
	private String message;
	private boolean result;
	private List<Unit> units;
	
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
	public List<Unit> getUnits() {
		return units;
	}
	public void setUnits(List<Unit> units) {
		this.units = units;
	}
	
	public String QueryUnits() {
		try {
			UnitInfoService service = new UnitInfoService();
			units = service.QueryAllUnits();
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
}
