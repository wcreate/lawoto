package setting

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/cache"
	"github.com/astaxie/beego/logs"
	"github.com/astaxie/beego/utils/captcha"
	"github.com/wcreate/lawoto/utils"
)

const (
	Version = "0.0.1"

	Default_Avatar = "/static/oto/img/davatar.jpg"
)

var (
	// 日志
	Log *logs.BeeLogger

	// 校验码
	Cpt *captcha.Captcha

	// Email config, it's used to send email to user
	EmailUser   string
	EmailPasswd string
	EmailHost   string //smtp.yeah.net:25
)

func init() {
	// read config from file
	EmailUser = beego.AppConfig.String("EmailUser")
	EmailPasswd = beego.AppConfig.String("EmailPasswd")
	if pwd, err := utils.AesDecrypt(EmailPasswd); err != nil {
		panic(err)
	} else {
		EmailPasswd = pwd
	}
	EmailHost = beego.AppConfig.String("EmailHost")

	Log = logs.NewLogger(1000)
	Log.Async()
	Log.SetLogger("console", "")

	// 较简单的校验码
	store := cache.NewMemoryCache()
	Cpt = captcha.NewWithFilter("/captcha/", store)

}
