package utils

import (
	"bufio"
	"crypto/md5"
	"crypto/sha1"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"os"
	"strconv"
)

func Exist(filename string) bool {
	_, err := os.Stat(filename)
	return err == nil || os.IsExist(err)
}

func FixedpathByNumber(n int, layer int) string {

	hash := md5.New()
	o := ""
	for i := 1; i < layer+1; i++ {

		s := strconv.Itoa(RangeRand(n^n/3+i) / 33)
		hash.Write([]byte(s))
		result := hex.EncodeToString(hash.Sum(nil))
		r := result[0:n]
		o += r + "/"
	}
	return o
}

func FixedpathByString(s string, layer int) string {

	hash := md5.New()
	output := ""
	for i := 1; i < layer+1; i++ {

		s += s + strconv.Itoa(i+i*i)
		hash.Write([]byte(s))
		result := hex.EncodeToString(hash.Sum(nil))
		r := result[0:2]
		output += r + "/"
	}
	return output
}

func Filehash(path_or string, file_or *os.File) (string, error) {
	if (path_or != "" && file_or == nil) || (path_or == "" && file_or != nil) {
		if path_or != "" && file_or == nil {

			if file, err := os.Open(path_or); err != nil {
				return "", err
			} else {
				defer file.Close()
				h := sha1.New()

				if _, erro := io.Copy(h, file); erro != nil {
					return "", erro
				} else {
					result := hex.EncodeToString(h.Sum(nil))
					return result, nil
				}
			}
		} else {
			h := sha1.New()
			if _, erro := io.Copy(h, file_or); erro != nil {
				return "", erro
			} else {
				result := hex.EncodeToString(h.Sum(nil))
				return result, nil
			}
		}
	}
	return "", errors.New("没有参数无法生成hash,请输入文件路径 或 *os.File!")
}

func Filehash_number(path string) (int, error) {

	if file, err := os.Open(path); err != nil {
		return 0, err
	} else {

		h := sha1.New()

		if _, erro := io.Copy(h, file); erro != nil {
			return 0, erro
		} else {
			result, _ := fmt.Printf("%d", h.Sum(nil))
			return result, nil
		}
	}

}

func Filehash_block(path string, block int64) string {
	file, err := os.Open(path)
	defer file.Close()
	hash := ""

	if err != nil {
		return ""
	}

	data := make([]byte, block)
	for {
		n, err := file.Read(data)

		if n != 0 {
			//hash = MD5(string(data))
			hash = SHA1(string(data))
		} else {
			break
		}

		if err != nil && err != io.EOF {
			//panic(err)
			return ""
		}
	}

	return hash
}

func WriteFile(path string, filename string, content string) error {
	//path = path[0 : len(path)-len(filename)]
	filename = path + filename
	os.MkdirAll(path, 0644)
	file, err := os.Create(filename)
	if err != nil {
		return err
	} else {
		writer := bufio.NewWriter(file)
		writer.WriteString(content)
		writer.Flush()
	}
	defer file.Close()
	return nil
}

func MoveFile(frompath string, topath string) error {

	if fromfile, err := os.Open(frompath); err != nil {
		return err
	} else {
		if tofile, err := os.OpenFile(topath, os.O_WRONLY|os.O_CREATE, 0644); err != nil {
			return err
		} else {
			io.Copy(tofile, fromfile)
			fromfile.Close()
			tofile.Close()
			os.Remove(frompath)
			/*
				io.Copy 在一般情况下拷贝不会出错，多个携程访问的时候可能会出现“read ./data/*.png: Access is denied.”的错误，
				造成这个错误的原因很可能是由于多个协程争抢打开文件导致，然而实际情况可能报错后却又删除成功。
				如果我们根据这个错误作出判断的话就会错上加错，所以在这里不做任何判断，完全由上帝决定好了。
			*/
			return nil
		}
	}
}
