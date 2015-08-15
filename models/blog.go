package models

import "time"

// Blog
type Blog struct {
	Id    int64 `orm:"pk;auto"` // 标识
	Cid   int64 `orm:"index"`   // 归属的分类
	Uid   int64 `orm:"index"`   // 用户标识
	Order int64 // 排序

	Ctype   int64  `orm:"index"`           // 0:unanswered, -1: close, 1: answered, 2:accepted
	Title   string `orm:"index"`           //
	Content string `orm:"type(text);null"` //
	Author  string `orm:"index"`           // 发表的作者，即UserName, 它注册时唯一，减少查询

	Attachment       string `orm:"size(512);null"` //
	Thumbnails       string // Original remote file
	ThumbnailsLarge  string
	ThumbnailsMedium string
	ThumbnailsSmall  string

	Tags    string    `orm:"index"`                             // Tag，以，分隔
	Created time.Time `orm:"auto_now_add;type(datetime);index"` //
	Updated time.Time `orm:"type(datetime);index"`              //

	Hotness  float64 `orm:"index"` // 热度，Reddit算法生成
	Hotup    int64   `orm:"index"` // 赞
	Hotdown  int64   `orm:"index"` // 贬
	Hotscore int64   `orm:"index"` // Hotup - Hotdown
	Hotvote  int64   `orm:"index"` // Hotup + Hotdown
	Views    int64   `orm:"index"` // 浏览数

	CommentTime         time.Time `orm:"type(datetime);null;index"`
	CommentCount        int64     `orm:"index"` // 评论个数
	CommentHotscore     int64     `orm:"index"` // Hotup - Hotdown
	CommentLastUserId   int64     // 评论用户标识
	CommentLastUsername string    // 评论用户名，即UserName, 它注册时唯一，减少查询

	FavoriteCount  int64 `orm:"index"` // 被收藏数
	RecommendCount int64 `orm:"index"` // 被推荐数
}
