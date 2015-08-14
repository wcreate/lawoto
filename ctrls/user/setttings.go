package user

type SettingsController struct {
	UserController
}

func (self *SettingsController) Get() {
	self.TplNames = "u/settings.html"
}

func (self *SettingsController) Post() {
	self.TplNames = "u/settings.html"

	// flash := beego.NewFlash()
	// inputUser : = &models.User{}
	// valid := validation.Validation{}

	// username := strings.ToLower(self.GetString("username"))
	// gender := strings.ToLower(self.GetString("username"))
}
