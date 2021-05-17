define("wap/showcase/modules/goods_list/box_stream",[],function(){var t=function(t){this._conf={container:null,rowCount:4,rowContainerClassName:"",rowContainerTagType:"div",rowCintainerWidths:[],_rowContainers:[]},t&&this.init(t)};return t.prototype={init:function(t){t=this._conf=$.extend(this._conf,t||{}),this._initRowContainers(t)},_initRowContainers:function(t){var i,o,n,s,n=$(t.container).children();for(t.inialChildren=n,s=t.rowCount,i=0;s>i;i++)o=document.createElement(t.rowContainerTagType),o.className=t.rowContainerClassName,o.style.cssText="float:left;z-index:"+(s-i),t.rowCintainerWidths[i]&&(o.style.width=t.rowCintainerWidths[i]+"px"),t.container.insertBefore(o,n[0]),t._rowContainers[i]=o;i=null,o=null,n=null,s=null},setListData:function(t){var o=this._conf,n=o._rowContainers,t=t||o.inialChildren,s=o.rowCount;for(i=0;i<t.length;i++)n[i%s].appendChild(t[i]);n=null},_sortOut:function(){var t,i,o,n,s=this._conf,e=s._rowContainers,a=0,r=0,d=0,h=-1;for(i=0;i<e.length;i++)t=e[i].offsetHeight,t>d&&(d=t,a=i),(0>h||h>t)&&(h=t,r=i);return(n=$(e[a]).children().last()[0])?(t=n.offsetHeight,d-h>t?(e[r].appendChild(n),o=e[r].offsetHeight>=d?!1:!0):o=!1,s=null,e=null,a=null,r=null,d=null,h=null,t=null,i=null,n=null,o):o=!1},sortOut:function(t){for(;this._sortOut(););"function"==typeof t&&t()}},t}),window.Utils=window.Utils||{},$.extend(window.Utils,{makeRandomString:function(t){var i="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";t=t||10;for(var n=0;t>n;n++)i+=o.charAt(Math.floor(Math.random()*o.length));return i}}),define("wap/components/util/number",function(){}),define("wap/components/pop",["components/zenjs/events","wap/components/util/number"],function(t){var i=function(){};window.zenjs=window.zenjs||{};var o=t.extend({init:function(t){this._window=$(window);var o=window.Utils.makeRandomString();$("body").append('<div id="'+o+'"                 style="display:none; height: 100%;                 position: fixed; top: 0; left: 0; right: 0;                background-color: rgba(0, 0, 0, '+(t.transparent||".9")+');z-index:1000;opacity:0;transition: opacity ease 0.2s;"></div>'),this.nBg=$("#"+o),this.nBg.on("click",$.proxy(function(){this.isCanNotHide||this.hide()},this));var n=window.Utils.makeRandomString();$("body").append('<div id="'+n+'" class="'+(t.className||"")+'" style="overflow:hidden;visibility: hidden;"></div>'),this.nPopContainer=$("#"+n),this.nPopContainer.hide(),t.contentViewClass&&(this.contentViewClass=t.contentViewClass,this.contentViewOptions=$.extend({el:this.nPopContainer},t.contentViewOptions||{}),this.contentView=new this.contentViewClass($.extend({onHide:$.proxy(this.hide,this)},this.contentViewOptions)),this.contentView.onHide=$.proxy(this.hide,this)),this.animationTime=t.animationTime||300,this.isCanNotHide=t.isCanNotHide,this.doNotRemoveOnHide=t.doNotRemoveOnHide||!1,this.onShow=t.onShow||i,this.onHide=t.onHide||i,this.onFinishHide=t.onFinishHide||i,this.html=t.html},render:function(t){return this.renderOptions=t||{},this.contentViewClass?this.contentView.render(this.renderOptions):this.html&&this.nPopContainer.html(this.html),this},show:function(){return this.top=this._window.scrollTop(),this.nBg.show().css({opacity:"1","transition-property":"none"}),this.nPopContainer.show(),setTimeout($.proxy(function(){this._window.scrollTop(0),this.startShow(),this.nPopContainer.show().css("visibility","visible"),this._doShow&&this._doShow(),this.onShow()},this),200),this},hide:function(){var t,i=function(){return t!==this._window.scrollTop()?(this._window.scrollTop(t),void setTimeout($.proxy(i,this))):void setTimeout($.proxy(this.onFinishHide,this),50)};return function(o){o=o||{};var n=o.doNotRemove||this.doNotRemoveOnHide||!1;this._doHide&&this._doHide(),setTimeout($.proxy(function(){this.startHide(),t=this.top,this._window.scrollTop(t),$.proxy(i,this)(),this.nBg.css({opacity:0,"transition-property":"opacity"}),setTimeout($.proxy(function(){this.nBg.hide(),this.nPopContainer.hide(),n||this.destroy(),window.zenjs.popList.length<1&&$("html").css("position",this.htmlPosition)},this),200)},this),this.animationTime),this.onHide()}}(),destroy:function(){return this.nPopContainer.remove(),this.nBg.remove(),this.contentView&&this.contentView.remove(),this},startShow:function(){var t=window.zenjs.popList;if(t||(t=window.zenjs.popList=[]),0===t.length){var i=$("body"),o=$("html");this.htmlPosition=o.css("position"),o.css("position","relative"),this.bodyCss=(i.attr("style")||{}).cssText,this.htmlCss=(o.attr("style")||{}).cssText,$("body,html").css({overflow:"hidden",height:this._window.height()})}t.indexOf(this)<0&&t.push(this)},startHide:function(){var t=window.zenjs.popList,i=t.indexOf(this);i>-1&&t.splice(i,1),t.length<1&&($("html").attr("style",this.htmlCss||""),$("body").attr("style",this.bodyCss||""))}});return o}),define("wap/components/popup",["wap/components/pop"],function(t){var i=t.extend({init:function(t){this._super(t),this.onClickBg=t.onClickBg||function(){},this.onBeforePopupShow=t.onBeforePopupShow||function(){},this.onAfterPopupHide=t.onAfterPopupHide||function(){},this.nPopContainer.css(_.extend({left:0,right:0,bottom:0,background:"white"},t.containerCss||{})),this.nPopContainer.css("opacity","0")},_doShow:function(){this.contentView&&this.contentView.height?this.height=this.contentView.height():this.contentView||(this.height=this.nPopContainer.height()),this.onBeforePopupShow(),$(".js-close").click($.proxy(function(t){this.hide()},this)),this.nPopContainer.css({height:this.height+"px",transform:"translate3d(0,100%,0)","-webkit-transform":"translate3d(0,100%,0)",opacity:0,position:"absolute","z-index":1e3}),this.bodyPadding=$("body").css("padding"),$("body").css("padding","0px"),setTimeout($.proxy(function(){this.nPopContainer.css({transform:"translate3d(0,0,0)","-webkit-transform":"translate3d(0,0,0)","-webkit-transition":"all ease "+this.animationTime+"ms",transition:"all ease "+this.animationTime+"ms",opacity:1})},this)),setTimeout($.proxy(function(){this.contentView&&this.contentView.onAfterPopupShow&&this.contentView.onAfterPopupShow()},this),this.animationTime)},_doHide:function(t){this.nPopContainer.css({transform:"translate3d(0,100%,0)","-webkit-transform":"translate3d(0,100%,0)",opacity:0}),setTimeout($.proxy(function(){$("body").css("padding",this.bodyPadding),this.onAfterPopupHide()},this),this.animationTime)}});return i}),require(["wap/showcase/modules/goods_list/box_stream","wap/components/popup","vendor/zepto/outer"],function(t,i){!function(i){var o=i(".sc-goods-list.waterfall");o.length&&o.each(function(o,n){var s,e,a,r=i(this),d=2;s=r.outerWidth(),a=Math.floor(s/2)-5,s>=540?(d=3,e=[176.5,176.5,176.5]):e=s>=360?[a,a]:[155,155];var h=new t({container:r[0],rowCount:d,rowContainerClassName:"",rowContainerTagType:"li",rowCintainerWidths:e});h.setListData(),h.sortOut()})}($),function(t){var o=!1,n=function(n,s){var e=t(n.target);if(n.preventDefault(),n.stopPropagation(),"true"!=zenjs.Args.get("hide_buy_btn",location.href)){if(s=s||{},!window._global.is_mobile)return void motify.log("预览不支持进行购买，<br/>实际效果请在手机上进行。");if(o)motify.log("请勿重复提交。");else{var a=e.data("alias"),r=e.data("postage"),d=e.data("buyway"),h=e.data("id"),l=e.data("title"),c=e.data("price"),p=e.parents(".js-goods"),u=e.parents(".link").find(".photo-block img").data("src"),w=e.data("isvirtual");if("0"==d){var f=p.attr("href");window.location.href=f}else{s.isAddWish||e.parent().find(".goods-buy").addClass("ajax-loading"),o=!0;var g=t.ajax({type:"get",timeout:5e3,url:"/v2/showcase/sku/skudata.json",data:{alias:a},dataType:"json",cache:!1,success:function(o){if(0!==+o.code)return void motify.log(o.msg);var n=o.data,a=(n.list[0],n.stock_num),d=h;if(a){var p=new Date,f=new Date(1e3*n.start_sold_time),g=(f-p)/1e3;if(n.start_sold_time&&g>0){var m=parseInt(g/3600),v=parseInt((g-3600*m)/60),y=parseInt(g-3600*m-60*v),C=y+"秒";return(0!==v||0!==m)&&(C=v+"分"+C),0!==m&&(C=m+"时"+C),void motify.log("距开售 还剩"+C)}var _=t.extend(!0,{sku:n,goods_id:d,postage:r,difTitle:!0,goods_info:{title:l,picture:[u],price:c,origin:""},acitvity:{},activity_alias:window._global.activity_alias,activity_id:window._global.activity_id,activity_type:window._global.activity_type,isMultiBtn:!0,is_virtual:+w>0},s),b=new i({contentViewClass:BuyView,className:"sku-layout sku-box-shadow",onFinishHide:function(){s.isAddWish},contentViewOptions:{skuViewConfig:{top:50},isCartBtnHide:(n.option||{}).hideCart||window._global.hide_shopping_cart,logURL:window._global.logURL,baseUrl:window._global.url.wap,wxpay_env:window._global.wxpay_env,onAddSuccess:function(t,i){t=t||{},t.wish&&(e.removeClass("js-goods-wish").addClass("js-remove-goods-wish"),e.data("sku",(i||{}).sku_id),e.parent().find(".goods-wish").addClass("added-wish"))}},isCanNotHide:!1});b.render(_).show()}else motify.log("该商品已售罄!")},error:function(t,i,o){"timeout"===i?(g.abort(),motify.log("连接超时")):"error"===i&&(g.abort(),motify.log("请求失败，请刷新或重新打开本页!"))},complete:function(){o=!1,e.parent().find(".goods-buy").removeClass("ajax-loading")}})}}}};t("body").on("click",".js-goods-buy",function(t){n(t)}),t("body").on("click",".js-goods-wish",function(t){n(t,{isAddWish:!0,isAddCart:!1,isMultiBtn:!1})}),t("body").on("click",".js-remove-goods-wish",function(i){i.preventDefault(),i.stopPropagation();var o=t(i.target),n=o.data("id"),s=window._global.kdt_id||0;t.ajax({url:"/v2/trade/wish/list.json?kdt_id="+s,type:"DELETE",dataType:"json",cache:!1,timeout:5e3,data:{goods_id:n},success:function(t){0===+t.code?(motify.log("心愿删除成功~"),o.addClass("js-goods-wish").removeClass("js-remove-goods-wish"),o.parent().find(".goods-wish").removeClass("added-wish")):motify.log(t.msg)},error:function(t,i,o){motify.log("心愿删除失败。。")}})})}($);var o=$(".js-goods-list");if(0!=o.length){!function(t){var i=[],n={};o.each(function(o,s){t(s).find(".js-goods-wish").each(function(o,s){var e=t(s),a=e.parent().find(".goods-wish"),r=e.data("id");i.push(r),n[r]=n[r]||[],n[r].push({nWish:a,nWishResponse:e})})}),0!=i.length&&window.queryBatch&&queryBatch({key:"wish",url:"/v2/trade/wish/isAdded.json?kdt_id="+window._global.kdt_id||0,type:"POST",para:{goods_ids:i},handler:function(i){var o=i.data||{};0===+i.code&&t.each(n,function(i,n){o[i]&&o[i].isWishOpen&&t.each(n,function(t,n){var s=n.nWish,e=n.nWishResponse;s.removeClass("hide"),e.removeClass("hide"),o[i].isWishAdded&&(e.removeClass("js-goods-wish").addClass("js-remove-goods-wish"),s.addClass("added-wish"))})})}})}($);var n,s;!function(t){function i(t){var i=0;a=a||t[0].width();for(var o=t.length-1;o>=0;o--){var s=t[o],e=s.data("width");e=a>e?a:e;var r=s.data("height")*(a/e);if(i=Math.max(i,r),i>n||0==r){i=n;break}}if(i!=n)for(var o=t.length-1;o>=0;o--)t[o].height(i)}function e(i,o){var n=[],e=[];return 1==o&&i.find(".js-goods-card .photo-block").each(function(i,o){e.push(t(o)),500>s&&i%2!=1||s>500&&i%3!=2||(n.push(e),e=[])}),2==o&&500>s&&i.find(".js-goods-card .photo-block").each(function(i,o){i%3!=0&&(e.push(t(o)),i%3!=1&&(n.push(e),e=[]))}),e.length>0&&n.push(e),e=[],n}o.each(function(o,a){var r=t(a),d=r.data("size"),h=r.data("showtype");if(0==d||3==d||"waterfall"==h)return void r.css("visibility","visible");s=s||r.width(),n=s>500?176:143;for(var l=e(r,d),o=0,c=l.length;c>o;o++)i(l[o]);r.css("visibility","visible")});var a}($)}}),define("main",function(){});