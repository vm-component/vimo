/**
 * The polyfill for vimo running on more mobiles
 * @private
 */
// promise polyfill
require('es6-promise').polyfill()

// fixed Object #<HTMLDivElement> has no method 'remove'
if (!('remove' in window.Element.prototype)) {
  window.Element.prototype.remove = function () {
    this.parentNode.removeChild(this)
  }
}

// 如果array的find函数不支持
if (!Array.prototype.find) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.find = function (predicate) {
    'use strict'
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined')
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function')
    }
    var list = Object(this)
    var length = list.length >>> 0
    var thisArg = arguments[1]
    var value

    for (var i = 0; i < length; i++) {
      value = list[i]
      if (predicate.call(thisArg, value, i, list)) {
        return value
      }
    }
    return undefined
  }
}

// RequestAnimationFrame的兼容腻子(Android 4.3 and below)
/*! @author Paul Irish */
/*! @source https://gist.github.com/paulirish/1579671 */
(function () {
  var rafLastTime = 0
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (cbs) {
      var currTime = Date.now()
      var timeToCall = Math.max(0, 16 - (currTime - rafLastTime))
      var id = window.setTimeout(function () {
        cbs && cbs(currTime + timeToCall)
      }, timeToCall)

      rafLastTime = currTime + timeToCall
      return id
    }
  }

  if (!window.cancelAnimationFrame) {
    /**
     * @param {number} id
     * */
    window.cancelAnimationFrame = function (id) { clearTimeout(id) }
  }
})()
