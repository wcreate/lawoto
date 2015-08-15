package question

import (
	"github.com/astaxie/beego/orm"
	"github.com/wcreate/lawoto/ctrls"
	"github.com/wcreate/lawoto/models"
)

type QuestionListController struct {
	ctrls.BaseController
}

func (self *QuestionListController) Get() {
	self.TplNames = "q/list.html"

	self.LayoutSections["Heads"] = "q/head.html"
	self.LayoutSections["Scripts"] = "q/scripts.html"

	qid, _ := self.GetInt64(":qid")

	if qid <= 0 {
		self.Redirect("/", 302)
		return
	}

	qs := &models.Question{Id: qid}
	if err := qs.Read(); err != orm.ErrNoRows {
		qs.Views = qs.Views + 1
		qs.Update("Views")

		self.Data["avatar"] = models.GetAvatar(qs.Uid)
		self.Data["q"] = *qs
		self.Data["replys"] = *models.GetReplysByPid(qid, 0, 0, 0, "hotness")
	} else {
		self.Redirect("/", 302)
	}

}
