 

<!DOCTYPE html>
<html>
    <head>
        <title>bootstrap学习 by 司徒正美</title>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8">

        <link rel="stylesheet" href="http://files.cnblogs.com/rubylouvre/bootstrap.css"/> 
        <script src="http://files.cnblogs.com/rubylouvre/jquery1.83.js" > </script>
        <script src="http://files.cnblogs.com/rubylouvre/bootstrap-transition.js"></script>
        <script src="http://files.cnblogs.com/rubylouvre/bootstrap-dropdown.js"></script>

        <script>
            $(function(){
                //注意：事件要绑定在UI容器上，而不是关闭按钮中
                $('.dropdown-toggle').dropdown();
            });
             
        </script>
    </head>
    <body>
        <div id="navbar-example" class="navbar navbar-static">
            <div class="navbar-inner">
                <div class="container" style="width: auto;">
                    <a class="brand" href="#">项目名称</a>
                    <ul class="nav">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">下拉 <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">动作</a></li>
                                <li><a href="#">另一个动作</a></li>
                                <li><a href="#">其他</a></li>
                                <li class="divider"></li>
                                <li><a href="#">另一个链接</a></li>
                            </ul>
                        </li>
                        <li class="dropdown open">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">下拉 <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">动作</a></li>
                                <li><a href="#">另一个动作</a></li>
                                <li><a href="#">其他</a></li>
                                <li class="divider"></li>
                                <li><a href="#">另一个链接</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav pull-right">
                        <li id="fat-menu" class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">下拉 <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">动作</a></li>
                                <li><a href="#">另一个动作</a></li>
                                <li><a href="#">其他</a></li>
                                <li class="divider"></li>
                                <li><a href="#">另一个链接</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <ul class="nav nav-pills">
            <li class="dropup" id="menutest1">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#menutest1">
		下拉项
                </a>
                <ul class="dropdown-menu">
                    <li><a href="#">动作</a></li>
                    <li><a href="#">另一个动作</a></li>
                    <li><a href="#">其他</a></li>
                    <li class="divider"></li>
                    <li><a href="#">被间隔的链接</a></li>
                </ul>
            </li>
             <li class="dropup" id="hello">
				<a class="dropdown-toggle" data-toggle="dropdown" href="#hello">
		下拉项1
                </a>
				<ul class="dropdown-menu">
					 <li><a href="#">动作</a></li>
                    <li><a href="#">另一个动作</a></li>
                    <li><a href="#">其他</a></li>
                    <li class="divider"></li>
                    <li><a href="#">被间隔的链接</a></li>
				</ul>
		   </li>
		   
		   
           

        </ul>
 		<div class="dropup">
				<a class="rcart-group-toggle switcher_toggle"
					data-toggle="dropdown" title="展开篮子" >hello</a>
				<ul class="dropdown-menu">
					<li class="rcart-no single_tile ui_c1 empty" data-basketid="2"
						data-toggle="bs-tooltip">2</li>
					<li class="rcart-no single_tile ui_c0" data-basketid="1"
						data-toggle="bs-tooltip">1</li>
				</ul>
			</div>      
    </body>
</html>
