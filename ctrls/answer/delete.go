package answer

import (
	"strconv"

	"github.com/wcreate/lawoto/models"
)

type DeleteAnswerController struct {
	AnswerController
}

func (self *DeleteAnswerController) Get() {
	aid, qid, uid, role := self.GetParams()
	if aid == -1 {
		return
	}

	r := &models.Reply{Id: aid}
	if r.DeleteBeforeCheck(uid, role) != nil {
		self.Redirect("/", 302)
		return
	}

	if affected, _ := models.SetQuestionReplyCount(qid); affected != 0 {
		self.Redirect("/q/"+strconv.Itoa(int(qid))+"/", 302)
		return
	}

	self.Redirect("/", 302)
}
