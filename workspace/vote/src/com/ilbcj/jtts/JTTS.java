package com.ilbcj.jtts;

/**
 * Copyright 2008 - 2009
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 * @project loonframework
 * @author chenpeng
 * @email：ceponline@yahoo.com.cn
 * @version 0.1
 */
public interface JTTS {

	/**
	 * 设定Voice对象的角色与年龄（改变朗读效果）
	 * 
	 * @param gender
	 * @param age
	 */
	public abstract void setVoice(int gender, int age);

	/**
	 * 设定朗读速度
	 * 
	 * @param value
	 */
	public abstract void setRate(int value);

	/**
	 * 设定朗读间隔
	 * 
	 * @param value
	 * @return
	 */
	public abstract void setWordgap(int value);

	/**
	 * 设定大小写方式
	 * 
	 * @param value
	 * @return
	 */
	public abstract void setCapitals(int value);

	/**
	 * 设定音量参数
	 * 
	 * @param value
	 */
	public abstract void setVolume(int value);

	/**
	 * 设定混音参数
	 * 
	 * @param value
	 */
	public abstract void setPitch(int value);

	/**
	 * 中止TTS运行
	 * 
	 */
	public abstract void terminate();

	/**
	 * 自动朗读指定的字符串信息
	 * 
	 * @param text
	 */
	public abstract void speak(String text);

	/**
	 * 返回voice名称列表
	 * 
	 * @return
	 */
	public abstract String[] listVoiceNames();

	/**
	 * 设定当前语法规范
	 * 
	 * @param lanuage
	 */
	public abstract void setLanguage(String lanuage);

	/**
	 * 停止当前朗读
	 * 
	 */
	public abstract void cancel();

	/**
	 * 检查当前朗读是否已经完成
	 * 
	 * @return
	 */
	public abstract boolean isPlaying();

	/**
	 * 当所有线程朗读完毕时转为此线程发言
	 * 
	 */
	public abstract void synchronize();

	/**
	 * 返回当前版本信息
	 * 
	 * @return
	 */
	public abstract String getInfo();

}
