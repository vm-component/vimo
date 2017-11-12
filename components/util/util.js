/**
 * @module Util
 * @description
 *
 * ## 工具库 / Util
 *
 * 这里提供了Vimo使用的工具库, 当然业务代码中也可以按需使用.
 *
 * @usage
 * import {isBoolean, isString} from 'vimo/lib/util/util'
 * */

/**
 * @typedef {Object} PointerCoordinates   - 坐标对象
 * @property {number} x - x坐标
 * @property {number} y - y坐标
 * */

/**
 * @function isBoolean
 * @description 判断传入值是否为 Boolean
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isBoolean = val => typeof val === 'boolean'

/**
 * @function isString
 * @description 判断传入值是否为 String
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isString = val => typeof val === 'string'

/**
 * @function isNumber
 * @description 判断传入值是否为 Number
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isNumber = val => typeof val === 'number'

/**
 * @function isFunction
 * @description 判断传入值是否为 Function
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isFunction = val => typeof val === 'function'

/**
 * @function isDefined
 * @description 判断传入值已定义
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isDefined = val => typeof val !== 'undefined'

/**
 * @function isUndefined
 * @description 判断传入值未定义
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isUndefined = val => typeof val === 'undefined'

/**
 * @function isPresent
 * @description 判断传入值不为空
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isPresent = val => val !== undefined && val !== null && val !== ''

/**
 * @function isBlank
 * @description 判断传入值为空
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isBlank = val => val === undefined || val === null

/**
 * @function isObject
 * @description 判断传入值为 Object
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isObject = val => typeof val === 'object'

/**
 * @function isDate
 * @description 判断传入值为 Date类型
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isDate = val =>
  Object.prototype.toString
  .call(val)
  .match(/^(\[object )(\w+)\]$/i)[2]
  .toLowerCase() === 'date'

/**
 * @function isRegexp
 * @description 判断传入值为 Regexp
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isRegexp = val =>
  Object.prototype.toString
  .call(val)
  .match(/^(\[object )(\w+)\]$/i)[2]
  .toLowerCase() === 'regexp'

/**
 * @function isArray
 * @description 判断传入值为 Array
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isArray = Array.isArray

/**
 * @function isPlainObject
 * @description 判断传入值为 纯对象
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isPlainObject = val =>
  isObject(val) && Object.getPrototypeOf(val) === Object.prototype

/**
 * @function isPrimitive
 * @description 判断传入值为 基础变量
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export function isPrimitive (val) {
  return isString(val) || isBoolean(val) || (isNumber(val) && !isNaN(val))
}

/**
 * 判断元素属性是否存在设置
 * 一般vue的props不需要这个, 因为其内部会进行这个判断, 没有传入值则为false
 * @param {string} val - 判断值
 * @example
 * 'true' => true
 * 'on' => true
 * '' => true
 * */
export function isTrueProperty (val) {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim()
    return val === 'true' || val === 'on' || val === ''
  }
  return !!val
}

/**
 * 判断Checked属性的值
 * 判断是否相等，比如：'true'和true，'0'和0
 * @param {*} a - 判断的第一个值
 * @param {*} b - 判断的第二个值
 * return {Boolean}
 *
 * @example
 * undefined == null
 * undefined == ''
 * null == ''
 * true == 'true'
 * false == 'false'
 * 0 == '0'
 * */
export function isCheckedProperty (a, b) {
  if (a === undefined || a === null || a === '') {
    return b === undefined || b === null || b === ''
  } else if (a === true || a === 'true') {
    return b === true || b === 'true'
  } else if (a === false || a === 'false') {
    return b === false || b === 'false'
  } else if (a === 0 || a === '0') {
    return b === 0 || b === '0'
  }

  // not using strict comparison on purpose
  // eslint-disable-next-line eqeqeq
  return a == b
}

/**
 * transitionEnd事件注册，绑定的函数触发后会自动解绑
 * @param {HTMLElement} el      - 绑定的元素
 * @param {Function} callbackFn   - 绑定的函数
 * @return {Function}           - 取消绑定的函数
 * */
export function transitionEnd (el, callbackFn) {
  const unRegs = []

  /* istanbul ignore next */
  function unregister () {
    unRegs.forEach(function (unReg) {
      unReg && unReg()
    })
  }

  /* istanbul ignore next */
  function onTransitionEnd (ev) {
    if (el === ev.target) {
      callbackFn && callbackFn(ev)
      unregister()
    }
  }

  if (el) {
    registerListener(el, 'webkitTransitionEnd', onTransitionEnd, {}, unRegs)
    registerListener(el, 'transitionend', onTransitionEnd, {}, unRegs)
  }

  return unregister
}

/**
 * urlChange(popstate)注册，绑定的函数触发后会自动解绑
 * @param {function} callback - 回调函数
 * @return {function} - 解绑函数
 * */
export function urlChange (callback) {
  let unReg = function () /* istanbul ignore next */ {}

  const onStateChange = ev => {
    /* istanbul ignore next */
    unReg && unReg()
    /* istanbul ignore next */
    callback(ev)
  }
  unReg = registerListener(window, 'popstate', onStateChange, {})
  return unReg
}

