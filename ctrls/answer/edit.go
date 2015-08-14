package answer

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

type EditAnswerController struct {
	ctrls.AuthController
}

func (self *EditAnswerController) Get() {
	self.TplNames = "q/edit-answer.html"
	self.LayoutSections["Heads"] = "q/head.html"
	self.LayoutSections["Scripts"] = "q/scripts.html"
	flash := beego.NewFlash()

	aid, _ := self.GetInt64(":aid")

	a := &models.Reply{Id: aid}
	if err := a.Read(); err == orm.ErrNoRows {
		flash.Error(fmt.Sprint(err))
		flash.Store(&self.Controller)
		return
	}

	uid, _ := self.GetSession("userid").(int64)
	role, _ := self.GetSession("userrole").(int64)

	if isAllow(a, uid, aid, role) {
		q := &models.Question{Id: a.Pid}
		if err := q.ReadOneOnly("Title", "Content"); err == orm.ErrNoRows {
			flash.Error("对应的问题已删除。")
			flash.Store(&self.Controller)
			return
		}
		self.Data["q"] = *q
		self.Data["a"] = *a
	} else {
		//没有权限执行该操作则直接跳转到登录页面
		self.Redirect("/u/signin/", 302)
	}
}

func isAllow(r *models.Reply, uid, aid, role int64) bool {
	if r.Uid == uid && r.Id == aid {
		return true
	} else if role < 0 {
		return true
	}
	return false
}

func (self *EditAnswerController) Post() {
	self.TplNames = "q/edit-answer.html"
	self.LayoutSections["Heads"] = "q/head.html"
	self.LayoutSections["Scripts"] = "q/scripts.html"

	flash := beego.NewFlash()

	aid, _ := self.GetInt64(":aid")

	a := &models.Reply{Id: aid}
	if err := a.Read(); err == orm.ErrNoRows {
		flash.Error("无法获取根本不存在的答案!")
		flash.Store(&self.Controller)
		return
	}

	uid, _ := self.GetSession("userid").(int64)
	role, _ := self.GetSession("userrole").(int64)

	if !isAllow(a, uid, aid, role) {
		//没有权限执行该操作则直接跳转到登录页面
		self.Redirect("/u/signin/", 302)
		return
	}

	q := &models.Question{Id: a.Pid}
	if err := q.ReadOneOnly("Title", "Content"); err == orm.ErrNoRows {
		flash.Error("对应的问题已删除。")
		flash.Store(&self.Controller)
		return
	}

	self.Data["q"] = *q
	self.Data["answer"] = *a
	aid_content := template.HTMLEscapeString(strings.TrimSpace(self.GetString("content")))

	if aid_content == "" {
		flash.Error("答案内容为空!")
		flash.Store(&self.Controller)
		return
	}

	// 删去用户没再使用的图片
	utils.DelLostImages(a.Content, aid_content)
	a.Content = aid_content

	if s, e := utils.GetBannerThumbnail(aid_content); e == nil {
		a.Attachment = s
	}

	/*
		if cat, err := model.GetCategory(nd.Pid); err == nil {
			anz.Category = cat.Title
		}
	*/

	a.Updated = time.Now()
	if row, err := a.Update(); row == 1 {
		// model.SetRecordforImageOnEdit(int64(aid), anz.Uid)
		self.Redirect("/q/"+strconv.Itoa(int(a.Pid))+"/#a-"+strconv.Itoa(int(aid)), 302)
	} else {
		flash.Error("更新答案出现错误:", fmt.Sprint(err))
		flash.Store(&self.Controller)
		return
	}
}
