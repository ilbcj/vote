package com.ilbcj.controller;

import com.ilbcj.service.ConfigInfoService;
import com.opensymphony.xwork2.ActionSupport;

public class ConfigInfoAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7353801153045381483L;
	
	private boolean result;
	private String message;
	
	private int draw;
	private long recordsTotal;
	
	private long recordsFiltered;
	private int start;
	private int length;
	
	private String pmts;
	

	public boolean isResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getDraw() {
		return draw;
	}

	public void setDraw(int draw) {
		this.draw = draw;
	}

	public long getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(long recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public long getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(long recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public String getPmts() {
		return pmts;
	}

	public void setPmts(String pmts) {
		this.pmts = pmts;
	}
	

	public String QueryProjectMajorTypes() {
		try {
			ConfigInfoService service = new ConfigInfoService();
			pmts = service.QueryProjectMajorTypes();
			
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
	
	public String SaveProjectMajorTypes() {
		try {
			ConfigInfoService service = new ConfigInfoService();
			service.SaveProjectMajorTypes(pmts);
			
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
}
