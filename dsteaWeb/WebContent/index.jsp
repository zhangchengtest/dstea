<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%
	String contextPath = request.getContextPath();
%>

<style>
#top {
	width: 1001px;
	height: 80px;
	overflow: hidden;
	margin: 0px auto;
	border-bottom: 4px #c81024 solid;
	background: #000000;
}

#content {
	width: 1001px;
	margin: 5px auto 12px auto;
	background: #ff0000;
}

.left_menu {
	width: 202px;
	float: left;
	height: 80px;
	background: #00ff00;
}

.notice {
	background: #0000ff;
	width: 553px;
	height: 29px;
	padding: 0px 0 0 5px;
}

#main {
	width: 558px;
	min-height: 540px;
	position: relative;
	left: 212px;
	overflow: hidden;
	_zoom: 1;
	background:#000000;
}
.right {
	float: right;
	width: 222px;
	height:80px;
	background:#000f00;
}



</style>
</head>
<body>
	<div>

		<div id="top"></div>
		<div id="content" style="position: relative;">

			<div id="s_lm" class="left_menu s_lm"
				style="position: absolute; top: 0px;"></div>
			<div id="s_nt" class="notice s_nt"
					style="position: absolute; top: 0px; margin: 0px 0px 0px 212px; z-index: 100;">
					</div>
				<div id="main" class="e_main">
				</div>
			<div id="s_cart" class="right s_rm_cart" style="position: absolute; top: 0px; float: none; margin: 0px 0px 0px 779px;">
			</div>
		</div>
		


	</div>
</body>
</html>