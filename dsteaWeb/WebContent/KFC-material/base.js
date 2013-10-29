/**
 * 页面共通js
 * 包含导航栏特效，菜单栏特效
 */
var base = function() {
	/** 初始化导航栏 */
	function initNav() {
		$("a").bind("focus",function() {if(this.blur) {this.blur();}});
		if($("#isLogin").val() == "true") {
			// 重新登录			
			$(".w2").click(function(){
				// 订单成功页面
				if ($('#page_flag').val() == 'suc') {
					base.setAction("returnCustomer.action");
					return;
				}
				
				base.yumConfirm(property.giveUpOrder,function(){
					loginExit(function(){
						base.setAction("orderLogin.action");
					});
				});
			});
			
			// 查询订单
			$(".w3").click(function(){
				if ($('#page_flag').val() == 'suc' || $('#page_flag').val() == 'customer' || $('#page_flag').val() == 'returnCustomer') {
					base.setAction("check.action");
					return;
				} else {
					base.yumConfirm(property.giveUpOrder,function(){
						loginExit(function(){
							base.setAction("checkLogin.action");
						});
					});
					return;
				}
			});
		} else {
			// 开始订餐 			
			if($("#loginFlag").val() == "true") {
				$(".w2").click(function(){
					// 跳转到单独登陆页面
					base.yumConfirm(property.giveUpOrder,function(){
						loginExit(function(){
							base.setAction("orderLogin.action");
						});
					});
				});
				$(".w3").click(function(){
			
					if ($('#page_flag').val() == 'suc') {
						base.setAction("check.action");
						return;
					}
					
					base.yumConfirm(property.giveUpOrder,function(){
						loginExit(function(){
							base.setAction("checkLogin.action");
						});
					});
				});
			} else {
				$(".w2").click(function(){
//					base.inOper(function(){
//						base.setAction("orderLogin.action");
//						window.location.href = requestContextPath+"/orderLogin.action";
//						return false;
//					});
						window.location.href = requestContextPath+"/orderLogin.action";
						return false;
				});
				$(".w3").click(function(){
					window.location.href = requestContextPath+"/checkLogin.action";
				});
			}
		}
		
		if($("#loginFlag").val() == "true") {
			
			// 获取页面标示
			var page_flag = $('#page_flag').val();
			// 跳转到首页
			$(".w1").click(function(){
				
				if (page_flag == 'customer' || page_flag == 'suc' || page_flag == 'returnCustomer'){
					base.yumConfirm(property.giveUpLogin,function(){
						loginExit(function(){
							window.location.href = httpHtmlPath +"/index.html";
						});
					});
				} else if (page_flag == 'home'){// 如果是在home页面，点击首页按钮只刷新中间区域
					// 设置【首页】按钮标示
					$('#topFlag').val('w1');
					KFC_Comon.initContent(1);
				} else {
					$('#topFlag').val('w1');
					base.setAction('continueShopping.action');
				} 
			});
			// 跳转到手机客户端页面
			$(".w4").click(function(){
					//loginExit(function(){
						//window.location.href = requestContextrequestContextPath+"/appIndex.jsp"; 
				window.open(requestContextPath +'/jsp/app/appIndex.html'); 
					//});
			});
			// 跳转到帮助页面
			$(".w5").click(function(){
//				base.yumConfirm(property.giveUpOrder,function(){
//					loginExit(function(){
				window.open( requestContextPath+"/jsp/help/help_new.html"); 
//					});
//				});
			});
			// 跳转到law
			$(".bg1").click(function(){
//				base.yumConfirm(property.giveUpOrder,function(){
//					loginExit(function(){
				window.open(requestContextPath+"/jsp/law/law.html"); 
//					});
//				});
			});
			// 跳转到policy
			$(".bg2").click(function(){
//				base.yumConfirm(property.giveUpOrder,function(){
//					loginExit(function(){
				window.open( requestContextPath+"/jsp/policy/policy.html"); 
//					});
//				});
			});
			
			
			

			$(".h_1").click(function(){			
				window.open(requestContextPath+"/jsp/help/help_new.html"); 
			});
			$(".h_2").click(function(){			
				window.open(requestContextPath+"/jsp/help/help_qa.html#10"); 
			});
			$(".h_3").click(function(){			
				window.open(requestContextPath+"/jsp/help/help_qa.html#3"); 
			});
			$(".h_4").click(function(){			
				window.open(requestContextPath+"/jsp/help/help_qa.html#2"); 
			});
			
			
			$('.logo').click(function(){
				$(".w1").click();
			});
		} else {
			// 跳转到首页
			$(".w1").click(function(){
				//window.location.href = requestContextPath+"/index.action";
				window.location.href = httpHtmlPath +"/index.html";
			});
			// 跳转到首页
			$('.logo').click(function(){
				//window.location.href = requestContextPath+"/index.action";
				window.location.href = httpHtmlPath +"/index.html";
			});
			// 跳转到手机客户端页面
			$(".w4").click(function(){
				//window.location.href = requestContextPath+"/index.action";
				//window.location.href = httpHtmlPath +"/index.html";
				window.open(requestContextPath +'/jsp/app/appIndex.html'); 
				
			});
			// 跳转到帮助页面
			$(".w5").click(function(){
				window.open(requestContextPath+"/jsp/help/help_new.html"); 
			});
			// 跳转到law
			$(".bg1").click(function(){
//				base.yumConfirm(property.giveUpOrder,function(){
//					loginExit(function(){
				window.open(requestContextPath+"/jsp/law/law.html"); 
//					});
//				});
			});
			// 跳转到policy
			$(".bg2").click(function(){
//				base.yumConfirm(property.giveUpOrder,function(){
//					loginExit(function(){
				window.open(requestContextPath+"/jsp/policy/policy.html"); 
//					});
//				});
			});
			
			$(".h_1").click(function(){			
				window.open(requestContextPath+"/jsp/help/help_new.html"); 
			});
			$(".h_2").click(function(){			
				window.open(requestContextPath+"/jsp/help/help_qa.html#10"); 
			});
			$(".h_3").click(function(){			
				window.open(requestContextPath+"/jsp/help/help_qa.html#3"); 
			});
			$(".h_4").click(function(){			
				window.open(requestContextPath+"/jsp/help/help_qa.html#2"); 
			});
			
			
			
			
		}
		
		// 添加到收藏夹
		$(".favbtn").click(function(){
			//var url = httpHtmlPath + '/index.html';
			//var url = window.location.href;
			var url = 'http://www.4008823823.com.cn';
			var title = pageMessage.base_title;
			addfavorite(url,title);
		});
		
//		$(".english").click(function(){
//			var content = "English website is still under construction and will be published by the end of October.<br>You can call 4008823823 for English ordering.  Thanks for your understanding.";
//			base.yumAlertEN(content);
//		});				
		
		// 初始化登录用户信息
		$(".loginExit").live("click",function(){
			base.yumConfirm(property.exitOrderToIndex,function(){
				loginExit(function(){
					//base.setAction("index.action");
					window.location.href = httpHtmlPath +"/index.html";
				});
			});
		});
		
		$(".login").live("click",function(){
			window.location.href = requestContextPath +'/orderLogin.action';
		});
		
		/*$('#law').live('click', function(){
			window.open(requestContextPath +'/law.action');
			//window.location.href = path +"/law.action";
		});
		
		$('#policy').live('click', function(){
			window.open(requestContextPath +'/policy.action');
		});*/
		
		function getRefreshUrl() {
			if($('#refreshUrl').length>0){
				return requestContextPath+$('#refreshUrl').val();
			}else{
				var url=window.location.href;
				var index=window.location.href.indexOf('#');
				if(index==-1){
					return url;
				}
					
				return url.substr(0, index);
			}
		}
		
		$('#change_cn').click(function(event) {
			event.preventDefault();
			if(window.location.href.indexOf('/en')>0) { 
				window.location.href=getRefreshUrl().replace(/\/en\//, '/');
			}
			if(requestContextPath.indexOf('/en')>0){
				requestContextPath=requestContextPath.replace(/\/en\//, '/');
			}
			if(httpHtmlPath.indexOf('/en')>0){
				httpHtmlPath=httpHtmlPath.replace(/\/en\//, '/');
			}
		});
		
		$('#change_en').click(function(event) {
			var content = "English website is still under construction and will be published by the end of October.<br>You can call 4008823823 for English ordering.  Thanks for your understanding.";
			base.yumAlert(content);
			
			/*event.preventDefault();
			if(window.location.href.indexOf('/en')<0) { 
				window.location.href=getRefreshUrl().replace(/\/(?=\w+.(action|htm|html))/, '/en/');*//*(?=是一个标准，后面满足=后面才有效)*/
			/*}
			if(requestContextPath.indexOf('/en')<0){
				requestContextPath=requestContextPath+'/en';
			}
			if(httpHtmlPath.indexOf('/en')<0){
				httpHtmlPath=httpHtmlPath+'/en';
			}*/
		});
		
		base.initUrl();
	}
	
	/** 初始化国际化请求路径(向后台请求) */
	function initUrl(){
		if(requestContextPath.indexOf('/en/')<0) { 
			if(window.location.href.indexOf('/en/')>0){
				requestContextPath=requestContextPath+'/en';
			}
		}else{
			if(window.location.href.indexOf('/en/')<0){
				requestContextPath=requestContextPath.replace(/\/en\//, '/');
			}
		}
		// 静态页面
		if(httpHtmlPath.indexOf('/en/')<0) { 
			if(window.location.href.indexOf('/en/')>0){
				httpHtmlPath=httpHtmlPath+'/en';
			}
		}else{
			if(window.location.href.indexOf('/en/')<0){
				httpHtmlPath=httpHtmlPath.replace(/\/en\//, '/');
			}
		}
	}
	
	// 用户登出
	function loginExit(callback) {
		$.ajax({
			dataType:"json",
			type: "POST",
			data:{}, 
			url: requestContextPath+"/loginExit.action",
			beforeSend: function(XMLHttpRequest){
				//ShowLoading();
			},
			success: function(data, textStatus){
				if(data.code == serviceCode.SUC_CODE && callback != undefined && callback != null) {
					callback.call();
				}
			},
			complete: function(XMLHttpRequest, textStatus){
				//HideLoading();
			},
			error: function(){
				base.yumAlert(property.BadRequest);
			}
		});
	}
	
	/** 添加到收藏夹 */
	function addfavorite(url, title) {  
		 try {  
	            window.external.AddToFavoritesBar(url, title); //IE7、IE8、IE9
	        } catch (e) {  
	            try {  
	                window.external.addFavorite(url, title); //IE6  
	            } catch (e) {  
	                try {  
	                    window.sidebar.addPanel(title, url, title); //FireFox  
	                } catch (e) {  
	                	// Chrome
	                	base.yumAlert(property.favoriteBtn); 
	                }  
	            }  
	        } 
    }  
	
	/** 判断是否在营业时间内 */
	function inOper(callback) {
		// 判断是否在营业时间内
		$.ajax({
			dataType:"json",
			type: "POST",
			data:{}, 
			url: requestContextPath+"/inOperating.action",
			beforeSend: function(XMLHttpRequest){
				//ShowLoading();
			},
			success: function(data, textStatus){
				if(data.code == serviceCode.SUC_CODE) {
					if(data.message == "true") {
						callback.call();
					} else {
						base.yumAlert(property.notInOper);
					}
				}
			},
			complete: function(XMLHttpRequest, textStatus){
				//HideLoading();
			},
			error: function(){
				base.yumAlert(property.BadRequest);
			}
		});
	}
	
	/** 品牌跳转 */
	function initBrand() {
		$("#brandSelect").live("change",function(){
			window.location.href = $(this).val();
		});
	}
	
	/** form表单提交 */
	function setAction(action,method,formId,target) {
		action = requestContextPath+"/"+action;
		method = method||"post";
		formId = "#"+(formId||"mainForm");
		target = target||"_self";
		$(formId).attr("action",action).attr("method",method).attr("target",target).submit();
	}
	
	function yumAlert(text) {
		$("#dialog-message-alert span").html(text);
		$("#dialog-message-alert").dialog({
			resizable: false,
			minHeight:'96px',
			modal: true,
			closeOnEscape:true,
			dialogClass:"ui-alert",
			position:{my: "center",
					   at: "center",
					   of: window,
					   collision:"fit"},
			buttons: {
				base_confirm : function() {
					$(this).dialog("close");
				}
			}
		});
	}
	
	function yumAlertLeft(text,callback) {
		$("#dialog-message-alert span").html(text);
		$("#dialog-message-alert").dialog({
			resizable: false,
			minHeight:'96px',
			width: '400px',
			modal: true,
			closeOnEscape:true,
			dialogClass:"ui-alert",
			position:{my: "center",
					   at: "center",
					   of: window,
					   collision:"fit"},
			buttons: {
				base_confirm : function() {
					$(this).dialog("close");
					callback.call(); // 回调
				}
			}
		});
	}
	
	function yumAlertEN(text,callback) {
		$("#dialog-message-alert span").html(text);
		$("#dialog-message-alert").dialog({
			resizable: false,
			title:'Information',
			minHeight:'96px',
			width: '600px',
			modal: true,
			closeOnEscape:true,
			dialogClass:"ui-alert",
			position:{my: "center",
					   at: "center",
					   of: window,
					   collision:"fit"},
			buttons: {
				"OK": function() {
					$(this).dialog("close");
					callback.call(); // 回调
				}
			}
		});
	}	
	
	function yumAlertBack(text,callback) { 
		$("#dialog-message-alert-back span").html(text);
		$("#dialog-message-alert-back").dialog({
			resizable: false,
			minHeight:'96px',
			modal: true,
			closeOnEscape:false,
			dialogClass:"ui-alert",
			position:{my: "center",
				   at: "center",
				   of: window,
				   collision:"fit"},
			buttons: {
				base_confirm : function() {
					$(this).dialog("close");
					callback.call(); // 回调
				}
			}
		});
	}
	
	function yumConfirm(text,callback1,callback2) { 
		$("#dialog-message-confirm span").html(text);
		$("#dialog-message-confirm").dialog({
			resizable: false,
			minHeight:'96px',
			modal: true,
			closeOnEscape:true,
			dialogClass:"ui-alert",
			position:{my: "center",
				   at: "center",
				   of: window,
				   collision:"fit"},
			buttons: {
				base_confirm : function() {
					$(this).dialog("close");
					if(callback1) {
						callback1.call(); // 回调
					}
				},
				base_cancle : function() {
					$(this).dialog("close");
					if(callback2) {
						callback2.call(); // 回调
					}
				}
			}
		});
	}
	
	function yumDonationConfirm(text,callback1,callback2) { 
		$("#dialog-message-confirm span").html(text);
		$("#dialog-message-confirm").dialog({
			resizable: false,
			minHeight:'96px',
			width: '400px',
			modal: true,
			closeOnEscape:true,
			dialogClass:"ui-alert",
			position:{my: "center",
				   at: "center",
				   of: window,
				   collision:"fit"},
			buttons: {
				base_confirm : function() {
					$(this).dialog("close");
					if(callback1) {
						callback1.call(); // 回调
					}
				},
				base_quitDonate : function() {
					$(this).dialog("close");
					if(callback2) {
						callback2.call(); // 回调
					}
				}
			}
		});
	}
	
	/** 订单确认[下一步]优惠非空验证*/
	function yumNextProConfirm(text,callback1,callback2) { 
		$("#dialog-message-confirm span").html(text);
		$("#dialog-message-confirm").dialog({
			resizable: false,
			minHeight:'96px',
			modal: true,
			closeOnEscape:true,
			dialogClass:"ui-alert",
			position:{my: "center",
				   at: "center",
				   of: window,
				   collision:"fit"},
			buttons: {
				base_nextStep : function() {
					$(this).dialog("close");
					if(callback1) {
						callback1.call(); // 回调
					}
				},
				base_backCunrrent : function() {
					$(this).dialog("close");
					if(callback2) {
						callback2.call(); // 回调
					}
				}
			}
		});
	}
	
	/** 优惠关闭非空验证*/
	function yumCloseProConfirm(text,callback1,callback2) { 
		$("#dialog-message-confirm span").html(text);
		$("#dialog-message-confirm").dialog({
			resizable: false,
			minHeight:'96px',
			modal: true,
			closeOnEscape:true,
			dialogClass:"ui-alert",
			position:{my: "center",
				   at: "center",
				   of: window,
				   collision:"fit"},
			buttons: {
				base_addOrder : function() {
					$(this).dialog("close");
					if(callback1) {
						callback1.call(); // 回调
					}
				},
				base_noNeed : function() {
					$(this).dialog("close");
					if(callback2) {
						callback2.call(); // 回调
					}
				}
			}
		});
	}
	
	/*(start) add by qin_yan 转网用户 20130803*/
	function yumConfirmNetLater(text,callback1,callback2) { 
		$("#dialog-message-confirm span").html(text);
		$("#dialog-message-confirm").dialog({
			resizable: false,
			minHeight:'96px',
			modal: true,
			closeOnEscape:true,
			dialogClass:"ui-alert",
			position:{my: "center",
				   at: "center",
				   of: window,
				   collision:"fit"},
			buttons: {
				base_continueOrder : function() {
					$(this).dialog("close");
					if(callback1) {
						callback1.call(); // 回调
					}
				},
				base_loginLater : function() {
					$(this).dialog("close");
					if(callback2) {
						callback2.call(); // 回调
					}
				}
			}
		});
	}
	/*(end) add by qin_yan 转网用户 20130803*/
	
	function changeLang(locale){
		$.ajax({
			dataType:"json",
			type: "GET",
			data:{lang:locale}, 
			url: requestContextPath+"/lang.action",
			beforeSend: function(XMLHttpRequest){
				//ShowLoading();
			},
			success: function(data, textStatus){
				if(data.code==1) {
					window.location.href = window.location.href ;
				}
			},
			complete: function(XMLHttpRequest, textStatus){
				//HideLoading();
			},
			error: function(){
				//base.yumAlert(property.BadRequest);
			}
		});
	}
	function openloading(){
		
		$( "#dialog-loading" ).dialog({
			resizable: false,
			minHeight:'96px',
			title:"",
			//dialogClass:"ui-alert",
			modal: true
			
		});
	}
	
	function closeLoading(){
		$( "#dialog-loading" ).dialog("close");
	}

	
    /** 订餐超时临界点提示 */
//    function showInvaildInfo() {
//    	var infoText = $('#invaildText').val();
//    	if (infoText)
//    		base.yumAlert(infoText);
//    }
    
	return{
		initNav:function(path){initNav(path);initBrand();},
		yumAlert:function(text){yumAlert(text);},
		yumAlertLeft:function(text,callback){yumAlertLeft(text,callback);},
		yumAlertEN:function(text,callback){yumAlertEN(text,callback);},		
		yumAlertBack:function(text,callback){yumAlertBack(text,callback);},
		yumConfirm:function(text,callback1,callback2){yumConfirm(text,callback1,callback2);},
		yumDonationConfirm:function(text,callback1,callback2){yumDonationConfirm(text,callback1,callback2);},
		yumNextProConfirm:function(text,callback1,callback2){yumNextProConfirm(text,callback1,callback2);},
		yumCloseProConfirm:function(text,callback1,callback2){yumCloseProConfirm(text,callback1,callback2);},
		yumOpenLoading:function(){openloading();},
		yumCloseLoading:function(){closeLoading();},
		yumConfirmNetLater:function(text,callback1,callback2){yumConfirmNetLater(text,callback1,callback2);},
		changeLang:function(locale){changeLang(locale);},
		setAction:function(action,method,formId,target){setAction(action,method,formId,target);},
		inOper:function(callback){inOper(callback);},
		addFavorite:function(){addFavorite();},
		loginExit:function(callback){loginExit(callback);},
		initUrl:function(){initUrl();}
	};
}();

$.extend({
    trimD : function(str){
    	if(null == str){
    		return str;
    	}
    	return str.replace(/^D(B|N)?/,'');
    },
    
    /** 根据当前浏览器言语,提供相关数据的中英文版本*/
    localStr:function(data, trimFlag){
    	if(locale == 'en_US'){
    		if (trimFlag == 1){
    			return data.en;
    		}
    		return data.en;
    	}else if(locale == 'zh_CN'){
    		if (trimFlag == 1){
    			return $.trimD(data.cn);
    		}
    		return data.cn;
    		
    	}
    },
    isEnglish:function(){
    	if(locale == 'en_US'){
    		return true;
    	}
    	return false;
    },
    moneyFormat:function(data){
    	if($.isEnglish()){
    		data = pageMessage.yun + data;
    	}else{
    		data = data + pageMessage.yun;
    	}
    	return data;
    }
});

/**
 * 共通js
 */
var common = function(){
	/** 邮件 */
	var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	/** 手机号 */
	var strArray = [// 移动
	                '139', '138', '137', '136', '135', '134', '147', '150', '151', '152', '157', '158', '159', '182', '183', '184','187', '188',
	                // 联通
	                '130', '131', '132', '155', '156', '185', '186', '145',
	                // 电信
	                '133', '153', '180', '181', '189'];
	var mobile = new RegExp( '^(' + strArray.join('|') + ')\\d{8}$' ); 
	/** 区号 */
	var areaCode= /^\d{3,4}$/;
	/** 固定电话号码 */
	var telphone = /^\d{7,8}$/;
	/** 数字 */
	var number = /^[0-9]*[1-9][0-9]*$/;//正整数 
	/** 一个数字 */
	var num = /[0-9]/;
	
	/** 字符串校验规则1 - 判断普通输入框是否为特殊字符*/
	var vaildStr1 = new Array("<script>","script","src","select","update",
						"delete","insert","<",">","%","&",":","'","\"",
						"style","<!--**-->","/**","//**"," **/","--**",
						"/n*","/t*","*.*","|","$");
	
	 /** 字符串校验规则2 - 判断姓名是否为特殊字符*/
	var vaildStr2 = new Array("<script>","script","src","select",
	  					"update","delete","insert","<",">","style",
	  					"%","&",":","|","'","/","\"","!",
	  					"％","”","“","﹛","﹚","﹙","﹜","＋","[","]","！","@","?",
	  					"#","%","……","*","（","）","{","}","《","》","？","，","。",
	  					"$","(",")",
	  					"<!--**-->","/**","//**"," **/","--**",
						"/n*","/t*","*.*","|","$");
	
	var validStr3 = new Array("|","$","<",">","+","script","src","select","update",
			"delete","insert","style","<!--**-->","/**","//**"," **/","--**",
			"/n*","/t*","*.*");
	
	//var str = /^[0-9a-zA-Z\,\$\^\(\)\-\_\+\[\]\{\}\u4e00-\u9fa5]{1,20}$/;

	var str =  /^[0-9a-zA-Z\.\-\_\u4e00-\u9fa5]{1,24}$/;
	

	/**
	 * 校验字符串
	 * @param value 待校验的字符串
	 * @param type  校验格式类型,1:判断普通输入框是否为特殊字符
	 * 						    2:判断姓名是否为特殊字符  
	 * @return true 校验不通过，true 校验不通过 false 校验通过
	 */
	function isStr2(value,type){
		var arr = validStr3;
//		if (type == 1){
//			arr = vaildStr1;
//		}else if (type == 2){
//			arr = vaildStr2;
//		}else if (type == 3){
//			arr = validStr3;
//		}
		
		var bool = false;
		for(var i=0;i<arr.length;i++){
			if(value.indexOf(arr[i])>=0){
				bool=true;
				break;
			}
		}
		
		return bool;
	}

	function isStr(value){
		return str.test($.trim(value));
	}
	
	
	
	function isEmail(value) {
		return email.test($.trim(value));
	}

	function isMobile(value) {    
		return mobile.test($.trim(value));   
	}
	
	function isAreaCode(value) {
		return areaCode.test($.trim(value));   
	}
	
	function isTelephone(value) {
		return telphone.test($.trim(value));   
	}
	
	function isNumber(value) {
		return number.test($.trim(value));   
	}
	
	function isNum(value) {
		return num.test($.trim(value));   
	}
	
	return{
		isEmail:function(value){return isEmail(value);},
		isMobile:function(value){return isMobile(value);},
		isAreaCode:function(value){return isAreaCode(value);},
		isTelephone:function(value){return isTelephone(value);},
		isNumber:function(value){return isNumber(value);},
		isNum:function(value){return isNum(value);},
		isStr:function(value){return isStr(value);},
		isStr2:function(value,type){return isStr2(value,type);}
	};
}();

/** 相关配置 */
var yumCfg = {
	// 
	sid:"yum_sid",
	// 登录“记住我”功能
	rememberUser:"yum_ueserInfo",
    // "谢谢，我不需要"功能
    myNotNeed:"yum_myNotNeed",
    // 订单确认页面标示
    orderFlag:"yum_order",
    // 支付页面标示
    payFlag:"yum_pay",
	// 记住我功能的有效期（天）
	keep:7,
	// 餐厅状态
	STORE_STATUS_NOTOPEN:"0",
	STORE_STATUS_NORMAL:"1",
	STORE_STATUS_CLOSE:"2",
	STORE_STATUS_TEMPCLOSE:"3"
};

/** 定义服务异常的类型 */
var serviceCode = {
	// base service error code
	NORMAL_STATUS:0,
	WARNING_STATUS:1,
	UNKNOWN_SERVICE_ERROR:2,
	VALIDATION_ERROR:3,
	CLIENT_ERROR:4,
	MEMCACHED_ERROR:5,
	PARSE_ERROR:6,
	// customer service error code
    CUSTOMER_FORBIDDEN:100,
	CUSTOMER_NOT_FOUND:101,
	NEED_PASSWORD:102,
	INCORRECT_PASSWORD:103,
	MULTI_CUSTOMER_FOUND:104,
	NEED_EMAIL:106,
	CUSTOMER_EXISTED:107,
	// other code
	SUC_CODE:10000,
	FAIL_CODE:20000,
	MAIL_SEND_FAIL:10004,
	AUTH_CODE_UNCORRECT:10005,
	DEL_ADDR_CODE:10009,
	OUT_OF_ADDR_DELIVERY:10010,
	OUT_OF_DELIVERY_TIME:10012,
	ADDR_START_WITH_NUM:10013,
	ADDR_NOT_FIND:25,
	ERRORCODE_306:306,
    /** 用户失效*/
	USER_NOT_LOGIN:10014,
	STORE_CLOSED:407,
	
	/*(start) add by qin_yan 转网用户*/
	/** 转网用户*/
	NET_USER:116,
	/** 验证码校验失败*/
	CAPTCHA_FAILD:117,
	/** 转网用户验证成功*/
	NET_USER_SUCCESS:40000,
	/** 转网用户优惠时段验证失败*/
	NET_USER_PROM_TIME:40001,
	CAPTCHA_OUTTIME1:1008,
	CAPTCHA_OUTTIME2:1009
	/*(end) add by qin_yan 转网用户*/
	
	
};


/** 添加String的format方法
 *  替换对应位置的字符串
 *  @param array[] 数组
 */
String.prototype.format = function (array) {
    return this.replace(/\{(\d+)\}/g, function (s, i) {
        return array[i];
    });
};

/**对就后台取message转换为code方法*/
/** 根据错误码参数，对错误进行提示、跳转等处理 */
var error = {
    yumAlertError :  function (code){
    	try
    	{
        	base.yumAlert(eval('codeMessage.error'+code));
    	}
    	catch(e)
    	{
    		base.yumAlert(property.serviceUnknown);
    	}
	}
};

function addfavo() {  
	//var url = httpHtmlPath + "/index.html";
	var url = 'http://www.4008823823.com.cn';
 	var title =pageMessage.base_title;
 	try {  
        window.external.AddToFavoritesBar(url, title); //IE7、IE8、IE9
    } catch (e) {  
        try {  
            window.external.addFavorite(url, title); //IE6  
        } catch (e) {  
            try {  
                window.sidebar.addPanel(title, url, title); //FireFox  
            } catch (e) {  
            	// Chrome
            	base.yumAlert(property.favoriteBtn); 
            }  
        }  
    } 
};  

// datatracking start
/**
 * 参数说明 temp 调用方法判断 guestCount 订餐数量
 */
function pageInfo(temp,guestCount,netSale){
	var path="http://222.73.95.229/YumDataTracking/parse_data.action";
	if(temp=="topview"){
		goFirst();
	}else if(temp=="tcsuccess"){
		orderSuccess(guestCount,netSale);
	}else if(temp=="delivery"){
		browser=showBrowser();
		cookieId = "";
		code = "";
		var cookieLinkId="";
	
			actionCall("/kfcios/getCookieForDatatracking.action",{'name':temp},function(out){
				cookieId = out.cookieServerId;
				cookieLinkId = out.cookieServerLinkId;
				temp = out.keyStepName;
				code = out.codeServer;
				if(code==null||code.length<10){
					code="utm_campaign=kfc&utm_source=4008823823&utm_medium=4008823823&utm_content=4008823823";
				}
				if(temp!=null&&temp!="null"){
					$.ajax({   
						type : "GET",   
						url : path+"?keyStepName="+temp+"&browser="+browser+"&"+code+"&cookieId="+cookieId+"&cookieLinkId="+cookieLinkId+"&callback=?",   
						dataType : "jsonp",   
						jsonp: 'callback',   
						success : function(json)   
						{   
						   
						}});
				}
				$.ajax({   
				type : "GET",   
				url : path+"?keyStepName=delivery&browser="+browser+"&"+code+"&cookieId="+cookieId+"&cookieLinkId="+cookieLinkId+"&callback=?",   
				dataType : "jsonp",   
				jsonp: 'callback',   
				success : function(json)   
				{   
				   
				}   
				});
			});
	}
	else{
		
		browser=showBrowser();
		cookieId = "";
		code = "";
		var cookieLinkId="";
	
			actionCall("/kfcios/getCookieForDatatracking.action",{'name':temp},function(out){
				cookieId = out.cookieServerId;
				cookieLinkId = out.cookieServerLinkId;
				code = out.codeServer;
				if(code==null||code.length<10){
					code="utm_campaign=kfc&utm_source=4008823823&utm_medium=4008823823&utm_content=4008823823";
				}
				$.ajax({   
				type : "GET",   
				url : path+"?keyStepName="+temp+"&browser="+browser+"&"+code+"&cookieId="+cookieId+"&cookieLinkId="+cookieLinkId+"&callback=?",   
				dataType : "jsonp",   
				jsonp: 'callback',   
				success : function(json)   
				{   
				   alert(url);
				}   
				}); 
			});
	}
}

//进入首页传参
function goFirst(){
	var path="http://222.73.95.229/YumDataTracking/parse_data.action";
	var temp = "topview";
	var cookieLinkId=newGuid();
	var cookieId="";
	var browser = showBrowser();
	
	var code = getSpecify();
	
	actionCall("/kfcios/saveCookie.action",{'name':"codeServer",'value':code,'time':7200000},function(out){ });
	actionCall("/kfcios/saveCookie.action",{'name':"cookieServerLinkId",'value':cookieLinkId,'time':7200000},function(out){ });
		actionCall("/kfcios/getCookie.action",{'name':"cookieServerId"},function(out){
				cookieId = out.msg;
			if(cookieId!=null&&cookieId.length>30){
					$.ajax({   
						type : "get",   
						url : path+"?keyStepName="+temp+"&browser="+browser+"&"+code+"&cookieId="+cookieId+"&cookieLinkId="+cookieLinkId+"&callback=?",   
						dataType : "jsonp",   
						jsonp: 'callback',   
						success : function(json)   
						{   
						   
						}   
					});  

			}else{
				cookieId=newGuid();
		
				actionCall("/kfcios/saveCookie.action",{'name':"cookieServerId",'value':cookieId,'time':129600000},function(out2){
					$.ajax({   
						type : "GET",   
						url : path+"?keyStepName="+temp+"&browser="+browser+"&"+code+"&cookieId="+cookieId+"&cookieLinkId="+cookieLinkId+"&callback=?",   
						dataType : "jsonp",   
						jsonp: 'callback',   
						success : function(json)   
						{   
						   
						}   
					});   
				});
			}
	    });
}

function orderSuccess(guestCount, netSale) {
	var path="http://222.73.95.229/YumDataTracking/parse_data.action";
	var code = "";
	var cookieId =""; 
	var cookieLinkeId = "";
	var temp = "tcsuccess";
	var browser = showBrowser();
	
	actionCall("/kfcios/getCookie.action",{'name':"cookieServerId"},function(out){
			cookieId = out.msg;
			if(cookieId==null||cookieId.length<30){
				return;
			}else{
			actionCall("/kfcios/getCookie.action",{'name':"codeServer"},function(out){
				code = out.msg;
				actionCall("/kfcios/getCookie.action",{'name':"cookieServerLinkId"},function(out){
					cookieLinkId = out.msg;
					$.ajax({   
						type : "GET",   
						url : path+"?keyStepName="+temp+"&browser="+browser+"&"+code+"&cookieId="+cookieId+"&cookieLinkId="+cookieLinkId+"&guestCount="+guestCount+"&netsale="+netSale+"&callback=?",   
						dataType : "jsonp",   
						jsonp: 'callback',   
						success : function(json)   
						{   
						   
						}   
					});
				});
			});
			}
	});
	
}

//获取指定值
function getSpecify(){
	var uri = location.search;
	if(uri==null || "" == uri || uri.length<20){
		return "utm_campaign=kfc&utm_source=4008823823&utm_medium=4008823823&utm_content=4008823823";
	}else{
		
		if(uri.indexOf("utm_campaign")!=-1){
			uri = decodeURIComponent(uri.substring(1).replace(/\+/g,  " "));
			var url = encodeURI(uri);
			
			return url;
		}else{
				
			return "utm_campaign=kfc&utm_source=4008823823&utm_medium=4008823823&utm_content=4008823823";
		}
	}
}

//生成GUID
function newGuid()
{
    var guid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
       guid +=    n;
      if((i==8)||(i==12)||(i==16)||(i==20))
         guid += "-";
     }
    return guid;    
}
//添加cookie
function setCookie(name,value,expire) {
	var exp  = new Date();
	exp.setTime(exp.getTime() + expire*3600*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//添加单次cookie
 function addCookie(c_name,c_value,c_day){
 
    var str = c_name + "=" + escape(c_value);
    if(c_day == 0){//为0时不设定过期时间
     var date = new Date();
     var ms = 1;
     date.setTime(date.getTime() + ms);
     str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
   }

function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null){
		return unescape(arr[2]); 
	}else{
		return null;
	}
}

//判断浏览器类型
function showBrowser() {

	if (navigator.userAgent.indexOf("Opera") >= 0) {
		return "opera";
	} else {

		if (navigator.userAgent.indexOf("360SE") >= 0) {
			return "360";
		} else {

			if (navigator.userAgent.indexOf("SE") >= 0) {
				return "sougou";
			}

			else {

				if (navigator.userAgent.indexOf("Firefox") >= 0) {
					return "firefox";
				} else {

					if (navigator.userAgent.indexOf("Chrome") >= 0) {
						return "chrome";
					} else {
						if (maxthonVersion() != "false") {
							return "maxthon";
						}

						else {

							if (navigator.userAgent.indexOf("TencentTraveler") >= 0) {
								return "txtt";
							}

							else {

								if (navigator.userAgent.indexOf("Safari") >= 0) {
									return "safari";
								} else {

									if (navigator.userAgent.indexOf('Netscape') >= 0) {
										return "netscape";
									} else {

										return "ie";
									}
								}
							}
						}
					}
				}
			}

		}
	}
}

function isMaxthon() {
	try {
		window.external.max_invoke("GetHotKey");
		return true;
	} catch (ex) {
		return false;
	}
}

function maxthonVersion() {
	if (isMaxthon()) {
		if (window.external && window.external.max_version) {
			return window.external.max_version.substr(0, 1);
		}
		return "false";
	} else {
		return "false";
	}

}

// ---
function processParams(params){
    var rparams = "";
      if(params)
      for(var prop in params){
          var pvalue = params[prop];
          if( $.isArray(pvalue) ){
              for(var i=0;i<pvalue.length;i++){
                  var obj = pvalue[i];
                  if("object" == typeof obj){
                      for(var oprop in obj){
                          rparams += "&"+prop+"["+i+"]."+oprop+"="+ encodeURIComponent(obj[oprop]);
                      }
                  }else{
                      rparams += "&"+prop+"="+encodeURIComponent(obj);
                  }
              }
          }else{
              rparams += "&"+prop+"="+encodeURIComponent(pvalue);
          }
      }
  
      return rparams;
}

function actionCall(action,params,callback){
   params = processParams(params);

  jQuery.post(action,params,function(jsonobj){
	   if(jsonobj.exception){
		   alert("Error:"+jsonobj.msg);
		   return;
	   }
	   if(callback)
		  callback(jsonobj);

	},"json");

}
// datatracking end

/**
 * 导航栏鼠标悬浮效果
 */
$(function(){
	$('.top_menu_2').find('span[class!=current]').mouseover(function(){
		this.className = 'current';
	}).mouseout(function(){
		this.className = '';
	});
});

var imgReady = (function () {
	var list = [], intervalId = null,

	// 用来执行队列
	tick = function () {
		var i = 0;
		for (; i < list.length; i++) {
			list[i].end ? list.splice(i--, 1) : list[i]();
		};
		!list.length && stop();
	},

	// 停止所有定时器队列
	stop = function () {
		clearInterval(intervalId);
		intervalId = null;
	};

	return function (url, ready, load, error) {
		var onready, width, height, newWidth, newHeight,
			img = new Image();
		
		img.src = url;

		// 如果图片被缓存，则直接返回缓存数据 
		if (img.complete) {
			ready.call(img);
			load && load.call(img);
			return;
		};
		
		width = img.width;
		height = img.height;
		
		// 加载错误后的事件
		img.onerror = function () {
			error && error.call(img);
			onready.end = true;
			img = img.onload = img.onerror = null;
		};
		
		// 图片尺寸就绪
		onready = function () {
			newWidth = img.width;
			newHeight = img.height;
			if (newWidth !== width || newHeight !== height ||
				// 如果图片已经在其他地方加载可使用面积检测
				newWidth * newHeight > 1024
			) {
				ready.call(img);
				onready.end = true;
			};
		};
		onready();
		
		// 完全加载完毕的事件
		img.onload = function () {
			// onload在定时器时间差范围内可能比onready快
			// 这里进行检查并保证onready优先执行
			!onready.end && onready();
		
			load && load.call(img);
			
			// IE gif动画会循环执行onload，置空onload即可
			img = img.onload = img.onerror = null;
		};

		// 加入队列中定期执行
		if (!onready.end) {
			list.push(onready);
			// 无论何时只允许出现一个定时器，减少浏览器性能损耗
			if (intervalId === null) intervalId = setInterval(tick, 40);
		};
	};
})();
