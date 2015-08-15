package models

import (
	"fmt"
	"strconv"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"github.com/wcreate/lawoto/utils"
)

func init() {
	dbname := "default" // 数据库别名

	dbtype := beego.AppConfig.String("dbtype")
	dbcfg, err := beego.AppConfig.GetSection(dbtype)
	if err != nil {
		panic(err)
	}

	var username string = dbcfg["username"]
	if username, err = utils.AesDecrypt(username); err != nil {
		panic(err)
	}

	var password string = dbcfg["password"]
	if password, err = utils.AesDecrypt(password); err != nil {
		panic(err)
	}

	url := dbcfg["url"]
	maxidle, _ := strconv.Atoi(dbcfg["maxidle"])
	maxconn, _ := strconv.Atoi(dbcfg["maxconn"])

	// 统一采用 UTC 时间
	orm.DefaultTimeLoc = time.UTC
	orm.Debug = true

	switch dbtype {
	case "mysql":
		orm.RegisterDriver("mysql", orm.DR_MySQL)
		orm.RegisterDataBase(dbname, "mysql",
			username+":"+password+"@"+url,
			maxidle, maxconn)
	}

	orm.RegisterModel(new(User), new(UserBind), new(UserStats))
	orm.RegisterModel(new(Question), new(Reply), new(QuestionMark), new(AnswerMark))
	orm.RegisterModel(new(Category))
	orm.RegisterModel(new(Blog))
	orm.RegisterModel(new(Comment))

	force := false                                 // drop table 后再建表
	verbose, _ := beego.AppConfig.Bool("SqlLogOn") // 打印执行过程
	// 遇到错误立即返回
	err = orm.RunSyncdb(dbname, force, verbose)
	if err != nil {
		fmt.Println(err)
	}
}
