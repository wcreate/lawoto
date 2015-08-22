package models

// 律师信息
type Category struct {
	Id          int64  `orm:"pk;auto"` // 标识
	Uid         int64  `orm:"index"`   //
	Region      string // 地域
	ProfessTime int64  // 职业年限
	Specialty   string // 专长
	SepcDetail  string // 专长详细
	Institution string // 执业机构
	Title       string // 职称
	CertNumber  string // 执业证号
}
