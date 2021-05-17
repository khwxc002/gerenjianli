window.Utils = window.Utils || {}, $.extend(window.Utils, {validMobile: function(e) {
        return e = "" + e, /^((\+86)|(86))?(1)\d{10}$/.test(e)
    },validPhone: function(e) {
        return e = "" + e, /^0[0-9\-]{10,13}$/.test(e)
    },validNumber: function(e) {
        return /^\d+$/.test(e)
    },validEmail: function(e) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e)
    },validPostalCode: function(e) {
        return e = "" + e, /^\d{6}$/.test(e)
    }}), define("wap/components/util/valid", function() {
}), define("wap/components/address/model/address", ["wap/components/util/valid"], function() {
    return Backbone.Model.extend({url: "/v2/buyer/address/item.json",defaults: {tel: "",province: "",postal_code: "",county: "",city: "",area_code: "",address_detail: "",user_name: ""},validate: function(e) {
            var t = window.Utils;
            return e.user_name ? e.tel ? e.address_detail ? "" === e.postal_code || t.validPostalCode(e.postal_code) ? t.validMobile(e.tel) || t.validPhone(e.tel) ? void 0 : {msg: "请填写正确的<br />手机号码或电话号码",name: "tel"} : {msg: "邮政编码格式不正确",name: "postal_code"} : {msg: "请填写详细地址",name: "address_detail"} : {msg: "请填写联系电话",name: "tel"} : {msg: "请填写名字",name: "user_name"}
        },update: function(e, t) {
            return $.ajax({url: this.url,type: t || "POST",dataType: "JSON",data: e})
        }})
}), define("wap/components/address/collection/express_address_collection", ["wap/components/address/model/address"], function(e) {
    return Backbone.Collection.extend({model: e,url: "/v2/buyer/address/list.json?kdt_id=" + window._global.kdt_id,parse: function(e) {
            var t = (e || {}).data || [];
            return this.total = parseInt(t.length), t
        }})
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {makeRandomString: function(e) {
        var t = "", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        e = e || 10;
        for (var s = 0; e > s; s++)
            t += i.charAt(Math.floor(Math.random() * i.length));
        return t
    }}), define("wap/components/util/number", function() {
}), define("text!wap/components/address/templates/addressForm.html", [], function() {
    return '\n<form class="js-address-fm address-ui address-fm">\n    <h4 class="address-fm-title">收货地址</h4>\n    <div class="js-address-cancel publish-cancel">\n        <div class="cancel-img"></div>\n    </div>\n    <div class="block" style="margin:0;">\n        <% if(typeof data.id !== \'undefined\') { %>\n            <input type="hidden" name="id" value="<%=data.id %>" />\n        <% } %>\n        <div class="block-item">\n            <label class="form-row form-text-row">\n                <em class="form-text-label">收货人</em>\n                <span class="input-wrapper"><input type="text" name="user_name" class="form-text-input" value="<%=data.user_name %>" placeholder="名字" /></span>\n            </label>\n        </div>\n        <div class="block-item">\n            <label class="form-row form-text-row">\n                <em class="form-text-label">联系电话</em>\n                <span class="input-wrapper"><input type="tel" name="tel" class="form-text-input" value="<%=data.tel %>" placeholder="手机或固话" /></span>\n            </label>\n        </div>\n        <div class="block-item">\n            <div class="form-row form-text-row">\n                <em class="form-text-label">选择地区</em>\n                <div class="input-wrapper input-region js-area-select">\n\n                </div>\n            </div>\n        </div>\n        <div class="block-item">\n            <label class="form-row form-text-row">\n                <em class="form-text-label">详细地址</em>\n                <span class="input-wrapper"><input type="text" name="address_detail" class="form-text-input" value="<%=data.address_detail %>" placeholder="街道门牌信息" /></span>\n            </label>\n        </div>\n        <div class="block-item">\n            <label class="form-row form-text-row">\n                <em class="form-text-label">邮政编码</em>\n                <span class="input-wrapper"><input type="tel" maxlength="6" name="postal_code" class="form-text-input" value="<%=data.postal_code %>" placeholder="邮政编码(选填)" /></span>\n            </label>\n        </div>\n    </div>\n    \n    <div>\n        <div class="action-container">\n            <a class="js-address-save btn btn-block btn-green">保存</a>\n            <% if(typeof data.id !== \'undefined\' && !cannotDelete) { %>\n            <a class="js-address-delete btn btn-block">删除收货地址</a>\n            <% } %>\n        </div>\n    </div>\n</form>\n'
}), window.zenjs = window.zenjs || {}, function(e) {
    var t = {}, i = {}, s = Array.prototype, n = Object.prototype, o = (Function.prototype, n.toString), a = s.slice, r = s.forEach, d = Object.keys, c = t.each = t.forEach = function(e, s, n) {
        if (null != e)
            if (r && e.forEach === r)
                e.forEach(s, n);
            else if (e.length === +e.length) {
                for (var o = 0, a = e.length; a > o; o++)
                    if (s.call(n, e[o], o, e) === i)
                        return
            } else
                for (var d = t.keys(e), o = 0, a = d.length; a > o; o++)
                    if (s.call(n, e[d[o]], d[o], e) === i)
                        return
    };
    t.keys = d || function(e) {
        if (e !== Object(e))
            throw new TypeError("Invalid object");
        var i = [];
        for (var s in e)
            t.has(e, s) && i.push(s);
        return i
    }, t.extend = function(e) {
        return c(a.call(arguments, 1), function(t) {
            if (t)
                for (var i in t)
                    e[i] = t[i]
        }), e
    }, c(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
        t["is" + e] = function(t) {
            return o.call(t) == "[object " + e + "]"
        }
    }), e._ = e._ || t
}(window.zenjs), define("zenjs/util/_", function() {
}), define("zenjs/regions/cache", ["require", "jquery", "zenjs/util/_"], function(e) {
    function t(e, t) {
        p.each(p.keys(e), t)
    }
    function i(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }
    function s(e, t) {
        var i = new l.Deferred;
        return l.ajax({url: e,dataType: "jsonp",data: t}).then(function(e) {
            0 === e.code ? i.resolve(e.data) : i.reject(e.msg)
        }).fail(function() {
            i.reject("fail")
        }), i.promise()
    }
    function n(e) {
        if (void 0 != e) {
            e += "";
            var t = e.length;
            return "00" == e.slice(-2) ? n(e.slice(0, t - 2)) : e
        }
    }
    function o(e, t) {
        if (void 0 != e) {
            e += "";
            var i = t - e.length;
            if (i > 0)
                for (; i--; )
                    e += "0";
            return e
        }
    }
    function a(e, i) {
        t(e, function(t) {
            i[t] = e[t]
        })
    }
    function r(e, t) {
        var i;
        return t = p.extend({}, t), h && h._beforeStr == e ? void 0 : (i = p.isString(e) ? -1 != e.indexOf("r") ? w.cacheAll(t) : -1 != e.indexOf("c") ? w.cacheProvinceCityList(t) : w.cacheProvinceList(t) : w.cacheProvinceList(t), h = i, h._beforeStr = e, i)
    }
    function d(e, i) {
        var r, d = new l.Deferred;
        if (i = p.extend({}, i), 0 > e)
            return [];
        if (void 0 === e)
            return r = [], t(m.province_list, function(e) {
                r.push({id: e,name: m.province_list[e]})
            }), d.resolve(r), d.promise();
        var c, h = n(e), e = o(e, 6), u = [];
        if (c = y[Math.floor(h.length / 2)], void 0 === c)
            d.resolve(u);
        else if (t(m[c], function(e) {
            e.slice(0, h.length) == h && u.push({id: e,name: m[c][e]})
        }), 0 === u.length) {
            var w = f.list;
            if (void 0 !== v[e])
                return v[e];
            v[e] = d.promise(), s(w, {region_id: e,display_short_name: i["short"] || 0}).then(function(e) {
                a(e, m[c]), t(e, function(t) {
                    u.push({id: t,name: e[t]})
                }), d.resolve(u)
            }).always(function() {
                delete v[e]
            })
        } else
            d.resolve(u);
        return d.promise()
    }
    function c(e, t) {
        return t = p.extend({}, t), h ? h.then(function() {
            return d(e, t)
        }) : d(e, t)
    }
    var l = e("jquery");
    e("zenjs/util/_");
    var h, p = zenjs._, u = _global.url.www + "/common/region", f = {cityList: "/cityList.jsonp",countyList: "/countyList.jsonp",provinceList: "/provinceList.jsonp",provinceCityList: "/provinceCityList.jsonp",list: "/list.jsonp",all: "/all.jsonp"}, m = {}, w = {}, y = ["province_list", "city_list", "county_list"], v = {};
    return t(y, function(e) {
        m[y[e]] = {}
    }), t(f, function(e) {
        f[e] = u + f[e], -1 != ["provinceList", "provinceCityList", "all"].indexOf(e) && (w["cache" + i(e)] = function(t) {
            return t = p.extend({}, t), s(f[e], {display_short_name: t["short"] || 0}).then(function(t) {
                return p.extend(m, "provinceList" == e ? {province_list: t} : t), l.Deferred().resolve(m)
            })
        })
    }), {preload: r,loadList: c}
}), define("wap/components/area/model", ["zenjs/regions/cache"], function(e) {
    var t = function() {
    }, i = Backbone.Model.extend({defaults: {finalCode: 0},initialize: function() {
            return e.preload("pc"), this
        },getList: function(i) {
            i = i || {};
            var s = i.callback || t, n = i.code;
            e.loadList(n).then(_(function(e) {
                s(e)
            }).bind(this))
        }});
    return i
}), define("text!wap/components/area/templates/areaSelect.html", [], function() {
    return '<span>\n	<select id="province" name="province" class="address-province" data-next-type="城市" data-next="city">\n		<option data-code="0" value="省份">选择省份</option>\n	</select>\n</span>\n<span>\n	<select id="city" name="city" class="address-city" data-next-type="区县" data-next="county">\n		<option data-code="0" value="城市">选择城市</option>\n	</select>\n</span>\n<span>\n	<select id="county" name="county" class="address-county">\n		<option data-code="0" value="区县">选择区县</option>\n	</select>\n</span>'
}), define("text!wap/components/area/templates/areaOption.html", [], function() {
    return '<option data-code="0" value="<%= type %>">选择<%= type %></option>\n<% _.each(data, function(value, key, list){ %>\n	<option data-code="<%= value.id %>" value="<%= value.name %>" <%- value.id == selectedValue ? \'selected\' : \'\' %>>\n		<%= value.name %>\n	</option>\n<%}) %>\n\n'
}), define("wap/components/area/main", ["wap/components/area/model", "text!wap/components/area/templates/areaSelect.html", "text!wap/components/area/templates/areaOption.html"], function(e, t, i) {
    var s = function() {
    }, n = Backbone.View.extend({optionTemplate: _.template(i),initialize: function(i) {
            return i = i || {}, this.loadingAddress = !1, this.mobile_system = i.mobile_system, this.areaSelectTpl = i.areaSelectTpl || t, this.model = new e, this
        },events: {"change .address-province, .address-city": "changeArea","change .address-county": "changeCounty"},render: function(e) {
            return e = e || {}, this.$el.append(this.areaSelectTpl), this.defaultCode = e.dfcode, this.nProvince = this.$(".address-province"), this.nCity = this.$(".address-city"), this.nCountry = this.$(".address-county"), "ios" == this.mobile_system && this.$("select").on("touchend", function(e) {
                e.preventDefault()
            }), this.defaultCode ? (this.setArea(this.defaultCode), this) : (this.loadList("province", "省份", 0), this)
        },reset: function(e) {
            switch (e) {
                case "province":
                    this.nCity.html(this.optionTemplate({type: "城市",data: []}));
                case "city":
                    this.nCountry.html(this.optionTemplate({type: "区县",data: []}))
            }
            this.model.set("finalCode", 0)
        },changeCounty: function() {
            var e = this.$(".address-county option:selected").data("code");
            this.model.set("finalCode", e)
        },changeArea: function(e) {
            if (!this.loadingAddress) {
                var t = $(e.target), i = t.find("option:selected").data("code"), s = t.data("next-type"), n = t.attr("id"), o = t.data("next");
                this.reset(n), 0 != i && this.loadList(o, s, 0, i)
            }
        },loadList: function(e, t, i, n, o) {
            this.loadingAddress = !0, o = o || s, this.model.getList({code: n,callback: _(function(s) {
                    this.loadingAddress = !1, this.$(".address-" + e).html(this.optionTemplate({data: s,type: t,selectedValue: i})), o(s)
                }).bind(this)})
        },setArea: function(e) {
            if (e) {
                var t = 1e4 * parseInt(e / 1e4), i = 100 * parseInt(e / 100);
                this.loadList("province", "省份", t, 0, _(function() {
                    this.loadList("city", "城市", i, t, _(function() {
                        this.loadList("county", "区县", e, i), this.model.set("finalCode", e)
                    }).bind(this))
                }).bind(this))
            }
        },getArea: function() {
            return this.model.get("finalCode")
        },isValid: function() {
            var e = function(e, t) {
                motify.log("请选择 " + t), e.addClass("c-red"), e.one("click", function(t) {
                    e.removeClass("c-red")
                })
            };
            return function() {
                return "省份" == this.nProvince.val() ? (e(this.nProvince, "省份"), !1) : "城市" == this.nCity.val() ? (e(this.nCity, "城市"), !1) : "区县" == this.nCountry.val() ? (e(this.nCountry, "区县"), !1) : !0
            }
        }()});
    return n
}), define("wap/components/address/views/logistics_address_edit", ["wap/components/address/model/address", "wap/components/util/number", "text!wap/components/address/templates/addressForm.html", "wap/components/area/main"], function(e, t, i, s) {
    return Backbone.View.extend({template: _.template(i),initialize: function(t) {
            var i = function() {
            };
            window.Utils.makeRandomString();
            this.ajaxType = t.type, this.model = t.model ? t.model : new e, this.doNotSavetoServer = t.doNotSavetoServer, this.cannotDelete = t.cannotDelete, this.onCancelAddAddress = _(function(e) {
                t.onHide(), (t.onCancelAddAddress || i)(e)
            }).bind(this), this.onFinishEditAddress = _(function(e) {
                e = e || {}, t.onHide(), (t.onFinishEditAddress || i)({address_model: e.model,autoPopup: this.autoPopup})
            }).bind(this), this.autoPopup = t.autoPopup === !0, this.listenTo(this.model, "invalid", this.error)
        },events: {"click .js-address-cancel": "onCancelAddress","click .js-address-save": "onSaveClicked","click .js-address-delete": "onDeleteClicked"},render: function() {
            return this.$el.html(this.template({data: this.model.toJSON(),cannotDelete: this.cannotDelete})), this.areaBrainView = new s({el: $(".js-area-select"),mobile_system: window._global.mobile_system}).render({dfcode: this.model.get("area_code")}), this
        },onSaveClicked: function() {
            var e = this, t = $("[name=id]", this.$el), i = this.model.attributes;
            if (_.each(i, function(t, i) {
                e.model.set(i, $("[name=" + i + "]", e.$el).val() || "")
            }), this.model.set("id", t.length > 0 ? t.val() : ""), this.model.isValid()) {
                if (!this.areaBrainView.isValid())
                    return;
                if (this.model.set("area_code", this.areaBrainView.getArea()), this.doNotSavetoServer)
                    return void this.onFinishEditAddress({model: this.model});
                this.model.update(i, this.ajaxType).done(function(t) {
                    var i = JSON.parse(t);
                    0 == i.code ? (i.data.id !== !0 && 1 !== i.data.id && e.model.set("id", i.data.id), e.onFinishEditAddress({model: e.model})) : motify.log("更新收货地址失败")
                }).fail(function() {
                    motify.log("更新收货地址失败")
                })
            }
        },onCancelAddress: function() {
            confirm("确定要放弃此次编辑嘛？") && this.onCancelAddAddress({autoPopup: this.autoPopup})
        },onDeleteClicked: function(e) {
            e.stopPropagation();
            var t = this;
            if (confirm("确定要删除这个收获地址么？")) {
                var i = $("[name=id]", this.$el).val();
                this.model.destroy({processData: !0,data: {id: i},wait: !0,success: function(e, i, s) {
                        return i = i || {}, t.onFinishEditAddress(), !0
                    },error: function() {
                        motify.log("删除失败。。。")
                    }})
            }
        },error: function(e, t) {
            return "area_code" == t.name ? void this.areaBrainView.isValid() : (motify.log(t.msg), void this.$el.find('input[name="' + t.name + '"]').focus())
        }})
}), define("zenjs/backbone/base_view", ["zenjs/core/trigger_method"], function(e) {
    return Backbone.View.extend({clean: function() {
            return this.stopListening(), this
        },triggerMethod: e})
}), define("zenjs/list/list", ["zenjs/backbone/base_view"], function(e) {
    var t = function() {
    };
    return e.extend({initialize: function(e) {
            return this.options = e = e || {}, this.items = [], this.itemView = e.itemView, this.itemOptions = e.itemOptions || {}, this.collection = e.collection, this.onAfterListChange = e.onAfterListChange || t, this.onAfterListLoad = e.onAfterListLoad || t, this.onAfterListDisplay = e.onAfterListDisplay || t, this.onListEmpty = e.onListEmpty || e.onEmptyList || this._onListEmpty, this.onItemClick = e.onItemClick || t, this.onViewItemAdded = e.onViewItemAdded || t, this.displaySize = e.displaySize || -1, this.emptyHTML = e.emptyHTML || "", this.emptyText = e.emptyText || "列表为空", this
        },render: function(e) {
            return this.displaySize = -1 == (e || {}).displaySize ? -1 : this.displaySize, this.clean(), this._setupListeners(), this.addAll(), this.onAfterListDisplay({list: this.collection}), this
        },fetchRender: function(e) {
            return this.collection.fetch({data: e,success: _(function(e, t) {
                    this.render(), this.onAfterListLoad(this.collection, t), this.onFetchSuccess && this.onFetchSuccess()
                }).bind(this)}), this
        },_setupListeners: function() {
            this.collection && (this.stopListening(this.collection), this.listenTo(this.collection, "add", this.addItem, this), this.listenTo(this.collection, "reset sort", this.render, this), this.listenTo(this.collection, "remove", this.onItemRemoved, this))
        },addItemListeners: function(e) {
            var t = this;
            this.listenTo(e, "all", function() {
                var t = "item:" + arguments[0], i = _.toArray(arguments);
                i.splice(0, 1), i.unshift(t, e), this.trigger.apply(this, i), "item:click" == t && this.onItemClick()
            }), this.listenTo(e.model, "change", function() {
                t.onAfterListChange({list: this.collection})
            })
        },addAll: function() {
            0 === this.collection.length ? this.fetching || this.triggerMethod("list:empty") : this.collection.each(function(e) {
                this.addItem(e)
            }, this)
        },removeAll: function() {
            for (var e = this.items.length - 1; e >= 0; e--)
                this.removeView(this.items[e]);
            this.onAfterListChange({list: this.collection})
        },addItem: function(e) {
            if (!(this.displaySize >= 0 && this.items.length >= this.displaySize)) {
                1 == this.collection.length && (this.listEl || this.$el).html("");
                var t = new this.itemView(_.extend({}, this.options.itemOptions, {model: e,index: this.collection.indexOf(e)}));
                return this.items.push(t), this.addItemListeners(t), t.render(), this.onViewItemAdded({list: this.items,viewItem: t}), (this.listEl || this.$el).append(t.el), t
            }
        },removeItem: function(e) {
            var t = this.getViewByModel(e);
            t && this.removeView(t)
        },removeView: function(e) {
            var t;
            this.stopListening(e), e && (this.stopListening(e.model), e.remove(), t = this.items.indexOf(e), this.items.splice(t, 1)), 0 === this.collection.length && (this.fetching || this.triggerMethod("list:empty"))
        },onItemRemoved: function(e) {
            this.onAfterListChange({list: this.collection,action: "remove",model: e}), this.removeItem(e)
        },getViewByModel: function(e) {
            return _.find(this.items, function(t, i) {
                return t.model === e
            })
        },dispatchEventToAllViews: function(e, t) {
            for (var i = this.items.length - 1; i >= 0; i--)
                this.items[i].trigger(e, t)
        },remove: function() {
            e.prototype.remove.call(this, arguments), this.removeAll(), this.collection.reset(), delete this.collection
        },clean: function() {
            e.prototype.clean.call(this, arguments), this.removeAll(), (this.listEl || this.$el).html(""), this.stopListening(this.collection)
        },_onListEmpty: function() {
            this.$el.html(this.emptyHTML || (this.emptyText ? '<p style="text-align:center;line-height:60px;">' + this.emptyText + "</p>" : ""))
        }})
}), define("text!wap/components/address/templates/addressItem.html", [], function() {
    return '<div id="js-address-item-<%= data.id %>" class="js-address-item block-item <%= data.selected %>">\n    <div class="icon-check"></div>\n    <p>\n        <% if(typeof(data.name)!== \'undefined\'){ %>\n            <%= data.name %>, <%= data.tel %>\n        <% } else if(typeof(data.user_name)!== \'undefined\'){ %>\n            <%= data.user_name %>, <%= data.tel %>\n        <% } %>\n    </p>\n    <span class="address-str address-str-sf"><%= data.province %><%= data.city %><%= data.county %><%= data.address_detail %></span>\n    <div class="address-opt <% if( data.address_type==\'express\'){ %> js-edit-address <% } %>">\n        <% if( data.address_type==\'express\'){ %>\n            <i class="icon_circle-info">i</i>\n        <% } %>\n    </div>\n</div>\n'
}), define("wap/components/pop", ["zenjs/events", "wap/components/util/number"], function(e) {
    var t = function() {
    };
    window.zenjs = window.zenjs || {};
    var i = e.extend({init: function(e) {
            this._window = $(window);
            var i = window.Utils.makeRandomString();
            $("body").append('<div id="' + i + '"                 style="display:none; height: 100%;                 position: fixed; top: 0; left: 0; right: 0;                background-color: rgba(0, 0, 0, ' + (e.transparent || ".9") + ');z-index:1000;opacity:0;transition: opacity ease 0.2s;"></div>'), this.nBg = $("#" + i), this.nBg.on("click", $.proxy(function() {
                this.isCanNotHide || this.hide()
            }, this));
            var s = window.Utils.makeRandomString();
            $("body").append('<div id="' + s + '" class="' + (e.className || "") + '" style="overflow:hidden;visibility: hidden;"></div>'), this.nPopContainer = $("#" + s), this.nPopContainer.hide(), e.contentViewClass && (this.contentViewClass = e.contentViewClass, this.contentViewOptions = $.extend({el: this.nPopContainer}, e.contentViewOptions || {}), this.contentView = new this.contentViewClass($.extend({onHide: $.proxy(this.hide, this)}, this.contentViewOptions)), this.contentView.onHide = $.proxy(this.hide, this)), this.animationTime = e.animationTime || 300, this.isCanNotHide = e.isCanNotHide, this.doNotRemoveOnHide = e.doNotRemoveOnHide || !1, this.onShow = e.onShow || t, this.onHide = e.onHide || t, this.onFinishHide = e.onFinishHide || t, this.html = e.html
        },render: function(e) {
            return this.renderOptions = e || {}, this.contentViewClass ? this.contentView.render(this.renderOptions) : this.html && this.nPopContainer.html(this.html), this
        },show: function() {
            return this.top = this._window.scrollTop(), this.nBg.show().css({opacity: "1","transition-property": "none"}), this.nPopContainer.show(), setTimeout($.proxy(function() {
                this._window.scrollTop(0), this.startShow(), this.nPopContainer.show().css("visibility", "visible"), this._doShow && this._doShow(), this.onShow()
            }, this), 200), this
        },hide: function() {
            var e, t = function() {
                return e !== this._window.scrollTop() ? (this._window.scrollTop(e), void setTimeout($.proxy(t, this))) : void setTimeout($.proxy(this.onFinishHide, this), 50)
            };
            return function(i) {
                i = i || {};
                var s = i.doNotRemove || this.doNotRemoveOnHide || !1;
                this._doHide && this._doHide(), setTimeout($.proxy(function() {
                    this.startHide(), e = this.top, this._window.scrollTop(e), $.proxy(t, this)(), this.nBg.css({opacity: 0,"transition-property": "opacity"}), setTimeout($.proxy(function() {
                        this.nBg.hide(), this.nPopContainer.hide(), s || this.destroy(), window.zenjs.popList.length < 1 && $("html").css("position", this.htmlPosition)
                    }, this), 200)
                }, this), this.animationTime), this.onHide()
            }
        }(),destroy: function() {
            return this.nPopContainer.remove(), this.nBg.remove(), this.contentView && this.contentView.remove(), this
        },startShow: function() {
            var e = window.zenjs.popList;
            if (e || (e = window.zenjs.popList = []), 0 === e.length) {
                var t = $("body"), i = $("html");
                this.htmlPosition = i.css("position"), i.css("position", "relative"), this.bodyCss = (t.attr("style") || {}).cssText, this.htmlCss = (i.attr("style") || {}).cssText, $("body,html").css({overflow: "hidden",height: this._window.height()})
            }
            e.indexOf(this) < 0 && e.push(this)
        },startHide: function() {
            var e = window.zenjs.popList, t = e.indexOf(this);
            t > -1 && e.splice(t, 1), e.length < 1 && ($("html").attr("style", this.htmlCss || ""), $("body").attr("style", this.bodyCss || ""))
        }});
    return i
}), define("wap/components/popup", ["wap/components/pop"], function(e) {
    var t = e.extend({init: function(e) {
            this._super(e), this.onClickBg = e.onClickBg || function() {
            }, this.onBeforePopupShow = e.onBeforePopupShow || function() {
            }, this.onAfterPopupHide = e.onAfterPopupHide || function() {
            }, this.nPopContainer.css(_.extend({left: 0,right: 0,bottom: 0,background: "white"}, e.containerCss || {})), this.nPopContainer.css("opacity", "0")
        },_doShow: function() {
            this.contentView && this.contentView.height ? this.height = this.contentView.height() : this.contentView || (this.height = this.nPopContainer.height()), this.onBeforePopupShow(), $(".js-close").click($.proxy(function(e) {
                this.hide()
            }, this)), this.nPopContainer.css({height: this.height + "px",transform: "translate3d(0,100%,0)","-webkit-transform": "translate3d(0,100%,0)",opacity: 0,position: "absolute","z-index": 1e3}), this.bodyPadding = $("body").css("padding"), $("body").css("padding", "0px"), setTimeout($.proxy(function() {
                this.nPopContainer.css({transform: "translate3d(0,0,0)","-webkit-transform": "translate3d(0,0,0)","-webkit-transition": "all ease " + this.animationTime + "ms",transition: "all ease " + this.animationTime + "ms",opacity: 1})
            }, this)), setTimeout($.proxy(function() {
                this.contentView && this.contentView.onAfterPopupShow && this.contentView.onAfterPopupShow()
            }, this), this.animationTime)
        },_doHide: function(e) {
            this.nPopContainer.css({transform: "translate3d(0,100%,0)","-webkit-transform": "translate3d(0,100%,0)",opacity: 0}), setTimeout($.proxy(function() {
                $("body").css("padding", this.bodyPadding), this.onAfterPopupHide()
            }, this), this.animationTime)
        }});
    return t
}), define("wap/components/address/views/logistics_address_list", ["wap/components/address/model/address", "wap/components/address/views/logistics_address_edit", "zenjs/list/list", "text!wap/components/address/templates/addressItem.html", "wap/components/popup"], function(e, t, i, s, n) {
    var o = Backbone.View.extend({initialize: function(e) {
            this.addressType = e.addressType || "self-fetch", this.template = _.template(e.itemTemplateHtml || ""), this.onItemClick = e.onItemClick || function() {
            }, this.highLightItem = e.highLightItem || function() {
            }
        },events: {click: "onClick","click .js-edit-address": "onEditClicked"},onClick: function(e) {
            var t = $(e.target);
            t.hasClass("js-edit-address") || t.hasClass("icon_circle-info") || this.onItemClick({address: this.model.toJSON(),addressType: this.addressType})
        },onEditClicked: function() {
            var e = function() {
                this.render(), this.highLightItem()
            };
            return function(i) {
                new n({contentViewClass: t,contentViewOptions: {onFinishEditAddress: _(e).bind(this),model: this.model,type: "PUT"},containerCss: {bottom: 0,left: 0,right: 0,background: "white"}}).render().show()
            }
        }(),render: function() {
            return this.$el.html(this.template({data: _.extend(this.model.toJSON(), {address_type: this.addressType})})), this
        }});
    return Backbone.View.extend({initialize: function(e) {
            this.template = _.template(e.templateHtml || ""), this.addressType = e.addressType, this.autoPopup = e.autoPopup, this.selectedAddress = e.selectedAddress, this._doHide = function() {
                e.onHide()
            }, this.onAddressChange = e.onAddressChange || function() {
            }, this.onCancel = e.onCancel || function() {
            }, e.collection.comparator = function(e, t) {
                return t.id - e.id
            }, this.listOpt = {itemView: o,finishedHTML: " ",collection: e.collection,itemOptions: {addressType: e.addressType,itemTemplateHtml: s,onItemClick: _(this.onItemClick).bind(this),highLightItem: _(this.highLight).bind(this)},onAfterListDisplay: _(this.onAfterListDisplay).bind(this),onAfterListChange: _(this.onAfterListChange).bind(this)}
        },events: {"click .js-cancel": "onCancelClicked","click .js-add-address": "onAddAddressClicked"},onAfterListChange: function(e) {
            this.onAfterListDisplay(e)
        },onAfterListDisplay: function(e) {
            this.highLight(this.selectedAddress)
        },onItemClick: function(e) {
            this.hide(), this.onAddressChange(e), this.selectedAddress = e.address
        },onCancelClicked: function(e) {
            this.onCancel(this.addressType), this.hide()
        },onAddAddressClicked: function() {
            var i = function(e) {
                e && (this.collection.add(e.address_model), this.selectedAddress = e.address_model, this.onAddressChange({address: e.address_model.toJSON()}), e.autoPopup ? this.hide() : this.render().show())
            }, s = function(e) {
                0 === this.listOpt.collection.length ? this.hide() : this._doShow()
            };
            return function(o) {
                new n({contentViewClass: t,contentViewOptions: {onFinishEditAddress: _(i).bind(this),onCancelAddAddress: _(s).bind(this),type: "POST",autoPopup: (o || {}).autoPopup,model: o.selectedAddress ? new e(o.selectedAddress) : null,cannotDelete: o.cannotDelete},containerCss: {bottom: 0,left: 0,right: 0,background: "white"}}).render().show()
            }
        }(),render: function() {
            return this.$el.html(this.template({address_type: this.addressType})), this.listOpt.el = this.$(".js-address-container"), this.addressListView = new i(this.listOpt), this.listOpt.collection.length > 0 ? this.addressListView.render() : this.addressListView.fetchRender(), this
        },show: function(e) {
            e = e || {}, this._doShow(e.selectedAddress), "express" == this.addressType && 0 === this.listOpt.collection.length && this.onAddAddressClicked(_.extend(e, {cannotDelete: !0,autoPopup: !0}))
        },highLight: function(e) {
            var t = e || this.selectedAddress || {};
            this.$(".address-selected").removeClass("address-selected"), this.$("#js-address-item-" + t.id).addClass("address-selected")
        },_doShow: function(e) {
            this.highLight(e), Backbone.EventCenter.trigger("address_list:show")
        },hide: function(e) {
            this._doHide(), Backbone.EventCenter.trigger("address_list:hide")
        }})
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {getRecentlyUsedAddress: function() {
        var e = null;
        if (window.localStorage) {
            var t = $.trim(window.localStorage.getItem("recently_used_address"));
            if (-1 !== t.indexOf("undefined") && (window.localStorage.removeItem("recently_used_address"), t = ""), t)
                try {
                    e = $.parseJSON(t)
                } catch (i) {
                }
        }
        return e
    },saveLastUsedAddress: function(e) {
        if (!e || !e.user_name)
            return !1;
        var t = JSON.stringify(e);
        if (window.localStorage)
            try {
                window.localStorage.setItem("recently_used_address", t)
            } catch (i) {
            }
    },wx2KdtAddress: function(e) {
        if (!e)
            return null;
        if (!e.userName && e.user_name)
            return e;
        var t = {user_name: e.userName,province: e.proviceFirstStageName,city: e.addressCitySecondStageName,county: e.addressCountiesThirdStageName,address_detail: e.addressDetailInfo,tel: e.telNumber,postal_code: e.addressPostalCode,is_weixin: !0};
        return t
    },kdt2WxAddress: function(e) {
        if (!e)
            return null;
        if (!e.user_name && e.userName)
            return e;
        var t = {userName: e.user_name,proviceFirstStageName: e.province,addressCitySecondStageName: e.city,addressCountiesThirdStageName: e.county,addressDetailInfo: e.address_detail,telNumber: e.tel,addressPostalCode: e.postal_code};
        return t
    },getPureAddressData: function(e) {
        if (!e || !e.userName)
            return !1;
        var t = {userName: e.userName,proviceFirstStageName: e.proviceFirstStageName,addressCitySecondStageName: e.addressCitySecondStageName,addressCountiesThirdStageName: e.addressCountiesThirdStageName,addressDetailInfo: e.addressDetailInfo,telNumber: e.telNumber,addressPostalCode: e.addressPostalCode,area_code: e.nationalCode};
        return t
    },getPureKdtAddressData: function(e) {
        return e && e.userName ? {user_name: e.userName,province: e.proviceFirstStageName,city: e.addressCitySecondStageName,county: e.addressCountiesThirdStageName,address_detail: e.addressDetailInfo,tel: e.telNumber,postal_code: e.addressPostalCode,area_code: e.nationalCode} : !1
    },flashAnimate: function(e) {
        e.addClass("animated flashWarn"), window.setTimeout(function() {
            e.removeClass("flashWarn")
        }, 1e3)
    },getTpl: function(e) {
        var t = $(e);
        return t ? _.template(t.html()) : void 0
    }}), define("wap/components/util/address", function() {
}), define("text!wap/components/address/templates/addressPanel.html", [], function() {
    return '<div class="block block-form block-border-top-none block-border-bottom-none">\n    <div class="js-edit-address js-order-address express-panel express-panel-edit" style="padding-left:0;">\n        <ul class="express-detail">\n            <li class="clearfix"><span class="name">\n                <% if(data.address_type !== \'self-fetch\'){ %>\n                    收货人：\n                <% } else if(data.address_type == \'self-fetch\') { %>\n                    自提点：\n                <% } %>\n                <% if(typeof(data.address.name)!== \'undefined\'){ %>\n                    <%= data.address.name %>\n                <% } else if(typeof(data.address.user_name)!== \'undefined\'){ %>\n                    <%= data.address.user_name %>\n                <% } %>\n            </span><span class="tel"><%= data.address.tel %></span></li>\n            <li class="address-detail">\n                <% if(data.address_type !== \'self-fetch\'){ %>\n                    收货地址：\n                <% } else if(data.address_type == \'self-fetch\') { %>\n                    提货地址：\n                <% } %>\n                <%= data.address.province %><%= data.address.city %><%= data.address.county %><%= data.address.address_detail %>\n            </li>\n        </ul>\n    </div>\n\n    <% if(data.address_type==\'self-fetch\'){ %>\n        <div class="clearfix block-item  <% if( data.order_state > 2) { %> self-fetch-info-show <% } %>">\n            <label>预约人</label>\n            <input  class="txt txt-black ellipsis js-name" placeholder="到店人姓名" value="<%= data.address.user_name %>" <% if( data.order_state > 2) { %> readonly="readonly"<% } %>>\n        </div>\n        <div class="clearfix block-item  <% if( data.order_state > 2) { %> self-fetch-info-show <% } %>">\n            <label>联系方式</label>\n            <input  type=\'text\' class="txt txt-black ellipsis js-phone" placeholder="用于短信接收和便于卖家联系" value="<%= data.address.user_tel %>" <% if( data.order_state > 2) { %> readonly="readonly"<% } %>>\n        </div>\n        <div class="clearfix block-item  <% if( data.order_state > 2) { %> self-fetch-info-show <% } %>">\n            <label class="pull-left">预约时间</label>\n            <input style="width:105px" class="txt txt-black js-time pull-left date-time" type="date" placeholder="日期" value="<%= data.address.user_time.split(\' \')[0] || \'\' %>"  <% if( data.order_state > 2) { %> readonly="readonly"<% } %>/>\n            <input style="width:70px" class="txt txt-black js-time pull-left date-time" type="time" placeholder="时间" value="<%= data.address.user_time.split(\' \')[1] || \'\' %>"  <% if( data.order_state > 2) { %> readonly="readonly"<% } %>/>\n        </div>\n    <% } %>\n</div>\n <% if( data.address_type == \'express\' ){ %>\n    <div class=\'js-logistics-tips logistics-tips font-size-12 c-orange hide\'>很抱歉，该地区暂不支持配送。</div>\n<% } %>\n';
}), define("text!wap/components/address/templates/noAddressPanel.html", [], function() {
    return '<div class="js-order-address express-panel express-panel-no">\n    <div class="js-edit-address empty-address-tip"><span>添加收货地址</span></div>\n</div>\n'
}), define("text!wap/components/address/templates/addressList.html", [], function() {
    return '<div class="js-scene-address-list">\n    <div class="address-ui address-list">\n        <h4 class="address-title"><%= address_type == \'express\' ? \'选择收货地址\' : \'选择自提地址\' %></h4>\n        <div class="cancel-img js-cancel"></div>\n\n        <div class="js-address-container address-container"> </div>\n        <% if(address_type==\'express\'){ %>\n        <div class=\'action-container js-add-address\'>\n            <span class="icon_add"></span>\n            <a class="add-address" href="javascript:;">新增地址</a>\n            <span class="icon_arrow-right"></span>\n        </div>\n        <% } %>\n    </div>\n</div>'
}), define("wap/components/address/views/logistics_express", ["wap/components/address/model/address", "wap/components/address/collection/express_address_collection", "wap/components/address/views/logistics_address_edit", "wap/components/address/views/logistics_address_list", "wap/components/util/address", "text!wap/components/address/templates/addressPanel.html", "text!wap/components/address/templates/noAddressPanel.html", "text!wap/components/address/templates/addressList.html", "wap/components/popup"], function(e, t, i, s, n, o, a, r, d) {
    var c = function() {
    };
    return Backbone.View.extend({initialize: function(e) {
            e = e || {}, e.expressOptions = e.expressOptions || {}, a = e.expressOptions.noAddressPanelTpl || a, o = e.expressOptions.addressPanelTpl || o, this.notAutoPopAddress = e.expressOptions.notAutoPopAddress, this.saveAddressToServer = e.expressOptions.saveAddressToServer, this.saveAddressUrl = e.expressOptions.saveAddressUrl, this.expressOptions = e.expressOptions || {}, this.notAutoPopAddress = this.expressOptions.notAutoPopAddress, this.allow_self_fetch = e.allow_self_fetch, this.address = window._global.expressAddress, this.areaModel = e.areaModel, this.onAddressChanged = e.onAddressChanged || c, this.not_saveToSever = e.not_saveToSever, this.order_state = window._global.order_state, this.template = _.template(o), this.hasAddress() && 0 === window._global.expressType ? this.doNotSaveToServerNextTime = !0 : this.address = Utils.getRecentlyUsedAddress(), this.addressCollection = new t(window._global.address_list || [])
        },events: {"click .js-edit-address": "onChangeAddress"},onChangeAddress: function(t) {
            if (!(this.order_state >= 3)) {
                if (window._global.no_user_login)
                    return void (this.addressEditView = new d({contentViewClass: i,contentViewOptions: {onFinishEditAddress: _(this.onFinishEditAddress).bind(this),model: this.address ? new e(this.address) : null,doNotSavetoServer: !0,cannotDelete: !0,areaModel: this.areaModel},containerCss: {bottom: 0,left: 0,right: 0,background: "white"}}).render().show());
                this.addressListView = new d({contentViewClass: s,contentViewOptions: {templateHtml: r,addressType: "express",collection: this.addressCollection,onAddressChange: _(this.onAddressChange).bind(this),autoPopup: (t || {}).autoPopup,selectedAddress: this.address,areaModel: this.areaModel},containerCss: {bottom: 0,left: 0,right: 0,background: "white"}}).render().show(), this.addressListView.contentView.show(_.extend({selectedAddress: this.address}, t))
            }
        },onFinishEditAddress: function(e) {
            this.address = e.address_model.toJSON(), this.saveAddressToLocal(this.address), this.render()
        },saveAddressToLocal: function(e) {
            Utils.saveLastUsedAddress(e)
        },onAddressChange: function(e) {
            this.address = e.address, this.saveAddressToServer && !this.not_saveToSever ? this.doSaveAddressToServer(this.address, "express") : this.$el.html(this.template({data: {address: this.address,address_type: "express"},getEllipsis: this.getEllipsis})), this.saveAddressToLocal(this.address)
        },hasAddress: function() {
            return !!this.address && !!this.address.user_name
        },getAddress: function() {
            return this.address
        },render: function(e) {
            return this.show(e), this
        },show: function(e) {
            if (e = e || {}, e.order_state && (this.order_state = e.order_state), this.$el.removeClass("hide"), this.hasAddress())
                this.$el.html(this.template({data: {address: this.address,address_type: "express"},getEllipsis: this.getEllipsis})), e.not_saveToSever || this.not_saveToSever ? Backbone.EventCenter.trigger("address:change") : this.saveAddressToServer && this.doSaveAddressToServer(this.address, "express");
            else {
                var t = _.template(a);
                if (this.$el.html(t()), "self-fetch" === e.from)
                    return;
                this.notAutoPopAddress || this.allow_self_fetch || this.onChangeAddress({autoPopup: !0})
            }
            this.order_state >= 3 && this.$(".js-edit-address").removeClass("express-panel-edit").removeClass("js-edit-address")
        },getEllipsis: function(e, t) {
            return !e || e.length <= t ? e : e.substring(0, t - 2) + "..."
        },showTips: function() {
            $(".js-logistics-tips").removeClass("hide"), $(".js-express").addClass("no-border-bottom")
        },hideTips: function() {
            $(".js-logistics-tips").addClass("hide"), $(".js-express").removeClass("no-border-bottom")
        },doSaveAddressToServer: function(e, t) {
            var i = this;
            return i.cannotDeliver = !1, i.hideTips(), Backbone.EventCenter.trigger("address:beforeExpressSend"), this.doNotSaveToServerNextTime ? (this.doNotSaveToServerNextTime = !1, Backbone.EventCenter.trigger("address:has"), void this.onAddressChanged({logisticsWay: "express",isResetPriceData: !1})) : (i.sendingToServer = !0, void $.ajax({url: i.saveAddressUrl,type: "POST",dataType: "json",timeout: 15e3,data: _.extend({is_weixin: !1}, e, {order_no: window._global.order_no,kdt_id: window._global.kdt_id}),success: function(s) {
                    var n = s.code, o = s.data;
                    0 === n ? (i.$el.html(i.template({data: {address: e,address_type: t},getEllipsis: i.getEllipsis})), Backbone.EventCenter.trigger("address:change"), i.onAddressChanged({logisticsWay: "express",isResetPriceData: !0,data: o})) : 10600 === n ? (i.$el.html(i.template({data: {address: e,address_type: t},getEllipsis: i.getEllipsis})), i.showTips(), i.cannotDeliver = !0) : motify.log(s.msg)
                },error: function(e, t, i) {
                    motify.log("更新收货地址失败")
                },complete: function() {
                    i.sendingToServer = !1
                }}))
        }})
}), define("wap/trade/confirm/view/logistics_express_kdt", ["wap/components/address/views/logistics_express"], function(e) {
    return e.extend({doSaveAddressToServer: function(e, t) {
            var i = this;
            i.cannotDeliver = !1, i.hideTips();
            var s = _.extend({is_weixin: !1}, e, {order_no: window._global.order_no,kdt_id: window._global.kdt_id}), n = {address: s};
            return Backbone.EventCenter.trigger("address:beforeExpressSend", n), this.doNotSaveToServerNextTime ? (this.doNotSaveToServerNextTime = !1, Backbone.EventCenter.trigger("address:has"), void this.onAddressChanged({logisticsWay: "express",isResetPriceData: !1})) : (i.sendingToServer = !0, void $.ajax({url: window._global.url.trade + "/trade/order/address.json",type: "POST",dataType: "json",timeout: 15e3,data: n,success: function(s) {
                    var n = s.code, o = s.data;
                    0 === n ? (i.$el.html(i.template({data: {address: e,address_type: t}})), Backbone.EventCenter.trigger("address:change", [o]), i.onAddressChanged({logisticsWay: "express",isResetPriceData: !0,data: o})) : 10600 === n ? (i.$el.html(i.template({data: {address: e,address_type: t}})), i.showTips(), i.cannotDeliver = !0) : 3e4 === n ? Backbone.EventCenter.trigger("address:book:error", o) : motify.log(s.msg)
                },error: function(e, t, i) {
                    motify.log("更新收货地址失败")
                },complete: function() {
                    i.sendingToServer = !1
                }}))
        }})
}), define("wap/trade/confirm/view/logistics_express_wx", ["wap/trade/confirm/view/logistics_express_kdt", "wap/components/util/address"], function(e, t) {
    return e.extend({onChangeAddress: function(e) {
            !wxReady || window._global.order_state >= 3 || wxReady(_(function() {
                window.WeixinJSBridge && window.WeixinJSBridge.invoke("editAddress", window._global.address_token, _(function(e) {
                    var t = e.err_msg;
                    if ("edit_address:ok" == t) {
                        var i = Utils.getPureKdtAddressData(e);
                        i ? (this.address = i, this.doSaveAddressToServer(this.address, "express"), this.saveAddressToLocal(this.address)) : motify.log("地址数据错误")
                    } else if ("access_control:not_allow" === t)
                        return void this.trigger("wx-address:error")
                }).bind(this))
            }).bind(this))
        }})
}), define("wap/components/address/collection/selffetch_address_collection", ["wap/components/address/model/address"], function(e) {
    return Backbone.Collection.extend({model: e,url: "/v2/trade/selffetch/list.json",parse: function(e) {
            var t = (e || {}).data || {};
            this.total = parseInt(t.total);
            var i = (t || {}).list || [];
            return this.total >= 0 || (this.total = i.length), i
        }})
}), define("wap/components/address/views/logistics_selffetch", ["wap/components/address/collection/selffetch_address_collection", "wap/components/address/views/logistics_address_list", "text!wap/components/address/templates/addressPanel.html", "text!wap/components/address/templates/addressList.html", "wap/components/popup"], function(e, t, i, s, n) {
    return Backbone.View.extend({template: _.template(i),initialize: function(t) {
            t = t || {}, this.address = window._global.selffetchAddress, this.order_state = window._global.order_state, this.not_saveToSever = t.not_saveToSever, this.onAddressChanged = t.onAddressChanged || _f, this.selffetchCollection = new e
        },events: {"click .js-edit-address": "onEditSelfFetchClicked"},onEditSelfFetchClicked: function(e) {
            this.selfFetchAddressListView = new n({contentViewClass: t,contentViewOptions: {templateHtml: s,addressType: "self-fetch",collection: this.selffetchCollection,onAddressChange: _(this.onAddressChange).bind(this),onCancel: _(this.onCancelAddressSelect).bind(this),selectedAddress: this.address},containerCss: {bottom: 0,left: 0,right: 0,background: "white"}}).render().show(), this.selfFetchAddressListView.contentView.show({selectedAddress: this.address})
        },onAddressChange: function() {
            var e = function() {
                var e = new Date;
                return e.setDate(e.getDate() + 1), e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e.toJSON().slice(0, 10) + " " + e.toJSON().slice(11, 16)
            };
            return function(t) {
                t = t || {};
                var i = this;
                return this.address = t.address || {}, this.address.user_time = this.address.user_time || e(), this.$el.html(this.template({data: {address: this.address,address_type: "self-fetch",order_state: this.order_state}})), Backbone.EventCenter.trigger("address:beforeExpressSend"), t.not_saveToSever || this.not_saveToSever ? void Backbone.EventCenter.trigger("address:change") : void $.ajax({url: "/v2/trade/selffetch/order.json",type: "POST",dataType: "json",timeout: 5e3,data: {order_no: window._global.order_no,express_type: t.address.id,address: this.address},beforeSend: function() {
                    },success: function(e) {
                        e && 0 == e.code ? (Backbone.EventCenter.trigger("address:change"), i.onAddressChanged({logisticsWay: "self-fetch",isResetPriceData: !0,data: e.data})) : motify.log("地址切换失败，重试一下~" + e.msg)
                    },error: function(e, t, i) {
                    },complete: function(e, t) {
                    }})
            }
        }(),onCancelAddressSelect: function(e) {
            return this.address && 0 !== this.address.length ? void 0 : (this.trigger("no-address:cancel", {addressType: "self-fetch",from: "self-fetch"}), this)
        },render: function() {
            return this.show(), this
        },show: function(e) {
            return e = e || {}, e.order_state && (this.order_state = e.order_state, this.address.user_time = this.address.user_time || e.user_time, this.address.user_tel = this.address.user_tel || e.user_tel, this.address.user_name = this.address.user_name || e.user_name), this.$el.removeClass("hide"), this.address && 0 !== this.address.length ? (this.onAddressChange({address: this.address,not_saveToSever: e.not_saveToSever}), void (this.order_state >= 3 && this.$(".js-edit-address").removeClass("express-panel-edit").removeClass("js-edit-address"))) : (this.onEditSelfFetchClicked(), this)
        }})
}), define("wap/trade/confirm/view/logistics_selffetch_kdt", ["wap/components/address/views/logistics_selffetch"], function(e) {
    return e.extend({onAddressChange: function() {
            var e = function() {
                var e = new Date;
                return e.setDate(e.getDate() + 1), e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e.toJSON().slice(0, 10) + " " + e.toJSON().slice(11, 16)
            };
            return function(t) {
                t = t || {};
                var i = this;
                this.address = t.address || {}, this.address.user_time = this.address.user_time || e(), this.$el.html(this.template({data: {address: this.address,address_type: "self-fetch",order_state: this.order_state}}));
                var s = {order_no: window._global.order_no,express_type: t.address.id,address: this.address}, n = {address: s};
                return Backbone.EventCenter.trigger("address:beforeExpressSend", n), t.not_saveToSever || this.not_saveToSever ? void Backbone.EventCenter.trigger("address:change") : void $.ajax({url: "/v2/trade/selffetch/book.json",type: "POST",dataType: "json",timeout: 5e3,data: n,beforeSend: function() {
                    },success: function(e) {
                        var t = e.code;
                        e && 0 == e.code ? (Backbone.EventCenter.trigger("address:change"), i.onAddressChanged({logisticsWay: "self-fetch",isResetPriceData: !0,data: e.data})) : 3e4 === t ? Backbone.EventCenter.trigger("address:book:error", e.data || {}) : motify.log("地址切换失败，重试一下~" + e.msg)
                    },error: function(e, t, i) {
                    },complete: function(e, t) {
                    }})
            }
        }()})
}), define("wap/components/address/config", [], function() {
    var e = window._global;
    return {permissions: {wxAddress: e.wxaddress_env,wxPay: e.wxpay_env}}
}), define("wap/components/address/views/logistics_express_wx", ["wap/components/address/views/logistics_express", "wap/components/util/address"], function(e, t) {
    return e.extend({onChangeAddress: function(e) {
            !wxReady || window._global.order_state >= 3 || wxReady(_(function() {
                window.WeixinJSBridge && window.WeixinJSBridge.invoke("editAddress", window._global.address_token, _(function(e) {
                    var t = e.err_msg;
                    if ("edit_address:ok" == t) {
                        var i = Utils.getPureKdtAddressData(e);
                        i ? this.onAddressChange({address: i}) : motify.log("地址数据错误")
                    }
                }).bind(this))
            }).bind(this))
        }})
}), window.zenjs = window.zenjs || {}, function(e) {
    e.Event = {getTargetByDataKey: function(e, t) {
            for (var i = $(e.target); !i.data(t) && "BODY" != (i[0] || {}).nodeName; )
                i = i.parent();
            return i
        },getEventHandler: function() {
            var t = function() {
            };
            return $.extend(!0, t.prototype, e.Event.methods), new t
        },methods: {events: {},on: function(e, t) {
                return "string" != typeof e || "[object Function]" !== Object.prototype.toString.call(t) ? !1 : (this.events[e] || (this.events[e] = []), this.events[e].push(t))
            },trigger: function(e) {
                if ("string" != typeof e)
                    return !1;
                if (!this.events[e])
                    return this.events[e] = [], !1;
                for (var t = this.events[e], i = Array.prototype.slice.apply(arguments, [1]), s = 0, n = t.length; n > s; s++)
                    t[s](i)
            },off: function(e, t) {
                if (!e && !t)
                    return void (this.events = {});
                if (!t)
                    return void (this.events[e] = []);
                var i = this.events[e], s = i.indexOf(t);
                i.splice(s, 1)
            }}}
}(window.zenjs), define("zenjs/util/event", function() {
}), define("zenjs/backbone/tabber", ["zenjs/util/event", "backbone"], function(e, t) {
    var i = window.zenjs.Event, s = function() {
    }, n = t.View.extend({initialize: function(e) {
            this.activeKey = e.activeKey || "type", this.activeClass = e.activeClass || "active", this.cbOnClicked = e.onClicked || s, this.cbOnDisabledClicked = e.onDisabledClicked || s, this.initDefault(e)
        },events: {click: "onClicked"},initDefault: function(e) {
            e.defaultData && e.defaultData.length > 0 && this.active(e.defaultData)
        },onClicked: function(e) {
            if (e.target && 0 !== e.target.length) {
                var t = i.getTargetByDataKey(e, this.activeKey), s = "" + t.data(this.activeKey);
                if (t.blur(), s && "undefined" !== s && this.activeData !== s && s && s.length > 0) {
                    if (this.disabled === !0)
                        return void (this.activeData !== s && this.cbOnDisabledClicked());
                    this.$("." + this.activeClass).removeClass(this.activeClass), t.addClass(this.activeClass), this.activeData = s, this.cbOnClicked(_.extend(e || {}, {value: s,nTarget: t}))
                }
            }
        },active: function(e, t) {
            this.onClicked(_.extend({target: this.$el.find("[data-" + this.activeKey + '="' + e + '"]:first')}, t || {}))
        },setDisable: function(e) {
            this.disabled = e
        },setData: function(e) {
            this.activeData = e, this.$("." + this.activeClass).removeClass(this.activeClass), this.$el.find("[data-" + this.activeKey + '="' + this.activeData + '"]:first').addClass(this.activeClass)
        },getData: function() {
            return this.activeData
        }});
    return n
}), define("text!wap/components/address/templates/index.html", [], function() {
    return '<div class="block-item logistics">\n    <!-- <h4 class="block-item-title">配送方式</h4> -->\n    <div class="pull-left js-logistics-select">\n        <button data-type="express" class="tag tag-big" style="margin-top:-3px;">快递配送</button>\n        <button data-type="self-fetch" class="tag tag-big hide js-tabber-self-fetch" style="margin-top:-3px;margin-left: 5px">到店自提</button>\n    </div>\n</div>\n<div class="js-logistics-content logistics-content js-express"></div>\n<div class="js-logistics-content logistics-content js-self-fetch hide"></div>\n'
}), define("wap/components/address/main", ["wap/components/address/config", "wap/components/address/views/logistics_express", "wap/components/address/views/logistics_express_wx", "wap/components/address/views/logistics_selffetch", "zenjs/backbone/tabber", "text!wap/components/address/templates/index.html"], function(e, t, i, s, n, o) {
    return Backbone.View.extend({initialize: function(n) {
            this.$el.html(o), n = n || {}, this.onAddressChanged = n.onAddressChanged || function() {
            }, this.onWxAddressFailed = n.onWxAddressFailed || function() {
            }, this.not_saveToSever = n.not_saveToSever, this.defaultLogistics = window._global.expressType > 0 ? "self-fetch" : "express", this.expressOptions = n.expressOptions;
            var a = n.logisticsExpressKdtView || t, r = n.logisticsExpressWxView || i;
            this.LogisticsSelfFetchKdtView = n.logisticsSelfFetchKdtView || s;
            var d = window.navigator.userAgent, c = d.match(/MicroMessenger\/(\d+(\.\d+)*)/), l = null !== c && c.length, h = l ? parseFloat(c[1]) : 0;
            l ? 5 > h ? this.LogisticsExpressView = a : e.permissions.wxAddress ? this.LogisticsExpressView = r : this.LogisticsExpressView = a : this.LogisticsExpressView = a, this.logisticsExpressKdtView = a, this.logisticsViews = {express: null,"self-fetch": null}, this.tabberContainer = this.$(".js-logistics-select"), window._global.allow_self_fetch ? this.tabberContainer.find(".js-tabber-self-fetch").removeClass("hide") : this.tabberContainer.parent().addClass("hide")
        },render: function() {
            return this.tabber = new n({el: this.tabberContainer,activeClass: "tag-orange",activeKey: "type",defaultData: this.defaultLogistics,onClicked: _(this.onTabberClicked).bind(this),onDisabledClicked: _(this.onDisabledTabberClicked).bind(this)}), this.tabber.setDisable(window._global.order_state > 2), this
        },onTabberClicked: function(e) {
            var t = (this.logisticsViews.express, e.value);
            if (this.logisticsWay = t, this.$(".js-logistics-content").addClass("hide"), this.logisticsViews[t])
                this.logisticsViews[t].show(e), this.$(".js-" + t).removeClass("hide");
            else {
                var i = "express" == t ? this.LogisticsExpressView : this.LogisticsSelfFetchKdtView, s = new i({onAddressChanged: this.onAddressChanged,not_saveToSever: this.not_saveToSever,expressOptions: this.expressOptions,allow_self_fetch: window._global.allow_self_fetch});
                this.listenTo(s, "no-address:cancel", this.switch2Other), this.listenTo(s, "wx-address:error", _(this.onWxAddressError).bind(this)), this.logisticsViews[t] = s, this.$(".js-" + t).html(s.render().el).removeClass("hide")
            }
        },switch2Other: function(e) {
            var t = "express" == e.addressType ? "self-fetch" : "express";
            this.tabber.active(t, e)
        },onDisabledTabberClicked: function() {
            motify.log("您不能再修改配送方式")
        },onPayOrderCreated: function(e) {
            this.$(".js-edit-address").hide();
            var t = window._global.order_state > 2 ? window._global.order_state : 3, i = _.extend(e, {order_state: t,not_saveToSever: !0});
            this.tabber.setDisable(!0), this.logisticsViews[this.logisticsWay].show(i)
        },getAddress: function() {
            return this.logisticsViews[this.logisticsWay].getAddress()
        },onWxAddressError: function() {
            this.logisticsViews.express && this.logisticsViews.express.remove();
            var e = new this.logisticsExpressKdtView({});
            this.listenTo(e, "no-address:cancel", this.switch2Other), this.logisticsViews.express = e, this.$(".js-express").html(e.render().el).removeClass("hide"), this.logisticsViews.express.onChangeAddress(), this.onWxAddressFailed()
        }})
}), define("wap/components/pop_page", [], function() {
    var e = Backbone.View.extend({initialize: function(e) {
            this.contentViewClass = e.contentViewClass, this.contentViewOptions = e.contentViewOptions, this.nPageContents = e.nPageContents
        },render: function() {
            return this.contentView = new this.contentViewClass(_.extend({onHide: _(this.hide).bind(this),el: this.$el}, this.contentViewOptions)).render(), this
        },show: function() {
            _.each(this.nPageContents, function(e) {
                e.hide()
            }), this.$el.show(), window.scrollTo(0, 0)
        },hide: function() {
            this.$el.hide(), _.each(this.nPageContents, function(e) {
                e.show()
            })
        },destroy: function() {
            this.contentView && this.contentView.remove()
        }});
    return e
}), define("text!wap/components/pay/templates/wapwxpay.html", [], function() {
    return '<div class="pj-errors">\n    <div class="desc center desc-bottom-line">微信支付确认</div>\n    <div class="reason">如您已使用微信支付完成付款，请点击“我已支付成功”查看订单；如付款遇到问题，请尝试使用其他方式付款。</div>\n    <div class="action-container">\n        <div class="btn-2-1"><button class="btn btn-l btn-green js-ok">我已支付成功</button></div>\n        <div class="btn-2-1"><button class="btn btn-l btn-white js-cancel">使用其他支付方式</button></div>\n    </div>\n</div>'
}), define("text!wap/components/pay/templates/pay_item.html", [], function() {
    return '<% if(data.code==\'wxwappay\'){ %>\n	<p class="center c-gray-dark font-size-12" style="line-height:30px;">使用微信支付请确保已安装微信6.0.2以上版本</p>\n<% } %>\n<button type="button" data-pay-type="<%= data.code %>" class="btn-pay btn btn-block btn-large btn-<%= data.code %> <%= getBtnClass(data.code) %>">\n	<%= data.name %>\n</button>'
}), define("wap/components/popout", ["wap/components/pop"], function(e) {
    var t = e.extend({init: function(e) {
            e = e || {}, this._super(e), this.css = $.extend({position: "absolute","z-index": 1e3,transition: "opacity ease " + this.animationTime + "ms",opacity: 0,top: "50%",left: "50%","-webkit-transform": "translate3d(-50%, -50%, 0)",transform: "translateY(-50%, -50%, 0)"}, e.css || {}), this.nPopContainer.css(this.css)
        },_doShow: function() {
            $(".js-popout-close").click($.proxy(function(e) {
                this.hide()
            }, this)), this.nPopContainer.css("opacity", 1), this.nPopContainer.show()
        },_doHide: function(e) {
            this.nPopContainer.css({opacity: 0})
        }});
    return t
}), define("wap/components/loading", ["wap/components/popout"], function(e) {
    var t;
    return {show: function() {
            t = new e({html: '<div class="loader-container"><div class="loader center">处理中</div></div>',isCanNotHide: !0}).render().show()
        },hide: function() {
            t.hide()
        }}
}), window.Zepto && function(e) {
    e.fn.serializeArray = function() {
        var t, i, s = [], n = function(e) {
            return e.forEach ? e.forEach(n) : void s.push({name: t,value: e})
        };
        return this[0] && e.each(this[0].elements, function(s, o) {
            i = o.type, t = o.name, t && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != i && "reset" != i && "button" != i && "file" != i && ("radio" != i && "checkbox" != i || o.checked) && n(e(o).val())
        }), s
    }, e.fn.serialize = function() {
        var e = [];
        return this.serializeArray().forEach(function(t) {
            e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
        }), e.join("&")
    }, e.fn.submit = function(t) {
        if (0 in arguments)
            this.bind("submit", t);
        else if (this.length) {
            var i = e.Event("submit");
            this.eq(0).trigger(i), i.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), define("vendor/zepto/form", function() {
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {needConfirm: function(e, t, i) {
        var s = window.confirm(e);
        s ? t && "function" == typeof t && t.apply() : i && "function" == typeof i && i.apply()
    }}), define("wap/components/util/confirm", function() {
}), define("wap/components/popout_box", ["wap/components/popout"], function(e) {
    var t = function() {
    }, i = e.extend({init: function(e) {
            this._super(e), this._onOKClicked = e.onOKClicked || t, this._onCancelClicked = e.onCancelClicked || t, this.preventHideOnOkClicked = e.preventHideOnOkClicked || !1, this.width = e.width, this.setEventListener()
        },setEventListener: function() {
            this.nPopContainer.on("click", ".js-ok", $.proxy(this.onOKClicked, this)), this.nPopContainer.on("click", ".js-cancel", $.proxy(this.onCancelClicked, this))
        },_doShow: function() {
            this.boxCss = {"border-radius": "4px",background: "white",width: this.width || "270px",padding: "15px"}, this.nPopContainer.css(this.boxCss).addClass("popout-box"), this._super()
        },_doHide: function(e) {
            this._super()
        },onOKClicked: function(e) {
            this._onOKClicked(e), !this.preventHideOnOkClicked && this.hide()
        },onCancelClicked: function(e) {
            this._onCancelClicked(e), this.hide()
        }});
    return i
}), define("wap/components/pay/pay_item", ["text!wap/components/pay/templates/wapwxpay.html", "text!wap/components/pay/templates/pay_item.html", "wap/components/loading", "vendor/zepto/form", "wap/components/util/confirm", "wap/components/popout_box", "zenjs/util/ua"], function(e, t, i, s, n, o, a) {
    var r = window.zenjs.UA, d = function() {
    }, c = Backbone.View.extend({template: _.template(t),initialize: function(e) {
            this.onOtherPayClicked = e.onOtherPayClicked || d, this.payUrl = e.payUrl, this.kdt_id = e.kdt_id, this.order_no = e.order_no, this.wxPayResultUrl = e.wxPayResultUrl, this.getPayDataExtr = e.getPayDataExtr, this.onPayOrderCreated = e.onPayOrderCreated, this.model.on("change", _(this.render).bind(this)), this.beforeWxPayRender = e.beforeWxPayRender || d, this.onWxPayError = e.onWxPayError
        },events: {"click button": "onButtonClick"},onButtonClick: function(e) {
            if (!this.isClickProcessing) {
                this.isClickProcessing = !0;
                var t = this.$("button"), i = t.data("pay-type"), s = "";
                return "other" === i ? (this.onOtherPayClicked(), void (this.isClickProcessing = !1)) : "codpay" == i ? (s = "下单提醒：您正在选择货到付款，下单后由商家发货，快递送货上门并收款。", this.model && "到店付款" === this.model.get("name") && (s = "下单提醒：您正在选择到店付款，下单后请自行到店领取并付款。"), (Utils || {}).needConfirm && Utils.needConfirm(s, _(function() {
                    this.doPay(i)
                }).bind(this)), void (this.isClickProcessing = !1)) : void this.doPay(i)
            }
        },doPay: function(e) {
            var t = this.getPayDataExtr();
            if (!t)
                return void (this.isClickProcessing = !1);
            var i = {order_no: this.order_no,kdt_id: this.kdt_id,buy_way: e};
            this.submitPay(_.extend(t, i), e)
        },submitPay: function(t, s) {
            var n = this;
            $.ajax({url: this.payUrl,type: "POST",dataType: "json",timeout: 15e3,data: t,cache: !1,beforeSend: function() {
                    "wxpay" != s && i.show(), n.$("button").prop("disabled", !0).html("正在努力加载，请稍等...")
                },success: function(i) {
                    n.onPayOrderCreated(t);
                    var a = i.code;
                    switch (n.isClickProcessing = !1, a) {
                        case 0:
                            var r = i.data.pay_data, d = i.data.redirect_url, c = i.data.pay_return_url, l = i.data.pay_return_data;
                            switch (s) {
                                case "wxapppay":
                                    n.doFinishWxAppPay(r, l);
                                    break;
                                case "wxpay":
                                    n.doFinishWxPay(r, d, c, l);
                                    break;
                                case "couponpay":
                                case "presentpay":
                                    window.location = r.submit_url;
                                    break;
                                case "wxwappay":
                                    return n.wapPayPopout = new o({html: e,onOKClicked: function() {
                                            location.reload()
                                        },onCancelClicked: function() {
                                            location.reload()
                                        }}).render().show(), void (window.location = r.deeplink);
                                default:
                                    if (!r || !r.submit_url)
                                        return void motify.log("支付过程出错，请联系客服！");
                                    n.doFinishOtherPay(r)
                            }
                            break;
                        case 11022:
                        case 11023:
                            wxReady && wxReady(function() {
                                window.WeixinJSBridge && window.WeixinJSBridge.invoke("closeWindow", {})
                            });
                            break;
                        case 11010:
                            window.Utils.needConfirm(i.msg, function() {
                                t.accept_price = 1, n.submitPay(t, s)
                            }, function() {
                                motify.log("正在跳转中...", 0), window.location.href = window._global.url.wap + "/showcase/goods?alias=" + window._global.goods_alias
                            });
                            break;
                        case 11012:
                        case 11024:
                        case 11026:
                        case 11027:
                            motify.log("正在跳转...");
                            var h = "wxpay" != s ? window._global.url.trade + "/trade/order/result?order_no=" + n.order_no + "&kdt_id=" + n.kdt_id + "#wechat_webview_type=1" : n.wxPayResultUrl;
                            window.location.href = h;
                            break;
                        case 21e3:
                            window.location.reload();
                            break;
                        case 90001:
                            var p = i.data.item_url, u = _.template(['<div class="pj-errors">', '<div class="desc">矮油，动作太慢了，已被抢光了</div>', '<div class="action-container">', '<div class="btn-2-1"><button class="btn btn-l btn-white js-ok">放弃</button></div>', '<div class="btn-2-1"><a href="<%= data.buyUrl %>" class="btn btn-l btn-orange-dark">我要买</a></div>', "</div>", "</div>"].join(""));
                            n.errorPopout || (n.errorPopout = new o({doNotRemoveOnHide: !0,html: u({data: {buyUrl: p}})}).render()), n.errorPopout.show();
                            break;
                        default:
                            n.render(), motify.log(i.msg)
                    }
                },error: function(e, t, i) {
                    n.isClickProcessing = !1, motify.log("生成支付单失败。"), n.render()
                },complete: function(e, t) {
                    n.isClickProcessing = !1, i.hide(), n.render()
                }})
        },doFinishOtherPay: function(e) {
            if (!this.isSubmitting) {
                this.isSubmitting = !0;
                var t = '<form method="post" action="' + e.submit_url + '">';
                delete e.submit_url, _(e).map(function(e, i) {
                    t += '<input type="hidden" name="' + i + '" value="' + e + '" />'
                }), t += "</form>";
                var i = $(t);
                i.submit(), this.isSubmitting = !1
            }
        },doFinishWxPay: function(e, t, i, s) {
            return this.wxpayed ? void motify.log("支付数据处理中，请勿重复操作") : (this.wxpayed = !0, "string" == typeof e && (e = $.parseJSON(e)), window.WeixinJSBridge ? (this.beforeWxPayRender(), void window.WeixinJSBridge.invoke("getBrandWCPayRequest", e, _(function(e) {
                var n = e.err_msg;
                this.wxpayed = !1, "get_brand_wcpay_request:ok" === n ? (motify.log("支付成功，正在处理订单...", 0), $.ajax({url: i,type: "POST",dataType: "json",timeout: 15e3,data: s,cache: !1,success: function(e) {
                        window.location.href = t
                    }})) : "get_brand_wcpay_request:cancel" === n ? zenjs.UA.isIOS() ? this.render() : this.onWxPayError ? (this.onWxPayError(), this.model.trigger("destroy", this.model, this.model.collection)) : this.render() : this.onWxPayError ? (this.onWxPayError(), this.model.trigger("destroy", this.model, this.model.collection)) : motify.log(n)
            }).bind(this))) : void (this.wxpayed = !1))
        },doFinishWxAppPay: function() {
            function e(e, t) {
                t || (t = "weixin"), r.isIOS() ? (e = encodeURIComponent(e), document.location.hash = "#func=appWXPay&params=" + e) : r.isAndroid() && window.android && window.android.appWXPay(e)
            }
            return function(t, i) {
                r.isWxd() && r.getPlatformVersion() >= "1.5.0" ? window.YouzanJSBridge && window.YouzanJSBridge.doCall("doAction", {action: "appWXPay",kdt_id: t.kdt_id,order_no: i.order_no,inner_order_no: t.order_no}) : (e("kdt_id=" + t.kdt_id + "&order_no=" + t.order_no), window.YouzanJSBridge && window.YouzanJSBridge.doCall("appWXPay", {kdt_id: t.kdt_id,order_no: t.order_no}))
            }
        }(),render: function() {
            var e = this, t = this.model.toJSON();
            return this.$el.html(this.template(_.extend({data: t}, {getBtnClass: function(t) {
                    return parseInt(e.model.get("order")) > 0 ? " btn-white" : " btn-green"
                }}))), this.$el.css("margin-bottom", "10px"), this
        }});
    return c
}), define("wap/components/pay/pop_pay_list", ["wap/components/popout", "vendor/zepto/form", "wap/components/util/confirm"], function(e, t, i) {
    var s = Backbone.View.extend({className: "pay-way-opts",initialize: function(e) {
            this.collection = e.collection, $("body").append('<div                 id="confirm-pay-way-opts-popup-bg"                 style="display:none; width: 100%; height: 100%;                 position: fixed; top:0; left:0;                 background-color: rgba(0, 0, 0, .5);"></div>'), this.bg = $("#confirm-pay-way-opts-popup-bg"), this.bg.on("click", _(this.hide).bind(this)), this.listOpt = {el: this.$el,itemView: PayItemView,collection: this.collection,itemOptions: e.itemOptions}
        },events: {"click #confirm-pay-way-opts-popup-bg": "hide"},render: function() {
            return this.payWayListView = new ListView(this.listOpt).render(), this
        },show: function() {
            this.$el.addClass("active"), this.bg.show()
        },hide: function() {
            this.$el.removeClass("active"), this.bg.hide()
        }});
    return s
}), define("wap/components/pay/pay", ["zenjs/list/list", "wap/components/popup", "wap/components/pay/pay_item", "wap/components/pay/pop_pay_list"], function(e, t, i, s) {
    return Backbone.View.extend({initialize: function(e) {
            this.collection = new Backbone.Collection, this.nPayTips = e.nPayTips, this.itemOptions = e.itemOptions || {}, this.pagePayWaySize = e.pagePayWaySize || 3, this.payUrl = e.payUrl || window._global.url.trade + "/trade/order/pay.json", this.order_no = e.order_no || window._global.order_no, this.kdt_id = e.kdt_id || window._global.kdt_id, this.orderPrice = e.orderPrice, this.getPayDataExtr = e.getPayDataExtr || function() {
                return {}
            }, this.wxPayResultUrl = e.wxPayResultUrl, this.onPayOrderCreated = e.onPayOrderCreated || function() {
            }, this.otherPayText = e.otherPayText, this.beforeWxPayRender = e.beforeWxPayRender || function() {
            };
            var t = e.payWays, s = new Backbone.Collection;
            _.each(t, function(e, t) {
                e.id = t, e.order = t, s.add(new Backbone.Model(e))
            }), this.listOpt = {el: this.$el,itemView: i,collection: this.collection,itemOptions: _.extend({}, this.itemOptions, {onOtherPayClicked: _(this.onOtherPayClicked).bind(this),payUrl: this.payUrl,order_no: this.order_no,kdt_id: this.kdt_id,getPayDataExtr: this.getPayDataExtr,wxPayResultUrl: this.wxPayResultUrl,onPayOrderCreated: this.onPayOrderCreated,beforeWxPayRender: this.beforeWxPayRender}),emptyHTML: " "}, this.allPayWayCollection = s, this.initPagePayWay()
        },render: function() {
            return this.payWayListView = new e(this.listOpt).render(), this
        },initPagePayWay: function() {
            if (0 === this.allPayWayCollection.length)
                return this.nPayTips && this.nPayTips.html("无可用的支付方式"), this;
            if (this.allPayWayCollection.length <= this.pagePayWaySize)
                for (var e = 0; e < this.allPayWayCollection.length; e++)
                    this.collection.add(this.allPayWayCollection.get(e));
            else {
                for (var e = 0; e < this.pagePayWaySize - 1; e++)
                    this.collection.add(this.allPayWayCollection.get(e));
                this.collection.add(new Backbone.Model({code: "other",name: this.otherPayText || "其他支付方式",order: e}))
            }
        },addHotIcon: function(e) {
            var t = this.allPayWayCollection.findWhere({code: e});
            if (t) {
                var i = t.get("name") + '<span class="hot"></span>';
                t.set("name", i);
                var s = this.collection.findWhere({code: e
                });
                if (s)
                    return void s.set("name", i);
                var n = this.collection.findWhere({code: "other"});
                n && n.set("name", n.get("name") + '<span class="hot"></span>')
            }
        },initPopPayWayListView: function() {
            var i = _.clone(this.listOpt);
            delete i.el, i.collection = this.allPayWayCollection, this.popPayWayListView || (this.popPayWayListView = new t({contentViewClass: e,className: "confirm-pay-way-opts-popup",contentViewOptions: i,containerCss: {padding: "10px"},doNotRemoveOnHide: !0}).render()), this.popPayWayListView.show()
        },onOtherPayClicked: function() {
            this.initPopPayWayListView()
        },updatePayWay: function(e) {
            var t = this.allPayWayCollection.find(function(t) {
                return t.get("code") == e.code
            });
            if (t)
                for (var i in e)
                    e.hasOwnProperty(i) && t.set(i, e[i])
        },updateValue: function(e) {
            if (e) {
                var t = this, i = ["payUrl", "order_no", "kdt_id"];
                _.each(e, function(e, s, n) {
                    t[s] = e, i.indexOf(s) > -1 && (t.listOpt.itemOptions[s] = e, t.payWayListView && _.each(t.payWayListView.items, function(t) {
                        t[s] = e
                    }), t.popPayWayListView && _.each(t.popPayWayListView.items, function(t) {
                        t[s] = e
                    }))
                })
            }
        }})
}), define("wap/trade/confirm/view/payView", ["wap/components/pay/pay", "zenjs/util/cookie"], function(e) {
    var t = function() {
    };
    return Backbone.View.extend({initialize: function(i) {
            this.options = i = i || {}, this.payWays = i.payWays || [], this.payWaysContainer = i.payWaysContainer || $("#confirm-pay-way-opts"), this.getPresentBtn = i.getPresentBtn || $("#get-present-btn"), this.nPayTips = i.nPayTips || $(".js-pay-tip"), this.payUrl = i.payUrl || tradeBaseUrl + "/trade/order/pay.json", this.wxReturnUrl = i.wxReturnUrl || tradeBaseUrl + "/pay/wxpay/return.json", this.wxPayResultUrl = i.wxPayResultUrl || tradeBaseUrl + "/trade/order/result?order_no=" + window._global.order_no + "&kdt_id=" + window._global.kdt_id + "&order_paid=1#wechat_webview_type=1&refresh", this.order_no = i.order_no || window._global.order_no, this.kdt_id = i.kdt_id || window._global.kdt_id, this.pagePayWaySize = i.pagePayWaySize || 2, this.orderType = i.orderType || 0, this.onPayOrderCreated = i.onPayOrderCreated || t, this.getPayDataExtr = i.getPayDataExtr || t, this.itemOptions = i.itemOptions, this.resolvePayWays(), this.pagePayWayListView = new e({payWays: this.payWays,el: this.payWaysContainer,nPayTips: this.nPayTips,payUrl: this.payUrl,wxReturnUrl: this.wxReturnUrl,wxPayResultUrl: this.wxPayResultUrl,order_no: this.order_no,kdt_id: this.kdt_id,pagePayWaySize: this.pagePayWaySize,onPayOrderCreated: this.onPayOrderCreated,getPayDataExtr: this.getPayDataExtr,itemOptions: i.itemOptions})
        },render: function() {
            this.pagePayWayListView.render(), this.giftPayWayListView && this.giftPayWayListView.render()
        },initGiftPayWayListView: function() {
            var t = this.solveInnerPayWays(this.options.innerPayWays || {});
            this.giftPayWayListView = new e({payWays: t,el: this.getPresentBtn,nPayTips: this.nPayTips,payUrl: this.payUrl,wxReturnUrl: this.wxReturnUrl,wxPayResultUrl: this.wxPayResultUrl,order_no: this.order_no,kdt_id: this.kdt_id,pagePayWaySize: 1,onPayOrderCreated: this.onPayOrderCreated,getPayDataExtr: this.getPayDataExtr,itemOptions: this.itemOptions}), this.giftPayWayListView.render()
        },showPresentBtn: function() {
            this.payWaysContainer.addClass("hide"), this.giftPayWayListView || this.initGiftPayWayListView(), this.getPresentBtn.removeClass("hide")
        },showNormalBuyBtn: function() {
            this.payWaysContainer.removeClass("hide"), this.getPresentBtn.addClass("hide")
        },refreshConfirmBtn: function(e) {
            e ? this.showNormalBuyBtn() : this.showPresentBtn()
        },updatePayWayList: function(e) {
            this.pagePayWayListView.updatePayWay(e || {})
        },solveInnerPayWays: function(e) {
            return 4 == this.orderType ? [e.present] : [e.coupon]
        },refreshData: function(e) {
            e.order_no && (this.order_no = e.order_no), this.pagePayWayListView.updateValue(e), this.giftPayWayListView && this.giftPayWayListView.updateValue(e)
        },resolvePayWays: function() {
            if (zenjs.Browser && "1" === zenjs.Browser.cookie("fanben_app_77_ad"))
                for (var e, t = ["wxpay", "wxwappay"], i = this.payWays.length - 1; i > -1; i--)
                    e = this.payWays[i], t.indexOf(e.code) > -1 && this.payWays.splice(i, 1)
        }})
}), define("wap/trade/message_view", [], function() {
    return Backbone.View.extend({initialize: function(e) {
            this.onHide = e.onHide || function() {
            }, this.nTarget = e.nTarget
        },events: {"click .js-cancel": "hide"},render: function() {
            var e = this.nTarget.parent().parent().clone();
            this.$(".js-list").empty().append(e), this.$(".js-show-message").hide();
            var t = this.nTarget.parents(".js-goods-item").find(".js-message");
            t.length > 0 ? this.$(".js-message-container").html(t.clone().html()) : (this.$(".js-message-container").hide(), this.$("h2").hide())
        },hide: function() {
            this.onHide()
        }})
}), define("wap/trade/confirm/view/order_message", ["wap/components/util/valid"], function() {
    return Backbone.View.extend({initialize: function(e) {
            this.el = e.el, this.msgLenLimit = e.msgLenLimit || 140, this.ordermsg_change_phone = window._global.ordermsg_change_phone
        },events: {"focus .js-msg-container": "onMsgFocus","blur .js-msg-container": "onMsgBlur"},render: function() {
            return this.msgContainer = this.$(".js-msg-container"), this.phoneContainer = this.$(".js-phone-container"), this
        },onMsgFocus: function() {
            this.msgContainer.addClass("two-rows")
        },onMsgBlur: function() {
            this.msgContainer.removeClass("two-rows")
        },getMsg: function() {
            var e = {};
            return this.ordermsg_change_phone ? e.order_message = this.phoneContainer.val() : e.order_message = this.msgContainer.val() || "", e
        },validate: function() {
            var e = function() {
                var e = this;
                this.phoneContainer.addClass("error"), this.phoneContainer.one("click", function(t) {
                    e.phoneContainer.removeClass("error")
                })
            };
            return function(t) {
                t = t || {};
                var i = t.order_message;
                if (this.ordermsg_change_phone) {
                    if (!i)
                        return motify.log("请填写手机号码"), e.call(this), !1;
                    if (!Utils.validMobile(i) && !Utils.validPhone(i))
                        return motify.log("请填写正确的<br />手机号码或电话号码"), e.call(this), !1
                } else if (i.length > this.msgLenLimit)
                    return motify.log("字数不能超过" + this.msgLenLimit), !1;
                return !0
            }
        }()})
}), define("wap/trade/confirm/view/coupon/model", [], function() {
    var e = Backbone.Model.extend({idAttribute: "m_id",defaults: {coupon: null,order: null},initialize: function(e, t) {
        }});
    return e
}), define("wap/trade/confirm/view/coupon/collection", ["wap/trade/confirm/view/coupon/model"], function(e) {
    var t = Backbone.Collection.extend({model: e,comparator: function(e, t) {
            var i = (e.get("coupon") || {}).value, s = (t.get("coupon") || {}).value;
            return i > s ? -1 : 1
        },findCoupon: function(e) {
            return e && e.coupon && e.coupon.id ? this.find(function(t) {
                var i = t.get("coupon"), s = (e || {}).coupon || {};
                return i.id == s.id ? !0 : !1
            }) : !1
        },findCouponByData: function(e) {
            return this.find(function(t) {
                var i = t.get("coupon"), s = (e || {}).coupon;
                return i.id == s.id ? !0 : !1
            })
        }});
    return t
}), define("text!wap/trade/confirm/view/coupon/templates/useCoupon.html", [], function() {
    return '<div class="block-item order-coupon">\n    <h4 class="block-item-title">优惠</h4>\n    <div class="coupon-info-container">\n	    <div class="js-normal-coupon coupon-info c-gray-dark <% if ( orderState < 3 ) { %>js-change-coupon<% } %>">\n	        <span class="coupon-title"><%=couponData.name %></span>\n	        <p><i class="coupon-condition"><%=couponData.condition %></i></p>\n	    </div>\n	    <% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n	    <% } %>\n	</div>\n</div>'
}), define("text!wap/trade/confirm/view/coupon/templates/availableCoupon.html", [], function() {
    return '<div class="block-item order-coupon">\n    <h4 class="block-item-title">优惠</h4>\n    <div class="coupon-info-container">\n	    <div class="js-normal-coupon coupon-info c-gray-dark">\n	    	<span class="pull-right <% if ( orderState < 3 ) { %>js-change-coupon<% } %>">您有 <%=available %> 个可用优惠</span>\n	    </div>\n	    <% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n	    <% } %>\n	</div>\n</div>'
}), define("text!wap/trade/confirm/view/coupon/templates/emptyCoupon.html", [], function() {
    return '<div class="block-item order-coupon relative">\n    <h4 class="block-item-title">优惠</h4>\n    <div class="coupon-info-container">\n    	<div class="js-normal-coupon coupon-info c-gray-dark">\n    	    <span class="<% if ( orderState < 3 ) { %>js-change-coupon<% } %>">使用优惠</span>\n    	</div>\n    	<% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n	    <% } %>\n    </div>\n\n</div>\n'
}), define("wap/trade/confirm/view/coupon/view/input_view", ["wap/trade/confirm/view/coupon/model"], function(e) {
    var t = Backbone.View.extend({events: {"click .js-valid-code": "onCodeSubmit","focus .js-code-txt": "hideTips"},initialize: function(e) {
            e = e || {}, this.useCoupon = e.useCoupon, this.couponCollection = e.collection, this.order_no = e.order_no, this.kdt_id = e.kdt_id, this.nCodeTxt = this.$(".js-code-txt"), this.nValidBtn = this.$(".js-valid-code"), this.nErrorTips = this.$(".js-error-tips")
        },getCode: function() {
            var e = this, t = e.nCodeTxt.val();
            return t = $.trim(t)
        },onCodeSubmit: function(e) {
            var t = this;
            e.preventDefault();
            var i = t.getCode();
            return i ? void $.ajax({url: "/v2/trade/order/validateCode.json",type: "POST",dataType: "json",timeout: 8e3,cache: !1,data: {order_no: t.order_no,kdt_id: t.kdt_id,code: i},beforeSend: function() {
                    t.nValidBtn.text("验证中..."), t.nValidBtn.prop("disabled", !0)
                },success: function(e) {
                    0 === e.code ? t.showCouponInfo(e.data) : (t.showTips(), t.nErrorTips.html(e.msg))
                },error: function(e, t, i) {
                },complete: function(e, i) {
                    t.nValidBtn.text("验证"), t.nValidBtn.prop("disabled", !1)
                }}) : (motify.log("请输入优惠码"), t.nCodeTxt.focus(), !1)
        },showTips: function() {
            this.nErrorTips.removeClass("hide")
        },hideTips: function() {
            this.nErrorTips.addClass("hide")
        },showCouponInfo: function(e) {
            var t = this.collection.findCouponByData(e);
            if (t)
                motify.log("该优惠码您已经拥有，<br />已为您自动选中～");
            else {
                var i = this.collection.toJSON();
                this.collection.reset(i.concat([e])), t = this.collection.findCouponByData(e)
            }
            this.useCoupon(t)
        },setOrderNo: function(e) {
            this.order_no = e
        }});
    return t
}), define("text!wap/trade/confirm/view/coupon/templates/couponItem.html", [], function() {
    return '<div class="label-check-img"></div>\n<div class="coupon-info">\n	<p class="font-size-12"><%=coupon.name %><em class="pull-right">-<%=(coupon.value/100).toFixed(2) %></em></p>\n	<p class="font-size-12 c-gray">\n		<%=coupon.condition %>\n		<% if( coupon.end_at && coupon.end_at < 10 ){ %>\n			<em class="pull-right c-gray">即将过期</em>\n		<% } %>\n	</p>\n</div>\n\n'
}), define("wap/trade/confirm/view/coupon/view/item_view", ["text!wap/trade/confirm/view/coupon/templates/couponItem.html"], function(e) {
    var t = function() {
    }, i = Backbone.View.extend({tagName: "li",className: "block-item coupon-item",template: _.template(e),events: {click: "onClick"},initialize: function(e) {
            e = e || {}, this.onItemClick = e.onItemClick || t
        },render: function() {
            var e = this.model.toJSON(), t = this.template({coupon: e.coupon});
            return this.$el.html(t), this
        },onClick: function(e) {
            e.preventDefault();
            this.model.toJSON();
            this.onItemClick(this.model)
        }});
    return i
}), define("zenjs/list/sort_list", ["zenjs/list/list"], function(e) {
    return e.extend({doSort: function(e) {
            this.collection.sortConfig = e, this.collection.comparator = this._multiFieldComparator, this.collection.sort()
        },_multiFieldComparator: function(e, t) {
            var i = "asc" == this.sortConfig.order ? 1 : -1;
            return e = e.get(this.sortConfig.field), t = t.get(this.sortConfig.field), e ? t ? e > t ? 1 * i : t > e ? -1 * i : 0 : -1 * i : 1 * i
        }})
}), define("text!wap/trade/confirm/templates/selectorView.html", [], function() {
    return '<div class="js-scene-coupon-list">\n    <div class="top-bar">\n        <h3 class="center">选择优惠</h3>\n        <span class="js-close close"></span>\n    </div>\n    \n    <div class="js-code-inputer coupon-input-container">\n        <div class="inputer">\n            <input class="js-code-txt txt txt-coupon font-size-12" type="text" placeholder="请输入优惠码" autocapitalize="off" maxlength="15" />\n            <button class="js-valid-code coupon-valid font-size-12" type="button">兑换</button>\n        </div>\n        <p class="js-error-tips error-tips c-red font-size-12 hide"></p>\n    </div>\n\n    <ul class="js-coupon-list block-list block coupon-list block-border-bottom-none">\n        \n    </ul>\n\n</div>\n<div class="action-container coupon-action-container">\n    <button class="js-confirm-use-coupon btn btn-block btn-green" style="margin: 0px;">确定</button>\n</div>'
}), define("wap/trade/confirm/view/coupon/view/selector_view", ["wap/trade/confirm/view/coupon/view/input_view", "wap/trade/confirm/view/coupon/view/item_view", "zenjs/list/sort_list", "text!wap/trade/confirm/templates/selectorView.html"], function(e, t, i, s) {
    var n = function() {
    }, o = Backbone.View.extend({initialize: function(e) {
            e = e || {}, this.onCouponChanged = e.onCouponChanged || n, this.orderState = e.orderState, this.selectedCoupon = null, this.none_coupon = e.none_coupon, this.default_coupon = e.none_coupon, this.currentCoupon = e.current_coupon, this.order_no = e.order_no, this.kdt_id = e.kdt_id, this.couponCollection = e.couponCollection
        },render: function() {
            window._global;
            return this.$el.append(s), this.couponInput = new e({el: this.$(".js-code-inputer"),collection: this.couponCollection,useCoupon: _(function(e) {
                    this.selectedCoupon = this.none_coupon, this.useCoupon(e)
                }).bind(this),order_no: this.order_no,kdt_id: this.kdt_id}), this.nCouponList = this.$(".js-coupon-list"), this.isEmptyList = !1, this.listOpt = {el: this.$(".js-coupon-list"),itemView: t,finishedHTML: " ",emptyHTML: " ",collection: this.couponCollection,itemOptions: {onItemClick: _(this.useCoupon).bind(this) || n},onListEmpty: $.proxy(function() {
                    this.isEmptyList = !0, this.nCouponList.addClass("block-border-top-none")
                }, this),onViewItemAdded: $.proxy(function() {
                    this.isEmptyList && this.nCouponList.removeClass("block-border-top-none"), this.isEmptyList = !1
                }, this)}, this.couponList = new i(this.listOpt), this.couponList.render(), this.switchCoupon(this.currentCoupon), this.$(".js-confirm-use-coupon").click(_(this.confirmUseCoupon).bind(this)), this
        },notUse: function() {
            var e = this, t = e.none_coupon;
            this.useCoupon(t)
        },useCoupon: function(e) {
            return this.selectedCoupon && this.selectedCoupon == e && e != this.none_coupon ? void this.notUse() : (this.selectedCoupon = e, void this.show())
        },switchCoupon: function(e) {
            this.selectedCoupon = this.none_coupon, this.useCoupon(e || this.none_coupon)
        },confirmUseCoupon: function(e) {
            e.preventDefault(), e.stopPropagation(), this.onCouponChanged(this.selectedCoupon), this.onHide()
        },show: function() {
            var e = this.selectedCoupon;
            if (!e)
                return !1;
            this.$el.find(".coupon-item.active").removeClass("active");
            var t = this.couponList.getViewByModel(e);
            t && t.$el.addClass("active")
        },setCoupons: function(e) {
            e = e || {}, e.default_coupon && (this.default_coupon = e.default_coupon), e.current_coupon && (this.current_coupon = e.current_coupon)
        },setOrderNo: function(e) {
            this.order_no = e, this.couponInput.setOrderNo(e)
        }});
    return o
}), define("wap/trade/confirm/view/coupon/main", ["wap/trade/confirm/view/coupon/model", "wap/trade/confirm/view/coupon/collection", "text!wap/trade/confirm/view/coupon/templates/useCoupon.html", "text!wap/trade/confirm/view/coupon/templates/availableCoupon.html", "text!wap/trade/confirm/view/coupon/templates/emptyCoupon.html", "wap/trade/confirm/view/coupon/view/selector_view", "wap/components/popup"], function(e, t, i, s, n, o, a) {
    var r = function() {
    }, d = Backbone.View.extend({el: ".js-used-coupon",events: {"click .js-change-coupon": "showCouponSelector"},useCouponTemplate: _.template(i),availableCouponTemplate: _.template(s),emptyCouponTemplate: _.template(n),initialize: function(t) {
            var i = window._global, s = i.ump || {}, n = ((s.order || {}).coupons || {}).money;
            t = t || {}, this.orderState = i.order_state || 1, this.hasAddress = 0, this.coupons = i.coupons, this.currentCouponData = n, this.currentCoupon = new e(this.currentCouponData), this.order_no = window._global.order_no, this.urlTrade = i.url.trade, this.no_user_login = i.no_user_login, this.onCouponChanged = t.onCouponChanged || r
        },render: function(i) {
            i = i || {}, this.couponCollection = new t;
            var s = (this.coupons || {}).none_coupon;
            return 3 == this.orderState && (s = this.currentCouponData), this.none_coupon = new e(s), this.setCoupons(), this
        },setCoupons: function(e) {
            e = e || this.coupons || {};
            var t = e.codes || [], i = e.cards || [];
            this.couponCollection.reset(t.concat(i)), this.default_coupon = this.couponCollection.findCoupon(e.default_coupon);
            var s = this.couponCollection.findCoupon(this.currentCouponData) || this.none_coupon;
            this.autoUseCoupon(), this.couponSelectorView && this.couponSelectorView.setCoupons({default_coupon: this.default_coupon,current_coupon: s})
        },resetCoupons: function() {
            this.setCoupons()
        },showCouponSelector: function() {
            if (!this.popView) {
                var e = window._global;
                this.popView = new a({contentViewClass: o,contentViewOptions: {orderState: this.orderState,none_coupon: this.none_coupon,current_coupon: this.usedCoupon || this.none_coupon,order_no: this.order_no,kdt_id: e.kdt_id,couponCollection: this.couponCollection,onCouponChanged: _(function(e) {
                            var t = e.toJSON();
                            this.couponData = t, this.usedCoupon = e, this.onCouponChanged(t), this.updateCouponPanel(t)
                        }).bind(this)},containerCss: {bottom: 0,left: 0,right: 0,background: "#f9f9f9"},doNotRemoveOnHide: !0}).render(), this.couponSelectorView = this.popView.contentView
            }
            this.popView.show()
        },autoUseCoupon: function() {
            var e = this.orderState, t = null;
            if (1 === e || 2 === e) {
                if (0 == this.couponCollection.length && !this.none_coupon && !this.default_coupon)
                    return !1;
                t = this.default_coupon ? this.default_coupon : this.none_coupon
            } else
                3 === e && (t = this.currentCoupon);
            var i = t.toJSON();
            this.couponData = i, this.usedCoupon = t, this.onCouponChanged(i), this.updateCouponPanel(i), this.couponSelectorView && this.couponSelectorView.switchCoupon(t)
        },updateCouponPanel: function(e) {
            var t = this, i = "";
            if (!e)
                return !1;
            var s = e.coupon || {};
            if (0 !== s.id)
                i = t.useCouponTemplate({couponData: s,orderState: t.orderState});
            else {
                var n = this.couponCollection.length;
                i = n > 0 ? t.availableCouponTemplate({available: n,orderState: t.orderState}) : t.emptyCouponTemplate({orderState: t.orderState})
            }
            t.$el.html(i), t.show()
        },hide: function() {
            this.$el.addClass("hide")
        },show: function() {
            this.$el.removeClass("hide")
        },setOrderNo: function(e) {
            this.order_no = e, this.couponSelectorView && this.couponSelectorView.setOrderNo(e)
        },hideCoupon: function() {
            this.cannotUseCoupon = !0, this.$el.addClass("hide")
        },showCoupon: function() {
            this.cannotUseCoupon = !1, this.$el.removeClass("hide")
        },getCouponData: function() {
            return this.cannotUseCoupon && !this.usedCoupon ? "" : this.usedCoupon.toJSON()
        }});
    return d
}), define("text!wap/trade/confirm/view/luckymoney/templates/selector.html", [], function() {
    return '<div class="js-scene-coupon-list">\n    <div class="top-bar">\n        <h3 class="center">使用红包</h3>\n        <span class="js-close close"></span>\n    </div>\n\n    <ul class="js-coupon-list block-list block coupon-list block-border-bottom-none">\n    </ul>\n</div>\n<div class="action-container coupon-action-container">\n    <button class="js-confirm btn btn-block btn-green" style="margin: 0px;">确定</button>\n</div>'
}), define("text!wap/trade/confirm/view/luckymoney/templates/item.html", [], function() {
    return "<div class=\"label-check-img\"></div>\n<div class=\"coupon-info\">\n	<p class=\"font-size-20 c-orange\">￥<%=(parseInt(luckyMoney.discount_fee)/100).toFixed(2) %></p>\n	<p class=\"font-size-12 c-gray-dark\">\n	有效期：<%= luckyMoney.start_time.split(' ')[0].replace('-', '.') %> ~ <%= luckyMoney.end_time.split(' ')[0].replace('-', '.') %>\n	</p>\n</div>\n"
}), define("wap/trade/confirm/view/luckymoney/views/item", ["text!wap/trade/confirm/view/luckymoney/templates/item.html"], function(e) {
    var t = function() {
    };
    return Backbone.View.extend({tagName: "li",className: "block-item coupon-item",template: _.template(e),events: {click: "onClick"},initialize: function(e) {
            this.listenTo(this.model, "change", this.render), this.listenTo(this, "active", this.onActive), this.onActiveChange = e.onActiveChange || t
        },render: function() {
            return this.$el.html(this.template({luckyMoney: this.model.toJSON()})), 1 == this.model.get("active") && this.doActive(), this
        },onActive: function(e) {
            e.active_token != this.model.get("token") ? this.doDeActive() : this.doActive()
        },doDeActive: function() {
            this.$el.removeClass("active"), this.model.set("active", !1)
        },doActive: function() {
            this.$el.addClass("active"), this.model.set("active", !0)
        },onClick: function(e) {
            e.preventDefault(), this.model.get("active") ? this.doDeActive() : this.doActive(), this.onActiveChange({isActive: this.model.get("active"),active_token: this.model.get("token")})
        }})
}), define("wap/trade/confirm/view/luckymoney/views/selector_view", ["zenjs/list/sort_list", "text!wap/trade/confirm/view/luckymoney/templates/selector.html", "wap/trade/confirm/view/luckymoney/views/item"], function(e, t, i) {
    var s = Backbone.View.extend({events: {"click .js-close": "hide","click .js-confirm": "onConfirm"},initialize: function(e) {
            this.luckyMoneyList = e.collection, this.onLuckyMoneyChanged = e.onLuckyMoneyChanged, this.active_token = e.active_token, _.bindAll(this, "hide", "onConfirm")
        },render: function() {
            return this.$el.append(t), this.listOpt = {el: this.$(".js-coupon-list"),collection: this.luckyMoneyList,itemView: i,itemOptions: {onActiveChange: _(this.onActiveChange).bind(this)},finishedHTML: " ",emptyHTML: " "}, this.luckyMoneyListView = new e(this.listOpt), this.luckyMoneyListView.render(), this.hightLightItem(this.active_token), this
        },hide: function() {
            this.onHide()
        },onConfirm: function() {
            this.onLuckyMoneyChanged(this.luckyMoneyList.findWhere({active: !0})), this.hide()
        },onActiveChange: function(e) {
            e.isActive && this.hightLightItem(e.active_token)
        },hightLightItem: function(e) {
            this.luckyMoneyListView.dispatchEventToAllViews("active", {active_token: e})
        }});
    return s
}), define("text!wap/trade/confirm/view/luckymoney/templates/used.html", [], function() {
    return '<div class="block-item order-coupon">\n    <h4 class="block-item-title">红包</h4>\n    <div class="coupon-info-container">\n	    <div class="js-normal-coupon coupon-info c-gray-dark">\n	        <span class="coupon-title">已抵用￥<%= (parseInt(luckyMoney.discount_fee)/100).toFixed(2) %></span>\n	    </div>\n	    <% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n		<% } %>\n	</div>\n</div>'
}), define("text!wap/trade/confirm/view/luckymoney/templates/available.html", [], function() {
    return '<div class="block-item order-coupon">\n    <h4 class="block-item-title">红包</h4>\n    <div class="coupon-info-container">\n	    <div class="js-normal-coupon coupon-info c-gray-dark">\n	    	<span class="pull-right <% if ( orderState < 3 ) { %>js-change-coupon<% } %>">您有 <%=available %> 个可用的红包</span>\n	    </div>\n	    <% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n	    <% } %>\n	</div>\n</div>'
}), define("text!wap/trade/confirm/view/luckymoney/templates/empty.html", [], function() {
    return '<div class="block-item order-coupon relative">\n    <h4 class="block-item-title">红包</h4>\n    <div class="coupon-info-container">\n    	<div class="js-normal-coupon coupon-info c-gray-dark">\n    	    <span class="<% if ( orderState < 3 ) { %>js-change-coupon<% } %>">使用红包</span>\n    	</div>\n    	<% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n	    <% } %>\n    </div>\n\n</div>\n'
}), define("wap/trade/confirm/view/luckymoney/main", ["wap/trade/confirm/view/luckymoney/views/selector_view", "wap/components/popup", "text!wap/trade/confirm/view/luckymoney/templates/used.html", "text!wap/trade/confirm/view/luckymoney/templates/available.html", "text!wap/trade/confirm/view/luckymoney/templates/empty.html"], function(e, t, i, s, n) {
    var o = Backbone.View.extend({events: {"click .coupon-info-container": "showLuckyMoneySelector"},usedTemplate: _.template(i),availableTemplate: _.template(s),emptyTemplate: _.template(n),initialize: function(e) {
            var t = window._global;
            this.luckyMoneyData = t.lucky_money || {list: []}, this.orderState = t.order_state || 0, this.onluckyMoneyChanged = e.onluckyMoneyChanged
        },render: function(e) {
            var t = this.luckyMoneyData, i = t.used, s = this.luckyMoneyData["default"], n = this;
            return s && t.list.length > 0 ? (this.show(), this.luckyMoneyData.list.every(function(e) {
                return e.token == s ? (n.updateLuckyMoneyPanel(e), !0) : void 0
            })) : i ? (this.show(), this.updateLuckyMoneyPanel(i), this.stopShowLuckyMoneySelector = !0) : this.hide(), this
        },setData: function(e) {
            e && (this.luckyMoneyData = e, this.render())
        },hide: function() {
            this.$el.addClass("hide")
        },show: function() {
            this.$el.removeClass("hide")
        },showLuckyMoneySelector: function() {
            this.stopShowLuckyMoneySelector || (this.popView || (this.popView = new t({contentViewClass: e,contentViewOptions: {collection: new Backbone.Collection(this.luckyMoneyData.list),onLuckyMoneyChanged: _(this.onLuckyMoneyChanged).bind(this),active_token: this.usedLuckyMoney.token},containerCss: {bottom: 0,left: 0,right: 0,background: "#f9f9f9"},doNotRemoveOnHide: !0}).render(), this.selectorView = this.popView.contentView), this.popView.show())
        },updateLuckyMoneyPanel: function(e) {
            var t = this, i = "";
            if (this.usedLuckyMoney = e, e)
                i = t.usedTemplate({orderState: t.orderState,luckyMoney: e});
            else {
                var s = this.luckyMoneyData.list.length;
                i = s > 0 ? t.availableTemplate({orderState: t.orderState,available: s}) : t.emptyTemplate({orderState: t.orderState})
            }
            t.$el.html(i), t.show(), this.onluckyMoneyChanged(e)
        },onLuckyMoneyChanged: function(e) {
            this.updateLuckyMoneyPanel(e ? e.toJSON() : null)
        },disableSelector: function() {
            this.stopShowLuckyMoneySelector = !0, this.$(".arrow").addClass("hide")
        }});
    return o
}), define("text!wap/trade/confirm/templates/totlePrice.html", [], function() {
    return "<p>￥<%= (data.goods_price/100).toFixed(2) %> + ￥<%= (data.postage/100).toFixed(2) %>运费\n    <% if (data.decrease!=undefined && data.decrease!=0) { %>\n        - ￥<%= (data.decrease/100).toFixed(2) %>优惠\n    <% } %>\n    <% if (data.reduce_money!=undefined && data.reduce_money!=0) { %>\n        - ￥<%= (data.reduce_money/100).toFixed(2) %>满减优惠\n    <% } %>\n    <% if (data.operation_price!=undefined && data.operation_price!=0) { %>\n        <%= (data.operation_price > 0) ? '+' : '-' %> ￥<%= new Number(Math.abs(data.operation_price)/100).toFixed(2) %>改价\n    <% } %>\n</p>\n<strong class=\"js-real-pay c-orange js-real-pay-temp\">\n    需付：￥<%= getFinalPrice() %>\n</strong>"
}), define("wap/trade/confirm/view/priceBrain", ["text!wap/trade/confirm/templates/totlePrice.html"], function(e) {
    var t = _.template(e);
    return Backbone.View.extend({initialize: function(e) {
            this.nTotalPrice = $(".js-order-total");
            var t = e.ump || {}, i = (((t.order || {}).coupons || {}).money || {}).order || e.initPayData || {}, s = (t.order || {}).operation, n = _global.order.group || [];
            this.priceData = {goods_price: i.goods_price || 0,postage: i.postage || 0,groups: n || [],reduce_money: ((t.order || {}).reduce || {}).cash || 0,operation_price: 0,decrease: 0}, s && (this.priceData.operation_price = s.new_pay - s.origin_pay || 0)
        },changePrice: function() {
            var e = this.getShowData();
            this.nTotalPrice.html(t({data: e,getFinalPrice: _(function() {
                    return (this.getFinalPrice(e) / 100).toFixed(2)
                }).bind(this)}))
        },getShowData: function() {
            var e = this.priceData, t = this.couponData, i = e.postage, s = this.luckyMoney;
            return this.isSelfFetch && (i = 0), e.decrease = 0, t && (e.decrease = t.order.decrease), s && (e.decrease += parseInt(s.discount_fee)), _.extend(e, {postage: i})
        },getFinalPrice: function(e) {
            var e = e || this.getShowData();
            return +e.goods_price + +e.postage - e.reduce_money - e.decrease + e.operation_price
        },setPostage: function(e) {
            this.priceData.postage = e
        },setPriceData: function(e) {
            this.priceData = $.extend(this.priceData, e || {})
        }})
}), define("wap/components/wx_image_preview", [], function() {
    function e(e) {
        var t = e.attr("data-src") || e.attr("src"), i = t.replace(/!.*?\.jpg/i, "!640x320.jpg");
        return i
    }
    function t(e) {
        var t, i, s = 2;
        for (i = 0; s > i; i++)
            if (e = e.parent(), t = e.attr("href"), t && /[http|https|tel|mailto]:/i.test(t))
                return !0;
        return !1
    }
    function i() {
        var t = e($(this));
        n(t, [t])
    }
    var s = [], n = function(e, t) {
        window.WeixinJSBridge && window.WeixinJSBridge.invoke("imagePreview", {current: e,urls: t})
    }, o = {init: function() {
            var o = $(".js-view-image"), a = 0;
            o.each(function() {
                var i = $(this), o = e(i);
                t(i) || i.width() >= a && o && (s.push(o), i.on("click", function() {
                    n(o, s)
                }))
            }), $(".js-view-image-list").each(function(i) {
                var s = $(this);
                s.on("click", ".js-view-image-item", function(i) {
                    var o = s.find(".js-view-image-item");
                    if (!t($(i.target))) {
                        o = o.map(function() {
                            var t = $(this);
                            return e(t)
                        }).toArray();
                        var a = e($(this));
                        n(a, o)
                    }
                })
            }), $(document.body).off("click", ".js-view-single-image", i).on("click", ".js-view-single-image", i)
        },clear: function() {
            s = []
        }};
    return window.imagePreview = o, o
}), define("wap/trade/confirm/view/goods_list", [], function() {
    return Backbone.View.extend({initialize: function(e) {
            this.nList = this.$(".js-goods-list")
        },resolveErrData: function(e) {
            e = e || {};
            var t = this;
            _.each(e, function(e, i, s) {
                var n = t.nList.find(".block-item.block-sku-" + e.id + " .js-error");
                n.html(e.error_msg).removeClass("hide")
            })
        }})
}), require(["wap/trade/confirm/view/logistics_express_kdt", "wap/trade/confirm/view/logistics_express_wx", "wap/trade/confirm/view/logistics_selffetch_kdt", "wap/components/address/main", "wap/components/util/address", "wap/components/pop_page", "wap/trade/confirm/view/payView", "wap/trade/message_view", "wap/trade/confirm/view/order_message", "wap/trade/confirm/view/coupon/main", "wap/trade/confirm/view/luckymoney/main", "wap/trade/confirm/view/priceBrain", "wap/components/wx_image_preview", "wap/trade/confirm/view/goods_list", "text!wap/trade/confirm/templates/totlePrice.html"], function(e, t, i, s, n, o, a, r, d, c, l, h, p, u, f) {
    Backbone.EventCenter = _.extend({}, Backbone.Events);
    var m = window._global, w = Backbone.View.extend({initialize: function(n) {
            this.order_no = m.order_no || "", this.order = m.order, Backbone.EventCenter.on("address_list:show", this.hideContainer), Backbone.EventCenter.on("address_list:hide", this.showContainer), Backbone.EventCenter.on("address:has", this.showPaymentArea), Backbone.EventCenter.on("address:change", this.showPaymentArea), Backbone.EventCenter.on("address:beforeExpressSend", this.hidePaymentArea), Backbone.EventCenter.on("address:beforeExpressSend", _(this.addExternalGoodsData).bind(this)), Backbone.EventCenter.on("address:book:error", _(this.onBookError).bind(this)), this.goodsListView = new u({el: this.$(".js-goods-list-container")}), m.coupons && !m.coupons.forbid_coupon && (this.couponView = new c({onCouponChanged: _(function(e) {
                    this.priceBrainView.couponData = e, this.priceBrainView.changePrice(), this.payContainerView.refreshConfirmBtn(this.priceBrainView.getFinalPrice())
                }).bind(this)})), m.lucky_money && !m.lucky_money.forbid && this.initLuckyMoneyPanel();
            var o = $("#js-logistics-container");
            o.length > 0 ? this.expressWaysView = new s({el: o,onAddressChanged: _(this.onAddressChanged).bind(this),logisticsExpressKdtView: e,logisticsExpressWxView: t,logisticsSelfFetchKdtView: i,onWxAddressFailed: _(this.hideWxPay).bind(this),not_saveToSever: m.order_state > 2,expressOptions: {saveAddressToServer: !0,saveAddressUrl: m.url.trade + "/trade/order/address.json"}}) : this.order_no || this.bookGoods(), this.orderMessageView = new d({el: $(".js-order-message")}).render(), this.nPayWayContainer = $("#confirm-pay-way-opts");
            var r = m.url.trade;
            this.payContainerView = new a({payWays: m.payWays,innerPayWays: m.innerPayWays,payWaysContainer: this.nPayWayContainer,getPresentBtn: $("#get-present-btn"),nPayTips: $(".js-pay-tip"),payUrl: r + "/trade/order/pay.json",wxReturnUrl: r + "/pay/wxpay/return.json",wxPayResultUrl: r + "/trade/order/result?order_no=" + m.order_no + "&kdt_id=" + m.kdt_id + "&order_paid=1#wechat_webview_type=1&refresh",order_no: m.order_no,kdt_id: m.kdt_id,pagePayWaySize: parseInt(m.pagePayWaySize || 2),onPayOrderCreated: _(this.onPayOrderCreated).bind(this),getPayDataExtr: _(this.getPayDataExtr).bind(this),orderType: m.order_type,itemOptions: {onWxPayError: _(this.showWxScanPay).bind(this)}}), this.priceBrainView = new h({ump: m.ump || {},initPayData: m.pay_data || {}}), $.fn.MiniCounter && $(".js-mini-counter").MiniCounter({callback: function(e) {
                    $(".js-counter-msg").html('<h3>订单状态：您的订单已取消。</h3><hr /><p class="c-orange">您的订单因超时未付款，已经自动取消。</p>')
                }}), p.init(), m.order_state > 2 && this.showPaymentArea()
        },render: function() {
            return this.expressWaysView && this.expressWaysView.render(), this.priceBrainView.changePrice(), this.couponView && this.couponView.render(), this.luckyMoneyView && this.luckyMoneyView.render(), this.payContainerView.refreshConfirmBtn(this.priceBrainView.getFinalPrice()), this.payContainerView.render(), this
        },events: {"click .js-show-message": "onShowMessageClicked","click .js-qrcode": "onQrcodeTouch"},getPayDataExtr: function() {
            var e = {}, t = (this.luckyMoneyView || {}).usedLuckyMoney || {}, i = this.couponView && this.couponView.getCouponData();
            if (i) {
                var s = i.coupon;
                s && (e.coupon_id = s.id, e.coupon_type = s.type)
            }
            e.lucky_money_alias = t.activity_alias, e.lucky_money_token = t.token;
            var n = this.orderMessageView.getMsg();
            if (!this.orderMessageView.validate(n))
                return !1;
            if (e.order_message = n.order_message || "", !this.expressWaysView)
                return e;
            var o = this.expressWaysView.logisticsWay, a = this.expressWaysView.logisticsViews[o];
            a.address;
            if ("express" === o)
                return a.cannotDeliver ? (motify.log("该地区暂不支持配送<br/>请修改收货地址"), !1) : a.sendingToServer ? (motify.log("收货地址提交中，请稍等"), 
                !1) : (e.express_type = o, e);
            var r = $(".js-self-fetch .js-name").val().trim(), d = $(".js-self-fetch .js-phone").val().trim(), c = $(".js-self-fetch .js-time[type=date]").val().trim(), l = $(".js-self-fetch .js-time[type=time]").val().trim();
            return r ? Utils.validPhone(d) || Utils.validMobile(d) ? c && l ? _.extend(e, {user_name: r,user_tel: d,user_time: c + " " + l,express_type: o,lucky_money_alias: t.activity_alias,lucky_money_token: t.token}) : (motify.log("请填写预约时间"), !1) : (motify.log("请填写正确的联系方式"), !1) : (motify.log("请填写您的姓名！"), !1)
        },hideWxPay: function() {
        },onShowMessageClicked: function(e) {
            this.messagePopPage = new o({nPageContents: [$("#js-page-content")],el: $("#sku-message-poppage"),contentViewClass: r,contentViewOptions: {nTarget: $(e.target)}}).render().show()
        },onPayOrderCreated: function(e) {
            this.expressWaysView && this.expressWaysView.onPayOrderCreated(e), this.luckyMoneyView && this.luckyMoneyView.disableSelector()
        },hideContainer: function() {
        },showContainer: function() {
        },showPaymentArea: function() {
            $(".js-step-topay").removeClass("hide")
        },hidePaymentArea: function() {
            $(".js-step-topay").addClass("hide")
        },addExternalGoodsData: function(e) {
            if (this.order_no)
                return void (e.address.order_no = this.order_no);
            var t = m.goods_list || [], i = m.common || {};
            e.goods_list = t, e.common = i
        },onAddressChanged: function(e) {
            var t = e.data || {};
            if (!this.order_no && t.order_no && this.setDataAfterBook(t), !this.luckyMoneyView && t.lucky_money && this.initLuckyMoneyPanel(), this.luckyMoneyView && this.luckyMoneyView.setData(t.lucky_money), this.isSelfFetch = "self-fetch" === e.logisticsWay, this.priceBrainView.isSelfFetch = this.isSelfFetch, this.payContainerView.updatePayWayList({code: "codpay",name: this.isSelfFetch ? "到店付款" : "货到付款"}), e.isResetPriceData) {
                var i = t.pay_data.group, s = this.order.group, n = 0, o = 0;
                if (i)
                    for (var a in i)
                        n = this.isSelfFetch ? 0 : i[a].postage, o = ((s[a].pay_price + n) / 100).toFixed(2), this.$("#postage-total-" + a).text("￥" + (n / 100).toFixed(2)), this.$("#sum-price-" + a).text("￥" + o);
                else {
                    var a = m.kdt_id;
                    o = ((s[a].pay_price + n) / 100).toFixed(2), this.$("#postage-total-" + a).text("￥" + n.toFixed(2)), this.$("#sum-price-" + a).text("￥" + o)
                }
                this.setTotalPrice(t)
            }
            this.priceBrainView.changePrice(), this.payContainerView.refreshConfirmBtn(this.priceBrainView.getFinalPrice())
        },initLuckyMoneyPanel: function() {
            this.luckyMoneyView = new l({el: $(".js-lm-panel"),onluckyMoneyChanged: _(function(e) {
                    this.priceBrainView.luckyMoney = e, this.priceBrainView.changePrice(), this.payContainerView.refreshConfirmBtn(this.priceBrainView.getFinalPrice())
                }).bind(this)})
        },onBookError: function(e) {
            this.goodsListView.resolveErrData(e.book_error)
        },showWxScanPay: function() {
            var e = this;
            e.isQrCodeShowed || $.ajax({url: "/v2/trade/native/qrCode.json",type: "GET",dataType: "json",data: {order_no: e.order_no,kdt_id: m.kdt_id},success: function(t) {
                    e.isQrCodeShowed || (t && 0 == t.code || alert("数据错误，请刷新"), e.nPayWayContainer.css("margin-top", "10px"), e.nPayWayContainer.before((t.data || {}).tpl), $("body").scrollTop(e.nPayWayContainer.offset().top), e.isQrCodeShowed = !0)
                }})
        },onQrcodeTouch: function() {
            $(".js-scan-pay-finish").removeClass("hide")
        },bookGoods: function() {
            var e = this, t = {};
            this.addExternalGoodsData(t), $.ajax({url: "/v2/trade/order/book.json",type: "POST",dataType: "json",data: t,beforeSend: function() {
                    e.hidePaymentArea()
                },success: function(t) {
                    if (0 != t.code)
                        return void motify.log("下单失败");
                    var i = t.data || {};
                    e.setDataAfterBook(i), e.setTotalPrice(i), e.showPaymentArea()
                }})
        },setDataAfterBook: function(e) {
            this.order_no = e.order_no, this.couponView && this.couponView.setOrderNo(this.order_no), this.payContainerView.refreshData({order_no: this.order_no,wxPayResultUrl: m.url.trade + "/trade/order/result?order_no=" + this.order_no + "&kdt_id=" + m.kdt_id + "&order_paid=1#wechat_webview_type=1&refresh"})
        },setTotalPrice: function(e) {
            var e = e || {}, t = e.pay_data || {}, i = (e.ump || {}).operation || {}, s = (e.ump || {}).reduce || {}, n = e.coupons, o = t.group, a = 0;
            for (var r in o)
                a += o[parseInt(r)].postage;
            this.priceBrainView.setPriceData({postage: a,groups: o,reduce_money: s.cash || 0,operation_price: i.new_pay - i.origin_pay || 0}), this.couponView && this.couponView.setCoupons(n), 0 === i.is_allow_preference ? this.couponView && this.couponView.hideCoupon() : this.couponView && this.couponView.showCoupon()
        }});
    window.confirmView = new w({el: $("body")}).render()
}), define("main", function() {
});
window.Utils = window.Utils || {}, $.extend(window.Utils, {validMobile: function(e) {
        return e = "" + e, /^((\+86)|(86))?(1)\d{10}$/.test(e)
    },validPhone: function(e) {
        return e = "" + e, /^0[0-9\-]{10,13}$/.test(e)
    },validNumber: function(e) {
        return /^\d+$/.test(e)
    },validEmail: function(e) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e)
    },validPostalCode: function(e) {
        return e = "" + e, /^\d{6}$/.test(e)
    }}), define("wap/components/util/valid", function() {
}), define("wap/components/address/model/address", ["wap/components/util/valid"], function() {
    return Backbone.Model.extend({url: "/v2/buyer/address/item.json",defaults: {tel: "",province: "",postal_code: "",county: "",city: "",area_code: "",address_detail: "",user_name: ""},validate: function(e) {
            var t = window.Utils;
            return e.user_name ? e.tel ? e.address_detail ? "" === e.postal_code || t.validPostalCode(e.postal_code) ? t.validMobile(e.tel) || t.validPhone(e.tel) ? void 0 : {msg: "请填写正确的<br />手机号码或电话号码",name: "tel"} : {msg: "邮政编码格式不正确",name: "postal_code"} : {msg: "请填写详细地址",name: "address_detail"} : {msg: "请填写联系电话",name: "tel"} : {msg: "请填写名字",name: "user_name"}
        },update: function(e, t) {
            return $.ajax({url: this.url,type: t || "POST",dataType: "JSON",data: e})
        }})
}), define("wap/components/address/collection/express_address_collection", ["wap/components/address/model/address"], function(e) {
    return Backbone.Collection.extend({model: e,url: "/v2/buyer/address/list.json?kdt_id=" + window._global.kdt_id,parse: function(e) {
            var t = (e || {}).data || [];
            return this.total = parseInt(t.length), t
        }})
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {makeRandomString: function(e) {
        var t = "", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        e = e || 10;
        for (var s = 0; e > s; s++)
            t += i.charAt(Math.floor(Math.random() * i.length));
        return t
    }}), define("wap/components/util/number", function() {
}), define("text!wap/components/address/templates/addressForm.html", [], function() {
    return '\n<form class="js-address-fm address-ui address-fm">\n    <h4 class="address-fm-title">收货地址</h4>\n    <div class="js-address-cancel publish-cancel">\n        <div class="cancel-img"></div>\n    </div>\n    <div class="block" style="margin:0;">\n        <% if(typeof data.id !== \'undefined\') { %>\n            <input type="hidden" name="id" value="<%=data.id %>" />\n        <% } %>\n        <div class="block-item">\n            <label class="form-row form-text-row">\n                <em class="form-text-label">收货人</em>\n                <span class="input-wrapper"><input type="text" name="user_name" class="form-text-input" value="<%=data.user_name %>" placeholder="名字" /></span>\n            </label>\n        </div>\n        <div class="block-item">\n            <label class="form-row form-text-row">\n                <em class="form-text-label">联系电话</em>\n                <span class="input-wrapper"><input type="tel" name="tel" class="form-text-input" value="<%=data.tel %>" placeholder="手机或固话" /></span>\n            </label>\n        </div>\n        <div class="block-item">\n            <div class="form-row form-text-row">\n                <em class="form-text-label">选择地区</em>\n                <div class="input-wrapper input-region js-area-select">\n\n                </div>\n            </div>\n        </div>\n        <div class="block-item">\n            <label class="form-row form-text-row">\n                <em class="form-text-label">详细地址</em>\n                <span class="input-wrapper"><input type="text" name="address_detail" class="form-text-input" value="<%=data.address_detail %>" placeholder="街道门牌信息" /></span>\n            </label>\n        </div>\n        <div class="block-item">\n            <label class="form-row form-text-row">\n                <em class="form-text-label">邮政编码</em>\n                <span class="input-wrapper"><input type="tel" maxlength="6" name="postal_code" class="form-text-input" value="<%=data.postal_code %>" placeholder="邮政编码(选填)" /></span>\n            </label>\n        </div>\n    </div>\n    \n    <div>\n        <div class="action-container">\n            <a class="js-address-save btn btn-block btn-green">保存</a>\n            <% if(typeof data.id !== \'undefined\' && !cannotDelete) { %>\n            <a class="js-address-delete btn btn-block">删除收货地址</a>\n            <% } %>\n        </div>\n    </div>\n</form>\n'
}), window.zenjs = window.zenjs || {}, function(e) {
    var t = {}, i = {}, s = Array.prototype, n = Object.prototype, o = (Function.prototype, n.toString), a = s.slice, r = s.forEach, d = Object.keys, c = t.each = t.forEach = function(e, s, n) {
        if (null != e)
            if (r && e.forEach === r)
                e.forEach(s, n);
            else if (e.length === +e.length) {
                for (var o = 0, a = e.length; a > o; o++)
                    if (s.call(n, e[o], o, e) === i)
                        return
            } else
                for (var d = t.keys(e), o = 0, a = d.length; a > o; o++)
                    if (s.call(n, e[d[o]], d[o], e) === i)
                        return
    };
    t.keys = d || function(e) {
        if (e !== Object(e))
            throw new TypeError("Invalid object");
        var i = [];
        for (var s in e)
            t.has(e, s) && i.push(s);
        return i
    }, t.extend = function(e) {
        return c(a.call(arguments, 1), function(t) {
            if (t)
                for (var i in t)
                    e[i] = t[i]
        }), e
    }, c(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
        t["is" + e] = function(t) {
            return o.call(t) == "[object " + e + "]"
        }
    }), e._ = e._ || t
}(window.zenjs), define("zenjs/util/_", function() {
}), define("zenjs/regions/cache", ["require", "jquery", "zenjs/util/_"], function(e) {
    function t(e, t) {
        p.each(p.keys(e), t)
    }
    function i(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }
    function s(e, t) {
        var i = new l.Deferred;
        return l.ajax({url: e,dataType: "jsonp",data: t}).then(function(e) {
            0 === e.code ? i.resolve(e.data) : i.reject(e.msg)
        }).fail(function() {
            i.reject("fail")
        }), i.promise()
    }
    function n(e) {
        if (void 0 != e) {
            e += "";
            var t = e.length;
            return "00" == e.slice(-2) ? n(e.slice(0, t - 2)) : e
        }
    }
    function o(e, t) {
        if (void 0 != e) {
            e += "";
            var i = t - e.length;
            if (i > 0)
                for (; i--; )
                    e += "0";
            return e
        }
    }
    function a(e, i) {
        t(e, function(t) {
            i[t] = e[t]
        })
    }
    function r(e, t) {
        var i;
        return t = p.extend({}, t), h && h._beforeStr == e ? void 0 : (i = p.isString(e) ? -1 != e.indexOf("r") ? w.cacheAll(t) : -1 != e.indexOf("c") ? w.cacheProvinceCityList(t) : w.cacheProvinceList(t) : w.cacheProvinceList(t), h = i, h._beforeStr = e, i)
    }
    function d(e, i) {
        var r, d = new l.Deferred;
        if (i = p.extend({}, i), 0 > e)
            return [];
        if (void 0 === e)
            return r = [], t(m.province_list, function(e) {
                r.push({id: e,name: m.province_list[e]})
            }), d.resolve(r), d.promise();
        var c, h = n(e), e = o(e, 6), u = [];
        if (c = y[Math.floor(h.length / 2)], void 0 === c)
            d.resolve(u);
        else if (t(m[c], function(e) {
            e.slice(0, h.length) == h && u.push({id: e,name: m[c][e]})
        }), 0 === u.length) {
            var w = f.list;
            if (void 0 !== v[e])
                return v[e];
            v[e] = d.promise(), s(w, {region_id: e,display_short_name: i["short"] || 0}).then(function(e) {
                a(e, m[c]), t(e, function(t) {
                    u.push({id: t,name: e[t]})
                }), d.resolve(u)
            }).always(function() {
                delete v[e]
            })
        } else
            d.resolve(u);
        return d.promise()
    }
    function c(e, t) {
        return t = p.extend({}, t), h ? h.then(function() {
            return d(e, t)
        }) : d(e, t)
    }
    var l = e("jquery");
    e("zenjs/util/_");
    var h, p = zenjs._, u = _global.url.www + "/common/region", f = {cityList: "/cityList.jsonp",countyList: "/countyList.jsonp",provinceList: "/provinceList.jsonp",provinceCityList: "/provinceCityList.jsonp",list: "/list.jsonp",all: "/all.jsonp"}, m = {}, w = {}, y = ["province_list", "city_list", "county_list"], v = {};
    return t(y, function(e) {
        m[y[e]] = {}
    }), t(f, function(e) {
        f[e] = u + f[e], -1 != ["provinceList", "provinceCityList", "all"].indexOf(e) && (w["cache" + i(e)] = function(t) {
            return t = p.extend({}, t), s(f[e], {display_short_name: t["short"] || 0}).then(function(t) {
                return p.extend(m, "provinceList" == e ? {province_list: t} : t), l.Deferred().resolve(m)
            })
        })
    }), {preload: r,loadList: c}
}), define("wap/components/area/model", ["zenjs/regions/cache"], function(e) {
    var t = function() {
    }, i = Backbone.Model.extend({defaults: {finalCode: 0},initialize: function() {
            return e.preload("pc"), this
        },getList: function(i) {
            i = i || {};
            var s = i.callback || t, n = i.code;
            e.loadList(n).then(_(function(e) {
                s(e)
            }).bind(this))
        }});
    return i
}), define("text!wap/components/area/templates/areaSelect.html", [], function() {
    return '<span>\n	<select id="province" name="province" class="address-province" data-next-type="城市" data-next="city">\n		<option data-code="0" value="省份">选择省份</option>\n	</select>\n</span>\n<span>\n	<select id="city" name="city" class="address-city" data-next-type="区县" data-next="county">\n		<option data-code="0" value="城市">选择城市</option>\n	</select>\n</span>\n<span>\n	<select id="county" name="county" class="address-county">\n		<option data-code="0" value="区县">选择区县</option>\n	</select>\n</span>'
}), define("text!wap/components/area/templates/areaOption.html", [], function() {
    return '<option data-code="0" value="<%= type %>">选择<%= type %></option>\n<% _.each(data, function(value, key, list){ %>\n	<option data-code="<%= value.id %>" value="<%= value.name %>" <%- value.id == selectedValue ? \'selected\' : \'\' %>>\n		<%= value.name %>\n	</option>\n<%}) %>\n\n'
}), define("wap/components/area/main", ["wap/components/area/model", "text!wap/components/area/templates/areaSelect.html", "text!wap/components/area/templates/areaOption.html"], function(e, t, i) {
    var s = function() {
    }, n = Backbone.View.extend({optionTemplate: _.template(i),initialize: function(i) {
            return i = i || {}, this.loadingAddress = !1, this.mobile_system = i.mobile_system, this.areaSelectTpl = i.areaSelectTpl || t, this.model = new e, this
        },events: {"change .address-province, .address-city": "changeArea","change .address-county": "changeCounty"},render: function(e) {
            return e = e || {}, this.$el.append(this.areaSelectTpl), this.defaultCode = e.dfcode, this.nProvince = this.$(".address-province"), this.nCity = this.$(".address-city"), this.nCountry = this.$(".address-county"), "ios" == this.mobile_system && this.$("select").on("touchend", function(e) {
                e.preventDefault()
            }), this.defaultCode ? (this.setArea(this.defaultCode), this) : (this.loadList("province", "省份", 0), this)
        },reset: function(e) {
            switch (e) {
                case "province":
                    this.nCity.html(this.optionTemplate({type: "城市",data: []}));
                case "city":
                    this.nCountry.html(this.optionTemplate({type: "区县",data: []}))
            }
            this.model.set("finalCode", 0)
        },changeCounty: function() {
            var e = this.$(".address-county option:selected").data("code");
            this.model.set("finalCode", e)
        },changeArea: function(e) {
            if (!this.loadingAddress) {
                var t = $(e.target), i = t.find("option:selected").data("code"), s = t.data("next-type"), n = t.attr("id"), o = t.data("next");
                this.reset(n), 0 != i && this.loadList(o, s, 0, i)
            }
        },loadList: function(e, t, i, n, o) {
            this.loadingAddress = !0, o = o || s, this.model.getList({code: n,callback: _(function(s) {
                    this.loadingAddress = !1, this.$(".address-" + e).html(this.optionTemplate({data: s,type: t,selectedValue: i})), o(s)
                }).bind(this)})
        },setArea: function(e) {
            if (e) {
                var t = 1e4 * parseInt(e / 1e4), i = 100 * parseInt(e / 100);
                this.loadList("province", "省份", t, 0, _(function() {
                    this.loadList("city", "城市", i, t, _(function() {
                        this.loadList("county", "区县", e, i), this.model.set("finalCode", e)
                    }).bind(this))
                }).bind(this))
            }
        },getArea: function() {
            return this.model.get("finalCode")
        },isValid: function() {
            var e = function(e, t) {
                motify.log("请选择 " + t), e.addClass("c-red"), e.one("click", function(t) {
                    e.removeClass("c-red")
                })
            };
            return function() {
                return "省份" == this.nProvince.val() ? (e(this.nProvince, "省份"), !1) : "城市" == this.nCity.val() ? (e(this.nCity, "城市"), !1) : "区县" == this.nCountry.val() ? (e(this.nCountry, "区县"), !1) : !0
            }
        }()});
    return n
}), define("wap/components/address/views/logistics_address_edit", ["wap/components/address/model/address", "wap/components/util/number", "text!wap/components/address/templates/addressForm.html", "wap/components/area/main"], function(e, t, i, s) {
    return Backbone.View.extend({template: _.template(i),initialize: function(t) {
            var i = function() {
            };
            window.Utils.makeRandomString();
            this.ajaxType = t.type, this.model = t.model ? t.model : new e, this.doNotSavetoServer = t.doNotSavetoServer, this.cannotDelete = t.cannotDelete, this.onCancelAddAddress = _(function(e) {
                t.onHide(), (t.onCancelAddAddress || i)(e)
            }).bind(this), this.onFinishEditAddress = _(function(e) {
                e = e || {}, t.onHide(), (t.onFinishEditAddress || i)({address_model: e.model,autoPopup: this.autoPopup})
            }).bind(this), this.autoPopup = t.autoPopup === !0, this.listenTo(this.model, "invalid", this.error)
        },events: {"click .js-address-cancel": "onCancelAddress","click .js-address-save": "onSaveClicked","click .js-address-delete": "onDeleteClicked"},render: function() {
            return this.$el.html(this.template({data: this.model.toJSON(),cannotDelete: this.cannotDelete})), this.areaBrainView = new s({el: $(".js-area-select"),mobile_system: window._global.mobile_system}).render({dfcode: this.model.get("area_code")}), this
        },onSaveClicked: function() {
            var e = this, t = $("[name=id]", this.$el), i = this.model.attributes;
            if (_.each(i, function(t, i) {
                e.model.set(i, $("[name=" + i + "]", e.$el).val() || "")
            }), this.model.set("id", t.length > 0 ? t.val() : ""), this.model.isValid()) {
                if (!this.areaBrainView.isValid())
                    return;
                if (this.model.set("area_code", this.areaBrainView.getArea()), this.doNotSavetoServer)
                    return void this.onFinishEditAddress({model: this.model});
                this.model.update(i, this.ajaxType).done(function(t) {
                    var i = JSON.parse(t);
                    0 == i.code ? (i.data.id !== !0 && 1 !== i.data.id && e.model.set("id", i.data.id), e.onFinishEditAddress({model: e.model})) : motify.log("更新收货地址失败")
                }).fail(function() {
                    motify.log("更新收货地址失败")
                })
            }
        },onCancelAddress: function() {
            confirm("确定要放弃此次编辑嘛？") && this.onCancelAddAddress({autoPopup: this.autoPopup})
        },onDeleteClicked: function(e) {
            e.stopPropagation();
            var t = this;
            if (confirm("确定要删除这个收获地址么？")) {
                var i = $("[name=id]", this.$el).val();
                this.model.destroy({processData: !0,data: {id: i},wait: !0,success: function(e, i, s) {
                        return i = i || {}, t.onFinishEditAddress(), !0
                    },error: function() {
                        motify.log("删除失败。。。")
                    }})
            }
        },error: function(e, t) {
            return "area_code" == t.name ? void this.areaBrainView.isValid() : (motify.log(t.msg), void this.$el.find('input[name="' + t.name + '"]').focus())
        }})
}), define("zenjs/backbone/base_view", ["zenjs/core/trigger_method"], function(e) {
    return Backbone.View.extend({clean: function() {
            return this.stopListening(), this
        },triggerMethod: e})
}), define("zenjs/list/list", ["zenjs/backbone/base_view"], function(e) {
    var t = function() {
    };
    return e.extend({initialize: function(e) {
            return this.options = e = e || {}, this.items = [], this.itemView = e.itemView, this.itemOptions = e.itemOptions || {}, this.collection = e.collection, this.onAfterListChange = e.onAfterListChange || t, this.onAfterListLoad = e.onAfterListLoad || t, this.onAfterListDisplay = e.onAfterListDisplay || t, this.onListEmpty = e.onListEmpty || e.onEmptyList || this._onListEmpty, this.onItemClick = e.onItemClick || t, this.onViewItemAdded = e.onViewItemAdded || t, this.displaySize = e.displaySize || -1, this.emptyHTML = e.emptyHTML || "", this.emptyText = e.emptyText || "列表为空", this
        },render: function(e) {
            return this.displaySize = -1 == (e || {}).displaySize ? -1 : this.displaySize, this.clean(), this._setupListeners(), this.addAll(), this.onAfterListDisplay({list: this.collection}), this
        },fetchRender: function(e) {
            return this.collection.fetch({data: e,success: _(function(e, t) {
                    this.render(), this.onAfterListLoad(this.collection, t), this.onFetchSuccess && this.onFetchSuccess()
                }).bind(this)}), this
        },_setupListeners: function() {
            this.collection && (this.stopListening(this.collection), this.listenTo(this.collection, "add", this.addItem, this), this.listenTo(this.collection, "reset sort", this.render, this), this.listenTo(this.collection, "remove", this.onItemRemoved, this))
        },addItemListeners: function(e) {
            var t = this;
            this.listenTo(e, "all", function() {
                var t = "item:" + arguments[0], i = _.toArray(arguments);
                i.splice(0, 1), i.unshift(t, e), this.trigger.apply(this, i), "item:click" == t && this.onItemClick()
            }), this.listenTo(e.model, "change", function() {
                t.onAfterListChange({list: this.collection})
            })
        },addAll: function() {
            0 === this.collection.length ? this.fetching || this.triggerMethod("list:empty") : this.collection.each(function(e) {
                this.addItem(e)
            }, this)
        },removeAll: function() {
            for (var e = this.items.length - 1; e >= 0; e--)
                this.removeView(this.items[e]);
            this.onAfterListChange({list: this.collection})
        },addItem: function(e) {
            if (!(this.displaySize >= 0 && this.items.length >= this.displaySize)) {
                1 == this.collection.length && (this.listEl || this.$el).html("");
                var t = new this.itemView(_.extend({}, this.options.itemOptions, {model: e,index: this.collection.indexOf(e)}));
                return this.items.push(t), this.addItemListeners(t), t.render(), this.onViewItemAdded({list: this.items,viewItem: t}), (this.listEl || this.$el).append(t.el), t
            }
        },removeItem: function(e) {
            var t = this.getViewByModel(e);
            t && this.removeView(t)
        },removeView: function(e) {
            var t;
            this.stopListening(e), e && (this.stopListening(e.model), e.remove(), t = this.items.indexOf(e), this.items.splice(t, 1)), 0 === this.collection.length && (this.fetching || this.triggerMethod("list:empty"))
        },onItemRemoved: function(e) {
            this.onAfterListChange({list: this.collection,action: "remove",model: e}), this.removeItem(e)
        },getViewByModel: function(e) {
            return _.find(this.items, function(t, i) {
                return t.model === e
            })
        },dispatchEventToAllViews: function(e, t) {
            for (var i = this.items.length - 1; i >= 0; i--)
                this.items[i].trigger(e, t)
        },remove: function() {
            e.prototype.remove.call(this, arguments), this.removeAll(), this.collection.reset(), delete this.collection
        },clean: function() {
            e.prototype.clean.call(this, arguments), this.removeAll(), (this.listEl || this.$el).html(""), this.stopListening(this.collection)
        },_onListEmpty: function() {
            this.$el.html(this.emptyHTML || (this.emptyText ? '<p style="text-align:center;line-height:60px;">' + this.emptyText + "</p>" : ""))
        }})
}), define("text!wap/components/address/templates/addressItem.html", [], function() {
    return '<div id="js-address-item-<%= data.id %>" class="js-address-item block-item <%= data.selected %>">\n    <div class="icon-check"></div>\n    <p>\n        <% if(typeof(data.name)!== \'undefined\'){ %>\n            <%= data.name %>, <%= data.tel %>\n        <% } else if(typeof(data.user_name)!== \'undefined\'){ %>\n            <%= data.user_name %>, <%= data.tel %>\n        <% } %>\n    </p>\n    <span class="address-str address-str-sf"><%= data.province %><%= data.city %><%= data.county %><%= data.address_detail %></span>\n    <div class="address-opt <% if( data.address_type==\'express\'){ %> js-edit-address <% } %>">\n        <% if( data.address_type==\'express\'){ %>\n            <i class="icon_circle-info">i</i>\n        <% } %>\n    </div>\n</div>\n'
}), define("wap/components/pop", ["zenjs/events", "wap/components/util/number"], function(e) {
    var t = function() {
    };
    window.zenjs = window.zenjs || {};
    var i = e.extend({init: function(e) {
            this._window = $(window);
            var i = window.Utils.makeRandomString();
            $("body").append('<div id="' + i + '"                 style="display:none; height: 100%;                 position: fixed; top: 0; left: 0; right: 0;                background-color: rgba(0, 0, 0, ' + (e.transparent || ".9") + ');z-index:1000;opacity:0;transition: opacity ease 0.2s;"></div>'), this.nBg = $("#" + i), this.nBg.on("click", $.proxy(function() {
                this.isCanNotHide || this.hide()
            }, this));
            var s = window.Utils.makeRandomString();
            $("body").append('<div id="' + s + '" class="' + (e.className || "") + '" style="overflow:hidden;visibility: hidden;"></div>'), this.nPopContainer = $("#" + s), this.nPopContainer.hide(), e.contentViewClass && (this.contentViewClass = e.contentViewClass, this.contentViewOptions = $.extend({el: this.nPopContainer}, e.contentViewOptions || {}), this.contentView = new this.contentViewClass($.extend({onHide: $.proxy(this.hide, this)}, this.contentViewOptions)), this.contentView.onHide = $.proxy(this.hide, this)), this.animationTime = e.animationTime || 300, this.isCanNotHide = e.isCanNotHide, this.doNotRemoveOnHide = e.doNotRemoveOnHide || !1, this.onShow = e.onShow || t, this.onHide = e.onHide || t, this.onFinishHide = e.onFinishHide || t, this.html = e.html
        },render: function(e) {
            return this.renderOptions = e || {}, this.contentViewClass ? this.contentView.render(this.renderOptions) : this.html && this.nPopContainer.html(this.html), this
        },show: function() {
            return this.top = this._window.scrollTop(), this.nBg.show().css({opacity: "1","transition-property": "none"}), this.nPopContainer.show(), setTimeout($.proxy(function() {
                this._window.scrollTop(0), this.startShow(), this.nPopContainer.show().css("visibility", "visible"), this._doShow && this._doShow(), this.onShow()
            }, this), 200), this
        },hide: function() {
            var e, t = function() {
                return e !== this._window.scrollTop() ? (this._window.scrollTop(e), void setTimeout($.proxy(t, this))) : void setTimeout($.proxy(this.onFinishHide, this), 50)
            };
            return function(i) {
                i = i || {};
                var s = i.doNotRemove || this.doNotRemoveOnHide || !1;
                this._doHide && this._doHide(), setTimeout($.proxy(function() {
                    this.startHide(), e = this.top, this._window.scrollTop(e), $.proxy(t, this)(), this.nBg.css({opacity: 0,"transition-property": "opacity"}), setTimeout($.proxy(function() {
                        this.nBg.hide(), this.nPopContainer.hide(), s || this.destroy(), window.zenjs.popList.length < 1 && $("html").css("position", this.htmlPosition)
                    }, this), 200)
                }, this), this.animationTime), this.onHide()
            }
        }(),destroy: function() {
            return this.nPopContainer.remove(), this.nBg.remove(), this.contentView && this.contentView.remove(), this
        },startShow: function() {
            var e = window.zenjs.popList;
            if (e || (e = window.zenjs.popList = []), 0 === e.length) {
                var t = $("body"), i = $("html");
                this.htmlPosition = i.css("position"), i.css("position", "relative"), this.bodyCss = (t.attr("style") || {}).cssText, this.htmlCss = (i.attr("style") || {}).cssText, $("body,html").css({overflow: "hidden",height: this._window.height()})
            }
            e.indexOf(this) < 0 && e.push(this)
        },startHide: function() {
            var e = window.zenjs.popList, t = e.indexOf(this);
            t > -1 && e.splice(t, 1), e.length < 1 && ($("html").attr("style", this.htmlCss || ""), $("body").attr("style", this.bodyCss || ""))
        }});
    return i
}), define("wap/components/popup", ["wap/components/pop"], function(e) {
    var t = e.extend({init: function(e) {
            this._super(e), this.onClickBg = e.onClickBg || function() {
            }, this.onBeforePopupShow = e.onBeforePopupShow || function() {
            }, this.onAfterPopupHide = e.onAfterPopupHide || function() {
            }, this.nPopContainer.css(_.extend({left: 0,right: 0,bottom: 0,background: "white"}, e.containerCss || {})), this.nPopContainer.css("opacity", "0")
        },_doShow: function() {
            this.contentView && this.contentView.height ? this.height = this.contentView.height() : this.contentView || (this.height = this.nPopContainer.height()), this.onBeforePopupShow(), $(".js-close").click($.proxy(function(e) {
                this.hide()
            }, this)), this.nPopContainer.css({height: this.height + "px",transform: "translate3d(0,100%,0)","-webkit-transform": "translate3d(0,100%,0)",opacity: 0,position: "absolute","z-index": 1e3}), this.bodyPadding = $("body").css("padding"), $("body").css("padding", "0px"), setTimeout($.proxy(function() {
                this.nPopContainer.css({transform: "translate3d(0,0,0)","-webkit-transform": "translate3d(0,0,0)","-webkit-transition": "all ease " + this.animationTime + "ms",transition: "all ease " + this.animationTime + "ms",opacity: 1})
            }, this)), setTimeout($.proxy(function() {
                this.contentView && this.contentView.onAfterPopupShow && this.contentView.onAfterPopupShow()
            }, this), this.animationTime)
        },_doHide: function(e) {
            this.nPopContainer.css({transform: "translate3d(0,100%,0)","-webkit-transform": "translate3d(0,100%,0)",opacity: 0}), setTimeout($.proxy(function() {
                $("body").css("padding", this.bodyPadding), this.onAfterPopupHide()
            }, this), this.animationTime)
        }});
    return t
}), define("wap/components/address/views/logistics_address_list", ["wap/components/address/model/address", "wap/components/address/views/logistics_address_edit", "zenjs/list/list", "text!wap/components/address/templates/addressItem.html", "wap/components/popup"], function(e, t, i, s, n) {
    var o = Backbone.View.extend({initialize: function(e) {
            this.addressType = e.addressType || "self-fetch", this.template = _.template(e.itemTemplateHtml || ""), this.onItemClick = e.onItemClick || function() {
            }, this.highLightItem = e.highLightItem || function() {
            }
        },events: {click: "onClick","click .js-edit-address": "onEditClicked"},onClick: function(e) {
            var t = $(e.target);
            t.hasClass("js-edit-address") || t.hasClass("icon_circle-info") || this.onItemClick({address: this.model.toJSON(),addressType: this.addressType})
        },onEditClicked: function() {
            var e = function() {
                this.render(), this.highLightItem()
            };
            return function(i) {
                new n({contentViewClass: t,contentViewOptions: {onFinishEditAddress: _(e).bind(this),model: this.model,type: "PUT"},containerCss: {bottom: 0,left: 0,right: 0,background: "white"}}).render().show()
            }
        }(),render: function() {
            return this.$el.html(this.template({data: _.extend(this.model.toJSON(), {address_type: this.addressType})})), this
        }});
    return Backbone.View.extend({initialize: function(e) {
            this.template = _.template(e.templateHtml || ""), this.addressType = e.addressType, this.autoPopup = e.autoPopup, this.selectedAddress = e.selectedAddress, this._doHide = function() {
                e.onHide()
            }, this.onAddressChange = e.onAddressChange || function() {
            }, this.onCancel = e.onCancel || function() {
            }, e.collection.comparator = function(e, t) {
                return t.id - e.id
            }, this.listOpt = {itemView: o,finishedHTML: " ",collection: e.collection,itemOptions: {addressType: e.addressType,itemTemplateHtml: s,onItemClick: _(this.onItemClick).bind(this),highLightItem: _(this.highLight).bind(this)},onAfterListDisplay: _(this.onAfterListDisplay).bind(this),onAfterListChange: _(this.onAfterListChange).bind(this)}
        },events: {"click .js-cancel": "onCancelClicked","click .js-add-address": "onAddAddressClicked"},onAfterListChange: function(e) {
            this.onAfterListDisplay(e)
        },onAfterListDisplay: function(e) {
            this.highLight(this.selectedAddress)
        },onItemClick: function(e) {
            this.hide(), this.onAddressChange(e), this.selectedAddress = e.address
        },onCancelClicked: function(e) {
            this.onCancel(this.addressType), this.hide()
        },onAddAddressClicked: function() {
            var i = function(e) {
                e && (this.collection.add(e.address_model), this.selectedAddress = e.address_model, this.onAddressChange({address: e.address_model.toJSON()}), e.autoPopup ? this.hide() : this.render().show())
            }, s = function(e) {
                0 === this.listOpt.collection.length ? this.hide() : this._doShow()
            };
            return function(o) {
                new n({contentViewClass: t,contentViewOptions: {onFinishEditAddress: _(i).bind(this),onCancelAddAddress: _(s).bind(this),type: "POST",autoPopup: (o || {}).autoPopup,model: o.selectedAddress ? new e(o.selectedAddress) : null,cannotDelete: o.cannotDelete},containerCss: {bottom: 0,left: 0,right: 0,background: "white"}}).render().show()
            }
        }(),render: function() {
            return this.$el.html(this.template({address_type: this.addressType})), this.listOpt.el = this.$(".js-address-container"), this.addressListView = new i(this.listOpt), this.listOpt.collection.length > 0 ? this.addressListView.render() : this.addressListView.fetchRender(), this
        },show: function(e) {
            e = e || {}, this._doShow(e.selectedAddress), "express" == this.addressType && 0 === this.listOpt.collection.length && this.onAddAddressClicked(_.extend(e, {cannotDelete: !0,autoPopup: !0}))
        },highLight: function(e) {
            var t = e || this.selectedAddress || {};
            this.$(".address-selected").removeClass("address-selected"), this.$("#js-address-item-" + t.id).addClass("address-selected")
        },_doShow: function(e) {
            this.highLight(e), Backbone.EventCenter.trigger("address_list:show")
        },hide: function(e) {
            this._doHide(), Backbone.EventCenter.trigger("address_list:hide")
        }})
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {getRecentlyUsedAddress: function() {
        var e = null;
        if (window.localStorage) {
            var t = $.trim(window.localStorage.getItem("recently_used_address"));
            if (-1 !== t.indexOf("undefined") && (window.localStorage.removeItem("recently_used_address"), t = ""), t)
                try {
                    e = $.parseJSON(t)
                } catch (i) {
                }
        }
        return e
    },saveLastUsedAddress: function(e) {
        if (!e || !e.user_name)
            return !1;
        var t = JSON.stringify(e);
        if (window.localStorage)
            try {
                window.localStorage.setItem("recently_used_address", t)
            } catch (i) {
            }
    },wx2KdtAddress: function(e) {
        if (!e)
            return null;
        if (!e.userName && e.user_name)
            return e;
        var t = {user_name: e.userName,province: e.proviceFirstStageName,city: e.addressCitySecondStageName,county: e.addressCountiesThirdStageName,address_detail: e.addressDetailInfo,tel: e.telNumber,postal_code: e.addressPostalCode,is_weixin: !0};
        return t
    },kdt2WxAddress: function(e) {
        if (!e)
            return null;
        if (!e.user_name && e.userName)
            return e;
        var t = {userName: e.user_name,proviceFirstStageName: e.province,addressCitySecondStageName: e.city,addressCountiesThirdStageName: e.county,addressDetailInfo: e.address_detail,telNumber: e.tel,addressPostalCode: e.postal_code};
        return t
    },getPureAddressData: function(e) {
        if (!e || !e.userName)
            return !1;
        var t = {userName: e.userName,proviceFirstStageName: e.proviceFirstStageName,addressCitySecondStageName: e.addressCitySecondStageName,addressCountiesThirdStageName: e.addressCountiesThirdStageName,addressDetailInfo: e.addressDetailInfo,telNumber: e.telNumber,addressPostalCode: e.addressPostalCode,area_code: e.nationalCode};
        return t
    },getPureKdtAddressData: function(e) {
        return e && e.userName ? {user_name: e.userName,province: e.proviceFirstStageName,city: e.addressCitySecondStageName,county: e.addressCountiesThirdStageName,address_detail: e.addressDetailInfo,tel: e.telNumber,postal_code: e.addressPostalCode,area_code: e.nationalCode} : !1
    },flashAnimate: function(e) {
        e.addClass("animated flashWarn"), window.setTimeout(function() {
            e.removeClass("flashWarn")
        }, 1e3)
    },getTpl: function(e) {
        var t = $(e);
        return t ? _.template(t.html()) : void 0
    }}), define("wap/components/util/address", function() {
}), define("text!wap/components/address/templates/addressPanel.html", [], function() {
    return '<div class="block block-form block-border-top-none block-border-bottom-none">\n    <div class="js-edit-address js-order-address express-panel express-panel-edit" style="padding-left:0;">\n        <ul class="express-detail">\n            <li class="clearfix"><span class="name">\n                <% if(data.address_type !== \'self-fetch\'){ %>\n                    收货人：\n                <% } else if(data.address_type == \'self-fetch\') { %>\n                    自提点：\n                <% } %>\n                <% if(typeof(data.address.name)!== \'undefined\'){ %>\n                    <%= data.address.name %>\n                <% } else if(typeof(data.address.user_name)!== \'undefined\'){ %>\n                    <%= data.address.user_name %>\n                <% } %>\n            </span><span class="tel"><%= data.address.tel %></span></li>\n            <li class="address-detail">\n                <% if(data.address_type !== \'self-fetch\'){ %>\n                    收货地址：\n                <% } else if(data.address_type == \'self-fetch\') { %>\n                    提货地址：\n                <% } %>\n                <%= data.address.province %><%= data.address.city %><%= data.address.county %><%= data.address.address_detail %>\n            </li>\n        </ul>\n    </div>\n\n    <% if(data.address_type==\'self-fetch\'){ %>\n        <div class="clearfix block-item  <% if( data.order_state > 2) { %> self-fetch-info-show <% } %>">\n            <label>预约人</label>\n            <input  class="txt txt-black ellipsis js-name" placeholder="到店人姓名" value="<%= data.address.user_name %>" <% if( data.order_state > 2) { %> readonly="readonly"<% } %>>\n        </div>\n        <div class="clearfix block-item  <% if( data.order_state > 2) { %> self-fetch-info-show <% } %>">\n            <label>联系方式</label>\n            <input  type=\'text\' class="txt txt-black ellipsis js-phone" placeholder="用于短信接收和便于卖家联系" value="<%= data.address.user_tel %>" <% if( data.order_state > 2) { %> readonly="readonly"<% } %>>\n        </div>\n        <div class="clearfix block-item  <% if( data.order_state > 2) { %> self-fetch-info-show <% } %>">\n            <label class="pull-left">预约时间</label>\n            <input style="width:105px" class="txt txt-black js-time pull-left date-time" type="date" placeholder="日期" value="<%= data.address.user_time.split(\' \')[0] || \'\' %>"  <% if( data.order_state > 2) { %> readonly="readonly"<% } %>/>\n            <input style="width:70px" class="txt txt-black js-time pull-left date-time" type="time" placeholder="时间" value="<%= data.address.user_time.split(\' \')[1] || \'\' %>"  <% if( data.order_state > 2) { %> readonly="readonly"<% } %>/>\n        </div>\n    <% } %>\n</div>\n <% if( data.address_type == \'express\' ){ %>\n    <div class=\'js-logistics-tips logistics-tips font-size-12 c-orange hide\'>很抱歉，该地区暂不支持配送。</div>\n<% } %>\n';
}), define("text!wap/components/address/templates/noAddressPanel.html", [], function() {
    return '<div class="js-order-address express-panel express-panel-no">\n    <div class="js-edit-address empty-address-tip"><span>添加收货地址</span></div>\n</div>\n'
}), define("text!wap/components/address/templates/addressList.html", [], function() {
    return '<div class="js-scene-address-list">\n    <div class="address-ui address-list">\n        <h4 class="address-title"><%= address_type == \'express\' ? \'选择收货地址\' : \'选择自提地址\' %></h4>\n        <div class="cancel-img js-cancel"></div>\n\n        <div class="js-address-container address-container"> </div>\n        <% if(address_type==\'express\'){ %>\n        <div class=\'action-container js-add-address\'>\n            <span class="icon_add"></span>\n            <a class="add-address" href="javascript:;">新增地址</a>\n            <span class="icon_arrow-right"></span>\n        </div>\n        <% } %>\n    </div>\n</div>'
}), define("wap/components/address/views/logistics_express", ["wap/components/address/model/address", "wap/components/address/collection/express_address_collection", "wap/components/address/views/logistics_address_edit", "wap/components/address/views/logistics_address_list", "wap/components/util/address", "text!wap/components/address/templates/addressPanel.html", "text!wap/components/address/templates/noAddressPanel.html", "text!wap/components/address/templates/addressList.html", "wap/components/popup"], function(e, t, i, s, n, o, a, r, d) {
    var c = function() {
    };
    return Backbone.View.extend({initialize: function(e) {
            e = e || {}, e.expressOptions = e.expressOptions || {}, a = e.expressOptions.noAddressPanelTpl || a, o = e.expressOptions.addressPanelTpl || o, this.notAutoPopAddress = e.expressOptions.notAutoPopAddress, this.saveAddressToServer = e.expressOptions.saveAddressToServer, this.saveAddressUrl = e.expressOptions.saveAddressUrl, this.expressOptions = e.expressOptions || {}, this.notAutoPopAddress = this.expressOptions.notAutoPopAddress, this.allow_self_fetch = e.allow_self_fetch, this.address = window._global.expressAddress, this.areaModel = e.areaModel, this.onAddressChanged = e.onAddressChanged || c, this.not_saveToSever = e.not_saveToSever, this.order_state = window._global.order_state, this.template = _.template(o), this.hasAddress() && 0 === window._global.expressType ? this.doNotSaveToServerNextTime = !0 : this.address = Utils.getRecentlyUsedAddress(), this.addressCollection = new t(window._global.address_list || [])
        },events: {"click .js-edit-address": "onChangeAddress"},onChangeAddress: function(t) {
            if (!(this.order_state >= 3)) {
                if (window._global.no_user_login)
                    return void (this.addressEditView = new d({contentViewClass: i,contentViewOptions: {onFinishEditAddress: _(this.onFinishEditAddress).bind(this),model: this.address ? new e(this.address) : null,doNotSavetoServer: !0,cannotDelete: !0,areaModel: this.areaModel},containerCss: {bottom: 0,left: 0,right: 0,background: "white"}}).render().show());
                this.addressListView = new d({contentViewClass: s,contentViewOptions: {templateHtml: r,addressType: "express",collection: this.addressCollection,onAddressChange: _(this.onAddressChange).bind(this),autoPopup: (t || {}).autoPopup,selectedAddress: this.address,areaModel: this.areaModel},containerCss: {bottom: 0,left: 0,right: 0,background: "white"}}).render().show(), this.addressListView.contentView.show(_.extend({selectedAddress: this.address}, t))
            }
        },onFinishEditAddress: function(e) {
            this.address = e.address_model.toJSON(), this.saveAddressToLocal(this.address), this.render()
        },saveAddressToLocal: function(e) {
            Utils.saveLastUsedAddress(e)
        },onAddressChange: function(e) {
            this.address = e.address, this.saveAddressToServer && !this.not_saveToSever ? this.doSaveAddressToServer(this.address, "express") : this.$el.html(this.template({data: {address: this.address,address_type: "express"},getEllipsis: this.getEllipsis})), this.saveAddressToLocal(this.address)
        },hasAddress: function() {
            return !!this.address && !!this.address.user_name
        },getAddress: function() {
            return this.address
        },render: function(e) {
            return this.show(e), this
        },show: function(e) {
            if (e = e || {}, e.order_state && (this.order_state = e.order_state), this.$el.removeClass("hide"), this.hasAddress())
                this.$el.html(this.template({data: {address: this.address,address_type: "express"},getEllipsis: this.getEllipsis})), e.not_saveToSever || this.not_saveToSever ? Backbone.EventCenter.trigger("address:change") : this.saveAddressToServer && this.doSaveAddressToServer(this.address, "express");
            else {
                var t = _.template(a);
                if (this.$el.html(t()), "self-fetch" === e.from)
                    return;
                this.notAutoPopAddress || this.allow_self_fetch || this.onChangeAddress({autoPopup: !0})
            }
            this.order_state >= 3 && this.$(".js-edit-address").removeClass("express-panel-edit").removeClass("js-edit-address")
        },getEllipsis: function(e, t) {
            return !e || e.length <= t ? e : e.substring(0, t - 2) + "..."
        },showTips: function() {
            $(".js-logistics-tips").removeClass("hide"), $(".js-express").addClass("no-border-bottom")
        },hideTips: function() {
            $(".js-logistics-tips").addClass("hide"), $(".js-express").removeClass("no-border-bottom")
        },doSaveAddressToServer: function(e, t) {
            var i = this;
            return i.cannotDeliver = !1, i.hideTips(), Backbone.EventCenter.trigger("address:beforeExpressSend"), this.doNotSaveToServerNextTime ? (this.doNotSaveToServerNextTime = !1, Backbone.EventCenter.trigger("address:has"), void this.onAddressChanged({logisticsWay: "express",isResetPriceData: !1})) : (i.sendingToServer = !0, void $.ajax({url: i.saveAddressUrl,type: "POST",dataType: "json",timeout: 15e3,data: _.extend({is_weixin: !1}, e, {order_no: window._global.order_no,kdt_id: window._global.kdt_id}),success: function(s) {
                    var n = s.code, o = s.data;
                    0 === n ? (i.$el.html(i.template({data: {address: e,address_type: t},getEllipsis: i.getEllipsis})), Backbone.EventCenter.trigger("address:change"), i.onAddressChanged({logisticsWay: "express",isResetPriceData: !0,data: o})) : 10600 === n ? (i.$el.html(i.template({data: {address: e,address_type: t},getEllipsis: i.getEllipsis})), i.showTips(), i.cannotDeliver = !0) : motify.log(s.msg)
                },error: function(e, t, i) {
                    motify.log("更新收货地址失败")
                },complete: function() {
                    i.sendingToServer = !1
                }}))
        }})
}), define("wap/trade/confirm/view/logistics_express_kdt", ["wap/components/address/views/logistics_express"], function(e) {
    return e.extend({doSaveAddressToServer: function(e, t) {
            var i = this;
            i.cannotDeliver = !1, i.hideTips();
            var s = _.extend({is_weixin: !1}, e, {order_no: window._global.order_no,kdt_id: window._global.kdt_id}), n = {address: s};
            return Backbone.EventCenter.trigger("address:beforeExpressSend", n), this.doNotSaveToServerNextTime ? (this.doNotSaveToServerNextTime = !1, Backbone.EventCenter.trigger("address:has"), void this.onAddressChanged({logisticsWay: "express",isResetPriceData: !1})) : (i.sendingToServer = !0, void $.ajax({url: window._global.url.trade + "/trade/order/address.json",type: "POST",dataType: "json",timeout: 15e3,data: n,success: function(s) {
                    var n = s.code, o = s.data;
                    0 === n ? (i.$el.html(i.template({data: {address: e,address_type: t}})), Backbone.EventCenter.trigger("address:change", [o]), i.onAddressChanged({logisticsWay: "express",isResetPriceData: !0,data: o})) : 10600 === n ? (i.$el.html(i.template({data: {address: e,address_type: t}})), i.showTips(), i.cannotDeliver = !0) : 3e4 === n ? Backbone.EventCenter.trigger("address:book:error", o) : motify.log(s.msg)
                },error: function(e, t, i) {
                    motify.log("更新收货地址失败")
                },complete: function() {
                    i.sendingToServer = !1
                }}))
        }})
}), define("wap/trade/confirm/view/logistics_express_wx", ["wap/trade/confirm/view/logistics_express_kdt", "wap/components/util/address"], function(e, t) {
    return e.extend({onChangeAddress: function(e) {
            !wxReady || window._global.order_state >= 3 || wxReady(_(function() {
                window.WeixinJSBridge && window.WeixinJSBridge.invoke("editAddress", window._global.address_token, _(function(e) {
                    var t = e.err_msg;
                    if ("edit_address:ok" == t) {
                        var i = Utils.getPureKdtAddressData(e);
                        i ? (this.address = i, this.doSaveAddressToServer(this.address, "express"), this.saveAddressToLocal(this.address)) : motify.log("地址数据错误")
                    } else if ("access_control:not_allow" === t)
                        return void this.trigger("wx-address:error")
                }).bind(this))
            }).bind(this))
        }})
}), define("wap/components/address/collection/selffetch_address_collection", ["wap/components/address/model/address"], function(e) {
    return Backbone.Collection.extend({model: e,url: "/v2/trade/selffetch/list.json",parse: function(e) {
            var t = (e || {}).data || {};
            this.total = parseInt(t.total);
            var i = (t || {}).list || [];
            return this.total >= 0 || (this.total = i.length), i
        }})
}), define("wap/components/address/views/logistics_selffetch", ["wap/components/address/collection/selffetch_address_collection", "wap/components/address/views/logistics_address_list", "text!wap/components/address/templates/addressPanel.html", "text!wap/components/address/templates/addressList.html", "wap/components/popup"], function(e, t, i, s, n) {
    return Backbone.View.extend({template: _.template(i),initialize: function(t) {
            t = t || {}, this.address = window._global.selffetchAddress, this.order_state = window._global.order_state, this.not_saveToSever = t.not_saveToSever, this.onAddressChanged = t.onAddressChanged || _f, this.selffetchCollection = new e
        },events: {"click .js-edit-address": "onEditSelfFetchClicked"},onEditSelfFetchClicked: function(e) {
            this.selfFetchAddressListView = new n({contentViewClass: t,contentViewOptions: {templateHtml: s,addressType: "self-fetch",collection: this.selffetchCollection,onAddressChange: _(this.onAddressChange).bind(this),onCancel: _(this.onCancelAddressSelect).bind(this),selectedAddress: this.address},containerCss: {bottom: 0,left: 0,right: 0,background: "white"}}).render().show(), this.selfFetchAddressListView.contentView.show({selectedAddress: this.address})
        },onAddressChange: function() {
            var e = function() {
                var e = new Date;
                return e.setDate(e.getDate() + 1), e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e.toJSON().slice(0, 10) + " " + e.toJSON().slice(11, 16)
            };
            return function(t) {
                t = t || {};
                var i = this;
                return this.address = t.address || {}, this.address.user_time = this.address.user_time || e(), this.$el.html(this.template({data: {address: this.address,address_type: "self-fetch",order_state: this.order_state}})), Backbone.EventCenter.trigger("address:beforeExpressSend"), t.not_saveToSever || this.not_saveToSever ? void Backbone.EventCenter.trigger("address:change") : void $.ajax({url: "/v2/trade/selffetch/order.json",type: "POST",dataType: "json",timeout: 5e3,data: {order_no: window._global.order_no,express_type: t.address.id,address: this.address},beforeSend: function() {
                    },success: function(e) {
                        e && 0 == e.code ? (Backbone.EventCenter.trigger("address:change"), i.onAddressChanged({logisticsWay: "self-fetch",isResetPriceData: !0,data: e.data})) : motify.log("地址切换失败，重试一下~" + e.msg)
                    },error: function(e, t, i) {
                    },complete: function(e, t) {
                    }})
            }
        }(),onCancelAddressSelect: function(e) {
            return this.address && 0 !== this.address.length ? void 0 : (this.trigger("no-address:cancel", {addressType: "self-fetch",from: "self-fetch"}), this)
        },render: function() {
            return this.show(), this
        },show: function(e) {
            return e = e || {}, e.order_state && (this.order_state = e.order_state, this.address.user_time = this.address.user_time || e.user_time, this.address.user_tel = this.address.user_tel || e.user_tel, this.address.user_name = this.address.user_name || e.user_name), this.$el.removeClass("hide"), this.address && 0 !== this.address.length ? (this.onAddressChange({address: this.address,not_saveToSever: e.not_saveToSever}), void (this.order_state >= 3 && this.$(".js-edit-address").removeClass("express-panel-edit").removeClass("js-edit-address"))) : (this.onEditSelfFetchClicked(), this)
        }})
}), define("wap/trade/confirm/view/logistics_selffetch_kdt", ["wap/components/address/views/logistics_selffetch"], function(e) {
    return e.extend({onAddressChange: function() {
            var e = function() {
                var e = new Date;
                return e.setDate(e.getDate() + 1), e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e.toJSON().slice(0, 10) + " " + e.toJSON().slice(11, 16)
            };
            return function(t) {
                t = t || {};
                var i = this;
                this.address = t.address || {}, this.address.user_time = this.address.user_time || e(), this.$el.html(this.template({data: {address: this.address,address_type: "self-fetch",order_state: this.order_state}}));
                var s = {order_no: window._global.order_no,express_type: t.address.id,address: this.address}, n = {address: s};
                return Backbone.EventCenter.trigger("address:beforeExpressSend", n), t.not_saveToSever || this.not_saveToSever ? void Backbone.EventCenter.trigger("address:change") : void $.ajax({url: "/v2/trade/selffetch/book.json",type: "POST",dataType: "json",timeout: 5e3,data: n,beforeSend: function() {
                    },success: function(e) {
                        var t = e.code;
                        e && 0 == e.code ? (Backbone.EventCenter.trigger("address:change"), i.onAddressChanged({logisticsWay: "self-fetch",isResetPriceData: !0,data: e.data})) : 3e4 === t ? Backbone.EventCenter.trigger("address:book:error", e.data || {}) : motify.log("地址切换失败，重试一下~" + e.msg)
                    },error: function(e, t, i) {
                    },complete: function(e, t) {
                    }})
            }
        }()})
}), define("wap/components/address/config", [], function() {
    var e = window._global;
    return {permissions: {wxAddress: e.wxaddress_env,wxPay: e.wxpay_env}}
}), define("wap/components/address/views/logistics_express_wx", ["wap/components/address/views/logistics_express", "wap/components/util/address"], function(e, t) {
    return e.extend({onChangeAddress: function(e) {
            !wxReady || window._global.order_state >= 3 || wxReady(_(function() {
                window.WeixinJSBridge && window.WeixinJSBridge.invoke("editAddress", window._global.address_token, _(function(e) {
                    var t = e.err_msg;
                    if ("edit_address:ok" == t) {
                        var i = Utils.getPureKdtAddressData(e);
                        i ? this.onAddressChange({address: i}) : motify.log("地址数据错误")
                    }
                }).bind(this))
            }).bind(this))
        }})
}), window.zenjs = window.zenjs || {}, function(e) {
    e.Event = {getTargetByDataKey: function(e, t) {
            for (var i = $(e.target); !i.data(t) && "BODY" != (i[0] || {}).nodeName; )
                i = i.parent();
            return i
        },getEventHandler: function() {
            var t = function() {
            };
            return $.extend(!0, t.prototype, e.Event.methods), new t
        },methods: {events: {},on: function(e, t) {
                return "string" != typeof e || "[object Function]" !== Object.prototype.toString.call(t) ? !1 : (this.events[e] || (this.events[e] = []), this.events[e].push(t))
            },trigger: function(e) {
                if ("string" != typeof e)
                    return !1;
                if (!this.events[e])
                    return this.events[e] = [], !1;
                for (var t = this.events[e], i = Array.prototype.slice.apply(arguments, [1]), s = 0, n = t.length; n > s; s++)
                    t[s](i)
            },off: function(e, t) {
                if (!e && !t)
                    return void (this.events = {});
                if (!t)
                    return void (this.events[e] = []);
                var i = this.events[e], s = i.indexOf(t);
                i.splice(s, 1)
            }}}
}(window.zenjs), define("zenjs/util/event", function() {
}), define("zenjs/backbone/tabber", ["zenjs/util/event", "backbone"], function(e, t) {
    var i = window.zenjs.Event, s = function() {
    }, n = t.View.extend({initialize: function(e) {
            this.activeKey = e.activeKey || "type", this.activeClass = e.activeClass || "active", this.cbOnClicked = e.onClicked || s, this.cbOnDisabledClicked = e.onDisabledClicked || s, this.initDefault(e)
        },events: {click: "onClicked"},initDefault: function(e) {
            e.defaultData && e.defaultData.length > 0 && this.active(e.defaultData)
        },onClicked: function(e) {
            if (e.target && 0 !== e.target.length) {
                var t = i.getTargetByDataKey(e, this.activeKey), s = "" + t.data(this.activeKey);
                if (t.blur(), s && "undefined" !== s && this.activeData !== s && s && s.length > 0) {
                    if (this.disabled === !0)
                        return void (this.activeData !== s && this.cbOnDisabledClicked());
                    this.$("." + this.activeClass).removeClass(this.activeClass), t.addClass(this.activeClass), this.activeData = s, this.cbOnClicked(_.extend(e || {}, {value: s,nTarget: t}))
                }
            }
        },active: function(e, t) {
            this.onClicked(_.extend({target: this.$el.find("[data-" + this.activeKey + '="' + e + '"]:first')}, t || {}))
        },setDisable: function(e) {
            this.disabled = e
        },setData: function(e) {
            this.activeData = e, this.$("." + this.activeClass).removeClass(this.activeClass), this.$el.find("[data-" + this.activeKey + '="' + this.activeData + '"]:first').addClass(this.activeClass)
        },getData: function() {
            return this.activeData
        }});
    return n
}), define("text!wap/components/address/templates/index.html", [], function() {
    return '<div class="block-item logistics">\n    <!-- <h4 class="block-item-title">配送方式</h4> -->\n    <div class="pull-left js-logistics-select">\n        <button data-type="express" class="tag tag-big" style="margin-top:-3px;">快递配送</button>\n        <button data-type="self-fetch" class="tag tag-big hide js-tabber-self-fetch" style="margin-top:-3px;margin-left: 5px">到店自提</button>\n    </div>\n</div>\n<div class="js-logistics-content logistics-content js-express"></div>\n<div class="js-logistics-content logistics-content js-self-fetch hide"></div>\n'
}), define("wap/components/address/main", ["wap/components/address/config", "wap/components/address/views/logistics_express", "wap/components/address/views/logistics_express_wx", "wap/components/address/views/logistics_selffetch", "zenjs/backbone/tabber", "text!wap/components/address/templates/index.html"], function(e, t, i, s, n, o) {
    return Backbone.View.extend({initialize: function(n) {
            this.$el.html(o), n = n || {}, this.onAddressChanged = n.onAddressChanged || function() {
            }, this.onWxAddressFailed = n.onWxAddressFailed || function() {
            }, this.not_saveToSever = n.not_saveToSever, this.defaultLogistics = window._global.expressType > 0 ? "self-fetch" : "express", this.expressOptions = n.expressOptions;
            var a = n.logisticsExpressKdtView || t, r = n.logisticsExpressWxView || i;
            this.LogisticsSelfFetchKdtView = n.logisticsSelfFetchKdtView || s;
            var d = window.navigator.userAgent, c = d.match(/MicroMessenger\/(\d+(\.\d+)*)/), l = null !== c && c.length, h = l ? parseFloat(c[1]) : 0;
            l ? 5 > h ? this.LogisticsExpressView = a : e.permissions.wxAddress ? this.LogisticsExpressView = r : this.LogisticsExpressView = a : this.LogisticsExpressView = a, this.logisticsExpressKdtView = a, this.logisticsViews = {express: null,"self-fetch": null}, this.tabberContainer = this.$(".js-logistics-select"), window._global.allow_self_fetch ? this.tabberContainer.find(".js-tabber-self-fetch").removeClass("hide") : this.tabberContainer.parent().addClass("hide")
        },render: function() {
            return this.tabber = new n({el: this.tabberContainer,activeClass: "tag-orange",activeKey: "type",defaultData: this.defaultLogistics,onClicked: _(this.onTabberClicked).bind(this),onDisabledClicked: _(this.onDisabledTabberClicked).bind(this)}), this.tabber.setDisable(window._global.order_state > 2), this
        },onTabberClicked: function(e) {
            var t = (this.logisticsViews.express, e.value);
            if (this.logisticsWay = t, this.$(".js-logistics-content").addClass("hide"), this.logisticsViews[t])
                this.logisticsViews[t].show(e), this.$(".js-" + t).removeClass("hide");
            else {
                var i = "express" == t ? this.LogisticsExpressView : this.LogisticsSelfFetchKdtView, s = new i({onAddressChanged: this.onAddressChanged,not_saveToSever: this.not_saveToSever,expressOptions: this.expressOptions,allow_self_fetch: window._global.allow_self_fetch});
                this.listenTo(s, "no-address:cancel", this.switch2Other), this.listenTo(s, "wx-address:error", _(this.onWxAddressError).bind(this)), this.logisticsViews[t] = s, this.$(".js-" + t).html(s.render().el).removeClass("hide")
            }
        },switch2Other: function(e) {
            var t = "express" == e.addressType ? "self-fetch" : "express";
            this.tabber.active(t, e)
        },onDisabledTabberClicked: function() {
            motify.log("您不能再修改配送方式")
        },onPayOrderCreated: function(e) {
            this.$(".js-edit-address").hide();
            var t = window._global.order_state > 2 ? window._global.order_state : 3, i = _.extend(e, {order_state: t,not_saveToSever: !0});
            this.tabber.setDisable(!0), this.logisticsViews[this.logisticsWay].show(i)
        },getAddress: function() {
            return this.logisticsViews[this.logisticsWay].getAddress()
        },onWxAddressError: function() {
            this.logisticsViews.express && this.logisticsViews.express.remove();
            var e = new this.logisticsExpressKdtView({});
            this.listenTo(e, "no-address:cancel", this.switch2Other), this.logisticsViews.express = e, this.$(".js-express").html(e.render().el).removeClass("hide"), this.logisticsViews.express.onChangeAddress(), this.onWxAddressFailed()
        }})
}), define("wap/components/pop_page", [], function() {
    var e = Backbone.View.extend({initialize: function(e) {
            this.contentViewClass = e.contentViewClass, this.contentViewOptions = e.contentViewOptions, this.nPageContents = e.nPageContents
        },render: function() {
            return this.contentView = new this.contentViewClass(_.extend({onHide: _(this.hide).bind(this),el: this.$el}, this.contentViewOptions)).render(), this
        },show: function() {
            _.each(this.nPageContents, function(e) {
                e.hide()
            }), this.$el.show(), window.scrollTo(0, 0)
        },hide: function() {
            this.$el.hide(), _.each(this.nPageContents, function(e) {
                e.show()
            })
        },destroy: function() {
            this.contentView && this.contentView.remove()
        }});
    return e
}), define("text!wap/components/pay/templates/wapwxpay.html", [], function() {
    return '<div class="pj-errors">\n    <div class="desc center desc-bottom-line">微信支付确认</div>\n    <div class="reason">如您已使用微信支付完成付款，请点击“我已支付成功”查看订单；如付款遇到问题，请尝试使用其他方式付款。</div>\n    <div class="action-container">\n        <div class="btn-2-1"><button class="btn btn-l btn-green js-ok">我已支付成功</button></div>\n        <div class="btn-2-1"><button class="btn btn-l btn-white js-cancel">使用其他支付方式</button></div>\n    </div>\n</div>'
}), define("text!wap/components/pay/templates/pay_item.html", [], function() {
    return '<% if(data.code==\'wxwappay\'){ %>\n	<p class="center c-gray-dark font-size-12" style="line-height:30px;">使用微信支付请确保已安装微信6.0.2以上版本</p>\n<% } %>\n<button type="button" data-pay-type="<%= data.code %>" class="btn-pay btn btn-block btn-large btn-<%= data.code %> <%= getBtnClass(data.code) %>">\n	<%= data.name %>\n</button>'
}), define("wap/components/popout", ["wap/components/pop"], function(e) {
    var t = e.extend({init: function(e) {
            e = e || {}, this._super(e), this.css = $.extend({position: "absolute","z-index": 1e3,transition: "opacity ease " + this.animationTime + "ms",opacity: 0,top: "50%",left: "50%","-webkit-transform": "translate3d(-50%, -50%, 0)",transform: "translateY(-50%, -50%, 0)"}, e.css || {}), this.nPopContainer.css(this.css)
        },_doShow: function() {
            $(".js-popout-close").click($.proxy(function(e) {
                this.hide()
            }, this)), this.nPopContainer.css("opacity", 1), this.nPopContainer.show()
        },_doHide: function(e) {
            this.nPopContainer.css({opacity: 0})
        }});
    return t
}), define("wap/components/loading", ["wap/components/popout"], function(e) {
    var t;
    return {show: function() {
            t = new e({html: '<div class="loader-container"><div class="loader center">处理中</div></div>',isCanNotHide: !0}).render().show()
        },hide: function() {
            t.hide()
        }}
}), window.Zepto && function(e) {
    e.fn.serializeArray = function() {
        var t, i, s = [], n = function(e) {
            return e.forEach ? e.forEach(n) : void s.push({name: t,value: e})
        };
        return this[0] && e.each(this[0].elements, function(s, o) {
            i = o.type, t = o.name, t && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != i && "reset" != i && "button" != i && "file" != i && ("radio" != i && "checkbox" != i || o.checked) && n(e(o).val())
        }), s
    }, e.fn.serialize = function() {
        var e = [];
        return this.serializeArray().forEach(function(t) {
            e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
        }), e.join("&")
    }, e.fn.submit = function(t) {
        if (0 in arguments)
            this.bind("submit", t);
        else if (this.length) {
            var i = e.Event("submit");
            this.eq(0).trigger(i), i.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), define("vendor/zepto/form", function() {
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {needConfirm: function(e, t, i) {
        var s = window.confirm(e);
        s ? t && "function" == typeof t && t.apply() : i && "function" == typeof i && i.apply()
    }}), define("wap/components/util/confirm", function() {
}), define("wap/components/popout_box", ["wap/components/popout"], function(e) {
    var t = function() {
    }, i = e.extend({init: function(e) {
            this._super(e), this._onOKClicked = e.onOKClicked || t, this._onCancelClicked = e.onCancelClicked || t, this.preventHideOnOkClicked = e.preventHideOnOkClicked || !1, this.width = e.width, this.setEventListener()
        },setEventListener: function() {
            this.nPopContainer.on("click", ".js-ok", $.proxy(this.onOKClicked, this)), this.nPopContainer.on("click", ".js-cancel", $.proxy(this.onCancelClicked, this))
        },_doShow: function() {
            this.boxCss = {"border-radius": "4px",background: "white",width: this.width || "270px",padding: "15px"}, this.nPopContainer.css(this.boxCss).addClass("popout-box"), this._super()
        },_doHide: function(e) {
            this._super()
        },onOKClicked: function(e) {
            this._onOKClicked(e), !this.preventHideOnOkClicked && this.hide()
        },onCancelClicked: function(e) {
            this._onCancelClicked(e), this.hide()
        }});
    return i
}), define("wap/components/pay/pay_item", ["text!wap/components/pay/templates/wapwxpay.html", "text!wap/components/pay/templates/pay_item.html", "wap/components/loading", "vendor/zepto/form", "wap/components/util/confirm", "wap/components/popout_box", "zenjs/util/ua"], function(e, t, i, s, n, o, a) {
    var r = window.zenjs.UA, d = function() {
    }, c = Backbone.View.extend({template: _.template(t),initialize: function(e) {
            this.onOtherPayClicked = e.onOtherPayClicked || d, this.payUrl = e.payUrl, this.kdt_id = e.kdt_id, this.order_no = e.order_no, this.wxPayResultUrl = e.wxPayResultUrl, this.getPayDataExtr = e.getPayDataExtr, this.onPayOrderCreated = e.onPayOrderCreated, this.model.on("change", _(this.render).bind(this)), this.beforeWxPayRender = e.beforeWxPayRender || d, this.onWxPayError = e.onWxPayError
        },events: {"click button": "onButtonClick"},onButtonClick: function(e) {
            if (!this.isClickProcessing) {
                this.isClickProcessing = !0;
                var t = this.$("button"), i = t.data("pay-type"), s = "";
                return "other" === i ? (this.onOtherPayClicked(), void (this.isClickProcessing = !1)) : "codpay" == i ? (s = "下单提醒：您正在选择货到付款，下单后由商家发货，快递送货上门并收款。", this.model && "到店付款" === this.model.get("name") && (s = "下单提醒：您正在选择到店付款，下单后请自行到店领取并付款。"), (Utils || {}).needConfirm && Utils.needConfirm(s, _(function() {
                    this.doPay(i)
                }).bind(this)), void (this.isClickProcessing = !1)) : void this.doPay(i)
            }
        },doPay: function(e) {
            var t = this.getPayDataExtr();
            if (!t)
                return void (this.isClickProcessing = !1);
            var i = {order_no: this.order_no,kdt_id: this.kdt_id,buy_way: e};
            this.submitPay(_.extend(t, i), e)
        },submitPay: function(t, s) {
            var n = this;
            $.ajax({url: this.payUrl,type: "POST",dataType: "json",timeout: 15e3,data: t,cache: !1,beforeSend: function() {
                    "wxpay" != s && i.show(), n.$("button").prop("disabled", !0).html("正在努力加载，请稍等...")
                },success: function(i) {
                    n.onPayOrderCreated(t);
                    var a = i.code;
                    switch (n.isClickProcessing = !1, a) {
                        case 0:
                            var r = i.data.pay_data, d = i.data.redirect_url, c = i.data.pay_return_url, l = i.data.pay_return_data;
                            switch (s) {
                                case "wxapppay":
                                    n.doFinishWxAppPay(r, l);
                                    break;
                                case "wxpay":
                                    n.doFinishWxPay(r, d, c, l);
                                    break;
                                case "couponpay":
                                case "presentpay":
                                    window.location = r.submit_url;
                                    break;
                                case "wxwappay":
                                    return n.wapPayPopout = new o({html: e,onOKClicked: function() {
                                            location.reload()
                                        },onCancelClicked: function() {
                                            location.reload()
                                        }}).render().show(), void (window.location = r.deeplink);
                                default:
                                    if (!r || !r.submit_url)
                                        return void motify.log("支付过程出错，请联系客服！");
                                    n.doFinishOtherPay(r)
                            }
                            break;
                        case 11022:
                        case 11023:
                            wxReady && wxReady(function() {
                                window.WeixinJSBridge && window.WeixinJSBridge.invoke("closeWindow", {})
                            });
                            break;
                        case 11010:
                            window.Utils.needConfirm(i.msg, function() {
                                t.accept_price = 1, n.submitPay(t, s)
                            }, function() {
                                motify.log("正在跳转中...", 0), window.location.href = window._global.url.wap + "/showcase/goods?alias=" + window._global.goods_alias
                            });
                            break;
                        case 11012:
                        case 11024:
                        case 11026:
                        case 11027:
                            motify.log("正在跳转...");
                            var h = "wxpay" != s ? window._global.url.trade + "/trade/order/result?order_no=" + n.order_no + "&kdt_id=" + n.kdt_id + "#wechat_webview_type=1" : n.wxPayResultUrl;
                            window.location.href = h;
                            break;
                        case 21e3:
                            window.location.reload();
                            break;
                        case 90001:
                            var p = i.data.item_url, u = _.template(['<div class="pj-errors">', '<div class="desc">矮油，动作太慢了，已被抢光了</div>', '<div class="action-container">', '<div class="btn-2-1"><button class="btn btn-l btn-white js-ok">放弃</button></div>', '<div class="btn-2-1"><a href="<%= data.buyUrl %>" class="btn btn-l btn-orange-dark">我要买</a></div>', "</div>", "</div>"].join(""));
                            n.errorPopout || (n.errorPopout = new o({doNotRemoveOnHide: !0,html: u({data: {buyUrl: p}})}).render()), n.errorPopout.show();
                            break;
                        default:
                            n.render(), motify.log(i.msg)
                    }
                },error: function(e, t, i) {
                    n.isClickProcessing = !1, motify.log("生成支付单失败。"), n.render()
                },complete: function(e, t) {
                    n.isClickProcessing = !1, i.hide(), n.render()
                }})
        },doFinishOtherPay: function(e) {
            if (!this.isSubmitting) {
                this.isSubmitting = !0;
                var t = '<form method="post" action="' + e.submit_url + '">';
                delete e.submit_url, _(e).map(function(e, i) {
                    t += '<input type="hidden" name="' + i + '" value="' + e + '" />'
                }), t += "</form>";
                var i = $(t);
                i.submit(), this.isSubmitting = !1
            }
        },doFinishWxPay: function(e, t, i, s) {
            return this.wxpayed ? void motify.log("支付数据处理中，请勿重复操作") : (this.wxpayed = !0, "string" == typeof e && (e = $.parseJSON(e)), window.WeixinJSBridge ? (this.beforeWxPayRender(), void window.WeixinJSBridge.invoke("getBrandWCPayRequest", e, _(function(e) {
                var n = e.err_msg;
                this.wxpayed = !1, "get_brand_wcpay_request:ok" === n ? (motify.log("支付成功，正在处理订单...", 0), $.ajax({url: i,type: "POST",dataType: "json",timeout: 15e3,data: s,cache: !1,success: function(e) {
                        window.location.href = t
                    }})) : "get_brand_wcpay_request:cancel" === n ? zenjs.UA.isIOS() ? this.render() : this.onWxPayError ? (this.onWxPayError(), this.model.trigger("destroy", this.model, this.model.collection)) : this.render() : this.onWxPayError ? (this.onWxPayError(), this.model.trigger("destroy", this.model, this.model.collection)) : motify.log(n)
            }).bind(this))) : void (this.wxpayed = !1))
        },doFinishWxAppPay: function() {
            function e(e, t) {
                t || (t = "weixin"), r.isIOS() ? (e = encodeURIComponent(e), document.location.hash = "#func=appWXPay&params=" + e) : r.isAndroid() && window.android && window.android.appWXPay(e)
            }
            return function(t, i) {
                r.isWxd() && r.getPlatformVersion() >= "1.5.0" ? window.YouzanJSBridge && window.YouzanJSBridge.doCall("doAction", {action: "appWXPay",kdt_id: t.kdt_id,order_no: i.order_no,inner_order_no: t.order_no}) : (e("kdt_id=" + t.kdt_id + "&order_no=" + t.order_no), window.YouzanJSBridge && window.YouzanJSBridge.doCall("appWXPay", {kdt_id: t.kdt_id,order_no: t.order_no}))
            }
        }(),render: function() {
            var e = this, t = this.model.toJSON();
            return this.$el.html(this.template(_.extend({data: t}, {getBtnClass: function(t) {
                    return parseInt(e.model.get("order")) > 0 ? " btn-white" : " btn-green"
                }}))), this.$el.css("margin-bottom", "10px"), this
        }});
    return c
}), define("wap/components/pay/pop_pay_list", ["wap/components/popout", "vendor/zepto/form", "wap/components/util/confirm"], function(e, t, i) {
    var s = Backbone.View.extend({className: "pay-way-opts",initialize: function(e) {
            this.collection = e.collection, $("body").append('<div                 id="confirm-pay-way-opts-popup-bg"                 style="display:none; width: 100%; height: 100%;                 position: fixed; top:0; left:0;                 background-color: rgba(0, 0, 0, .5);"></div>'), this.bg = $("#confirm-pay-way-opts-popup-bg"), this.bg.on("click", _(this.hide).bind(this)), this.listOpt = {el: this.$el,itemView: PayItemView,collection: this.collection,itemOptions: e.itemOptions}
        },events: {"click #confirm-pay-way-opts-popup-bg": "hide"},render: function() {
            return this.payWayListView = new ListView(this.listOpt).render(), this
        },show: function() {
            this.$el.addClass("active"), this.bg.show()
        },hide: function() {
            this.$el.removeClass("active"), this.bg.hide()
        }});
    return s
}), define("wap/components/pay/pay", ["zenjs/list/list", "wap/components/popup", "wap/components/pay/pay_item", "wap/components/pay/pop_pay_list"], function(e, t, i, s) {
    return Backbone.View.extend({initialize: function(e) {
            this.collection = new Backbone.Collection, this.nPayTips = e.nPayTips, this.itemOptions = e.itemOptions || {}, this.pagePayWaySize = e.pagePayWaySize || 3, this.payUrl = e.payUrl || window._global.url.trade + "/trade/order/pay.json", this.order_no = e.order_no || window._global.order_no, this.kdt_id = e.kdt_id || window._global.kdt_id, this.orderPrice = e.orderPrice, this.getPayDataExtr = e.getPayDataExtr || function() {
                return {}
            }, this.wxPayResultUrl = e.wxPayResultUrl, this.onPayOrderCreated = e.onPayOrderCreated || function() {
            }, this.otherPayText = e.otherPayText, this.beforeWxPayRender = e.beforeWxPayRender || function() {
            };
            var t = e.payWays, s = new Backbone.Collection;
            _.each(t, function(e, t) {
                e.id = t, e.order = t, s.add(new Backbone.Model(e))
            }), this.listOpt = {el: this.$el,itemView: i,collection: this.collection,itemOptions: _.extend({}, this.itemOptions, {onOtherPayClicked: _(this.onOtherPayClicked).bind(this),payUrl: this.payUrl,order_no: this.order_no,kdt_id: this.kdt_id,getPayDataExtr: this.getPayDataExtr,wxPayResultUrl: this.wxPayResultUrl,onPayOrderCreated: this.onPayOrderCreated,beforeWxPayRender: this.beforeWxPayRender}),emptyHTML: " "}, this.allPayWayCollection = s, this.initPagePayWay()
        },render: function() {
            return this.payWayListView = new e(this.listOpt).render(), this
        },initPagePayWay: function() {
            if (0 === this.allPayWayCollection.length)
                return this.nPayTips && this.nPayTips.html("无可用的支付方式"), this;
            if (this.allPayWayCollection.length <= this.pagePayWaySize)
                for (var e = 0; e < this.allPayWayCollection.length; e++)
                    this.collection.add(this.allPayWayCollection.get(e));
            else {
                for (var e = 0; e < this.pagePayWaySize - 1; e++)
                    this.collection.add(this.allPayWayCollection.get(e));
                this.collection.add(new Backbone.Model({code: "other",name: this.otherPayText || "其他支付方式",order: e}))
            }
        },addHotIcon: function(e) {
            var t = this.allPayWayCollection.findWhere({code: e});
            if (t) {
                var i = t.get("name") + '<span class="hot"></span>';
                t.set("name", i);
                var s = this.collection.findWhere({code: e
                });
                if (s)
                    return void s.set("name", i);
                var n = this.collection.findWhere({code: "other"});
                n && n.set("name", n.get("name") + '<span class="hot"></span>')
            }
        },initPopPayWayListView: function() {
            var i = _.clone(this.listOpt);
            delete i.el, i.collection = this.allPayWayCollection, this.popPayWayListView || (this.popPayWayListView = new t({contentViewClass: e,className: "confirm-pay-way-opts-popup",contentViewOptions: i,containerCss: {padding: "10px"},doNotRemoveOnHide: !0}).render()), this.popPayWayListView.show()
        },onOtherPayClicked: function() {
            this.initPopPayWayListView()
        },updatePayWay: function(e) {
            var t = this.allPayWayCollection.find(function(t) {
                return t.get("code") == e.code
            });
            if (t)
                for (var i in e)
                    e.hasOwnProperty(i) && t.set(i, e[i])
        },updateValue: function(e) {
            if (e) {
                var t = this, i = ["payUrl", "order_no", "kdt_id"];
                _.each(e, function(e, s, n) {
                    t[s] = e, i.indexOf(s) > -1 && (t.listOpt.itemOptions[s] = e, t.payWayListView && _.each(t.payWayListView.items, function(t) {
                        t[s] = e
                    }), t.popPayWayListView && _.each(t.popPayWayListView.items, function(t) {
                        t[s] = e
                    }))
                })
            }
        }})
}), define("wap/trade/confirm/view/payView", ["wap/components/pay/pay", "zenjs/util/cookie"], function(e) {
    var t = function() {
    };
    return Backbone.View.extend({initialize: function(i) {
            this.options = i = i || {}, this.payWays = i.payWays || [], this.payWaysContainer = i.payWaysContainer || $("#confirm-pay-way-opts"), this.getPresentBtn = i.getPresentBtn || $("#get-present-btn"), this.nPayTips = i.nPayTips || $(".js-pay-tip"), this.payUrl = i.payUrl || tradeBaseUrl + "/trade/order/pay.json", this.wxReturnUrl = i.wxReturnUrl || tradeBaseUrl + "/pay/wxpay/return.json", this.wxPayResultUrl = i.wxPayResultUrl || tradeBaseUrl + "/trade/order/result?order_no=" + window._global.order_no + "&kdt_id=" + window._global.kdt_id + "&order_paid=1#wechat_webview_type=1&refresh", this.order_no = i.order_no || window._global.order_no, this.kdt_id = i.kdt_id || window._global.kdt_id, this.pagePayWaySize = i.pagePayWaySize || 2, this.orderType = i.orderType || 0, this.onPayOrderCreated = i.onPayOrderCreated || t, this.getPayDataExtr = i.getPayDataExtr || t, this.itemOptions = i.itemOptions, this.resolvePayWays(), this.pagePayWayListView = new e({payWays: this.payWays,el: this.payWaysContainer,nPayTips: this.nPayTips,payUrl: this.payUrl,wxReturnUrl: this.wxReturnUrl,wxPayResultUrl: this.wxPayResultUrl,order_no: this.order_no,kdt_id: this.kdt_id,pagePayWaySize: this.pagePayWaySize,onPayOrderCreated: this.onPayOrderCreated,getPayDataExtr: this.getPayDataExtr,itemOptions: i.itemOptions})
        },render: function() {
            this.pagePayWayListView.render(), this.giftPayWayListView && this.giftPayWayListView.render()
        },initGiftPayWayListView: function() {
            var t = this.solveInnerPayWays(this.options.innerPayWays || {});
            this.giftPayWayListView = new e({payWays: t,el: this.getPresentBtn,nPayTips: this.nPayTips,payUrl: this.payUrl,wxReturnUrl: this.wxReturnUrl,wxPayResultUrl: this.wxPayResultUrl,order_no: this.order_no,kdt_id: this.kdt_id,pagePayWaySize: 1,onPayOrderCreated: this.onPayOrderCreated,getPayDataExtr: this.getPayDataExtr,itemOptions: this.itemOptions}), this.giftPayWayListView.render()
        },showPresentBtn: function() {
            this.payWaysContainer.addClass("hide"), this.giftPayWayListView || this.initGiftPayWayListView(), this.getPresentBtn.removeClass("hide")
        },showNormalBuyBtn: function() {
            this.payWaysContainer.removeClass("hide"), this.getPresentBtn.addClass("hide")
        },refreshConfirmBtn: function(e) {
            e ? this.showNormalBuyBtn() : this.showPresentBtn()
        },updatePayWayList: function(e) {
            this.pagePayWayListView.updatePayWay(e || {})
        },solveInnerPayWays: function(e) {
            return 4 == this.orderType ? [e.present] : [e.coupon]
        },refreshData: function(e) {
            e.order_no && (this.order_no = e.order_no), this.pagePayWayListView.updateValue(e), this.giftPayWayListView && this.giftPayWayListView.updateValue(e)
        },resolvePayWays: function() {
            if (zenjs.Browser && "1" === zenjs.Browser.cookie("fanben_app_77_ad"))
                for (var e, t = ["wxpay", "wxwappay"], i = this.payWays.length - 1; i > -1; i--)
                    e = this.payWays[i], t.indexOf(e.code) > -1 && this.payWays.splice(i, 1)
        }})
}), define("wap/trade/message_view", [], function() {
    return Backbone.View.extend({initialize: function(e) {
            this.onHide = e.onHide || function() {
            }, this.nTarget = e.nTarget
        },events: {"click .js-cancel": "hide"},render: function() {
            var e = this.nTarget.parent().parent().clone();
            this.$(".js-list").empty().append(e), this.$(".js-show-message").hide();
            var t = this.nTarget.parents(".js-goods-item").find(".js-message");
            t.length > 0 ? this.$(".js-message-container").html(t.clone().html()) : (this.$(".js-message-container").hide(), this.$("h2").hide())
        },hide: function() {
            this.onHide()
        }})
}), define("wap/trade/confirm/view/order_message", ["wap/components/util/valid"], function() {
    return Backbone.View.extend({initialize: function(e) {
            this.el = e.el, this.msgLenLimit = e.msgLenLimit || 140, this.ordermsg_change_phone = window._global.ordermsg_change_phone
        },events: {"focus .js-msg-container": "onMsgFocus","blur .js-msg-container": "onMsgBlur"},render: function() {
            return this.msgContainer = this.$(".js-msg-container"), this.phoneContainer = this.$(".js-phone-container"), this
        },onMsgFocus: function() {
            this.msgContainer.addClass("two-rows")
        },onMsgBlur: function() {
            this.msgContainer.removeClass("two-rows")
        },getMsg: function() {
            var e = {};
            return this.ordermsg_change_phone ? e.order_message = this.phoneContainer.val() : e.order_message = this.msgContainer.val() || "", e
        },validate: function() {
            var e = function() {
                var e = this;
                this.phoneContainer.addClass("error"), this.phoneContainer.one("click", function(t) {
                    e.phoneContainer.removeClass("error")
                })
            };
            return function(t) {
                t = t || {};
                var i = t.order_message;
                if (this.ordermsg_change_phone) {
                    if (!i)
                        return motify.log("请填写手机号码"), e.call(this), !1;
                    if (!Utils.validMobile(i) && !Utils.validPhone(i))
                        return motify.log("请填写正确的<br />手机号码或电话号码"), e.call(this), !1
                } else if (i.length > this.msgLenLimit)
                    return motify.log("字数不能超过" + this.msgLenLimit), !1;
                return !0
            }
        }()})
}), define("wap/trade/confirm/view/coupon/model", [], function() {
    var e = Backbone.Model.extend({idAttribute: "m_id",defaults: {coupon: null,order: null},initialize: function(e, t) {
        }});
    return e
}), define("wap/trade/confirm/view/coupon/collection", ["wap/trade/confirm/view/coupon/model"], function(e) {
    var t = Backbone.Collection.extend({model: e,comparator: function(e, t) {
            var i = (e.get("coupon") || {}).value, s = (t.get("coupon") || {}).value;
            return i > s ? -1 : 1
        },findCoupon: function(e) {
            return e && e.coupon && e.coupon.id ? this.find(function(t) {
                var i = t.get("coupon"), s = (e || {}).coupon || {};
                return i.id == s.id ? !0 : !1
            }) : !1
        },findCouponByData: function(e) {
            return this.find(function(t) {
                var i = t.get("coupon"), s = (e || {}).coupon;
                return i.id == s.id ? !0 : !1
            })
        }});
    return t
}), define("text!wap/trade/confirm/view/coupon/templates/useCoupon.html", [], function() {
    return '<div class="block-item order-coupon">\n    <h4 class="block-item-title">优惠</h4>\n    <div class="coupon-info-container">\n	    <div class="js-normal-coupon coupon-info c-gray-dark <% if ( orderState < 3 ) { %>js-change-coupon<% } %>">\n	        <span class="coupon-title"><%=couponData.name %></span>\n	        <p><i class="coupon-condition"><%=couponData.condition %></i></p>\n	    </div>\n	    <% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n	    <% } %>\n	</div>\n</div>'
}), define("text!wap/trade/confirm/view/coupon/templates/availableCoupon.html", [], function() {
    return '<div class="block-item order-coupon">\n    <h4 class="block-item-title">优惠</h4>\n    <div class="coupon-info-container">\n	    <div class="js-normal-coupon coupon-info c-gray-dark">\n	    	<span class="pull-right <% if ( orderState < 3 ) { %>js-change-coupon<% } %>">您有 <%=available %> 个可用优惠</span>\n	    </div>\n	    <% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n	    <% } %>\n	</div>\n</div>'
}), define("text!wap/trade/confirm/view/coupon/templates/emptyCoupon.html", [], function() {
    return '<div class="block-item order-coupon relative">\n    <h4 class="block-item-title">优惠</h4>\n    <div class="coupon-info-container">\n    	<div class="js-normal-coupon coupon-info c-gray-dark">\n    	    <span class="<% if ( orderState < 3 ) { %>js-change-coupon<% } %>">使用优惠</span>\n    	</div>\n    	<% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n	    <% } %>\n    </div>\n\n</div>\n'
}), define("wap/trade/confirm/view/coupon/view/input_view", ["wap/trade/confirm/view/coupon/model"], function(e) {
    var t = Backbone.View.extend({events: {"click .js-valid-code": "onCodeSubmit","focus .js-code-txt": "hideTips"},initialize: function(e) {
            e = e || {}, this.useCoupon = e.useCoupon, this.couponCollection = e.collection, this.order_no = e.order_no, this.kdt_id = e.kdt_id, this.nCodeTxt = this.$(".js-code-txt"), this.nValidBtn = this.$(".js-valid-code"), this.nErrorTips = this.$(".js-error-tips")
        },getCode: function() {
            var e = this, t = e.nCodeTxt.val();
            return t = $.trim(t)
        },onCodeSubmit: function(e) {
            var t = this;
            e.preventDefault();
            var i = t.getCode();
            return i ? void $.ajax({url: "/v2/trade/order/validateCode.json",type: "POST",dataType: "json",timeout: 8e3,cache: !1,data: {order_no: t.order_no,kdt_id: t.kdt_id,code: i},beforeSend: function() {
                    t.nValidBtn.text("验证中..."), t.nValidBtn.prop("disabled", !0)
                },success: function(e) {
                    0 === e.code ? t.showCouponInfo(e.data) : (t.showTips(), t.nErrorTips.html(e.msg))
                },error: function(e, t, i) {
                },complete: function(e, i) {
                    t.nValidBtn.text("验证"), t.nValidBtn.prop("disabled", !1)
                }}) : (motify.log("请输入优惠码"), t.nCodeTxt.focus(), !1)
        },showTips: function() {
            this.nErrorTips.removeClass("hide")
        },hideTips: function() {
            this.nErrorTips.addClass("hide")
        },showCouponInfo: function(e) {
            var t = this.collection.findCouponByData(e);
            if (t)
                motify.log("该优惠码您已经拥有，<br />已为您自动选中～");
            else {
                var i = this.collection.toJSON();
                this.collection.reset(i.concat([e])), t = this.collection.findCouponByData(e)
            }
            this.useCoupon(t)
        },setOrderNo: function(e) {
            this.order_no = e
        }});
    return t
}), define("text!wap/trade/confirm/view/coupon/templates/couponItem.html", [], function() {
    return '<div class="label-check-img"></div>\n<div class="coupon-info">\n	<p class="font-size-12"><%=coupon.name %><em class="pull-right">-<%=(coupon.value/100).toFixed(2) %></em></p>\n	<p class="font-size-12 c-gray">\n		<%=coupon.condition %>\n		<% if( coupon.end_at && coupon.end_at < 10 ){ %>\n			<em class="pull-right c-gray">即将过期</em>\n		<% } %>\n	</p>\n</div>\n\n'
}), define("wap/trade/confirm/view/coupon/view/item_view", ["text!wap/trade/confirm/view/coupon/templates/couponItem.html"], function(e) {
    var t = function() {
    }, i = Backbone.View.extend({tagName: "li",className: "block-item coupon-item",template: _.template(e),events: {click: "onClick"},initialize: function(e) {
            e = e || {}, this.onItemClick = e.onItemClick || t
        },render: function() {
            var e = this.model.toJSON(), t = this.template({coupon: e.coupon});
            return this.$el.html(t), this
        },onClick: function(e) {
            e.preventDefault();
            this.model.toJSON();
            this.onItemClick(this.model)
        }});
    return i
}), define("zenjs/list/sort_list", ["zenjs/list/list"], function(e) {
    return e.extend({doSort: function(e) {
            this.collection.sortConfig = e, this.collection.comparator = this._multiFieldComparator, this.collection.sort()
        },_multiFieldComparator: function(e, t) {
            var i = "asc" == this.sortConfig.order ? 1 : -1;
            return e = e.get(this.sortConfig.field), t = t.get(this.sortConfig.field), e ? t ? e > t ? 1 * i : t > e ? -1 * i : 0 : -1 * i : 1 * i
        }})
}), define("text!wap/trade/confirm/templates/selectorView.html", [], function() {
    return '<div class="js-scene-coupon-list">\n    <div class="top-bar">\n        <h3 class="center">选择优惠</h3>\n        <span class="js-close close"></span>\n    </div>\n    \n    <div class="js-code-inputer coupon-input-container">\n        <div class="inputer">\n            <input class="js-code-txt txt txt-coupon font-size-12" type="text" placeholder="请输入优惠码" autocapitalize="off" maxlength="15" />\n            <button class="js-valid-code coupon-valid font-size-12" type="button">兑换</button>\n        </div>\n        <p class="js-error-tips error-tips c-red font-size-12 hide"></p>\n    </div>\n\n    <ul class="js-coupon-list block-list block coupon-list block-border-bottom-none">\n        \n    </ul>\n\n</div>\n<div class="action-container coupon-action-container">\n    <button class="js-confirm-use-coupon btn btn-block btn-green" style="margin: 0px;">确定</button>\n</div>'
}), define("wap/trade/confirm/view/coupon/view/selector_view", ["wap/trade/confirm/view/coupon/view/input_view", "wap/trade/confirm/view/coupon/view/item_view", "zenjs/list/sort_list", "text!wap/trade/confirm/templates/selectorView.html"], function(e, t, i, s) {
    var n = function() {
    }, o = Backbone.View.extend({initialize: function(e) {
            e = e || {}, this.onCouponChanged = e.onCouponChanged || n, this.orderState = e.orderState, this.selectedCoupon = null, this.none_coupon = e.none_coupon, this.default_coupon = e.none_coupon, this.currentCoupon = e.current_coupon, this.order_no = e.order_no, this.kdt_id = e.kdt_id, this.couponCollection = e.couponCollection
        },render: function() {
            window._global;
            return this.$el.append(s), this.couponInput = new e({el: this.$(".js-code-inputer"),collection: this.couponCollection,useCoupon: _(function(e) {
                    this.selectedCoupon = this.none_coupon, this.useCoupon(e)
                }).bind(this),order_no: this.order_no,kdt_id: this.kdt_id}), this.nCouponList = this.$(".js-coupon-list"), this.isEmptyList = !1, this.listOpt = {el: this.$(".js-coupon-list"),itemView: t,finishedHTML: " ",emptyHTML: " ",collection: this.couponCollection,itemOptions: {onItemClick: _(this.useCoupon).bind(this) || n},onListEmpty: $.proxy(function() {
                    this.isEmptyList = !0, this.nCouponList.addClass("block-border-top-none")
                }, this),onViewItemAdded: $.proxy(function() {
                    this.isEmptyList && this.nCouponList.removeClass("block-border-top-none"), this.isEmptyList = !1
                }, this)}, this.couponList = new i(this.listOpt), this.couponList.render(), this.switchCoupon(this.currentCoupon), this.$(".js-confirm-use-coupon").click(_(this.confirmUseCoupon).bind(this)), this
        },notUse: function() {
            var e = this, t = e.none_coupon;
            this.useCoupon(t)
        },useCoupon: function(e) {
            return this.selectedCoupon && this.selectedCoupon == e && e != this.none_coupon ? void this.notUse() : (this.selectedCoupon = e, void this.show())
        },switchCoupon: function(e) {
            this.selectedCoupon = this.none_coupon, this.useCoupon(e || this.none_coupon)
        },confirmUseCoupon: function(e) {
            e.preventDefault(), e.stopPropagation(), this.onCouponChanged(this.selectedCoupon), this.onHide()
        },show: function() {
            var e = this.selectedCoupon;
            if (!e)
                return !1;
            this.$el.find(".coupon-item.active").removeClass("active");
            var t = this.couponList.getViewByModel(e);
            t && t.$el.addClass("active")
        },setCoupons: function(e) {
            e = e || {}, e.default_coupon && (this.default_coupon = e.default_coupon), e.current_coupon && (this.current_coupon = e.current_coupon)
        },setOrderNo: function(e) {
            this.order_no = e, this.couponInput.setOrderNo(e)
        }});
    return o
}), define("wap/trade/confirm/view/coupon/main", ["wap/trade/confirm/view/coupon/model", "wap/trade/confirm/view/coupon/collection", "text!wap/trade/confirm/view/coupon/templates/useCoupon.html", "text!wap/trade/confirm/view/coupon/templates/availableCoupon.html", "text!wap/trade/confirm/view/coupon/templates/emptyCoupon.html", "wap/trade/confirm/view/coupon/view/selector_view", "wap/components/popup"], function(e, t, i, s, n, o, a) {
    var r = function() {
    }, d = Backbone.View.extend({el: ".js-used-coupon",events: {"click .js-change-coupon": "showCouponSelector"},useCouponTemplate: _.template(i),availableCouponTemplate: _.template(s),emptyCouponTemplate: _.template(n),initialize: function(t) {
            var i = window._global, s = i.ump || {}, n = ((s.order || {}).coupons || {}).money;
            t = t || {}, this.orderState = i.order_state || 1, this.hasAddress = 0, this.coupons = i.coupons, this.currentCouponData = n, this.currentCoupon = new e(this.currentCouponData), this.order_no = window._global.order_no, this.urlTrade = i.url.trade, this.no_user_login = i.no_user_login, this.onCouponChanged = t.onCouponChanged || r
        },render: function(i) {
            i = i || {}, this.couponCollection = new t;
            var s = (this.coupons || {}).none_coupon;
            return 3 == this.orderState && (s = this.currentCouponData), this.none_coupon = new e(s), this.setCoupons(), this
        },setCoupons: function(e) {
            e = e || this.coupons || {};
            var t = e.codes || [], i = e.cards || [];
            this.couponCollection.reset(t.concat(i)), this.default_coupon = this.couponCollection.findCoupon(e.default_coupon);
            var s = this.couponCollection.findCoupon(this.currentCouponData) || this.none_coupon;
            this.autoUseCoupon(), this.couponSelectorView && this.couponSelectorView.setCoupons({default_coupon: this.default_coupon,current_coupon: s})
        },resetCoupons: function() {
            this.setCoupons()
        },showCouponSelector: function() {
            if (!this.popView) {
                var e = window._global;
                this.popView = new a({contentViewClass: o,contentViewOptions: {orderState: this.orderState,none_coupon: this.none_coupon,current_coupon: this.usedCoupon || this.none_coupon,order_no: this.order_no,kdt_id: e.kdt_id,couponCollection: this.couponCollection,onCouponChanged: _(function(e) {
                            var t = e.toJSON();
                            this.couponData = t, this.usedCoupon = e, this.onCouponChanged(t), this.updateCouponPanel(t)
                        }).bind(this)},containerCss: {bottom: 0,left: 0,right: 0,background: "#f9f9f9"},doNotRemoveOnHide: !0}).render(), this.couponSelectorView = this.popView.contentView
            }
            this.popView.show()
        },autoUseCoupon: function() {
            var e = this.orderState, t = null;
            if (1 === e || 2 === e) {
                if (0 == this.couponCollection.length && !this.none_coupon && !this.default_coupon)
                    return !1;
                t = this.default_coupon ? this.default_coupon : this.none_coupon
            } else
                3 === e && (t = this.currentCoupon);
            var i = t.toJSON();
            this.couponData = i, this.usedCoupon = t, this.onCouponChanged(i), this.updateCouponPanel(i), this.couponSelectorView && this.couponSelectorView.switchCoupon(t)
        },updateCouponPanel: function(e) {
            var t = this, i = "";
            if (!e)
                return !1;
            var s = e.coupon || {};
            if (0 !== s.id)
                i = t.useCouponTemplate({couponData: s,orderState: t.orderState});
            else {
                var n = this.couponCollection.length;
                i = n > 0 ? t.availableCouponTemplate({available: n,orderState: t.orderState}) : t.emptyCouponTemplate({orderState: t.orderState})
            }
            t.$el.html(i), t.show()
        },hide: function() {
            this.$el.addClass("hide")
        },show: function() {
            this.$el.removeClass("hide")
        },setOrderNo: function(e) {
            this.order_no = e, this.couponSelectorView && this.couponSelectorView.setOrderNo(e)
        },hideCoupon: function() {
            this.cannotUseCoupon = !0, this.$el.addClass("hide")
        },showCoupon: function() {
            this.cannotUseCoupon = !1, this.$el.removeClass("hide")
        },getCouponData: function() {
            return this.cannotUseCoupon && !this.usedCoupon ? "" : this.usedCoupon.toJSON()
        }});
    return d
}), define("text!wap/trade/confirm/view/luckymoney/templates/selector.html", [], function() {
    return '<div class="js-scene-coupon-list">\n    <div class="top-bar">\n        <h3 class="center">使用红包</h3>\n        <span class="js-close close"></span>\n    </div>\n\n    <ul class="js-coupon-list block-list block coupon-list block-border-bottom-none">\n    </ul>\n</div>\n<div class="action-container coupon-action-container">\n    <button class="js-confirm btn btn-block btn-green" style="margin: 0px;">确定</button>\n</div>'
}), define("text!wap/trade/confirm/view/luckymoney/templates/item.html", [], function() {
    return "<div class=\"label-check-img\"></div>\n<div class=\"coupon-info\">\n	<p class=\"font-size-20 c-orange\">￥<%=(parseInt(luckyMoney.discount_fee)/100).toFixed(2) %></p>\n	<p class=\"font-size-12 c-gray-dark\">\n	有效期：<%= luckyMoney.start_time.split(' ')[0].replace('-', '.') %> ~ <%= luckyMoney.end_time.split(' ')[0].replace('-', '.') %>\n	</p>\n</div>\n"
}), define("wap/trade/confirm/view/luckymoney/views/item", ["text!wap/trade/confirm/view/luckymoney/templates/item.html"], function(e) {
    var t = function() {
    };
    return Backbone.View.extend({tagName: "li",className: "block-item coupon-item",template: _.template(e),events: {click: "onClick"},initialize: function(e) {
            this.listenTo(this.model, "change", this.render), this.listenTo(this, "active", this.onActive), this.onActiveChange = e.onActiveChange || t
        },render: function() {
            return this.$el.html(this.template({luckyMoney: this.model.toJSON()})), 1 == this.model.get("active") && this.doActive(), this
        },onActive: function(e) {
            e.active_token != this.model.get("token") ? this.doDeActive() : this.doActive()
        },doDeActive: function() {
            this.$el.removeClass("active"), this.model.set("active", !1)
        },doActive: function() {
            this.$el.addClass("active"), this.model.set("active", !0)
        },onClick: function(e) {
            e.preventDefault(), this.model.get("active") ? this.doDeActive() : this.doActive(), this.onActiveChange({isActive: this.model.get("active"),active_token: this.model.get("token")})
        }})
}), define("wap/trade/confirm/view/luckymoney/views/selector_view", ["zenjs/list/sort_list", "text!wap/trade/confirm/view/luckymoney/templates/selector.html", "wap/trade/confirm/view/luckymoney/views/item"], function(e, t, i) {
    var s = Backbone.View.extend({events: {"click .js-close": "hide","click .js-confirm": "onConfirm"},initialize: function(e) {
            this.luckyMoneyList = e.collection, this.onLuckyMoneyChanged = e.onLuckyMoneyChanged, this.active_token = e.active_token, _.bindAll(this, "hide", "onConfirm")
        },render: function() {
            return this.$el.append(t), this.listOpt = {el: this.$(".js-coupon-list"),collection: this.luckyMoneyList,itemView: i,itemOptions: {onActiveChange: _(this.onActiveChange).bind(this)},finishedHTML: " ",emptyHTML: " "}, this.luckyMoneyListView = new e(this.listOpt), this.luckyMoneyListView.render(), this.hightLightItem(this.active_token), this
        },hide: function() {
            this.onHide()
        },onConfirm: function() {
            this.onLuckyMoneyChanged(this.luckyMoneyList.findWhere({active: !0})), this.hide()
        },onActiveChange: function(e) {
            e.isActive && this.hightLightItem(e.active_token)
        },hightLightItem: function(e) {
            this.luckyMoneyListView.dispatchEventToAllViews("active", {active_token: e})
        }});
    return s
}), define("text!wap/trade/confirm/view/luckymoney/templates/used.html", [], function() {
    return '<div class="block-item order-coupon">\n    <h4 class="block-item-title">红包</h4>\n    <div class="coupon-info-container">\n	    <div class="js-normal-coupon coupon-info c-gray-dark">\n	        <span class="coupon-title">已抵用￥<%= (parseInt(luckyMoney.discount_fee)/100).toFixed(2) %></span>\n	    </div>\n	    <% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n		<% } %>\n	</div>\n</div>'
}), define("text!wap/trade/confirm/view/luckymoney/templates/available.html", [], function() {
    return '<div class="block-item order-coupon">\n    <h4 class="block-item-title">红包</h4>\n    <div class="coupon-info-container">\n	    <div class="js-normal-coupon coupon-info c-gray-dark">\n	    	<span class="pull-right <% if ( orderState < 3 ) { %>js-change-coupon<% } %>">您有 <%=available %> 个可用的红包</span>\n	    </div>\n	    <% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n	    <% } %>\n	</div>\n</div>'
}), define("text!wap/trade/confirm/view/luckymoney/templates/empty.html", [], function() {
    return '<div class="block-item order-coupon relative">\n    <h4 class="block-item-title">红包</h4>\n    <div class="coupon-info-container">\n    	<div class="js-normal-coupon coupon-info c-gray-dark">\n    	    <span class="<% if ( orderState < 3 ) { %>js-change-coupon<% } %>">使用红包</span>\n    	</div>\n    	<% if ( orderState < 3 ) { %>\n			<span class="arrow"></span>\n	    <% } %>\n    </div>\n\n</div>\n'
}), define("wap/trade/confirm/view/luckymoney/main", ["wap/trade/confirm/view/luckymoney/views/selector_view", "wap/components/popup", "text!wap/trade/confirm/view/luckymoney/templates/used.html", "text!wap/trade/confirm/view/luckymoney/templates/available.html", "text!wap/trade/confirm/view/luckymoney/templates/empty.html"], function(e, t, i, s, n) {
    var o = Backbone.View.extend({events: {"click .coupon-info-container": "showLuckyMoneySelector"},usedTemplate: _.template(i),availableTemplate: _.template(s),emptyTemplate: _.template(n),initialize: function(e) {
            var t = window._global;
            this.luckyMoneyData = t.lucky_money || {list: []}, this.orderState = t.order_state || 0, this.onluckyMoneyChanged = e.onluckyMoneyChanged
        },render: function(e) {
            var t = this.luckyMoneyData, i = t.used, s = this.luckyMoneyData["default"], n = this;
            return s && t.list.length > 0 ? (this.show(), this.luckyMoneyData.list.every(function(e) {
                return e.token == s ? (n.updateLuckyMoneyPanel(e), !0) : void 0
            })) : i ? (this.show(), this.updateLuckyMoneyPanel(i), this.stopShowLuckyMoneySelector = !0) : this.hide(), this
        },setData: function(e) {
            e && (this.luckyMoneyData = e, this.render())
        },hide: function() {
            this.$el.addClass("hide")
        },show: function() {
            this.$el.removeClass("hide")
        },showLuckyMoneySelector: function() {
            this.stopShowLuckyMoneySelector || (this.popView || (this.popView = new t({contentViewClass: e,contentViewOptions: {collection: new Backbone.Collection(this.luckyMoneyData.list),onLuckyMoneyChanged: _(this.onLuckyMoneyChanged).bind(this),active_token: this.usedLuckyMoney.token},containerCss: {bottom: 0,left: 0,right: 0,background: "#f9f9f9"},doNotRemoveOnHide: !0}).render(), this.selectorView = this.popView.contentView), this.popView.show())
        },updateLuckyMoneyPanel: function(e) {
            var t = this, i = "";
            if (this.usedLuckyMoney = e, e)
                i = t.usedTemplate({orderState: t.orderState,luckyMoney: e});
            else {
                var s = this.luckyMoneyData.list.length;
                i = s > 0 ? t.availableTemplate({orderState: t.orderState,available: s}) : t.emptyTemplate({orderState: t.orderState})
            }
            t.$el.html(i), t.show(), this.onluckyMoneyChanged(e)
        },onLuckyMoneyChanged: function(e) {
            this.updateLuckyMoneyPanel(e ? e.toJSON() : null)
        },disableSelector: function() {
            this.stopShowLuckyMoneySelector = !0, this.$(".arrow").addClass("hide")
        }});
    return o
}), define("text!wap/trade/confirm/templates/totlePrice.html", [], function() {
    return "<p>￥<%= (data.goods_price/100).toFixed(2) %> + ￥<%= (data.postage/100).toFixed(2) %>运费\n    <% if (data.decrease!=undefined && data.decrease!=0) { %>\n        - ￥<%= (data.decrease/100).toFixed(2) %>优惠\n    <% } %>\n    <% if (data.reduce_money!=undefined && data.reduce_money!=0) { %>\n        - ￥<%= (data.reduce_money/100).toFixed(2) %>满减优惠\n    <% } %>\n    <% if (data.operation_price!=undefined && data.operation_price!=0) { %>\n        <%= (data.operation_price > 0) ? '+' : '-' %> ￥<%= new Number(Math.abs(data.operation_price)/100).toFixed(2) %>改价\n    <% } %>\n</p>\n<strong class=\"js-real-pay c-orange js-real-pay-temp\">\n    需付：￥<%= getFinalPrice() %>\n</strong>"
}), define("wap/trade/confirm/view/priceBrain", ["text!wap/trade/confirm/templates/totlePrice.html"], function(e) {
    var t = _.template(e);
    return Backbone.View.extend({initialize: function(e) {
            this.nTotalPrice = $(".js-order-total");
            var t = e.ump || {}, i = (((t.order || {}).coupons || {}).money || {}).order || e.initPayData || {}, s = (t.order || {}).operation, n = _global.order.group || [];
            this.priceData = {goods_price: i.goods_price || 0,postage: i.postage || 0,groups: n || [],reduce_money: ((t.order || {}).reduce || {}).cash || 0,operation_price: 0,decrease: 0}, s && (this.priceData.operation_price = s.new_pay - s.origin_pay || 0)
        },changePrice: function() {
            var e = this.getShowData();
            this.nTotalPrice.html(t({data: e,getFinalPrice: _(function() {
                    return (this.getFinalPrice(e) / 100).toFixed(2)
                }).bind(this)}))
        },getShowData: function() {
            var e = this.priceData, t = this.couponData, i = e.postage, s = this.luckyMoney;
            return this.isSelfFetch && (i = 0), e.decrease = 0, t && (e.decrease = t.order.decrease), s && (e.decrease += parseInt(s.discount_fee)), _.extend(e, {postage: i})
        },getFinalPrice: function(e) {
            var e = e || this.getShowData();
            return +e.goods_price + +e.postage - e.reduce_money - e.decrease + e.operation_price
        },setPostage: function(e) {
            this.priceData.postage = e
        },setPriceData: function(e) {
            this.priceData = $.extend(this.priceData, e || {})
        }})
}), define("wap/components/wx_image_preview", [], function() {
    function e(e) {
        var t = e.attr("data-src") || e.attr("src"), i = t.replace(/!.*?\.jpg/i, "!640x320.jpg");
        return i
    }
    function t(e) {
        var t, i, s = 2;
        for (i = 0; s > i; i++)
            if (e = e.parent(), t = e.attr("href"), t && /[http|https|tel|mailto]:/i.test(t))
                return !0;
        return !1
    }
    function i() {
        var t = e($(this));
        n(t, [t])
    }
    var s = [], n = function(e, t) {
        window.WeixinJSBridge && window.WeixinJSBridge.invoke("imagePreview", {current: e,urls: t})
    }, o = {init: function() {
            var o = $(".js-view-image"), a = 0;
            o.each(function() {
                var i = $(this), o = e(i);
                t(i) || i.width() >= a && o && (s.push(o), i.on("click", function() {
                    n(o, s)
                }))
            }), $(".js-view-image-list").each(function(i) {
                var s = $(this);
                s.on("click", ".js-view-image-item", function(i) {
                    var o = s.find(".js-view-image-item");
                    if (!t($(i.target))) {
                        o = o.map(function() {
                            var t = $(this);
                            return e(t)
                        }).toArray();
                        var a = e($(this));
                        n(a, o)
                    }
                })
            }), $(document.body).off("click", ".js-view-single-image", i).on("click", ".js-view-single-image", i)
        },clear: function() {
            s = []
        }};
    return window.imagePreview = o, o
}), define("wap/trade/confirm/view/goods_list", [], function() {
    return Backbone.View.extend({initialize: function(e) {
            this.nList = this.$(".js-goods-list")
        },resolveErrData: function(e) {
            e = e || {};
            var t = this;
            _.each(e, function(e, i, s) {
                var n = t.nList.find(".block-item.block-sku-" + e.id + " .js-error");
                n.html(e.error_msg).removeClass("hide")
            })
        }})
}), require(["wap/trade/confirm/view/logistics_express_kdt", "wap/trade/confirm/view/logistics_express_wx", "wap/trade/confirm/view/logistics_selffetch_kdt", "wap/components/address/main", "wap/components/util/address", "wap/components/pop_page", "wap/trade/confirm/view/payView", "wap/trade/message_view", "wap/trade/confirm/view/order_message", "wap/trade/confirm/view/coupon/main", "wap/trade/confirm/view/luckymoney/main", "wap/trade/confirm/view/priceBrain", "wap/components/wx_image_preview", "wap/trade/confirm/view/goods_list", "text!wap/trade/confirm/templates/totlePrice.html"], function(e, t, i, s, n, o, a, r, d, c, l, h, p, u, f) {
    Backbone.EventCenter = _.extend({}, Backbone.Events);
    var m = window._global, w = Backbone.View.extend({initialize: function(n) {
            this.order_no = m.order_no || "", this.order = m.order, Backbone.EventCenter.on("address_list:show", this.hideContainer), Backbone.EventCenter.on("address_list:hide", this.showContainer), Backbone.EventCenter.on("address:has", this.showPaymentArea), Backbone.EventCenter.on("address:change", this.showPaymentArea), Backbone.EventCenter.on("address:beforeExpressSend", this.hidePaymentArea), Backbone.EventCenter.on("address:beforeExpressSend", _(this.addExternalGoodsData).bind(this)), Backbone.EventCenter.on("address:book:error", _(this.onBookError).bind(this)), this.goodsListView = new u({el: this.$(".js-goods-list-container")}), m.coupons && !m.coupons.forbid_coupon && (this.couponView = new c({onCouponChanged: _(function(e) {
                    this.priceBrainView.couponData = e, this.priceBrainView.changePrice(), this.payContainerView.refreshConfirmBtn(this.priceBrainView.getFinalPrice())
                }).bind(this)})), m.lucky_money && !m.lucky_money.forbid && this.initLuckyMoneyPanel();
            var o = $("#js-logistics-container");
            o.length > 0 ? this.expressWaysView = new s({el: o,onAddressChanged: _(this.onAddressChanged).bind(this),logisticsExpressKdtView: e,logisticsExpressWxView: t,logisticsSelfFetchKdtView: i,onWxAddressFailed: _(this.hideWxPay).bind(this),not_saveToSever: m.order_state > 2,expressOptions: {saveAddressToServer: !0,saveAddressUrl: m.url.trade + "/trade/order/address.json"}}) : this.order_no || this.bookGoods(), this.orderMessageView = new d({el: $(".js-order-message")}).render(), this.nPayWayContainer = $("#confirm-pay-way-opts");
            var r = m.url.trade;
            this.payContainerView = new a({payWays: m.payWays,innerPayWays: m.innerPayWays,payWaysContainer: this.nPayWayContainer,getPresentBtn: $("#get-present-btn"),nPayTips: $(".js-pay-tip"),payUrl: r + "/trade/order/pay.json",wxReturnUrl: r + "/pay/wxpay/return.json",wxPayResultUrl: r + "/trade/order/result?order_no=" + m.order_no + "&kdt_id=" + m.kdt_id + "&order_paid=1#wechat_webview_type=1&refresh",order_no: m.order_no,kdt_id: m.kdt_id,pagePayWaySize: parseInt(m.pagePayWaySize || 2),onPayOrderCreated: _(this.onPayOrderCreated).bind(this),getPayDataExtr: _(this.getPayDataExtr).bind(this),orderType: m.order_type,itemOptions: {onWxPayError: _(this.showWxScanPay).bind(this)}}), this.priceBrainView = new h({ump: m.ump || {},initPayData: m.pay_data || {}}), $.fn.MiniCounter && $(".js-mini-counter").MiniCounter({callback: function(e) {
                    $(".js-counter-msg").html('<h3>订单状态：您的订单已取消。</h3><hr /><p class="c-orange">您的订单因超时未付款，已经自动取消。</p>')
                }}), p.init(), m.order_state > 2 && this.showPaymentArea()
        },render: function() {
            return this.expressWaysView && this.expressWaysView.render(), this.priceBrainView.changePrice(), this.couponView && this.couponView.render(), this.luckyMoneyView && this.luckyMoneyView.render(), this.payContainerView.refreshConfirmBtn(this.priceBrainView.getFinalPrice()), this.payContainerView.render(), this
        },events: {"click .js-show-message": "onShowMessageClicked","click .js-qrcode": "onQrcodeTouch"},getPayDataExtr: function() {
            var e = {}, t = (this.luckyMoneyView || {}).usedLuckyMoney || {}, i = this.couponView && this.couponView.getCouponData();
            if (i) {
                var s = i.coupon;
                s && (e.coupon_id = s.id, e.coupon_type = s.type)
            }
            e.lucky_money_alias = t.activity_alias, e.lucky_money_token = t.token;
            var n = this.orderMessageView.getMsg();
            if (!this.orderMessageView.validate(n))
                return !1;
            if (e.order_message = n.order_message || "", !this.expressWaysView)
                return e;
            var o = this.expressWaysView.logisticsWay, a = this.expressWaysView.logisticsViews[o];
            a.address;
            if ("express" === o)
                return a.cannotDeliver ? (motify.log("该地区暂不支持配送<br/>请修改收货地址"), !1) : a.sendingToServer ? (motify.log("收货地址提交中，请稍等"), 
                !1) : (e.express_type = o, e);
            var r = $(".js-self-fetch .js-name").val().trim(), d = $(".js-self-fetch .js-phone").val().trim(), c = $(".js-self-fetch .js-time[type=date]").val().trim(), l = $(".js-self-fetch .js-time[type=time]").val().trim();
            return r ? Utils.validPhone(d) || Utils.validMobile(d) ? c && l ? _.extend(e, {user_name: r,user_tel: d,user_time: c + " " + l,express_type: o,lucky_money_alias: t.activity_alias,lucky_money_token: t.token}) : (motify.log("请填写预约时间"), !1) : (motify.log("请填写正确的联系方式"), !1) : (motify.log("请填写您的姓名！"), !1)
        },hideWxPay: function() {
        },onShowMessageClicked: function(e) {
            this.messagePopPage = new o({nPageContents: [$("#js-page-content")],el: $("#sku-message-poppage"),contentViewClass: r,contentViewOptions: {nTarget: $(e.target)}}).render().show()
        },onPayOrderCreated: function(e) {
            this.expressWaysView && this.expressWaysView.onPayOrderCreated(e), this.luckyMoneyView && this.luckyMoneyView.disableSelector()
        },hideContainer: function() {
        },showContainer: function() {
        },showPaymentArea: function() {
            $(".js-step-topay").removeClass("hide")
        },hidePaymentArea: function() {
            $(".js-step-topay").addClass("hide")
        },addExternalGoodsData: function(e) {
            if (this.order_no)
                return void (e.address.order_no = this.order_no);
            var t = m.goods_list || [], i = m.common || {};
            e.goods_list = t, e.common = i
        },onAddressChanged: function(e) {
            var t = e.data || {};
            if (!this.order_no && t.order_no && this.setDataAfterBook(t), !this.luckyMoneyView && t.lucky_money && this.initLuckyMoneyPanel(), this.luckyMoneyView && this.luckyMoneyView.setData(t.lucky_money), this.isSelfFetch = "self-fetch" === e.logisticsWay, this.priceBrainView.isSelfFetch = this.isSelfFetch, this.payContainerView.updatePayWayList({code: "codpay",name: this.isSelfFetch ? "到店付款" : "货到付款"}), e.isResetPriceData) {
                var i = t.pay_data.group, s = this.order.group, n = 0, o = 0;
                if (i)
                    for (var a in i)
                        n = this.isSelfFetch ? 0 : i[a].postage, o = ((s[a].pay_price + n) / 100).toFixed(2), this.$("#postage-total-" + a).text("￥" + (n / 100).toFixed(2)), this.$("#sum-price-" + a).text("￥" + o);
                else {
                    var a = m.kdt_id;
                    o = ((s[a].pay_price + n) / 100).toFixed(2), this.$("#postage-total-" + a).text("￥" + n.toFixed(2)), this.$("#sum-price-" + a).text("￥" + o)
                }
                this.setTotalPrice(t)
            }
            this.priceBrainView.changePrice(), this.payContainerView.refreshConfirmBtn(this.priceBrainView.getFinalPrice())
        },initLuckyMoneyPanel: function() {
            this.luckyMoneyView = new l({el: $(".js-lm-panel"),onluckyMoneyChanged: _(function(e) {
                    this.priceBrainView.luckyMoney = e, this.priceBrainView.changePrice(), this.payContainerView.refreshConfirmBtn(this.priceBrainView.getFinalPrice())
                }).bind(this)})
        },onBookError: function(e) {
            this.goodsListView.resolveErrData(e.book_error)
        },showWxScanPay: function() {
            var e = this;
            e.isQrCodeShowed || $.ajax({url: "/v2/trade/native/qrCode.json",type: "GET",dataType: "json",data: {order_no: e.order_no,kdt_id: m.kdt_id},success: function(t) {
                    e.isQrCodeShowed || (t && 0 == t.code || alert("数据错误，请刷新"), e.nPayWayContainer.css("margin-top", "10px"), e.nPayWayContainer.before((t.data || {}).tpl), $("body").scrollTop(e.nPayWayContainer.offset().top), e.isQrCodeShowed = !0)
                }})
        },onQrcodeTouch: function() {
            $(".js-scan-pay-finish").removeClass("hide")
        },bookGoods: function() {
            var e = this, t = {};
            this.addExternalGoodsData(t), $.ajax({url: "/v2/trade/order/book.json",type: "POST",dataType: "json",data: t,beforeSend: function() {
                    e.hidePaymentArea()
                },success: function(t) {
                    if (0 != t.code)
                        return void motify.log("下单失败");
                    var i = t.data || {};
                    e.setDataAfterBook(i), e.setTotalPrice(i), e.showPaymentArea()
                }})
        },setDataAfterBook: function(e) {
            this.order_no = e.order_no, this.couponView && this.couponView.setOrderNo(this.order_no), this.payContainerView.refreshData({order_no: this.order_no,wxPayResultUrl: m.url.trade + "/trade/order/result?order_no=" + this.order_no + "&kdt_id=" + m.kdt_id + "&order_paid=1#wechat_webview_type=1&refresh"})
        },setTotalPrice: function(e) {
            var e = e || {}, t = e.pay_data || {}, i = (e.ump || {}).operation || {}, s = (e.ump || {}).reduce || {}, n = e.coupons, o = t.group, a = 0;
            for (var r in o)
                a += o[parseInt(r)].postage;
            this.priceBrainView.setPriceData({postage: a,groups: o,reduce_money: s.cash || 0,operation_price: i.new_pay - i.origin_pay || 0}), this.couponView && this.couponView.setCoupons(n), 0 === i.is_allow_preference ? this.couponView && this.couponView.hideCoupon() : this.couponView && this.couponView.showCoupon()
        }});
    window.confirmView = new w({el: $("body")}).render()
}), define("main", function() {
});
