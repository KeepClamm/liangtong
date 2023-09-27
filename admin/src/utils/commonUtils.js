import moment from 'moment';

const CommonUtils = {
  // 获取该时间的当月
  getMonthFirstAndLastDay(time) {
    let timestamp = time || new Date().getTime();
    let curDate = new Date(timestamp);

    const firstDayInMonth = curDate.setDate(1);
    const firstDayTimeInMonth = new Date(firstDayInMonth).setHours(0, 0, 0, 0); // 该月的第一天0点

    const daysInThisMonth = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate();
    const lastDayInMonth = curDate.setDate(daysInThisMonth);
    const lastDatTimeInMonth = new Date(lastDayInMonth).setHours(23, 59, 59, 999); // 该月的最后一天23点59分59秒999毫秒

    return [firstDayTimeInMonth, lastDatTimeInMonth];
  },

  // 获取该天的0点0分和23点59分...
  getDayFirstAndLastTime(time) {
    let timestamp = time || new Date().getTime();
    let curDate = new Date(timestamp);

    const firstTimeInDay = new Date(curDate).setHours(0, 0, 0, 0);
    const lastDatTimeInDay = new Date(curDate).setHours(23, 59, 59, 999);

    return [firstTimeInDay, lastDatTimeInDay];
  },

  // 获取该年该月下的天数
  toGetDate(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
  },

  toGetThisMonthDays(time) {
    let curDate = time ? new Date(time) : new Date();
    return this.toGetDate(curDate.getFullYear(), curDate.getMonth() + 1);
  },

  // 获取上个月的23.59 59 999
  getLastMonthLastTime(time) {
    let timestamp = time || new Date().getTime();
    let curDate = new Date(timestamp);

    curDate.setDate(1);
    curDate.setHours(0, 0, 0, 0);
    const lastMonth = curDate.getTime() - 1; // - 24 * 60 * 60 * 1000;

    return lastMonth;
  },
  
  getPreviousYearsDate(years = 1, time) {
    let timestamp = time || new Date().getTime();
    let curDate = new Date(timestamp);

    curDate.setFullYear(curDate.getFullYear() - years);

    return curDate;
  },

  // 显示百分比
  dealShowPersent(numerator, denominator = 1, suffix = '%', ) {
    numerator = numerator - 0;
    if (denominator <= 0) {
      return 0;
    }

    let result = ((numerator / denominator) * 100).toFixed(2);

    if(result % 1) {
      return result + suffix;
    } else {
      return result/1 + suffix;
    }
  },

  // 处理数字
  dealNumber(num, unit = '万', prefix = '') {

    if (num >= 10000) {
      return `${prefix}${(num/10000).toFixed(2)}${unit}`;
    }

    return `${prefix}${num}`
  },

  // 获取时间戳的日期
  getDateByTimestamp(time) {
    let timestamp = time || new Date().getTime();
    let curDate = new Date(timestamp);

    return curDate.getDate();
  },

  // 把列表里的参数变成字符串 逗号 连接
  listToString(list) {
    return list.join(',');
  },

  // 判断是否为一个空对象
  isEmptyObject(obj) {
    return JSON.stringify(obj) === '{}';
  },

  // 处理 startTime 和 endTime 搜索参数
  handleTimestamp(timeValue, type) {
    let orderType = type || '$gte:';

    if (Array.isArray(timeValue)) { // 数组
      let timeList = [];
      for (let i = 0; i < timeValue.length; i++) {
        let time = this.getDayFirstAndLastTime(timeValue[i]);
        if (i === 0) {
          timeList.push(`$gte:${time[0]}`);
        } else {
          timeList.push(`$lte:${time[1]}`);
        }
      }

      return timeList;
    } else { // 单个参数
      let timeInfo = this.getDayFirstAndLastTime(timeValue);
      return `${orderType}${timeInfo[0]}`;
    }
  },

  getStartAndEndTime(timeValue) {
    let startTimeList = this.getDayFirstAndLastTime(timeValue[0]);
    let endTimeList = this.getDayFirstAndLastTime(timeValue[1]);

    return [startTimeList[0], endTimeList[1]]
  },

  // 获取列表中的某个字段集合 数组，字段名，间隔符，占位符
  getListNames(list, field = 'name', symbol = ',', emptyMsg = '无') {
    let result = '';

    list.forEach((item, index) => {
      if (index == 0) {
        result = result + item[field];
      } else {
        result = `${result}${symbol} ${item[field]}`;
      }
    });

    return result || emptyMsg;
  },

  getIdsFromList(list, field = 'id') {
    let result = [];

    list.forEach(item => {
      result.push(item[field]);
    });

    return result;
  },

  getIndexById(id, list, attribute = 'id') {
    for (let i = 0; i < list.length; i++) {
      if (list[i][attribute] == id) {
        return i;
      }
    }

    return -1;
  },

  findSomeone(value, list = [], field = 'id') {
    return list.find(item => {
      return item[field] == value;
    }) || null;
  },

  downLoadFile(url, fileName, callback) {
    const url2 = url; // url.replace(/\\/g, "/");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url2, true);
    xhr.responseType = "blob";
    //xhr.setRequestHeader('Authorization', 'Basic a2VybWl0Omtlcm1pdA==');
    // 为了避免大文件影响用户体验，建议加loading
    xhr.onload = () => {
      if (xhr.status === 200) {
        // 获取文件blob数据并保存
        // const suffix = this.getFileSuffix(url, fileName);
        this.saveAs(xhr.response, fileName)
      }

      callback && callback();
    };
    xhr.send();
  },

  saveAs(data, fileName) {
    const urlObject = window.URL || window.webkitURL || window;
    const export_blob = new Blob([data]);
    //createElementNS() 方法可创建带有指定命名空间的元素节点。
    //此方法可返回一个 Element 对象。
    const save_link = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "a"
    );
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = fileName; // + ".png";
    save_link.click();
  },

  // 导出excel
  exportExcel(res, callback) {
    if (!res.data) {
      // 如果没有data数据就不进行操作
      return;
    }

    // 获取headers中的filename文件名
    const tempName = res.headers["content-disposition"]
      .split(";")[1]
      .split("filename=")[1];
    
    // iconv-lite解决中文乱码
    const iconv = require("iconv-lite");
    iconv.skipDecodeWarning = true; // 忽略警告
    const fileName = iconv.decode(tempName, "utf-8");
    
    const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }); // 转换成二进制对象
    if ("download" in document.createElement("a")) {
      // 不是IE浏览器
      const url = window.URL.createObjectURL(blob); // 二进制对象转换成url地址
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // 下载完成移除元素
      window.URL.revokeObjectURL(url); // 释放掉blob对象
    } else {
      window.navigator.msSaveBlob(blob, fileName);
    }

    callback && callback();
  },

  // 获取文件名后缀
  getFileSuffix(url, preName = '') {
    let list = url.split('.');

    return `${preName}.${list[list.length - 1]}`;
  },
  
  // getFileSuffix(url, preName = '') {
  //   let list = url.split('.');

  //   return `${preName}.${list[list.length - 1]}`;
  // },

  /*函数节流*/
  throttle(fn, interval) {
    var enterTime = 0;
    var gapTime = interval || 300;
    return function () {
      var backTime = new Date();
      if (backTime - enterTime > gapTime) {
        fn.apply(this, arguments);
        enterTime = backTime;
      }
    };
  },

  /*函数防抖*/
  debounce(fn, delay) {
    let timer = null;

    return function (...args) {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  },

  // 处理数字
  toLocaleString(number) {
    let num = Number(number) || 0;
    return num.toLocaleString();
  },

  /**
   * @params code
   * @params list
   */
  getNodeByTree(code, list = []) {
    let info = null;

    for (var i = 0; i < list.length; i++) {
      let item = list[i];

      if (item.real_id == code) {
        info = {
          ...item
        };
        delete info.children;

        return info;
      }

      if (item.children && item.children.length > 0) {
        let has = this.getNodeByTree(code, item.children);

        if (has) {
          return has;
        } else {
          continue;
        }
      }
    }
  },

  /**
   * @param date 
   * @returns 
   */
  formateDate(date, formater = 'YYYY-MM') {
    const timestamp = date ? new Date(date).getTime() : new Date().getTime();
    return moment(timestamp).format(formater);
  },

  /**
   * @param {*} size
   * @returns 转换文件大小附单位
   */
  formatFileSize(size) {
    if (size == 0) return '0 B';
    const k = 1024;
    const sizeStr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;

    for (var l = 0; l < 8; l++) {
      if (size / Math.pow(k, l) < 1) {
        break;
      }
      
      i = l;
    }
    
    return (size / Math.pow(k, i)).toFixed(1) + ' ' + sizeStr[i];
  },

  // 获取多个测试日期
  getTextDateList(num = 10){
    let dateList = [];
    let curDateTime = new Date().getTime();

    for (let i = 0; i < num; i++) {
      let oneDatTime = 24 * 60 * 60 * 1000;
      dateList.push(moment(curDateTime-oneDatTime * i).format('YYYY.MM.DD'));
    }

    return dateList.reverse();
  },

  // 获取随机数
  getRandomList(num = 10, baseline = 10, isInt = true){
    let list = [];

    for (let i = 0; i < num; i++) {
      if (isInt) {
        list[i] = Math.round(Math.random(0, 1) * baseline);
      } else {
        list[i] = (Math.random(0, 1) * baseline).toFixed(2);
      }
    }

    return list;
  },
  // 处理数据 保留位数的小数
  dealNum(num, digit = 2) {
    // return num.toFixed(digit);

    var numbers = '';
    // 保留几位小数后面添加几个0
    for (var i = 0; i < digit; i++) {
      numbers += '0';
    }
    var s = 1 + numbers;
    // 如果是整数需要添加后面的0
    var spot = "." + numbers;
    // Math.round四舍五入
    //  parseFloat() 函数可解析一个字符串，并返回一个浮点数。
    var value = Math.round(parseFloat(num) * s) / s;
    // 从小数点后面进行分割
    var d = value.toString().split(".");
    if (d.length == 1) {
      value = value.toString() + spot;
      return value;
    }
    if (d.length > 1) {
      if (d[1].length < 2) {
        value = value.toString();
      }
      return value;
    }
  },
  // 导出excel base64的格式
  exportBase64Excel(fileName, content) {
    const blob = this.base64ToBlob(content); // new Blob([content]);
    
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;

      //此写法兼容可火狐浏览器
      document.body.appendChild(link);
      const evt = document.createEvent("MouseEvents");
      evt.initEvent("click", false, false);
      link.dispatchEvent(evt);
      document.body.removeChild(link);
    }
  },
  base64ToBlob(code) {
    const parts = code.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  },
  getFilename(prefix = ''){
    const date = this.formateDate('', 'YYYY-MM-DD_HH点mm分ss秒')
    return `${prefix}_${date}`;
  }
}

export default CommonUtils;
