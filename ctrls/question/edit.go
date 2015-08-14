package question

import (
	"fmt"
	"html/template"
	"strconv"
	"strings"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/wcreate/lawoto/ctrls"
	"github.com/wcreate/lawoto/models"
	"github.com/wcreate/lawoto/utils"
)

type EditQuestionController struct {
	ctrls.AuthController
}

func (self *EditQuestionController) Get() {
	self.setTemplate()

	flash := beego.NewFlash()
	qid, _ := self.GetInt64(":qid")
	q := &models.Question{Id: qid}

	if err := q.Read(); err == orm.ErrNoRows {
		flash.Error(fmt.Sprint(err))
		flash.Store(&self.Controller)
		return
	}

	uid, _ := self.GetSession("userid").(int64)
	role, _ := self.GetSession("userrole").(int64)

	if isAllow(q, uid, qid, role) {
		self.Data["question"] = *q
		//self.Data["inode"], _ = models.GetNode(q.Nid)
	} else {
		//没有权限执行该操作则直接跳转到登录页面
		self.Redirect("/u/signin/", 302)
	}
}

func isAllow(q *models.Question, uid, qid, role int64) bool {
	if q.Uid == uid && q.Id == qid {
		return true
	} else if role < 0 {
		return true
	}
	return false
}

func (self *EditQuestionController) setTemplate() {
	self.TplNames = "q/edit.html"

	self.LayoutSections["Heads"] = "q/head.html"
	self.LayoutSections["Scripts"] = "q/scripts.html"
}

func (self *EditQuestionController) Post() {
	self.setTemplate()

	flash := beego.NewFlash()

	qid, _ := self.GetInt64(":qid")
	q := &models.Question{Id: qid}
	if err := q.Read(); err == orm.ErrNoRows {
		flash.Error(fmt.Sprint(err))
		flash.Store(&self.Controller)
		return
	}

	uid, _ := self.GetSession("userid").(int64)
	role, _ := self.GetSession("userrole").(int64)

	if !isAllow(q, uid, qid, role) {
		// 没有权限执行该操作则直接跳转到登录页面
		self.Redirect("/u/signin/", 302)
		return
	}

	self.Data["question"] = *q

	qid_title := template.HTMLEscapeString(strings.TrimSpace(self.GetString("title")))
	qid_content := template.HTMLEscapeString(strings.TrimSpace(self.GetString("content")))
	tags := template.HTMLEscapeString(strings.TrimSpace(strings.ToLower(self.GetString("tags"))))

	if qid_title == "" {
		flash.Error("问题标题为空!")
		flash.Store(&self.Controller)
		return
	}

	if qid_content == "" {
		flash.Error("问题内容为空!")
		flash.Store(&self.Controller)
		return
	}

	if tags == "" {
		flash.Error("尚未设置标签,请设定正确的标签!")
		flash.Store(&self.Controller)
		return
	}

	q.Title = qid_title
	// 删去用户没再使用的图片
	utils.DelLostImages(q.Content, qid_content)
	q.Content = qid_content

	if s, e := utils.GetBannerThumbnail(qid_content); e == nil {
		q.Attachment = s
	}

	if thumbnails, thumbnailslarge, thumbnailsmedium, thumbnailssmall, e := utils.GetThumbnails(qid_content); e == nil {
		q.Thumbnails = thumbnails
		q.ThumbnailsLarge = thumbnailslarge
		q.ThumbnailsMedium = thumbnailsmedium
		q.ThumbnailsSmall = thumbnailssmall
	}
	/*
		if cat, err := model.GetCategory(nd.Pid); err == nil {
			qs.Category = cat.Title
		}
	*/

	q.Tags = tags
	q.Updated = time.Now()

	if row, err := q.Update("Title", "Content", "Updated", "Tags"); row == 1 {
		//model.SetRecordforImageOnEdit(int64(qid), qs.Uid)
		self.Redirect("/q/"+strconv.Itoa(int(qid))+"/", 302)
	} else {
		flash.Error("更新问题出现错误:", fmt.Sprint(err))
		flash.Store(&self.Controller)
		return
	}
}
