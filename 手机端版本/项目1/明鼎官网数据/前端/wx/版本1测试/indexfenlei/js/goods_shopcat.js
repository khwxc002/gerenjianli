window.Utils = window.Utils || {}, $.extend(window.Utils, {
		getWxInfo: function() {
			var t = window.navigator.userAgent,
				e = t.match(/MicroMessenger\/(\d+(\.\d+)*)/),
				i = null !== e && e.length,
				n = i ? parseFloat(e[1]) : 0;
			return {
				isWx: i,
				wxVersion: n
			}
		}
	}), define("wap/components/util/wx_info", function() {}), define("text!wap/showcase/goods/templates/goodsCount.html", [], function() {
		return '<% if ( data.day > 0 ) { %>\n<i class="mc-num-days"><%- (+data.day) %></i><span class="mc-text">天</span>\n<% } %>\n<% if ( data.day > 0 || data.hour > 0 ) { %>\n<i class="mc-num-hours"><%- (+data.hour) %></i><span class="mc-text">小时</span>\n<% } %>\n<i class="mc-num-minutes"><%- data.min %></i><span class="mc-text">分</span>\n<i class="mc-num-seconds"><%- data.sec %></i><span class="mc-text">秒</span>'
	}), define("zenjs/util/count_down", [], function() {
		function t(t, e, i, n, s) {
			var o = 0,
				a = 0,
				r = 0,
				d = 0,
				l = 0,
				c = "",
				h = new Date,
				p = t.getTime() - h.getTime();
			return 0 >= p ? (s.stop(), e({
				seconds: 0,
				text: "00:00:000",
				hour: 0,
				min: 0,
				sec: 0,
				msec: 0,
				day: 0
			}), void i()) : (p > 864e5 && (o = Math.floor(p / 864e5), p -= 864e5 * o, c += o + "天"), p > 36e5 && (a = p > 36e6 ? Math.floor(p / 36e5) : "0" + Math.floor(p / 36e5), p -= 36e5 * a, c += a + "小时"), p > 6e4 ? (r = Math.floor(p / 6e4) % 60, d = Math.floor(p / 1e3) % 60, l = p % 1e3) : (r = 0, d = Math.floor(p / 1e3), l = p % 1e3), 10 > r && (c += "0"), c += r + "分", 10 > d && (c += "0"), c += d + "秒", 10 > l ? c += "00" : 100 > l && (c += "0"), "second" != n && (c += l), void e({
				text: c,
				hour: a,
				min: r,
				sec: d,
				msec: l,
				day: o
			}))
		}

		function e() {
			this.tid = null, this.startTime = null
		}
		var i = function() {};
		return e.prototype = {
			run: function(e) {
				function n() {
					d.tid = setTimeout(n, "second" == e.step ? 1e3 : 50), t(r, o, a, e.step, d)
				}
				this.startTime || (this.startTime = Date.now());
				var s = e.seconds || 0,
					o = e.onTimeChange || i,
					a = e.onTimeChangeEnd || i;
				this.startTime += 1e3 * s;
				var r = new Date(this.startTime),
					d = this;
				n()
			},
			stop: function() {
				clearTimeout(this.tid)
			}
		}, e
	}), window.Utils = window.Utils || {}, $.extend(window.Utils, {
		makeRandomString: function(t) {
			var e = "",
				i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			t = t || 10;
			for (var n = 0; t > n; n++) e += i.charAt(Math.floor(Math.random() * i.length));
			return e
		}
	}), define("wap/components/util/number", function() {}), define("wap/components/pop", ["zenjs/events", "wap/components/util/number"], function(t) {
		var e = function() {};
		window.zenjs = window.zenjs || {};
		var i = t.extend({
			init: function(t) {
				this._window = $(window);
				var i = window.Utils.makeRandomString();
				$("body").append('<div id="' + i + '"                 style="display:none; height: 100%;                 position: fixed; top: 0; left: 0; right: 0;                background-color: rgba(0, 0, 0, ' + (t.transparent || ".9") + ');z-index:1000;opacity:0;transition: opacity ease 0.2s;"></div>'), this.nBg = $("#" + i), this.nBg.on("click", $.proxy(function() {
					this.isCanNotHide || this.hide()
				}, this));
				var n = window.Utils.makeRandomString();
				$("body").append('<div id="' + n + '" class="' + (t.className || "") + '" style="overflow:hidden;visibility: hidden;"></div>'), this.nPopContainer = $("#" + n), this.nPopContainer.hide(), t.contentViewClass && (this.contentViewClass = t.contentViewClass, this.contentViewOptions = $.extend({
					el: this.nPopContainer
				}, t.contentViewOptions || {}), this.contentView = new this.contentViewClass($.extend({
					onHide: $.proxy(this.hide, this)
				}, this.contentViewOptions)), this.contentView.onHide = $.proxy(this.hide, this)), this.animationTime = t.animationTime || 300, this.isCanNotHide = t.isCanNotHide, this.doNotRemoveOnHide = t.doNotRemoveOnHide || !1, this.onShow = t.onShow || e, this.onHide = t.onHide || e, this.onFinishHide = t.onFinishHide || e, this.html = t.html
			},
			render: function(t) {
				return this.renderOptions = t || {}, this.contentViewClass ? this.contentView.render(this.renderOptions) : this.html && this.nPopContainer.html(this.html), this
			},
			show: function() {
				return this.top = this._window.scrollTop(), this.nBg.show().css({
					opacity: "1",
					"transition-property": "none"
				}), this.nPopContainer.show(), setTimeout($.proxy(function() {
					this._window.scrollTop(0), this.startShow(), this.nPopContainer.show().css("visibility", "visible"), this._doShow && this._doShow(), this.onShow()
				}, this), 200), this
			},
			hide: function() {
				var t, e = function() {
					return t !== this._window.scrollTop() ? (this._window.scrollTop(t), void setTimeout($.proxy(e, this))) : void setTimeout($.proxy(this.onFinishHide, this), 50)
				};
				return function(i) {
					i = i || {};
					var n = i.doNotRemove || this.doNotRemoveOnHide || !1;
					this._doHide && this._doHide(), setTimeout($.proxy(function() {
						this.startHide(), t = this.top, this._window.scrollTop(t), $.proxy(e, this)(), this.nBg.css({
							opacity: 0,
							"transition-property": "opacity"
						}), setTimeout($.proxy(function() {
							this.nBg.hide(), this.nPopContainer.hide(), n || this.destroy(), window.zenjs.popList.length < 1 && $("html").css("position", this.htmlPosition)
						}, this), 200)
					}, this), this.animationTime), this.onHide()
				}
			}(),
			destroy: function() {
				return this.nPopContainer.remove(), this.nBg.remove(), this.contentView && this.contentView.remove(), this
			},
			startShow: function() {
				var t = window.zenjs.popList;
				if (t || (t = window.zenjs.popList = []), 0 === t.length) {
					var e = $("body"),
						i = $("html");
					this.htmlPosition = i.css("position"), i.css("position", "relative"), this.bodyCss = (e.attr("style") || {}).cssText, this.htmlCss = (i.attr("style") || {}).cssText, $("body,html").css({
						overflow: "hidden",
						height: this._window.height()
					})
				}
				t.indexOf(this) < 0 && t.push(this)
			},
			startHide: function() {
				var t = window.zenjs.popList,
					e = t.indexOf(this);
				e > -1 && t.splice(e, 1), t.length < 1 && ($("html").attr("style", this.htmlCss || ""), $("body").attr("style", this.bodyCss || ""))
			}
		});
		return i
	}), define("wap/components/popup", ["wap/components/pop"], function(t) {
		var e = t.extend({
			init: function(t) {
				this._super(t), this.onClickBg = t.onClickBg || function() {}, this.onBeforePopupShow = t.onBeforePopupShow || function() {}, this.onAfterPopupHide = t.onAfterPopupHide || function() {}, this.nPopContainer.css(_.extend({
					left: 0,
					right: 0,
					bottom: 0,
					background: "white"
				}, t.containerCss || {})), this.nPopContainer.css("opacity", "0")
			},
			_doShow: function() {
				this.contentView && this.contentView.height ? this.height = this.contentView.height() : this.contentView || (this.height = this.nPopContainer.height()), this.onBeforePopupShow(), $(".js-close").click($.proxy(function(t) {
					this.hide()
				}, this)), this.nPopContainer.css({
					height: this.height + "px",
					transform: "translate3d(0,100%,0)",
					"-webkit-transform": "translate3d(0,100%,0)",
					opacity: 0,
					position: "absolute",
					"z-index": 1e3
				}), this.bodyPadding = $("body").css("padding"), $("body").css("padding", "0px"), setTimeout($.proxy(function() {
					this.nPopContainer.css({
						transform: "translate3d(0,0,0)",
						"-webkit-transform": "translate3d(0,0,0)",
						"-webkit-transition": "all ease " + this.animationTime + "ms",
						transition: "all ease " + this.animationTime + "ms",
						opacity: 1
					})
				}, this)), setTimeout($.proxy(function() {
					this.contentView && this.contentView.onAfterPopupShow && this.contentView.onAfterPopupShow()
				}, this), this.animationTime)
			},
			_doHide: function(t) {
				this.nPopContainer.css({
					transform: "translate3d(0,100%,0)",
					"-webkit-transform": "translate3d(0,100%,0)",
					opacity: 0
				}), setTimeout($.proxy(function() {
					$("body").css("padding", this.bodyPadding), this.onAfterPopupHide()
				}, this), this.animationTime)
			}
		});
		return e
	}), define("zenjs/uploader/photo_uploader", [], function() {
		var t = function() {},
			e = function() {
				if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) return !1;
				var t = document.createElement("input");
				return t.type = "file", !t.disabled
			},
			i = Backbone.View.extend({
				initialize: function(e) {
					this.nInput = this.$("input"), this.nUploader = this.$("button"), this.onValidUpload = e.onValidUpload || function() {
						return !0
					}, this.onStartReadFile = e.onStartReadFile || t, this.onFinishReadFile = e.onFinishReadFile || t, this.onBeforeUpload = e.onBeforeUpload || t, this.onUploadSuccess = e.onUploadSuccess || t, this.onUploadError = e.onUploadError || t
				},
				events: {
					"click input": "onInputClicked",
					"change input": "onFileChanged"
				},
				render: function(t) {
					e() || this.nUploader.css("padding-left", "10px").html("您的浏览器不支持图片上传").attr("disabled", "disabled")
				},
				onInputClicked: function() {},
				onFileChanged: function(t) {
					var e = this,
						i = t.target.files;
					_.map(i, function(t, i, n) {
						if (e.onValidUpload({
							file: t
						})) {
							e.onStartReadFile({
								file: t
							});
							var s = new FileReader;
							s.onload = function(i) {
								e.onFinishReadFile({
									src: i.target.result,
									file: t
								})
							}, s.readAsDataURL(t), e.getUploadToken(t)
						}
					})
				},
				getUploadToken: function(t) {
					var e = this;
					return this.uptoken ? void this.doUploadPhoto(t) : void $.ajax({
						url: window._global.url.wap + "/common/qiniu/upToken.jsonp",
						type: "get",
						dataType: "jsonp",
						timeout: 5e3,
						cache: !1,
						data: {
							scope: window._global.js.qn_public,
							kdt_id: _global.kdt_id || ""
						},
						beforeSend: function() {},
						success: function(i) {
							e.uptoken = i.data.uptoken, e.doUploadPhoto(t)
						},
						error: function(t, e, i) {},
						complete: function(t, e) {}
					})
				},
				doUploadPhoto: function(t) {
					var e = this,
						i = new FormData;
					i.append("token", this.uptoken), i.append("file", t);
					var n = t.name.split("."),
						s = "";
					n.length > 1 && (s = "." + n[n.length - 1]), i.append("x:ext", s), $.ajax({
						url: "http://up.qiniu.com",
						type: "post",
						data: i,
						dataType: "json",
						processData: !1,
						contentType: !1,
						beforeSend: function() {
							e.onBeforeUpload({
								file: t
							}), e.nInput.data("uploaded", "false")
						},
						success: function(i) {
							e.onUploadSuccess({
								url: i.data.attachment_full_url,
								file: t,
								data: i.data
							}), e.nInput.data("value", i.data.attachment_full_url), e.nInput.data("uploaded", "true")
						},
						error: function(i, n, s) {
							e.onUploadError({
								file: t
							})
						},
						complete: function(t, e) {}
					})
				}
			});
		return i
	}), window.Utils = window.Utils || {}, $.extend(window.Utils, {
		validMobile: function(t) {
			return t = "" + t, /^((\+86)|(86))?(1)\d{10}$/.test(t)
		},
		validPhone: function(t) {
			return t = "" + t, /^0[0-9\-]{10,13}$/.test(t)
		},
		validNumber: function(t) {
			return /^\d+$/.test(t)
		},
		validEmail: function(t) {
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
		},
		validPostalCode: function(t) {
			return t = "" + t, /^\d{6}$/.test(t)
		}
	}), define("wap/components/util/valid", function() {}), define("text!wap/showcase/sku/templates/message.html", [], function() {
		return '<% if(messages.length !== 0) {%>\n    <div class=\'sku-message\'>\n        <% for (var j = 0, len = messages.length; j < len; j++) { %>\n        <dl class="clearfix">\n            <dt class="pull-left">\n                <label for="ipt-<%=j %>"><% if (messages[j].required == \'1\') { %><sup class="required">*</sup><% } %><%=messages[j].name %></label>\n            </dt>\n            <dd class="comment-wrapper clearfix">\n                <% if (messages[j].multiple == \'0\') { %>\n                    <% if (messages[j].type === \'image\') { %>\n                        <input data-valid-type="<%=messages[j].type %>" <% if (messages[j].required == \'1\') { %>required<% } %> tabindex="<%=j + 1 %>" id="ipt-<%=j %>" name="message_<%=j %>" type="file" capture="camera" accept="image/*" class="js-message photo-input" >\n                        <button class="btn btn-white image-input-trigger pull-right">拍照&nbsp;或&nbsp;选择相片</button>\n                        <div class=\'image-input-show clearfix\'>\n                            <img class="hide" width=50 height=50 />\n                        </div>\n                    <% } else if(\'id_no\' === messages[j].type) {%>\n                        <input placeholder="填写中国大陆18位身份证号" data-valid-type="<%=messages[j].type %>" <% if (messages[j].required == \'1\') { %>required<% } %> tabindex="<%=j + 1 %>" id="ipt-<%=j %>" name="message_<%=j %>" type="<%=messages[j].type %>" class="txt js-message font-size-14" />\n                    <% } else { %>\n                        <input data-valid-type="<%=messages[j].type %>" <% if (messages[j].required == \'1\') { %>required<% } %> tabindex="<%=j + 1 %>" id="ipt-<%=j %>" name="message_<%=j %>" type="<%=messages[j].type %>" class="txt js-message font-size-14" />\n                    <% } %>\n                <% } else { %>\n                <textarea data-valid-type="<%=messages[j].type %>" <% if (messages[j].required == \'1\') { %>required<% } %> tabindex="<%=j + 1 %>" id="ipt-<%=j %>" name="message_<%=j %>" cols="32" rows="1" class="txta js-message font-size-14"></textarea>\n                <% } %>\n                <% if (messages[j].type != \'image\' && (isIOS || (messages[j].type != \'date\' && messages[j].type != \'time\'))) { %>\n                    <div class=\'txtCover\'></div>\n                <% } %>\n            </dd>\n        </dl>\n        <% } %>\n    </div>\n<% } %>\n'
	}), define("wap/showcase/sku/views/message", ["zenjs/uploader/photo_uploader", "wap/components/util/valid", "text!wap/showcase/sku/templates/message.html"], function(t, e, i) {
		var n = window.zenjs.UA,
			s = n && n.isIOS(),
			o = Backbone.View.extend({
				template: _.template(i),
				initialize: function(t) {
					this.messages = this.options.messages || []
				},
				events: {
					"click .txtCover": "txtFocus",
					"blur .txt,.txta": "txtBlur"
				},
				txtFocus: function(t) {
					var e = $(t.target),
						i = e.parent().find(".txt,.txta");
					i.focus(), s && n.getIOSVersion() < 8 && (i.blur(), i.focus()), e.parent().find(".txta").attr("rows", "2"), e.css("display", "none")
				},
				txtBlur: function(t) {
					var e = $(t.target);
					e.parent().find(".txtCover").css("display", "block"), e.hasClass("txta") && e.attr("rows", "1")
				},
				render: function() {
					this.$el.html(this.template({
						messages: this.messages,
						isIOS: s
					})), 0 === this.messages.length && this.$el.hide();
					var e = this.$(".photo-input");
					return this.photoUploaders = [], e.each(_(function(e, i) {
						var n = $(i).parent(),
							s = n.find("img"),
							o = n.find("button"),
							a = new t({
								el: n,
								onFinishReadFile: function(t) {
									s.removeClass("hide").attr("src", t.src)
								},
								onBeforeUpload: function() {
									o.html("正在上传...")
								},
								onUploadSuccess: function(t) {
									s.removeClass("hide").attr("src", t.url + "!100x100.jpg"), o.html("修改")
								},
								onUploadError: function() {
									o.html("重新上传")
								}
							}).render();
						this.photoUploaders.push(a)
					}).bind(this)), s || this.$el.find("input[type=date], input[type=time]").on("mouseover mousedown touchstart touchmove touchend touchcancel", function(t) {
						t.stopPropagation()
					}), this
				},
				validate: function(t) {
					for (var e, i, n, s, o = this, a = this.messages, r = 0, d = a.length; d > r; r++)
						if (e = "message_" + r, i = t[e], n = a[r], _.isEmpty(i)) {
							if ("1" == n.required) return o.$el.find("#ipt-" + r).focus(), motify.log("image" == n.type ? "请上传 " + n.name + "。" : "请填写 " + n.name + "。"), !1
						} else {
							if ("image" == n.type && (s = o.$el.find("#ipt-" + r).data("uploaded"), "false" == s || !s)) return motify.log("图片还在上传中，请稍等。。"), !1;
							if ("tel" == n.type && !Utils.validNumber(i)) return o.$el.find("#ipt-" + r).focus(), motify.log("请填写正确的" + n.name + "。"), !1;
							if ("email" == n.type && !Utils.validEmail(i)) return o.$el.find("#ipt-" + r).focus(), motify.log("请填写正确的" + n.name + "。"), !1;
							if ("id_no" == n.type && (i.length < 15 || i.length > 18)) return o.$el.find("#ipt-" + r).focus(), motify.log("请填写正确的" + n.name + "。"), !1
						}
					return !0
				},
				getData: function() {
					var t = {};
					return this.$("dl .js-message").each(function(e, i) {
						if ("file" == i.type) var n = $(i).data("value");
						t[i.name] = n || i.value || ""
					}), this.validate(t) ? t : null
				}
			});
		return o
	}), define("text!wap/showcase/goods/templates/present_sku.html", [], function() {
		return '<!-- <div class="layout-title sku-box-shadow name-card sku-name-card">\n    <div class="thumb"><img src="http://imgqntest.koudaitong.com/upload_files/2014/11/20/FtZUJNm6bg4dPp7ECvNnBjhEFKyu.jpg!100x100.jpg" alt=""></div>\n    <div class="detail goods-base-info clearfix">\n        <p class="title c-black ellipsis">我很便宜</p>\n        <div class="goods-price clearfix">\n            <div class="current-price c-black pull-left">\n                <span class="price-name pull-left font-size-14 c-orange">￥</span><i class="js-goods-price price font-size-18 c-orange vertical-middle">0.01</i>\n            </div>\n        </div>\n    </div>\n    <div class="js-cancel sku-cancel">\n        <div class="cancel-img"></div>\n    </div>\n</div> -->\n\n<div class="adv-opts layout-content">\n    <div class="goods-models js-sku-views block block-list block-border-top-none">\n    </div>\n    <div class="confirm-action content-foot">\n        <a href="javascript:;" class="js-sku-get-present btn btn-block btn-green">领取赠品</a>\n    </div>\n</div>\n'
	}), define("wap/showcase/goods/views/present_sku", ["wap/showcase/sku/views/message", "text!wap/showcase/goods/templates/present_sku.html"], function(t, e) {
		return Backbone.View.extend({
			events: {
				"click .js-sku-get-present": "_onGetPresentClicked",
				"click .js-cancel": "_onCancelClicked"
			},
			initialize: function(t) {
				t = t || {}, this.messages = t.messages || [], this.onHide = t.onHide || function() {}, this.onGetPresentClicked = t.onGetPresentClicked
			},
			render: function() {
				return this.$el.html(e), this.nSkuContainer = this.$(".js-sku-views"), this.messageView = new t({
					messages: this.messages,
					className: "block-item block-item-messages"
				}), this.nSkuContainer.append(this.messageView.render().el), this
			},
			_onGetPresentClicked: function() {
				var t = this.messageView.getData();
				t && this.onGetPresentClicked({
					postData: t
				})
			},
			_onCancelClicked: function(t) {
				this.onHide()
			}
		})
	}), define("text!wap/components/login_popout/templates/init.html", [], function() {
		return '<form class="form-dialog js-login-form block-wrapper-form" method="GET" action="">\n    <div class="header">\n        <h2>\n            <span class="form-title c-green font-size-16">请填写您的手机号码</span>\n        </h2>\n    </div>\n    <fieldset class="font-size-14">\n        <div class="block-form-item">\n            <label for="phone" class="item-label">手机号</label>\n            <input id="phone" name="phone" class="item-input" type="tel" maxlength="11" autocomplete="off" placeholder="" value="<%= phone %>">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="js-help-info font-size-12 error"></div>\n    </fieldset>\n    <div class="action-container">\n        <input type="submit" class="js-confirm btn btn-green btn-block font-size-14" value="确认手机号码" />\n    </div>\n</form>'
	}), define("text!wap/components/login_popout/templates/login.html", [], function() {
		return '<form class="form-dialog js-login-form block-wrapper-form" method="GET" action="">\n    <div class="header">\n        <h2>\n            <span class="form-title c-green font-size-16">该号码注册过，请直接登录</span>\n        </h2>\n    </div>\n    <fieldset class="font-size-14">\n        <div class="block-form-item">\n            <label for="phone" class="item-label">手机号</label>\n            <input id="phone" name="phone" class="item-input" type="tel" maxlength="11" autocomplete="off" placeholder="请输入你的手机号" disabled="disabled" value="<%= phone %>">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="block-form-item">\n            <label for="password" class="item-label">密码</label>\n            <input id="passsword" name="password" class="item-input"  type="password" autocomplete="off" placeholder="请输入登录密码">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="js-help-info font-size-12 error"></div>\n    </fieldset>\n    <div class="action-container">\n        <button type="button" class="js-confirm btn btn-green btn-block font-size-14">确认</button>\n    </div>\n    <div class="bottom-link font-size-12">\n        <span class="c-orange">如果您忘了密码，请</span><a href="javascript:;" class="js-change-pwd c-blue">点此找回密码</a>\n        <a href="javascript:;" class="js-change-phone c-blue pull-right">更换手机号</a>\n    </div>\n</form>\n'
	}), define("text!wap/components/login_popout/templates/register.html", [], function() {
		return '<form class="form-dialog js-login-form block-wrapper-form" method="GET" action="">\n    <div class="header">\n        <h2>\n            <span class="form-title c-green font-size-16">注册有赞帐号</span>\n        </h2>\n    </div>\n    <fieldset class="font-size-14">\n        <div class="block-form-item">\n            <label for="phone" class="item-label">手机号</label>\n            <input id="phone" name="phone" class="item-input" type="tel" maxlength="11" autocomplete="off" placeholder="请输入你的手机号" disabled="disabled" value="<%= phone %>">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="block-form-item js-image-verify hide">\n            <label for="verifycode" class="item-label">身份校验</label>\n            <input id="verifycode" name="verifycode" class="js-verify-code item-input"  type="tel" style="width:178px" maxlength="6" autocomplete="off" placeholder="输入右侧数字">\n            <div class="txt-cover txt-cover-half js-txt-cover"></div>\n            <img class="js-verify-image verify-image" src="">\n        </div>\n        <div class="block-form-item">\n            <label for="code" class="item-label">验证码</label>\n            <input id="code" name="code" class="item-input"  type="text" style="width:178px" maxlength="6" autocomplete="off" placeholder="输入短信验证码">\n            <div class="txt-cover txt-cover-half js-txt-cover"></div>\n            <button type="button" class="js-auth-code tag btn-auth-code tag-green font-size-12" data-text="获取验证码">\n                获取验证码\n            </button>\n        </div>\n        <div class="block-form-item">\n            <label for="password" class="item-label">密码</label>\n            <input id="passsword" name="password" class="item-input"  type="password" autocomplete="off" placeholder="设置登录密码，下次登录使用">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="js-help-info font-size-12 error"></div>\n    </fieldset>\n    <div class="action-container">\n        <button type="button" class="js-confirm btn btn-green btn-block font-size-14">确认</button>\n    </div>\n    <div class="bottom-link font-size-12">\n        <span class="c-orange">如果您忘了密码，请</span><a href="javascript:;" class="js-change-pwd c-blue">点此找回密码</a>\n        <a href="javascript:;" class="js-change-phone c-blue pull-right">更换手机号</a>\n    </div>\n</form>\n'
	}), define("text!wap/components/login_popout/templates/change_pwd.html", [], function() {
		return '<form class="form-dialog js-login-form block-wrapper-form" method="GET" action="">\n    <div class="header">\n        <h2>\n            <span class="form-title c-green font-size-16"><%if(isSetting){%>设定<%}else{%>找回<%}%>帐号密码</span>\n        </h2>\n    </div>\n    <fieldset class="font-size-14">\n        <div class="block-form-item">\n            <label for="phone" class="item-label">手机号</label>\n            <input id="phone" name="phone" class="item-input" type="tel" maxlength="11" autocomplete="off" placeholder="请输入你的手机号" disabled="disabled" value="<%= phone %>">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="block-form-item js-image-verify hide">\n            <label for="verifycode" class="item-label">身份校验</label>\n            <input id="verifycode" name="verifycode" class="js-verify-code item-input"  type="tel" style="width:178px" maxlength="6" autocomplete="off" placeholder="输入右侧数字">\n            <div class="txt-cover txt-cover-half js-txt-cover"></div>\n            <img class="js-verify-image verify-image" src="">\n        </div>\n        <div class="block-form-item">\n            <label for="code" class="item-label">验证码</label>\n            <input id="code" name="code" class="item-input"  type="text" style="width:178px" maxlength="6" autocomplete="off" placeholder="输入短信验证码">\n            <div class="txt-cover txt-cover-half js-txt-cover"></div>\n            <button type="button" class="js-auth-code tag btn-auth-code font-size-12 tag-green" data-text="获取验证码">\n                获取验证码\n            </button>\n        </div>\n        <div class="block-form-item">\n            <label for="password" class="item-label">密码</label>\n            <input id="passsword" name="password" class="item-input"  type="password" autocomplete="off" placeholder="设置一个新的登录密码">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="js-help-info font-size-12 error"></div>\n    </fieldset>\n    <div class="action-container">\n        <button type="button" class="js-confirm btn btn-green btn-block font-size-14">确定</button>\n    </div>\n    <div class="binary-box">\n        <div><a href="javascript:;" class="js-login c-blue">已有帐号登录</a></div>\n        <div><a href="javascript:;" class="js-register c-blue">注册新帐号</a></div>\n    </div>\n</form>\n'
	}), window.Zepto && function(t) {
		t.fn.serializeArray = function() {
			var e, i, n = [],
				s = function(t) {
					return t.forEach ? t.forEach(s) : void n.push({
						name: e,
						value: t
					})
				};
			return this[0] && t.each(this[0].elements, function(n, o) {
				i = o.type, e = o.name, e && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != i && "reset" != i && "button" != i && "file" != i && ("radio" != i && "checkbox" != i || o.checked) && s(t(o).val())
			}), n
		}, t.fn.serialize = function() {
			var t = [];
			return this.serializeArray().forEach(function(e) {
				t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
			}), t.join("&")
		}, t.fn.submit = function(e) {
			if (0 in arguments) this.bind("submit", e);
			else if (this.length) {
				var i = t.Event("submit");
				this.eq(0).trigger(i), i.isDefaultPrevented() || this.get(0).submit()
			}
			return this
		}
	}(Zepto), define("vendor/zepto/form", function() {}), window.Utils = window.Utils || {}, define("wap/components/util/form", ["vendor/zepto/form"], function(t) {
		window.Utils.getFormData = function(t) {
			var e = t.serializeArray(),
				i = {};
			return $.map(e, function(t) {
				i[t.name] = t.value
			}), i
		}
	}), define("wap/components/sms_fetch/main", ["zenjs/util/args"], function(t) {
		function e() {
			this.loadingLock = !1, this.isUsed = void 0
		}

		function i(t) {
			t = t || {}, this.$el = $(t.el || t.$el || "<div></div>"), this.el = this.$el[0], this.$ = function(t) {
				return this.$el.find(t)
			}, this.initialize && this.initialize(t)
		}
		var n = function() {};
		e.prototype = {
			fetch: function() {
				if (this.isUsed !== !1) {
					var t = this;
					this.loadingLock = !0, $.ajax({
						url: window._global.url.www + "/common/token/token.jsonp",
						type: "get",
						dataType: "jsonp"
					}).done(function(e) {
						0 == e.code ? (t.token = e.data, t.loadingLock = !1, t.isUsed = !1) : motify.log(e.msg)
					}).fail(function() {
						motify.log("token 获取失败")
					})
				}
			},
			get: function() {
				return this.isUsed = !0, this.token
			}
		};
		var s = new e;
		return $.extend(i.prototype, {
			initialize: function(t) {
				this.duration = t.time || 60, this.step = t.step || 1100, this.codeVerifyClass = t.codeVerifyClass || "js-verify-code", this.verifyType = "smsFetch", this.smsFetchUrl = _global.url.www + "/common/sms/captcha.jsonp", this.imgUrl = _global.url.www + "/common/sms/imgcaptcha", this.imgVerifyUrl = _global.url.www + "/common/sms/imgcaptcha.jsonp", this.biz = t.biz || "kdt_account_captcha", this.onTimeChange = t.onTimeChange || n, this.onTimeEnd = t.onTimeEnd || n, this.onTimerStart = t.onTimerStart || n, this.onTimerClose = t.onTimerClose || n, this.onVerifyPictureShow = t.onVerifyPictureShow || n, this.onGetCodeError = t.onGetCodeError || n, this.onVerifyPictureSuccess = t.onVerifyPictureSuccess || n, this.onVerifyPictureError = t.onVerifyPictureError || n, s.fetch()
			},
			setMobile: function(t) {
				t && (this.mobile = t)
			},
			getImageCode: function() {
				return $.trim(this.$("." + this.codeVerifyClass).val())
			},
			getSms: function(t) {
				var e = this;
				if (s.loadingLock) return void motify.log("数据加载中，稍后再试");
				if (t = t || {}, t.mobile && (this.mobile = t.mobile), !this.mobile) return !1;
				var i = {
					smsFetch: e.onSmsFetchHandler,
					image: e.onImageHandler
				};
				return e.startTimer.call(e), (i[e.verifyType] || n).call(e), this
			},
			startTimer: function() {
				this.onTimerStart(), this.btnCountdown(this.duration)
			},
			stopTimer: function() {
				clearTimeout(this.timer), this.onTimerClose()
			},
			btnCountdown: function(t) {
				var e = this;
				this.onTimeChange({
					second: t
				}), --t >= 0 ? this.timer = setTimeout(function() {
					e.btnCountdown(t)
				}, this.step) : (this.onTimeEnd(), this.timer = "")
			},
			onVerifyImageShow: function(t) {
				this.$(".js-image-verify").removeClass("hide"), this.$(".js-verify-image").attr("src", t)
			},
			onVerifyImageHide: function() {
				this.$(".js-image-verify").addClass("hide")
			},
			onSmsFetchHandler: function() {
				var t = 1;
				return function() {
					var e = this;
					$.ajax({
						url: this.smsFetchUrl,
						dataType: "jsonp",
						data: {
							verifyTimes: t,
							mobile: this.mobile,
							biz: e.biz,
							token: s.get()
						},
						success: function(i) {
							return 0 == i.code ? void t++ : (e.stopTimer.call(e), e.onGetCodeError.call(e), void(10111 === i.code ? (e.verifyType = "image", e.onVerifyImageShow(e.imgUrl), e.onVerifyPictureShow()) : (t++, motify.log(i.msg))))
						},
						error: function(i, n, s) {
							t++, e.stopTimer.call(e), e.onGetCodeError.call(e), motify.log("获取验证码失败，请稍后再试")
						},
						complete: function(t, e) {}
					}).always(function() {
						s.fetch()
					})
				}
			}(),
			onImageHandler: function() {
				var t = this,
					e = this.mobile;
				$.ajax({
					url: this.imgVerifyUrl,
					dataType: "jsonp",
					data: {
						mobile: e,
						captcha_code: this.getImageCode()
					},
					success: function(i) {
						return 0 === i.code ? (t.verifyType = "smsFetch", t.mobile = e, t.onVerifyImageHide(), t.onVerifyPictureSuccess(), void t.onSmsFetchHandler()) : (t.stopTimer.call(t), t.onVerifyPictureError.call(t), void(10100 === i.code ? (motify.log(i.msg), t.$el.find(".js-verify-image").attr("src", t.imgUrl)) : motify.log(i.msg)))
					},
					error: function(e, i, n) {
						t.stopTimer.call(t), t.onVerifyPictureError.call(t), motify.log("图形验证失败，重试一下吧~"), t.$el.find(".js-verify-image").attr("src", t.imgUrl)
					},
					complete: function(t, e) {}
				})
			}
		}), i
	}), define("wap/components/login_popout/main", ["text!wap/components/login_popout/templates/init.html", "text!wap/components/login_popout/templates/login.html", "text!wap/components/login_popout/templates/register.html", "text!wap/components/login_popout/templates/change_pwd.html", "wap/components/util/valid", "wap/components/util/form", "wap/components/sms_fetch/main"], function(t, e, i, n, s, o, a) {
		var r = window.zenjs.UA,
			d = Backbone.View.extend({
				events: {
					"click .js-confirm": "onConfirmClicked",
					"click .js-change-phone": "onChangePhoneClicked",
					"click .js-change-pwd": "onChangePwdClicked",
					"click .js-login": "onLoginClicked",
					"click .js-register": "onRegisterClicked",
					"click .js-auth-code": "onAuthcodeClicked",
					"click .js-txt-cover": "onCoverClick",
					"submit .js-login-form": "onConfirmClicked",
					"blur input": "onInputBlur"
				},
				initialize: function(s) {
					var o = this;
					s = s || {}, this.tpl_map = {
						init: _.template(s.initTpl || t),
						login: _.template(s.loginTpl || e),
						register: _.template(s.registerTpl || i),
						changePwd: _.template(s.changePwdTpl || n)
					}, this.valid_map = {
						checkPhone: _(this.checkPhone).bind(this),
						checkPwd: _(this.checkPwd).bind(this),
						checkCode: _(this.checkCode).bind(this)
					}, this.renderOpt = s.renderOpt || {
						type: "init",
						phone: ""
					}, this.afterLogin = s.afterLogin, this.urlMap = {
						login: s.loginUrl || "/v2/buyer/auth/authlogin.json",
						register: s.registerUrl || "/v2/buyer/auth/authRegister.json",
						changePwd: s.changePwdUrl || "/v2/buyer/auth/changePassword.json"
					}, this.source = s.source || 2, this.ajaxType = s.ajaxType || "POST", this.sms = new a({
						el: this.$el,
						onTimeChange: function(t) {
							var e = t.second;
							$(o.nAuthCode).text("等待 " + e + "秒")
						},
						onTimeEnd: function() {
							o.nAuthCode.text("再次获取"), o.nAuthCode.prop("disabled", !1), o.nAuthCode.removeClass("disabled"), o.nCodeInput.attr("placeholder", "没有收到验证码？")
						},
						onTimerStart: function() {
							o.nAuthCode.prop("disabled", !0), o.nAuthCode.addClass("disabled")
						},
						onVerifyPictureError: function() {
							o.nAuthCode.removeAttr("disabled"), o.nAuthCode.removeClass("disabled"), o.nAuthCode.text("再次获取")
						},
						onGetCodeError: function() {
							o.nAuthCode.removeAttr("disabled"), o.nAuthCode.removeClass("disabled"), o.nAuthCode.text("再次获取")
						},
						onVerifyPictureShow: function() {
							o.nHelpInfo.html("操作过于频繁，请先输入图像验证码再获取")
						},
						onVerifyPictureSuccess: function() {
							o.nHelpInfo.html("")
						}
					})
				},
				render: function() {
					return this.$el.html(this.tpl_map[this.renderOpt.type](this.renderOpt)), this.nForm = this.$(".js-login-form"), this.nHelpInfo = this.$(".js-help-info"), this.nPhone = this.$('input[name="phone"]'), this.nPwd = this.$('input[name="password"]'), this.nCodeInput = this.$('input[name="authcode"]'), this.nAuthCode = this.$(".js-auth-code"), this
				},
				show: function(t, e) {
					"changePwd" == t ? this.sms.biz = "reset_account_passwd" : this.sms.biz = "kdt_account_captcha", _.extend(this.renderOpt, {
						type: t
					}, e || {
						isSetting: !1
					}), this.render(this.renderOpt), this.$el.show(this.animationTime)
				},
				onConfirmClicked: function(t) {
					t.preventDefault();
					var e = this,
						i = $(t.target),
						n = Utils.getFormData(e.nForm);
					if (n = _.extend(e.renderOpt, n), !e.validate(n)) return !1;
					n.source = this.source;
					var s = i.html();
					if ("init" === e.renderOpt.type) e.renderOpt.phone = n.phone, $.ajax({
						url: "/v2/buyer/auth/authConfirm.json",
						type: "POST",
						dataType: "json",
						timeout: 15e3,
						data: n,
						beforeSend: function() {
							i.html("确认中..."), i.prop("disabled", !0)
						},
						success: function(t) {
							switch (+t.code) {
								case 0:
									e.show("login");
									break;
								case 200:
									e.show("register");
									break;
								case 300:
									e.show("changePwd", {
										isSetting: !0
									});
								default:
									e.nHelpInfo.html(t.msg)
							}
						},
						error: function() {
							e.nHelpInfo.html("出错啦，请重试")
						},
						complete: function() {
							i.html(s), i.prop("disabled", !1)
						}
					});
					else {
						var o = e.renderOpt.type;
						$.ajax({
							url: this.urlMap[o],
							type: this.ajaxType,
							dataType: "json",
							timeout: 15e3,
							data: n,
							beforeSend: function() {
								i.html("确认中..."), i.prop("disabled", !0)
							},
							success: function(t) {
								0 === t.code ? e.afterLogin(t, {
									type: o
								}) : e.nHelpInfo.html(t.msg)
							},
							error: function() {
								e.nHelpInfo.html("出错啦，请重试")
							},
							complete: function() {
								i.html(s), i.prop("disabled", !1)
							}
						})
					}
				},
				onAuthcodeClicked: function(t) {
					t.preventDefault();
					var e = this,
						i = Utils.getFormData(e.nForm);
					i = _.extend(e.renderOpt, i);
					var n = i.phone;
					this.sms.setMobile(n), this.sms.getSms()
				},
				onChangePhoneClicked: function(t) {
					t.preventDefault(), this.show("init")
				},
				onChangePwdClicked: function(t) {
					t.preventDefault(), this.sms.stopTimer(), this.show("changePwd")
				},
				onLoginClicked: function(t) {
					t.preventDefault(), this.show("init")
				},
				onRegisterClicked: function(t) {
					t.preventDefault(), this.show("init")
				},
				validate: function() {
					var t = {
						init: ["checkPhone"],
						login: ["checkPwd"],
						register: ["checkCode", "checkPwd"],
						changePwd: ["checkCode", "checkPwd"]
					};
					return function(e) {
						return _.every(t[e.type], _(function(t) {
							return this.valid_map[t](e)
						}).bind(this))
					}
				}(),
				checkPhone: function(t) {
					return "" === t.phone ? (this.nPhone.focus(), this.nHelpInfo.html("请填写您的手机号码"), !1) : window.Utils.validMobile(t.phone) ? !0 : (this.nPhone.focus(), this.nHelpInfo.html("请填写11位手机号码"), !1)
				},
				checkPwd: function(t) {
					return "" === t.password ? (this.nPwd.focus(), this.nHelpInfo.html("请输入您的密码"), !1) : "login" !== this.renderOpt.type && t.password.length < 6 ? (this.nPwd.focus(), this.nHelpInfo.html("亲，密码最短为6位"), !1) : "login" !== this.renderOpt.type && t.password.length > 20 ? (this.nPwd.focus(), this.nHelpInfo.html("亲，密码太长为16位"), !1) : !0
				},
				checkCode: function(t) {
					return window.Utils.validPostalCode(t.code) ? !0 : (this.nCodeInput.focus(), this.nHelpInfo.html("请填写6位短信验证码"), !1)
				},
				onCoverClick: function(t) {
					var e = $(t.target),
						i = e.parent().find("input");
					i.focus(), r && (r.isIOS() && r.getIOSVersion() < 8 && (i.blur(), i.focus()), e.css("display", "none"))
				},
				onInputBlur: function(t) {
					var e = $(t.target);
					e.parent().find(".js-txt-cover").css("display", "block")
				}
			});
		return d
	}), define("wap/components/popout", ["wap/components/pop"], function(t) {
		var e = t.extend({
			init: function(t) {
				t = t || {}, this._super(t), this.css = $.extend({
					position: "absolute",
					"z-index": 1e3,
					transition: "opacity ease " + this.animationTime + "ms",
					opacity: 0,
					top: "50%",
					left: "50%",
					"-webkit-transform": "translate3d(-50%, -50%, 0)",
					transform: "translateY(-50%, -50%, 0)"
				}, t.css || {}), this.nPopContainer.css(this.css)
			},
			_doShow: function() {
				$(".js-popout-close").click($.proxy(function(t) {
					this.hide()
				}, this)), this.nPopContainer.css("opacity", 1), this.nPopContainer.show()
			},
			_doHide: function(t) {
				this.nPopContainer.css({
					opacity: 0
				})
			}
		});
		return e
	}), define("wap/components/popout_box", ["wap/components/popout"], function(t) {
		var e = function() {},
			i = t.extend({
				init: function(t) {
					this._super(t), this._onOKClicked = t.onOKClicked || e, this._onCancelClicked = t.onCancelClicked || e, this.preventHideOnOkClicked = t.preventHideOnOkClicked || !1, this.width = t.width, this.setEventListener()
				},
				setEventListener: function() {
					this.nPopContainer.on("click", ".js-ok", $.proxy(this.onOKClicked, this)), this.nPopContainer.on("click", ".js-cancel", $.proxy(this.onCancelClicked, this))
				},
				_doShow: function() {
					this.boxCss = {
						"border-radius": "4px",
						background: "white",
						width: this.width || "270px",
						padding: "15px"
					}, this.nPopContainer.css(this.boxCss).addClass("popout-box"), this._super()
				},
				_doHide: function(t) {
					this._super()
				},
				onOKClicked: function(t) {
					this._onOKClicked(t), !this.preventHideOnOkClicked && this.hide()
				},
				onCancelClicked: function(t) {
					this._onCancelClicked(t), this.hide()
				}
			});
		return i
	}), define("text!wap/components/pop_alert/box.html", [], function() {
		return '<div class="alert-content" style="line-height: 120%;">\n	<%= data.box_content %>\n</div>\n<hr style="margin: 10px 0 11px;">\n<p class="js-ok confirm center c-green">\n	<%= data.box_confirm %>\n</p>'
	}), window.zenjs = window.zenjs || {},
	function(t) {
		var e = function() {
				var t = {
						"&": "&amp;",
						"<": "&lt;",
						">": "&gt;",
						'"': "&quot;",
						"'": "&#x27;"
					},
					e = ["&", "<", ">", '"', "'"],
					i = new RegExp("[" + e.join("") + "]", "g");
				return function(e) {
					return null == e ? "" : ("" + e).replace(i, function(e) {
						return t[e]
					})
				}
			}(),
			i = {
				evaluate: /<%([\s\S]+?)%>/g,
				interpolate: /<%=([\s\S]+?)%>/g,
				escape: /<%-([\s\S]+?)%>/g
			},
			n = /(.)^/,
			s = {
				"'": "'",
				"\\": "\\",
				"\r": "r",
				"\n": "n",
				"	": "t",
				"\u2028": "u2028",
				"\u2029": "u2029"
			},
			o = /\\|'|\r|\n|\t|\u2028|\u2029/g,
			a = function(t, a, r) {
				var d;
				r = $.extend({}, i, r);
				var l = new RegExp([(r.escape || n).source, (r.interpolate || n).source, (r.evaluate || n).source].join("|") + "|$", "g"),
					c = 0,
					h = "__p+='";
				t.replace(l, function(e, i, n, a, r) {
					return h += t.slice(c, r).replace(o, function(t) {
						return "\\" + s[t]
					}), i && (h += "'+\n((__t=(" + i + "))==null?'':escapeFunc(__t))+\n'"), n && (h += "'+\n((__t=(" + n + "))==null?'':__t)+\n'"), a && (h += "';\n" + a + "\n__p+='"), c = r + e.length, e
				}), h += "';\n", r.variable || (h = "with(obj||{}){\n" + h + "}\n"), h = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + h + "return __p;\n";
				try {
					d = new Function(r.variable || "obj", "escapeFunc", h)
				} catch (p) {
					throw p.source = h, p
				}
				if (a) return d(a, e);
				var u = function(t) {
					return d.call(this, t, e)
				};
				return u.source = "function(" + (r.variable || "obj") + "){\n" + h + "}", u
			};
		return window.zenjs.template = a
	}(window.zenjs), define("zenjs/util/template", function() {}), define("wap/components/pop_alert/popout_alert", ["wap/components/popout_box", "text!wap/components/pop_alert/box.html", "zenjs/util/template"], function(t, e) {
		var i = window.zenjs.template(e),
			n = t.extend({
				init: function(t) {
					this._super(t), this.isCanNotHide = !0, this.box_content = t.content || "", this.box_confirm = t.confirmText || "我知道了"
				},
				render: function(t) {
					return this.html || (this.html = i({
						data: {
							box_content: this.box_content,
							box_confirm: this.box_confirm
						}
					})), this._super(t), this.nPopContainer.addClass("popout-alert"), this
				},
				_doShow: function() {
					this._super()
				},
				_doHide: function(t) {
					this._super()
				}
			}),
			s = null;
		return {
			show: function(t, e) {
				e = e || {}, s && this.hide(), e.content = t, s = new n(e).render().show()
			},
			hide: function() {
				s && (s.hide(), s = null)
			}
		}
	}), define("wap/showcase/goods/views/store_info", ["wap/components/pop_alert/popout_alert"], function(t) {
		return Backbone.View.extend({
			initialize: function(t) {},
			events: {
				"click .js-rz-item-alert": "rz_alert"
			},
			render: function(t) {
				return this
			},
			rz_alert: function() {
				var e = {
					is_secured_transactions: "该笔订单享受有赞提供的全程消费保障，请放心购买",
					team_certificate_person: "该店铺已通过有赞个人认证，请放心购买",
					team_certificate_company: "该店铺已通过有赞企业认证，请放心购买"
				};
				return function(i) {
					var n = $(i.target);
					n.hasClass("js-rz-item-alert") || (n = n.parents(".js-rz-item-alert"));
					var s = n.data("type"),
						o = e[s] || "";
					o && t.show(o)
				}
			}()
		})
	}), window.zenjs = window.zenjs || {},
	function(t) {
		t.Event = {
			getTargetByDataKey: function(t, e) {
				for (var i = $(t.target); !i.data(e) && "BODY" != (i[0] || {}).nodeName;) i = i.parent();
				return i
			},
			getEventHandler: function() {
				var e = function() {};
				return $.extend(!0, e.prototype, t.Event.methods), new e
			},
			methods: {
				events: {},
				on: function(t, e) {
					return "string" != typeof t || "[object Function]" !== Object.prototype.toString.call(e) ? !1 : (this.events[t] || (this.events[t] = []), this.events[t].push(e))
				},
				trigger: function(t) {
					if ("string" != typeof t) return !1;
					if (!this.events[t]) return this.events[t] = [], !1;
					for (var e = this.events[t], i = Array.prototype.slice.apply(arguments, [1]), n = 0, s = e.length; s > n; n++) e[n](i)
				},
				off: function(t, e) {
					if (!t && !e) return void(this.events = {});
					if (!e) return void(this.events[t] = []);
					var i = this.events[t],
						n = i.indexOf(e);
					i.splice(n, 1)
				}
			}
		}
	}(window.zenjs), define("zenjs/util/event", function() {}), define("zenjs/backbone/tabber", ["zenjs/util/event", "backbone"], function(t, e) {
		var i = window.zenjs.Event,
			n = function() {},
			s = e.View.extend({
				initialize: function(t) {
					this.activeKey = t.activeKey || "type", this.activeClass = t.activeClass || "active", this.cbOnClicked = t.onClicked || n, this.cbOnDisabledClicked = t.onDisabledClicked || n, this.initDefault(t)
				},
				events: {
					click: "onClicked"
				},
				initDefault: function(t) {
					t.defaultData && t.defaultData.length > 0 && this.active(t.defaultData)
				},
				onClicked: function(t) {
					if (t.target && 0 !== t.target.length) {
						var e = i.getTargetByDataKey(t, this.activeKey),
							n = "" + e.data(this.activeKey);
						if (e.blur(), n && "undefined" !== n && this.activeData !== n && n && n.length > 0) {
							if (this.disabled === !0) return void(this.activeData !== n && this.cbOnDisabledClicked());
							this.$("." + this.activeClass).removeClass(this.activeClass), e.addClass(this.activeClass), this.activeData = n, this.cbOnClicked(_.extend(t || {}, {
								value: n,
								nTarget: e
							}))
						}
					}
				},
				active: function(t, e) {
					this.onClicked(_.extend({
						target: this.$el.find("[data-" + this.activeKey + '="' + t + '"]:first')
					}, e || {}))
				},
				setDisable: function(t) {
					this.disabled = t
				},
				setData: function(t) {
					this.activeData = t, this.$("." + this.activeClass).removeClass(this.activeClass), this.$el.find("[data-" + this.activeKey + '="' + this.activeData + '"]:first').addClass(this.activeClass)
				},
				getData: function() {
					return this.activeData
				}
			});
		return s
	}), define("wap/components/waterfall/pager", ["zenjs/class"], function(t) {
		var e = function() {};
		return t.extend({
			init: function(t) {
				this.$el || (this.$el = $(t.el || t.$el || "<div></div>"), this.el = this.$el[0]), "number" == typeof t.total && (this.total = t.total), this.offset = t.offset || 300, this.scrollDirection = "down", this.pageIndex = t.pageIndex || 0, this.idName = t.idName || "id", t.idValue && (this.idValue = t.idValue), this.getExtrPostData = t.getExtrPostData || e, this.checkSize = !0, "boolean" == typeof t.checkSize && (this.checkSize = t.checkSize), this.perPage = t.perPage || 10, this.jsonKeys = t.jsonKeys || {}, this.finishedHTML = t.finishedHTML, this.finishedText = t.finishedText, this.postData = t.postData || {}, this.onPagerFinished = t.onFinished || e, this.nLoading = t.loadingHTML ? $(t.loadingHTML).addClass("loading-more") : $('<div class="loading-more"><span></span></div>'), this.nList = this.$el.find(".js-list"), 0 === this.nList.length && (this.nList = $('<div class="js-list b-list"></div>'), this.$el.append(this.nList)), this.listEl = this.nList, this.onFetchError = t.onFetchError || e, this.onListEmpty = this.onListEmpty || t.onEmpty || this._onListEmpty, this.on("finished", this.onPagerFinished), this.scrollContainer = $(t.scrollContainer ? t.scrollContainer : "body"), this.scrollEventAccepter = $(t.scrollEventAccepter ? t.scrollEventAccepter : t.scrollContainer || window), this._onScroll = $.proxy(this.onScroll, this), this.scrollEventAccepter.on("scroll", this._onScroll)
			},
			onScroll: function() {
				parseInt($(window).height());
				return function() {
					if (!(this.sleeping || this.finished || this.fetching)) {
						if (0 == this.total || this.total && this.total <= this.pageIndex * this.perPage) return void this.doFinishLoading();
						"down" == this.scrollDirection && this.nList.height() - this.scrollEventAccepter.height() - this.scrollContainer.scrollTop() < this.offset && this.fetchMore && this.fetchMore(), "up" == this.scrollDirection && this.scrollContainer.scrollTop() < this.offset && this.fetchMore && this.fetchMore()
					}
				}
			}(),
			fetchMore: function() {
				return this.sleeping || this.finished || this.fetching ? this : (this.showLoading(), this.fetching = !0, this._fetchMore && this._fetchMore.call(this), this)
			},
			onFetchMoreSuccess: function() {
				this.hideLoading(), this.fetching = !1, this._onFetchMoreSuccess.apply(this, arguments)
			},
			fetchRender: function() {
				return this._setupListeners && this._setupListeners(), this.fetchMore(), this
			},
			_onFetchMoreError: function() {
				this.fetching = !1, this.hideLoading(), this.onFetchError()
			},
			doFinishLoading: function(t) {
				this.finished = !0, this.fetching = !1, this.hideLoading(), this.$el.find(".list-finished").remove(), this.triggerMethod && this.triggerMethod("finished", this.collection, t)
			},
			doSleep: function() {
				this.sleeping = !0
			},
			doWake: function() {
				this.sleeping = !1, this.fetchMore()
			},
			showLoading: function() {
				this.hasFetching = !0, this.$el.append(this.nLoading)
			},
			hideLoading: function() {
				this.nLoading.remove()
			},
			getFinishHtml: function() {
				var t;
				return t = this.finishedHTML ? $(this.finishedHTML).addClass("list-finished") : '<div class="list-finished">' + (this.finishedText || "已经没有更多了") + "</div>"
			},
			resetWaterfall: function() {
				this.removeAll && this.removeAll(), this.nList.empty(), this.collection && this.collection.reset([], {
					silent: !0
				}), this.listEl.empty(), this.finished = !1, this.pageIndex = 0, this.idValue = void 0
			},
			_onListEmpty: function() {
				if (!this.fetching) {
					var t;
					this.emptyHTML ? t = $(this.emptyHTML).addClass("list-finished") : this.emptyText && (t = '<div class="list-finished">' + this.emptyText + "</div>"), this.$el.append(t)
				}
			},
			destroy: function() {
				this.doSleep(), this.scrollEventAccepter.unbind("scroll", this._onScroll)
			}
		})
	}), define("wap/components/waterfall/waterfall_html", ["wap/components/waterfall/pager", "zenjs/events"], function(t, e) {
		var i = function() {},
			n = e.extend(t.prototype).extend({
				init: function(t) {
					this.$el && this.$el.find(".list-finished") && this.$el.find(".list-finished").length > 0 || (this._super(t), "undefined" != typeof t.pageIndex ? this.pageIndex = +t.pageIndex : this.pageIndex = 1, this.url = t.url || "", this.ajaxType = t.ajaxType || "GET", this.dataType = t.dataType || "json", this.onAfterListLoad = t.onAfterListLoad || t.onDataLoad || i, this.emptyHTML = t.emptyHTML || "", this.emptyText = t.emptyText || "", this.on("finished", this._doFinishLoading), this.extraData = {}, this.onScroll())
				},
				_fetchMore: function() {
					var t = this,
						e = {};
					this.perPage && (e[this.jsonKeys.perPage || "perpage"] = this.perPage), this.idValue ? e[this.idName] = this.idValue : e[this.jsonKeys.pageIndex || "page"] = this.pageIndex + 1;
					var i = this.getExtrPostData ? this.getExtrPostData() : {};
					$.ajax({
						url: t.url,
						type: t.ajaxType,
						dataType: t.dataType,
						data: $.extend({}, t.postData, e, i, t.extraData),
						timeout: 5e3,
						success: function(e) {
							t.pageIndex++, 0 == e.code ? t.onFetchMoreSuccess({}, e || {}) : t.doFinishLoading(e)
						},
						error: function(e, i, n) {
							t._onFetchMoreError()
						}
					})
				},
				setExtraData: function(t) {
					$.extend(this.extraData, t)
				},
				_onFetchMoreSuccess: function(t, e) {
					var i = (e || {}).data || {};
					return i[this.idName] && (this.idValue = i[this.idName]), this.onAfterListLoad(i.html || "", e), i.html ? void this.onScroll() : (this.pageIndex--, void this.doFinishLoading(e))
				},
				_doFinishLoading: function() {
					if (0 == this.pageIndex && this.triggerMethod("list:empty"), this.hasFetching && this.pageIndex > 2) {
						var t = this.getFinishHtml();
						this.$el.append(t)
					}
				}
			});
		return n
	}), define("zenjs/backbone/base_view", ["zenjs/core/trigger_method"], function(t) {
		return Backbone.View.extend({
			clean: function() {
				return this.stopListening(), this
			},
			triggerMethod: t
		})
	}), define("zenjs/list/list", ["zenjs/backbone/base_view"], function(t) {
		var e = function() {};
		return t.extend({
			initialize: function(t) {
				return this.options = t = t || {}, this.items = [], this.itemView = t.itemView, this.itemOptions = t.itemOptions || {}, this.collection = t.collection, this.onAfterListChange = t.onAfterListChange || e, this.onAfterListLoad = t.onAfterListLoad || e, this.onAfterListDisplay = t.onAfterListDisplay || e, this.onListEmpty = t.onListEmpty || t.onEmptyList || this._onListEmpty, this.onItemClick = t.onItemClick || e, this.onViewItemAdded = t.onViewItemAdded || e, this.displaySize = t.displaySize || -1, this.emptyHTML = t.emptyHTML || "", this.emptyText = t.emptyText || "列表为空", this
			},
			render: function(t) {
				return this.displaySize = -1 == (t || {}).displaySize ? -1 : this.displaySize, this.clean(), this._setupListeners(), this.addAll(), this.onAfterListDisplay({
					list: this.collection
				}), this
			},
			fetchRender: function(t) {
				return this.collection.fetch({
					data: t,
					success: _(function(t, e) {
						this.render(), this.onAfterListLoad(this.collection, e), this.onFetchSuccess && this.onFetchSuccess()
					}).bind(this)
				}), this
			},
			_setupListeners: function() {
				this.collection && (this.stopListening(this.collection), this.listenTo(this.collection, "add", this.addItem, this), this.listenTo(this.collection, "reset sort", this.render, this), this.listenTo(this.collection, "remove", this.onItemRemoved, this))
			},
			addItemListeners: function(t) {
				var e = this;
				this.listenTo(t, "all", function() {
					var e = "item:" + arguments[0],
						i = _.toArray(arguments);
					i.splice(0, 1), i.unshift(e, t), this.trigger.apply(this, i), "item:click" == e && this.onItemClick()
				}), this.listenTo(t.model, "change", function() {
					e.onAfterListChange({
						list: this.collection
					})
				})
			},
			addAll: function() {
				0 === this.collection.length ? this.fetching || this.triggerMethod("list:empty") : this.collection.each(function(t) {
					this.addItem(t)
				}, this)
			},
			removeAll: function() {
				for (var t = this.items.length - 1; t >= 0; t--) this.removeView(this.items[t]);
				this.onAfterListChange({
					list: this.collection
				})
			},
			addItem: function(t) {
				if (!(this.displaySize >= 0 && this.items.length >= this.displaySize)) {
					1 == this.collection.length && (this.listEl || this.$el).html("");
					var e = new this.itemView(_.extend({}, this.options.itemOptions, {
						model: t,
						index: this.collection.indexOf(t)
					}));
					return this.items.push(e), this.addItemListeners(e), e.render(), this.onViewItemAdded({
						list: this.items,
						viewItem: e
					}), (this.listEl || this.$el).append(e.el), e
				}
			},
			removeItem: function(t) {
				var e = this.getViewByModel(t);
				e && this.removeView(e)
			},
			removeView: function(t) {
				var e;
				this.stopListening(t), t && (this.stopListening(t.model), t.remove(), e = this.items.indexOf(t), this.items.splice(e, 1)), 0 === this.collection.length && (this.fetching || this.triggerMethod("list:empty"))
			},
			onItemRemoved: function(t) {
				this.onAfterListChange({
					list: this.collection,
					action: "remove",
					model: t
				}), this.removeItem(t)
			},
			getViewByModel: function(t) {
				return _.find(this.items, function(e, i) {
					return e.model === t
				})
			},
			dispatchEventToAllViews: function(t, e) {
				for (var i = this.items.length - 1; i >= 0; i--) this.items[i].trigger(t, e)
			},
			remove: function() {
				t.prototype.remove.call(this, arguments), this.removeAll(), this.collection.reset(), delete this.collection
			},
			clean: function() {
				t.prototype.clean.call(this, arguments), this.removeAll(), (this.listEl || this.$el).html(""), this.stopListening(this.collection)
			},
			_onListEmpty: function() {
				this.$el.html(this.emptyHTML || (this.emptyText ? '<p style="text-align:center;line-height:60px;">' + this.emptyText + "</p>" : ""))
			}
		})
	}), define("wap/components/waterfall/waterfall", ["wap/components/waterfall/pager", "zenjs/list/list"], function(t, e) {
		delete t.prototype.constructor;
		var i = e.extend(t.prototype),
			n = i.extend({
				initialize: function(t) {
					e.prototype.initialize.apply(this, [t]), i.prototype.init.apply(this, [t]), this.extraData = {}, this.on("finished", this._doFinishLoading)
				},
				_fetchMore: function() {
					var t = {};
					this.idValue && (t[this.idName] = this.idValue), t[this.jsonKeys.perPage || "perpage"] = this.perPage, t[this.jsonKeys.pageIndex || "page"] = this.pageIndex + 1;
					var e = this.getExtrPostData ? this.getExtrPostData() : {};
					this.collection.fetch({
						data: $.extend(t, this.postData, e, this.extraData),
						success: $.proxy(this.onFetchMoreSuccess, this),
						error: $.proxy(this.onFetchError, this),
						update: !0,
						remove: !1
					})
				},
				setExtraData: function(t) {
					$.extend(this.extraData, t)
				},
				_onFetchMoreSuccess: function(t, e) {
					this.pageIndex++, this.triggerMethod("after:list:load", {
						collection: t,
						response: e
					});
					var i = this.collection.parse(e);
					if (0 == i.length || this.checkSize && i.length < this.perPage) return void this.doFinishLoading();
					var n = _.last(this.collection.models);
					n && (this.idValue = n.get(this.idName)), this.onScroll()
				},
				_onAfterListLoad: function() {
					var t = _.last(this.collection.models);
					t && (this.idValue = t.get(this.idName))
				},
				_doFinishLoading: function() {
					if (this.collection.length > 0) {
						if (this.hasFetching && this.pageIndex > 1) {
							var t = this.getFinishHtml();
							this.$el.append(t)
						}
					} else this.triggerMethod("list:empty")
				}
			});
		return n
	}), define("wap/components/waterfall/collections/collection", ["require", "exports", "module"], function(t, e, i) {
		i.exports = Backbone.Collection.extend({
			parse: function(t) {
				var e = (t || {}).data || {},
					i = e.list || [];
				return this.total = parseInt(e.total || e.count), i
			}
		})
	}), define("text!wap/showcase/goods/templates/review_avatar.html", [], function() {
		return '<p class="review-num font-size-12">已有<%= sold_num %>人购买</p>\n<div class="profiles clearfix">\n    <% \n        var avatarItem;\n        for( var index in avatar ){ \n    %>\n        <% avatarItem = avatar[index]; %>\n        <% if( avatarItem.fans_picture ){ %>\n            <% \n                var pic = avatarItem.fans_picture; \n                pic = pic.replace(/\\/\\d+$/g, \'/64\');\n            %>\n            <img src="<%= pic %>" class="image-circle">\n        <% }else{ %>\n            <span class="name-circle font-size-18"><%= (avatarItem.user_name || \'\')[0] || \'\' %></span>\n        <% } %>\n    <% } %>\n</div>'
	}), define("wap/showcase/goods/views/reviews", ["zenjs/backbone/tabber", "wap/components/waterfall/waterfall_html", "text!wap/showcase/goods/templates/review_avatar.html"], function(t, e, i) {
		return Backbone.View.extend({
			initialize: function(t) {
				this.nTabberContent = this.$(".js-review-tabber-content"), this.nPinjianReportContainer = this.$(".js-review-report-container"), this.waterfallMap = {}, this.isShowRecord = t.isShowRecord || !1, this.totalMap = {}, this.isRateNumUpdated = !1, this.isAvatarUpdated = !1
			},
			render: function(e) {
				return e = e || {}, this.isShowRecord || this.$(".js-review-avatar-container").remove(), e.fastReview ? ($.ajax({
					url: "/v2/showcase/goods/review.json",
					type: "GET",
					dataType: "json",
					data: {
						alias: window._global.alias,
						page_size: 2,
						pinjian_report: 1
					},
					success: _(function(t) {
						if (0 == t.code) {
							var e = t.data || {},
								i = window._global.url.wap + "/showcase/goodsfast?alias=" + _global.alias + "&detail_type=reviews";
							if (this.$el.html(""), !e.report_html && !e.html) return void this.$el.remove();
							this.$el.append(e.report_html || ""), this.$el.append(e.html || "").find(".js-review-item").attr("href", i), e.count > 2 && this.$el.append('<a href="' + i + '" class="block-item font-size-14 center">查看更多评价</a>'), this.initImgPreview(this.$el)
						}
					}).bind(this)
				}), this) : (this.tabber = new t({
					el: this.$(".js-review-tabber"),
					activeClass: "active",
					activeKey: "reviewtype",
					defaultData: "all",
					onClicked: _(this.onTabberClicked).bind(this)
				}), this)
			},
			onTabberClicked: function(t) {
				var i = {
						all: "评论",
						good: "好评",
						middle: "中评",
						bad: "差评"
					},
					n = t.value,
					s = this.nTabberContent.find(".js-review-part[data-reviewtype=" + n + "]");
				if (this.nTabberContent.find(".js-review-part").addClass("hide"), s.removeClass("hide"), "all" !== n ? this.nPinjianReportContainer.addClass("hide") : this.isPinjianReportLoaded && this.nPinjianReportContainer.removeClass("hide"), this.doSleep(), this.doWake(n), !this.waterfallMap[n]) {
					var o = $(t.target),
						a = o.data("rate"),
						r = this.getExternalData(),
						d = "number" == typeof this.totalMap[a] ? this.totalMap[a] : 1e3,
						l = $.extend({
							alias: window._global.alias,
							rate: a
						}, r);
					this.waterfallMap[n] = new e({
						el: s,
						pageIndex: 0,
						perPage: 10,
						total: d,
						url: "/v2/showcase/goods/review.json",
						postData: l,
						jsonKeys: {
							perPage: "page_size"
						},
						emptyText: "暂无" + i[n],
						onAfterListLoad: _(function(t, e) {
							var i = e.data || {};
							i.report_html && (this.nPinjianReportContainer.removeClass("hide").append(i.report_html), this.isPinjianReportLoaded = !0), this.reportFetched = !0, l.pinjian_report = 0, s.append(t), i.with_rate_num && (this.updateRateNum(i.with_rate_num), l.with_rate_num = 0), i.with_avatar && (this.updateAvatar(i.with_avatar), l.with_avatar = 0), this.initImgPreview(s)
						}).bind(this)
					})
				}
			},
			doWake: function(t) {
				t && this.waterfallMap[t] && this.waterfallMap[t].doWake()
			},
			doSleep: function() {
				_.each(this.waterfallMap, function(t, e) {
					t.doSleep()
				})
			},
			updateRateNum: function(t) {
				this.isRateNumUpdated || (this.$(".js-rate-good").text("好评(" + t[30] + ")"), this.$(".js-rate-middle").text("中评(" + t[20] + ")"), this.$(".js-rate-bad").text("差评(" + t[10] + ")"), this.totalMap = {
					10: t[10],
					20: t[20],
					30: t[30],
					0: t[10] + t[20] + t[30]
				}, this.isRateNumUpdated = !0)
			},
			updateAvatar: function(t) {
				this.isAvatarUpdated || (this.$(".js-review-avatar").html(_.template(i)({
					sold_num: t.sold_num,
					avatar: t.avatar
				})), this.isAvatarUpdated = !0)
			},
			getExternalData: function() {
				var t = $(window).width(),
					e = function() {
						return 375 > t ? 24 : 414 > t ? 30 : 33
					};
				return function() {
					var t = {};
					return !this.isAvatarUpdated && this.isShowRecord && (t.with_avatar = e()), this.isRateNumUpdated || (t.with_rate_num = 1), this.reportFetched || (t.pinjian_report = 1, t.display_pj_link = 1, t.report_size = 3), t
				}
			}(),
			initImgPreview: function(t) {}
		})
	}), define("text!wap/showcase/goods/templates/trade_record.html", [], function() {
		return '<span class="col-1 c-gray-darker"><%= data.nickname %></span>\n<span class="col-2 c-gray-dark center"><%= data.update_time %></span>\n<span class="col-3 c-gray-darker center"><%= data.item_num %></span>\n'
	}), define("wap/showcase/goods/views/trade_record_item", ["text!wap/showcase/goods/templates/trade_record.html"], function(t) {
		return Backbone.View.extend({
			template: _.template(t),
			className: "block-item",
			render: function() {
				this.$el.html(this.template({
					data: this.model.toJSON()
				}))
			}
		})
	}), define("wap/showcase/goods/views/goods_detail", ["zenjs/backbone/tabber", "zenjs/util/args", "wap/components/waterfall/waterfall_html", "wap/components/waterfall/waterfall", "wap/components/waterfall/collections/collection", "wap/showcase/goods/views/reviews", "wap/showcase/goods/views/trade_record_item"], function(t, e, i, n, s, o, a) {
		var r = window._global,
			d = function() {};
		return Backbone.View.extend({
			initialize: function(t) {
				this.tradeRecordWaterfall = null, this.ReviewsView = t.ReviewsView || o, this.asyncs = t.asyncs, this.onAfterDetailLoad = t.onAfterDetailLoad || d, this.goods_type = t.goods_type || "goods";
				var e = t.sold_num || 0;
				this.isShowRecord = t.buy_record && e > 0, this.isShowReview = t.customer_reviews && e > 0, (this.isShowRecord || this.isShowReview) && (this.isShowTabber = !0)
			},
			render: function() {
				var t = this;
				return this.asyncs.goods_detail ? (window.queryBatch && window.queryBatch({
					key: "goods_detail",
					url: "/v2/showcase/goods/goodsDetail.json?alias=" + window._global.alias,
					para: {
						goods_type: this.goods_type
					},
					type: "POST",
					handler: _(function(e) {
						var i = e.data || {},
							n = i.html,
							s = i.js_config || [],
							a = $(n);
						t.$el.append(a), t.nTabberContainer = t.$(".js-tabber-container"), t.nTabber = t.$(".js-tabber"), t.nTabberContent = t.$(".js-tabber-content"), t.initGoodsDetailTabber(), $ && $.fn && $.fn.lazyload && (a.find(".js-lazy").lazyload(), a.find(".js-goods-lazy").goodsLazyLoad()), window.initSwiper && window.initSwiper(t.$el), window.init_custom_notice && window.init_custom_notice(t.$el);
						var r, d = [];
						_.each(s, function(t) {
							t && (r = document.createElement("script"), r.type = "text/javascript", r.charset = "utf-8", r.async = !0, r.src = t, d.push(r))
						}), t.$el.append(d), window.imagePreview && window.imagePreview.init(), "1" == i.tpl_style && "auction" != t.goods_type && t.isShowReview && (t.reviewsView = new o({
							el: t.$(".js-trade-review-list"),
							isShowRecord: t.isShowRecord
						}).render({
							fastReview: !0
						})), t.onAfterDetailLoad(i)
					}).bind(this)
				}), this) : (t.nTabberContainer = t.$(".js-tabber-container"), t.nTabber = t.$(".js-tabber"), t.nTabberContent = t.$(".js-tabber-content"), this.initGoodsDetailTabber(), window.imagePreview && window.imagePreview.init(), this)
			},
			initGoodsDetailTabber: function() {
				if (!this.isShowTabber || !this.asyncs.tabber) return this.nTabberContent.find(".js-part").removeClass("hide"), this;
				var e = window.zenjs.Args.get("detail_type") || "goods";
				this.tabber = new t({
					el: this.nTabber,
					activeClass: "active",
					activeKey: "type",
					defaultData: e,
					onClicked: _(this.onTabberClicked).bind(this)
				})
			},
			onTabberClicked: function() {
				var t, e = {
					sales: function() {
						this.tradeRecordWaterfall ? this.tradeRecordWaterfall.doWake() : (this.tradeRecordWaterfall = new n({
							el: $(".js-traderecord-list"),
							collection: new s([], {
								url: "/v2/trade/order/orderitemlist.json?alias=" + r.alias
							}),
							itemView: a,
							emptyText: "最近暂无成交"
						}).fetchRender(), this.tradeRecordWaterfall.on("list:empty", _(function() {
							this.tradeRecordWaterfall.$el.addClass("empty").find(".js-list").remove()
						}).bind(this))), t = this.tradeRecordWaterfall
					},
					reviews: function() {
						this.reviewsView ? this.reviewsView.doWake() : this.reviewsView = new this.ReviewsView({
							el: this.$(".js-trade-review-list"),
							isShowRecord: this.isShowRecord
						}).render(), t = this.reviewsView
					},
					pinjian_reviews: function() {
						this.pjReviewsView ? this.pjReviewsView.doWake() : this.pjReviewsView = new i({
							el: $(".js-trade-review-list"),
							url: "/v2/showcase_pinjian/item/reportsByItemId.jsonp",
							dataType: "jsonp",
							postData: {
								item_id: window.zenjs.Args.get("item_id")
							},
							pageIndex: 0,
							perPage: 10,
							emptyText: "还没有品鉴报告",
							onAfterListLoad: function(t, e) {
								this.$el.append(t)
							}
						}), t = this.pjReviewsView
					}
				};
				return function(i) {
					var n = i.value,
						s = this.nTabberContent.find(".js-part[data-type=" + n + "]");
					this.nTabberContent.find(".js-part").addClass("hide"), t && t.doSleep(), s.removeClass("hide"), this.activeContent = s, (e[n] || d).call(this)
				}
			}()
		})
	}), define("text!wap/showcase/goods/templates/cashback_rule.html", [], function() {
		return '<form class="form-dialog">\n    <div class="header">\n        <h2> <span>促销详情</span> </h2>\n    </div>\n    <fieldset class="field-info" style="line-height: 120%;">\n        <% if(cashBack && cashBack.replace(/(^\\s*)|(\\s*$)/g, "")){ %>\n        <p class="font-size-12"><span class="c-red">【订单返现】</span><span><%= cashBack %></span>返现；</p>\n        <div class="turn-rule-step">\n            <p class="font-size-12 c-gray-dark reset-p-margin">1、通过【微信支付】付款，返现金额将通过 【微信退款】发放，请注意查收；</p>\n            <p class="font-size-12 c-gray-dark reset-p-margin">2、通过【银行卡】付款，返现金额将在3天内，原路发放至银行卡账户；</p>\n        </div>\n        <hr>\n        <% } %>\n        <% if(meetReduce && meetReduce.replace(/(^\\s*)|(\\s*$)/g, "")){ %>\n        <p class="font-size-12">\n            <span class="block-icon btn btn-red font-size-14">满减/赠/包邮</span>单笔订单金额<%= meetReduce %>\n        </p>\n        <% } %>\n    </fieldset>\n    <div class="action-container">\n        <button type="button" class="js-ok btn btn-green btn-block">我知道了</button>\n    </div>\n</form>\n\n'
	}), define("text!wap/showcase/goods/templates/discountCount.html", [], function() {
		return '<%\n	var day = +data.day;\n	var hour = day * 24 + (+data.hour)\n%>\n<em class="c-red js-hour"><%- hour %></em> 小时 \n<em class="c-red js-min"><%- (+data.min) %></em> 分 \n<em class="c-red js-sec"><%- data.sec %></em> 秒'
	}), define("wap/showcase/goods/goods", ["wap/components/util/wx_info", "text!wap/showcase/goods/templates/goodsCount.html", "zenjs/util/count_down", "wap/components/popup", "wap/showcase/goods/views/present_sku", "wap/components/login_popout/main", "wap/components/popout_box", "wap/showcase/goods/views/store_info", "wap/showcase/goods/views/goods_detail", "text!wap/showcase/goods/templates/cashback_rule.html", "text!wap/showcase/goods/templates/discountCount.html"], function(t, e, i, n, s, o, a, r, d, l, c) {
		var h = window._global,
			p = Backbone.View.extend({
				el: "body",
				cashBackRuleTpl: _.template(l),
				events: {
					"click .js-add-cart": "onAddCartClicked",
					"click .js-buy-it": "onBuyItClicked",
					"click .js-add-gift": "onGiftClicked",
					"click .js-trade-reward": "onRewardArrowClicked",
					"click .js-add-wish": "onAddWishClicked",
					"click .js-add-wish-btn": "onAddWishClicked",
					"click .js-added-wish-btn": "onAddedWishClicked",
					"click .js-get-present": "onGetPresent",
					"click .js-promotion-rule": "onShowCashbackRule"
				},
				initialize: function(t) {
					var e = this;
					this.buyConfig = t.buyConfig;
					this.sku = h.sku;
					return this.goodsId = h.goods_id, this.activityAlias = h.activity_alias, this.fullPage = this.$(".wap-page-goods"), this.imageSwiper = this.$(".js-image-swiper"), this.taoInfo = this.$(".custom-go-tao"), this.returnBtn = this.$(".js-butn-return"), this.buyBtn = this.$(".js-buy-it"), this.confirmBtn = this.$(".js-confirm-it"), this.componentsContainer = this.$(".js-components-container"), this.bottomOpts = this.$(".js-bottom-opts"), this.buyGuide = this.$(".js-buy-guide"), this.nAddWish = this.$(".js-add-wish"), this.nAddWishBtn = this.$(".js-wish-btn"), this.nVipWishBtnGroup = this.$(".js-wish-btn-group"), this.asyncs = t.asyncMap || {}, this.storeInfoView = new r({
						el: this.$(".js-store-info")
					}).render(), this.goodsDetailView = new d({
						el: this.$(".js-detail-container"),
						sold_num: (h.sku || {}).sold_num,
						buy_record: h.buy_record,
						customer_reviews: h.customer_reviews,
						asyncs: this.asyncs
					}).render(), h.isWishOpen ? void(window.queryBatch && window.queryBatch({
						key: "goods_wish",
						url: "/v2/trade/wish/IsAdded.json?kdt_id=" + h.kdt_id || 0,
						type: "POST",
						para: {
							goods_ids: [this.goodsId]
						},
						handler: function(t) {
							var i = t.code,
								n = (t.data || {})[e.goodsId] || {};
							t.msg;
							0 == i && (e.nVipWishBtnGroup.length && (e.nVipWishBtnGroup.removeClass("hide"), n.isWishAdded && e.nAddWishBtn.addClass("js-added-wish-btn").removeClass("js-add-wish-btn").text("请TA来买单")), n.isWishOpen && e.nAddWish.removeClass("hide"), n.isWishAdded && e.nAddWish.addClass("wish-added"))
						}
					})) : this
				},
				initCountdown: function() {
					var t = this,
						n = $(".js-mini-counter"),
						s = $("#activity-77-tips"),
						o = "started" == s.data("status");
					if (n.length || o) {
						if (n.length) {
							var a = new i;
							a.run({
								seconds: n.data("countdown"),
								onTimeChange: function(t) {
									n.html(_.template(e)({
										data: t || {}
									}))
								},
								step: "second",
								onTimeChangeEnd: function() {
									t.$(".js-info-wrapper").hide(), t.$(".js-to-start").addClass("hide"), t.$(".js-normal-btns").removeClass("hide")
								}
							})
						}
						if (o) {
							var r = new i,
								d = s.find(".js-discount-time");
							r.run({
								seconds: d.data("countdown"),
								onTimeChange: function(t) {
									d.html(_.template(c)({
										data: t || {}
									}))
								},
								step: "second",
								onTimeChangeEnd: function() {
									s.hide()
								}
							})
						}
					}
				},
				buyAction: function(t) {
					if (this.buyConfig) {
						Utils.getWxInfo() || {};
						return this.buyConfig.isAdmin && !this.buyConfig.isMobile ? (motify.log("预览不支持进行购买，<br />实际效果请在手机上进行。", 0), !1) : this.buyConfig.no_fans_buy ? (setTimeout(function() {
							window.showGuide && window.showGuide("follow", {
								goods: !0
							})
						}, 400), !1) : void this.trigger(t)
					}
				},
				onRewardArrowClicked: function(t) {
					var e = this.$(".js-arrow-down");
					e.hasClass("arrow-down") ? (e.removeClass("arrow-down"), this.$(".js-trade-reward-info").addClass("hide-part-text")) : (e.addClass("arrow-down"), this.$(".js-trade-reward-info").removeClass("hide-part-text"))
				},
				onBuyItClicked: function(t) {
					return t.preventDefault(), t.stopPropagation(), $(t.target).prop("disabled") ? !1 : void this.buyAction("buy")
				},
				onAddCartClicked: function(t) {
					return t.preventDefault(), t.stopPropagation(), $(t.target).prop("disabled") ? !1 : void this.buyAction("addcart")
				},
				onAddWishClicked: function(t) {
					t.preventDefault(), t.stopPropagation();
					var e = this;
					this.nAddWish.hasClass("wish-added") ? ($.ajax({
						url: "/v2/trade/wish/list.json?kdt_id=" + h.kdt_id,
						type: "DELETE",
						dataType: "json",
						cache: !1,
						timeout: 15e3,
						data: {
							goods_id: this.goodsId
						},
						beforeSend: function() {
							e.isAjaxing = !0
						},
						success: function(t) {
							0 == t.code ? (e.nAddWish.removeClass("wish-added"), motify.log("取消成功"), e.nAddWishBtn.removeClass("js-added-wish-btn").addClass("js-add-wish-btn").text("我想要")) : motify.log(t.msg), e.isAjaxing = !1
						},
						error: function(t, i, n) {
							e.isAjaxing = !1
						}
					}), window.Logger && Logger.log({
						fm: "click",
						title: "add_wish"
					})) : this.buyAction("add-wish")
				},
				onAddedWishClicked: function() {
					window.location.href = h.url.trade + "/wxpay/wish?kdt_id=" + h.kdt_id
				},
				onGiftClicked: function(t) {
					t.preventDefault(), t.stopPropagation(), this.buyAction("gift")
				},
				onGetPresent: function(t) {
					t.preventDefault(), t.stopPropagation();
					var e = (h.sku || {}).messages || [],
						i = this;
					e.length ? new n({
						contentViewClass: s,
						className: "sku-layout sku-box-shadow",
						contentViewOptions: {
							messages: e,
							onGetPresentClicked: function(t) {
								i.getPresentToServer(t.postData)
							}
						}
					}).render().show() : this.getPresentToServer()
				},
				onShowCashbackRule: function() {
					var t = {
						cashBack: $("#cash-back-str").html().trim(),
						meetReduce: $("#meet-reduce-str").html().trim()
					};
					if (0 !== t.cashBack.length || 0 !== t.meetReduce.length) {
						var e = this.cashBackRuleTpl(t);
						new a({
							html: e,
							transparent: ".8"
						}).render().show()
					}
				},
				checkLogin: function(t, e) {
					if (h.need_ajax_login) {
						var i = new a({
							contentViewClass: o,
							contentViewOptions: {
								afterLogin: function(n) {
									h.need_ajax_login = !1, i.hide(), t(e)
								}
							}
						});
						return void i.render().show()
					}
					t(e)
				},
				getPresentToServer: function(t) {
					var e = function(t) {
						var e = window._global,
							i = e.url.wap + "/trade/order/generateUserPresentOrder.jsonp",
							n = e.present.alias;
						$.ajax({
							url: i,
							type: "GET",
							dataType: "jsonp",
							cache: !1,
							data: _.extend({}, t, {
								alias: n
							}),
							beforeSend: function() {
								motify.log("提交成功，跳转中…")
							},
							success: function(t) {
								var e = t.code;
								if (0 === e) {
									var i = t.data.trade_confirm_url;
									window.location.href = i
								} else motify.log(t.msg)
							},
							error: function(t) {
								motify.log("请求出错，请重试！")
							}
						})
					};
					return function(t) {
						this.checkLogin(e, t)
					}
				}(),
				scrollToTitle: function() {
					var t = $(".custom-go-tao").offset().top;
					setTimeout(function() {
						window.scrollTo(0, t)
					}, 10)
				},
				wishAdded: function() {
					this.nAddWish.addClass("wish-added"), this.nAddWishBtn.addClass("js-added-wish-btn").removeClass("js-add-wish-btn").text("请TA来买单")
				},
				render: function(t) {
					var e = this.$(".js-trade-reward"),
						i = this.$(".js-trade-reward-info"),
						n = e.width(),
						s = $.trim(i.text());
					return n < 75 + 11 * s.length && this.$(".js-arrow-down").removeClass("hide"), this.initCountdown(), this
				}
			});
		return p
	}), define("text!wap/showcase/goods/templates/recommend_goods.html", [], function() {
		return '<div class="js-recommend">\n	<p class="center font-size-14 c-black" style="padding: 5px 0;margin-top: 10px;">更多精选商品</p>\n\n	<div class="js-recommend-goods-list"></div>\n\n	<p class="center" style="margin: 10px 0 20px;">\n	    <a href="<%= window._global.url.wap %>/showcase/homepage?kdt_id=<%= window._global.kdt_id %>" class="center btn btn-white btn-xsmall font-size-14 " style="padding:8px 26px;">进店逛逛></a>\n	</p>\n</div>\n'
	}), require(["wap/showcase/goods/goods", "wap/components/popup", "text!wap/showcase/goods/templates/recommend_goods.html", "zenjs/events"], function(t, e, i, n) {
		var s = window.zenjs,
			o = (window.Logger, window._global),
			a = {
				goods: {
					goods_recommend: !0,
					tabber: !0,
					goods_detail: !0
				},
				fast_goods_detail: {
					tabber: !0
				}
			},
			r = Backbone.View.extend({
				initialize: function(e) {
					var i = this;
					this.buyConfig = {
						permissions: {
							wxPay: o.wxpay_env
						},
						isAdmin: o.is_owner_team,
						isMobile: o.is_mobile,
						team_certificate: o.team_certificate,
						no_fans_buy: o.no_fans_buy
					};
					var r = window._global.page_type || "goods";
					if (this.asyncs = a[r] || {}, this.goodsView = new t({
						el: $("body"),
						buyConfig: this.buyConfig,
						asyncMap: this.asyncs
					}).render(), window.eventHandler = window.eventHandler || new n, window.eventHandler.on("wish:add", function() {
						i.goodsView.wishAdded()
					}), this.listenTo(this.goodsView, "buy", this.buy), this.listenTo(this.goodsView, "addcart", this.addCart), this.listenTo(this.goodsView, "gift", this.gift), this.listenTo(this.goodsView, "add-wish", this.addWish), "true" != s.Args.get("showsku") || o.is_owner_team && !o.is_mobile || $(".js-bottom-opts button").prop("disabled") || i.buy(), "true" == s.Args.get("dal")) {
						var d = $("a,span");
						d.click(function(t) {
							return t.preventDefault(), t.stopPropagation(), !1
						}), d.css("-webkit-tap-highlight-color", "rgba(0, 0, 0, 0)")
					}
				},
				render: function() {
					return this.asyncs.goods_recommend ? ("wxd" == s.Args.get("kdtfrom") && window.queryBatch && window.queryBatch({
						key: "goods_recommend",
						url: "/v2/showcase/goods/recommendgoodslist.json",
						type: "GET",
						para: {
							alias: o.alias,
							count: 10,
							kdt_id: o.kdt_id
						},
						handler: function(t) {
							var e = t.code,
								n = t.data;
							if (0 === e) {
								var s = n.html || "";
								if (s) {
									var o = $(_.template(i)());
									o.find(".js-recommend-goods-list").append(s), o.find(".js-goods-list").css("visibility", "visible"), $(".content-body").append(o), $ && $.fn && $.fn.lazyload && o.find(".js-goods-lazy").goodsLazyLoad()
								}
							}
						}
					}), this) : this
				},
				gift: function() {
					this.displaySku({
						isAddCart: !1,
						isGift: !0
					})
				},
				goods: function() {
					this.popupView && this.popupView.hide()
				},
				wishAdded: function() {
					this.goodsView.wishAdded()
				},
				buy: function() {
					this.displaySku({
						isAddCart: !1,
						multiBtn: !1
					})
				},
				addCart: function() {
					this.displaySku({
						isAddCart: !0,
						multiBtn: !1
					})
				},
				addWish: function() {
					this.displaySku({
						isAddWish: !0,
						isAddCart: !1,
						multiBtn: !1
					})
				},
				displaySku: function(t) {
					var i = this;
					if (window.BuyView) {
						var n = o;
						this.popupView = new e({
							contentViewClass: window.BuyView,
							className: "sku-layout sku-box-shadow",
							onFinishHide: function() {
								t.isAddWish && window.eventHandler && window.eventHandler.trigger("wishScrollEnd")
							},
							contentViewOptions: {
								logURL: n.logURL,
								baseUrl: n.url.wap,
								need_ajax_login: n.need_ajax_login,
								wxpay_env: n.wxpay_env,
								isCartBtnHide: n.hide_shopping_cart
							}
						}).render({
							sku: n.sku,
							goods_info: o.goods_info,
							isAddCart: t.isAddCart,
							isAddWish: t.isAddWish,
							goods_id: n.goods_id,
							postage: n.postage,
							activity_alias: n.activity_alias,
							activity_id: n.activity_id,
							activity_type: n.activity_type,
							quota: n.quota,
							quota_used: n.quota_used,
							activity: o.activity,
							isGift: t.isGift,
							is_virtual: +o.is_virtual > 0
						}).show()
					} else setTimeout(function() {
						i.displaySku(t)
					}, 100)
				}
			});
		new r({
			el: $("body")
		}).render();
		var d = "";
		$("body").on("click", ".js-goto-luckymoney", function() {
			var t = function() {
				window.location.href = d
			};
			d ? t() : $.ajax({
				url: "/v2/fenxiao/77/hongbao.json",
				method: "get",
				data: {
					alias: o.teamAlias
				},
				success: function(e) {
					0 === e.code ? (d = e.data, t()) : window.motify.log("当前人数过多，领取失败，请重新领取")
				}
			})
		})
	}), define("main", function() {});