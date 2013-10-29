<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0049)http://d.4008823823.com.cn/kfcios/shopping.action -->
<%@taglib uri="/struts-tags" prefix="s"%>
<%@taglib uri="/WEB-INF/tiles-jsp.tld" prefix="tiles"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>屌丝奶茶官方网站-www.4008823823--订餐官网</title>
<script type="text/javascript">
<!--
	var requestContextPath = 'http://d.4008823823.com.cn/kfcios';
	var httpHtmlPath = 'http://d.4008823823.com.cn/kfcios/Html';
	var httpResourcePath = 'http://t.res.4008823823.com.cn/kfcios/Html';
	var locale = 'zh_CN';
	var code = 'http://t.res.4008823823.com.cn/kfcios/Html/code.jsp';
	/* 记住我功能的有效期（天） */
	var keep = 7;
//-->
</script>
<% String contextPath = request.getContextPath(); %>
<link rel="stylesheet" type="text/css" href="<%=contextPath %>/KFC-material/style.css" />


<script type="text/javascript" src="./KFC-material/jquery-1.8.3.js"></script>
<script type="text/javascript" src="./KFC-material/jquery.cookie.js"></script>
<script type="text/javascript" src="./KFC-material/jquery.lazyload.js"></script>


<script type="text/javascript"
	src="./KFC-material/jquery.ui.yumdialog.js"></script>

<script type="text/javascript" src="./KFC-material/base.js"></script>


<script type="text/javascript" src="./KFC-material/property_cn.js"></script>




<script type="text/javascript" src="./KFC-material/home.js"></script>

<script type="text/javascript" src="./KFC-material/PageEffect.js"></script>

<style type="text/css" >
	
</style>
</head>

<body>
	<form id="mainForm" name="myForm" action="" method="post">
		<div>
			<div id="top">
				<tiles:insertAttribute name="top"></tiles:insertAttribute>
			</div>

			<div id="content" 
				style="position: relative;">



				<div id="s_lm" class="left_menu s_lm"
					style="position: absolute; top: 0px;">

					<div class="left_menu_top"></div>
					<div class="left_menu_main">
						<tiles:insertAttribute name="left"></tiles:insertAttribute>
						<p class="span_3" style="margin: 0 3px 5px;">
							
						</p>
					</div>
					<div class="left_menu_btm"></div>
				</div>


				<div id="s_nt" class="notice s_nt"
					style="position: absolute; top: 0px; margin: 0px 0px 0px 212px; z-index: 100;">
					<div class="news">&gt;最新活动：</div>
					<div id="rolling"></div>
				</div>

				<div id="main" class="e_main">

					
					<div class="home_bg_mid" style="margin: 36px 0 0;">
					<tiles:insertAttribute name="content"></tiles:insertAttribute>
						<div class="prod_show" style="width: 600px"></div>
					</div>

					<p class="clear"></p>
				</div>

				<div id="s_cart" class="right s_rm_cart"
					style="position: absolute; top: 0px; float: none; margin: 0px 0px 0px 779px;">
					<div id="shopping_cart">

						<div class="right_order">
							<div class="right_order_top"></div>
							<div class=" sub_right_order_main">

								<div class="order_detail">
									<table width="196px" border="1" class="order_table" id="menus"
										style="margin-left: 5px"></table>
								</div>

							</div>
							<div class=" sub_right_order_btm"></div>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div id="footer">
				<div class="fl_l"></div>
				<div class="fl_r"></div>
				<div class="clear"></div>
			</div>

		</div>
	</form>

</body>
</html>