package utils

import (
	"crypto/hmac"
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"encoding/hex"
	"time"

	fpath "path"
)

func Encrypt_hash(password string, salt []byte) string {
	if salt == nil {
		m := md5.New()
		m.Write([]byte(time.Now().String()))
		s := hex.EncodeToString(m.Sum(nil))
		salt = []byte(s[2:10])
	}
	mac := hmac.New(sha256.New, salt)
	mac.Write([]byte(password))
	//s := fmt.Sprintf("%x", (mac.Sum(salt)))
	s := hex.EncodeToString(mac.Sum(nil))

	hasher := sha1.New()
	hasher.Write([]byte(s))

	//result := fmt.Sprintf("%x", (hasher.Sum(nil)))
	result := hex.EncodeToString(hasher.Sum(nil))

	p := string(salt) + result

	return p
}

func Validate_hash(hashed string, input_password string) bool {
	salt := hashed[0:8]
	if hashed == Encrypt_hash(input_password, []byte(salt)) {
		return true
	} else {
		return false
	}
}

func VerifyUserfile(path string, usr string) bool {
	fname := fpath.Base(path)[0:48]
	if fhashed, e := Filehash(Url2local(path), nil); e == nil {
		return Validate_hash(fname, fhashed+usr)
	} else {
		return false
	}

}
