package user

import (
	"fmt"
	"net/smtp"
	"strconv"
	"strings"
	"time"

	"github.com/astaxie/beego"
	"github.com/wcreate/lawoto/setting"
	"github.com/wcreate/lawoto/utils"
)

type EmailController struct {
	UserController
}

func (self *EmailController) Get() {
	self.TplNames = "u/modify-email.html"

	flash := beego.NewFlash()
	if msg := self.GetString("msg"); msg != "" {
		flash.Notice("一封确认邮件已经发送到" + self.U.Email + "!")
		flash.Store(&self.Controller)
	}
}

func (self *EmailController) Post() {
	self.TplNames = "u/modify-email.html"

	flash := beego.NewFlash()
	email := strings.TrimSpace(strings.ToLower(self.GetString("email")))

	if email == self.U.Email {
		flash.Notice("Email未发生变更!")
		flash.Store(&self.Controller)
		return
	}

	self.U.Email = email
	self.U.Updated = time.Now()
	self.U.Cfmcode = utils.StringNewRand(20)

	emailbody := `<html><body><div style="margin: 0 auto; width: 580px; background: #FFF; box-shadow: 0 0 10px #333; text-align:left;">
        <div style="margin: 0 40px; color: #999; border-bottom: 1px dotted #DDD; padding: 40px 0 30px; font-size: 13px; text-align: center;">
            <a href="http://xx.com"><img src="http://s.xx.com/img/mail-logo.png" alt="LawyerOnline"></a><br>
            最专业的中文社区
        </div>
        <div style="padding: 30px 40px 40px;">%s 您好，您修改了登录邮箱地址<br><br>请在 1 小时内点击此链接以完成修改 
            <a style="color: #009A61; text-decoration: none;" href="http://127.0.0.1:8080/u/confirm?type=mail&amp;code=%s">
              http://127.0.0.1:8080/u/confirm?type=mail&amp;code=%s</a><br></div><div style="background: #EEE; border-top: 1px solid #DDD; text-align: center; height: 90px; line-height: 90px;">
            <a href="http://127.0.0.1:8080/u/confirm?type=mail&amp;code=%s" style="padding: 8px 18px; background: #009A61; color: #FFF; text-decoration: none; border-radius: 3px;">完成修改 ➔</a>
        </div>
    </div></body></html>`
	emailbody = fmt.Sprintf(emailbody, self.U.Username, self.U.Cfmcode, self.U.Cfmcode, self.U.Cfmcode)

	subject := "登录邮箱地址修改"
	m := utils.NewHTMLMessage(subject, emailbody)
	m.From = setting.EmailUser
	m.To = []string{self.U.Email}
	host := strings.Split(setting.EmailHost, ":")[0]

	if err := utils.Send(setting.EmailHost,
		smtp.PlainAuth("", setting.EmailUser, setting.EmailPasswd, host), m); err != nil {
		flash.Error("发送确认邮件失败，Email未修改!", fmt.Sprint(err))
		flash.Store(&self.Controller)
		return
	}

	if row, _ := self.U.Update("Email", "Updated"); row != 1 {
		flash.Error("用户信息更新到数据库时发生错误!")
		flash.Store(&self.Controller)
		return
	}

	self.Redirect("/u/settings/email?msg=sucess&ver="+strconv.Itoa(int(time.Now().UnixNano())), 302)
}
