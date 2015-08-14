define("template", ["jquery"], function(e) {
        return function(t, n) {
            var o;
            return o = t || "", e.each(n, function(t, n) {
                var a, i;
                a = typeof n, i = new RegExp("{{\\s*" + t + "\\s*}}", "g"), "object" === a && null !== n ? e.each(n, function(e, n) {
                    var a;
                    a = new RegExp("{{\\s*" + t + "." + e + "\\s*}}", "g"), o = o.replace(a, n)
                }) : o = o.replace(i, n)
            }), o
        }
    }), define("sfModal", ["jquery", "template"], function(e, t) {
        return function(n) {
            var o, a;
            if ("object" != typeof n) {
                if ("hide" === n) return void e(".sfmodal").modal("hide");
                if ("toggle" === n) return void e(".sfmodal").modal("toggle");
                n = {
                    content: n,
                    hideDone: !0
                }
            }
            o = e.extend({
                hideTitle: !1,
                hideFooter: !1,
                modalSize: "",
                title: "警告：前方高能！",
                content: "玩脱了",
                wrapper: null,
                $content: null,
                hideClose: !1,
                closeText: "取消",
                closeClass: "btn-default",
                hideDone: !1,
                doneText: "确认",
                doneClass: "btn-primary",
                doneFn: function() {
                    e(".sfmodal").modal("hide")
                },
                show: function() {},
                shown: function() {},
                hide: function() {},
                hidden: function() {},
                loaded: function() {}
            }, n), a = '<div class="sfmodal modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">  <div class="modal-dialog {{modalSize}}">    <div class="modal-content">      ' + (o.hideTitle ? "" : '<div class="modal-header">        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>        <h4 class="modal-title">{{title}}</h4>      </div>') + '<div class="modal-body">        <p class="sfModal-content">          </div>          <div class="modal-footer ' + (o.hideFooter ? "hidden" : "") + '">' + (o.hideClose ? "" : '<button type="button" class="btn {{closeClass}}" data-dismiss="modal">{{closeText}}</button>') + (o.hideDone ? "" : '<button type="button" class="btn {{doneClass}} done-btn">{{doneText}}</button>') + "</div>        </div>      </div>    </div>", e(".sfmodal").length > 0 && (e(".sfmodal").remove(), e(".modal-backdrop").remove()), o.wrapper ? (e(o.wrapper).append(t(a, o)), e(o.wrapper).append('<div class="modal-backdrop in"></div>')) : e("body").append(t(a, o)), o.$content ? e(".sfmodal .sfModal-content").append(o.$content) : e(".sfmodal .sfModal-content").html(o.content), e(".sfmodal").modal({
                keyboard: !0
            }), e(".sfmodal").on("show.bs.modal", o.show).on("shown.bs.modal", o.shown).on("hide.bs.modal", function(t) {
                o.hide(t), o.wrapper && e(".modal-backdrop").remove()
            }).on("hidden.bs.modal", o.hidden).on("loaded.bs.modal", o.loaded).modal("show"), e(".sfmodal .done-btn").click(function(t) {
                o.doneFn(t), o.wrapper && e(".modal-backdrop").remove()
            })
        }
    }), define("mobile", ["jquery"], function(e) {
        return window.innerWidth > 767 ? {
            login: null,
            signup: null
        } : (e(".hate, .like").data("toggle", "false"), {
            login: function() {
                location.href = "/user/login"
            },
            signup: function() {
                location.href = "/user/register"
            }
        })
    }),
    function(e) {
        e.fn.hoverIntent = function(t, n, o, a) {
            var i = {
                interval: a || 400,
                sensitivity: 5,
                timeout: 600
            };
            i = "object" == typeof t ? e.extend(i, t) : e.isFunction(n) ? e.extend(i, {
                over: t,
                out: n,
                selector: o
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
                        o = this;
                    o.hoverIntent_t && (o.hoverIntent_t = clearTimeout(o.hoverIntent_t)), "mouseenter" === t.type ? (s = n.pageX, d = n.pageY, e(o).on("mousemove.hoverIntent", c), o.hoverIntent_s || (o.hoverIntent_t = setTimeout(function() {
                        u(n, o)
                    }, i.interval))) : (e(o).off("mousemove.hoverIntent", c), o.hoverIntent_s && (o.hoverIntent_t = setTimeout(function() {
                        p(n, o)
                    }, i.timeout)))
                };
            return this.on({
                "mouseenter.hoverIntent": f,
                "mouseleave.hoverIntent": f
            }, i.selector)
        }
    }(jQuery), define("jquery_hoverIntent", ["jquery"], function(e) {
        return function() {
            var t;
            return t || e.$.fn.hoverIntent
        }
    }(this)), define("sfAjax", ["jquery"], function(e) {
        e.sfAjax = function(t, n, o, a) {
            var i, r, l, s;
            r = e.extend({
                id: t.data("id"),
                "do": t.data("do"),
                type: t.data("type")
            }, o), i = r["do"], l = i.indexOf("/cancel") > 0 ? i.replace("/cancel", "") : i + "/cancel", s = "/api/" + r.type + "/" + r.id + "/" + r["do"], e.post(s, function(e) {
                0 === e.status ? (t.data("do", l), n ? n(e) : location.reload()) : a && a(e)
            })
        }
    }),
    function(e) {
        "function" == typeof define && define.amd ? define("jquery_cookie", ["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
    }(function(e) {
        function t(e) {
            return l.raw ? e : encodeURIComponent(e)
        }

        function n(e) {
            return l.raw ? e : decodeURIComponent(e)
        }

        function o(e) {
            return t(l.json ? JSON.stringify(e) : String(e))
        }

        function a(e) {
            0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return e = decodeURIComponent(e.replace(r, " ")), l.json ? JSON.parse(e) : e
            } catch (t) {}
        }

        function i(t, n) {
            var o = l.raw ? t : a(t);
            return e.isFunction(n) ? n(o) : o
        }
        var r = /\+/g,
            l = e.cookie = function(a, r, s) {
                if (void 0 !== r && !e.isFunction(r)) {
                    if (s = e.extend({}, l.defaults, s), "number" == typeof s.expires) {
                        var d = s.expires,
                            c = s.expires = new Date;
                        c.setTime(+c + 864e5 * d)
                    }
                    return document.cookie = [t(a), "=", o(r), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("")
                }
                for (var u = a ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], f = 0, h = p.length; h > f; f++) {
                    var m = p[f].split("="),
                        v = n(m.shift()),
                        g = m.join("=");
                    if (a && a === v) {
                        u = i(g, r);
                        break
                    }
                    a || void 0 === (g = i(g)) || (u[v] = g)
                }
                return u
            };
        l.defaults = {}, e.removeCookie = function(t, n) {
            return void 0 === e.cookie(t) ? !1 : (e.cookie(t, "", e.extend({}, n, {
                expires: -1
            })), !e.cookie(t))
        }
    }),
    function(e, t, n, o) {
        var a = e(t);
        e.fn.lazyload = function(i) {
            function r() {
                var t = 0;
                s.each(function() {
                    var n = e(this);
                    if (!d.skip_invisible || n.is(":visible"))
                        if (e.abovethetop(this, d) || e.leftofbegin(this, d));
                        else if (e.belowthefold(this, d) || e.rightoffold(this, d)) {
                        if (++t > d.failure_limit) return !1
                    } else n.trigger("appear"), t = 0
                })
            }
            var l, s = this,
                d = {
                    threshold: 0,
                    failure_limit: 0,
                    event: "scroll",
                    effect: "show",
                    container: t,
                    data_attribute: "original",
                    skip_invisible: !0,
                    appear: null,
                    load: null,
                    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
                };
            return i && (o !== i.failurelimit && (i.failure_limit = i.failurelimit, delete i.failurelimit), o !== i.effectspeed && (i.effect_speed = i.effectspeed, delete i.effectspeed), e.extend(d, i)), l = d.container === o || d.container === t ? a : e(d.container), 0 === d.event.indexOf("scroll") && l.bind(d.event, function() {
                return r()
            }), this.each(function() {
                var t = this,
                    n = e(t);
                t.loaded = !1, (n.attr("src") === o || n.attr("src") === !1) && n.is("img") && n.attr("src", d.placeholder), n.one("appear", function() {
                    if (!this.loaded) {
                        if (d.appear) {
                            var o = s.length;
                            d.appear.call(t, o, d)
                        }
                        e("<img />").bind("load", function() {
                            var o = n.attr("data-" + d.data_attribute);
                            n.hide(), n.is("img") ? n.attr("src", o) : n.css("background-image", "url('" + o + "')"), n[d.effect](d.effect_speed), t.loaded = !0;
                            var a = e.grep(s, function(e) {
                                return !e.loaded
                            });
                            if (s = e(a), d.load) {
                                var i = s.length;
                                d.load.call(t, i, d)
                            }
                        }).attr("src", n.attr("data-" + d.data_attribute))
                    }
                }), 0 !== d.event.indexOf("scroll") && n.bind(d.event, function() {
                    t.loaded || n.trigger("appear")
                })
            }), a.bind("resize", function() {
                r()
            }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && a.bind("pageshow", function(t) {
                t.originalEvent && t.originalEvent.persisted && s.each(function() {
                    e(this).trigger("appear")
                })
            }), e(n).ready(function() {
                r()
            }), this
        }, e.belowthefold = function(n, i) {
            var r;
            return r = i.container === o || i.container === t ? (t.innerHeight ? t.innerHeight : a.height()) + a.scrollTop() : e(i.container).offset().top + e(i.container).height(), r <= e(n).offset().top - i.threshold
        }, e.rightoffold = function(n, i) {
            var r;
            return r = i.container === o || i.container === t ? a.width() + a.scrollLeft() : e(i.container).offset().left + e(i.container).width(), r <= e(n).offset().left - i.threshold
        }, e.abovethetop = function(n, i) {
            var r;
            return r = i.container === o || i.container === t ? a.scrollTop() : e(i.container).offset().top, r >= e(n).offset().top + i.threshold + e(n).height()
        }, e.leftofbegin = function(n, i) {
            var r;
            return r = i.container === o || i.container === t ? a.scrollLeft() : e(i.container).offset().left, r >= e(n).offset().left + i.threshold + e(n).width()
        }, e.inviewport = function(t, n) {
            return !(e.rightoffold(t, n) || e.leftofbegin(t, n) || e.belowthefold(t, n) || e.abovethetop(t, n))
        }, e.extend(e.expr[":"], {
            "below-the-fold": function(t) {
                return e.belowthefold(t, {
                    threshold: 0
                })
            },
            "above-the-top": function(t) {
                return !e.belowthefold(t, {
                    threshold: 0
                })
            },
            "right-of-screen": function(t) {
                return e.rightoffold(t, {
                    threshold: 0
                })
            },
            "left-of-screen": function(t) {
                return !e.rightoffold(t, {
                    threshold: 0
                })
            },
            "in-viewport": function(t) {
                return e.inviewport(t, {
                    threshold: 0
                })
            },
            "above-the-fold": function(t) {
                return !e.belowthefold(t, {
                    threshold: 0
                })
            },
            "right-of-fold": function(t) {
                return e.rightoffold(t, {
                    threshold: 0
                })
            },
            "left-of-fold": function(t) {
                return !e.rightoffold(t, {
                    threshold: 0
                })
            }
        })
    }(jQuery, window, document), define("jquery_lazyload", ["jquery"], function(e) {
        return function() {
            var t;
            return t || e.$.fn.lazyload
        }
    }(this)),
    function(e) {
        function t(t, n, o, a) {
            var i = {
                data: a || 0 === a || a === !1 ? a : n ? n.data : {},
                _wrap: n ? n._wrap : null,
                tmpl: null,
                parent: n || null,
                nodes: [],
                calls: d,
                nest: c,
                wrap: u,
                html: p,
                update: f
            };
            return t && e.extend(i, t, {
                nodes: [],
                parent: n
            }), o && (i.tmpl = o, i._ctnt = i._ctnt || i.tmpl(e, i), i.key = ++w, (_.length ? b : $)[w] = i), i
        }

        function n(t, a, i) {
            var r, l = i ? e.map(i, function(e) {
                return "string" == typeof e ? t.key ? e.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + v + '="' + t.key + '" $2') : e : n(e, t, e._ctnt)
            }) : t;
            return a ? l : (l = l.join(""), l.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(t, n, a, i) {
                r = e(a).get(), s(r), n && (r = o(n).concat(r)), i && (r = r.concat(o(i)))
            }), r ? r : o(l))
        }

        function o(t) {
            var n = document.createElement("div");
            return n.innerHTML = t, e.makeArray(n.childNodes)
        }

        function a(t) {
            return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + e.trim(t).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(t, n, o, a, i, l, s) {
                var d, c, u, p = e.tmpl.tag[o];
                if (!p) throw "Unknown template tag: " + o;
                return d = p._default || [], l && !/\w$/.test(i) && (i += l, l = ""), i ? (i = r(i), s = s ? "," + r(s) + ")" : l ? ")" : "", c = l ? i.indexOf(".") > -1 ? i + r(l) : "(" + i + ").call($item" + s : i, u = l ? c : "(typeof(" + i + ")==='function'?(" + i + ").call($item):(" + i + "))") : u = c = d.$1 || "null", a = r(a), "');" + p[n ? "close" : "open"].split("$notnull_1").join(i ? "typeof(" + i + ")!=='undefined' && (" + i + ")!=null" : "true").split("$1a").join(u).split("$1").join(c).split("$2").join(a || d.$2 || "") + "__.push('"
            }) + "');}return __;")
        }

        function i(t, o) {
            t._wrap = n(t, !0, e.isArray(o) ? o : [g.test(o) ? o : e(o).html()]).join("")
        }

        function r(e) {
            return e ? e.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
        }

        function l(e) {
            var t = document.createElement("div");
            return t.appendChild(e.cloneNode(!0)), t.innerHTML
        }

        function s(n) {
            function o(n) {
                function o(e) {
                    e += d, r = c[e] = c[e] || t(r, $[r.parent.key + d] || r.parent)
                }
                var a, i, r, l, s = n;
                if (l = n.getAttribute(v)) {
                    for (; s.parentNode && 1 === (s = s.parentNode).nodeType && !(a = s.getAttribute(v)););
                    a !== l && (s = s.parentNode ? 11 === s.nodeType ? 0 : s.getAttribute(v) || 0 : 0, (r = $[l]) || (r = b[l], r = t(r, $[s] || b[s]), r.key = ++w, $[w] = r), k && o(l)), n.removeAttribute(v)
                } else k && (r = e.data(n, "tmplItem")) && (o(r.key), $[r.key] = r, s = e.data(n.parentNode, "tmplItem"), s = s ? s.key : 0);
                if (r) {
                    for (i = r; i && i.key != s;) i.nodes.push(n), i = i.parent;
                    delete r._ctnt, delete r._wrap, e.data(n, "tmplItem", r)
                }
            }
            var a, i, r, l, s, d = "_" + k,
                c = {};
            for (r = 0, l = n.length; l > r; r++)
                if (1 === (a = n[r]).nodeType) {
                    for (i = a.getElementsByTagName("*"), s = i.length - 1; s >= 0; s--) o(i[s]);
                    o(a)
                }
        }

        function d(e, t, n, o) {
            return e ? void _.push({
                _: e,
                tmpl: t,
                item: this,
                data: n,
                options: o
            }) : _.pop()
        }

        function c(t, n, o) {
            return e.tmpl(e.template(t), n, o, this)
        }

        function u(t, n) {
            var o = t.options || {};
            return o.wrapped = n, e.tmpl(e.template(t.tmpl), t.data, o, t.item)
        }

        function p(t, n) {
            var o = this._wrap;
            return e.map(e(e.isArray(o) ? o.join("") : o).filter(t || "*"), function(e) {
                return n ? e.innerText || e.textContent : e.outerHTML || l(e)
            })
        }

        function f() {
            var t = this.nodes;
            e.tmpl(null, null, null, this).insertBefore(t[0]), e(t).remove()
        }
        var h, m = e.fn.domManip,
            v = "_tmplitem",
            g = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
            $ = {},
            b = {},
            y = {
                key: 0,
                data: {}
            },
            w = 0,
            k = 0,
            _ = [];
        e.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, n) {
            e.fn[t] = function(o) {
                var a, i, r, l, s = [],
                    d = e(o),
                    c = 1 === this.length && this[0].parentNode;
                if (h = $ || {}, c && 11 === c.nodeType && 1 === c.childNodes.length && 1 === d.length) d[n](this[0]), s = this;
                else {
                    for (i = 0, r = d.length; r > i; i++) k = i, a = (i > 0 ? this.clone(!0) : this).get(), e(d[i])[n](a), s = s.concat(a);
                    k = 0, s = this.pushStack(s, t, d.selector)
                }
                return l = h, h = null, e.tmpl.complete(l), s
            }
        }), e.fn.extend({
            tmpl: function(t, n, o) {
                return e.tmpl(this[0], t, n, o)
            },
            tmplItem: function() {
                return e.tmplItem(this[0])
            },
            template: function(t) {
                return e.template(t, this[0])
            },
            domManip: function(t, n, o) {
                if (t[0] && e.isArray(t[0])) {
                    for (var a, i = e.makeArray(arguments), r = t[0], l = r.length, s = 0; l > s && !(a = e.data(r[s++], "tmplItem")););
                    a && k && (i[2] = function(t) {
                        e.tmpl.afterManip(this, t, o)
                    }), m.apply(this, i)
                } else m.apply(this, arguments);
                return k = 0, !h && e.tmpl.complete($), this
            }
        }), e.extend({
            tmpl: function(o, a, r, l) {
                var s, d = !l;
                if (d) l = y, o = e.template[o] || e.template(null, o), b = {};
                else if (!o) return o = l.tmpl, $[l.key] = l, l.nodes = [], l.wrapped && i(l, l.wrapped), e(n(l, null, l.tmpl(e, l)));
                return o ? ("function" == typeof a && (a = a.call(l || {})), r && r.wrapped && i(r, r.wrapped), s = e.isArray(a) ? e.map(a, function(e) {
                    return e ? t(r, l, o, e) : null
                }) : [t(r, l, o, a)], d ? e(n(l, null, s)) : s) : []
            },
            tmplItem: function(t) {
                var n;
                for (t instanceof e && (t = t[0]); t && 1 === t.nodeType && !(n = e.data(t, "tmplItem")) && (t = t.parentNode););
                return n || y
            },
            template: function(t, n) {
                return n ? ("string" == typeof n ? n = a(n) : n instanceof e && (n = n[0] || {}), n.nodeType && (n = e.data(n, "tmpl") || e.data(n, "tmpl", a(n.innerHTML))), "string" == typeof t ? e.template[t] = n : n) : t ? "string" != typeof t ? e.template(null, t) : e.template[t] || e.template(null, g.test(t) ? t : e(t)) : null
            },
            encode: function(e) {
                return ("" + e).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
            }
        }), e.extend(e.tmpl, {
            tag: {
                tmpl: {
                    _default: {
                        $2: "null"
                    },
                    open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
                },
                wrap: {
                    _default: {
                        $2: "null"
                    },
                    open: "$item.calls(__,$1,$2);__=[];",
                    close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
                },
                each: {
                    _default: {
                        $2: "$index, $value"
                    },
                    open: "if($notnull_1){$.each($1a,function($2){with(this){",
                    close: "}});}"
                },
                "if": {
                    open: "if(($notnull_1) && $1a){",
                    close: "}"
                },
                "else": {
                    _default: {
                        $1: "true"
                    },
                    open: "}else if(($notnull_1) && $1a){"
                },
                html: {
                    open: "if($notnull_1){__.push($1a);}"
                },
                "=": {
                    _default: {
                        $1: "$data"
                    },
                    open: "if($notnull_1){__.push($.encode($1a));}"
                },
                "!": {
                    open: ""
                }
            },
            complete: function() {
                $ = {}
            },
            afterManip: function(t, n, o) {
                var a = 11 === n.nodeType ? e.makeArray(n.childNodes) : 1 === n.nodeType ? [n] : [];
                o.call(t, n), s(a), k++
            }
        })
    }(jQuery), define("jquery_tmpl", ["jquery"], function(e) {
        return function() {
            var t;
            return t || e.$.fn.tmpl
        }
    }(this)), define("typeHelper", ["jquery", "jquery_tmpl"], function(e) {
        var t, n, o, a, i, r, l, s;
        l = '<ul class="dropdown-menu" role="menu"></ul>', a = void 0, t = void 0, o = void 0, n = void 0, i = void 0, r = ["gmail.com", "qq.com", "163.com", "hotmail.com", "sina.com", "126.com", "live.com", "live.cn", "vip.sina.com", "vip.qq.com", "sina.cn", "sohu.com", "139.com", "wo.com.cn", "189.cn", "21cn.com"], s = '<button class="btn btn-default result" type="button">${result}</button><a href="#" class="i-cancel ml10 delete-result">&times;</a>', e.fn.typeHelper = function(d) {
            a = e.extend({
                data: null,
                tpl: '<li><a href="#" data-value="${name}">${name}</a></li>',
                defaultList: [],
                showNum: 5,
                remoteData: null,
                submitKey: null,
                onlyResult: !0,
                autoSelect: !0,
                emailMode: !1,
                insertHandler: function() {}
            }, d), n = e(this), 0 !== n.length && (n.after(e("<div></div>").addClass("typehelper")).siblings(".typehelper").append(n), t = n.parent().css("position", "relative"), e.tmpl(l).insertAfter(n), o = t.find("ul").hide().css("minWidth", n.outerWidth()), e.each(a.defaultList, function(t, n) {
                e.tmpl(a.tpl, n).appendTo(o)
            }), n.on("focus", function() {
                a.defaultList.length > 0 && e(this).parent().trigger("show.typehelper")
            }), n.on("input", function() {
                e(this).parent().trigger("search.typehelper"), e(this).parent().trigger("show.typehelper")
            }), n.on("keydown", function(t) {
                e(this).parent().trigger("select.typehelper", t)
            }), o.delegate("li", "mouseover", function() {
                e(this).siblings("li").removeClass("active"), e(this).addClass("active")
            }), n.on("blur", function() {
                e(this).parent().trigger("hide.typehelper"), a.autoSelect && (e(this).siblings("ul").find(".active").length > 0 ? e(this).parent().trigger("insert.typehelper", o.find(".active a")) : e(this).val(""))
            }), t.on("show.typehelper", function() {
                e(this).find("ul").show()
            }), t.on("hide.typehelper", function() {
                e(this).find("ul").hide()
            }), t.on("insert.typehelper", function(i, r) {
                t = e(this), n = t.find("input"), o = t.find("ul"), n.val(e(r).data("value")), e(".result", t).length > 0 && (e(".result", t).remove(), t.find(".delete-result").remove()), a.onlyResult && (n.hide(), o.after(e.tmpl(s, {
                    result: n.val()
                })), a.submitKey && n.data(a.submitKey, e(r).data(a.submitKey)), t.find(".result").on("click", function() {
                    e(this).siblings(".delete-result").remove(), e(this).remove(), n.show().focus(), t.trigger("search.typehelper")
                }), t.find(".delete-result").on("click", function() {
                    return e(this).siblings(".result").remove(), e(this).remove(), n.val("").show(), !1
                })), t.parents(".form-group").next(".form-group").find("input").focus(), a.insertHandler(e(r).data("value"))
            }), t.on("select.typehelper", function(a, i) {
                var r, l, s, d;
                if (t = e(this), n = t.find("input"), o = t.find("ul"), r = o.find("li"), i) switch (i.keyCode) {
                    case 38:
                        i.preventDefault(), r.length && (o.find(".active").length ? o.find(".active").removeClass("active").prev("li").addClass("active") : r.last().addClass("active"));
                        break;
                    case 40:
                        i.preventDefault(), r.length && (o.find(".active").length ? o.find(".active").removeClass("active").next("li").addClass("active") : r.first().addClass("active"));
                        break;
                    case 13:
                        if (i.stopPropagation(), i.preventDefault(), o.find(".active").length <= 0) return;
                        t.trigger("insert.typehelper", o.find(".active a")), t.trigger("hide.typehelper");
                        break;
                    case 9:
                        l = e(this).parents("form").find("input"), s = l.index(e("input:focus")), -1 !== s && (d = l.slice(s + 1), d.length && d.each(function() {
                            var t, n;
                            return n = e(this).attr("type"), t = ["text", "email", "password", "url"], e(this).val() || -1 === t.indexOf(n) ? void 0 : (e(this).focus(), !1)
                        }));
                        break;
                    case 27:
                        i.preventDefault();
                        break;
                    default:
                        return
                }
            }), t.on("search.typehelper", function() {
                var l, s, d, c;
                if (t = e(this), n = t.find("input"), o = t.find("ul"), n.val().length)
                    if (d = [], a.remoteData) a.remoteData(n.val(), function(t) {
                        d = t, d.length > 0 && (o.children().remove(), e.tmpl(a.tpl, d).appendTo(o), 1 === d.length && o.children().first().addClass("active"))
                    });
                    else {
                        for (c = 0, a.emailMode && (a.data = [{
                                name: n.val()
                            }], e.each(r, function(e, t) {
                                a.data.push({
                                    name: n.val().replace(/@.*$/, "") + "@" + t
                                })
                            })), i = a.data.length, s = 0; i > s && (l = a.data[s], !(0 === l.name.toLowerCase().indexOf(n.val().toLowerCase()) && (d.push(l), c++, c >= a.showNum)));) s++;
                        d.length > 0 && (o.children().remove(), e.tmpl(a.tpl, d).appendTo(o), (1 === d.length || a.emailMode) && o.children().first().addClass("active"))
                    }
            }), n.val().length > 0 && t.trigger("insert.typehelper", n))
        }
    }), define("main", ["sfModal", "mobile", "jquery_hoverIntent", "sfAjax", "bootstrap", "jquery_cookie", "jquery_lazyload", "typeHelper"], function(e, t) {
        var n, o, a, i, r, l, s, d, c;
        return i = function(e) {
            var t, n;
            switch (n = "", t = new Date(e), t.getDay()) {
                case 0:
                    n = "周日";
                    break;
                case 1:
                    n = "周一";
                    break;
                case 2:
                    n = "周二";
                    break;
                case 3:
                    n = "周三";
                    break;
                case 4:
                    n = "周四";
                    break;
                case 5:
                    n = "周五";
                    break;
                case 6:
                    n = "周六"
            }
            return n
        }, o = function() {
            $.getJSON("/api/user/stat", function(e) {
                var t;
                0 === e.status && (t = $("title"), e.data.events > 0 ? (e.data.events > 99 && (e.data.events = "99+"), $("#messageCount").siblings(".has-unread__count").remove(), $("#messageCount").after('<span class="has-unread__count">' + e.data.events + "</span>"), $("#m-messageCount").text(e.data.events), $(".mobile-menu__unreadpoint").show(), t.text(/^\(\d+[\+]?\)/.test(t.text()) ? t.text().replace(/^\(\d+[\+]?\)/, "(" + e.data.events + ")") : "(" + e.data.events + ")" + $("title").text())) : 0 === e.data.events && ($(".has-unread__count").remove(), t.text(t.text().replace(/^\(\d+[\+]?\)/, ""))), 0 !== e.data.drafts && ($("#draftCount .badge").remove(), $("#draftCount").append('<span class="badge">' + e.data.drafts + "</span>")), 0 !== e.data.invites && ($("#inviteCount .badge").remove(), $("#inviteCount").append('<span class="badge">' + e.data.invites + "</span>")))
            })
        }, l = function() {
            e({
                modalSize: "modal-lg",
                title: "登录",
                doneText: "登陆",
                hideClose: !0,
                hideDone: !0,
                hideFooter: !0,
                content: $("#loginModal").text(),
                show: function() {
                    $("[name=mail]").first().focus(), $("#loginShowMore").click(function(e) {
                        e.preventDefault(), $(this).hide(), $(this).siblings().removeClass("hidden")
                    }), $(".sfmodal .widget-login a").click(function(e) {
                        e.preventDefault(), window.open($(this).attr("href"), "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500")
                    }), $("#loginReloadCaptcha").click(function() {
                        $(this).find("img").attr("src", "/user/captcha?w=240&h=50")
                    }), $(".register-mail").typeHelper({
                        emailMode: !0,
                        onlyResult: !1
                    })
                }
            })
        }, $(".addWeek").each(function() {
            $(this).append(" " + i($(this).html()))
        }), $('[data-toggle="tooltip"]').tooltip({
            container: "body"
        }), $("img.lazy").lazyload({
            effect: "fadeIn"
        }), window.oauthLogin = function() {
            -1 !== location.hostname.indexOf("segmentfault") ? location.reload() : location.href = "/"
        }, window.oauthRegister = function() {
            location.href = "/user/bind"
        }, n = {
            _: window.SF.token,
            staticUrl: window.SF.staticUrl,
            userId: $("#SFUserId").attr("value"),
            userRank: $("#SFUserRank").attr("value"),
            getMessage: o,
            login: t.login || l
        }, $(document).ajaxError(function(e, t, n) {
            413 === t.status ? ($("#uploading") && $("#uploading").text(""), alert("文件太大！")) : console.log("Ajax " + t.status + ": ", n.url)
        }), $(document).ajaxSend(function(e, t, o) {
            o.url = -1 === o.url.indexOf("?") ? o.url + "?_=" + n._ : o.url + "&_=" + n._
        }), $(document).ajaxComplete(function(t, o, a) {
            var i, r, l, s, d;
            o.responseText && (-1 !== o.responseText.indexOf("<br />") || -1 !== o.responseText.indexOf("<pre>exception ") ? console.log("警告：前方高能！", o.responseText) : o.responseJSON && 0 === o.responseJSON.status ? (-1 === a.url.indexOf("do=autoComplete") || -1 === a.url.indexOf("draft")) && ($(".error, .has-error").removeClass("error has-error"), $(".error--msg").remove()) : o.responseJSON && 1 === o.responseJSON.status && (d = o.responseJSON, -1 === a.url.indexOf("/user/stat") && "login" === d.data[0] ? n.login() : "robot" === d.data[0] ? location.href = "/stop-robot" : "unactivated" === d.data[0] ? $("#activate").modal("show") : "author" === d.data[0] ? e({
                title: "限制作者本人",
                content: "你是作者，无法对自己进行此操作",
                hideDone: !0
            }) : "follow" === d.data[0] ? e({
                title: "限制本人",
                content: "无法对自己进行此操作",
                hideDone: !0
            }) : "rank" === d.data[0] ? e({
                title: "声望值不够",
                content: "此操作要求你的声望值至少达到 " + d.data[1] + '，<a href="http://segmentfault.com/repu">如何获得声望？</a>',
                hideDone: !0
            }) : "like" === d.data[0] ? e({
                title: "无法进行此操作",
                content: "你已经赞过该条目。",
                hideDone: !0
            }) : "blocked" === d.data[0] ? e({
                title: "账号问题",
                content: '你的帐号因未知原因已被系统自动锁定，如需帮助，请发送邮件至 <a target="_blank" href="mailto:pr@segmentfault.com">pr@segmentfault.com</a> 联系管理员解决。',
                hideDone: !0
            }) : "form" === d.data[0] && (s = a.url.split("/")[2], s = s.split("?")[0], r = new RegExp("[?&]_=" + n._), l = a.url.replace(r, ""), i = !0, $.each(d.data[1], function(e, t) {
                var n, o, a, r;
                return "captcha" === e && ($("[name=captcha]").parents(".form-group").show(), $(".captcha").parent("a").click()), a = e.toLowerCase().replace(/\b[a-z]/g, function(e) {
                    return e.toUpperCase()
                }), r = "#" + s + a, o = $("form#" + s + " *[name=" + e + "]").parents(".form-group"), 0 === o.length && (o = $("form#" + s.replace(/s$/, "") + " *[name=" + e + "]").parents(".form-group")), n = $('form[action="' + l + '"] *[name=' + e + "]").parents(".form-group"), n.length || (n = $("form *[name=" + e + "]").parents(".form-group")), n.length ? (n.find(".help-block").remove(), n.addClass("has-error"), n.find(".input-group").length > 0 ? n.find(".input-group").after('<span class="help-block err">' + t + "</span>") : n.find(".bootstrap-tagsinput").length ? n.find(".bootstrap-tagsinput").addClass("error").after('<span class="help-block err">' + t + "</span>") : n.find("[name=" + e + "]").after('<span class="help-block err">' + t + "</span>")) : o.length ? (o.find(".help-block.err").remove(), o.addClass("has-error"), o.find("[name=" + e + "]").after('<span class="help-block err">' + t + "</span>")) : ($("form#" + s + " *[name=" + e + "]").siblings(".error--msg").remove(), $("form#" + s + " *[name=" + e + "]").addClass("error").attr("data-error", t).after('<span class="error--msg">' + t + "</span>")), $(r).length ? $(r).addClass("error").attr("data-error", t) : (r = "#" + s.replace(/s$/, "") + a, $(r).addClass("error").attr("data-error", t).after('<span class="error--msg">' + t + "</span>")), i ? (n.length && n.find("[name=" + e + "]").focus(), o.length && o.find("[name=" + e + "]").focus(), $(r).length && $(r).focus(), i = !1) : void 0
            }))))
        }), $("body").delegate("form", "submit", function(e) {
            var t;
            t = $(this), t.attr("method") && t.attr("action") && (e.preventDefault(), t.find("button[type=submit]").attr("disabled", "disabled"), $.ajax({
                url: t.attr("action"),
                type: t.attr("method"),
                data: t.serialize(),
                success: function(e) {
                    t.find("button[type=submit]").removeAttr("disabled"), 0 === e.status && ("/api/user?do=login" === t.attr("action") && "/user/login" !== location.pathname ? window.location.reload() : /^\//.test(e.data) ? window.location = e.data : window.location.reload())
                }
            }))
        }), $("body").delegate("form input", "keydown", function() {
            $(this).removeClass("error"), $(this).parents(".form-group").removeClass("has-error"), $(this).next(".help-block.err").remove(), $(this).next(".error--msg").remove()
        }), a = null, n.userId && (o(), a = setInterval(o, 6e4)), r = void 0, c = void 0, "undefined" != typeof document.hidden ? (r = "hidden", c = "visibilitychange") : "undefined" != typeof document.mozHidden ? (r = "mozHidden", c = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (r = "msHidden", c = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (r = "webkitHidden", c = "webkitvisibilitychange"), $("body").prepend('<div class="alert alert-warning topframe js-alert"><span class="content"></span><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div>'), d = window.navigator.userAgent, d.indexOf("Android") > 0 && ($("body").addClass("have-notify"), $(".js-alert").find(".content").html("<a style='color: #8a6d3b;' href='http://www.wandoujia.com/apps/com.segmentfault.app'>SegmentFault Android 客户端已上线！</a>").parent().show()), $(document).on(c, function() {
            document[r] ? clearInterval(a) : n.userId ? (o(), a = setInterval(o, 6e4)) : $.getJSON("/api/user/stat", function(e) {
                0 === e.status && ($("body").addClass("have-notify"), $(".js-alert").find(".content").html('您已登录，请 <button class="btn btn-warning btn-xs" type="button" onclick="location.reload()">重新加载</button>').parent().show())
            })
        }), $("#searchBox").focus(function() {
            var e;
            e = $(".nav .menu").width() + 180 + "px", $(".nav .menu").hide(), $(this).animate({
                width: e
            }, 200)
        }), $("#searchBox").blur(function() {
            $(this).animate({
                width: "180px"
            }, 200, "swing", function() {
                $(".nav .menu").show()
            })
        }), $("#backtop").click(function() {
            return $("body,html").animate({
                scrollTop: 0
            }), !1
        }), $(document).scroll(function() {
            $(this).scrollTop() > 720 ? $("#backtop").removeClass("hidden") : $("#backtop").addClass("hidden")
        }), $(".topframe").length && $(".topframe .close").click(function() {
            $(this).parent().remove(), 0 !== $(".topframe").length && $(".topframe .content").text() || $("body").removeClass("have-notify")
        }), window.SFHacker = {
            setOldVersion: function() {
                $.cookie("v", "old"), window.location.reload()
            },
            unSetOldVersion: function() {
                $.removeCookie("v", {
                    path: "/"
                }), window.location.reload()
            },
            makePureTextarea: function() {
                $.cookie("typemode", "native"), window.location.reload()
            },
            unMakePureTextarea: function() {
                $.removeCookie("typemode", {
                    path: "/"
                }), window.location.reload()
            }
        }, $(".SFLogin").click(function(e) {
            e.preventDefault(), n.login()
        }), $(".3rdLogin").click(function(e) {
            e.preventDefault(), window.open($(this).attr("href"), "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500")
        }), $(".hoverDropdown").hoverIntent(function() {
            $(this).hasClass("open") || $(this).find(".dropdownBtn").dropdown("toggle")
        }, function() {
            $(this).hasClass("open") && $(this).find(".dropdownBtn").dropdown("toggle")
        }, null, 1), $(".dropdownBtn").click(function(e) {
            var t;
            $(this).parent(".hoverDropdown").hasClass("open") && (e.preventDefault(), t = $(this).attr("href"), e.ctrlKey || e.metaKey ? window.open(t) : location.href = t)
        }), s = function(e, t, n, o) {
            var a;
            return a = e, a.length > 0 && $(".write-btns a").each(function() {
                $(this).click(function() {
                    return a.modal("show"), !1
                })
            }), $(".activate-change", a).click(function() {
                $(".activate-showmail").hide(), $(".activate-form").show()
            }), $(".activate-cancel", a).click(function() {
                $(".activate-showmail").show(), $(".activate-form").hide()
            }), $(".activate-form").on("submit", function(e) {
                var t;
                return e.preventDefault(), t = $(this), $.post(n, {
                    mail: t.find(".mail").val()
                }, function(e) {
                    0 === e.status && (t.parent().find(".session-mail").text(t.find(".mail").val()), $(".activate-showmail").show(), $(".activate-form").hide(), location.reload())
                }), !1
            }), $(".activate-resend", a).click(function() {
                var e, n, a, i;
                n = $(this), e = n.siblings("span").find("span"), a = void 0, i = void 0, a = 120, a--, $.post(t, function(t) {
                    0 === t.status ? ($(".company-activete-tips").length && $(".company-activete-tips").html('<div class="alert alert-success">' + t.message + "</div>"), o && o(), i = setInterval(function() {
                        return 0 === a ? (clearInterval(i), n.show(), void n.siblings("span").hide()) : void e.text(a--)
                    }, 1e3)) : ($(".company-activete-tips").length && $(".company-activete-tips").html('<div class="alert alert-danger">' + t.data[1] + "</div>"), setTimeout(function() {
                        $(".company-activete-tips").length && $(".company-activete-tips").html('<div class="alert alert-success">激活邮件已发送 （<span>120</span>）</div>'), n.show()
                    }, 9e5))
                })
            })
        }, s($("#activate"), "/api/user/reactivate", "/api/settings/mail/edit"), s($("#companyActivate"), "/api/company/reactivate", "/api/settings/mail/edit"), setTimeout(function() {
            var e;
            e = $("body > span iframe[id^=ads]"), e.length && e.parent("span").remove()
        }, 1e4), $.cookie("readTour") || n.userId || $("#messageCount").after('<span class="has-unread__count">1</span>'), n
    }), requirejs(["jquery", "main"], function(e) {
        e("#showMore").click(function(t) {
            t.preventDefault(), e(this).hide(), e(this).siblings().removeClass("hidden")
        }), e("#reloadCaptcha").click(function() {
            e(this).find("img").attr("src", "/user/captcha?w=240&h=50")
        }), e("#havePassword").change(function() {
            return e(".passwordInput").toggleClass("hidden"), e(this).prop("checked") ? e('.passwordInput input[name="password"]').removeAttr("disabled") : void 0
        }), e("#bindForm1").submit(function(t) {
            var n;
            t.preventDefault(), e(".msg").remove(), n = e(this), e.getJSON("/api/user/mail/check", {
                mail: e("#bindForm1 [name=mail]").val()
            }, function(t) {
                t.status || (t.data ? e("a[href=#tab2]").click() : e.post("/api/user/bind/register", {
                    mail: e("#bindForm1 [name=mail]").val(),
                    name: e("#bindForm1 [name=name]").val()
                }, function(e) {
                    e.status || (location.href = e.data)
                }))
            })
        })
    }), define("login_login", function() {});
