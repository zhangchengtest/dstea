
















if(typeof doyoo=='undefined' || !doyoo){
var d_genId=function(){
    var id ='',ids='0123456789abcdef';
    for(var i=0;i<34;i++){ id+=ids.charAt(Math.floor(Math.random()*16));  }  return id;
};
var doyoo={
env:{
secure:false,
mon:'http://m148.looyu.com/monitor',
chat:'http://ali14.looyu.com/chat',
file:'http://static.doyoo.net/110402',
compId:11095,
confId:109648,
vId:d_genId(),
lang:'',
fixFlash:1,
subComp:8068
}

, monParam:{
index:1,

title:'\u5728\u7ebf\u5ba2\u670d',
text:'\u5c0a\u656c\u7684\u5ba2\u6237\u60a8\u597d\uff0c\u6b22\u8fce\u5149\u4e34\u672c\u516c\u53f8\u7f51\u7ad9\uff01\u6211\u662f\u4eca\u5929\u7684\u5728\u7ebf\u503c\u73ed\u5ba2\u670d\uff0c\u70b9\u51fb\u201c\u5f00\u59cb\u4ea4\u8c08\u201d\u5373\u53ef\u4e0e\u6211\u5bf9\u8bdd\u3002 ',
auto:-1,
group:'',
start:'00:00',
end:'24:00',
mask:false,
status:true,
fx:0,
mini:1,
pos:0,
offShow:0,
loop:0,
autoHide:0,
hidePanel:0,
miniStyle:1
}



,sniffer:{
ids:'chatOn_support',
gids:'71187'
}

};



document.write('<div id="doyoo_monitor"></div>');

document.write('<div id="doyoo_share" style="display:none;"></div>');
document.write('<lin'+'k rel="stylesheet" type="text/css" href="http://static.doyoo.net/110402/looyu.css?130510"></li'+'nk>');
document.write('<scr'+'ipt type="text/javascript" src="http://static.doyoo.net/110402/looyu.js?130502"></scr'+'ipt>');

}

