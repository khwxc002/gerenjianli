define("wap/components/wx_image_preview", [], function() {
    function e(e) {
        var n = e.attr("data-src") || e.attr("src"), t = n.replace(/!.*?\.jpg/i, "!640x320.jpg");
        return t
    }
    function n(e) {
        var n, t, a = 2;
        for (t = 0; a > t; t++)
            if (e = e.parent(), n = e.attr("href"), n && /[http|https|tel|mailto]:/i.test(n))
                return !0;
        return !1
    }
    function t() {
        var n = e($(this));
        i(n, [n])
    }
    var a = [], i = function(e, n) {
        window.WeixinJSBridge && window.WeixinJSBridge.invoke("imagePreview", {current: e,urls: n})
    }, o = {init: function() {
            var o = $(".js-view-image"), s = 0;
            o.each(function() {
                var t = $(this), o = e(t);
                n(t) || t.width() >= s && o && (a.push(o), t.on("click", function() {
                    i(o, a)
                }))
            }), $(".js-view-image-list").each(function(t) {
                var a = $(this);
                a.on("click", ".js-view-image-item", function(t) {
                    var o = a.find(".js-view-image-item");
                    if (!n($(t.target))) {
                        o = o.map(function() {
                            var n = $(this);
                            return e(n)
                        }).toArray();
                        var s = e($(this));
                        i(s, o)
                    }
                })
            }), $(document.body).off("click", ".js-view-single-image", t).on("click", ".js-view-single-image", t)
        },clear: function() {
            a = []
        }};
    return window.imagePreview = o, o
}), function() {
    function e() {
        clearTimeout(i), n.addClass("done")
    }
    var n = $(".js-tpl-weixin-list-item"), t = $(".js-tpl-weixin-bg");
    if (!(t.length <= 0)) {
        var a = t[0], i = setTimeout(function() {
            e()
        }, 2e3);
        a.onload = a.onerror = a.onabort = e, a.complete && e()
    }
}(), function() {
    var e = $(".js-tpl-shop"), n = "/v2/showcase/homepage/goodscount.json";
    e.length && $.ajax({url: n,type: "GET",dataType: "json",data: {kdt_id: window._global.kdt_id}}).done(function(n) {
        if (0 === +n.code) {
            var t = e.find(".js-all-goods"), a = e.find(".js-new-goods"), i = e.find(".js-order"), o = n.data, s = "";
            s = (o.all_goods.count + "").length, t.find("a").attr("href", o.all_goods.url), t.find(".count").html(o.all_goods.count).addClass("l-" + s), s = (o.new_goods.count + "").length, a.find("a").attr("href", o.new_goods.url), a.find(".count").html(o.new_goods.count).addClass("l-" + s), i.find("a").attr("href", o.order.url)
        }
    })
}(), function() {
    $(".js-select-coupon").on("click", function() {
        var e = $(this), n = window.motify;
        $.ajax({url: "/v2/ump/promocard/fetchalias.json",type: "POST",data: {kdt_id: e.data("kdt-id"),id: e.data("id")}}).done(function(e) {
            0 === +e.code ? window.location.href = e.data.url : n.log(e.msg || "????????????")
        }).fail(function() {
            n.log("????????????")
        })
    })
}(), window.init_custom_notice = function(e) {
    var n = $(".js-scroll-notice", $(e || "body"));
    n.length && n.each(function() {
        function e() {
            o--, 0 > o + a && (o = i), n.css({left: o})
        }
        var n = $(this), t = n.parents(".custom-notice-inner"), a = n.width(), i = t.width(), o = 0;
        i >= a || (n.css({position: "relative"}), setInterval(e, 25))
    })
}, window.init_custom_notice(), define("wap/showcase/homepage/homepage", function() {
}), function() {
    var e = $(".js-custom-level"), n = $(".js-custom-point"), t = $(".js-custom-level-title-section");
    if (!(+_global.fans_id <= 0 && +_global.buyer_id <= 0)) {
        var a = window._global.url.wap + "/showcase/component/point.jsonp?" + $.param({kdt_id: window._global.kdt_id});
        (e.length > 0 || n.length > 0) && $.ajax({dataType: "jsonp",type: "GET",url: a,success: function(a) {
                0 === +a.code && (e.html(a.data.level || "??????"), n.html(a.data.point || "????????????"), t.removeClass("hide"))
            }})
    }
}(), define("wap/uc/title", function() {
}), define("wap/showcase/shop_nav/main", ["vendor/zepto/outer"], function() {
    var e = $(".js-navmenu"), n = e.find(".js-nav-pop");
    if (e.length) {
        var t = {showSubmenu: function(e) {
                var n = $(e.target), t = n.parents(".nav-item"), a = n.hasClass(".js-mainmenu") ? n : t.find(".js-mainmenu"), i = t.find(".js-submenu"), o = i.find(".arrow"), s = n.parents(".js-navmenu"), r = s.find(".nav-item");
                i.css("opacity", "0").toggle();
                var c = r.length, d = r.index(t), l = a.outerWidth(), u = (i.outerWidth() - a.outerWidth()) / 2, h = i.outerWidth() / 2;
                if (0 === i.size())
                    $(".js-submenu:visible").hide();
                else {
                    var f = i.outerWidth(), p = t.outerWidth(), m = "auto", v = "auto", g = "auto", w = "auto";
                    0 === d ? (m = a.position().left - u, v = h - o.outerWidth() / 2) : d === c - 1 && f > p ? (g = 8, w = l / 2 - g) : (m = a.position().left - u, v = h - o.outerWidth() / 2);
                    var j = 5;
                    0 > m && (v = v + m + j, m = j), 0 > g && (w = w + g + j, g = j), i.css({left: m,right: g}), o.css({left: v,right: w}), $(".js-submenu:visible").not(i).hide(), i.css("opacity", "1")
                }
            }};
        $(document).on("click", function(t) {
            e[0] && (t.target == e[0] || $.contains(e[0], t.target) || ($(".js-submenu:visible").hide(0), e.hasClass("nav-show") && (e.removeClass("nav-show").addClass("nav-hide"), setTimeout(function() {
                n.hide(0)
            }, 500))))
        }), $("body").on("click", ".js-navmenu", function(e) {
            var n = $(e.target);
            e.fromMenu = !0, window.Logger && Logger.log({fm: "click",title: n.prop("title") || n.text()})
        }), $("body").on("click", ".js-submenu", function(e) {
            var n = $(e.target);
            e.fromMenu = !0, window.Logger && Logger.log({fm: "click",title: n.prop("title") || n.text()}), e.stopPropagation()
        }), $("body").on("click", ".js-mainmenu", function(e) {
            t.showSubmenu(e)
        });
        var a = ".js-navmenu", i = $(".js-custom-paginations"), o = $(a), s = o.data("type");
        4 != s && o.size() + i.size() > 0 && $("body").css("padding-bottom", $(".js-navmenu").height() || i.height());
        var r;
        $(window).on("scroll", function(e) {
            e.preventDefault();
            var n = $(".js-navmenu"), t = n.find(".js-nav-pop");
            n.hasClass("nav-show") && (n.removeClass("nav-show").addClass("nav-hide"), setTimeout(function() {
                t.hide(0)
            }, 500))
        }), $("body").on("click", ".js-nav-special", function(e) {
            var n = $(e.target), t = n.parents(".js-navmenu"), a = t.find(".js-nav-pop");
            "animation" != t.data("animation") && (t.data("animation", "animation"), t.hasClass("nav-show") ? (t.removeClass("nav-show").addClass("nav-hide"), r = setTimeout(function() {
                a.css("display", "none"), t.data("animation", "")
            }, 600)) : (a.css("display", "block"), t.addClass("nav-show").removeClass("nav-hide"), setTimeout(function() {
                t.data("animation", "")
            }, 600)))
        })
    }
}), define("wap/showcase/base/batch", [], function() {
    function e(e) {
        e = e || {};
        var n = e.key, r = e.url, c = e.type || "GET", d = e.para || {}, l = e.handler || s;
        n && r && (i[n] || (i[n] = {url: r,param: $.extend({}, d),type: c}, a[n] = []), o && (o = !1, t()), a[n].push(l))
    }
    function n() {
        if ($.isEmptyObject(i))
            return void (o = !0);
        var e = $.extend({}, i);
        i = {}, $.ajax({url: "/batch",type: "post",dataType: "json",data: {query: e},success: function(e) {
                var n = e.code, t = e.data || {};
                0 == n && $.each(t, function(e, n) {
                    var i = a[e] || [], o = null;
                    try {
                        o = JSON.parse(t[e])
                    } catch (s) {
                        o = {}
                    }
                    $.each(i, function(n, t) {
                        t(o, e)
                    })
                })
            },error: function(e, n) {
            },complete: function() {
                t()
            }})
    }
    function t() {
        setTimeout(n, 1e3)
    }
    var a = {}, i = {}, o = !1, s = function() {
    };
    /loaded|interactive|complete/.test(document.readyState) ? setTimeout(n, 500) : window.addEventListener("load", function() {
        setTimeout(n, 500)
    }), window.queryBatch = window.queryBatch || e
}), window.Zepto && function(e) {
    e.fn.serializeArray = function() {
        var n, t, a = [], i = function(e) {
            return e.forEach ? e.forEach(i) : void a.push({name: n,value: e})
        };
        return this[0] && e.each(this[0].elements, function(a, o) {
            t = o.type, n = o.name, n && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != t && "reset" != t && "button" != t && "file" != t && ("radio" != t && "checkbox" != t || o.checked) && i(e(o).val())
        }), a
    }, e.fn.serialize = function() {
        var e = [];
        return this.serializeArray().forEach(function(n) {
            e.push(encodeURIComponent(n.name) + "=" + encodeURIComponent(n.value))
        }), e.join("&")
    }, e.fn.submit = function(n) {
        if (0 in arguments)
            this.bind("submit", n);
        else if (this.length) {
            var t = e.Event("submit");
            this.eq(0).trigger(t), t.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), define("vendor/zepto/form", function() {
}), define("wap/showcase/search_bar/main", ["vendor/zepto/form"], function() {
    $.fn.searchBar = function() {
        var e = $.fn.searchBar.container;
        return e || (e = $.fn.searchBar.init()), this.each(function() {
            $(this).on("click", function() {
                e.removeClass("hide"), e.css("display", "block"), e.find(".search-input").focus()
            })
        })
    }, $.fn.searchBar.init = function() {
        var e, n = window.localStorage, t = $('<div class="search-container hide" style="display:none;"></div>'), a = $(['<form class="search-form" action="/v2/search" method="GET">', '<input type="search" class="search-input" placeholder="????????????????????????" name="q" value="">', '<input type="hidden" name="kdt_id" value="' + window._global.kdt_id + '">', '<a class="js-search-cancel search-cancel" href="javascript:;">??????</a>', '<span class="search-icon"></span>', '<span class="close-icon hide"></span>', "</form>"].join("")), i = $('<div class="history-wrap center"></div>'), o = a.find(".js-search-cancel"), s = $('<ul class="history-list"></ul>'), r = $('<a class="tag tag-clear c-gray-darker hide" href="javascript:;">??????????????????</a>'), c = a.find(".search-input"), d = a.find(".close-icon"), l = "";
        return n && (e = (JSON.parse(n.getItem("searchhistory")) || {}).result, e && ($.each(e, function(e, n) {
            l += "<li>" + n + "</li>"
        }), s.append(l), r.removeClass("hide"))), i.append(s).append(r), t.append(a).append(i), $("body").append(t), $.fn.searchBar.container = t, a.on("submit", function() {
            var t = $.trim(c.val());
            n && t && (e = e || [], e = $.grep(e, function(e) {
                return e != t
            }), e.unshift(t), n.setItem("searchhistory", JSON.stringify({result: e})))
        }).on("input", function() {
            "" !== $.trim(c.val()) ? (i.addClass("hide"), d.removeClass("hide")) : (i.removeClass("hide"), d.addClass("hide"))
        }), d.on("click", function() {
            c.val(""), d.addClass("hide")
        }), o.on("click", function() {
            t.addClass("hide"), t.css("display", "none")
        }), s.on("click", "li", function(e) {
            c.val($(e.currentTarget).text()), a.submit()
        }), r.on("click", function() {
            n && (n.removeItem("searchhistory"), e = null), i.html("")
        }), t
    }
}), require(["wap/components/wx_image_preview", "vendor/zepto/outer", "wap/showcase/homepage/homepage", "wap/uc/title", "wap/showcase/shop_nav/main", "wap/showcase/base/batch", "wap/showcase/search_bar/main"], function(e) {
    _global.spm && "h" === _global.spm.logType && _global.spm.logType2 && onReady && onReady("Logger", function() {
        window.Logger && Logger.log({spm: _global.spm.logType2 + _global.spm.logId2,fm: "display"})
    }), $(".js-search").searchBar(), _global.goods_id || e.init(), $(".js-mp-chihuo").click(function(e) {
        e.preventDefault();
        var n = $(e.target);
        window.Logger && Logger.log({fm: "click",title: "showcase_nav_chihuo"}).done(function() {
            location.href = n.data("href")
        })
    })
}), define("main", function() {
});
