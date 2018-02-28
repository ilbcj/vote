package com.ilbcj.controller;

import java.util.ArrayList;
import java.util.List;

//import com.ilbcj.dto.PlayerDetail;
import com.ilbcj.model.Expert;
import com.ilbcj.model.ExpertMajorType;
import com.ilbcj.service.ExpertInfoService;
import com.ilbcj.service.MajorInfoService;
import com.opensymphony.xwork2.ActionSupport;

public class ExpertInfoAction extends ActionSupport {

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
	
	private String name;
	private int unitId;
	private String city;
	private List<Expert> items;
	
	private int expertId;
	private List<ExpertMajorType> emts;
	private Expert expert;
//	private List<Integer> delIds;
//	
//	private int id;
//	private ExpertDetail detail;
	
	public boolean isResult() {
		return result;
	}
	public List<ExpertMajorType> getEmts() {
		return emts;
	}
	public void setEmts(List<ExpertMajorType> emts) {
		this.emts = emts;
	}
	public int getExpertId() {
		return expertId;
	}
	public void setExpertId(int expertId) {
		this.expertId = expertId;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCity() {
		return city;
	}
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public List<Expert> getItems() {
		return items;
	}
	public void setItems(List<Expert> items) {
		this.items = items;
	}
	public Expert getExpert() {
		return expert;
	}
	public void setExpert(Expert expert) {
		this.expert = expert;
	}
	
	public String QueryExperts() {
		try {
			ExpertInfoService service = new ExpertInfoService();
			items = new ArrayList<Expert>();
			recordsTotal = service.QueryPlayer( name, unitId, city, start, length, items );
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
	
	public String QueryExpertMajorTypes() {
		try {
			MajorInfoService service = new MajorInfoService();
			emts = service.QueryExpertMajorTypeByExpertid(expertId);
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
	
//	public String SavePlayer() {
//		try {
//			if(player == null) 
//				throw new Exception("选手数据错误，无法保存。");
//			if(player.getLoginId() == null || player.getLoginId().length() == 0) 
//				throw new Exception("选手账号不能为空");
//			if(player.getPwd() == null || player.getPwd().length() == 0) 
//				throw new Exception("选手口令不能为空");
//			PlayerInfoService service = new PlayerInfoService();
//			service.SavePlayer(player);
//		} catch (Exception e) {
//			message = e.getMessage();
//			setResult(false);
//			return SUCCESS;
//		}
//		setResult(true);
//		return SUCCESS;
//	}
//	
//	public String DeletePlayer() {
//		try {
//			if(delIds == null) 
//				throw new Exception("没有指定要删除的选手。");
//			PlayerInfoService service = new PlayerInfoService();
//			service.DeletePlayers(delIds);
//		} catch (Exception e) {
//			message = e.getMessage();
//			setResult(false);
//			return SUCCESS;
//		}
//		setResult(true);
//		return SUCCESS;
//	}
//	
//	public String QueryPlayerDetail() {
//		try {
//			PlayerInfoService service = new PlayerInfoService();
//			detail = service.QueryPlayerDetailInfo(id);
//		} catch (Exception e) {
//			message = e.getMessage();
//			setResult(false);
//			return SUCCESS;
//		}
//		setResult(true);
//		return SUCCESS;
//	}
//	
//	public String TestInitPlayers() {
//		try {
//			PlayerInfoService service = new PlayerInfoService();
//			service.TestInitPlayers();
//		} catch (Exception e) {
//			message = e.getMessage();
//			setResult(false);
//			return SUCCESS;
//		}
//		setResult(true);
//		return SUCCESS;
//	}
}
