package utils

import (
	"fmt"
	"math"
)

//返回数字带数量级单位 千对k 百万对M  京对G
func Metric(n int64) string {

	switch {
	case n >= 1000:
		return fmt.Sprint(n/1000, "k")
	case n >= 1000000:
		return fmt.Sprint(n/1000000, "m")
	default:
		return fmt.Sprint(n)
	}
}

//round() 函数对浮点数进行四舍五入
//语法 round(val,prec) 参数 val 规定要舍入的数字。 prec 规定小数点后的位数
func Round(val float64, prec int) float64 {
	var t float64
	f := math.Pow10(prec)
	x := val * f
	if math.IsInf(x, 0) || math.IsNaN(x) {
		return val
	}
	if x >= 0.0 {
		t = math.Ceil(x)
		if (t - x) > 0.50000000001 {
			t -= 1.0
		}
	} else {
		t = math.Ceil(-x)
		if (t + x) > 0.50000000001 {
			t -= 1.0
		}
		t = -t
	}
	x = t / f

	if !math.IsInf(x, 0) {
		return x
	}

	return t
}
