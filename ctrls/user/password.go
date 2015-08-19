package user

import (
	"strconv"
	"time"

	"github.com/astaxie/beego"
	"github.com/wcreate/lawoto/utils"
)

type PasswordController struct {
	UserController
}

func (self *PasswordController) Get() {
	self.TplNames = "u/modify-password.html"

	flash := beego.NewFlash()
	if msg := self.GetString("msg"); msg != "" {
		flash.Notice("密码修改成功!")
		flash.Store(&self.Controller)
	}
}

func (self *PasswordController) Post() {
	self.TplNames = "u/modify-password.html"

	flash := beego.NewFlash()
	password := self.GetString("password")

	newpassword := self.GetString("newPassword")
	repassword := self.GetString("confirmPassword")

	if newpassword != repassword {
		flash.Error("两次密码不匹配!")
		flash.Store(&self.Controller)
		return
	}

	if utils.HmacSha256(password, self.U.Salt) != self.U.Password {
		flash.Error("密码无法通过校验!")
		flash.Store(&self.Controller)
		return
	}

	salt := utils.GetSalt(8)
	pwd := utils.HmacSha256(newpassword, salt)

	self.U.Salt = salt
	self.U.Password = pwd
	self.U.Updated = time.Now()

	if row, _ := self.U.Update("Salt", "Password", "Updated"); row != 1 {
		flash.Error("用户信息更新到数据库时发生错误!")
		flash.Store(&self.Controller)
		return
	}

	self.Redirect("/u/settings/password?msg=sucess&ver="+strconv.Itoa(int(time.Now().UnixNano())), 302)
}
