/*! ILBCJ main.js
 * ================
 * Main JS application file for ILBCJ v1. This file
 * should be included in the main page. It controls some layout
 * options and data exchange with server.
 *
 * @Author  ilbcj Studio
 * @Support <http://www.ilbcj.com>
 * @Email   <22833638@qq.com>
 * @version 1.0.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */

//Make sure jQuery has been loaded before main.js
if (typeof jQuery === 'undefined') {
	throw new Error('ILBCJ requires jQuery');
}

///*! global function
// * 
// *  @type function
// *  @usage $.message
// */
//(function ($) {
//  'use strict';
//
//  $.fn.tipMessage = function (message) { 
//		$('#successAndFail_message').empty().append(message);
//		$('#successAndFail_Modal').modal('show');
//		var modalTimeOutId = setTimeout(function(){$('#successAndFail_Modal').modal('hide');},2000);
//		console.log( 'timerId: ' +  modalTimeOutId);
//		$('#successAndFail_Modal').on('hidden.bs.modal', function (e) {
//			clearTimeout(modalTimeOutId);
//		});
//	};
//}(jQuery));


/* ILBCJ
 *
 * @type Object
 * @description $.ILBCJ is the main object for the app.
 *              It's used for implementing functions and options related
 *              to the ILBCJ. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.ILBCJ = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.ILBCJ.options = {
	basePath: 'ILBCJdemo'
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements ILBCJ's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
	'use strict';

	//Extend options if external options exist
	if (typeof ILBCJOptions !== 'undefined') {
		$.extend(true, $.ILBCJ.options, ILBCJOptions);
	}

	//Easy access to options
	var o = $.ILBCJ.options;
//	console.log(o.basePath);
	//Set up the object
	_initILBCJ(o);

	//Update table style
	$.extend( true, $.fn.dataTable.defaults, {
		searching: true,
		ordering: false,
		select: 'single',
		pagingType: 'full_numbers',
		dom: 'tr<"row"<"col-xs-2"l><"col-xs-7 text-center"p><"col-xs-3 text-right"i>>',
		bAutoWidth: false,
		lengthMenu: [[1, 10, 25, 50, 100], [1, 10, 25, 50, 100]],
		language: {
			url: o.basePath + '/plugins/datatables/table_label.json'
		},
		drawCallback: function( settings ) {
			//var active_class = 'success';
			var active_class = 'active';
				
			var $th_checkbox = $('table.table > thead > tr > th input[type=checkbox]');
			$th_checkbox.iCheck('uncheck').iCheck('destroy'); 
			$th_checkbox.on('ifClicked', function(){
				var th_checked = !this.checked;//checkbox inside "TH" table header , the value getted equals with the status before clicked
				//alert(th_checked);
				$(this).closest('table').find('tbody > tr').each(function(){
					var row = this;
					if(th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).iCheck('check');//.prop('checked', true);
					else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).iCheck('uncheck');//.prop('checked', false);
				});
			});
			
			//select/deselect a row when the checkbox is checked/unchecked
			$('table.table').on('ifToggled', 'tbody > tr > td input[type=checkbox]' , function(){
				//alert(this.checked);
				var $row = $(this).closest('tr');
				if(this.checked) $row.addClass(active_class);
				else $row.removeClass(active_class);
			
				var th_checked2 = true;
				$(this).closest('table').find('tbody > tr > td input[type=checkbox]').each(function(){
					if( $(this).prop('checked') == false ) th_checked2 = false;
				});
				//alert(th_checked2);
				$(this).closest('table').find('th input[type=checkbox]').iCheck(th_checked2?'check':'uncheck');
			});
			
			$('table input').iCheck({
				checkboxClass: 'icheckbox_square-blue',
				radioClass: 'iradio_square-blue',
				increaseArea: '20%' // optional
		    });
		}
	});
	
	//update date.toLocaleString
	Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " + this.getHours() + "点" + this.getMinutes() + "分" + this.getSeconds() + "秒";
	};
	Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
	};
	
	//Active the main menu and custom menu
	$.ILBCJ.menu.activate();

});

function _refreshTime() {
	'use strict';
	
	var dateStr = "";
	var timeStr = "";
	
	var myDate = new Date();
	
	//year
	dateStr += myDate.getFullYear() + "年";
	//month
	dateStr += parseInt(myDate.getMonth()) + 1 + "月";
	//date
	dateStr += myDate.getDate();
	//week
	var Week = ['日','一','二','三','四','五','六'];  
    dateStr += ' 星期' + Week[myDate.getDay()];  
    
    //time
    timeStr += myDate.getHours() + ":";
    timeStr += myDate.getMinutes() + ":";
    timeStr += myDate.getSeconds() + ".";
    var milliseconds = myDate.getMilliseconds();
//    console.log(milliseconds);
    while( (""+milliseconds).length < 3) {
//    	console.log(milliseconds + "|||" + milliseconds.length);
    	milliseconds += '0';
    }
    timeStr += milliseconds;
    $("#showDate").html(dateStr);
    $("#showTime").html(timeStr);
//  console.log(dateStr);
//  console.log(timeStr);
}

/* ----------------------------------
 * - Initialize the ILBCJ Object -
 * ----------------------------------
 * All ILBCJ functions are implemented below.
 */
