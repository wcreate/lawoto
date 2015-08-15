package models

import (
	"errors"
	"fmt"
	"time"

	"github.com/astaxie/beego/orm"
)

const (
	QClose     int64 = -1
	Unanswered int64 = iota
	Answered
	Accepted
)

// Question表
type Question struct {
	Id    int64 `orm:"pk;auto"` // 标识
	Cid   int64 `orm:"index"`   // 归属的分类
	Uid   int64 `orm:"index"`   // 用户标识
	Order int64 // 排序

	Ctype   int64  `orm:"index"`           // 0:unanswered, -1: close, 1: answered, 2:accepted
	Title   string `orm:"index"`           //
	Content string `orm:"type(text);null"` //
	Author  string `orm:"index"`           // 发表的作者，即UserName, 它注册时唯一，减少查询

	Attachment       string `orm:"size(512);null"` //
	Thumbnails       string // Original remote file
	ThumbnailsLarge  string
	ThumbnailsMedium string
	ThumbnailsSmall  string

	Tags    string    `orm:"index"`                             // Tag，以，分隔
	Created time.Time `orm:"auto_now_add;type(datetime);index"` //
	Updated time.Time `orm:"type(datetime);index"`              //

	Hotness  float64 `orm:"index"` // 热度，Reddit算法生成
	Hotup    int64   `orm:"index"` // 赞
	Hotdown  int64   `orm:"index"` // 贬
	Hotscore int64   `orm:"index"` // Hotup - Hotdown
	Hotvote  int64   `orm:"index"` // Hotup + Hotdown
	Views    int64   `orm:"index"` // 浏览数

	ReplyTime         time.Time `orm:"type(datetime);null;index"`
	ReplyCount        int64     `orm:"index"` // 回复的个数
	ReplyHotscore     int64     `orm:"index"` // Hotup - Hotdown
	ReplyLastUserId   int64     // 回复用户标识
	ReplyLastUsername string    // 回复用户名，即UserName, 它注册时唯一，减少查询

	FavoriteCount int64 `orm:"index"` // 被收藏数
}

//-----------------------------------------------------------------------------
func (u *Question) Read(fields ...string) error {
	return orm.NewOrm().Read(u, fields...)
}

func (u *Question) Insert() error {
	_, err := orm.NewOrm().Insert(u)
	return err
}

func (u *Question) Update(fields ...string) (int64, error) {
	// fields = append(fields, "Updated")
	row, err := orm.NewOrm().Update(u, fields...)
	return row, err
}

func (u *Question) Delete() error {
	_, err := orm.NewOrm().Delete(u)
	return err
}

func Questions() orm.QuerySeter {
	return orm.NewOrm().QueryTable("Question")
}

func (q *Question) ReadOneOnly(fields ...string) error {
	fields = append(fields, "Id")
	return Questions().Filter("Id", q.Id).One(q, fields...)
}

//-----------------------------------------------------------------------------
func GetQuestionsCount(offset int, limit int, path string) (int64, error) {
	if path == "unanswered" {
		cond1 := orm.NewCondition().And("ReplyCount", 0).Or("Ctype", Unanswered)
		total, err := Questions().SetCond(cond1).Limit(limit, offset).Count()
		return total, err
	} else {
		total, err := Questions().Limit(limit, offset).Count()
		return total, err
	}
}

//-----------------------------------------------------------------------------
func GetQuestions(offset int, limit int, path string) (*[]Question, error) {
	var tps []Question
	if path == "unanswered" {
		cond1 := orm.NewCondition().And("ReplyCount", 0).Or("Ctype", Unanswered)
		_, err := Questions().SetCond(cond1).Limit(limit, offset).OrderBy("-Id").All(&tps)
		return &tps, err
	} else {
		_, err := Questions().Limit(limit, offset).OrderBy("-" + path).All(&tps)
		return &tps, err
	}
}

//-----------------------------------------------------------------------------
func GetLastestReplyQuestions(limit int) (*[]Question, error) {
	var tps []Question
	_, err := Questions().Filter("ReplyCount__gt", 0).Limit(limit).OrderBy("-ReplyTime").All(&tps)
	return &tps, err
}

//-----------------------------------------------------------------------------
func SetQuestionReplyCount(qid int64) (int64, error) {
	n, _ := Replys().Filter("Pid", qid).Count()

	qs := new(Question)
	qs.Id = qid
	qs.ReplyCount = n

	affected, err := qs.Update("ReplyCount")
	return affected, err
}

//-----------------------------------------------------------------------------
func (qs *Question) SetCtype(uid int64, role int64, ctype int64) error {
	if err := qs.Read(); err != orm.ErrNoRows {
		if !(qs.Uid == uid) {
			return errors.New("你没有权限执行SetCtypeforQuestion!")
		}
		qs.Ctype = ctype
		if _, err := qs.Update("Ctype"); err != nil {
			fmt.Println("PutQuestion执行错误:", err)
			return err
		} else {
			return err
		}
	} else {
		return err
	}
}
