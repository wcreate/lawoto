package user

import (
	//"fmt"
	"time"

	"github.com/astaxie/beego"
	"github.com/wcreate/lawoto/ctrls"
	"github.com/wcreate/lawoto/models"
	"github.com/wcreate/lawoto/utils"
)

type SigninController struct {
	ctrls.BaseController
}

func (self *SigninController) Get() {
	remember, ckerr := self.Ctx.Request.Cookie("remember")

	// signbar的值为 0则关闭提示栏  1则显示提示栏
	self.Ctx.SetCookie("signbar", SignBarClose, 31536000, "/")
	self.Ctx.SetCookie("remember", RememberOn, 31536000, "/")

	if self.Username != "" {
		self.Redirect("/", 302) //如果已登录
	}

	// 如果未登录
	if ckerr == nil {
		if remember.Value == RememberOn {
			self.Data["remember"] = RememberOn
		} else {
			self.Data["remember"] = nil
		}
	}
	self.setTemplate()
}

func (self *SigninController) setTemplate() {
	self.TplNames = "u/signin.html"
	self.LayoutSections["Heads"] = "u/sign-head.html"
	self.LayoutSections["Scripts"] = "u/sign-scripts.html"
}

func (self *SigninController) Post() {
	self.setTemplate()

	flash := beego.NewFlash()
	email := self.GetString("email")
	password := self.GetString("password")
	remember := self.GetString("remember")

	u := new(models.User)
	u.Email = email
	u.Password = password

	if err := u.Read("Email"); err != nil {
		flash.Error("该账号不存在~")
		flash.Store(&self.Controller)
		return
	}

	if utils.HmacSha256(password, u.Salt) != u.Password {
		flash.Error("密码无法通过校验~")
		flash.Store(&self.Controller)
		return
	}

	u.LastLoginTime = time.Now()
	u.LoginCount = u.LoginCount + 1
	u.LastLoginIp = self.GetClientIP()
	u.Update("LastLoginTime", "LoginCount")

	// 登录成功设置session
	self.SetSession("userid", u.Id)
	self.SetSession("username", u.Username)
	self.SetSession("userrole", u.Role)
	self.SetSession("useremail", u.Email)
	self.SetSession("usercontent", u.Content)
	self.SetSession("useravatar", u.Avatar)

	// 设置cookie

	// 设置提示栏cookie标记
	self.Ctx.SetCookie("signbar", SignBarClose, 31536000, "/")
	if remember == RememberOn {
		self.Ctx.SetCookie("remember", RememberOn, 31536000, "/")
	} else {
		self.Ctx.SetCookie("remember", RememberOff, 31536000, "/")
	}
	self.Redirect("/", 302)
}
