package question

import (
	"fmt"
	"html/template"
	"strings"

	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/utils/pagination"
	"github.com/wcreate/lawoto/ctrls"
	"github.com/wcreate/lawoto/models"
	"github.com/wcreate/lawoto/utils"
)

type QuestionWithInfo struct {
	Q       models.Question
	Avatar  string
	Tags    []string
	LenTags int
}

type QMainController struct {
	ctrls.BaseController
}

func (self *QMainController) Get() {
	self.TplNames = "q/index.html"

	self.LayoutSections["Heads"] = "q/head.html"
	self.LayoutSections["Scripts"] = "q/scripts.html"

	//ipage, _ := self.GetInt(":page")
	//page := int(ipage)

	tab := template.HTMLEscapeString(strings.TrimSpace(self.GetString(":tab")))
	order := "id"
	//url := "/"
	if tab == "lastest" {
		//url = "/q/lastest/"
		self.Data["tab"] = "lastest"
	} else if tab == "hotness" {
		//url = "/q/hotness/"
		order = "hotness"
		self.Data["tab"] = "hotness"
	} else if tab == "unanswered" {
		//url = "/q/unanswered/"
		order = "unanswered"
		self.Data["tab"] = "unanswered"
	} else {
		//url = "/q/lastest/"
		order = "id"
		self.Data["tab"] = "lastest"
	}

	pagesize := 15
	count, err := models.GetQuestionsCount(0, pagesize, order)
	if err != nil {
		return
	}
	paginator := pagination.SetPaginator(self.Ctx, pagesize, count)

	if qts, err := models.GetQuestions(paginator.Offset(), pagesize, order); err == nil {
		results_count := len(*qts)
		qinfo := make([]QuestionWithInfo, results_count)
		for i, v := range *qts {
			qinfo[i].Q = v
			//
			avatar := ""
			u := &models.User{Id: v.Uid}
			if err := u.Read(); err != orm.ErrNoRows {
				avatar = utils.Gravatar(u.Email, 40)
			}
			qinfo[i].Avatar = avatar

			//
			if v.Tags != "" {
				qinfo[i].Tags = utils.Tags(v.Tags, ",")
				qinfo[i].LenTags = len(qinfo[i].Tags) - 1
			} else {
				qinfo[i].LenTags = 0
			}
		}
		self.Data["questions"] = qinfo
	} else {
		fmt.Println("首页推荐榜单 数据查询出错", err)
	}

	// lastest replied questions
	qts, err := models.GetLastestReplyQuestions(10)
	self.Data["lastest_replys"] = *qts
}
