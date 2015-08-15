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


function temp(template, data) {
    var str = template || '';
    // Convert the template into string
    $.each(data, function(key, val) {
        var _type = typeof val,
            re = new RegExp('{{\\s*' + key + '\\s*}}', 'g');
        if (_type === 'object' && val !== null) {
            $.each(val, function(k, v) {
                var r = new RegExp('{{\\s*' + key + '.' + k + '\\s*}}', 'g');
                str = str.replace(r, v);
            });
        } else {
            str = str.replace(re, val);
        }
    });
    return str;
};

function sfModal(option) {
    if (typeof option !== 'object') {
        if (option === 'hide') {
            $('.sfmodal').modal('hide');
            return;
        } else if (option === 'toggle') {
            $('.sfmodal').modal('toggle');
            return;
        } else {
            option = {
                content: option,
                hideDone: true,
            };
        }
    }

    var OPT = $.extend({
        hideTitle: false,
        title: '警告：前方高能！',
        content: '玩脱了',
        wrapper: null, //编辑器全屏时不能显示modal
        $content: null,
        hideClose: false,
        closeText: '取消',
        // closeFn : function() {},
        hideDone: false,
        doneText: '确认',
        doneFn: function() {
            $('.sfmodal').modal('hide');
        },
        show: function() {},
        // 不明原因shown不触发
        shown: function() {},
        hide: function() {},
        hidden: function() {},
        loaded: function() {}
    }, option);

    var dom = '<div class="sfmodal modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">\
  <div class="modal-dialog">\
    <div class="modal-content">\
      ' + (OPT.hideTitle ? '' : '<div class="modal-header">\
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\
        <h4 class="modal-title">{{title}}</h4>\
      </div>') + '<div class="modal-body">\
        <p class="sfModal-content">\
          </div>\
          <div class="modal-footer">' + (OPT.hideClose ? '' : '<button type="button" class="btn btn-default" data-dismiss="modal">{{closeText}}</button>') + (OPT.hideDone ? '' : '<button type="button" class="btn btn-primary done-btn">{{doneText}}</button>') + '</div>\
        </div>\
      </div>\
    </div>';

    // 删掉已经存在的modal
    if ($('.sfmodal').length > 0) {
        $('.sfmodal').remove();
        $('.modal-backdrop').remove();
    }
    // 有$wrap时插到$wrap里面
    if (OPT.wrapper) {
        $(OPT.wrapper).append(temp(dom, OPT));
        $(OPT.wrapper).append('<div class="modal-backdrop in"></div>');
    } else {
        $('body').append(temp(dom, OPT));
    }
    if (OPT.$content) { // 优先使用$content
        $('.sfmodal .sfModal-content').append(OPT.$content);
    } else {
        $('.sfmodal .sfModal-content').html(OPT.content);
    }
    $('.sfmodal').modal({
        keyboard: true
    });
    $('.sfmodal')
        .on('show.bs.modal', OPT.show)
        .on('shown.bs.modal', OPT.shown)
        .on('hide.bs.modal', function(e) {
            OPT.hide(e);
            if (OPT.wrapper) {
                $('.modal-backdrop').remove();
            }
        })
        .on('hidden.bs.modal', OPT.hidden)
        .on('loaded.bs.modal', OPT.loaded)
        .modal('show'); // 一定要先绑事件，然后再show
    $('.sfmodal .done-btn').click(function(e) {
        OPT.doneFn(e);
        if (OPT.wrapper) {
            $('.modal-backdrop').remove();
        }
    });
};


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
