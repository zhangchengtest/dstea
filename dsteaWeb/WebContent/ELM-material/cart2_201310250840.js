$(document).ready(function(){if(ma!="cart2/checkout"){return}var d={};var e=$('<i class="icon-loader"></i>');i();if(localStorage.getItem("last_geo")!==null){c()}$(".tooltip_on").tooltip({delay:{show:200,hide:200},trigger:"hover"});$("#show_garnish").on("click",function(){var t=$(this);t.toggleClass("open");$("#basket").toggleClass("open");$("#garnishes").slideToggle(300,function(){if($("span",t).text()!="-"){$("span",t).text("-");return}$("span",t).text("+")})});$("#confirm_order").on("click",function(){var w=m();var v=n();var u=f();var t=$(this);if(v&&w&&u){t.interactBtn();h({last_addr:$("#value_addr").val(),last_tel:$("#value_tel").val(),last_geo:$("#cart_checkout").attr("data-geo")});$("#checkout_form").submit()}return});function m(){if(!$("#input_time").length){return true}var t=$("#time_list").length<=0,u=t?$("#value_le_time").val():$("#value_time").val();if((t&&!u)||(!t&&u=="please_select")){$("#time_dropdown").appendErr("请选择送餐时间");return false}else{return true}}function n(){var u=$("#value_addr").val(),t=$("#value_tel").val();if(u.length&&REG_MOBILE.test(t)){return true}else{$("#addr_info").appendErr("请正确填写送达地址与11位手机号");return false}}function f(){if($("#value_payonline").val()>=0){return true}else{$("#payment_alert").removeClass("warning").addClass("error");return false}}var g={show:function(t){t.fadeIn(200);$("#so_mask").removeClass("hide").animate({opacity:0.25},200)},hide:function(t){t.parents(".so_overlay").fadeOut(200);$("#so_mask").animate({opacity:0},200,function(){$(this).addClass("hide")})}};$(".so_close").on("click",function(){g.hide($(this))});$("#so_mask").on("click",function(){var t=$(".so_overlay:visible");if(t.is("#so_coupon")){$("#input_coupon").val("")}$(".so_close",t).trigger("click")});(function(){var u;$('.dish_quantity input[type="text"]').on("click",function(){$(this).select()});$('.dish_quantity input[type="text"]').on("keyup",function(){var v=$(this);clearInterval(u);u=setInterval(function(){t(v)},600)});$(".dish_quantity a").on("click",function(){_gaq.push(["_trackEvent","checkout","click_change_num"])});function t(w){_gaq.push(["_trackEvent","checkout","update_food_num"]);clearInterval(u);var v=w.val(),A=w.attr("food_id"),z=w.attr("parent_entity_id"),y=w.attr("group_id"),x=no_cache_url(get_entry_url()+"/cart/set");$.get(x,{item_num:v,food_id:A,parent_entity_id:z,group_id:y},function(){window.location.reload()})}})();(function(){var u=$("#input_time"),w=$("#time_dropdown");$("#time_list").find(".co_time").on("click",function(){var x=$(this).text();t(x)});$("#le_time_list").find(".le_time").on("click",function(){var x=$.trim($(this).parents(".le_date").contents().get(0).nodeValue);var y=$(this).text();t(y,x)});function t(y,x){if(x){u.text(x+" "+y);v(y,x)}else{u.text(y);v(y)}w.uCloseDropdown()}function v(y,x){if(x){l(["checkout_time"]);$("#value_le_date").val(x);$("#value_le_time").val(y);h({checkout_le_date:x,checkout_le_time:y})}else{l(["checkout_le_date","checkout_le_time"]);h({checkout_time:y});if(y=="立即送出"){y=""}$("#value_time").val(y)}}})();(function(){$("body").on("click",function(u){if(!$("#note_wrapper").has(u.target).length){$("#note_bubble").hide()}});$("#table_note").on("focus",function(u){u.stopPropagation();$("#note_bubble").show()});$("#quick_notes > a").on("click",function(){var v=$("#table_note").val(),u=$(this).text();if(v.indexOf(u)>=0){return false}var w=v+" "+u+" ";$("#table_note").val(w);t()});$("#table_note").on("change",t);$("#table_note").on("keyup",function(u){if(u.keyCode=="13"){u.stopPropagation();$("#table_note").trigger("blur");$("#note_bubble").hide()}});function t(){var u=$("#table_note").val();$("#value_note").val(u);if(!u){l(["checkout_note"]);return}h({checkout_note:u})}})();(function(){$("#table_coupon").on("click",function(){g.show($("#so_coupon"));$("#input_coupon").trigger("focus")});$("#coupon_confirm").on("click.submitCoupon",function(){var u=$("#input_coupon").val();t(u);$(this).off("click.submitCoupon")});$("#so_coupon").on("keyup","#input_coupon",function(u){if(u.keyCode=="13"){$("#coupon_confirm").trigger("click")}});function t(x){var v=$("#restaurant").attr("data-restaurant"),u=get_entry_url()+"/cart/usecoupon",w=new Date().getTime();$.getJSON(u,{sn:x,restaurant_id:v,timestamp:w},function(A){var D=A.discount;if(D>0){var y=$("#total_price_basket").text(),z=y-D;var B=["<tr>",'  <td class="dish-name"><i class="icon-coupon"></i> 抵价券</td>','  <td class="dish-price"></td>','  <td class="dish-quantity"></td>','  <td class="dish-subtotal"><span class="symbol-rmb">&yen;</span> -',D,"</td>",'  <td class="dish-action"></td>',"</tr>"].join("");if($("#basket_extra").length){$("#basket_extra").append(B)}else{var C=["<tr>",'  <td class="basket-dish-container" colspan="6">','    <table id="basket_extra" class="basket-dish">',B,"</table>","  <td>","<tr>"].join("");$("#basket_wrapper").append(C)}$("#total_price_basket, #total_price_pay").text(z);$("#table_coupon").fadeOut(200);eleme_cookie.set_cookie("source","coupon",1);$("#so_coupon .so_close").trigger("click")}else{$("#input_coupon").appendErr("无效的抵价券");eleme_cookie.set_cookie("source","coupon",-1)}})}})();(function(){d.INV_DELETE="/profile/asyncDeleteInvoice";d.INV_UPDATE="/profile/asyncUpdateInvoice";var t={};t.fill=function(v){var w=v.text(),y=v.parent().attr("data-id"),x=$("#input_invoice");x.val(w).attr("data-id",y);if(x.hasClass("is_err")){x.removeClass("is_err").next(".tip-error").remove()}};t.remove=function(v){var y=v.attr("data-id"),x=$("#input_invoice");var w=v.find(".inv_del").addClass("hide");e.appendTo(v);$.post(d.INV_DELETE,{id:y},function(z){if(z.success){if(x.attr("data-id")==y){x.removeAttr("data-id")}if(v.siblings().length===0){v.parent().remove()}else{v.remove()}}else{e.remove();w.removeClass("hide")}},"json")};$("#invoice_panel").on("click",function(){g.show($("#so_invoice"))});$("#invoice_list").find('input[type="radio"]').on("click",function(){k($(this).parents("li"))});$("#input_invoice").on("focus",function(){k($("#invoice_need"))});$("#invoice_need").find(".inv_cnt").on("click",function(){t.fill($(this))});$(".inv_del").on("click",function(v){v.stopPropagation();t.remove($(this).parent())});$("#invoice_confirm").on("click",function(){var y=$("#invoice_info"),x=$("#input_invoice"),w,z,A,v;if($("#invoice_none").hasClass("current")){w=$("#invoice_none").find("label").text();x.val("").removeAttr("data-id");$("#value_inv").val("");if(localStorage.getItem("checkout_inv")!==null){l(["checkout_inv"])}y.text(w);$("#so_invoice .so_close").trigger("click")}else{w=x.val();z=x.attr("data-id");A=$('.inv_blk[data-id="'+z+'"]').find(".inv_cnt");if(!w.length){x.appendErr("请填写发票抬头");return false}if(z&&w!=A.text()){e.insertAfter(x);v=$.post(d.INV_UPDATE,{id:z,pay_to:w},function(B){if(B.success){A.text(w)}else{x.appendErr("修改发票抬头失败，请再次尝试。")}e.remove();v=undefined})}if(v){v.success(function(){u(w)})}else{u(w)}}});function u(v){$("#value_inv").val(v);h({checkout_inv:v});$("#invoice_info").text(v);$("#so_invoice .so_close").trigger("click")}})();(function(){d.ADDR_DEL="/profile/asyncDeleteAddress";d.ADDR_MOD="/profile/asyncUpdateAddress";var u=null;var w=true;$("#addr_panel").on("click",function(){g.show($("#so_addr"));if($("#addr_info").hasClass("is_err")){$("#addr_info").removeClass("is_err").next().remove()}});$('#addr_list input[type="radio"]').on("click",function(){var y=$(this),x=y.parents("li"),z=x.siblings(".current");if(z.hasClass("addr_mod")){t(z)}if(z.is("#addr_new")){$(".addr_del",z).trigger("click")}w=true;k(x)});$("#addr_add").on("click",function(){$("#addr_new").fadeIn(200).children('input[type="radio"]').trigger("click").siblings("label").find(".addr").trigger("focus")});$(".addr_del").on("click",function(z){z.stopPropagation();var x=$(this).parents(".addr_item"),y=$(this).parent();if(x.is("#addr_new")){x.find('input[type="text"]').val("");if(x.siblings().length>0){x.fadeOut(200);k(x.next())}}else{y.hide().after(e);var A=x.children("input").attr("id");u=$.post(d.ADDR_DEL,{id:A},function(B){if(B.success){x.fadeOut(function(){x.remove();if($(".addr_item").length==1){$("#addr_add").trigger("click")}else{if(x.hasClass("current")){$(".addr_item").eq(1).find('input[type="radio"]').trigger("click")}}})}else{e.remove();y.removeAttr("style")}u=null},"json")}});$("#addr_list .addr_mod").on("click",function(B){B.stopPropagation();var A=$(this),E=A.parents(".addr_item"),D=A.parent("span").siblings("label"),C=D.find(".addr").text(),y=D.find(".tel").text(),z=D.find(".tel-bk").text(),F=[C,y,z].join(","),x=['<input class="coaddr-input addr" type="text" placeholder="外卖送到的地址" value="',C,'" /> ','<input class="coaddr-input tel" type="text" placeholder="联系电话" value="',y,'" /> ','<input class="coaddr-input tel-bk" type="text" placeholder="备选电话（选填）" value="',z,'" />'].join("");D.html(x).find('input[type="text"]:first-child').trigger("focus");E.addClass("addr_mod").attr("data-bak",F).find('input[type="radio"]').trigger("click");A.parent(".addr_act").addClass("in-modify")});$("#addr_list .addr_sav").on("click",function(){var y=$(this).parent(),x=$(this).parents("li"),A=x.find("label"),E=A.attr("data-id"),D=x.find(".addr").val(),z=x.find(".tel").val(),C=x.find(".tel-bk").val(),B=['<span class="addr">',D,"</span>",' <span class="tel">',z,"</span>",' <span class="tel-bk">',C,"</span>"].join("");if(!v(x,D,z)){w=false;return}w=true;y.hide().after(e);u=$.post(d.ADDR_MOD,{id:E,phone:z,address:D,phone_bk:C},function(F){if(F.success){A.html(B);x.removeAttr("data-bak").removeClass("addr_mod").find(".addr_act").removeClass("in-modify")}else{w=false}e.remove();y.removeAttr("style");u=null},"json")});$("#addr_list .addr_ccl").on("click",function(){var x=$(this).parents("li");w=true;t(x)});$("#addr_confirm").on("click",function(){var B=$("#addr_list .current"),C=B.find(".addr").text()||B.find(".addr").val(),y=B.find(".tel").text()||B.find(".tel").val(),A=B.find(".tel-bk").text()||B.find(".tel-bk").val(),z=[C,y,A].join(" ");if(B.hasClass("addr_mod")){B.find(".addr_sav").trigger("click")}else{if(!v(B,C,y)){return}}if(!w){return}if(u){u.success(x)}else{x()}function x(){if(!w){return}$("#addr_info").text(z);$("#value_addr").val(C);$("#value_tel").val(y);$("#value_tel_bk").val(A);h({checkout_addr:C,checkout_tel:y});if(A.length){localStorage.setItem("checkout_tel_bk",A)}g.hide($("#addr_confirm"))}});function t(x){var A=x.attr("data-bak");var D=A.split(",");var C=D[0],y=D[1],B=D[2]||"";var z=['<span class="addr">',C,"</span>",' <span class="tel">',y,"</span>",' <span class="tel-bk">',B,"</span>"].join("");x.children("label").html(z);x.removeClass("addr_mod").removeAttr("data-bak");x.find(".addr_act").removeClass("in-modify")}function v(x,A,y){var z=true;if(!A.length){x.find(".addr").appendErr("请填写送达地址");z=z&&false}if(!REG_MOBILE.test(y)){x.find(".tel").appendErr("请填写11位手机号");z=z&&false}return z}})();(function(){var t=$('<span id="payment_alert" class="ui-alert warning"><i class="icon-warning"></i>请选择支付方式。</span>');if(document.documentMode===8){$("#pay_method label").on("click",function(){$(this).siblings('input[type="radio"]').trigger("click")})}if(!$("#payOnlineRadio:disabled").length&&localStorage.getItem("last_payment")===null){t.insertAfter("#pay_method")}else{if(localStorage.getItem("last_payment")!==null){b()}}$("#pay_method").find('input[type="radio"]:not(disabled)').on("click",function(){var u=$(this).parents("li");if(u.hasClass("current")){return}t.remove();var v=u.attr("data-payonline");$("#value_payonline").val(v);h({last_payment:v});k(u)})})();function i(){var t=eleme.ma,v=document.referrer;if(v.indexOf(t)>0||v.indexOf("login")>0){o()}else{p();if(!eleme.logined&&localStorage.getItem("last_addr")!==null){var w=localStorage.getItem("last_addr"),u=localStorage.getItem("last_tel");$("#value_addr, #addr_new .addr").val(w);$("#value_tel, #addr_new .tel").val(u);$("#addr_info").text([w,u].join(" "));h({checkout_addr:w,checkout_tel:u})}}}function p(){var v=localStorage;var u=[];for(var t=0;t<v.length;t++){if(v.key(t).indexOf("checkout_")!=-1){u.push(v.key(t))}}t=undefined;$.each(u,function(x,w){localStorage.removeItem(w)})}function h(t){$.each(t,function(u,v){localStorage.setItem(u,v)})}function l(t){$.each(t,function(w,u){localStorage.removeItem(u)})}function o(){if(localStorage.getItem("checkout_time")!==null){q()}if(localStorage.getItem("checkout_le_date")!==null){a()}if(localStorage.getItem("checkout_note")!==null){j()}if(localStorage.getItem("checkout_inv")!==null){r()}if(localStorage.getItem("checkout_addr")!==null){s()}if(localStorage.getItem("last_payment")!==null){b()}}function q(){var t=localStorage.getItem("checkout_time");$("#input_time").text(t);if(t=="立即送出"){t=""}$("#value_time").val(t)}function a(){var t={date:localStorage.getItem("checkout_le_date"),time:localStorage.getItem("checkout_le_time")};$("#value_le_date").val(t.date);$("#value_le_time").val(t.time);$("#input_time").text(t.date+" "+t.time)}function j(){var t=localStorage.getItem("checkout_note");$("#value_note, #table_note").val(t)}function s(){var u={txt:localStorage.getItem("checkout_addr"),tel:localStorage.getItem("checkout_tel"),tel_bk:localStorage.getItem("checkout_tel_bk")};$("#value_addr").val(u.txt);$("#value_tel").val(u.tel);$("#value_tel_bk").val(u.tel_bk);$("#addr_info").text(u.txt+" "+u.tel+" "+u.tel_bk);var t=$("#addr_list label[data-id="+u.id+"]").siblings('input[type="radio"]');t.trigger("click");if(u.id=="new"){$("#addr_new").show();$(".addr",t).val(u.txt);$(".tel",t).val(u.tel);$(".tel-bk",t).val(u.tel_bk)}}function r(){var t=localStorage.getItem("checkout_inv");$("#value_inv, #input_invoice").val(t);$("#invoice_info").text(t);$('#invoice_need input[type="radio"]').trigger("click")}function b(){var u=localStorage.getItem("last_payment");var t=$("#pay_method").find('li[data-payonline="'+u+'"]');if(!t.hasClass("disabled")){k(t);$("#value_payonline").val(u)}}function k(t){if(t.hasClass("current")){return}t.siblings().removeClass("current").find('input[type="radio"]').removeAttr("checked");t.addClass("current").find('input[type="radio"]').attr("checked",true)}function c(){if($("#cart_checkout").attr("data-geo")!=localStorage.getItem("last_geo")){$('<p class="ui-alert warning"><i class="icon-warning"></i>您上次的定位地址和这次的定位地址不同，请注意确认送餐地址是否正确。</p>').prependTo("#cart_checkout")}}$(".cart").on("click",".time.is_err",function(){$(this).removeClass("is_err").next(".tip-error").remove()});$("#cancel-replace-order").click(function(){eleme_cookie.set_cookie("replace_order",0,-1);$(this).parent().remove();location.reload(true)})});$(document).ready(function(){var a=$("#payOnline_form").length,b=$("#paybank_name").length;(function(){if(!a&&!b){return}$("#change_payment").on("click",function(){$("#modal_bank").modal({backdrop:"static",keyboard:false})})})();(function(){if(!b){return}$("#btn_submit").on("click",function(){$("#modal_payGuide").modal({backdrop:"static"})});var c=get_entry_url()+"/pay/setPayMethod";var d=$("#btn_submit").attr("data-id");$("#bank_list").find("i").on("click",function(){var e=$(this).attr("data-bank"),f=$(this).text();$.get(c,{id:d,method_json:'{"pay_bank": "'+e+'"}'},function(g){if(g<0){return false}$("#paybank_name").text(f);$("#modal_bank").modal("hide")})})})();(function(){if(!a){return}var f=$("#order_id").val()+"_verified";if($("#modal_vcode").length&&localStorage.getItem(f)==null){var d="/profile/ValidateFormerTerminalCode";$("#modal_vcode").modal({backdrop:"static",keyboard:false});if($("#send_vcode").attr("data-counted")){var c=$("#send_vcode").attr("data-counted");if(c>0&&c<60){$("#send_vcode").attr("disabled",true).addClass("disabled");e($("#send_vcode"),60-c)}}$("#modal_vcode").on("click","#send_vcode:not(.disabled)",function(i){i.preventDefault();if($(this).hasClass("disabled")){return}var h="/profile/SendFormerTerminalCode";var g=$(this);if(g.hasClass("is_err")){g.removeClass("is_err").next().remove()}g.attr("disabled",true).addClass("disabled");$.post(h,{terminal_type:0},function(j){if(j.is_succeeded){e($("#send_vcode"),60)}else{g.removeAttr("disabled").removeClass("disabled").appendErr(j.message)}},"json")});function e(i,h){i.text(h+"秒后重新获取");var g=setInterval(function(){h-=1;if(h===0){clearInterval(g);i.text("发送短信验证码").removeAttr("disabled").removeClass("disabled");return}i.text(h+"秒后重新获取")},1000)}$("#vcode_input").on("focus",function(){if($("#send_vcode").hasClass("is_err")){$("#send_vcode").removeClass("is_err").next().remove()}});$("#vcode_input").on("focus",function(){if($("#send_vcode").hasClass("is_err")){$("#send_vcode").removeClass("is_err").next().remove()}});$("#verify_code").on("click",function(){var g=$("#vcode_input"),h=$("#vcode_input").val();g.removeClass("is_err").next().remove();if(!/^\d{6}$/.test(h)){g.appendErr("请填写6位验证码")}else{$.post(d,{terminal_type:0,validate_code:h},function(i){if(i){g.appendErr(i.message)}else{$("#modal_vcode").modal("hide");localStorage.setItem(f,"true")}},"json")}})}if($("#bank_list").length){$("#bank_list").find("li:first-child").addClass("chosen")}$("#bank_list").find("i").on("click",function(){if($(this).parent().hasClass("chosen")){return}else{$(this).parent().addClass("chosen").siblings().removeClass("chosen");$("#bank_value").val($(this).attr("data-bank"));$("#modal_bank").modal("hide")}});$("#btn_submit").on("click",function(h){h.preventDefault();var g=$("#pwd_input").length?false:true;if(!g){if(!$("#pwd_input").val().length||$("#pwd_input").val()==$("#pwd_input").attr("placeholder")){$("#pwd_input").appendErr("请填写密码")}else{g=true}}if(g){if($("#modal_payGuide").length){$("#modal_payGuide").modal({backdrop:"static",keyboard:false})}if(localStorage.getItem(f)){localStorage.removeItem(f)}$("#payOnline_form").submit();$(this).attr("disabled",true).addClass("disabled")}})})()});$(document).ready(function(){if(ma!="cart2/success"){return}(function(){if(!$("#cart_success").length){return}if($(".expbar").length){var b=$(".inner_bar_wrapper").width()-10;$(".inner_bar").animate({width:b},{duration:1500})}if($("#modal_bindMobile").length){$("#modal_bindMobile").modal()}if($("#modal_regLog").length){$("#modal_regLog").modal();if(window.addEventListener){window.addEventListener("message",a,false)}else{if(window.attachEvent){window.attachEvent("onmessage",a)}}function a(c){var d=c.data;$("#modal_regLog").modal("hide");if(d.indexOf("refresh")>=0){window.location.reload()}else{window.location=d}}}})();(function(){var a=$("#cart_success").attr("order-id");_ueaq.push([eleme.sessionId,3,a])})()});(function(a){a(document).ready(function(){if(a("#new_user_discount").length){var d={URL:no_cache_url(get_entry_url()+"/cart/newUserDiscount"),PATT:/^1[358]\d{9}$/};var c=a("#restaurant").attr("data-restaurant");var e=a("#new_user_discount");a("#addr_list").on("keyup","input.tel",function(){var f=a(this),g=f.val();if(d.PATT.test(g)){b(g,f)}else{a("#new_user_discount:visible").hide()}});a("#addr_list").on("blur","input.tel",function(){e.hide()});function b(g,f){a.get(d.URL,{phone_num:g,restaurant_id:c},function(k){k=parseInt(k);var h=f.parents("li");var j=h.position().top+parseInt(h.css("padding-top"))-35,i=f.position().left-20;e.css({top:j,left:i});if(k=1){e.children(".ok").show().siblings("p").hide()}else{e.children(".fail").show().siblings("p").hide()}e.show()})}}})})(jQuery);$(document).ready(function(){if(ma!="cart2/replaceOrder"){return}$("#confirm-replace-order").on("click",function(){$("#value-replace-type").val($("#replace-type").val());$("#value-remark").val($("#replace-remark").val());var d=a();var c=$(this);if(d){c.interactBtn();$("#replace-order-form").submit()}return});function a(){var c=$("#value-replace-type").val();if(c!=-1){return true}else{alert("请选择替换订单的原因");return false}}var b={show:function(c){c.fadeIn(200);$("#so_mask").removeClass("hide").animate({opacity:0.25},200)},hide:function(c){c.parents(".so_overlay").fadeOut(200);$("#so_mask").animate({opacity:0},200,function(){$(this).addClass("hide")})}};(function(){$("#table_coupon").on("click",function(){b.show($("#so_coupon"));$("#input_coupon").trigger("focus")});$("#coupon_confirm").on("click.submitCoupon",function(){var d=$("#input_coupon").val();c(d)});$("#so_coupon").on("keyup","#input_coupon",function(d){if(d.keyCode=="13"){$("#coupon_confirm").trigger("click")}});$(".so_close").on("click",function(){b.hide($(this))});function c(g){var e=$("#restaurant").attr("data-restaurant"),d=get_entry_url()+"/cart/usecoupon",f=new Date().getTime();$.getJSON(d,{sn:g,restaurant_id:e,timestamp:f},function(j){var m=j.discount;if(m>0){var h=$("#total_price_basket").text(),i=h-m;var k=["<tr>",'  <td class="dish-name"><i class="icon-coupon"></i> 抵价券</td>','  <td class="dish-price"></td>','  <td class="dish-quantity"></td>','  <td class="dish-subtotal"><span class="symbol-rmb">&yen;</span> -',m,"</td>",'  <td class="dish-action"></td>',"</tr>"].join("");if($("#basket_extra").length){$("#basket_extra").append(k)}else{var l=["<tr>",'  <td class="basket-dish-container" colspan="6">','    <table id="basket_extra" class="basket-dish">',k,"</table>","  <td>","<tr>"].join("");$("#basket_wrapper").append(l)}$("#total_price_basket, #total_price_pay").text(i);$("#table_coupon").fadeOut(200);eleme_cookie.set_cookie("source","coupon",1);$("#so_coupon .so_close").trigger("click")}else{$("#input_coupon").appendErr("无效的抵价券");eleme_cookie.set_cookie("source","coupon",-1)}})}})()});