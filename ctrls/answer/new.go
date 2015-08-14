package answer

import (
	"fmt"
	"html/template"
	"strconv"
	"strings"
	"time"

	"github.com/wcreate/lawoto/ctrls"
	"github.com/wcreate/lawoto/models"
)

type NewAnswerController struct {
	ctrls.AuthController
}

func (self *NewAnswerController) Post() {
	qid, _ := self.GetInt64(":qid")
	suid, _ := self.GetSession("userid").(int64)

	rc := template.HTMLEscapeString(strings.TrimSpace(self.GetString("content")))

	redirect := "/q/" + self.GetString(":qid") + "/"

	// 问题已不存在
	if qid <= 0 {
		self.Redirect("/", 302)
		return
	}

	// 内容为空
	if rc == "" {
		self.Redirect(redirect, 302)
		return
	}

	// 用户已不存在
	usr := models.User{Id: suid}
	if err := usr.Read(); err != nil {
		self.Redirect("/", 302)
		return
	}

	// 不等于0,即是注册用户或管理层 此时把ctype设置为1 主要是为了区分游客
	r := new(models.Reply)
	r.Pid = qid
	r.Uid = suid
	r.Ctype = 1
	r.Content = rc
	r.Author = usr.Username
	r.Created = time.Now()
	r.Updated = r.Created
	r.ReplyTime = r.Created

	// 为安全,先行保存回应,顺手获得aid,在后面顺手再更新替换@通知的链接
	if _, err := r.Add(); err != nil {
		fmt.Println("#", r.Id, ":", err)
	} else {

		//如果回应内容中有@通知 则处理以下事件
		/*
			if users := helper.AtUsers(rc); len(users) > 0 {
				if tp, err := model.GetQuestion(qid); err == nil {
					todo := []string{}
					for _, v := range users {
						//判断被通知之用户名是否真实存在
						if u, e := model.GetUserByUsername(v); e == nil && u != nil {
							//存在的则加入待操作列
							todo = append(todo, v)
							//替换被通知用户的用户名带上用户主页链接
							rc = strings.Replace(rc, "@"+v,
								"<a href='/user/"+u.Username+"/' title='"+u.Nickname+"' target='_blank'><span>@</span><span>"+u.Username+"</span></a>", -1)

							//发送通知内容到用户的 时间线
							model.AddTimeline(usr.Username+"在「"+tp.Title+"」的回应里提到了你~",
								rc+"[<a href='/"+self.GetString(":qid")+"/#answer-"+strconv.Itoa(int(aid))+"'>"+tp.Title+"</a>]",
								tp.Cid, tp.Nid, u.Id, usr.Username, usr.Content)

						}

					}
					if len(todo) > 0 {
						model.SetReplyContentByRid(aid, rc)
					}

				}
			}
		*/
		self.Redirect(redirect+"#a-"+strconv.Itoa(int(r.Id)), 302)
		return
	}
}
