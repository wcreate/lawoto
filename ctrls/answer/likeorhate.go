package answer

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

	if models.IsAnswerMark(uid, id) {
		self.Ctx.Output.SetStatus(304)
		return
	} else {
		ans := &models.Reply{Id: id}
		if err := ans.ReadOneOnly("Views", "ReplyCount", "Created", "ReplyTime", "Hotup", "Hotdown", "Hotscore", "Hotvote", "Hotness"); err == orm.ErrNoRows {
			return
		}

		if name == "hate" {
			ans.Hotdown = ans.Hotdown + 1
		} else if name == "like" {
			ans.Hotup = ans.Hotup + 1
		}

		ans.Views = ans.Views + 1
		ans.Hotscore = utils.Qhot_AScore(ans.Hotup, ans.Hotdown)
		ans.Hotvote = utils.Qhot_Vote(ans.Hotup, ans.Hotdown)
		ans.Hotness = utils.Qhot(ans.Views, ans.ReplyCount, ans.Hotscore, ans.Views, ans.Created, ans.ReplyTime)

		if _, err := ans.Update("Hotup", "Hotdown", "Hotscore", "Hotvote", "Hotness"); err != nil {
			fmt.Println("PutQuestion执行错误:", err)
		} else {
			models.SetAnswerMark(uid, id)
		}

		self.Ctx.WriteString(strconv.Itoa(int(ans.Hotscore)))
	}
}
