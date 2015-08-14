package main

import (
	"github.com/astaxie/beego"
	_ "github.com/wcreate/lawoto/routers"
	"github.com/wcreate/lawoto/utils"
)

func main() {
	//模板函数
	beego.AddFuncMap("timesince", utils.TimeSince)
	beego.AddFuncMap("tags", utils.Tags)
	beego.AddFuncMap("metric", utils.Metric)
	beego.AddFuncMap("gravatar", utils.Gravatar)
	beego.AddFuncMap("markdown", utils.Markdown)
	beego.AddFuncMap("markdown2text", utils.Markdown2Text)

	beego.Run()
}
