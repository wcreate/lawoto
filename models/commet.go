package models

import "time"

// Comment, Pid:question/reply
type Comment struct {
	Id    int64 `orm:"pk;auto"` // 标识
	Pid   int64 `orm:"index"`   // ParentId
	Ctype int   `orm:"index"`   // 0: question, 1: reply, 2:blog
	Floor int64 `orm:"index"`   // 评化楼数

	Uid        int64  `orm:"index"` // 这里指本分类创建者
	Author     string `orm:"index"` // 这里指本分类创建者
	ToUid      int64  `orm:"index"`
	ToUsername string `orm:"index"` // 回复给哪个用户

	Title   string `orm:"index"`
	Content string `orm:"type(text);null"` // 分类介绍

	Created time.Time `orm:"auto_now_add;type(datetime);index"`
	Updated time.Time `orm:"auto_now,index"`

	Hotness  float64 `orm:"index"` // 热度，Reddit算法生成
	Hotup    int64   `orm:"index"` // 赞
	Hotdown  int64   `orm:"index"` // 贬
	Hotscore int64   `orm:"index"` // Hotup - Hotdown
	Hotvote  int64   `orm:"index"` // Hotup + Hotdown
	Views    int64   `orm:"index"`
}
