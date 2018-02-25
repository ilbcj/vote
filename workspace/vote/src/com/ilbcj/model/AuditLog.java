package com.ilbcj.model;

public class AuditLog {
	private int id;
	private int operatorId;
	private String operatorName;
	private String operatorTime;
	private int type;
	private String memo;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(int operatorId) {
		this.operatorId = operatorId;
	}
	public String getOperatorName() {
		return operatorName;
	}
	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}
	public String getOperatorTime() {
		return operatorTime;
	}
	public void setOperatorTime(String operatorTime) {
		this.operatorTime = operatorTime;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
}
