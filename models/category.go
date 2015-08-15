package models

import (
	"time"

	"github.com/astaxie/beego/orm"
)

// category, Pid:root/category
type Category struct {
	Id  int64 `orm:"pk;auto"` // 标识
	Pid int64 `orm:"index"`   // ParentId

	Uid    int64  `orm:"index"` // 这里指本分类创建者
	Author string `orm:"index"` //这里指本分类创建者
	Order  int64  // 排序

	Title   string `orm:"index"`
	Content string `orm:"type(text);null"` // 分类介绍

	Created time.Time `orm:"auto_now_add;type(datetime)"`
	Updated time.Time `orm:"auto_now"`

	Hotness  float64 `orm:"index"` // 热度，Reddit算法生成
	Hotup    int64   `orm:"index"` // 赞
	Hotdown  int64   `orm:"index"` // 贬
	Hotscore int64   `orm:"index"` // Hotup - Hotdown
	Hotvote  int64   `orm:"index"` // Hotup + Hotdown
	Views    int64   `orm:"index"`
}

//-----------------------------------------------------------------------------
func (c *Category) Read(fields ...string) error {
	err := orm.NewOrm().Read(c, fields...)
	return err

}

func (c *Category) Insert() error {
	_, err := orm.NewOrm().Insert(c)
	return err

}

func (c *Category) Update(fields ...string) (int64, error) {
	// fields = append(fields, "Updated")
	row, err := orm.NewOrm().Update(c, fields...)
	return row, err

}

func (c *Category) Delete() error {
	_, err := orm.NewOrm().Delete(c)
	return err
}

func Categorys() orm.QuerySeter {
	return orm.NewOrm().QueryTable("Category")
}

func (c *Category) ReadOneOnly(fields ...string) error {
	fields = append(fields, "Id")
	return Questions().Filter("Id", c.Id).One(c, fields...)
}

//-----------------------------------------------------------------------------
