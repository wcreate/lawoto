package setting

import (
	"github.com/astaxie/beego/cache"
	"github.com/astaxie/beego/logs"
	"github.com/astaxie/beego/utils/captcha"
)

const (
	Version = "0.0.1"

	Default_Avatar = "/static/oto/img/davatar.jpg"
)

var (
	Log *logs.BeeLogger
	Cpt *captcha.Captcha
)

func init() {
	Log = logs.NewLogger(1000)
	Log.Async()
	Log.SetLogger("console", `{"level":1}`)

	// 较简单的校验码
	store := cache.NewMemoryCache()
	Cpt = captcha.NewWithFilter("/captcha/", store)
}
