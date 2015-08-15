package user

import (
	"github.com/astaxie/beego/orm"
	"github.com/wcreate/lawoto/ctrls"
	"github.com/wcreate/lawoto/models"
)

type UserController struct {
	ctrls.AuthController

	U *models.User
}

func (self *UserController) Prepare() {
	self.AuthController.Prepare()

	self.setTemplate()
	self.U = &models.User{Id: self.Uid}

	// not logoin
	if err := self.U.Read(); err == orm.ErrNoRows {
		self.Redirect("/u/signin", 302)
		return
	}

	self.Data["u"] = *self.U
}

func (self *UserController) setTemplate() {
	self.LayoutSections["Heads"] = "u/user-head.html"
	self.LayoutSections["Scripts"] = "u/user-scripts.html"
}
