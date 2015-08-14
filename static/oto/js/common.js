//
+ function(e) {
    e.fn.hoverIntent = function(t, n, a, o) {
        var i = {
            interval: o || 400,
            sensitivity: 5,
            timeout: 600
        };
        i = "object" == typeof t ? e.extend(i, t) : e.isFunction(n) ? e.extend(i, {
            over: t,
            out: n,
            selector: a
        }) : e.extend(i, {
            over: t,
            out: t,
            selector: n
        });
        var r, l, s, d, c = function(e) {
                r = e.pageX, l = e.pageY
            },
            u = function(t, n) {
                return n.hoverIntent_t = clearTimeout(n.hoverIntent_t), Math.sqrt((s - r) * (s - r) + (d - l) * (d - l)) < i.sensitivity ? (e(n).off("mousemove.hoverIntent", c), n.hoverIntent_s = !0, i.over.apply(n, [t])) : (s = r, d = l, n.hoverIntent_t = setTimeout(function() {
                    u(t, n)
                }, i.interval), void 0)
            },
            p = function(e, t) {
                return t.hoverIntent_t = clearTimeout(t.hoverIntent_t), t.hoverIntent_s = !1, i.out.apply(t, [e])
            },
            f = function(t) {
                var n = e.extend({}, t),
                    a = this;
                a.hoverIntent_t && (a.hoverIntent_t = clearTimeout(a.hoverIntent_t)), "mouseenter" === t.type ? (s = n.pageX, d = n.pageY, e(a).on("mousemove.hoverIntent", c), a.hoverIntent_s || (a.hoverIntent_t = setTimeout(function() {
                    u(n, a)
                }, i.interval))) : (e(a).off("mousemove.hoverIntent", c), a.hoverIntent_s && (a.hoverIntent_t = setTimeout(function() {
                    p(n, a)
                }, i.timeout)))
            };
        return this.on({
            "mouseenter.hoverIntent": f,
            "mouseleave.hoverIntent": f
        }, i.selector)
    }
}(jQuery);

//
+ function(e) {
    return function() {
        var t;
        return t || e.$.fn.hoverIntent
    }
}(this);

//
$(document).scroll(function() {
    $(this).scrollTop() > 720 ? $("#backtop").removeClass("hidden") : $("#backtop").addClass("hidden")
});

//
$("#backtop").click(function() {
    return $("body,html").animate({
        scrollTop: 0
    }), !1
});

$(".hoverDropdown").hoverIntent(function() {
    $(this).hasClass("open") || $(this).find(".dropdownBtn").dropdown("toggle")
}, function() {
    $(this).hasClass("open") && $(this).find(".dropdownBtn").dropdown("toggle")
}, null, 1);

//
$(".dropdownBtn").click(function(e) {
    var t;
    $(this).parent(".hoverDropdown").hasClass("open") && (e.preventDefault(), t = $(this).attr("href"), e.ctrlKey || e.metaKey ? window.open(t) : location.href = t)
});

//
$("#searchBox").focus(function() {
    var e;
    e = $(".nav .menu").width() + 180 + "px", $(".nav .menu").hide(), $(this).animate({
        width: e
    }, 200)
});

//
$("#searchBox").blur(function() {
    $(this).animate({
        width: "180px"
    }, 200, "swing", function() {
        $(".nav .menu").show()
    })
});
