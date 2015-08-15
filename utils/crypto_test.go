package utils

import "testing"

func TestMain(t *testing.T) {
	plaintext := "112414124141249fdfjaf"
	scuritytext, _ := AesEncrypt(plaintext)
	t.Log(scuritytext, len(scuritytext))
	plaintext2, _ := AesDecrypt(scuritytext)
	t.Log(plaintext2)
	if plaintext != plaintext2 {
		t.Fail()
	}

	v, _ := AesEncrypt("oto")
	t.Log("oto", v)
	v2, _ := AesEncrypt("123456")
	t.Log("123456", v2)

	v3, _ := AesEncrypt("1111")
	t.Log("mm", v3)

	t.Log(HmacSha256("plaintext", GetSalt(8)))
}
