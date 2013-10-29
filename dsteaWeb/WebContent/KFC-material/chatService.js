
/**
 * 在线客服js
 */
var chatService = function() {
	/** 初始化 */
	function init(){
		$.ajax({
			dataType:"json",
			type: "POST",
			data:{}, 
			async:false, 
			url: requestContextPath+"/checkChatOnline.action",
			beforeSend: function(XMLHttpRequest){
				//ShowLoading();
			},
			success: function(data, textStatus){
				var main = $(".e_main");
				var bg_frame_mid = $(".login_content_top");
				if(main.length != 0){
					drawChatTip(data,main);
					bindEvents();
				}
				if(bg_frame_mid.length != 0) {
					if(filterUrl()) {
						drawChatTip(data,bg_frame_mid);
						bindEvents();
					}
				}
			},
			complete: function(XMLHttpRequest, textStatus){
				//HideLoading();
			},
			error: function(){
				//base.yumAlert(property.BadRequest);
			}
		});
	};

	/** 过滤不需要处理的url：返回true:当前url不需要过滤 */
	function filterUrl() {
		var location = window.location.href; 
		var filterUrls = ["law.jsp","policy.jsp","contactus.jsp","user.jsp"];
		for ( var i = 0,length = filterUrls.length; i < length; i++) {
			if(location.indexOf(filterUrls[i]) > 0) {
				return false;
			}
		}
		return true;
	}

	/** 绑定事件 */
	function bindEvents() {
		$("#chatOn_close").live("click",function(){
			$("#chatContent").css("display","none");
		});
		$("#chatOff_support").live("mouseover",function(){
			var main = $(".e_main");
			if (main.length > 0){
				$("#chatOfflineTip").css("left","-146px");
				$('#chatOfflineTip').css('z-index','1');
			}else{
				$("#chatOfflineTip").css("left","-146px");
			}
			$("#chatOfflineTip").css("position","absolute");
			$("#chatOfflineTip").css("display","block");
		}).live("mouseout",function(){
			$("#chatOfflineTip").css("display","none");
		});
		$("#chatOff_close").live("click",function(){
			$("#chatContent").css("display","none");
		});
	}
	
	// resultCode
	function drawChatTip(data,container){
		if(data.resultCode == "1"){ //Online
			$("#chatOnline").css("display","block");
			$("#chatOffline").css("display","none");
			fixPosition(container);
		}else if(data.resultCode == "2"){ // Offline
			$("#chatOnline").css("display","none");
			$("#chatOffline").css("display","block");
			fixPosition(container);
		}
	}
	
	function fixPosition(obj){
		// 如果页面宽度小于1024，“在线客服”显示在内侧
		var offset = $(window).width() - 1024 - 30;
		if(offset < 0) {
			offset = 30;
		} else {
			offset = 0;
		}
		var className = $(obj).attr("class");
		if(className=="e_main"){
			$("#chatContent").css("position","absolute");
			$("#chatContent").css("left",222-offset);
			$("#chatOfflineTip").css("left", -146-offset);
		}else if(className=="login_content_top") {
			if($.browser.msie && $.browser.version == 6) {
				$("#chatContent").css("position","absolute");
				$("#chatContent").css("left",$(obj).position().left+$(obj).innerWidth()+2-offset);
				$("#chatContent").css("top",160+$(window).scrollTop());
			} else {
				$("#chatContent").css("position","fixed");
				$("#chatContent").css("left",$(obj).position().left+$(obj).innerWidth()+2-offset);
				$("#chatContent").css("top",100);
			}
		}
	}
	
	return {
		init:function(){init();},
		fixPosition:function(obj){fixPosition(obj);}
	};
}();

$(function(){
	chatService.init();
});
$(window).resize(function(){
	var menu = $(".e_main");
	if(menu.length > 0) {
		chatService.fixPosition(menu);
	}
	var bg_frame_mid = $(".login_content_top");
	if(bg_frame_mid.length > 0) {
		chatService.fixPosition(bg_frame_mid);
	}
}).scroll(function(){
	var bg_frame_mid = $(".login_content_top");
	if(bg_frame_mid.length > 0) {
		chatService.fixPosition(bg_frame_mid);
	}
});
