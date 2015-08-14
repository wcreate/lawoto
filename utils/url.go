package utils

import (
	"regexp"
	"strings"
)

func IsLocal(path string) bool {
	if path != "" {
		/*
			把本地路径的无点形式转为有点形式
			转换之后,如果之前传入的是恰好是一个网址而不是本地路径,则在后面的分拣中会把它列入并非本地路径的行列
			因为本地路径在本系统中是预设想必为当前网站项目文件夹范围内的 ./root/path  而不能跳出 到 ../root/path外,
			所以跳出到 ../root/path 外的路径必定不是本地路径!
		*/
		path = Url2local(path)

		//检查带点的本地路径
		s := strings.SplitN(path, ".", -1)
		if len(s) > 1 && len(s) < 4 {
			//通过路径的前缀是否为"/"判断是不是本地文件
			if s[1] != "" {
				if strings.HasPrefix(s[1], "/") {
					return true
				} else {
					// 第一轮次检查的时候碰上"/"开头的本地路径会判断不出来,需要再进行第2次判断"/"开头的情况
					ss := strings.SplitN("."+s[1], ".", -1)
					if len(ss) > 1 && len(ss) < 4 {
						//通过路径的前缀是否为"/"判断是不是本地文件
						if ss[1] != "" {
							if strings.HasPrefix(ss[1], "/") {
								return true
							} else {
								return false
							}
						} else {
							return false
						}
					}
					return false
				}
			} else {
				return false
			}
		}
	}
	return false
}

func Local2url(path string) string {
	if strings.HasPrefix(path, "./") {
		path = strings.Replace(path, "./", "/", -1)
	}
	return path
}

func Url2local(path string) string {
	if strings.HasPrefix(path, "/") {
		path = strings.Replace(path, "/", "./", 1)
	}
	return path
}

//设置后缀
func SetSuffix(content string, str string) string {

	content = Url2local(content)
	if content != "" {

		s := strings.SplitN(content, ".", -1)

		if len(s) > 1 && len(s) < 4 {
			// 判断是不是本地文件或本地路径
			if s[1] != "" && IsLocal(s[1]) {
				return Local2url(s[1] + str)
			} else {
				return Local2url(content)
			}
		}

	}
	return Local2url(content)
}

func Fixurl(current_url, url string) string {

	re1, _ := regexp.Compile("http[s]?://[^/]+")
	destrooturl := re1.FindString(current_url)

	//当url为：//wahaha/xiaoxixi/tupian.png
	if strings.HasPrefix(url, "//") {
		url = "http:" + url
	} else if strings.HasPrefix(url, "/") {
		// re1,_ := regexp.Compile("http[s]?://[^/]+")
		// destrooturl := re1.FindString(current_url)
		url = destrooturl + url
	}

	//当url为："../wahaha/xiaoxixi/tupian.png"、"./wahaha/xiaoxixi/tupian.png"、"wahaha/xiaoxixi/tupian.png"
	if !strings.HasPrefix(url, "/") && !strings.HasPrefix(url, "http") && !strings.HasPrefix(url, "https") {
		// current_url = strings.TrimSuffix(current_url, "/")
		if destrooturl == current_url {
			url = current_url + "/" + url
		} else {
			re2, _ := regexp.Compile("[^/]+?$")
			url = re2.ReplaceAllString(current_url, "") + url
		}

	}

	return url
}
