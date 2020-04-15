// 请输入中文
export const validateName = (value) => {
	let isTrue
  if(!(/^[\u4E00-\u9FA5]+$/.test(value))){
    isTrue = true
  } else {
  	isTrue = false
	}
	return isTrue
}

// 请填写大写姓名拼音
export const validateNameSpell = (value) => {
  let isTrue
  if(!(/^[A-Z]+$/.test(value))){
    isTrue = true
  } else {
    isTrue = false
  }
  return isTrue
}

// 请填写身份证号码
export const validateIdNo = (value) => {
  let isTrue
  if(!(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(value))){
    isTrue = true
  } else {
    isTrue = false
  }
  return isTrue
}

// 请填写完成住址
export const validateIdAddr = (value) => {
  let isTrue
  if(!(/^([\u4E00-\u9FA5A-Za-z0-9_]+(省|市|区|县|道|路|街|号)){2,}$/.test(value))){
    isTrue = true
  } else {
    isTrue = false
  }
  return isTrue
}

// 请输入正确银行卡号
export const bankCardNo = (value) => {
  let isTrue
  if(!(/^([1-9]{1})(\d{14}|\d{18})$/.test(value))){
    isTrue = true
  } else {
    isTrue = false
  }
  return isTrue
}