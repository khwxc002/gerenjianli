!function(t, s) {
    function n(s, n) {
        var i = this;
        i.el = s, i.$el = t(s), i.settings = t.extend({}, e, n), i._defaults = e, i.timeTo = i.settings.timeTo || new Date(i.$el.data("time-to")) || new Date, i.countDown = i.settings.countDown || parseInt(i.$el.data("countdown"), 10) || 0, i._name = a, i.init()
    }
    var a = "MiniCounter", e = {tpl: '<i class="mc-num-days"><%=days %></i><span class="mc-text">天</span><i class="mc-num-hours"><%=hours %></i><span class="mc-text">小时</span><i class="mc-num-minutes"><%=minutes %></i><span class="mc-text">分</span><i class="mc-num-seconds"><%=seconds %></i><span class="mc-text">秒</span>',timeTo: null,countDown: null,callback: null};
    n.prototype = {init: function() {
            var t = this;
            t.start(), console.log("xD")
        },start: function() {
            var t = this, s = 0;
            if (t.countDown > 0)
                s = 1e3 * t.countDown;
            else
                var n = t.timeTo, a = n.getTime(), e = (new Date).getTime(), s = a - e;
            s > 0 && t.timeExact(s)
        },stop: function() {
            var t = this;
            s.clearTimeout(t.timer), t.timer = null
        },updateCounter: function(t) {
            var s = this, n = '<i class="mc-num-minutes">' + t.minutes + '</i><span class="mc-text">分</span><i class="mc-num-seconds">' + t.seconds + '</i><span class="mc-text">秒</span>';
            t.days > 0 ? n = '<i class="mc-num-days">' + t.days + '</i><span class="mc-text">天</span><i class="mc-num-hours">' + t.hours + '</i><span class="mc-text">小时</span>' + n : t.hours > 0 && (n = '<i class="mc-num-hours">' + t.hours + '</i><span class="mc-text">小时</span>' + n), s.$el.html(n)
        },timeExact: function(t) {
            var n = this, a = 864e5, e = t, i = e / a, c = Math.floor(i), o = 24 * (i - c), u = Math.floor(o), m = 60 * (o - u), l = Math.floor(m), r = 60 * (m - l), p = Math.floor(r), h = {days: c,hours: u,minutes: l,seconds: p}, d = n.settings.callback;
            0 > c ? d && "function" == typeof d && d(h) : (n.updateCounter(h), n.timer = s.setTimeout(function() {
                n.timeExact(e - 200)
            }, 200))
        }}, t.fn[a] = function(s) {
        return this.each(function() {
            t(this).data("plugin_" + a) || t(this).data("plugin_" + a, new n(this, s))
        })
    }
}($, window, document);
