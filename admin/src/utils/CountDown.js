function _countDown(thiz, timestamp) {
  timestamp = timestamp || new Date().getTime()

  var lasped = Math.floor((new Date().getTime() - timestamp) / 1000)
  var remain = Math.max(thiz._count - lasped, 0)

  thiz._callback && thiz._callback(remain)

  thiz._timer = remain > 0 ? setTimeout(function() {
    _countDown(thiz, timestamp)
  }, 1000) : null
}

var CountDown = function(count, callback) {
  this._count = parseInt(count) || 60

  if (callback && {}.toString.call(callback) === '[object Function]') {
    this._callback = callback
  }

  this._timer = null
}

CountDown.prototype.start = function() {
  if (!this._timer) {
    _countDown(this)
  }
}

CountDown.prototype.cancel = function() {
  if (this._timer) {
    clearTimeout(this._timer)
    this._timer = null
  }
}

module.exports = CountDown
