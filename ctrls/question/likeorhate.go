package question

import (
	"fmt"
	"strconv"

	"github.com/astaxie/beego/orm"
	"github.com/wcreate/lawoto/ctrls"
	"github.com/wcreate/lawoto/models"
	"github.com/wcreate/lawoto/utils"
)

type LikeOrHateController struct {
	ctrls.BaseController
}

func (self *LikeOrHateController) Get() {
	if utils.IsSpider(self.Ctx.Request.UserAgent()) == true {
		self.Ctx.Output.SetStatus(401)
		return
	}

	name := self.GetString(":name")
	id, _ := self.GetInt64(":id")
	uid, _ := self.GetSession("userid").(int64)

	if models.IsQuestionMark(uid, id) {
		self.Ctx.Output.SetStatus(304)
		return
	} else {
		qs := &models.Question{Id: id}
		if err := qs.ReadOneOnly("Views", "ReplyCount", "Created", "ReplyTime", "Hotup", "Hotdown", "Hotscore", "Hotvote", "Hotness"); err == orm.ErrNoRows {
			return
		}

		if name == "hate" {
			qs.Hotdown = qs.Hotdown + 1
		} else if name == "like" {
			qs.Hotup = qs.Hotup + 1
		}

		qs.Hotscore = utils.Qhot_QScore(qs.Hotup, qs.Hotdown)
		qs.Hotvote = utils.Qhot_Vote(qs.Hotup, qs.Hotdown)
		qs.Hotness = utils.Qhot(qs.Views, qs.ReplyCount, qs.Hotscore, models.GetAScoresByPid(id), qs.Created, qs.ReplyTime)

		if _, err := qs.Update("Hotup", "Hotdown", "Hotscore", "Hotvote", "Hotness"); err != nil {
			fmt.Println("PutQuestion执行错误:", err)
		} else {
			models.SetQuestionMark(uid, id)
		}

		self.Ctx.WriteString(strconv.Itoa(int(qs.Hotscore)))
	}
}
