package setting

import "github.com/astaxie/beego/logs"

const (
	Version = "0.0.1"
)

var (
	Log *logs.BeeLogger
)

func init() {
	Log = logs.NewLogger(1000)
	Log.Async()
	Log.SetLogger("console", `{"level":1}`)
}
