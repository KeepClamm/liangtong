import Vue from 'vue'
import moment from 'moment'

/*
 * 过滤器：
 * formatDate: 日期
 *
 */

Vue.filter('formatDate', function(timestamp, format) {
  var time = timestamp.toString().length == 13 ? timestamp : timestamp * 1000
  const newDate = new Date(time)
  const date = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    'S+': newDate.getMilliseconds()
  }

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (newDate.getFullYear() + '')
      .substr(4 - RegExp.$1.length))
  }

  for (var k in date) {
    if (new RegExp('(' + k + ')')
      .test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k])
        .substr(('' + date[k])
          .length))
    }
  }

  return format
})

Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss', ) {
  return moment(dataStr).format(pattern)
})

Vue.filter('filterDateformat', function (dataStr) {
  return moment(dataStr * 1000).format()
})