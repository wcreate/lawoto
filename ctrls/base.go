package ctrls

import (
	"html/template"
	"runtime"
	"strings"

	"github.com/astaxie/beego"
	"github.com/wcreate/lawoto/utils"
)

type BaseController struct {
	beego.Controller
	Username string
	Uid      int64
	Role     int64
	Email    string
}

type AuthController struct {
	BaseController
}

type ApiController struct {
	BaseController
}

type RootController struct {
	BaseController
}

//用户等级划分：正数是普通用户，负数是管理员各种等级划分，为0则尚未注册
func (self *BaseController) Prepare() {

	self.Data["xsrfdata"] = template.HTML(self.XsrfFormHtml())
	self.Data["xsrf_token"] = self.XsrfToken()

	// 从session里读出登录信息
	self.Uid, _ = self.GetSession("userid").(int64)

	self.Username, _ = self.GetSession("username").(string)

	self.Role, _ = self.GetSession("userrole").(int64)
	self.Email, _ = self.GetSession("useremail").(string)
	usercontent, _ := self.GetSession("usercontent").(string)
	useravatar, _ := self.GetSession("useravatar").(string)

	// 把登录信息写入模板容器
	self.Data["userid"] = self.Uid
	self.Data["username"] = self.Username
	self.Data["userrole"] = self.Role
	self.Data["useremail"] = self.Email
	self.Data["usercontent"] = usercontent
	self.Data["useravatar"] = useravatar

	self.Layout = "layout.html"
	self.LayoutSections = make(map[string]string)
}

// Get the client remote ip
func (self *BaseController) GetClientIP() string {
	addr := self.Ctx.Request.RemoteAddr
	ipport := strings.Split(addr, ":")
	if len(ipport) == 2 {
		return ipport[0]
	}
	return addr
}

// 会员或管理员前台权限认证
func (self *AuthController) Prepare() {
	self.BaseController.Prepare()

	if self.Uid <= 0 {
		self.Redirect("/u/signin/", 302)
		return
	}
}

// API权限认证
func (self *ApiController) Prepare() {
	self.BaseController.Prepare()

	// 返回401未认证状态终止服务
	if self.Uid <= 0 {
		self.Abort("401")
	}
}

//管理员后台后台认证
func (self *RootController) Prepare() {
	self.BaseController.Prepare()

	if !utils.IsSpider(self.Ctx.Request.UserAgent()) {
		if self.Data["userrole"] != -1000 {
			self.Redirect("/u/signin/", 302)
		} else {
			self.Data["remoteproto"] = self.Ctx.Request.Proto
			self.Data["remotehost"] = self.Ctx.Request.Host
			self.Data["remoteos"] = runtime.GOOS
			self.Data["remotearch"] = runtime.GOARCH
			self.Data["remotecpus"] = runtime.NumCPU()
			self.Data["golangver"] = runtime.Version()
		}
	} else {
		self.Redirect("/", 302)
	}
}
