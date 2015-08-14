package question

import (
	"strconv"

	"github.com/astaxie/beego/orm"
	"github.com/wcreate/lawoto/ctrls"
	"github.com/wcreate/lawoto/models"
)

type ViewQuestionController struct {
	ctrls.BaseController
}

func (self *ViewQuestionController) Get() {
	id, _ := self.GetInt64(":id")

	if id <= 0 {
		self.Ctx.Output.Context.WriteString("0")
		return
	}

	qs := &models.Question{Id: id}
	if err := qs.ReadOneOnly("Views"); err != orm.ErrNoRows {
		qs.Views = qs.Views + 1
		qs.Update("Views")
		self.Ctx.Output.Context.WriteString(strconv.Itoa(int(qs.Views)))
		return
	}

	self.Ctx.Output.Context.WriteString("0")
}
