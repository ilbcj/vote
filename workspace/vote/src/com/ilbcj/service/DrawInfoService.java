package com.ilbcj.service;

import java.util.List;

import com.ilbcj.dao.DrawDAO;
import com.ilbcj.dao.impl.DrawDAOImpl;
import com.ilbcj.model.Choose;
import com.ilbcj.model.Expert;
import com.ilbcj.model.Project;

public class DrawInfoService {
	public static final int DRAW_RESULT_UNKNOW = -2;
	public static final int DRAW_RESULT_ALREADY_DRAWN = -1;
	public static final int DRAW_RESULT_FINISH = 0;

	//according to projectId, get expert_count and choosen experts, caculate whether we need to draw expert
	//msg contains infomation return to UI
	//result is errorcode when its smaller than 0, and it's remain_expert_count when its bigger than 0
	public int DrawExpert(int projectId, StringBuffer msg) throws Exception {
		ProjectInfoService ps = new ProjectInfoService();
		Project project = ps.QueryProjectById(projectId);
		if(project.getStatus() == Project.STATUS_DRAWN) {
			msg.append("此项目已完成专家抽取操作，不能重复抽取。");
			return DRAW_RESULT_ALREADY_DRAWN;
		}
		
		DrawDAO ddao = new DrawDAOImpl();
		int chosenCount = ddao.GetChosenExpertCountByProjectId(project.getId(), Choose.STATUS_CONFIRM_YES);
		
		if( project.getExpertCount() > chosenCount ) {
			//draw one expert
			boolean isSuccess = drawOneExpert(project, msg);
			int remain = project.getExpertCount() - chosenCount;
			if(isSuccess) {
				msg.append("抽取\n成功");
				remain -= 1;
			}
			else {
				msg.append("抽取\n失败");
			}
			if(remain == 0) {
				ps.UpdateProjectStatus(project.getId(), Project.STATUS_DRAWN);
				msg.append("邀请专家操作完成。");
			}
			return remain;
		}
		else {
			//expert_count <= chosenCount
			ps.UpdateProjectStatus(project.getId(), Project.STATUS_DRAWN);
			msg.append("邀请专家操作完成。");
			return DRAW_RESULT_FINISH;
		}
	}

	private boolean drawOneExpert(Project project, StringBuffer msg) throws Exception {
		//1. get expert without avoid unit
		DrawDAO ddao = new DrawDAOImpl();
		List<Expert> experts = ddao.GetExpertWithoutAvoidUnit();
		
		//2. generate random score for everyone
		
		return false;
	}
}
