package com.ilbcj.controller;

import java.util.ArrayList;
import java.util.List;

//import com.ilbcj.dto.PlayerDetail;
import com.ilbcj.model.AvoidUnit;
import com.ilbcj.service.ProjectInfoService;
import com.opensymphony.xwork2.ActionSupport;

public class AvoidUnitInfoAction extends ActionSupport {

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
	
	private int avoidId;
	
	public int getAvoidId() {
		return avoidId;
	}

	public void setAvoidId(int avoidId) {
		this.avoidId = avoidId;
	}

	private List<AvoidUnit> aus;
	private AvoidUnit au;
	
	public AvoidUnit getAu() {
		return au;
	}

	public void setAu(AvoidUnit au) {
		this.au = au;
	}

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

	public List<AvoidUnit> getAus() {
		return aus;
	}

	public void setAus(List<AvoidUnit> aus) {
		this.aus = aus;
	}

	
	public String QueryAvoidUnits() {
		try {
			ProjectInfoService service = new ProjectInfoService();
			aus = new ArrayList<AvoidUnit>();
			recordsTotal = service.QueryAvoidUnits( start, length, aus );
			recordsFiltered = recordsTotal;
			draw = draw + 1;
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
	
	public String SaveAvoidUnit() {
		try {
			if(au.getUnitId() == 0 || "0".equals( au.getReason() ) ) {
				throw new Exception("未指定正确的回避单位信息");
			}
			ProjectInfoService service = new ProjectInfoService();
			service.SaveAvoidUnit( au );
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
	
	public String DelAvoidUnit() {
		try {
			if( avoidId != 0 ) {
				ProjectInfoService service = new ProjectInfoService();
				service.DelAvoidUnitById( avoidId );
			}
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
}
