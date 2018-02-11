package com.ilbcj.dao;

import java.util.List;

import com.ilbcj.model.Config;

public interface ConfigDAO {
	public List<Config> GetAllConfigItems() throws Exception;
	public Config SaveConfigItem(Config configItem) throws Exception;
}
