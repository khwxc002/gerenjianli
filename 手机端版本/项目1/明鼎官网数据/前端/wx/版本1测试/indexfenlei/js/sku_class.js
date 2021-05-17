define("zenjs/backbone/quantity", ["backbone", "zenjs/util/ua"], function(t, i) {
	var e = window.zenjs.UA,
		n = function() {},
		s = t.View.extend({
			template: _.template('<div class="quantity">            <button class="minus" type="button" <% if (data.readonly){ %> disabled <% } %> ></button>            <input type="text" class="txt" value="<%= data.num %>" <% if (data.readonly){ %> readonly <% } %>/>            <button class="plus" type="button" <% if (data.readonly){ %> disabled <% } %>></button>            <div class="response-area response-area-minus"></div>            <div class="response-area response-area-plus"></div>            <div class="txtCover"></div>        </div>'),
			initialize: function() {
				var t = function(t, i, e) {
					var n;
					return e > i ? (n = i, 0 !== i && (this.disabled = !0)) : n = e > t ? e : t > i ? i : t, n
				};
				return function(i) {
					this.onNumChange = i.onNumChange || n, this.onOverLimit = i.onOverLimit || n, this.limitNum = parseInt(i.limitNum), this.minimalNum = parseInt(i.minimalNum), this.minimalNum = 0 == this.minimalNum ? 0 : this.minimalNum || 1, this.onBelowLeast = i.onBelowLeast || n, this.disabled = i.disabled, this.num = t.call(this, i.num, this.limitNum, this.minimalNum), this.readonly = i.readonly, this.num != i.num && this.onNumChange(this.num)
				}
			}(),
			events: {
				"click .response-area-minus": "onSubClicked",
				"click .response-area-plus": "onAddClicked",
				"click .txtCover": "txtFocus",
				"blur .txt": "txtBlur"
			},
			txtFocus: function(t) {
				if (!this.disabled) {
					var i = this.$el.find(".txt");
					i.focus(), e && (e.isIOS() && e.getIOSVersion() < 8 && (i.blur(), i.focus()), $(t.target).css("display", "none"))
				}
			},
			txtBlur: function(t) {
				this.$el.find(".txtCover").css("display", "block"), this.refreshNum()
			},
			onSubClicked: function(t) {
				this.changeNum(this.num - 1)
			},
			onAddClicked: function() {
				this.changeNum(this.num + 1)
			},
			changeNum: function(t) {
				if (!this.readonly && !this.disabled) {
					if (t > this.limitNum) return void this.onOverLimit(t, this.limitNum);
					if (t < this.minimalNum) return this.onBelowLeast(t, this.minimalNum), void(t = this.minimalNum);
					this.updateBtnStatus(t), this.updateNum(t)
				}
			},
			updateBtnStatus: function() {
				var t = function(t) {
						t.addClass("disabled"), t.attr("disabled", "true")
					},
					i = function(t) {
						t.removeClass("disabled"), t.removeAttr("disabled")
					};
				return function(e) {
					return this.readonly ? (t(this.nMinus), void t(this.nPlus)) : (e > this.minimalNum ? i(this.nMinus) : t(this.nMinus), void(this.limitNum > 0 && e >= this.limitNum ? t(this.nPlus) : i(this.nPlus)))
				}
			}(),
			updateNum: function(t) {
				this.disabled || (this.num = +t, this.$("input").val(this.num), this.onNumChange(this.num))
			},
			refreshNum: function() {
				var t = parseInt(this.$("input").val());
				this.num !== t && (t > 0 ? this.limitNum > 0 && t > this.limitNum ? this.num = this.limitNum : this.num = t : (this.num = this.minimalNum, this.updateNum(this.num)), this.changeNum(this.num))
			},
			setLimitNum: function(t) {
				this.disabled || 1 > t || (this.limitNum = +t, this.limitNum < this.num && this.changeNum(this.limitNum))
			},
			setMinimalNum: function(t) {
				this.disabled || 1 > t || (this.minimalNum = +t, this.num < this.minimalNum && this.changeNum(this.minimalNum))
			},
			validateNum: function(t) {
				var i = parseInt(this.$("input").val());
				return this.$("input").val(i), i > this.limitNum || 0 === this.limitNum ? (this.onOverLimit(i, this.limitNum), !1) : i < this.minimalNum ? (this.onBelowLeast(i, this.minimalNum), !1) : !0
			},
			getNum: function() {
				return this.validateNum() ? (this.refreshNum(), this.num) : null
			},
			render: function() {
				return this.$el.html(this.template({
					data: {
						num: this.num,
						readonly: this.readonly
					}
				})), this.nMinus = this.$(".minus"), this.nPlus = this.$(".plus"), this.updateBtnStatus(this.num), this
			}
		});
	return s
}), define("zenjs/uploader/photo_uploader", [], function() {
	var t = function() {},
		i = function() {
			if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) return !1;
			var t = document.createElement("input");
			return t.type = "file", !t.disabled
		},
		e = Backbone.View.extend({
			initialize: function(i) {
				this.nInput = this.$("input"), this.nUploader = this.$("button"), this.onValidUpload = i.onValidUpload || function() {
					return !0
				}, this.onStartReadFile = i.onStartReadFile || t, this.onFinishReadFile = i.onFinishReadFile || t, this.onBeforeUpload = i.onBeforeUpload || t, this.onUploadSuccess = i.onUploadSuccess || t, this.onUploadError = i.onUploadError || t
			},
			events: {
				"click input": "onInputClicked",
				"change input": "onFileChanged"
			},
			render: function(t) {
				i() || this.nUploader.css("padding-left", "10px").html("您的浏览器不支持图片上传").attr("disabled", "disabled")
			},
			onInputClicked: function() {},
			onFileChanged: function(t) {
				var i = this,
					e = t.target.files;
				_.map(e, function(t, e, n) {
					if (i.onValidUpload({
						file: t
					})) {
						i.onStartReadFile({
							file: t
						});
						var s = new FileReader;
						s.onload = function(e) {
							i.onFinishReadFile({
								src: e.target.result,
								file: t
							})
						}, s.readAsDataURL(t), i.getUploadToken(t)
					}
				})
			},
			getUploadToken: function(t) {
				var i = this;
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
					success: function(e) {
						i.uptoken = e.data.uptoken, i.doUploadPhoto(t)
					},
					error: function(t, i, e) {},
					complete: function(t, i) {}
				})
			},
			doUploadPhoto: function(t) {
				var i = this,
					e = new FormData;
				e.append("token", this.uptoken), e.append("file", t);
				var n = t.name.split("."),
					s = "";
				n.length > 1 && (s = "." + n[n.length - 1]), e.append("x:ext", s), $.ajax({
					url: "http://up.qiniu.com",
					type: "post",
					data: e,
					dataType: "json",
					processData: !1,
					contentType: !1,
					beforeSend: function() {
						i.onBeforeUpload({
							file: t
						}), i.nInput.data("uploaded", "false")
					},
					success: function(e) {
						i.onUploadSuccess({
							url: e.data.attachment_full_url,
							file: t,
							data: e.data
						}), i.nInput.data("value", e.data.attachment_full_url), i.nInput.data("uploaded", "true")
					},
					error: function(e, n, s) {
						i.onUploadError({
							file: t
						})
					},
					complete: function(t, i) {}
				})
			}
		});
	return e
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
}), define("wap/showcase/sku/views/message", ["zenjs/uploader/photo_uploader", "wap/components/util/valid", "text!wap/showcase/sku/templates/message.html"], function(t, i, e) {
	var n = window.zenjs.UA,
		s = n && n.isIOS(),
		o = Backbone.View.extend({
			template: _.template(e),
			initialize: function(t) {
				this.messages = this.options.messages || []
			},
			events: {
				"click .txtCover": "txtFocus",
				"blur .txt,.txta": "txtBlur"
			},
			txtFocus: function(t) {
				var i = $(t.target),
					e = i.parent().find(".txt,.txta");
				e.focus(), s && n.getIOSVersion() < 8 && (e.blur(), e.focus()), i.parent().find(".txta").attr("rows", "2"), i.css("display", "none")
			},
			txtBlur: function(t) {
				var i = $(t.target);
				i.parent().find(".txtCover").css("display", "block"), i.hasClass("txta") && i.attr("rows", "1")
			},
			render: function() {
				this.$el.html(this.template({
					messages: this.messages,
					isIOS: s
				})), 0 === this.messages.length && this.$el.hide();
				var i = this.$(".photo-input");
				return this.photoUploaders = [], i.each(_(function(i, e) {
					var n = $(e).parent(),
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
				for (var i, e, n, s, o = this, a = this.messages, l = 0, r = a.length; r > l; l++)
					if (i = "message_" + l, e = t[i], n = a[l], _.isEmpty(e)) {
						if ("1" == n.required) return o.$el.find("#ipt-" + l).focus(), motify.log("image" == n.type ? "请上传 " + n.name + "。" : "请填写 " + n.name + "。"), !1
					} else {
						if ("image" == n.type && (s = o.$el.find("#ipt-" + l).data("uploaded"), "false" == s || !s)) return motify.log("图片还在上传中，请稍等。。"), !1;
						if ("tel" == n.type && !Utils.validNumber(e)) return o.$el.find("#ipt-" + l).focus(), motify.log("请填写正确的" + n.name + "。"), !1;
						if ("email" == n.type && !Utils.validEmail(e)) return o.$el.find("#ipt-" + l).focus(), motify.log("请填写正确的" + n.name + "。"), !1;
						if ("id_no" == n.type && (e.length < 15 || e.length > 18)) return o.$el.find("#ipt-" + l).focus(), motify.log("请填写正确的" + n.name + "。"), !1
					}
				return !0
			},
			getData: function() {
				var t = {};
				return this.$("dl .js-message").each(function(i, e) {
					if ("file" == e.type) var n = $(e).data("value");
					t[e.name] = n || e.value || ""
				}), this.validate(t) ? t : null
			}
		});
	return o
}), define("zenjs/backbone/base_view", ["zenjs/core/trigger_method"], function(t) {
	return Backbone.View.extend({
		clean: function() {
			return this.stopListening(), this
		},
		triggerMethod: t
	})
}), define("zenjs/list/list", ["zenjs/backbone/base_view"], function(t) {
	var i = function() {};
	return t.extend({
		initialize: function(t) {
			return this.options = t = t || {}, this.items = [], this.itemView = t.itemView, this.itemOptions = t.itemOptions || {}, this.collection = t.collection, this.onAfterListChange = t.onAfterListChange || i, this.onAfterListLoad = t.onAfterListLoad || i, this.onAfterListDisplay = t.onAfterListDisplay || i, this.onListEmpty = t.onListEmpty || t.onEmptyList || this._onListEmpty, this.onItemClick = t.onItemClick || i, this.onViewItemAdded = t.onViewItemAdded || i, this.displaySize = t.displaySize || -1, this.emptyHTML = t.emptyHTML || "", this.emptyText = t.emptyText || "列表为空", this
		},
		render: function(t) {
			return this.displaySize = -1 == (t || {}).displaySize ? -1 : this.displaySize, this.clean(), this._setupListeners(), this.addAll(), this.onAfterListDisplay({
				list: this.collection
			}), this
		},
		fetchRender: function(t) {
			return this.collection.fetch({
				data: t,
				success: _(function(t, i) {
					this.render(), this.onAfterListLoad(this.collection, i), this.onFetchSuccess && this.onFetchSuccess()
				}).bind(this)
			}), this
		},
		_setupListeners: function() {
			this.collection && (this.stopListening(this.collection), this.listenTo(this.collection, "add", this.addItem, this), this.listenTo(this.collection, "reset sort", this.render, this), this.listenTo(this.collection, "remove", this.onItemRemoved, this))
		},
		addItemListeners: function(t) {
			var i = this;
			this.listenTo(t, "all", function() {
				var i = "item:" + arguments[0],
					e = _.toArray(arguments);
				e.splice(0, 1), e.unshift(i, t), this.trigger.apply(this, e), "item:click" == i && this.onItemClick()
			}), this.listenTo(t.model, "change", function() {
				i.onAfterListChange({
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
				var i = new this.itemView(_.extend({}, this.options.itemOptions, {
					model: t,
					index: this.collection.indexOf(t)
				}));
				return this.items.push(i), this.addItemListeners(i), i.render(), this.onViewItemAdded({
					list: this.items,
					viewItem: i
				}), (this.listEl || this.$el).append(i.el), i
			}
		},
		removeItem: function(t) {
			var i = this.getViewByModel(t);
			i && this.removeView(i)
		},
		removeView: function(t) {
			var i;
			this.stopListening(t), t && (this.stopListening(t.model), t.remove(), i = this.items.indexOf(t), this.items.splice(i, 1)), 0 === this.collection.length && (this.fetching || this.triggerMethod("list:empty"))
		},
		onItemRemoved: function(t) {
			this.onAfterListChange({
				list: this.collection,
				action: "remove",
				model: t
			}), this.removeItem(t)
		},
		getViewByModel: function(t) {
			return _.find(this.items, function(i, e) {
				return i.model === t
			})
		},
		dispatchEventToAllViews: function(t, i) {
			for (var e = this.items.length - 1; e >= 0; e--) this.items[e].trigger(t, i)
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
}), define("text!wap/showcase/sku/templates/skuList.html", [], function() {
	return '<dt class="model-title sku-sel-title">\n    <label><%= skuCollection.k %>：</label>\n</dt>\n<dd>\n    <ul class="model-list sku-sel-list"></ul>\n</dd>'
}), define("wap/showcase/sku/views/sku_list", ["zenjs/list/list", "text!wap/showcase/sku/templates/skuList.html"], function(t, i) {
	var e = Backbone.View.extend({
			tagName: "li",
			className: "tag sku-tag pull-left ellipsis",
			template: _.template("<%= data.name %>"),
			initialize: function(t) {
				this.onItemClick = t.onItemClick || function() {}, this.listenTo(this, "active", this.onActive), this.listenTo(this, "enable", this.enableView), this.listenTo(this, "disable", this.disableView)
			},
			events: {
				click: "onClick"
			},
			onClick: function(t) {
				return this.$el.hasClass("unavailable") ? !1 : (this.toggle(), void this.onItemClick({
					v_id: this.model.id
				}))
			},
			onActive: function(t) {
				t.v_id !== this.model.id && this.deActive()
			},
			toggle: function() {
				this.$el.toggleClass("tag-orangef60"), this.$el.toggleClass("active"), this.isActived = !this.isActived
			},
			active: function() {
				this.$el.addClass("tag-orangef60"), this.$el.addClass("active"), this.isActived = !0
			},
			deActive: function() {
				this.$el.removeClass("tag-orangef60"), this.$el.removeClass("active"), this.isActived = !1
			},
			disableView: function(t) {
				parseInt(this.model.get("id")) == parseInt(t.value) && (this.$el.addClass("unavailable"), this.enabled = !1)
			},
			enableView: function(t) {
				!t || "all" !== t.value && parseInt(t.value) !== parseInt(this.model.get("id")) || (this.$el.removeClass("unavailable"), this.enabled = !0)
			},
			isEnabled: function() {
				return this.enabled
			},
			render: function() {
				return this.$el.html(this.template(_.extend({
					data: this.model.toJSON()
				}, {}))), this.enabled = !0, this
			}
		}),
		n = Backbone.View.extend({
			tagName: "dl",
			className: "clearfix block-item",
			template: _.template(i),
			initialize: function(t) {
				this.skuCollection = t.skuCollection, this.onSkuActived = t.onSkuActived || function() {}
			},
			onItemClick: function(t) {
				this.skuListView.dispatchEventToAllViews("active", t), this.onSkuActived(this.getActivedSku())
			},
			getActivedSku: function() {
				var t = this.skuListView.items,
					i = _.find(t, _(function(t) {
						return t.isActived
					}).bind(this));
				return i ? {
					k_id: this.skuCollection.k_id,
					k_s: this.skuCollection.k_s,
					v_id: i.model.id
				} : null
			},
			activeFirstSku: function() {
				if (this.skuListView.items)
					for (var t in this.skuListView.items) {
						var i = this.skuListView.items[t];
						if (i.isEnabled()) return void i.onClick()
					}
			},
			disableSkuItem: function(t) {
				this.skuListView.dispatchEventToAllViews("disable", {
					value: t
				})
			},
			enableSkuItem: function(t) {
				this.skuListView.dispatchEventToAllViews("enable", {
					value: t
				})
			},
			enalbeAllSkuItem: function() {
				this.skuListView.dispatchEventToAllViews("enable", {
					value: "all"
				})
			},
			render: function(i) {
				return this.$el.html(this.template({
					skuCollection: this.skuCollection
				})), this.skuListView = new t({
					collection: this.skuCollection,
					el: this.$(".model-list"),
					itemView: e,
					itemOptions: {
						onItemClick: _(this.onItemClick).bind(this)
					}
				}).render(), this
			}
		});
	return n
}), define("wap/showcase/sku/views/sku_brain", [], function() {
	var t = Backbone.View.extend({
		initialize: function(t) {
			this.collection = t.collection, Backbone.EventCenter.on("active", _(this.onSkuActived).bind(this))
		},
		onSkuActived: function(t) {
			var i = t.activedSkus,
				e = (t.clickedSku, ["s1", "s2", "s3"]);
			_.each(e, _(function(t) {
				var n = _.filter(i, function(i) {
						return i.k_s !== t
					}),
					s = this.collection.filter(function(t) {
						for (var i in n) {
							var e = n[i];
							if (t.get(e.k_s) !== e.v_id) return !1
						}
						return !0
					}),
					o = {};
				_.each(s, function(t) {
					for (var i in e) {
						var n = e[i],
							s = t.get(n);
						if (0 === parseInt(s)) return;
						o[s] ? o[s].totalStock += parseInt(t.get("stock_num")) : o[s] = {
							totalStock: parseInt(t.get("stock_num")),
							k_s: n
						}
					}
				});
				for (var a in o) o[a].totalStock ? this.trigger("sku-comb:hasstock", {
					v_id: a,
					k_s: o[a].k_s
				}) : this.trigger("sku-comb:nostock", {
					v_id: a,
					k_s: o[a].k_s
				})
			}).bind(this))
		}
	});
	return t
}), define("wap/showcase/sku/model", [], function(t, i) {
	var e, i = {};
	return i.SkuModel = e = Backbone.Model, i.SkuCollection = Backbone.Collection.extend({
		model: e
	}), i.SkuStockModel = Backbone.Model, i.SkuStockCollection = Backbone.Collection, i
}), define("wap/showcase/sku/views/sku_selector", ["./sku_list", "./sku_brain", "../model"], function(t, i, e) {
	var n = e.SkuStockCollection,
		s = e.SkuCollection,
		o = Backbone.View.extend({
			initialize: function(t) {
				var i = this;
				this.skuCollectionArray = [], this.sku = (t || {}).sku, i.sku.none_sku ? this.selectedSkuComb = {
					id: i.sku.collection_id,
					get: function(t) {
						return "price" === t ? i.sku.collection_price || "" : void 0
					}
				} : _.each(this.sku.tree, _(function(t) {
					var i = new s(t.v);
					i.count = t.count, i.k = t.k, i.k_id = t.k_id, i.k_s = t.k_s, this.skuCollectionArray.push(i)
				}).bind(this)), this.skuStockCollection = new n(this.sku.list), Backbone.EventCenter.on("enable", _(this.enalbeAllSkuItem).bind(this))
			},
			events: {},
			onSkuActived: function(t) {
				var i = [];
				_.each(this.skuListViews, function(t) {
					var e = t.getActivedSku();
					e && i.push(e)
				}), this.selectedSkuComb = this.getSelectedSkuComb(i), Backbone.EventCenter.trigger("sku:selected", {
					skuComb: this.selectedSkuComb
				}), Backbone.EventCenter.trigger("active", {
					activedSkus: i,
					clickedSku: t
				})
			},
			getSelectedSkuComb: function(t) {
				this.activedSkus = t;
				var i = {},
					e = null;
				return _.each(t, function(t) {
					i[t.k_s] = t.v_id
				}), t.length === _.size(this.skuListViews) && (e = this.skuStockCollection.find(function(t) {
					for (var e in i)
						if (t.get(e) !== i[e]) return !1;
					return !0
				})), e
			},
			diableSkuItem: function(t) {
				this.skuListViews[t.k_s].disableSkuItem(t.v_id)
			},
			enableSkuItem: function(t) {
				this.skuListViews[t.k_s].enableSkuItem(t.v_id)
			},
			enalbeAllSkuItem: function(t) {
				!!this.skuListViews[t.k_s] && this.skuListViews[t.k_s].enalbeAllSkuItem()
			},
			autoSelect: function() {
				this.skuListViews && _.each(this.skuListViews, function(t) {
					1 === t.skuCollection.length && t.activeFirstSku()
				})
			},
			getSelectedSku: function() {
				var t = _.pluck(this.sku.tree, "k_id"),
					i = this.sku,
					e = [];
				return this.selectedSkuComb ? {
					status: !0,
					sku: this.selectedSkuComb
				} : (_.each(this.activedSkus, function(i) {
					t = _.without(t, "" + i.k_id)
				}), _.each(t, function(t) {
					e.push(_.find(i.tree, function(i) {
						return i.k_id === t
					}).k)
				}), {
					status: !1,
					errMsg: e.join(" 和 ")
				})
			},
			render: function(e) {
				return this.skuListViews = {}, _.each(this.skuCollectionArray, _(function(i) {
					var e = new t({
						skuCollection: i,
						onSkuActived: _(this.onSkuActived).bind(this)
					});
					this.$el.append(e.render().el), this.skuListViews[i.k_s] = e
				}).bind(this)), this.skuBrain = new i({
					collection: this.skuStockCollection
				}), this.listenTo(this.skuBrain, "sku-comb:nostock", _(this.diableSkuItem).bind(this)), this.listenTo(this.skuBrain, "sku-comb:hasstock", _(this.enableSkuItem).bind(this)), this
			},
			clear: function() {
				return this.stopListening(), Backbone.EventCenter.off("enable"), this.remove(), null
			}
		});
	return o
}), define("text!wap/showcase/sku/templates/stock.html", [], function() {
	return '<dt class="model-title stock-label pull-left">\n    <label>剩余: </label>\n</dt>\n<dd class="stock-num">\n    <%= data.stock %>\n</dd>'
}), define("wap/showcase/sku/views/sku_stock", ["text!wap/showcase/sku/templates/stock.html"], function(t) {
	var i = Backbone.View.extend({
		template: _.template(t),
		initialize: function(t) {
			this.hide_stock = t.hide_stock
		},
		events: {},
		onClick: function(t) {},
		render: function(t) {
			return this.stock = this.stock || t.stock, !this.hide_stock && this.stock && this.$el.html(this.template({
				data: {
					stock: this.stock
				}
			})), this
		},
		setNum: function(t) {
			this.stock = t, this.render({})
		}
	});
	return i
}), define("text!wap/showcase/sku/templates/title.html", [], function() {
	return "<% if (goods_info['picture'].length > 0){ %>\n    <div class=\"thumb\"><img src=\"<%=goods_info['picture'][0] %>\" alt=\"\"></div>\n<% } %>\n<div class=\"detail goods-base-info clearfix\">\n    <p class=\"title c-black ellipsis\"><%=goods_info['title'] %></p>\n    <div class=\"goods-price clearfix\">\n    <% if(activity){ %>\n        <div class=\"current-price pull-left c-black activity-price\">\n            <span class='price-name pull-left font-size-14 c-orange'>￥</span><i class=\"js-goods-price price font-size-18 vertical-middle c-orange\"><%=activity['price'] %></i>\n            <span class=\"price-tag vertical-middle font-size-12\"><%=activity['price_title'] %></span>\n        </div>\n        <em class=\"old-price vertical-middle font-size-14 line-through\">价格：<%=sku['old_price'] && sku['old_price'] != '0.00' && sku['old_price'] != 0.00 ? sku['old_price'] : goods_info['price'] %></em>\n    <% }else{ %>\n        <div class=\"current-price pull-left c-black\">\n            <span class='price-name pull-left font-size-14 c-orange'>￥</span><i class=\"js-goods-price price font-size-18 vertical-middle c-orange\"><%=sku['price'] && sku['price'] != '0.00' && sku['price'] != 0.00 ? sku['price'] : goods_info['price'] %></i>\n        </div>\n    <% } %>\n    <% if(goods_info['origin'] && goods_info['origin'] !== '淘价：'){ %>\n        <div class=\"original-price vertical-middle font-size-14 line-through\"><%=goods_info['origin'] %></div>\n    <% } %>\n    </div>\n</div>\n<div class=\"js-cancel sku-cancel\">\n    <div class=\"cancel-img\"></div>\n</div>\n"
}), define("wap/showcase/sku/views/sku_title", ["text!wap/showcase/sku/templates/title.html"], function(t) {
	var i = Backbone.View.extend({
		initialize: function(t) {
			this.difTitle = (t || {}).difTitle
		},
		template: _.template(t),
		changePrice: function(t) {
			this.price = t, this.$(".js-goods-price").html((t / 100).toFixed(2))
		},
		getPrice: function() {
			return this.price
		},
		resetPrice: function() {
			this.$(".js-goods-price").html(this.priceScope)
		},
		render: function(t) {
			return this.$el.html(this.template(t)), this.priceScope = this.$el.find(".js-goods-price").text(), this
		}
	});
	return i
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
		var i, e, n = [],
			s = function(t) {
				return t.forEach ? t.forEach(s) : void n.push({
					name: i,
					value: t
				})
			};
		return this[0] && t.each(this[0].elements, function(n, o) {
			e = o.type, i = o.name, i && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != e && "reset" != e && "button" != e && "file" != e && ("radio" != e && "checkbox" != e || o.checked) && s(t(o).val())
		}), n
	}, t.fn.serialize = function() {
		var t = [];
		return this.serializeArray().forEach(function(i) {
			t.push(encodeURIComponent(i.name) + "=" + encodeURIComponent(i.value))
		}), t.join("&")
	}, t.fn.submit = function(i) {
		if (0 in arguments) this.bind("submit", i);
		else if (this.length) {
			var e = t.Event("submit");
			this.eq(0).trigger(e), e.isDefaultPrevented() || this.get(0).submit()
		}
		return this
	}
}(Zepto), define("vendor/zepto/form", function() {}), window.Utils = window.Utils || {}, define("wap/components/util/form", ["vendor/zepto/form"], function(t) {
	window.Utils.getFormData = function(t) {
		var i = t.serializeArray(),
			e = {};
		return $.map(i, function(t) {
			e[t.name] = t.value
		}), e
	}
}), define("wap/components/sms_fetch/main", ["zenjs/util/args"], function(t) {
	function i() {
		this.loadingLock = !1, this.isUsed = void 0
	}

	function e(t) {
		t = t || {}, this.$el = $(t.el || t.$el || "<div></div>"), this.el = this.$el[0], this.$ = function(t) {
			return this.$el.find(t)
		}, this.initialize && this.initialize(t)
	}
	var n = function() {};
	i.prototype = {
		fetch: function() {
			if (this.isUsed !== !1) {
				var t = this;
				this.loadingLock = !0, $.ajax({
					url: window._global.url.www + "/common/token/token.jsonp",
					type: "get",
					dataType: "jsonp"
				}).done(function(i) {
					0 == i.code ? (t.token = i.data, t.loadingLock = !1, t.isUsed = !1) : motify.log(i.msg)
				}).fail(function() {
					motify.log("token 获取失败")
				})
			}
		},
		get: function() {
			return this.isUsed = !0, this.token
		}
	};
	var s = new i;
	return $.extend(e.prototype, {
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
			var i = this;
			if (s.loadingLock) return void motify.log("数据加载中，稍后再试");
			if (t = t || {}, t.mobile && (this.mobile = t.mobile), !this.mobile) return !1;
			var e = {
				smsFetch: i.onSmsFetchHandler,
				image: i.onImageHandler
			};
			return i.startTimer.call(i), (e[i.verifyType] || n).call(i), this
		},
		startTimer: function() {
			this.onTimerStart(), this.btnCountdown(this.duration)
		},
		stopTimer: function() {
			clearTimeout(this.timer), this.onTimerClose()
		},
		btnCountdown: function(t) {
			var i = this;
			this.onTimeChange({
				second: t
			}), --t >= 0 ? this.timer = setTimeout(function() {
				i.btnCountdown(t)
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
				var i = this;
				$.ajax({
					url: this.smsFetchUrl,
					dataType: "jsonp",
					data: {
						verifyTimes: t,
						mobile: this.mobile,
						biz: i.biz,
						token: s.get()
					},
					success: function(e) {
						return 0 == e.code ? void t++ : (i.stopTimer.call(i), i.onGetCodeError.call(i), void(10111 === e.code ? (i.verifyType = "image", i.onVerifyImageShow(i.imgUrl), i.onVerifyPictureShow()) : (t++, motify.log(e.msg))))
					},
					error: function(e, n, s) {
						t++, i.stopTimer.call(i), i.onGetCodeError.call(i), motify.log("获取验证码失败，请稍后再试")
					},
					complete: function(t, i) {}
				}).always(function() {
					s.fetch()
				})
			}
		}(),
		onImageHandler: function() {
			var t = this,
				i = this.mobile;
			$.ajax({
				url: this.imgVerifyUrl,
				dataType: "jsonp",
				data: {
					mobile: i,
					captcha_code: this.getImageCode()
				},
				success: function(e) {
					return 0 === e.code ? (t.verifyType = "smsFetch", t.mobile = i, t.onVerifyImageHide(), t.onVerifyPictureSuccess(), void t.onSmsFetchHandler()) : (t.stopTimer.call(t), t.onVerifyPictureError.call(t), void(10100 === e.code ? (motify.log(e.msg), t.$el.find(".js-verify-image").attr("src", t.imgUrl)) : motify.log(e.msg)))
				},
				error: function(i, e, n) {
					t.stopTimer.call(t), t.onVerifyPictureError.call(t), motify.log("图形验证失败，重试一下吧~"), t.$el.find(".js-verify-image").attr("src", t.imgUrl)
				},
				complete: function(t, i) {}
			})
		}
	}), e
}), define("wap/components/login_popout/main", ["text!wap/components/login_popout/templates/init.html", "text!wap/components/login_popout/templates/login.html", "text!wap/components/login_popout/templates/register.html", "text!wap/components/login_popout/templates/change_pwd.html", "wap/components/util/valid", "wap/components/util/form", "wap/components/sms_fetch/main"], function(t, i, e, n, s, o, a) {
	var l = window.zenjs.UA,
		r = Backbone.View.extend({
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
					login: _.template(s.loginTpl || i),
					register: _.template(s.registerTpl || e),
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
						var i = t.second;
						$(o.nAuthCode).text("等待 " + i + "秒")
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
			show: function(t, i) {
				"changePwd" == t ? this.sms.biz = "reset_account_passwd" : this.sms.biz = "kdt_account_captcha", _.extend(this.renderOpt, {
					type: t
				}, i || {
					isSetting: !1
				}), this.render(this.renderOpt), this.$el.show(this.animationTime)
			},
			onConfirmClicked: function(t) {
				t.preventDefault();
				var i = this,
					e = $(t.target),
					n = Utils.getFormData(i.nForm);
				if (n = _.extend(i.renderOpt, n), !i.validate(n)) return !1;
				n.source = this.source;
				var s = e.html();
				if ("init" === i.renderOpt.type) i.renderOpt.phone = n.phone, $.ajax({
					url: "/v2/buyer/auth/authConfirm.json",
					type: "POST",
					dataType: "json",
					timeout: 15e3,
					data: n,
					beforeSend: function() {
						e.html("确认中..."), e.prop("disabled", !0)
					},
					success: function(t) {
						switch (+t.code) {
							case 0:
								i.show("login");
								break;
							case 200:
								i.show("register");
								break;
							case 300:
								i.show("changePwd", {
									isSetting: !0
								});
							default:
								i.nHelpInfo.html(t.msg)
						}
					},
					error: function() {
						i.nHelpInfo.html("出错啦，请重试")
					},
					complete: function() {
						e.html(s), e.prop("disabled", !1)
					}
				});
				else {
					var o = i.renderOpt.type;
					$.ajax({
						url: this.urlMap[o],
						type: this.ajaxType,
						dataType: "json",
						timeout: 15e3,
						data: n,
						beforeSend: function() {
							e.html("确认中..."), e.prop("disabled", !0)
						},
						success: function(t) {
							0 === t.code ? i.afterLogin(t, {
								type: o
							}) : i.nHelpInfo.html(t.msg)
						},
						error: function() {
							i.nHelpInfo.html("出错啦，请重试")
						},
						complete: function() {
							e.html(s), e.prop("disabled", !1)
						}
					})
				}
			},
			onAuthcodeClicked: function(t) {
				t.preventDefault();
				var i = this,
					e = Utils.getFormData(i.nForm);
				e = _.extend(i.renderOpt, e);
				var n = e.phone;
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
				return function(i) {
					return _.every(t[i.type], _(function(t) {
						return this.valid_map[t](i)
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
				var i = $(t.target),
					e = i.parent().find("input");
				e.focus(), l && (l.isIOS() && l.getIOSVersion() < 8 && (e.blur(), e.focus()), i.css("display", "none"))
			},
			onInputBlur: function(t) {
				var i = $(t.target);
				i.parent().find(".js-txt-cover").css("display", "block")
			}
		});
	return r
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {
	makeRandomString: function(t) {
		var i = "",
			e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		t = t || 10;
		for (var n = 0; t > n; n++) i += e.charAt(Math.floor(Math.random() * e.length));
		return i
	}
}), define("wap/components/util/number", function() {}), define("wap/components/pop", ["zenjs/events", "wap/components/util/number"], function(t) {
	var i = function() {};
	window.zenjs = window.zenjs || {};
	var e = t.extend({
		init: function(t) {
			this._window = $(window);
			var e = window.Utils.makeRandomString();
			$("body").append('<div id="' + e + '"                 style="display:none; height: 100%;                 position: fixed; top: 0; left: 0; right: 0;                background-color: rgba(0, 0, 0, ' + (t.transparent || ".9") + ');z-index:1000;opacity:0;transition: opacity ease 0.2s;"></div>'), this.nBg = $("#" + e), this.nBg.on("click", $.proxy(function() {
				this.isCanNotHide || this.hide()
			}, this));
			var n = window.Utils.makeRandomString();
			$("body").append('<div id="' + n + '" class="' + (t.className || "") + '" style="overflow:hidden;visibility: hidden;"></div>'), this.nPopContainer = $("#" + n), this.nPopContainer.hide(), t.contentViewClass && (this.contentViewClass = t.contentViewClass, this.contentViewOptions = $.extend({
				el: this.nPopContainer
			}, t.contentViewOptions || {}), this.contentView = new this.contentViewClass($.extend({
				onHide: $.proxy(this.hide, this)
			}, this.contentViewOptions)), this.contentView.onHide = $.proxy(this.hide, this)), this.animationTime = t.animationTime || 300, this.isCanNotHide = t.isCanNotHide, this.doNotRemoveOnHide = t.doNotRemoveOnHide || !1, this.onShow = t.onShow || i, this.onHide = t.onHide || i, this.onFinishHide = t.onFinishHide || i, this.html = t.html
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
			var t, i = function() {
				return t !== this._window.scrollTop() ? (this._window.scrollTop(t), void setTimeout($.proxy(i, this))) : void setTimeout($.proxy(this.onFinishHide, this), 50)
			};
			return function(e) {
				e = e || {};
				var n = e.doNotRemove || this.doNotRemoveOnHide || !1;
				this._doHide && this._doHide(), setTimeout($.proxy(function() {
					this.startHide(), t = this.top, this._window.scrollTop(t), $.proxy(i, this)(), this.nBg.css({
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
				var i = $("body"),
					e = $("html");
				this.htmlPosition = e.css("position"), e.css("position", "relative"), this.bodyCss = (i.attr("style") || {}).cssText, this.htmlCss = (e.attr("style") || {}).cssText, $("body,html").css({
					overflow: "hidden",
					height: this._window.height()
				})
			}
			t.indexOf(this) < 0 && t.push(this)
		},
		startHide: function() {
			var t = window.zenjs.popList,
				i = t.indexOf(this);
			i > -1 && t.splice(i, 1), t.length < 1 && ($("html").attr("style", this.htmlCss || ""), $("body").attr("style", this.bodyCss || ""))
		}
	});
	return e
}), define("wap/components/popout", ["wap/components/pop"], function(t) {
	var i = t.extend({
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
	return i
}), define("wap/components/popout_box", ["wap/components/popout"], function(t) {
	var i = function() {},
		e = t.extend({
			init: function(t) {
				this._super(t), this._onOKClicked = t.onOKClicked || i, this._onCancelClicked = t.onCancelClicked || i, this.preventHideOnOkClicked = t.preventHideOnOkClicked || !1, this.width = t.width, this.setEventListener()
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
	return e
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {
	needConfirm: function(t, i, e) {
		var n = window.confirm(t);
		n ? i && "function" == typeof i && i.apply() : e && "function" == typeof e && e.apply()
	}
}), define("wap/components/util/confirm", function() {}), define("text!wap/showcase/sku/templates/buyBtn.html", [], function() {
	return '<% if(!isMultiBtn) {%>\n    <a href="javascript:;" class="js-confirm-it btn btn-block btn-orange-dark">下一步</a>\n<% } else {\n    if(!isCartBtnHide) {%>\n        <div class="half-button">\n            <a href="javascript:;" class="js-mutiBtn-confirm confirm btn btn-block btn-orange-dark ">立即购买</a>\n        </div>\n        <div class="half-button">\n            <a href="javascript:;" class="js-mutiBtn-confirm cart btn btn-block btn-white">加入购物车</a>\n        </div>\n    <% } else {%>\n        <a href="javascript:;" class="js-mutiBtn-confirm confirm btn btn-block btn-orange-dark">下一步</a>\n    <%}\n}%>\n'
}), define("text!wap/showcase/sku/templates/skuContainer.html", [], function() {
	return '<div class="layout-title sku-box-shadow name-card sku-name-card">\n</div>\n\n<div class="adv-opts layout-content">\n    <div class="goods-models js-sku-views block block-list block-border-top-none"></div>\n    <div class="confirm-action content-foot clearfix"></div>\n</div>'
}), require(["zenjs/backbone/quantity", "wap/showcase/sku/views/message", "wap/showcase/sku/views/sku_selector", "wap/showcase/sku/views/sku_stock", "wap/showcase/sku/views/sku_title", "wap/components/login_popout/main", "wap/components/popout_box", "wap/components/util/confirm", "zenjs/util/args", "vendor/zepto/form", "text!wap/showcase/sku/templates/buyBtn.html", "text!wap/showcase/sku/templates/skuContainer.html"], function(t, i, e, n, s, o, a, l, r, c, d, h) {
	var u = function() {};
	Backbone.EventCenter = _.extend({}, Backbone.Events);
	var m = Backbone.View.extend({
		initialize: function(t) {
			t = t || {}, this.skuViewConfig = _.extend({
				bottom: 0,
				left: 0,
				right: 0,
				top: 40
			}, t.skuViewConfig || {}), this.baseUrl = t.baseUrl, this.need_ajax_login = t.need_ajax_login || !1, this.wxpay_env = t.wxpay_env, this.isCartBtnHide = t.isCartBtnHide, this.quantityReadOnly = t.quantityReadOnly, this.isPriceCanChanged = !0, this.onAddSuccess = t.onAddSuccess || u, this.onHide = t.onHide || function() {}, this.viewTop = this.skuViewConfig.top, delete this.skuViewConfig.top, this.deviceView = {
				width: $(document).width(),
				height: $(document).height()
			}, this.bodyPos = $("html").css("position"), this.nActionBtnTemplate = _.template(d), this.nPrice = this.$(".js-goods-price"), Backbone.EventCenter = _.extend({}, Backbone.Events), Backbone.EventCenter.on("sku:selected", _(this.onSelectChange).bind(this))
		},
		render: function(o) {
			o = o || {}, this.sku = o.sku || {}, this.goods_id = o.goods_id, this.kdt_id = o.kdt_id || window._global.kdt_id, this.postage = o.postage, this.activity = o.activity, this.activity_alias = o.activity_alias || "", this.activity_id = o.activity_id || 0, this.activity_type = o.activity_type || 0, this.quota = o.quota, this.quota_used = o.quota_used, this.stockNum = o.stock || this.sku.stock_num, this.isGift = o.isGift, this.is_virtual = o.is_virtual, this.isAddCart = o.isAddCart, this.isAddWish = o.isAddWish, this.isMultiBtn = o.isMultiBtn || !1, this.onAfterHideFunc = o.onAfterHideFunc || function() {}, this.goods_info = o.goods_info || {
				title: "",
				picture: [],
				price: "",
				origin: ""
			}, this.item_id = o.item_id || "", this.is_buy = o.is_buy || "", this.show_stock = "" === this.is_buy ? !0 : !1, this.$el.append(h);
			var a = this.$(".layout-title");
			this.skuTitleView = new s({
				el: a
			}).render({
				goods_info: this.goods_info,
				activity: this.activity,
				sku: this.sku
			}), this.$(".js-sku-views").empty();
			var l = this.$(".js-sku-views");
			if (this.skuSelectorView = new e({
				sku: this.sku
			}).render(), l.append(this.skuSelectorView.$el.children()), !this.isAddWish) {
				var r = this.quantityLimit = this.getLimitNum(this.quota, this.quota_used, this.stockNum),
					c = $('<dl class="clearfix block-item"><dt class="model-title sku-num pull-left">                    <label>数量</label></dt><dd></dd></dl>');
				this.quantityView = new t({
					readonly: this.quantityReadOnly,
					num: 1,
					tagName: "dl",
					className: "clearfix",
					limitNum: +r.limitNum,
					minimalNum: this.isAddWish ? 0 : 1,
					onOverLimit: _(function(t) {
						var i = this.quota_used > 0 ? "<br>您之前已经购买过" + this.quota_used + "件" : "";
						return "quota" === r.limitType ? void motify.log("该商品每人限购" + this.quota + "件" + i) : "stock" === r.limitType ? void motify.log("就这么几件啦～") : void 0
					}).bind(this),
					onNumChange: _(function() {
						var t;
						return _(function(i) {
							this.isAddWish && (0 === i ? t ? t.show() : (t = $('<div class="c-red text-right">0表示不限制赠送数量</div>'), this.quantityView.$el.parent().append(t)) : t.hide())
						}).bind(this)
					}).bind(this)()
				}).render(), l.append(c), this.quantityView.$el.appendTo(c.find("dd")), this.show_stock && (this.stockView = new n({
					el: $('<div class="stock pull-right font-size-12"></div>'),
					hide_stock: this.sku.hide_stock
				}).render({
					stock: this.stockNum
				}), this.quantityView.$el.append(this.stockView.$el))
			}
			if (this.messageView = new i({
				messages: this.sku.messages,
				className: "block-item block-item-messages"
			}), l.append(this.messageView.render().el), this.$(".confirm-action").html(this.nActionBtnTemplate({
				isMultiBtn: this.isMultiBtn,
				isCartBtnHide: this.isCartBtnHide
			})), this.nConfirmBtn = this.$(0 === this.$(".js-confirm-it").length ? ".js-mutiBtn-confirm.confirm" : ".js-confirm-it"), r && 0 === r.limitNum && this.nConfirmBtn.attr("disabled", !0), this.isMultiBtn) this.nConfirmBtn.data("text", "立即购买");
			else {
				var d = this.isAddCart ? "加入购物车" : "下一步";
				this.nConfirmBtn.text(d), this.nConfirmBtn.data("text", d)
			}
			return this.$el.css(this.skuViewConfig), this.skuSelectorView.autoSelect(), !this.isAddWish || this.sku.messages && 0 !== this.sku.messages.length || !this.sku.none_sku || l.hide(), this
		},
		events: {
			"click .js-confirm-it": "doConfirmClicked",
			"click .js-cancel": "onCancelClicked",
			"click .js-mutiBtn-confirm": "onMultiBtnClick"
		},
		onSelectChange: function(t) {
			var i = t.skuComb,
				e = this.stockNum;
			i ? (this.quantityView && (["19170526", "24413294", "24413268", "24413261"].indexOf(i.id) >= 0 ? this.quantityView && this.quantityView.setMinimalNum(10) : this.quantityView.setMinimalNum(["19170527", "24413295", "24413269", "24413262"].indexOf(i.id) >= 0 ? 50 : 1)), e = parseInt(i.get("stock_num")), this.stockView && this.stockView.setNum(e), this.setPrice(i.get("price"))) : (this.stockView && this.stockView.setNum(this.stockNum), this.skuTitleView.resetPrice()), this.quantityView && (this.quantityLimit = this.getLimitNum(this.quota, this.quota_used, e), this.quantityView.setLimitNum(this.quantityLimit.limitNum)), this.height(), this.$el.height(this.skuViewHeight)
		},
		setPrice: function(t) {
			this.isPriceCanChanged && this.skuTitleView.changePrice(t)
		},
		disablePriceChange: function() {
			this.isPriceCanChanged = !1
		},
		onMultiBtnClick: function(t) {
			t = t || window.event;
			var i = t.target || t.srcElement;
			this.isAddCart = $(i).hasClass("cart"), this.doConfirmClicked(t)
		},
		doConfirmClicked: function(t) {
			function i() {
				n.doSubmit({
					buyType: s
				})
			}
			var e = $(t.target);
			if (!e.attr("disabled")) {
				var n = this,
					s = this.getBuyType();
				t && window.Logger ? window.Logger && Logger.log({
					fm: "click",
					title: this.isAddCart ? "加入购物车" : "立即购买"
				}).then(i, function() {
					motify.log("亲，请稍等。")
				}) : i()
			}
		},
		doSubmit: function() {
			var t, i = function(t) {
					var i = window._global.url.trade + "/wxpay/confirm?showwxpaytitle=1&kdt_id=" + this.kdt_id;
					t.from && (i = window.zenjs.Args.add(i, {
						from: t.from
					})), t.use_wxpay && (i = window.zenjs.Args.add(i, {
						use_wxpay: t.use_wxpay
					}));
					var e = this.messageView.getData();
					if (e) {
						var n = $.extend({
								goods_id: t.goods_id,
								num: t.num,
								sku_id: t.sku_id,
								price: t.price
							}, e),
							s = [n],
							o = {
								is_buy: this.is_buy,
								item_id: this.item_id
							};
						delete t.goods_id, delete t.num, delete t.sku_id, delete t.price, t.order_from = "";
						var a = $('<form method="post" action="' + i + '"></form>');
						a.append('<textarea name="goodsList">' + JSON.stringify(s) + "</textarea>"), a.append('<textarea name="common">' + JSON.stringify(t) + "</textarea>"), o.item_id && a.append('<textarea name="pinjian">' + JSON.stringify(o) + "</textarea>"), a.submit()
					}
				},
				e = function(t) {
					var i = this,
						e = this.baseUrl;
					$.ajax({
						url: e + "/trade/cart/goods.jsonp",
						type: "GET",
						dataType: "jsonp",
						cache: !1,
						timeout: 15e3,
						data: t,
						beforeSend: function() {
							i.ajaxing = !0
						},
						success: function(e) {
							0 === +e.code ? (motify.log("已成功添加到购物车"), i.onAddSuccess({
								wish: !1,
								cart: !0,
								buy: !1
							}, t), window.eventHandler && (window.eventHandler.trigger("cart:add", e, t), window.eventHandler.trigger("global_icon:new")), i.onHide()) : motify.log(e.msg)
						},
						error: function(t, e, n) {
							i.ajaxing = !1, i.submitError("add-cart")
						},
						complete: function() {
							i.ajaxing = !1
						}
					})
				},
				n = function(t) {
					var i = this;
					$.ajax({
						url: "/v2/trade/wish/add.json?kdt_id=" + i.kdt_id,
						type: "POST",
						dataType: "json",
						cache: !1,
						timeout: 15e3,
						data: t,
						beforeSend: function() {
							i.ajaxing = !0, i.nConfirmBtn.html("提交中..."), i.doDisabled(i.nConfirmBtn, !0)
						},
						success: function(e) {
							i.ajaxing = !1, i.submitSuccess(e, t)
						},
						error: function(t, e, n) {
							i.ajaxing = !1, i.submitError("add-wish")
						}
					})
				},
				s = function(t) {
					var i = this,
						e = this.baseUrl;
					$.ajax({
						url: e + "/trade/order/book.jsonp",
						type: "GET",
						dataType: "jsonp",
						cache: !1,
						timeout: 15e3,
						data: t,
						beforeSend: function() {
							i.ajaxing = !0, i.nConfirmBtn.html("提交中..."), i.doDisabled(i.nConfirmBtn, !0)
						},
						success: function(e) {
							i.ajaxing = !1, i.submitSuccess(e, t)
						},
						error: function(t, e, n) {
							i.ajaxing = !1, i.submitError("buy")
						}
					})
				},
				l = {
					"add-cart": e,
					buy: i,
					"add-wish": n,
					book: s
				},
				r = function(i, e) {
					(e.buyType || "function" == typeof t) && t.call(this, i)
				},
				c = function() {
					var t, i, e = this.skuSelectorView.getSelectedSku(),
						n = this.messageView.getData();
					if (!e.status) return motify.log("请选择 " + e.errMsg), !1;
					if (t = e.sku, !n) return !1;
					if (i = this.quantityView ? this.quantityView.getNum() : 1, !i) return motify.log("亲，是不是数量不对？"), !1;
					var s = {
							kdt_id: this.kdt_id,
							goods_id: this.goods_id,
							postage: this.postage || 0,
							num: i,
							activity_alias: this.activity_alias,
							activity_id: this.activity_id,
							activity_type: this.activity_type,
							sku_id: t.id,
							price: parseInt(this.skuTitleView.getPrice()) || t.get("price")
						},
						o = (window.zenjs.Args.get || function() {})("from");
					return o && o.length > 0 && (s.from = o), this.wxpay_env ? s.use_wxpay = 1 : s.use_wxpay = 0, _(s).extend(n), s
				};
			return function(i) {
				if (t = l[i.buyType], !i.notCheckBtnDisabled && this.isDisabled(this.nConfirmBtn)) return !1;
				if (this.ajaxing) motify.log("提交订单中，请勿重复提交。");
				else {
					var e = c.call(this);
					if (!e) return !1;
					if (this.isGift && (e.order_type = 1), i.accept_price && (e.accept_price = i.accept_price), this.needLogin()) {
						var n = new a({
							contentViewClass: o,
							contentViewOptions: {
								afterLogin: _(function(t) {
									n.hide(), this.need_ajax_login = !1, window._global.is_pinjian ? window.location.reload() : r.call(this, e, i)
								}).bind(this)
							}
						});
						return void n.render().show()
					}
					r.call(this, e, i)
				}
			}
		}(),
		doWait: function(t) {
			t > 0 ? (this.nConfirmBtn.attr("disabled", !0), this.nConfirmBtn.text(this.isMultiBtn ? this.nConfirmBtn.data("text") + "(" + t + ")" : "正在排队购买，请等待 " + t + " 秒后再提交"), this.waitId = setTimeout(_(this.doWait).bind(this, t - 1), 1e3)) : (this.nConfirmBtn.removeAttr("disabled"), this.nConfirmBtn.text(this.nConfirmBtn.data("text")), this.waitId = !1)
		},
		submitSuccess: function() {
			var t = {
					11011: !0,
					11014: !0,
					11012: !0,
					11013: !0
				},
				i = function(t) {
					motify.log(t), this.nConfirmBtn.html(t), this.doDisabled(view.nConfirmBtn, !0)
				};
			return function(e, n) {
				var s = this,
					o = e.code;
				if (0 === o) {
					if (s.onAddSuccess({
						wish: s.isAddWish,
						cart: !1,
						buy: !s.isAddWish
					}, n), s.isAddWish) return window.eventHandler && window.eventHandler.trigger("wish:add"), window.eventHandler && window.eventHandler.trigger("global_icon:new"), void s.onHide();
					var a = e.data.order_no;
					if (!a || 0 == a.length || !e.data.trade_confirm_url) return motify.log("订单生成失败，请联系管理员。"), s.nConfirmBtn.html("确认提交"), s.nConfirmBtn.removeAttr("disabled"), !1;
					window.location.href = e.data.trade_confirm_url
				} else 12500 === o ? (this.isMultiBtn && motify.log("网络繁忙，请稍后再试～"), s.doWait(+e.data.wait)) : 11010 === o ? Utils.needConfirm(e.msg + "（新价格：" + (parseInt(e.data.cur_price) / 100).toFixed(2) + "元）", function() {
					var t = s.getBuyType();
					s.doSubmit({
						buyType: t,
						accept_price: 1,
						notCheckBtnDisabled: !0
					})
				}, function() {
					window.location.reload()
				}) : 13021 === o ? window.location.href = e.data.redirectUrl : t[o + ""] ? i.call(s, e.msg) : 11020 === o ? (motify.log(e.msg + "正在刷新页面..."), window.location.reload()) : 11021 === o ? (motify.log(e.msg), s.nConfirmBtn.html("确认提交"), s.nConfirmBtn.removeAttr("disabled"), s.quantityView.updateNum(1)) : (motify.log(e.msg), s.nConfirmBtn.html("再次提交"), s.nConfirmBtn.removeAttr("disabled"))
			}
		}(),
		submitError: function(t) {
			this.doDisabled(this.nConfirmBtn, !1), "buy" == t ? (motify.log("购买失败，请重试。"), this.nConfirmBtn.html("提交订单")) : "add-cart" == t ? (motify.log("添加到购物车失败"), this.nConfirmBtn.html("加入购物车")) : "add-wish" == t && (motify.log("添加到心愿单失败"), this.nConfirmBtn.html("下一步"))
		},
		onCancelClicked: function(t) {
			this.onHide()
		},
		hide: function(t) {
			this.waitId && (clearTimeout(this.waitId), this.waitId = !1, this.nConfirmBtn.removeAttr("disabled")), this.isMultiBtn && (this.$(".js-sku-views").empty(), this.$(".layout-content").height("auto"), this.skuSelectorView = this.skuSelectorView.clear())
		},
		height: function() {
			this.$(".layout-content").height("auto");
			var t = $(window).height() - this.viewTop,
				i = this.$(".layout-title").outerHeight(),
				e = t - i,
				n = this.$(".layout-content").height();
			return this.skuConH = n, this.skuConWinH = e, this.skuConHeight = e > n ? n : e, this.skuViewHeight = this.skuConHeight + i, this.$(".layout-content").height(this.skuConHeight), this.skuViewHeight
		},
		onAfterPopupShow: function() {
			this.quantityView && this.quantityView.validateNum()
		},
		displaySku: function(t) {
			return this.render(t || {})
		},
		getLimitNum: function(t, i, e) {
			var n, s, o = t - i;
			return e > o && 0 !== t ? (n = +o, s = "quota") : (n = +e, s = "stock"), {
				limitNum: n,
				limitType: s
			}
		},
		doDisabled: function(t, i) {
			i ? this.nConfirmBtn.attr("disabled", !0) : this.nConfirmBtn.removeAttr("disabled")
		},
		isDisabled: function(t) {
			return t.attr("disabled")
		},
		getBuyType: function() {
			return this.isAddWish ? "add-wish" : this.isAddCart ? "add-cart" : "buy"
		},
		needLogin: function() {
			return this.need_ajax_login ? this.isAddWish || this.isAddCart ? !1 : !0 : !1
		}
	});
	return window.BuyView = m
}), define("main", function() {});