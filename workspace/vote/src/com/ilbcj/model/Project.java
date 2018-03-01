package com.ilbcj.model;

public class Project {
	public static final int STATUS_NEW = 1;
	public static final int STATUS_DRAWN = 2;
	
	private int id;
	private String name;
	private String sn;
	private String bidAddress;
	private String gatheringAddress;
	private String bidUnit;
	private String superviseUnit;
	private String proxyOrg;
	private int expertCount;
	private String chooseTime;
	private String bidTime;
	private String chooseUser;
	private String superviseUser;
	private String staff;
	private String operator;
	private String memo;
	private int status;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSn() {
		return sn;
	}
	public void setSn(String sn) {
		this.sn = sn;
	}
	public String getBidAddress() {
		return bidAddress;
	}
	public void setBidAddress(String bidAddress) {
		this.bidAddress = bidAddress;
	}
	public String getGatheringAddress() {
		return gatheringAddress;
	}
	public void setGatheringAddress(String gatheringAddress) {
		this.gatheringAddress = gatheringAddress;
	}
	public String getBidUnit() {
		return bidUnit;
	}
	public void setBidUnit(String bidUnit) {
		this.bidUnit = bidUnit;
	}
	public String getSuperviseUnit() {
		return superviseUnit;
	}
	public void setSuperviseUnit(String superviseUnit) {
		this.superviseUnit = superviseUnit;
	}
	public String getProxyOrg() {
		return proxyOrg;
	}
	public void setProxyOrg(String proxyOrg) {
		this.proxyOrg = proxyOrg;
	}
	public int getExpertCount() {
		return expertCount;
	}
	public void setExpertCount(int expertCount) {
		this.expertCount = expertCount;
	}
	public String getChooseTime() {
		return chooseTime;
	}
	public void setChooseTime(String chooseTime) {
		this.chooseTime = chooseTime;
	}
	public String getBidTime() {
		return bidTime;
	}
	public void setBidTime(String bidTime) {
		this.bidTime = bidTime;
	}
	public String getChooseUser() {
		return chooseUser;
	}
	public void setChooseUser(String chooseUser) {
		this.chooseUser = chooseUser;
	}
	public String getSuperviseUser() {
		return superviseUser;
	}
	public void setSuperviseUser(String superviseUser) {
		this.superviseUser = superviseUser;
	}
	public String getStaff() {
		return staff;
	}
	public void setStaff(String staff) {
		this.staff = staff;
	}
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
}
