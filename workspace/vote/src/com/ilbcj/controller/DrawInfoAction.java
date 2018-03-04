package com.ilbcj.controller;

import com.ilbcj.service.DrawInfoService;
import com.opensymphony.xwork2.ActionSupport;

public class DrawInfoAction extends ActionSupport {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -121447026347772364L;
	private boolean result;
	private String message;
	
	private int projectId;
	private int remain;
	private boolean hasFile;
	
	
	public boolean isHasFile() {
		return hasFile;
	}
	public void setHasFile(boolean hasFile) {
		this.hasFile = hasFile;
	}
	public int getRemain() {
		return remain;
	}
	public void setRemain(int remain) {
		this.remain = remain;
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
	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}


	public String DrawExpert() {
		try {
			if( projectId == 0 ) {
				throw new Exception("未指定需要抽取专家的项目");
			}
			DrawInfoService service = new DrawInfoService();
			StringBuffer msg = new StringBuffer();
			remain = service.DrawExpert(projectId, msg);
			message = msg.toString();
			
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
	
}
