package com.ilbcj.model;

public class Choose {
	public static final int STATUS_UNCONFIRM = 0;
	public static final int STATUS_CONFIRM_YES = 1;
	public static final int STATUS_CONFIRM_NO = 2;
	
	private int id;
	private int status;
	private int noticeWay;
	private int projectId;
	private int expertId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getNoticeWay() {
		return noticeWay;
	}
	public void setNoticeWay(int noticeWay) {
		this.noticeWay = noticeWay;
	}
	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public int getExpertId() {
		return expertId;
	}
	public void setExpertId(int expertId) {
		this.expertId = expertId;
	}
}
