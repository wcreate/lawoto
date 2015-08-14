package models

import (
	"errors"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/wcreate/lawoto/setting"
)

// Reply,Pid:Question
type Reply struct {
	Id                int64     `orm:"pk;auto"` // 回答标识
	Uid               int64     `orm:"index"`   // 用户标识
	Pid               int64     `orm:"index"`   // Question id
	Order             int64     // 排序，暂时未使用到
	Ctype             int64     `orm:"index"`                             // -1:游客, 1:会员
	Content           string    `orm:"type(text);null"`                   // 回答内容
	Attachment        string    `orm:"type(text);null"`                   // 回答附件
	Created           time.Time `orm:"auto_now_add;type(datetime);index"` //
	Updated           time.Time `orm:"type(datetime);index"`              //
	Hotness           float64   `orm:"index"`                             // 热度，Reddit算法生成
	Hotup             int64     `orm:"index"`                             // 赞
	Hotdown           int64     `orm:"index"`                             // 贬
	Hotscore          int64     `orm:"index"`                             // Hotup - Hotdown
	Hotvote           int64     `orm:"index"`                             // Hotup + Hotdown
	Views             int64     `orm:"index"`                             // 浏览数
	Author            string    `orm:"index"`                             //
	ReplyTime         time.Time `orm:"type(datetime);null"`               //
	ReplyCount        int64     `orm:"index"`                             //
	ReplyLastUserId   int64     //
	ReplyLastUsername string    //
}

//-----------------------------------------------------------------------------
func (r *Reply) Read(fields ...string) error {
	err := orm.NewOrm().Read(r, fields...)
	return err

}

func (r *Reply) Insert() error {
	_, err := orm.NewOrm().Insert(r)
	return err
}

func (r *Reply) Update(fields ...string) (int64, error) {
	// fields = append(fields, "Updated")
	row, err := orm.NewOrm().Update(r, fields...)
	return row, err
}

func (r *Reply) Delete() error {
	_, err := orm.NewOrm().Delete(r)
	return err
}

func Replys() orm.QuerySeter {
	return orm.NewOrm().QueryTable("Reply")
}

func (r *Reply) ReadOneOnly(fields ...string) error {
	fields = append(fields, "Id")
	return Replys().Filter("Id", r.Id).One(r, fields...)
}

//-----------------------------------------------------------------------------
func GetReplysByPid(id int64, ctype int64, offset int, limit int, path string) *[]Reply {
	var ans []Reply
	// ctype等于-1为游客  ctype等于1为正常会员 这里ctype等于0的情况则返回两者
	// ctype为10 则是image的回应
	if id == 0 {
		//Engine.Where("ctype=?", ctype).Limit(limit, offset).Desc(path).Find(ans)
		Replys().Filter("Ctype", ctype).Limit(limit, offset).OrderBy("-" + path).All(&ans)
	} else {
		if ctype == 0 {
			//Engine.Where("(ctype<>0) and pid=?", id).Limit(limit, offset).Desc(path).Find(ans)
			Replys().Exclude("Ctype", ctype).Filter("Pid", id).Limit(limit, offset).OrderBy("-" + path).All(&ans)
		} else {
			// Engine.Where("ctype=? and pid=?", ctype, id).Limit(limit, offset).Desc(path).Find(ans)
			Replys().Filter("Ctype", ctype).Filter("Pid", id).Limit(limit, offset).OrderBy("-" + path).All(&ans)
		}
	}
	return &ans
}

//-----------------------------------------------------------------------------
func (r *Reply) Add() (int64, error) {
	r.Created = time.Now()
	r.Updated = r.Created

	if err := r.Insert(); err == nil {
		// 更新问题中的回应相关记录
		qs := new(Question)
		qs.Id = r.Pid
		qs.ReplyCount = GetReplyCountByPid(r.Pid)
		qs.ReplyTime = r.Updated
		qs.ReplyLastUsername = r.Author
		qs.ReplyLastUserId = r.Uid

		if affected, err := qs.Update("ReplyCount", "ReplyTime", "ReplyLastUsername", "ReplyLastUserId"); err != nil || affected == 0 {
			setting.Log.Warn("AddAnswer id = %v, affected = %v, err = %v", r.Id, affected, err)
		}
		return r.Id, err
	}
	return -1, errors.New("AddAnswer无法插入数据!")
}