function _initILBCJ(o) {
	'use strict';
	/* Menu
	 * ======
	* Create main menu and custom menu
	*
	* @type Object
	* @usage $.ILBCJ.menu.activate()
	*/
	$.ILBCJ.menu = {
		activate: function () {
			//get admin info
			o.basePath && $.post(o.basePath + '/login/queryAdminInfo.action',function(data){
				$('span.user-info').html(data.adminname);
			});
			
			//add logoff event
			$('#logoff').on('click.ILBCJ.admin.off', function(e){
				o.basePath && $.post(o.basePath + '/login/logout.action', function(data){
					window.location = o.basePath;
				});
			});
		  
			//load main menu
			var menu = '<li class="header">控制台</li>';
			menu += '<li class="treeview">';
			menu += '<a href="javascript:void(0)"><i class="fa fa-gears"></i> <span>专家信息管理</span>';
            menu +=   '<span class="pull-right-container">';
            menu +=     '<i class="fa fa-angle-left pull-right"></i>';
            menu +=   '</span>';
            menu += '</a>';
            menu += '<ul class="treeview-menu">';
            menu +=   '<li><a id="menu_expert_maintain" href="javascript:void(0)"><i class="fa fa-circle-o"/>专家信息</a></li>';
            menu += '</ul>';
            menu += '</li>';
            
            menu += '<li class="treeview">';
			menu += '<a href="javascript:void(0)"><i class="fa fa-gears"></i> <span>项目信息管理</span>';
            menu +=   '<span class="pull-right-container">';
            menu +=     '<i class="fa fa-angle-left pull-right"></i>';
            menu +=   '</span>';
            menu += '</a>';
            menu += '<ul class="treeview-menu">';
            menu +=   '<li><a id="menu_project_maintain" href="javascript:void(0)"><i class="fa fa-circle-o"/>项目信息</a></li>';
            menu += '</ul>';
            menu += '</li>';
            
/*            menu += '<li class="treeview">';
			menu += '<a href="javascript:void(0)"><i class="fa fa-gears"></i> <span>数据模板管理</span>';
            menu +=   '<span class="pull-right-container">';
            menu +=     '<i class="fa fa-angle-left pull-right"></i>';
            menu +=   '</span>';
            menu += '</a>';
            menu += '<ul class="treeview-menu">';
            menu +=   '<li><a id="menu_battle_maintain" href="javascript:void(0)"><i class="fa fa-circle-o"/>模板信息</a></li>';
//            menu +=   '<li><a id="menu_device_maintain" href="javascript:void(0)"><i class="fa fa-circle-o"/>对阵信息</a></li>';
            menu += '</ul>';
            menu += '</li>';*/
            
            $('#mm').html(menu);
    		
    		$('#menu_expert_maintain').on('click.ILBCJ.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/expert/expert_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ILBCJ.checkLoad(response);$.ILBCJ.expert.activate();});
    		});
    		$('#menu_project_maintain').on('click.ILBCJ.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/project/project_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ILBCJ.checkLoad(response);$.ILBCJ.project.activate();});
    		});
/*    		$('#menu_round_maintain').on('click.ILBCJ.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/period/round_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ILBCJ.checkLoad(response);$.ILBCJ.round.activate();});
    		});
    		$('#menu_battle_maintain').on('click.ILBCJ.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/battle/battle_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ILBCJ.checkLoad(response);$.ILBCJ.match.activate();});
    		});
    		$('#menu_score_maintain').on('click.ILBCJ.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/score/score_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ILBCJ.checkLoad(response);$.ILBCJ.score.activate();});
    		});
    		$('#menu_config_maintain').on('click.ILBCJ.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/config/config_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ILBCJ.checkLoad(response);$.ILBCJ.config.activate();});
    		});*/
    		
    		$('#change_pwd').on('click.ilbcj.changepwd.data-api',function(e){
    			$('#oldPwd').val('');
    			$('#newPwd').val('');
    			$('#rePwd').val('');
    			$('#pwd_modal').modal('show');
    		});
    		$('#change_pwd_confirm').on('click.ilbcj.changepwd.confirm.data-api',function(e){
    			$("#progress_Modal").modal('show');
    			var oldPwd = $('#oldPwd').val();
    			var newPwd = $('#newPwd').val();
    			var rePwd = $('#rePwd').val();
    			if( newPwd == null || newPwd == '' || newPwd != rePwd ) {
    				$("#progress_Modal").modal('hide');
    				var message = "两次输入的新口令内容不一致！";
					$.ILBCJ.tipMessage(message, false);
					return;
    			}
    			var postData = '';
    			postData += 'pwd=' + oldPwd;
    			postData += '&newPwd=' + newPwd;
				o.basePath && $.post(o.basePath + "/login/changePwd.action", postData, function(retObj) {
					$("#progress_Modal").modal('hide');
					if(retObj.result == true) {
						var message = "修改口令成功！";
						$.ILBCJ.tipMessage(message);
					} else {
						var message = "修改口令操作失败！[" + retObj.message + "]";
						$.ILBCJ.tipMessage(message, false);
					}
				}, "json");
    		});
		}
	};// end of $.ILBCJ.menu
	
	/* expert
	* ======
	* expert infomation maintain page
	*
	* @type Object
	* @usage $.ILBCJ.expert.activate()
	* @usage $.ILBCJ.expert.addSeasonWindow()
	* @usage $.ILBCJ.expert.addSeasonConfirm()
	* @usage $.ILBCJ.expert.batchDelSeason()
	* @usage $.ILBCJ.expert.delSeason()
	* @usage $.ILBCJ.expert.delSeasonsConfirm()
	*/
	$.ILBCJ.expert = {
		activate: function () {
			o.basePath && $('#expert_main_table').DataTable( {
				ajax:{
					url: o.basePath + '/expert/queryExperts.action',
					data: function(d) {
						var name = $('#expert_query_name').val();
						var unitId = $('#expert_query_unit').val();
						var city = $('#expert_query_city').val();
				    	return $.extend( {}, d, {
			    			name: name,
			    			unitId: unitId,
			    			city: city
				    	});
					},
					type: 'POST',
					dataSrc: 'items'
				},
				processing: true,
				serverSide: true,
				columns: [
					{ data: '' },
					{ data: 'name' },
					{ data: 'idsn' },
					{ data: 'tel' },
					{ data: 'unit' },
					{ data: 'city' }
				],
				rowId: 'id',
				columnDefs: [
					{
						render: function ( data, type, row ) {
							return '<input type="checkbox" data-id="' + row.id + '" />';
						},
						targets: 0
					},
					{
						render: function ( data, type, row ) {
							var html = '<div class="btn-group">';
							html += '<button class="expert_info btn btn-xs btn-success" data-id="' + row.id + '"><i class="fa fa-edit"></i>详情</button>';
							//html += '<button class="expert_del btn btn-xs btn-danger" data-id="' + row.id + '"><i class="fa fa-trash-o"></i>删除</button>';
							html += '</div>';
							return html;
						},
						targets: 6
					}
				],
				createdRow: function ( row, data, index ) {
					$('td', row).eq(0).addClass('text-center');
				}
			});
			
			//listen page items' event
			$('#query_expert').on('click.ILBCJ.expert.query', $.ILBCJ.expert.queryExpert);
			$('#query_expert_reset').on('click.ILBCJ.expert.query', $.ILBCJ.expert.clearQueryExpertCondition);
			$('#add_expert').on('click.ILBCJ.expert.add', $.ILBCJ.expert.openExpertWindow);
			$('#expert_detail_modal_confirm').on('click.ILBCJ.expert.addconfirm', $.ILBCJ.expert.saveExpertConfirm);
			$('#del_experts').on('click.ILBCJ.expert.delete.batch', $.ILBCJ.expert.batchDelExpert);
			$('#expert_main_table').on( 'draw.dt', function () {
				$('.expert_info').on('click.ILBCJ.expert.detail', $.ILBCJ.expert.openExpertWindow);
				$('.expert_del').on('click.ILBCJ.expert.delete.single', $.ILBCJ.expert.delExpert);
			});
			$('#expert_info_modal_confirm').on('click.ILBCJ.expert.editexpertinfoconfirm', $.ILBCJ.expert.saveExpertConfirm);
			$('#expert_confirm_modal_confirm').on('click.ILBCJ.expert.delconfirm', $.ILBCJ.expert.delExpertConfirm);
			
			o.basePath && $.post(o.basePath + '/unit/queryUnits.action?rand=' + Math.random(), {}, function(retObj,textStatus, jqXHR) {
	    		if(retObj.result == true)
				{
					var unitOptionStr = '';
					retObj.units.forEach(function(unit, index){
						unitOptionStr += '<option value=' + unit.id + '>' + unit.name + '</option>';
					});
					$('#expert_query_unit').append(unitOptionStr);
					$('#expert_info_modal_unit').append(unitOptionStr);
				} else {
					var message = '加载单位信息失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
			
			$('[id^=major]').iCheck({
			    checkboxClass: 'icheckbox_square-blue margin',
				radioClass: 'iradio_square-blue margin'
			    //increaseArea: '20%' // optional
			});
		},
		queryExpert: function () {
			o.basePath && $('#expert_main_table').DataTable().ajax.reload();
		},
		clearQueryExpertCondition: function () {
			$('#expert_query_name').val('');
			$('#expert_query_unit').val(0);
			$('#expert_query_city').val('');
		},
		openExpertWindow: function () {
			var id = $(this).data('id');
			$('[id^=major]').iCheck('uncheck');
			if( typeof id === 'undefined' ) {
				$('#name').val('');
		    	$('#idsn').val('');
		    	$('#tel').val('');
		    	$('#city').val('');
		    	$('#expert_info_modal_unit').val(0);
		    	$('#expert_info_modal_confirm').data('expert_id', 0);
		    	$('#expert_info_modal').modal('show');
			}
			else {
				var rowData = $('#expert_main_table').DataTable().row( '#' + id ).data();
				$('#name').val(rowData.name);
		    	$('#idsn').val(rowData.idsn);
		    	$('#tel').val(rowData.tel);
		    	$('#city').val(rowData.city);
		    	$('#admission').val(rowData.admission);
		    	$('#expert_info_modal_unit').val(rowData.unitId);
				$('#expert_info_modal_confirm').data('expert_id', id);
				
				o.basePath && $.post(o.basePath + '/expert/queryExpertMajorTypes.action?rand=' + Math.random(), {expertId:id}, function(retObj,textStatus, jqXHR) {
		    		if(retObj.result == true)
					{
						var unitOptionStr = '';
						retObj.emts.forEach(function(emt, index){
							$('#major'+ emt.majorId).iCheck('check');
						});
					} else {
						var message = '加载专家可评标类别信息失败![' + retObj.message + ']';
						$.ILBCJ.tipMessage(message, false);
					}
					$('#expert_info_modal').modal('show');
				}, 'json');
			}
		},
		saveExpertConfirm: function () {
			var id = $('#expert_info_modal_confirm').data('expert_id');
			if(id === undefined) {
				id = 0;
			}
			var name = $('#name').val();
		    var idsn = $('#isdn').val();
		    var tel = $('#tel').val();
		    var city = $('#city').val();
		    
			var postData = 'expert.id=' + id;
			postData += '&expert.name=' + name;
			postData += '&expert.idsn=' + idsn;
			postData += '&expert.tel=' + tel;
			postData += '&expert.city=' + city;
	
			o.basePath && $.post(o.basePath + '/expert/saveExpert.action?rand=' + Math.random(), postData, function(retObj,textStatus, jqXHR) {
	    		if(retObj.result == true)
				{
					o.basePath && $('#expert_main_table').DataTable().ajax.reload();
					var message = '保存专家信息成功!';
					$.ILBCJ.tipMessage(message);
				} else {
					var message = '保存专家信息失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
		},
		batchDelExpert: function () {
			if( ($('#expert_main_table :checkbox:checked[data-id]').length == 0) ) { 
				var message = "请选择要删除的专家!";
				$.ILBCJ.tipMessage(message);
				return;
			} else {
				var delIds = '';
				$("#expert_main_table :checkbox").each(function(index,checkboxItem){
					if($(checkboxItem).prop('checked') && index != 0){
						delIds += "delIds=" + $(checkboxItem).attr('data-id') + "&";
					}
				});
				var message = '已经选取了' + $("#expert_main_table :checkbox:checked[data-id]").length + '条记录。是否要删除这些专家？';
				$('#expert_confirm_modal_message').empty().append(message);
				$('#expert_confirm_modal_confirm').data('delIds', delIds);
				$("#expert_confirm_modal").modal('show');
			}
		},
		delExpert: function () {
			var rowId = $(this).data('id');
			var delIds = 'delIds=' + rowId;
			var message = '是否要删除此位专家？';
			$('#expert_confirm_modal_message').empty().append(message);
			$('#expert_confirm_modal_confirm').data('delIds', delIds);
			$("#expert_confirm_modal").modal('show');
		},
		delExpertsConfirm: function () {
			var postData = '';
			postData = $('#expert_confirm_modal_confirm').data('delIds');
			o.basePath && $.post(o.basePath + '/expert/deleteExperts.action', postData, function(retObj) {
				if(retObj.result == true) {
					var message = '专家信息已删除';
					$.ILBCJ.tipMessage(message);
					$('#season_main_table').DataTable().ajax.reload();
				} else {
					var message = '删除专家信息操作失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
		}
	};// end of $.ILBCJ.expert
	
	/* project
	* ======
	* project infomation maintain page
	*
	* @type Object
	* @usage $.ILBCJ.project.activate()
	* @usage $.ILBCJ.project.addRoundWindow()
	* @usage $.ILBCJ.project.addRoundConfirm()
	* @usage $.ILBCJ.project.batchDelRound()
	* @usage $.ILBCJ.project.delRound()
	* @usage $.ILBCJ.project.delRoundsConfirm()
	*/
	$.ILBCJ.project = {
		activate: function () {
			//project_maintain_center_main_wapper
			o.basePath && $('#project_main_table').DataTable( {
				ajax:{
					url: o.basePath + '/project/queryProjects.action',
					data: function(d) {
						var name = $('#project_query_name').val();
						var sn = $('#project_query_sn').val();
						return $.extend( {}, d, {
			    			name: name,
			    			sn: sn
				    	});
					},
					type: 'POST',
					dataSrc: 'items'
				},
				processing: true,
				serverSide: true,
				columns: [
					{ data: '' },
					{ data: 'sn' },
					{ data: 'name' },
					{ data: 'status' },
					{ data: 'bidAddress' },
					{ data: 'bidTime' },
					{ data: 'chooseTime' }
				],
				rowId: 'id',
				columnDefs: [
					{
						render: function ( data, type, row ) {
							return '<input type="checkbox" data-id="' + row.id + '" />';
						},
						targets: 0
					},
					{
						render: function ( data, type, row ) {
							var text = '';
							if(data == 1) {
								text = '新建';
							}
							else if(data == 2) {
								text = '抽签';
							}
							return text;
						},
						targets: 3
					},
					{
						render: function ( data, type, row ) {
							var html = '<div class="btn-group">';
							html += '<button class="project_info btn btn-xs btn-success" data-id="' + row.id + '"><i class="fa fa-edit"></i>详情</button>';
							html += '<button class="project_del btn btn-xs btn-danger" data-id="' + row.id + '"><i class="fa fa-trash-o"></i>删除</button>';
							html += '<button class="project_memo btn btn-xs btn-warning" data-id="' + row.id + '"><i class="fa fa-book"></i>备注</button>';
							html += '</div>';
							return html;
						},
						targets: 7
					}
				],
				createdRow: function ( row, data, index ) {
					$('td', row).eq(0).addClass('text-center');
				}
			});
			
			//listen page items' event
			//$('#query_project').on('click.ILBCJ.project.query', $.ILBCJ.project.queryExpert);
			//$('#query_project_reset').on('click.ILBCJ.project.query', $.ILBCJ.project.clearQueryExpertCondition);
			$('#add_project').on('click.ILBCJ.project.add', $.ILBCJ.project.openProjectWindow);
			$('#project_info_modal_confirm').on('click.ILBCJ.project.editprojectinfoconfirm', $.ILBCJ.project.saveProjectConfirm);
			$('#del_projects').on('click.ILBCJ.project.delete.batch', $.ILBCJ.project.batchDelProject);
			$('#project_main_table').on( 'draw.dt', function () {
				$('.project_info').on('click.ILBCJ.project.detail', $.ILBCJ.project.openProjectWindow);
				$('.project_del').on('click.ILBCJ.project.delete.single', $.ILBCJ.project.delProject);
				$('.project_memo').on('click.ILBCJ.project.delete.single', $.ILBCJ.project.showProjectMemo);
			});
			$('#project_memo_modal_confirm').on('click.ILBCJ.project.memoconfirm', $.ILBCJ.project.memoProjectConfirm);
			$('#project_confirm_modal_confirm').on('click.ILBCJ.project.delconfirm', $.ILBCJ.project.projectConfirmModalConfirm);
			
			$('#project_condition').on('click.ILBCJ.project.condition', $.ILBCJ.project.openProjectConditionPanel);
			$('#project_condition_confirm_return').on('click.ILBCJ.project.condition.return', $.ILBCJ.project.openProjectMainPanel);
			
			//project_condition_main_wapper
			o.basePath && $('#avoid_unit_table').DataTable( {
				ajax:{
					url: o.basePath + '/avoid/queryAvoidUnits.action',
					type: 'POST',
					dataSrc: 'aus'
				},
				processing: true,
				serverSide: true,
				columns: [
					{ data: 'unitName' },
					{ data: 'reason' }
				],
				rowId: 'id',
				columnDefs: [
					{
						render: function ( data, type, row ) {
							var html = '<div class="btn-group">';
							html += '<button class="avoid_unit_del btn btn-xs btn-danger" data-id="' + row.id + '"><i class="fa fa-trash-o"></i>删除</button>';
							html += '</div>';
							return html;
						},
						targets: 2
					}
				]
			});
			
			$('#add_avoid_unit').on('click.ILBCJ.project.avoidunit.add', $.ILBCJ.project.openAvoidUnitWindow);
			$('#avoid_unit_modal_confirm').on('click.ILBCJ.project.editavoidunitconfirm', $.ILBCJ.project.saveAvoidUnitConfirm);
			$('#project_condition_confirm').on('click.ILBCJ.project.editconditionconfirm', $.ILBCJ.project.saveProjectCondition);
			$('#avoid_unit_table').on( 'draw.dt', function () {
				$('.avoid_unit_del').on('click.ILBCJ.project.avoidunit.delete.single', $.ILBCJ.project.delAvoidUnit);
			});
			
			o.basePath && $.post(o.basePath + '/unit/queryUnits.action?rand=' + Math.random(), {}, function(retObj,textStatus, jqXHR) {
	    		if(retObj.result == true)
				{
					var unitOptionStr = '';
					retObj.units.forEach(function(unit, index){
						unitOptionStr += '<option value=' + unit.id + '>' + unit.name + '</option>';
					});
					$('#avoid_unit').append(unitOptionStr);
				} else {
					var message = '加载单位信息失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
			
			$('[id^=major]').iCheck({
			    checkboxClass: 'icheckbox_square-blue margin',
				radioClass: 'iradio_square-blue margin'
			    //increaseArea: '20%' // optional
			});
			
			o.basePath && $.post(o.basePath + '/config/queryProjectMajorTypes.action?rand=' + Math.random(), {}, function(retObj,textStatus, jqXHR) {
	    		if(retObj.result == true)
				{
					if(retObj.pmts != null) {
						var pmts = retObj.pmts.split(',');
						pmts.forEach(function(pmt, index){
							if(pmt.trim() != '') {
								$('#major'+ pmt).iCheck('check');
							}
						});
					}
				} else {
					var message = '加载工程类别信息失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
			
		},
		showProjectMemo: function() {
			var id = $(this).data('id');
			if( typeof id === 'undefined' ) {
				return;
			}
			
			var rowData = $('#project_main_table').DataTable().row( '#' + id ).data();
			$('#project_memo_modal_name').html(rowData.name);
			$('#memo').val(rowData.memo);
	    	$('#project_memo_modal_confirm').data('project_id', id);
		
			$('#project_memo_modal').modal('show');
		},
		memoProjectConfirm: function() {
			var id = $('#project_memo_modal_confirm').data('project_id');
			var memo = $('#memo').val();
		    
			var postData = 'project.id=' + id;
			postData += '&project.memo=' + memo;
			
			o.basePath && $.post(o.basePath + '/project/saveProjectMemo.action?rand=' + Math.random(), postData, function(retObj,textStatus, jqXHR) {
	    		if(retObj.result == true)
				{
					o.basePath && $('#project_main_table').DataTable().ajax.reload();
					var message = '保存项目备注成功!';
					$.ILBCJ.tipMessage(message);
				} else {
					var message = '保存项目备注失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
		},
		openProjectWindow: function () {
			var id = $(this).data('id');
			//$('[id^=major]').iCheck('uncheck');
			if( typeof id === 'undefined' ) {
				$('#name').val('');
		    	$('#bid_address').val('铂鑫宾馆五楼会议室');
		    	$('#gathering_address').val('铂鑫宾馆五楼会议室，临河街与卫星路交汇处，临河街6177号');
		    	$('#bid_unit').val('');
		    	$('#supervise_unit').val('');
		    	$('#proxy_org').val('');
		    	$('#expert_count').val('');
		    	$('#sn').val('');
		    	$('#bid_time').val('');
		    	$('#choose_user').val('');
		    	$('#supervise_user').val('');
		    	$('#staff').val('');
		    	$('#operator').val('');
		    	$('#choose_time').val('');
		    	$('#project_info_modal_confirm').data('project_id', 0);
			}
			else {
				var rowData = $('#project_main_table').DataTable().row( '#' + id ).data();
				$('#name').val(rowData.name);
		    	$('#bid_address').val(rowData.bidAddress);
		    	$('#gathering_address').val(rowData.gatheringAddress);
		    	$('#bid_unit').val(rowData.bidUnit);
		    	$('#supervise_unit').val(rowData.superviseUnit);
		    	$('#proxy_org').val(rowData.proxyOrg);
		    	$('#expert_count').val(rowData.expertCount);
		    	$('#sn').val(rowData.sn);
		    	$('#bid_time').val(rowData.bidTime);
		    	$('#choose_user').val(rowData.chooseUser);
		    	$('#supervise_user').val(rowData.superviseUser);
		    	$('#staff').val(rowData.staff);
		    	$('#operator').val(rowData.operator);
		    	$('#choose_time').val(rowData.chooseTime);
		    	$('#project_info_modal_confirm').data('project_id', id);
			}
			$('#project_info_modal').modal('show');
		},
		saveProjectConfirm: function () {
			var id = $('#project_info_modal_confirm').data('project_id');
			var name = $('#name').val();
		    var bidAddress = $('#bid_address').val();
		    var gatheringAddress = $('#gathering_address').val();
		    var bidUnit = $('#bid_unit').val();
		    var superviseUnit = $('#supervise_unit').val();
		    var proxyOrg = $('#proxy_org').val();
		    var expertCount = $('#expert_count').val();
		    var sn = $('#sn').val();
		    var bidTime = $('#bid_time').val();
		    var chooseUser = $('#choose_user').val();
		    var superviseUser = $('#supervise_user').val();
		    var staff = $('#staff').val();
		    var operator = $('#operator').val();
		    var chooseTime = $('#choose_time').val();
		    
			var postData = 'project.id=' + id;
			postData += '&project.name=' + name;
			postData += '&project.bidAddress=' + bidAddress;
			postData += '&project.gatheringAddress=' + gatheringAddress;
			postData += '&project.bidUnit=' + bidUnit;
			postData += '&project.superviseUnit=' + superviseUnit;
			postData += '&project.proxyOrg=' + proxyOrg;
			postData += '&project.expertCount=' + expertCount;
			postData += '&project.sn=' + sn;
			postData += '&project.bidTime=' + bidTime;
			postData += '&project.chooseUser=' + chooseUser;
			postData += '&project.superviseUser=' + superviseUser;
			postData += '&project.staff=' + staff;
			postData += '&project.operator=' + operator;
			postData += '&project.chooseTime=' + chooseTime;
	
			o.basePath && $.post(o.basePath + '/project/saveProject.action?rand=' + Math.random(), postData, function(retObj,textStatus, jqXHR) {
	    		if(retObj.result == true)
				{
					o.basePath && $('#project_main_table').DataTable().ajax.reload();
					var message = '保存项目信息成功!';
					$.ILBCJ.tipMessage(message);
				} else {
					var message = '保存项目信息失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
		},
		projectConfirmModalConfirm: function () {
			// 1 -- delProjectsConfirm()
			var type = $('#project_confirm_modal_confirm').data('type');
			if(type === 1) {
				var postData = '';
				postData = $('#project_confirm_modal_confirm').data('delIds');
				$.ILBCJ.project.delProjectsConfirm(postData);
			}
			else if(type === 2) {
				/*var roundId = $('#round_confirm_modal_confirm').data('round_id');
				$.ILBCJ.round.archiveRoundConfirm(roundId);*/
			}
			else {
				$.ILBCJ.tipMessage("没有找到合适的处理流程，请联系系统维护人员!", false);
			}
		},
		batchDelProject: function () {
			if( ($('#project_main_table :checkbox:checked[data-id]').length == 0) ) { 
				var message = "请选择要删除的项目!";
				$.ILBCJ.tipMessage(message);
				return;
			} else {
				var delIds = '';
				$("#project_main_table :checkbox").each(function(index,checkboxItem){
					if($(checkboxItem).prop('checked') && index != 0){
						delIds += "delIds=" + $(checkboxItem).attr('data-id') + "&";
					}
				});
				var message = '已经选取了' + $("#project_main_table :checkbox:checked[data-id]").length + '条记录。是否要删除这些项目？';
				$('#project_confirm_modal_message').empty().append(message);
				$('#project_confirm_modal_confirm').data('type', 1);
				$('#project_confirm_modal_confirm').data('delIds', delIds);
				$("#project_confirm_modal").modal('show');
			}
		},
		delProject: function () {
			var rowId = $(this).data('id');
			var delIds = 'delIds=' + rowId;
			var message = '是否要删除此项目？';
			$('#project_confirm_modal_message').empty().append(message);
			$('#project_confirm_modal_confirm').data('type', 1);
			$('#project_confirm_modal_confirm').data('delIds', delIds);
			$("#project_confirm_modal").modal('show');
		},
		delProjectsConfirm: function (postData) {
			o.basePath && $.post(o.basePath + '/project/deleteProjects.action', postData, function(retObj) {
				if(retObj.result == true) {
					var message = '项目信息已删除';
					$.ILBCJ.tipMessage(message);
					$('#project_main_table').DataTable().ajax.reload();
				} else {
					var message = '删除项目信息操作失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
				$("#project_main_table :checkbox").each(function(index,checkboxItem){
					$(checkboxItem).iCheck('uncheck');
				});
			}, 'json');
		},
		openProjectConditionPanel: function () {
			$('#project_maintain_center_main_wapper').addClass('hidden');
			$('#project_condition_main_wapper').removeClass('hidden');
		},
		openProjectMainPanel: function() {
			$('#project_condition_main_wapper').addClass('hidden');
			$('#project_maintain_center_main_wapper').removeClass('hidden');
		},
		delAvoidUnit: function() {
			var id = $(this).data('id');
			var postData = 'avoidId=' + id;
			o.basePath && $.post(o.basePath + "/avoid/delAvoidUnit.action", postData, function(retObj) {
				if(retObj.result == true) {
					o.basePath && $('#avoid_unit_table').DataTable().ajax.reload();
				} else {
					var message = "删除回避单位操作失败![" + retObj.message + "]";
					$.ILBCJ.tipMessage(message, false);
				}
			}, "json");
		},
		openAvoidUnitWindow: function() {
			$('#avoid_unit').val('0');
			$('#avoid_reason').val('0');
			$('#avoid_unit_modal').modal('show');
		},
		saveAvoidUnitConfirm: function() {
			var unitId = $('#avoid_unit').val();
			var unitName = $('#avoid_unit').find("option:selected").text();
			var reason = $('#avoid_reason').val();
			
			var postData = 'au.unitId=' + unitId;
			postData += '&au.unitName=' + unitName;
			postData += '&au.reason=' + reason;
			o.basePath && $.post(o.basePath + "/avoid/saveAvoidUnit.action", postData, function(retObj) {
				if(retObj.result == true) {
					o.basePath && $('#avoid_unit_table').DataTable().ajax.reload();
				} else {
					var message = "删除回避单位操作失败![" + retObj.message + "]";
					$.ILBCJ.tipMessage(message, false);
				}
			}, "json");
		},
		saveProjectCondition: function() {
			var pmts= [];
			$('[id^=major]').each(function(index, major){
				var self = $(this);
				if(self.prop('checked')) {
					var majorId = self.val();
					pmts.push(majorId);
				}
			});
			
			var postData = "pmts=" + pmts.toString();
			o.basePath && $.post(o.basePath + '/config/saveProjectMajorTypes.action?rand=' + Math.random(), postData, function(retObj,textStatus, jqXHR) {
	    		if(retObj.result == true)
				{
					var message = '设置抽签条件成功!';
					$.ILBCJ.tipMessage(message);
					$.ILBCJ.project.openProjectMainPanel();
				} else {
					var message = '设置抽签条件失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
		}
		/*,
		archiveRoundConfirm: function (roundId) {
			$("#progress_Modal").modal('show');
			var postData = 'roundId=' + roundId;
			o.basePath && $.post(o.basePath + "/period/archiveRound.action", postData, function(retObj) {
				$("#progress_Modal").modal('hide');
				if(retObj.result == true) {
					var message = "本轮比赛数据已归档完成!<br/>接下来可以创建新一轮比赛，或者查看上一轮的排行榜";
					$.ILBCJ.tipMessage(message);
					o.basePath && $('#round_main_table').DataTable().ajax.reload();
				} else {
					var message = "归档比赛数据操作失败![" + retObj.message + "]";
					$.ILBCJ.tipMessage(message, false);
				}
			}, "json");
		}*/
	};// end of $.ILBCJ.project
	
	/* player
	* ======
	* player infomation maintain page
	*
	* @type Object
	* @usage $.ILBCJ.player.activate()
	* @usage $.ILBCJ.player.queryPlayers()
	* @usage $.ILBCJ.player.clearQueryPlayerCondition()
	* @usage $.ILBCJ.player.openAddWindow()
	* @usage $.ILBCJ.player.addConfirm()
	* @usage $.ILBCJ.player.detail()
	* @usage $.ILBCJ.player.delBatch()
	* @usage $.ILBCJ.player.del()
	* @usage $.ILBCJ.player.delConfirm()
	* @usage $.ILBCJ.player.testBatchCreatePlayers()
	*/
	$.ILBCJ.player = {
		activate: function () {
			o.basePath && $('#player_main_table').DataTable( {
				ajax:{
					url: o.basePath + '/player/queryPlayers.action',
					data: function(d) {
						var loginid = $('#player_query_id').val();
				    	var name = $('#player_query_name').val();
				    	return $.extend( {}, d, {
				    			loginId: loginid,
				    			name: name
				    	});
					},
					type: 'POST',
					dataSrc: 'items'
				},
				processing: true,
				serverSide: true,
				columns: [
					{ data: '' },
					{ data: 'loginId' },
					{ data: 'name' },
					{ data: 'race' },
					{ data: 'timestamp' }
				],
				rowId: 'id',
				columnDefs: [
					{
						render: function ( data, type, row ) {
							return '<input type="checkbox" data-id="' + row.id + '" />';
						},
						targets: 0
					},
					{
						render: function ( data, type, row ) {
							var text = '';
							if(data === 'T') {
								text = '人类';
							}
							else if(data === 'P') {
								text = '星灵';
							}
							else if(data === 'Z') {
								text = '异虫';
							}
							else if(data === 'X') {
								text = '特殊对抗';
							}
							return text;
						},
						targets: 3
					},
					{
						render: function ( data, type, row ) {
							var html = '<div class="btn-group">';
							html += '<button class="player_info btn btn-xs btn-success" data-id="' + row.id + '"><i class="fa fa-check"></i>详情</button>';
							html += '<button class="player_del btn btn-xs btn-danger" data-id="' + row.id + '"><i class="fa fa-check"></i>删除</button>';
							html += '</div>';
							return html;
						},
						targets: 5
					}
				],
				createdRow: function ( row, data, index ) {
					$('td', row).eq(0).addClass('text-center');
				}
			});
			
			//listen page items' event
			$('#query_player').on('click.ILBCJ.player.query', $.ILBCJ.player.queryPlayers);
			$('#query_player_reset').on('click.ILBCJ.player.queryreset', $.ILBCJ.player.clearQueryPlayerCondition);
			$('#add_player').on('click.ILBCJ.player.add', $.ILBCJ.player.openAddWindow);
			$('#add_player_confirm').on('click.ILBCJ.player.addconfirm', $.ILBCJ.player.addConfirm);
			$('#del_players').on('click.ILBCJ.player.delete.batch', $.ILBCJ.player.delBatch);
			$('#player_main_table').on( 'draw.dt', function () {
				$('.player_info').on('click.ILBCJ.player.detail', $.ILBCJ.player.detail);
				$('.player_del').on('click.ILBCJ.player.delete.single', $.ILBCJ.player.del);
			});
			$('#del_players_confirm').on('click.ILBCJ.player.delconfirm', $.ILBCJ.player.delConfirm);
			
			$('#batch_create_players').on('click.ILBCJ.player.batchcreate', $.ILBCJ.player.testBatchCreatePlayers);
			$('#test_init_player_confirm').on('click.ILBCJ.player.batchcreate', $.ILBCJ.player.testBatchCreatePlayersConfirm);
		},
		queryPlayers: function () {
			o.basePath && $('#player_main_table').DataTable().ajax.reload();
		},
		clearQueryPlayerCondition: function () {
			$('#player_query_id').val('');
			$('#player_query_name').val('');
		},
		openAddWindow: function () {
			$('#pwd').val('');
		    $('#name').val('');
		    $('#race').val('');
		    $('#telephone').val('');
		    $('#email').val('');
		    $('#qq').val('');
		    $('#wechat').val('');

			$("#add_Modal").modal('show');
		},
		addConfirm: function () {
			var loginId = $("#loginid").val();
			var postData = "loginId=" + loginId;
			
			o.basePath && $.post(o.basePath + '/player/queryPlayers.action', postData, function(retObj){
		        if(retObj.items.length == 0){ 
		        	postData = 'player.loginId=' + loginId;
		        	var pwd = $('#pwd').val();
		        	postData += '&player.pwd=' + pwd;
					var name = $('#name').val();
					postData += '&player.name=' + name;
					var race = $('#race').val();
					postData += '&player.race=' + race;
					var telephone = $('#telephone').val();
					postData += '&player.tel=' + telephone;
					var email = $('#email').val();
					postData += '&player.email=' + email;
					var qq = $('#qq').val();
					postData += '&player.qq=' + qq;
			    	var wechat = $('#wechat').val();
					postData += '&player.wechat=' + wechat;
					
			    	$.post(o.basePath + '/player/savePlayer.action?rand=' + Math.random(), postData, function(retObj,textStatus, jqXHR) {
			    		if(retObj.result == true)
						{
							$.ILBCJ.player.queryPlayers();
							var message = '保存选手信息成功!';
							$.ILBCJ.tipMessage(message);
						} else {
							var message = '保存选手信息失败![' + retObj.message + ']';
							$.ILBCJ.tipMessage(message, false);
						}
					}, 'json');
		        } else { 
					var message = '该账号已被占用!';
					$.ILBCJ.tipMessage(message, false);
		            return false;
		        } 
		        
		    }, "json");
		},
		detail: function () {
			
			var rowId = $(this).data('id');
			var postData = "";
			postData += "id=" + rowId;
			o.basePath && $.post(o.basePath + "/player/queryPlayerDetail.action", postData, function(retObj) {
				if(retObj.result == true) {
					//TODO: update detail page info
					var info = retObj.detail;
					var message = info.base.loginId + '|' + info.base.name + '|' + info.base.race;
					$('#detail_message').empty().append(message);
					
					$("#detail_Modal").modal('show');
				} else {
					var message = '获取选手详细信息失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
			return;
		},
		delBatch: function () {
			if( ($('#player_main_table :checkbox:checked[data-id]').length == 0) ) { 
				var message = "请选择要删除的选手!";
				$.ILBCJ.tipMessage(message);
				return;
			} else {
				var delIds = '';
				$("#player_main_table :checkbox").each(function(index,checkboxItem){
					if($(checkboxItem).prop('checked') && index != 0){
						delIds += "delIds=" + $(checkboxItem).attr('data-id') + "&";
					}
				});
				var message = '已经选取了' + $("#player_main_table :checkbox:checked[data-id]").length + '条记录。是否要删除这些选手？';
				$('#del_message').empty().append(message);
				$('#del_message').data('delIds', delIds);
				$("#del_Modal").modal('show');
			}
		},
		del: function () {
			var rowId = $(this).data('id');
			var delIds = 'delIds=' + rowId;
			var message = '是否要删除该选手？';
			$('#del_message').empty().append(message);
			$('#del_message').data('delIds', delIds);
			$("#del_Modal").modal('show');
		},
		delConfirm: function () {
			var postData = '';
			postData = $('#del_message').data('delIds');
			o.basePath && $.post(o.basePath + '/player/deletePlayer.action', postData, function(retObj) {
				if(retObj.result == true) {
					var message = '选手已经被删除';
					$.ILBCJ.tipMessage(message);
					$('#player_main_table').DataTable().ajax.reload();
				} else {
					var message = '删除选手操作失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
		},
		testBatchCreatePlayers: function () {
			var message = '该操作会在系统现有用户基础上，批量创建新用户，直到系统中存在50个用户为止。<br/>如果系统中已有50个用户，将不会做任何操作，是否继续？';
			$('#test_init_player_message').empty().append(message);
			$("#test_Init_Player_Modal").modal('show');
		},
		testBatchCreatePlayersConfirm: function () {
			$("#progress_Modal").modal('show');
			o.basePath && $.post(o.basePath + '/player/testInitPlayers.action', {}, function(retObj){
				$("#progress_Modal").modal('hide');
		        if(retObj.result == true)
				{
					$.ILBCJ.player.queryPlayers();
					var message = '生成测试选手数据成功!';
					$.ILBCJ.tipMessage(message);
				} else {
					var message = '生成测试选手数据失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
		    }, "json");
		}
	};// end of $.ILBCJ.player
	
	/* match
	* ======
	* match info maintain page for battle_maintain.html
	*
	* @type Object
	* @usage $.ILBCJ.match.activate()
	* @usage $.ILBCJ.match.queryAttestation()
	* @usage $.ILBCJ.match.clearQueryAttestationCondition()
	* @usage $.ILBCJ.match.openAddAttestationWindow()
	* @usage $.ILBCJ.match.openModAttestationWindow()
	* @usage $.ILBCJ.match.openDelAttestationWindow()
	* @usage $.ILBCJ.match.attestationDel()
	* @usage $.ILBCJ.match.attestationSave()
	* @usage $.ILBCJ.match.attestationDetailReturn()
	*/
	$.ILBCJ.match = {
		activate: function () {
			o.basePath && $('#match_player_registration_info_table').DataTable( {
				ajax:{
					url: o.basePath + '/match/queryActiveMatchRegistrationInfo.action',
					type: 'POST',
					dataSrc: 'activeRegistrationInfo'
				},
				processing: true,
				serverSide: true,
				dom: 'tr',
				columns: [
					{ data: 'playerId' },
					{ data: null},
					{ data: 'loginId' },
					{ data: 'name' },
					{ data: 'race' },
					{ data: 'adversaries' },
					{ data: 'days' }
				],
				rowId: 'playerId',
				columnDefs: [
					{
						visible: false,
		                targets: 0
					},
					{
						visible: false,
		                targets: 3
					},
					{
						render: function ( data, type, row ) {
							var html = '<div class="btn-group">';
							html += '<button class="edit_match_registration btn btn-xs btn-success" data-id="' + row.playerId + '"><i class="fa fa-edit"></i>编辑</button>';
							html += '</div>';
							return html;
						},
						targets: 1
					}
				],
				createdRow: function ( row, data, index ) {
					//$('td', row).eq(0).addClass('text-center');
				}
			});
			
			$.ILBCJ.match.queryActiveMatchInfo();
			//listen page items' event
			$('#batch_create_registration').on('click.ILBCJ.match.batchcreateregistration', $.ILBCJ.match.testBatchCreateRegistration);
			$('#batch_create_match_result').on('click.ILBCJ.match.batchcreatematchresult', $.ILBCJ.match.testBatchCreateMatchResult);
			$('#match_player_registration_info_table').on( 'draw.dt', function () {
				$('.edit_match_registration').on('click.ILBCJ.match.registration.edit', $.ILBCJ.match.editMatchRegistration);
			});
			$('#match_registration_detail_confirm').on('click.ILBCJ.match.editmatchregistrationconfirm', $.ILBCJ.match.editMatchRegistrationConfirm);
			$('#match_info_detail_confirm').on('click.ILBCJ.match.editmatchinfoconfirm', $.ILBCJ.match.editMatchInfoConfirm);
			$('#match_confirm_modal_confirm').on('click.ILBCJ.match.confirmmodalconfirm', $.ILBCJ.match.matchConfirmModalConfirm);
			$('#update_match_info').on('click.ILBCJ.match.updatematchinfo', $.ILBCJ.match.updateMatchInfo);
		},
		testBatchCreateRegistration: function () {
			$("#progress_Modal").modal('show');
			o.basePath && $.post(o.basePath + "/match/testInitRegistration.action", {}, function(retObj) {
				$("#progress_Modal").modal('hide');
				if(retObj.result == true) {
					var message = "批量录入模拟挑战申请完成!";
					$.ILBCJ.tipMessage(message);
					
					o.basePath && $('#match_player_registration_info_table').DataTable().ajax.reload();
				} else {
					var message = "录入模拟挑战申请失败![" + retObj.message + "]";
					$.ILBCJ.tipMessage(message, false);
				}
			}, "json");
		},
		testBatchCreateMatchResult: function () {
			$("#progress_Modal").modal('show');
			o.basePath && $.post(o.basePath + "/match/testCreateMatchResult.action", {}, function(retObj) {
				$("#progress_Modal").modal('hide');
				if(retObj.result == true) {
					var message = "批量创建模拟比赛结果完成!";
					$.ILBCJ.tipMessage(message);
					$.ILBCJ.match.queryActiveMatchInfo();
				} else {
					var message = "创建模拟比赛结果失败![" + retObj.message + "]";
					$.ILBCJ.tipMessage(message, false);
				}
			}, "json");
		},
		editMatchRegistration: function () {
			var playerId = $(this).data('id');
			var rowData = $('#match_player_registration_info_table').DataTable().row( '#' + playerId ).data();
			//console.log(rowData);

			var postData = "playerId=" + playerId; 
			o.basePath && $.post(o.basePath + "/match/queryMatchRegistrationDetailForEdit.action", postData, function(retObj) {
				if(retObj.result == true) {
					if( retObj.plats.length == 0 ) {
						var message = "获取比赛地图信息失败![没有可用地图]";
						$.ILBCJ.tipMessage(message, false);
						return;
					}
					$('#match_registration_detail_player_name').html(rowData.name + ' -- ' + rowData.loginId + ' -- ' + rowData.race);
					var html = '';
					var playerOptionStr = '';//'<option value></option>';
					var platOptionStr = '';//'<option value></option>'
					// 对战选手
					html += '<div class="form-group">';
					html += '<label>选择挑战对手</label>'
					html += '<ul class="list-group list-group-unbordered">';
					retObj.regInfoForEdit.adversaries.forEach(function(player, index){
						html += '<li class="list-group-item"><div class="row">';
						html += '<div class="col-xs-10">';
						html += 	'<div class="row "><div class="col-xs-12"><select id="adversary' + index + '" class="form-control select2" data-placeholder="选择挑战对手" style="width: 100%;"></select></div></div>';
						html += 	'<div class="row style-select"><div class="col-xs-12">';
						html +=			'<div class="subject-info-box-1"><select id="lstBox' + index + '" class="form-control" multiple></select></div>';
						html +=			'<div class="subject-info-arrows text-center"><br />';
						html +=				'<input type="button" id="btnAllRight' + index + '" value=">>" class="btn btn-default" /><br />';
						html +=				'<input type="button" id="btnRight' + index + '" value=">" class="btn btn-default" /><br />';
						html +=				'<input type="button" id="btnLeft' + index + '" value="<" class="btn btn-default" /><br />';
						html +=				'<input type="button" id="btnAllLeft' + index + '" value="<<" class="btn btn-default" />';
						html +=			'</div>';
						html +=			'<div class="subject-info-box-2"><select multiple class="form-control" id="plat' + index + '"></select></div>';
						html +=			'<div class="clearfix"></div>';
						html +=		'</div></div>';
						html += '</div>';
						html += '<div class="col-xs-2"><a class="btn btn-app clearAdversaryItem" data-index="' + index + '"><i class="fa fa-trash-o"></i> 清空</a></div>';
						html += '</div></li>';
						playerOptionStr += '<option value=' + player.id + '>第' + player.ranking + '名 - ' + player.loginId + '[' + player.race + ']</option>';
					});
					html += '</ul></div>';
					
					// 对战地图
					retObj.plats.forEach(function(plat, index){
						platOptionStr += '<option value=' + plat.id + '>' + plat.name + '</option>';
					});
					
					// 对战日期
					html += '<div class="form-group"><label for="exampleInputEmail1">选择对战日期</label>';
					html += '<ul class="list-group list-group-unbordered"><li class="list-group-item">';
					html += '<span class="margin"><input id="week0" type="checkbox" value="0"><label for="monday">星期一</label></span>';
					html += '<span class="margin"><input id="week1" type="checkbox" value="1"><label for="tuesday">星期二</label></span>';
					html += '<span class="margin"><input id="week2" type="checkbox" value="2"><label for="wednesday">星期三</label></span>';
					html += '<span class="margin"><input id="week3" type="checkbox" value="3"><label for="thusday">星期四</label></span>';
					html += '<span class="margin"><input id="week4" type="checkbox" value="4"><label for="friday">星期五</label></span>';
					html += '<span class="margin"><input id="week5" type="checkbox" value="5"><label for="saturday">星期六</label></span>';
					html += '<span class="margin"><input id="week6" type="checkbox" value="6"><label for="sunday">星期日</label></span>';
					html += '</li></ul></div>';
					
					// 本轮奖惩
					html += '<div class="form-group"><label for="exampleInputEmail1">本轮独立奖惩分数</label><ul class="list-group list-group-unbordered"><li class="list-group-item">';
					html += '<p id="reward_display">当前分数: <span id="reward_display_val">' + rowData.scoreReward + '</span></p><input id="reward_sponsor" type="text" /></li>';
					html += '<li class="list-group-item"><textarea class="form-control" rows="7" id="reward_memo" placeholder="奖惩原因"></textarea></li></ul></div>';
					
					$("#match_registration_detail_modal_body").empty().append(html);
					$('.clearAdversaryItem').on('click.ILBCJ.match.clearadversaryitem', $.ILBCJ.match.clearAdversaryItem);
					$('.select2').select2();
					$('#adversary0, #adversary1, #adversary2, #adversary3, #adversary4').append( playerOptionStr );
					$('#adversary0, #adversary1, #adversary2, #adversary3, #adversary4').each(function(){
						$(this).val([]).select2();
					});
					rowData.adversaryIds.forEach(function(adversaryId, index){
						$('#adversary'+ index).val(adversaryId).select2();
					});
					
					//$('#lstBox0, #lstBox1, #lstBox2, #lstBox3, #lstBox4').append( platOptionStr );
					$('[id^=lstBox]').each(function(index, lstBox){
						var self = $(this);
						self.append( platOptionStr );
						//lstBox.append(platOptionStr);
						$('#btnRight' + index).click(function (e) {
				            $('select').moveToListAndDelete('#lstBox' + index, '#plat' + index);
				            e.preventDefault();
						});
						
				        $('#btnAllRight' + index).click(function (e) {
				            $('select').moveAllToListAndDelete('#lstBox' + index, '#plat' + index);
				            e.preventDefault();
				        });
				        
				        $('#btnLeft' + index).click(function (e) {
				            $('select').moveToListAndDelete('#plat' + index, '#lstBox' + index);
				            e.preventDefault();
				        });
				        
				        $('#btnAllLeft' + index).click(function (e) {
				            $('select').moveAllToListAndDelete('#plat' + index, '#lstBox' + index);
				            e.preventDefault();
				        });
					});
					rowData.platIds.forEach(function(platId, index){
						if( platId != null ) {
							var selectedPlat = platId.split(',');
							$('#lstBox'+ index).val( selectedPlat[0] );
							$('#btnRight' + index).click();
							$('#lstBox'+ index).val( selectedPlat[1] );
							$('#btnRight' + index).click();
							$('#lstBox'+ index).val( selectedPlat[2] );
							$('#btnRight' + index).click();
						}
					});
					
					$('[id^=week]').iCheck({
					    checkboxClass: 'icheckbox_square-blue margin',
						radioClass: 'iradio_square-blue margin',
					    increaseArea: '20%' // optional
					});
					// for rest day
					$('#week0').iCheck('disable');
					$('#week0').parent().next().addClass('text-gray');
					rowData.dayIds.forEach(function(dayId){
						$('#week'+ dayId).iCheck('check');
					});
					  
					$('#reward_sponsor').slider({ 
						id: 'reward_sponsor_slider', 
						ticks: [-200, -100, 0, 100, 200],
						min: -200, 
						max: 100, 
						value: -201
					});
					$('#reward_sponsor').on('change', function(slideEvt) {
						var colorUnselect = '#f9f9f9';
						var colorGreen = '#00a65a';
						var colorRed = '#f56954';
						var colorDefault = '#89cdef';
						$('#reward_sponsor_slider .slider-selection, #reward_sponsor_slider .slider-track-high, #reward_sponsor_slider .slider-tick').css('background', colorUnselect);
						
						if(slideEvt.value.newValue > 0) {
							$('#reward_sponsor_slider .slider-selection, #reward_sponsor_slider .slider-tick.in-selection').css('background', colorGreen);
						}
						else if(slideEvt.value.newValue < 0) {
							$('#reward_sponsor_slider .slider-track-high, #reward_sponsor_slider .slider-tick').css('background', colorRed);
							$('#reward_sponsor_slider .slider-tick.in-selection').css('background', colorUnselect);
						}
						else if(slideEvt.value.newValue == 0) {
							//pass
						}
						$('#reward_display_val').text(slideEvt.value.newValue);
					});
					// for the first value display in correct way
					$('#reward_sponsor').slider('setValue', rowData.scoreReward, true, true);
					$('#reward_memo').val(rowData.scoreRewardMemo);
					
					$('#match_registration_detail_confirm').data('reg_info', rowData);
					$('#match_registration_detail_modal').modal('show');
				} else {
					var message = "获取选手详细报名信息失败![" + retObj.message + "]";
					$.ILBCJ.tipMessage(message, false);
				}
			}, "json");
		},
		clearAdversaryItem: function () {
			var index = $(this).data('index');
			if ( index != null && index >= 0 ) {
				$('#adversary' + index).val([]).select2();
				$('#btnAllLeft' + index).click();
			}
		},
		editMatchRegistrationConfirm: function (regInfo) {
			var regInfo = $('#match_registration_detail_confirm').data('reg_info');
			
			regInfo.adversaryIds = [];
			regInfo.platIds = [];
			var message = '';
			$('[id^=adversary]').each(function(index, adversary){
				var self = $(this);
				var plats = $('#plat' + index + ' option');
				if( self.val() != null ) {
					if( plats.length == 0 ) {
						message = "没有为比赛指定地图！";
						$.ILBCJ.tipMessage(message, false);
						return;
					}
					if( plats.length != 3 ) {
						message = "每场挑战要选择三张地图！";
						$.ILBCJ.tipMessage(message, false);
						return;
					}
					if( regInfo.adversaryIds.indexOf( self.val() ) != -1 ) {
						message = "不能选择重复的对手！";
						$.ILBCJ.tipMessage(message, false);
						return;
					}
					var platId = [];
					platId.push( plats[0].value );
					platId.push( plats[1].value );
					platId.push( plats[2].value );
					regInfo.adversaryIds.push(self.val());
					regInfo.platIds.push(platId.toString());
				}
				else {
					if( platId != null ) {
						message = '选择了对战地图，但没有为比赛指定挑战对手！';
						$.ILBCJ.tipMessage(message, false);
						return;
					}
				}
			});
			if(message != '') {
				return;
			}
			
			regInfo.dayIds= [];
			$('[id^=week]').each(function(index, day){
				var self = $(this);
				if(self.prop('checked')) {
					var dayId = self.val();
					regInfo.dayIds.push(dayId);
				}
			});
			
			regInfo.scoreReward = $('#reward_sponsor').slider('getValue');
			regInfo.scoreRewardMemo = $('#reward_memo').val();
			//console.log(regInfo);
			
			var postData = 'regInfoForSave.playerId=' + regInfo.playerId;
			postData += '&regInfoForSave.scoreReward=' + regInfo.scoreReward;
			postData += '&regInfoForSave.scoreRewardMemo=' + regInfo.scoreRewardMemo;
			regInfo.adversaryIds.forEach(function(adversaryId){
				postData += '&regInfoForSave.adversaryIds=' + adversaryId;
			});
			regInfo.platIds.forEach(function(platId){
				postData += '&regInfoForSave.platIds=' + platId;
			});
			//postData += '&regInfoForSave.platIds=' + regInfo.platIds.toString();
			regInfo.dayIds.forEach(function(dayId){
				postData += '&regInfoForSave.dayIds=' + dayId;
			});
			o.basePath && $.post(o.basePath + "/match/saveMatchRegistrationDetail.action", postData, function(retObj) {
				if(retObj.result == true) {
					var message = "选手报名信息更新成功!";
					$.ILBCJ.tipMessage(message);
					
					o.basePath && $('#match_player_registration_info_table').DataTable().ajax.reload();
				} else {
					var message = "选手报名信息更新失败! " + retObj.message;
					$.ILBCJ.tipMessage(message, false);
				}
			}, "json");
			return;
		},
 		queryActiveMatchInfo: function () {
			o.basePath && $.post(o.basePath + "/match/queryActiveMatchInfo.action", {}, function(retObj) {
				if(retObj.result == true) {
					$('#match_day_info_table_wapper').html('');
					var matchInfos = retObj.activeMatchInfo;
					var index=0, len=matchInfos.length;
					for (; index<len; index++) {
						var matchInfo = matchInfos[index];
						var html = '<div class="box"><div class="box-header"><h3 class="box-title">' + matchInfo.dayName + '</h3></div><div class="box-body no-padding"><table id="active_match_info_day_' 
								+ index + '" class="table table-striped table-hover"></table></div></div>';
						$('#match_day_info_table_wapper').append(html);
						
						$('#active_match_info_day_' + index).DataTable( {
							paging: false,
					        data: matchInfo.matchInfo,
					        rowId: 'id',
					        columns: [
					        	{ title: "操作", data: null, defaultContent: "", width: "100px" },
					            { title: "挑战者", data: "challengerName", width: "200px" },
					            { title: "擂主", data: "adversaryName", width: "200px" },
					            { title: "地图", data: "platName", width: "400px" },
					            { title: "结果", data: "result" },
					            { title: "比分", data: "score", width: "100px" }					            
					        ],
					        columnDefs: [
					        	{
									render: function ( data, type, row ) {
										var bgcolor = '';
										if(row.challengerVranking < 11 ) {
											bgcolor = 'bg-purple';
										}
										else if(row.challengerVranking < 21 ) {
											bgcolor = 'bg-yellow';
										}
										else if(row.challengerVranking < 31 ) {
											bgcolor = 'bg-blue';
										}
										else if(row.challengerVranking < 41 ) {
											bgcolor = 'bg-green';
										}
										else{
											bgcolor = 'bg-red';
										}
										var html = '<span class="margin badge ' + bgcolor + '"> '+ row.challengerVranking + '</span>' + data;
										return html;
									},
									targets: 1
								},
								{
									render: function ( data, type, row ) {
										var bgcolor = '';
										if(row.adversaryVranking < 11 ) {
											bgcolor = 'bg-purple';
										}
										else if(row.adversaryVranking < 21 ) {
											bgcolor = 'bg-yellow';
										}
										else if(row.adversaryVranking < 31 ) {
											bgcolor = 'bg-blue';
										}
										else if(row.adversaryVranking < 41 ) {
											bgcolor = 'bg-green';
										}
										else {
											bgcolor = 'bg-red';
										}
										var html = '<span class="margin badge ' + bgcolor + '"> '+ row.adversaryVranking + '</span>' + data;
										return html;
									},
									targets: 2
								},
					        	{
									render: function ( data, type, row ) {
										var html = '';
										if( data != '' ) {
											var plats = data.split(',');
											plats.forEach(function(plat){
												if(plat != null && plat != '') {
													var platName = plat;
													if( plat.indexOf('_') != -1 ) {
														platName = plat.split('_')[1];
													}
													html += '<span class="margin badge bg-blue"> ' + platName + '</span>';	
												}
											});
											 
										}
										
										return html;
									},
									targets: 3
								},
								{
									render: function ( data, type, row ) {
										var html = '';
										if(data === 1) {
											html = '<span class="badge bg-red margin fa fa-flag">' + row.challengerName + '</span><span class="badge bg-black margin fa fa-bomb">' + row.adversaryName + '</span>';
										}
										else if(data === 2) {
											html = '<span class="badge bg-black margin fa fa-bomb">' + row.challengerName + '</span><span class="badge bg-red margin fa fa-flag">' + row.adversaryName + '</span>';
										}
										else if(data === 3) {
											html = '平局';
										}
										else if(data === 4) {
											html = '<span class="badge bg-black margin fa fa-bomb">' + row.challengerName + ' 缺席</span>';
										}
										else if(data === 5) {
											html = '<span class="badge bg-black margin fa fa-bomb">' + row.adversaryName + ' 缺席</span>';
										}
										return html;
									},
									targets: 4
								},
					        	{
									render: function ( data, type, row ) {
										var html = '<div class="btn-group">';
										html += '<button class="edit_match_info btn btn-xs btn-success margin" data-id="' + row.id + '" data-index="' + index + '"><i class="fa fa-edit"></i>编辑</button>';
										html += '</div>';
										return html;
									},
									targets: 0
								}
							]
					    });
					    
					    $('#active_match_info_day_' + index).on( 'draw.dt', function () {
					    	$('.edit_match_info').off("click");
							$('.edit_match_info').on('click.ILBCJ.match.info.edit', $.ILBCJ.match.editMatchInfo);
						});
					}
					
				} else {
					var message = '查询对战信息失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
		},
		editMatchInfo: function () {
			var matchInfoId = $(this).data('id');
			var tableIndex = $(this).data('index');
			var rowData = $('#active_match_info_day_' + tableIndex).DataTable().row( '#' + matchInfoId ).data();
			if(rowData.platName === undefined || rowData.platName == null || rowData.platName == '') {
				var message = '本场关联比赛地图信息不正确!';
				$.ILBCJ.tipMessage(message, false);
				return;
			}
			
			//$("#progress_Modal").modal('show');
			var postData = "playerId=" + rowData.challengerId;
			postData += "&adversaryId=" + rowData.adversaryId;
			o.basePath && $.post(o.basePath + "/match/queryMatchInfoDetailForEdit.action", postData, function(retObj) {
				//$("#progress_Modal").modal('hide');
				if(retObj.result == true) {
					var battles = retObj.battleInMatchInfo;
					var title = rowData.challengerName + ' vs ' + rowData.adversaryName;
					var platHtml = '';
					var plats = rowData.platName.split(',');
					plats.forEach(function(plat, index){
						if(plat != null && plat != '') {
							var platName = plat;
							if( plat.indexOf('_') != -1 ) {
								platName = plat.split('_')[1];
							}
							platHtml += '<div class="row"><div class="col-xs-12"><div class="box box-widget widget-user">';
							platHtml += 	'<div class="widget-user-header bg-aqua-active">';
							platHtml += 		'<h3 class="widget-user-username">' + (index+1) + ' - ' + '<span id="plat' + index + '">' + platName + '</span></h3>';
							platHtml +=			'<h4 class="widget-user-desc">' + rowData.challengerName +' 挑战 ' + rowData.adversaryName + '</h4>';
							platHtml +=		'</div>';
							platHtml +=		'<div class="box-footer no-padding"><div class="row">';
							platHtml +=			'<div class="col-sm-3 border-right"><div class="description-block"><h5 class="description-header">挑战者种族</h5><span class="description-text">';
							platHtml +=				'<input id="crt' + index + '" name="challenger_race' + index + '" type="radio" value="T" />';
							platHtml +=				'<label for="crt' + index + '">T</label>';
							platHtml +=				'<input id="crp' + index + '" name="challenger_race' + index + '" type="radio" value="P" />';
							platHtml +=				'<label for="crp' + index + '">P</label>';
							platHtml +=				'<input id="crz' + index + '" name="challenger_race' + index + '" type="radio" value="Z" />';
							platHtml +=				'<label for="crz' + index + '">Z</label>';
							platHtml +=			'</span></div></div>';
							platHtml +=			'<div class="col-sm-4 border-right"><div class="description-block"><h5 class="description-header">擂主种族</h5><span class="description-text">';
							platHtml +=				'<input id="art' + index + '" name="adversary_race' + index + '" type="radio" value="T" />';
							platHtml +=				'<label for="art' + index + '">T</label>';
							platHtml +=				'<input id="arp' + index + '" name="adversary_race' + index + '" type="radio" value="P" />';
							platHtml +=				'<label for="arp' + index + '">P</label>';
							platHtml +=				'<input id="arz' + index + '" name="adversary_race' + index + '" type="radio" value="Z" />';
							platHtml +=				'<label for="arz' + index + '">Z</label>';
							platHtml +=			'</span></div></div>';
							platHtml +=			'<div class="col-sm-5"><div class="description-block"><h5 class="description-header">胜负关系</h5><span class="description-text">';
							platHtml +=				'<input id="plat_cw' + index + '" name="match_result' + index + '" type="radio" value="1" />';
							platHtml +=				'<label for="plat_cw' + index + '">挑战者胜</label>';
							platHtml +=				'<input id="plat_aw' + index + '" name="match_result' + index + '" type="radio" value="2" />';
							platHtml +=				'<label for="plat_aw' + index + '">擂主胜</label>';
							platHtml +=				'<input id="plat_draw' + index + '" name="match_result' + index + '" type="radio" value="3" />';
							platHtml +=				'<label for="plat_draw' + index + '">平局</label>';
							platHtml +=			'</span></div></div>';
							platHtml +=		'</div></div>';
							platHtml += '</div></div></div>';
						}
					});
					
					$('#platInfo').html(platHtml);
					
					$('#match_score').attr('disabled', 'disabled');
					$('#match_score option').remove();
					$('#match_score').append('<option value="0:0">' + rowData.challengerName + ' 0:0 ' + rowData.adversaryName + '</option>');
		          	$('#match_score').append('<option value="1:0">' + rowData.challengerName + ' 1:0 ' + rowData.adversaryName + '</option>');
		          	$('#match_score').append('<option value="2:0">' + rowData.challengerName + ' 2:0 ' + rowData.adversaryName + '</option>');
		          	//$('#match_score').append('<option value="3:0">' + rowData.challengerName + ' 3:0 ' + rowData.adversaryName + '</option>');
		          	$('#match_score').append('<option value="0:1">' + rowData.challengerName + ' 0:1 ' + rowData.adversaryName + '</option>');
		          	$('#match_score').append('<option value="1:1">' + rowData.challengerName + ' 1:1 ' + rowData.adversaryName + '</option>');
		          	$('#match_score').append('<option value="2:1">' + rowData.challengerName + ' 2:1 ' + rowData.adversaryName + '</option>');
		          	//$('#match_score').append('<option value="3:1">' + rowData.challengerName + ' 3:1 ' + rowData.adversaryName + '</option>');
		          	$('#match_score').append('<option value="0:2">' + rowData.challengerName + ' 0:2 ' + rowData.adversaryName + '</option>');
		          	$('#match_score').append('<option value="1:2">' + rowData.challengerName + ' 1:2 ' + rowData.adversaryName + '</option>');
		          	//$('#match_score').append('<option value="2:2">' + rowData.challengerName + ' 2:2 ' + rowData.adversaryName + '</option>');
		          	//$('#match_score').append('<option value="3:2">' + rowData.challengerName + ' 3:2 ' + rowData.adversaryName + '</option>');
		          	//$('#match_score').append('<option value="0:3">' + rowData.challengerName + ' 0:3 ' + rowData.adversaryName + '</option>');
		          	//$('#match_score').append('<option value="1:3">' + rowData.challengerName + ' 1:3 ' + rowData.adversaryName + '</option>');
		          	//$('#match_score').append('<option value="2:3">' + rowData.challengerName + ' 2:3 ' + rowData.adversaryName + '</option>');
					$('#match_score').val(rowData.score);
					
					$('#cw, #aw, #draw, #ca, #aa').iCheck({
					    checkboxClass: 'icheckbox_square-blue margin',
						radioClass: 'iradio_square-blue margin',
					    increaseArea: '20%' // optional
					});
					$('#cw, #aw, #draw').iCheck('disable');
					$('#ca, #aa').on('ifChecked', function(event){
						$('[id^=plat_cw], [id^=plat_aw], [id^=plat_draw]').iCheck('uncheck');
						$('#match_score').get(0).selectedIndex = -1;
					});
					var battleResult = rowData.result;
					$('#cw, #aw, #draw, #ca, #aa').each(function(index, radio){
						var self = $(this);
						self.iCheck('uncheck');
						if(self.val() == battleResult) {
							self.iCheck('check');
						}
					});
					
					$('[id^=crt], [id^=crp], [id^=crz], [id^=art], [id^=arp], [id^=arz], [id^=plat_cw], [id^=plat_aw], [id^=plat_draw]').iCheck({
					    checkboxClass: 'icheckbox_square-blue margin',
						radioClass: 'iradio_square-blue margin',
					    increaseArea: '20%' // optional
					});
					$('[id^=crt], [id^=crp], [id^=crz]').each(function(index, radio){
						var self = $(this);
						if(self.val() == rowData.challengerRace[0]) {
							self.iCheck('check');
						}
					});
					$('[id^=art], [id^=arp], [id^=arz]').each(function(index, radio){
						var self = $(this);
						if(self.val() == rowData.adversaryRace[0]) {
							self.iCheck('check');
						}
					});
					$('[id^=plat_cw], [id^=plat_aw], [id^=plat_draw]').on('ifChecked', function(event){
						//var id = $(this).attr('id');
						var score = $('[id^=plat_cw]:checked').length + ':' + $('[id^=plat_aw]:checked').length;
						$('#match_score').val(score);
						if( $('[id^=plat_cw]:checked').length > $('[id^=plat_aw]:checked').length ) {
							$('#cw').iCheck('check');
						}
						if( $('[id^=plat_cw]:checked').length < $('[id^=plat_aw]:checked').length ) {
							$('#aw').iCheck('check');
						}
						if( $('[id^=plat_cw]:checked').length == $('[id^=plat_aw]:checked').length ) {
							$('#draw').iCheck('check');
						}
						
					});
					
					battles.forEach(function(battle, index){
						for( var index = 0; index < 3; index++ ) {
							if( battle.mapName === $('#plat' + index).html().trim() ) {
								$('#crt'+index+',#crp'+index+',#crz'+index).each(function(){
									var challengerRace = $(this);
									if( challengerRace.val() == battle.challengerRace ) {
										challengerRace.iCheck('check');
									}
								});
								$('#art'+index+',#arp'+index+',#arz'+index).each(function(){
									var adversaryRace = $(this);
									if( adversaryRace.val() == battle.adversaryRace ) {
										adversaryRace.iCheck('check');
									}
								});
								$('#plat_cw'+index+',#plat_aw'+index+',#plat_draw'+index).each(function(){
									var platResult = $(this);
									if( platResult.val() == battle.result ) {
										platResult.iCheck('check');
									}
								});
							}
						}
					});
					
					$('#match_info_detail_confirm').data('match_info', rowData);
					$('#match_info_detail_confirm').data('table_index', tableIndex);
					$('#match_info_detail_player_name').html(title);
					$('#match_info_detail_modal').modal('show');
					$('#match_info_detail_modal').focus();
				} else {
					var message = "查询对战信息失败![" + retObj.message + "]";
					$.ILBCJ.tipMessage(message, false);
				}
			});
			return;
		},
		createBattleObj: function (challengerId, adversaryId, challengerRace, adversaryRace, 
				platResult, platName){
	    	this.challengerId = challengerId;
			this.adversaryId = adversaryId;
			this.challengerRace = challengerRace;
			this.adversaryRace = adversaryRace;
			this.result = platResult;
			this.mapName = platName;
	    },
		editMatchInfoConfirm: function () {
			var matchInfo = $('#match_info_detail_confirm').data('match_info');
			var tableIndex = $('#match_info_detail_confirm').data('table_index');
			
			var battleResult = 0;
			$('#cw, #aw, #draw, #ca, #aa').each(function(index, radio){
				var self = $(this);
				if(self.prop('checked')) {
					battleResult = self.val();
				}
			});
			var score = $('#match_score').val();
			
			
			var postData = 'matchInfoDetail.id=' + matchInfo.id;
			postData += '&matchInfoDetail.result=' + battleResult;
			postData += '&matchInfoDetail.score=' + score;
			
			
			var convertArray = new Array();
			var challengerId = matchInfo.challengerId;
	    	var adversaryId = matchInfo.adversaryId;
	    	for(var index=0; index < 3; index++) {
	    		var platResult = $('#plat_cw' + index + ':checked,#plat_aw' + index + ':checked,#plat_draw' + index + ':checked').val();
	    		if( platResult != undefined ) {
	    			var platName = $('#plat' + index).html().trim();
	    			var challengerRace = $('#crt' + index + ':checked, #crp' + index + ':checked, #crz' + index + ':checked').val();
					var adversaryRace = $('#art' + index + ':checked, #arp' + index + ':checked, #arz' + index + ':checked').val();
		    		var battleInfo = new $.ILBCJ.match.createBattleObj(challengerId, adversaryId, challengerRace, adversaryRace, platResult, platName);
	    			convertArray.push(battleInfo);
    			}
	    	}
	    	var tmp = JSON.stringify(convertArray);
	    	postData += '&battleInMatchInfo='+ tmp;
	    	
			o.basePath && $.post(o.basePath + '/match/saveMatchInfoDetail.action', postData, function(retObj) {
				if(retObj.result == true) {
					matchInfo.result = battleResult;
					//$('#active_match_info_day_' + tableIndex).DataTable().draw();
					$.ILBCJ.match.queryActiveMatchInfo();
					var message = '保存对战结果信息成功!';
					$.ILBCJ.tipMessage(message);
				} else {
					var message = '保存对战结果信息失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');
		},
		matchConfirmModalConfirm: function () {
			// 1 -- updateMatchInfoConfirm()
			var type = $('#match_confirm_modal_confirm').data('type');
			if(type === 1) {
				$.ILBCJ.match.updateMatchInfoConfirm();
			}
			else {
				$.ILBCJ.tipMessage("没有找到合适的处理流程，请联系系统维护人员!", false);
			}
		},		
		updateMatchInfo: function () {
			var message = '执行对战匹配操作后，会丢失现有对战相关结果，是否继续归档？';
			$('#match_confirm_modal_message').empty().append(message);
			$('#match_confirm_modal_confirm').data('type', 1);
			$("#match_confirm_modal").modal('show');
		},
		updateMatchInfoConfirm: function () {
			$("#progress_Modal").modal('show');
			o.basePath && $.post(o.basePath + "/match/updateMatchInfo.action", {}, function(retObj) {
				$("#progress_Modal").modal('hide');
				if(retObj.result == true) {
					var message = "根据最新报名结果匹配对战信息完成!";
					$.ILBCJ.tipMessage(message);
					$.ILBCJ.match.queryActiveMatchInfo();
					//o.basePath && $('#match_day_info_table').DataTable().ajax.reload();
				} else {
					var message = "匹配对战信息失败![" + retObj.message + "]";
					$.ILBCJ.tipMessage(message, false);
				}
			}, "json");
		}		
	};// end of $.ILBCJ.match
	
	/* score
	* ======
	* score infomation maintain page
	*
	* @type Object
	* @usage $.ILBCJ.score.activate()
	* @usage $.ILBCJ.score.save()
	* @usage $.ILBCJ.score.reset()
	*/
	$.ILBCJ.score = {
		activate: function () {
//			$.ILBCJ.score.reset();
			o.basePath && $.post(o.basePath + '/score/queryRoundList.action', {}, function(retObj){
				if(retObj.result == true) {
					var rounds = retObj.rounds;
					var htmlData = '<li class="time-label"><span class="bg-red">第一赛季</span></li>';
					rounds.forEach(function(round, index){
						htmlData += '<li><i class="fa fa-table bg-blue"></i>';
						htmlData +='<div class="timeline-item">';
						htmlData += '<span class="time"><i class="fa fa-clock-o"></i> ' + round.timestamp + '</span>';
						//htmlData += '<h3 class="timeline-header"><a data-toggle="collapse" data-target="#round' + index + '" href="#" ' + ( index === 0 ? '' : 'class="collapsed"' ) +  ' data-round_id="' + round.id + '">' + round.name + '</a></h3>';
						htmlData += '<h3 class="timeline-header"><a data-toggle="collapse" data-target="#round' + index + '" href="#" class="round-score collapsed" data-round_id="' + round.id + '">' + round.name + '</a></h3>';
						htmlData += '<div class="timeline-body">';
						htmlData += '<div class="box box-primary collapse " id="round' + index + '">';
						htmlData += '<div class="box-body no-padding"><table id="round_score_' + round.id + '" class="table table-striped table-hover"></table></div>';
						htmlData += '</div></div></div></li>';
					});
					
					htmlData += '<li><i class="fa fa-clock-o bg-gray"></i></li>';
					
					$('#score_list').html(htmlData);
					
					$('.round-score').on('click.ILBCJ.score.scoreload', $.ILBCJ.score.loadScore);
					
					$('.round-score').get(0).click();
				}
				else {
					var message = '获取比赛场次信息失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
		            return;
				}
			});
			//listen page items' event
//			$('#score_reset').on('click.ILBCJ.score.reset', $.ILBCJ.score.reset);
//			$('#score_save').on('click.ILBCJ.score.save', $.ILBCJ.score.save);
			
		},
		loadScore: function () {
			var roundTitle = $(this);
			var isLoaded = roundTitle.data('loaded');
			if(isLoaded) {
				return;
			}
			
			var roundId = roundTitle.data('round_id');
			var postData = 'roundId=' + roundId;
			o.basePath && $.post(o.basePath + '/score/queryRoundScore.action', postData, function(retObj){
	    		if(retObj.result == true)
				{
					$('#round_score_' + roundId).DataTable( {
						paging: false,
				        data: retObj.items,
				        rowId: 'id',
				        columns: [
				        	{ title: '操作', data: null, defaultContent: '', width: '100px' },
				        	{ title: '选手', data: 'playerName', width: '200px' },
				        	{ title: '排名', data: 'ranking' },
				            { title: '比分', data: 'score' }	,
				            { title: '挑战胜场', data: 'challengerWin', width: '200px' },
				            { title: '挑战败场', data: 'challengerLose', width: '200px' },
				            { title: '守擂胜场', data: 'adversaryWin', width: '200px' },
				            { title: '守擂败场', data: 'adversaryLose', width: '200px' },
				            { title: '是否缺席', data: 'absent', width: '200px' }					            				            
				        ],
				        columnDefs: [
				        	{
								render: function ( data, type, row ) {
									var html = '';
									if(data === 0) {
										if(row.challengerWin === 0 && row.challengerLose === 0 && row.adversaryWin === 0 && row.adversaryLose === 0) {
											html = '<span class="winner">本周未申请比赛</span>' ;
										}
										else {
											html = '<span class="looser">全部出席</span>' ;
										}
									}
									else if(data === 1) {
										html = '<span class="winner">存在缺席</span>' ;
									}
									return html;
								},
								targets: 8
							},
				        	{
								render: function ( data, type, row ) {
									var html = '<div class="btn-group">';
									html += '<button class="score_detail_info btn btn-xs btn-success" data-memo="' + row.memo + '"><i class="fa fa-edit"></i>积分详情</button>';
									html += '</div>';
									return html;
								},
								targets: 0
							}
						]
				    });
					
					$('#round_score_' + roundId).on( 'draw.dt', function () {
						$('.score_detail_info').on('click.ILBCJ.score.info.detail', $.ILBCJ.score.detailScoreInfo);
					});
					
					roundTitle.data('loaded', true);
				} else {
					var message = '获取比赛积分信息失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, 'json');			
		},
		detailScoreInfo: function () {
			var memo = $(this).data('memo');
			var strs=memo.split("],"); //字符分割 
			memo = '';
			var i=0;
			for (;i<strs.length ;i++ ) 
			{ 
				if(strs[i].length > 0) {
					memo += strs[i] + ']<br/>'; //分割后的字符输出
				}
			} 
			$('#detail_score_info_message').empty().append(memo);
			$('#detail_score_info_modal').modal('show');
		}
	};// end of $.ILBCJ.score
	
	/* config
	* ======
	* config infomation maintain page
	*
	* @type Object
	* @usage $.ILBCJ.config.activate()
	* @usage $.ILBCJ.config.save()
	* @usage $.ILBCJ.config.reset()
	*/
	$.ILBCJ.config = {
		activate: function () {
			$.ILBCJ.config.reset();
			
			//listen page items' event
			$('#config_reset').on('click.ILBCJ.config.reset', $.ILBCJ.config.reset);
			$('#config_save').on('click.ILBCJ.config.save', $.ILBCJ.config.save);
			
		},
		reset: function () {
			o.basePath && $.post(o.basePath + '/config/query.action', {}, function(retObj){
		        if(retObj.result == true) {
		        	var config = retObj.config;
		        	$('#max_challenge_count').val(config.maxChallengeCount);
		        	$('#max_players_count').val(config.maxPlayersCount);
		        	//$('#max_date_range').val(config.maxDateRange);
		        	$('#init_round_id').val(config.initRoundId);
		        	$('#max_init_top_one_score').val(config.maxInitTopOneScore);
		        	$('#init_score_diminishing_step').val(config.initScoreDiminishingStep);
		        	$('#first_player_accept_challenge_count').val(config.firstPlayerAcceptChallengeCount);
		        	$('#min_accept_challenge_count').val(config.minAcceptChallengeCount);
		        	
		        	$('#max_percent_of_challenger_win').val(config.maxPercentOfChallengerWin);
		        	$('#percent_of_challenger_win_diminishing_step').val(config.percentOfChallengerWinDiminishingStep);
		        	$('#rate_of_chosen_mondy_to_thursday').val(config.rateOfChosenMondyToThursday);
		        	$('#rate_of_chosen_saturday_to_sunday').val(config.rateOfChosenSaturdayToSunday);
		        	
		        	if( retObj.plats.length == 0 ) {
						var message = "获取比赛地图信息失败![没有可用地图]";
						$.ILBCJ.tipMessage(message, false);
						return;
					}
					var platOptionStr = '';//'<option value></option>'
					// 对战地图
					retObj.plats.forEach(function(plat, index){
						platOptionStr += '<option value=' + plat.id + '>' + plat.name + '</option>';
					});
					$('#bonus_plat').append( platOptionStr );
		        	$('#bonus_plat').select2();
		        	if(config.bonusPlat != null && config.bonusPlat != undefined) {
		        		var plats = config.bonusPlat.split(',');
		        		$('#bonus_plat').val(plats).select2();
		        	}
		        	$('#bonus_plat_score').val(config.bonusPlatScore);
		        	$('#player_notice').val(config.playerNotice);
		        } else { 
					var message = '加载系统配置失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
		            return false;
		        } 
			});
		},
		save: function () {
			var postData = 'config.maxChallengeCount=' + $('#max_challenge_count').val();
			postData += '&config.maxPlayersCount=' + $('#max_players_count').val();
			postData += '&config.maxDateRange=6';
			postData += '&config.initRoundId=' + $('#init_round_id').val();
		    postData += '&config.maxInitTopOneScore=' + $('#max_init_top_one_score').val();
		    postData += '&config.initScoreDiminishingStep=' + $('#init_score_diminishing_step').val();
			postData += '&config.firstPlayerAcceptChallengeCount=' + $('#first_player_accept_challenge_count').val();
			postData += '&config.minAcceptChallengeCount=' + $('#min_accept_challenge_count').val();
			postData += '&config.maxPercentOfChallengerWin=' + $('#max_percent_of_challenger_win').val();
		    postData += '&config.percentOfChallengerWinDiminishingStep=' + $('#percent_of_challenger_win_diminishing_step').val();
		    postData += '&config.rateOfChosenMondyToThursday=' + $('#rate_of_chosen_mondy_to_thursday').val();
		    postData += '&config.rateOfChosenSaturdayToSunday=' + $('#rate_of_chosen_saturday_to_sunday').val();
			var plats = $('#bonus_plat').val();
			if(plats != null) {
				postData += '&config.bonusPlat=' + plats;
			}
			postData += '&config.bonusPlatScore=' + $('#bonus_plat_score').val();
			postData += '&config.playerNotice=' + $('#player_notice').val();
			o.basePath && $.post(o.basePath + '/config/save.action', postData, function(retObj){
	    		if(retObj.result == true)
				{
					var message = '保存配置信息成功!';
					$.ILBCJ.tipMessage(message);
				} else {
					var message = '保存配置信息失败![' + retObj.message + ']';
					$.ILBCJ.tipMessage(message, false);
				}
			}, "json");
		}
	};// end of $.ILBCJ.config
  
	/* TipMessage(message)
	* ==========
	* Showing the info or warn message.
	*
	* @type Function
	* @usage: $.ILBCJ.tipMessage(message)
	*/
	$.ILBCJ.tipMessage = function(message, isAutoClose) {
		isAutoClose = arguments[1]===undefined ? true : arguments[1];
		$('#tipModal').removeClass('modal-danger').removeClass('modal-info');
		if( isAutoClose ) {
			$('#tipModal').addClass('modal-info');
		}
		else {
			$('#tipModal').addClass('modal-danger');
			$('#tipModal').modal({backdrop: 'static', keyboard: false});
		}
		$('#tipMessage').empty().append(message);
		$('#tipModal').modal('show');
		if(isAutoClose) {
			var modalTimeOutId = setTimeout(function(){$('#tipModal').modal('hide');},2000);
		}
		
		//console.log( 'timerId: ' +  modalTimeOutId);
		$('#tipModal').on('hidden.bs.modal', function (e) {
			if(isAutoClose)
				clearTimeout(modalTimeOutId);
		});
	};// end of $.ILBCJ.tipMessage
  
	/* CheckLoad()
	* ==========
	* check load response.
	*
	* @type Function
	* @usage: $.ILBCJ.checkLoad(response)
	*/
	$.ILBCJ.checkLoad = function(response) {
		if(! new RegExp('content-wrapper-inner').test(response) ){
			window.location.href = $.ILBCJ.options.basePath;
		}
			
	};// end of $.ILBCJ.checkLoad
  
///* CheckLoad()
//* ==========
//* active function of checkbox in table, which can turn the rows's check status on/off.
//*
//* @type Function
//* @usage: $.ILBCJ.checkLoad()
//*/
//$.ILBCJ.checkLoad = function() {
//		
//};// end of $.ILBCJ.checkLoad
  
}
