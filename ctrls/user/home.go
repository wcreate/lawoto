package user

import (
	"github.com/astaxie/beego/orm"
	"github.com/wcreate/lawoto/ctrls"
	"github.com/wcreate/lawoto/models"
)

type HomeController struct {
	ctrls.BaseController
}

func (self *HomeController) Get() {

	self.TplNames = "u/home.html"

	self.LayoutSections["Heads"] = "u/user-head.html"
	self.LayoutSections["Scripts"] = ""

	username := self.GetString(":name")
	u := new(models.User)
	u.Username = username

	// not exist the user
	if err := u.Read("Username"); err == orm.ErrNoRows {
		self.Redirect("/", 404)
		return
	}

	self.Data["u"] = *u
	self.Data["me"] = false

	// the login name is self
	if self.Username == username {
		self.Data["me"] = true
	}

}