/**
 *
 * 给addEventListener增加passive属性, 如果不支持将降级使用!!opts.capture, 事件的关闭需要自己手动解除, 切记!!
 * @param {any} ele                               - 监听的元素
 * @param {string} eventName                      - 监听的名称
 * @param {function} callback                     - 回调
 * @param {object} [opts]                         - addEventListener的第三个参数 EventListenerOptions
 * @param {object} [opts.capture]                 - capture
 * @param {object} [opts.passive]                 - passive
 * @param {Array} [unregisterListenersCollection=[]] - 如果提供Function[], 则unReg将压如这个列表中
 * @return {Function}                             - 返回removeEventListener的函数
 */
export function registerListener (ele,
                                  eventName,
                                  callback,
                                  opts = {},
                                  unregisterListenersCollection = []) {
  // use event listener options when supported
  // otherwise it's just a boolean for the "capture" arg
  const listenerOpts = isPassive()
    ? {
      capture: !!opts.capture,
      passive: !!opts.passive
    }
    : !!opts.capture

  // use the native addEventListener
  ele['addEventListener'](eventName, callback, listenerOpts)

  let unReg = function unregisterListener () {
    ele['removeEventListener'](eventName, callback, listenerOpts)
  }

  if (
    unregisterListenersCollection &&
    Array.isArray(unregisterListenersCollection)
  ) {
    unregisterListenersCollection.push(unReg)
  }

  return unReg
}

/**
 * 判断的当前浏览器是否支持isPassive属性
 * @return {Boolean}
 * */
export function isPassive () {
  var supportsPassiveOption = false
  try {
    /* istanbul ignore next */
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassiveOption = true
        }
      })
    )
  } catch (e) {}
  return supportsPassiveOption
}

/**
 * document的ready事件监听
 * @param {Function} [callback] - 回调函数
 * @return {Promise} - 返回promise，completed后自动解绑
 * */
export function docReady (callback) {
  let promise = null // Promise;

  if (!callback) {
    // a callback wasn't provided, so let's return a promise instead
    promise = new Promise(function (resolve) {
      callback = resolve
    })
  }

  /* istanbul ignore else */
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', completed, false)
    window.addEventListener('load', completed, false)
  }

  /* istanbul ignore next */
  function completed () {
    document.removeEventListener('DOMContentLoaded', completed, false)
    window.removeEventListener('load', completed, false)
    callback()
  }

  return promise
}

/**
 * 根据click或者touch的事件对象, 获取event事件对象中的点击位置(坐标xy值)
 * @param {TouchEvent} ev - 事件对象
 * @return  {PointerCoordinates}
 * */
export function pointerCoord (ev) {
  if (ev) {
    var changedTouches = ev.changedTouches
    if (changedTouches && changedTouches.length > 0) {
      var touch = changedTouches[0]
      return {x: touch.clientX, y: touch.clientY}
    }
    var pageX = ev.pageX
    if (pageX !== undefined) {
      return {x: pageX, y: ev.pageY}
    }
  }
  return {x: 0, y: 0}
}

/**
 * 判断元素是否在激活状态, 比如input
 * @param {HTMLElement} ele - 元素
 * @return {boolean}
 * */
export function isActive (ele) {
  return !!(ele && document.activeElement === ele)
}

/**
 * 判断元素是否在focus状态, 比如input
 * @param {HTMLElement} ele - 元素
 * @return {boolean}
 * */
export function hasFocus (ele) {
  return isActive(ele) && ele.parentElement.querySelector(':focus') === ele
}

/**
 * 元素的class操作
 * @param {HTMLElement} ele - 添加、删除class的元素
 * @param {string} className
 * @param {boolean} add - 是添加还是删除
 * */
export function setElementClass (ele, className, add) {
  if (add) {
    addClass(ele, className)
  } else {
    removeClass(ele, className)
  }
}

/**
 * 元素的class操作
 * */
export function hasClass (obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export function addClass (obj, cls) {
  if (!hasClass(obj, cls)) {
    obj.className += ' ' + cls
  }
}

export function removeClass (obj, cls) {
  if (hasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    obj.className = obj.className.replace(reg, ' ').trim()
  }
}

/**
 * 如果n的大小在max和min之间，则返回n, 否则返回最大最小值
 *
 * @example
 * clamp(1,5,10)  -> 5
 * clamp(6,5,10)  -> 6
 * clamp(1,5,4)   -> 4
 *
 * @param {number} min - 最小值
 * @param  {number} n - 测试值
 * @param {number} max - 最大值
 */
export function clamp (min, n, max) {
  return Math.max(min, Math.min(n, max))
}

/**
 * 优先使用最左边的对象中的数据，即保持默认值，当在第一个对象中没找到key时才添加新key
 * @param {any} dest the destination to apply defaults to.
 * @example
 * defaults({a:1},{b:1,a:2},{b:10}) => 返回第一个对象 {a: 1, b: 10}
 */
export function defaults (dest, ...args) {
  for (var i = arguments.length - 1; i >= 1; i--) {
    var source = arguments[i]
    if (source) {
      for (var key in source) {
        if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
          dest[key] = source[key]
        }
      }
    }
  }
  return dest
}

/**
 * 首字母大写
 * @param {string} str - 传入string
 * @return {string}
 * */
export function firstUpperCase (str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1)
}

/**
 * 将带px单位的string转化为数字
 * @param {string} val - 传入的string
 * @return {number}
 * @example
 * 10px -> 10
 * */
export function parsePxUnit (val) {
  return !!val && val.indexOf('px') > 0 ? parseInt(val, 10) : 0
}
