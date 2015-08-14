package utils

import (
	"math"
	"time"
)

//reddit 排序算法
func Hotness_Score(ups int64, downs int64) int64 {
	return ups - downs
}

func Hotness(ups int64, downs int64, createTime time.Time) float64 {
	var x int64 = Hotness_Score(ups, downs)
	var y = 0.0
	var z int64 = 1
	switch {
	case x > 0:
		y = 1.0
		z = x
	case x < 0:
		y = -1.0
		z = -x
	}

	sitestartup := time.Date(2013, 8, 31, 0, 0, 0, 0, time.UTC)
	ts := createTime.Sub(sitestartup)
	scoretimestemp := 45000.0

	return math.Log10(float64(z)) + y*ts.Seconds()/scoretimestemp
}

//Stack Overflow热点问题排名算法
//Qviews（问题的浏览次数）
//Qanswers（回答的数量）
//Qscore（问题得分）
//Ascores（回答得分）
//Qage（距离问题发表的时间）
//Qupdated（距离最后一个回答的时间）
func Qhot(Qviews int64, Qanswers int64, Qscore int64, Ascores int64, Created time.Time, ReplyTime time.Time) float64 {
	Qage := float64(time.Now().Sub(Created)) / float64(time.Hour)
	Qage = Round(Qage, 1)
	//Qage = math.Floor(Qage + 0.5)

	Qupdated := float64(time.Now().Sub(ReplyTime)) / float64(time.Hour)
	Qupdated = Round(Qupdated, 1)
	//Qupdated = math.Floor(Qupdated + 0.5)

	dividend := (math.Log10(float64(Qviews)) * 4) + ((float64(Qanswers) * float64(Qscore)) / 5) + float64(Ascores)
	divisor := math.Pow(((Qage + 1) - (Qage-Qupdated)/2), 1.5)

	return dividend / divisor
}

func Qhot_QScore(ups int64, downs int64) int64 {
	//Qscore（问题得分）= 赞成票-反对票
	return ups - downs
}

func Qhot_AScore(ups int64, downs int64) int64 {
	//AScore（回答得分）= 赞成票-反对票
	return ups - downs
}

func Qhot_Vote(ups int64, downs int64) int64 {
	return ups + downs
}
