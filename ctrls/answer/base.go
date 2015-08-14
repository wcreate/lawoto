package answer

import "github.com/wcreate/lawoto/ctrls"

type AnswerController struct {
	ctrls.AuthController
}

func (self *AnswerController) GetParams() (int64, int64, int64, int64) {
	aid, _ := self.GetInt64(":aid")
	qid, _ := self.GetInt64(":qid")
	uid, _ := self.GetSession("userid").(int64)
	role, _ := self.GetSession("userrole").(int64)

	if !(aid > 0 && qid > 0 && uid > 0) {
		self.Redirect("/", 302)
		return -1, -1, -1, -1
	}
	return aid, qid, uid, role
}
