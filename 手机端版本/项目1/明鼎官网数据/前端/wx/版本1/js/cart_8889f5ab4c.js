define("components/zenjs/backbone/base_view", ["components/zenjs/core/trigger_method"], function(t) {
    return Backbone.View.extend({clean: function() {
            return this.stopListening(), this
        },triggerMethod: t})
}), define("components/zenjs/list/list", ["components/zenjs/backbone/base_view"], function(t) {
    var e = function() {
    };
    return t.extend({initialize: function(t) {
            return this.options = t = t || {}, this.items = [], this.itemView = t.itemView, this.itemOptions = t.itemOptions || {}, this.collection = t.collection, this.onAfterListChange = t.onAfterListChange || e, this.onAfterListLoad = t.onAfterListLoad || e, this.onAfterListDisplay = t.onAfterListDisplay || e, this.onListEmpty = t.onListEmpty || t.onEmptyList || this._onListEmpty, this.onItemClick = t.onItemClick || e, this.onViewItemAdded = t.onViewItemAdded || e, this.displaySize = t.displaySize || -1, this.emptyHTML = t.emptyHTML || "", this.emptyText = t.emptyText || "列表为空", this
        },render: function(t) {
            return this.displaySize = -1 == (t || {}).displaySize ? -1 : this.displaySize, this.clean(), this._setupListeners(), this.addAll(), this.onAfterListDisplay({list: this.collection}), this
        },fetchRender: function(t) {
            return this.collection.fetch({data: t,success: _(function(t, e) {
                    this.render(), this.onAfterListLoad(this.collection, e), this.onFetchSuccess && this.onFetchSuccess()
                }).bind(this)}), this
        },_setupListeners: function() {
            this.collection && (this.stopListening(this.collection), this.listenTo(this.collection, "add", this.addItem, this), this.listenTo(this.collection, "reset sort", this.render, this), this.listenTo(this.collection, "remove", this.onItemRemoved, this))
        },addItemListeners: function(t) {
            var e = this;
            this.listenTo(t, "all", function() {
                var e = "item:" + arguments[0], i = _.toArray(arguments);
                i.splice(0, 1), i.unshift(e, t), this.trigger.apply(this, i), "item:click" == e && this.onItemClick()
            }), this.listenTo(t.model, "change", function() {
                e.onAfterListChange({list: this.collection})
            })
        },addAll: function() {
            0 === this.collection.length ? this.fetching || this.triggerMethod("list:empty") : this.collection.each(function(t) {
                this.addItem(t)
            }, this)
        },removeAll: function() {
            for (var t = this.items.length - 1; t >= 0; t--)
                this.removeView(this.items[t]);
            this.onAfterListChange({list: this.collection})
        },addItem: function(t) {
            if (!(this.displaySize >= 0 && this.items.length >= this.displaySize)) {
                1 == this.collection.length && (this.listEl || this.$el).html("");
                var e = new this.itemView(_.extend({}, this.options.itemOptions, {model: t,index: this.collection.indexOf(t)}));
                return this.items.push(e), this.addItemListeners(e), e.render(), this.onViewItemAdded({list: this.items,viewItem: e}), (this.listEl || this.$el).append(e.el), e
            }
        },removeItem: function(t) {
            var e = this.getViewByModel(t);
            e && this.removeView(e)
        },removeView: function(t) {
            var e;
            this.stopListening(t), t && (this.stopListening(t.model), t.remove(), e = this.items.indexOf(t), this.items.splice(e, 1)), 0 === this.collection.length && (this.fetching || this.triggerMethod("list:empty"))
        },onItemRemoved: function(t) {
            this.onAfterListChange({list: this.collection,action: "remove",model: t}), this.removeItem(t)
        },getViewByModel: function(t) {
            return _.find(this.items, function(e, i) {
                return e.model === t
            })
        },dispatchEventToAllViews: function(t, e) {
            for (var i = this.items.length - 1; i >= 0; i--)
                this.items[i].trigger(t, e)
        },remove: function() {
            t.prototype.remove.call(this, arguments), this.removeAll(), this.collection.reset(), delete this.collection
        },clean: function() {
            t.prototype.clean.call(this, arguments), this.removeAll(), (this.listEl || this.$el).html(""), this.stopListening(this.collection)
        },_onListEmpty: function() {
            this.$el.html(this.emptyHTML || (this.emptyText ? '<p style="text-align:center;line-height:60px;">' + this.emptyText + "</p>" : ""))
        }})
}), define("wap/components/goods_list/models/model", [], function() {
    var t = Backbone.Model.extend({idAttribute: "sku_id",url: function() {
            return this.urlRoot + (this.has("sku_id") ? "?sku_id=" + this.id : "")
        },defaults: {checked: !0},parse: function(t, e) {
            var i = this.get("limitNum"), n = parseInt((t.sku_info || {}).stock_num);
            return t.limitNum = n > i ? i : n, this.editing = this.editing || t.isEditing, delete t.isEditing, t
        },getGoodsJson: function() {
            var t = (this.get("goods_info") || {}, this.get("sku_info") || {}), e = this.get("num");
            return null == e ? null : {goods_id: this.get("goods_id"),sku_id: this.get("sku_id"),price: t.pay_price,num: this.get("num"),sku_code: t.code}
        },isCheckable: function() {
            if (this.editing)
                return !0;
            var t = this.get("limitNum");
            if (t >= 0) {
                var e = parseInt(this.get("num"));
                return t >= e
            }
            return this.disabled ? !1 : !0
        }});
    return t
}), define("wap/components/goods_list/models/collection", ["wap/components/goods_list/models/model"], function(t) {
    return Backbone.Collection.extend({initialize: function(e, i) {
            this.model = (i.GoodsModel || t).extend({urlRoot: i.modelUrlRoot}), this.url = i.modelUrlRoot, this.goodsJson = i.goodsJson || {}
        },parse: function(t) {
            var e = this, i = $.extend(!0, [], t.data);
            return _.each(i, function(t) {
                t.isEditing = e.isEditing, t.sku_info && t.sku_info.sku && (t.sku_info.sku = JSON.parse(t.sku_info.sku))
            }), i
        },getTotalPrice: function() {
            var t = 0, e = null;
            return this.each(function(i) {
                e = i.get("sku_info"), e && i.get("checked") && (t += e.pay_price * i.get("num"))
            }, this), t / 100
        },isAllChecked: function(t) {
            var e = this.find(function(e) {
                return !e.get(t)
            }, this);
            return void 0 === e
        },getBrief: function(t) {
            var e = 0, i = 0, n = 0, s = null;
            return this.each(function(o) {
                s = o.get("sku_info"), s && o.get(t) && (("checked" == t || o.get("checked")) && (e += s.pay_price * o.get("num"), n += parseInt(o.get("num"))), i++)
            }, this), {totalPrice: e,flagged: i,total: this.length,totalNum: n}
        },getGoodsListJson: function() {
            var t = [], e = !1;
            return this.each(function(i) {
                if (i.get("checked")) {
                    var n = i.getGoodsJson();
                    n ? t.push(n) : e = !0
                }
            }, this), e ? {json: null,errorMsg: "数量不对哦"} : t.length > 0 ? {json: JSON.stringify(_.extend({cart: t}, this.goodsJson))} : {json: null}
        },updateAllCheck: function(t, e) {
            this.each(function(i) {
                i.isCheckable() && i.set(e, t)
            }, this)
        }})
}), define("text!wap/components/goods_list/templates/goodsItem.html", [], function() {
    return '<%\nif (data.goods_info) {\n    var gooodsLink = isEditing ? \'javascript:;\' : getGoodsLink();\n%>\n    <div class="check-container\n        <% if (notShowCheckBox && !isEditing) { %>\n        hide\n        <% } %>\n    ">\n        <span class="check\n        <% if (!isEditing && data.checked) { %>\n         checked\n        <% } %>"></span>\n    </div>\n    <div class="name-card name-card-3col clearfix">\n        <a href="<%= gooodsLink %>" class="thumb"><img src="<%= getCdnImageUrl(data.goods_info.thumb_url, \'\') %>"></a>\n        <div class="detail">\n            <a href="<%= gooodsLink %>">\n                <h3 class="js-ellipsis" style="height: 32px; overflow: hidden;"><i><%= data.goods_info.title %></i></h3>\n            </a>\n            <p class="ellipsis">\n                <% if(!!data.sku_info) { %>\n                    <% var sku = data.sku_info.sku %>\n                    <% for(gm in sku){ %>\n                        <% if(sku[gm].v && sku[gm].v.length>0){ %><%= sku[gm].v %>&nbsp;<% } %>\n                    <% } %>\n                <% } %>\n            </p>\n        </div>\n        <div class="right-col price-num">\n            <div class="price">￥<span><%= (data.sku_info.pay_price/100).toFixed(2) %></span></div>\n            <% if (!notShowNum) { %>\n            <div class="num">\n                ×<span class="num-txt"><%= data.num %></span>\n            </div>\n            <% } %>\n            <div class="error-box"><%= data.error_msg %></div>\n        </div>\n    </div>\n    <div class="delete-btn"> <span>删除</span> </div>\n<% } %>\n'
}), function(t) {
    function e(e) {
        return !e || void 0 !== e.allowPageScroll || void 0 === e.swipe && void 0 === e.swipeStatus || (e.allowPageScroll = h), void 0 !== e.click && void 0 === e.tap && (e.tap = e.click), e || (e = {}), e = t.extend({}, t.fn.swipe.defaults, e), this.each(function() {
            var n = t(this), s = n.data(E);
            s || (s = new i(this, e), n.data(E, s))
        })
    }
    function i(e, i) {
        function F(e) {
            if (!(ht() || t(e.target).closest(i.excludedElements, Gt).length > 0)) {
                var n, s = e.originalEvent ? e.originalEvent : e, o = _ ? s.touches[0] : s;
                return Rt = y, _ ? qt = s.touches.length : e.preventDefault(), zt = 0, Vt = null, Ut = null, Ot = 0, Dt = 0, It = 0, Bt = 1, Mt = 0, Jt = mt(), Ht = vt(), at(), !_ || qt === i.fingers || i.fingers === w || H() ? (ct(0, o), Kt = Lt(), 2 == qt && (ct(1, s.touches[1]), Dt = It = yt(Jt[0].start, Jt[1].start)), (i.swipeStatus || i.pinchStatus) && (n = z(s, Rt))) : n = !1, n === !1 ? (Rt = x, z(s, Rt), n) : (i.hold && (te = setTimeout(t.proxy(function() {
                    Gt.trigger("hold", [s.target]), i.hold && (n = i.hold.call(Gt, s, s.target))
                }, this), i.longTapThreshold)), dt(!0), null)
            }
        }
        function j(t) {
            var e = t.originalEvent ? t.originalEvent : t;
            if (Rt !== k && Rt !== x && !rt()) {
                var n, s = _ ? e.touches[0] : e, o = ut(s);
                if (Wt = Lt(), _ && (qt = e.touches.length), i.hold && clearTimeout(te), Rt = C, 2 == qt && (0 == Dt ? (ct(1, e.touches[1]), Dt = It = yt(Jt[0].start, Jt[1].start)) : (ut(e.touches[1]), It = yt(Jt[0].end, Jt[1].end), Ut = kt(Jt[0].end, Jt[1].end)), Bt = Ct(Dt, It), Mt = Math.abs(Dt - It)), qt === i.fingers || i.fingers === w || !_ || H()) {
                    if (Vt = Tt(o.start, o.end), M(t, Vt), zt = xt(o.start, o.end), Ot = bt(), ft(Vt, zt), (i.swipeStatus || i.pinchStatus) && (n = z(e, Rt)), i.triggerOnTouchEnd || i.triggerOnTouchLeave) {
                        var l = !0;
                        if (i.triggerOnTouchLeave) {
                            var a = Et(this);
                            l = Ft(o.end, a)
                        }
                        !i.triggerOnTouchEnd && l ? Rt = A(C) : i.triggerOnTouchLeave && !l && (Rt = A(k)), (Rt == x || Rt == k) && z(e, Rt)
                    }
                } else
                    Rt = x, z(e, Rt);
                n === !1 && (Rt = x, z(e, Rt))
            }
        }
        function S(t) {
            var e = t.originalEvent ? t.originalEvent : t;
            return _ && e.touches.length > 0 ? (lt(), !0) : (rt() && (qt = Xt), Wt = Lt(), Ot = bt(), D() || !O() ? (Rt = x, z(e, Rt)) : i.triggerOnTouchEnd || 0 == i.triggerOnTouchEnd && Rt === C ? (t.preventDefault(), Rt = k, z(e, Rt)) : !i.triggerOnTouchEnd && Y() ? (Rt = k, V(e, Rt, p)) : Rt === C && (Rt = x, z(e, Rt)), dt(!1), null)
        }
        function $() {
            qt = 0, Wt = 0, Kt = 0, Dt = 0, It = 0, Bt = 1, at(), dt(!1)
        }
        function P(t) {
            var e = t.originalEvent ? t.originalEvent : t;
            i.triggerOnTouchLeave && (Rt = A(k), z(e, Rt))
        }
        function N() {
            Gt.unbind(St, F), Gt.unbind(At, $), Gt.unbind($t, j), Gt.unbind(Pt, S), Nt && Gt.unbind(Nt, P), dt(!1)
        }
        function A(t) {
            var e = t, n = B(), s = O(), o = D();
            return !n || o ? e = x : !s || t != C || i.triggerOnTouchEnd && !i.triggerOnTouchLeave ? !s && t == k && i.triggerOnTouchLeave && (e = x) : e = k, e
        }
        function z(t, e) {
            var i = void 0;
            return J() || q() ? i = V(t, e, c) : (G() || H()) && i !== !1 && (i = V(t, e, u)), st() && i !== !1 ? i = V(t, e, m) : ot() && i !== !1 ? i = V(t, e, f) : nt() && i !== !1 && (i = V(t, e, p)), e === x && $(t), e === k && (_ ? 0 == t.touches.length && $(t) : $(t)), i
        }
        function V(e, h, d) {
            var g = void 0;
            if (d == c) {
                if (Gt.trigger("swipeStatus", [h, Vt || null, zt || 0, Ot || 0, qt, Jt]), i.swipeStatus && (g = i.swipeStatus.call(Gt, e, h, Vt || null, zt || 0, Ot || 0, qt, Jt), g === !1))
                    return !1;
                if (h == k && R()) {
                    if (Gt.trigger("swipe", [Vt, zt, Ot, qt, Jt]), i.swipe && (g = i.swipe.call(Gt, e, Vt, zt, Ot, qt, Jt), g === !1))
                        return !1;
                    switch (Vt) {
                        case n:
                            Gt.trigger("swipeLeft", [Vt, zt, Ot, qt, Jt]), i.swipeLeft && (g = i.swipeLeft.call(Gt, e, Vt, zt, Ot, qt, Jt));
                            break;
                        case s:
                            Gt.trigger("swipeRight", [Vt, zt, Ot, qt, Jt]), i.swipeRight && (g = i.swipeRight.call(Gt, e, Vt, zt, Ot, qt, Jt));
                            break;
                        case o:
                            Gt.trigger("swipeUp", [Vt, zt, Ot, qt, Jt]), i.swipeUp && (g = i.swipeUp.call(Gt, e, Vt, zt, Ot, qt, Jt));
                            break;
                        case l:
                            Gt.trigger("swipeDown", [Vt, zt, Ot, qt, Jt]), i.swipeDown && (g = i.swipeDown.call(Gt, e, Vt, zt, Ot, qt, Jt))
                    }
                }
            }
            if (d == u) {
                if (Gt.trigger("pinchStatus", [h, Ut || null, Mt || 0, Ot || 0, qt, Bt, Jt]), i.pinchStatus && (g = i.pinchStatus.call(Gt, e, h, Ut || null, Mt || 0, Ot || 0, qt, Bt, Jt), g === !1))
                    return !1;
                if (h == k && U())
                    switch (Ut) {
                        case a:
                            Gt.trigger("pinchIn", [Ut || null, Mt || 0, Ot || 0, qt, Bt, Jt]), i.pinchIn && (g = i.pinchIn.call(Gt, e, Ut || null, Mt || 0, Ot || 0, qt, Bt, Jt));
                            break;
                        case r:
                            Gt.trigger("pinchOut", [Ut || null, Mt || 0, Ot || 0, qt, Bt, Jt]), i.pinchOut && (g = i.pinchOut.call(Gt, e, Ut || null, Mt || 0, Ot || 0, qt, Bt, Jt))
                    }
            }
            return d == p ? (h === x || h === k) && (clearTimeout(Zt), clearTimeout(te), X() && !tt() ? (Qt = Lt(), Zt = setTimeout(t.proxy(function() {
                Qt = null, Gt.trigger("tap", [e.target]), i.tap && (g = i.tap.call(Gt, e, e.target))
            }, this), i.doubleTapThreshold)) : (Qt = null, Gt.trigger("tap", [e.target]), i.tap && (g = i.tap.call(Gt, e, e.target)))) : d == m ? (h === x || h === k) && (clearTimeout(Zt), Qt = null, Gt.trigger("doubletap", [e.target]), i.doubleTap && (g = i.doubleTap.call(Gt, e, e.target))) : d == f && (h === x || h === k) && (clearTimeout(Zt), Qt = null, Gt.trigger("longtap", [e.target]), i.longTap && (g = i.longTap.call(Gt, e, e.target))), g
        }
        function O() {
            var t = !0;
            return null !== i.threshold && (t = zt >= i.threshold), t
        }
        function D() {
            var t = !1;
            return null !== i.cancelThreshold && null !== Vt && (t = gt(Vt) - zt >= i.cancelThreshold), t
        }
        function I() {
            return null !== i.pinchThreshold ? Mt >= i.pinchThreshold : !0
        }
        function B() {
            var t;
            return t = i.maxTimeThreshold && Ot >= i.maxTimeThreshold ? !1 : !0
        }
        function M(t, e) {
            if (i.allowPageScroll === h || H())
                t.preventDefault();
            else {
                var a = i.allowPageScroll === d;
                switch (e) {
                    case n:
                        (i.swipeLeft && a || !a && i.allowPageScroll != g) && t.preventDefault();
                        break;
                    case s:
                        (i.swipeRight && a || !a && i.allowPageScroll != g) && t.preventDefault();
                        break;
                    case o:
                        (i.swipeUp && a || !a && i.allowPageScroll != v) && t.preventDefault();
                        break;
                    case l:
                        (i.swipeDown && a || !a && i.allowPageScroll != v) && t.preventDefault()
                }
            }
        }
        function U() {
            var t = K(), e = W(), i = I();
            return t && e && i
        }
        function H() {
            return !!(i.pinchStatus || i.pinchIn || i.pinchOut)
        }
        function G() {
            return !(!U() || !H())
        }
        function R() {
            var t = B(), e = O(), i = K(), n = W(), s = D(), o = !s && n && i && e && t;
            return o
        }
        function q() {
            return !!(i.swipe || i.swipeStatus || i.swipeLeft || i.swipeRight || i.swipeUp || i.swipeDown)
        }
        function J() {
            return !(!R() || !q())
        }
        function K() {
            return qt === i.fingers || i.fingers === w || !_
        }
        function W() {
            return 0 !== Jt[0].end.x
        }
        function Y() {
            return !!i.tap
        }
        function X() {
            return !!i.doubleTap
        }
        function Q() {
            return !!i.longTap
        }
        function Z() {
            if (null == Qt)
                return !1;
            var t = Lt();
            return X() && t - Qt <= i.doubleTapThreshold
        }
        function tt() {
            return Z()
        }
        function et() {
            return (1 === qt || !_) && (isNaN(zt) || zt < i.threshold)
        }
        function it() {
            return Ot > i.longTapThreshold && b > zt
        }
        function nt() {
            return !(!et() || !Y())
        }
        function st() {
            return !(!Z() || !X())
        }
        function ot() {
            return !(!it() || !Q())
        }
        function lt() {
            Yt = Lt(), Xt = event.touches.length + 1
        }
        function at() {
            Yt = 0, Xt = 0
        }
        function rt() {
            var t = !1;
            if (Yt) {
                var e = Lt() - Yt;
                e <= i.fingerReleaseThreshold && (t = !0)
            }
            return t
        }
        function ht() {
            return !(Gt.data(E + "_intouch") !== !0)
        }
        function dt(t) {
            t === !0 ? (Gt.bind($t, j), Gt.bind(Pt, S), Nt && Gt.bind(Nt, P)) : (Gt.unbind($t, j, !1), Gt.unbind(Pt, S, !1), Nt && Gt.unbind(Nt, P, !1)), Gt.data(E + "_intouch", t === !0)
        }
        function ct(t, e) {
            var i = void 0 !== e.identifier ? e.identifier : 0;
            return Jt[t].identifier = i, Jt[t].start.x = Jt[t].end.x = e.pageX || e.clientX, Jt[t].start.y = Jt[t].end.y = e.pageY || e.clientY, Jt[t]
        }
        function ut(t) {
            var e = void 0 !== t.identifier ? t.identifier : 0, i = pt(e);
            return i.end.x = t.pageX || t.clientX, i.end.y = t.pageY || t.clientY, i
        }
        function pt(t) {
            for (var e = 0; e < Jt.length; e++)
                if (Jt[e].identifier == t)
                    return Jt[e]
        }
        function mt() {
            for (var t = [], e = 0; 5 >= e; e++)
                t.push({start: {x: 0,y: 0},end: {x: 0,y: 0},identifier: 0});
            return t
        }
        function ft(t, e) {
            e = Math.max(e, gt(t)), Ht[t].distance = e
        }
        function gt(t) {
            return Ht[t] ? Ht[t].distance : void 0
        }
        function vt() {
            var t = {};
            return t[n] = wt(n), t[s] = wt(s), t[o] = wt(o), t[l] = wt(l), t
        }
        function wt(t) {
            return {direction: t,distance: 0}
        }
        function bt() {
            return Wt - Kt
        }
        function yt(t, e) {
            var i = Math.abs(t.x - e.x), n = Math.abs(t.y - e.y);
            return Math.round(Math.sqrt(i * i + n * n))
        }
        function Ct(t, e) {
            var i = e / t * 1;
            return i.toFixed(2)
        }
        function kt() {
            return 1 > Bt ? r : a
        }
        function xt(t, e) {
            return Math.round(Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)))
        }
        function _t(t, e) {
            var i = t.x - e.x, n = e.y - t.y, s = Math.atan2(n, i), o = Math.round(180 * s / Math.PI);
            return 0 > o && (o = 360 - Math.abs(o)), o
        }
        function Tt(t, e) {
            var i = _t(t, e);
            return 45 >= i && i >= 0 ? n : 360 >= i && i >= 315 ? n : i >= 135 && 225 >= i ? s : i > 45 && 135 > i ? l : o
        }
        function Lt() {
            var t = new Date;
            return t.getTime()
        }
        function Et(e) {
            e = t(e);
            var i = e.offset(), n = {left: i.left,right: i.left + e.outerWidth(),top: i.top,bottom: i.top + e.outerHeight()};
            return n
        }
        function Ft(t, e) {
            return t.x > e.left && t.x < e.right && t.y > e.top && t.y < e.bottom
        }
        var jt = _ || L || !i.fallbackToMouseEvents, St = jt ? L ? T ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown", $t = jt ? L ? T ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove", Pt = jt ? L ? T ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup", Nt = jt ? null : "mouseleave", At = L ? T ? "MSPointerCancel" : "pointercancel" : "touchcancel", zt = 0, Vt = null, Ot = 0, Dt = 0, It = 0, Bt = 1, Mt = 0, Ut = 0, Ht = null, Gt = t(e), Rt = "start", qt = 0, Jt = null, Kt = 0, Wt = 0, Yt = 0, Xt = 0, Qt = 0, Zt = null, te = null;
        try {
            Gt.bind(St, F), Gt.bind(At, $)
        } catch (ee) {
            t.error("events not supported " + St + "," + At + " on jQuery.swipe")
        }
        this.enable = function() {
            return Gt.bind(St, F), Gt.bind(At, $), Gt
        }, this.disable = function() {
            return N(), Gt
        }, this.destroy = function() {
            return N(), Gt.data(E, null), Gt
        }, this.option = function(e, n) {
            if (void 0 !== i[e]) {
                if (void 0 === n)
                    return i[e];
                i[e] = n
            } else
                t.error("Option " + e + " does not exist on jQuery.swipe.options");
            return null
        }
    }
    var n = "left", s = "right", o = "up", l = "down", a = "in", r = "out", h = "none", d = "auto", c = "swipe", u = "pinch", p = "tap", m = "doubletap", f = "longtap", g = "horizontal", v = "vertical", w = "all", b = 10, y = "start", C = "move", k = "end", x = "cancel", _ = "ontouchstart" in window, T = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled, L = window.navigator.pointerEnabled || window.navigator.msPointerEnabled, E = "TouchSwipe", F = {fingers: 1,threshold: 75,cancelThreshold: null,pinchThreshold: 20,maxTimeThreshold: null,fingerReleaseThreshold: 250,longTapThreshold: 500,doubleTapThreshold: 200,swipe: null,swipeLeft: null,swipeRight: null,swipeUp: null,swipeDown: null,swipeStatus: null,pinchIn: null,pinchOut: null,pinchStatus: null,click: null,tap: null,doubleTap: null,longTap: null,hold: null,triggerOnTouchEnd: !0,triggerOnTouchLeave: !1,allowPageScroll: "auto",fallbackToMouseEvents: !0,excludedElements: "label, button, input, select, textarea, a, .noSwipe"};
    t.fn.swipe = function(i) {
        var n = t(this), s = n.data(E);
        if (s && "string" == typeof i) {
            if (s[i])
                return s[i].apply(this, Array.prototype.slice.call(arguments, 1));
            t.error("Method " + i + " does not exist on jQuery.swipe")
        } else if (!(s || "object" != typeof i && i))
            return e.apply(this, arguments);
        return n
    }, t.fn.swipe.defaults = F, t.fn.swipe.phases = {PHASE_START: y,PHASE_MOVE: C,PHASE_END: k,PHASE_CANCEL: x}, t.fn.swipe.directions = {LEFT: n,RIGHT: s,UP: o,DOWN: l,IN: a,OUT: r}, t.fn.swipe.pageScroll = {NONE: h,HORIZONTAL: g,VERTICAL: v,AUTO: d}, t.fn.swipe.fingers = {ONE: 1,TWO: 2,THREE: 3,ALL: w}
}($), define("vendor/jquery_touchSwipe", function() {
}), define("components/zenjs/backbone/quantity", ["backbone", "components/zenjs/util/ua"], function(t, e) {
    var i = window.zenjs.UA, n = function() {
    }, s = t.View.extend({template: _.template('<div class="quantity">            <button class="minus" type="button" <% if (data.readonly){ %> disabled <% } %> ></button>            <input type="text" class="txt" value="<%= data.num %>" <% if (data.readonly){ %> readonly <% } %>/>            <button class="plus" type="button" <% if (data.readonly){ %> disabled <% } %>></button>            <div class="response-area response-area-minus"></div>            <div class="response-area response-area-plus"></div>            <div class="txtCover"></div>        </div>'),initialize: function() {
            var t = function(t, e, i) {
                var n;
                return i > e ? (n = e, 0 !== e && (this.disabled = !0)) : n = i > t ? i : t > e ? e : t, n
            };
            return function(e) {
                this.onNumChange = e.onNumChange || n, this.onOverLimit = e.onOverLimit || n, this.limitNum = parseInt(e.limitNum), this.minimalNum = parseInt(e.minimalNum), this.minimalNum = 0 == this.minimalNum ? 0 : this.minimalNum || 1, this.onBelowLeast = e.onBelowLeast || n, this.disabled = e.disabled, this.num = t.call(this, e.num, this.limitNum, this.minimalNum), this.readonly = e.readonly, this.num != e.num && this.onNumChange(this.num)
            }
        }(),events: {"click .response-area-minus": "onSubClicked","click .response-area-plus": "onAddClicked","click .txtCover": "txtFocus","blur .txt": "txtBlur"},txtFocus: function(t) {
            if (!this.disabled) {
                var e = this.$el.find(".txt");
                e.focus(), i && (i.isIOS() && i.getIOSVersion() < 8 && (e.blur(), e.focus()), $(t.target).css("display", "none"))
            }
        },txtBlur: function(t) {
            this.$el.find(".txtCover").css("display", "block"), this.refreshNum()
        },onSubClicked: function(t) {
            this.changeNum(this.num - 1)
        },onAddClicked: function() {
            this.changeNum(this.num + 1)
        },changeNum: function(t) {
            if (!this.readonly && !this.disabled) {
                if (t > this.limitNum)
                    return void this.onOverLimit(t, this.limitNum);
                if (t < this.minimalNum)
                    return this.onBelowLeast(t, this.minimalNum), void (t = this.minimalNum);
                this.updateBtnStatus(t), this.updateNum(t)
            }
        },updateBtnStatus: function() {
            var t = function(t) {
                t.addClass("disabled"), t.attr("disabled", "true")
            }, e = function(t) {
                t.removeClass("disabled"), t.removeAttr("disabled")
            };
            return function(i) {
                return this.readonly ? (t(this.nMinus), void t(this.nPlus)) : (i > this.minimalNum ? e(this.nMinus) : t(this.nMinus), void (this.limitNum > 0 && i >= this.limitNum ? t(this.nPlus) : e(this.nPlus)))
            }
        }(),updateNum: function(t) {
            this.disabled || (this.num = +t, this.$("input").val(this.num), this.onNumChange(this.num))
        },refreshNum: function() {
            var t = parseInt(this.$("input").val());
            this.num !== t && (t > 0 ? this.limitNum > 0 && t > this.limitNum ? this.num = this.limitNum : this.num = t : (this.num = this.minimalNum, this.updateNum(this.num)), this.changeNum(this.num))
        },setLimitNum: function(t) {
            this.disabled || 1 > t || (this.limitNum = +t, this.limitNum < this.num && this.changeNum(this.limitNum))
        },setMinimalNum: function(t) {
            this.disabled || 1 > t || (this.minimalNum = +t, this.num < this.minimalNum && this.changeNum(this.minimalNum))
        },validateNum: function(t) {
            var e = parseInt(this.$("input").val());
            return this.$("input").val(e), e > this.limitNum || 0 === this.limitNum ? (this.onOverLimit(e, this.limitNum), !1) : e < this.minimalNum ? (this.onBelowLeast(e, this.minimalNum), !1) : !0
        },getNum: function() {
            return this.validateNum() ? (this.refreshNum(), this.num) : null
        },render: function() {
            return this.$el.html(this.template({data: {num: this.num,readonly: this.readonly}})), this.nMinus = this.$(".minus"), this.nPlus = this.$(".plus"), this.updateBtnStatus(this.num), this
        }});
    return s
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {getCdnImageUrl: function(t, e) {
        return t ? (e = t.match(/.+\!\d+x\d+.+/) ? "" : e && e.length > 0 ? e : "!100x100.jpg", t.match(/https?:\/\//i) ? t + e : window._global.url.imgqn + "/" + t + e) : window._global.url.cdn_static + "/image/wap/no_pic.png"
    }}), define("wap/components/util/kdt", function() {
}), window.zenjs = window.zenjs || {}, function(t) {
    t.Str = t.Str || {}, t.Str.multiEllipsis = function(t, e) {
        t && e && $(t).each(function(t, i) {
            for (var n = $(i), s = n.find(e), o = s.text(), l = -1, a = 0; s.height() > n.height() && 100 > a; ) {
                a++;
                var r = o.slice(0, l--);
                r = r.replace(/([\S\s])$/, "..."), s.text(r)
            }
        })
    }
}(window.zenjs), define("components/zenjs/util/str", function() {
}), define("wap/components/goods_list/views/goods_item", ["text!wap/components/goods_list/templates/goodsItem.html", "vendor/jquery_touchSwipe", "components/zenjs/backbone/quantity", "wap/components/util/kdt", "components/zenjs/util/str"], function(t, e, i, n, s) {
    var o = window.zenjs.Str;
    return Backbone.View.extend({tagName: "li",className: "block-item block-item-cart relative clearfix",initialize: function(e) {
            this.index = e.index, this.listenTo(this.model, "change", this.onChange), this.listenTo(this, "edit:start", this.onEditStart), this.listenTo(this, "edit:finish", this.onEditFinish), this.listenTo(this, "delete:flagged", this.onDeleteFlagged), this.listenTo(this, "remove:flagged", this.onRemoveFlagged), this.listenTo(this, "update:num", this.doUpdateNum), this.template = _.template(e.goodsItemTpl || t), this.notShowCheckBox = e.notShowCheckBox, this.notShowNum = e.notShowNum, this.disableCode = {11011: "商品已售罄",11012: "暂时不能购买",11013: "该商品不存在",11014: "该规格已售罄",11020: "该规格已下架"}, this.noSwip || this.$el.swipe({triggerOnTouchEnd: !1,swipeStatus: this.swipeStatus(),allowPageScroll: "vertical"})
        },events: {"click .check-container": "onCheckClick","click .delete-btn": "onDeleteClicked"},swipeStatus: function() {
            var t, e, i = 0, n = 0, s = !1, o = 80, l = !1, a = function(t) {
                e = e || -.38 * this.width(), e > t || (this.css("-webkit-transform", "translate3d(" + t + "px, 0, 0)"), this.css("transform", "translate3d(" + t + "px, 0, 0)"))
            }, r = function() {
                a.call(this, -80), this.addClass("ajust"), s = !0
            }, h = function() {
                a.call(this, 0), s = !1
            };
            return function(e, d, c, u, p) {
                if (("up" == c || "down" == c) && (l = !0, t && clearTimeout(t), t = setTimeout(function() {
                    l = !1
                }, 500)), !this.hasClass("editing") && !l)
                    if ("start" == d && (this.removeClass("ajust"), s && a.call(this, -1 * o), i = this.offset().left, n = i), "move" != d || "left" != c && "right" != c)
                        ("cancel" == d || "end" == d) && (s ? u > 20 && "right" == c ? h.call(this) : r.call(this) : u > 60 && "left" == c ? r.call(this) : h.call(this));
                    else if (s) {
                        n = u;
                        var m = "left" == c ? i - u : i + u;
                        m > 0 && (m = 0), a.call(this, m)
                    } else {
                        if (u > n && "right" == c)
                            return void a.call(this, 0);
                        n = u, a.call(this, -1 * (i + u))
                    }
            }
        },onDeleteFlagged: function() {
            this.nCheck.hasClass("delete") && this.model.destroy()
        },onRemoveFlagged: function(t) {
            var e = this.model;
            this.nCheck.hasClass("delete") && e.trigger("destroy", e, e.collection, t)
        },onDeleteClicked: function() {
            this.model.destroy()
        },onCheckClick: function(t) {
            if (this.model.editing)
                this.model.set("delete", !this.model.get("delete"));
            else {
                if (this.model.disabled)
                    return;
                if (!this.model.isCheckable())
                    return;
                this.model.set("checked", !this.model.get("checked"))
            }
        },onEditStart: function(t) {
            this.model.editing = !0, this.model.set({"delete": !1}, {silent: !0})
        },onEditFinish: function(t) {
            this.model.editing = !1
        },doUpdateNum: function() {
            this.quantityView && this.model.set("num", this.quantityView.getNum())
        },updateCheck: function(t, e) {
            t ? this.nCheck.addClass(e) : this.nCheck.removeClass(e)
        },onNumChange: function(t) {
            this.model.save({num: t}, {patch: !0})
        },render: function() {
            var t = this;
            this.$el.html(this.template(_.extend({data: this.model.toJSON()}, {getCdnImageUrl: window.Utils.getCdnImageUrl,getGoodsLink: function() {
                    var e = t.model.get("goods_info") || {};
                    return "/v2/showcase/goods?alias=" + e.alias
                },goodsDisabled: function() {
                    var e = t.model.get("error_code");
                    return e && t.disableCode[e] ? !0 : !1
                },isEditing: this.model.editing,notShowCheckBox: this.notShowCheckBox,notShowNum: this.notShowNum}))), this.nCheck = this.$(".check"), this.nErrorBox = this.$(".error-box"), this.model.get("error_code") && this.model.trigger("change", {name: "error"});
            var e = this.$(".js-ellipsis"), n = e.find("i");
            return setTimeout(function() {
                o.multiEllipsis(e, n)
            }), this.model.editing ? (this.$el.addClass("editing"), this.quantityView || (this.quantityView = new i({el: this.$(".num"),onNumChange: _(this.onNumChange).bind(this),limitNum: this.model.get("limitNum"),disabled: this.model.disabled,num: this.model.get("num")}).render()), this) : void 0
        },onChange: function() {
            var t = function() {
                this.model.disabled = !0, this.model.set({checked: !1,"delete": !1}), this.updateCheck(!1, "checked"), this.updateCheck(!1, "delete"), this.model.editing || (this.updateCheck(!0, "info"), this.stopListening(), this.listenTo(this, "edit:start", this.onEditStart))
            }, e = function() {
                var t = parseInt(this.model.get("limitNum")), e = parseInt(this.model.get("num"));
                !this.model.editing && e > t && this.updateCheck(!0, "info")
            }, i = {11021: function() {
                    var t = parseInt(this.model.get("lastest_stock"));
                    t > 0 && this.model.set({limitNum: t}), this.model.set("checked", !1), e.call(this)
                },11010: function() {
                    var t = this.model.get("sku_info") || {};
                    t.pay_price = parseInt(this.model.get("lastest_price")), !!t.pay_price && this.model.trigger("change", {name: "price",value: t.pay_price}), this.model.set("checked", !1)
                },11015: function() {
                    var t = this.model.get("error_msg"), i = /^该商品每人限购(.+)件.+$/.exec(t);
                    i = parseInt(i ? i[1] : -1), i > 0 && this.model.set({limitNum: i}), this.model.set("checked", !1), e.call(this)
                }}, n = {11021: function() {
                    return "仅剩" + this.model.get("lastest_stock") + "件"
                },11010: "价格已变动",11015: function() {
                    var t = this.model.get("limitNum"), e = t >= 0 ? "限购" + t + "件" : "";
                    return e
                }}, s = function(t) {
                var e = n[t];
                if (e) {
                    if (_.isString(e))
                        return e;
                    var i = e.call(this);
                    return this.model.set("limitNumMsg", i), i
                }
            }, o = function(t) {
                var e = this.disableCode[t] || s.call(this, t) || this.model.get("error_msg");
                this.$el.addClass("error"), this.disableCode[t] && this.$el.addClass("disabled"), this.nErrorBox.html(e)
            }, l = function(e) {
                return this.disableCode[e] ? t : i[e] ? i[e] : void 0
            }, a = function() {
                var t = this.model.get("error_code"), e = l.call(this, t);
                e && e.call(this), o.call(this, t)
            };
            return function(t) {
                if (t)
                    if (t.changed || !t.name) {
                        var e = t;
                        if ("num" in e.changed) {
                            var i = parseInt(this.model.get("num"));
                            this.model.editing || this.$(".num .num-txt").html(i)
                        } else
                            "checked" in e.changed ? this.updateCheck(this.model.get("checked"), "checked") : "delete" in e.changed ? this.updateCheck(this.model.get("delete"), "delete") : "error_code" in e.changed && a.call(this)
                    } else
                        switch (t.name) {
                            case "price":
                                this.$(".price span").html(t.value);
                                break;
                            case "error":
                                a.call(this)
                        }
            }
        }()})
}), define("wap/components/waterfall/pager", ["components/zenjs/class"], function(t) {
    var e = function() {
    };
    return t.extend({init: function(t) {
            this.$el || (this.$el = $(t.el || t.$el || "<div></div>"), this.el = this.$el[0]), "number" == typeof t.total && (this.total = t.total), this.offset = t.offset || 300, this.scrollDirection = "down", this.pageIndex = t.pageIndex || 0, this.idName = t.idName || "id", t.idValue && (this.idValue = t.idValue), this.getExtrPostData = t.getExtrPostData || e, this.checkSize = !0, "boolean" == typeof t.checkSize && (this.checkSize = t.checkSize), this.perPage = t.perPage || 10, this.jsonKeys = t.jsonKeys || {}, this.finishedHTML = t.finishedHTML, this.finishedText = t.finishedText, this.postData = t.postData || {}, this.onPagerFinished = t.onFinished || e, this.nLoading = t.loadingHTML ? $(t.loadingHTML).addClass("loading-more") : $('<div class="loading-more"><span></span></div>'), this.nList = this.$el.find(".js-list"), 0 === this.nList.length && (this.nList = $('<div class="js-list b-list"></div>'), this.$el.append(this.nList)), this.listEl = this.nList, this.onFetchError = t.onFetchError || e, this.onListEmpty = this.onListEmpty || t.onEmpty || this._onListEmpty, this.on("finished", this.onPagerFinished), this.scrollContainer = $(t.scrollContainer ? t.scrollContainer : "body"), this.scrollEventAccepter = $(t.scrollEventAccepter ? t.scrollEventAccepter : t.scrollContainer || window), this._onScroll = $.proxy(this.onScroll, this), this.scrollEventAccepter.on("scroll", this._onScroll)
        },onScroll: function() {
            parseInt($(window).height());
            return function() {
                if (!(this.sleeping || this.finished || this.fetching)) {
                    if (0 == this.total || this.total && this.total <= this.pageIndex * this.perPage)
                        return void this.doFinishLoading();
                    "down" == this.scrollDirection && this.nList.height() - this.scrollEventAccepter.height() - this.scrollContainer.scrollTop() < this.offset && this.fetchMore && this.fetchMore(), "up" == this.scrollDirection && this.scrollContainer.scrollTop() < this.offset && this.fetchMore && this.fetchMore()
                }
            }
        }(),fetchMore: function() {
            return this.sleeping || this.finished || this.fetching ? this : (this.showLoading(), this.fetching = !0, this._fetchMore && this._fetchMore.call(this), this)
        },onFetchMoreSuccess: function() {
            this.hideLoading(), this.fetching = !1, this._onFetchMoreSuccess.apply(this, arguments)
        },fetchRender: function() {
            return this._setupListeners && this._setupListeners(), this.fetchMore(), this
        },_onFetchMoreError: function() {
            this.fetching = !1, this.hideLoading(), this.onFetchError()
        },doFinishLoading: function(t) {
            this.finished = !0, this.fetching = !1, this.hideLoading(), this.$el.find(".list-finished").remove(), this.triggerMethod && this.triggerMethod("finished", this.collection, t)
        },doSleep: function() {
            this.sleeping = !0
        },doWake: function() {
            this.sleeping = !1, this.fetchMore()
        },showLoading: function() {
            this.hasFetching = !0, this.$el.append(this.nLoading)
        },hideLoading: function() {
            this.nLoading.remove()
        },getFinishHtml: function() {
            var t;
            return t = this.finishedHTML ? $(this.finishedHTML).addClass("list-finished") : '<div class="list-finished">' + (this.finishedText || "已经没有更多了") + "</div>"
        },resetWaterfall: function() {
            this.removeAll && this.removeAll(), this.nList.empty(), this.collection && this.collection.reset([], {silent: !0}), this.listEl.empty(), this.finished = !1, this.pageIndex = 0, this.idValue = void 0
        },_onListEmpty: function() {
            if (!this.fetching) {
                var t;
                this.emptyHTML ? t = $(this.emptyHTML).addClass("list-finished") : this.emptyText && (t = '<div class="list-finished">' + this.emptyText + "</div>"), this.$el.append(t)
            }
        },destroy: function() {
            this.doSleep(), this.scrollEventAccepter.unbind("scroll", this._onScroll)
        }})
}), define("wap/components/waterfall/waterfall", ["wap/components/waterfall/pager", "components/zenjs/list/list"], function(t, e) {
    delete t.prototype.constructor;
    var i = e.extend(t.prototype), n = i.extend({initialize: function(t) {
            e.prototype.initialize.apply(this, [t]), i.prototype.init.apply(this, [t]), this.extraData = {}, this.on("finished", this._doFinishLoading)
        },_fetchMore: function() {
            var t = {};
            this.idValue && (t[this.idName] = this.idValue), t[this.jsonKeys.perPage || "perpage"] = this.perPage, t[this.jsonKeys.pageIndex || "page"] = this.pageIndex + 1;
            var e = this.getExtrPostData ? this.getExtrPostData() : {};
            this.collection.fetch({data: $.extend(t, this.postData, e, this.extraData),success: $.proxy(this.onFetchMoreSuccess, this),error: $.proxy(this.onFetchError, this),update: !0,remove: !1})
        },setExtraData: function(t) {
            $.extend(this.extraData, t)
        },_onFetchMoreSuccess: function(t, e) {
            this.pageIndex++, this.triggerMethod("after:list:load", {collection: t,response: e});
            var i = this.collection.parse(e);
            if (0 == i.length || this.checkSize && i.length < this.perPage)
                return void this.doFinishLoading();
            var n = _.last(this.collection.models);
            n && (this.idValue = n.get(this.idName)), this.onScroll()
        },_onAfterListLoad: function() {
            var t = _.last(this.collection.models);
            t && (this.idValue = t.get(this.idName))
        },_doFinishLoading: function() {
            if (this.collection.length > 0) {
                if (this.hasFetching && this.pageIndex > 1) {
                    var t = this.getFinishHtml();
                    this.$el.append(t)
                }
            } else
                this.triggerMethod("list:empty")
        }});
    return n
}), define("wap/components/goods_list/views/goods_list", ["components/zenjs/list/list", "wap/components/waterfall/waterfall"], function(t, e) {
    var i = {};
    return i.list = t, i.waterfall = e, i
}), define("text!wap/components/goods_list/templates/empty.html", [], function() {
    return '<div class="empty-list-content"><a href="<%= homepage %>" class="home-page tag tag-big tag-orange">去逛逛</a></div>\n'
}), define("text!wap/components/goods_list/templates/emptyListTpl.html", [], function() {
    return '\n<div class="empty-list <%= className %>" style="<%= style %>">\n    <!-- 文本 -->\n    <div class="empty-list-header">\n        <h4>购物车快饿瘪了 T.T</h4>\n        <% if (typeof(link) != "undefined") { %>\n            <a href="<%= link %>"><%= text %></a>\n        <% } else if(typeof(text) != "undefined") { %>\n            <span><%= text %></span>\n        <% } %>\n    </div>\n    <!-- 自定义html，和上面的可以并存 -->\n    <% if (typeof(html) != "undefined") { %>\n        <%= html %>\n    <% } %>\n</div>\n'
}), define("text!wap/components/goods_list/templates/goodsList.html", [], function() {
    return '<div class="header js-list-header">\n	<a class="font-size-12" href="<%= data.getShopLink(data.provider) %>">店铺：<%= data.teamName %></a>\n	<a href="javascript:;" class="j-edit-list pull-right c-blue font-size-12 edit-list <% if(data.index>0) { %>hide<% } %>">编辑</a>\n	\n</div>\n<hr class="js-list-header-border margin-0 left-10">\n<ul class="list block block-list block-list-cart block-border-none"></ul>\n<% if(data.provider_name){ %>\n<hr class="margin-0 left-10">\n<div class="provider c-gray-dark font-size-12">\n	由品牌商 <span class="c-orange"><%= data.provider_name %></span> 直接配送\n</div>\n<% } %>\n'
}), define("wap/components/goods_list/main", ["components/zenjs/list/list", "wap/components/goods_list/models/collection", "wap/components/goods_list/views/goods_item", "wap/components/goods_list/views/goods_list", "text!wap/components/goods_list/templates/empty.html", "text!wap/components/goods_list/templates/emptyListTpl.html", "text!wap/components/goods_list/templates/goodsList.html", "components/zenjs/util/args"], function(t, e, i, n, s, o, l, a) {
    return Backbone.View.extend({events: {"click .j-edit-list": "onEditCartClick","click .show-more": "showAll"},className: "block block-order",initialize: function(t) {
            t.initHeader && this.$el.html(_.template(l)({data: {teamName: t.teamName,index: t.index,provider_name: (t.provider || {}).name,provider: t.provider,getShopLink: function(t) {
                        return "http://wap.koudaitong.com/v2/home?kdt_id=" + _global.kdt_id
                    }}})), this.setEditing(!1), this.ajaxing = !1, this.nList = this.$(".list"), this.nEditBtn = this.$(".j-edit-list"), this.emptyListHtml = t.emptyListHtml || this.getEmptyListHtml(), this.onEditingChange = t.onEditingChange, this.onNoGoods = t.onNoGoods, this.canShowEmtpyTips = t.canShowEmtpyTips, this.listViewOpt = t.listViewOptions || {}, this.goodListOpt = _.extend({}, this.listViewOpt, {el: this.nList,perPage: 10,offset: 200,collection: t.collection || new e([], t.collectionOptions),displaySize: t.displaySize,itemView: t.GoodsItemView || i,itemOptions: t.goodsItemOptions,onAfterListLoad: _(this.onAfterListLoad).bind(this),onAfterListChange: _(this.onAfterListChange).bind(this),onListEmpty: _(this.onListEmpty).bind(this)}), this.goodsList = this.goodListOpt.collection, this.listView = new n[this.listViewOpt.listType || "list"](this.goodListOpt), t.collection ? (this.listView.render(), 0 == this.goodsList.length && this.nEditBtn.hide()) : this.listView.fetchRender(), this.listView.on("finished", _(this._onFinished).bind(this)), this.deleteBatchUrl = t.deleteBatchUrl || "", this.deleteBatchIdName = t.deleteBatchIdName || "id"
        },onAfterListChange: function(t) {
            this.trigger("after:list:change", t), this.goodsList.length > 0 && this.nEditBtn.removeClass("disable"), this.listViewOpt.onAfterListChange && this.listViewOpt.onAfterListChange(t)
        },onAfterListLoad: function(t) {
            this.goodsList.length > 0 ? (this.nEditBtn.removeClass("disable"), this.goodListOpt.displaySize >= 0 && this.goodsList.length > this.goodListOpt.displaySize && this.goodListOpt.el.append($('<p class="show-more c-gray-dark">查看剩余' + (this.goodsList.length - this.goodListOpt.displaySize) + "件商品</p>"))) : this.nEditBtn.hide(), this.listViewOpt.onAfterListLoad && this.listViewOpt.onAfterListLoad(t)
        },onListEmpty: function(t) {
            return this.isEditing ? void this.doFinishEditing() : (this.trigger("before:list:empty", {view: this}), this.nEditBtn.addClass("disable"), this.$(".js-list-header").hide(), this.$(".js-list-header-border").hide(), this.$(".header-border").hide(), void ([371189, 391658, 371761].indexOf(window._global.kdt_id) > -1 || (!this.canShowEmtpyTips || this.canShowEmtpyTips() ? this.goodListOpt.el.html(this.emptyListHtml) : this.remove(), this.onNoGoods && this.onNoGoods(), this.trigger("after:list:empty", {view: this}))))
        },getEmptyListHtml: function() {
            var t = _.template(o), e = _.template(s), i = "";
            return i = window._global.kdt_id > 0 ? window._global.url.wap + "/showcase/homepage?kdt_id=" + window._global.kdt_id : window._global.url.wap + "/showcase/homepage?kdt_id=371189", t({text: "快给我挑点宝贝",html: e({homepage: i}),style: "margin-top:30px;",className: ""})
        },doFinishEditing: function(t) {
            this.setEditing(!1), this.listView.dispatchEventToAllViews("edit:finish", {name: "edit:finish"}), this.showAll(), this.nEditBtn.text("编辑"), this.nEditBtn.removeClass("editing"), t && this.trigger("editing:change", {editing: !1,view: this})
        },onEditCartClick: function(t) {
            this.doClickEditCart(!0)
        },doClickEditCart: function(t) {
            (this.isEditing || 0 !== this.goodsList.length) && (this.editing ? this.doFinishEditing(t) : (this.setEditing(!0, t), this.listView.dispatchEventToAllViews("edit:start", {name: "edit:start"}), this.showAll(), this.nEditBtn.text("完成"), this.nEditBtn.addClass("editing")))
        },showAll: function() {
            this.listView.render({displaySize: -1}), this.$(".show-more").remove()
        },setEditing: function(t, e) {
            this.editing != t && (this.editing = t, this.onEditingChange && this.onEditingChange(t), this.listView && (this.listView.collection.isEditing = t), e && this.trigger("editing:change", {editing: t,view: this}))
        },onDeleteClicked: function(t) {
            var e = this.listView.collection.where({"delete": !0});
            if (0 != e.length) {
                if (1 == e.length)
                    return this.beforeRemoveItems({deleteNum: 1}), void this.listView.dispatchEventToAllViews("delete:flagged", t);
                var i = _.pluck(_.pluck(e, "attributes"), this.deleteBatchIdName);
                $.post(this.deleteBatchUrl, {ids: i}).done(_(function(e) {
                    0 == e.code ? (motify.log("成功删除 " + i.length + " 个"), this.beforeRemoveItems({deleteNum: i.length}), this.listView.dispatchEventToAllViews("remove:flagged", t)) : motify.log(e.msg)
                }).bind(this)).fail(function() {
                    motify.log("oops, 出错了")
                })
            }
        },beforeRemoveItems: function(t) {
            "waterfall" !== this.listViewOpt.listType || this.listView.finished || (this.listView.total && (this.listView.total -= t.deleteNum), this.listView.fetchMore())
        },_onFinished: function() {
            this.trigger("finished")
        }})
}), define("wap/components/goods_lists/main", ["wap/components/goods_list/main", "wap/components/goods_list/models/collection"], function(t, e) {
    return Backbone.View.extend({initialize: function(t) {
            this.items = [], this.url = t.url, this.teamName = t.teamName, this.deleteBatchUrl = t.deleteBatchUrl, this.deleteBatchIdName = t.deleteBatchIdName, this.bottomView = new t.BottomView(_.extend({}, t.bottomViewOptions, {onDeleteClicked: _(this.onDeleteClicked).bind(this),onCancelDeleteClicked: _(this.onCancelDeleteClicked).bind(this)}))
        },render: function() {
            var i = this, n = this.bottomView.goodsList;
            $.ajax({url: this.url,type: "GET",dataType: "json",timeout: 1e4,success: function(s) {
                    i.$el.html("");
                    var o = s.data;
                    o && 0 != o.length || o.push({goods_list: []}), o.forEach(_(function(i, s) {
                        var o = new e(i.goods_list, {modelUrlRoot: this.url}), l = new t({collection: o,teamName: this.teamName,deleteBatchUrl: this.deleteBatchUrl,deleteBatchIdName: this.deleteBatchIdName,index: s,provider: i.provider,initHeader: !0,canShowEmtpyTips: _(this.canShowEmtpyTips).bind(this)});
                        this.$el.append(l.el), l.on("after:list:change", _(this.updateBottom).bind(this)), l.on("after:list:empty", _(this.onListEmpty).bind(this)), l.on("editing:change", _(this.setBottomEditing).bind(this)), this.items.push(l), n.add(o.models)
                    }).bind(i)), i.updateBottom()
                },error: function(t, e, i) {
                    motify.log("数据加载失败")
                }})
        },canShowEmtpyTips: function() {
            return 0 == this.bottomView.goodsList.length
        },onListEmpty: function(t) {
            this.$(".j-edit-list").first().removeClass("hide"), this.updateBottom()
        },updateBottom: function(t) {
            var t = t || {};
            "remove" == t.action && this.bottomView.goodsList.remove(t.model), this.bottomView.update()
        },setBottomEditing: function(t) {
            this.items.forEach(function(e) {
                e != t.view && e.doClickEditCart()
            }), this.bottomView.setEditing(t.editing), this.bottomView.update()
        },onDeleteClicked: function() {
            this.items.forEach(function(t) {
                t.onDeleteClicked()
            })
        },onCancelDeleteClicked: function() {
            this.items.forEach(function(t) {
                t.onEditCartClick()
            })
        }})
}), define("wap/components/goods_list/views/bottom", ["components/zenjs/util/args"], function(t) {
    return Backbone.View.extend({events: {"click .js-go-pay": "onGoPayClick","click .select-all": "onSelectAllClick","click .j-delete-goods": "_onDeleteGoodsClick"},initialize: function(t) {
            this.onDeleteClicked = t.onDeleteClicked || function() {
            }, this.doBeforeGoPay = t.doBeforeGoPay || function() {
            }, this.nTotalPrice = this.$(".js-total-price"), this.nGoPay = this.$(".js-go-pay"), this.goodsList = t.goodsList, this.goPayUrl = t.goPayUrl, this.goPayText = t.goPayText || this.nGoPay.text() || "结算", this.nTotalPriceContainer = this.$(".total-price"), this.nSelectAll = this.$(".select-all span"), this.nSelectAllContainer = this.$(".select-all"), this.nDeleteGoods = this.$(".j-delete-goods"), this.nBottom = this.$(".bottom"), this.nCancelDeleteBtn = this.$(".js-cancel-delete"), this.$(".js-cancel-delete").on("click", t.onCancelDeleteClicked || function() {
            })
        },onGoPayClick: function() {
            return function() {
                if (!this.ajaxing) {
                    this.doBeforeGoPay && this.doBeforeGoPay();
                    var t = this.goodsList.getGoodsListJson();
                    if (t.errorMsg && t.errorMsg.length > 0)
                        return void motify.log(t.errorMsg);
                    if (!t.json)
                        return void motify.log("请先勾选商品");
                    this.doSubmit(t.json)
                }
            }
        }(),doSubmit: function(t) {
            var e = this, i = window.zenjs.Args.get("from");
            i && i.length > 0 && (this.goPayUrl = window.zenjs.Args.add(this.goPayUrl, {from: i})), $.ajax({url: this.goPayUrl,type: "POST",dataType: "json",timeout: 1e4,data: t,beforeSend: function() {
                    e.ajaxing = !0, e.nGoPay.html("提交中..")
                },success: function(t) {
                    var i = t.code;
                    if (0 === i && t.data)
                        return void (location.href = t.data.trade_confirm_url);
                    if (0 !== i) {
                        if (11100 == i && t.data && _.isArray(t.data))
                            _.each(t.data, function(t) {
                                var i = e.goodsList.get(parseInt(t.id));
                                i && i.set({error_msg: t.error_msg,error_code: t.error_code,lastest_price: t.lastest_price,lastest_stock: t.lastest_stock}, {silent: !1,wait: !1})
                            });
                        else {
                            if (12500 == i)
                                return void doWait.call(e, +t.data.wait);
                            if (10500 == i)
                                return e.goodsList.reset(), void (t.msg && motify.log(t.msg));
                            t.msg && motify.log(t.msg)
                        }
                        e.nGoPay.text(e.goPayText)
                    }
                    e.update()
                },error: function(t, i, n) {
                    e.nGoPay.text(e.goPayText)
                },complete: function(t, i) {
                    e.ajaxing = !1
                }})
        },onSelectAllClick: function(t) {
            var e = this.getCheckBoxClassName(), i = this.nSelectAll.hasClass(e);
            this.goodsList.updateAllCheck(!i, e), this.update()
        },_onDeleteGoodsClick: function() {
            this.onDeleteClicked(), this.update()
        },updateSelectAll: function(t, e) {
            this.nSelectAll.removeClass("delete").removeClass("checked"), this.nSelectAllContainer.removeClass("delete").removeClass("checked"), 0 !== this.goodsList.length && (t ? (this.nSelectAllContainer.addClass(e), this.nSelectAll.addClass(e)) : (this.nSelectAllContainer.removeClass(e), this.nSelectAll.removeClass(e)))
        },updateTotalPrice: function(t) {
            this.editing ? this.nTotalPriceContainer.hide() : (this.nTotalPrice.html(t / 100), this.nTotalPriceContainer.show())
        },updatePayDeleteBtn: function(t) {
            this.editing ? (this.updateButtonEnable(this.nDeleteGoods, t.flagged > 0), t.flagged > 0 ? this.nCancelDeleteBtn.removeClass("hide") : this.nCancelDeleteBtn.addClass("hide"), this.nGoPay.addClass("hide"), this.nDeleteGoods.removeClass("hide")) : (this.updateButtonEnable(this.nGoPay, t.flagged > 0), this.nDeleteGoods.addClass("hide"), this.nCancelDeleteBtn.addClass("hide"), this.nGoPay.html("结算" + (t.totalNum > 0 ? "(" + t.totalNum + ")" : "")), this.nGoPay.removeClass("hide"))
        },update: function() {
            if (0 === this.goodsList.length)
                return void this.$el.hide();
            var t = this.getCheckBoxClassName(), e = this.goodsList.getBrief(t);
            e.flagged <= 0 ? this.nBottom.addClass("disable") : this.nBottom.removeClass("disable"), this.editing ? this.nBottom.addClass("editing") : this.nBottom.removeClass("editing"), this.updateSelectAll(e.flagged == e.total, t), this.updateTotalPrice(e.totalPrice), this.updatePayDeleteBtn(e)
        },getCheckBoxClassName: function() {
            return this.editing ? "delete" : "checked"
        },updateButtonEnable: function(t, e) {
            e ? t.removeAttr("disabled") : t.attr("disabled", "true")
        },setEditing: function(t) {
            this.editing = t
        }})
}), window.Zepto && function(t) {
    t.fn.serializeArray = function() {
        var e, i, n = [], s = function(t) {
            return t.forEach ? t.forEach(s) : void n.push({name: e,value: t})
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
        if (0 in arguments)
            this.bind("submit", e);
        else if (this.length) {
            var i = t.Event("submit");
            this.eq(0).trigger(i), i.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), define("vendor/zepto/form", function() {
}), define("text!wap/components/login_popout/templates/init.html", [], function() {
    return '<form class="form-dialog js-login-form block-wrapper-form" method="GET" action="">\n    <div class="header">\n        <h2>\n            <span class="form-title c-green font-size-16">请填写您的手机号码</span>\n        </h2>\n    </div>\n    <fieldset class="font-size-14">\n        <div class="block-form-item">\n            <label for="phone" class="item-label">手机号</label>\n            <input id="phone" name="phone" class="item-input" type="tel" maxlength="11" autocomplete="off" placeholder="" value="<%= phone %>">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="js-help-info font-size-12 error"></div>\n    </fieldset>\n    <div class="action-container">\n        <input type="submit" class="js-confirm btn btn-green btn-block font-size-14" value="确认手机号码" />\n    </div>\n</form>'
}), define("text!wap/components/login_popout/templates/login.html", [], function() {
    return '<form class="form-dialog js-login-form block-wrapper-form" method="GET" action="">\n    <div class="header">\n        <h2>\n            <span class="form-title c-green font-size-16">该号码注册过，请直接登录</span>\n        </h2>\n    </div>\n    <fieldset class="font-size-14">\n        <div class="block-form-item">\n            <label for="phone" class="item-label">手机号</label>\n            <input id="phone" name="phone" class="item-input" type="tel" maxlength="11" autocomplete="off" placeholder="请输入你的手机号" disabled="disabled" value="<%= phone %>">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="block-form-item">\n            <label for="password" class="item-label">密码</label>\n            <input id="passsword" name="password" class="item-input"  type="password" autocomplete="off" placeholder="请输入登录密码">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="js-help-info font-size-12 error"></div>\n    </fieldset>\n    <div class="action-container">\n        <button type="button" class="js-confirm btn btn-green btn-block font-size-14">确认</button>\n    </div>\n    <div class="bottom-link font-size-12">\n        <span class="c-orange">如果您忘了密码，请</span><a href="javascript:;" class="js-change-pwd c-blue">点此找回密码</a>\n        <a href="javascript:;" class="js-change-phone c-blue pull-right">更换手机号</a>\n    </div>\n</form>\n'
}), define("text!wap/components/login_popout/templates/register.html", [], function() {
    return '<form class="form-dialog js-login-form block-wrapper-form" method="GET" action="">\n    <div class="header">\n        <h2>\n            <span class="form-title c-green font-size-16">注册有赞帐号</span>\n        </h2>\n    </div>\n    <fieldset class="font-size-14">\n        <div class="block-form-item">\n            <label for="phone" class="item-label">手机号</label>\n            <input id="phone" name="phone" class="item-input" type="tel" maxlength="11" autocomplete="off" placeholder="请输入你的手机号" disabled="disabled" value="<%= phone %>">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="block-form-item js-image-verify hide">\n            <label for="verifycode" class="item-label">身份校验</label>\n            <input id="verifycode" name="verifycode" class="js-verify-code item-input"  type="tel" style="width:178px" maxlength="6" autocomplete="off" placeholder="输入右侧数字">\n            <div class="txt-cover txt-cover-half js-txt-cover"></div>\n            <img class="js-verify-image verify-image" src="">\n        </div>\n        <div class="block-form-item">\n            <label for="code" class="item-label">验证码</label>\n            <input id="code" name="code" class="item-input"  type="text" style="width:178px" maxlength="6" autocomplete="off" placeholder="输入短信验证码">\n            <div class="txt-cover txt-cover-half js-txt-cover"></div>\n            <button type="button" class="js-auth-code tag btn-auth-code tag-green font-size-12" data-text="获取验证码">\n                获取验证码\n            </button>\n        </div>\n        <div class="block-form-item">\n            <label for="password" class="item-label">密码</label>\n            <input id="passsword" name="password" class="item-input"  type="password" autocomplete="off" placeholder="设置登录密码，下次登录使用">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="js-help-info font-size-12 error"></div>\n    </fieldset>\n    <div class="action-container">\n        <button type="button" class="js-confirm btn btn-green btn-block font-size-14">确认</button>\n    </div>\n    <div class="bottom-link font-size-12">\n        <span class="c-orange">如果您忘了密码，请</span><a href="javascript:;" class="js-change-pwd c-blue">点此找回密码</a>\n        <a href="javascript:;" class="js-change-phone c-blue pull-right">更换手机号</a>\n    </div>\n</form>\n'
}), define("text!wap/components/login_popout/templates/change_pwd.html", [], function() {
    return '<form class="form-dialog js-login-form block-wrapper-form" method="GET" action="">\n    <div class="header">\n        <h2>\n            <span class="form-title c-green font-size-16"><%if(isSetting){%>设定<%}else{%>找回<%}%>帐号密码</span>\n        </h2>\n    </div>\n    <fieldset class="font-size-14">\n        <div class="block-form-item">\n            <label for="phone" class="item-label">手机号</label>\n            <input id="phone" name="phone" class="item-input" type="tel" maxlength="11" autocomplete="off" placeholder="请输入你的手机号" disabled="disabled" value="<%= phone %>">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="block-form-item js-image-verify hide">\n            <label for="verifycode" class="item-label">身份校验</label>\n            <input id="verifycode" name="verifycode" class="js-verify-code item-input"  type="tel" style="width:178px" maxlength="6" autocomplete="off" placeholder="输入右侧数字">\n            <div class="txt-cover txt-cover-half js-txt-cover"></div>\n            <img class="js-verify-image verify-image" src="">\n        </div>\n        <div class="block-form-item">\n            <label for="code" class="item-label">验证码</label>\n            <input id="code" name="code" class="item-input"  type="text" style="width:178px" maxlength="6" autocomplete="off" placeholder="输入短信验证码">\n            <div class="txt-cover txt-cover-half js-txt-cover"></div>\n            <button type="button" class="js-auth-code tag btn-auth-code font-size-12 tag-green" data-text="获取验证码">\n                获取验证码\n            </button>\n        </div>\n        <div class="block-form-item">\n            <label for="password" class="item-label">密码</label>\n            <input id="passsword" name="password" class="item-input"  type="password" autocomplete="off" placeholder="设置一个新的登录密码">\n            <div class="txt-cover js-txt-cover"></div>\n        </div>\n        <div class="js-help-info font-size-12 error"></div>\n    </fieldset>\n    <div class="action-container">\n        <button type="button" class="js-confirm btn btn-green btn-block font-size-14">确定</button>\n    </div>\n    <div class="binary-box">\n        <div><a href="javascript:;" class="js-login c-blue">已有帐号登录</a></div>\n        <div><a href="javascript:;" class="js-register c-blue">注册新帐号</a></div>\n    </div>\n</form>\n'
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {validMobile: function(t) {
        return t = "" + t, /^((\+86)|(86))?(1)\d{10}$/.test(t)
    },validPhone: function(t) {
        return t = "" + t, /^0[0-9\-]{10,13}$/.test(t)
    },validNumber: function(t) {
        return /^\d+$/.test(t)
    },validEmail: function(t) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
    },validPostalCode: function(t) {
        return t = "" + t, /^\d{6}$/.test(t)
    }}), define("wap/components/util/valid", function() {
}), window.Utils = window.Utils || {}, define("wap/components/util/form", ["vendor/zepto/form"], function(t) {
    window.Utils.getFormData = function(t) {
        var e = t.serializeArray(), i = {};
        return $.map(e, function(t) {
            i[t.name] = t.value
        }), i
    }
}), define("wap/components/sms_fetch/main", ["components/zenjs/util/args"], function(t) {
    function e() {
        this.loadingLock = !1, this.isUsed = void 0
    }
    function i(t) {
        t = t || {}, this.$el = $(t.el || t.$el || "<div></div>"), this.el = this.$el[0], this.$ = function(t) {
            return this.$el.find(t)
        }, this.initialize && this.initialize(t)
    }
    var n = function() {
    };
    e.prototype = {fetch: function() {
            if (this.isUsed !== !1) {
                var t = this;
                this.loadingLock = !0, $.ajax({url: window._global.url.www + "/common/token/token.jsonp",type: "get",dataType: "jsonp"}).done(function(e) {
                    0 == e.code ? (t.token = e.data, t.loadingLock = !1, t.isUsed = !1) : motify.log(e.msg)
                }).fail(function() {
                    motify.log("token 获取失败")
                })
            }
        },get: function() {
            return this.isUsed = !0, this.token
        }};
    var s = new e;
    return $.extend(i.prototype, {initialize: function(t) {
            this.duration = t.time || 60, this.step = t.step || 1100, this.codeVerifyClass = t.codeVerifyClass || "js-verify-code", this.verifyType = "smsFetch", this.smsFetchUrl = _global.url.www + "/common/sms/captcha.jsonp", this.imgUrl = _global.url.www + "/common/sms/imgcaptcha", this.imgVerifyUrl = _global.url.www + "/common/sms/imgcaptcha.jsonp", this.biz = t.biz || "kdt_account_captcha", this.onTimeChange = t.onTimeChange || n, this.onTimeEnd = t.onTimeEnd || n, this.onTimerStart = t.onTimerStart || n, this.onTimerClose = t.onTimerClose || n, this.onVerifyPictureShow = t.onVerifyPictureShow || n, this.onGetCodeError = t.onGetCodeError || n, this.onVerifyPictureSuccess = t.onVerifyPictureSuccess || n, this.onVerifyPictureError = t.onVerifyPictureError || n, s.fetch()
        },setMobile: function(t) {
            t && (this.mobile = t)
        },getImageCode: function() {
            return $.trim(this.$("." + this.codeVerifyClass).val())
        },getSms: function(t) {
            var e = this;
            if (s.loadingLock)
                return void motify.log("数据加载中，稍后再试");
            if (t = t || {}, t.mobile && (this.mobile = t.mobile), !this.mobile)
                return !1;
            var i = {smsFetch: e.onSmsFetchHandler,image: e.onImageHandler};
            return e.startTimer.call(e), (i[e.verifyType] || n).call(e), this
        },startTimer: function() {
            this.onTimerStart(), this.btnCountdown(this.duration)
        },stopTimer: function() {
            clearTimeout(this.timer), this.onTimerClose()
        },btnCountdown: function(t) {
            var e = this;
            this.onTimeChange({second: t}), --t >= 0 ? this.timer = setTimeout(function() {
                e.btnCountdown(t)
            }, this.step) : (this.onTimeEnd(), this.timer = "")
        },onVerifyImageShow: function(t) {
            this.$(".js-image-verify").removeClass("hide"), this.$(".js-verify-image").attr("src", t)
        },onVerifyImageHide: function() {
            this.$(".js-image-verify").addClass("hide")
        },onSmsFetchHandler: function() {
            var t = 1;
            return function() {
                var e = this;
                $.ajax({url: this.smsFetchUrl,dataType: "jsonp",data: {verifyTimes: t,mobile: this.mobile,biz: e.biz,token: s.get()},success: function(i) {
                        return 0 == i.code ? void t++ : (e.stopTimer.call(e), e.onGetCodeError.call(e), void (10111 === i.code ? (e.verifyType = "image", e.onVerifyImageShow(e.imgUrl), e.onVerifyPictureShow()) : (t++, motify.log(i.msg))))
                    },error: function(i, n, s) {
                        t++, e.stopTimer.call(e), e.onGetCodeError.call(e), motify.log("获取验证码失败，请稍后再试")
                    },complete: function(t, e) {
                    }}).always(function() {
                    s.fetch()
                })
            }
        }(),onImageHandler: function() {
            var t = this, e = this.mobile;
            $.ajax({url: this.imgVerifyUrl,dataType: "jsonp",data: {mobile: e,captcha_code: this.getImageCode()},success: function(i) {
                    return 0 === i.code ? (t.verifyType = "smsFetch", t.mobile = e, t.onVerifyImageHide(), t.onVerifyPictureSuccess(), void t.onSmsFetchHandler()) : (t.stopTimer.call(t), t.onVerifyPictureError.call(t), void (10100 === i.code ? (motify.log(i.msg), t.$el.find(".js-verify-image").attr("src", t.imgUrl)) : motify.log(i.msg)))
                },error: function(e, i, n) {
                    t.stopTimer.call(t), t.onVerifyPictureError.call(t), motify.log("图形验证失败，重试一下吧~"), t.$el.find(".js-verify-image").attr("src", t.imgUrl)
                },complete: function(t, e) {
                }})
        }}), i
}), define("wap/components/login_popout/main", ["text!wap/components/login_popout/templates/init.html", "text!wap/components/login_popout/templates/login.html", "text!wap/components/login_popout/templates/register.html", "text!wap/components/login_popout/templates/change_pwd.html", "wap/components/util/valid", "wap/components/util/form", "wap/components/sms_fetch/main"], function(t, e, i, n, s, o, l) {
    var a = window.zenjs.UA, r = Backbone.View.extend({events: {"click .js-confirm": "onConfirmClicked","click .js-change-phone": "onChangePhoneClicked","click .js-change-pwd": "onChangePwdClicked","click .js-login": "onLoginClicked","click .js-register": "onRegisterClicked","click .js-auth-code": "onAuthcodeClicked","click .js-txt-cover": "onCoverClick","submit .js-login-form": "onConfirmClicked","blur input": "onInputBlur"},initialize: function(s) {
            var o = this;
            s = s || {}, this.tpl_map = {init: _.template(s.initTpl || t),login: _.template(s.loginTpl || e),register: _.template(s.registerTpl || i),changePwd: _.template(s.changePwdTpl || n)}, this.valid_map = {checkPhone: _(this.checkPhone).bind(this),checkPwd: _(this.checkPwd).bind(this),checkCode: _(this.checkCode).bind(this)}, this.renderOpt = s.renderOpt || {type: "init",phone: ""}, this.afterLogin = s.afterLogin, this.urlMap = {login: s.loginUrl || "/v2/buyer/auth/authlogin.json",register: s.registerUrl || "/v2/buyer/auth/authRegister.json",changePwd: s.changePwdUrl || "/v2/buyer/auth/changePassword.json"}, this.source = s.source || 2, this.ajaxType = s.ajaxType || "POST", this.sms = new l({el: this.$el,onTimeChange: function(t) {
                    var e = t.second;
                    $(o.nAuthCode).text("等待 " + e + "秒")
                },onTimeEnd: function() {
                    o.nAuthCode.text("再次获取"), o.nAuthCode.prop("disabled", !1), o.nAuthCode.removeClass("disabled"), o.nCodeInput.attr("placeholder", "没有收到验证码？")
                },onTimerStart: function() {
                    o.nAuthCode.prop("disabled", !0), o.nAuthCode.addClass("disabled")
                },onVerifyPictureError: function() {
                    o.nAuthCode.removeAttr("disabled"), o.nAuthCode.removeClass("disabled"), o.nAuthCode.text("再次获取")
                },onGetCodeError: function() {
                    o.nAuthCode.removeAttr("disabled"), o.nAuthCode.removeClass("disabled"), o.nAuthCode.text("再次获取")
                },onVerifyPictureShow: function() {
                    o.nHelpInfo.html("操作过于频繁，请先输入图像验证码再获取")
                },onVerifyPictureSuccess: function() {
                    o.nHelpInfo.html("")
                }})
        },render: function() {
            return this.$el.html(this.tpl_map[this.renderOpt.type](this.renderOpt)), this.nForm = this.$(".js-login-form"), this.nHelpInfo = this.$(".js-help-info"), this.nPhone = this.$('input[name="phone"]'), this.nPwd = this.$('input[name="password"]'), this.nCodeInput = this.$('input[name="authcode"]'), this.nAuthCode = this.$(".js-auth-code"), this
        },show: function(t, e) {
            "changePwd" == t ? this.sms.biz = "reset_account_passwd" : this.sms.biz = "kdt_account_captcha", _.extend(this.renderOpt, {type: t}, e || {isSetting: !1}), this.render(this.renderOpt), this.$el.show(this.animationTime)
        },onConfirmClicked: function(t) {
            t.preventDefault();
            var e = this, i = $(t.target), n = Utils.getFormData(e.nForm);
            if (n = _.extend(e.renderOpt, n), !e.validate(n))
                return !1;
            n.source = this.source;
            var s = i.html();
            if ("init" === e.renderOpt.type)
                e.renderOpt.phone = n.phone, $.ajax({url: "/v2/buyer/auth/authConfirm.json",type: "POST",dataType: "json",timeout: 15e3,data: n,beforeSend: function() {
                        i.html("确认中..."), i.prop("disabled", !0)
                    },success: function(t) {
                        switch (+t.code) {
                            case 0:
                                e.show("login");
                                break;
                            case 200:
                                e.show("register");
                                break;
                            case 300:
                                e.show("changePwd", {isSetting: !0});
                            default:
                                e.nHelpInfo.html(t.msg)
                        }
                    },error: function() {
                        e.nHelpInfo.html("出错啦，请重试")
                    },complete: function() {
                        i.html(s), i.prop("disabled", !1)
                    }});
            else {
                var o = e.renderOpt.type;
                $.ajax({url: this.urlMap[o],type: this.ajaxType,dataType: "json",timeout: 15e3,data: n,beforeSend: function() {
                        i.html("确认中..."), i.prop("disabled", !0)
                    },success: function(t) {
                        0 === t.code ? e.afterLogin(t, {type: o}) : e.nHelpInfo.html(t.msg)
                    },error: function() {
                        e.nHelpInfo.html("出错啦，请重试")
                    },complete: function() {
                        i.html(s), i.prop("disabled", !1)
                    }})
            }
        },onAuthcodeClicked: function(t) {
            t.preventDefault();
            var e = this, i = Utils.getFormData(e.nForm);
            i = _.extend(e.renderOpt, i);
            var n = i.phone;
            this.sms.setMobile(n), this.sms.getSms()
        },onChangePhoneClicked: function(t) {
            t.preventDefault(), this.show("init")
        },onChangePwdClicked: function(t) {
            t.preventDefault(), this.sms.stopTimer(), this.show("changePwd")
        },onLoginClicked: function(t) {
            t.preventDefault(), this.show("init")
        },onRegisterClicked: function(t) {
            t.preventDefault(), this.show("init")
        },validate: function() {
            var t = {init: ["checkPhone"],login: ["checkPwd"],register: ["checkCode", "checkPwd"],changePwd: ["checkCode", "checkPwd"]};
            return function(e) {
                return _.every(t[e.type], _(function(t) {
                    return this.valid_map[t](e)
                }).bind(this))
            }
        }(),checkPhone: function(t) {
            return "" === t.phone ? (this.nPhone.focus(), this.nHelpInfo.html("请填写您的手机号码"), !1) : window.Utils.validMobile(t.phone) ? !0 : (this.nPhone.focus(), this.nHelpInfo.html("请填写11位手机号码"), !1)
        },checkPwd: function(t) {
            return "" === t.password ? (this.nPwd.focus(), this.nHelpInfo.html("请输入您的密码"), !1) : "login" !== this.renderOpt.type && t.password.length < 6 ? (this.nPwd.focus(), this.nHelpInfo.html("亲，密码最短为6位"), !1) : "login" !== this.renderOpt.type && t.password.length > 20 ? (this.nPwd.focus(), this.nHelpInfo.html("亲，密码太长为16位"), !1) : !0
        },checkCode: function(t) {
            return window.Utils.validPostalCode(t.code) ? !0 : (this.nCodeInput.focus(), this.nHelpInfo.html("请填写6位短信验证码"), !1)
        },onCoverClick: function(t) {
            var e = $(t.target), i = e.parent().find("input");
            i.focus(), a && (a.isIOS() && a.getIOSVersion() < 8 && (i.blur(), i.focus()), e.css("display", "none"))
        },onInputBlur: function(t) {
            var e = $(t.target);
            e.parent().find(".js-txt-cover").css("display", "block")
        }});
    return r
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {makeRandomString: function(t) {
        var e = "", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        t = t || 10;
        for (var n = 0; t > n; n++)
            e += i.charAt(Math.floor(Math.random() * i.length));
        return e
    }}), define("wap/components/util/number", function() {
}), define("wap/components/pop", ["components/zenjs/events", "wap/components/util/number"], function(t) {
    var e = function() {
    };
    window.zenjs = window.zenjs || {};
    var i = t.extend({init: function(t) {
            this._window = $(window);
            var i = window.Utils.makeRandomString();
            $("body").append('<div id="' + i + '"                 style="display:none; height: 100%;                 position: fixed; top: 0; left: 0; right: 0;                background-color: rgba(0, 0, 0, ' + (t.transparent || ".9") + ');z-index:1000;opacity:0;transition: opacity ease 0.2s;"></div>'), 
            this.nBg = $("#" + i), this.nBg.on("click", $.proxy(function() {
                this.isCanNotHide || this.hide()
            }, this));
            var n = window.Utils.makeRandomString();
            $("body").append('<div id="' + n + '" class="' + (t.className || "") + '" style="overflow:hidden;visibility: hidden;"></div>'), this.nPopContainer = $("#" + n), this.nPopContainer.hide(), t.contentViewClass && (this.contentViewClass = t.contentViewClass, this.contentViewOptions = $.extend({el: this.nPopContainer}, t.contentViewOptions || {}), this.contentView = new this.contentViewClass($.extend({onHide: $.proxy(this.hide, this)}, this.contentViewOptions)), this.contentView.onHide = $.proxy(this.hide, this)), this.animationTime = t.animationTime || 300, this.isCanNotHide = t.isCanNotHide, this.doNotRemoveOnHide = t.doNotRemoveOnHide || !1, this.onShow = t.onShow || e, this.onHide = t.onHide || e, this.onFinishHide = t.onFinishHide || e, this.html = t.html
        },render: function(t) {
            return this.renderOptions = t || {}, this.contentViewClass ? this.contentView.render(this.renderOptions) : this.html && this.nPopContainer.html(this.html), this
        },show: function() {
            return this.top = this._window.scrollTop(), this.nBg.show().css({opacity: "1","transition-property": "none"}), this.nPopContainer.show(), setTimeout($.proxy(function() {
                this._window.scrollTop(0), this.startShow(), this.nPopContainer.show().css("visibility", "visible"), this._doShow && this._doShow(), this.onShow()
            }, this), 200), this
        },hide: function() {
            var t, e = function() {
                return t !== this._window.scrollTop() ? (this._window.scrollTop(t), void setTimeout($.proxy(e, this))) : void setTimeout($.proxy(this.onFinishHide, this), 50)
            };
            return function(i) {
                i = i || {};
                var n = i.doNotRemove || this.doNotRemoveOnHide || !1;
                this._doHide && this._doHide(), setTimeout($.proxy(function() {
                    this.startHide(), t = this.top, this._window.scrollTop(t), $.proxy(e, this)(), this.nBg.css({opacity: 0,"transition-property": "opacity"}), setTimeout($.proxy(function() {
                        this.nBg.hide(), this.nPopContainer.hide(), n || this.destroy(), window.zenjs.popList.length < 1 && $("html").css("position", this.htmlPosition)
                    }, this), 200)
                }, this), this.animationTime), this.onHide()
            }
        }(),destroy: function() {
            return this.nPopContainer.remove(), this.nBg.remove(), this.contentView && this.contentView.remove(), this
        },startShow: function() {
            var t = window.zenjs.popList;
            if (t || (t = window.zenjs.popList = []), 0 === t.length) {
                var e = $("body"), i = $("html");
                this.htmlPosition = i.css("position"), i.css("position", "relative"), this.bodyCss = (e.attr("style") || {}).cssText, this.htmlCss = (i.attr("style") || {}).cssText, $("body,html").css({overflow: "hidden",height: this._window.height()})
            }
            t.indexOf(this) < 0 && t.push(this)
        },startHide: function() {
            var t = window.zenjs.popList, e = t.indexOf(this);
            e > -1 && t.splice(e, 1), t.length < 1 && ($("html").attr("style", this.htmlCss || ""), $("body").attr("style", this.bodyCss || ""))
        }});
    return i
}), define("wap/components/popout", ["wap/components/pop"], function(t) {
    var e = t.extend({init: function(t) {
            t = t || {}, this._super(t), this.css = $.extend({position: "absolute","z-index": 1e3,transition: "opacity ease " + this.animationTime + "ms",opacity: 0,top: "50%",left: "50%","-webkit-transform": "translate3d(-50%, -50%, 0)",transform: "translateY(-50%, -50%, 0)"}, t.css || {}), this.nPopContainer.css(this.css)
        },_doShow: function() {
            $(".js-popout-close").click($.proxy(function(t) {
                this.hide()
            }, this)), this.nPopContainer.css("opacity", 1), this.nPopContainer.show()
        },_doHide: function(t) {
            this.nPopContainer.css({opacity: 0})
        }});
    return e
}), define("wap/components/popout_box", ["wap/components/popout"], function(t) {
    var e = function() {
    }, i = t.extend({init: function(t) {
            this._super(t), this._onOKClicked = t.onOKClicked || e, this._onCancelClicked = t.onCancelClicked || e, this.preventHideOnOkClicked = t.preventHideOnOkClicked || !1, this.width = t.width, this.setEventListener()
        },setEventListener: function() {
            this.nPopContainer.on("click", ".js-ok", $.proxy(this.onOKClicked, this)), this.nPopContainer.on("click", ".js-cancel", $.proxy(this.onCancelClicked, this))
        },_doShow: function() {
            this.boxCss = {"border-radius": "4px",background: "white",width: this.width || "270px",padding: "15px"}, this.nPopContainer.css(this.boxCss).addClass("popout-box"), this._super()
        },_doHide: function(t) {
            this._super()
        },onOKClicked: function(t) {
            this._onOKClicked(t), !this.preventHideOnOkClicked && this.hide()
        },onCancelClicked: function(t) {
            this._onCancelClicked(t), this.hide()
        }});
    return i
}), define("wap/trade/cart/views/bottom", ["wap/components/goods_list/views/bottom", "vendor/zepto/form", "wap/components/login_popout/main", "wap/components/popout_box", "wap/components/goods_list/models/collection"], function(t, e, i, n, s) {
    return t.extend({initialize: function(e) {
            t.prototype.initialize.apply(this, [e]), this.goodsList = new s([], {}), this.need_ajax_login = window._global.need_ajax_login
        },doSubmit: function(t) {
            function e() {
                s.goPayUrl = window._global.url.trade + "/wxpay/confirm?showwxpaytitle=1&kdt_id=" + window._global.kdt_id;
                var e = window.zenjs.Args.get("from"), i = window.zenjs.Args.get("kdtfrom");
                (e && e.length > 0 || i && i.length > 0) && (s.goPayUrl = window.zenjs.Args.add(s.goPayUrl, {from: e,kdtfrom: i}));
                var n = (JSON.parse(t) || {}).cart, o = {kdt_id: window._global.kdt_id,activity_alias: "",activity_id: "",activity_type: ""};
                o.order_from = "cart", e && e.length > 0 && (o.from = e);
                var l = $('<form method="post" action="' + s.goPayUrl + '"></form>');
                l.append('<textarea name="goodsList">' + JSON.stringify(n) + "</textarea>"), l.append('<textarea name="common">' + JSON.stringify(o) + "</textarea>"), l.submit()
            }
            var s = this;
            if (s.need_ajax_login) {
                var o = new n({contentViewClass: i,contentViewOptions: {afterLogin: function(t) {
                            o.hide(), s.need_ajax_login = !1, e()
                        }}});
                return void o.render().show()
            }
            e()
        }})
}), require(["wap/components/goods_lists/main", "wap/trade/cart/views/bottom"], function(t, e) {
    new t({el: $("#cart-container"),url: "/v2/trade/cart/goods.json",teamName: _global.team_name,BottomView: e,bottomViewOptions: {el: $(".js-bottom-opts"),goPayUrl: "/v2/trade/cart/cart.json"},deleteBatchUrl: "/v2/trade/cart/deleteBatchList.json?kdt_id=" + window._global.kdt_id,deleteBatchIdName: "sku_id"}).render()
}), define("main", function() {
});
