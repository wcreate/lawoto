package question

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/wcreate/lawoto/models"
	"github.com/wcreate/lawoto/utils"
)

type DeleteQuestionController struct {
	QuestionController
}

func (self *DeleteQuestionController) Get() {
	flash := beego.NewFlash()
	qid, uid, role := self.GetParams()
	if qid == -1 {
		return
	}

	q := &models.Question{Id: qid}
	if e := deleteAndOthers(q, uid, role); e != nil {
		self.TplNames = "oto/error.html"
		flash.Error("删除 Topic id:" + strconv.Itoa(int(qid)) + "出现错误 " + fmt.Sprintf("%s", e) + "!")
		flash.Store(&self.Controller)
		return
	}
}

func deleteAndOthers(qs *models.Question, uid int64, role int64) error {

	if err := qs.Read(); err == orm.ErrNoRows {
		return errors.New("无法删除不存在的Question ID:" + strconv.Itoa(int(qs.Id)))
	}

	allow := role < 0
	if !(qs.Uid == uid || role < 0) {
		return errors.New("你无权删除此问题:" + strconv.Itoa(int(qs.Id)))
	}

	//检查附件字段并尝试删除文件
	if qs.Attachment != "" {
		if p := utils.Url2local(qs.Attachment); utils.Exist(p) {
			//验证是否管理员权限
			if allow {
				if err := os.Remove(p); err != nil {
					//可以输出错误，但不要反回错误，以免陷入死循环无法删掉
					fmt.Println("ROOT DEL Question Attachment, Question ID:", qs.Id, ",ERR:", err)
				}
			} else { //检查用户对文件的所有权
				if utils.VerifyUserfile(p, strconv.Itoa(int(uid))) {
					if err := os.Remove(p); err != nil {
						fmt.Println("DEL Question Attachment, Question ID:", qs.Id, ",ERR:", err)
					}
				}
			}
		}
	}

	//检查内容字段并尝试删除文件
	if qs.Content != "" {
		//若内容中存在图片则开始尝试删除图片
		delfiles_local := []string{}

		if m, n := utils.GetImages(qs.Content); n > 0 {
			for _, v := range m {
				if utils.IsLocal(v) {
					delfiles_local = append(delfiles_local, v)
					//如果本地同时也存在banner缓存文件,则加入旧图集合中,等待后面一次性删除
					if p := utils.Url2local(utils.SetSuffix(v, "_banner.jpg")); utils.Exist(p) {
						delfiles_local = append(delfiles_local, p)
					}
					if p := utils.Url2local(utils.SetSuffix(v, "_large.jpg")); utils.Exist(p) {
						delfiles_local = append(delfiles_local, p)
					}
					if p := utils.Url2local(utils.SetSuffix(v, "_medium.jpg")); utils.Exist(p) {
						delfiles_local = append(delfiles_local, p)
					}
					if p := utils.Url2local(utils.SetSuffix(v, "_small.jpg")); utils.Exist(p) {
						delfiles_local = append(delfiles_local, p)
					}
				}
			}
			for k, v := range delfiles_local {
				if p := utils.Url2local(v); utils.Exist(p) { //如若文件存在,则处理,否则忽略
					//先行判断是否缩略图  如果不是则执行删除image表记录的操作 因为缩略图是没有存到image表记录里面的
					isThumbnails := bool(true) //false代表不是缩略图 true代表是缩略图
					if (!strings.HasSuffix(v, "_large.jpg")) &&
						(!strings.HasSuffix(v, "_medium.jpg")) &&
						(!strings.HasSuffix(v, "_small.jpg")) {
						isThumbnails = false

					}
					//验证是否管理员权限
					if allow {
						if err := os.Remove(p); err != nil {
							fmt.Println("#", k, ",ROOT DEL FILE ERROR:", err)
						}

						//删除image表中已经被删除文件的记录
						if !isThumbnails {
							if e := models.DelImageByLocation(v); e != nil {
								fmt.Println("DelImageByLocation删除未使用文件", v, "的数据记录时候出现错误:", e)
							}
						}
					} else { //检查用户对文件的所有权
						if utils.VerifyUserfile(p, strconv.Itoa(int(uid))) {
							if err := os.Remove(p); err != nil {
								fmt.Println("#", k, ",DEL FILE ERROR:", err)
							}

							//删除image表中已经被删除文件的记录
							if !isThumbnails {
								if e := models.DelImageByLocation(v); e != nil {
									fmt.Println("v:", v)
									fmt.Println("DelImageByLocation删除未使用文件", v, "的数据记录时候出现错误:", e)
								}
							}
						}
					}
				}
			}
		}
	}

	// 不管实际路径中是否存在文件均删除该数据库记录，以免数据库记录陷入死循环无法删掉
	if err := qs.Delete(); err != nil {
		fmt.Println("删除话题错误:", err) //此时居然为空!
	}

	// 删除该问题下所有答案
	if err := models.DelReplysByPid(qs.Id); err != nil {
		fmt.Println("执行DelReplysByPid出错:", err)
		return err
	}
	return nil

}
