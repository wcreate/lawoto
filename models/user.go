package models

import (
	"regexp"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
)

const (
	// UserBind Type
	UB_Google = iota
	UB_Twitter
	UB_Douban
	UB_Weibo
	UB_QQ
	UB_Weixin
	UB_Github
	UB_Facebook
)

const (
	Gender_Unknown = iota
	Gender_Male
	Gender_Female
)

var (
	reserveUsers = map[string]string{
		"admin":    "admin",
		"signin":   "signin",
		"signout":  "signout",
		"settings": "settings",
		"home":     "home",
	}
)

type User struct {
	Id       int64  `orm:"pk;auto"`
	Pid      int64  // 用在归属地 归属学校 归属组织 等方面
	Email    string `orm:"index;unique"` // 电邮
	Salt     string // 加密的盐值
	Password string // 加密之后的密文

	Username string `orm:"index;unique"` // 用户名
	Nickname string `orm:"index"`        // 昵称
	Realname string // 真实姓名
	Content  string `orm:"size(1024)"` // 个人签名
	Avatar   string // 头像地址 48*48

	Birth time.Time `orm:"auto_now_add;type(date)"` // 生日

	Province string // 省份
	City     string // 城市
	Company  string // 公司
	Address  string // 地址
	Mobile   string `orm:"index"` // 手机
	Website  string // 个人官网
	Gender   int    // 0：Unknown, 1: Male， 2：Female
	Ctype    int64  `orm:"index"` // 类型
	Role     int64  `orm:"index"` // 角色

	Created time.Time `orm:"auto_now_add;type(datetime)"` // 创建时间
	Updated time.Time `orm:"type(datetime)"`              // 资料更新时间

	LastLoginTime time.Time `orm:"type(datetime);null"` // 最后登录时间
	LastLoginIp   string    `valid:"IP"`                // 最后登录的IP
	LoginCount    int64     // 登录次数

	Valid validation.Validation `orm:"-"`
}

type UserBind struct {
	Id        int64  //
	UId       int64  `orm:"index"` // 用户标识
	BindType  int    // 绑定类型
	AccountId string `orm:"index"`      // 绑定的账号标识
	BindInfo  string `orm:"size(1024)"` // 绑定附加信息
}

type UserStats struct {
	Id        int64   //
	UId       int64   `orm:"index"` // 用户标识
	Rank      int64   `orm:"index"` // 声望值
	Star      int64   `orm:"index"` // 枚徽章
	Hotness   float64 `orm:"index"` // 热度，Reddit算法生成
	Hotup     int64   // 赞
	Hotdown   int64   // 贬
	Hotscore  int64   // Hotup - Hotdown
	Hotvote   int64   // Hotup + Hotdown
	Views     int64   // 浏览数
	Questions int64   // 提问数
	Replys    int64   // 回答数
	Blogs     int64   // 文章数
	Fans      int64   // 粉丝数
}

//-----------------------------------------------------------------------------
func (u *User) Read(fields ...string) error {
	err := orm.NewOrm().Read(u, fields...)
	return err
}

func (u *User) Insert() error {
	_, err := orm.NewOrm().Insert(u)
	return err
}

func (u *User) Update(fields ...string) error {
	// fields = append(fields, "Updated")
	_, err := orm.NewOrm().Update(u, fields...)
	return err
}

func (u *User) Delete() error {
	_, err := orm.NewOrm().Delete(u)
	return err
}

func (u *User) ValidateEmail() *User {
	u.Valid.Email(u.Email, "Email").Message("Email格式不合符规格!")
	u.Valid.MaxSize(u.Email, 120, "Email").Message("Email最大长度不能超过120!")
	return u
}

func (u *User) ValidateUserName() *User {
	u.Valid.Match(u.Username, regexp.MustCompile("^[\\x{4e00}-\\x{9fa5}A-Z0-9a-z_-]{4,30}$"),
		"Username").Message("用户名是为永久性设定,不能少于4个字或多于30个字,请慎重考虑,不能为空!")
	if reserveUsers[u.Username] != "" {
		u.Valid.SetError("Username", "账号不允许使用!")
		return u
	}
	return u
}

func (u *User) ValidatePassword() *User {
	u.Valid.Match(u.Password, regexp.MustCompile(`^[\@A-Za-z0-9\!\#\$\%\^\&\*\~\{\}\[\]\.\,\<\>\(\)\_\+\=]{4,30}$`),
		"Password").Message("密码含有非法字符或密码过短(至少4~30位密码)!")
	return u
}

func Users() orm.QuerySeter {
	return orm.NewOrm().QueryTable("User")
}
