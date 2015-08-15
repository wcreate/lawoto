package user

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/astaxie/beego"
	"github.com/wcreate/lawoto/setting"
)

type AvatarController struct {
	UserController
}

func (self *AvatarController) Post() {
	result := make([]interface{}, 2)
	result[0] = 1
	result[1] = ""

	defer func() {
		self.Data["json"] = &result
		self.ServeJson()
	}()

	//
	f, h, err := self.GetFile("avatar")
	if err != nil {
		fmt.Println("getfile err ", err)
	}
	fmt.Println("filename:", h.Filename)
	defer f.Close()

	//
	ext := h.Filename[strings.LastIndex(h.Filename, ".")+1:]
	path := "upload/avatar/" + beego.Date(time.Now(), "y/m/d/h/")
	os.MkdirAll(path, 0744)
	tofile := path + strconv.Itoa(int(self.Uid)) + "." + ext

	tf, err := os.OpenFile(tofile, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		fmt.Println("write failed:", err)
		return
	}
	defer tf.Close()
	io.Copy(tf, f)

	if self.U.Avatar != "" && self.U.Avatar != setting.Default_Avatar {
		os.Remove(self.U.Avatar[1:])
	}
	self.U.Avatar = "/" + tofile
	self.U.Update("Avatar")
	self.SetSession("useravatar", self.U.Avatar)

	//
	result[0] = 0
	result[1] = self.U.Avatar
}
