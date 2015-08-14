package utils

import (
	"regexp"
	"strings"
)

// 获取文本中 @user 中的用户名集合
func AtUsers(content string) (usrs []string) {
	// 新浪微博中的用户名格式为是“4-30个字符，支持中英文、数字、"_"或减号”
	// 也就是说，支持中文、字母、数字、下划线及减号，并且是4到30个字符,这里 汉字作为一个字符

	rx := regexp.MustCompile("@([\\x{4e00}-\\x{9fa5}A-Z0-9a-z_-]+)")
	//^[\\x{4e00}-\\x{9fa5}]+$
	//rx := regexp.MustCompile("@[^,，：:\\s@]{4,30}")
	atusr := rx.FindAllSubmatch([]byte(content), -1)
	for _, v := range atusr {
		if m := string(v[1]); m != "" {
			//usrs = append(usrs, m)
			if ContainsSets(usrs, m) {
				continue
			} else {
				usrs = append(usrs, m)
			}
		}
	}

	return usrs
}

// 获取文本中 @urls 的网址集合 ###AtPages函数的作用是提取@后面的url网址,并不是提取图片,请注意!
func AtPages(content string) ([]string, string) {
	urls := []string{}
	rxs := "@([a-zA-z]+://[^\\s]*)"
	rx := regexp.MustCompile(rxs)

	aturl := rx.FindAllSubmatch([]byte(content), -1)

	if len(aturl) > 0 {

		for _, v := range aturl {
			if m := string(v[0]); m != "" {

				if !ContainsSets(urls, m[1:]) {
					//替换@link链接
					content = strings.Replace(content, m,
						"<a href='/url/?localtion="+m[1:]+"' target='_blank' rel='nofollow'><span>@</span><span>"+m[1:]+"</span></a>", -1)

					urls = append(urls, m[1:])
				}
			}
		}
	}

	return urls, content
}

func AtPagesGetImages(content string) ([]string, string) {
	imgs := []string{}
	links, content := AtPages(content)
	for _, v := range links {

		page, _ := GetPage(v)
		imgz, n := GetImages(page)

		if n > 0 {
			for _, vv := range imgz {
				//vv为单图url 相对路径的处理较为复杂,这里暂时抛弃相对路径的图片 后续再修正
				if strings.HasPrefix(vv, "/") {

					if strings.HasSuffix(v, "/") {
						vv = v + vv[1:]
					} else {
						vv = v + vv
					}

					//vv = v + vv[1:]
				} else {
					vv = Fixurl(v, vv)
				}
				if !strings.HasPrefix(vv, "../") {

					if !strings.HasSuffix(v, "js") {
						if !ContainsSets(imgs, vv) {
							imgs = append(imgs, vv)
						}
					}
				}

			}
		}
	}
	return imgs, content
}
