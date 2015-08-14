package utils

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/hmac"
	"crypto/md5"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/hex"
	"encoding/pem"
	"fmt"

	"errors"
	"io"

	crand "crypto/rand"
)

const (
	aesTable = "ywlSRb80TaCQ4b7b"
)

var (
	aesBlock       cipher.Block
	ErrAESTextSize = errors.New("ciphertext is not a multiple of the block size")
	ErrAESPadding  = errors.New("cipher padding size error")
)

func init() {
	var err error
	aesBlock, err = aes.NewCipher([]byte(aesTable))
	if err != nil {
		panic(err)
	}
}

// AES解密
func AesDecrypt(scuritytext string) (string, error) {
	src, _ := base64.StdEncoding.DecodeString(scuritytext)
	// 长度不能小于aes.Blocksize
	if len(src) < aes.BlockSize*2 || len(src)%aes.BlockSize != 0 {
		return "", ErrAESTextSize
	}

	srcLen := len(src) - aes.BlockSize
	decryptText := make([]byte, srcLen)
	iv := src[srcLen:]
	mode := cipher.NewCBCDecrypter(aesBlock, iv)
	mode.CryptBlocks(decryptText, src[:srcLen])
	paddingLen := int(decryptText[srcLen-1])
	if paddingLen > 16 {
		return "", ErrAESPadding
	}

	return string(decryptText[:srcLen-paddingLen]), nil
}

// AES加密
func AesEncrypt(plaintext string) (string, error) {
	src := []byte(plaintext)
	padLen := aes.BlockSize - (len(src) % aes.BlockSize)
	for i := 0; i < padLen; i++ {
		src = append(src, byte(padLen))
	}

	srcLen := len(src)
	encryptText := make([]byte, srcLen+aes.BlockSize)
	iv := encryptText[srcLen:]
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return "", err
	}

	mode := cipher.NewCBCEncrypter(aesBlock, iv)
	mode.CryptBlocks(encryptText[:srcLen], src)

	return base64.StdEncoding.EncodeToString(encryptText), nil

}

//
func GetSalt(len int) string {
	salt := make([]byte, len)
	if _, err := io.ReadFull(rand.Reader, salt); err != nil {
		return ""
	}
	return base64.StdEncoding.EncodeToString(salt)
}

//
func HmacSha256(plaintext, salt string) string {
	bs := []byte(salt)
	mac := hmac.New(sha256.New, bs)
	mac.Write([]byte(plaintext))
	mac.Write(bs)
	scuritytext := mac.Sum(nil)
	return hex.EncodeToString(scuritytext)
}

func MD5(s string) string {
	hash := md5.New()
	hash.Write([]byte(s))
	result := hex.EncodeToString(hash.Sum(nil))
	return result
}

// 对字符串进行md5哈希,
// 返回16位小写md5结果
func MD5_16(s string) string {
	return MD5(s)[8:24]
}

// 对字符串进行sha1哈希,
// 返回42位小写sha1结果
func SHA1(s string) string {

	hasher := sha1.New()
	hasher.Write([]byte(s))

	//result := fmt.Sprintf("%x", (hasher.Sum(nil)))
	result := hex.EncodeToString(hasher.Sum(nil))
	return result
}

// AES加密
func AesEncryptWithKey(content string, privateKey string, publicKey string) (string, error) {

	if c, err := aes.NewCipher([]byte(privateKey)); err != nil {
		fmt.Println("AesEncrypt:", err)
		return "", err
	} else {

		cfb := cipher.NewCFBEncrypter(c, []byte(publicKey))
		ciphertext := make([]byte, len(content))
		cfb.XORKeyStream(ciphertext, []byte(content))

		return string(ciphertext), err
	}

}

//AES解密
func AesDecryptWithKey(ciphertext string, privateKey string, publicKey string) (string, error) {

	if c, err := aes.NewCipher([]byte(privateKey)); err != nil {
		return "", err
	} else {

		cipherz := []byte(ciphertext)
		cfbdec := cipher.NewCFBDecrypter(c, []byte(publicKey))
		contentCopy := make([]byte, len(cipherz))
		cfbdec.XORKeyStream(contentCopy, cipherz)

		return string(contentCopy), err
	}
}

// RSA加密
func RsaEncryptWithKey(origData []byte, publicKey []byte) ([]byte, error) {
	block, _ := pem.Decode(publicKey)
	if block == nil {
		return nil, errors.New("public key error")
	}
	pubInterface, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		return nil, err
	}
	pub := pubInterface.(*rsa.PublicKey)
	return rsa.EncryptPKCS1v15(crand.Reader, pub, origData)
}

// RSA解密
func RsaDecryptWithKey(ciphertext []byte, privateKey []byte) ([]byte, error) {
	block, _ := pem.Decode(privateKey)
	if block == nil {
		return nil, errors.New("private key error!")
	}
	priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, err
	}
	return rsa.DecryptPKCS1v15(crand.Reader, priv, ciphertext)
}

func Base64Encoding(s string) string {
	var buf bytes.Buffer
	encoder := base64.NewEncoder(base64.StdEncoding, &buf)
	defer encoder.Close()
	encoder.Write([]byte(s))
	return buf.String()
}
