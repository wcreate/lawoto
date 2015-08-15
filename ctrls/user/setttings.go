package user

import (
	"fmt"
	"html/template"
	"strings"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/validation"
	"github.com/wcreate/lawoto/models"
)

type SettingsController struct {
	UserController
}

func (self *SettingsController) Get() {
	self.TplNames = "u/settings.html"

	flash := beego.NewFlash()
	if msg := self.GetString("msg"); msg != "" {
		flash.Notice("更新成功!")
		flash.Store(&self.Controller)
	}
}

func (self *SettingsController) Post() {
	self.TplNames = "u/settings.html"

	flash := beego.NewFlash()
	inputUser := &models.User{}
	inputUser.Valid = validation.Validation{}

	if err := self.ParseForm(inputUser); err != nil {
		flash.Error("非法请求提交~", fmt.Sprint(err))
		flash.Store(&self.Controller)
		return
	}

	inputUser.Username = strings.ToLower(inputUser.Username)
	if inputUser.Username != self.Username { // changed the username, should validate it
		inputUser.ValidateUserName()
	}
	inputUser.ValidateMobile()
	if inputUser.Valid.HasErrors() {
		// validation does not pass
		var errMsg string = ""
		for _, err := range inputUser.Valid.Errors {
			errMsg += err.Message
		}
		flash.Error(errMsg)
		flash.Store(&self.Controller)
		return
	}

	// content forbid input html to void attack.
	inputUser.Content = template.HTMLEscapeString(strings.TrimSpace(inputUser.Content))
	inputUser.Id = self.Uid
	inputUser.Updated = time.Now()

	if row, err := inputUser.Update("Username", "Content", "Updated",
		"City", "Company", "Address",
		"Mobile", "Website", "Gender"); row == 1 {

		self.Username = inputUser.Username
		self.Data["username"] = self.Username
		self.Data["usercontent"] = inputUser.Content
		self.Redirect("/u/settings/?msg=更新成功!", 302)
		return
	} else {
		flash.Error("更新问题出现错误:", fmt.Sprint(err))
		flash.Store(&self.Controller)
		return
	}
}
