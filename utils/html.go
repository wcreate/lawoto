package utils

import (
	"html/template"
	"regexp"
	"strings"

	"github.com/russross/blackfriday"
)

func Markdown(md string) template.HTML {
	text := strings.Replace(string(blackfriday.MarkdownCommon([]byte(md))), "&amp;#34;", "&#34;", -1) // &#34; """
	text = strings.Replace(text, "&amp;#39;", "&#39;", -1)                                            //&#39; '''
	text = strings.Replace(text, "&amp;lt;", "&lt;", -1)                                              // <
	text = strings.Replace(text, "&amp;gt;", "&gt;", -1)                                              // >
	text = strings.Replace(text, "&amp;hellip;", "&hellip;", -1)                                      // 省略号
	text = strings.Replace(text, "&hellip;", "…", -1)                                                 // 省略号
	return template.HTML(text)
}

func Markdown2Text(md string) string {
	re, _ := regexp.Compile("\\<[\\S\\s]+?\\>")
	text := re.ReplaceAllString(string(Markdown(md)), "")
	return text
}

func Htmlquote(text string) string {
	//HTML编码为实体符号
	/*
	   Encodes `text` for raw use in HTML.
	       >>> htmlquote("<'&\\">")
	       '&lt;&#39;&amp;&quot;&gt;'
	*/

	text = strings.Replace(text, "&", "&amp;", -1) // Must be done first!
	text = strings.Replace(text, "…", "&hellip;", -1)
	text = strings.Replace(text, "<", "&lt;", -1)
	text = strings.Replace(text, ">", "&gt;", -1)
	text = strings.Replace(text, "'", "&#39;", -1)
	text = strings.Replace(text, "\"", "&#34;", -1)
	text = strings.Replace(text, "\"", "&quot;", -1)
	text = strings.Replace(text, "“", "&ldquo;", -1)
	text = strings.Replace(text, "”", "&rdquo;", -1)
	text = strings.Replace(text, " ", "&nbsp;", -1)
	return text
}

func Htmlunquote(text string) string {
	//实体符号解释为HTML
	/*
	   Decodes `text` that's HTML quoted.
	       >>> htmlunquote('&lt;&#39;&amp;&quot;&gt;')
	       '<\\'&">'
	*/

	// strings.Replace(s, old, new, n)
	// 在s字符串中，把old字符串替换为new字符串，n表示替换的次数，小于0表示全部替换

	text = strings.Replace(text, "&nbsp;", " ", -1)
	text = strings.Replace(text, "&rdquo;", "”", -1)
	text = strings.Replace(text, "&ldquo;", "“", -1)
	text = strings.Replace(text, "&quot;", "\"", -1)
	text = strings.Replace(text, "&#34;", "\"", -1)
	text = strings.Replace(text, "&#39;", "'", -1)
	text = strings.Replace(text, "&gt;", ">", -1)
	text = strings.Replace(text, "&lt;", "<", -1)
	text = strings.Replace(text, "&hellip;", "…", -1)
	text = strings.Replace(text, "&amp;", "&", -1) // Must be done last!
	return text
}

func Html2str(html string) string {
	src := string(html)

	//替换HTML的空白字符为空格
	re := regexp.MustCompile(`\s`) //ns*r
	src = re.ReplaceAllString(src, " ")

	//将HTML标签全转换成小写
	re, _ = regexp.Compile("\\<[\\S\\s]+?\\>")
	src = re.ReplaceAllStringFunc(src, strings.ToLower)

	//去除STYLE
	re, _ = regexp.Compile("\\<style[\\S\\s]+?\\</style\\>")
	src = re.ReplaceAllString(src, "")

	//去除SCRIPT
	re, _ = regexp.Compile("\\<script[\\S\\s]+?\\</script\\>")
	src = re.ReplaceAllString(src, "")

	//去除所有尖括号内的HTML代码，并换成换行符
	re, _ = regexp.Compile("\\<[\\S\\s]+?\\>")
	src = re.ReplaceAllString(src, "\n")

	//去除连续的换行符
	re, _ = regexp.Compile("\\s{2,}")
	src = re.ReplaceAllString(src, "\n")

	return strings.TrimSpace(src)
}

func Str2html(raw string) template.HTML {
	return template.HTML(raw)
}
