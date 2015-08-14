package answer

import (
	"strconv"

	"github.com/wcreate/lawoto/models"
)

type IgnoreAnswerController struct {
	AnswerController
}

func (self *IgnoreAnswerController) Get() {
	aid, qid, uid, role := self.GetParams()
	if aid == -1 {
		return
	}

	if err := models.SetIgnoreAnswer(qid, aid, uid, role); err == nil {
		self.Redirect("/q/"+strconv.Itoa(int(qid))+"/", 302)
	} else {
		self.Redirect("/", 302)
	}

}
