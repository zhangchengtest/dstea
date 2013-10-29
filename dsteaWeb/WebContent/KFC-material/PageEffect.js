/** 左侧列表栏，购物车，登陆框上下浮动效果 */
var KFC_float = function() {
	var _width = $(window).width(), _height = $(window).height();
	$(window).resize(function() {
		_width = $(window).width(), _height = $(window).height();
	});
	$(window).scroll(function() {
		var scroll_h = 88;
		var scroll_yh = $(document).height() - 610;
		var scroll_yh1 = $(document).height() - 567;
		var scroll_top = $(this).scrollTop();
		var s_lm = $('.s_lm');
		var s_nt = $('.s_nt');
		var s_rm_login = $('.s_rm_login');
		var s_rm_cart = $('.s_rm_cart');
		if (scroll_top > scroll_h && _width > 1000 & _height > 550) {
			if (scroll_top < scroll_yh) {
				s_lm.css('position', 'fixed').css('top', '0');
				s_nt.css('position', 'fixed').css('top', '0');
				s_rm_login.css('position', 'fixed').css('top', '0');
				s_rm_cart.css('position', 'fixed').css('top', '0');
			} else {

				var topNum = scroll_yh - scroll_top;
				s_lm.css('position', 'fixed').css('top', topNum);
				s_rm_login.css('position', 'fixed').css('top', topNum);
			}
		} else {
			s_lm.css('position', 'absolute').css('top', '0');
			s_nt.css('position', 'absolute').css('top', '0');
			s_rm_login.css('position', 'absolute').css('top', '0');
			s_rm_cart.css('position', 'absolute').css('top', '0');
		}
	});
};

var t;

/** 公告栏字幕滚动效果 */
var initSilder = function() {
	var box = document.getElementById('rolling');
	var can = true;
	box.innerHTML += box.innerHTML;
	box.onmouseover = function() {
		can = false;
	};
	box.onmouseout = function() {
		can = true;
	};

	(function() {
		var stop = box.scrollTop % 29 == 0 && !can;
		if (!stop) {
			box.scrollTop == parseInt(box.scrollHeight / 2) ? box.scrollTop = 0
					: box.scrollTop++;
		}
		t = setTimeout(arguments.callee, box.scrollTop % 29 ? 25 : 1600);
	})();
};

var cleanSilder = function(){
	clearTimeout(t);
};

/**
 * 验证当前时间是否对应分类可售时间
 * 
 * @param time
 *            分类可售时间
 * @param flag
 *            分类标示
 * @return {Boolean}
 */
var vaildTime = function(time, flag) {
	var date = new Date();
	var hours = date.getHours() * 100;
	var minutes = date.getMinutes();

	var total = parseInt(hours) + parseInt(minutes);

	var bArry = time.split('-');

	var startTime = 0;
	var endTime = 0;
	for ( var i = 0; i < bArry.length; i++) {
		var b = bArry[i].split(':');
		for ( var j = 0; j < b.length; j++) {
			if (i == 0) {
				if (j == 0) {
					startTime += parseInt(b[j]) * 100;
				} else {
					startTime += parseInt(b[j]);
				}
			} else {
				if (j == 0) {
					endTime += parseInt(b[j]) * 100;
				} else {
					endTime += parseInt(b[j]);
				}
			}
		}
	}

	if (flag == 'D') {
		if (startTime <= total && total <= 2359) {
			return true;
		} else if (0 <= total && total <= endTime) {
			return true;
		}
	} else {
		if (startTime <= total && total <= endTime) {
			return true;
		}
	}

	return false;
};

/** 初始化分类列表 */
var KFC_initLeftMenu = function() {
	var isLogin = $('#isLogin').val();
	if (isLogin == "true") {
		// 登陆后
		$("#nav").find($("ul[id^='ChildMenu']")).not(function(index) {
			var _this = $(this);
			var titID = _this.prev().children('a').attr('id');

			var conID = _this.attr('id');
			var html = _this.html();
			if (_this.children('li').length) {
				DoMenu(conID, titID);
			}
		});

	} else {
		var classType = $('#iClassType').val();
		if (classType && classType != "I") {
			$("#nav").find($("ul[id^='ChildMenu']")).not(function(index) {
				var _this = $(this);
				var titID = _this.prev().children('a').attr('id');
				var conID = _this.attr('id');
				var this_ClassT = _this.attr('classType');
				if (classType == this_ClassT) {
					DoMenu(conID, titID);
				}
			});
		} else {
			$("#nav").find($("ul[id^='ChildMenu']")).not(function(index) {
				var _this = $(this);
				var time = _this.attr('time');
				/** 过滤汉字 */
				time = time.replace(/[\u2E80-\u9FFF]+/, '');
				var flag = _this.attr('classType');
				var timeFlag = vaildTime(time, flag);
				var titID = _this.prev().children('a').attr('id');
				var conID = _this.attr('id');
				var html = _this.html();

				if (timeFlag) {
					DoMenu(conID, titID);
				}
			});
		}

	}
};

function DoMenu(emid, child) {
	var obj = $('#' + emid).find('li');
	var cueList = new Array();
	var message = '';
	var isLogin = $('#isLogin').val();

	if (!obj[0]) {
		/** 如果未登录，不做弹出框提示 */
		if (isLogin == "false") {
			return;
		}
		if (emid == 'ChildMenu2') {
			cueList[0] = property.breakfast;
		} else if (emid == 'ChildMenu3') {
			cueList[1] = property.meal;
		} else if (emid == 'ChildMenu4') {
			cueList[2] = property.snack;
		}

		if (!$('#ChildMenu2').find('li')[0] && emid != 'ChildMenu2') {
			cueList[0] = property.breakfast;
		} else if (!$('#ChildMenu3').find('li')[0] && emid != 'ChildMenu3') {
			cueList[1] = property.meal;
		} else if (!$('#ChildMenu4').find('li')[0] && emid != 'ChildMenu4') {
			cueList[2] = property.snack;
		}

		var flag = true;
		for ( var i = 0; i < cueList.length; i++) {
			if (cueList[i] != null) {
				if (flag) {
					message = cueList[i] + pageMessage.or;
					flag = false;
				} else {
					message += cueList[i];
				}
			}
		}
		base.yumAlert(property.outOfservice.format([message]));
		return;
	}

	var obj2 = $('#' + child);
	if (obj2.attr('class') == "plus_btn") {
		$("[id^=ChildMenu]").css("display", "none");
		$("[id^=child]").removeClass('minus_sign').addClass("plus_btn");
		$("[id=" + emid + "]").css("display", "block");
		$("[id=" + child + "]").removeClass('plus_btn').addClass('minus_sign');
	} else {
		$("[id^=ChildMenu]").css("display", "none");
		$("[id^=child]").removeClass('minus_sign').addClass("plus_btn");
		$("[id=" + emid + "]").css("display", "none");
		$("[id=" + child + "]").removeClass('minus_sign').addClass('plus_btn');
	}
}

// ie6 li:hover

/** 页面初始化接口 */
var pageEffect = {
	init : function() {
		if (typeof document.body.style.maxHeight !== "undefined")
			KFC_float();
		initSilder();
		KFC_initLeftMenu();
	}
};
