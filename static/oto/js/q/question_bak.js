! function(e) {
    function t(t, n, i, a) {
        var r = {
            data: a || 0 === a || a === !1 ? a : n ? n.data : {},
            _wrap: n ? n._wrap : null,
            tmpl: null,
            parent: n || null,
            nodes: [],
            calls: c,
            nest: u,
            wrap: d,
            html: p,
            update: f
        };
        return t && e.extend(r, t, {
            nodes: [],
            parent: n
        }), i && (r.tmpl = i, r._ctnt = r._ctnt || r.tmpl(e, r), r.key = ++_, (x.length ? w : v)[_] = r), r
    }

    function n(t, a, r) {
        var o, s = r ? e.map(r, function(e) {
            return "string" == typeof e ? t.key ? e.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + m + '="' + t.key + '" $2') : e : n(e, t, e._ctnt)
        }) : t;
        return a ? s : (s = s.join(""), s.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(t, n, a, r) {
            o = e(a).get(), l(o), n && (o = i(n).concat(o)), r && (o = o.concat(i(r)))
        }), o ? o : i(s))
    }

    function i(t) {
        var n = document.createElement("div");
        return n.innerHTML = t, e.makeArray(n.childNodes)
    }

    function a(t) {
        return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + e.trim(t).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(t, n, i, a, r, s, l) {
            var c, u, d, p = e.tmpl.tag[i];
            if (!p) throw "Unknown template tag: " + i;
            return c = p._default || [], s && !/\w$/.test(r) && (r += s, s = ""), r ? (r = o(r), l = l ? "," + o(l) + ")" : s ? ")" : "", u = s ? r.indexOf(".") > -1 ? r + o(s) : "(" + r + ").call($item" + l : r, d = s ? u : "(typeof(" + r + ")==='function'?(" + r + ").call($item):(" + r + "))") : d = u = c.$1 || "null", a = o(a), "');" + p[n ? "close" : "open"].split("$notnull_1").join(r ? "typeof(" + r + ")!=='undefined' && (" + r + ")!=null" : "true").split("$1a").join(d).split("$1").join(u).split("$2").join(a || c.$2 || "") + "__.push('"
        }) + "');}return __;")
    }

    function r(t, i) {
        t._wrap = n(t, !0, e.isArray(i) ? i : [b.test(i) ? i : e(i).html()]).join("")
    }

    function o(e) {
        return e ? e.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }

    function s(e) {
        var t = document.createElement("div");
        return t.appendChild(e.cloneNode(!0)), t.innerHTML
    }

    function l(n) {
        function i(n) {
            function i(e) {
                e += c, o = u[e] = u[e] || t(o, v[o.parent.key + c] || o.parent)
            }
            var a, r, o, s, l = n;
            if (s = n.getAttribute(m)) {
                for (; l.parentNode && 1 === (l = l.parentNode).nodeType && !(a = l.getAttribute(m)););
                a !== s && (l = l.parentNode ? 11 === l.nodeType ? 0 : l.getAttribute(m) || 0 : 0, (o = v[s]) || (o = w[s], o = t(o, v[l] || w[l]), o.key = ++_, v[_] = o), k && i(s)), n.removeAttribute(m)
            } else k && (o = e.data(n, "tmplItem")) && (i(o.key), v[o.key] = o, l = e.data(n.parentNode, "tmplItem"), l = l ? l.key : 0);
            if (o) {
                for (r = o; r && r.key != l;) r.nodes.push(n), r = r.parent;
                delete o._ctnt, delete o._wrap, e.data(n, "tmplItem", o)
            }
        }
        var a, r, o, s, l, c = "_" + k,
            u = {};
        for (o = 0, s = n.length; s > o; o++)
            if (1 === (a = n[o]).nodeType) {
                for (r = a.getElementsByTagName("*"), l = r.length - 1; l >= 0; l--) i(r[l]);
                i(a)
            }
    }

    function c(e, t, n, i) {
        return e ? void x.push({
            _: e,
            tmpl: t,
            item: this,
            data: n,
            options: i
        }) : x.pop()
    }

    function u(t, n, i) {
        return e.tmpl(e.template(t), n, i, this)
    }

    function d(t, n) {
        var i = t.options || {};
        return i.wrapped = n, e.tmpl(e.template(t.tmpl), t.data, i, t.item)
    }

    function p(t, n) {
        var i = this._wrap;
        return e.map(e(e.isArray(i) ? i.join("") : i).filter(t || "*"), function(e) {
            return n ? e.innerText || e.textContent : e.outerHTML || s(e)
        })
    }

    function f() {
        var t = this.nodes;
        e.tmpl(null, null, null, this).insertBefore(t[0]), e(t).remove()
    }
    var h, g = e.fn.domManip,
        m = "_tmplitem",
        b = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
        v = {},
        w = {},
        y = {
            key: 0,
            data: {}
        },
        _ = 0,
        k = 0,
        x = [];
    e.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, n) {
        e.fn[t] = function(i) {
            var a, r, o, s, l = [],
                c = e(i),
                u = 1 === this.length && this[0].parentNode;
            if (h = v || {}, u && 11 === u.nodeType && 1 === u.childNodes.length && 1 === c.length) c[n](this[0]), l = this;
            else {
                for (r = 0, o = c.length; o > r; r++) k = r, a = (r > 0 ? this.clone(!0) : this).get(), e(c[r])[n](a), l = l.concat(a);
                k = 0, l = this.pushStack(l, t, c.selector)
            }
            return s = h, h = null, e.tmpl.complete(s), l
        }
    }), e.fn.extend({
        tmpl: function(t, n, i) {
            return e.tmpl(this[0], t, n, i)
        },
        tmplItem: function() {
            return e.tmplItem(this[0])
        },
        template: function(t) {
            return e.template(t, this[0])
        },
        domManip: function(t, n, i) {
            if (t[0] && e.isArray(t[0])) {
                for (var a, r = e.makeArray(arguments), o = t[0], s = o.length, l = 0; s > l && !(a = e.data(o[l++], "tmplItem")););
                a && k && (r[2] = function(t) {
                    e.tmpl.afterManip(this, t, i)
                }), g.apply(this, r)
            } else g.apply(this, arguments);
            return k = 0, !h && e.tmpl.complete(v), this
        }
    }), e.extend({
        tmpl: function(i, a, o, s) {
            var l, c = !s;
            if (c) s = y, i = e.template[i] || e.template(null, i), w = {};
            else if (!i) return i = s.tmpl, v[s.key] = s, s.nodes = [], s.wrapped && r(s, s.wrapped), e(n(s, null, s.tmpl(e, s)));
            return i ? ("function" == typeof a && (a = a.call(s || {})), o && o.wrapped && r(o, o.wrapped), l = e.isArray(a) ? e.map(a, function(e) {
                return e ? t(o, s, i, e) : null
            }) : [t(o, s, i, a)], c ? e(n(s, null, l)) : l) : []
        },
        tmplItem: function(t) {
            var n;
            for (t instanceof e && (t = t[0]); t && 1 === t.nodeType && !(n = e.data(t, "tmplItem")) && (t = t.parentNode););
            return n || y
        },
        template: function(t, n) {
            return n ? ("string" == typeof n ? n = a(n) : n instanceof e && (n = n[0] || {}), n.nodeType && (n = e.data(n, "tmpl") || e.data(n, "tmpl", a(n.innerHTML))), "string" == typeof t ? e.template[t] = n : n) : t ? "string" != typeof t ? e.template(null, t) : e.template[t] || e.template(null, b.test(t) ? t : e(t)) : null
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
            v = {}
        },
        afterManip: function(t, n, i) {
            var a = 11 === n.nodeType ? e.makeArray(n.childNodes) : 1 === n.nodeType ? [n] : [];
            i.call(t, n), l(a), k++
        }
    })
}(jQuery), define("jquery_tmpl", ["jquery"], function(e) {
        return function() {
            var t;
            return t || e.$.fn.tmpl
        }
    }(this)), define("likeHate", ["jquery", "jquery_tmpl"], function(e) {
        "use strict";
        var t, n;
        n = '<div class="alert alert-danger alert-dismissible unlike-alert" role="alert">                              <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>                              如果该问题有可改进的余地，欢迎在评论里给作者建议。                            </div>', t = '<div class="alert alert-danger alert-dismissible unlike-alert" role="alert">                              <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>                              如果该回答有可改进的余地，欢迎在评论里给作者建议。                            </div>', e.fn.likeHate = function() {
            var i;
            i = null, e(this).click(function() {
                var a, r, o, s, l, c;
                a = e(this), l = a.siblings(".active").hasClass("hate"), s = a.siblings(".active").hasClass("like"), o = a.data("do"), c = "", c = 0 === o.indexOf("un") ? o.slice(2) : "un" + o, r = a.parents(".widget-vote").find(".count"), a.siblings(".like, .hate").removeClass("active"), a.toggleClass("active"), "like" === o ? l && a.siblings(".hate").data("do", "hate") : "hate" === o ? s && e(this).siblings(".like").data("do", "like") : "unlike" === o ? console.log(1) : "unhate" === o && console.log(1), i && clearTimeout(i), i = setTimeout(function() {
                    "like" === o ? (a.addClass("active"), a.after('<span class="ani-num">+1</span>'), function(e) {
                        setTimeout(function() {
                            e.next(".ani-num").addClass("active")
                        }, 0)
                    }(a), e.sfAjax(a, function(e) {
                        r.text(e.data)
                    }, {}, function(e) {
                        a.removeClass("active"), a.next(".ani-num").remove()
                    })) : "hate" === o ? e.sfAjax(a, function(i) {
                        a.addClass("active"), r.text(i.data), "question" === a.data("type") ? a.parent().after(e.tmpl(n)) : "answer" === a.data("type") && a.parent().after(e.tmpl(t))
                    }, {}, function(e) {
                        a.removeClass("active")
                    }) : e.sfAjax(a, function(e) {
                        a.removeClass("active"), r.text(e.data), a.next(".ani-num").remove()
                    })
                }, 300)
            })
        }
    }), define("template", ["jquery"], function(e) {
        "use strict";
        return function(t, n) {
            var i;
            return i = t || "", e.each(n, function(t, n) {
                var a, r;
                a = typeof n, r = new RegExp("{{\\s*" + t + "\\s*}}", "g"), "object" === a && null !== n ? e.each(n, function(e, n) {
                    var a;
                    a = new RegExp("{{\\s*" + t + "." + e + "\\s*}}", "g"), i = i.replace(a, n)
                }) : i = i.replace(r, n)
            }), i
        }
    }), define("sfModal", ["jquery", "template"], function(e, t) {
        "use strict";
        return function(n) {
            var i, a;
            if ("object" != typeof n) {
                if ("hide" === n) return void e(".sfmodal").modal("hide");
                if ("toggle" === n) return void e(".sfmodal").modal("toggle");
                n = {
                    content: n,
                    hideDone: !0
                }
            }
            i = e.extend({
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
            }, n), a = '<div class="sfmodal modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">  <div class="modal-dialog {{modalSize}}">    <div class="modal-content">      ' + (i.hideTitle ? "" : '<div class="modal-header">        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>        <h4 class="modal-title">{{title}}</h4>      </div>') + '<div class="modal-body">        <p class="sfModal-content">          </div>          <div class="modal-footer ' + (i.hideFooter ? "hidden" : "") + '">' + (i.hideClose ? "" : '<button type="button" class="btn {{closeClass}}" data-dismiss="modal">{{closeText}}</button>') + (i.hideDone ? "" : '<button type="button" class="btn {{doneClass}} done-btn">{{doneText}}</button>') + "</div>        </div>      </div>    </div>", e(".sfmodal").length > 0 && (e(".sfmodal").remove(), e(".modal-backdrop").remove()), i.wrapper ? (e(i.wrapper).append(t(a, i)), e(i.wrapper).append('<div class="modal-backdrop in"></div>')) : e("body").append(t(a, i)), i.$content ? e(".sfmodal .sfModal-content").append(i.$content) : e(".sfmodal .sfModal-content").html(i.content), e(".sfmodal").modal({
                keyboard: !0
            }), e(".sfmodal").on("show.bs.modal", i.show).on("shown.bs.modal", i.shown).on("hide.bs.modal", function(t) {
                i.hide(t), i.wrapper && e(".modal-backdrop").remove()
            }).on("hidden.bs.modal", i.hidden).on("loaded.bs.modal", i.loaded).modal("show"), e(".sfmodal .done-btn").click(function(t) {
                i.doneFn(t), i.wrapper && e(".modal-backdrop").remove()
            })
        }
    }), define("getRelated", ["jquery", "template", "sfModal"], function(e, t, n) {
        "use strict";
        return function(i, a, r, o, s) {
            var l, c, u;
            i && (c = i + "", a = a || '<li class="widget-links__item">                <a href="javascript:void(0);" class="ranks" data-toggle="tooltip" data-placement="top" title="{{ answers }}个回答">{{ answers }}</a>                <a href="{{ url }}">{{ title }}</a>            </li>', u = {}, l = "", 16 === c.length && 0 === c.indexOf("101") ? (l = "GET", u = {
                "do": "related",
                id: c
            }) : (l = "GET", u = {
                q: c
            }), e.ajax({
                url: "/api/question/search",
                data: u,
                type: l,
                dataType: "json"
            }).done(function(i) {
                var l;
                if (0 !== i.status) n("○|￣|_ 服务器跪了！");
                else {
                    if (0 === i.data.length) return void(o && (e("#titleSuggest").hide(), e(r).html(o)));
                    s && (i.data = i.data.slice(0, s)), l = "", i.data.forEach(function(e) {
                        e.isAccepted ? (e.acceptedWord = " | 解决", e.isSolved = " | 已解决") : (e.acceptedWord = "", e.isSolved = ""), l += t(a, e)
                    }), e("#titleSuggest").removeClass("hidden").show(), e(r).html(l), e(r).find(".ranks").tooltip()
                }
            }))
        }
    }), ! function(e) {
        "undefined" != typeof exports ? e(exports) : (window.hljs = e({}), "function" == typeof define && define.amd && define("highlightjs", [], function() {
            return window.hljs
        }))
    }(function(e) {
        function t(e) {
            return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
        }

        function n(e) {
            return e.nodeName.toLowerCase()
        }

        function i(e, t) {
            var n = e && e.exec(t);
            return n && 0 == n.index
        }

        function a(e) {
            var t = (e.className + " " + (e.parentNode ? e.parentNode.className : "")).split(/\s+/);
            return t = t.map(function(e) {
                return e.replace(/^lang(uage)?-/, "")
            }), t.filter(function(e) {
                return w(e) || /no(-?)highlight/.test(e)
            })[0]
        }

        function r(e, t) {
            var n = {};
            for (var i in e) n[i] = e[i];
            if (t)
                for (var i in t) n[i] = t[i];
            return n
        }

        function o(e) {
            var t = [];
            return function i(e, a) {
                for (var r = e.firstChild; r; r = r.nextSibling) 3 == r.nodeType ? a += r.nodeValue.length : 1 == r.nodeType && (t.push({
                    event: "start",
                    offset: a,
                    node: r
                }), a = i(r, a), n(r).match(/br|hr|img|input/) || t.push({
                    event: "stop",
                    offset: a,
                    node: r
                }));
                return a
            }(e, 0), t
        }

        function s(e, i, a) {
            function r() {
                return e.length && i.length ? e[0].offset != i[0].offset ? e[0].offset < i[0].offset ? e : i : "start" == i[0].event ? e : i : e.length ? e : i
            }

            function o(e) {
                function i(e) {
                    return " " + e.nodeName + '="' + t(e.value) + '"'
                }
                u += "<" + n(e) + Array.prototype.map.call(e.attributes, i).join("") + ">"
            }

            function s(e) {
                u += "</" + n(e) + ">"
            }

            function l(e) {
                ("start" == e.event ? o : s)(e.node)
            }
            for (var c = 0, u = "", d = []; e.length || i.length;) {
                var p = r();
                if (u += t(a.substr(c, p[0].offset - c)), c = p[0].offset, p == e) {
                    d.reverse().forEach(s);
                    do l(p.splice(0, 1)[0]), p = r(); while (p == e && p.length && p[0].offset == c);
                    d.reverse().forEach(o)
                } else "start" == p[0].event ? d.push(p[0].node) : d.pop(), l(p.splice(0, 1)[0])
            }
            return u + t(a.substr(c))
        }

        function l(e) {
            function t(e) {
                return e && e.source || e
            }

            function n(n, i) {
                return RegExp(t(n), "m" + (e.cI ? "i" : "") + (i ? "g" : ""))
            }

            function i(a, o) {
                if (!a.compiled) {
                    if (a.compiled = !0, a.k = a.k || a.bK, a.k) {
                        var s = {},
                            l = function(t, n) {
                                e.cI && (n = n.toLowerCase()), n.split(" ").forEach(function(e) {
                                    var n = e.split("|");
                                    s[n[0]] = [t, n[1] ? Number(n[1]) : 1]
                                })
                            };
                        "string" == typeof a.k ? l("keyword", a.k) : Object.keys(a.k).forEach(function(e) {
                            l(e, a.k[e])
                        }), a.k = s
                    }
                    a.lR = n(a.l || /\b[A-Za-z0-9_]+\b/, !0), o && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = n(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = n(a.e)), a.tE = t(a.e) || "", a.eW && o.tE && (a.tE += (a.e ? "|" : "") + o.tE)), a.i && (a.iR = n(a.i)), void 0 === a.r && (a.r = 1), a.c || (a.c = []);
                    var c = [];
                    a.c.forEach(function(e) {
                        e.v ? e.v.forEach(function(t) {
                            c.push(r(e, t))
                        }) : c.push("self" == e ? a : e)
                    }), a.c = c, a.c.forEach(function(e) {
                        i(e, a)
                    }), a.starts && i(a.starts, o);
                    var u = a.c.map(function(e) {
                        return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                    }).concat([a.tE, a.i]).map(t).filter(Boolean);
                    a.t = u.length ? n(u.join("|"), !0) : {
                        exec: function() {
                            return null
                        }
                    }
                }
            }
            i(e)
        }

        function c(e, n, a, r) {
            function o(e, t) {
                for (var n = 0; n < t.c.length; n++)
                    if (i(t.c[n].bR, e)) return t.c[n]
            }

            function s(e, t) {
                return i(e.eR, t) ? e : e.eW ? s(e.parent, t) : void 0
            }

            function d(e, t) {
                return !a && i(t.iR, e)
            }

            function p(e, t) {
                var n = k.cI ? t[0].toLowerCase() : t[0];
                return e.k.hasOwnProperty(n) && e.k[n]
            }

            function f(e, t, n, i) {
                var a = i ? "" : y.classPrefix,
                    r = '<span class="' + a,
                    o = n ? "" : "</span>";
                return r += e + '">', r + t + o
            }

            function h() {
                if (!x.k) return t(E);
                var e = "",
                    n = 0;
                x.lR.lastIndex = 0;
                for (var i = x.lR.exec(E); i;) {
                    e += t(E.substr(n, i.index - n));
                    var a = p(x, i);
                    a ? (S += a[1], e += f(a[0], t(i[0]))) : e += t(i[0]), n = x.lR.lastIndex, i = x.lR.exec(E)
                }
                return e + t(E.substr(n))
            }

            function g() {
                if (x.sL && !_[x.sL]) return t(E);
                var e = x.sL ? c(x.sL, E, !0, C[x.sL]) : u(E);
                return x.r > 0 && (S += e.r), "continuous" == x.subLanguageMode && (C[x.sL] = e.top), f(e.language, e.value, !1, !0)
            }

            function m() {
                return void 0 !== x.sL ? g() : h()
            }

            function b(e, n) {
                var i = e.cN ? f(e.cN, "", !0) : "";
                e.rB ? ($ += i, E = "") : e.eB ? ($ += t(n) + i, E = "") : ($ += i, E = n), x = Object.create(e, {
                    parent: {
                        value: x
                    }
                })
            }

            function v(e, n) {
                if (E += e, void 0 === n) return $ += m(), 0;
                var i = o(n, x);
                if (i) return $ += m(), b(i, n), i.rB ? 0 : n.length;
                var a = s(x, n);
                if (a) {
                    var r = x;
                    r.rE || r.eE || (E += n), $ += m();
                    do x.cN && ($ += "</span>"), S += x.r, x = x.parent; while (x != a.parent);
                    return r.eE && ($ += t(n)), E = "", a.starts && b(a.starts, ""), r.rE ? 0 : n.length
                }
                if (d(n, x)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (x.cN || "<unnamed>") + '"');
                return E += n, n.length || 1
            }
            var k = w(e);
            if (!k) throw new Error('Unknown language: "' + e + '"');
            l(k);
            for (var x = r || k, C = {}, $ = "", T = x; T != k; T = T.parent) T.cN && ($ = f(T.cN, "", !0) + $);
            var E = "",
                S = 0;
            try {
                for (var N, I, A = 0; x.t.lastIndex = A, N = x.t.exec(n), N;) I = v(n.substr(A, N.index - A), N[0]), A = N.index + I;
                v(n.substr(A));
                for (var T = x; T.parent; T = T.parent) T.cN && ($ += "</span>");
                return {
                    r: S,
                    value: $,
                    language: e,
                    top: x
                }
            } catch (R) {
                if (-1 != R.message.indexOf("Illegal")) return {
                    r: 0,
                    value: t(n)
                };
                throw R
            }
        }

        function u(e, n) {
            n = n || y.languages || Object.keys(_);
            var i = {
                    r: 0,
                    value: t(e)
                },
                a = i;
            return n.forEach(function(t) {
                if (w(t)) {
                    var n = c(t, e, !1);
                    n.language = t, n.r > a.r && (a = n), n.r > i.r && (a = i, i = n)
                }
            }), a.language && (i.second_best = a), i
        }

        function d(e) {
            return y.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
                return t.replace(/\t/g, y.tabReplace)
            })), y.useBR && (e = e.replace(/\n/g, "<br>")), e
        }

        function p(e, t, n) {
            var i = t ? k[t] : n,
                a = [e.trim()];
            return e.match(/(\s|^)hljs(\s|$)/) || a.push("hljs"), i && a.push(i), a.join(" ").trim()
        }

        function f(e) {
            var t = a(e);
            if (!/no(-?)highlight/.test(t)) {
                var n;
                y.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e;
                var i = n.textContent,
                    r = t ? c(t, i, !0) : u(i),
                    l = o(n);
                if (l.length) {
                    var f = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                    f.innerHTML = r.value, r.value = s(l, o(f), i)
                }
                r.value = d(r.value), e.innerHTML = r.value, e.className = p(e.className, t, r.language), e.result = {
                    language: r.language,
                    re: r.r
                }, r.second_best && (e.second_best = {
                    language: r.second_best.language,
                    re: r.second_best.r
                })
            }
        }

        function h(e) {
            y = r(y, e)
        }

        function g() {
            if (!g.called) {
                g.called = !0;
                var e = document.querySelectorAll("pre code");
                Array.prototype.forEach.call(e, f)
            }
        }

        function m() {
            addEventListener("DOMContentLoaded", g, !1), addEventListener("load", g, !1)
        }

        function b(t, n) {
            var i = _[t] = n(e);
            i.aliases && i.aliases.forEach(function(e) {
                k[e] = t
            })
        }

        function v() {
            return Object.keys(_)
        }

        function w(e) {
            return _[e] || _[k[e]]
        }
        var y = {
                classPrefix: "hljs-",
                tabReplace: null,
                useBR: !1,
                languages: void 0
            },
            _ = {},
            k = {};
        return e.highlight = c, e.highlightAuto = u, e.fixMarkup = d, e.highlightBlock = f, e.configure = h, e.initHighlighting = g, e.initHighlightingOnLoad = m, e.registerLanguage = b, e.listLanguages = v, e.getLanguage = w, e.inherit = r, e.IR = "[a-zA-Z][a-zA-Z0-9_]*", e.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
            b: "\\\\[\\s\\S]",
            r: 0
        }, e.ASM = {
            cN: "string",
            b: "'",
            e: "'",
            i: "\\n",
            c: [e.BE]
        }, e.QSM = {
            cN: "string",
            b: '"',
            e: '"',
            i: "\\n",
            c: [e.BE]
        }, e.PWM = {
            b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
        }, e.CLCM = {
            cN: "comment",
            b: "//",
            e: "$",
            c: [e.PWM]
        }, e.CBCM = {
            cN: "comment",
            b: "/\\*",
            e: "\\*/",
            c: [e.PWM]
        }, e.HCM = {
            cN: "comment",
            b: "#",
            e: "$",
            c: [e.PWM]
        }, e.NM = {
            cN: "number",
            b: e.NR,
            r: 0
        }, e.CNM = {
            cN: "number",
            b: e.CNR,
            r: 0
        }, e.BNM = {
            cN: "number",
            b: e.BNR,
            r: 0
        }, e.CSSNM = {
            cN: "number",
            b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
            r: 0
        }, e.RM = {
            cN: "regexp",
            b: /\//,
            e: /\/[gimuy]*/,
            i: /\n/,
            c: [e.BE, {
                b: /\[/,
                e: /\]/,
                r: 0,
                c: [e.BE]
            }]
        }, e.TM = {
            cN: "title",
            b: e.IR,
            r: 0
        }, e.UTM = {
            cN: "title",
            b: e.UIR,
            r: 0
        }, e
    }), hljs.registerLanguage("coffeescript", function(e) {
        var t = {
                keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
                literal: "true false null undefined yes no on off",
                reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",
                built_in: "npm require console print module global window document"
            },
            n = "[A-Za-z$_][0-9A-Za-z$_]*",
            i = {
                cN: "subst",
                b: /#\{/,
                e: /}/,
                k: t
            },
            a = [e.BNM, e.inherit(e.CNM, {
                starts: {
                    e: "(\\s*/)?",
                    r: 0
                }
            }), {
                cN: "string",
                v: [{
                    b: /'''/,
                    e: /'''/,
                    c: [e.BE]
                }, {
                    b: /'/,
                    e: /'/,
                    c: [e.BE]
                }, {
                    b: /"""/,
                    e: /"""/,
                    c: [e.BE, i]
                }, {
                    b: /"/,
                    e: /"/,
                    c: [e.BE, i]
                }]
            }, {
                cN: "regexp",
                v: [{
                    b: "///",
                    e: "///",
                    c: [i, e.HCM]
                }, {
                    b: "//[gim]*",
                    r: 0
                }, {
                    b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
                }]
            }, {
                cN: "property",
                b: "@" + n
            }, {
                b: "`",
                e: "`",
                eB: !0,
                eE: !0,
                sL: "javascript"
            }];
        i.c = a;
        var r = e.inherit(e.TM, {
                b: n
            }),
            o = "(\\(.*\\))?\\s*\\B[-=]>",
            s = {
                cN: "params",
                b: "\\([^\\(]",
                rB: !0,
                c: [{
                    b: /\(/,
                    e: /\)/,
                    k: t,
                    c: ["self"].concat(a)
                }]
            };
        return {
            aliases: ["coffee", "cson", "iced"],
            k: t,
            i: /\/\*/,
            c: a.concat([{
                cN: "comment",
                b: "###",
                e: "###",
                c: [e.PWM]
            }, e.HCM, {
                cN: "function",
                b: "^\\s*" + n + "\\s*=\\s*" + o,
                e: "[-=]>",
                rB: !0,
                c: [r, s]
            }, {
                b: /[:\(,=]\s*/,
                r: 0,
                c: [{
                    cN: "function",
                    b: o,
                    e: "[-=]>",
                    rB: !0,
                    c: [s]
                }]
            }, {
                cN: "class",
                bK: "class",
                e: "$",
                i: /[:="\[\]]/,
                c: [{
                    bK: "extends",
                    eW: !0,
                    i: /[:="\[\]]/,
                    c: [r]
                }, r]
            }, {
                cN: "attribute",
                b: n + ":",
                e: ":",
                rB: !0,
                rE: !0,
                r: 0
            }])
        }
    }), hljs.registerLanguage("apache", function(e) {
        var t = {
            cN: "number",
            b: "[\\$%]\\d+"
        };
        return {
            aliases: ["apacheconf"],
            cI: !0,
            c: [e.HCM, {
                cN: "tag",
                b: "</?",
                e: ">"
            }, {
                cN: "keyword",
                b: /\w+/,
                r: 0,
                k: {
                    common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
                },
                starts: {
                    e: /$/,
                    r: 0,
                    k: {
                        literal: "on off all"
                    },
                    c: [{
                        cN: "sqbracket",
                        b: "\\s\\[",
                        e: "\\]$"
                    }, {
                        cN: "cbracket",
                        b: "[\\$%]\\{",
                        e: "\\}",
                        c: ["self", t]
                    }, t, e.QSM]
                }
            }],
            i: /\S/
        }
    }), hljs.registerLanguage("http", function() {
        return {
            i: "\\S",
            c: [{
                cN: "status",
                b: "^HTTP/[0-9\\.]+",
                e: "$",
                c: [{
                    cN: "number",
                    b: "\\b\\d{3}\\b"
                }]
            }, {
                cN: "request",
                b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
                rB: !0,
                e: "$",
                c: [{
                    cN: "string",
                    b: " ",
                    e: " ",
                    eB: !0,
                    eE: !0
                }]
            }, {
                cN: "attribute",
                b: "^\\w",
                e: ": ",
                eE: !0,
                i: "\\n|\\s|=",
                starts: {
                    cN: "string",
                    e: "$"
                }
            }, {
                b: "\\n\\n",
                starts: {
                    sL: "",
                    eW: !0
                }
            }]
        }
    }), hljs.registerLanguage("cs", function(e) {
        var t = "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",
            n = e.IR + "(<" + e.IR + ">)?";
        return {
            aliases: ["csharp"],
            k: t,
            i: /::/,
            c: [{
                cN: "comment",
                b: "///",
                e: "$",
                rB: !0,
                c: [{
                    cN: "xmlDocTag",
                    v: [{
                        b: "///",
                        r: 0
                    }, {
                        b: "<!--|-->"
                    }, {
                        b: "</?",
                        e: ">"
                    }]
                }]
            }, e.CLCM, e.CBCM, {
                cN: "preprocessor",
                b: "#",
                e: "$",
                k: "if else elif endif define undef warning error line region endregion pragma checksum"
            }, {
                cN: "string",
                b: '@"',
                e: '"',
                c: [{
                    b: '""'
                }]
            }, e.ASM, e.QSM, e.CNM, {
                bK: "class namespace interface",
                e: /[{;=]/,
                i: /[^\s:]/,
                c: [e.TM, e.CLCM, e.CBCM]
            }, {
                bK: "new return throw await",
                r: 0
            }, {
                cN: "function",
                b: "(" + n + "\\s+)+" + e.IR + "\\s*\\(",
                rB: !0,
                e: /[{;=]/,
                eE: !0,
                k: t,
                c: [{
                    b: e.IR + "\\s*\\(",
                    rB: !0,
                    c: [e.TM],
                    r: 0
                }, {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    k: t,
                    r: 0,
                    c: [e.ASM, e.QSM, e.CNM, e.CBCM]
                }, e.CLCM, e.CBCM]
            }]
        }
    }), hljs.registerLanguage("java", function(e) {
        var t = e.UIR + "(<" + e.UIR + ">)?",
            n = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",
            i = "(\\b(0b[01_]+)|\\b0[xX][a-fA-F0-9_]+|(\\b[\\d_]+(\\.[\\d_]*)?|\\.[\\d_]+)([eE][-+]?\\d+)?)[lLfF]?",
            a = {
                cN: "number",
                b: i,
                r: 0
            };
        return {
            aliases: ["jsp"],
            k: n,
            i: /<\//,
            c: [{
                cN: "javadoc",
                b: "/\\*\\*",
                e: "\\*/",
                r: 0,
                c: [{
                    cN: "javadoctag",
                    b: "(^|\\s)@[A-Za-z]+"
                }]
            }, e.CLCM, e.CBCM, e.ASM, e.QSM, {
                cN: "class",
                bK: "class interface",
                e: /[{;=]/,
                eE: !0,
                k: "class interface",
                i: /[:"\[\]]/,
                c: [{
                    bK: "extends implements"
                }, e.UTM]
            }, {
                bK: "new throw return",
                r: 0
            }, {
                cN: "function",
                b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
                rB: !0,
                e: /[{;=]/,
                eE: !0,
                k: n,
                c: [{
                    b: e.UIR + "\\s*\\(",
                    rB: !0,
                    r: 0,
                    c: [e.UTM]
                }, {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    k: n,
                    r: 0,
                    c: [e.ASM, e.QSM, e.CNM, e.CBCM]
                }, e.CLCM, e.CBCM]
            }, a, {
                cN: "annotation",
                b: "@[A-Za-z]+"
            }]
        }
    }), hljs.registerLanguage("sql", function(e) {
        var t = {
            cN: "comment",
            b: "--",
            e: "$"
        };
        return {
            cI: !0,
            i: /[<>]/,
            c: [{
                cN: "operator",
                bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate savepoint release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup",
                e: /;/,
                eW: !0,
                k: {
                    keyword: "abs absolute acos action add adddate addtime aes_decrypt aes_encrypt after aggregate all allocate alter analyze and any are as asc ascii asin assertion at atan atan2 atn2 authorization authors avg backup before begin benchmark between bin binlog bit_and bit_count bit_length bit_or bit_xor both by cache call cascade cascaded case cast catalog ceil ceiling chain change changed char_length character_length charindex charset check checksum checksum_agg choose close coalesce coercibility collate collation collationproperty column columns columns_updated commit compress concat concat_ws concurrent connect connection connection_id consistent constraint constraints continue contributors conv convert convert_tz corresponding cos cot count count_big crc32 create cross cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime data database databases datalength date_add date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear deallocate declare decode default deferrable deferred degrees delayed delete des_decrypt des_encrypt des_key_file desc describe descriptor diagnostics difference disconnect distinct distinctrow div do domain double drop dumpfile each else elt enclosed encode encrypt end end-exec engine engines eomonth errors escape escaped event eventdata events except exception exec execute exists exp explain export_set extended external extract fast fetch field fields find_in_set first first_value floor flush for force foreign format found found_rows from from_base64 from_days from_unixtime full function get get_format get_lock getdate getutcdate global go goto grant grants greatest group group_concat grouping grouping_id gtid_subset gtid_subtract handler having help hex high_priority hosts hour ident_current ident_incr ident_seed identified identity if ifnull ignore iif ilike immediate in index indicator inet6_aton inet6_ntoa inet_aton inet_ntoa infile initially inner innodb input insert install instr intersect into is is_free_lock is_ipv4 is_ipv4_compat is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation join key kill language last last_day last_insert_id last_value lcase lead leading least leaves left len lenght level like limit lines ln load load_file local localtime localtimestamp locate lock log log10 log2 logfile logs low_priority lower lpad ltrim make_set makedate maketime master master_pos_wait match matched max md5 medium merge microsecond mid min minute mod mode module month monthname mutex name_const names national natural nchar next no no_write_to_binlog not now nullif nvarchar oct octet_length of old_password on only open optimize option optionally or ord order outer outfile output pad parse partial partition password patindex percent_rank percentile_cont percentile_disc period_add period_diff pi plugin position pow power pragma precision prepare preserve primary prior privileges procedure procedure_analyze processlist profile profiles public publishingservername purge quarter query quick quote quotename radians rand read references regexp relative relaylog release release_lock rename repair repeat replace replicate reset restore restrict return returns reverse revoke right rlike rollback rollup round row row_count rows rpad rtrim savepoint schema scroll sec_to_time second section select serializable server session session_user set sha sha1 sha2 share show sign sin size slave sleep smalldatetimefromparts snapshot some soname soundex sounds_like space sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sql_variant_property sqlstate sqrt square start starting status std stddev stddev_pop stddev_samp stdev stdevp stop str str_to_date straight_join strcmp string stuff subdate substr substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset system_user sysutcdatetime table tables tablespace tan temporary terminated tertiary_weights then time time_format time_to_sec timediff timefromparts timestamp timestampadd timestampdiff timezone_hour timezone_minute to to_base64 to_days to_seconds todatetimeoffset trailing transaction translation trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse ucase uncompress uncompressed_length unhex unicode uninstall union unique unix_timestamp unknown unlock update upgrade upped upper usage use user user_resources using utc_date utc_time utc_timestamp uuid uuid_short validate_password_strength value values var var_pop var_samp variables variance varp version view warnings week weekday weekofyear weight_string when whenever where with work write xml xor year yearweek zon",
                    literal: "true false null",
                    built_in: "array bigint binary bit blob boolean char character date dec decimal float int integer interval number numeric real serial smallint varchar varying int8 serial8 text"
                },
                c: [{
                    cN: "string",
                    b: "'",
                    e: "'",
                    c: [e.BE, {
                        b: "''"
                    }]
                }, {
                    cN: "string",
                    b: '"',
                    e: '"',
                    c: [e.BE, {
                        b: '""'
                    }]
                }, {
                    cN: "string",
                    b: "`",
                    e: "`",
                    c: [e.BE]
                }, e.CNM, e.CBCM, t]
            }, e.CBCM, t]
        }
    }), hljs.registerLanguage("nginx", function(e) {
        var t = {
                cN: "variable",
                v: [{
                    b: /\$\d+/
                }, {
                    b: /\$\{/,
                    e: /}/
                }, {
                    b: "[\\$\\@]" + e.UIR
                }]
            },
            n = {
                eW: !0,
                l: "[a-z/_]+",
                k: {
                    built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
                },
                r: 0,
                i: "=>",
                c: [e.HCM, {
                    cN: "string",
                    c: [e.BE, t],
                    v: [{
                        b: /"/,
                        e: /"/
                    }, {
                        b: /'/,
                        e: /'/
                    }]
                }, {
                    cN: "url",
                    b: "([a-z]+):/",
                    e: "\\s",
                    eW: !0,
                    eE: !0,
                    c: [t]
                }, {
                    cN: "regexp",
                    c: [e.BE, t],
                    v: [{
                        b: "\\s\\^",
                        e: "\\s|{|;",
                        rE: !0
                    }, {
                        b: "~\\*?\\s+",
                        e: "\\s|{|;",
                        rE: !0
                    }, {
                        b: "\\*(\\.[a-z\\-]+)+"
                    }, {
                        b: "([a-z\\-]+\\.)+\\*"
                    }]
                }, {
                    cN: "number",
                    b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
                }, {
                    cN: "number",
                    b: "\\b\\d+[kKmMgGdshdwy]*\\b",
                    r: 0
                }, t]
            };
        return {
            aliases: ["nginxconf"],
            c: [e.HCM, {
                b: e.UIR + "\\s",
                e: ";|{",
                rB: !0,
                c: [{
                    cN: "title",
                    b: e.UIR,
                    starts: n
                }],
                r: 0
            }],
            i: "[^\\s\\}]"
        }
    }), hljs.registerLanguage("xml", function() {
        var e = "[A-Za-z0-9\\._:-]+",
            t = {
                b: /<\?(php)?(?!\w)/,
                e: /\?>/,
                sL: "php",
                subLanguageMode: "continuous"
            },
            n = {
                eW: !0,
                i: /</,
                r: 0,
                c: [t, {
                    cN: "attribute",
                    b: e,
                    r: 0
                }, {
                    b: "=",
                    r: 0,
                    c: [{
                        cN: "value",
                        c: [t],
                        v: [{
                            b: /"/,
                            e: /"/
                        }, {
                            b: /'/,
                            e: /'/
                        }, {
                            b: /[^\s\/>]+/
                        }]
                    }]
                }]
            };
        return {
            aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
            cI: !0,
            c: [{
                cN: "doctype",
                b: "<!DOCTYPE",
                e: ">",
                r: 10,
                c: [{
                    b: "\\[",
                    e: "\\]"
                }]
            }, {
                cN: "comment",
                b: "<!--",
                e: "-->",
                r: 10
            }, {
                cN: "cdata",
                b: "<\\!\\[CDATA\\[",
                e: "\\]\\]>",
                r: 10
            }, {
                cN: "tag",
                b: "<style(?=\\s|>|$)",
                e: ">",
                k: {
                    title: "style"
                },
                c: [n],
                starts: {
                    e: "</style>",
                    rE: !0,
                    sL: "css"
                }
            }, {
                cN: "tag",
                b: "<script(?=\\s|>|$)",
                e: ">",
                k: {
                    title: "script"
                },
                c: [n],
                starts: {
                    e: "</script>",
                    rE: !0,
                    sL: "javascript"
                }
            }, t, {
                cN: "pi",
                b: /<\?\w+/,
                e: /\?>/,
                r: 10
            }, {
                cN: "tag",
                b: "</?",
                e: "/?>",
                c: [{
                    cN: "title",
                    b: /[^ \/><\n\t]+/,
                    r: 0
                }, n]
            }]
        }
    }), hljs.registerLanguage("diff", function() {
        return {
            aliases: ["patch"],
            c: [{
                cN: "chunk",
                r: 10,
                v: [{
                    b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/
                }, {
                    b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
                }, {
                    b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
                }]
            }, {
                cN: "header",
                v: [{
                    b: /Index: /,
                    e: /$/
                }, {
                    b: /=====/,
                    e: /=====$/
                }, {
                    b: /^\-\-\-/,
                    e: /$/
                }, {
                    b: /^\*{3} /,
                    e: /$/
                }, {
                    b: /^\+\+\+/,
                    e: /$/
                }, {
                    b: /\*{5}/,
                    e: /\*{5}$/
                }]
            }, {
                cN: "addition",
                b: "^\\+",
                e: "$"
            }, {
                cN: "deletion",
                b: "^\\-",
                e: "$"
            }, {
                cN: "change",
                b: "^\\!",
                e: "$"
            }]
        }
    }), hljs.registerLanguage("javascript", function(e) {
        return {
            aliases: ["js"],
            k: {
                keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
                literal: "true false null undefined NaN Infinity",
                built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"
            },
            c: [{
                cN: "pi",
                r: 10,
                v: [{
                    b: /^\s*('|")use strict('|")/
                }, {
                    b: /^\s*('|")use asm('|")/
                }]
            }, e.ASM, e.QSM, e.CLCM, e.CBCM, e.CNM, {
                b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
                k: "return throw case",
                c: [e.CLCM, e.CBCM, e.RM, {
                    b: /</,
                    e: />;/,
                    r: 0,
                    sL: "xml"
                }],
                r: 0
            }, {
                cN: "function",
                bK: "function",
                e: /\{/,
                eE: !0,
                c: [e.inherit(e.TM, {
                    b: /[A-Za-z$_][0-9A-Za-z$_]*/
                }), {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    c: [e.CLCM, e.CBCM],
                    i: /["'\(]/
                }],
                i: /\[|%/
            }, {
                b: /\$[(.]/
            }, {
                b: "\\." + e.IR,
                r: 0
            }]
        }
    }), hljs.registerLanguage("bash", function(e) {
        var t = {
                cN: "variable",
                v: [{
                    b: /\$[\w\d#@][\w\d_]*/
                }, {
                    b: /\$\{(.*?)\}/
                }]
            },
            n = {
                cN: "string",
                b: /"/,
                e: /"/,
                c: [e.BE, t, {
                    cN: "variable",
                    b: /\$\(/,
                    e: /\)/,
                    c: [e.BE]
                }]
            },
            i = {
                cN: "string",
                b: /'/,
                e: /'/
            };
        return {
            aliases: ["sh", "zsh"],
            l: /-?[a-z\.]+/,
            k: {
                keyword: "if then else elif fi for while in do done case esac function",
                literal: "true false",
                built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
                operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
            },
            c: [{
                cN: "shebang",
                b: /^#![^\n]+sh\s*$/,
                r: 10
            }, {
                cN: "function",
                b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                rB: !0,
                c: [e.inherit(e.TM, {
                    b: /\w[\w\d_]*/
                })],
                r: 0
            }, e.HCM, e.NM, n, i, t]
        }
    }), hljs.registerLanguage("objectivec", function(e) {
        var t = {
                keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
                literal: "false true FALSE TRUE nil YES NO NULL",
                built_in: "NSString NSData NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView NSView NSViewController NSWindow NSWindowController NSSet NSUUID NSIndexSet UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection NSURLSession NSURLSessionDataTask NSURLSessionDownloadTask NSURLSessionUploadTask NSURLResponseUIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
            },
            n = /[a-zA-Z@][a-zA-Z0-9_]*/,
            i = "@interface @class @protocol @implementation";
        return {
            aliases: ["m", "mm", "objc", "obj-c"],
            k: t,
            l: n,
            i: "</",
            c: [e.CLCM, e.CBCM, e.CNM, e.QSM, {
                cN: "string",
                v: [{
                    b: '@"',
                    e: '"',
                    i: "\\n",
                    c: [e.BE]
                }, {
                    b: "'",
                    e: "[^\\\\]'",
                    i: "[^\\\\][^']"
                }]
            }, {
                cN: "preprocessor",
                b: "#",
                e: "$",
                c: [{
                    cN: "title",
                    v: [{
                        b: '"',
                        e: '"'
                    }, {
                        b: "<",
                        e: ">"
                    }]
                }]
            }, {
                cN: "class",
                b: "(" + i.split(" ").join("|") + ")\\b",
                e: "({|$)",
                eE: !0,
                k: i,
                l: n,
                c: [e.UTM]
            }, {
                cN: "variable",
                b: "\\." + e.UIR,
                r: 0
            }]
        }
    }), hljs.registerLanguage("markdown", function() {
        return {
            aliases: ["md", "mkdown", "mkd"],
            c: [{
                cN: "header",
                v: [{
                    b: "^#{1,6}",
                    e: "$"
                }, {
                    b: "^.+?\\n[=-]{2,}$"
                }]
            }, {
                b: "<",
                e: ">",
                sL: "xml",
                r: 0
            }, {
                cN: "bullet",
                b: "^([*+-]|(\\d+\\.))\\s+"
            }, {
                cN: "strong",
                b: "[*_]{2}.+?[*_]{2}"
            }, {
                cN: "emphasis",
                v: [{
                    b: "\\*.+?\\*"
                }, {
                    b: "_.+?_",
                    r: 0
                }]
            }, {
                cN: "blockquote",
                b: "^>\\s+",
                e: "$"
            }, {
                cN: "code",
                v: [{
                    b: "`.+?`"
                }, {
                    b: "^( {4}|	)",
                    e: "$",
                    r: 0
                }]
            }, {
                cN: "horizontal_rule",
                b: "^[-\\*]{3,}",
                e: "$"
            }, {
                b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
                rB: !0,
                c: [{
                    cN: "link_label",
                    b: "\\[",
                    e: "\\]",
                    eB: !0,
                    rE: !0,
                    r: 0
                }, {
                    cN: "link_url",
                    b: "\\]\\(",
                    e: "\\)",
                    eB: !0,
                    eE: !0
                }, {
                    cN: "link_reference",
                    b: "\\]\\[",
                    e: "\\]",
                    eB: !0,
                    eE: !0
                }],
                r: 10
            }, {
                b: "^\\[.+\\]:",
                rB: !0,
                c: [{
                    cN: "link_reference",
                    b: "\\[",
                    e: "\\]:",
                    eB: !0,
                    eE: !0,
                    starts: {
                        cN: "link_url",
                        e: "$"
                    }
                }]
            }]
        }
    }), hljs.registerLanguage("json", function(e) {
        var t = {
                literal: "true false null"
            },
            n = [e.QSM, e.CNM],
            i = {
                cN: "value",
                e: ",",
                eW: !0,
                eE: !0,
                c: n,
                k: t
            },
            a = {
                b: "{",
                e: "}",
                c: [{
                    cN: "attribute",
                    b: '\\s*"',
                    e: '"\\s*:\\s*',
                    eB: !0,
                    eE: !0,
                    c: [e.BE],
                    i: "\\n",
                    starts: i
                }],
                i: "\\S"
            },
            r = {
                b: "\\[",
                e: "\\]",
                c: [e.inherit(i, {
                    cN: null
                })],
                i: "\\S"
            };
        return n.splice(n.length, 0, a, r), {
            c: n,
            k: t,
            i: "\\S"
        }
    }), hljs.registerLanguage("python", function(e) {
        var t = {
                cN: "prompt",
                b: /^(>>>|\.\.\.) /
            },
            n = {
                cN: "string",
                c: [e.BE],
                v: [{
                    b: /(u|b)?r?'''/,
                    e: /'''/,
                    c: [t],
                    r: 10
                }, {
                    b: /(u|b)?r?"""/,
                    e: /"""/,
                    c: [t],
                    r: 10
                }, {
                    b: /(u|r|ur)'/,
                    e: /'/,
                    r: 10
                }, {
                    b: /(u|r|ur)"/,
                    e: /"/,
                    r: 10
                }, {
                    b: /(b|br)'/,
                    e: /'/
                }, {
                    b: /(b|br)"/,
                    e: /"/
                }, e.ASM, e.QSM]
            },
            i = {
                cN: "number",
                r: 0,
                v: [{
                    b: e.BNR + "[lLjJ]?"
                }, {
                    b: "\\b(0o[0-7]+)[lLjJ]?"
                }, {
                    b: e.CNR + "[lLjJ]?"
                }]
            },
            a = {
                cN: "params",
                b: /\(/,
                e: /\)/,
                c: ["self", t, i, n]
            };
        return {
            aliases: ["py", "gyp"],
            k: {
                keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",
                built_in: "Ellipsis NotImplemented"
            },
            i: /(<\/|->|\?)/,
            c: [t, i, n, e.HCM, {
                v: [{
                    cN: "function",
                    bK: "def",
                    r: 10
                }, {
                    cN: "class",
                    bK: "class"
                }],
                e: /:/,
                i: /[${=;\n]/,
                c: [e.UTM, a]
            }, {
                cN: "decorator",
                b: /@/,
                e: /$/
            }, {
                b: /\b(print|exec)\(/
            }]
        }
    }), hljs.registerLanguage("ruby", function(e) {
        var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
            n = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
            i = {
                cN: "yardoctag",
                b: "@[A-Za-z]+"
            },
            a = {
                cN: "value",
                b: "#<",
                e: ">"
            },
            r = {
                cN: "comment",
                v: [{
                    b: "#",
                    e: "$",
                    c: [i]
                }, {
                    b: "^\\=begin",
                    e: "^\\=end",
                    c: [i],
                    r: 10
                }, {
                    b: "^__END__",
                    e: "\\n$"
                }]
            },
            o = {
                cN: "subst",
                b: "#\\{",
                e: "}",
                k: n
            },
            s = {
                cN: "string",
                c: [e.BE, o],
                v: [{
                    b: /'/,
                    e: /'/
                }, {
                    b: /"/,
                    e: /"/
                }, {
                    b: /`/,
                    e: /`/
                }, {
                    b: "%[qQwWx]?\\(",
                    e: "\\)"
                }, {
                    b: "%[qQwWx]?\\[",
                    e: "\\]"
                }, {
                    b: "%[qQwWx]?{",
                    e: "}"
                }, {
                    b: "%[qQwWx]?<",
                    e: ">"
                }, {
                    b: "%[qQwWx]?/",
                    e: "/"
                }, {
                    b: "%[qQwWx]?%",
                    e: "%"
                }, {
                    b: "%[qQwWx]?-",
                    e: "-"
                }, {
                    b: "%[qQwWx]?\\|",
                    e: "\\|"
                }, {
                    b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
                }]
            },
            l = {
                cN: "params",
                b: "\\(",
                e: "\\)",
                k: n
            },
            c = [s, a, r, {
                cN: "class",
                bK: "class module",
                e: "$|;",
                i: /=/,
                c: [e.inherit(e.TM, {
                    b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
                }), {
                    cN: "inheritance",
                    b: "<\\s*",
                    c: [{
                        cN: "parent",
                        b: "(" + e.IR + "::)?" + e.IR
                    }]
                }, r]
            }, {
                cN: "function",
                bK: "def",
                e: " |$|;",
                r: 0,
                c: [e.inherit(e.TM, {
                    b: t
                }), l, r]
            }, {
                cN: "constant",
                b: "(::)?(\\b[A-Z]\\w*(::)?)+",
                r: 0
            }, {
                cN: "symbol",
                b: e.UIR + "(\\!|\\?)?:",
                r: 0
            }, {
                cN: "symbol",
                b: ":",
                c: [s, {
                    b: t
                }],
                r: 0
            }, {
                cN: "number",
                b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                r: 0
            }, {
                cN: "variable",
                b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
            }, {
                b: "(" + e.RSR + ")\\s*",
                c: [a, r, {
                    cN: "regexp",
                    c: [e.BE, o],
                    i: /\n/,
                    v: [{
                        b: "/",
                        e: "/[a-z]*"
                    }, {
                        b: "%r{",
                        e: "}[a-z]*"
                    }, {
                        b: "%r\\(",
                        e: "\\)[a-z]*"
                    }, {
                        b: "%r!",
                        e: "![a-z]*"
                    }, {
                        b: "%r\\[",
                        e: "\\][a-z]*"
                    }]
                }],
                r: 0
            }];
        o.c = c, l.c = c;
        var u = "[>?]>",
            d = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
            p = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
            f = [{
                b: /^\s*=>/,
                cN: "status",
                starts: {
                    e: "$",
                    c: c
                }
            }, {
                cN: "prompt",
                b: "^(" + u + "|" + d + "|" + p + ")",
                starts: {
                    e: "$",
                    c: c
                }
            }];
        return {
            aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
            k: n,
            c: [r].concat(f).concat(c)
        }
    }), hljs.registerLanguage("cpp", function(e) {
        var t = {
            keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginaryintmax_t uintmax_t int8_t uint8_t int16_t uint16_t int32_t uint32_t  int64_t uint64_tint_least8_t uint_least8_t int_least16_t uint_least16_t int_least32_t uint_least32_tint_least64_t uint_least64_t int_fast8_t uint_fast8_t int_fast16_t uint_fast16_t int_fast32_tuint_fast32_t int_fast64_t uint_fast64_t intptr_t uintptr_t atomic_bool atomic_char atomic_scharatomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llongatomic_ullong atomic_wchar_t atomic_char16_t atomic_char32_t atomic_intmax_t atomic_uintmax_tatomic_intptr_t atomic_uintptr_t atomic_size_t atomic_ptrdiff_t atomic_int_least8_t atomic_int_least16_tatomic_int_least32_t atomic_int_least64_t atomic_uint_least8_t atomic_uint_least16_t atomic_uint_least32_tatomic_uint_least64_t atomic_int_fast8_t atomic_int_fast16_t atomic_int_fast32_t atomic_int_fast64_tatomic_uint_fast8_t atomic_uint_fast16_t atomic_uint_fast32_t atomic_uint_fast64_t",
            built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"
        };
        return {
            aliases: ["c", "h", "c++", "h++"],
            k: t,
            i: "</",
            c: [e.CLCM, e.CBCM, e.QSM, {
                cN: "string",
                b: "'\\\\?.",
                e: "'",
                i: "."
            }, {
                cN: "number",
                b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
            }, e.CNM, {
                cN: "preprocessor",
                b: "#",
                e: "$",
                k: "if else elif endif define undef warning error line pragma",
                c: [{
                    b: 'include\\s*[<"]',
                    e: '[>"]',
                    k: "include",
                    i: "\\n"
                }, e.CLCM]
            }, {
                cN: "stl_container",
                b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
                e: ">",
                k: t,
                c: ["self"]
            }, {
                b: e.IR + "::"
            }, {
                bK: "new throw return",
                r: 0
            }, {
                cN: "function",
                b: "(" + e.IR + "\\s+)+" + e.IR + "\\s*\\(",
                rB: !0,
                e: /[{;=]/,
                eE: !0,
                k: t,
                c: [{
                    b: e.IR + "\\s*\\(",
                    rB: !0,
                    c: [e.TM],
                    r: 0
                }, {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    k: t,
                    r: 0,
                    c: [e.CBCM]
                }, e.CLCM, e.CBCM]
            }]
        }
    }), hljs.registerLanguage("css", function(e) {
        var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
            n = {
                cN: "function",
                b: t + "\\(",
                rB: !0,
                eE: !0,
                e: "\\("
            };
        return {
            cI: !0,
            i: "[=/|']",
            c: [e.CBCM, {
                cN: "id",
                b: "\\#[A-Za-z0-9_-]+"
            }, {
                cN: "class",
                b: "\\.[A-Za-z0-9_-]+",
                r: 0
            }, {
                cN: "attr_selector",
                b: "\\[",
                e: "\\]",
                i: "$"
            }, {
                cN: "pseudo",
                b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
            }, {
                cN: "at_rule",
                b: "@(font-face|page)",
                l: "[a-z-]+",
                k: "font-face page"
            }, {
                cN: "at_rule",
                b: "@",
                e: "[{;]",
                c: [{
                    cN: "keyword",
                    b: /\S+/
                }, {
                    b: /\s/,
                    eW: !0,
                    eE: !0,
                    r: 0,
                    c: [n, e.ASM, e.QSM, e.CSSNM]
                }]
            }, {
                cN: "tag",
                b: t,
                r: 0
            }, {
                cN: "rules",
                b: "{",
                e: "}",
                i: "[^\\s]",
                r: 0,
                c: [e.CBCM, {
                    cN: "rule",
                    b: "[^\\s]",
                    rB: !0,
                    e: ";",
                    eW: !0,
                    c: [{
                        cN: "attribute",
                        b: "[A-Z\\_\\.\\-]+",
                        e: ":",
                        eE: !0,
                        i: "[^\\s]",
                        starts: {
                            cN: "value",
                            eW: !0,
                            eE: !0,
                            c: [n, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                                cN: "hexcolor",
                                b: "#[0-9A-Fa-f]+"
                            }, {
                                cN: "important",
                                b: "!important"
                            }]
                        }
                    }]
                }]
            }]
        }
    }), hljs.registerLanguage("php", function(e) {
        var t = {
                cN: "variable",
                b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
            },
            n = {
                cN: "preprocessor",
                b: /<\?(php)?|\?>/
            },
            i = {
                cN: "string",
                c: [e.BE, n],
                v: [{
                    b: 'b"',
                    e: '"'
                }, {
                    b: "b'",
                    e: "'"
                }, e.inherit(e.ASM, {
                    i: null
                }), e.inherit(e.QSM, {
                    i: null
                })]
            },
            a = {
                v: [e.BNM, e.CNM]
            };
        return {
            aliases: ["php3", "php4", "php5", "php6"],
            cI: !0,
            k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
            c: [e.CLCM, e.HCM, {
                cN: "comment",
                b: "/\\*",
                e: "\\*/",
                c: [{
                    cN: "phpdoc",
                    b: "\\s@[A-Za-z]+"
                }, n]
            }, {
                cN: "comment",
                b: "__halt_compiler.+?;",
                eW: !0,
                k: "__halt_compiler",
                l: e.UIR
            }, {
                cN: "string",
                b: "<<<['\"]?\\w+['\"]?$",
                e: "^\\w+;",
                c: [e.BE]
            }, n, t, {
                b: /->+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
            }, {
                cN: "function",
                bK: "function",
                e: /[;{]/,
                eE: !0,
                i: "\\$|\\[|%",
                c: [e.UTM, {
                    cN: "params",
                    b: "\\(",
                    e: "\\)",
                    c: ["self", t, e.CBCM, i, a]
                }]
            }, {
                cN: "class",
                bK: "class interface",
                e: "{",
                eE: !0,
                i: /[:\(\$"]/,
                c: [{
                    bK: "extends implements"
                }, e.UTM]
            }, {
                bK: "namespace",
                e: ";",
                i: /[\.']/,
                c: [e.UTM]
            }, {
                bK: "use",
                e: ";",
                c: [e.UTM]
            }, {
                b: "=>"
            }, i, a]
        }
    }), hljs.registerLanguage("perl", function(e) {
        var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
            n = {
                cN: "subst",
                b: "[$@]\\{",
                e: "\\}",
                k: t
            },
            i = {
                b: "->{",
                e: "}"
            },
            a = {
                cN: "variable",
                v: [{
                    b: /\$\d/
                }, {
                    b: /[\$\%\@](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/
                }, {
                    b: /[\$\%\@][^\s\w{]/,
                    r: 0
                }]
            },
            r = {
                cN: "comment",
                b: "^(__END__|__DATA__)",
                e: "\\n$",
                r: 5
            },
            o = [e.BE, n, a],
            s = [a, e.HCM, r, {
                cN: "comment",
                b: "^\\=\\w",
                e: "\\=cut",
                eW: !0
            }, i, {
                cN: "string",
                c: o,
                v: [{
                    b: "q[qwxr]?\\s*\\(",
                    e: "\\)",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\[",
                    e: "\\]",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\{",
                    e: "\\}",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\|",
                    e: "\\|",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\<",
                    e: "\\>",
                    r: 5
                }, {
                    b: "qw\\s+q",
                    e: "q",
                    r: 5
                }, {
                    b: "'",
                    e: "'",
                    c: [e.BE]
                }, {
                    b: '"',
                    e: '"'
                }, {
                    b: "`",
                    e: "`",
                    c: [e.BE]
                }, {
                    b: "{\\w+}",
                    c: [],
                    r: 0
                }, {
                    b: "-?\\w+\\s*\\=\\>",
                    c: [],
                    r: 0
                }]
            }, {
                cN: "number",
                b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                r: 0
            }, {
                b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
                k: "split return print reverse grep",
                r: 0,
                c: [e.HCM, r, {
                    cN: "regexp",
                    b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
                    r: 10
                }, {
                    cN: "regexp",
                    b: "(m|qr)?/",
                    e: "/[a-z]*",
                    c: [e.BE],
                    r: 0
                }]
            }, {
                cN: "sub",
                bK: "sub",
                e: "(\\s*\\(.*?\\))?[;{]",
                r: 5
            }, {
                cN: "operator",
                b: "-\\w\\b",
                r: 0
            }];
        return n.c = s, i.c = s, {
            aliases: ["pl"],
            k: t,
            c: s
        }
    }), hljs.registerLanguage("ini", function(e) {
        return {
            cI: !0,
            i: /\S/,
            c: [{
                cN: "comment",
                b: ";",
                e: "$"
            }, {
                cN: "title",
                b: "^\\[",
                e: "\\]"
            }, {
                cN: "setting",
                b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
                e: "$",
                c: [{
                    cN: "value",
                    eW: !0,
                    k: "on off true false yes no",
                    c: [e.QSM, e.NM],
                    r: 0
                }]
            }]
        }
    }), hljs.registerLanguage("makefile", function(e) {
        var t = {
            cN: "variable",
            b: /\$\(/,
            e: /\)/,
            c: [e.BE]
        };
        return {
            aliases: ["mk", "mak"],
            c: [e.HCM, {
                b: /^\w+\s*\W*=/,
                rB: !0,
                r: 0,
                starts: {
                    cN: "constant",
                    e: /\s*\W*=/,
                    eE: !0,
                    starts: {
                        e: /$/,
                        r: 0,
                        c: [t]
                    }
                }
            }, {
                cN: "title",
                b: /^[\w]+:\s*$/
            }, {
                cN: "phony",
                b: /^\.PHONY:/,
                e: /$/,
                k: ".PHONY",
                l: /[\.\w]+/
            }, {
                b: /^\t+/,
                e: /$/,
                r: 0,
                c: [e.QSM, t]
            }]
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
        e.fn.hoverIntent = function(t, n, i, a) {
            var r = {
                interval: a || 400,
                sensitivity: 5,
                timeout: 600
            };
            r = "object" == typeof t ? e.extend(r, t) : e.isFunction(n) ? e.extend(r, {
                over: t,
                out: n,
                selector: i
            }) : e.extend(r, {
                over: t,
                out: t,
                selector: n
            });
            var o, s, l, c, u = function(e) {
                    o = e.pageX, s = e.pageY
                },
                d = function(t, n) {
                    return n.hoverIntent_t = clearTimeout(n.hoverIntent_t), Math.sqrt((l - o) * (l - o) + (c - s) * (c - s)) < r.sensitivity ? (e(n).off("mousemove.hoverIntent", u), n.hoverIntent_s = !0, r.over.apply(n, [t])) : (l = o, c = s, n.hoverIntent_t = setTimeout(function() {
                        d(t, n)
                    }, r.interval), void 0)
                },
                p = function(e, t) {
                    return t.hoverIntent_t = clearTimeout(t.hoverIntent_t), t.hoverIntent_s = !1, r.out.apply(t, [e])
                },
                f = function(t) {
                    var n = e.extend({}, t),
                        i = this;
                    i.hoverIntent_t && (i.hoverIntent_t = clearTimeout(i.hoverIntent_t)), "mouseenter" === t.type ? (l = n.pageX, c = n.pageY, e(i).on("mousemove.hoverIntent", u), i.hoverIntent_s || (i.hoverIntent_t = setTimeout(function() {
                        d(n, i)
                    }, r.interval))) : (e(i).off("mousemove.hoverIntent", u), i.hoverIntent_s && (i.hoverIntent_t = setTimeout(function() {
                        p(n, i)
                    }, r.timeout)))
                };
            return this.on({
                "mouseenter.hoverIntent": f,
                "mouseleave.hoverIntent": f
            }, r.selector)
        }
    }(jQuery), define("jquery_hoverIntent", ["jquery"], function(e) {
        return function() {
            var t;
            return t || e.$.fn.hoverIntent
        }
    }(this)), define("sfAjax", ["jquery"], function(e) {
        "use strict";
        e.sfAjax = function(t, n, i, a) {
            var r, o, s, l;
            o = e.extend({
                id: t.data("id"),
                "do": t.data("do"),
                type: t.data("type")
            }, i), r = o["do"], s = r.indexOf("/cancel") > 0 ? r.replace("/cancel", "") : r + "/cancel", l = "/api/" + o.type + "/" + o.id + "/" + o["do"], e.post(l, function(e) {
                0 === e.status ? (t.data("do", s), n ? n(e) : location.reload()) : a && a(e)
            })
        }
    }),
    function(e) {
        "function" == typeof define && define.amd ? define("jquery_cookie", ["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
    }(function(e) {
        function t(e) {
            return s.raw ? e : encodeURIComponent(e)
        }

        function n(e) {
            return s.raw ? e : decodeURIComponent(e)
        }

        function i(e) {
            return t(s.json ? JSON.stringify(e) : String(e))
        }

        function a(e) {
            0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return e = decodeURIComponent(e.replace(o, " ")), s.json ? JSON.parse(e) : e
            } catch (t) {}
        }

        function r(t, n) {
            var i = s.raw ? t : a(t);
            return e.isFunction(n) ? n(i) : i
        }
        var o = /\+/g,
            s = e.cookie = function(a, o, l) {
                if (void 0 !== o && !e.isFunction(o)) {
                    if (l = e.extend({}, s.defaults, l), "number" == typeof l.expires) {
                        var c = l.expires,
                            u = l.expires = new Date;
                        u.setTime(+u + 864e5 * c)
                    }
                    return document.cookie = [t(a), "=", i(o), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
                }
                for (var d = a ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], f = 0, h = p.length; h > f; f++) {
                    var g = p[f].split("="),
                        m = n(g.shift()),
                        b = g.join("=");
                    if (a && a === m) {
                        d = r(b, o);
                        break
                    }
                    a || void 0 === (b = r(b)) || (d[m] = b)
                }
                return d
            };
        s.defaults = {}, e.removeCookie = function(t, n) {
            return void 0 === e.cookie(t) ? !1 : (e.cookie(t, "", e.extend({}, n, {
                expires: -1
            })), !e.cookie(t))
        }
    }),
    function(e, t, n, i) {
        var a = e(t);
        e.fn.lazyload = function(r) {
            function o() {
                var t = 0;
                l.each(function() {
                    var n = e(this);
                    if (!c.skip_invisible || n.is(":visible"))
                        if (e.abovethetop(this, c) || e.leftofbegin(this, c));
                        else if (e.belowthefold(this, c) || e.rightoffold(this, c)) {
                        if (++t > c.failure_limit) return !1
                    } else n.trigger("appear"), t = 0
                })
            }
            var s, l = this,
                c = {
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
            return r && (i !== r.failurelimit && (r.failure_limit = r.failurelimit, delete r.failurelimit), i !== r.effectspeed && (r.effect_speed = r.effectspeed, delete r.effectspeed), e.extend(c, r)), s = c.container === i || c.container === t ? a : e(c.container), 0 === c.event.indexOf("scroll") && s.bind(c.event, function() {
                return o()
            }), this.each(function() {
                var t = this,
                    n = e(t);
                t.loaded = !1, (n.attr("src") === i || n.attr("src") === !1) && n.is("img") && n.attr("src", c.placeholder), n.one("appear", function() {
                    if (!this.loaded) {
                        if (c.appear) {
                            var i = l.length;
                            c.appear.call(t, i, c)
                        }
                        e("<img />").bind("load", function() {
                            var i = n.attr("data-" + c.data_attribute);
                            n.hide(), n.is("img") ? n.attr("src", i) : n.css("background-image", "url('" + i + "')"), n[c.effect](c.effect_speed), t.loaded = !0;
                            var a = e.grep(l, function(e) {
                                return !e.loaded
                            });
                            if (l = e(a), c.load) {
                                var r = l.length;
                                c.load.call(t, r, c)
                            }
                        }).attr("src", n.attr("data-" + c.data_attribute))
                    }
                }), 0 !== c.event.indexOf("scroll") && n.bind(c.event, function() {
                    t.loaded || n.trigger("appear")
                })
            }), a.bind("resize", function() {
                o()
            }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && a.bind("pageshow", function(t) {
                t.originalEvent && t.originalEvent.persisted && l.each(function() {
                    e(this).trigger("appear")
                })
            }), e(n).ready(function() {
                o()
            }), this
        }, e.belowthefold = function(n, r) {
            var o;
            return o = r.container === i || r.container === t ? (t.innerHeight ? t.innerHeight : a.height()) + a.scrollTop() : e(r.container).offset().top + e(r.container).height(), o <= e(n).offset().top - r.threshold
        }, e.rightoffold = function(n, r) {
            var o;
            return o = r.container === i || r.container === t ? a.width() + a.scrollLeft() : e(r.container).offset().left + e(r.container).width(), o <= e(n).offset().left - r.threshold
        }, e.abovethetop = function(n, r) {
            var o;
            return o = r.container === i || r.container === t ? a.scrollTop() : e(r.container).offset().top, o >= e(n).offset().top + r.threshold + e(n).height()
        }, e.leftofbegin = function(n, r) {
            var o;
            return o = r.container === i || r.container === t ? a.scrollLeft() : e(r.container).offset().left, o >= e(n).offset().left + r.threshold + e(n).width()
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
    }(this)), define("typeHelper", ["jquery", "jquery_tmpl"], function(e) {
        "use strict";
        var t, n, i, a, r, o, s, l;
        s = '<ul class="dropdown-menu" role="menu"></ul>', a = void 0, t = void 0, i = void 0, n = void 0, r = void 0, o = ["gmail.com", "qq.com", "163.com", "hotmail.com", "sina.com", "126.com", "live.com", "live.cn", "vip.sina.com", "vip.qq.com", "sina.cn", "sohu.com", "139.com", "wo.com.cn", "189.cn", "21cn.com"], l = '<button class="btn btn-default result" type="button">${result}</button><a href="#" class="i-cancel ml10 delete-result">&times;</a>', e.fn.typeHelper = function(c) {
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
            }, c), n = e(this), 0 !== n.length && (n.after(e("<div></div>").addClass("typehelper")).siblings(".typehelper").append(n), t = n.parent().css("position", "relative"), e.tmpl(s).insertAfter(n), i = t.find("ul").hide().css("minWidth", n.outerWidth()), e.each(a.defaultList, function(t, n) {
                e.tmpl(a.tpl, n).appendTo(i)
            }), n.on("focus", function() {
                a.defaultList.length > 0 && e(this).parent().trigger("show.typehelper")
            }), n.on("input", function(t) {
                e(this).parent().trigger("search.typehelper"), e(this).parent().trigger("show.typehelper")
            }), n.on("keydown", function(t) {
                e(this).parent().trigger("select.typehelper", t)
            }), i.delegate("li", "mouseover", function() {
                e(this).siblings("li").removeClass("active"), e(this).addClass("active")
            }), n.on("blur", function() {
                e(this).parent().trigger("hide.typehelper"), a.autoSelect && (e(this).siblings("ul").find(".active").length > 0 ? e(this).parent().trigger("insert.typehelper", i.find(".active a")) : e(this).val(""))
            }), t.on("show.typehelper", function() {
                e(this).find("ul").show()
            }), t.on("hide.typehelper", function() {
                e(this).find("ul").hide()
            }), t.on("insert.typehelper", function(r, o) {
                t = e(this), n = t.find("input"), i = t.find("ul"), n.val(e(o).data("value")), e(".result", t).length > 0 && (e(".result", t).remove(), t.find(".delete-result").remove()), a.onlyResult && (n.hide(), i.after(e.tmpl(l, {
                    result: n.val()
                })), a.submitKey && n.data(a.submitKey, e(o).data(a.submitKey)), t.find(".result").on("click", function() {
                    e(this).siblings(".delete-result").remove(), e(this).remove(), n.show().focus(), t.trigger("search.typehelper")
                }), t.find(".delete-result").on("click", function() {
                    return e(this).siblings(".result").remove(), e(this).remove(), n.val("").show(), !1
                })), t.parents(".form-group").next(".form-group").find("input").focus(), a.insertHandler(e(o).data("value"))
            }), t.on("select.typehelper", function(a, r) {
                var o, s, l, c;
                if (t = e(this), n = t.find("input"), i = t.find("ul"), o = i.find("li"), r) switch (r.keyCode) {
                    case 38:
                        r.preventDefault(), o.length && (i.find(".active").length ? i.find(".active").removeClass("active").prev("li").addClass("active") : o.last().addClass("active"));
                        break;
                    case 40:
                        r.preventDefault(), o.length && (i.find(".active").length ? i.find(".active").removeClass("active").next("li").addClass("active") : o.first().addClass("active"));
                        break;
                    case 13:
                        if (r.stopPropagation(), r.preventDefault(), i.find(".active").length <= 0) return;
                        t.trigger("insert.typehelper", i.find(".active a")), t.trigger("hide.typehelper");
                        break;
                    case 9:
                        s = e(this).parents("form").find("input"), l = s.index(e("input:focus")), -1 !== l && (c = s.slice(l + 1), c.length && c.each(function() {
                            var t, n;
                            return n = e(this).attr("type"), t = ["text", "email", "password", "url"], e(this).val() || -1 === t.indexOf(n) ? void 0 : (e(this).focus(), !1)
                        }));
                        break;
                    case 27:
                        r.preventDefault();
                        break;
                    default:
                        return
                }
            }), t.on("search.typehelper", function() {
                var s, l, c, u;
                if (t = e(this), n = t.find("input"), i = t.find("ul"), n.val().length)
                    if (c = [], a.remoteData) a.remoteData(n.val(), function(t) {
                        c = t, c.length > 0 && (i.children().remove(), e.tmpl(a.tpl, c).appendTo(i), 1 === c.length && i.children().first().addClass("active"))
                    });
                    else {
                        for (u = 0, a.emailMode && (a.data = [{
                                name: n.val()
                            }], e.each(o, function(e, t) {
                                a.data.push({
                                    name: n.val().replace(/@.*$/, "") + "@" + t
                                })
                            })), r = a.data.length, l = 0; r > l && (s = a.data[l], !(0 === s.name.toLowerCase().indexOf(n.val().toLowerCase()) && (c.push(s), u++, u >= a.showNum)));) l++;
                        c.length > 0 && (i.children().remove(), e.tmpl(a.tpl, c).appendTo(i), (1 === c.length || a.emailMode) && i.children().first().addClass("active"))
                    }
            }), n.val().length > 0 && t.trigger("insert.typehelper", n))
        }
    }), define("main", ["sfModal", "mobile", "jquery_hoverIntent", "sfAjax", "bootstrap", "jquery_cookie", "jquery_lazyload", "typeHelper"], function(e, t) {
        var n, i, a, r, o, s, l, c, u;
        return r = function(e) {
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
        }, i = function() {
            $.getJSON("/api/user/stat", function(e) {
                var t;
                0 === e.status && (t = $("title"), e.data.events > 0 ? (e.data.events > 99 && (e.data.events = "99+"), $("#messageCount").siblings(".has-unread__count").remove(), $("#messageCount").after('<span class="has-unread__count">' + e.data.events + "</span>"), $("#m-messageCount").text(e.data.events), $(".mobile-menu__unreadpoint").show(), /^\(\d+[\+]?\)/.test(t.text()) ? t.text(t.text().replace(/^\(\d+[\+]?\)/, "(" + e.data.events + ")")) : t.text("(" + e.data.events + ")" + $("title").text())) : 0 === e.data.events && ($(".has-unread__count").remove(), t.text(t.text().replace(/^\(\d+[\+]?\)/, ""))), 0 !== e.data.drafts && ($("#draftCount .badge").remove(), $("#draftCount").append('<span class="badge">' + e.data.drafts + "</span>")), 0 !== e.data.invites && ($("#inviteCount .badge").remove(), $("#inviteCount").append('<span class="badge">' + e.data.invites + "</span>")))
            })
        }, s = function() {
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
        }, $(".addWeek").each(function(e, t) {
            $(this).append(" " + r($(this).html()))
        }), $('[data-toggle="tooltip"]').tooltip({
            container: "body"
        }), $("img.lazy").lazyload({
            effect: "fadeIn"
        }), window.oauthLogin = function(e) {
            -1 !== location.hostname.indexOf("segmentfault") ? location.reload() : location.href = "/"
        }, window.oauthRegister = function(e) {
            location.href = "/user/bind"
        }, n = {
            _: window.SF.token,
            staticUrl: window.SF.staticUrl,
            userId: $("#SFUserId").attr("value"),
            userRank: $("#SFUserRank").attr("value"),
            getMessage: i,
            login: t.login || s
        }, $(document).ajaxError(function(e, t, n) {
            413 === t.status ? ($("#uploading") && $("#uploading").text(""), alert("文件太大！")) : console.log("Ajax " + t.status + ": ", n.url)
        }), $(document).ajaxSend(function(e, t, i) {
            -1 === i.url.indexOf("?") ? i.url = i.url + "?_=" + n._ : i.url = i.url + "&_=" + n._
        }), $(document).ajaxComplete(function(t, i, a) {
            var r, o, s, l, c;
            i.responseText && (-1 !== i.responseText.indexOf("<br />") || -1 !== i.responseText.indexOf("<pre>exception ") ? console.log("警告：前方高能！", i.responseText) : i.responseJSON && 0 === i.responseJSON.status ? (-1 === a.url.indexOf("do=autoComplete") || -1 === a.url.indexOf("draft")) && ($(".error, .has-error").removeClass("error has-error"), $(".error--msg").remove()) : i.responseJSON && 1 === i.responseJSON.status && (c = i.responseJSON, -1 === a.url.indexOf("/user/stat") && "login" === c.data[0] ? n.login() : "robot" === c.data[0] ? location.href = "/stop-robot" : "unactivated" === c.data[0] ? $("#activate").modal("show") : "author" === c.data[0] ? e({
                title: "限制作者本人",
                content: "你是作者，无法对自己进行此操作",
                hideDone: !0
            }) : "follow" === c.data[0] ? e({
                title: "限制本人",
                content: "无法对自己进行此操作",
                hideDone: !0
            }) : "rank" === c.data[0] ? e({
                title: "声望值不够",
                content: "此操作要求你的声望值至少达到 " + c.data[1] + '，<a href="http://segmentfault.com/repu">如何获得声望？</a>',
                hideDone: !0
            }) : "like" === c.data[0] ? e({
                title: "无法进行此操作",
                content: "你已经赞过该条目。",
                hideDone: !0
            }) : "blocked" === c.data[0] ? e({
                title: "账号问题",
                content: '你的帐号因未知原因已被系统自动锁定，如需帮助，请发送邮件至 <a target="_blank" href="mailto:pr@segmentfault.com">pr@segmentfault.com</a> 联系管理员解决。',
                hideDone: !0
            }) : "form" === c.data[0] && (l = a.url.split("/")[2], l = l.split("?")[0], o = new RegExp("[?&]_=" + n._), s = a.url.replace(o, ""), r = !0, $.each(c.data[1], function(e, t) {
                var n, i, a, o;
                return "captcha" === e && ($("[name=captcha]").parents(".form-group").show(), $(".captcha").parent("a").click()), a = e.toLowerCase().replace(/\b[a-z]/g, function(e) {
                        return e.toUpperCase()
                    }), o = "#" + l + a, i = $("form#" + l + " *[name=" + e + "]").parents(".form-group"), 0 === i.length && (i = $("form#" + l.replace(/s$/, "") + " *[name=" + e + "]").parents(".form-group")), n = $('form[action="' + s + '"] *[name=' + e + "]").parents(".form-group"), n.length || (n = $("form *[name=" + e + "]").parents(".form-group")), n.length ? (n.find(".help-block").remove(), n.addClass("has-error"), n.find(".input-group").length > 0 ? n.find(".input-group").after('<span class="help-block err">' + t + "</span>") : n.find(".bootstrap-tagsinput").length ? n.find(".bootstrap-tagsinput").addClass("error").after('<span class="help-block err">' + t + "</span>") : n.find("[name=" + e + "]").after('<span class="help-block err">' + t + "</span>")) : i.length ? (i.find(".help-block.err").remove(), i.addClass("has-error"), i.find("[name=" + e + "]").after('<span class="help-block err">' + t + "</span>")) : ($("form#" + l + " *[name=" + e + "]").siblings(".error--msg").remove(), $("form#" + l + " *[name=" + e + "]").addClass("error").attr("data-error", t).after('<span class="error--msg">' + t + "</span>")),
                    $(o).length ? $(o).addClass("error").attr("data-error", t) : (o = "#" + l.replace(/s$/, "") + a, $(o).addClass("error").attr("data-error", t).after('<span class="error--msg">' + t + "</span>")), r ? (n.length && n.find("[name=" + e + "]").focus(), i.length && i.find("[name=" + e + "]").focus(), $(o).length && $(o).focus(), r = !1) : void 0
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
        }), $("body").delegate("form input", "keydown", function(e) {
            $(this).removeClass("error"), $(this).parents(".form-group").removeClass("has-error"), $(this).next(".help-block.err").remove(), $(this).next(".error--msg").remove()
        }), a = null, n.userId && (i(), a = setInterval(i, 6e4)), o = void 0, u = void 0, "undefined" != typeof document.hidden ? (o = "hidden", u = "visibilitychange") : "undefined" != typeof document.mozHidden ? (o = "mozHidden", u = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (o = "msHidden", u = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (o = "webkitHidden", u = "webkitvisibilitychange"), $("body").prepend('<div class="alert alert-warning topframe js-alert"><span class="content"></span><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div>'), c = window.navigator.userAgent, c.indexOf("Android") > 0 && ($("body").addClass("have-notify"), $(".js-alert").find(".content").html("<a style='color: #8a6d3b;' href='http://www.wandoujia.com/apps/com.segmentfault.app'>SegmentFault Android 客户端已上线！</a>").parent().show()), $(document).on(u, function() {
            document[o] ? clearInterval(a) : n.userId ? (i(), a = setInterval(i, 6e4)) : $.getJSON("/api/user/stat", function(e) {
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
        }), $(".topframe").length && $(".topframe .close").click(function(e) {
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
        }), l = function(e, t, n, i) {
            var a;
            return a = e, a.length > 0 && $(".write-btns a").each(function(e, t) {
                $(this).click(function(e) {
                    return a.modal("show"), !1
                })
            }), $(".activate-change", a).click(function(e) {
                $(".activate-showmail").hide(), $(".activate-form").show()
            }), $(".activate-cancel", a).click(function(e) {
                $(".activate-showmail").show(), $(".activate-form").hide()
            }), $(".activate-form").on("submit", function(e) {
                var t;
                return e.preventDefault(), t = $(this), $.post(n, {
                    mail: t.find(".mail").val()
                }, function(e) {
                    0 === e.status && (t.parent().find(".session-mail").text(t.find(".mail").val()), $(".activate-showmail").show(), $(".activate-form").hide(), location.reload())
                }), !1
            }), $(".activate-resend", a).click(function(e) {
                var n, a, r, o;
                a = $(this), n = a.siblings("span").find("span"), r = void 0, o = void 0, r = 120, r--, $.post(t, function(e) {
                    0 === e.status ? ($(".company-activete-tips").length && $(".company-activete-tips").html('<div class="alert alert-success">' + e.message + "</div>"), i && i(), o = setInterval(function() {
                        return 0 === r ? (clearInterval(o), a.show(), void a.siblings("span").hide()) : void n.text(r--)
                    }, 1e3)) : ($(".company-activete-tips").length && $(".company-activete-tips").html('<div class="alert alert-danger">' + e.data[1] + "</div>"), setTimeout(function() {
                        $(".company-activete-tips").length && $(".company-activete-tips").html('<div class="alert alert-success">激活邮件已发送 （<span>120</span>）</div>'), a.show()
                    }, 9e5))
                })
            })
        }, l($("#activate"), "/api/user/reactivate", "/api/settings/mail/edit"), l($("#companyActivate"), "/api/company/reactivate", "/api/settings/mail/edit"), setTimeout(function() {
            var e;
            e = $("body > span iframe[id^=ads]"), e.length && e.parent("span").remove()
        }, 1e4), $.cookie("readTour") || n.userId || $("#messageCount").after('<span class="has-unread__count">1</span>'), n
    }), define("math", ["jquery", "main"], function(e, t) {
        "use strict";
        return function(n) {
            var i, a;
            i = n || e(".fmt"), "undefined" != typeof MathJax ? i.each(function() {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, e(this).get(0)])
            }) : (a = t.staticUrl + "/build/3rd/MathJax/MathJax.js", e.getScript(a, function() {
                i.each(function() {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, e(this).get(0)])
                })
            }))
        }
    }), define("flowChart", [], function() {
        "use strict";
        return function(e, t) {
            require(["jquery", "Raphael", "flow_diagram"], function(n, i, a) {
                var r;
                r = a.parse(e), r.drawSVG(t)
            })
        }
    }), define("sequenceChart", [], function() {
        "use strict";
        return function(e) {
            require(["jquery", "Raphael", "underscore", "sequence_diagram"], function(t, n, i, a) {
                e.sequenceDiagram({
                    theme: "simple"
                })
            })
        }
    }), define("highLight", ["jquery", "highlightjs", "math", "flowChart", "sequenceChart", "jquery_hoverIntent"], function(e, t, n, i, a) {
        "use strict";
        return function(r) {
            var o, s, l, c, u;
            u = function(n) {
                var o, s, l, c, u, d, p, f, h, g, m, b;
                m = n, d = {
                    actionscript: /^as[1-3]$/i,
                    cmake: /^(make|makefile)$/i,
                    cs: /^csharp$/i,
                    css: /^css[1-3]$/i,
                    delphi: /^pascal$/i,
                    javascript: /^js$/i,
                    markdown: /^md$/i,
                    objectivec: /^(oc|objective-c)$/i,
                    php: /^php[1-6]$/i,
                    sql: /^mysql$/i,
                    xml: /^(html|html5|xhtml)$/i,
                    flow: /^flow$/i,
                    sequence: /^sequence$/i
                }, c = void 0, u = t.listLanguages(), l = void 0, o = void 0, h = !1, 2 === m.children("code").length ? (o = m.children("code").first().text(), m.children("code").first().remove(), l = m.children("code").addClass(o)) : (l = m.children("code"), o = l.attr("class")), o && (s = o.split(/\s+/), -1 !== s.indexOf("nohighlight") && (h = !0), s.forEach(function(e) {
                    var t, n;
                    if (n = e.toLowerCase(), -1 !== u.indexOf(n)) c = n;
                    else
                        for (t in d) n.match(d[t]) && (c = t)
                })), c ? "flow" === c ? (f = e(".flowChart").length, l.parent().after('<div id="flowDiagram' + f + '" class="flowChart"></div>'), i(l.text(), "flowDiagram" + f), l.parent().remove()) : "sequence" === c ? (r = l.parent(), b = l.text(), f = e(".sequenceChart").length, r.replaceWith('<div id="sequenceDiagram' + f + '" class="sequenceChart">' + b + "</div>"), a(e("#sequenceDiagram" + f))) : (g = t.highlight(c, l.text(), !0), l.html(g.value)) : h || (p = m.html(), p.length < 1e4 && t.highlightBlock(m[0]))
            }, c = function(t) {
                var n;
                n = null, n = t ? t.find(".fmt") : e(".fmt"), n.each(function() {
                    var t;
                    t = e(this).html(), e(this).html(t.replace(/~~([^\n~]+)~~/g, "<del>$1</del>"))
                })
            }, "undefined" != typeof t && (r ? (r.hasClass("fmt") ? (l = r.html().replace(/<br><br>/g, "<br>"), r.html(l), r.find("table").each(function() {
                e(this).wrap('<div class="x-scroll"></div>')
            })) : r.find(".fmt").each(function() {
                l = e(this).html().replace(/<br><br>/g, "<br>"), e(this).html(l)
            }), s = r.text().indexOf("$$"), o = r.text().indexOf("~~"), -1 !== s && n(r), -1 !== o && c(r), r.find("pre").each(function() {
                u(e(this))
            })) : (s = !1, o = !1, e(".fmt").each(function() {
                var t; - 1 !== e(this).text().indexOf("$$") && (s = !0), -1 !== e(this).text().indexOf("~~") && (o = !0), t = e(this).html().replace(/<br><br>/g, "<br>"), e(this).html(t)
            }), s && n(), o && c(), e(".fmt pre").each(function() {
                u(e(this))
            })))
        }
    }), define("pagedown_converter", [], function() {
        "use strict";

        function e(e) {
            return e
        }

        function t(e) {
            return !1
        }

        function n() {}

        function i() {}
        var a = {};
        return n.prototype = {
            chain: function(t, n) {
                var i = this[t];
                if (!i) throw new Error("unknown hook " + t);
                i === e ? this[t] = n : this[t] = function(e) {
                    var t = Array.prototype.slice.call(arguments, 0);
                    return t[0] = i.apply(null, t), n.apply(null, t)
                }
            },
            set: function(e, t) {
                if (!this[e]) throw new Error("unknown hook " + e);
                this[e] = t
            },
            addNoop: function(t) {
                this[t] = e
            },
            addFalse: function(e) {
                this[e] = t
            }
        }, a.HookCollection = n, i.prototype = {
            set: function(e, t) {
                this["s_" + e] = t
            },
            get: function(e) {
                return this["s_" + e]
            }
        }, a.Converter = function(t) {
            function a(e) {
                return e = e.replace(/^[ ]{0,3}\[([^\[\]]+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(e, t, n, i, a, r) {
                    return t = t.toLowerCase(), q.set(t, T(n)), a ? i : (r && z.set(t, r.replace(/"/g, "&quot;")), "")
                })
            }

            function r(e) {
                return e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, s), e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, s), e = e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, s), e = e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, s), e = e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, s)
            }

            function o(e) {
                return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (O.push(e) - 1) + "K\n\n"
            }

            function s(e, t) {
                return o(t)
            }

            function l(e, t) {
                e = B.preBlockGamut(e, H), e = m(e);
                var n = "<hr />\n";
                return e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, n), e = e.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, n), e = e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, n), e = b(e), e = w(e), e = C(e), e = B.postBlockGamut(e, H), e = r(e), e = $(e, t)
            }

            function c(e) {
                return e = B.preSpanGamut(e), e = y(e), e = u(e), e = E(e), e = f(e), e = d(e), e = N(e), e = e.replace(/~P/g, "://"), e = T(e), e = P(e), e = e.replace(/  +\n/g, " <br>\n"), e = B.postSpanGamut(e)
            }

            function u(e) {
                var t = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
                return e = e.replace(t, function(e) {
                    var t = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
                    return t = j(t, "!" == e.charAt(1) ? "\\`*_/" : "\\`*_")
                })
            }

            function d(e) {
                return -1 === e.indexOf("[") ? e : (e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, p), e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, p), e = e.replace(/(\[([^\[\]]+)\])()()()()()/g, p))
            }

            function p(e, t, n, i, a, r, o, s) {
                void 0 == s && (s = "");
                var l = t,
                    c = n.replace(/:\/\//g, "~P"),
                    u = i.toLowerCase(),
                    d = a,
                    p = s;
                if ("" == d)
                    if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), d = "#" + u, void 0 != q.get(u)) d = q.get(u), void 0 != z.get(u) && (p = z.get(u));
                    else {
                        if (!(l.search(/\(\s*\)$/m) > -1)) return l;
                        d = ""
                    }
                d = M(d);
                var f = '<a href="' + d + '"';
                return "" != p && (p = h(p), p = j(p, "*_"), f += ' title="' + p + '"'), f += ">" + c + "</a>"
            }

            function f(e) {
                return -1 === e.indexOf("![") ? e : (e = e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, g), e = e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, g))
            }

            function h(e) {
                return e.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
            }

            function g(e, t, n, i, a, r, o, s) {
                var l = t,
                    c = n,
                    u = i.toLowerCase(),
                    d = a,
                    p = s;
                if (p || (p = ""), "" == d) {
                    if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), d = "#" + u, void 0 == q.get(u)) return l;
                    d = q.get(u), void 0 != z.get(u) && (p = z.get(u))
                }
                c = j(h(c), "*_[]()"), d = j(d, "*_");
                var f = '<img src="' + d + '" alt="' + c + '"';
                return p = h(p), p = j(p, "*_"), f += ' title="' + p + '"', f += " />"
            }

            function m(e) {
                return e = e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(e, t) {
                    return "<h1>" + c(t) + "</h1>\n\n"
                }), e = e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(e, t) {
                    return "<h2>" + c(t) + "</h2>\n\n"
                }), e = e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(e, t, n) {
                    var i = t.length;
                    return "<h" + i + ">" + c(n) + "</h" + i + ">\n\n"
                })
            }

            function b(e, t) {
                e += "~0";
                var n = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
                return D ? e = e.replace(n, function(e, n, i) {
                    var a, r = n,
                        o = i.search(/[*+-]/g) > -1 ? "ul" : "ol";
                    "ol" === o && (a = parseInt(i, 10));
                    var s = v(r, o, t);
                    s = s.replace(/\s+$/, "");
                    var l = "<" + o;
                    return a && 1 !== a && (l += ' start="' + a + '"'), s = l + ">" + s + "</" + o + ">\n"
                }) : (n = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, e = e.replace(n, function(e, t, n, i) {
                    var a, r = t,
                        o = n,
                        s = i.search(/[*+-]/g) > -1 ? "ul" : "ol";
                    "ol" === s && (a = parseInt(i, 10));
                    var l = v(o, s),
                        c = "<" + s;
                    return a && 1 !== a && (c += ' start="' + a + '"'), l = r + c + ">\n" + l + "</" + s + ">\n"
                })), e = e.replace(/~0/, "")
            }

            function v(e, t, n) {
                D++, e = e.replace(/\n{2,}$/, "\n"), e += "~0";
                var i = W[t],
                    a = new RegExp("(^[ \\t]*)(" + i + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + i + ")[ \\t]+))", "gm"),
                    r = !1;
                return e = e.replace(a, function(e, t, i, a) {
                    var o = a,
                        s = /\n\n$/.test(o),
                        u = s || o.search(/\n{2,}/) > -1;
                    return u || r ? o = l(A(o), !0) : (o = b(A(o), !0), o = o.replace(/\n$/, ""), n || (o = c(o))), r = s, "<li>" + o + "</li>\n"
                }), e = e.replace(/~0/g, ""), D--, e
            }

            function w(e) {
                return e += "~0", e = e.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, t, n) {
                    var i = t,
                        a = n;
                    return i = _(A(i)), i = R(i), i = i.replace(/^\n+/g, ""), i = i.replace(/\n+$/g, ""), i = "<pre><code>" + i + "\n</code></pre>", "\n\n" + i + "\n\n" + a
                }), e = e.replace(/~0/, "")
            }

            function y(e) {
                return e = e.replace(/(^|[^\\`])(`+)(?!`)([^\r]*?[^`])\2(?!`)/gm, function(e, t, n, i, a) {
                    var r = i;
                    return r = r.replace(/^([ \t]*)/g, ""), r = r.replace(/[ \t]*$/g, ""), r = _(r), r = r.replace(/:\/\//g, "~P"), t + "<code>" + r + "</code>"
                })
            }

            function _(e) {
                return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e = j(e, "*_{}[]\\", !1)
            }

            function k(e) {
                return -1 === e.indexOf("*") && -1 === e.indexOf("_") ? e : (e = U(e), e = e.replace(/(^|[\W_])(?:(?!\1)|(?=^))(\*|_)\2(?=\S)([^\r]*?\S)\2\2(?!\2)(?=[\W_]|$)/g, "$1<strong>$3</strong>"), e = e.replace(/(^|[\W_])(?:(?!\1)|(?=^))(\*|_)(?=\S)((?:(?!\2)[^\r])*?\S)\2(?!\2)(?=[\W_]|$)/g, "$1<em>$3</em>"), F(e))
            }

            function x(e) {
                return -1 === e.indexOf("*") && -1 === e.indexOf("_") ? e : (e = U(e), e = e.replace(/(?=[^\r][*_]|[*_])(^|(?=\W__|(?!\*)[\W_]\*\*|\w\*\*\w)[^\r])(\*\*|__)(?!\2)(?=\S)((?:|[^\r]*?(?!\2)[^\r])(?=\S_|\w|\S\*\*(?:[\W_]|$)).)(?=__(?:\W|$)|\*\*(?:[^*]|$))\2/g, "$1<strong>$3</strong>"), e = e.replace(/(?=[^\r][*_]|[*_])(^|(?=\W_|(?!\*)(?:[\W_]\*|\D\*(?=\w)\D))[^\r])(\*|_)(?!\2\2\2)(?=\S)((?:(?!\2)[^\r])*?(?=[^\s_]_|(?=\w)\D\*\D|[^\s*]\*(?:[\W_]|$)).)(?=_(?:\W|$)|\*(?:[^*]|$))\2/g, "$1<em>$3</em>"), F(e))
            }

            function C(e) {
                return e = e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, t) {
                    var n = t;
                    return n = n.replace(/^[ \t]*>[ \t]?/gm, "~0"), n = n.replace(/~0/g, ""), n = n.replace(/^[ \t]+$/gm, ""), n = l(n), n = n.replace(/(^|\n)/g, "$1  "), n = n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, t) {
                        var n = t;
                        return n = n.replace(/^  /gm, "~0"), n = n.replace(/~0/g, "")
                    }), o("<blockquote>\n" + n + "\n</blockquote>")
                })
            }

            function $(e, t) {
                e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, "");
                for (var n = e.split(/\n{2,}/g), i = [], a = /~K(\d+)K/, r = n.length, o = 0; r > o; o++) {
                    var s = n[o];
                    a.test(s) ? i.push(s) : /\S/.test(s) && (s = c(s), s = s.replace(/^([ \t]*)/g, "<p>"), s += "</p>", i.push(s))
                }
                if (!t) {
                    r = i.length;
                    for (var o = 0; r > o; o++)
                        for (var l = !0; l;) l = !1, i[o] = i[o].replace(/~K(\d+)K/g, function(e, t) {
                            return l = !0, O[t]
                        })
                }
                return i.join("\n\n")
            }

            function T(e) {
                return e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e = e.replace(/<(?![a-z\/?!]|~D)/gi, "&lt;")
            }

            function E(e) {
                return e = e.replace(/\\(\\)/g, L), e = e.replace(/\\([`*_{}\[\]()>#+-.!])/g, L)
            }

            function S(e, t, n, i) {
                if (t) return e;
                if (")" !== i.charAt(i.length - 1)) return "<" + n + i + ">";
                for (var a = i.match(/[()]/g), r = 0, o = 0; o < a.length; o++) "(" === a[o] ? 0 >= r ? r = 1 : r++ : r--;
                var s = "";
                if (0 > r) {
                    var l = new RegExp("\\){1," + -r + "}$");
                    i = i.replace(l, function(e) {
                        return s = e, ""
                    })
                }
                if (s) {
                    var c = i.charAt(i.length - 1);
                    Z.test(c) || (s = c + s, i = i.substr(0, i.length - 1))
                }
                return "<" + n + i + ">" + s
            }

            function N(e) {
                e = e.replace(X, S);
                var t = function(e, t) {
                    var n = M(t);
                    return '<a href="' + n + '">' + B.plainLinkText(t) + "</a>"
                };
                return e = e.replace(/<((https?|ftp):[^'">\s]+)>/gi, t)
            }

            function I(e) {
                return e = e.replace(/~E(\d+)E/g, function(e, t) {
                    var n = parseInt(t);
                    return String.fromCharCode(n)
                })
            }

            function A(e) {
                return e = e.replace(/^(\t|[ ]{1,4})/gm, "~0"), e = e.replace(/~0/g, "")
            }

            function R(e) {
                if (!/\t/.test(e)) return e;
                var t, n = ["    ", "   ", "  ", " "],
                    i = 0;
                return e.replace(/[\n\t]/g, function(e, a) {
                    return "\n" === e ? (i = a + 1, e) : (t = (a - i) % 4, i = a + 1, n[t])
                })
            }

            function M(e) {
                return e = h(e), e = j(e, "*_:()[]")
            }

            function j(e, t, n) {
                var i = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
                n && (i = "\\\\" + i);
                var a = new RegExp(i, "g");
                return e = e.replace(a, L)
            }

            function L(e, t) {
                var n = t.charCodeAt(0);
                return "~E" + n + "E"
            }
            var B = this.hooks = new n;
            B.addNoop("plainLinkText"), B.addNoop("preConversion"), B.addNoop("postNormalization"), B.addNoop("preBlockGamut"), B.addNoop("postBlockGamut"), B.addNoop("preSpanGamut"), B.addNoop("postSpanGamut"), B.addNoop("postConversion");
            var q, z, O, D;
            t = t || {};
            var U = e,
                F = e;
            t.nonAsciiLetters && ! function() {
                var e = /[Q\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376-\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0523\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0621-\u064a\u0660-\u0669\u066e-\u066f\u0671-\u06d3\u06d5\u06e5-\u06e6\u06ee-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07c0-\u07ea\u07f4-\u07f5\u07fa\u0904-\u0939\u093d\u0950\u0958-\u0961\u0966-\u096f\u0971-\u0972\u097b-\u097f\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc-\u09dd\u09df-\u09e1\u09e6-\u09f1\u0a05-\u0a0a\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a66-\u0a6f\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0-\u0ae1\u0ae6-\u0aef\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32-\u0b33\u0b35-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b66-\u0b6f\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0be6-\u0bef\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58-\u0c59\u0c60-\u0c61\u0c66-\u0c6f\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0-\u0ce1\u0ce6-\u0cef\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d3d\u0d60-\u0d61\u0d66-\u0d6f\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32-\u0e33\u0e40-\u0e46\u0e50-\u0e59\u0e81-\u0e82\u0e84\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa-\u0eab\u0ead-\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0ed0-\u0ed9\u0edc-\u0edd\u0f00\u0f20-\u0f29\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8b\u1000-\u102a\u103f-\u1049\u1050-\u1055\u105a-\u105d\u1061\u1065-\u1066\u106e-\u1070\u1075-\u1081\u108e\u1090-\u1099\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1159\u115f-\u11a2\u11a8-\u11f9\u1200-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u1676\u1681-\u169a\u16a0-\u16ea\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u17e0-\u17e9\u1810-\u1819\u1820-\u1877\u1880-\u18a8\u18aa\u1900-\u191c\u1946-\u196d\u1970-\u1974\u1980-\u19a9\u19c1-\u19c7\u19d0-\u19d9\u1a00-\u1a16\u1b05-\u1b33\u1b45-\u1b4b\u1b50-\u1b59\u1b83-\u1ba0\u1bae-\u1bb9\u1c00-\u1c23\u1c40-\u1c49\u1c4d-\u1c7d\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u203f-\u2040\u2054\u2071\u207f\u2090-\u2094\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2183-\u2184\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2c6f\u2c71-\u2c7d\u2c80-\u2ce4\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3006\u3031-\u3035\u303b-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31b7\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fc3\ua000-\ua48c\ua500-\ua60c\ua610-\ua62b\ua640-\ua65f\ua662-\ua66e\ua67f-\ua697\ua717-\ua71f\ua722-\ua788\ua78b-\ua78c\ua7fb-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8d0-\ua8d9\ua900-\ua925\ua930-\ua946\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa50-\uaa59\uac00-\ud7a3\uf900-\ufa2d\ufa30-\ufa6a\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe33-\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]/g,
                    t = "Q".charCodeAt(0),
                    n = "A".charCodeAt(0),
                    i = "Z".charCodeAt(0),
                    a = "a".charCodeAt(0) - i - 1;
                U = function(r) {
                    return r.replace(e, function(e) {
                        for (var r, o = e.charCodeAt(0), s = ""; o > 0;) r = o % 51 + n, r >= t && r++, r > i && (r += a), s = String.fromCharCode(r) + s, o = o / 51 | 0;
                        return "Q" + s + "Q"
                    })
                }, F = function(e) {
                    return e.replace(/Q([A-PR-Za-z]{1,3})Q/g, function(e, r) {
                        for (var o, s = 0, l = 0; l < r.length; l++) o = r.charCodeAt(l), o > i && (o -= a), o > t && o--, o -= n, s = 51 * s + o;
                        return String.fromCharCode(s)
                    })
                }
            }();
            var P = t.asteriskIntraWordEmphasis ? k : x;
            this.makeHtml = function(e) {
                if (q) throw new Error("Recursive call to converter.makeHtml");
                return q = new i, z = new i, O = [], D = 0, e = B.preConversion(e), e = e.replace(/~/g, "~T"), e = e.replace(/\$/g, "~D"), e = e.replace(/\r\n/g, "\n"), e = e.replace(/\r/g, "\n"), e = "\n\n" + e + "\n\n", e = R(e), e = e.replace(/^[ \t]+$/gm, ""), e = B.postNormalization(e), e = r(e), e = a(e), e = l(e), e = I(e), e = e.replace(/~D/g, "$$"), e = e.replace(/~T/g, "~"), e = B.postConversion(e), O = z = q = null, e
            };
            var H = function(e) {
                    return l(e)
                },
                W = {
                    ol: "\\d+[.]",
                    ul: "[*+-]"
                },
                K = "[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]",
                Q = "[-A-Z0-9+&@#/%=~_|[\\])]",
                X = new RegExp('(="|<)?\\b(https?|ftp)(://' + K + "*" + Q + ")(?=$|\\W)", "gi"),
                Z = new RegExp(Q, "i")
        }, a
    }), define("pagedown_extra", ["pagedown_converter"], function(e) {
        function t(e) {
            return e.replace(/^\s+|\s+$/g, "")
        }

        function n(e) {
            return e.replace(/\s+$/g, "")
        }

        function i(e) {
            return e.replace(new RegExp("^(\\t|[ ]{1,4})", "gm"), "")
        }

        function a(e, t) {
            return -1 != e.indexOf(t)
        }

        function r(e, t) {
            return e.replace(/<[^>]*>?/gi, function(e) {
                return e.match(t) ? e : ""
            })
        }

        function o(e, t) {
            for (var n = {}, i = 0; i < e.length; i++) n[e[i]] = e[i];
            for (i = 0; i < t.length; i++) n[t[i]] = t[i];
            var a = [];
            for (var r in n) n.hasOwnProperty(r) && a.push(n[r]);
            return a
        }

        function s(e) {
            return "" != e.charAt(0) && (e = "" + e), "" != e.charAt(e.length - 1) && (e += ""), e
        }

        function l(e) {
            return "" == e.charAt(0) && (e = e.substr(1)), "" == e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), e
        }

        function c(e, t) {
            return r(u(e, t), m)
        }

        function u(e, t) {
            var n = t.blockGamutHookCallback(e);
            return n = f(n), n = n.replace(/~D/g, "$$").replace(/~T/g, "~"), n = t.previousPostConversion(n)
        }

        function d(e) {
            return e.replace(/\\\|/g, "~I").replace(/\\:/g, "~i")
        }

        function p(e) {
            return e.replace(/~I/g, "|").replace(/~i/g, ":")
        }

        function f(e) {
            return e = e.replace(/~E(\d+)E/g, function(e, t) {
                var n = parseInt(t);
                return String.fromCharCode(n)
            })
        }

        function h(e) {
            return e.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        }

        function g(e, t) {
            var n = t;
            return n = n.replace(/&\#8220;/g, '"'), n = n.replace(/&\#8221;/g, '"'), n = n.replace(/&\#8216;/g, "'"), n = n.replace(/&\#8217;/g, "'"), n = n.replace(/&\#8212;/g, "---"), n = n.replace(/&\#8211;/g, "--"), n = n.replace(/&\#8230;/g, "...")
        }
        var m = new RegExp(["^(<\\/?(a|abbr|acronym|applet|area|b|basefont|", "bdo|big|button|cite|code|del|dfn|em|figcaption|", "font|i|iframe|img|input|ins|kbd|label|map|", "mark|meter|object|param|progress|q|ruby|rp|rt|s|", "samp|script|select|small|span|strike|strong|", "sub|sup|textarea|time|tt|u|var|wbr)[^>]*>|", "<(br)\\s?\\/?>)$"].join(""), "i");
        Array.indexOf || (Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; t++)
                if (this[t] == e) return t;
            return -1
        }), e.Extra = function() {
            this.converter = null, this.hashBlocks = [], this.footnotes = {}, this.usedFootnotes = [], this.attributeBlocks = !1, this.googleCodePrettify = !1, this.highlightJs = !1, this.tableClass = "", this.tabWidth = 4
        }, e.Extra.init = function(t, n) {
            var i = new e.Extra,
                r = [],
                o = [],
                s = [],
                l = ["unHashExtraBlocks"];
            return n = n || {}, n.extensions = n.extensions || ["all"], a(n.extensions, "all") && (n.extensions = ["tables", "fenced_code_gfm", "def_list", "attr_list", "footnotes", "smartypants", "strikethrough", "newlines"]), o.push("wrapHeaders"), a(n.extensions, "attr_list") && (r.push("hashFcbAttributeBlocks"), o.push("hashHeaderAttributeBlocks"), l.push("applyAttributeBlocks"), i.attributeBlocks = !0), a(n.extensions, "fenced_code_gfm") && (o.push("fencedCodeBlocks"), r.push("fencedCodeBlocks")), a(n.extensions, "tables") && o.push("tables"), a(n.extensions, "def_list") && o.push("definitionLists"), a(n.extensions, "footnotes") && (r.push("stripFootnoteDefinitions"), o.push("doFootnotes"), l.push("printFootnotes")), a(n.extensions, "smartypants") && l.push("runSmartyPants"), a(n.extensions, "strikethrough") && s.push("strikethrough"), a(n.extensions, "newlines") && s.push("newlines"), t.hooks.chain("postNormalization", function(e) {
                return i.doTransform(r, e) + "\n"
            }), t.hooks.chain("preBlockGamut", function(e, t) {
                return i.blockGamutHookCallback = t, e = d(e), e = i.doTransform(o, e) + "\n", e = p(e)
            }), t.hooks.chain("postSpanGamut", function(e) {
                return i.doTransform(s, e)
            }), i.previousPostConversion = t.hooks.postConversion, t.hooks.chain("postConversion", function(e) {
                return e = i.doTransform(l, e), i.hashBlocks = [], i.footnotes = {}, i.usedFootnotes = [], e
            }), "highlighter" in n && (i.googleCodePrettify = "prettify" === n.highlighter, i.highlightJs = "highlight" === n.highlighter), "table_class" in n && (i.tableClass = n.table_class), i.converter = t, i
        }, e.Extra.prototype.doTransform = function(e, t) {
            for (var n = 0; n < e.length; n++) t = this[e[n]](t);
            return t
        }, e.Extra.prototype.hashExtraBlock = function(e) {
            return "\n<p>~X" + (this.hashBlocks.push(e) - 1) + "X</p>\n"
        }, e.Extra.prototype.hashExtraInline = function(e) {
            return "~X" + (this.hashBlocks.push(e) - 1) + "X"
        }, e.Extra.prototype.unHashExtraBlocks = function(e) {
            function t() {
                var i = !1;
                e = e.replace(/(?:<p>)?~X(\d+)X(?:<\/p>)?/g, function(e, t) {
                    i = !0;
                    var a = parseInt(t, 10);
                    return n.hashBlocks[a]
                }), i === !0 && t()
            }
            var n = this;
            return t(), e
        }, e.Extra.prototype.wrapHeaders = function(e) {
            function t(e) {
                return "\n" + e + "\n"
            }
            return e = e.replace(/^.+[ \t]*\n=+[ \t]*\n+/gm, t), e = e.replace(/^.+[ \t]*\n-+[ \t]*\n+/gm, t), e = e.replace(/^\#{1,6}[ \t]*.+?[ \t]*\#*\n+/gm, t)
        };
        var b = "\\{[ \\t]*((?:[#.][-_:a-zA-Z0-9]+[ \\t]*)+)\\}",
            v = new RegExp("^(#{1,6}.*#{0,6})[ \\t]+" + b + "[ \\t]*(?:\\n|0x03)", "gm"),
            w = new RegExp("^(.*)[ \\t]+" + b + "[ \\t]*\\n(?=[\\-|=]+\\s*(?:\\n|0x03))", "gm"),
            y = new RegExp("^(```[ \\t]*[^{\\s]*)[ \\t]+" + b + "[ \\t]*\\n(?=([\\s\\S]*?)\\n```[ \\t]*(\\n|0x03))", "gm");
        e.Extra.prototype.hashHeaderAttributeBlocks = function(e) {
            function t(e, t, i) {
                return "<p>~XX" + (n.hashBlocks.push(i) - 1) + "XX</p>\n" + t + "\n"
            }
            var n = this;
            return e = e.replace(v, t), e = e.replace(w, t)
        }, e.Extra.prototype.hashFcbAttributeBlocks = function(e) {
            function t(e, t, i) {
                return "<p>~XX" + (n.hashBlocks.push(i) - 1) + "XX</p>\n" + t + "\n"
            }
            var n = this;
            return e.replace(y, t)
        }, e.Extra.prototype.applyAttributeBlocks = function(e) {
            var t = this,
                n = new RegExp('<p>~XX(\\d+)XX</p>[\\s]*(?:<(h[1-6]|pre)(?: +class="(\\S+)")?(>[\\s\\S]*?</\\2>))', "gm");
            return e = e.replace(n, function(e, n, i, a, r) {
                if (!i) return "";
                for (var s = parseInt(n, 10), l = t.hashBlocks[s], c = l.match(/#[^\s#.]+/g) || [], u = c[0] ? ' id="' + c[0].substr(1, c[0].length - 1) + '"' : "", d = l.match(/\.[^\s#.]+/g) || [], p = 0; p < d.length; p++) d[p] = d[p].substr(1, d[p].length - 1);
                var f = "";
                return a && (d = o(d, [a])), d.length > 0 && (f = ' class="' + d.join(" ") + '"'), "<" + i + u + f + r
            })
        }, e.Extra.prototype.tables = function(e) {
            function n(e, n, a, r, o, s) {
                n = n.replace(/^ *[|]/m, ""), a = a.replace(/^ *[|]/m, ""), r = r.replace(/^ *[|]/gm, ""), n = n.replace(/[|] *$/m, ""), a = a.replace(/[|] *$/m, ""), r = r.replace(/[|] *$/gm, ""), alignspecs = a.split(/ *[|] */), align = [];
                for (var l = 0; l < alignspecs.length; l++) {
                    var u = alignspecs[l];
                    u.match(/^ *-+: *$/m) ? align[l] = ' style="text-align:right;"' : u.match(/^ *:-+: *$/m) ? align[l] = ' style="text-align:center;"' : u.match(/^ *:-+ *$/m) ? align[l] = ' style="text-align:left;"' : align[l] = ""
                }
                var d = n.split(/ *[|] */),
                    p = d.length,
                    f = i.tableClass ? ' class="' + i.tableClass + '"' : "",
                    h = ["<table", f, ">\n", "<thead>\n", "<tr>\n"].join("");
                for (l = 0; p > l; l++) {
                    var g = c(t(d[l]), i);
                    h += ["  <th", align[l], ">", g, "</th>\n"].join("")
                }
                h += "</tr>\n</thead>\n";
                var m = r.split("\n");
                for (l = 0; l < m.length; l++)
                    if (!m[l].match(/^\s*$/)) {
                        for (var b = m[l].split(/ *[|] */), v = p - b.length, w = 0; v > w; w++) b.push("");
                        for (h += "<tr>\n", w = 0; p > w; w++) {
                            var y = c(t(b[w]), i);
                            h += ["  <td", align[w], ">", y, "</td>\n"].join("")
                        }
                        h += "</tr>\n"
                    }
                return h += "</table>\n", i.hashExtraBlock(h)
            }
            var i = this,
                a = new RegExp(["^", "[ ]{0,3}", "[|]", "(.+)\\n", "[ ]{0,3}", "[|]([ ]*[-:]+[-| :]*)\\n", "(", "(?:[ ]*[|].*\\n?)*", ")", "(?:\\n|$)"].join(""), "gm"),
                r = new RegExp(["^", "[ ]{0,3}", "(\\S.*[|].*)\\n", "[ ]{0,3}", "([-:]+[ ]*[|][-| :]*)\\n", "(", "(?:.*[|].*\\n?)*", ")", "(?:\\n|$)"].join(""), "gm");
            return e = e.replace(a, n), e = e.replace(r, n)
        }, e.Extra.prototype.stripFootnoteDefinitions = function(e) {
            var t = this;
            return e = e.replace(/\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(e, n, i) {
                return n = h(n), i += "\n", i = i.replace(/^[ ]{0,3}/g, ""), t.footnotes[n] = i, "\n"
            })
        }, e.Extra.prototype.doFootnotes = function(e) {
            var t = this;
            if (t.isConvertingFootnote === !0) return e;
            var n = 0;
            return e = e.replace(/\[\^(.+?)\]/g, function(e, i) {
                var a = h(i),
                    r = t.footnotes[a];
                if (void 0 === r) return e;
                n++, t.usedFootnotes.push(a);
                var o = '<a href="#fn:' + a + '" id="fnref:' + a + '" title="See footnote" class="footnote">' + n + "</a>";
                return t.hashExtraInline(o)
            })
        }, e.Extra.prototype.printFootnotes = function(e) {
            var t = this;
            if (0 === t.usedFootnotes.length) return e;
            e += '\n\n<div class="footnotes">\n<hr>\n<ol>\n\n';
            for (var n = 0; n < t.usedFootnotes.length; n++) {
                var i = t.usedFootnotes[n],
                    a = t.footnotes[i];
                t.isConvertingFootnote = !0;
                var r = c(a, t);
                delete t.isConvertingFootnote, e += '<li id="fn:' + i + '">' + r + ' <a href="#fnref:' + i + '" title="Return to article" class="reversefootnote">&#8617;</a></li>\n\n'
            }
            return e += "</ol>\n</div>"
        }, e.Extra.prototype.fencedCodeBlocks = function(e) {
            function t(e) {
                return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e = e.replace(/~D/g, "$$"), e = e.replace(/~T/g, "~")
            }
            var n = this;
            return e = e.replace(/(?:^|\n)```[ \t]*(\S*)[ \t]*\n([\s\S]*?)\n```[ \t]*(?=\n)/g, function(e, i, a) {
                var r = i,
                    o = a,
                    s = n.googleCodePrettify ? ' class="prettyprint"' : "",
                    l = "";
                r && (l = n.googleCodePrettify || n.highlightJs ? ' class="language-' + r + '"' : ' class="' + r + '"');
                var c = ["<pre", s, "><code", l, ">", t(o), "</code></pre>"].join("");
                return n.hashExtraBlock(c)
            })
        }, e.Extra.prototype.educatePants = function(e) {
            var t = this,
                n = "",
                i = 0;
            e.replace(/(?:<!--[\s\S]*?-->)|(<)([a-zA-Z1-6]+)([^\n]*?>)([\s\S]*?)(<\/\2>)/g, function(a, r, o, s, l, c, u) {
                var d = e.substring(i, u);
                return n += t.applyPants(d), t.smartyPantsLastChar = n.substring(n.length - 1), i = u + a.length, r ? (/code|kbd|pre|script|noscript|iframe|math|ins|del|pre/i.test(o) ? t.smartyPantsLastChar = l.substring(l.length - 1) : l = t.educatePants(l), void(n += r + o + s + l + c)) : void(n += a)
            });
            var a = e.substring(i);
            return n += t.applyPants(a), t.smartyPantsLastChar = n.substring(n.length - 1), n
        }, e.Extra.prototype.applyPants = function(e) {
            return e = e.replace(/---/g, "&#8212;").replace(/--/g, "&#8211;"), e = e.replace(/\.\.\./g, "&#8230;").replace(/\.\s\.\s\./g, "&#8230;"), e = e.replace(/``/g, "&#8220;").replace(/''/g, "&#8221;"), /^'$/.test(e) ? /\S/.test(this.smartyPantsLastChar) ? "&#8217;" : "&#8216;" : /^"$/.test(e) ? /\S/.test(this.smartyPantsLastChar) ? "&#8221;" : "&#8220;" : (e = e.replace(/^'(?=[!"#\$\%'()*+,\-.\/:;<=>?\@\[\\]\^_`{|}~]\B)/, "&#8217;"), e = e.replace(/^"(?=[!"#\$\%'()*+,\-.\/:;<=>?\@\[\\]\^_`{|}~]\B)/, "&#8221;"),
                e = e.replace(/"'(?=\w)/g, "&#8220;&#8216;"), e = e.replace(/'"(?=\w)/g, "&#8216;&#8220;"), e = e.replace(/'(?=\d{2}s)/g, "&#8217;"), e = e.replace(/(\s|&nbsp;|--|&[mn]dash;|&\#8211;|&\#8212;|&\#x201[34];)'(?=\w)/g, "$1&#8216;"), e = e.replace(/([^\s\[\{\(\-])'/g, "$1&#8217;"), e = e.replace(/'(?=\s|s\b)/g, "&#8217;"), e = e.replace(/'/g, "&#8216;"), e = e.replace(/(\s|&nbsp;|--|&[mn]dash;|&\#8211;|&\#8212;|&\#x201[34];)"(?=\w)/g, "$1&#8220;"), e = e.replace(/([^\s\[\{\(\-])"/g, "$1&#8221;"), e = e.replace(/"(?=\s)/g, "&#8221;"), e = e.replace(/"/gi, "&#8220;"))
        }, e.Extra.prototype.runSmartyPants = function(e) {
            return this.smartyPantsLastChar = "", e = this.educatePants(e), e = e.replace(/(<([a-zA-Z1-6]+)\b([^\n>]*?)(\/)?>)/g, g)
        }, e.Extra.prototype.definitionLists = function(e) {
            var n = new RegExp(["(\\x02\\n?|\\n\\n)", "(?:", "(", "(", "[ ]{0,3}", "((?:[ \\t]*\\S.*\\n)+)", "\\n?", "[ ]{0,3}:[ ]+", ")", "([\\s\\S]+?)", "(", "(?=\\0x03)", "|", "(?=", "\\n{2,}", "(?=\\S)", "(?!", "[ ]{0,3}", "(?:\\S.*\\n)+?", "\\n?", "[ ]{0,3}:[ ]+", ")", "(?!", "[ ]{0,3}:[ ]+", ")", ")", ")", ")", ")"].join(""), "gm"),
                i = this;
            return e = s(e), e = e.replace(n, function(e, n, a) {
                var r = t(i.processDefListItems(a));
                return r = "<dl>\n" + r + "\n</dl>", n + i.hashExtraBlock(r) + "\n\n"
            }), l(e)
        }, e.Extra.prototype.processDefListItems = function(e) {
            var a = this,
                r = new RegExp(["(\\x02\\n?|\\n\\n+)", "(", "[ ]{0,3}", "(?![:][ ]|[ ])", "(?:\\S.*\\n)+?", ")", "(?=\\n?[ ]{0,3}:[ ])"].join(""), "gm"),
                o = new RegExp(["\\n(\\n+)?", "(", "[ ]{0,3}", "[:][ ]+", ")", "([\\s\\S]+?)", "(?=\\n*", "(?:", "\\n[ ]{0,3}[:][ ]|", "<dt>|\\x03", ")", ")"].join(""), "gm");
            return e = s(e), e = e.replace(/\n{2,}(?=\\x03)/, "\n"), e = e.replace(r, function(e, n, i) {
                for (var r = t(i).split("\n"), o = "", s = 0; s < r.length; s++) {
                    var l = r[s];
                    l = c(t(l), a), o += "\n<dt>" + l + "</dt>"
                }
                return o + "\n"
            }), e = e.replace(o, function(e, t, r, o) {
                return t || o.match(/\n{2,}/) ? (o = Array(r.length + 1).join(" ") + o, o = i(o) + "\n\n", o = "\n" + u(o, a) + "\n") : (o = n(o), o = c(i(o), a)), "\n<dd>" + o + "</dd>\n"
            }), l(e)
        }, e.Extra.prototype.strikethrough = function(e) {
            return e.replace(/([\W_]|^)~T~T(?=\S)([^\r]*?\S[\*_]*)~T~T([\W_]|$)/g, "$1<del>$2</del>$3")
        }, e.Extra.prototype.newlines = function(e) {
            return e.replace(/(<(?:br|\/li)>)?\n/g, function(e, t) {
                return t ? e : " <br>\n"
            })
        }
    }), define("pagedown_sanitizer", ["pagedown_converter"], function(e) {
        "use strict";

        function t(e) {
            return e.replace(/<[^>]*>?/gi, n)
        }

        function n(e) {
            return e.match(o) || e.match(s) || e.match(l) ? e : ""
        }

        function i(e) {
            if ("" == e) return "";
            var t = /<\/?\w+[^>]*(\s|$|>)/g,
                n = e.toLowerCase().match(t),
                i = (n || []).length;
            if (0 == i) return e;
            for (var a, r, o, s = "<p><img><br><li><hr><th>", l = [], c = [], u = !1, d = 0; i > d; d++)
                if (a = n[d].replace(/<\/?(\w+).*/, "$1"), !(l[d] || s.search("<" + a + ">") > -1)) {
                    if (r = n[d], o = -1, !/^<\//.test(r))
                        for (var p = d + 1; i > p; p++)
                            if (!l[p] && n[p] == "</" + a + ">") {
                                o = p;
                                break
                            } - 1 == o ? u = c[d] = !0 : l[o] = !0
                }
            if (!u) return e;
            var d = 0;
            return e = e.replace(t, function(e) {
                var t = c[d] ? "" : e;
                return d++, t
            })
        }
        var a, r;
        "object" == typeof exports && "function" == typeof require ? (a = exports, r = require("./Markdown.Converter").Converter) : (a = e, r = a.Converter), a.getSanitizingConverter = function() {
            var e = new r;
            return e.hooks.chain("postConversion", t), e.hooks.chain("postConversion", i), e
        };
        var o = /^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|h4|i|kbd|li|ol|p|pre|s|sup|sub|strong|strike|ul|table|td|tbody|th|thead|tr)>|<(br|hr)\s?\/?>)$/i,
            s = /^(<a\shref="((https?|ftp):\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\stitle="[^"<>]+")?\s?>|<\/a>)$/i,
            l = /^(<img\ssrc="(https?:\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?\s?\/?>)$/i
    }),
    function() {
        var e = window.log || $.noop,
            t = {
                fileError: function(e, t, n) {
                    window.alert(n)
                }
            },
            n = window.FileReader || window.File && window.File.prototype.getAsBinary,
            i = !!window.FormData,
            a = window.FileReader || window.File && window.File.prototype.getAsDataURL,
            r = !!document.createElement("canvas").toDataURL,
            o = r && window.atob,
            s = !!document.createElement("canvas").mozGetAsFile,
            l = window.XMLHttpRequest && window.XMLHttpRequest.prototype.sendAsBinary || window.Blob && window.Uint8Array && window.ProgressEvent || window.ArrayBuffer && window.BlobBuilder,
            c = !!window.FormData,
            u = !!document.createElement("canvas").toDataURL,
            d = n && l || i && c,
            p = a && (o && l || s && c),
            f = a,
            h = a && r,
            g = function(e) {
                return e.substring(e.indexOf(",") + 1, e.length)
            },
            m = function(t, n) {
                var a = {
                    type: n.type || "",
                    size: n.size || n.fileSize,
                    name: n.name || n.fileName
                };
                if (t.resizeImage && !p && t.allowUploadOriginalImage && (e("WARN: Fall back to upload original un-resized image."), t.resizeImage = !1), !t.resizeImage) {
                    if (t.fileType && t.fileType.test && !t.fileType.test(a.name.substr(a.name.lastIndexOf(".") + 1))) return e("ERROR: Invalid Filetype."), void t.fileError.call(this, a, "INVALID_FILETYPE", "Invalid filetype.");
                    if (t.fileMaxSize && n.size > t.fileMaxSize) return e("ERROR: File exceeds size limit."), void t.fileError.call(this, a, "FILE_EXCEEDS_SIZE_LIMIT", "File exceeds size limit.")
                }
                if (!t.resizeImage && i) e("INFO: Bypass file reading, insert file object into FormData object directly."), v(t, "file", n, a);
                else if (window.FileReader) {
                    e("INFO: Using FileReader to do asynchronously file reading.");
                    var r = new FileReader;
                    r.onerror = function(n) {
                        if (n.target.error) switch (n.target.error) {
                            case 8:
                                e("ERROR: File not found."), t.fileError.call(this, a, "FILE_NOT_FOUND", "File not found.");
                                break;
                            case 24:
                                e("ERROR: File not readable."), t.fileError.call(this, a, "IO_ERROR", "File not readable.");
                                break;
                            case 18:
                                e("ERROR: File cannot be access due to security constrant."), t.fileError.call(this, a, "SECURITY_ERROR", "File cannot be access due to security constrant.");
                                break;
                            case 20:
                        }
                    }, t.resizeImage ? (r.onloadend = function(e) {
                        var i = e.target.result;
                        b(t, i, a, n)
                    }, r.readAsDataURL(n)) : l ? (r.onloadend = function(e) {
                        var n = e.target.result;
                        v(t, "bin", n, a)
                    }, r.readAsBinaryString(n)) : t.allowDataInBase64 ? (r.onloadend = function(e) {
                        v(t, "base64", g(e.target.result), a)
                    }, r.readAsDataURL(n)) : (e("ERROR: No available method to extract file; allowDataInBase64 not set."), t.fileError.call(this, a, "NO_BIN_SUPPORT_AND_BASE64_NOT_SET", "No available method to extract file; allowDataInBase64 not set."))
                } else if (window.File && window.File.prototype.getAsBinary)
                    if (e("WARN: FileReader does not exist, UI will be blocked when reading big file."), t.resizeImage) {
                        try {
                            var o = n.getAsDataURL()
                        } catch (s) {
                            return e("ERROR: File not readable."), void t.fileError.call(this, a, "IO_ERROR", "File not readable.")
                        }
                        b(t, dataurl, a, n)
                    } else {
                        try {
                            var o = n.getAsBinary()
                        } catch (s) {
                            return e("ERROR: File not readable."), void t.fileError.call(this, a, "IO_ERROR", "File not readable.")
                        }
                        v(t, "bin", o, a)
                    } else t.fallback ? t.fallback() : t.fileError.call(this, a, "NOT_SUPPORT", "ERROR: No available method to extract file; this browser is not supported.")
            },
            b = function(t, n, i, a) {
                var d = new Image;
                d.onerror = function() {
                    e("ERROR: <img> failed to load, file is not a supported image format."), t.fileError.call(this, i, "FILE_NOT_IMAGE", "File is not a supported image format.")
                }, d.onload = function() {
                    var n = document.createElement("canvas"),
                        p = function(n) {
                            t.imageType && "auto" !== t.imageType || ("image/jpeg" === i.type ? t.imageType = "jpeg" : t.imageType = "png");
                            var d = {
                                type: "image/" + t.imageType,
                                name: i.name.substr(0, i.name.indexOf(".")) + ".resized." + t.imageType
                            };
                            if (s && c) {
                                var p = n.mozGetAsFile(d.name, "image/" + t.imageType);
                                d.size = a.size || a.fileSize, v(t, "file", p, d)
                            } else if (o && l) {
                                var f = window.atob(g(n.toDataURL("image/" + t.imageType)));
                                d.size = f.length, v(t, "bin", f, d)
                            } else t.allowDataInBase64 && r && u ? v(t, "base64", g(n.toDataURL("image/" + t.imageType)), d) : (e("ERROR: No available method to extract image; allowDataInBase64 not set."), t.fileError.call(this, i, "NO_BIN_SUPPORT_AND_BASE64_NOT_SET", "No available method to extract file; allowDataInBase64 not set."))
                        };
                    t.resizeImage(d, n, p)
                }, d.src = n
            },
            v = function(t, n, i, a) {
                if (c && "file" === n) {
                    e("INFO: Using FormData to construct form.");
                    var r = new FormData;
                    r.append(t.name, i), t.processData = !1, t.contentType = !1, t.__beforeSend = t.beforeSend, t.beforeSend = function(e, t) {
                        return t.data = r, t.__beforeSend ? t.__beforeSend.call(this, e, t) : void 0
                    }
                } else if (l && "bin" === n) {
                    e("INFO: Concat our own multipart/form-data data string."), a.type || (a.type = "application/octet-stream"), /[^\x20-\x7E]/.test(a.name) && (e("INFO: Filename contains non-ASCII code, do UTF8-binary string conversion."), a.name_bin = unescape(encodeURIComponent(a.name)));
                    var o = "xhrupload-" + parseInt(Math.random() * (2 << 16));
                    t.contentType = "multipart/form-data; boundary=" + o;
                    var r = "--" + o + '\ncontent-disposition: form-data; name="' + t.name + '"; filename="' + (a.name_bin || a.name) + '"\nContent-Type: ' + a.type + "\n\n" + i + "\n\n--" + o + "--";
                    if (window.XMLHttpRequest && window.XMLHttpRequest.prototype.sendAsBinary) e("INFO: Pass binary string to xhr."), t.data = r;
                    else if (window.Blob && window.Uint8Array && window.ProgressEvent) {
                        e("INFO: Make XH2 blob string");
                        for (var s = new Uint8Array(r.length), u = 0; u < r.length; u++) s[u] = r.charCodeAt(u);
                        var d = s.buffer;
                        t.processData = !1, t.__beforeSend = t.beforeSend, t.beforeSend = function(e, t) {
                            return t.data = d, t.__beforeSend ? t.__beforeSend.call(this, e, t) : void 0
                        }
                    } else {
                        e("INFO: Convert binary string into Blob.");
                        var p = new ArrayBuffer(r.length),
                            s = new Uint8Array(p);
                        $.each(r, function(e, t) {
                            s[e] = t.charCodeAt(0)
                        });
                        var f = new BlobBuilder;
                        f.append(p);
                        var d = f.getBlob();
                        t.processData = !1, t.__beforeSend = t.beforeSend, t.beforeSend = function(e, t) {
                            return t.data = d, t.__beforeSend ? t.__beforeSend.call(this, e, t) : void 0
                        }
                    }
                } else {
                    if (!t.allowDataInBase64 || "base64" !== n) return e("ERROR: Data is not given in processable form."), void t.fileError.call(this, a, "INTERNAL_ERROR", "Data is not given in processable form.");
                    e("INFO: Concat our own multipart/form-data data string; send the file in base64 because binary xhr is not supported."), a.type || (a.type = "application/octet-stream"), t.url += "?enc=base64";
                    var o = "xhrupload-" + parseInt(Math.random() * (2 << 16));
                    t.contentType = "multipart/form-data; boundary=" + o, t.data = "--" + o + '\ncontent-disposition: form-data; name="' + t.name + '"; filename="' + encodeURIComponent(a.name) + '.base64"\nContent-Transfer-Encoding: base64\nContent-Type: ' + a.type + "\n\n" + i + "\n\n--" + o + "--"
                }
                w(t)
            },
            w = function(t) {
                e("INFO: Sending file."), "string" == typeof t.data && l && (e("INFO: Using xhr.sendAsBinary."), t.___beforeSend = t.beforeSend, t.beforeSend = function(e, t) {
                    return window.XMLHttpRequest.prototype.sendAsBinary && (e.send = e.sendAsBinary), t.___beforeSend ? t.___beforeSend.call(this, e, t) : void 0
                }), $.ajax(t)
            };
        $.fn.fileUpload = function(n) {
            return this.each(function(i, a) {
                $(a).is("input[type=file]") && (e("INFO: binding onchange event to a input[type=file]."), $(a).bind("change", function() {
                    if (!this.files) return void(n.fallback && n.fallback());
                    if (!this.files.length) return void e("ERROR: no file selected.");
                    this.files.length > 1 && e("WARN: Multiple file upload not implemented yet, only first file will be uploaded."), n.name = $(this).attr("name");
                    var i = this.files[0];
                    if ($(a).parents("#localPic").length) {
                        var r = $(a).val(); - 1 !== r.indexOf("\\fakepath") && (r = r.split("\\fakepath\\")[1]), $("#fileName").val(r), $(".done-btn").click(function() {
                            m($.extend({}, t, n), i)
                        })
                    } else m($.extend({}, t, n), this.files[0]);
                    this.form ? this.form.reset() : e("WARN: Unable to reset file selection, upload won't be triggered again if user selects the same file.")
                })), $(a).is("form") ? e("ERROR: <form> not implemented yet.") : (e("INFO: binding ondrop event."), $(a).bind("dragover", function(e) {
                    return !1
                }).bind("drop", function(i) {
                    return i.originalEvent.dataTransfer.files ? i.originalEvent.dataTransfer.files.length ? (!i.originalEvent.dataTransfer.files.length > 1 && e("WARN: Multiple file upload not implemented yet, only first file will be uploaded."), m($.extend({}, t, n), i.originalEvent.dataTransfer.files[0]), !1) : (e('ERROR: User had dropped a virual file (e.g. "My Computer")'), !1) : (e("ERROR: No FileList object present; user might had dropped text."), !1)
                }))
            }), this
        }, $.fileUploadSupported = d, $.imageUploadSupported = p, $.fileUploadAsBase64Supported = f, $.imageUploadAsBase64Supported = h
    }(), define("fileUpload", ["jquery"], function(e) {
        return function() {
            var t;
            return t || e.$.fn.fileUpload
        }
    }(this)), define("pagedown_editor", ["jquery", "pagedown_converter", "sfModal", "pagedown_extra", "pagedown_sanitizer", "fileUpload"], function(e, t, n) {
        "use strict";

        function i() {}

        function a(e, t) {
            t = t || "wmd-input", this.buttonBar = h.getElementById("wmd-button-bar" + e), this.preview = h.getElementById("wmd-preview" + e), this.input = h.getElementById(t + e)
        }

        function r(e, t) {
            var n, i, a, r = this,
                s = [],
                l = 0,
                c = "none",
                u = function(e, t) {
                    c != e && (c = e, t || f()), v.isIE && "moving" == c ? a = null : i = setTimeout(p, 1)
                },
                p = function(e) {
                    a = new o(t, e), i = void 0
                };
            this.setCommandMode = function() {
                c = "command", f(), i = setTimeout(p, 0)
            }, this.canUndo = function() {
                return l > 1
            }, this.canRedo = function() {
                return s[l + 1] ? !0 : !1
            }, this.undo = function() {
                r.canUndo() && (n ? (n.restore(), n = null) : (s[l] = new o(t), s[--l].restore(), e && e())), c = "none", t.input.focus(), p()
            }, this.redo = function() {
                r.canRedo() && (s[++l].restore(), e && e()), c = "none", t.input.focus(), p()
            };
            var f = function() {
                    var i = a || new o(t);
                    return i ? "moving" == c ? void(n || (n = i)) : (n && (s[l - 1].text != n.text && (s[l++] = n), n = null), s[l++] = i, s[l + 1] = null, void(e && e())) : !1
                },
                h = function(e) {
                    var t = !1;
                    if ((e.ctrlKey || e.metaKey) && !e.altKey) {
                        var n = e.charCode || e.keyCode,
                            i = String.fromCharCode(n);
                        switch (i.toLowerCase()) {
                            case "y":
                                r.redo(), t = !0;
                                break;
                            case "z":
                                e.shiftKey ? r.redo() : r.undo(), t = !0
                        }
                    }
                    return t ? (e.preventDefault && e.preventDefault(), void(window.event && (window.event.returnValue = !1))) : void 0
                },
                g = function(e) {
                    if (!e.ctrlKey && !e.metaKey) {
                        var t = e.keyCode;
                        t >= 33 && 40 >= t || t >= 63232 && 63235 >= t ? u("moving") : 8 == t || 46 == t || 127 == t ? u("deleting") : 13 == t ? u("newlines") : 27 == t ? u("escape") : (16 > t || t > 20 || 9 === t) && 91 != t && u("typing")
                    }
                },
                m = function() {
                    d.addEvent(t.input, "keypress", function(e) {
                        !e.ctrlKey && !e.metaKey || e.altKey || 89 != e.keyCode && 90 != e.keyCode || e.preventDefault()
                    });
                    var e = function() {
                        (v.isIE || a && a.text != t.input.value) && void 0 == i && (c = "paste", f(), p())
                    };
                    d.addEvent(t.input, "keydown", h), d.addEvent(t.input, "keydown", g), d.addEvent(t.input, "mousedown", function() {
                        u("moving")
                    }), t.input.onpaste = e, t.input.ondrop = e
                },
                b = function() {
                    m(), p(!0), f()
                };
            b()
        }

        function o(e, t) {
            var n = this,
                a = e.input;
            this.init = function() {
                d.isVisible(a) && (t || !h.activeElement || h.activeElement === a) && (this.setInputAreaSelectionStartEnd(), this.scrollTop = a.scrollTop, (!this.text && a.selectionStart || 0 === a.selectionStart) && (this.text = a.value))
            }, this.setInputAreaSelection = function() {
                if (d.isVisible(a))
                    if (void 0 === a.selectionStart || v.isOpera) {
                        if (h.selection) {
                            if (h.activeElement && h.activeElement !== a) return;
                            a.focus();
                            var e = a.createTextRange();
                            e.moveStart("character", -a.value.length), e.moveEnd("character", -a.value.length), e.moveEnd("character", n.end), e.moveStart("character", n.start), e.select()
                        }
                    } else a.focus(), a.selectionStart = n.start, a.selectionEnd = n.end, a.scrollTop = n.scrollTop
            }, this.setInputAreaSelectionStartEnd = function() {
                if (e.ieCachedRange || !a.selectionStart && 0 !== a.selectionStart) {
                    if (h.selection) {
                        n.text = d.fixEolChars(a.value);
                        var t = e.ieCachedRange || h.selection.createRange(),
                            i = d.fixEolChars(t.text),
                            r = "",
                            o = r + i + r;
                        t.text = o;
                        var s = d.fixEolChars(a.value);
                        t.moveStart("character", -o.length), t.text = i, n.start = s.indexOf(r), n.end = s.lastIndexOf(r) - r.length;
                        var l = n.text.length - d.fixEolChars(a.value).length;
                        if (l) {
                            for (t.moveStart("character", -i.length); l--;) i += "\n", n.end += 1;
                            t.text = i
                        }
                        e.ieCachedRange && (n.scrollTop = e.ieCachedScrollTop), e.ieCachedRange = null, this.setInputAreaSelection()
                    }
                } else n.start = a.selectionStart, n.end = a.selectionEnd
            }, this.restore = function() {
                void 0 != n.text && n.text != a.value && (a.value = n.text), this.setInputAreaSelection(), a.scrollTop = n.scrollTop
            }, this.getChunks = function() {
                var e = new i;
                return e.before = d.fixEolChars(n.text.substring(0, n.start)), e.startTag = "", e.selection = d.fixEolChars(n.text.substring(n.start, n.end)), e.endTag = "", e.after = d.fixEolChars(n.text.substring(n.end)), e.scrollTop = n.scrollTop, e
            }, this.setChunks = function(e) {
                e.before = e.before + e.startTag, e.after = e.endTag + e.after, this.start = e.before.length, this.end = e.before.length + e.selection.length, this.text = e.before + e.selection + e.after, this.scrollTop = e.scrollTop
            }, this.init()
        }

        function s(e, t, n) {
            var i, a, r, o = 3e3,
                s = "delayed",
                l = function(e, t) {
                    d.addEvent(e, "input", t), e.onpaste = t, e.ondrop = t, d.addEvent(e, "keypress", t), d.addEvent(e, "keydown", t)
                },
                c = function() {
                    var e = 0;
                    return window.innerHeight ? e = window.pageYOffset : h.documentElement && h.documentElement.scrollTop ? e = h.documentElement.scrollTop : h.body && (e = h.body.scrollTop), e
                },
                u = function() {
                    if (t.preview) {
                        var n = t.input.value;
                        if (!n || n != r) {
                            r = n;
                            var i = (new Date).getTime();
                            n = e.makeHtml(n);
                            var o = (new Date).getTime();
                            a = o - i, x(n)
                        }
                    }
                },
                f = function() {
                    if (i && (clearTimeout(i), i = void 0), "manual" !== s) {
                        var e = 0;
                        "delayed" === s && (e = a), e > o && (e = o), i = setTimeout(u, e)
                    }
                },
                g = function(e) {
                    return e.scrollHeight <= e.clientHeight ? 1 : e.scrollTop / (e.scrollHeight - e.clientHeight)
                },
                m = function() {
                    t.preview && (t.preview.scrollTop = (t.preview.scrollHeight - t.preview.clientHeight) * g(t.preview))
                };
            this.refresh = function(e) {
                e ? (r = "", u()) : f()
            }, this.processingTime = function() {
                return a
            };
            var b, w = !0,
                y = function(e) {
                    var n = t.preview,
                        i = n.parentNode,
                        a = n.nextSibling;
                    i.removeChild(n), n.innerHTML = e, a ? i.insertBefore(n, a) : i.appendChild(n)
                },
                _ = function(e) {
                    t.preview.innerHTML = e
                },
                k = function(e) {
                    if (b) return b(e);
                    try {
                        _(e), b = _
                    } catch (t) {
                        b = y, b(e)
                    }
                },
                x = function(e) {
                    var i = p.getTop(t.input) - c();
                    if (t.preview && (k(e), n()), m(), w) return void(w = !1);
                    var a = p.getTop(t.input) - c();
                    v.isIE ? setTimeout(function() {
                        window.scrollBy(0, a - i)
                    }, 0) : window.scrollBy(0, a - i)
                },
                C = function() {
                    l(t.input, f), u(), t.preview && (t.preview.scrollTop = 0)
                };
            C()
        }

        function l(e, t, n, i, a, r, s) {
            function l(e) {
                if (g.focus(), e.textOp) {
                    n && n.setCommandMode();
                    var a = new o(t);
                    if (!a) return;
                    var r = a.getChunks(),
                        s = function() {
                            g.focus(), r && a.setChunks(r), a.restore(), i.refresh()
                        },
                        l = e.textOp(r, s);
                    l || s()
                }
                e.execute && e.execute(n)
            }

            function c(e, n) {
                var i = "0px",
                    a = "-20px",
                    r = "-40px",
                    o = e.getElementsByTagName("a")[0];
                n ? (o.style.backgroundPosition = e.XShift + " " + i, e.onmouseover = function() {
                    o.style.backgroundPosition = this.XShift + " " + r
                }, e.onmouseout = function() {
                    o.style.backgroundPosition = this.XShift + " " + i
                }, v.isIE && (e.onmousedown = function() {
                    h.activeElement && h.activeElement !== t.input || (t.ieCachedRange = document.selection.createRange(), t.ieCachedScrollTop = t.input.scrollTop)
                }), e.isHelp || (e.onclick = function() {
                    return this.onmouseout && this.onmouseout(), l(this), !1
                })) : (o.style.backgroundPosition = e.XShift + " " + a, e.onmouseover = e.onmouseout = e.onclick = function() {})
            }

            function u(e) {
                return "string" == typeof e && (e = a[e]),
                    function() {
                        e.apply(a, arguments)
                    }
            }

            function p() {
                var n = t.buttonBar,
                    i = document.createElement("ul");
                i.id = "wmd-button-row" + e, i.className = "editor__menu clearfix", i = n.appendChild(i);
                var a = 0,
                    o = function(t, n, r, o) {
                        var s = document.createElement("li");
                        s.className = "wmd-button", s.style.left = a + "px", a += 25;
                        var l = document.createElement("a");
                        return l.className = "editor__menu--bold", s.id = t + e, s.appendChild(l), s.title = n, s.XShift = r, o && (s.textOp = o), c(s, !0), i.appendChild(s), s
                    },
                    l = function(t) {
                        var n = document.createElement("li");
                        n.className = "editor__menu--divider wmd-spacer" + t, n.id = "wmd-spacer" + t + e, i.appendChild(n), a += 25
                    };
                b.bold = o("wmd-bold-button", s("bold"), "0px", u("doBold")), b.italic = o("wmd-italic-button", s("italic"), "-20px", u("doItalic")), l(1), b.link = o("wmd-link-button", s("link"), "-40px", u(function(e, t) {
                    return this.doLinkOrImage(e, t, !1)
                })), b.quote = o("wmd-quote-button", s("quote"), "-60px", u("doBlockquote")), b.code = o("wmd-code-button", s("code"), "-80px", u("doCode")), b.image = o("wmd-image-button", s("image"), "-100px", u(function(e, t) {
                    return this.doLinkOrImage(e, t, !0)
                })), l(2), b.olist = o("wmd-olist-button", s("olist"), "-120px", u(function(e, t) {
                    this.doList(e, t, !0)
                })), b.ulist = o("wmd-ulist-button", s("ulist"), "-140px", u(function(e, t) {
                    this.doList(e, t, !1)
                })), b.heading = o("wmd-heading-button", s("heading"), "-160px", u("doHeading")), b.hr = o("wmd-hr-button", s("hr"), "-180px", u("doHorizontalRule")), l(3), b.undo = o("wmd-undo-button", s("undo"), "-200px", null), b.undo.execute = function(e) {
                    e && e.undo()
                };
                var d = s(/win/.test(m.platform.toLowerCase()) ? "redo" : "redomac");
                if (b.redo = o("wmd-redo-button", d, "-220px", null), b.redo.execute = function(e) {
                        e && e.redo()
                    }, r) {
                    var p = document.createElement("li"),
                        h = document.createElement("span");
                    p.appendChild(h), p.className = "wmd-button wmd-help-button", p.id = "wmd-help-button" + e, p.XShift = "-240px", p.isHelp = !0, p.style.right = "0px", p.title = s("help"), p.onclick = r.handler, c(p, !0), i.appendChild(p), b.help = p
                }
                f(), l(4), b.help = o("wmd-help-button", s("help"), "-300px")
            }

            function f() {
                n && (c(b.undo, n.canUndo()), c(b.redo, n.canRedo()))
            }
            var g = t.input,
                b = {};
            p();
            var w = "keydown";
            v.isOpera && (w = "keypress"), d.addEvent(g, w, function(e) {
                if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
                    var t = e.charCode || e.keyCode,
                        n = String.fromCharCode(t).toLowerCase();
                    switch (n) {
                        case "b":
                            l(b.bold);
                            break;
                        case "i":
                            l(b.italic);
                            break;
                        case "l":
                            e.preventDefault(), l(b.link);
                            break;
                        case "q":
                            l(b.quote);
                            break;
                        case "k":
                            l(b.code);
                            break;
                        case "g":
                            l(b.image);
                            break;
                        case "o":
                            l(b.olist);
                            break;
                        case "u":
                            l(b.ulist);
                            break;
                        case "h":
                            e.preventDefault(), l(b.heading);
                            break;
                        case "r":
                            e.preventDefault(), l(b.hr);
                            break;
                        case "y":
                            l(b.redo);
                            break;
                        case "z":
                            l(e.shiftKey ? b.redo : b.undo);
                            break;
                        default:
                            return
                    }
                }
            }), d.addEvent(g, "keyup", function(e) {
                if (e.shiftKey && !e.ctrlKey && !e.metaKey) {
                    var t = e.charCode || e.keyCode;
                    if (13 === t) {
                        var n = {};
                        n.textOp = u("doAutoindent"), l(n)
                    }
                }
            }), v.isIE && d.addEvent(g, "keydown", function(e) {
                var t = e.keyCode;
                return 27 === t ? !1 : void 0
            }), this.setUndoRedoButtonStates = f
        }

        function c(e, t) {
            this.hooks = e, this.getString = t
        }

        function u(e) {
            return e.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/, function(e, t, n) {
                return t = t.replace(/\?.*$/, function(e) {
                    return e.replace(/\+/g, " ")
                }), t = decodeURIComponent(t), t = encodeURI(t).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29"), t = t.replace(/\?.*$/, function(e) {
                    return e.replace(/\+/g, "%2b")
                }), n && (n = n.trim ? n.trim() : n.replace(/^\s*/, "").replace(/\s*$/, ""), n = n.replace(/"/g, "quot;").replace(/\(/g, "&#40;").replace(/\)/g, "&#41;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), n ? t + ' "' + n + '"' : t
            })
        }
        var d = {},
            p = {},
            f = {},
            h = window.document,
            g = window.RegExp,
            m = window.navigator,
            b = {
                lineLength: 72
            },
            v = {
                isIE: /msie/.test(m.userAgent.toLowerCase()),
                isIE_5or6: /msie 6/.test(m.userAgent.toLowerCase()) || /msie 5/.test(m.userAgent.toLowerCase()),
                isOpera: /opera/.test(m.userAgent.toLowerCase())
            },
            w = {
                bold: "加粗 <strong> Ctrl+B",
                boldexample: "加粗文字",
                italic: "斜体 <em> Ctrl+I",
                italicexample: "斜体文字",
                link: "链接 <a> Ctrl+L",
                linkdescription: "链接描述",
                linkdialog: '<input type="text" id="editorLinkText" class="form-control text-28" placeholder="请输入链接地址">',
                quote: "引用 <blockquote> Ctrl+Q",
                quoteexample: "引用文字",
                code: "代码 <pre><code> Ctrl+K",
                codeexample: "请输入代码",
                image: "图片 <img> Ctrl+G",
                imagedescription: "图片描述",
                imagedialog: '<ul class="nav nav-tabs" role="tablist"><li class="active"><a href="#localPic" role="tab" data-toggle="tab">本地上传</a></li>    <li><a href="#remotePic" role="tab" data-toggle="tab">远程地址获取</a></li></ul><div class="tab-content">    <div class="tab-pane fade active in pt20 form-horizontal" id="localPic">        <span class="text-muted">图片体积不得大于 4 MB</span>        <br>        <div class="widget-upload form-group">        <input type="file" id="editorUpload" name="image" class="widget-upload__file">        <div class="col-sm-8">        <input type="text" id="fileName" class="form-control col-sm-10 widget-upload__text" placeholder="拖动图片到这里" readonly="">        </div>        <a href="javascript:void(0);" class="btn col-sm-2 btn-default">选择图片</a>        </div>    </div>    <div class="tab-pane fade pt20" id="remotePic">    <input type="url" name="img" id="remotePicUrl" class="form-control text-28" placeholder="请输入图片所在网址">    </div></div>',
                olist: "数字列表 <ol> Ctrl+O",
                ulist: "普通列表 <ul> Ctrl+U",
                litem: "列表项目",
                heading: "标题 <h1>/<h2> Ctrl+H",
                headingexample: "标题文字",
                hr: "分割线 <hr> Ctrl+R",
                undo: "撤销 - Ctrl+Z",
                redo: "重做 - Ctrl+Y",
                redomac: "重做 - Ctrl+Shift+Z",
                zen: "全屏",
                help: "Markdown 语法"
            };
        t.Editor = function(e, n, i) {
            i = i || {}, "function" == typeof i.handler && (i = {
                helpButton: i
            }), i.strings = i.strings || {}, i.helpButton && (i.strings.help = i.strings.help || i.helpButton.title);
            var o = function(e) {
                return i.strings[e] || w[e]
            };
            n = n || "";
            var u = this.hooks = new t.HookCollection;
            u.addNoop("onPreviewRefresh"), u.addNoop("postBlockquoteCreation"), u.addFalse("insertImageDialog"), this.getConverter = function() {
                return e
            };
            var d, p = this;
            this.run = function(t) {
                if (!d) {
                    d = new a(n, t);
                    var f, g, m = new c(u, o),
                        b = new s(e, d, function() {
                            u.onPreviewRefresh()
                        });
                    /\?noundo/.test(h.location.href) || (f = new r(function() {
                        b.refresh(), g && g.setUndoRedoButtonStates()
                    }, d), this.textOperation = function(e) {
                        f.setCommandMode(), e(), p.refreshPreview()
                    }), g = new l(n, d, f, b, m, i.helpButton, o), g.setUndoRedoButtonStates();
                    var v = p.refreshPreview = function() {
                        b.refresh(!0)
                    };
                    v()
                }
            }
        }, i.prototype.findTags = function(e, t) {
            var n, i = this;
            e && (n = d.extendRegExp(e, "", "$"), this.before = this.before.replace(n, function(e) {
                return i.startTag = i.startTag + e, ""
            }), n = d.extendRegExp(e, "^", ""), this.selection = this.selection.replace(n, function(e) {
                return i.startTag = i.startTag + e, ""
            })), t && (n = d.extendRegExp(t, "", "$"), this.selection = this.selection.replace(n, function(e) {
                return i.endTag = e + i.endTag, ""
            }), n = d.extendRegExp(t, "^", ""), this.after = this.after.replace(n, function(e) {
                return i.endTag = e + i.endTag, ""
            }))
        }, i.prototype.trimWhitespace = function(e) {
            var t, n, i = this;
            e ? t = n = "" : (t = function(e) {
                return i.before += e, ""
            }, n = function(e) {
                return i.after = e + i.after, ""
            }), this.selection = this.selection.replace(/^(\s*)/, t).replace(/(\s*)$/, n)
        }, i.prototype.skipLines = function(e, t, n) {
            void 0 === e && (e = 1), void 0 === t && (t = 1), e++, t++;
            var i, a;
            if (navigator.userAgent.match(/Chrome/) && "X".match(/()./), this.selection = this.selection.replace(/(^\n*)/, ""), this.startTag = this.startTag + g.$1, this.selection = this.selection.replace(/(\n*$)/, ""), this.endTag = this.endTag + g.$1, this.startTag = this.startTag.replace(/(^\n*)/, ""), this.before = this.before + g.$1, this.endTag = this.endTag.replace(/(\n*$)/, ""), this.after = this.after + g.$1, this.before) {
                for (i = a = ""; e--;) i += "\\n?", a += "\n";
                n && (i = "\\n*"), this.before = this.before.replace(new g(i + "$", ""), a)
            }
            if (this.after) {
                for (i = a = ""; t--;) i += "\\n?", a += "\n";
                n && (i = "\\n*"), this.after = this.after.replace(new g(i, ""), a)
            }
        }, d.isVisible = function(e) {
            return window.getComputedStyle ? "none" !== window.getComputedStyle(e, null).getPropertyValue("display") : e.currentStyle ? "none" !== e.currentStyle.display : void 0
        }, d.addEvent = function(e, t, n) {
            e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n, !1)
        }, d.removeEvent = function(e, t, n) {
            e.detachEvent ? e.detachEvent("on" + t, n) : e.removeEventListener(t, n, !1)
        }, d.fixEolChars = function(e) {
            return e = e.replace(/\r\n/g, "\n"), e = e.replace(/\r/g, "\n")
        }, d.extendRegExp = function(e, t, n) {
            (null === t || void 0 === t) && (t = ""), (null === n || void 0 === n) && (n = "");
            var i, a = e.toString();
            return a = a.replace(/\/([gim]*)$/, function(e, t) {
                return i = t, ""
            }), a = a.replace(/(^\/|\/$)/g, ""), a = t + a + n, new g(a, i)
        }, p.getTop = function(e, t) {
            var n = e.offsetTop;
            if (!t)
                for (; e = e.offsetParent;) n += e.offsetTop;
            return n
        }, p.getHeight = function(e) {
            return e.offsetHeight || e.scrollHeight
        }, p.getWidth = function(e) {
            return e.offsetWidth || e.scrollWidth
        }, p.getPageSize = function() {
            var e, t, n, i;
            self.innerHeight && self.scrollMaxY ? (e = h.body.scrollWidth, t = self.innerHeight + self.scrollMaxY) : h.body.scrollHeight > h.body.offsetHeight ? (e = h.body.scrollWidth, t = h.body.scrollHeight) : (e = h.body.offsetWidth, t = h.body.offsetHeight), self.innerHeight ? (n = self.innerWidth, i = self.innerHeight) : h.documentElement && h.documentElement.clientHeight ? (n = h.documentElement.clientWidth, i = h.documentElement.clientHeight) : h.body && (n = h.body.clientWidth, i = h.body.clientHeight);
            var a = Math.max(e, n),
                r = Math.max(t, i);
            return [a, r, n, i]
        }, f.createBackground = function() {
            var e = h.createElement("div"),
                t = e.style;
            e.className = "modal-backdrop wmd-prompt-background", t.position = "absolute", t.top = "0", t.zIndex = "1000", v.isIE ? t.filter = "alpha(opacity=50)" : t.opacity = "0.5";
            var n = p.getPageSize();
            return t.height = n[1] + "px", v.isIE ? (t.left = h.documentElement.scrollLeft, t.width = h.documentElement.clientWidth) : (t.left = "0", t.width = "100%"), h.body.appendChild(e), e
        }, f.prompt = function(e, t, n, i) {
            var a, r;
            void 0 === n && (n = "");
            var o = function(e) {
                    var t = e.charCode || e.keyCode;
                    27 === t && s(!0)
                },
                s = function(e) {
                    d.removeEvent(h.body, "keydown", o);
                    var t = r.value;
                    return e ? t = null : (t = t.replace(/^http:\/\/(https?|ftp):\/\//, "$1://"), /^(?:https?|ftp):\/\//.test(t) || (t = "http://" + t)), a.parentNode.removeChild(a), i(t), !1
                },
                l = function() {
                    a = h.createElement("div"), a.className = "modal-content wmd-prompt-dialog", a.style.padding = "10px;", a.style.position = "fixed", a.style.width = "600px", a.style.zIndex = "1001";
                    var i = h.createElement("div");
                    i.className = "modal-header", i.innerHTML = '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="ml20">' + e + "</h4>", a.appendChild(i);
                    var l = h.createElement("div");
                    l.innerHTML = t, l.style.padding = "5px", l.style.margin = "20px", a.appendChild(l);
                    var c = h.createElement("form"),
                        u = c.style;
                    c.onsubmit = function() {
                        return s(!1)
                    }, u.padding = "0", u.margin = "0 0 20px", u.cssFloat = "left", u.width = "100%", u.textAlign = "center", u.position = "relative", a.appendChild(c), r = h.createElement("input"), r.className = "form-control text-28", r.type = "text", r.value = n, u = r.style, u.display = "block", u.width = "80%", u.marginLeft = u.marginRight = "auto", c.appendChild(r);
                    var f = h.createElement("input");
                    f.className = "btn btn-primary", f.type = "button", f.onclick = function() {
                        return s(!1)
                    }, f.value = "确定", u = f.style, u.margin = "10px", u.display = "inline", u.width = "7em";
                    var g = h.createElement("input");
                    g.className = "btn btn-default", g.type = "button", g.onclick = function() {
                        return s(!0)
                    }, g.value = "取消", u = g.style, u.margin = "10px", u.display = "inline", u.width = "7em", c.appendChild(f), c.appendChild(g), d.addEvent(h.body, "keydown", o), a.style.top = "50%", a.style.left = "50%", a.style.display = "block", v.isIE_5or6 && (a.style.position = "absolute", a.style.top = h.documentElement.scrollTop + 200 + "px", a.style.left = "50%"), h.body.appendChild(a), a.style.marginTop = -(p.getHeight(a) / 2) + "px", a.style.marginLeft = -(p.getWidth(a) / 2) + "px"
                };
            setTimeout(function() {
                l();
                var e = n.length;
                if (void 0 !== r.selectionStart) r.selectionStart = 0, r.selectionEnd = e;
                else if (r.createTextRange) {
                    var t = r.createTextRange();
                    t.collapse(!1), t.moveStart("character", -e), t.moveEnd("character", e), t.select()
                }
                r.focus()
            }, 0)
        };
        var y = c.prototype;
        return y.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)", y.unwrap = function(e) {
            var t = new g("([^\\n])\\n(?!(\\n|" + this.prefixes + "))", "g");
            e.selection = e.selection.replace(t, "$1 $2")
        }, y.wrap = function(e, t) {
            this.unwrap(e);
            var n = new g("(.{1," + t + "})( +|$\\n?)", "gm"),
                i = this;
            e.selection = e.selection.replace(n, function(e, t) {
                return new g("^" + i.prefixes, "").test(e) ? e : t + "\n"
            }), e.selection = e.selection.replace(/\s+$/, "")
        }, y.doBold = function(e, t) {
            return this.doBorI(e, t, 2, this.getString("boldexample"))
        }, y.doItalic = function(e, t) {
            return this.doBorI(e, t, 1, this.getString("italicexample"))
        }, y.doBorI = function(e, t, n, i) {
            e.trimWhitespace(), e.selection = e.selection.replace(/\n{2,}/g, "\n");
            var a = /(\**$)/.exec(e.before)[0],
                r = /(^\**)/.exec(e.after)[0],
                o = Math.min(a.length, r.length);
            if (o >= n && (2 != o || 1 != n)) e.before = e.before.replace(g("[*]{" + n + "}$", ""), ""), e.after = e.after.replace(g("^[*]{" + n + "}", ""), "");
            else if (!e.selection && r) {
                e.after = e.after.replace(/^([*_]*)/, ""), e.before = e.before.replace(/(\s?)$/, "");
                var s = g.$1;
                e.before = e.before + r + s
            } else {
                e.selection || r || (e.selection = i);
                var l = 1 >= n ? "*" : "**";
                e.before = e.before + l, e.after = l + e.after
            }
        }, y.stripLinkDefs = function(e, t) {
            return e = e.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm, function(e, n, i, a, r) {
                return t[n] = e.replace(/\s*$/, ""), a ? (t[n] = e.replace(/["(](.+?)[")]$/, ""), a + r) : ""
            })
        }, y.addLinkDef = function(e, t) {
            var n = 0,
                i = {};
            e.before = this.stripLinkDefs(e.before, i), e.selection = this.stripLinkDefs(e.selection, i), e.after = this.stripLinkDefs(e.after, i);
            var a = "",
                r = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g,
                o = function(e) {
                    n++, e = e.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + n + "]:"), a += "\n" + e
                },
                s = function(e, t, a, l, c, u) {
                    return a = a.replace(r, s), i[c] ? (o(i[c]), t + a + l + n + u) : e
                };
            e.before = e.before.replace(r, s), t ? o(t) : e.selection = e.selection.replace(r, s);
            var l = n;
            return e.after = e.after.replace(r, s), e.after && (e.after = e.after.replace(/\n*$/, "")), e.after || (e.selection = e.selection.replace(/\n*$/, "")), e.after += "\n\n" + a, l
        }, y.doLinkOrImage = function(t, i, a) {
            t.trimWhitespace(), t.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);
            if (!(t.endTag.length > 1 && t.startTag.length > 0)) {
                if (t.selection = t.startTag + t.selection + t.endTag, t.startTag = t.endTag = "", /\n\n/.test(t.selection)) return void this.addLinkDef(t, null);
                var r = this,
                    o = function(e, o) {
                        if (n("hide"), null !== e) {
                            t.selection = (" " + t.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1);
                            var s = " [999]: " + u(e),
                                l = r.addLinkDef(t, s);
                            t.startTag = a ? "![" : "[", t.endTag = "][" + l + "]", t.selection || (a ? t.selection = o || r.getString("imagedescription") : t.selection = r.getString("linkdescription"))
                        }
                        i()
                    };
                if (a) {
                    if (!this.hooks.insertImageDialog(o)) {
                        var s, l, c = this.getString("imagedialog");
                        n({
                            title: "插入图片",
                            content: c,
                            closeText: "取消",
                            doneText: "插入",
                            hidden: function() {
                                e(".wmd-input").focus()
                            },
                            show: function() {
                                e("#editorUpload").fileUpload({
                                    url: "/img/upload/image",
                                    type: "POST",
                                    dataType: "json",
                                    beforeSend: function() {
                                        var t = e("#editorUpload").val(); - 1 !== t.indexOf("\\fakepath") && (t = t.split("\\fakepath\\")[1]), t || t.fuckYou(), e("#fileName").addClass("loading"), e(".done-btn").attr("disabled", "disabled")
                                    },
                                    complete: function() {
                                        e("#fileName").removeClass("loading"), e(".done-btn").attr("disabled", !1)
                                    },
                                    success: function(e) {
                                        var t = e[0],
                                            i = e[1];
                                        t ? n("对不起，上传图片失败，请联系管理员或稍后再试。") : (l = i, o(l, s))
                                    }
                                })
                            },
                            doneFn: function(t) {
                                t.preventDefault(), e("#remotePic").hasClass("active") && e("#remotePicUrl").val() && (e("#remotePicUrl").addClass("loading"), e(".done-btn").attr("disabled", "disabled"), s = e("#remotePicUrl").val().match(/\/([^/]+)$/)[1], e.post("/img/fetch/image", {
                                    src: e("#remotePicUrl").val()
                                }, function(t) {
                                    e(".done-btn").attr("disabled", !1), e("#remotePicUrl").removeClass("loading");
                                    var i = t.match(/\[(\d),/)[1],
                                        a = t.match(/\[\d,"(\S*)"\]/)[1];
                                    a = a.replace(/\\/g, ""), "0" !== i ? n(a) : (l = a, o(l, s))
                                }, "text"))
                            }
                        })
                    }
                } else {
                    var c = this.getString("linkdialog");
                    n({
                        title: "插入链接",
                        content: c,
                        closeText: "取消",
                        doneText: "插入",
                        doneFn: function() {
                            o(e("#editorLinkText").val())
                        },
                        show: function() {
                            setTimeout(function() {
                                e("#editorLinkText").focus()
                            }, 100), e("#editorLinkText").keydown(function(t) {
                                13 === t.which && (t.preventDefault(), o(e(this).val()))
                            })
                        },
                        hidden: function() {
                            e(".wmd-input").focus()
                        }
                    })
                }
                return !0
            }
            t.startTag = t.startTag.replace(/!?\[/, ""), t.endTag = "", this.addLinkDef(t, null)
        }, y.doAutoindent = function(e, t) {
            var n = this,
                i = !1;
            e.before = e.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n"), e.before = e.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n"), e.before = e.before.replace(/(\n|^)[ \t]+\n$/, "\n\n"), e.selection || /^[ \t]*(?:\n|$)/.test(e.after) || (e.after = e.after.replace(/^[^\n]*/, function(t) {
                return e.selection = t, ""
            }), i = !0), /(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(e.before) && n.doList && n.doList(e), /(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(e.before) && n.doBlockquote && n.doBlockquote(e), /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && n.doCode && n.doCode(e), i && (e.after = e.selection + e.after, e.selection = "")
        }, y.doBlockquote = function(e, t) {
            e.selection = e.selection.replace(/^(\n*)([^\r]+?)(\n*)$/, function(t, n, i, a) {
                return e.before += n, e.after = a + e.after, i
            }), e.before = e.before.replace(/(>[ \t]*)$/, function(t, n) {
                return e.selection = n + e.selection, ""
            }), e.selection = e.selection.replace(/^(\s|>)+$/, ""), e.selection = e.selection || this.getString("quoteexample");
            var n, i = "",
                a = "";
            if (e.before) {
                for (var r = e.before.replace(/\n$/, "").split("\n"), o = !1, s = 0; s < r.length; s++) {
                    var l = !1;
                    n = r[s], o = o && n.length > 0, /^>/.test(n) ? (l = !0, !o && n.length > 1 && (o = !0)) : l = /^[ \t]*$/.test(n) ? !0 : o, l ? i += n + "\n" : (a += i + n, i = "\n")
                }
                /(^|\n)>/.test(i) || (a += i, i = "")
            }
            e.startTag = i, e.before = a, e.after && (e.after = e.after.replace(/^\n?/, "\n")), e.after = e.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/, function(t) {
                return e.endTag = t, ""
            });
            var c = function(t) {
                var n = t ? "> " : "";
                e.startTag && (e.startTag = e.startTag.replace(/\n((>|\s)*)\n$/, function(e, t) {
                    return "\n" + t.replace(/^[ ]{0,3}>?[ \t]*$/gm, n) + "\n"
                })), e.endTag && (e.endTag = e.endTag.replace(/^\n((>|\s)*)\n/, function(e, t) {
                    return "\n" + t.replace(/^[ ]{0,3}>?[ \t]*$/gm, n) + "\n"
                }))
            };
            /^(?![ ]{0,3}>)/m.test(e.selection) ? (this.wrap(e, b.lineLength - 2), e.selection = e.selection.replace(/^/gm, "> "), c(!0), e.skipLines()) : (e.selection = e.selection.replace(/^[ ]{0,3}> ?/gm, ""), this.unwrap(e), c(!1), !/^(\n|^)[ ]{0,3}>/.test(e.selection) && e.startTag && (e.startTag = e.startTag.replace(/\n{0,2}$/, "\n\n")), !/(\n|^)[ ]{0,3}>.*$/.test(e.selection) && e.endTag && (e.endTag = e.endTag.replace(/^\n{0,2}/, "\n\n"))), e.selection = this.hooks.postBlockquoteCreation(e.selection), /\n/.test(e.selection) || (e.selection = e.selection.replace(/^(> *)/, function(t, n) {
                return e.startTag += n, ""
            }))
        }, y.doCode = function(e, t) {
            var n = /\S[ ]*$/.test(e.before),
                i = /^[ ]*\S/.test(e.after);
            if (!i && !n || /\n/.test(e.selection)) {
                e.before = e.before.replace(/[ ]{4}$/, function(t) {
                    return e.selection = t + e.selection, ""
                });
                var a = 1,
                    r = 1;
                /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && (a = 0), /^\n(\t|[ ]{4,})/.test(e.after) && (r = 0), e.skipLines(a, r), e.selection ? /^[ ]{0,3}\S/m.test(e.selection) ? /\n/.test(e.selection) ? e.selection = e.selection.replace(/^/gm, "    ") : e.before += "    " : e.selection = e.selection.replace(/^(?:[ ]{4}|[ ]{0,3}\t)/gm, "") : (e.startTag = "```\n", e.selection = this.getString("codeexample"), e.endTag = "\n```")
            } else e.trimWhitespace(), e.findTags(/`/, /`/), e.startTag || e.endTag ? e.endTag && !e.startTag ? (e.before += e.endTag, e.endTag = "") : e.startTag = e.endTag = "" : (e.startTag = e.endTag = "`", e.selection || (e.selection = this.getString("codeexample")))
        }, y.doList = function(e, t, n) {
            var i = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/,
                a = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/,
                r = "-",
                o = 1,
                s = function() {
                    var e;
                    return n ? (e = " " + o + ". ", o++) : e = " " + r + " ", e
                },
                l = function(e) {
                    return void 0 === n && (n = /^\s*\d/.test(e)), e = e.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm, function(e) {
                        return s()
                    })
                };
            if (e.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null), !e.before || /\n$/.test(e.before) || /^\n/.test(e.startTag) || (e.before += e.startTag, e.startTag = ""), e.startTag) {
                var c = /\d+[.]/.test(e.startTag);
                if (e.startTag = "", e.selection = e.selection.replace(/\n[ ]{4}/g, "\n"), this.unwrap(e), e.skipLines(), c && (e.after = e.after.replace(a, l)), n == c) return
            }
            var u = 1;
            e.before = e.before.replace(i, function(e) {
                return /^\s*([*+-])/.test(e) && (r = g.$1), u = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, l(e)
            }), e.selection || (e.selection = this.getString("litem"));
            var d = s(),
                p = 1;
            e.after = e.after.replace(a, function(e) {
                return p = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, l(e)
            }), e.trimWhitespace(!0), e.skipLines(u, p, !0), e.startTag = d;
            var f = d.replace(/./g, " ");
            this.wrap(e, b.lineLength - f.length), e.selection = e.selection.replace(/\n/g, "\n" + f)
        }, y.doHeading = function(e, t) {
            if (e.selection = e.selection.replace(/\s+/g, " "), e.selection = e.selection.replace(/(^\s+|\s+$)/g, ""), !e.selection) return e.startTag = "## ", e.selection = this.getString("headingexample"), void(e.endTag = " ##");
            var n = 0;
            e.findTags(/#+[ ]*/, /[ ]*#+/), /#+/.test(e.startTag) && (n = g.lastMatch.length), e.startTag = e.endTag = "", e.findTags(null, /\s?(-+|=+)/), /=+/.test(e.endTag) && (n = 1), /-+/.test(e.endTag) && (n = 2), e.startTag = e.endTag = "", e.skipLines(1, 1);
            var i = 0 == n ? 2 : n - 1;
            if (i > 0) {
                var a = i >= 2 ? "-" : "=",
                    r = e.selection.length;
                for (r > b.lineLength && (r = b.lineLength), e.endTag = "\n"; r--;) e.endTag += a
            }
        }, y.doHorizontalRule = function(e, t) {
            e.startTag = "----------\n", e.selection = "", e.skipLines(2, 1, !0)
        }, t
    }), define("tabIndent", [], function() {
        "use strict";
        var e = {
            version: "0.1.8",
            config: {
                tab: "	"
            },
            events: {
                keydown: function(t) {
                    var n = e.config.tab,
                        i = n.length;
                    if (9 === t.keyCode) {
                        t.preventDefault();
                        var a = this.selectionStart,
                            r = this.selectionEnd;
                        if (t.shiftKey === !1)
                            if (e.isMultiLine(this)) {
                                for (var o = e.findStartIndices(this), s = o.length, l = void 0, c = void 0, u = 0; s--;) {
                                    var d = o[s];
                                    o[s + 1] && a != o[s + 1] && (d = o[s + 1]), d >= a && o[s] < r && (this.value = this.value.slice(0, o[s]) + n + this.value.slice(o[s]), l = o[s], c || (c = o[s + 1] ? o[s + 1] - 1 : "end"), u++)
                                }
                                this.selectionStart = l, this.selectionEnd = "end" !== c ? c + i * u : this.value.length
                            } else this.value = this.value.slice(0, a) + n + this.value.slice(a), this.selectionStart = a + i, this.selectionEnd = r + i;
                        else if (e.isMultiLine(this)) {
                            for (var o = e.findStartIndices(this), s = o.length, l = void 0, c = void 0, u = 0; s--;) {
                                var d = o[s];
                                o[s + 1] && a != o[s + 1] && (d = o[s + 1]), d >= a && o[s] < r && (this.value.substr(o[s], i) == n && (this.value = this.value.slice(0, o[s]) + this.value.slice(o[s] + i), u++), l = o[s], c || (c = o[s + 1] ? o[s + 1] - 1 : "end"))
                            }
                            this.selectionStart = l, this.selectionEnd = "end" !== c ? c - u * i : this.value.length
                        } else this.value.substr(a - i, i) == n ? (this.value = this.value.substr(0, a - i) + this.value.substr(a), this.selectionStart = a - i, this.selectionEnd = r - i) : "\n" == this.value.substr(a - 1, 1) && this.value.substr(a, i) == n && (this.value = this.value.substring(0, a) + this.value.substr(a + i), this.selectionStart = a, this.selectionEnd = r - i)
                    } else if (27 === t.keyCode) e.events.disable(t);
                    else if (13 === t.keyCode && t.shiftKey === !1) {
                        for (var p = e, f = this.selectionStart, o = p.findStartIndices(this), h = o.length, g = 0, m = 0, b = new RegExp("^" + n.replace("	", "\\t").replace(/ /g, "\\s") + "+", "g"), v = "", w = null, y = 0; h > y; y++) {
                            if (o[y + 1] && f >= o[y] && f < o[y + 1]) {
                                g = o[y], m = o[y + 1] - 1;
                                break
                            }
                            g = o[h - 1], m = this.value.length
                        }
                        if (v = this.value.slice(g, m), w = v.match(b), null !== w) {
                            t.preventDefault();
                            var _ = w[0],
                                k = _.length,
                                x = f - g;
                            k > x && (k = x, _ = _.slice(0, x)), this.value = this.value.slice(0, f) + "\n" + _ + this.value.slice(f), this.selectionStart = f + k + 1, this.selectionEnd = this.selectionStart
                        }
                    }
                },
                disable: function(t) {
                    e.remove(t.target)
                },
                focus: function() {
                    var t = e,
                        n = this,
                        i = setTimeout(function() {
                            var e = (n.getAttribute("class") || "").split(" "),
                                i = e.indexOf("tabIndent");
                            n.addEventListener("keydown", t.events.keydown), n.style.backgroundPosition = "top right", n.style.backgroundRepeat = "no-repeat", -1 !== i && e.splice(i, 1), e.push("tabIndent-rendered"), n.setAttribute("class", e.join(" ")), n.removeEventListener("focus", t.events.keydown)
                        }, 500);
                    n.addEventListener("blur", function a() {
                        clearTimeout(i), n.removeEventListener("blur", a)
                    })
                }
            },
            render: function(e) {
                var t = this;
                "TEXTAREA" === e.nodeName && (e.addEventListener("focus", t.events.focus), e.addEventListener("blur", function(e) {
                    t.events.disable(e)
                }))
            },
            renderAll: function() {
                for (var e = document.getElementsByTagName("textarea"), t = e.length, n = -1, i = [], a = void 0; t--;) i = (e[t].getAttribute("class") || "").split(" "), n = i.indexOf("tabIndent"), -1 !== n && (a = e[t], this.render(a)), n = -1, i = [], a = void 0
            },
            remove: function(e) {
                if ("TEXTAREA" === e.nodeName) {
                    var t = (e.getAttribute("class") || "").split(" "),
                        n = t.indexOf("tabIndent-rendered"); - 1 !== n && (e.removeEventListener("keydown", this.events.keydown), e.style.backgroundImage = "", t.splice(n, 1), t.push("tabIndent"), e.setAttribute("class", t.length > 1 ? t.join(" ") : t[0]))
                }
            },
            removeAll: function() {
                for (var e = document.getElementsByTagName("textarea"), t = e.length, n = -1, i = [], a = void 0; t--;) i = (e[t].getAttribute("class") || "").split(" "), n = i.indexOf("tabIndent-rendered"), -1 !== n && (a = e[t], this.remove(a)), n = -1, i = [], a = void 0
            },
            isMultiLine: function(e) {
                var t = e.value.slice(e.selectionStart, e.selectionEnd),
                    n = new RegExp(/\n/);
                return n.test(t) ? !0 : !1
            },
            findStartIndices: function(e) {
                for (var t = e.value, n = [], i = 0; t.match(/\n/) && t.match(/\n/).length > 0;) {
                    i = n.length > 0 ? n[n.length - 1] : 0;
                    var a = t.search("\n");
                    n.push(a + i + 1), t = t.substring(a + 1)
                }
                return n.unshift(0), n
            }
        };
        return e
    }), define("diff_match_patch", [], function() {
        function e() {
            this.Diff_Timeout = 1, this.Diff_EditCost = 4, this.Match_Threshold = .5, this.Match_Distance = 1e3, this.Patch_DeleteThreshold = .5, this.Patch_Margin = 4, this.Match_MaxBits = 32
        }
        var t = -1,
            n = 1,
            i = 0;
        return e.Diff, e.prototype.diff_main = function(e, t, n, a) {
            "undefined" == typeof a && (a = this.Diff_Timeout <= 0 ? Number.MAX_VALUE : (new Date).getTime() + 1e3 * this.Diff_Timeout);
            var r = a;
            if (null == e || null == t) throw new Error("Null input. (diff_main)");
            if (e == t) return e ? [
                [i, e]
            ] : [];
            "undefined" == typeof n && (n = !0);
            var o = n,
                s = this.diff_commonPrefix(e, t),
                l = e.substring(0, s);
            e = e.substring(s), t = t.substring(s), s = this.diff_commonSuffix(e, t);
            var c = e.substring(e.length - s);
            e = e.substring(0, e.length - s), t = t.substring(0, t.length - s);
            var u = this.diff_compute_(e, t, o, r);
            return l && u.unshift([i, l]), c && u.push([i, c]), this.diff_cleanupMerge(u), u
        }, e.prototype.diff_compute_ = function(e, a, r, o) {
            var s;
            if (!e) return [
                [n, a]
            ];
            if (!a) return [
                [t, e]
            ];
            var l = e.length > a.length ? e : a,
                c = e.length > a.length ? a : e,
                u = l.indexOf(c);
            if (-1 != u) return s = [
                [n, l.substring(0, u)],
                [i, c],
                [n, l.substring(u + c.length)]
            ], e.length > a.length && (s[0][0] = s[2][0] = t), s;
            if (1 == c.length) return [
                [t, e],
                [n, a]
            ];
            var d = this.diff_halfMatch_(e, a);
            if (d) {
                var p = d[0],
                    f = d[1],
                    h = d[2],
                    g = d[3],
                    m = d[4],
                    b = this.diff_main(p, h, r, o),
                    v = this.diff_main(f, g, r, o);
                return b.concat([
                    [i, m]
                ], v)
            }
            return r && e.length > 100 && a.length > 100 ? this.diff_lineMode_(e, a, o) : this.diff_bisect_(e, a, o)
        }, e.prototype.diff_lineMode_ = function(e, a, r) {
            var o = this.diff_linesToChars_(e, a);
            e = o.chars1, a = o.chars2;
            var s = o.lineArray,
                l = this.diff_main(e, a, !1, r);
            this.diff_charsToLines_(l, s), this.diff_cleanupSemantic(l), l.push([i, ""]);
            for (var c = 0, u = 0, d = 0, p = "", f = ""; c < l.length;) {
                switch (l[c][0]) {
                    case n:
                        d++, f += l[c][1];
                        break;
                    case t:
                        u++, p += l[c][1];
                        break;
                    case i:
                        if (u >= 1 && d >= 1) {
                            l.splice(c - u - d, u + d), c = c - u - d;
                            for (var o = this.diff_main(p, f, !1, r), h = o.length - 1; h >= 0; h--) l.splice(c, 0, o[h]);
                            c += o.length
                        }
                        d = 0, u = 0, p = "", f = ""
                }
                c++
            }
            return l.pop(), l
        }, e.prototype.diff_bisect_ = function(e, i, a) {
            for (var r = e.length, o = i.length, s = Math.ceil((r + o) / 2), l = s, c = 2 * s, u = new Array(c), d = new Array(c), p = 0; c > p; p++) u[p] = -1, d[p] = -1;
            u[l + 1] = 0, d[l + 1] = 0;
            for (var f = r - o, h = f % 2 != 0, g = 0, m = 0, b = 0, v = 0, w = 0; s > w && !((new Date).getTime() > a); w++) {
                for (var y = -w + g; w - m >= y; y += 2) {
                    var _, k = l + y;
                    _ = y == -w || y != w && u[k - 1] < u[k + 1] ? u[k + 1] : u[k - 1] + 1;
                    for (var x = _ - y; r > _ && o > x && e.charAt(_) == i.charAt(x);) _++, x++;
                    if (u[k] = _, _ > r) m += 2;
                    else if (x > o) g += 2;
                    else if (h) {
                        var C = l + f - y;
                        if (C >= 0 && c > C && -1 != d[C]) {
                            var $ = r - d[C];
                            if (_ >= $) return this.diff_bisectSplit_(e, i, _, x, a)
                        }
                    }
                }
                for (var T = -w + b; w - v >= T; T += 2) {
                    var $, C = l + T;
                    $ = T == -w || T != w && d[C - 1] < d[C + 1] ? d[C + 1] : d[C - 1] + 1;
                    for (var E = $ - T; r > $ && o > E && e.charAt(r - $ - 1) == i.charAt(o - E - 1);) $++, E++;
                    if (d[C] = $, $ > r) v += 2;
                    else if (E > o) b += 2;
                    else if (!h) {
                        var k = l + f - T;
                        if (k >= 0 && c > k && -1 != u[k]) {
                            var _ = u[k],
                                x = l + _ - k;
                            if ($ = r - $, _ >= $) return this.diff_bisectSplit_(e, i, _, x, a)
                        }
                    }
                }
            }
            return [
                [t, e],
                [n, i]
            ]
        }, e.prototype.diff_bisectSplit_ = function(e, t, n, i, a) {
            var r = e.substring(0, n),
                o = t.substring(0, i),
                s = e.substring(n),
                l = t.substring(i),
                c = this.diff_main(r, o, !1, a),
                u = this.diff_main(s, l, !1, a);
            return c.concat(u)
        }, e.prototype.diff_linesToChars_ = function(e, t) {
            function n(e) {
                for (var t = "", n = 0, r = -1, o = i.length; r < e.length - 1;) {
                    r = e.indexOf("\n", n), -1 == r && (r = e.length - 1);
                    var s = e.substring(n, r + 1);
                    n = r + 1, (a.hasOwnProperty ? a.hasOwnProperty(s) : void 0 !== a[s]) ? t += String.fromCharCode(a[s]) : (t += String.fromCharCode(o), a[s] = o, i[o++] = s)
                }
                return t
            }
            var i = [],
                a = {};
            i[0] = "";
            var r = n(e),
                o = n(t);
            return {
                chars1: r,
                chars2: o,
                lineArray: i
            }
        }, e.prototype.diff_charsToLines_ = function(e, t) {
            for (var n = 0; n < e.length; n++) {
                for (var i = e[n][1], a = [], r = 0; r < i.length; r++) a[r] = t[i.charCodeAt(r)];
                e[n][1] = a.join("")
            }
        }, e.prototype.diff_commonPrefix = function(e, t) {
            if (!e || !t || e.charAt(0) != t.charAt(0)) return 0;
            for (var n = 0, i = Math.min(e.length, t.length), a = i, r = 0; a > n;) e.substring(r, a) == t.substring(r, a) ? (n = a, r = n) : i = a, a = Math.floor((i - n) / 2 + n);
            return a
        }, e.prototype.diff_commonSuffix = function(e, t) {
            if (!e || !t || e.charAt(e.length - 1) != t.charAt(t.length - 1)) return 0;
            for (var n = 0, i = Math.min(e.length, t.length), a = i, r = 0; a > n;) e.substring(e.length - a, e.length - r) == t.substring(t.length - a, t.length - r) ? (n = a, r = n) : i = a, a = Math.floor((i - n) / 2 + n);
            return a
        }, e.prototype.diff_commonOverlap_ = function(e, t) {
            var n = e.length,
                i = t.length;
            if (0 == n || 0 == i) return 0;
            n > i ? e = e.substring(n - i) : i > n && (t = t.substring(0, n));
            var a = Math.min(n, i);
            if (e == t) return a;
            for (var r = 0, o = 1;;) {
                var s = e.substring(a - o),
                    l = t.indexOf(s);
                if (-1 == l) return r;
                o += l, (0 == l || e.substring(a - o) == t.substring(0, o)) && (r = o, o++)
            }
        }, e.prototype.diff_halfMatch_ = function(e, t) {
            function n(e, t, n) {
                for (var i, a, r, s, l = e.substring(n, n + Math.floor(e.length / 4)), c = -1, u = ""; - 1 != (c = t.indexOf(l, c + 1));) {
                    var d = o.diff_commonPrefix(e.substring(n), t.substring(c)),
                        p = o.diff_commonSuffix(e.substring(0, n), t.substring(0, c));
                    u.length < p + d && (u = t.substring(c - p, c) + t.substring(c, c + d), i = e.substring(0, n - p), a = e.substring(n + d), r = t.substring(0, c - p), s = t.substring(c + d))
                }
                return 2 * u.length >= e.length ? [i, a, r, s, u] : null
            }
            if (this.Diff_Timeout <= 0) return null;
            var i = e.length > t.length ? e : t,
                a = e.length > t.length ? t : e;
            if (i.length < 4 || 2 * a.length < i.length) return null;
            var r, o = this,
                s = n(i, a, Math.ceil(i.length / 4)),
                l = n(i, a, Math.ceil(i.length / 2));
            if (!s && !l) return null;
            r = l ? s && s[4].length > l[4].length ? s : l : s;
            var c, u, d, p;
            e.length > t.length ? (c = r[0], u = r[1], d = r[2], p = r[3]) : (d = r[0], p = r[1], c = r[2], u = r[3]);
            var f = r[4];
            return [c, u, d, p, f]
        }, e.prototype.diff_cleanupSemantic = function(e) {
            for (var a = !1, r = [], o = 0, s = null, l = 0, c = 0, u = 0, d = 0, p = 0; l < e.length;) e[l][0] == i ? (r[o++] = l, c = d, u = p, d = 0, p = 0, s = e[l][1]) : (e[l][0] == n ? d += e[l][1].length : p += e[l][1].length, s && s.length <= Math.max(c, u) && s.length <= Math.max(d, p) && (e.splice(r[o - 1], 0, [t, s]), e[r[o - 1] + 1][0] = n, o--, o--, l = o > 0 ? r[o - 1] : -1, c = 0, u = 0, d = 0, p = 0, s = null, a = !0)), l++;
            for (a && this.diff_cleanupMerge(e), this.diff_cleanupSemanticLossless(e), l = 1; l < e.length;) {
                if (e[l - 1][0] == t && e[l][0] == n) {
                    var f = e[l - 1][1],
                        h = e[l][1],
                        g = this.diff_commonOverlap_(f, h),
                        m = this.diff_commonOverlap_(h, f);
                    g >= m ? (g >= f.length / 2 || g >= h.length / 2) && (e.splice(l, 0, [i, h.substring(0, g)]), e[l - 1][1] = f.substring(0, f.length - g), e[l + 1][1] = h.substring(g), l++) : (m >= f.length / 2 || m >= h.length / 2) && (e.splice(l, 0, [i, f.substring(0, m)]), e[l - 1][0] = n, e[l - 1][1] = h.substring(0, h.length - m), e[l + 1][0] = t, e[l + 1][1] = f.substring(m), l++), l++
                }
                l++
            }
        }, e.prototype.diff_cleanupSemanticLossless = function(t) {
            function n(t, n) {
                if (!t || !n) return 6;
                var i = t.charAt(t.length - 1),
                    a = n.charAt(0),
                    r = i.match(e.nonAlphaNumericRegex_),
                    o = a.match(e.nonAlphaNumericRegex_),
                    s = r && i.match(e.whitespaceRegex_),
                    l = o && a.match(e.whitespaceRegex_),
                    c = s && i.match(e.linebreakRegex_),
                    u = l && a.match(e.linebreakRegex_),
                    d = c && t.match(e.blanklineEndRegex_),
                    p = u && n.match(e.blanklineStartRegex_);
                return d || p ? 5 : c || u ? 4 : r && !s && l ? 3 : s || l ? 2 : r || o ? 1 : 0
            }
            for (var a = 1; a < t.length - 1;) {
                if (t[a - 1][0] == i && t[a + 1][0] == i) {
                    var r = t[a - 1][1],
                        o = t[a][1],
                        s = t[a + 1][1],
                        l = this.diff_commonSuffix(r, o);
                    if (l) {
                        var c = o.substring(o.length - l);
                        r = r.substring(0, r.length - l), o = c + o.substring(0, o.length - l), s = c + s
                    }
                    for (var u = r, d = o, p = s, f = n(r, o) + n(o, s); o.charAt(0) === s.charAt(0);) {
                        r += o.charAt(0), o = o.substring(1) + s.charAt(0), s = s.substring(1);
                        var h = n(r, o) + n(o, s);
                        h >= f && (f = h, u = r, d = o, p = s)
                    }
                    t[a - 1][1] != u && (u ? t[a - 1][1] = u : (t.splice(a - 1, 1), a--), t[a][1] = d, p ? t[a + 1][1] = p : (t.splice(a + 1, 1), a--))
                }
                a++
            }
        }, e.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, e.whitespaceRegex_ = /\s/, e.linebreakRegex_ = /[\r\n]/, e.blanklineEndRegex_ = /\n\r?\n$/, e.blanklineStartRegex_ = /^\r?\n\r?\n/, e.prototype.diff_cleanupEfficiency = function(e) {
            for (var a = !1, r = [], o = 0, s = null, l = 0, c = !1, u = !1, d = !1, p = !1; l < e.length;) e[l][0] == i ? (e[l][1].length < this.Diff_EditCost && (d || p) ? (r[o++] = l, c = d, u = p, s = e[l][1]) : (o = 0, s = null), d = p = !1) : (e[l][0] == t ? p = !0 : d = !0, s && (c && u && d && p || s.length < this.Diff_EditCost / 2 && c + u + d + p == 3) && (e.splice(r[o - 1], 0, [t, s]), e[r[o - 1] + 1][0] = n, o--, s = null, c && u ? (d = p = !0, o = 0) : (o--, l = o > 0 ? r[o - 1] : -1, d = p = !1), a = !0)), l++;
            a && this.diff_cleanupMerge(e)
        }, e.prototype.diff_cleanupMerge = function(e) {
            e.push([i, ""]);
            for (var a, r = 0, o = 0, s = 0, l = "", c = ""; r < e.length;) switch (e[r][0]) {
                case n:
                    s++, c += e[r][1], r++;
                    break;
                case t:
                    o++, l += e[r][1], r++;
                    break;
                case i:
                    o + s > 1 ? (0 !== o && 0 !== s && (a = this.diff_commonPrefix(c, l), 0 !== a && (r - o - s > 0 && e[r - o - s - 1][0] == i ? e[r - o - s - 1][1] += c.substring(0, a) : (e.splice(0, 0, [i, c.substring(0, a)]), r++), c = c.substring(a), l = l.substring(a)), a = this.diff_commonSuffix(c, l), 0 !== a && (e[r][1] = c.substring(c.length - a) + e[r][1], c = c.substring(0, c.length - a), l = l.substring(0, l.length - a))), 0 === o ? e.splice(r - s, o + s, [n, c]) : 0 === s ? e.splice(r - o, o + s, [t, l]) : e.splice(r - o - s, o + s, [t, l], [n, c]), r = r - o - s + (o ? 1 : 0) + (s ? 1 : 0) + 1) : 0 !== r && e[r - 1][0] == i ? (e[r - 1][1] += e[r][1], e.splice(r, 1)) : r++, s = 0, o = 0, l = "", c = ""
            }
            "" === e[e.length - 1][1] && e.pop();
            var u = !1;
            for (r = 1; r < e.length - 1;) e[r - 1][0] == i && e[r + 1][0] == i && (e[r][1].substring(e[r][1].length - e[r - 1][1].length) == e[r - 1][1] ? (e[r][1] = e[r - 1][1] + e[r][1].substring(0, e[r][1].length - e[r - 1][1].length), e[r + 1][1] = e[r - 1][1] + e[r + 1][1], e.splice(r - 1, 1), u = !0) : e[r][1].substring(0, e[r + 1][1].length) == e[r + 1][1] && (e[r - 1][1] += e[r + 1][1], e[r][1] = e[r][1].substring(e[r + 1][1].length) + e[r + 1][1], e.splice(r + 1, 1), u = !0)), r++;
            u && this.diff_cleanupMerge(e)
        }, e.prototype.diff_xIndex = function(e, i) {
            var a, r = 0,
                o = 0,
                s = 0,
                l = 0;
            for (a = 0; a < e.length && (e[a][0] !== n && (r += e[a][1].length), e[a][0] !== t && (o += e[a][1].length), !(r > i)); a++) s = r, l = o;
            return e.length != a && e[a][0] === t ? l : l + (i - s)
        }, e.prototype.diff_prettyHtml = function(e) {
            for (var a = [], r = /&/g, o = /</g, s = />/g, l = /\n/g, c = 0; c < e.length; c++) {
                var u = e[c][0],
                    d = e[c][1],
                    p = d.replace(r, "&amp;").replace(o, "&lt;").replace(s, "&gt;").replace(l, "&para;<br>");
                switch (u) {
                    case n:
                        a[c] = '<ins style="background:#e6ffe6;">' + p + "</ins>";
                        break;
                    case t:
                        a[c] = '<del style="background:#ffe6e6;">' + p + "</del>";
                        break;
                    case i:
                        a[c] = "<span>" + p + "</span>"
                }
            }
            return a.join("")
        }, e.prototype.diff_text1 = function(e) {
            for (var t = [], i = 0; i < e.length; i++) e[i][0] !== n && (t[i] = e[i][1]);
            return t.join("")
        }, e.prototype.diff_text2 = function(e) {
            for (var n = [], i = 0; i < e.length; i++) e[i][0] !== t && (n[i] = e[i][1]);
            return n.join("")
        }, e.prototype.diff_levenshtein = function(e) {
            for (var a = 0, r = 0, o = 0, s = 0; s < e.length; s++) {
                var l = e[s][0],
                    c = e[s][1];
                switch (l) {
                    case n:
                        r += c.length;
                        break;
                    case t:
                        o += c.length;
                        break;
                    case i:
                        a += Math.max(r, o), r = 0, o = 0
                }
            }
            return a += Math.max(r, o)
        }, e.prototype.diff_toDelta = function(e) {
            for (var a = [], r = 0; r < e.length; r++) switch (e[r][0]) {
                case n:
                    a[r] = "+" + encodeURI(e[r][1]);
                    break;
                case t:
                    a[r] = "-" + e[r][1].length;
                    break;
                case i:
                    a[r] = "=" + e[r][1].length
            }
            return a.join("	").replace(/%20/g, " ")
        }, e.prototype.diff_fromDelta = function(e, a) {
            for (var r = [], o = 0, s = 0, l = a.split(/\t/g), c = 0; c < l.length; c++) {
                var u = l[c].substring(1);
                switch (l[c].charAt(0)) {
                    case "+":
                        try {
                            r[o++] = [n, decodeURI(u)]
                        } catch (d) {
                            throw new Error("Illegal escape in diff_fromDelta: " + u)
                        }
                        break;
                    case "-":
                    case "=":
                        var p = parseInt(u, 10);
                        if (isNaN(p) || 0 > p) throw new Error("Invalid number in diff_fromDelta: " + u);
                        var f = e.substring(s, s += p);
                        "=" == l[c].charAt(0) ? r[o++] = [i, f] : r[o++] = [t, f];
                        break;
                    default:
                        if (l[c]) throw new Error("Invalid diff operation in diff_fromDelta: " + l[c])
                }
            }
            if (s != e.length) throw new Error("Delta length (" + s + ") does not equal source text length (" + e.length + ").");
            return r
        }, e.prototype.match_main = function(e, t, n) {
            if (null == e || null == t || null == n) throw new Error("Null input. (match_main)");
            return n = Math.max(0, Math.min(n, e.length)), e == t ? 0 : e.length ? e.substring(n, n + t.length) == t ? n : this.match_bitap_(e, t, n) : -1
        }, e.prototype.match_bitap_ = function(e, t, n) {
            function i(e, i) {
                var a = e / t.length,
                    o = Math.abs(n - i);
                return r.Match_Distance ? a + o / r.Match_Distance : o ? 1 : a
            }
            if (t.length > this.Match_MaxBits) throw new Error("Pattern too long for this browser.");
            var a = this.match_alphabet_(t),
                r = this,
                o = this.Match_Threshold,
                s = e.indexOf(t, n); - 1 != s && (o = Math.min(i(0, s), o), s = e.lastIndexOf(t, n + t.length), -1 != s && (o = Math.min(i(0, s), o)));
            var l = 1 << t.length - 1;
            s = -1;
            for (var c, u, d, p = t.length + e.length, f = 0; f < t.length; f++) {
                for (c = 0, u = p; u > c;) i(f, n + u) <= o ? c = u : p = u, u = Math.floor((p - c) / 2 + c);
                p = u;
                var h = Math.max(1, n - u + 1),
                    g = Math.min(n + u, e.length) + t.length,
                    m = Array(g + 2);
                m[g + 1] = (1 << f) - 1;
                for (var b = g; b >= h; b--) {
                    var v = a[e.charAt(b - 1)];
                    if (0 === f ? m[b] = (m[b + 1] << 1 | 1) & v : m[b] = (m[b + 1] << 1 | 1) & v | ((d[b + 1] | d[b]) << 1 | 1) | d[b + 1], m[b] & l) {
                        var w = i(f, b - 1);
                        if (o >= w) {
                            if (o = w, s = b - 1, !(s > n)) break;
                            h = Math.max(1, 2 * n - s)
                        }
                    }
                }
                if (i(f + 1, n) > o) break;
                d = m
            }
            return s
        }, e.prototype.match_alphabet_ = function(e) {
            for (var t = {}, n = 0; n < e.length; n++) t[e.charAt(n)] = 0;
            for (var n = 0; n < e.length; n++) t[e.charAt(n)] |= 1 << e.length - n - 1;
            return t
        }, e.prototype.patch_addContext_ = function(e, t) {
            if (0 != t.length) {
                for (var n = t.substring(e.start2, e.start2 + e.length1), a = 0; t.indexOf(n) != t.lastIndexOf(n) && n.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin;) a += this.Patch_Margin, n = t.substring(e.start2 - a, e.start2 + e.length1 + a);
                a += this.Patch_Margin;
                var r = t.substring(e.start2 - a, e.start2);
                r && e.diffs.unshift([i, r]);
                var o = t.substring(e.start2 + e.length1, e.start2 + e.length1 + a);
                o && e.diffs.push([i, o]), e.start1 -= r.length, e.start2 -= r.length, e.length1 += r.length + o.length, e.length2 += r.length + o.length
            }
        }, e.prototype.patch_make = function(a, r, o) {
            var s, l;
            if ("string" == typeof a && "string" == typeof r && "undefined" == typeof o) s = a, l = this.diff_main(s, r, !0), l.length > 2 && (this.diff_cleanupSemantic(l), this.diff_cleanupEfficiency(l));
            else if (a && "object" == typeof a && "undefined" == typeof r && "undefined" == typeof o) l = a, s = this.diff_text1(l);
            else if ("string" == typeof a && r && "object" == typeof r && "undefined" == typeof o) s = a, l = r;
            else {
                if ("string" != typeof a || "string" != typeof r || !o || "object" != typeof o) throw new Error("Unknown call format to patch_make.");
                s = a, l = o
            }
            if (0 === l.length) return [];
            for (var c = [], u = new e.patch_obj, d = 0, p = 0, f = 0, h = s, g = s, m = 0; m < l.length; m++) {
                var b = l[m][0],
                    v = l[m][1];
                switch (d || b === i || (u.start1 = p, u.start2 = f), b) {
                    case n:
                        u.diffs[d++] = l[m], u.length2 += v.length, g = g.substring(0, f) + v + g.substring(f);
                        break;
                    case t:
                        u.length1 += v.length, u.diffs[d++] = l[m], g = g.substring(0, f) + g.substring(f + v.length);
                        break;
                    case i:
                        v.length <= 2 * this.Patch_Margin && d && l.length != m + 1 ? (u.diffs[d++] = l[m], u.length1 += v.length, u.length2 += v.length) : v.length >= 2 * this.Patch_Margin && d && (this.patch_addContext_(u, h), c.push(u), u = new e.patch_obj, d = 0, h = g, p = f)
                }
                b !== n && (p += v.length), b !== t && (f += v.length)
            }
            return d && (this.patch_addContext_(u, h), c.push(u)), c
        }, e.prototype.patch_deepCopy = function(t) {
            for (var n = [], i = 0; i < t.length; i++) {
                var a = t[i],
                    r = new e.patch_obj;
                r.diffs = [];
                for (var o = 0; o < a.diffs.length; o++) r.diffs[o] = a.diffs[o].slice();
                r.start1 = a.start1, r.start2 = a.start2, r.length1 = a.length1, r.length2 = a.length2, n[i] = r
            }
            return n
        }, e.prototype.patch_apply = function(e, a) {
            if (0 == e.length) return [a, []];
            e = this.patch_deepCopy(e);
            var r = this.patch_addPadding(e);
            a = r + a + r, this.patch_splitMax(e);
            for (var o = 0, s = [], l = 0; l < e.length; l++) {
                var c, u = e[l].start2 + o,
                    d = this.diff_text1(e[l].diffs),
                    p = -1;
                if (d.length > this.Match_MaxBits ? (c = this.match_main(a, d.substring(0, this.Match_MaxBits), u), -1 != c && (p = this.match_main(a, d.substring(d.length - this.Match_MaxBits), u + d.length - this.Match_MaxBits), (-1 == p || c >= p) && (c = -1))) : c = this.match_main(a, d, u), -1 == c) s[l] = !1, o -= e[l].length2 - e[l].length1;
                else {
                    s[l] = !0, o = c - u;
                    var f;
                    if (f = -1 == p ? a.substring(c, c + d.length) : a.substring(c, p + this.Match_MaxBits), d == f) a = a.substring(0, c) + this.diff_text2(e[l].diffs) + a.substring(c + d.length);
                    else {
                        var h = this.diff_main(d, f, !1);
                        if (d.length > this.Match_MaxBits && this.diff_levenshtein(h) / d.length > this.Patch_DeleteThreshold) s[l] = !1;
                        else {
                            this.diff_cleanupSemanticLossless(h);
                            for (var g, m = 0, b = 0; b < e[l].diffs.length; b++) {
                                var v = e[l].diffs[b];
                                v[0] !== i && (g = this.diff_xIndex(h, m)), v[0] === n ? a = a.substring(0, c + g) + v[1] + a.substring(c + g) : v[0] === t && (a = a.substring(0, c + g) + a.substring(c + this.diff_xIndex(h, m + v[1].length))), v[0] !== t && (m += v[1].length)
                            }
                        }
                    }
                }
            }
            return a = a.substring(r.length, a.length - r.length), [a, s]
        }, e.prototype.patch_addPadding = function(e) {
            for (var t = this.Patch_Margin, n = "", a = 1; t >= a; a++) n += String.fromCharCode(a);
            for (var a = 0; a < e.length; a++) e[a].start1 += t, e[a].start2 += t;
            var r = e[0],
                o = r.diffs;
            if (0 == o.length || o[0][0] != i) o.unshift([i, n]), r.start1 -= t, r.start2 -= t, r.length1 += t, r.length2 += t;
            else if (t > o[0][1].length) {
                var s = t - o[0][1].length;
                o[0][1] = n.substring(o[0][1].length) + o[0][1], r.start1 -= s, r.start2 -= s, r.length1 += s, r.length2 += s
            }
            if (r = e[e.length - 1], o = r.diffs, 0 == o.length || o[o.length - 1][0] != i) o.push([i, n]), r.length1 += t, r.length2 += t;
            else if (t > o[o.length - 1][1].length) {
                var s = t - o[o.length - 1][1].length;
                o[o.length - 1][1] += n.substring(0, s), r.length1 += s, r.length2 += s
            }
            return n
        }, e.prototype.patch_splitMax = function(a) {
            for (var r = this.Match_MaxBits, o = 0; o < a.length; o++)
                if (!(a[o].length1 <= r)) {
                    var s = a[o];
                    a.splice(o--, 1);
                    for (var l = s.start1, c = s.start2, u = ""; 0 !== s.diffs.length;) {
                        var d = new e.patch_obj,
                            p = !0;
                        for (d.start1 = l - u.length, d.start2 = c - u.length, "" !== u && (d.length1 = d.length2 = u.length, d.diffs.push([i, u])); 0 !== s.diffs.length && d.length1 < r - this.Patch_Margin;) {
                            var f = s.diffs[0][0],
                                h = s.diffs[0][1];
                            f === n ? (d.length2 += h.length, c += h.length, d.diffs.push(s.diffs.shift()), p = !1) : f === t && 1 == d.diffs.length && d.diffs[0][0] == i && h.length > 2 * r ? (d.length1 += h.length, l += h.length, p = !1, d.diffs.push([f, h]), s.diffs.shift()) : (h = h.substring(0, r - d.length1 - this.Patch_Margin), d.length1 += h.length, l += h.length, f === i ? (d.length2 += h.length, c += h.length) : p = !1, d.diffs.push([f, h]), h == s.diffs[0][1] ? s.diffs.shift() : s.diffs[0][1] = s.diffs[0][1].substring(h.length))
                        }
                        u = this.diff_text2(d.diffs), u = u.substring(u.length - this.Patch_Margin);
                        var g = this.diff_text1(s.diffs).substring(0, this.Patch_Margin);
                        "" !== g && (d.length1 += g.length, d.length2 += g.length, 0 !== d.diffs.length && d.diffs[d.diffs.length - 1][0] === i ? d.diffs[d.diffs.length - 1][1] += g : d.diffs.push([i, g])), p || a.splice(++o, 0, d)
                    }
                }
        }, e.prototype.patch_toText = function(e) {
            for (var t = [], n = 0; n < e.length; n++) t[n] = e[n];
            return t.join("")
        }, e.prototype.patch_fromText = function(a) {
            var r = [];
            if (!a) return r;
            for (var o = a.split("\n"), s = 0, l = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; s < o.length;) {
                var c = o[s].match(l);
                if (!c) throw new Error("Invalid patch string: " + o[s]);
                var u = new e.patch_obj;
                for (r.push(u), u.start1 = parseInt(c[1], 10), "" === c[2] ? (u.start1--, u.length1 = 1) : "0" == c[2] ? u.length1 = 0 : (u.start1--, u.length1 = parseInt(c[2], 10)), u.start2 = parseInt(c[3], 10), "" === c[4] ? (u.start2--, u.length2 = 1) : "0" == c[4] ? u.length2 = 0 : (u.start2--, u.length2 = parseInt(c[4], 10)), s++; s < o.length;) {
                    var d = o[s].charAt(0);
                    try {
                        var p = decodeURI(o[s].substring(1))
                    } catch (f) {
                        throw new Error("Illegal escape in patch_fromText: " + p)
                    }
                    if ("-" == d) u.diffs.push([t, p]);
                    else if ("+" == d) u.diffs.push([n, p]);
                    else if (" " == d) u.diffs.push([i, p]);
                    else {
                        if ("@" == d) break;
                        if ("" !== d) throw new Error('Invalid patch mode "' + d + '" in: ' + p)
                    }
                    s++
                }
            }
            return r
        }, e.patch_obj = function() {
            this.diffs = [], this.start1 = null, this.start2 = null, this.length1 = 0, this.length2 = 0
        }, e.patch_obj.prototype.toString = function() {
            var e, a;
            e = 0 === this.length1 ? this.start1 + ",0" : 1 == this.length1 ? this.start1 + 1 : this.start1 + 1 + "," + this.length1, a = 0 === this.length2 ? this.start2 + ",0" : 1 == this.length2 ? this.start2 + 1 : this.start2 + 1 + "," + this.length2;
            for (var r, o = ["@@ -" + e + " +" + a + " @@\n"], s = 0; s < this.diffs.length; s++) {
                switch (this.diffs[s][0]) {
                    case n:
                        r = "+";
                        break;
                    case t:
                        r = "-";
                        break;
                    case i:
                        r = " "
                }
                o[s + 1] = r + encodeURI(this.diffs[s][1]) + "\n"
            }
            return o.join("").replace(/%20/g, " ")
        }, this.diff_match_patch = e, this.DIFF_DELETE = t, this.DIFF_INSERT = n, this.DIFF_EQUAL = i, e
    }),
    function(e) {
        "use strict";
        e("jquery_scrollTo", ["jquery"], function(e) {
            function t(t) {
                return e.isFunction(t) || e.isPlainObject(t) ? t : {
                    top: t,
                    left: t
                }
            }
            var n = e.scrollTo = function(t, n, i) {
                return e(window).scrollTo(t, n, i)
            };
            return n.defaults = {
                axis: "xy",
                duration: 0,
                limit: !0
            }, n.window = function() {
                return e(window)._scrollable()
            }, e.fn._scrollable = function() {
                return this.map(function() {
                    var t = this,
                        n = !t.nodeName || -1 !== e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]);
                    if (!n) return t;
                    var i = (t.contentWindow || t).document || t.ownerDocument || t;
                    return /webkit/i.test(navigator.userAgent) || "BackCompat" === i.compatMode ? i.body : i.documentElement
                })
            }, e.fn.scrollTo = function(i, a, r) {
                return "object" == typeof a && (r = a, a = 0), "function" == typeof r && (r = {
                    onAfter: r
                }), "max" === i && (i = 9e9), r = e.extend({}, n.defaults, r), a = a || r.duration, r.queue = r.queue && r.axis.length > 1, r.queue && (a /= 2), r.offset = t(r.offset), r.over = t(r.over), this._scrollable().each(function() {
                    function o(e) {
                        c.animate(d, a, r.easing, e && function() {
                            e.call(this, u, r)
                        })
                    }
                    if (null !== i) {
                        var s, l = this,
                            c = e(l),
                            u = i,
                            d = {},
                            p = c.is("html,body");
                        switch (typeof u) {
                            case "number":
                            case "string":
                                if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(u)) {
                                    u = t(u);
                                    break
                                }
                                if (u = p ? e(u) : e(u, this), !u.length) return;
                            case "object":
                                (u.is || u.style) && (s = (u = e(u)).offset())
                        }
                        var f = e.isFunction(r.offset) && r.offset(l, u) || r.offset;
                        e.each(r.axis.split(""), function(e, t) {
                            var i = "x" === t ? "Left" : "Top",
                                a = i.toLowerCase(),
                                h = "scroll" + i,
                                g = l[h],
                                m = n.max(l, t);
                            if (s) d[h] = s[a] + (p ? 0 : g - c.offset()[a]), r.margin && (d[h] -= parseInt(u.css("margin" + i), 10) || 0, d[h] -= parseInt(u.css("border" + i + "Width"), 10) || 0), d[h] += f[a] || 0, r.over[a] && (d[h] += u["x" === t ? "width" : "height"]() * r.over[a]);
                            else {
                                var b = u[a];
                                d[h] = b.slice && "%" === b.slice(-1) ? parseFloat(b) / 100 * m : b
                            }
                            r.limit && /^\d+$/.test(d[h]) && (d[h] = d[h] <= 0 ? 0 : Math.min(d[h], m)), !e && r.queue && (g !== d[h] && o(r.onAfterFirst), delete d[h])
                        }), o(r.onAfter)
                    }
                }).end()
            }, n.max = function(t, n) {
                var i = "x" === n ? "Width" : "Height",
                    a = "scroll" + i;
                if (!e(t).is("html,body")) return t[a] - e(t)[i.toLowerCase()]();
                var r = "client" + i,
                    o = t.ownerDocument.documentElement,
                    s = t.ownerDocument.body;
                return Math.max(o[a], s[a]) - Math.min(o[r], s[r])
            }, n
        })
    }("function" == typeof define && define.amd ? define : function(e, t) {
        "use strict";
        "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
    }),
    function(e) {
        var t;
        return e.event.fix = function(e) {
            return function(t) {
                return t = e.apply(this, arguments), (0 === t.type.indexOf("copy") || 0 === t.type.indexOf("paste")) && (t.clipboardData = t.originalEvent.clipboardData), t
            }
        }(e.event.fix), t = {
            callback: e.noop,
            matchType: /image.*/
        }, e.fn.pasteImageReader = function(n) {
            return "function" == typeof n && (n = {
                callback: n
            }), n = e.extend({}, t, n), this.each(function() {
                var t, i;
                return i = this, t = e(this), t.bind("paste", function(e) {
                    var t, a;
                    return a = !1, t = e.clipboardData, Array.prototype.forEach.call(t.types, function(e, r) {
                        var o, s;
                        if (!a) return e.match(n.matchType) || t.items[r].type.match(n.matchType) ? (o = t.items[r].getAsFile(),
                            s = new FileReader, s.onload = function(e) {
                                return n.callback.call(i, {
                                    dataURL: e.target.result,
                                    event: e,
                                    file: o,
                                    name: o.name
                                })
                            }, s.readAsDataURL(o), a = !0) : void 0
                    })
                })
            })
        }
    }(jQuery), define("jquery_pasteImage", ["jquery"], function(e) {
        return function() {
            var t;
            return t || e.$.fn.pasteImageReader
        }
    }(this)),
    function() {
        ! function(e) {
            return "function" == typeof define && define.amd ? define("atwho", ["jquery"], e) : e(window.jQuery)
        }(function(e) {
            var t, n, i, a, r, o, s, l, c = [].slice;
            i = function() {
                function t(t) {
                    this.current_flag = null, this.controllers = {}, this.alias_maps = {}, this.$inputor = e(t), this.iframe = null, this.setIframe(), this.listen()
                }
                return t.prototype.setIframe = function(e) {
                    return e ? (this.window = e.contentWindow, this.document = e.contentDocument || this.window.document, this.iframe = e) : (this.document = document, this.window = window, this.iframe = null)
                }, t.prototype.controller = function(e) {
                    var t, n, i, a;
                    if (this.alias_maps[e]) n = this.controllers[this.alias_maps[e]];
                    else {
                        a = this.controllers;
                        for (i in a)
                            if (t = a[i], i === e) {
                                n = t;
                                break
                            }
                    }
                    return n ? n : this.controllers[this.current_flag]
                }, t.prototype.set_context_for = function(e) {
                    return this.current_flag = e, this
                }, t.prototype.reg = function(e, t) {
                    var n, i;
                    return n = (i = this.controllers)[e] || (i[e] = new a(this, e)), t.alias && (this.alias_maps[t.alias] = e), n.init(t), this
                }, t.prototype.listen = function() {
                    return this.$inputor.on("keyup.atwhoInner", function(e) {
                        return function(t) {
                            return e.on_keyup(t)
                        }
                    }(this)).on("keydown.atwhoInner", function(e) {
                        return function(t) {
                            return e.on_keydown(t)
                        }
                    }(this)).on("scroll.atwhoInner", function(e) {
                        return function(t) {
                            var n;
                            return null != (n = e.controller()) ? n.view.hide(t) : void 0
                        }
                    }(this)).on("blur.atwhoInner", function(e) {
                        return function(t) {
                            var n;
                            return (n = e.controller()) ? n.view.hide(t, n.get_opt("display_timeout")) : void 0
                        }
                    }(this)).on("click.atwhoInner", function(e) {
                        return function(t) {
                            var n;
                            return null != (n = e.controller()) ? n.view.hide(t) : void 0
                        }
                    }(this))
                }, t.prototype.shutdown = function() {
                    var e, t, n;
                    n = this.controllers;
                    for (t in n) e = n[t], e.destroy(), delete this.controllers[t];
                    return this.$inputor.off(".atwhoInner")
                }, t.prototype.dispatch = function() {
                    return e.map(this.controllers, function(e) {
                        return function(t) {
                            var n;
                            return (n = t.get_opt("delay")) ? (clearTimeout(e.delayedCallback), e.delayedCallback = setTimeout(function() {
                                return t.look_up() ? e.set_context_for(t.at) : void 0
                            }, n)) : t.look_up() ? e.set_context_for(t.at) : void 0
                        }
                    }(this))
                }, t.prototype.on_keyup = function(t) {
                    var n;
                    switch (t.keyCode) {
                        case o.ESC:
                            t.preventDefault(), null != (n = this.controller()) && n.view.hide();
                            break;
                        case o.DOWN:
                        case o.UP:
                        case o.CTRL:
                            e.noop();
                            break;
                        case o.P:
                        case o.N:
                            t.ctrlKey || this.dispatch();
                            break;
                        default:
                            this.dispatch()
                    }
                }, t.prototype.on_keydown = function(t) {
                    var n, i;
                    if (n = null != (i = this.controller()) ? i.view : void 0, n && n.visible()) switch (t.keyCode) {
                        case o.ESC:
                            t.preventDefault(), n.hide(t);
                            break;
                        case o.UP:
                            t.preventDefault(), n.prev();
                            break;
                        case o.DOWN:
                            t.preventDefault(), n.next();
                            break;
                        case o.P:
                            if (!t.ctrlKey) return;
                            t.preventDefault(), n.prev();
                            break;
                        case o.N:
                            if (!t.ctrlKey) return;
                            t.preventDefault(), n.next();
                            break;
                        case o.TAB:
                        case o.ENTER:
                            if (!n.visible()) return;
                            t.preventDefault(), n.choose(t);
                            break;
                        default:
                            e.noop()
                    }
                }, t
            }(), a = function() {
                function n(n, i) {
                    this.app = n, this.at = i, this.$inputor = this.app.$inputor, this.id = this.$inputor[0].id || this.uid(), this.setting = null, this.query = null, this.pos = 0, this.cur_rect = null, this.range = null, t.append(this.$el = e("<div id='atwho-ground-" + this.id + "'></div>")), this.model = new s(this), this.view = new l(this)
                }
                return n.prototype.uid = function() {
                    return (Math.random().toString(16) + "000000000").substr(2, 8) + (new Date).getTime()
                }, n.prototype.init = function(t) {
                    return this.setting = e.extend({}, this.setting || e.fn.atwho["default"], t), this.view.init(), this.model.reload(this.setting.data)
                }, n.prototype.destroy = function() {
                    return this.trigger("beforeDestroy"), this.model.destroy(), this.view.destroy(), this.$el.remove()
                }, n.prototype.call_default = function() {
                    var t, n, i;
                    i = arguments[0], t = 2 <= arguments.length ? c.call(arguments, 1) : [];
                    try {
                        return r[i].apply(this, t)
                    } catch (a) {
                        return n = a, e.error("" + n + " Or maybe At.js doesn't have function " + i)
                    }
                }, n.prototype.trigger = function(e, t) {
                    var n, i;
                    return null == t && (t = []), t.push(this), n = this.get_opt("alias"), i = n ? "" + e + "-" + n + ".atwho" : "" + e + ".atwho", this.$inputor.trigger(i, t)
                }, n.prototype.callbacks = function(e) {
                    return this.get_opt("callbacks")[e] || r[e]
                }, n.prototype.get_opt = function(e, t) {
                    var n;
                    try {
                        return this.setting[e]
                    } catch (i) {
                        return n = i, null
                    }
                }, n.prototype.content = function() {
                    return this.$inputor.is("textarea, input") ? this.$inputor.val() : this.$inputor.text()
                }, n.prototype.catch_query = function() {
                    var e, t, n, i, a, r;
                    return t = this.content(), e = this.$inputor.caret("pos", {
                        iframe: this.app.iframe
                    }), r = t.slice(0, e), i = this.callbacks("matcher").call(this, this.at, r, this.get_opt("start_with_space")), "string" == typeof i && i.length <= this.get_opt("max_len", 20) ? (a = e - i.length, n = a + i.length, this.pos = a, i = {
                        text: i,
                        head_pos: a,
                        end_pos: n
                    }, this.trigger("matched", [this.at, i.text])) : (i = null, this.view.hide()), this.query = i
                }, n.prototype.rect = function() {
                    var e, t;
                    if (e = this.$inputor.caret("offset", this.pos - 1, {
                            iframe: this.app.iframe
                        })) return "true" === this.$inputor.attr("contentEditable") && (e = this.cur_rect || (this.cur_rect = e) || e), t = this.app.document.selection ? 0 : 2, {
                        left: e.left,
                        top: e.top,
                        bottom: e.top + e.height + t
                    }
                }, n.prototype.reset_rect = function() {
                    return "true" === this.$inputor.attr("contentEditable") ? this.cur_rect = null : void 0
                }, n.prototype.mark_range = function() {
                    return "true" === this.$inputor.attr("contentEditable") && (this.app.window.getSelection && (this.range = this.app.window.getSelection().getRangeAt(0)), this.app.document.selection) ? this.ie8_range = this.app.document.selection.createRange() : void 0
                }, n.prototype.insert_content_for = function(t) {
                    var n, i, a;
                    return i = t.data("value"), a = this.get_opt("insert_tpl"), this.$inputor.is("textarea, input") || !a ? i : (n = e.extend({}, t.data("item-data"), {
                        "atwho-data-value": i,
                        "atwho-at": this.at
                    }), this.callbacks("tpl_eval").call(this, a, n))
                }, n.prototype.insert = function(t, n) {
                    var i, a, r, o, s, l, c, u, d;
                    return i = this.$inputor, d = this.callbacks("inserting_wrapper").call(this, i, t, this.get_opt("suffix")), i.is("textarea, input") ? (l = i.val(), c = l.slice(0, Math.max(this.query.head_pos - this.at.length, 0)), u = "" + c + d + l.slice(this.query.end_pos || 0), i.val(u), i.caret("pos", c.length + d.length, {
                        iframe: this.app.iframe
                    })) : (o = this.range) ? (r = o.startOffset - (this.query.end_pos - this.query.head_pos) - this.at.length, o.setStart(o.endContainer, Math.max(r, 0)), o.setEnd(o.endContainer, o.endOffset), o.deleteContents(), a = e(d, this.app.document)[0], o.insertNode(a), o.setEndAfter(a), o.collapse(!1), s = this.app.window.getSelection(), s.removeAllRanges(), s.addRange(o)) : (o = this.ie8_range) && (o.moveStart("character", this.query.end_pos - this.query.head_pos - this.at.length), o.pasteHTML(d), o.collapse(!1), o.select()), i.is(":focus") || i.focus(), i.change()
                }, n.prototype.render_view = function(e) {
                    var t;
                    return t = this.get_opt("search_key"), e = this.callbacks("sorter").call(this, this.query.text, e.slice(0, 1001), t), this.view.render(e.slice(0, this.get_opt("limit")))
                }, n.prototype.look_up = function() {
                    var t, n;
                    if (t = this.catch_query()) return n = function(e) {
                        return e && e.length > 0 ? this.render_view(e) : this.view.hide()
                    }, this.model.query(t.text, e.proxy(n, this)), t
                }, n
            }(), s = function() {
                function t(e) {
                    this.context = e, this.at = this.context.at, this.storage = this.context.$inputor
                }
                return t.prototype.destroy = function() {
                    return this.storage.data(this.at, null)
                }, t.prototype.saved = function() {
                    return this.fetch() > 0
                }, t.prototype.query = function(e, t) {
                    var n, i, a;
                    return n = this.fetch(), i = this.context.get_opt("search_key"), n = this.context.callbacks("filter").call(this.context, e, n, i) || [], a = this.context.callbacks("remote_filter"), n.length > 0 || !a && 0 === n.length ? t(n) : a.call(this.context, e, t)
                }, t.prototype.fetch = function() {
                    return this.storage.data(this.at) || []
                }, t.prototype.save = function(e) {
                    return this.storage.data(this.at, this.context.callbacks("before_save").call(this.context, e || []))
                }, t.prototype.load = function(e) {
                    return !this.saved() && e ? this._load(e) : void 0
                }, t.prototype.reload = function(e) {
                    return this._load(e)
                }, t.prototype._load = function(t) {
                    return "string" == typeof t ? e.ajax(t, {
                        dataType: "json"
                    }).done(function(e) {
                        return function(t) {
                            return e.save(t)
                        }
                    }(this)) : this.save(t)
                }, t
            }(), l = function() {
                function t(t) {
                    this.context = t, this.$el = e("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>"), this.timeout_id = null, this.context.$el.append(this.$el), this.bind_event()
                }
                return t.prototype.init = function() {
                    var e;
                    return e = this.context.get_opt("alias") || this.context.at.charCodeAt(0), this.$el.attr({
                        id: "at-view-" + e
                    })
                }, t.prototype.destroy = function() {
                    return this.$el.remove()
                }, t.prototype.bind_event = function() {
                    var t;
                    return t = this.$el.find("ul"), t.on("mouseenter.atwho-view", "li", function(n) {
                        return t.find(".cur").removeClass("cur"), e(n.currentTarget).addClass("cur")
                    }).on("click", function(e) {
                        return function(t) {
                            return e.choose(t), t.preventDefault()
                        }
                    }(this))
                }, t.prototype.visible = function() {
                    return this.$el.is(":visible")
                }, t.prototype.choose = function(e) {
                    var t, n;
                    return (t = this.$el.find(".cur")).length && (n = this.context.insert_content_for(t), this.context.insert(this.context.callbacks("before_insert").call(this.context, n, t), t), this.context.trigger("inserted", [t, e]), this.hide(e)), this.context.get_opt("hide_without_suffix") ? this.stop_showing = !0 : void 0
                }, t.prototype.reposition = function(t) {
                    var n, i;
                    return t.bottom + this.$el.height() - e(window).scrollTop() > e(window).height() && (t.bottom = t.top - this.$el.height()), n = {
                        left: t.left,
                        top: t.bottom
                    }, null != (i = this.context.callbacks("before_reposition")) && i.call(this.context, n), this.$el.offset(n), this.context.trigger("reposition", [n])
                }, t.prototype.next = function() {
                    var e, t;
                    return e = this.$el.find(".cur").removeClass("cur"), t = e.next(), t.length || (t = this.$el.find("li:first")), t.addClass("cur")
                }, t.prototype.prev = function() {
                    var e, t;
                    return e = this.$el.find(".cur").removeClass("cur"), t = e.prev(), t.length || (t = this.$el.find("li:last")), t.addClass("cur")
                }, t.prototype.show = function() {
                    var e;
                    return this.stop_showing ? void(this.stop_showing = !1) : (this.context.mark_range(), this.visible() || (this.$el.show(), this.context.trigger("shown")), (e = this.context.rect()) ? this.reposition(e) : void 0)
                }, t.prototype.hide = function(e, t) {
                    var n;
                    if (this.visible()) return isNaN(t) ? (this.context.reset_rect(), this.$el.hide(), this.context.trigger("hidden", [e])) : (n = function(e) {
                        return function() {
                            return e.hide()
                        }
                    }(this), clearTimeout(this.timeout_id), this.timeout_id = setTimeout(n, t))
                }, t.prototype.render = function(t) {
                    var n, i, a, r, o, s, l;
                    if (!(e.isArray(t) && t.length > 0)) return void this.hide();
                    for (this.$el.find("ul").empty(), i = this.$el.find("ul"), o = this.context.get_opt("tpl"), s = 0, l = t.length; l > s; s++) a = t[s], a = e.extend({}, a, {
                        "atwho-at": this.context.at
                    }), r = this.context.callbacks("tpl_eval").call(this.context, o, a), n = e(this.context.callbacks("highlighter").call(this.context, r, this.context.query.text)), n.data("item-data", a), i.append(n);
                    return this.show(), this.context.get_opt("highlight_first") ? i.find("li:first").addClass("cur") : void 0
                }, t
            }(), o = {
                DOWN: 40,
                UP: 38,
                ESC: 27,
                TAB: 9,
                ENTER: 13,
                CTRL: 17,
                P: 80,
                N: 78
            }, r = {
                before_save: function(t) {
                    var n, i, a, r;
                    if (!e.isArray(t)) return t;
                    for (r = [], i = 0, a = t.length; a > i; i++) n = t[i], e.isPlainObject(n) ? r.push(n) : r.push({
                        name: n
                    });
                    return r
                },
                matcher: function(e, t, n) {
                    var i, a;
                    return e = e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), n && (e = "(?:^|\\s)" + e), a = new RegExp(e + "([A-Za-z0-9_+-]*)$|" + e + "([^\\x00-\\xff]*)$", "gi"), i = a.exec(t), i ? i[2] || i[1] : null
                },
                filter: function(e, t, n) {
                    var i, a, r, o;
                    for (o = [], a = 0, r = t.length; r > a; a++) i = t[a], ~i[n].toLowerCase().indexOf(e.toLowerCase()) && o.push(i);
                    return o
                },
                remote_filter: null,
                sorter: function(e, t, n) {
                    var i, a, r, o;
                    if (!e) return t;
                    for (o = [], a = 0, r = t.length; r > a; a++) i = t[a], i.atwho_order = i[n].toLowerCase().indexOf(e.toLowerCase()), i.atwho_order > -1 && o.push(i);
                    return o.sort(function(e, t) {
                        return e.atwho_order - t.atwho_order
                    })
                },
                tpl_eval: function(e, t) {
                    var n;
                    try {
                        return e.replace(/\$\{([^\}]*)\}/g, function(e, n, i) {
                            return t[n]
                        })
                    } catch (i) {
                        return n = i, ""
                    }
                },
                highlighter: function(e, t) {
                    var n;
                    return t ? (n = new RegExp(">\\s*(\\w*?)(" + t.replace("+", "\\+") + ")(\\w*)\\s*<", "ig"), e.replace(n, function(e, t, n, i) {
                        return "> " + t + "<strong>" + n + "</strong>" + i + " <"
                    })) : e
                },
                before_insert: function(e, t) {
                    return e
                },
                inserting_wrapper: function(e, t, n) {
                    var i, a;
                    return i = "" === n ? n : n || " ", e.is("textarea, input") ? "" + t + i : "true" === e.attr("contentEditable") ? (i = "" === n ? n : n || "&nbsp;", /firefox/i.test(navigator.userAgent) ? a = "<span>" + t + i + "</span>" : (n = "<span contenteditable='false'>" + i + "<span>", a = "<span contenteditable='false'>" + t + n + "</span>"), this.app.document.selection && (a = "<span contenteditable='true'>" + t + "</span>"), a) : void 0
                }
            }, n = {
                load: function(e, t) {
                    var n;
                    return (n = this.controller(e)) ? n.model.load(t) : void 0
                },
                setIframe: function(e) {
                    return this.setIframe(e), null
                },
                run: function() {
                    return this.dispatch()
                },
                destroy: function() {
                    return this.shutdown(), this.$inputor.data("atwho", null)
                }
            }, t = e("<div id='atwho-container'></div>"), e.fn.atwho = function(a) {
                var r, o;
                return o = arguments, e("body").append(t), r = null, this.filter("textarea, input, [contenteditable=true]").each(function() {
                    var t, s;
                    return (s = (t = e(this)).data("atwho")) || t.data("atwho", s = new i(this)), "object" != typeof a && a ? n[a] && s ? r = n[a].apply(s, Array.prototype.slice.call(o, 1)) : e.error("Method " + a + " does not exist on jQuery.caret") : s.reg(a.at, a)
                }), r || this
            }, e.fn.atwho["default"] = {
                at: void 0,
                alias: void 0,
                data: null,
                tpl: "<li data-value='${atwho-at}${name}'>${name}</li>",
                insert_tpl: "<span id='${id}'>${atwho-data-value}</span>",
                callbacks: r,
                search_key: "name",
                suffix: void 0,
                hide_without_suffix: !1,
                start_with_space: !0,
                highlight_first: !0,
                limit: 5,
                max_len: 20,
                display_timeout: 300,
                delay: null
            }
        })
    }.call(this),
    function() {
        ! function(e) {
            return "function" == typeof define && define.amd ? define("caret", ["jquery"], e) : e(window.jQuery)
        }(function(e) {
            "use strict";
            var t, n, i, a, r, o, s, l, c, u, d;
            return u = "caret", t = function() {
                function t(e) {
                    this.$inputor = e, this.domInputor = this.$inputor[0]
                }
                return t.prototype.setPos = function() {
                    return this.domInputor
                }, t.prototype.getIEPosition = function() {
                    return e.noop()
                }, t.prototype.getPosition = function() {
                    return e.noop()
                }, t.prototype.getOldIEPos = function() {
                    var e, t;
                    return t = s.selection.createRange(), e = s.body.createTextRange(), e.moveToElementText(this.domInputor), e.setEndPoint("EndToEnd", t), e.text.length
                }, t.prototype.getPos = function() {
                    var e, t, n;
                    return (n = this.range()) ? (e = n.cloneRange(), e.selectNodeContents(this.domInputor), e.setEnd(n.endContainer, n.endOffset), t = e.toString().length, e.detach(), t) : s.selection ? this.getOldIEPos() : void 0
                }, t.prototype.getOldIEOffset = function() {
                    var e, t;
                    return e = s.selection.createRange().duplicate(), e.moveStart("character", -1), t = e.getBoundingClientRect(), {
                        height: t.bottom - t.top,
                        left: t.left,
                        top: t.top
                    }
                }, t.prototype.getOffset = function() {
                    var t, n, i, a;
                    if (c.getSelection && (i = this.range())) {
                        if (i.endOffset - 1 < 0) return null;
                        t = i.cloneRange(), t.setStart(i.endContainer, i.endOffset - 1), t.setEnd(i.endContainer, i.endOffset), a = t.getBoundingClientRect(), n = {
                            height: a.height,
                            left: a.left + a.width,
                            top: a.top
                        }, t.detach()
                    } else s.selection && (n = this.getOldIEOffset());
                    return n && !l && (n.top += e(c).scrollTop(), n.left += e(c).scrollLeft()), n
                }, t.prototype.range = function() {
                    var e;
                    return c.getSelection ? (e = c.getSelection(), e.rangeCount > 0 ? e.getRangeAt(0) : null) : void 0
                }, t
            }(), n = function() {
                function t(e) {
                    this.$inputor = e, this.domInputor = this.$inputor[0]
                }
                return t.prototype.getIEPos = function() {
                    var e, t, n, i, a, r, o;
                    return t = this.domInputor, r = s.selection.createRange(), a = 0, r && r.parentElement() === t && (i = t.value.replace(/\r\n/g, "\n"), n = i.length, o = t.createTextRange(), o.moveToBookmark(r.getBookmark()), e = t.createTextRange(), e.collapse(!1), a = o.compareEndPoints("StartToEnd", e) > -1 ? n : -o.moveStart("character", -n)), a
                }, t.prototype.getPos = function() {
                    return s.selection ? this.getIEPos() : this.domInputor.selectionStart
                }, t.prototype.setPos = function(e) {
                    var t, n;
                    return t = this.domInputor, s.selection ? (n = t.createTextRange(), n.move("character", e), n.select()) : t.setSelectionRange && t.setSelectionRange(e, e), t
                }, t.prototype.getIEOffset = function(e) {
                    var t, n, i, a;
                    return n = this.domInputor.createTextRange(), e || (e = this.getPos()), n.move("character", e), i = n.boundingLeft, a = n.boundingTop, t = n.boundingHeight, {
                        left: i,
                        top: a,
                        height: t
                    }
                }, t.prototype.getOffset = function(t) {
                    var n, i, a;
                    return n = this.$inputor, s.selection ? (i = this.getIEOffset(t), i.top += e(c).scrollTop() + n.scrollTop(), i.left += e(c).scrollLeft() + n.scrollLeft(), i) : (i = n.offset(), a = this.getPosition(t), i = {
                        left: i.left + a.left - n.scrollLeft(),
                        top: i.top + a.top - n.scrollTop(),
                        height: a.height
                    })
                }, t.prototype.getPosition = function(e) {
                    var t, n, a, r, o, s, l;
                    return t = this.$inputor, r = function(e) {
                        return e.replace(/</g, "&lt").replace(/>/g, "&gt").replace(/`/g, "&#96").replace(/"/g, "&quot").replace(/\r\n|\r|\n/g, "<br />")
                    }, void 0 === e && (e = this.getPos()), l = t.val().slice(0, e), a = t.val().slice(e), o = "<span style='position: relative; display: inline;'>" + r(l) + "</span>", o += "<span id='caret' style='position: relative; display: inline;'>|</span>", o += "<span style='position: relative; display: inline;'>" + r(a) + "</span>", s = new i(t), n = s.create(o).rect()
                }, t.prototype.getIEPosition = function(e) {
                    var t, n, i, a, r;
                    return i = this.getIEOffset(e), n = this.$inputor.offset(), a = i.left - n.left, r = i.top - n.top, t = i.height, {
                        left: a,
                        top: r,
                        height: t
                    }
                }, t
            }(), i = function() {
                function t(e) {
                    this.$inputor = e
                }
                return t.prototype.css_attr = ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle", "borderTopWidth", "boxSizing", "fontFamily", "fontSize", "fontWeight", "height", "letterSpacing", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "outlineWidth", "overflow", "overflowX", "overflowY", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "textAlign", "textOverflow", "textTransform", "whiteSpace", "wordBreak", "wordWrap"], t.prototype.mirrorCss = function() {
                    var t, n = this;
                    return t = {
                        position: "absolute",
                        left: -9999,
                        top: 0,
                        zIndex: -2e4
                    }, "TEXTAREA" === this.$inputor.prop("tagName") && this.css_attr.push("width"), e.each(this.css_attr, function(e, i) {
                        return t[i] = n.$inputor.css(i)
                    }), t
                }, t.prototype.create = function(t) {
                    return this.$mirror = e("<div></div>"), this.$mirror.css(this.mirrorCss()), this.$mirror.html(t), this.$inputor.after(this.$mirror), this
                }, t.prototype.rect = function() {
                    var e, t, n;
                    return e = this.$mirror.find("#caret"), t = e.position(), n = {
                        left: t.left,
                        top: t.top,
                        height: e.height()
                    }, this.$mirror.remove(), n
                }, t
            }(), a = {
                contentEditable: function(e) {
                    return !(!e[0].contentEditable || "true" !== e[0].contentEditable)
                }
            }, o = {
                pos: function(e) {
                    return e || 0 === e ? this.setPos(e) : this.getPos()
                },
                position: function(e) {
                    return s.selection ? this.getIEPosition(e) : this.getPosition(e)
                },
                offset: function(t) {
                    var n, i;
                    return i = this.getOffset(t), l && (n = e(l).offset(), i.top += n.top, i.left += n.left), i
                }
            }, s = null, c = null, l = null, d = function(e) {
                var t;
                return (t = null != e ? e.iframe : void 0) ? (l = t, c = t.contentWindow, s = t.contentDocument || c.document) : (l = void 0, c = window, s = document)
            }, r = function(e) {
                var t;
                s = e[0].ownerDocument, c = s.defaultView || s.parentWindow;
                try {
                    return l = c.frameElement
                } catch (n) {
                    t = n
                }
            }, e.fn.caret = function(i, r, s) {
                var l;
                return o[i] ? (e.isPlainObject(r) ? (d(r), r = void 0) : d(s), l = a.contentEditable(this) ? new t(this) : new n(this), o[i].apply(l, [r])) : e.error("Method " + i + " does not exist on jQuery.caret")
            }, e.fn.caret.EditableCaret = t, e.fn.caret.InputCaret = n, e.fn.caret.Utils = a, e.fn.caret.apis = o
        })
    }.call(this), define("Editor", ["jquery", "sfModal", "template", "highLight", "pagedown_editor", "main", "tabIndent", "diff_match_patch", "jquery_scrollTo", "jquery_pasteImage", "atwho", "caret", "fileUpload"], function(e, t, n, i, a, r, o, s) {
        var l, c, u, d, p;
        return l = function(t) {
            t = e.extend({
                toolbar: l.toolbar,
                statusbar: !0,
                status: l.statusbar
            }, t), this.options = t, this.converter = null, this.isBig = !1, this.isLive = !1, this.originHeight = 420
        }, p = function(t) {
            var n, i;
            i = function() {
                e(".editor__menu--zen").addClass("editor__menu--unzen").removeClass("editor__menu--zen"), e(".editor").addClass("editor_fullscreen"), e("body").addClass("noscroll"), e(".editor__resize").hide(), e(".wmd-input").css("height", "100%"), t.isBig = !0
            }, n = function() {
                e(".editor__resize").show(), e(".editor__menu--unzen").addClass("editor__menu--zen").removeClass("editor__menu--unzen"), e(".editor").removeClass("editor_fullscreen"), e("body").removeClass("noscroll"), t.isBig = !1
            }, e(".editor__menu--zen").length ? i() : n && n()
        }, d = function(t) {
            t.mode = "preview", e(".editor").removeClass("liveMode editMode").addClass("previewMode"), e(".editor-mode a").removeClass("muted"), e(".editor__menu--preview").addClass("muted"), i(e("#wmd-preview"))
        }, c = function(t) {
            t.mode = "edit", e(".editor").removeClass("liveMode previewMode").addClass("editMode"), e(".editor-mode a").removeClass("muted"), e(".editor__menu--edit").addClass("muted")
        }, u = function(t) {
            t.mode = "live", e(".editor").removeClass("editMode previewMode").addClass("liveMode"), e(".editor-mode a").removeClass("muted"), e(".editor__menu--live").addClass("muted"), i(e("#wmd-preview"))
        }, l.prototype.getVal = function() {
            return e(".wmd-input").val()
        }, l.prototype.setVal = function(t) {
            var n;
            return n = e(".wmd-input").val(t), this.pagedownEditor.refreshPreview(), n
        }, l.prototype.change = function(t) {
            t && e(".wmd-input").on("input", function() {
                t()
            })
        }, l.prototype.render = function(n, r, l) {
            var c, u, d, p, f, h, g, m, b, v, w, y, _, k, x, C, $, T, E, S, N, I;
            if ($ = this, !this._rendered || this._rendered !== n) {
                if (document.cookie.indexOf("typemode") > -1) return void e(n).addClass("wmd-input");
                r = r || "live", e(n).removeClass("hidden hide").addClass("mono form-control wmd-input"), e(n).before('<div class="editor-toolbar" id="wmd-button-bar"><ul class="editor-mode"></ul></div>'), e(n).wrap('<div class="wmd"></div>'), e(".wmd").after("<div class=\"editor-line\"></div><div class=\"editor-preview\"><div class='fmt' id='wmd-preview'></div></div>"), o.config.tab = "    ", o.render(e(n)[0]), e(".wmd-input").pasteImageReader(function(i) {
                    var a, r, o, s, l;
                    s = e(this).val(), r = e(this)[0].selectionStart, e(this).val(s.slice(0, r) + "\n![图片上传中...]\n" + s.slice(r)), l = "image/png", o = {
                        type: "POST"
                    }, o.url = "/img/upload/image?enc=base64", o.name = "image", a = "xhrupload-" + parseInt(Math.random() * (2 << 16)), o.contentType = "multipart/form-data; boundary=" + a, o.data = "--" + a + '\ncontent-disposition: form-data; enc="base64"; name="' + o.name + '"; filename="' + encodeURIComponent(i.name) + '.base64"\nContent-Transfer-Encoding: base64\nContent-Type: ' + l + "\n\n" + i.dataURL.slice(22) + "\n\n--" + a + "--", e.ajax(o).success(function(i) {
                        var a, o, l, c;
                        c = i[0], a = i[1], o = "clipboard.png", c ? t(a) : (l = "\n![" + o + "](" + a + ")\n", s = e(n).val(), e(n).val(s.slice(0, r) + l + s.slice(r + 13)), $.pagedownEditor.refreshPreview())
                    })
                }), e(n).atwho({
                    at: "@",
                    callbacks: {
                        remote_filter: function(t, n) {
                            var i, a;
                            if (a = {
                                    q: t
                                }, !t && e("#answerIt").length) i = e("#answerIt").data("id"), a = {
                                questionId: i
                            };
                            else if (!t) return;
                            e.getJSON("/api/users/search", a, function(e) {
                                e.status || n(e.data)
                            })
                        },
                        tpl_eval: function(e, t) {
                            return '<li data-value="@' + t.name + '">' + (t.avatarUrl ? '<img class="avatar-24 mr10" src="' + t.avatarUrl + '" />' : "") + t.name + " &nbsp; <small>@" + t.slug + "</small></li>"
                        }
                    }
                }), this.element = e(n)[0], _ = this.options, p = new a.getSanitizingConverter, a.Extra.init(p), h = new a.Editor(p), h.run(n.slice(1)), this.converter = p, this.pagedownEditor = h, f = new s, w = "@mark" + Math.ceil(1e8 * Math.random()) + "@", x = e("#wmd-preview"), v = "", T = '<span class="diff" />', p.hooks.chain("postConversion", function(e) {
                    var t, n, i, a, r, o, s, l, c, u, d, p, h, g;
                    if (n = f.diff_main(v, e), v = e, n.length > 0) {
                        for (h = [], s = w, a = 0; a < n.length;) t = n[a], c = t[0], g = t[1], p = g.lastIndexOf("<"), i = g.lastIndexOf(">"), 0 !== c ? (p >= 0 && p > i ? c > 0 ? h.push(g.substring(0, p) + s + g.substring(p)) : (o = h[h.length - 1], r = o.lastIndexOf("<"), h[h.length - 1] = o.substring(0, r) + s + o.substring(r)) : c > 0 ? h.push(g + s) : h.push(s), s = "") : h.push(g), a++;
                        e = h.join(""), s || (u = e.indexOf(w), d = e.substring(0, u), l = e.substr(u + w.length), p = d.lastIndexOf("<"), i = d.lastIndexOf(">"), e = p >= 0 && p > i ? d.substring(0, p) + T + d.substring(p) + l : d + T + l)
                    }
                    return e
                }), I = void 0, h.hooks.chain("onPreviewRefresh", function() {
                    var t, n, a, r, o;
                    e("#wmd-preview pre").length && i(e("#wmd-preview")), n = e(".diff", x), o = !1, I && clearTimeout(I), t = e(".diff", x).parent(), t.is(x) || (t.css("background-color", "#D9EDF7"), I = setTimeout(function() {
                        t.css("background-color", "transparent")
                    }, 4500)), n.length > 0 && (r = n.position(), a = n.parent().css("line-height"), a = a ? parseInt(a) : 0, (r.top < 0 || r.top > x.height() - a) && (x.scrollTo(n, {
                        offset: -50
                    }), o = !0))
                }), _.toolbar !== !1 && this.createToolbar(), C = '<a class="editor__resize" href="javascript:void(0);">调整高度</a>', e(".editor").after(C), S = void 0, m = 0, b = 32, N = void 0, E = function(t) {
                    return N = e(".wmd-input"), m = y(t).y, S = N.height() - m, N.css("opacity", .3), e(document).mousemove(k).mouseup(g), !1
                }, k = function(e) {
                    var t, n;
                    return n = y(e).y, t = S + n, m >= n && (t -= 5), m = n, t = Math.max(b, t), N.height(t + "px"), b > t && g(e), !1
                }, g = function() {
                    e(document).unbind("mousemove", k).unbind("mouseup", g), N.css({
                        opacity: 1
                    }), N.focus(), N = null, S = null, m = 0
                }, y = function(e) {
                    return {
                        x: e.clientX + document.documentElement.scrollLeft,
                        y: e.clientY + document.documentElement.scrollTop
                    }
                }, e(".editor__resize").on("mousedown", E), e(window).scroll(function() {
                    var t, n, i, a;
                    $.isBig || (a = e(".editor").width(), i = e(".editor").offset().top, n = e(this).scrollTop(), t = 62 + e(".editor-help .tab-content").height(), n >= i ? (e(".editor-help-content.active").removeClass("active"), e(".editor__menu").css({
                        position: "fixed",
                        top: 0,
                        "z-index": 1e3,
                        width: a
                    }), e(".editor-help").css({
                        position: "fixed",
                        top: "31px",
                        "z-index": 1e3,
                        width: a
                    })) : e(".editor__menu, .editor-help").css({
                        position: "static",
                        width: "auto"
                    }))
                }), this._rendered = n, "live" === r ? e(".editor__menu--live").trigger("click") : "edit" === r ? e(".editor__menu--edit").trigger("click") : "preview" === r && e(".editor__menu--preview").trigger("click"), window.localStorage && (c = "autoSaveContent_" + location.pathname + location.search, d = "autoSaveTitle_" + location.pathname + location.search, u = "autoSaveTags_" + location.pathname + location.search, localStorage[c] && e(n).val(localStorage[c]), localStorage[d] && e("#myTitle").val(localStorage[d])), l && l($)
            }
        }, l.prototype.createToolbar = function(t) {
            var n, i, a, r, o, s;
            a = this, o = '<li class="pull-right"><a class="editor__menu--preview" title="预览模式"></a></li><li class="pull-right"><a class="editor__menu--live" title="实况模式"></a></li><li class="pull-right"><a class="editor__menu--edit" title="编辑模式"></a></li><li class="pull-right editor__menu--divider"></li><li id="wmd-zen-button" class="pull-right" title="全屏"><a class="editor__menu--zen"></a></li>', r = e(o), e(".editor-mode").append(r), e(".editor").delegate(".editor__menu--edit", "click", function() {
                e(this).hasClass("muted") || c(a)
            }), e(".editor").delegate(".editor__menu--preview", "click", function() {
                e(this).hasClass("muted") || d(a)
            }), e(".editor").delegate(".editor__menu--live", "click", function() {
                e(this).hasClass("muted") || u(a)
            }), e("#wmd-zen-button").find("a").removeClass("editor__menu--bold").addClass("editor__menu--zen"), e("#wmd-zen-button").click(function() {
                p(a)
            }), n = '<title>Markdown 语法指南</title><link rel="stylesheet" href="' + e('head link[rel="stylesheet"]').attr("href") + '"><script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script><script src="http://cdn.bootcss.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>', i = n + '<body style="background-color:#FAF2CC"><div class="editor-help"><ul class="editor-help-tabs nav nav-tabs" id="editorHelpTab" role="tablist">    <li rel="heading"><a href="#editorHelpHeading" role="tab" data-toggle="tab">标题 / 粗斜体</a></li>    <li rel="code"><a href="#editorHelpCode" role="tab" data-toggle="tag">代码</a></li>    <li rel="link"><a href="#editorHelpLink" role="tab" data-toggle="tag">链接</a></li>    <li rel="image"><a href="#editorHelpImage" role="tab" data-toggle="tag">图片</a></li>    <li rel="split"><a href="#editorHelpSplit" role="tab" data-toggle="tag">换行 / 分隔符</a></li>    <li rel="list"><a href="#editorHelpList" role="tab" data-toggle="tag">列表 / 引用</li></a>    <li class="pull-right"><a href="http://segmentfault.com/markdown" target="_blank">高级技巧</a></li>    </ul><div class="tab-content"><!-- 粗斜体、标题 --><div class="editor-help-content tab-pane fade" id="editorHelpHeading" rel="heading"><p>文章内容较多时，可以用标题分段：</p><pre>## 大标题 ##\n### 小标题 ###</pre><p>粗体 / 斜体</p><pre>*斜体文本*    _斜体文本_\n**粗体文本**    __粗体文本__\n***粗斜体文本***    ___粗斜体文本___</pre></div><!-- end 粗斜体、标题 --><!-- 代码 --><div class="editor-help-content tab-pane fade" id="editorHelpCode" rel="code"><p>如果你只想高亮语句中的某个函数名或关键字，可以使用 <code>`function_name()`</code> 实现</p><p>通常我们会根据您的代码片段适配合适的高亮方法，但你也可以用 <code>```</code> 包裹一段代码，并指定一种语言</p><pre>```<strong>javascript</strong>\n$(document).ready(function () {\n    alert(\'hello world\');\n});\n```</pre><p>支持的语言：<code>actionscript, apache, bash, clojure, cmake, coffeescript, cpp, cs, css, d, delphi, django, erlang, go, haskell, html, http, ini, java, javascript, json, lisp, lua, markdown, matlab, nginx, objectivec, perl, php, python, r, ruby, scala, smalltalk, sql, tex, vbscript, xml</code></p><p>您也可以使用 4 空格缩进，再贴上代码，实现相同的的效果</p><pre><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i>def g(x):\n<i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i>yield from range(x, 0, -1)\n<i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i>yield from range(x)</pre></div><!-- end 代码 --><!-- 链接 --><div class="editor-help-content tab-pane fade" rel="link" id="editorHelpLink"><p>常用链接方法</p><pre>文字链接 [链接名称](http://链接网址)\n网址链接 &lt;http://链接网址&gt;</pre><p>高级链接技巧</p><pre>这个链接用 1 作为网址变量 [Google][1].\n这个链接用 yahoo 作为网址变量 [Yahoo!][yahoo].\n然后在文档的结尾为变量赋值（网址）\n\n<i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i>[1]: http://www.google.com/\n<i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i>[yahoo]: http://www.yahoo.com/</pre></div><!-- end 链接 --><!-- 图片 --><div class="editor-help-content tab-pane fade" id="editorHelpImage" rel="image"><p>跟链接的方法区别在于前面加了个感叹号 <code>!</code>，这样是不是觉得好记多了呢？</p><pre>![图片名称](http://图片网址)</pre><p>当然，你也可以像网址那样对图片网址使用变量</p><pre>这个链接用 1 作为网址变量 [Google][1].\n然后在文档的结尾位变量赋值（网址）\n\n<i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i>[1]: http://www.google.com/logo.png</pre></div><!-- end 图片 --><!-- 换行、分隔符 --><div class="editor-help-content tab-pane fade" id="editorHelpSplit" rel="split"><p>如果另起一行，只需在当前行结尾加 2 个空格</p><pre>在当前行的结尾加 2 个空格<i class="nbsp">&nbsp;</i><i class="nbsp">&nbsp;</i>\n这行就会新起一行</pre><p>如果是要起一个新段落，只需要空出一行即可。</p><p>如果你有写分割线的习惯，可以新起一行输入三个减号 <code>-</code>：</p><pre>---\n</pre></div><!-- end 换行、分隔符 --><!-- 列表、引用 --><div class="editor-help-content tab-pane fade" id="editorHelpList" rel="list"><p>普通列表</p><pre>-<i class="nbsp">&nbsp;</i>列表文本前使用 [减号+空格]\n+<i class="nbsp">&nbsp;</i>列表文本前使用 [加号+空格]\n*<i class="nbsp">&nbsp;</i>列表文本前使用 [星号+空格]</pre><p>带数字的列表</p><pre>1.<i class="nbsp">&nbsp;</i>列表前使用 [数字+空格]\n2.<i class="nbsp">&nbsp;</i>我们会自动帮你添加数字\n7.<i class="nbsp">&nbsp;</i>不用担心数字不对，显示的时候我们会自动把这行的 7 纠正为 3</pre><p>引用</p><pre>&gt;<i class="nbsp">&nbsp;</i>引用文本前使用 [大于号+空格]\n&gt;<i class="nbsp">&nbsp;</i>折行可以不加，新起一行都要加上哦</pre></div><!-- end 列表、引用 --></div></div><script>$("#editorHelpTab a").eq(0).tab("show");$("#editorHelpTab a").click(function (e) {    var _$wrap = $(this).parent();    if(! _$wrap.hasClass("pull-right")) {        e.preventDefault();        $(this).tab("show");    }});</script></body>', s = null, e("#wmd-help-button").click(function() {
                s && s.window ? s.focus() : (s = window.open("", "Markdown Help", "channelmode=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=505, height=400, top=100, left=100"), s.document.write(i))
            })
        }, l
    }), define("bookmark", ["jquery", "sfModal", "main", "jquery_tmpl"], function(e, t, n) {
        "use strict";
        var i, a;
        return i = '<form class="bookmarklist-form" id="bookmarkArchive"><label for="bookmarkArchiveName" class="required">名称</label>    <input type="text" name="name" id="name" id="bookmarkArchiveName" class="form-control" value="${name}" placeholder="最多输入32个字" maxlength="32">    <br /><label for="bookmarkArchiveDescription" class="mt10">描述</label>    <textarea name="description" id="bookmarkArchiveDescription" class="form-control" placeholder="最多输入256个字">${description}</textarea>    <br /><input type="radio" name="isPrivate" class="mt10" value="0" id="bookmark-public"{{if !isPrivate}} checked{{/if}}/><label class="ml10" for="bookmark-public">公开</label>    <span class="text-muted">&mdash; 公开后不可再设置为私密</span><br />    <input type="radio" name="isPrivate" value="1" id="bookmark-private"{{if isPrivate}} checked{{/if}}{{if !isPrivate}} disabled{{/if}}/><label class="ml10" for="bookmark-private">私密</label>    <span class="text-muted">&mdash; 仅自己可见</span>    </form>',
            a = '<form class="bookmarklist-form"><p class="required">添加到收藏夹</p><ul class="bookmarklist list-unstyled mb0">    {{each list}}<li data-id="${id}"{{if isBookmarked}}class="active"{{/if}}><input type="checkbox" {{if isBookmarked}}checked{{/if}}>${name}{{if ~~isPrivate}}<span class="text-muted label label-default ml10">私密</span>{{/if}}</li>{{/each}}</ul>    <div class="mt20"><a href="#" class="new-bookmark">+ 创建新收藏夹</a></div></form>', {
                createArchive: function(n, a, r) {
                    var o;
                    o = this, t({
                        title: "创建收藏夹",
                        content: e.tmpl(i, {
                            name: "",
                            description: "",
                            isPrivate: !0
                        }),
                        doneText: "提交",
                        doneFn: function() {
                            var t;
                            t = e(".bookmarklist-form"), e.post("/api/bookmarkArchives/add", {
                                name: t.find("[name=name]").val(),
                                description: t.find("[name=description]").val(),
                                isPrivate: t.find("[name=isPrivate]:checked").val()
                            }, function(e) {
                                0 === e.status && ("edit" === a ? o.editBookmark(n, r) : "bookmark" === a ? o.addBookmark(n, r, e.data.id) : "other" === a ? r(e) : window.location.reload())
                            })
                        },
                        hide: function() {
                            "edit" === a ? o.editBookmark(n, r) : "bookmark" === a && o.addBookmark(n, r)
                        }
                    })
                },
                editArchive: function(n) {
                    t({
                        title: "编辑收藏夹",
                        $content: e.tmpl(i, {
                            name: n.data("name"),
                            description: n.data("desc"),
                            isPrivate: n.data("isprivate")
                        }),
                        doneText: "提交",
                        doneFn: function() {
                            var t;
                            t = e(".bookmarklist-form"), e.post("/api/bookmarkArchive/" + n.data("id") + "/edit", {
                                name: t.find("[name=name]").val(),
                                description: t.find("[name=description]").val(),
                                isPrivate: t.find("[name=isPrivate]:checked").val()
                            }, function(e) {
                                0 === e.status && window.location.reload()
                            })
                        }
                    })
                },
                deleteArchive: function(n) {
                    t({
                        title: "删除收藏夹",
                        content: '确认要删除收藏夹「<span class="fuckXss"></span>」么？<br /><span class="text-danger">注意：收藏夹下的收藏也会被删除！</span>',
                        doneText: "删除",
                        doneClass: "btn-danger",
                        closeText: "取消",
                        show: function() {
                            e(".fuckXss").text(n.data("name"))
                        },
                        doneFn: function() {
                            e.post("/api/bookmarkArchive/" + n.data("id") + "/delete", function(e) {
                                0 === e.status && (window.location = "/user/bookmarks/mine")
                            })
                        }
                    })
                },
                addBookmark: function(e, t, n) {
                    this.getArchive(e, t, "bookmark", n)
                },
                editBookmark: function(e, t) {
                    this.getArchive(e, t, "edit")
                },
                successFn: null,
                getArchive: function(n, i, r, o) {
                    var s;
                    s = this, s.successFn = i, e.get("/api/user/bookmarkArchives", {
                        objectId: n.data("id")
                    }, function(l) {
                        var c;
                        c = "", 0 === l.status && (t({
                            title: "收藏",
                            content: e.tmpl(a),
                            doneText: "提交",
                            doneFn: function() {
                                var a, r, o;
                                r = e(this), e(".bookmarklist").removeClass("error").siblings(".error--msg").remove(), o = [], a = e(".bookmarklist-form").length > 1 ? e(".bookmarklist-form").eq(1) : e(".bookmarklist-form"), a.find("li.active").each(function() {
                                    o.push(e(this).data("id"))
                                }), e(".sfmodal").find(".done-btn").text("加载中").attr("disabled", "disabled"), e.post("/api/" + n.data("type") + "/" + n.data("id") + "/bookmark", {
                                    archiveIds: o
                                }, function(n) {
                                    var a;
                                    0 === n.status ? ("false" === n.data && window.location.reload(), i && i(n, o.length), t("hide"), a = location.pathname.split("/"), "bookmark" === a[1] && -1 === o.indexOf(a[2]) && location.reload()) : (e(".bookmarklist").addClass("error").after('<span class="error--msg">必须选择收藏夹</span>'), e(".sfmodal").find(".done-btn").text("发布").removeAttr("disabled"))
                                })
                            }
                        }), e(".sfModal-content").html(e.tmpl(a, [{
                            list: l.data
                        }])), e(".bookmarklist").delegate("li", "click", function() {
                            var t;
                            t = e(this).find("input[type=checkbox]"), e(this).toggleClass("active"), e(this).hasClass("active") ? t.prop("checked", !0) : t.prop("checked", !1)
                        }), o && e(".bookmarklist li[data-id=" + o + "]").click(), e(".sfmodal .new-bookmark").click(function() {
                            return s.createArchive(n, r, i), !1
                        }))
                    })
                },
                deleteBookmark: function(n) {
                    t({
                        title: "删除收藏",
                        content: '确认要从收藏夹「<span class="delete-archivemodal"></span>」中删除收藏「<span class="delete-bookmarkmodal"></span>」么？',
                        doneText: "删除",
                        doneClass: "btn-danger",
                        closeText: "取消",
                        show: function() {
                            e(".delete-archivemodal").text(n.data("archive")), e(".delete-bookmarkmodal").text(n.data("title"))
                        },
                        doneFn: function() {
                            e.post("/api/" + n.data("type") + "/" + n.data("id") + "/bookmark", {
                                archiveId: null
                            }, function(e) {
                                0 === e.status && (n.parents(".stream-list__item").fadeOut().remove(), t("hide"))
                            })
                        }
                    })
                }
            }
    }), define("statusToggle", [], function() {
        "use strict";
        return function(e) {
            e.data("toggle", "false"), e.data("toggle") && (e.on("active", function(t, n) {
                e.data("toggle", "true"), n.call(this)
            }), e.on("unactive", function(t, n) {
                e.data("toggle", "true"), n.call(this)
            }))
        }
    }),
    function(e) {
        var t, n = {
                className: "autosizejs",
                id: "autosizejs",
                append: "\n",
                callback: !1,
                resizeDelay: 10,
                placeholder: !0
            },
            i = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',
            a = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent", "whiteSpace"],
            r = e(i).data("autosize", !0)[0];
        r.style.lineHeight = "99px", "99px" === e(r).css("lineHeight") && a.push("lineHeight"), r.style.lineHeight = "", e.fn.autosize = function(i) {
            return this.length ? (i = e.extend({}, n, i || {}), r.parentNode !== document.body && e(document.body).append(r), this.each(function() {
                function n() {
                    var t, n = window.getComputedStyle ? window.getComputedStyle(p, null) : !1;
                    n ? (t = p.getBoundingClientRect().width, (0 === t || "number" != typeof t) && (t = parseInt(n.width, 10)), e.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function(e, i) {
                        t -= parseInt(n[i], 10)
                    })) : t = f.width(), r.style.width = Math.max(t, 0) + "px"
                }

                function o() {
                    var o = {};
                    if (t = p, r.className = i.className, r.id = i.id, c = parseInt(f.css("maxHeight"), 10), e.each(a, function(e, t) {
                            o[t] = f.css(t)
                        }), e(r).css(o).attr("wrap", f.attr("wrap")), n(), window.chrome) {
                        var s = p.style.width;
                        p.style.width = "0px";
                        p.offsetWidth;
                        p.style.width = s
                    }
                }

                function s() {
                    var e, a;
                    t !== p ? o() : n(), !p.value && i.placeholder ? r.value = (f.attr("placeholder") || "") + i.append : r.value = p.value + i.append, r.style.overflowY = p.style.overflowY, a = parseInt(p.style.height, 10), r.scrollTop = 0, r.scrollTop = 9e4, e = r.scrollTop, c && e > c ? (p.style.overflowY = "scroll", e = c) : (p.style.overflowY = "hidden", u > e && (e = u)), e += h, e -= 28, a !== e && (p.style.height = e + "px", g && i.callback.call(p, p), f.trigger("autosize.resized"))
                }

                function l() {
                    clearTimeout(d), d = setTimeout(function() {
                        var e = f.width();
                        e !== b && (b = e, s())
                    }, parseInt(i.resizeDelay, 10))
                }
                var c, u, d, p = this,
                    f = e(p),
                    h = 0,
                    g = e.isFunction(i.callback),
                    m = {
                        height: p.style.height,
                        overflow: p.style.overflow,
                        overflowY: p.style.overflowY,
                        wordWrap: p.style.wordWrap,
                        resize: p.style.resize
                    },
                    b = f.width(),
                    v = f.css("resize");
                f.data("autosize") || (f.data("autosize", !0), ("border-box" === f.css("box-sizing") || "border-box" === f.css("-moz-box-sizing") || "border-box" === f.css("-webkit-box-sizing")) && (h = f.outerHeight() - f.height()), u = Math.max(parseInt(f.css("minHeight"), 10) - h || 0, f.height()), f.css({
                    overflow: "hidden",
                    overflowY: "hidden",
                    wordWrap: "break-word"
                }), "vertical" === v ? f.css("resize", "none") : "both" === v && f.css("resize", "horizontal"), "onpropertychange" in p ? "oninput" in p ? f.on("input.autosize keyup.autosize", s) : f.on("propertychange.autosize", function() {
                    "value" === event.propertyName && s()
                }) : f.on("input.autosize", s), i.resizeDelay !== !1 && e(window).on("resize.autosize", l), f.on("autosize.resize", s), f.on("autosize.resizeIncludeStyle", function() {
                    t = null, s()
                }), f.on("autosize.destroy", function() {
                    t = null, clearTimeout(d), e(window).off("resize", l), f.off("autosize").off(".autosize").css(m).removeData("autosize")
                }), s())
            })) : this
        }
    }(jQuery || $), define("jquery_autosize", ["jquery"], function(e) {
        return function() {
            var t;
            return t || e.$.fn.autosize
        }
    }(this)), define("comment", ["jquery", "sfModal", "jquery_tmpl", "main", "highLight", "likeHate", "statusToggle", "jquery_autosize", "atwho", "caret"], function(e, t, n, i, a) {
        var r, o;
        return r = function(e) {
            var t;
            return e += "", t = {
                101: "question",
                102: "answer",
                119: "article",
                116: "activity"
            }, t[e.slice(0, 3)]
        }, o = '<div class="widget-comments__item hover-show ${pos}" id="${id}">    <div class="votes widget-vote">        <button class="like {{if isLiked}}active{{/if}}" data-id="${id}" type="button" {{if isLiked}}data-do="unlike" {{else}}data-do="like" {{/if}} data-type="comment"></button><span class="count">{{if votes!=0 }}${votes}{{else}}&nbsp;{{/if}}</span>    </div>    <div class="comment-content wordbreak">  {{if replyUser}}<span>回复 <a href="${replyUser.url}">${replyUser.name}</a>：</span>{{/if}}        <div class="content fmt">{{html parsedText }} </div>        <textarea name="text" rows="3" id="commentText-${id}" class="editTextarea form-control mb10 hidden">${originalText}</textarea>        <p class="comment-meta">            <a href="/c/${id}" class="text-muted">#${index}</a>&nbsp;<a href="${user.url}" class="commentUser" data-userid="${user.id}" data-username="${user.name}" data-userslug="${user.slug}" data-useravatar="${user.avatarUrl}"><strong>${user.name}</strong></a> &middot; <span class="createdDate">${createdDate}</span>            {{if !isSelf}}            &middot; <a href="#" class="commentReply" data-userid="${user.id}" data-id="${id}" data-username="${user.name}">回复</a>            {{/if}}            {{if canEdit}}            <span class="pull-right editBtns hidden">                <button class="btn btn-link btn-xs cancel" type="button">取消</button>                <button class="btn btn-primary btn-xs edit ml10" type="button">保存</button>            </span>            {{/if}}            <span class="pull-right commentTools hover-show-obj">                {{if canEdit}}<a href="javascript:void(0);" class="commentEdit ml10" data-id="${id}">编辑</a>{{/if}}                {{if canDelete}}<a href="javascript:void(0);" class="commentDel ml10" data-id="${id}" data-username="${user.name}">删除</a>{{/if}}                {{if !isSelf}}<a href="#911" class="ml10" data-toggle="modal" data-target="#911" data-type="comment" data-id="${id}" data-typetext="评论" data-placement="top" title="举报">举报</a>{{/if}}            </span>        </p>    </div></div>', {
            init: function(t) {
                var n, a, r, o;
                t.removeClass("hidden"), a = e(".comment-helper", t), r = e(".toggle-comment-helper", t), r.click(function() {
                    a.toggle()
                }), o = a.data("rank"), 15 > o && a.show(), n = e("#activate"), n.length > 0 && e(".widget-comments__form textarea", t).focus(function() {
                    n.modal("show")
                }), e(".widget-comments__form textarea", t).atwho({
                    at: "@",
                    callbacks: {
                        remote_filter: function(n, i) {
                            var a, r, o, s;
                            if (!n) {
                                if (o = t.data("id") + "", s = [], 0 === o.indexOf("101") || 0 === o.indexOf("102")) e.getJSON("/api/users/search", {
                                    questionId: e("#questionTitle").data("id")
                                }, function(t) {
                                    t.status || (s = t.data, e(".comment-meta").each(function() {
                                        var t, n, i;
                                        t = e(this).find(".commentUser"), n = {
                                            id: t.data("userid"),
                                            name: t.data("username"),
                                            slug: t.data("userslug"),
                                            url: "/u/" + t.data("userslug"),
                                            avatarUrl: t.data("useravatar")
                                        }, i = !1, s.forEach(function(e) {
                                            e.slug === n.slug && (i = !0)
                                        }), i || s.push(n)
                                    }), i(s))
                                });
                                else {
                                    if (0 !== o.indexOf("119")) return;
                                    a = e(".author"), r = {
                                        id: a.data("userid"),
                                        name: a.data("username"),
                                        slug: a.data("userslug"),
                                        url: "/u/" + a.data("userslug"),
                                        avatarUrl: a.data("useravatar")
                                    }, s.push(r)
                                }
                                return e(".comment-meta").each(function() {
                                    var t, n, i;
                                    t = e(this).find(".commentUser"), n = {
                                        id: t.data("userid"),
                                        name: t.data("username"),
                                        slug: t.data("userslug"),
                                        url: "/u/" + t.data("userslug"),
                                        avatarUrl: t.data("useravatar")
                                    }, i = !1, s.forEach(function(e) {
                                        e.slug === n.slug && (i = !0)
                                    }), i || s.push(n)
                                }), void i(s)
                            }
                            e.getJSON("/api/users/search", {
                                q: n
                            }, function(e) {
                                e.status || i(e.data)
                            })
                        },
                        tpl_eval: function(e, t) {
                            return '<li data-value="@' + t.name + '">' + (t.avatarUrl ? '<img class="avatar-24 mr10" src="' + t.avatarUrl + '" />' : "") + t.name + " &nbsp; <small>@" + t.slug + "</small></li>"
                        }
                    }
                }).on("keydown", function(t) {
                    var n;
                    return n = e(this).parents(".widget-comments__form").find("button[type=submit]"), !t.ctrlKey && !t.metaKey || 13 !== t.keyCode || n.attr("disabled") ? void 0 : (n.click(), !1)
                }).autosize(), e(".commentLogin").click(function() {
                    i.login()
                })
            },
            get: function(t, n, i, s, l) {
                var c, u, d;
                return c = this, u = [], d = i, e(".ajax-error", n).remove(), d && n.hasClass("show") ? void n.removeClass("show").hide() : (n.prepend('<span class="load-text text-muted">加载中<br /></span>'), void e.get("/api/" + r(t) + "/" + t + "/comments", function(i) {
                    var r, d, p;
                    if (e(".load-text", n).remove(), e(".widget-comments__item", n).remove(), 0 === i.status) {
                        if (null === i.data) return;
                        i.data.total > 0 && (d = e(".showMoreComments[data-target=#comment-" + t + "]"), d.next(".widget-comments__form").removeClass("hidden"), d.remove(), e("[data-target=#comment-" + t + "]").text(i.data.total + " 评论")), e.each(i.data.rows, function(t, n) {
                            n.userId && (n.isSelf = n.userId === e("#SFUserId").attr("value"), n.pos = n.id === s ? "high" : "", n.parsedText = n.parsedText.replace(/^[\r\n]/g, ""), -1 !== n.parsedText.indexOf("<p></p>") && (n.parsedText = n.parsedText.replace(/<[\/a-z]+>/g, ""), n.parsedText = "<p>" + n.parsedText + "</p>"), u.push(n), n.index = t + 1)
                        }), n.prepend(e.tmpl(o, u)), a(n), s && e.each(s, function(t, n) {
                            var i;
                            i = e("#" + n), i.length > 0 && (e("body").scrollTop(e("#" + s[0]).offset().top - 20), i.addClass("comment-warning"), window.setTimeout(function() {
                                i.removeClass("comment-warning")
                            }, 5e3))
                        }), n.on("click", ".commentEdit", function() {
                            return c.edit({
                                id: e(this).data("id"),
                                content: e(this).parents(".comment-content")
                            }), !1
                        }), n.on("click", ".commentDel", function() {
                            return c["delete"]({
                                id: e(this).data("id"),
                                commentId: t,
                                username: e(this).data("username")
                            }), !1
                        }), n.on("click", ".commentReply", function() {
                            return c.reply({
                                userId: e(this).data("userid"),
                                username: e(this).data("username"),
                                commentId: e(this).data("id"),
                                form: e(this).parents(".widget-comments__item").siblings(".widget-comments__form")
                            }), !1
                        }), n.find(".like").likeHate(), p = new RegExp(window.location.host, "ig"), r = void 0, n.find("a").each(function() {
                            r = e(this), !p.test(r.attr("href")) && /^http/.test(r.attr("href")) && r.attr("target", "_blank")
                        }), n.data("opened", !0), 0 === i.data.rows.length && (/^101/.test(t) || /^102/.test(t)) && e("#commentText-" + t).focus(), l && l()
                    }
                }))
            },
            set: function(t) {
                var n;
                e(".ajax-error", t.form.parent()).remove(), t.form.before('<p class="load-text text-muted">加载中</p>'), t.trigger.attr("disabled", "disabled"), n = t.trigger.data("id"), e.post("/api/" + r(n) + "/" + n + "/comments/add", {
                    text: t.textarea.val(),
                    reply: t.reply || ""
                }, function(n) {
                    var i;
                    e(".load-text", t.form.parent()).remove(), t.trigger.removeAttr("disabled"), 0 === n.status && (i = n.data.comment, t.textarea.val("").attr("style", "height:56px"), t.form.removeData("reply").find(".reply").remove(), i.isSelf = i.userId === e("#SFUserId").attr("value"), i.canDelete = !0, i.canEdit = !0, e("[data-target=#comment-" + t.textarea.data("id") + "]").text(n.data.total + " 评论"), i.index = n.data.total, t.form.before(e.tmpl(o, i)))
                })
            },
            reply: function(t) {
                var n, i;
                i = t.userId, n = t.form, e(".reply", n).remove(), n.removeData("reply"), n.siblings(".reply").remove(), n.data("reply", i).prepend('<div class="reply col-sm-12 mb5"><span>回复：' + t.username + '</span> <a href="" class="removeReply">[&times;]</a></div>'), n.find("textarea").focus(), e(".reply .removeReply", n).click(function() {
                    return e(this).parent().remove(), n.removeData("reply"), !1
                })
            },
            "delete": function(n) {
                var i, a;
                i = this, a = n.commentId, t({
                    title: "删除评论",
                    content: "确认删除来自「" + n.username + "」的评论吗？",
                    closeText: "取消",
                    doneClass: "btn-danger",
                    doneText: "删除",
                    doneFn: function() {
                        e(this).text("加载中").attr("disabled", "disabled"), e.post("/api/comment/" + n.id + "/delete", function(n) {
                            0 === n.status && (e("[data-target=#comment-" + a + "]").text(n.data + " 评论"), i.get(a, e("#comment-" + a), !1), t("hide"))
                        })
                    }
                })
            },
            edit: function(t) {
                var n, i, a, r, o, s, l, c, u;
                i = t.content, u = t.id, c = i.find(".content").height(), s = i.find(".content").addClass("hidden"), r = i.find(".editBtns").removeClass("hidden"), n = r.find(".cancel"), a = r.find(".edit"), o = i.find(".commentEdit").addClass("hidden"), l = i.find(".editTextarea").css("height", c).removeClass("hidden").autosize().focus(), i.find(".commentTools").addClass("hidden"), l.on("keydown", function(t) {
                    return (t.ctrlKey || t.metaKey) && 13 === t.keyCode ? (e(this).siblings(".comment-meta").find("button.edit").click(), !1) : 27 === t.keyCode ? (e(this).siblings(".comment-meta").find("button.cancel").click(), !1) : 9 === t.keyCode ? (e(this).siblings(".comment-meta").find("button.edit").focus(), !1) : void 0
                }), n.click(function() {
                    return l.addClass("hidden"), r.addClass("hidden"), s.removeClass("hidden"), o.removeClass("hidden"), i.find(".commentTools").removeClass("hidden"), i.find(".editTextarea").removeClass("error"), i.find(".error--msg").remove(), !1
                }).on("keydown", function(t) {
                    return 9 === t.keyCode ? (e(this).parent().siblings(".commentDel").focus(), i.find(".commentTools").removeClass("hidden"), !1) : void 0
                }), a.click(function() {
                    e.post("/api/comment/" + u + "/edit", {
                        text: l.val()
                    }, function(e) {
                        0 === e.status && (s.html(e.data.parsedText), i.find(".createdDate").text(e.data.createdDate), n.click(), i.find(".commentTools").removeClass("hidden"))
                    })
                }).on("keydown", function(t) {
                    return 9 === t.keyCode ? (e(this).siblings("button.cancel").focus(), !1) : void 0
                })
            }
        }
    }), define("autoSave", ["jquery"], function(e) {
        "use strict";
        var t, n, i, a, r;
        return t = e("#editorStatus"), i = void 0, r = void 0, a = void 0, n = function() {}, n.prototype.bind = function(n, r) {
            i = n, this.form = r, a = this, e("[name=title]").on("input", function() {
                "" !== e.trim(e(this).val()) && a.change(), window.localStorage && localStorage.setItem("autoSaveTitle_" + location.pathname + location.search, e(this).val())
            }), i.change(function() {
                "" !== e.trim(i.getVal()) && a.change(), window.localStorage && window.localStorage.setItem("autoSaveContent_" + location.pathname + location.search, i.getVal())
            }), e("#dropIt").click(function() {
                e.post("/api/draft/" + e("#draftId").val() + "/delete", function(n) {
                    0 === n.status ? (t.html("已舍弃"), e("#draftId").val(""), window.localStorage && localStorage.removeItem("autoSaveContent_" + location.pathname), window.localStorage && localStorage.removeItem("autoSaveTitle_" + location.pathname), window.localStorage && localStorage.removeItem("autoSaveTag_" + location.pathname)) : t.html("舍弃失败"), e("#dropIt").addClass("hidden")
                })
            })
        }, n.prototype.change = function() {
            t.html("保存中...").removeClass("hidden"), e("#dropIt").addClass("hidden"), clearTimeout(r), r = setTimeout(function() {
                a.save()
            }, 4e3)
        }, n.prototype.save = function() {
            var n, i;
            n = this, e("#publishIt").attr("disabled", "disabled"), i = new n.form, e.post("/api/" + i.type + "/draft/save", i, function(n) {
                e("#publishIt").removeAttr("disabled"), 0 === n.status ? (t.html("已保存草稿"), e("#dropIt").data("id", n.data).removeClass("hidden"), e("#draftId").val(n.data), window.localStorage && (window.localStorage.removeItem("autoSaveContent_" + location.pathname + location.search), window.localStorage.removeItem("autoSaveTitle_" + location.pathname + location.search))) : t.html("保存失败")
            })
        }, new n
    }), ! function(e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define("shareButton", ["jquery", "sfModal"], e);
        else {
            var t;
            "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.Share = e()
        }
    }(function(e, t) {
        var n;
        "classList" in document.documentElement || !Object.defineProperty || "undefined" == typeof HTMLElement || Object.defineProperty(HTMLElement.prototype, "classList", {
            get: function() {
                var e, t, n;
                return n = function(e) {
                    return function(n) {
                        var i, a;
                        i = t.className.split(/\s+/), a = i.indexOf(n), e(i, a, n), t.className = i.join(" ")
                    }
                }, t = this, e = {
                    add: n(function(e, t, n) {
                        ~t || e.push(n)
                    }),
                    remove: n(function(e, t) {
                        ~t && e.splice(t, 1)
                    }),
                    toggle: n(function(e, t, n) {
                        ~t ? e.splice(t, 1) : e.push(n)
                    }),
                    contains: function(e) {
                        return !!~t.className.split(/\s+/).indexOf(e)
                    },
                    item: function(e) {
                        return t.className.split(/\s+/)[e] || null
                    }
                }, Object.defineProperty(e, "length", {
                    get: function() {
                        return t.className.split(/\s+/).length
                    }
                }), e
            }
        }), n = function() {
            function n() {}
            return n.prototype.extend = function(e, t, n) {
                var i, a;
                for (a in t) i = void 0 !== e[a], i && "object" == typeof t[a] ? this.extend(e[a], t[a], n) : (n || !i) && (e[a] = t[a])
            }, n.prototype.hide = function(e) {
                return e.style.display = "none"
            }, n.prototype.show = function(e) {
                return e.style.display = "block"
            }, n.prototype.has_class = function(e, t) {
                return e.classList.contains(t)
            }, n.prototype.add_class = function(e, t) {
                return e.classList.add(t)
            }, n.prototype.remove_class = function(e, t) {
                return e.classList.remove(t)
            }, n.prototype.is_encoded = function(e) {
                return e = e.replace(/\%/g, ""), decodeURIComponent(e) !== e
            }, n.prototype.encode = function(e) {
                return this.is_encoded(e) ? e : encodeURIComponent(e)
            }, n.prototype.popover = function(n) {
                return t({
                    content: '<div class="text-center widget-share__wechart--modal"><p class="text-muted">打开微信“扫一扫”，打开网页后点击屏幕右上角分享按钮<button type="button" class="close pull-right">×</button></p><img width="300" height="300" src="' + n + '"></div>',
                    hideDone: !0,
                    hideTitle: !0,
                    hideClose: !0,
                    show: function() {
                        return e(".widget-share__wechart--modal .close").click(function() {
                            return t("hide")
                        })
                    }
                })
            }, n.prototype.popup = function(e, t) {
                var n, i, a, r;
                return null == t && (t = {}), i = {
                    width: 500,
                    height: 350
                }, i.top = screen.height / 2 - i.height / 2, i.left = screen.width / 2 - i.width / 2, a = function() {
                    var e;
                    e = [];
                    for (n in t) r = t[n], e.push(n + "=" + this.encode(r));
                    return e
                }.call(this).join("&"), a && (a = "?" + a), window.open(e + a, "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=550,height=500")
            }, n
        }();
        var i, a = {}.hasOwnProperty,
            r = function(e, t) {
                function n() {
                    this.constructor = e
                }
                for (var i in t) a.call(t, i) && (e[i] = t[i]);
                return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
            };
        return i = function(t) {
            function n(t, n) {
                var i;
                return this.element = t, this.el = {
                    head: document.getElementsByTagName("head")[0],
                    body: document.getElementsByTagName("body")[0]
                }, this.config = {
                    enabled_networks: 0,
                    protocol: -1 === ["http", "https"].indexOf(window.location.href.split(":")[0]) ? "https://" : "//",
                    url: e(this.element).data("url") || window.location.href,
                    text: e(this.element).data("text"),
                    caption: null,
                    title: e(this.element).data("text") ? e(this.element).data("text") : (i = document.querySelector('meta[property="og:title"]') || document.querySelector('meta[name="twitter:title"]')) ? i.getAttribute("content") : (i = document.querySelector("title")) ? i.innerText : void 0,
                    image: "http://s.segmentfault.com/img/sf-114.png",
                    description: (i = document.querySelector('meta[property="og:description"]') || document.querySelector('meta[name="twitter:description"]') || document.querySelector('meta[name="description"]')) ? i.getAttribute("content") : "",
                    networks: {
                        weibo: {
                            enabled: !0,
                            url: null,
                            appkey: null,
                            title: null,
                            text: null,
                            caption: null,
                            description: null,
                            image: null,
                            appkey: "1742025894"
                        },
                        wechart: {
                            enabled: !0,
                            url: null
                        },
                        renren: {
                            enabled: !0,
                            url: null,
                            title: null,
                            text: null,
                            description: null,
                            image: null,
                            comment: null
                        },
                        tqq: {
                            enabled: !0,
                            url: null,
                            appkey: "",
                            title: null,
                            text: null,
                            image: null
                        },
                        douban: {
                            enabled: !0,
                            url: null,
                            href: null,
                            appkey: null,
                            text: null,
                            title: null,
                            caption: null,
                            description: null,
                            image: null,
                            comment: null
                        },
                        google_plus: {
                            enabled: !1,
                            url: null
                        },
                        twitter: {
                            enabled: !0,
                            url: null,
                            text: null,
                            description: null
                        },
                        facebook: {
                            enabled: !0,
                            load_sdk: !0,
                            url: null,
                            app_id: null,
                            title: null,
                            caption: null,
                            description: null,
                            image: null
                        },
                        pinterest: {
                            enabled: !1,
                            url: null,
                            image: null,
                            description: null
                        },
                        email: {
                            enabled: !1,
                            title: null,
                            description: null
                        }
                    }
                }, this.setup(t, n), this
            }
            return r(n, t), n.prototype.setup = function(e, t) {
                var n, i, a, r, o;
                for (a = document.querySelectorAll(e), this.extend(this.config, t, !0), this.set_global_configuration(), this.normalize_network_configuration(), n = r = 0, o = a.length; o > r; n = ++r) i = a[n], this.setup_instance(e, n)
            }, n.prototype.setup_instance = function(e, t) {
                var n, i, a, r, o, s, l;
                for (n = document.querySelectorAll(e)[t], this.hide(n), this.add_class(n, "sharer-" + t), this.inject_html(n), this.show(n), a = n.getElementsByTagName("li"), l = this, s = [], t = r = 0, o = a.length; o > r; t = ++r) i = a[t], s.push(i.addEventListener("click", function() {
                    return l.event_network(n, this)
                }));
                return s
            }, n.prototype.event_network = function(e, t) {
                var n;
                return n = t.getAttribute("data-network"), this["network_" + n]()
            }, n.prototype["public"] = function(e) {
                var t, n, i, a, r, o, s;
                for (o = document.querySelectorAll(this.element), s = [], n = a = 0, r = o.length; r > a; n = ++a) i = o[n], t = i.getElementsByClassName("social")[0], s.push(this["event_" + e](t));
                return s
            }, n.prototype.network_facebook = function() {
                return this.config.networks.facebook.load_sdk ? window.FB ? FB.ui({
                    method: "feed",
                    name: this.config.networks.facebook.title,
                    link: this.config.networks.facebook.url,
                    picture: this.config.networks.facebook.image,
                    caption: this.config.networks.facebook.caption,
                    description: this.config.networks.facebook.description
                }) : console.error("The Facebook JS SDK hasn't loaded yet.") : this.popup("https://www.facebook.com/sharer/sharer.php", {
                    u: this.config.networks.facebook.url
                })
            }, n.prototype.network_twitter = function() {
                return this.popup("https://twitter.com/intent/tweet", {
                    text: this.config.networks.twitter.text,
                    url: this.config.networks.twitter.url + "?utm_source=Twitter&utm_medium=shareLink&utm_campaign=socialShare"
                })
            }, n.prototype.network_google_plus = function() {
                return this.popup("https://plus.google.com/share", {
                    url: this.config.networks.google_plus.url
                })
            }, n.prototype.network_pinterest = function() {
                return this.popup("https://www.pinterest.com/pin/create/button", {
                    url: this.config.networks.pinterest.url,
                    media: this.config.networks.pinterest.image,
                    description: this.config.networks.pinterest.description
                })
            }, n.prototype.network_email = function() {
                return this.popup("mailto:", {
                    subject: this.config.networks.email.title,
                    body: this.config.networks.email.description
                })
            }, n.prototype.network_weibo = function() {
                return this.popup("http://service.weibo.com/share/share.php", {
                    title: this.config.networks.weibo.title.replace(/"/g, "%2522"),
                    url: this.config.networks.weibo.url + "?utm_source=Weibo&utm_medium=shareLink&utm_campaign=socialShare",
                    pic: this.config.networks.weibo.image,
                    appkey: this.config.networks.weibo.appkey
                })
            }, n.prototype.network_wechart = function() {
                return this.popover("http://qr.liantu.com/api.php?text=" + this.config.networks.wechart.url + "?utm_source=Wechat&utm_medium=shareLink&utm_campaign=socialShare")
            }, n.prototype.network_renren = function() {
                return this.popup("http://widget.renren.com/dialog/share", {
                    resourceUrl: this.config.networks.renren.image,
                    pic: this.config.networks.renren.image,
                    srcUrl: this.config.networks.renren.url + "?utm_source=Renren&utm_medium=shareLink&utm_campaign=socialShare",
                    title: this.config.networks.renren.title,
                    description: this.config.networks.renren.description,
                    comment: this.config.networks.renren.comment || ""
                })
            }, n.prototype.network_tqq = function() {
                return this.popup("http://share.v.t.qq.com/index.php", {
                    c: "share",
                    a: "index",
                    url: this.config.networks.tqq.url + "?utm_source=Tqq&utm_medium=shareLink&utm_campaign=socialShare",
                    title: this.config.networks.tqq.title,
                    appkey: this.config.networks.tqq.appkey,
                    pic: this.config.networks.tqq.image
                })
            }, n.prototype.network_douban = function() {
                return this.popup("http://www.douban.com/share/service", {
                    href: this.config.networks.douban.url + "?utm_source=Douban&utm_medium=shareLink&utm_campaign=socialShare",
                    name: this.config.networks.douban.title,
                    image: this.config.networks.douban.image,
                    text: this.config.networks.douban.description,
                    comment: this.config.networks.douban.comment || ""
                })
            }, n.prototype.inject_html = function(t) {
                return t.innerHTML = '分享 <ul id="share" data-title="" class="sn-inline"><li data-network="weibo"><a href="javascript:void(0);" class="entypo-weibo icon-sn-weibo share-1" data-toggle="tooltip" data-placement="top" title="分享至新浪微博">新浪微博</a></li><li data-network="wechart"><a href="javascript:void(0);" class="entypo-wechart icon-sn-wechat share-2" data-toggle="tooltip" data-placement="top" title="分享至微信">微信</a></li><li data-network="twitter"><a href="javascript:void(0);" class="entypo-twitter icon-sn-twitter share-3" data-toggle="tooltip" data-placement="top" title="分享至 Twitter">Twitter</a></li><li data-network="facebook"><a href="javascript:void(0);" class="entypo-facebook icon-sn-facebook share-4" data-toggle="tooltip" data-placement="top" title="分享至Facebook">Facebook</a></li><li data-network="renren"><a href="javascript:void(0);" class="entypo-renren icon-sn-renren share-5" data-toggle="tooltip" data-placement="top" title="分享至人人网">人人网</a></li><li data-network="douban"><a href="javascript:void(0);" class="entypo-douban icon-sn-douban share-6" data-toggle="tooltip" data-placement="top" title="分享至豆瓣">豆瓣</a></li></ul>', e(".widget-share .sn-inline a").tooltip()
            }, n.prototype.hook = function(e, t, n) {
                var i, a;
                i = this.config.networks[t][e], "function" == typeof i && (a = i.call(this.config.networks[t], n), void 0 !== a && (a = this.normalize_filter_config_updates(a), this.extend(this.config.networks[t], a, !0), this.normalize_network_configuration()))
            }, n.prototype.set_global_configuration = function() {
                var e, t, n, i, a, r;
                for (n in i) n || (this.config[n] = i[n]);
                a = this.config.networks, r = [];
                for (t in a) {
                    i = a[t];
                    for (n in i) null == this.config.networks[t][n] && (this.config.networks[t][n] = this.config[n]);
                    this.config.networks[t].enabled ? (e = "block", this.config.enabled_networks += 1) : e = "none", r.push(this.config.networks[t].display = e)
                }
                return r
            }, n.prototype.normalize_network_configuration = function() {
                return this.config.networks.facebook.app_id || (this.config.networks.facebook.load_sdk = !1), this.is_encoded(this.config.networks.twitter.description) || (this.config.networks.twitter.description = encodeURIComponent(this.config.networks.twitter.description)), "integer" == typeof this.config.networks.facebook.app_id ? this.config.networks.facebook.app_id = this.config.networks.facebook.app_id.toString() : void 0
            }, n.prototype.normalize_filter_config_updates = function(e) {
                return this.config.networks.facebook.app_id !== e.app_id && (console.warn("You are unable to change the Facebook app_id after the button has been initialized. Please update your Facebook filters accordingly."), delete e.app_id), this.config.networks.facebook.load_sdk !== e.load_sdk && (console.warn("You are unable to change the Facebook load_sdk option after the button has been initialized. Please update your Facebook filters accordingly."), delete e.app_id), e
            }, n
        }(n)
    }), define("specialUrl", ["jquery", "jquery_tmpl"], function(e) {
        var t, n, i, a, r, o, s, l, c, u;
        return c = function(t, n) {
                var i, a;
                i = e(".v_" + t), a = i.after(e.tmpl(l, n)).next(".video-prev"), console.log(i), a.click(function() {
                    a.hide(), a.after(e.tmpl(s, n)).next(".video-body").find(".hide-video").click(function() {
                        a.show(), e(this).parent().remove()
                    })
                }), i.remove()
            }, a = 0, r = [{
                reg: /^https?:\/\/jsfiddle\.net\/([_a-z0-9-\/,]+)$/i,
                fn: function(t) {
                    t.indexOf("embedded") < 0 && (t += /\/$/.test(t) ? "embedded" : "/embedded"), t = "http://jsfiddle.net/" + t, e('<iframe style="width: 100%; height: 300px" src="' + t + '" allowfullscreen="allowfullscreen" frameborder="0"></iframe>').insertAfter(this)
                }
            }, {
                reg: /^https?:\/\/gist\.github\.com\/([_a-z0-9-]+)$/i,
                fn: function(t) {
                    var n, i, r, o, s, l, c;
                    e("#special-gist" + t).length > 0 || (c = "https://gist.github.com/" + t + ".json?callback=special_" + a, r = e('<iframe id="special-gist' + t + '" style="width: 100%;" src="about:blank" frameborder="0"></iframe>').insertAfter(this), s = r[0], o = s.contentWindow ? s.contentWindow.document : s.contentDocument ? s.contentDocument : s.document, l = o.createElement("script"), i = e(o), n = e("body", i), r.ready(function() {
                        r.height(i.height())
                    }), s.contentWindow["special_" + a] = function(e) {
                        n.append(e.div).css({
                            padding: 0,
                            margin: 0
                        }), i.find("head").append('<link rel="stylesheet" href="' + e.stylesheet + '" />'), i.find("head").append("<style>html{background:#fff;}.gist .gist-file .gist-data{background:none;}                .gist .gist-file .gist-meta{background:#eee;text-shadow:none;}.gist .gist-file .gist-meta a{color:#017e66}                </style>"), setTimeout(function() {
                            r.height(i.height())
                        }, 5e3)
                    }, l.type = "text/javascript", l.src = c, o.body.appendChild(l), a++)
                }
            }, {
                reg: /^http:\/\/runjs\.cn\/detail\/([_0-9a-z-]+)$/i,
                fn: function(t) {
                    var n, i, a, r, o, s, l;
                    n = function() {
                        e("body", i).css("margin", 0), e(".runjs_gist", i).css("border", "none"), e(".gist_content", i).css("font-size", "14px")
                    }, e("#special-runjs" + t).length > 0 || (l = "http://runjs.cn/gist/" + t + "/all", a = e('<iframe id="special-runjs' + t + '" style="width: 100%; height: 300px" src="about:blank" frameborder="0"></iframe>').insertAfter(this), r = a[0], i = r.contentWindow ? r.contentWindow.document : r.contentDocument ? r.contentDocument : r.document, s = i.createElement("script"), o = i.prototype.or(i.__proto__), o.write = function(t) {
                        e(t).appendTo(i.body)
                    }, s.type = "text/javascript", s.src = l, i.body.appendChild(s), s.onreadystatechange = n, s.onload = n)
                }
            }, {
                reg: /^http:\/\/codepen\.io\/([_a-zA-Z0-9-\/,]+)$/i,
                fn: function(t) {
                    t.indexOf("embed") < 0 && (t = t.replace("pen", "embed")), t = "http://codepen.io/" + t, e('<iframe style="width: 100%; height: 300px" src="' + t + '" allowfullscreen="allowfullscreen" frameborder="0"></iframe>').insertAfter(this)
                }
            }], l = '<div class="video-prev vp_${id}"><div class="clearfix video-header"><img class="pull-left" src="${thumbnail}"><div class="pull-left"><h5>${title}</h5><span class="text-muted">${link}</span></div></div>', s = '<div class="video-body"><embed class="player" src="${player}" type="application/x-shockwave-flash" /><br /><a href="javascript:void(0)" class="hide-video text-muted"><span class="glyphicon glyphicon-open mr5"></span>收起视频</a></div>',
            t = void 0, i = void 0, o = void 0, u = void 0, n = new RegExp(window.location.host, "ig"),
            function() {
                e(".fmt a").each(function(a) {
                    var o, s;
                    t = e(this), o = t.attr("href"), !n.test(o) && /^http/.test(o) && t.attr("target", "_blank"), e.each(r, function(e, n) {
                        o && (i = o.match(n.reg), i && t.after('<button class="btn btn-xs btn-default ml10 preview" data-url="' + i[1] + '" data-typeid="' + e + '">点击预览</button>'))
                    }), o && o.match(/youku\.com/g) && (s = o.match(/id_\w+/), s && (s = s[0].slice(3), t.addClass("v_" + s + "_" + a), e.get("https://openapi.youku.com/v2/videos/show_basic.json?video_id=" + s + "&client_id=8fdab46779dd5d25", function(e) {
                        c(s + "_" + a, e)
                    }))), o && o.match(/tudou\.com/g) && (/albumplay/.test(o) || /listplay/.test(o)) && (s = o.match(/http:\/\/www\.tudou\.com\/.+\/.+\/(.+)\.html/)[1], s && (t.addClass("v_" + s + "_" + a), e.get("/api/util/video/info?app_key=269fe846bb7a17ec&format=json&itemCodes=" + s, function(e) {
                        var t;
                        e = e.data[0], t = {
                            thumbnail: e.picUrl,
                            title: e.title,
                            link: e.playUrl,
                            player: e.outerPlayerUrl
                        }, c(s + "_" + a, t)
                    })))
                }), e(".fmt").delegate(".preview", "click", function() {
                    r[e(this).data("typeid")].fn.call(this, e(this).data("url")), e(this).siblings("iframe").addClass("loading"), e(this).remove()
                }), e(".fmt img").each(function(t) {
                    var n, i;
                    i = new RegExp(window.location.origin, "i"), n = e(this).attr("src"), (i.test(n) || /^\/img\//i.test(n)) && (e(this).css("cursor", "pointer"), e(this).click(function() {
                        0 === e("#previewImg").length && (e("body").addClass("isPreviewing").append('<div id="previewImg"><div class="loadingDot"><span class="glyphicon glyphicon-refresh rotate white"></span></div><div class="imgWrapper"><img></div><div class="menu"><a target="_blank" href="javascript:void(0);" class="link-orign">查看原图</a></div></div>'), e("#previewImg img")[0].src = e(this).attr("src") + "/view", e("#previewImg .link-orign").attr("href", e(this).attr("src") + "/view"), e("#previewImg img")[0].onload = function() {
                            e("#previewImg .loadingDot").remove(), this.height > window.innerHeight && (e("#previewImg .imgWrapper").css({
                                lineHeight: window.innerHeight + "px"
                            }), e("#previewImg").css("overflow-y", "scroll")), this.width > window.innerWidth && (e("#previewImg img").css("width", "100%"), e("#previewImg .imgWrapper").css({
                                lineHeight: "initial"
                            }))
                        }, e("#previewImg").click(function(t) {
                            e(this).remove(), e("body").removeClass("isPreviewing")
                        }))
                    }))
                })
            }
    }), define("follow", ["statusToggle"], function(e) {
        "use strict";
        return function(t) {
            var n, i;
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
            }, t), i = t.element, e(i), i.on(n.event, function() {
                i.hasClass(n.toggleClass) ? i.trigger("unactive", function() {
                    i.text(n.unActiveText).removeClass(n.toggleClass).attr("disabled", "disabled"), $.post(n.url + "/" + n.element.data("id") + "/" + n["do"] + "/cancel", function(e) {
                        0 === e.status ? n.successFn.call(this, e) : (i.text(n.activeText), n.failFn.call(this, e)), i.removeAttr("disabled")
                    })
                }) : i.trigger("active", function() {
                    i.text(n.activeText).addClass(n.toggleClass).attr("disabled", "disabled"), $.post(n.url + "/" + n.element.data("id") + "/" + n["do"], function(e) {
                        0 === e.status ? n.successFn.call(this, e) : (i.text(n.unActiveText), n.failFn.call(this, e)), i.removeAttr("disabled")
                    })
                })
            })
        }
    }), define("tagPopup", ["jquery", "sfModal", "follow", "jquery_tmpl"], function(e, t, n) {
        "use strict";
        e.fn.tagPopup = function(t) {
            var i, a, r, o;
            r = function() {
                e.getJSON("/api/tag/" + i.data("id"), function(t) {
                    var a, r;
                    0 !== t.data.length && (t.data.excerpt ? o.content = t.data.excerpt : o.content = '<span class="text-muted">目前还没有关于这个标签的解释</span>', t.data.isFollowed ? (t.data.isFollowedClass = "active", t.data.isFollowedBtn = "已关注") : (t.data.isFollowedClass = "", t.data.isFollowedBtn = "加关注"), o.template = e.tmpl(o.template, t.data)[0], i.popover(o), i.popover("show"), r = e(".tag-popup-" + i.data("id")), a = r.find("button"), n({
                        element: a,
                        url: "/api/tag",
                        successFn: function(t) {
                            e(".tag-popup-" + a.data("id") + " .followers").text(t.data + "人")
                        }
                    }))
                })
            }, i = e(this), a = e(".tag-popup-" + i.data("id")), o = {
                placement: i.data("placement") || "top",
                trigger: "manual",
                container: "body",
                content: "",
                html: !0,
                template: '<div class="popover tag-popup tag-popup-${id}">                <div class="arrow"></div>                <h3 class="popover-title"></h3>                <div class="popover-content"></div>                <div class="popover-footer">                    <a href="${url}">查看</a>                    <span class="text-muted">&middot;</span>                    <a href="${editUrl}">编辑</a>                    <span class="text-muted">&middot;</span>                    <a href="/feeds/tag/${name}">订阅</a>                    <div class="pull-right">                        <span class="text-muted followers">${followers} 人</span><button class="btn btn-default btn-xs tagfollow ${isFollowedClass}" data-id="${id}">${isFollowedBtn}</button></div></div></div>'
            }, "show" === t ? 0 === a.length ? r() : a.show() : "hide" === t && a.remove()
        }
    }), define("911", ["jquery", "main"], function(e) {
        "use strict";
        var t, n;
        t = "", n = "", e("#911").on("shown.bs.modal", function(i) {
            var a;
            e(this).find("[type=radio]").first().focus(), n = e(i.relatedTarget).data("type"), t = e(i.relatedTarget).data("id"), a = e(i.relatedTarget).data("typetext"), e(".type-911").text(a), e(".radio-911").hide(), e(".radio-911.all, ." + n + "-only").show()
        }), e("#btwRadio input").change(function() {
            e("#911Desc").val("").text(""), e(".btw").removeClass("hide")
        }), e(".radio-911 input").not("#btwRadio input").change(function() {
            e(".btw").addClass("hide"), e("#911Desc").text(e(this).attr("value"))
        }), e("#911Submit").click(function() {
            e.post("/api/" + n + "/" + t + "/report", {
                reason: e("#911Desc").val() || e(".radio-911 input:checked").val()
            }, function(e) {
                0 === e.status && location.reload()
            }, "json")
        })
    }), requirejs(["jquery", "likeHate", "getRelated", "Editor", "bookmark", "comment", "autoSave", "sfModal", "shareButton", "specialUrl", "highLight", "template", "main", "jquery_hoverIntent", "tagPopup", "911", "jquery_hoverIntent", "tagPopup", "caret", "atwho", "typeHelper"], function(e, t, n, i, a, r, o, s, l, c, u, d, p) {
        "use strict";
        var f, h, g, m, b, v, w, y, _, k, x, C, $, T, E, S;
        e(".widget-vote button, .answerAccept, #sideFollow,.edit-btn").tooltip({
            container: "body"
        }), $ = new i, f = e("#activate"), e("#answerEditor").focus(function() {
            p.userId || p.login(), $.render("#answerEditor", "edit", function() {
                var t;
                setTimeout(function() {
                    e(".wmd-input").focus()
                }, 0), p.userRank < 30 && (t = e('<div id="answerNotify" class="alert alert-warning mb0"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><p class="h4 mt0">你正在撰写答案</p><p>如果你是要对问题或其他回答进行点评或询问，请使用“评论”功能。</p></div>').hide(), e("form.editor-wrap").before(t), t.slideDown(), e("#answerNotify .close").click(function(e) {
                    return t.slideUp(), !1
                }))
            }), e("#answerSubmit").removeClass("hide"), o.bind($, function() {
                this["do"] = "saveAnswer", this.type = "answer", this.text = $.getVal(), this.id = e("#draftId").val(), this.questionId = e("#questionId").val(), this.weibo = e("#shareToWeibo:checked").length
            })
        }), x = void 0, e("#questionDel, #questionClose, .answerIgnore, .answerDel").click(function(t) {
            x = t.target, e("#delete-modal").on("shown.bs.modal", function(t) {
                e(this).find("[type=radio]").first().focus()
            }).modal("show")
        }), "true" === e.cookie("dontlikeShare") && e("#shareToWeibo").removeAttr("checked"), e("#shareToWeibo").click(function(t) {
            e("#shareToWeibo:checked").length > 0 ? e.cookie("dontlikeShare", !1, {
                path: "/"
            }) : e.cookie("dontlikeShare", !0, {
                path: "/"
            })
        }), f.length > 0 && e("#answerText").click(function(e) {
            f.modal("show")
        }), e("#answerIt").click(function(t) {
            var n, i, a;
            n = e(this), t.preventDefault(), a = $.getVal(), i = e(this).data("id"), n.attr("disabled", "disabled"), e("#shareToWeibo:checked").length > 0 && e.cookie("shareAnswerToWeibo", !0, {
                path: "/"
            }), e.post("/api/question/" + i + "/answers/add", {
                text: a,
                id: i,
                draftId: e("#draftId").val()
            }, function(e) {
                e.status ? n.removeAttr("disabled") : ($.isSubmited = !0, window.localStorage && localStorage.removeItem("autoSaveContent_" + location.pathname), window.localStorage && localStorage.removeItem("autoSaveTitle_" + location.pathname), location.reload())
            })
        }), e(".like, .hate").likeHate(), e(".comments").click(function() {
            var t, n;
            n = e(this).data("id"), t = e("#comment-" + n), !!t.data("opened") == !1 ? (r.init(t), r.get(n, t, !1), t.removeClass("hidden"), t.data("opened", !0)) : t.toggleClass("hidden")
        }), e(".commentReply").click(function() {
            var t, n, i, a, o, s;
            n = e(this).parents(".widget-comments").data("id"), t = e("#comment-" + n), o = e(this).data("userid"), s = e(this).data("username"), i = e(this).data("id"), a = e(this).parents(".widget-comments__item").siblings(".widget-comments__form"), r.init(t), r.get(n, t, !1, null, function() {
                r.reply({
                    userId: o,
                    username: s,
                    commentId: i,
                    form: a
                })
            }), t.removeClass("hidden"), t.data("opened", !0)
        }), e(".commentDel").click(function() {
            var t, n, i, a;
            n = e(this).parents(".widget-comments").data("id"), t = e("#comment-" + n), a = e(this).data("username"), i = e(this).data("id"), r.init(t), r.get(n, t, !1, null, function() {
                var e;
                e = {
                    id: i,
                    commentId: n,
                    username: a
                }, r["delete"](e)
            }), t.removeClass("hidden"), t.data("opened", !0)
        }), e(".commentEdit").click(function() {
            var t, n, i;
            i = e(this).data("id"), n = e(this).parents(".widget-comments").data("id"), t = e("#comment-" + n), r.init(t), r.get(n, t, !1, null, function() {
                r.edit({
                    id: i,
                    content: t.find("#" + i + " .comment-content")
                })
            }), t.removeClass("hidden"), t.data("opened", !0)
        }), e("#SFEventObject").length > 0 && (E = JSON.parse(e("#SFEventObject").attr("value")), v = E.current[0], b = E.current[1], _ = E.root[1], g = void 0, "comment" === v ? (g = e("#comment-" + _), r.init(g), r.get(_, g, !0, b), g.addClass("in")) : "answer" === v && (m = null, b.forEach(function(t) {
            e("#a-" + t).length && (e("#a-" + t + " .post-offset").addClass("highlight"), setTimeout(function() {
                e("#a-" + t + " .post-offset").removeClass("highlight")
            }, 3e3), m = e("#a-" + t))
        }), e("body").scrollTop(m.offset().top))), e(".postComment").click(function() {
            r.set({
                trigger: e(this),
                form: e(this).parents(".widget-comments__form"),
                textarea: e(this).parents(".widget-comments__form").find("textarea"),
                reply: e(this).parents(".widget-comments__form").data("reply")
            })
        }), e("#sideBookmark").click(function() {
            var t;
            t = e(this), t.hasClass("active") ? a.editBookmark(t, function(n, i) {
                0 === i && t.removeClass("active").text("收藏"), e("#sideBookmarked").text(n.data)
            }) : a.addBookmark(t, function(n) {
                t.addClass("active").text("已收藏"), e("#sideBookmarked").text(n.data)
            })
        }), e("#sideFollow").click(function() {
            var t, n;
            t = e(this), n = t.hasClass("active"), t.text("加载中").attr("disabled", "disabled"), e.post("/api/" + t.data("type") + "/" + t.data("id") + "/" + t.data("do"), function(e) {
                0 === e.status ? (t.siblings("strong").text(e.data), n ? t.removeClass("active").data("do", "follow").text("关注") : t.addClass("active").data("do", "follow/cancel").text("已关注")) : n ? t.text("已关注") : t.text("关注"), t.removeAttr("disabled")
            })
        }), e(".answerAccept").click(function() {
            var t, n, i;
            t = e(this), i = t.hasClass("active"), n = i ? "/accept/cancel" : "/accept", t.text("加载中").attr("disabled", "disabled"), e.post("/api/answer/" + t.data("id") + n, function(e) {
                0 === e.status ? window.location.reload() : i ? t.text("取消采纳") : t.text("采纳答案"), t.removeAttr("disabled")
            })
        }), e(".answerUnIgnore").click(function() {
            var t;
            return t = e(this), t.text("加载中"), e.post("/api/answer/" + t.data("id") + "/ignore/cancel", function(e) {
                0 === e.status ? window.location.reload() : t.text("取消忽略")
            }), !1
        }), e(".answerUnDel").click(function() {
            var t;
            return t = e(this), t.text("加载中"), e.post("/api/answer/" + t.data("id") + "/delete/cancel", function(e) {
                0 === e.status ? window.location.reload() : t.text("取消删除")
            }), !1
        }), e(".showIgnored").click(function() {
            return e(".ignored").each(function() {
                e(this).toggle()
            }), !1
        }), e("#questionOpen, #questionHide, #questionShow, #questionPublish, #questionPush, #questionUnpush").click(function() {
            e.sfAjax(e(this), function() {
                location.reload()
            })
        }), e("#questionSite").click(function() {
            var t;
            t = e(this).data("id"), s({
                title: "推送到子站",
                content: '<label class="required">请选择子站:</label><ul id="siteList" class="list-inline mb0"></ul>',
                show: function() {
                    e.getJSON("/api/sites", function(t) {
                        var n, i;
                        i = '<li><a href="javascript:void(0);" class="btn btn-default btn-sm mb10" data-id="{{ id }}"><img class="avatar-16 mr5" src="{{ thumbnailUrl }}">{{ name }}</a></li>', n = "", t.data.forEach(function(e) {
                            n += d(i, e)
                        }), e("#siteList").html(n), e("#siteList .btn").click(function() {
                            e("#siteList .btn").removeClass("active btn-success"), e(this).addClass("active btn-success")
                        })
                    })
                },
                doneFn: function() {
                    var n;
                    n = e("#siteList .active").data("id"), e.post("/api/question/" + t + "/site/" + n, function(e) {
                        0 === e.status && location.reload()
                    }, "json")
                }
            })
        }), e("#draftId").val() && (e("body,html").animate({
            scrollTop: e("#draftId").siblings("h4").offset().top
        }), e("#answerEditor").click()), T = '<form class="invite-popup" autocomplete="off" id="question">                        <div style="position: relative;">                            <ul class="nav nav-tabs">                              <li class="active"><a data-by="username" href="#by-username" data-toggle="tab">站内邀请</a></li>                              <li><a data-by="email" href="#by-email" data-toggle="tab">Email 邀请</a></li>                              <li><a data-by="weibo" href="#by-weibo" data-toggle="tab">新浪微博邀请</a></li>                            </ul>                            <br>                            <div class="tab-content">                              <div class="tab-pane active" id="by-username" data-type="username">                                  <div class="search-user p">                                      <input id="atInput" class="text-28 form-control" type="text" name="slug" autocomplete="off" placeholder="输入对方用户名" />                                  </div>                                  <p class="help-block">您可以邀请站内用户来解答问题<br />有针对性的邀请才能提高问题解决效率</p>                              </div>                              <div class="tab-pane" id="by-email" data-type="email">                                  <div class="mb10"><input class="text-28 form-control" type="email" name="mail" placeholder="Email 地址" /></div>                                  <p><textarea class="textarea-13 form-control share-content" rows="5"></textarea></p>                              </div>                              <div class="tab-pane" id="by-weibo" data-type="weibo">                                    <div class="input-group mb10"><span class="input-group-addon">@</span><input type="text" class="text-28 form-control" placeholder="微博用户名"></div>                                    <p><textarea class="textarea-13 form-control share-content" rows="5"></textarea></p>                              </div>                            </div>                        </div>                    </form>', e(".inviteBtn").click(function() {
            var t, n;
            return t = e(this), n = e(this).data("id"), s({
                title: "邀请",
                content: T,
                show: function() {
                    e(".share-content").each(function() {
                        e(this).val("我在 @SegmentFault 上遇到了问题「" + t.data("title") + "」 → " + t.data("url") + "，希望您能帮我解答 ")
                    }), e(".modal-content").css("overflow", "initial"), e("#atInput").typeHelper({
                        remoteData: function(t, n) {
                            e.get("/api/users/search", {
                                q: t
                            }, function(e) {
                                e.status || n(e.data)
                            }, "json")
                        },
                        tpl: '<li><a href="#" data-value="${slug}">{{if avatarUrl}}<img class="avatar-24 mr10" src="${avatarUrl}">${name}&nbsp;<small>@${slug}</small>{{/if}}</a></li>'
                    }), e("#atInput").focus()
                },
                doneFn: function() {
                    var t, i, a, r, o, l;
                    switch (i = e(".tab-pane.active").data("type"), t = e(".invite-popup"), i) {
                        case "username":
                            return l = e("#atInput").val(), e.post("/api/question/" + n + "/invite/user", {
                                slug: e.trim(l)
                            }, function(e) {
                                0 === e.status ? window.location.reload() : s(JSON.stringify(e.data[1]))
                            });
                        case "email":
                            return a = e("#by-email input.text-28", t).val(), r = e("#by-email textarea.textarea-13", t).val(), e.post("/api/question/" + n + "/invite/mail", {
                                mail: a,
                                text: r
                            }, function(e) {
                                0 === e.status && window.location.reload()
                            });
                        case "weibo":
                            return r = e("#by-weibo textarea.textarea-13", t).val(), o = e("#by-weibo input.text-28").val(), o = "" === o ? "" : " @" + o, window.open("http://service.weibo.com/share/share.php?title=" + r + o + "&appkey=1742025894", "_blank")
                    }
                }
            }), !1
        }), C = e(".widget-share").data("text"), k = "", e(".tagPopup .tag").each(function() {
            var t;
            t = e(this).data("img"), t && (k = t)
        }), k || (k = "http://tp1.sinaimg.cn/2036070420/180/40003289296/0"), w = e(".question.fmt").text().trim().replace(/\s+/g, " "), w = w.slice(0, 40), new l(".widget-share", {
            image: k,
            text: "【" + C + "】分享自 @SegmentFault，问题传送门：",
            title: "【" + C + "】分享自 @SegmentFault，问题传送门：",
            networks: {
                renren: {
                    title: C + " - SegmentFault",
                    description: w + "... ",
                    comment: ""
                },
                douban: {
                    title: C + " - SegmentFault",
                    description: w + "... ",
                    comment: ""
                },
                twitter: {
                    text: "【" + C + "】分享自 @segment_fault，问题传送门：",
                    title: "【" + C + "】分享自 @segment_fault，问题传送门："
                }
            }
        }), e(".tagPopup").hoverIntent(function() {
            var t;
            t = e(this).find(".tag"), e(".tag").tagPopup("hide"), t.tagPopup("show")
        }, function() {
            var t;
            t = e(this).find(".tag"), t.tagPopup("hide")
        }), u(e(".main")), c(), e("#questionLoginMore").click(function(e) {
            e.preventDefault(), p.login()
        }), e("#delete-modal").on("show.bs.modal", function(t) {
            var n, i, a, r;
            r = e(x).data("type"), i = e(x).data("do"), a = e(x).data("isauthor"), n = e("#delete-modal .btw"), n.hide(), e(".radio-del input[type=radio]").change(function() {
                e(".radio-del.btwRadio input").prop("checked") ? n.show() : n.hide()
            }), e(".radio-del").hide(), e(".radio-del.all, ." + r + "-" + i + "-only").show(), a && (n.siblings().hide(), n.show(), n.find(".mt20").hide())
        }), e("#submit-delete").click(function() {
            var t, n;
            return n = e(this), (t = e("#deleteDesc").val() || e(".radio-del input:checked").val()) ? (e(this).attr("disabled", "disabled"), void e.post("/api/" + e(x).data("type") + "/" + e(x).data("id") + "/" + e(x).data("do"), {
                reason: t
            }, function(e) {
                n.removeAttr("disabled"), 0 === e.status && location.reload()
            }, "json")) : (e(".btw").addClass("has-error"), void e("#deleteDesc").after('<p class="help-block">请填写理由</p>'))
        }), e("#directReport").click(function() {
            var t;
            t = e(this).data("id"), s({
                title: "与已有问题重复",
                content: '<form><div class="form-group"><input class="form-control" name="redirectId" type="text" id="directId" placeholder="已有问题的 URL 或 ID" autofocus="true" /></div></form>',
                show: function() {
                    e("#directId").bind("input", function() {
                        var t;
                        t = e("#directId").val().replace(/[^\d]/g, ""), e.get("/api/question/" + t, function(t) {
                            !t.status && t.data ? (e("#directId").hide().after('<p><a class="btn btn-default" href="' + t.data.url + '" target="_blank">' + t.data.title + '</a><a href="javascript:void(0);" class="i-cancel ml10 delete-result">×</a></p>'), e(".delete-result").click(function() {
                                e(this).parent("p").remove(), e("#directId").val("").show().focus()
                            })) : e(this).parent("p").remove()
                        })
                    })
                },
                doneFn: function() {
                    var n;
                    n = e("#directId").val().replace(/[^\d]/g, ""), e.post("/api/question/" + t + "/redirect", {
                        redirectId: n
                    }, function(e) {
                        console.log(e), e.status || location.reload()
                    })
                }
            })
        }), S = void 0, h = e(".dont-likeweibo"), h.click(function(t) {
            e.cookie("dontlikeShare", !0, {
                path: "/"
            })
        }), "true" === e.cookie("shareQuestionToWeibo") && (S = "http://service.weibo.com/share/share.php?url=" + window.location + "&title=我在 @SegmentFault 提问了【" + e("#questionTitle").text() + "】，传送门：&appkey=1742025894", e("#shareToWeiboModal").find("#shareLink").attr("href", S), e("#shareToWeiboModal").modal("show"), e.removeCookie("shareQuestionToWeibo", {
            path: "/"
        })), "true" === e.cookie("shareAnswerToWeibo") && (S = "http://service.weibo.com/share/share.php?url=" + window.location + "/" + e(".widget-answers__item").last().attr("id") + "?utm_source=Weibo&title=我在 @SegmentFault 回答了【" + e("#questionTitle").text() + "】，传送门：&appkey=1742025894", e("#shareToWeiboModal").find("#shareLink").attr("href", S), e("#shareToWeiboModal").modal("show"), e.removeCookie("shareAnswerToWeibo", {
            path: "/"
        })), e("#reloadCaptcha").click(function() {
            e(this).find("img").attr("src", "/user/captcha?w=178&h=35")
        }), y = e("#mail").val(), e("#user").submit(function(t) {
            var n, i, a, r, o, s;
            t.preventDefault(), n = e(this), i = n.find("input").not("input[disabled]"), r = i.index(e("input:focus")), o = i.slice(r + 1), a = !1, o.length && o.each(function() {
                var t, n;
                return n = e(this).attr("type"), t = ["text", "email", "password", "url"], e(this).val() || -1 === t.indexOf(n) ? void 0 : (e(this).focus(), a = !0, !1)
            }), a || (n.find("button[type=submit]").attr("disabled", "disabled"), y = e("input[name=mail]").val(), s = {
                mail: y,
                name: e("input[name=name]").val(),
                password: e("input[name=password]").val(),
                captcha: e("#captcha").val(),
                ref: e("input[name=ref]").val()
            }, e.post("/api/user/register", s, function(t) {
                n.find("button[type=submit]").removeAttr("disabled"), 0 === t.status ? location.reload() : (e("#captcha").val(""), e("#reloadCaptcha img").attr("src", "/user/captcha?w=178&h=35"), t.data[1].captcha && (e("#captcha").removeAttr("disabled"), e("#captcha").parents(".captcha-part").show()))
            }))
        })
    }), define("qa_question", function() {});
