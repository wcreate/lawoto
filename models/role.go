package models

import "time"

// 角色表
type Role struct {
	Id      int64     //
	Name    string    // 角色名
	Intro   string    // 角色介绍
	Created time.Time `orm:"auto_now_add;type(datetime)"` // 创建时间
}

// 权限表
type Authority struct {
	Id       int64     //
	Name     string    // 权限名称
	Intro    string    // 权限色介绍
	Order    int       // 排序
	Path     string    // 相对于主目录的路径
	Moudleid int64     // 模块id
	Created  time.Time `orm:"auto_now_add;type(datetime)"` // 创建时间
}

// 模块表
type Module struct {
	Id      int64     //
	Name    string    // 模块名称
	Intro   string    // 模块介绍
	Created time.Time `orm:"auto_now_add;type(datetime)"` // 创建时间
}

// 模块表
type Menu struct {
	Id       int64     //
	Pid      int64     // 父菜单id
	Name     string    // 菜单名称
	Intro    string    // 菜单介绍
	Url      string    // 链接地址
	Imageurl string    // 图片地址
	Order    int       // 排序
	Dept     int       // 深度
	Created  time.Time `orm:"auto_now_add;type(datetime)"` // 创建时间
}

// 用户角色表
type UserRole struct {
	Id  int64  //
	Uid int64  // 用户id
	Rid string // 角色id
}

// 用户角色表
type RoleAuthority struct {
	Id  int64  //
	Rid int64  // 角色id
	Aid string // 权限id
}

// 用户角色表
type RoleMenu struct {
	Id  int64  //
	Rid int64  // 角色id
	Mid string // 菜单id
}
