/*
 * 验证输入内容：
 * isPhoneNumber： 手机号
 * isUserPassword： 密码
 * isEmpty： 输入内容：为空返回真
 * isNickName: 昵称
 * isRealName：真实姓名
 */
const regex = {
  // 判断邮箱
  isEmail: function name(email) {
    const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
    const isEmail = reg.test(email)

    return isEmail
  },
  isPhoneNumber: function(phoneNum) {
    // const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    const reg = /^1\d{10}$/
    const isPhoneNum = reg.test(phoneNum)

    return isPhoneNum
  },
  isUserPassword: function(pwd) {
    const reg = /^([a-zA-Z0-9!@#$%^&*]{6,16})$/i
    const isPwd = reg.test(pwd)

    return isPwd
  },
  isAuthCode: function(code) {
    const reg = /\d{4}/
    const isCode = reg.test(code)

    return isCode
  },
  // 判断为空
  isEmpty: function(iptCon) {
    let iptContent = false
    const con = iptCon + ''

    if (con == '' || !con.replace(/(^\s*)|(\s*$)/g, '')) {
      iptContent = true
    }

    return iptContent
  },
  // 判断昵称
  isNickName: function(name) {
    const reg = /^[^-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]{2,10}$/
    const isName = reg.test(name)

    return isName
  },
  // 判断姓名
  isRealName: function(realName) {
    const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    const isRName = reg.test(realName)

    return isRName
  },
  isTrueResult: function(arr) {
    let arrStatus = true

    if (arr == false || arr === 'false' || arr === 'FALSE' || arr == 0 || arr === '0') {
      arrStatus = false
    }

    return arrStatus
  },
  // 检查字符长度是否为6位
  checkStringLength: function(str) {
    let isTrue = true

    if (str.trim().length < 6) {
      isTrue = false
    }

    return isTrue
  },
  // 判断是否是内链
  isInsideNetwork: function(arr, url) {
    if (typeof (arr) === 'string') {
      return RegExp(arr).test(url)
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (RegExp(arr[i]).test(url)) {
          return true
        }
      }
    }
    return false
  }

}

export default regex
