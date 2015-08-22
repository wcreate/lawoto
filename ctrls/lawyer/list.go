package lawyer

import "github.com/wcreate/lawoto/ctrls"

type LawyerListController struct {
	ctrls.BaseController
}

func (self *LawyerListController) Get() {
	self.TplNames = "l/list.html"

	self.LayoutSections["Heads"] = "l/head.html"
	self.LayoutSections["Scripts"] = "l/scripts.html"
}
