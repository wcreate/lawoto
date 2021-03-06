package models

import (
	"regexp"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
	"github.com/wcreate/lawoto/setting"
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

const (
	// 用户类型
	User_General = iota
	User_Lawyer
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

// 用户基本信息
type User struct {
	Id       int64  `orm:"pk;auto"`
	Pid      int64  // 用在归属地 归属学校 归属组织 等方面
	Email    string `orm:"index;unique"` // 电邮
	Salt     string // 加密的盐值
	Password string // 加密之后的密文
	Cfmcode  string // 邮件确认码

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

// 用户与第三系统的绑定信息
type UserBind struct {
	Id        int64  //
	UId       int64  `orm:"index"` // 用户标识
	BindType  int    // 绑定类型
	AccountId string `orm:"index"`      // 绑定的账号标识
	BindInfo  string `orm:"size(1024)"` // 绑定附加信息
}

// 用户统计信息
type UserStats struct {
	Id        int64   //
	UId       int64   `orm:"index;unique"` // 用户标识
	Rank      int64   `orm:"index"`        // 声望值
	Star      int64   `orm:"index"`        // 枚徽章
	Hotness   float64 `orm:"index"`        // 热度，Reddit算法生成
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
	//
	//us := &UserStats{Uid: id}
	//orm.NewOrm().Insert(us)
	return err
}

func (u *User) Update(fields ...string) (int64, error) {
	// fields = append(fields, "Updated")
	row, err := orm.NewOrm().Update(u, fields...)
	return row, err
}

func (u *User) Delete() error {
	_, err := orm.NewOrm().Delete(u)
	return err
}

func Users() orm.QuerySeter {
	return orm.NewOrm().QueryTable("User")
}

func (u *User) ReadOneOnly(fields ...string) error {
	fields = append(fields, "Id")
	return Users().Filter("Id", u.Id).One(u, fields...)
}

func GetAvatar(uid int64) (avatar string) {
	u := &User{Id: uid}
	avatar = setting.Default_Avatar
	if err := u.ReadOneOnly("Avatar"); err != orm.ErrNoRows {
		avatar = u.Avatar
	}

	if avatar == "" {
		avatar = setting.Default_Avatar
	}
	return avatar
}

func (u *User) ValidateEmail() *User {
	u.Valid.Email(u.Email, "Email").Message("Email格式不合符规格!")
	u.Valid.MaxSize(u.Email, 120, "Email").Message("Email最大长度不能超过120!")

	if err := u.Read("Email"); err != orm.ErrNoRows {
		u.Valid.SetError("Username", "Email已被注册使用了，请换其它的Email!")
		return u
	}
	return u
}

func (u *User) ValidateUserName() *User {
	u.Valid.Match(u.Username, regexp.MustCompile("^[\\x{4e00}-\\x{9fa5}A-Z0-9a-z_-]{4,30}$"),
		"Username").Message("用户名是为永久性设定,不能少于4个字或多于30个字,请慎重考虑,不能为空!")
	//
	if reserveUsers[u.Username] != "" {
		u.Valid.SetError("Username", "账号不允许使用!")
		return u
	}
	//
	if err := u.Read("Username"); err != orm.ErrNoRows {
		u.Valid.SetError("Username", "此账号已存在不能使用!")
		return u
	}

	return u
}

func (u *User) ValidatePassword() *User {
	u.Valid.Match(u.Password, regexp.MustCompile(`^[\@A-Za-z0-9\!\#\$\%\^\&\*\~\{\}\[\]\.\,\<\>\(\)\_\+\=]{4,30}$`),
		"Password").Message("密码含有非法字符或密码过短(至少4~30位密码)!")
	return u
}

func (u *User) ValidateMobile() *User {
	if u.Mobile != "" {
		u.Valid.Mobile(u.Mobile, "Mobile").Message("移动电话格式不对，请输入11位的电话号码。")
	}
	return u
}
