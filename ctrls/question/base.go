package question

import "github.com/wcreate/lawoto/ctrls"

type QuestionController struct {
	ctrls.AuthController
}

func (self *QuestionController) GetParams() (int64, int64, int64) {
	qid, _ := self.GetInt64(":qid")
	uid, _ := self.GetSession("userid").(int64)
	role, _ := self.GetSession("userrole").(int64)

	if !(qid > 0 && uid > 0) {
		self.Redirect("/", 302)
		return -1, -1, -1
	}
	return qid, uid, role
}
