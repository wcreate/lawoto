$("#avatarBtn").click(function() {
    $("#avatarFile").trigger("click")
});

function cropUpload(a) {
    var i, s;
    a = $.extend({
        selector: null,
        url: null,
        maxSize: 2e8,
        button: null,
        title: null,
        name: "file",
        uploadChange: function() {},
        startUpload: function() {},
        completeUpload: function() {},
        uploadError: function() {},
        fallback: function() {},
        maxWidth: 3e3,
        maxHeight: 3e3,
        minWidth: 25,
        minHeight: 25
    }, a);

    s = $(a.selector);
    i = null;

    if ($.imageUploadSupported || $.imageUploadAsBase64Supported) {
        s.fileUpload({
            fileType: /^(gif|jpe?g|png|tiff?)$/i,
            fileMaxSize: a.maxSize,
            type: "POST",
            url: a.url,
            allowDataInBase64: !0,
            dataType: "json",
            fileError: a.uploadError,
            beforeSend: a.startUpload,
            success: a.completeUpload,
            resizeImage: function(t, h, c) {
                var o, m, r, l;
                r = void 0;
                o = void 0;
                if (t.width > a.maxWidth || t.height > a.maxHeight) {
                    sfModal("图片太大了！");
                    return
                }

                if (t.width < a.minWidth || t.height < a.minHeight) {
                    sfModal("图片太小了！");
                    return
                }

                if (t.width > t.height) {
                    l = Math.min(Math.max(t.width, a.minWidth), a.maxWidth);
                    $(t).css({
                        width: l,
                        height: t.height * l / t.width
                    });
                } else {
                    m = Math.min(Math.max(t.height, a.minHeight), a.maxHeight);
                    $(t).css({
                        width: t.width * m / t.height,
                        height: m
                    });
                }

                sfModal({
                    content: "",
                    $content: $(t),
                    title: a.title,
                    doneText: a.button,
                    auto: !0,
                    show: function() {
                        var n;
                        $(".modal-dialog").addClass("modal-lg");
                        r = $(t).innerWidth();
                        o = $(t).innerHeight();
                        n = parseInt(2 * Math.min(r, o) / 3);
                        i = $.Jcrop($(t), {
                            aspectRatio: 1,
                            bgColor: "white",
                            bgOpacity: .4,
                            setSelect: [parseInt((r - n) / 2), parseInt((o - n) / 2), parseInt((r + n) / 2), parseInt((o + n) / 2)]
                        })
                    },
                    doneFn: function() {
                        var e, a, s;
                        a = i.tellSelect();
                        s = t.width / r;
                        h = document.createElement("canvas");
                        l = a.w > 0 ? parseInt(a.w * s) : t.width;
                        m = a.h > 0 ? parseInt(a.h * s) : t.height;
                        h.width = l;
                        h.height = m;
                        e = h.getContext("2d");
                        e.drawImage(t, a.x !== a.x2 ? parseInt(a.x * s) : 0, a.y !== a.y2 ? parseInt(a.y * s) : 0, l, m, 0, 0, l, m);
                        c(h);
                        sfModal("hide");
                    },
                    hidden: function() {
                        s.val("")
                    }
                })
            }
        })
    } else {
        a.fallback(), s.fileUpload({
            url: a.url,
            onChange: a.uploadChange,
            onUpload: a.startUpload,
            onComplete: a.completeUpload
        });
    }
};

(function() {
    s = $(".change-avatar");
    t = void 0;
    m = void 0;
    c = $('<div class="change-avatar loading hidden">上传中</div>').insertAfter(s);
    cropUpload({
        selector: "#avatarFile",
        url: "/upload/avatar",
        button: "上传头像",
        title: "请选择合适的区域作为头像",
        fallback: function() {
            var n;
            n = $('<div class="change-avatar hidden"><a href="#" class="btn-m">上传</a> &nbsp; <a href="#" class="cancel">取消</a></div>').insertAfter(s);
            $("a.cancel", n).click(function() {
                return $(".session-aside .file").val(""), n.addClass("hidden"), s.removeClass("hidden"), !1
            });
            $("a.btn-m", n).click(function() {
                m && m()
            })
        },
        uploadChange: function(n) {
            var a;
            a = $(this).val();
            a.length > 0 && (t.removeClass("hidden"), s.addClass("hidden")), m = n
        },
        startUpload: function() {
            t ? t.addClass("hidden") : s.addClass("hidden"), c.removeClass("hidden")
        },
        completeUpload: function(n) {
            s.removeClass("hidden");
            c.addClass("hidden");
            console.log(n);
            n.status ? sfModal({
                content: "<p>" + n.data + "</p>",
                title: "上传出现错误"
            }) : $("img.avatar-128").attr("src", n[1])
        },
        uploadError: function() {
            sfModals({
                title: "上传出现错误",
                content: "<p>请选择一张正确的图片上传, 图片尺寸不要超过 2 MB</p>"
            })
        }
    });
})()
