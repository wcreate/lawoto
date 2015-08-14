package question

import (
	"strconv"

	"github.com/wcreate/lawoto/models"
)

type OpenQuestionController struct {
	QuestionController
}

func (self *OpenQuestionController) Get() {
	qid, uid, role := self.GetParams()
	if qid == -1 {
		return
	}

	q := &models.Question{Id: qid}
	if err := q.SetCtype(uid, role, models.Unanswered); err == nil {
		self.Redirect("/q/"+strconv.Itoa(int(qid))+"/", 302)
	} else {
		self.Redirect("/", 302)
	}

}
