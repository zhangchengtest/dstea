/**
 * 菜单js
 *
 * @author: 王磊
 * @date: 2013-4-27
 *
 * 参数:pId  产品ID
 *     prom_I_id 优惠子项ID
 *     bId bannerId
 *     promVo 优惠列表对象
 *     p_Obj 产品对象
 *     c_Obj 购物车对象
 *     nco_Obj 角标对象
 */

/** 计算价格--小数点后保留一位小数*/
function computationPrice(price) {
    return (price / 100).toFixed(1);
}

/** 文字链点击事件*/
function wlClick(rType, link) {

    if (rType == 2) {
        window.open(link, '', '');
    } else if (rType == 1) {
        $('a[pid=' + link + ']').click();
    }
}

/** 弹窗广告关闭标示*/
var popBannerClose = true;

/**
 * home页面公共方法
 * @type {KFC_Comon}
 */
var KFC_Comon = function () {

    /** 初始化首页内容页面*/
    var initContent = function (cId) {
        var home_bg_mid = $('.home_bg_mid');
        var topFlag = $('#topFlag');
        var rolling = $('#rolling');
        var popBannerTemp = $('#popBannerTemp');
        
        $.ajax({
            url:requestContextPath + '/getMenuJson.action',
            type:'post',
            data:{classId:cId, topFlag:topFlag.val()},
            dataType:'json',
            beforeSend:function () {
            	base.yumOpenLoading();
            },
            success:function (o) {
                if (o) {
                    if (vaildStatus(o.status)) {
                        return;
                    }

                    KFC_GlobalVar.add(o);
                    
                    if (topFlag.val()) {
                        getBanner(home_bg_mid, o);
                    } else {
                        getMenu(home_bg_mid, o);
                    }
                    
                    if (o.bannerPopup){
                    	getBannerPop(popBannerTemp, o.bannerPopup);
                    }
                	
                    rolling.empty();
                    
                    if (o.wordlinkList) {
                    	var httpWordLinkPath = o.httpWordLinkPath;
                        getWordLink(o.wordlinkList, rolling, httpWordLinkPath);
                    }
                }
                
                topFlag.val("");
                
                KFC_Comon.initPopBanner();
            },
            error:function(){
            	base.yumAlert(property.netError);
            },
            complete:function () {
            	base.yumCloseLoading();
            }
        });
    
    };

    /** 初始化文字链*/
    var getWordLink = function (wl, rolling, httpWordLinkPath) {
        /** 清除滚动效果*/
        cleanSilder();
        $.each(wl, function (_, v) {
            rolling.append(KFC_HTML.getWordLink({
                rType:v.relationType,
                cId:v.classId,
                linkCid:v.linkedClassId,
                linkUrl:httpWordLinkPath+v.linkedUrl,
                titleCn:v.descCn,
                titleEn:v.descEn,
                textCn:v.textCn,
                textEn:v.textEn,
                textType:v.textType

            }));
        });
        /** 加载滚动效果*/
        initSilder();
    };

    /** 初始化弹出广告*/
    var getBannerPop = function(popBannerTemp, pbList){
    	popBannerTemp.empty();
    	var bannerhtmlTemp = null;
    	KFC_Banner.empty();
    	
        $.each(pbList, function (_, v) {
        	
        	var bannerDate = {
                    id:v.id,
                    imageUrl:v.imageUrl,
                    linkedUrl:v.linkedUrl,
                    classId:v.classId,
                    linkType:v.linkType,
                    smallPictureUrl:v.smallPictureUrl,
                    isPopup:v.isPopup
                };
            	bannerhtmlTemp = KFC_HTML.getBannerPopTemp(bannerDate);
            	KFC_Banner.add(v.id, bannerhtmlTemp, v.isPopup);
                return false;
        });
        popBannerTemp.append(bannerhtmlTemp);
    };

    /** 初始化Banner页面*/
    var getBanner = function (home_bg_mid, o) {
        home_bg_mid.empty();
        KFC_GlobalVar.add(o);
        var $p_big = $('<p class="mt7px index_banner"/>');
        var $p_small = $('<p class="mt7px sbanner"/>');
        var bigFlag = 0;
        var r_small = 0;
        var l_small = 0;

        $.each(o.bannerVoList, function (_, v) {
            var htmlTemp = KFC_HTML.getBannerTemp({
                id:v.id,
                imageUrl:v.imageUrl,
                type:v.type,
                linkedUrl:v.linkedUrl,
                classId:v.classId,
                linkType:v.linkType,
                position:v.position,
                bflag:bigFlag,
                rflag:r_small,
                lflag:l_small
            });

            if (v.type == 1){
                bigFlag++;
            }else{
                if (v.position == 1) {
                    l_small++;
                } else {
                    r_small++;
                }
            }

            if (v.type == 1) {
                $p_big.append(htmlTemp);
            } else {
                $p_small.append(htmlTemp);
            }
        });
        home_bg_mid.append($p_big, $p_small);
    };

    /** 初始化菜单列表页面*/
    var getMenu = function (home_bg_mid, o) {
        home_bg_mid.empty();
        KFC_Products.empty();
        KFC_Original.empty();
        KFC_HPT.empty();

        var div = '<div class="prod_show" style="width:600px"/>',
            ul = '<ul class="product_ul"/>';

        var $div = $(div);
        var $ul = $(ul);
        home_bg_mid.append($div.append($ul));

        var i = 0;
        var httpVirtualPath = o.httpVirtualPath;


        $.each(o.nMenuVo, function (_, v) {
            /** 获取角标数据*/
            if (v.ncornermark) {
                KFC_Ncornermarks.add(v.ncornermark, v.systemId);
            }
            var $li = KFC_HTML.getProductTemp({
                id:v.systemId,
                itype:v.itype,
                name:$.localStr({cn:v.imenuCn,en: v.imenuEn}, 1),
                price:v.price,
                imgurl:v.imgurl,
                mFlag:v.mFlag,
                virtualLink:httpVirtualPath+v.virtualLink,
                virtualTargetClass:v.virtualTargetClass,
                linkType:v.linkType,
                isCanHighLightFlag:v.isCanHighLightFlag,
                idesccn:v.idesccn,
                idescen:v.idescen,
                originalPId:v.originalPId
            });

            $ul.append($li);
            KFC_Products.add(v, i, $li);
            KFC_HPT.addHrefPirce(v.itype, v.systemId, $li, v.originalPId);

            i++;
        });
        /** 添加*/
        KFC_Original.add();
        KFC_Original.closeBtnAll();
        /** 如果购物车内存在天天半价产品，则所有半价产品的订购按钮置灰*/
        if (KFC_Cart.getAllCartItems() && KFC_Cart.getAllCartItems().hptId){
            KFC_HPT.closeBtnAll();
            KFC_Original.openBtnAll();
        }

        $.each(o.menuPromVo, function (_, v) {
            KFC_Promotions.add(v);

        });
    };

    /** 初始化购物车*/
    var initCart = function (action, data) {
        var order_tab = $('.order_detail').find('.order_table');
        var countItmeNum = $('.shop_cart_num');

        base.yumOpenLoading();
        $.ajax({
            url:requestContextPath + "/" + action,
            type:'post',
            dataType:'json',
            data:data,
            beforeSend:function () {
                base.yumOpenLoading();
            },
            success:function (o) {
                if (!o) {
                    return;
                }

                if (vaildStatus(o.status)) {
                    return;
                }

                if (!o.order) {
                    return;
                }
                if (!o.order.items){
                	return;
                }

                /** 清空购物车*/
                order_tab.empty();
                /** 清空购物车对象*/
                KFC_Cart.cartItmesEmpty();
//                KFC_Original.empty();

                KFC_GlobalVar.add(o);
                var j = 0;

                var promotionDesc = '';
                var HptId ='';
                /** 按钮置灰标示*/
                var ityp_Global = '';


                /** 购物车中的订单数据*/
                $.each(o.order.items, function (_, v) {

                    /** 半价产品表示*/
                    var itype = '';

                    if( o.hrefPirceId){
                        if (o.hrefPirceId == v.pmId){
                            itype = '0';
                            ityp_Global = itype;
                        }
                        HptId = o.hrefPirceId;
                    }


                    /** 不显示外送费 */
                    if (v.promotionType != 4 && v.promotionType != 5 && v.promotionType != 6) {
                        order_tab.append(KFC_HTML.getCartTemp({
                            num:v.quantity,
                            isPromo:v.promotionType,
                            id:v.productId,
                            name:$.localStr({cn:v.nameCN,en: v.nameEN}, 1),
                            price:v.quantity * v.price,
                            path:o.base,
                            isAutoPromo:v.autoPromotion,
                            realPrice:v.realPrice,
                            itype:itype,
                            index:j
                        }));
                        KFC_Cart.setCartItmes(v, j, HptId);

                    } else if (v.promotionType == 5) {
                        promotionDesc = "(" +$.localStr({cn: v.promotionDescCN,en: v.promotionDescEN}, 1)+ ")";
                    }
                    j++;
                });

                if(ityp_Global){
                    /** 置灰所有半价产品的订购按钮*/
                    KFC_HPT.closeBtnAll();
                    KFC_Original.openBtnAll();
                }else{
                    KFC_HPT.openBtnAll();
                    KFC_Original.closeBtnAll();
                }

                /** 设置购物车计价区域的数据*/
                order_tab.parent().siblings('span').remove().end().after(KFC_HTML.getCartPriceTemp({
                    subtotal:o.order.subtotal,
                    deliverFee:o.order.deliverFee,
                    total:o.order.total,
                    channelName:o.order.channelName,
                    cartRemark:promotionDesc
                }));

                countItmeNum.text(KFC_Cart.getAllItemNum());
                return o.order.warningCode;
            },
            error:function(){
            	base.yumAlert(property.netError);
            },
            complete:function () {
                base.yumCloseLoading();
            }
        });
    };

    /**
     * 初始化产品和优惠的数量
     * @param 产品ID
     */
    var initPropAndPromToNum = function (pId) {
        /** 清除菜单数量*/
        KFC_Products.clearProNumOneById(pId);
        $('#' + pId).val(1);

        /** 清除优惠数量*/
        if (KFC_Promotions.getPromItemsById(pId)) {
            KFC_Promotions.getAllPromotionZore(pId);
        }
    };

    /** 获取默认ClassId*/
    var getDefClassId = function () {
        var nav = $('#nav .IClass');

        var pid = (function () {
            var val = '';
            nav.each(function () {
                var li = $(this).find('li')[0];
                if (li) {
                    val = $(li).find('a').attr('pid');
                    return false;
                }
            });
            return val;
        })();

        return pid;
    };

    /** 验证返回状态码*/
    var vaildStatus = function (status_Obj) {
        KFC_Status.empty();
        /*
         *  退出执行流程标示：1为验证不通过，既退出执行流程。
         *                   0为验证通过，继续执行流程
         */
        var statusFlag = 0;
        var addStatusFlag = true; // 添加状态码标示：ture添加，false不提交
        if (status_Obj && status_Obj.code) {
            if (status_Obj.code == serviceCode.SUC_CODE) {
                return statusFlag;
            } else {
                statusFlag = 1;
            }
            if (status_Obj.code == serviceCode.USER_NOT_LOGIN) {
                base.yumAlertBack(property.userNotFound, function () {
                    base.loginExit(function () {
                        base.setAction("orderLogin.action");
                    });
                });

            } else if (status_Obj.code == serviceCode.ERRORCODE_306) {
            	addStatusFlag = false;
            	base.yumAlert(property.ErrorCode_306);
            }else {
            	error.yumAlertError(status_Obj.code);
                //base.yumAlert(status_Obj.message);
            }

            if (addStatusFlag){
            	KFC_Status.add(status_Obj);
            }
        }

        return statusFlag;
    };
    
    var initCookie = function(){
    	$.cookie(yumCfg.orderFlag, true);
    	$.cookie(yumCfg.payFlag, true);
    };
    
    var initPopBanner = function(){
    	
    	var popBan = KFC_Banner.getBannerPopObj();
    	if (undefined == popBan.popBannerObj){
    		return;
    	}else{
    		xunFlag = true;
    	}
    	var $popBan = popBan.popBannerObj;
    	var isPopup = popBan.isPopup;
    	
    	var $div_bp = $popBan.find('.bannerPopup');
		var $div_bpBg = $popBan.find('.bannerPopupBg');
		var $div_bpS =$popBan.find('.bannerPopupSmall');
    	
    	var isBannerPopupLogin = $.cookie("isBannerPopupLogin"); //是否登录后弹出
		var widthAll = $(document).width();
		
		if($.browser.chrome) { // 解决Chrome下不兼容问题
			$div_bp.show({complete: function() {
				$div_bp.css("left",(widthAll-$div_bp.width())/2);
			}});
		} else {
			var widthImage = $div_bp.show().width();
			if (widthImage == 0){
				imgReady(imageUrl,function () {
					widthImage = this.width;
				});
			}
			//alert(widthImage);
			$div_bp.css("left",(widthAll-widthImage)/2);
		}
		if($.browser.msie && $.browser.version==6){
			$div_bpBg.height($(document).height()).width($(document).width());
			$(window).scroll(function(){
				$div_bpS.css({"bottom":"","top":$(window).height()+$(window).scrollTop()-5-$div_bpS.height()});
			});
		}
		
		
		if((isBannerPopupLogin == null && isPopup =='1')){
		//if(isPopup == '1'){
			$div_bpBg.show();
			$div_bp.show();
			
			$.cookie("isBannerPopupLogin","false");

			setTimeout(function(){
				$div_bpBg.hide();
				$div_bp.hide();
				$div_bpS.show();
			},6000);
		}else{
			$div_bpBg.hide();
			$div_bp.hide();
			if (popBannerClose){
				$div_bpS.show();
			}
		}
    };

    return {
        initContent:initContent,
        initCart:initCart,
        initCookie:initCookie,
        initPropAndPromToNum:initPropAndPromToNum,
        initPopBanner:initPopBanner,
        getDefClassId:getDefClassId
    };
}();

