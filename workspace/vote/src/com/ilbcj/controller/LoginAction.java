package com.ilbcj.controller;

import com.ilbcj.service.AuthService;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport {
	public static final String PWDTOKEN = "pwd_token";
	/**
	 * 
	 */
	private static final long serialVersionUID = 5189976732530861209L;
	private String loginid;
	private String pwd;
	private String newPwd;
	private String message;
	private String adminname;
	private String random;
	private boolean result;
	
	public String getNewPwd() {
		return newPwd;
	}

	public void setNewPwd(String newPwd) {
		this.newPwd = newPwd;
	}

	public String getRandom() {
		return random;
	}

	public void setRandom(String random) {
		this.random = random;
	}

	public String getAdminname() {
		return adminname;
	}

	public void setAdminname(String adminname) {
		this.adminname = adminname;
	}

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

	public String getLoginid() {
		return loginid;
	}

	public void setLoginid(String loginid) {
		this.loginid = loginid;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String Loginpwd() throws Exception
	{
		ActionContext ctx = ActionContext.getContext();
		String randFromSession = (String)ctx.getSession().get("auth.random");
		if(randFromSession == null || !randFromSession.equals(this.random))
		{
			message = "登录信息不正确，请重新打开浏览器！";
			return ERROR;
		}
		AuthService as = new AuthService();
		if(!as.CheckStatus(loginid))
		{
			message = "管理员不存在或已被锁定，登录失败！";
			return ERROR;
		}
		if( as.LoginPwdService(loginid, pwd) )
		{
			ctx.getSession().put(PWDTOKEN, loginid);
		}
		else
		{
			message = "信息不正确，登录失败！";
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String ChangePwd() throws Exception
	{
		try {
			AuthService as = new AuthService();
			ActionContext ctx = ActionContext.getContext();
			String sessionLoginId = (String) ctx.getSession().get(PWDTOKEN);
			
			if( sessionLoginId == null ) {
				throw new Exception("用户登录session信息有误。[服务端没有找到登录ID]！");
			}
			
			as.ChangePwd(sessionLoginId, pwd, newPwd);
		}
		catch(Exception e) {
			message = e.getMessage();
			return SUCCESS;
		}
		this.setResult(true);
		return SUCCESS;
	}
	
	public String Jump()
	{
//		ConfigHelper.getInstance();
		return SUCCESS;
	}
	
	public String QueryAdminInfo()
	{
		ActionContext ctx = ActionContext.getContext();
		adminname = (String) ctx.getSession().get("admin");
		this.setResult(true);
		return SUCCESS;
	}
	
	public String Logout()
	{
		ActionContext ctx = ActionContext.getContext();
		ctx.getSession().put("admin", null);
		this.setResult(true);
		return SUCCESS;
	}
}
