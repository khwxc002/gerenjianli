(function() {
    var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, d = e.filter, g = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, _ = Object.keys, j = i.bind, w = function(n) {
        return n instanceof w ? n : this instanceof w ? (this._wrapped = n, void 0) : new w(n)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = w), exports._ = w) : n._ = w, w.VERSION = "1.4.4";
    var A = w.each = w.forEach = function(n, t, e) {
        if (null != n)
            if (s && n.forEach === s)
                n.forEach(t, e);
            else if (n.length === +n.length) {
                for (var u = 0, i = n.length; i > u; u++)
                    if (t.call(e, n[u], u, n) === r)
                        return
            } else
                for (var a in n)
                    if (w.has(n, a) && t.call(e, n[a], a, n) === r)
                        return
    };
    w.map = w.collect = function(n, t, r) {
        var e = [];
        return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) {
            e[e.length] = t.call(r, n, u, i)
        }), e)
    };
    var O = "Reduce of empty array with no initial value";
    w.reduce = w.foldl = w.inject = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), h && n.reduce === h)
            return e && (t = w.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
        if (A(n, function(n, i, a) {
            u ? r = t.call(e, r, n, i, a) : (r = n, u = !0)
        }), !u)
            throw new TypeError(O);
        return r
    }, w.reduceRight = w.foldr = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), v && n.reduceRight === v)
            return e && (t = w.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
        var i = n.length;
        if (i !== +i) {
            var a = w.keys(n);
            i = a.length
        }
        if (A(n, function(o, c, l) {
            c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0)
        }), !u)
            throw new TypeError(O);
        return r
    }, w.find = w.detect = function(n, t, r) {
        var e;
        return E(n, function(n, u, i) {
            return t.call(r, n, u, i) ? (e = n, !0) : void 0
        }), e
    }, w.filter = w.select = function(n, t, r) {
        var e = [];
        return null == n ? e : d && n.filter === d ? n.filter(t, r) : (A(n, function(n, u, i) {
            t.call(r, n, u, i) && (e[e.length] = n)
        }), e)
    }, w.reject = function(n, t, r) {
        return w.filter(n, function(n, e, u) {
            return !t.call(r, n, e, u)
        }, r)
    }, w.every = w.all = function(n, t, e) {
        t || (t = w.identity);
        var u = !0;
        return null == n ? u : g && n.every === g ? n.every(t, e) : (A(n, function(n, i, a) {
            return (u = u && t.call(e, n, i, a)) ? void 0 : r
        }), !!u)
    };
    var E = w.some = w.any = function(n, t, e) {
        t || (t = w.identity);
        var u = !1;
        return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
            return u || (u = t.call(e, n, i, a)) ? r : void 0
        }), !!u)
    };
    w.contains = w.include = function(n, t) {
        return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : E(n, function(n) {
            return n === t
        })
    }, w.invoke = function(n, t) {
        var r = o.call(arguments, 2), e = w.isFunction(t);
        return w.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r)
        })
    }, w.pluck = function(n, t) {
        return w.map(n, function(n) {
            return n[t]
        })
    }, w.where = function(n, t, r) {
        return w.isEmpty(t) ? r ? null : [] : w[r ? "find" : "filter"](n, function(n) {
            for (var r in t)
                if (t[r] !== n[r])
                    return !1;
            return !0
        })
    }, w.findWhere = function(n, t) {
        return w.where(n, t, !0)
    }, w.max = function(n, t, r) {
        if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length)
            return Math.max.apply(Math, n);
        if (!t && w.isEmpty(n))
            return -1 / 0;
        var e = {computed: -1 / 0,value: -1 / 0};
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a >= e.computed && (e = {value: n,computed: a})
        }), e.value
    }, w.min = function(n, t, r) {
        if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length)
            return Math.min.apply(Math, n);
        if (!t && w.isEmpty(n))
            return 1 / 0;
        var e = {computed: 1 / 0,value: 1 / 0};
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            e.computed > a && (e = {value: n,computed: a})
        }), e.value
    }, w.shuffle = function(n) {
        var t, r = 0, e = [];
        return A(n, function(n) {
            t = w.random(r++), e[r - 1] = e[t], e[t] = n
        }), e
    };
    var k = function(n) {
        return w.isFunction(n) ? n : function(t) {
            return t[n]
        }
    };
    w.sortBy = function(n, t, r) {
        var e = k(t);
        return w.pluck(w.map(n, function(n, t, u) {
            return {value: n,index: t,criteria: e.call(r, n, t, u)}
        }).sort(function(n, t) {
            var r = n.criteria, e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0)
                    return 1;
                if (e > r || e === void 0)
                    return -1
            }
            return n.index < t.index ? -1 : 1
        }), "value")
    };
    var F = function(n, t, r, e) {
        var u = {}, i = k(t || w.identity);
        return A(n, function(t, a) {
            var o = i.call(r, t, a, n);
            e(u, o, t)
        }), u
    };
    w.groupBy = function(n, t, r) {
        return F(n, t, r, function(n, t, r) {
            (w.has(n, t) ? n[t] : n[t] = []).push(r)
        })
    }, w.countBy = function(n, t, r) {
        return F(n, t, r, function(n, t) {
            w.has(n, t) || (n[t] = 0), n[t]++
        })
    }, w.sortedIndex = function(n, t, r, e) {
        r = null == r ? w.identity : k(r);
        for (var u = r.call(e, t), i = 0, a = n.length; a > i; ) {
            var o = i + a >>> 1;
            u > r.call(e, n[o]) ? i = o + 1 : a = o
        }
        return i
    }, w.toArray = function(n) {
        return n ? w.isArray(n) ? o.call(n) : n.length === +n.length ? w.map(n, w.identity) : w.values(n) : []
    }, w.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : w.keys(n).length
    }, w.first = w.head = w.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t)
    }, w.initial = function(n, t, r) {
        return o.call(n, 0, n.length - (null == t || r ? 1 : t))
    }, w.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0))
    }, w.rest = w.tail = w.drop = function(n, t, r) {
        return o.call(n, null == t || r ? 1 : t)
    }, w.compact = function(n) {
        return w.filter(n, w.identity)
    };
    var R = function(n, t, r) {
        return A(n, function(n) {
            w.isArray(n) ? t ? a.apply(r, n) : R(n, t, r) : r.push(n)
        }), r
    };
    w.flatten = function(n, t) {
        return R(n, t, [])
    }, w.without = function(n) {
        return w.difference(n, o.call(arguments, 1))
    }, w.uniq = w.unique = function(n, t, r, e) {
        w.isFunction(t) && (e = r, r = t, t = !1);
        var u = r ? w.map(n, r, e) : n, i = [], a = [];
        return A(u, function(r, e) {
            (t ? e && a[a.length - 1] === r : w.contains(a, r)) || (a.push(r), i.push(n[e]))
        }), i
    }, w.union = function() {
        return w.uniq(c.apply(e, arguments))
    }, w.intersection = function(n) {
        var t = o.call(arguments, 1);
        return w.filter(w.uniq(n), function(n) {
            return w.every(t, function(t) {
                return w.indexOf(t, n) >= 0
            })
        })
    }, w.difference = function(n) {
        var t = c.apply(e, o.call(arguments, 1));
        return w.filter(n, function(n) {
            return !w.contains(t, n)
        })
    }, w.zip = function() {
        for (var n = o.call(arguments), t = w.max(w.pluck(n, "length")), r = Array(t), e = 0; t > e; e++)
            r[e] = w.pluck(n, "" + e);
        return r
    }, w.object = function(n, t) {
        if (null == n)
            return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++)
            t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, w.indexOf = function(n, t, r) {
        if (null == n)
            return -1;
        var e = 0, u = n.length;
        if (r) {
            if ("number" != typeof r)
                return e = w.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r
        }
        if (y && n.indexOf === y)
            return n.indexOf(t, r);
        for (; u > e; e++)
            if (n[e] === t)
                return e;
        return -1
    }, w.lastIndexOf = function(n, t, r) {
        if (null == n)
            return -1;
        var e = null != r;
        if (b && n.lastIndexOf === b)
            return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
        for (var u = e ? r : n.length; u--; )
            if (n[u] === t)
                return u;
        return -1
    }, w.range = function(n, t, r) {
        1 >= arguments.length && (t = n || 0, n = 0), r = arguments[2] || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = Array(e); e > u; )
            i[u++] = n, n += r;
        return i
    }, w.bind = function(n, t) {
        if (n.bind === j && j)
            return j.apply(n, o.call(arguments, 1));
        var r = o.call(arguments, 2);
        return function() {
            return n.apply(t, r.concat(o.call(arguments)))
        }
    }, w.partial = function(n) {
        var t = o.call(arguments, 1);
        return function() {
            return n.apply(this, t.concat(o.call(arguments)))
        }
    }, w.bindAll = function(n) {
        var t = o.call(arguments, 1);
        return 0 === t.length && (t = w.functions(n)), A(t, function(t) {
            n[t] = w.bind(n[t], n)
        }), n
    }, w.memoize = function(n, t) {
        var r = {};
        return t || (t = w.identity), function() {
            var e = t.apply(this, arguments);
            return w.has(r, e) ? r[e] : r[e] = n.apply(this, arguments)
        }
    }, w.delay = function(n, t) {
        var r = o.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }, w.defer = function(n) {
        return w.delay.apply(w, [n, 1].concat(o.call(arguments, 1)))
    }, w.throttle = function(n, t) {
        var r, e, u, i, a = 0, o = function() {
            a = new Date, u = null, i = n.apply(r, e)
        };
        return function() {
            var c = new Date, l = t - (c - a);
            return r = this, e = arguments, 0 >= l ? (clearTimeout(u), u = null, a = c, i = n.apply(r, e)) : u || (u = setTimeout(o, l)), i
        }
    }, w.debounce = function(n, t, r) {
        var e, u;
        return function() {
            var i = this, a = arguments, o = function() {
                e = null, r || (u = n.apply(i, a))
            }, c = r && !e;
            return clearTimeout(e), e = setTimeout(o, t), c && (u = n.apply(i, a)), u
        }
    }, w.once = function(n) {
        var t, r = !1;
        return function() {
            return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t)
        }
    }, w.wrap = function(n, t) {
        return function() {
            var r = [n];
            return a.apply(r, arguments), t.apply(this, r)
        }
    }, w.compose = function() {
        var n = arguments;
        return function() {
            for (var t = arguments, r = n.length - 1; r >= 0; r--)
                t = [n[r].apply(this, t)];
            return t[0]
        }
    }, w.after = function(n, t) {
        return 0 >= n ? t() : function() {
            return 1 > --n ? t.apply(this, arguments) : void 0
        }
    }, w.keys = _ || function(n) {
        if (n !== Object(n))
            throw new TypeError("Invalid object");
        var t = [];
        for (var r in n)
            w.has(n, r) && (t[t.length] = r);
        return t
    }, w.values = function(n) {
        var t = [];
        for (var r in n)
            w.has(n, r) && t.push(n[r]);
        return t
    }, w.pairs = function(n) {
        var t = [];
        for (var r in n)
            w.has(n, r) && t.push([r, n[r]]);
        return t
    }, w.invert = function(n) {
        var t = {};
        for (var r in n)
            w.has(n, r) && (t[n[r]] = r);
        return t
    }, w.functions = w.methods = function(n) {
        var t = [];
        for (var r in n)
            w.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, w.extend = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t)
                    n[r] = t[r]
        }), n
    }, w.pick = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        return A(r, function(r) {
            r in n && (t[r] = n[r])
        }), t
    }, w.omit = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        for (var u in n)
            w.contains(r, u) || (t[u] = n[u]);
        return t
    }, w.defaults = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t)
                    null == n[r] && (n[r] = t[r])
        }), n
    }, w.clone = function(n) {
        return w.isObject(n) ? w.isArray(n) ? n.slice() : w.extend({}, n) : n
    }, w.tap = function(n, t) {
        return t(n), n
    };
    var I = function(n, t, r, e) {
        if (n === t)
            return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t)
            return n === t;
        n instanceof w && (n = n._wrapped), t instanceof w && (t = t._wrapped);
        var u = l.call(n);
        if (u != l.call(t))
            return !1;
        switch (u) {
            case "[object String]":
                return n == t + "";
            case "[object Number]":
                return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
            case "[object Date]":
            case "[object Boolean]":
                return +n == +t;
            case "[object RegExp]":
                return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase
        }
        if ("object" != typeof n || "object" != typeof t)
            return !1;
        for (var i = r.length; i--; )
            if (r[i] == n)
                return e[i] == t;
        r.push(n), e.push(t);
        var a = 0, o = !0;
        if ("[object Array]" == u) {
            if (a = n.length, o = a == t.length)
                for (; a-- && (o = I(n[a], t[a], r, e)); )
                    ;
        } else {
            var c = n.constructor, f = t.constructor;
            if (c !== f && !(w.isFunction(c) && c instanceof c && w.isFunction(f) && f instanceof f))
                return !1;
            for (var s in n)
                if (w.has(n, s) && (a++, !(o = w.has(t, s) && I(n[s], t[s], r, e))))
                    break;
            if (o) {
                for (s in t)
                    if (w.has(t, s) && !a--)
                        break;
                o = !a
            }
        }
        return r.pop(), e.pop(), o
    };
    w.isEqual = function(n, t) {
        return I(n, t, [], [])
    }, w.isEmpty = function(n) {
        if (null == n)
            return !0;
        if (w.isArray(n) || w.isString(n))
            return 0 === n.length;
        for (var t in n)
            if (w.has(n, t))
                return !1;
        return !0
    }, w.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }, w.isArray = x || function(n) {
        return "[object Array]" == l.call(n)
    }, w.isObject = function(n) {
        return n === Object(n)
    }, A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(n) {
        w["is" + n] = function(t) {
            return l.call(t) == "[object " + n + "]"
        }
    }), w.isArguments(arguments) || (w.isArguments = function(n) {
        return !(!n || !w.has(n, "callee"))
    }), "function" != typeof /./ && (w.isFunction = function(n) {
        return "function" == typeof n
    }), w.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, w.isNaN = function(n) {
        return w.isNumber(n) && n != +n
    }, w.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" == l.call(n)
    }, w.isNull = function(n) {
        return null === n
    }, w.isUndefined = function(n) {
        return n === void 0
    }, w.has = function(n, t) {
        return f.call(n, t)
    }, w.noConflict = function() {
        return n._ = t, this
    }, w.identity = function(n) {
        return n
    }, w.times = function(n, t, r) {
        for (var e = Array(n), u = 0; n > u; u++)
            e[u] = t.call(r, u);
        return e
    }, w.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    };
    var M = {escape: {"&": "&amp;","<": "&lt;",">": "&gt;",'"': "&quot;","'": "&#x27;","/": "&#x2F;"}};
    M.unescape = w.invert(M.escape);
    var S = {escape: RegExp("[" + w.keys(M.escape).join("") + "]", "g"),unescape: RegExp("(" + w.keys(M.unescape).join("|") + ")", "g")};
    w.each(["escape", "unescape"], function(n) {
        w[n] = function(t) {
            return null == t ? "" : ("" + t).replace(S[n], function(t) {
                return M[n][t]
            })
        }
    }), w.result = function(n, t) {
        if (null == n)
            return null;
        var r = n[t];
        return w.isFunction(r) ? r.call(n) : r
    }, w.mixin = function(n) {
        A(w.functions(n), function(t) {
            var r = w[t] = n[t];
            w.prototype[t] = function() {
                var n = [this._wrapped];
                return a.apply(n, arguments), D.call(this, r.apply(w, n))
            }
        })
    };
    var N = 0;
    w.uniqueId = function(n) {
        var t = ++N + "";
        return n ? n + t : t
    }, w.templateSettings = {evaluate: /<%([\s\S]+?)%>/g,interpolate: /<%=([\s\S]+?)%>/g,escape: /<%-([\s\S]+?)%>/g};
    var T = /(.)^/, q = {"'": "'","\\": "\\","\r": "r","\n": "n","	": "t","\u2028": "u2028","\u2029": "u2029"}, B = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    w.template = function(n, t, r) {
        var e;
        r = w.defaults({}, r, w.templateSettings);
        var u = RegExp([(r.escape || T).source, (r.interpolate || T).source, (r.evaluate || T).source].join("|") + "|$", "g"), i = 0, a = "__p+='";
        n.replace(u, function(t, r, e, u, o) {
            return a += n.slice(i, o).replace(B, function(n) {
                return "\\" + q[n]
            }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t
        }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            e = Function(r.variable || "obj", "_", a)
        } catch (o) {
            throw o.source = a, o
        }
        if (t)
            return e(t, w);
        var c = function(n) {
            return e.call(this, n, w)
        };
        return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c
    }, w.chain = function(n) {
        return w(n).chain()
    };
    var D = function(n) {
        return this._chain ? w(n).chain() : n
    };
    w.mixin(w), A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = e[n];
        w.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], D.call(this, r)
        }
    }), A(["concat", "join", "slice"], function(n) {
        var t = e[n];
        w.prototype[n] = function() {
            return D.call(this, t.apply(this._wrapped, arguments))
        }
    }), w.extend(w.prototype, {chain: function() {
            return this._chain = !0, this
        },value: function() {
            return this._wrapped
        }})
}).call(this);
(function() {
    var t = this;
    var e = t.Backbone;
    var i = [];
    var r = i.push;
    var s = i.slice;
    var n = i.splice;
    var a;
    if (typeof exports !== "undefined") {
        a = exports
    } else {
        a = t.Backbone = {}
    }
    a.VERSION = "1.0.0";
    var h = t._;
    if (!h && typeof require !== "undefined")
        h = require("underscore");
    a.$ = t.jQuery || t.Zepto || t.ender || t.$;
    a.noConflict = function() {
        t.Backbone = e;
        return this
    };
    a.emulateHTTP = false;
    a.emulateJSON = false;
    var o = a.Events = {on: function(t, e, i) {
            if (!l(this, "on", t, [e, i]) || !e)
                return this;
            this._events || (this._events = {});
            var r = this._events[t] || (this._events[t] = []);
            r.push({callback: e,context: i,ctx: i || this});
            return this
        },once: function(t, e, i) {
            if (!l(this, "once", t, [e, i]) || !e)
                return this;
            var r = this;
            var s = h.once(function() {
                r.off(t, s);
                e.apply(this, arguments)
            });
            s._callback = e;
            return this.on(t, s, i)
        },off: function(t, e, i) {
            var r, s, n, a, o, u, c, f;
            if (!this._events || !l(this, "off", t, [e, i]))
                return this;
            if (!t && !e && !i) {
                this._events = {};
                return this
            }
            a = t ? [t] : h.keys(this._events);
            for (o = 0, u = a.length; o < u; o++) {
                t = a[o];
                if (n = this._events[t]) {
                    this._events[t] = r = [];
                    if (e || i) {
                        for (c = 0, f = n.length; c < f; c++) {
                            s = n[c];
                            if (e && e !== s.callback && e !== s.callback._callback || i && i !== s.context) {
                                r.push(s)
                            }
                        }
                    }
                    if (!r.length)
                        delete this._events[t]
                }
            }
            return this
        },trigger: function(t) {
            if (!this._events)
                return this;
            var e = s.call(arguments, 1);
            if (!l(this, "trigger", t, e))
                return this;
            var i = this._events[t];
            var r = this._events.all;
            if (i)
                c(i, e);
            if (r)
                c(r, arguments);
            return this
        },stopListening: function(t, e, i) {
            var r = this._listeners;
            if (!r)
                return this;
            var s = !e && !i;
            if (typeof e === "object")
                i = this;
            if (t)
                (r = {})[t._listenerId] = t;
            for (var n in r) {
                r[n].off(e, i, this);
                if (s)
                    delete this._listeners[n]
            }
            return this
        }};
    var u = /\s+/;
    var l = function(t, e, i, r) {
        if (!i)
            return true;
        if (typeof i === "object") {
            for (var s in i) {
                t[e].apply(t, [s, i[s]].concat(r))
            }
            return false
        }
        if (u.test(i)) {
            var n = i.split(u);
            for (var a = 0, h = n.length; a < h; a++) {
                t[e].apply(t, [n[a]].concat(r))
            }
            return false
        }
        return true
    };
    var c = function(t, e) {
        var i, r = -1, s = t.length, n = e[0], a = e[1], h = e[2];
        switch (e.length) {
            case 0:
                while (++r < s)
                    (i = t[r]).callback.call(i.ctx);
                return;
            case 1:
                while (++r < s)
                    (i = t[r]).callback.call(i.ctx, n);
                return;
            case 2:
                while (++r < s)
                    (i = t[r]).callback.call(i.ctx, n, a);
                return;
            case 3:
                while (++r < s)
                    (i = t[r]).callback.call(i.ctx, n, a, h);
                return;
            default:
                while (++r < s)
                    (i = t[r]).callback.apply(i.ctx, e)
        }
    };
    var f = {listenTo: "on",listenToOnce: "once"};
    h.each(f, function(t, e) {
        o[e] = function(e, i, r) {
            var s = this._listeners || (this._listeners = {});
            var n = e._listenerId || (e._listenerId = h.uniqueId("l"));
            s[n] = e;
            if (typeof i === "object")
                r = this;
            e[t](i, r, this);
            return this
        }
    });
    o.bind = o.on;
    o.unbind = o.off;
    h.extend(a, o);
    var d = a.Model = function(t, e) {
        var i;
        var r = t || {};
        e || (e = {});
        this.cid = h.uniqueId("c");
        this.attributes = {};
        h.extend(this, h.pick(e, p));
        if (e.parse)
            r = this.parse(r, e) || {};
        if (i = h.result(this, "defaults")) {
            r = h.defaults({}, r, i)
        }
        this.set(r, e);
        this.changed = {};
        this.initialize.apply(this, arguments)
    };
    var p = ["url", "urlRoot", "collection"];
    h.extend(d.prototype, o, {changed: null,validationError: null,idAttribute: "id",initialize: function() {
        },toJSON: function(t) {
            return h.clone(this.attributes)
        },sync: function() {
            return a.sync.apply(this, arguments)
        },get: function(t) {
            return this.attributes[t]
        },escape: function(t) {
            return h.escape(this.get(t))
        },has: function(t) {
            return this.get(t) != null
        },set: function(t, e, i) {
            var r, s, n, a, o, u, l, c;
            if (t == null)
                return this;
            if (typeof t === "object") {
                s = t;
                i = e
            } else {
                (s = {})[t] = e
            }
            i || (i = {});
            if (!this._validate(s, i))
                return false;
            n = i.unset;
            o = i.silent;
            a = [];
            u = this._changing;
            this._changing = true;
            if (!u) {
                this._previousAttributes = h.clone(this.attributes);
                this.changed = {}
            }
            c = this.attributes, l = this._previousAttributes;
            if (this.idAttribute in s)
                this.id = s[this.idAttribute];
            for (r in s) {
                e = s[r];
                if (!h.isEqual(c[r], e))
                    a.push(r);
                if (!h.isEqual(l[r], e)) {
                    this.changed[r] = e
                } else {
                    delete this.changed[r]
                }
                n ? delete c[r] : c[r] = e
            }
            if (!o) {
                if (a.length)
                    this._pending = true;
                for (var f = 0, d = a.length; f < d; f++) {
                    this.trigger("change:" + a[f], this, c[a[f]], i)
                }
            }
            if (u)
                return this;
            if (!o) {
                while (this._pending) {
                    this._pending = false;
                    this.trigger("change", this, i)
                }
            }
            this._pending = false;
            this._changing = false;
            return this
        },unset: function(t, e) {
            return this.set(t, void 0, h.extend({}, e, {unset: true}))
        },clear: function(t) {
            var e = {};
            for (var i in this.attributes)
                e[i] = void 0;
            return this.set(e, h.extend({}, t, {unset: true}))
        },hasChanged: function(t) {
            if (t == null)
                return !h.isEmpty(this.changed);
            return h.has(this.changed, t)
        },changedAttributes: function(t) {
            if (!t)
                return this.hasChanged() ? h.clone(this.changed) : false;
            var e, i = false;
            var r = this._changing ? this._previousAttributes : this.attributes;
            for (var s in t) {
                if (h.isEqual(r[s], e = t[s]))
                    continue;
                (i || (i = {}))[s] = e
            }
            return i
        },previous: function(t) {
            if (t == null || !this._previousAttributes)
                return null;
            return this._previousAttributes[t]
        },previousAttributes: function() {
            return h.clone(this._previousAttributes)
        },fetch: function(t) {
            t = t ? h.clone(t) : {};
            if (t.parse === void 0)
                t.parse = true;
            var e = this;
            var i = t.success;
            t.success = function(r) {
                if (!e.set(e.parse(r, t), t))
                    return false;
                if (i)
                    i(e, r, t);
                e.trigger("sync", e, r, t)
            };
            R(this, t);
            return this.sync("read", this, t)
        },save: function(t, e, i) {
            var r, s, n, a = this.attributes;
            if (t == null || typeof t === "object") {
                r = t;
                i = e
            } else {
                (r = {})[t] = e
            }
            if (r && (!i || !i.wait) && !this.set(r, i))
                return false;
            i = h.extend({validate: true}, i);
            if (!this._validate(r, i))
                return false;
            if (r && i.wait) {
                this.attributes = h.extend({}, a, r)
            }
            if (i.parse === void 0)
                i.parse = true;
            var o = this;
            var u = i.success;
            i.success = function(t) {
                o.attributes = a;
                var e = o.parse(t, i);
                if (i.wait)
                    e = h.extend(r || {}, e);
                if (h.isObject(e) && !o.set(e, i)) {
                    return false
                }
                if (u)
                    u(o, t, i);
                o.trigger("sync", o, t, i)
            };
            R(this, i);
            s = this.isNew() ? "create" : i.patch ? "patch" : "update";
            if (s === "patch")
                i.attrs = r;
            n = this.sync(s, this, i);
            if (r && i.wait)
                this.attributes = a;
            return n
        },destroy: function(t) {
            t = t ? h.clone(t) : {};
            var e = this;
            var i = t.success;
            var r = function() {
                e.trigger("destroy", e, e.collection, t)
            };
            t.success = function(s) {
                if (t.wait || e.isNew())
                    r();
                if (i)
                    i(e, s, t);
                if (!e.isNew())
                    e.trigger("sync", e, s, t)
            };
            if (this.isNew()) {
                t.success();
                return false
            }
            R(this, t);
            var s = this.sync("delete", this, t);
            if (!t.wait)
                r();
            return s
        },url: function() {
            var t = h.result(this, "urlRoot") || h.result(this.collection, "url") || U();
            if (this.isNew())
                return t;
            return t + (t.charAt(t.length - 1) === "/" ? "" : "/") + encodeURIComponent(this.id)
        },parse: function(t, e) {
            return t
        },clone: function() {
            return new this.constructor(this.attributes)
        },isNew: function() {
            return this.id == null
        },isValid: function(t) {
            return this._validate({}, h.extend(t || {}, {validate: true}))
        },_validate: function(t, e) {
            if (!e.validate || !this.validate)
                return true;
            t = h.extend({}, this.attributes, t);
            var i = this.validationError = this.validate(t, e) || null;
            if (!i)
                return true;
            this.trigger("invalid", this, i, h.extend(e || {}, {validationError: i}));
            return false
        }});
    var v = ["keys", "values", "pairs", "invert", "pick", "omit"];
    h.each(v, function(t) {
        d.prototype[t] = function() {
            var e = s.call(arguments);
            e.unshift(this.attributes);
            return h[t].apply(h, e)
        }
    });
    var g = a.Collection = function(t, e) {
        e || (e = {});
        if (e.url)
            this.url = e.url;
        if (e.model)
            this.model = e.model;
        if (e.comparator !== void 0)
            this.comparator = e.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (t)
            this.reset(t, h.extend({silent: true}, e))
    };
    var m = {add: true,remove: true,merge: true};
    var y = {add: true,merge: false,remove: false};
    h.extend(g.prototype, o, {model: d,initialize: function() {
        },toJSON: function(t) {
            return this.map(function(e) {
                return e.toJSON(t)
            })
        },sync: function() {
            return a.sync.apply(this, arguments)
        },add: function(t, e) {
            return this.set(t, h.defaults(e || {}, y))
        },remove: function(t, e) {
            t = h.isArray(t) ? t.slice() : [t];
            e || (e = {});
            var i, r, s, n;
            for (i = 0, r = t.length; i < r; i++) {
                n = this.get(t[i]);
                if (!n)
                    continue;
                delete this._byId[n.id];
                delete this._byId[n.cid];
                s = this.indexOf(n);
                this.models.splice(s, 1);
                this.length--;
                if (!e.silent) {
                    e.index = s;
                    n.trigger("remove", n, this, e)
                }
                this._removeReference(n)
            }
            return this
        },set: function(t, e) {
            e = h.defaults(e || {}, m);
            if (e.parse)
                t = this.parse(t, e);
            if (!h.isArray(t))
                t = t ? [t] : [];
            var i, s, a, o, u, l;
            var c = e.at;
            var f = this.comparator && c == null && e.sort !== false;
            var d = h.isString(this.comparator) ? this.comparator : null;
            var p = [], v = [], g = {};
            for (i = 0, s = t.length; i < s; i++) {
                if (!(a = this._prepareModel(t[i], e)))
                    continue;
                if (u = this.get(a)) {
                    if (e.remove)
                        g[u.cid] = true;
                    if (e.merge) {
                        u.set(a.attributes, e);
                        if (f && !l && u.hasChanged(d))
                            l = true
                    }
                } else if (e.add) {
                    p.push(a);
                    a.on("all", this._onModelEvent, this);
                    this._byId[a.cid] = a;
                    if (a.id != null)
                        this._byId[a.id] = a
                }
            }
            if (e.remove) {
                for (i = 0, s = this.length; i < s; ++i) {
                    if (!g[(a = this.models[i]).cid])
                        v.push(a)
                }
                if (v.length)
                    this.remove(v, e)
            }
            if (p.length) {
                if (f)
                    l = true;
                this.length += p.length;
                if (c != null) {
                    n.apply(this.models, [c, 0].concat(p))
                } else {
                    r.apply(this.models, p)
                }
            }
            if (l)
                this.sort({silent: true});
            if (e.silent)
                return this;
            for (i = 0, s = p.length; i < s; i++) {
                (a = p[i]).trigger("add", a, this, e)
            }
            if (l)
                this.trigger("sort", this, e);
            return this
        },reset: function(t, e) {
            e || (e = {});
            for (var i = 0, r = this.models.length; i < r; i++) {
                this._removeReference(this.models[i])
            }
            e.previousModels = this.models;
            this._reset();
            this.add(t, h.extend({silent: true}, e));
            if (!e.silent)
                this.trigger("reset", this, e);
            return this
        },push: function(t, e) {
            t = this._prepareModel(t, e);
            this.add(t, h.extend({at: this.length}, e));
            return t
        },pop: function(t) {
            var e = this.at(this.length - 1);
            this.remove(e, t);
            return e
        },unshift: function(t, e) {
            t = this._prepareModel(t, e);
            this.add(t, h.extend({at: 0}, e));
            return t
        },shift: function(t) {
            var e = this.at(0);
            this.remove(e, t);
            return e
        },slice: function(t, e) {
            return this.models.slice(t, e)
        },get: function(t) {
            if (t == null)
                return void 0;
            return this._byId[t.id != null ? t.id : t.cid || t]
        },at: function(t) {
            return this.models[t]
        },where: function(t, e) {
            if (h.isEmpty(t))
                return e ? void 0 : [];
            return this[e ? "find" : "filter"](function(e) {
                for (var i in t) {
                    if (t[i] !== e.get(i))
                        return false
                }
                return true
            })
        },findWhere: function(t) {
            return this.where(t, true)
        },sort: function(t) {
            if (!this.comparator)
                throw new Error("Cannot sort a set without a comparator");
            t || (t = {});
            if (h.isString(this.comparator) || this.comparator.length === 1) {
                this.models = this.sortBy(this.comparator, this)
            } else {
                this.models.sort(h.bind(this.comparator, this))
            }
            if (!t.silent)
                this.trigger("sort", this, t);
            return this
        },sortedIndex: function(t, e, i) {
            e || (e = this.comparator);
            var r = h.isFunction(e) ? e : function(t) {
                return t.get(e)
            };
            return h.sortedIndex(this.models, t, r, i)
        },pluck: function(t) {
            return h.invoke(this.models, "get", t)
        },fetch: function(t) {
            t = t ? h.clone(t) : {};
            if (t.parse === void 0)
                t.parse = true;
            var e = t.success;
            var i = this;
            t.success = function(r) {
                var s = t.reset ? "reset" : "set";
                i[s](r, t);
                if (e)
                    e(i, r, t);
                i.trigger("sync", i, r, t)
            };
            R(this, t);
            return this.sync("read", this, t)
        },create: function(t, e) {
            e = e ? h.clone(e) : {};
            if (!(t = this._prepareModel(t, e)))
                return false;
            if (!e.wait)
                this.add(t, e);
            var i = this;
            var r = e.success;
            e.success = function(s) {
                if (e.wait)
                    i.add(t, e);
                if (r)
                    r(t, s, e)
            };
            t.save(null, e);
            return t
        },parse: function(t, e) {
            return t
        },clone: function() {
            return new this.constructor(this.models)
        },_reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {}
        },_prepareModel: function(t, e) {
            if (t instanceof d) {
                if (!t.collection)
                    t.collection = this;
                return t
            }
            e || (e = {});
            e.collection = this;
            var i = new this.model(t, e);
            if (!i._validate(t, e)) {
                this.trigger("invalid", this, t, e);
                return false
            }
            return i
        },_removeReference: function(t) {
            if (this === t.collection)
                delete t.collection;
            t.off("all", this._onModelEvent, this)
        },_onModelEvent: function(t, e, i, r) {
            if ((t === "add" || t === "remove") && i !== this)
                return;
            if (t === "destroy")
                this.remove(e, r);
            if (e && t === "change:" + e.idAttribute) {
                delete this._byId[e.previous(e.idAttribute)];
                if (e.id != null)
                    this._byId[e.id] = e
            }
            this.trigger.apply(this, arguments)
        }});
    var _ = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
    h.each(_, function(t) {
        g.prototype[t] = function() {
            var e = s.call(arguments);
            e.unshift(this.models);
            return h[t].apply(h, e)
        }
    });
    var w = ["groupBy", "countBy", "sortBy"];
    h.each(w, function(t) {
        g.prototype[t] = function(e, i) {
            var r = h.isFunction(e) ? e : function(t) {
                return t.get(e)
            };
            return h[t](this.models, r, i)
        }
    });
    var b = a.View = function(t) {
        this.cid = h.uniqueId("view");
        this._configure(t || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    };
    var x = /^(\S+)\s*(.*)$/;
    var E = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    h.extend(b.prototype, o, {tagName: "div",$: function(t) {
            return this.$el.find(t)
        },initialize: function() {
        },render: function() {
            return this
        },remove: function() {
            this.$el.remove();
            this.stopListening();
            return this
        },setElement: function(t, e) {
            if (this.$el)
                this.undelegateEvents();
            this.$el = t instanceof a.$ ? t : a.$(t);
            this.el = this.$el[0];
            if (e !== false)
                this.delegateEvents();
            return this
        },delegateEvents: function(t) {
            if (!(t || (t = h.result(this, "events"))))
                return this;
            this.undelegateEvents();
            for (var e in t) {
                var i = t[e];
                if (!h.isFunction(i))
                    i = this[t[e]];
                if (!i)
                    continue;
                var r = e.match(x);
                var s = r[1], n = r[2];
                i = h.bind(i, this);
                s += ".delegateEvents" + this.cid;
                if (n === "") {
                    this.$el.on(s, i)
                } else {
                    this.$el.on(s, n, i)
                }
            }
            return this
        },undelegateEvents: function() {
            this.$el.off(".delegateEvents" + this.cid);
            return this
        },_configure: function(t) {
            if (this.options)
                t = h.extend({}, h.result(this, "options"), t);
            h.extend(this, h.pick(t, E));
            this.options = t
        },_ensureElement: function() {
            if (!this.el) {
                var t = h.extend({}, h.result(this, "attributes"));
                if (this.id)
                    t.id = h.result(this, "id");
                if (this.className)
                    t["class"] = h.result(this, "className");
                var e = a.$("<" + h.result(this, "tagName") + ">").attr(t);
                this.setElement(e, false)
            } else {
                this.setElement(h.result(this, "el"), false)
            }
        }});
    a.sync = function(t, e, i) {
        var r = k[t];
        h.defaults(i || (i = {}), {emulateHTTP: a.emulateHTTP,emulateJSON: a.emulateJSON});
        var s = {type: r,dataType: "json"};
        if (!i.url) {
            s.url = h.result(e, "url") || U()
        }
        if (i.data == null && e && (t === "create" || t === "update" || t === "patch")) {
            s.contentType = "application/json";
            s.data = JSON.stringify(i.attrs || e.toJSON(i))
        }
        if (i.emulateJSON) {
            s.contentType = "application/x-www-form-urlencoded";
            s.data = s.data ? {model: s.data} : {}
        }
        if (i.emulateHTTP && (r === "PUT" || r === "DELETE" || r === "PATCH")) {
            s.type = "POST";
            if (i.emulateJSON)
                s.data._method = r;
            var n = i.beforeSend;
            i.beforeSend = function(t) {
                t.setRequestHeader("X-HTTP-Method-Override", r);
                if (n)
                    return n.apply(this, arguments)
            }
        }
        if (s.type !== "GET" && !i.emulateJSON) {
            s.processData = false
        }
        if (s.type === "PATCH" && window.ActiveXObject && !(window.external && window.external.msActiveXFilteringEnabled)) {
            s.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
        }
        var o = i.xhr = a.ajax(h.extend(s, i));
        e.trigger("request", e, o, i);
        return o
    };
    var k = {create: "POST",update: "PUT",patch: "PATCH","delete": "DELETE",read: "GET"};
    a.ajax = function() {
        return a.$.ajax.apply(a.$, arguments)
    };
    var S = a.Router = function(t) {
        t || (t = {});
        if (t.routes)
            this.routes = t.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var $ = /\((.*?)\)/g;
    var T = /(\(\?)?:\w+/g;
    var H = /\*\w+/g;
    var A = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    h.extend(S.prototype, o, {initialize: function() {
        },route: function(t, e, i) {
            if (!h.isRegExp(t))
                t = this._routeToRegExp(t);
            if (h.isFunction(e)) {
                i = e;
                e = ""
            }
            if (!i)
                i = this[e];
            var r = this;
            a.history.route(t, function(s) {
                var n = r._extractParameters(t, s);
                i && i.apply(r, n);
                r.trigger.apply(r, ["route:" + e].concat(n));
                r.trigger("route", e, n);
                a.history.trigger("route", r, e, n)
            });
            return this
        },navigate: function(t, e) {
            a.history.navigate(t, e);
            return this
        },_bindRoutes: function() {
            if (!this.routes)
                return;
            this.routes = h.result(this, "routes");
            var t, e = h.keys(this.routes);
            while ((t = e.pop()) != null) {
                this.route(t, this.routes[t])
            }
        },_routeToRegExp: function(t) {
            t = t.replace(A, "\\$&").replace($, "(?:$1)?").replace(T, function(t, e) {
                return e ? t : "([^/]+)"
            }).replace(H, "(.*?)");
            return new RegExp("^" + t + "$")
        },_extractParameters: function(t, e) {
            var i = t.exec(e).slice(1);
            return h.map(i, function(t) {
                return t ? decodeURIComponent(t) : null
            })
        }});
    var I = a.History = function() {
        this.handlers = [];
        h.bindAll(this, "checkUrl");
        if (typeof window !== "undefined") {
            this.location = window.location;
            this.history = window.history
        }
    };
    var N = /^[#\/]|\s+$/g;
    var P = /^\/+|\/+$/g;
    var O = /msie [\w.]+/;
    var C = /\/$/;
    I.started = false;
    h.extend(I.prototype, o, {interval: 50,getHash: function(t) {
            var e = (t || this).location.href.match(/#(.*)$/);
            return e ? e[1] : ""
        },getFragment: function(t, e) {
            if (t == null) {
                if (this._hasPushState || !this._wantsHashChange || e) {
                    t = this.location.pathname;
                    var i = this.root.replace(C, "");
                    if (!t.indexOf(i))
                        t = t.substr(i.length)
                } else {
                    t = this.getHash()
                }
            }
            return t.replace(N, "")
        },start: function(t) {
            if (I.started)
                throw new Error("Backbone.history has already been started");
            I.started = true;
            this.options = h.extend({}, {root: "/"}, this.options, t);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var e = this.getFragment();
            var i = document.documentMode;
            var r = O.exec(navigator.userAgent.toLowerCase()) && (!i || i <= 7);
            this.root = ("/" + this.root + "/").replace(P, "/");
            if (r && this._wantsHashChange) {
                this.iframe = a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
                this.navigate(e)
            }
            if (this._hasPushState) {
                a.$(window).on("popstate", this.checkUrl)
            } else if (this._wantsHashChange && "onhashchange" in window && !r) {
                a.$(window).on("hashchange", this.checkUrl)
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval)
            }
            this.fragment = e;
            var s = this.location;
            var n = s.pathname.replace(/[^\/]$/, "$&/") === this.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !n) {
                this.fragment = this.getFragment(null, true);
                this.location.replace(this.root + this.location.search + "#" + this.fragment);
                return true
            } else if (this._wantsPushState && this._hasPushState && n && s.hash) {
                this.fragment = this.getHash().replace(N, "");
                this.history.replaceState({}, document.title, this.root + this.fragment + s.search)
            }
            if (!this.options.silent)
                return this.loadUrl()
        },stop: function() {
            a.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            I.started = false
        },route: function(t, e) {
            this.handlers.unshift({route: t,callback: e})
        },checkUrl: function(t) {
            var e = this.getFragment();
            if (e === this.fragment && this.iframe) {
                e = this.getFragment(this.getHash(this.iframe))
            }
            if (e === this.fragment)
                return false;
            if (this.iframe)
                this.navigate(e);
            this.loadUrl() || this.loadUrl(this.getHash())
        },loadUrl: function(t) {
            var e = this.fragment = this.getFragment(t);
            var i = h.any(this.handlers, function(t) {
                if (t.route.test(e)) {
                    t.callback(e);
                    return true
                }
            });
            return i
        },navigate: function(t, e) {
            if (!I.started)
                return false;
            if (!e || e === true)
                e = {trigger: e};
            t = this.getFragment(t || "");
            if (this.fragment === t)
                return;
            this.fragment = t;
            var i = this.root + t;
            if (this._hasPushState) {
                this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, i)
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, t, e.replace);
                if (this.iframe && t !== this.getFragment(this.getHash(this.iframe))) {
                    if (!e.replace)
                        this.iframe.document.open().close();
                    this._updateHash(this.iframe.location, t, e.replace)
                }
            } else {
                return this.location.assign(i)
            }
            if (e.trigger)
                this.loadUrl(t)
        },_updateHash: function(t, e, i) {
            if (i) {
                var r = t.href.replace(/(javascript:|#).*$/, "");
                t.replace(r + "#" + e)
            } else {
                t.hash = "#" + e
            }
        }});
    a.history = new I;
    var j = function(t, e) {
        var i = this;
        var r;
        if (t && h.has(t, "constructor")) {
            r = t.constructor
        } else {
            r = function() {
                return i.apply(this, arguments)
            }
        }
        h.extend(r, i, e);
        var s = function() {
            this.constructor = r
        };
        s.prototype = i.prototype;
        r.prototype = new s;
        if (t)
            h.extend(r.prototype, t);
        r.__super__ = i.prototype;
        return r
    };
    d.extend = g.extend = S.extend = b.extend = I.extend = j;
    var U = function() {
        throw new Error('A "url" property or function must be specified')
    };
    var R = function(t, e) {
        var i = e.error;
        e.error = function(r) {
            if (i)
                i(t, r, e);
            t.trigger("error", t, r, e)
        }
    }
}).call(this);
