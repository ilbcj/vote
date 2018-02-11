package com.ilbcj.model;

public class Config {
	public final static String NAME_SYSTEMSTATUS = "SystemStatus";//5
	
	private int id;
	private String name;
	private String sval;
	private int ival;
	
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
	public String getSval() {
		return sval;
	}
	public void setSval(String sval) {
		this.sval = sval;
	}
	public int getIval() {
		return ival;
	}
	public void setIval(int ival) {
		this.ival = ival;
	}
}