//-----------------------------------------------------------------------------
func (r *Reply) DeleteBeforeCheck(uid int64, role int64) error {
	if err := r.Read(); err == orm.ErrNoRows {
		return errors.New("没有办法删除根本不存在的答案!")
	}

	if r.Uid != uid {
		return errors.New("你没有权限删除答案!")
	}

	if err := r.Delete(); err != nil {
		setting.Log.Warn("Delete reply failed, id = %v", uid)
		return errors.New("删除答案错误!") //错误还要我自己构造?!
	}

	return nil
}

//-----------------------------------------------------------------------------
func GetReplyCountByPid(pid int64) int64 {
	n, _ := Replys().Filter("Pid", pid).Count()
	return n
}

func SetIgnoreAnswer(qid int64, aid int64, uid int64, role int64) error {
	allow := bool(false)
	r := &Reply{Id: aid}
	q := &Question{Id: qid}

	if err := r.Read(); err == orm.ErrNoRows {
		setting.Log.Warn("Not found reply. id = %v, error = %v", r.Id, err)
		return err
	}

	if err := q.Read(); err != orm.ErrNoRows {
		setting.Log.Warn("Not found Question. id = %v, error = %v", q.Id, err)
		return err
	}

	if (q.Uid == uid) && (q.Id == r.Pid) {
		allow = true
	} else if role < 0 {
		allow = true
	}

	if !allow {
		return errors.New("你没有权限忽略答案!")
	}

	r.Ctype = Answered
	if _, err := r.Update("Ctype"); err != nil {
		setting.Log.Warn("Update Reply ctype failed. id = %v, error = %v", r.Id, err)
		return err
	} else {
		// ctype==2 是已经采纳的答案,这里判断当前忽略操作之后是否仍有已采纳的答案,
		// 如果有就不要修改问题的ctype,如果没有就把问题的ctype改为1,即表示当前问题尚未解决
		// 查找剩余的已解决的答案集合
		if ans := GetReplysByPid(qid, Accepted, 0, 0, "id"); ans != nil {
			if len(*ans) <= 0 {
				q.Ctype = Answered
			}
		}

		if q.Ctype == Answered {
			if _, err := q.Update("Ctype"); err != nil {
				setting.Log.Warn("Update Question ctype failed.id = %v, error = %v", r.Id, err)
				return err
			}
		}
	}

	return nil
}

//-----------------------------------------------------------------------------
func SetAcceptAnswer(qid int64, aid int64, uid int64, role int64) error {
	allow := bool(false)
	r := &Reply{Id: aid}
	q := &Question{Id: qid}

	if err := r.Read(); err == orm.ErrNoRows {
		setting.Log.Warn("Not found reply. id = %v, error = %v", r.Id, err)
		return err
	}

	if err := q.Read(); err == orm.ErrNoRows {
		setting.Log.Warn("Not found Question. id = %v, error = %v", q.Id, err)
		return err
	}

	if (q.Uid == uid) && (q.Id == r.Pid) {
		allow = true
	} else if role < 0 {
		allow = true
	}

	if !allow {
		return errors.New("你没有权限采纳答案!")
	}

	r.Ctype = Accepted
	if _, err := r.Update("Ctype"); err != nil {
		setting.Log.Warn("Update reply ctype failed.id = %v, error = %v", r.Id, err)
		return err
	}

	q.Ctype = Accepted
	if _, err := q.Update("Ctype"); err != nil {
		setting.Log.Warn("Update Question ctype failed.id = %v, error = %v", r.Id, err)
		return err
	}
	return nil
}

//-----------------------------------------------------------------------------
func DelReplysByPid(pid int64) error {
	_, err := Replys().Filter("Pid", pid).Delete()
	return err
}

//-----------------------------------------------------------------------------
func GetAScoresByPid(pid int64) int64 {
	ascores := int64(0)
	if ans := GetReplysByPid(pid, 0, 0, 0, "id"); ans != nil {
		if len(*ans) > 0 {
			for _, v := range *ans {
				ascores = ascores + v.Hotscore
			}
		}
	}

	return ascores
}
