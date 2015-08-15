package user

import (
	//"fmt"

	"strings"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/validation"
	"github.com/wcreate/lawoto/ctrls"
	"github.com/wcreate/lawoto/models"
	"github.com/wcreate/lawoto/setting"
	"github.com/wcreate/lawoto/utils"
)

const (
	// signbar的值为 0则关闭提示栏  1则显示提示栏
	SignBarClose = "0"
	SignBarOpen  = "1"
)

const (
	RememberOn  = "on"
	RememberOff = "off"
)

type SignupController struct {
	ctrls.BaseController
}

func (self *SignupController) Get() {
	self.setTemplate()

	//signbar的值为 0则关闭提示栏  1则显示提示栏
	self.Ctx.SetCookie("signbar", "0", 31536000, "/")
}

func (self *SignupController) setTemplate() {
	self.TplNames = "u/signup.html"
	self.LayoutSections["Heads"] = "u/sign-head.html"
	self.LayoutSections["Scripts"] = "u/sign-scripts.html"
}

func (self *SignupController) Post() {

	self.setTemplate()

	flash := beego.NewFlash()
	email := strings.TrimSpace(strings.ToLower(self.GetString("email")))
	username := strings.ToLower(self.GetString("username"))
	password := self.GetString("password")
	repassword := self.GetString("repassword")

	u := new(models.User)
	u.Email = email
	u.Username = username
	u.Password = password
	u.Valid = validation.Validation{}

	u.ValidateUserName().ValidateEmail().ValidatePassword()
	if u.Valid.HasErrors() {
		// validation does not pass
		var errMsg string = ""
		for _, err := range u.Valid.Errors {
			errMsg += err.Message
		}
		flash.Error(errMsg)
		flash.Store(&self.Controller)
		return
	}

	if password != repassword {
		flash.Error("两次密码不匹配~")
		flash.Store(&self.Controller)
		return
	}

	if !setting.Cpt.VerifyReq(self.Ctx.Request) {
		flash.Error("验证码不正确~")
		flash.Store(&self.Controller)
		return
	}

	salt := utils.GetSalt(8)
	pwd := utils.HmacSha256(password, salt)

	u.Salt = salt
	u.Password = pwd
	u.Role = 1
	u.Updated = time.Now()
	u.LastLoginTime = u.Updated
	u.Avatar = setting.Default_Avatar

	if err := u.Insert(); err != nil {
		flash.Error("用户注册信息写入数据库时发生错误~")
		flash.Store(&self.Controller)
		return
	}

	// 注册账号成功,以下自动登录并设置session
	self.SetSession("userid", u.Id)
	self.SetSession("username", u.Username)
	self.SetSession("userrole", u.Role)
	self.SetSession("useremail", u.Email)
	self.SetSession("usercontent", u.Content)

	// 设置cookie
	// 设置提示栏cookie标记
	self.Ctx.SetCookie("signbar", RememberOff, 31536000, "/")

	flash.Notice("账号登录成功~")
	flash.Store(&self.Controller)

	// session 写入后直接跳到首页
	self.Redirect("/u/signin", 302)

}
