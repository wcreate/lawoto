package utils

import (
	"fmt"
	"math"
	"time"
)

/** 微博时间格式化显示
 * @param timestamp，标准时间戳
 */
func TimeSince(created time.Time) string {

	//减去8小时
	//d, _ := time.ParseDuration("-8h")
	d, _ := time.ParseDuration("+8h")
	t := created.Add(d)

	since := int(time.Since(t).Minutes())
	output := ""
	switch {
	case since < 0:
		output = fmt.Sprintf("穿越了 %d 分钟..", -since)
	case since < 1:
		output = "刚刚" //"小于 1 分钟"
	case since < 60:
		output = fmt.Sprintf("%d 分钟之前", since)
	case since < 60*24:
		output = fmt.Sprintf("%d 小时之前", since/(60))
	case since < 60*24*30:
		output = fmt.Sprintf("%d 天之前", since/(60*24))
	case since < 60*24*365:
		output = fmt.Sprintf("%d 月之前", since/(60*24*30))
	default:
		output = fmt.Sprintf("%d 年之前", since/(60*24*365))
	}
	return output
}

func SmcTimeSince(timeAt time.Time) string {
	now := time.Now()
	since := math.Abs(float64(now.UTC().Unix() - timeAt.UTC().Unix()))

	output := ""
	switch {
	case since < 60:
		output = "刚刚"
	case since < 60*60:
		output = fmt.Sprintf("%v分钟前", math.Floor(since/60))
	case since < 60*60*24:
		output = fmt.Sprintf("%v小时前", math.Floor(since/3600))
	case since < 60*60*24*2:
		output = fmt.Sprintf("昨天%v", timeAt.Format("15:04"))
	case since < 60*60*24*3:
		output = fmt.Sprintf("前天%v", timeAt.Format("15:04"))
	case timeAt.Format("2006") == now.Format("2006"):
		output = timeAt.Format("1月2日 15:04")
	default:
		output = timeAt.Format("2006年1月2日 15:04")
	}

	return output
}

//获取这个小时的开始点
func ThisHour() time.Time {
	t := time.Now()
	year, month, day := t.Date()
	hour, _, _ := t.Clock()

	return time.Date(year, month, day, hour, 0, 0, 0, time.UTC)
}

//获取今天的开始点
func ThisDate() time.Time {
	t := time.Now()
	year, month, day := t.Date()

	return time.Date(year, month, day, 0, 0, 0, 0, time.UTC)
}

//获取这周的开始点
func ThisWeek() time.Time {
	t := time.Now()
	year, month, day := t.AddDate(0, 0, -1*int(t.Weekday())).Date()

	return time.Date(year, month, day, 0, 0, 0, 0, time.UTC)
}

//获取这月的开始点
func ThisMonth() time.Time {
	t := time.Now()
	year, month, _ := t.Date()

	return time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
}

//获取今年的开始点
func ThisYear() time.Time {
	t := time.Now()
	year, _, _ := t.Date()

	return time.Date(year, 1, 1, 0, 0, 0, 0, time.UTC)
}
