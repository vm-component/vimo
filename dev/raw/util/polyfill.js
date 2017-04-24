/**
 * Created by Hsiang on 2017/4/24.
 * The polyfill for vimo running on more mobiles
 */

// promise polyfill
require('es6-promise').polyfill()

// fixed Object #<HTMLDivElement> has no method 'remove'
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    this.parentNode.removeChild(this)
  }
}

// 如果array的find函数不支持
if (!Array.prototype.find) {
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