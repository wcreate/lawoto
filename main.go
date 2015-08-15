package main

import (
	"github.com/astaxie/beego"
	"github.com/wcreate/lawoto/models"
	_ "github.com/wcreate/lawoto/routers"
	"github.com/wcreate/lawoto/utils"
)

func main() {
	//模板函数
	beego.AddFuncMap("timesince", utils.TimeSince)
	beego.AddFuncMap("tags", utils.Tags)
	beego.AddFuncMap("metric", utils.Metric)
	beego.AddFuncMap("markdown", utils.Markdown)
	beego.AddFuncMap("markdown2text", utils.Markdown2Text)
	beego.AddFuncMap("avatar", models.GetAvatar)

	beego.Run()
}
