const Regex = {
  isEmail(email) {
    var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
    var isEmail = reg.test(email)

    return isEmail
  },
  isIDNumber(idNumber) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

    if (reg.test(idNumber) === false) {
      return false
    }

    return true
  },
  isPhoneNumber(phoneNum) {
    // var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    // var reg = /^1\d{10}$/
    // var reg = /^(1[3-9])\d{9}$/
    var reg = /^(1[1-9])\d{9}$/ // /^(?:(?:\+|00)86)?1\d{10}$/
    var isPhoneNum = reg.test(phoneNum)

    return isPhoneNum
  },
  isUserPassword(pwd) {
    var reg = /^([a-zA-Z0-9!@#$%^&*]{6,16})$/i
    var isPwd = reg.test(pwd)

    return isPwd
  },
  isAuthCode(code) {
    var reg = /\d{6}/
    var isCode = reg.test(code)

    return isCode
  },
  isEmpty(iptCon) {
    var iptContent = false
    var con = iptCon + ''

    if (con === '' || !con.replace(/(^\s*)|(\s*$)/g, '')) {
      iptContent = true
    }

    return iptContent
  },
  isNickName(name) {
    var reg = /^[^-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]{2,10}$/
    var isName = reg.test(name)

    return isName
  },
  isRealName(realName) {
    var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    var isRName = reg.test(realName)

    return isRName
  },
  regStrByByteLength(str, limit) {
    const _limit = limit || 0;
    let length = 0;
    for (let i = 0; i < str.length; i++) {
      let ch = str.charCodeAt(i);
      while (ch > 0) {
        ++length;
        ch = ch >> 8;
      }
    }
  
    return length <= _limit
  },
  isUsername(value){
    const pattern = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const isUsername = pattern.test(value);

    return isUsername;
  },
  isPassword(value){
    // const pattern = /(\w*).{6,20}$/;
    const pattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,20}$/;
    const isPassword = pattern.test(value);

    return isPassword;
  },
  // 字母 数字 符号
  isCode(value){
    const pattern = /^[\w\+\-\*\/]{1,}$/;
    const isCode = pattern.test(value);

    return isCode;
  },
  // 数字，小数点
  isNumberOrFloat(value){
    // const pattern = /^[0-9][\.]?[0-9]$/;
    const pattern = /([1-9]\d*\.?\d*)|(0\.\d*[1-9])/;
    const isNumberOrFloat = pattern.test(value);

    return isNumberOrFloat;
  },

}

module.exports = Regex