/** 设置分类列表栏事件 */
var KFC_Menu = {
    init:function () {
        this.initElement();
    },

    initElement:function () {
        this.nav = $('#nav').find('.IClass>li');
        this.initEvent();
    },

    initEvent:function () {
        this.nav.click(this.navAction());
    },

    navAction:function () {
        return function () {
        	
            var cId = $(this).find('a').attr('pid');
            if (!cId) {
                return;
            }
            KFC_Comon.initContent(cId);
        };
    }
};

/** banner对象*/
var KFC_Banner = function(){
	var bannerObjList = {};
	
	var bannerObj = function(){
		var popBannerObj = '';
        var isPopup='';
	};
	
	var add = function(id, $popBanner, isPopup){
		var bObj = new bannerObj();
		bObj.popBannerObj = $popBanner;
		bObj.isPopup = isPopup;
		bannerObjList = bObj;
	};
	
	var empty = function(){
		bannerObjList = {};
	};
	
	var getBannerPopObj = function(){
		return bannerObjList;
	};
	
	return {
		add:add,
		empty:empty,
		getBannerPopObj:getBannerPopObj
	};
	
	
}();

/** 公共参数*/
var KFC_GlobalVar = function () {

    var value = function () {
        /** 工程路径*/
        this.base = '';
        /** 图片服务器路径*/
        this.httpVersionPath = '';
        /** 角标图片路径*/
        this.httpCornerMarkPath = '';
        this.login = '';
    };

    var values = {};

    /** 添加公共参数属性 */
    var add = function () {
        var args = arguments[0];
        var val = new value();
        for (var k in args) {
            if (val.hasOwnProperty(k)) {
                values[k] = args[k];
            }
        }
    };

    /**
     * 指定参数的KEY，获取对应VALUE
     * @param key
     * @return {value}
     * */
    var getGlobalVarByParam = function (key) {
        return values[key];
    };

    var getGlobalVar = function () {
        return values;
    };

    return {
        add:add,
        getGlobalVar:getGlobalVar,
        getGlobalVarByParam:getGlobalVarByParam
    };
}();

/** 状态码对象*/
var KFC_Status = function () {
    var status = {};

    /** 添加状态码*/
    var add = function (o) {
        status = o;
    };

    /** 清空状态码*/
    var empty = function () {
        status = {};
    };

    /** 获取状态码*/
    var getStatus = function () {
        return status;
    };

    return {
        add:add,
        empty:empty,
        getStatus:getStatus
    };
}();

/** 原价产品*/
var KFC_Original = function(){

    /** 对应的原价商品列表*/
    var originalTemps = {};

    /** 添加原价产品*/
    var add = function(){
        var hptAll = KFC_HPT.getHptObjAll();

        for(var k in hptAll){
            var systemId = hptAll[k].originalPId;
            if(KFC_Products.getProductById(systemId)){
            	originalTemps[systemId] = KFC_Products.getProductById(systemId).$li;
            }
        }
    };

    /** 清空原价产品*/
    var empty = function(){
        return  originalTemps = {};
    };

    /** 获取原价产品列表*/
    var getOriProdAll = function(){
        return originalTemps;
    };

    /** 根据产品ID获取原价产品*/
    var getOriProdById = function(pId){
        return originalTemps[pId];
    };

    /**
     * 开启所有原价产品的订购按钮
     *
     * */
    var openBtnAll = function(){

        var all = getOriProdAll();
        for(var k in all){
            /** 获取对应半价产品的对象*/
            var herfObj = KFC_Products.getHrefProdByOriPId(k);
            /** 获取原价产品的对象*/
            var pObj = KFC_Products.getProductById(k);
            /** 对应的半价按钮置灰高亮
             * 并且该原价产品可售时，
             * 该原价产品的按钮高亮*/
            if (!herfObj.isOrderFlag && pObj.isCanHighLightFlag){
                all[k].find(':button').removeClass('order_btn_h');
                KFC_Products.modifyIsOrderById(k, 1);
            }
        }
    };

    /** 置灰所有原价产品的订购按钮*/
    var closeBtnAll = function(){
        var all = getOriProdAll();
        for(var k in all){
            all[k].find(':button').addClass('order_btn_h');
            KFC_Products.modifyIsOrderById(k, 0);
        }

    };

    return {
        add:add,
        empty:empty,
        openBtnAll:openBtnAll,
        closeBtnAll:closeBtnAll,
        getOriProdAll: getOriProdAll,
        getOriProdById:getOriProdById
    };
}();



/** 天天半价商品**/
var KFC_HPT = function(){

    /** 天天半价商品列表**/
    var _HrefPirceTemp_ = {};

    var hrefPriceProd = function(){
        this.li = '';
        this.originalPId = '';
    };

    /** 添加天天半价对象*/
    var addHrefPirce = function(itype, systemId, li_Obj, oriId){
        if (itype === "0" && KFC_Products.getProductById(systemId).isCanHighLightFlag === 1){

           var hPProd = new hrefPriceProd();
            hPProd.li = li_Obj;
            hPProd.originalPId = oriId;
            _HrefPirceTemp_[systemId] = hPProd;
           // _HrefPirceTemp_[systemId].originalId = oriId;
        }
    };

    /** 清空半价产品对象列表*/
    var empty = function (){
        return _HrefPirceTemp_ = {};
    };


    /** 获取全部半价产品对象列表*/
    var getHptObjAll = function() {
        return _HrefPirceTemp_;
    };

    /** 根据产品ID获取半价产品对象
     * @param pId 产品ID
     * */
    var getHptObjById = function(pId){
        return _HrefPirceTemp_[pId];
    };

    /**
     * 开启所有半价产品的订购按钮
     * @param pId 产品ID
     * */
    var openBtnAll = function(){
        var all_li = getHptObjAll();
        for(var k in all_li){
            if(KFC_Products.getProductById(k).isCanHighLightFlag){
                all_li[k].li.find(':button').removeClass('order_btn_h');
                KFC_Products.modifyIsOrderById(k, 1);
            }
        }
    };

    /** 置灰所有半价产品的订购按钮*/
    var closeBtnAll = function(){
        var all_li = getHptObjAll();
        for(var k in all_li){
            all_li[k].li.find(':button').addClass('order_btn_h');
            KFC_Products.modifyIsOrderById(k, 0);
        }
    };

    return {
        addHrefPirce:addHrefPirce,
        empty: empty,
        openBtnAll:openBtnAll,
        closeBtnAll:closeBtnAll,
        getHptObjAll:getHptObjAll,
        getHptObjById:getHptObjById
    };
}();

/** 创建角标列表对象*/
var KFC_Ncornermarks = function () {

    var Ncornermark = function () {
        this.imagec = '';
        this.nameCn = '';
        this.nameEn = '';
        this.imagee = '';
        this.cornerMarkType = '';
    };

    var NcoList = {};

    /** 添加角标属性 */
    var add = function () {
        var args = arguments[0];

        var systemId = arguments[1];
        var ncornermark = new Ncornermark();
        for (var k in args) {
            if (ncornermark.hasOwnProperty(k)) {
                ncornermark[k] = args[k];
            }
        }
        NcoList[systemId] = ncornermark;
    };

    var getNcoById = function (p_Id) {
        return NcoList[p_Id];
    };

    var getAllNco = function () {
        return NcoList;
    };

    return {
        add:add,
        getAllNco:getAllNco,
        getNcoById:getNcoById
    };

}();

