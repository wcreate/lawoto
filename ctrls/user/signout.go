package user

import (
	"strconv"
	"time"

	"github.com/wcreate/lawoto/ctrls"
)

type SignoutController struct {
	ctrls.BaseController
}

func (self *SignoutController) Get() {
	// 强制写空 避免被nginx缓存导致无法退出
	self.SetSession("userid", nil)
	self.SetSession("username", nil)
	self.SetSession("userrole", nil)
	self.SetSession("useremail", nil)
	self.SetSession("usercontent", nil)

	// GET状态退出，销毁session
	self.DelSession("userid")
	self.DelSession("username")
	self.DelSession("userrole")
	self.DelSession("useremail")
	self.DelSession("usercontent")

	// signbar的值为 0则关闭提示栏  1则显示提示栏
	self.Ctx.SetCookie("signbar", SignBarOpen, 31536000, "/")
	self.Ctx.SetCookie("remember", RememberOff, 31536000, "/")

	self.Redirect("/?ver="+strconv.Itoa(int(time.Now().UnixNano())), 302)
}
