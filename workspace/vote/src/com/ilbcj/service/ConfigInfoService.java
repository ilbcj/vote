package com.ilbcj.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ilbcj.dao.ConfigDAO;
import com.ilbcj.dao.impl.ConfigDAOImpl;
import com.ilbcj.dto.ConfigInfo;
import com.ilbcj.model.Config;
import com.ilbcj.util.ConfigUtil;

public class ConfigInfoService {

	public ConfigInfo QuerySystemConfigInfo() throws Exception {
		ConfigDAO dao = new ConfigDAOImpl();
		List<Config> items = dao.GetAllConfigItems();
		if(items == null || items.size() == 0) {
			initSysconfig();
			items = dao.GetAllConfigItems();
			if(items == null || items.size() == 0) {
				throw new Exception("system config error.");
			}
		}
		
		Map<String, Config> itemsMap = new HashMap<String, Config>();
		
		Config item = null;
		for(int i = 0; i < items.size(); i++) {
			item = items.get(i);
			itemsMap.put(item.getName(), item);
		}
		
		ConfigInfo info = new ConfigInfo();
		
		item = itemsMap.get(Config.NAME_SYSTEMSTATUS);
		if(item != null) {
			info.setSystemStatus(item.getIval());
		}
		
		return info;
	}

	private void initSysconfig() throws Exception {
		ConfigInfo config = new ConfigInfo();
		config.setSystemStatus(ConfigInfo.SYSTEM_STATUS_INIT);
		SaveSystemConfigInfo(config);
		return;
	}

	public void SaveSystemConfigInfo(ConfigInfo config) throws Exception {
		ConfigDAO dao = new ConfigDAOImpl();
		Config configItem = null;
		
		configItem = new Config();
		configItem.setName(Config.NAME_SYSTEMSTATUS);
		configItem.setIval(config.getSystemStatus());
		dao.SaveConfigItem(configItem);
		
		ConfigUtil.UpdateConfig(config);
	}

}
