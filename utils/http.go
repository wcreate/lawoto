package utils

import (
	"bytes"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

// 返回获得的网页内容
func GetPage(url string) (string, error) {

	//ua := "Mozilla/5.0 (Windows; U; Windows NT 8.8; en-US) AppleWebKit/883.13 (KHTML, like Gecko) Chrome/88.3.13.87 Safari/883.13"
	ua := "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.92 Safari/537.1 VERYHOURSPIDER"
	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", err
	}

	req.Header.Set("User-Agent", ua)

	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	return string(body), err

}

func PingFile(url string) bool {
	r, e := http.Head(url)
	if e != nil {
		return false
	} else {

		if r.Status == "404" {
			return false
		}
	}
	return true
}

//发送报文 是否加密 HTTP状态 动作URL 数据内容 RSA公匙
func SendingPackets(encrypt bool, status string, actionurl string, content string, aesKey string, aesPublicKey string, rsaPublicKey []byte) (*http.Response, error) {
	/*
	   1.对数据进行AES加密
	   2.对AES密匙KEY进行RSA加密
	   3.POST的时候,把RSA密码串放置于URL发送
	   4.POST的时候,把AES密码串放置于BODY发送
	*/
	//只有公钥则只能加密  公钥私钥都有才能解密 所以私匙不能在客户端公开  客户端获取的内容由服务端的权限控制决定
	var body_buf io.Reader
	if encrypt {
		// AES对内容进行加密
		if aes_encrypt_content, err := AesEncryptWithKey(content, aesKey, aesPublicKey); err != nil {

			return nil, err
		} else {
			body_buf = bytes.NewBufferString(aes_encrypt_content)

			// 对AES密匙aesKey进行RSA加密

			if rsa_encrypt_content, err := RsaEncryptWithKey([]byte(aesKey), rsaPublicKey); err != nil {

				return nil, err
			} else {
				//转换RSA密文BYTE编码为16进制字符串
				aesKey = fmt.Sprintf("%x", rsa_encrypt_content)

			}
		}

	} else {
		// 无需加密
		body_buf = bytes.NewBufferString(content)

	}

	// hash就是各种内容的混合体加key的hash值,验证这个hash是否一致来保证内容不被非法更改
	createtime := strconv.Itoa(int(time.Now().UnixNano()))
	// hash+createtime+aeskey
	actionurl = actionurl + "?hash=" + Encrypt_hash(status+createtime+string(content)+string(rsaPublicKey), nil) + "-" + createtime + "-" + aesKey

	if req, err := http.NewRequest(status, actionurl, body_buf); err != nil {
		return nil, err

	} else {
		hd, err := http.DefaultClient.Do(req)
		return hd, err
	}
}

func ReceivingPackets(decrypt bool, hash string, status string, content []byte, aesPublicKey string, rsaPublicKey []byte, rsaPrivateKey []byte) ([]byte, error) {

	//防擅改校验数据
	if hash != "" {
		/*
		   1.对AES数据进行AES解密得出内容
		   2.对RSA数据进行RSA解密得出AES密匙KEY
		*/

		//分解hash+createtime+aeskey
		s := strings.Split(hash, "-")
		hash = s[0]
		createtime := s[1]
		aseKey := s[2]

		//若 decrypt为真则进行解密
		if decrypt {
			if aseKey != "" {

				//对16进制字符串aseKey进行解码
				if x, err := hex.DecodeString(aseKey); err == nil {

					//RSA解密  得出 AES KEY
					if rsa_decrypt_content, err := RsaDecryptWithKey(x, rsaPrivateKey); err != nil {
						return nil, err
					} else {
						//还原  aseKey
						aseKey = string(rsa_decrypt_content)

						//对AES数据进行AES解密得出内容
						if aes_decrypt_content, err := AesDecryptWithKey(string(content), aseKey, aesPublicKey); err != nil {
							return nil, err
						} else {
							content = []byte(aes_decrypt_content)
						}
					}
				} else {
					//16进制解码错误
					return nil, err
				}

			} else {
				return nil, errors.New("AES KEY为空无法进行解密")
			}
		}

		if (hash != "") && (createtime != "") {

			if Validate_hash(hash, status+createtime+string(content)+string(rsaPublicKey)) {
				//返回数据明文
				return content, nil
			} else {
				return nil, errors.New("报文无法通过数据校验")
			}
		}
	}
	return nil, errors.New("数据校验HASH值为空")
}

