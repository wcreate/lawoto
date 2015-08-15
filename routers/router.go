package routers

import (
	"github.com/astaxie/beego"

	"github.com/wcreate/lawoto/ctrls/answer"
	"github.com/wcreate/lawoto/ctrls/question"
	"github.com/wcreate/lawoto/ctrls/user"
)

func init() {
	beego.Router("/", &question.QMainController{})

	// 问题首页
	beego.Router("/q", &question.QMainController{})
	// 问题首页 hotness类
	beego.Router("/q/:tab([A-Za-z]+)/", &question.QMainController{})
	// 创建问题
	beego.Router("/q/new/", &question.NewQuestionController{})
	// 问题详情页面
	beego.Router("/q/:qid([1-9]\\d*)/", &question.QuestionListController{})
	// 开放问题
	beego.Router("/q/:qid:int/open", &question.OpenQuestionController{})
	// 关闭问题
	beego.Router("/q/:qid:int/close/", &question.CloseQuestionController{})
	// 编辑问题
	beego.Router("/q/:qid:int/edit/", &question.EditQuestionController{})
	// 删除问题
	beego.Router("/q/:qid:int/delete/", &question.DeleteQuestionController{})
	// 访问次数
	beego.Router("/q/:id:int/view/", &question.ViewQuestionController{})
	// hotness
	beego.Router("/hot/q/:id:int/:name([A-Za-z]+)", &question.LikeOrHateController{})

	// 创建答案
	beego.Router("/q/:qid:int/a/", &answer.NewAnswerController{})
	// 采纳答案
	beego.Router("/q/:qid:int/a/:aid:int/accept/", &answer.AcceptAnswerController{})
	// 忽略答案
	beego.Router("/q/:qid:int/a/:aid:int/ignore/", &answer.IgnoreAnswerController{})
	// 删除答案
	beego.Router("/q/:qid:int/a/:aid:int/delete/", &answer.DeleteAnswerController{})
	// 编辑答案
	beego.Router("/q/:qid:int/a/:aid:int/edit/", &answer.EditAnswerController{})
	// hotness
	beego.Router("/hot/a/:id:int/:name([A-Za-z]+)", &answer.LikeOrHateController{})

	// 注册
	beego.Router("/u/signup/", &user.SignupController{})
	beego.Router("/u/signin/", &user.SigninController{})
	beego.Router("/u/signout/", &user.SignoutController{})
	beego.Router("/u/settings/", &user.SettingsController{})
	beego.Router("/u/settings/password/", &user.PasswordController{})
	beego.Router("/u/settings/email/", &user.EmailController{})
	beego.Router("/upload/avatar/", &user.AvatarController{})

	//  个人主页
	beego.Router("/u/:name([A-Za-z]+)/", &user.HomeController{})

}
