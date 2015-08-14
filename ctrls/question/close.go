package question

import (
	"strconv"

	"github.com/wcreate/lawoto/models"
)

type CloseQuestionController struct {
	QuestionController
}

func (self *CloseQuestionController) Get() {
	qid, uid, role := self.GetParams()
	if qid == -1 {
		return
	}

	q := &models.Question{Id: qid}
	if err := q.SetCtype(uid, role, models.QClose); err == nil {
		self.Redirect("/q/"+strconv.Itoa(int(qid))+"/", 302)
	} else {
		self.Redirect("/", 302)
	}
}
