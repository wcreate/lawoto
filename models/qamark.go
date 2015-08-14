package models

import (
	"fmt"

	"github.com/astaxie/beego/orm"
)

type QuestionMark struct {
	Id  int64 `orm:"pk;auto"` //
	Uid int64 `orm:"index"`   // 用户标识
	Qid int64 `orm:"index"`   // 问题标识
}

type AnswerMark struct {
	Id  int64 `orm:"pk;auto"` //
	Uid int64 `orm:"index"`   // 用户标识
	Aid int64 `orm:"index"`   // 回答标识
}

//-----------------------------------------------------------------------------
func SetQuestionMark(uid int64, qid int64) (int64, error) {
	qstm := &QuestionMark{Uid: uid, Qid: qid}
	id, err := orm.NewOrm().Insert(qstm)
	return id, err
}

//-----------------------------------------------------------------------------
func SetAnswerMark(uid int64, aid int64) (int64, error) {
	ansm := &AnswerMark{Uid: uid, Aid: aid}
	id, err := orm.NewOrm().Insert(ansm)
	return id, err
}

//-----------------------------------------------------------------------------
func IsQuestionMark(uid int64, qid int64) bool {
	o := orm.NewOrm()
	qs := o.QueryTable("QuestionMark") // 返回 QuerySeter
	qstm := new(QuestionMark)
	if err := qs.Filter("Uid", uid).Filter("Qid", qid).One(qstm, "Id", "Uid"); err != nil {
		fmt.Println(err)
		return false
	} else {
		if qstm.Uid == uid {
			return true
		} else {
			return false
		}
	}
}

//-----------------------------------------------------------------------------
func IsAnswerMark(uid int64, aid int64) bool {
	o := orm.NewOrm()
	qs := o.QueryTable("AnswerMark") // 返回 QuerySeter
	ansm := new(AnswerMark)
	if err := qs.Filter("Uid", uid).Filter("Aid", aid).One(ansm, "Id", "Uid"); err != nil {
		return false
	} else {
		if ansm.Uid == uid {
			return true
		} else {
			return false
		}
	}
}
