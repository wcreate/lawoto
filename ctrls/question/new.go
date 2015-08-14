package question

import (
	"fmt"
	"html/template"
	"strconv"
	"strings"
	"time"

	"github.com/astaxie/beego"
	"github.com/wcreate/lawoto/ctrls"
	"github.com/wcreate/lawoto/models"
	"github.com/wcreate/lawoto/utils"
)

type NewQuestionController struct {
	ctrls.AuthController
}

func (self *NewQuestionController) Get() {
	self.TplNames = "q/new.html"
	self.LayoutSections["Heads"] = "q/head.html"
	self.LayoutSections["Scripts"] = "q/scripts.html"
}

func (self *NewQuestionController) Post() {
	self.TplNames = "q/new.html"
	self.LayoutSections["Heads"] = "q/head.html"
	self.LayoutSections["Scripts"] = "q/scripts.html"

	flash := beego.NewFlash()
	tags := template.HTMLEscapeString(strings.TrimSpace(strings.ToLower(self.GetString("tags"))))

	if tags == "" {
		flash.Error("尚未设置标签,请设定正确的标签!")
		flash.Store(&self.Controller)
		return
	}

	uid, _ := self.GetSession("userid").(int64)
	sess_username, _ := self.GetSession("username").(string)
	qid_title := template.HTMLEscapeString(strings.TrimSpace(self.GetString("title")))
	qid_content := template.HTMLEscapeString(strings.TrimSpace(self.GetString("content")))

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

	qs := new(models.Question)
	qs.Title = qid_title
	qs.Tags = tags
	qs.Content = qid_content
	qs.Uid = uid
	qs.Author = sess_username
	qs.Created = time.Now()
	qs.Updated = qs.Created
	qs.ReplyTime = qs.Created

	if s, e := utils.GetBannerThumbnail(qid_content); e == nil {
		qs.Attachment = s
	}

	if thumbnails, thumbnailslarge, thumbnailsmedium, thumbnailssmall, e := utils.GetThumbnails(qid_content); e == nil {
		qs.Thumbnails = thumbnails
		qs.ThumbnailsLarge = thumbnailslarge
		qs.ThumbnailsMedium = thumbnailsmedium
		qs.ThumbnailsSmall = thumbnailssmall
	}

	if err := qs.Insert(); err == nil {
		// TODO
		//models.SetRecordforImageOnPost(qts.Id, uid)
		self.Redirect("/q/"+strconv.Itoa(int(qs.Id))+"/", 302)
	} else {
		flash.Error(fmt.Sprint(err))
		flash.Store(&self.Controller)
		return
	}

}
