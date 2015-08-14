package utils

//差集
func DifferenceSets(a []string, b []string) []string {

	f := make([]string, 0)

	for _, v := range a {
		//如果a集合某元素存在于b集合中
		var in bool
		for _, vv := range b {
			if v == vv {
				in = true
				break
			}
		}
		if !in {
			f = append(f, v)
		}
	}
	return f
}

//交集
func IntersectionSets(fora []string, forb []string) []string {

	i, c, d := []string{}, []string{}, []string{}
	if len(fora) > len(forb) {

		c = forb
		d = fora

	} else {

		c = fora
		d = forb
	}
	for _, v := range c {

		//如果c集合中某元素v存在于d集合中
		for _, vv := range d {
			if v == vv {
				i = append(i, v)
				break
			}
		}
	}
	return i
}

//对称差=并集-交集  即是 并集和交集的差集就是对称差
func SymmetricDifferenceSets(fora []string, forb []string) []string {

	return DifferenceSets(UnionSets(fora, forb), IntersectionSets(fora, forb))
}

//并集
func UnionSets(fora []string, forb []string) []string {
	uvalue := []string{}
	//求两个字符串数组的并集
	for _, v := range fora {
		if ContainsSets(uvalue, v) {
			continue
		} else {
			uvalue = append(uvalue, v)
		}

	}
	for _, v := range forb {
		if ContainsSets(uvalue, v) {
			continue
		} else {
			uvalue = append(uvalue, v)
		}
	}

	return uvalue
}

func ContainsSets(values []string, ivalue string) bool {
	for _, v := range values {

		if v == ivalue {
			return true
		}
	}
	return false
}