/** 创建优惠列表对象 */
var KFC_Promotions = function () {
    /** 设置优惠子项对象*/
    var PromotionItem = function () {
        /** 优惠图片路径*/
        this.imagePath = '';
        /** 优惠中文名称*/
        this.nameCN = '';
        /**  优惠英文名称*/
        this.nameEN = '';
        /**  当前数量*/
        this.currentQuantity = '';
        /**  最大数量*/
        this.maxQuantity = '';
        /**  优惠价格*/
        this.realPrice = '';
        /**  优惠规则Id*/
        this.id = '';
        /**  优惠子项Id*/
        this.pmid = '';
        /**  分类ID*/
        this.classId = '';

    };

    /**  设置子项优惠组对象*/
    var Promotion = function () {
        /**优惠规则ID**/
        this.id = '';
        /** 中_优惠抬头*/
        this.couponTitleCn = '';
        /** 英_优惠抬头*/
        this.couponTitleEn = '';
        /**英_描述**/
        this.descEN = '';
        /**中_描述**/
        this.descCN = '';
        /**最大数量**/
        this.maxQuantity = '';
        /** 是否是多买多送: true:是，false:否*/
        this.multiuse = '';
        /** A产品数量 */
        this.aNum = '';
        /** B产品数量*/
        this.bNum = '';
        /** 优惠子项*/
        this.items = {};
    };

    /** 设置优惠组信息*/
    var PromotionList = function () {
        /** 优惠子项列表*/
        this.promotionVOs = [];
    };

    /** 优惠列表对象*/
    var Promotions = {};

    /** 添加优惠属性 */
    var add = function () {
        var args = arguments[0];
        var promotionList = new PromotionList();
        for (var k in args) {
            if (promotionList.hasOwnProperty(k)) {
                promotionList[k] = args[k];
                if (typeof args[k] == 'object') {
                    var temps = args[k][0];
                    var promotion = new Promotion();
                    for (var t in temps) {
                        if (promotion.hasOwnProperty(t)) {
                            /**  获取优惠子项数据 */
                            if (typeof temps[t] == 'object') {
                                var itemTemp = temps[t];
                                for (var n in itemTemp) {
                                    var temp = itemTemp[n];
                                    var promotionItem = new PromotionItem();
                                    for (var j in temp) {
                                        if (promotionItem.hasOwnProperty(j)) {
                                            promotionItem[j] = temp[j];
                                        }
                                        ;
                                    }
                                    promotion[t][temp.pmid] = promotionItem;
                                }
                                ;
                            } else {
                                promotion[t] = temps[t];
                            }
                            ;
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            promotionList[k] = promotion;
        }
        Promotions[args.menuId] = promotionList;
    };

    /** 获取全部产品信息*/
    var getAllPromotion = function () {
        return Promotions;
    };

    /** 根据ProductId获取优惠子项信息
     * @param pId 产品ID
     * @return {items}
     */
    var getPromItemsById = function (pId) {
        if (Promotions[pId]) {
            return Promotions[pId].promotionVOs.items;
        }
        return null;
    };

    /**
     * 获取优惠总数
     *
     * @param promVo 优惠子项列表
     * @retrue promotionNum
     */
    var getPromNum = function (promVo) {
        var promotionNum = 0;
        for (var item in promVo.items) {
            if (item != null && item != "") {
                promotionNum = promVo.items[item].currentQuantity + promotionNum;
            }
        }

        return promotionNum;
    };

    /**
     * 根据产品ID获取优惠信息
     * @param pId 产品ID
     * @return {promotionVOs}
     */
    var getPromotionVosById = function (pId) {
        if (Promotions[pId]) {
            return Promotions[pId].promotionVOs;
        }
        return null;
    };

    /** 清空优惠表对象*/
    var empty = function () {
        Promotions = {};
    };

    /** 根据产品id添加产品数量
     *  @param pId 产品ID
     *  @param pm_I_id 优惠子项ID
     */
    var addPromotionNumById = function (pId, pm_I_id, isCheckPic) {

        var promVo = getPromotionVosById(pId);

        /**获得当前优惠弹出框的优惠商品数量**/
        var promotionNum = getPromNum(promVo);
        promotionNum++;

        /** 验证优惠数量有效性*/
        var isP = vaildPromQuantity(promVo, promotionNum, pId, isCheckPic);

        if (isP) {
            /**在优惠产品活动数量范围内**/
            promVo.items[pm_I_id].currentQuantity += 1;
        } else {
            base.yumAlert(property.errorPromItmesNum);
        }
    };

    /** 验证优惠数量有效性
     *
     * @param promVo 优惠信息对象
     * @paraom promotionNum 优惠数量
     * @param pId 产品ID
     *
     * @return {boolean}
     * */
    var vaildPromQuantity = function (promVo, promotionNum, pId, isCheckPic) {
        var a_num = 0;
        var b_num = 0;
        a_num = promVo.aNum;
        b_num = promVo.bNum;
        var cart_num = 0;
        var pro_num = 0;
        if (KFC_Cart.getItemNmuById(pId)){
        	cart_num = KFC_Cart.getItemNmuById(pId); 
        }
        if (isCheckPic){
        	pro_num = KFC_Products.getProductIdNum(pId) + cart_num;
        }else{
        	pro_num = cart_num;
        }
        if (a_num != null && a_num != "" && b_num != null && b_num != "") {

            /** 判断优惠规则是否为多买多送*/
            if (promVo.multiuse) {
                if ((a_num * promotionNum) <= (b_num * pro_num)) {
                    /**在优惠产品活动数量范围内**/
                    return true;
                }
            } else {
                /**
                 * 如果非多买多送，
                 * 优惠数量小于等于B产品数量并且订购产品的数量要大于等于A产品数量
                 */
                if (promotionNum <= b_num && pro_num >= a_num) {
                    return true;
                }
            }
        }

        return false;
    };

    /** 根据产品id减少产品数量
     *  @param id 产品ID
     *  @param pm_I_id 优惠子项ID
     */
    var subPromotionNumById = function (pId, pm_I_id) {
        if (Promotions[pId].promotionVOs.items[pm_I_id].currentQuantity < 1) {

        } else {
            Promotions[pId].promotionVOs.items[pm_I_id].currentQuantity -= 1;
        }

    };

    /**将全部优惠数量清零
     * @param pId 产品Id
     ***/
    var getAllPromotionZore = function (pId) {
        var Promotions = KFC_Promotions.getAllPromotion();
        for (var prom_I_id in Promotions[pId].promotionVOs.items) {
            if (prom_I_id != null && prom_I_id != "") {
                Promotions[pId].promotionVOs.items[prom_I_id].currentQuantity = 0;
            }
        }
    };

    /**
     * 当前优惠数量清零
     * @param pId 产品Id
     * @parm prom_I_id
     * */
    var getPromZoreBypromIid = function (pId, prom_I_id) {
        var promVo = getPromItemsById(pId);

        promVo.items[prom_I_id].currentQuantity = 0;
    };


    /** 根据产品id修改产品数量
     *  @param pId 产品ID
     *  @param pm_I_id 优惠子项ID
     *  @param num 数量
     */
    var modifyPromotionNumById = function (pId, pm_I_id, num) {
        if (typeof num == 'string') {
            num = parseInt(num);
        }
        var promVo = getPromotionVosById(pId);
        var pNum = getPromNum(promVo) - getPromItmesNumById(pId, pm_I_id) + num;

        var isP = vaildPromQuantity(promVo, pNum, pId);
        if (!isP) {
            base.yumAlert(property.errorPromItmesNum);
            promVo.items[pm_I_id].currentQuantity = 0;
            return;
        }

        promVo.items[pm_I_id].currentQuantity = num;
    };

    /**
     * 获取指定优惠子项的数量
     * @param pId 产品ID
     * @param pm_I_id 优惠子项ID
     * @return num 优惠子项数量
     * */
    var getPromItmesNumById = function (pId, pm_I_id) {
        var promVo = getPromotionVosById(pId);
        return promVo.items[pm_I_id].currentQuantity;
    };

    /** 生成优惠页面
     * @param pId 产品Id
     */
    var addHtml = function (pId, isCheckPic) {
        /** 获取优惠规则信息 */
        var promInfo = KFC_Promotions.getPromotionVosById(pId);
        if (!promInfo) {
            return '';
        }
        /** 获取优惠子项列表*/
        var promItemList = promInfo.items;

        var $html = $('<div/>');
        var i = 0;

        for (var k in promItemList) {
            var v = promItemList[k];
            if (i >= 3) {
                break;
            }
         
            $html.append(KFC_HTML.getPropDatil({
                id:v.id,
                name:$.localStr({cn:v.nameCN,en:v.nameEN}, 1),
                price:v.realPrice,
                imagePath:v.imagePath,
                /** 优惠子项位置索引*/
                index_Itemp:i++,
                pId:pId,
                pmid:v.pmid,
                isCheckPic:isCheckPic
            }));
        }
        var couponTitle = '';
        if (isCheckPic){
        	couponTitle =$.localStr({cn: promInfo.couponTitleCn,en: promInfo.couponTitleEn}, 1);
        }else{
        	couponTitle = property.couponTitle+" "+'"'+ $.localStr({cn: promInfo.couponTitleCn,en: promInfo.couponTitleEn}, 1) +'"';
        }

        return KFC_HTML.getPropMain(couponTitle, $html);
    };

    return {
        add:add,
        addHtml:addHtml,
        addPromotionNumById:addPromotionNumById,
        empty:empty,
        getAllPromotion:getAllPromotion,
        getPromItemsById:getPromItemsById,
        getAllPromotionZore:getAllPromotionZore,
        getPromotionVosById:getPromotionVosById,
        getPromZoreBypromIid:getPromZoreBypromIid,
        getPromNum:getPromNum,
        getPromItmesNumById:getPromItmesNumById,
        modifyPromotionNumById:modifyPromotionNumById,
        subPromotionNumById:subPromotionNumById,
        vaildPromQuantity:vaildPromQuantity
    };
}();


/** 创建产品列表对象*/
var KFC_Products = function () {

    /** 设置产品属性*/
    var Product = function () {
        /** 半价产品对应的原价产品ID*/
        this.originalPId = '';
        /** 订购按钮是否高亮*/
        this.isCanHighLightFlag = '';
        /** 菜单名称--中*/
        this.imenuCn = '';
        /** 菜单名称--英*/
        this.imenuEn = '';
        /** 菜单描述--中*/
        this.idesccn = '';
        /** 菜单描述--英*/
        this.idescen = '';
        /** 图片名称*/
        this.imgurl = '';
        /** 价格*/
        this.price = '';
        /** 结束时间*/
        this.endtime = '';
        /** 默认数量*/
        this.num = 1;
        /** 是否存在优惠: 0,不存在;1,存在*/
        this.isPromo = 0;
        /** 菜单位置索引*/
        this.p_index = 0;
        this.systemId = '';
        /** p:单品 m:套餐v虚拟产品*/
        this.mFlag = '';
        /** 最大可售数量*/
        this.iMaxQty = '';
        /** 可售时段(/天)*/
        this.saleValidDate = '';
        /** 可售时段(/小时)*/
        this.saleTime = '';
        /** 供应区域*/
        this.promotionArea = '';
        /** 供应区域英文*/
        this.promotionAreaEn = '';
        /** 天天半价标示:KFC:0 天天半价*/
        this.itype = '';
        /**开始供应日期*/
        this.validFrom='';
        /**结束供应日期*/
        this.validTo='';
        /** 页面创建的li对象*/
        this.$li = '';
        /**
         * 可以订购标示:0：不可订购
         *            1: 可订购
         *  默认为可订购
         */
        this.isOrderFlag = 1;
    };

    var products = {};

    /** 添加产品属性 */
    var add = function () {
        var args = arguments[0];
        var i = arguments[1];
        var $li = arguments[2];

        var product = new Product();
        product.p_index = i;
        product.$li = $li;
        for (var k in args) {
            if (product.hasOwnProperty(k)) {
                product[k] = args[k];
            };
        }
        if (!product.imgurl) {
            product.imgurl = $.localStr({cn:'no_pic.jpg',en:'no_pic_en.jpg'}, 1) ;
        }
        product.isOrderFlag = product.isCanHighLightFlag;

        products[args.systemId] = product;
    };

    /** 清空产品列表对象*/
    var empty = function () {
        products = {};
    };

    /** 获取全部产品信息*/
    var getAllProduct = function () {
        return products;
    };

    /** 根据产品id获取产品信息
     *  @param pId 产品ID
     */
    var getProductById = function (pId) {
        return products[pId];
    };

    /**
     * 根据原价产品的ID获取半价产品信息
     * @param oriPid 原价产品ID
     * */
    var getHrefProdByOriPId = function (oriPid){
        var all = getAllProduct();
        for(var k in all){
            if(all[k].originalPId == oriPid){
                return all[k];
            }
        }
    };

    /** 根据产品id添加产品数量
     *  @param pId 产品ID
     */
    var addProductNumById = function (pId, itype) {

        var maxQty = 0;
        /** 天天半价产品只能选购一份*/
        if (itype === '0'){
            maxQty = 1;
        }else{
            maxQty = products[pId].iMaxQty;
        }

        if (products[pId].num >= maxQty) {
            base.yumAlert(property.errorOrderItemsNum.format([maxQty]));
            return;
        }
        products[pId].num += 1;
    };

    /** 根据产品id减少产品数量
     *  @param pId 产品ID
     */
    var subProductNumById = function (pId) {
        if (products[pId].num <= 1) {
            base.yumAlert(property.infoMinOrderItemNum);
            return;
        }
        products[pId].num -= 1;
    };

    /** 根据产品id修改产品数量
     *  @param pId 产品ID
     */
    var modifyProductNumById = function (pId, num) {
        if (typeof num == 'string') {
            num = parseInt(num);
        }
        products[pId].num = num;
    };

    /**
     *  根据产品ID修改是否可订购标示
     *  @param pId 产品ID
     *  @num :1,可订购，2,不可订购
     * */
    var modifyIsOrderById = function(pId, num){
        if (typeof num == 'string') {
            num = parseInt(num);
        }
        products[pId].isOrderFlag = num;
    };

    /** 根据产品id修改产品置灰标示*/
    var modifyisCHFById = function(pId, num){
        if (typeof num == 'string') {
            num = parseInt(num);
        }
        if(products[pId])
            products[pId].isCanHighLightFlag = num;
    };

    /**通过商品id 获得当前商品数量
     * @param pId
     */
    var getProductIdNum = function (pId) {
        return products[pId].num;
    };

    /** 将全部的商品数量清为1 */
    var getProductNumOne  = function () {
        if (products) {
            for (var item in products) {
                products[item].num = 1;
            }
        }
    };

    /**
     * 将当前选定的产品数量清为1
     * @param pId 产品I
     */
    var clearProNumOneById = function (pId) {
        if(products[pId]){
        	products[pId].num = 1;
        }
    };

    return {
        add:add,
        addProductNumById:addProductNumById,
        clearProNumOneById:clearProNumOneById,
        empty:empty,
        getAllProduct:getAllProduct,
        getProductById:getProductById,
        getProductIdNum:getProductIdNum,
        getProductNumOne :getProductNumOne,
        getHrefProdByOriPId:getHrefProdByOriPId,
        modifyProductNumById:modifyProductNumById,
        modifyisCHFById:modifyisCHFById,
        modifyIsOrderById:modifyIsOrderById,
        subProductNumById:subProductNumById

    };
}();

/** 购物车对象 */
var KFC_Cart = function () {

    var kfcProducts = KFC_Products;

    var cartItems = {
        hptId : ''
    };

    var CartItem = function () {
        this.index = '';
        /** 订购ID*/
        this.id = '';
        /** 产品ID*/
        this.productId = '';
        /** 数量*/
        this.quantity = '';
        /** */
        this.promotionType = '';
    };

    /** 处理产品*/
    var executeOrder = function (data) {
        var warningCode = KFC_Comon.initCart('/executeOrder.action', data);
        if(warningCode == '2'){
        	base.yumAlert(property.WarningCode_2);
        }
    };

    /** 订购套餐处理*/
    var executeMealItems = function (data) {
    	var warningCode = KFC_Comon.initCart('/executeMealItems.action', data);
    	if(warningCode == '2'){
        	base.yumAlert(property.WarningCode_2);
        }
    };

    /** 根据产品id将该产品添加到购物车内
     *  @param pId 产品ID
     */
    var addProToCartById = function (pId) {
        var product = kfcProducts.getProductById(pId);


        if (product.mFlag == "M") {

            executeMealItems({
                productId:pId,
                classId:product.classId,
                quantity:product.num,
                objectId:product.p_index,
                itype:product.itype
            });
        } else {
            executeOrder({
                classId:product.classId,
                quantity:product.num,
                productId:product.systemId,
                itype:product.itype
            });
        }

    };

    /** 根据id添加产品数量
     *  @param pId 产品ID
     */
    var addProToOrderById = function (pId, pType) {
        var c_Obj = getCartItmesById(pId, pType);
        //var itype = KFC_Products.getProductById(pId).itype;

        var num = 99;
//        if (itype === '0'){
//            num = 1;
//        }

        /** 获取该产品最大数量*/


        if (c_Obj.quantity >= num) {
            base.yumAlert(property.errorCartNum.format([num]));
            return;
        }

        c_Obj.quantity += 1;

        executeOrder({
            objectId:c_Obj.index,
            orderItemId:c_Obj.id,
            productId:c_Obj.productId,
            quantity:c_Obj.quantity
        });
    };

    /** 根据产品ID，减少产品的数量
     *  @param id 产品ID
     */
    var subProToOrderById = function (pId, pType) {
        var c_Obj = getCartItmesById(pId, pType);
        if (c_Obj.quantity <= 1) {
            base.yumAlert(property.infoMinOrderItemNum);
            return;
        }
        c_Obj.quantity -= 1;
        executeOrder({
        	opFlag:0,
            objectId:c_Obj.index,
            orderItemId:c_Obj.id,
            productId:c_Obj.productId,
            quantity:c_Obj.quantity
        });
    };

    /** 根据ID删除购物车内的产品
     *  @param pId 产品ID
     */
    var deletProById = function (pId, pType) {
        var c_Obj = getCartItmesById(pId, pType);
        base.yumConfirm(
            property.delOrderItem,
            function () {
                executeOrder({
                	opFlag:0,
                    objectId:c_Obj.index,
                    orderItemId:c_Obj.id,
                    productId:c_Obj.productId,
                    quantity:0
                });
            }

        );

    };

    /** 根据产品id获取产品信息
     *  @param pId 产品ID
     */
    var getCartItmesById = function (pId, pType) {
    	/** pType没有值时，默认为非优惠类型*/
    	pType = pType || 0;
    	var result = '';
    	for(var k in cartItems){
    		if (cartItems[k]){
    			if (cartItems[k].productId == pId && cartItems[k].promotionType == pType){
    				result = cartItems[k];
    				break;
    			}
    		}
    	}
        return result;
    };

    /** 根据id获取产品数量 */
    var getItemNmuById = function (pId) {
        var c_Obj = getCartItmesById(pId);
        return c_Obj ? c_Obj.quantity : 0;
    };

    /** 获取购物车内的产品总数
     *  @param id 产品ID
     */
    var getAllItemNum = function () {
        var count = 0;
        for (var k in cartItems) {
            if (/^\d+$/.test(k)){
                count += cartItems[k].quantity;
            }
        }
        return count;
    };

    /** 获取购物车全部对象 */
    var getAllCartItems = function () {
        return cartItems;
    };


    /** 添加购物车对象 */
    var setCartItmes = function () {
        var args = arguments[0];
        var i = arguments[1];
        var hptId = arguments[2];

        var cartItem = new CartItem();
        cartItem.index = i;
        for (var k in args) {
            if (cartItem.hasOwnProperty(k)) {
                cartItem[k] = args[k];
            }
            ;
        }
        cartItems[i] = cartItem;

        cartItems.hptId = hptId;

    };

    /** 清空购物车对象*/
    var cartItmesEmpty = function () {
        cartItems = {};
    };


    /** 设置提交按钮事件 */
    var submitCart = function () {
        $(".right_order").find(".order_btn_1").live("click", function () {
        	
        	$.cookie(yumCfg.orderFlag, false);

            if (getAllItemNum() == 0) {
                base.yumAlert(property.orderItmesIsNull);
                return;
            }
            
            /** 临界点校验 */
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: {},
                url: requestContextPath + '/vaildOrderingTime.action',
                async: false,
                beforeSend: function (XMLHttpRequest) {
                },
                success: function (data, status) {
                	if (data.status && data.status.code && data.status.code == serviceCode.USER_NOT_LOGIN){
            			  base.yumAlertBack(property.userNotFound, function () {
                              base.loginExit(function () {
                                  base.setAction("orderLogin.action");
                              });
                          });
                	}else if (data.invaildText) {
//                		$('#invaildText').val(data.invaildText);
                		// 不在门店时间内
                		if (data.invaildText == 'storeClosed' || (data.invaildCode && data.invaildCode == serviceCode.STORE_CLOSED)) {
                			base.yumAlertBack(property.storeClose, function(){
                				base.setAction('returnCustomer.action');
                			});
                			return;
                		}
                		if (data.isInvaildTimeFlag) {
                			if (data.invaildCode == 2){
                				base.yumAlertBack(property.WarningCode_2, function(){
                					base.setAction('continueShopping.action');
                				});
            					
                			}else{
                				if(data.invaildCode!=null){
                				base.yumAlertBack(eval('codeMessage.error'+data.invaildCode), function(){
                					base.setAction('continueShopping.action');
                				});
                				}else if(data.invaildText!=null){
                    				base.yumAlertBack(data.invaildText, function(){
                    					base.setAction('continueShopping.action');
                    				});
                				}

                			}
                		} else {
                			if(data.invaildCode!=null){
                			base.yumAlertBack(eval('codeMessage.error'+data.invaildCode), function(){
                				base.setAction('cart.action');
                			});
                			}else if(data.invaildText!=null){
                				base.yumAlertBack(data.invaildText, function(){
                					base.setAction('continueShopping.action');
                				});
                			}
                		}
                	} else {
                		base.setAction('cart.action');
                	}
                }
            });
        });
    };

    return {
        addProToCartById:addProToCartById,
        addProToOrderById:addProToOrderById,
        cartItmesEmpty:cartItmesEmpty,
        deletProById:deletProById,
        getItemNmuById:getItemNmuById,
        getAllItemNum:getAllItemNum,
        getCartItmesById:getCartItmesById,
        getAllCartItems:getAllCartItems,
        subProToOrderById:subProToOrderById,
        submitCart:submitCart,
        setCartItmes:setCartItmes
    };
}();

/** 菜单js中的使用的常量定义*/
var KFC_Constant  = {
    /** 图片常量*/
    img :{
        /** 菜单页面的[-]按钮图标*/
        prod_minus_icon : '/res/images/minus_icon_2.gif',
        /** 菜单页面的[+]按钮图标*/
        prod_add_icon : '/res/images/add_icon._2.gif',
        /** 没有菜单图片的默认图片*/
        no_pic : 'no_pic.jpg',
        /** 没有菜单图片的默认英文图片*/
        no_pic_en:'no_pic_en.jpg',
        /** 购物车的[-]按钮图标*/
        cart_minus_icon : '/res/images/minus_icon.gif',
        /** 购物车的[+]按钮图标*/
        cart_add_icon : '/res/images/add_icon.gif',
        /** 购物车的删除按钮图标*/
        cart_del_icon : '/res/images/delete_icon.gif',
        /** 文字练[hot]图标*/
        wordLink_hot : '/res/images/hot.png',
        /** 文字练[new]图标*/
        wordLink_new : '/res/images/new.png',
        /** 弹出框[-]按钮图标*/
        pop_minus_icon : '/res/images/minus_icon_3.gif',
        /** 弹出框[+]按钮图标*/
        pop_add_icon : '/res/images/add_icon._3.gif',
        /** 弹出框关闭按钮图标*/
        pop_close_icon : '/res/images/close_icon.png',
        /** 弹出框[订购]按钮图标*/
        pop_btn_Order : '/res/images/popup_btn_2.png',
        /** 弹出框[订购]按钮英文图标*/
        pop_btn_Order_en:'/en/res/images/popup_btn_2.png',
        /** 弹出框[订购]置灰按钮图标*/
        pop_btn_noOrder : '/res/images/popup_btn_2_noOrder.png',
        /** 弹出框[订购]置灰按钮英文图标*/
        pop_btn_noOrder_en :'/en/res/images/popup_btn_2_noOrder.png',
        /** 弹出框[不需要]按钮图标*/
        pop_btn_notNeed : '/res/images/popup_btn_1.png',
        /** 弹出框[不需要]按钮英文图标*/
        pop_btn_notNeed_en : '/res/images/en/popup_btn_1.png',
        /** 弹出广告关闭按钮*/
        pop_banner_close: 'res/images/closeBtn.gif'
    }
};

/** 创建页面 */
var KFC_HTML = function () {
    var kfcProducts = KFC_Products;
    var cart = KFC_Cart;
    var kfcPromotion = KFC_Promotions;
    var kfc_gloVal = KFC_GlobalVar;
    var kfcStatus = KFC_Status;
    var kfcNco = KFC_Ncornermarks;

    /** a标签的href内容*/
    var a_link = 'javascript:;';

    /**-- product*/
    var li = '<li/>',
        a_img = '<div href="' + a_link + '" class="showPicPop showPP_IE7"/>',
        div = '<div class="pro_info"/>',
        name = '<a href="' + a_link + '" class="pro_name">{0}</a>',
        p = '<p/>',
        price = '<span class="pro_price">{0}'+pageMessage.home_Per+' </span>',
        span = '<span/>',
        sub = '<a href="' + a_link + '"><img src="{0}' + KFC_Constant.img.prod_minus_icon +'"/></a>',
        num = '<input type="text" id="{0}" value="1" maxlength="2"/>',
        add = '<a href="' + a_link + '"><img src="{0}' + KFC_Constant.img.prod_add_icon + '"/></a>',
        button = '<input type="button" />',
      //  button= '<div/>'
        img = '<img src="{0}" />';

    /** 创建产品页面*/
    var getProductTemp = function (args) {
        /**  产品ID*/
        var pId = args.id;
        /** 天天半价产品标示*/
        var itype = args.itype;
        /** 产品图片链接*/
        var imgurl = args.imgurl ? args.imgurl : $.localStr({cn:KFC_Constant.img.no_pic,en:KFC_Constant.img.no_pic_en}, 1);
        /**  产品名称*/
        var p_name = args.name;
        /** 产品类型*/
        var mFlag = args.mFlag;
        /** 产品价格*/
        var p_price =$.moneyFormat(computationPrice(args.price));
        /** 高亮标示*/
        var isCHF = args.isCanHighLightFlag;
        /**  虚拟产品的链接地址*/
        var virtualLink = args.virtualLink;
        /**  虚拟产品指向的分类*/
        var vClassId = args.virtualTargetClass;
        /** 产品描述*/
        var idesccn = args.idesccn;
        /**产品英文描述*/
        var idescen = args.idescen;
        /** 链接类型:1,url,2:class */
        var linkType = args.linkType;
        /** 工程路径*/
        var basePath = kfc_gloVal.getGlobalVarByParam('base');
        /** 角标图片路径*/
        var httpCMPath = kfc_gloVal.getGlobalVarByParam('httpCornerMarkPath');
        /** 图片服务器路径*/
        var httpVP = kfc_gloVal.getGlobalVarByParam('httpVersionPath');
        

        var nco_Obj = kfcNco.getNcoById(pId);

        var $img_p = $(img.format([httpVP + imgurl]));
        var $name = '';
        var $price = $(price.format([p_price]));
        var $sub = $(sub.format([basePath]));
        var $num = $(num.format([pId]));
        var $add = $(add.format([basePath]));
        var $p_clear = $(p).addClass('p_clear_both');
        var $button = $(button);
        var $p_center = $(p).addClass('p_ta_center');
        /** 产品*/
        var $span_pro = '';
        /** 天天半价产品去除加减按钮,输入框默认为1，并且不可输入*/
        if (itype=='0'){
        	$num.addClass('pro_number_input3').attr('readonly', 'readonly');
        	$span_pro = $(span).addClass('pro_number').append($num);
        }else {
        	$num.addClass('pro_number_input');
        	$span_pro = $(span).addClass('pro_number').append($sub, $num, $add);
        }
        var $a_img = $(a_img).append($img_p);
        var $p_price_num = $(p).append($price, $span_pro);
        var $div = '';
        var $p_name = '';
        
        
        /** 该产品是类型:V:虚拟产品*/
        if (mFlag == "V") {
        	$name = $(name.format([$.localStr({cn:idesccn,en:idescen}, 1)]));
            $p_name = $(p).addClass('p_h60px').append($name);
            $div = $(div).append($p_name, $p_center.append($button.addClass('see_details_btn')));
        } else {
        	$name = $(name.format([p_name]));
            $p_name = $(p).append($name);
            /** 该产品是否可订购：0：不可，1：可*/
            if (isCHF == 0) {
                $button = $button.addClass('order_btn order_btn_h');
            } else {
                $button = $button.addClass('order_btn');
            }


            $div = $(div).append($p_name, $p_price_num, $p_clear.append($button));
        }
        

        /** 判断角标是否存在 1:存在*/
        if (nco_Obj) {
            /** 角标图片文件名称(中文)*/
            //var imagec = nco_Obj.imagec;
            /** 角标图片文件名称(英文)*/
            var imagee = nco_Obj.imagee;
            /**  角标类型：1：图片角标，2：文字角标*/
            var cornerMarkType = nco_Obj.cornerMarkType;
            /**  角标名称Cn*/
            var nameCn = nco_Obj.nameCn;
            /**  角标名称En*/
            var nameEn = nco_Obj.nameEn;
            /** 角标*/
            var $span_noc = '';

            /** 判断角标类型 1:图片角标,0:文字角标*/
            if (cornerMarkType == 1) {
                var $img_n = $(img.format([httpCMPath + imagee])).width('179px').height('153px');
                $span_noc = $(span).addClass('ersee_superscript_img').append($img_n);
            } else {
            	var nameMark=$.localStr({cn:nameCn,en:nameEn}, 1);
            	 $span_noc = $(span).addClass('ersee_superscript_txt red yellow gray').text(nameMark);
            }
            $a_img.append($span_noc);
        }

        /** 图片点击事件*/
        $a_img.click(function () {
            /** linkType 1:classId,2:url*/
            if (mFlag == "V") {
                if (linkType == 1) {
                    $('a[pid=' + vClassId + ']').click();
                } else if (linkType == 2) {
                    window.open(virtualLink);
                }

            } else {
                KFC_PopUp_Show.pop_show(pId, true);
            }

        });

        /** 绑定虚拟产品链接*/
        $p_center.click(function () {
            /** linkType 1:classId,2:url*/
            if (linkType == 1) {
                $('a[pid=' + vClassId + ']').click();
            } else if (linkType == 2) {
                window.open(virtualLink);
            }
        });
        
        /** 绑定产品描述点击事件*/
        $p_name.click(function() {
        	if (mFlag == "V"){
        		$p_center.click();
        	}
        });

        /** 数量减【-】*/
        $sub.click(function () {
            kfcProducts.subProductNumById(pId);
            $num.val(kfcProducts.getProductById(pId).num);
        });

        /** 数量加【+】*/
        $add.click(function () {
            kfcProducts.addProductNumById(pId, itype);
            $num.val(kfcProducts.getProductById(pId).num);
        });

        /** 【订购】按钮*/
        $button.click(function () {
        	if(mFlag == "V"){
        		return;
        	}
            /** 设置参数*/
            var cNum = cart.getItemNmuById(pId);               /** 获取购物车内的产品数量 */
            var proObj = kfcProducts.getProductById(pId);      /** 获取产品对象*/
            var pNum = proObj.num;                             /** 获取该产品订购的数量*/
            var isCHF2 = proObj.isCanHighLightFlag;            /** 获取该产品订购按钮是否置灰标示：0.置灰，1.高亮*/
            var isOrderFlag = proObj.isOrderFlag;
            var itype = proObj.itype;                          /** 获取该产品是否为天天半价产品标示: 0.KFC_天天半价*/
            var iMaxQty = proObj.iMaxQty;                      /** 获取该产品最大可订购数*/

            /**
             *  天天半价产品规则：
             * 一个订单下只能订购一个数量为1的天天半价产品
             */
            if(itype==='0'){
                iMaxQty = 1;
            }

            /** 置灰按钮不绑定提交事件*/
            if (isCHF2 == 0) {
            	return;
               // proObj.modifyIsOrderById(pId, 0);
            }
            /** 标记【不可订购】的按钮不绑定*/
            if (!isOrderFlag ){
                return;
            }

            //KFC_HPT.closeBtnAll();

            if (cNum + pNum > iMaxQty || pNum == 0) {
                kfcProducts.modifyProductNumById(pId, 1);
                $num.val(kfcProducts.getProductById(pId).num);
                base.yumAlert(property.errorOrderItemsNum.format([iMaxQty]));
                return;
            }

            /** 添加产品到购物车中*/
            cart.addProToCartById(pId);

            /** 非成功的状态不执行优惠弹窗操作*/
            if (kfcStatus.getStatus().code && kfcStatus.getStatus().code != serviceCode.SUC_CODE) {
                return;
            }

            /**
             * 验证cookie中"不提醒"字段是否为0，
             * 0：提醒，1，不提醒
             */
            if ($.cookie(yumCfg.myNotNeed) == 'true') {
                return;
            }

            /** 优惠弹窗事件*/
            if (KFC_Promotions.getPromItemsById(pId)) {
                base.yumCloseLoading();
                KFC_PopUp_Show.pop_show(pId);
            }

        });

        /** 数量输入框*/
        $num.keyup(function () {
            var value = this.value;
            if (!/^[\d]{1,2}$/.test(String(value))) {
                this.value = 1;
                return;
            }
            kfcProducts.modifyProductNumById(pId, value);
        });

        return $(li).append($a_img, $div);
    };

    /** cart*/
    var tr = '<tr/>',
        td = '<td/>',
        td27 = '<td class="order_table_td1"/>',
        cName = '<td class="order_table_td2"  style="text-align:left">{0}</td>',
        cSub = '<a href="' + a_link + '"><img src="{0}' + KFC_Constant.img.cart_minus_icon + '"></a>',
        cNum = '<span class="ft_b">{0}</span>',
        cAdd = '<a href="' + a_link + '"><img src="{0}' +  KFC_Constant.img.cart_add_icon + '"></a>',

        cPrice = '<td class="order_table_td3" >{0}</td>',
        cDel = '<a href="' + a_link + '"><img src="{0}' +  KFC_Constant.img.cart_del_icon + '"></a>',

        cartPrice1 = '<span class="order_price">'+pageMessage.subtotal+':<em>{0}</em></span>' +
            '<span class="order_price">'+ pageMessage.deliverFee +'<font color="red">{1}</font>:<em>{2}</em></span>',
        netUserPrc = '<span class="netUser_price">'+property.promotionNotice+'</span>',
        cartPrice2 = '<span class="order_price">'+pageMessage.total+':<em>{0}</em></span>';
    /**创建购物车计价区域*/
    var getCartPriceTemp = function (args) {
        var subtotal = computationPrice(args.subtotal);
        var deliverFee = computationPrice(args.deliverFee);
        var total = computationPrice(args.total);
        var cartRemark = args.cartRemark;
        var channelName = args.channelName;

        subtotal = $.moneyFormat(subtotal);
        deliverFee = $.moneyFormat(deliverFee);
        total = $.moneyFormat(total);
        var $cartPrice;
        if (channelName){
        	$cartPrice = $(cartPrice1.format([subtotal,cartRemark,deliverFee]) + netUserPrc+cartPrice2.format([total]));
        }else{
        	$cartPrice = $(cartPrice1.format([subtotal,cartRemark,deliverFee]) + cartPrice2.format([total]));
        }

//        var $cartPrice = $(cartPrice1.format([
//            subtotal,
//            cartRemark,
//            deliverFee,
//            total
//        ]));

        return $cartPrice;
    };

    /** 创建购物车产品区域*/
    var getCartTemp = function (args) {
        var pId = args.id;
        var p_name = args.name;
        var p_price = computationPrice(args.price);
        var p_num = args.num;
        /** 是否为优惠产品*/
        var isPromo = args.isPromo;
        /** 工程路径*/
        var basePath = kfc_gloVal.getGlobalVarByParam('base');
        /** 是否为自动优惠*/
        var isAutoPromo = args.isAutoPromo;
        /** 优惠价格*/
        var p_realPrice = computationPrice(args.realPrice);
        //var p_index = args.index;

        var p_Itpye = args.itype;

        var $tr = $(tr);
        var $td = $(td);
        var $td27 = $(td27);
        var $cName = $(cName.format([p_name]));
        var $cSub = $(cSub.format([basePath]));
        var $cNum = $(cNum.format([p_num]));
        var $cAdd = $(cAdd.format([basePath]));
        var $cDel = $(cDel.format([basePath]));

        if (isPromo || "0" == p_Itpye) {
            var $cRealPrice = $(cPrice.format([p_realPrice]));
            $td27.append($cNum);
            $td;
            /**    自动优惠不可取消*/
            if (!isAutoPromo) {
                $td.append($cDel);
            }
            $tr.append($cName, $td27, $cRealPrice, $td);
        } else {
            var $cPrice = $(cPrice.format([p_price]));
            $td27.append($cSub, $cNum, $cAdd);
            $td.append($cDel);
            $tr.append($cName, $td27, $cPrice, $td);
        }

        /** 数量减【-】*/
        $cSub.click(function () {
            cart.subProToOrderById(pId, isPromo);
        });

        /**  数量加【+】*/
        $cAdd.click(function () {
            cart.addProToOrderById(pId, isPromo);
        });

        /** 删除按钮*/
        $cDel.click(function () {
            cart.deletProById(pId, isPromo);
        });

        return $tr;
    };

    /** Banner*/
    var a = '<a href="' + a_link + '"/>',
        img_big = '<img width="556" height="352" src="{0}"/>',
        img_small = '<img width="278" height="145" src="{0}"/>',
    	pop_banner = '<img src="{0}"/>',
    	banner_div = '<div/>';
    	//banner_input = '<input type="hidden" id="bannerType" value="{0}"/>';
    /** 弹框Banner*/
    /** 创建popBanner页面*/
    var getBannerPopTemp = function (args) {
        /**imageUrlBanner图片*/
        var imageUrl = args.imageUrl;
        /**Banner所对应的url */
        var linkedUrl = args.linkedUrl;
        /**Banner所对应的菜单分类 */
        var classId = args.classId;
        /** 文字链关联类别 0:classid 1:linkedUrl */
        var linkType = args.linkType;
        /** 弹出广告小图片路径*/
        var smallPictureUrl = args.smallPictureUrl;
        /** 是否自动弹出*/
        var isPopup = args.isPopup;
        var basePath = kfc_gloVal.getGlobalVarByParam('base');
		
		var $div = $(banner_div);
		
		var $div_bpBg = $(banner_div).addClass('bannerPopupBg').css('display','none');
		var $div_bp =  $(banner_div).addClass('bannerPopup').css('display','none');
		var $div_bpS = $(banner_div).addClass('bannerPopupSmall').css('display','none');
		var $a = $(a);
		var $popBan_big = $(pop_banner.format([imageUrl]));
		var $popBan_small = $(pop_banner.format([smallPictureUrl]));
		var $popBan_close = $(pop_banner.format([basePath+'/'+KFC_Constant.img.pop_banner_close])).addClass('closeBannerPopup');
		var $popBanSamll_close = $(pop_banner.format([basePath+'/'+KFC_Constant.img.pop_banner_close])).addClass('closeBannerPopupSmall');
		$a.append($popBan_big);
        $div_bp.append($a,$popBan_close);
		$div_bpS.append($popBan_small, $popBanSamll_close);
		
		$div.append($div_bpBg, $div_bp, $div_bpS);
		
		/** 绑定小图标点击事件*/
		$div_bpS.click(function(){
			if($.browser.msie && $.browser.version==6){
				$div_bpBg.height($(document).height()).width($(document).width());
			}
			$div_bpBg.show();
			$div_bp.show().css("left",($(document).width()-$div_bp.width())/2);
			$div_bpS.hide();
		});
		
		/** 绑定Banner点击事件*/
        $a.click(function () {
            if (linkType == 1) {
                $('a[pid=' + classId + ']').click();
            } else if (linkType == 2) {
                /** url地址*/
                window.open(linkedUrl, "", "");
            }
        });
		
		//关闭按钮点击事件
		$div_bpBg.click(function(){
			closeBigBanner();
		});
		$popBan_close.click(function(){
			closeBigBanner();
		});
		
		var closeBigBanner = function(){
			$div_bpBg.hide();
			$div_bp.hide();
			$div_bpS.show();
		};
		
		// 绑定小广告弹出框关闭按钮事件
		$popBanSamll_close.click(function(event){
			// 阻止事件冒泡
			event.stopPropagation();
			$div_bpS.hide();
			popBannerClose = false;
		});

		
		
        return $div;
    };


    /** 创建Banner页面*/
    var getBannerTemp = function (args) {
        /**imageUrlBanner图片*/
        var imageUrl = args.imageUrl;
        /** 图片类型 ：大图片 2：小图片 */
        var type = args.type;
        /** type = 2  1 左边  2 右边 */
        var position = args.position;
        /**Banner所对应的url */
        var linkedUrl = args.linkedUrl;
        /**Banner所对应的菜单分类 */
        var classId = args.classId;
        /** 文字链关联类别 0:classid 1:linkedUrl */
        var linkType = args.linkType;
        var bflag = args.bflag;
        var lflag = args.lflag;
        var rflag = args.rflag;

        var $a = $(a);
        var $img_big = $(img_big.format([imageUrl]));
        var $img_small = $(img_small.format([imageUrl]));

        if (type == 1) {
            if(bflag<1){
                $a.append($img_big);
            }
        } else {
            if (position == 1) {
                if(lflag<1){
                    $a.addClass('fl_l').append($img_small);
                }
            } else {
                if(rflag<1){
                    $a.addClass('fl_r').append($img_small);
                }
            }
        }

        /** 绑定Banner点击事件*/
        $a.click(function () {
            if (linkType == 1) {
                $('a[pid=' + classId + ']').click();
            } else if (linkType == 2) {
                /** url地址*/
                window.open(linkedUrl, "", "");
            }
        });

        return $a;
    };

    /** 文字链*/
    var home_p = '<p onclick="wlClick({0},{1})"/>',
        home_a = '<a/>',
        home_img = '<img/>',
        home_span = '<span/>';

    var getWordLink = function (args) {
        /** 1 链接分类linkedClassid 2 链接静态URL linkedUrl */
        var rType = args.rType;
        /** 链接分类*/
        var linkCid = args.linkCid;
        /** 链接URL*/
        var linkUrl = args.linkUrl;
        /** 文字链中文描述*/
        var titleCn = args.titleCn;
        /**文字链英文描述*/
        var titleEn=args.titleEn;
        /** linked显示上下滚动中文 */
        var textCn = args.textCn;
        /** linked显示上下滚动英文 */
        var textEn=args.textEn;
        /** 文字链小icon 1 hot / 2 new */
        var textType = args.textType;
        /** 工程路径*/
        var basePath = kfc_gloVal.getGlobalVarByParam('base');

        var imgPath_hot = basePath + KFC_Constant.img.wordLink_hot;
        var imgPath_new = basePath + KFC_Constant.img.wordLink_new;

        var $wl_img;
        if (textType == 1) {
            $wl_img = $(home_img).attr('src', imgPath_hot);
        } else {
            $wl_img = $(home_img).attr('src', imgPath_new);
        }

        var $wl_span_deta = $(home_span).text(property.moreDetail);

        var $wl_a = $(home_a).attr('title', $.localStr({cn:titleCn,en:titleEn}, 1)).attr('href', a_link).text($.localStr({cn:textCn,en:textEn}, 1) + ' ').append($wl_img, $wl_span_deta);

        var link = '';

        if (rType == 2) {
            link = "'" + linkUrl + "'";
        } else if (rType == 1) {
            link = linkCid;
        }
        
        return  $(home_p.format([rType, link])).append($wl_a);

    };

    /** 弹出框页面*/
    var pop_p = '<p/>',
        pop_a = '<a/>',
        pop_li = '<li/>',
        pop_ul = '<ul/>',
        pop_img = '<img/>',
        pop_div = '<div/>',
        pop_span = '<span/>',
        pop_input_ckeckBox = '<input id="notWarn" type="checkbox" value="" /> ',
        pop_label = '<label for="notWarn">&nbsp;'+property.noWarn+'</label>',
        pop_input_text = '<input type="text" value="1" maxlength="2" />';

    /** 优惠外框页面*/
    var getPropMain = function (args, $html) {

        var desc = args;

        var $div_PMTP = $(pop_div).addClass('popup_main_title_product');
        var $div_pmt = $(pop_div).addClass('popup_main_title');
        var $div_pmp = $(pop_div).addClass('popup_main_product');
        var $ul_pmp = $(pop_ul).addClass('popup_main_product_ul');

        $ul_pmp.append($html);
        $div_pmp.append($ul_pmp);
        $div_pmt.append(desc);
        return $div_PMTP.append($div_pmt, $div_pmp);
    };

    /** 优惠内容页面*/
    var getPropDatil = function (args) {
        /** 产品ID */
        var pId = args.pId;
        /** 优惠图片名称*/
        var imagePath = args.imagePath ? args.imagePath : KFC_Constant.img.no_pic;
        /** 优惠名称*/
        var p_name = args.name;
        
        /**优惠产品英文名*/
        //var p_nameEN=$.trimD(args.nameEN);
        
        /** 优惠价格*/
        //var p_price = args.price;
        /** 优惠位置索引*/
        var index_Itemp = args.index_Itemp;
        /** 优惠子项ID*/
        var prom_I_id = args.pmid;
        /** 工程路径*/
        var basePath = kfc_gloVal.getGlobalVarByParam('base');
        /** 菜单图片服务器路径*/
        var httpVP = kfc_gloVal.getGlobalVarByParam('httpVersionPath');
        var isCheckPic = args.isCheckPic;

        var $li = (index_Itemp < 1) ? $(pop_li) : $(pop_li).addClass('ml10px');

        var $img_prod = $(pop_img).attr('src', httpVP + imagePath).width('126px').height('108px').css('margin-left','1xp');
        var $p_img = $(pop_p).append($img_prod);

        //国际化支持
        //var $p_desc = $(pop_p).addClass('popup_txt').text($.localStr({cn:p_name,en:data.detailList[i].p_nameEN}, 1));
        var $p_desc = $(pop_p).addClass('popup_txt').text(p_name);

        var $a_imgDoM = $(pop_a).addClass('doMinus').attr('href', a_link)
            .append($(img).attr('src', basePath + KFC_Constant.img.pop_minus_icon));

        var $input_num = $(pop_input_text).addClass('pro_number_input2').attr('productId', pId).val(0);

        var $a_imgDoP = $(pop_a).addClass('doPlus').attr('href', a_link)
            .append($(img).attr('src', basePath + KFC_Constant.img.pop_add_icon));

        var $p_num = $(pop_p).addClass('product_number').append($a_imgDoM, $input_num, $a_imgDoP);

        /** 数量减【-】*/
        $a_imgDoM.click(function () {
            kfcPromotion.subPromotionNumById(pId, prom_I_id);
            $input_num.val(kfcPromotion.getPromItemsById(pId)[prom_I_id].currentQuantity);
        });

        /** 数量加【+】*/
        $a_imgDoP.click(function () {
            kfcPromotion.addPromotionNumById(pId, prom_I_id, isCheckPic);
            $input_num.val(kfcPromotion.getPromItemsById(pId)[prom_I_id].currentQuantity);
        });

        /** 数量输入框*/
        $input_num.keyup(function () {
            var num = this.value;
            if (!/^[\d]{1,2}$/.test(String(num))) {
                this.value = 1;
                return;
            }
            kfcPromotion.modifyPromotionNumById(pId, prom_I_id, num);
            $input_num.val(kfcPromotion.getPromItmesNumById(pId, prom_I_id));
        });
        return $li.append($p_img, $p_desc, $p_num);
    };

    /**
     *  产品内容页面(弹出框)
     * @param pId 产品ID
     * */
    var getProdDetail = function (pId) {
        var p_Obj = kfcProducts.getProductById(pId);

        var nco_Obj = kfcNco.getNcoById(pId);

        /** 图片服务器路径*/
        var httpVP = kfc_gloVal.getGlobalVarByParam('httpVersionPath');
        /** 工程路径*/
        var basePath = kfc_gloVal.getGlobalVarByParam('base');
        /** 角标图片服务器路径*/
        var httpNc = kfc_gloVal.getGlobalVarByParam('httpCornerMarkPath');

        /** 产品价格*/
        var price =$.moneyFormat(computationPrice(p_Obj.price));

        var $f_span = $(span).text(pageMessage.home_Per);
        var $div_price_span_1 = $(pop_div).addClass('price_span_1')
            .append(price, $f_span);


        /** 创建产品数量*/

        /** 创建【-】按钮*/
        var $img_doM = $(pop_img).attr('src', basePath + KFC_Constant.img.pop_minus_icon);
        var $a_doM = $(pop_a).addClass('doMinus').attr('href', a_link).append($img_doM);

        /** 输入框 */
        var $input_pNum = $(pop_input_text).addClass('pro_number_input2').val(p_Obj.num);

        /** 创建【+】按钮*/
        var $img_doP = $(pop_img).attr('src', basePath + KFC_Constant.img.pop_add_icon);
        var $a_doP = $(pop_a).addClass('doPlus').attr('href', a_link).append($img_doP);

        /** 组装产品数量区域*/
        var $span_proNum = '';
        if (p_Obj.itype=='0'){
        	$input_pNum.attr('readonly', 'readonly');
        	$span_proNum = $(pop_span)
               .addClass('product_number')
               .append($input_pNum);
        }else{
        	$span_proNum = $(pop_span)
            	.addClass('product_number')
            	.append($a_doM, $input_pNum, $a_doP);
        }
       
        var $div_input_span = $(pop_div).addClass('input_span').append($span_proNum);
        /*------num end-*/


        var $div_mt20px = $(pop_div).addClass('mt20px')
            .append($div_price_span_1, $div_input_span);

        var $img_product = $(pop_img).attr('src', httpVP + p_Obj.imgurl)
            .width('130px').height('111px').css('margin-left','8px').addClass('wl-img');

        var $div_PPDI = $(pop_div).addClass('popup_product_detail_img');

        /** 角标*/
        if (nco_Obj) {

            var $span_noc = '';
            /** 判断角标类型 1:图片角标,0:文字角标*/
            if (nco_Obj.cornerMarkType == 1) {
                var $img_noc = $(pop_img).attr('src', httpNc + nco_Obj.imagee).width('130px').height('111px');
                $span_noc = $(span).addClass('ersee_superscript_img').append($img_noc);
            } else {
            	
             var nameMark1=$.localStr({cn:nco_Obj.nameCn,en:nco_Obj.nameEn}, 1);
                $span_noc = $(span).addClass('nco').text(nameMark1);
            }
            $div_PPDI.append($img_product, $span_noc, $div_mt20px);
        } else {
            $div_PPDI.append($img_product, $div_mt20px);
        }
        var $span_title1 = $(pop_span).addClass('title_span_1').text($.localStr({cn: p_Obj.imenuCn,en: p_Obj.imenuEn}, 1));
        var $p_mt6px = $(pop_p).addClass('mt6px').append($span_title1);
        var $p_desn = $(pop_p).addClass('mt10px').text($.localStr({cn:p_Obj.idesccn,en:p_Obj.idescen}, 1));
        var $p_saleTime = $(pop_p).addClass('mt10px').text(property.avaliableTime + p_Obj.saleTime);
        
        //供应日期国际化 start
        //转换日期格式
        var saleValidFrom=new Date(p_Obj.validFrom);
        var saleVaildTo=new Date(p_Obj.validTo);
        var saleValidFrom2=saleValidFrom.getFullYear()+'/'+(saleValidFrom.getMonth()+1)+'/'+saleValidFrom.getDate();
        //getMonth()从0到11
        var saleVaildTo2=saleVaildTo.getFullYear()+'/'+(saleVaildTo.getMonth()+1)+'/'+saleVaildTo.getDate();
        if(saleVaildTo2=='2099/12/31'){
        	//全年
        	p_Obj.saleValidDate=property.ThroughoutTheYear;
        }else{
        	p_Obj.saleValidDate=saleValidFrom2+'--'+saleVaildTo2;
        }
        var $p_saleVDate = $(pop_p).addClass('mt10px').text(property.avaliableDate + p_Obj.saleValidDate);
        //供应日期国际化 end
        
        
        var $p_yum = $(pop_p).addClass('mt10px').text(property.avaliableZone +$.localStr({cn: p_Obj.promotionArea,en: p_Obj.promotionAreaEn?p_Obj.promotionAreaEn:""}, 1));

        var $div_PPDT = $(pop_div).addClass('popup_product_detail_txt')
            .append($p_mt6px, $p_desn, $p_saleTime, $p_saleVDate, $p_yum);


        var $div_clean = $(pop_div).addClass('clear');

        /** 事件绑定 start***/
        /** 绑定[+]按钮事件*/
        $a_doP.click(function () {
            kfcProducts.addProductNumById(pId, p_Obj.itype);
            $input_pNum.val(kfcProducts.getProductIdNum(pId));
        });

        /** 绑定[-]按钮事件*/
        $a_doM.click(function () {
            kfcProducts.subProductNumById(pId);
            $input_pNum.val(kfcProducts.getProductIdNum(pId));

            /** 处理优惠数量*/
            var promVo = kfcPromotion.getPromotionVosById(pId);

            /** 获取优惠总数*/
            var promotionNum = kfcPromotion.getPromNum(promVo);

            /** 验证优惠数量是否符合优惠数量规则：ture,符合;flase,不符合*/
            var isp = kfcPromotion.vaildPromQuantity(promVo, promotionNum, pId);
            if (!isp) {
                $('input[productId=' + pId + ']').val(0);
                for (var j in promVo.items) {
                    promVo.items[j].currentQuantity = 0;
                }
            }

        });

        /** 数量输入框事件*/
        $input_pNum.keyup(function () {
            var num = this.value;
            if (!/^[\d]{1,2}$/.test(String(num))) {
                this.value = 1;
                return;
            }
            kfcProducts.modifyProductNumById(pId, num);

        });
        /** 事件绑定 end***/

        return $(pop_div).append($div_PPDI, $div_PPDT, $div_clean);

    };

    /** 弹出框页面
     *
     * @param $prodDetail 产品明细页面对象(jquery)
     * @param $propDetail 优惠产品页面对象(jquery)
     * @param pId 产品ID
     * @param popName 弹窗名称
     *
     * */
    var getPopMain = function ($prodDetail, $propDetail, pId, popName) {
        /** 工程路径*/
        var basePath = kfc_gloVal.getGlobalVarByParam('base');
        var pro_obj = kfcProducts.getProductById(pId);

        //var isCHF = pro_obj.isCanHighLightFlag;
        var isCHF = pro_obj.isOrderFlag;

        /** 组装关闭按钮*/
        var $img_close = $(pop_img).attr('src', basePath + KFC_Constant.img.pop_close_icon);
        var $a_close = $(pop_a);
        var $p_close_icon = $(pop_p).addClass('close_icon')
            .append($a_close.append($img_close));
        /** 产品明细显示区域*/
        var $div_prodDetail = $(pop_div);
        if ($prodDetail) {
            $div_prodDetail.addClass('popup_product_detail').append($prodDetail);
        }

        /** 优惠显示区域*/
        var $div_propmDetail = $(pop_div);
        if ($propDetail) {
            $div_propmDetail.addClass('propmDetail').append($propDetail);
        }

        /** 优惠title样式*/
        var $div_clear = $(pop_div).addClass('clear');
        var $p_popup_btn = $(pop_p).addClass('popup_btn');

        if ($prodDetail) {

            /** 点击图片标示*/
            var peagFlag = true;

            /** 组装提交按钮(有产品的情况下)*/
            var $img_btn = $(pop_img).attr('src', basePath +  $.localStr({cn:KFC_Constant.img.pop_btn_Order,en:KFC_Constant.img.pop_btn_Order_en}, 1));
            if (!isCHF) {
                $img_btn = $(pop_img).attr('src', basePath +$.localStr({cn:KFC_Constant.img.pop_btn_noOrder,en:KFC_Constant.img.pop_btn_noOrder_en}, 1));
            }
            var $a_orderBtn = $(pop_a).addClass('orderBtn').attr('href', a_link);

            $p_popup_btn.append($a_orderBtn.append($img_btn));

            /** 绑定订购按钮 */
            $($a_orderBtn).unbind().click(function () {
                /** 不可售产品只能查看，不能提交*/
                if (!isCHF) {
                    return;
                }

                /** 提交订单*/
                KFC_PopUp_Show.OrderSubmit(pId, peagFlag);
                KFC_Comon.initPropAndPromToNum(pId);

                KFC_dialog.close_dialog(popName);

            });
        } else {
            /** 组装提交按钮(只有优惠的情况下)*/
            var $img_notNeed = $(pop_img).attr('src', basePath + $.localStr({cn:KFC_Constant.img.pop_btn_notNeed,en:KFC_Constant.img.pop_btn_notNeed_en},1));
            var $img_pro_submit = $(pop_img).attr('src', basePath + $.localStr({cn:KFC_Constant.img.pop_btn_Order,en:KFC_Constant.img.pop_btn_Order_en}, 1));
            var $a_notNeed = $(pop_a).addClass('not_need').attr('href', a_link);
            var $a_proSubmit = $(pop_a).addClass('pro_submit').attr('href', a_link);

            var $pop_input_ckeckBox = $(pop_input_ckeckBox);
            var $pop_label = $(pop_label);

            var $p_check = $(p).addClass('check').append($pop_input_ckeckBox, $pop_label);

            $p_popup_btn.append($a_notNeed.append($img_notNeed),
                $a_proSubmit.append($img_pro_submit)).after($p_check);

            /** 下次不提醒事件*/
            $pop_input_ckeckBox.click(function () {
                KFC_dialog.myNotNeed($(this).is(':checked'));
            });

            /** 绑定【不需要】按钮*/
            $a_notNeed.unbind().click(function () {
                /** 清除菜单列表中的产品数量*/
                KFC_Comon.initPropAndPromToNum(pId);
                KFC_dialog.close_dialog(popName);

            });

            /** 绑定优惠订购按钮*/
            $a_proSubmit.unbind().click(function () {
                var promVo = kfcPromotion.getPromotionVosById(pId);
                if (!KFC_Promotions.getPromNum(promVo)) {
                    base.yumAlert(property.promItemNumIsNull);
                    return
                }

                /** 提交订单*/
                KFC_PopUp_Show.OrderSubmit(pId);

                /** 清除菜单列表中的产品数量*/
                KFC_Comon.initPropAndPromToNum(pId);
                KFC_dialog.close_dialog(popName);
            });

        }

        var $div_popup_main = $(pop_div);

        /** 绑定关闭按钮*/
        $img_close.unbind().click(function () {
            /** 清除菜单列表中的产品数量*/
            KFC_Comon.initPropAndPromToNum(pId);

            KFC_dialog.close_dialog('#popupCon');
        });

        return $div_popup_main.append($p_close_icon,
            $div_prodDetail,
            $div_propmDetail,
            $div_clear,
            $p_popup_btn);
    };

    return {
        getBannerTemp:getBannerTemp,
        getBannerPopTemp:getBannerPopTemp,
        getCartTemp:getCartTemp,
        getCartPriceTemp:getCartPriceTemp,
        getProductTemp:getProductTemp,
        getPropDatil:getPropDatil,
        getPropMain:getPropMain,
        getPopMain:getPopMain,
        getProdDetail:getProdDetail,
        getWordLink:getWordLink
    };
}();

/** jquery弹窗*/
var KFC_dialog = function () {
    /** 显示弹窗*/
    var show_dialog = function (dialogClass, popName) {
        $(popName).dialog({
            resizable:false,
            height:"auto",
            width:555,
            draggable:false,
            fixed:false,
            dialogClass:dialogClass,
            position:{my:"center", at:"center", of:window, collision:"fit"},
            modal:true
        });
    };

    /** 关闭弹窗*/
    var close_dialog = function (popName) {
        $(popName).dialog('close');
    };

    /** 谢谢我不需要*/
    var myNotNeed = function (flag) {
        var isNotWarn = false;
        if (flag) {
            isNotWarn = true;
            $.cookie(yumCfg.myNotNeed, isNotWarn, {expires:yumCfg.keep});
        } else {
            $.cookie(yumCfg.myNotNeed, isNotWarn);
        }
    };

    return {
        close_dialog:close_dialog,
        show_dialog:show_dialog,
        myNotNeed:myNotNeed

    };
}();

/**创建优惠show对象
 * date:2013-04-16
 */
var KFC_PopUp_Show = function () {
    /** 显示弹出层
     * @param isCheckPic: 是否是通过图片点击弹出弹窗
     * @param p_Id 产品ID
     */
    var pop_show = function (p_Id, isCheckPic) {
        /** 获取弹框模板*/
        var popupMain = $('.popup_main');
        /** 获取弹框名称*/
        var popName = '#popupCon';
        /** 执行弹框数据添装前，先清空弹框模板数据,避免弹框数据重复累加*/
        popupMain.empty();
        var $prodD = '';
        if (isCheckPic) {
            $prodD = KFC_HTML.getProdDetail(p_Id);
        }

        var $propD = KFC_Promotions.addHtml(p_Id, isCheckPic);
        popupMain.append(KFC_HTML.getPopMain($prodD, $propD, p_Id, popName));

        var d_class = 'middle_bg';
        KFC_dialog.show_dialog(d_class, popName);
    };

    /**点击订购按钮获取界面内容
     * @param pId 点击商品Id
     */
    var OrderSubmit = function (pId, type) {
        var promList = KFC_Promotions.getPromItemsById(pId);
        var product = KFC_Products.getProductById(pId);

        /**
         * 如果该产品下(套餐)没有优惠，直接对该产品(套餐)
         * 进行处理，执行处理产品(套餐)的action
         * */
        if (promList == null) {
            if (product.mFlag == 'P') {
                var data = {
                    productId:product.systemId,
                    quantity:product.num,
                    itype:product.itype
                };
                KFC_Comon.initCart('/executeOrder.action', data);
                return;
            } else {
                var data = {
                    productId:product.systemId,
                    quantity:product.num,
                    classId:product.classId,
                    objectId:product.p_index,
                    itype:product.itype
                };
                KFC_Comon.initCart('/executeMealItems.action', data);
                return;
            }

        }

        /** 提供给后台的JSON数据模板 */
        var items = '';
        var itemsTpme = '{"count":{0},' +
            '"promotionId":{1},' +
            '"name":"{2}",' +
            '"classId":"{3}",' +
            '"promotionItemId":"{4}",' +
            '"isMeal":{5}}';
        var promString = '{"productId":"{0}","count":"{1}", "mFlag":"{2}","index":"{3}","itype":"{4}","items":[{5}]}';

        if (typeof promList == "object") {
            for (var item in promList) {
                var num = promList[item].currentQuantity;
                if (num != 0) {
                    var nameCN = promList[item].nameCN;
                    var id = promList[item].id;
                    var pmid = promList[item].pmid;
                    var classId = promList[item].classId;
                    if (items) {
                        items += ',';
                    }
                    items += itemsTpme.format([num, id, nameCN, classId, pmid, 0]);
                }
            }
        }
        var pro_num = '';
        var pro_id = '';
        var pro_flag = '';
        var pro_index = 0;
        var pro_itype = '';

        if (type) {
            pro_num = product.num;
            pro_id = product.systemId;
            pro_flag = product.mFlag;
            pro_index = product.p_index;
            if (product.itype)
            	pro_itype = product.itype;
        }

       
        promString = promString.format([pro_id, pro_num, pro_flag, pro_index, pro_itype, items]);

        KFC_Comon.initCart('/executePromo.action', {jsonStr:promString});
    };

    return {
        OrderSubmit:OrderSubmit,
        pop_show:pop_show
    };
}();

/** HOME页面初始化接口*/
var home = {
    init:function () {
        KFC_Menu.init();
        KFC_Cart.submitCart();
        KFC_Comon.initCookie();
        KFC_Comon.initCart('/getOrderJson.action', '');
        KFC_Comon.initContent(KFC_Comon.getDefClassId());
    }
};