func GetFile(file_url string, file_path string, useragent string, referer string) error {

	f, err := os.OpenFile(file_path, os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		fmt.Println("os.OpenFile errors:", err)
		return err
	}
	stat, err := f.Stat() //获取文件状态
	if err != nil {
		fmt.Println("f.Stat() errors:", err)
		return err
	}

	ss, _ := strconv.Atoi(fmt.Sprintf("%v", stat.Size))
	f.Seek(int64(ss), 0) //把文件指针指到文件末

	req, err := http.NewRequest("GET", file_url, nil)
	if err != nil {
		fmt.Println("http.NewRequest errors:", err)
		return err
	}

	if useragent == "default" {
		useragent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31"
	}

	if referer != "" {
		req.Header.Set("Referer", referer)
	}

	req.Header.Set("User-Agent", useragent)
	req.Header.Set("Range", "bytes="+fmt.Sprintf("%v", stat.Size)+"-")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("client.Do(req) errors:", err)
		return err
	}

	defer f.Close()
	defer resp.Body.Close()

	if written, err := io.Copy(f, resp.Body); err != nil {
		return err
	} else {

		if fs, e := os.Stat(file_path); e != nil {
			if ferr := os.Remove(file_path); ferr != nil {
				fmt.Println("Remove file error:", ferr)
			}
			return err
		} else {

			if rh, e := strconv.Atoi(resp.Header.Get("Content-Length")); e != nil || (fs.Size() != int64(rh)) {
				if rh != 0 {

					if fs.Size() != int64(rh) {

						er := errors.New(file_url + " save failed!")
						fmt.Println(er)

						if ferr := os.Remove(file_path); ferr != nil {
							fmt.Println("Remove file error:", ferr)
						}
						return er

					}
					return e
				} else {

					fmt.Println(file_url + " download success!")
					fmt.Println("written: ", written)
				}
			} else {

				fmt.Println(file_url + " download success!")
				fmt.Println("written: ", written)
			}
		}
	}
	return err
}

func PostFile(filepath string, actionurl string, fieldname string) (*http.Response, error) {
	body_buf := bytes.NewBufferString("")
	body_writer := multipart.NewWriter(body_buf)

	// use the body_writer to write the Part headers to the buffer
	_, err := body_writer.CreateFormFile(fieldname, filepath)
	if err != nil {
		fmt.Println("error writing to buffer")
		return nil, err
	}

	// the file data will be the second part of the body
	fh, err := os.Open(filepath)
	if err != nil {
		fmt.Println("error opening file")
		return nil, err
	}
	defer fh.Close()
	// need to know the boundary to properly close the part myself.
	boundary := body_writer.Boundary()
	close_string := fmt.Sprintf("\r\n--%s--\r\n", boundary)
	close_buf := bytes.NewBufferString(close_string)
	// use multi-reader to defer the reading of the file data until writing to the socket buffer.
	request_reader := io.MultiReader(body_buf, fh, close_buf)
	fi, err := fh.Stat()
	if err != nil {
		fmt.Printf("Error Stating file: %s", filepath)
		return nil, err
	}

	if req, err := http.NewRequest("POST", actionurl, request_reader); err != nil {
		return nil, err
	} else {

		// Set headers for multipart, and Content Length
		req.Header.Add("Content-Type", "multipart/form-data; boundary="+boundary)
		req.ContentLength = fi.Size() + int64(body_buf.Len()) + int64(close_buf.Len())

		return http.DefaultClient.Do(req)
	}

}
