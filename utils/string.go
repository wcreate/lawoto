package utils

import (
	"regexp"
	"strings"
	"unicode/utf16"
)

func Rex(text string, iregexp string) (b bool) {
	if ok, _ := regexp.MatchString(iregexp, text); !ok {
		return false
	}
	return true
}

//字符串转换来unit16
func StringToUTF16(s string) []uint16 {
	return utf16.Encode([]rune(s + "\x00"))
}

//截取字符
func Substr(str string, start, length int, symbol string) string {
	rs := []rune(str)
	rl := len(rs)
	end := 0

	if start < 0 {
		start = rl - 1 + start
	}
	end = start + length

	if start > end {
		start, end = end, start
	}

	if start < 0 {
		start = 0
	}
	if start > rl {
		start = rl
	}
	if end < 0 {
		end = 0
	}
	if end > rl {
		end = rl
	}

	return string(rs[start:end]) + symbol
}

//分割tags
func Tags(content string, str string) []string {

	if content != "" && str != "" {

		ss := []string{}
		s := strings.SplitN(content, str, -1)
		for _, v := range s {
			if v != "" {
				ss = append(ss, v)
			}
		}

		return ss

	}
	return nil
}
