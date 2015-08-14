define("template", ["jquery"], function(e) {
        return function(t, n) {
            var a;
            return a = t || "", e.each(n, function(t, n) {
                var o, i;
                o = typeof n, i = new RegExp("{{\\s*" + t + "\\s*}}", "g"), "object" === o && null !== n ? e.each(n, function(e, n) {
                    var o;
                    o = new RegExp("{{\\s*" + t + "." + e + "\\s*}}", "g"), a = a.replace(o, n)
                }) : a = a.replace(i, n)
            }), a
        }
    }), define("sfModal", ["jquery", "template"], function(e, t) {
        return function(n) {
            var a, o;
            if ("object" != typeof n) {
                if ("hide" === n) return void e(".sfmodal").modal("hide");
                if ("toggle" === n) return void e(".sfmodal").modal("toggle");
                n = {
                    content: n,
                    hideDone: !0
                }
            }
            a = e.extend({
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
            }, n), o = '<div class="sfmodal modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">  <div class="modal-dialog {{modalSize}}">    <div class="modal-content">      ' + (a.hideTitle ? "" : '<div class="modal-header">        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>        <h4 class="modal-title">{{title}}</h4>      </div>') + '<div class="modal-body">        <p class="sfModal-content">          </div>          <div class="modal-footer ' + (a.hideFooter ? "hidden" : "") + '">' + (a.hideClose ? "" : '<button type="button" class="btn {{closeClass}}" data-dismiss="modal">{{closeText}}</button>') + (a.hideDone ? "" : '<button type="button" class="btn {{doneClass}} done-btn">{{doneText}}</button>') + "</div>        </div>      </div>    </div>", e(".sfmodal").length > 0 && (e(".sfmodal").remove(), e(".modal-backdrop").remove()), a.wrapper ? (e(a.wrapper).append(t(o, a)), e(a.wrapper).append('<div class="modal-backdrop in"></div>')) : e("body").append(t(o, a)), a.$content ? e(".sfmodal .sfModal-content").append(a.$content) : e(".sfmodal .sfModal-content").html(a.content), e(".sfmodal").modal({
                keyboard: !0
            }), e(".sfmodal").on("show.bs.modal", a.show).on("shown.bs.modal", a.shown).on("hide.bs.modal", function(t) {
                a.hide(t), a.wrapper && e(".modal-backdrop").remove()
            }).on("hidden.bs.modal", a.hidden).on("loaded.bs.modal", a.loaded).modal("show"), e(".sfmodal .done-btn").click(function(t) {
                a.doneFn(t), a.wrapper && e(".modal-backdrop").remove()
            })
        }
    }), define("mobile", ["jquery"], function(e) {
        return window.innerWidth > 767 ? {
            login: null,
            signup: null
        } : (e(".hate, .like").data("toggle", "false"), {
            login: function() {
                location.href = "/u/siguin"
            },
            signup: function() {
                location.href = "/u/signup"
            }
        })
    }),
    function(e) {
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
    }(jQuery), define("jquery_hoverIntent", ["jquery"], function(e) {
        return function() {
            var t;
            return t || e.$.fn.hoverIntent
        }
    }(this)), define("sfAjax", ["jquery"], function(e) {
        e.sfAjax = function(t, n, a, o) {
            var i, r, l, s;
            r = e.extend({
                id: t.data("id"),
                "do": t.data("do"),
                type: t.data("type")
            }, a), i = r["do"], l = i.indexOf("/cancel") > 0 ? i.replace("/cancel", "") : i + "/cancel", s = "/api/" + r.type + "/" + r.id + "/" + r["do"], e.post(s, function(e) {
                0 === e.status ? (t.data("do", l), n ? n(e) : location.reload()) : o && o(e)
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

        function a(e) {
            return t(l.json ? JSON.stringify(e) : String(e))
        }

        function o(e) {
            0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return e = decodeURIComponent(e.replace(r, " ")), l.json ? JSON.parse(e) : e
            } catch (t) {}
        }

        function i(t, n) {
            var a = l.raw ? t : o(t);
            return e.isFunction(n) ? n(a) : a
        }
        var r = /\+/g,
            l = e.cookie = function(o, r, s) {
                if (void 0 !== r && !e.isFunction(r)) {
                    if (s = e.extend({}, l.defaults, s), "number" == typeof s.expires) {
                        var d = s.expires,
                            c = s.expires = new Date;
                        c.setTime(+c + 864e5 * d)
                    }
                    return document.cookie = [t(o), "=", a(r), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("")
                }
                for (var u = o ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], f = 0, h = p.length; h > f; f++) {
                    var m = p[f].split("="),
                        v = n(m.shift()),
                        g = m.join("=");
                    if (o && o === v) {
                        u = i(g, r);
                        break
                    }
                    o || void 0 === (g = i(g)) || (u[v] = g)
                }
                return u
            };
        l.defaults = {}, e.removeCookie = function(t, n) {
            return void 0 === e.cookie(t) ? !1 : (e.cookie(t, "", e.extend({}, n, {
                expires: -1
            })), !e.cookie(t))
        }
    }),
    function(e, t, n, a) {
        var o = e(t);
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
            return i && (a !== i.failurelimit && (i.failure_limit = i.failurelimit, delete i.failurelimit), a !== i.effectspeed && (i.effect_speed = i.effectspeed, delete i.effectspeed), e.extend(d, i)), l = d.container === a || d.container === t ? o : e(d.container), 0 === d.event.indexOf("scroll") && l.bind(d.event, function() {
                return r()
            }), this.each(function() {
                var t = this,
                    n = e(t);
                t.loaded = !1, (n.attr("src") === a || n.attr("src") === !1) && n.is("img") && n.attr("src", d.placeholder), n.one("appear", function() {
                    if (!this.loaded) {
                        if (d.appear) {
                            var a = s.length;
                            d.appear.call(t, a, d)
                        }
                        e("<img />").bind("load", function() {
                            var a = n.attr("data-" + d.data_attribute);
                            n.hide(), n.is("img") ? n.attr("src", a) : n.css("background-image", "url('" + a + "')"), n[d.effect](d.effect_speed), t.loaded = !0;
                            var o = e.grep(s, function(e) {
                                return !e.loaded
                            });
                            if (s = e(o), d.load) {
                                var i = s.length;
                                d.load.call(t, i, d)
                            }
                        }).attr("src", n.attr("data-" + d.data_attribute))
                    }
                }), 0 !== d.event.indexOf("scroll") && n.bind(d.event, function() {
                    t.loaded || n.trigger("appear")
                })
            }), o.bind("resize", function() {
                r()
            }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && o.bind("pageshow", function(t) {
                t.originalEvent && t.originalEvent.persisted && s.each(function() {
                    e(this).trigger("appear")
                })
            }), e(n).ready(function() {
                r()
            }), this
        }, e.belowthefold = function(n, i) {
            var r;
            return r = i.container === a || i.container === t ? (t.innerHeight ? t.innerHeight : o.height()) + o.scrollTop() : e(i.container).offset().top + e(i.container).height(), r <= e(n).offset().top - i.threshold
        }, e.rightoffold = function(n, i) {
            var r;
            return r = i.container === a || i.container === t ? o.width() + o.scrollLeft() : e(i.container).offset().left + e(i.container).width(), r <= e(n).offset().left - i.threshold
        }, e.abovethetop = function(n, i) {
            var r;
            return r = i.container === a || i.container === t ? o.scrollTop() : e(i.container).offset().top, r >= e(n).offset().top + i.threshold + e(n).height()
        }, e.leftofbegin = function(n, i) {
            var r;
            return r = i.container === a || i.container === t ? o.scrollLeft() : e(i.container).offset().left, r >= e(n).offset().left + i.threshold + e(n).width()
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
        function t(t, n, a, o) {
            var i = {
                data: o || 0 === o || o === !1 ? o : n ? n.data : {},
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
            }), a && (i.tmpl = a, i._ctnt = i._ctnt || i.tmpl(e, i), i.key = ++y, (_.length ? b : $)[y] = i), i
        }

        function n(t, o, i) {
            var r, l = i ? e.map(i, function(e) {
                return "string" == typeof e ? t.key ? e.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + v + '="' + t.key + '" $2') : e : n(e, t, e._ctnt)
            }) : t;
            return o ? l : (l = l.join(""), l.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(t, n, o, i) {
                r = e(o).get(), s(r), n && (r = a(n).concat(r)), i && (r = r.concat(a(i)))
            }), r ? r : a(l))
        }

        function a(t) {
            var n = document.createElement("div");
            return n.innerHTML = t, e.makeArray(n.childNodes)
        }

        function o(t) {
            return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + e.trim(t).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(t, n, a, o, i, l, s) {
                var d, c, u, p = e.tmpl.tag[a];
                if (!p) throw "Unknown template tag: " + a;
                return d = p._default || [], l && !/\w$/.test(i) && (i += l, l = ""), i ? (i = r(i), s = s ? "," + r(s) + ")" : l ? ")" : "", c = l ? i.indexOf(".") > -1 ? i + r(l) : "(" + i + ").call($item" + s : i, u = l ? c : "(typeof(" + i + ")==='function'?(" + i + ").call($item):(" + i + "))") : u = c = d.$1 || "null", o = r(o), "');" + p[n ? "close" : "open"].split("$notnull_1").join(i ? "typeof(" + i + ")!=='undefined' && (" + i + ")!=null" : "true").split("$1a").join(u).split("$1").join(c).split("$2").join(o || d.$2 || "") + "__.push('"
            }) + "');}return __;")
        }

        function i(t, a) {
            t._wrap = n(t, !0, e.isArray(a) ? a : [g.test(a) ? a : e(a).html()]).join("")
        }

        function r(e) {
            return e ? e.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
        }

        function l(e) {
            var t = document.createElement("div");
            return t.appendChild(e.cloneNode(!0)), t.innerHTML
        }

        function s(n) {
            function a(n) {
                function a(e) {
                    e += d, r = c[e] = c[e] || t(r, $[r.parent.key + d] || r.parent)
                }
                var o, i, r, l, s = n;
                if (l = n.getAttribute(v)) {
                    for (; s.parentNode && 1 === (s = s.parentNode).nodeType && !(o = s.getAttribute(v)););
                    o !== l && (s = s.parentNode ? 11 === s.nodeType ? 0 : s.getAttribute(v) || 0 : 0, (r = $[l]) || (r = b[l], r = t(r, $[s] || b[s]), r.key = ++y, $[y] = r), x && a(l)), n.removeAttribute(v)
                } else x && (r = e.data(n, "tmplItem")) && (a(r.key), $[r.key] = r, s = e.data(n.parentNode, "tmplItem"), s = s ? s.key : 0);
                if (r) {
                    for (i = r; i && i.key != s;) i.nodes.push(n), i = i.parent;
                    delete r._ctnt, delete r._wrap, e.data(n, "tmplItem", r)
                }
            }
            var o, i, r, l, s, d = "_" + x,
                c = {};
            for (r = 0, l = n.length; l > r; r++)
                if (1 === (o = n[r]).nodeType) {
                    for (i = o.getElementsByTagName("*"), s = i.length - 1; s >= 0; s--) a(i[s]);
                    a(o)
                }
        }

        function d(e, t, n, a) {
            return e ? void _.push({
                _: e,
                tmpl: t,
                item: this,
                data: n,
                options: a
            }) : _.pop()
        }

        function c(t, n, a) {
            return e.tmpl(e.template(t), n, a, this)
        }

        function u(t, n) {
            var a = t.options || {};
            return a.wrapped = n, e.tmpl(e.template(t.tmpl), t.data, a, t.item)
        }

        function p(t, n) {
            var a = this._wrap;
            return e.map(e(e.isArray(a) ? a.join("") : a).filter(t || "*"), function(e) {
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
            w = {
                key: 0,
                data: {}
            },
            y = 0,
            x = 0,
            _ = [];
        e.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, n) {
            e.fn[t] = function(a) {
                var o, i, r, l, s = [],
                    d = e(a),
                    c = 1 === this.length && this[0].parentNode;
                if (h = $ || {}, c && 11 === c.nodeType && 1 === c.childNodes.length && 1 === d.length) d[n](this[0]), s = this;
                else {
                    for (i = 0, r = d.length; r > i; i++) x = i, o = (i > 0 ? this.clone(!0) : this).get(), e(d[i])[n](o), s = s.concat(o);
                    x = 0, s = this.pushStack(s, t, d.selector)
                }
                return l = h, h = null, e.tmpl.complete(l), s
            }
        }), e.fn.extend({
            tmpl: function(t, n, a) {
                return e.tmpl(this[0], t, n, a)
            },
            tmplItem: function() {
                return e.tmplItem(this[0])
            },
            template: function(t) {
                return e.template(t, this[0])
            },
            domManip: function(t, n, a) {
                if (t[0] && e.isArray(t[0])) {
                    for (var o, i = e.makeArray(arguments), r = t[0], l = r.length, s = 0; l > s && !(o = e.data(r[s++], "tmplItem")););
                    o && x && (i[2] = function(t) {
                        e.tmpl.afterManip(this, t, a)
                    }), m.apply(this, i)
                } else m.apply(this, arguments);
                return x = 0, !h && e.tmpl.complete($), this
            }
        }), e.extend({
            tmpl: function(a, o, r, l) {
                var s, d = !l;
                if (d) l = w, a = e.template[a] || e.template(null, a), b = {};
                else if (!a) return a = l.tmpl, $[l.key] = l, l.nodes = [], l.wrapped && i(l, l.wrapped), e(n(l, null, l.tmpl(e, l)));
                return a ? ("function" == typeof o && (o = o.call(l || {})), r && r.wrapped && i(r, r.wrapped), s = e.isArray(o) ? e.map(o, function(e) {
                    return e ? t(r, l, a, e) : null
                }) : [t(r, l, a, o)], d ? e(n(l, null, s)) : s) : []
            },
            tmplItem: function(t) {
                var n;
                for (t instanceof e && (t = t[0]); t && 1 === t.nodeType && !(n = e.data(t, "tmplItem")) && (t = t.parentNode););
                return n || w
            },
            template: function(t, n) {
                return n ? ("string" == typeof n ? n = o(n) : n instanceof e && (n = n[0] || {}), n.nodeType && (n = e.data(n, "tmpl") || e.data(n, "tmpl", o(n.innerHTML))), "string" == typeof t ? e.template[t] = n : n) : t ? "string" != typeof t ? e.template(null, t) : e.template[t] || e.template(null, g.test(t) ? t : e(t)) : null
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
            afterManip: function(t, n, a) {
                var o = 11 === n.nodeType ? e.makeArray(n.childNodes) : 1 === n.nodeType ? [n] : [];
                a.call(t, n), s(o), x++
            }
        })
    }(jQuery), define("jquery_tmpl", ["jquery"], function(e) {
        return function() {
            var t;
            return t || e.$.fn.tmpl
        }
    }(this)), define("typeHelper", ["jquery", "jquery_tmpl"], function(e) {
        var t, n, a, o, i, r, l, s;
        l = '<ul class="dropdown-menu" role="menu"></ul>', o = void 0, t = void 0, a = void 0, n = void 0, i = void 0, r = ["gmail.com", "qq.com", "163.com", "hotmail.com", "sina.com", "126.com", "live.com", "live.cn", "vip.sina.com", "vip.qq.com", "sina.cn", "sohu.com", "139.com", "wo.com.cn", "189.cn", "21cn.com"], s = '<button class="btn btn-default result" type="button">${result}</button><a href="#" class="i-cancel ml10 delete-result">&times;</a>', e.fn.typeHelper = function(d) {
            o = e.extend({
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
            }, d), n = e(this), 0 !== n.length && (n.after(e("<div></div>").addClass("typehelper")).siblings(".typehelper").append(n), t = n.parent().css("position", "relative"), e.tmpl(l).insertAfter(n), a = t.find("ul").hide().css("minWidth", n.outerWidth()), e.each(o.defaultList, function(t, n) {
                e.tmpl(o.tpl, n).appendTo(a)
            }), n.on("focus", function() {
                o.defaultList.length > 0 && e(this).parent().trigger("show.typehelper")
            }), n.on("input", function() {
                e(this).parent().trigger("search.typehelper"), e(this).parent().trigger("show.typehelper")
            }), n.on("keydown", function(t) {
                e(this).parent().trigger("select.typehelper", t)
            }), a.delegate("li", "mouseover", function() {
                e(this).siblings("li").removeClass("active"), e(this).addClass("active")
            }), n.on("blur", function() {
                e(this).parent().trigger("hide.typehelper"), o.autoSelect && (e(this).siblings("ul").find(".active").length > 0 ? e(this).parent().trigger("insert.typehelper", a.find(".active a")) : e(this).val(""))
            }), t.on("show.typehelper", function() {
                e(this).find("ul").show()
            }), t.on("hide.typehelper", function() {
                e(this).find("ul").hide()
            }), t.on("insert.typehelper", function(i, r) {
                t = e(this), n = t.find("input"), a = t.find("ul"), n.val(e(r).data("value")), e(".result", t).length > 0 && (e(".result", t).remove(), t.find(".delete-result").remove()), o.onlyResult && (n.hide(), a.after(e.tmpl(s, {
                    result: n.val()
                })), o.submitKey && n.data(o.submitKey, e(r).data(o.submitKey)), t.find(".result").on("click", function() {
                    e(this).siblings(".delete-result").remove(), e(this).remove(), n.show().focus(), t.trigger("search.typehelper")
                }), t.find(".delete-result").on("click", function() {
                    return e(this).siblings(".result").remove(), e(this).remove(), n.val("").show(), !1
                })), t.parents(".form-group").next(".form-group").find("input").focus(), o.insertHandler(e(r).data("value"))
            }), t.on("select.typehelper", function(o, i) {
                var r, l, s, d;
                if (t = e(this), n = t.find("input"), a = t.find("ul"), r = a.find("li"), i) switch (i.keyCode) {
                    case 38:
                        i.preventDefault(), r.length && (a.find(".active").length ? a.find(".active").removeClass("active").prev("li").addClass("active") : r.last().addClass("active"));
                        break;
                    case 40:
                        i.preventDefault(), r.length && (a.find(".active").length ? a.find(".active").removeClass("active").next("li").addClass("active") : r.first().addClass("active"));
                        break;
                    case 13:
                        if (i.stopPropagation(), i.preventDefault(), a.find(".active").length <= 0) return;
                        t.trigger("insert.typehelper", a.find(".active a")), t.trigger("hide.typehelper");
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
                if (t = e(this), n = t.find("input"), a = t.find("ul"), n.val().length)
                    if (d = [], o.remoteData) o.remoteData(n.val(), function(t) {
                        d = t, d.length > 0 && (a.children().remove(), e.tmpl(o.tpl, d).appendTo(a), 1 === d.length && a.children().first().addClass("active"))
                    });
                    else {
                        for (c = 0, o.emailMode && (o.data = [{
                                name: n.val()
                            }], e.each(r, function(e, t) {
                                o.data.push({
                                    name: n.val().replace(/@.*$/, "") + "@" + t
                                })
                            })), i = o.data.length, s = 0; i > s && (l = o.data[s], !(0 === l.name.toLowerCase().indexOf(n.val().toLowerCase()) && (d.push(l), c++, c >= o.showNum)));) s++;
                        d.length > 0 && (a.children().remove(), e.tmpl(o.tpl, d).appendTo(a), (1 === d.length || o.emailMode) && a.children().first().addClass("active"))
                    }
            }), n.val().length > 0 && t.trigger("insert.typehelper", n))
        }
    }), define("main", ["sfModal", "mobile", "jquery_hoverIntent", "sfAjax", "bootstrap", "jquery_cookie", "jquery_lazyload", "typeHelper"], function(e, t) {
        var n, a, o, i, r, l, s, d, c;
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
        }, a = function() {
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
            getMessage: a,
            login: t.login || l
        }, $(document).ajaxError(function(e, t, n) {
            413 === t.status ? ($("#uploading") && $("#uploading").text(""), alert("文件太大！")) : console.log("Ajax " + t.status + ": ", n.url)
        }), $(document).ajaxSend(function(e, t, a) {
            a.url = -1 === a.url.indexOf("?") ? a.url + "?_=" + n._ : a.url + "&_=" + n._
        }), $(document).ajaxComplete(function(t, a, o) {
            var i, r, l, s, d;
            a.responseText && (-1 !== a.responseText.indexOf("<br />") || -1 !== a.responseText.indexOf("<pre>exception ") ? console.log("警告：前方高能！", a.responseText) : a.responseJSON && 0 === a.responseJSON.status ? (-1 === o.url.indexOf("do=autoComplete") || -1 === o.url.indexOf("draft")) && ($(".error, .has-error").removeClass("error has-error"), $(".error--msg").remove()) : a.responseJSON && 1 === a.responseJSON.status && (d = a.responseJSON, -1 === o.url.indexOf("/user/stat") && "login" === d.data[0] ? n.login() : "robot" === d.data[0] ? location.href = "/stop-robot" : "unactivated" === d.data[0] ? $("#activate").modal("show") : "author" === d.data[0] ? e({
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
            }) : "form" === d.data[0] && (s = o.url.split("/")[2], s = s.split("?")[0], r = new RegExp("[?&]_=" + n._), l = o.url.replace(r, ""), i = !0, $.each(d.data[1], function(e, t) {
                var n, a, o, r;
                return "captcha" === e && ($("[name=captcha]").parents(".form-group").show(), $(".captcha").parent("a").click()), o = e.toLowerCase().replace(/\b[a-z]/g, function(e) {
                    return e.toUpperCase()
                }), r = "#" + s + o, a = $("form#" + s + " *[name=" + e + "]").parents(".form-group"), 0 === a.length && (a = $("form#" + s.replace(/s$/, "") + " *[name=" + e + "]").parents(".form-group")), n = $('form[action="' + l + '"] *[name=' + e + "]").parents(".form-group"), n.length || (n = $("form *[name=" + e + "]").parents(".form-group")), n.length ? (n.find(".help-block").remove(), n.addClass("has-error"), n.find(".input-group").length > 0 ? n.find(".input-group").after('<span class="help-block err">' + t + "</span>") : n.find(".bootstrap-tagsinput").length ? n.find(".bootstrap-tagsinput").addClass("error").after('<span class="help-block err">' + t + "</span>") : n.find("[name=" + e + "]").after('<span class="help-block err">' + t + "</span>")) : a.length ? (a.find(".help-block.err").remove(), a.addClass("has-error"), a.find("[name=" + e + "]").after('<span class="help-block err">' + t + "</span>")) : ($("form#" + s + " *[name=" + e + "]").siblings(".error--msg").remove(), $("form#" + s + " *[name=" + e + "]").addClass("error").attr("data-error", t).after('<span class="error--msg">' + t + "</span>")), $(r).length ? $(r).addClass("error").attr("data-error", t) : (r = "#" + s.replace(/s$/, "") + o, $(r).addClass("error").attr("data-error", t).after('<span class="error--msg">' + t + "</span>")), i ? (n.length && n.find("[name=" + e + "]").focus(), a.length && a.find("[name=" + e + "]").focus(), $(r).length && $(r).focus(), i = !1) : void 0
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
        }), o = null, n.userId && (a(), o = setInterval(a, 6e4)), r = void 0, c = void 0, "undefined" != typeof document.hidden ? (r = "hidden", c = "visibilitychange") : "undefined" != typeof document.mozHidden ? (r = "mozHidden", c = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (r = "msHidden", c = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (r = "webkitHidden", c = "webkitvisibilitychange"), $("body").prepend('<div class="alert alert-warning topframe js-alert"><span class="content"></span><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div>'), d = window.navigator.userAgent, d.indexOf("Android") > 0 && ($("body").addClass("have-notify"), $(".js-alert").find(".content").html("<a style='color: #8a6d3b;' href='http://www.wandoujia.com/apps/com.segmentfault.app'>SegmentFault Android 客户端已上线！</a>").parent().show()), $(document).on(c, function() {
            document[r] ? clearInterval(o) : n.userId ? (a(), o = setInterval(a, 6e4)) : $.getJSON("/api/user/stat", function(e) {
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
        }), s = function(e, t, n, a) {
            var o;
            return o = e, o.length > 0 && $(".write-btns a").each(function() {
                $(this).click(function() {
                    return o.modal("show"), !1
                })
            }), $(".activate-change", o).click(function() {
                $(".activate-showmail").hide(), $(".activate-form").show()
            }), $(".activate-cancel", o).click(function() {
                $(".activate-showmail").show(), $(".activate-form").hide()
            }), $(".activate-form").on("submit", function(e) {
                var t;
                return e.preventDefault(), t = $(this), $.post(n, {
                    mail: t.find(".mail").val()
                }, function(e) {
                    0 === e.status && (t.parent().find(".session-mail").text(t.find(".mail").val()), $(".activate-showmail").show(), $(".activate-form").hide(), location.reload())
                }), !1
            }), $(".activate-resend", o).click(function() {
                var e, n, o, i;
                n = $(this), e = n.siblings("span").find("span"), o = void 0, i = void 0, o = 120, o--, $.post(t, function(t) {
                    0 === t.status ? ($(".company-activete-tips").length && $(".company-activete-tips").html('<div class="alert alert-success">' + t.message + "</div>"), a && a(), i = setInterval(function() {
                        return 0 === o ? (clearInterval(i), n.show(), void n.siblings("span").hide()) : void e.text(o--)
                    }, 1e3)) : ($(".company-activete-tips").length && $(".company-activete-tips").html('<div class="alert alert-danger">' + t.data[1] + "</div>"), setTimeout(function() {
                        $(".company-activete-tips").length && $(".company-activete-tips").html('<div class="alert alert-success">激活邮件已发送 （<span>120</span>）</div>'), n.show()
                    }, 9e5))
                })
            })
        }, s($("#activate"), "/api/user/reactivate", "/api/settings/mail/edit"), s($("#companyActivate"), "/api/company/reactivate", "/api/settings/mail/edit"), setTimeout(function() {
            var e;
            e = $("body > span iframe[id^=ads]"), e.length && e.parent("span").remove()
        }, 1e4), $.cookie("readTour") || n.userId || $("#messageCount").after('<span class="has-unread__count">1</span>'), n
    }), define("statusToggle", [], function() {
        return function(e) {
            e.data("toggle", "false"), e.data("toggle") && (e.on("active", function(t, n) {
                e.data("toggle", "true"), n.call(this)
            }), e.on("unactive", function(t, n) {
                e.data("toggle", "true"), n.call(this)
            }))
        }
    }), define("follow", ["statusToggle"], function(e) {
        return function(t) {
            var n, a;
            n = $.extend({
                element: null,
                event: "click",
                url: null,
                toggleClass: "active",
                loadText: "加载中",
                unActiveText: "加关注",
                activeText: "已关注",
                "do": "follow",
                successFn: function() {},
                failFn: function() {}
            }, t), a = t.element, e(a), a.on(n.event, function() {
                a.hasClass(n.toggleClass) ? a.trigger("unactive", function() {
                    a.text(n.unActiveText).removeClass(n.toggleClass).attr("disabled", "disabled"), $.post(n.url + "/" + n.element.data("id") + "/" + n["do"] + "/cancel", function(e) {
                        0 === e.status ? n.successFn.call(this, e) : (a.text(n.activeText), n.failFn.call(this, e)), a.removeAttr("disabled")
                    })
                }) : a.trigger("active", function() {
                    a.text(n.activeText).addClass(n.toggleClass).attr("disabled", "disabled"), $.post(n.url + "/" + n.element.data("id") + "/" + n["do"], function(e) {
                        0 === e.status ? n.successFn.call(this, e) : (a.text(n.unActiveText), n.failFn.call(this, e)), a.removeAttr("disabled")
                    })
                })
            })
        }
    }), define("tagPopup", ["jquery", "sfModal", "follow", "jquery_tmpl"], function(e, t, n) {
        e.fn.tagPopup = function(t) {
            var a, o, i, r;
            i = function() {
                e.getJSON("/api/tag/" + a.data("id"), function(t) {
                    var o, i;
                    0 !== t.data.length && (r.content = t.data.excerpt ? t.data.excerpt : '<span class="text-muted">目前还没有关于这个标签的解释</span>', t.data.isFollowed ? (t.data.isFollowedClass = "active", t.data.isFollowedBtn = "已关注") : (t.data.isFollowedClass = "", t.data.isFollowedBtn = "加关注"), r.template = e.tmpl(r.template, t.data)[0], a.popover(r), a.popover("show"), i = e(".tag-popup-" + a.data("id")), o = i.find("button"), n({
                        element: o,
                        url: "/api/tag",
                        successFn: function(t) {
                            e(".tag-popup-" + o.data("id") + " .followers").text(t.data + "人")
                        }
                    }))
                })
            }, a = e(this), o = e(".tag-popup-" + a.data("id")), r = {
                placement: a.data("placement") || "top",
                trigger: "manual",
                container: "body",
                content: "",
                html: !0,
                template: '<div class="popover tag-popup tag-popup-${id}">                <div class="arrow"></div>                <h3 class="popover-title"></h3>                <div class="popover-content"></div>                <div class="popover-footer">                    <a href="${url}">查看</a>                    <span class="text-muted">&middot;</span>                    <a href="${editUrl}">编辑</a>                    <span class="text-muted">&middot;</span>                    <a href="/feeds/tag/${name}">订阅</a>                    <div class="pull-right">                        <span class="text-muted followers">${followers} 人</span><button class="btn btn-default btn-xs tagfollow ${isFollowedClass}" data-id="${id}">${isFollowedBtn}</button></div></div></div>'
            }, "show" === t ? 0 === o.length ? i() : o.show() : "hide" === t && o.remove()
        }
    }), requirejs(["main", "jquery_tmpl", "jquery_hoverIntent", "tagPopup"], function(e) {
        $(".tagPopup").hoverIntent(function() {
            var e;
            e = $(this).find(".tag"), $(".tag").tagPopup("hide"), e.tagPopup("show")
        }, function() {
            var e, t;
            e = $(this).find(".tag"), t = $(".tag-popup-" + e.data("id")).is(":hover"), t ? $(".tag-popup").mouseleave(function() {
                return e.tagPopup("hide")
            }) : e.tagPopup("hide")
        }), $("#goAsk").click(function(t) {
            e.userId || (t.preventDefault(), e.login())
        }), e.userId && !$("#interestTab").hasClass("active") && $.get("/api/tag/following", function(e) {
            var t;
            t = [], e.data.rows.forEach(function(e) {
                t.push(parseInt(e.id))
            }), $(".stream-list__item").each(function() {
                var e, n;
                n = [], e = $(this), $(this).find(".tag").each(function() {
                    n.push($(this).data("id"))
                }), n.forEach(function(n) {
                    -1 !== t.indexOf(n) && e.addClass("highlight")
                })
            })
        })
    }), define("qa_index", function() {});