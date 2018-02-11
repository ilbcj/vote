package com.ilbcj.dto;

public class ConfigInfo implements Cloneable {
	public static final int SYSTEM_STATUS_INIT = 0;
	public static final int SYSTEM_STATUS_USE = 1;
	
	private int systemStatus;// = 5;
	
	public ConfigInfo() {
		
	}
	
	public ConfigInfo(ConfigInfo ci) {
		this.systemStatus = ci.getSystemStatus();
	}
	
	public int getSystemStatus() {
		return systemStatus;
	}

	public void setSystemStatus(int systemStatus) {
		this.systemStatus = systemStatus;
	}

	// Copy data
	@Override
    public Object clone()  {
        try {
            return super.clone();
        }
        catch (CloneNotSupportedException e){
            return new ConfigInfo(this);
        }
    }
}
