package com.ilbcj.controller;

import java.util.ArrayList;
import java.util.List;

//import com.ilbcj.dto.PlayerDetail;
import com.ilbcj.model.Project;
import com.ilbcj.model.ProjectMajorType;
import com.ilbcj.service.ProjectInfoService;
import com.ilbcj.service.MajorInfoService;
import com.opensymphony.xwork2.ActionSupport;

public class ProjectInfoAction extends ActionSupport {

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
	private String sn;
	private List<Project> items;
	
	private int projectId;
	private List<ProjectMajorType> pmts;
	private Project project;
	private List<Integer> delIds;
	
//	private int id;
//	private ExpertDetail detail;
	
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

	public String getSn() {
		return sn;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}

	public List<Project> getItems() {
		return items;
	}

	public void setItems(List<Project> items) {
		this.items = items;
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public List<ProjectMajorType> getPmts() {
		return pmts;
	}

	public void setPmts(List<ProjectMajorType> pmts) {
		this.pmts = pmts;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public List<Integer> getDelIds() {
		return delIds;
	}

	public void setDelIds(List<Integer> delIds) {
		this.delIds = delIds;
	}

	public String QueryProjects() {
		try {
			ProjectInfoService service = new ProjectInfoService();
			items = new ArrayList<Project>();
			recordsTotal = service.QueryProject( name, sn, start, length, items );
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
	
	public String QueryProjectMajorTypes() {
		try {
			MajorInfoService service = new MajorInfoService();
			pmts = service.QueryProjectMajorTypeByProjectid(projectId);
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
	
	public String SaveProject() {
		try {
			if(project == null) 
				throw new Exception("项目数据错误，无法保存。");
			if(project.getSn() == null || project.getSn().length() == 0) 
				throw new Exception("项目编号不能为空");
			if(project.getName() == null || project.getName().length() == 0) 
				throw new Exception("项目名称不能为空");
			if(project.getBidAddress() == null || project.getBidAddress().length() == 0) 
				throw new Exception("评标地点不能为空");
			if(project.getGatheringAddress() == null || project.getGatheringAddress().length() == 0) 
				throw new Exception("集合地点不能为空");
			if(project.getBidUnit() == null || project.getBidUnit().length() == 0) 
				throw new Exception("招标单位不能为空");
			if(project.getSuperviseUnit() == null || project.getSuperviseUnit().length() == 0) 
				throw new Exception("监督部门不能为空");
			if(project.getProxyOrg() == null || project.getProxyOrg().length() == 0) 
				throw new Exception("代理机构不能为空");
			if(project.getExpertCount() == 0) 
				throw new Exception("抽取专家人数未指定");
			if(project.getBidTime() == null || project.getBidTime().length() == 0) 
				throw new Exception("评标时间不能为空");
			ProjectInfoService service = new ProjectInfoService();
			service.SaveProject(project);
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
	
	public String SaveProjectMemo() {
		try {
			if(project == null) 
				throw new Exception("项目数据错误，无法保存。");
			if(project.getId() == 0) 
				throw new Exception("项目信息不存在。");

			ProjectInfoService service = new ProjectInfoService();
			service.SaveProjectMemo(project.getId(), project.getMemo());
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
	
	
	public String DeleteProjects() {
		try {
			if(delIds == null) 
				throw new Exception("没有指定要删除的项目。");
			ProjectInfoService service = new ProjectInfoService();
			service.DeleteProjects(delIds);
		} catch (Exception e) {
			message = e.getMessage();
			setResult(false);
			return SUCCESS;
		}
		setResult(true);
		return SUCCESS;
	}
	
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
