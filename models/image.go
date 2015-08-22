package models

import "time"

// 图片上传的记录
type Image struct {
	Id  int64
	Uid int64 `orm:"index"`
	Pid int64 `orm:"index"`

	Ctype int64 // 0: question 1: blog
	Url   string

	Created time.Time `orm:"auto_now_add;type(datetime)"`

	Status int64 // 0: OK, 1: need to clean
}

func DelImageByLocation(location string) error {

	// if row, err := Engine.Where("location=?", helper.Local2url(location)).Delete(new(Image)); err != nil || row == 0 {
	// 	fmt.Println("row:", row)
	// 	fmt.Println("DelImageBylocation删除话题错误:", err)
	// 	return err
	// } else {
	// 	return nil
	// }
	return nil
}
