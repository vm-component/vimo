/**
 * @module Util
 * @description
 *
 * ## 工具库 / Util
 *
 * 这里提供了Vimo使用的工具库, 当然业务代码中也可以按需使用.
 *
 * @usage
 * import {isBoolean, isString} from 'vimo/util/util'
 *
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
export const isBoolean = (val) => typeof val === 'boolean'

/**
 * @function isString
 * @description 判断传入值是否为 String
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isString = (val) => typeof val === 'string'

/**
 * @function isNumber
 * @description 判断传入值是否为 Number
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isNumber = (val) => typeof val === 'number'

/**
 * @function isFunction
 * @description 判断传入值是否为 Function
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isFunction = (val) => typeof val === 'function'

/**
 * @function isDefined
 * @description 判断传入值已定义
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isDefined = (val) => typeof val !== 'undefined'

/**
 * @function isUndefined
 * @description 判断传入值未定义
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isUndefined = (val) => typeof val === 'undefined'

/**
 * @function isPresent
 * @description 判断传入值不为空
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isPresent = (val) => val !== undefined && val !== null && val !== ''

/**
 * @function isBlank
 * @description 判断传入值为空
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isBlank = (val) => val === undefined || val === null

/**
 * @function isObject
 * @description 判断传入值为 Object
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isObject = (val) => typeof val === 'object'

/**
 * @function isDate
 * @description 判断传入值为 Date类型
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isDate = (val) => Object.prototype.toString.call(val).match(/^(\[object )(\w+)\]$/i)[2].toLowerCase() === 'date'

/**
 * @function isRegexp
 * @description 判断传入值为 Regexp
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isRegexp = (val) => Object.prototype.toString.call(val).match(/^(\[object )(\w+)\]$/i)[2].toLowerCase() === 'regexp'

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
export const isPlainObject = (val) => isObject(val) && Object.getPrototypeOf(val) === Object.prototype

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
    return (val === 'true' || val === 'on' || val === '')
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
    return (b === undefined || b === null || b === '')
  } else if (a === true || a === 'true') {
    return (b === true || b === 'true')
  } else if (a === false || a === 'false') {
    return (b === false || b === 'false')
  } else if (a === 0 || a === '0') {
    return (b === 0 || b === '0')
  }

  // not using strict comparison on purpose
  // eslint-disable-next-line eqeqeq
  return (a == b)
}

/**
 * transitionEnd事件注册，绑定的函数触发后会自动解绑
 * @param {HTMLElement} el      - 绑定的元素
 * @param {Function} callbackFn   - 绑定的函数
 * @return {Function}           - 取消绑定的函数
 * */
export function transitionEnd (el, callbackFn) {
  const unRegs = []

  function unregister () {
    unRegs.forEach(function (unReg) {
      unReg && unReg()
    })
  }

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
 * hashChange，hash变化后执行回调, 并自动解绑
 * @param {function} callback - 回调函数
 * @return {function} - 解绑函数
 * */
export function hashChange (callback) {
  let unReg = null

  const onHashChange = (ev) => {
    unReg && unReg()
    callback(ev)
  }

  unReg = registerListener(window, 'hashchange', onHashChange, {})
  return unReg
}

/**
 * urlChange(popstate)注册，绑定的函数触发后会自动解绑
 * @param {function} callback - 回调函数
 * @return {function} - 解绑函数
 * */
export function urlChange (callback) {
  let unReg = null
  const onStateChange = (ev) => {
    unReg && unReg()
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
 * @param {array} [unregisterListenersCollection] - 如果提供Function[], 则unReg将压如这个列表中
 * @return {Function}                             - 返回removeEventListener的函数
 */
export function registerListener (ele, eventName, callback, opts, unregisterListenersCollection) {
  // use event listener options when supported
  // otherwise it's just a boolean for the "capture" arg
  const listenerOpts = isPassive() ? {
    'capture': !!opts.capture,
    'passive': !!opts.passive
  } : !!opts.capture

  // use the native addEventListener
  ele['addEventListener'](eventName, callback, listenerOpts)

  let unReg = function unregisterListener () {
    ele['removeEventListener'](eventName, callback, listenerOpts)
  }

  if (unregisterListenersCollection && Array.isArray(unregisterListenersCollection)) {
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
    addEventListener('test', null, Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassiveOption = true
      }
    }))
  } catch (e) {}
  return supportsPassiveOption
}

/**
 * document的ready事件监听
 * @param {Function} callback - 回调函数
 * @return {Promise} - 返回promise，completed后自动解绑
 * */
export function docReady (callback) {
  let promise = null // Promise;

  if (!callback) {
    // a callback wasn't provided, so let's return a promise instead
    promise = new Promise(function (resolve) { callback = resolve })
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', completed, false)
    window.addEventListener('load', completed, false)
  }

  return promise

  function completed () {
    document.removeEventListener('DOMContentLoaded', completed, false)
    window.removeEventListener('load', completed, false)
    callback()
  }
}

/**
 * 根据click或者touch的事件对象, 获取event事件对象中的点击位置(坐标xy值)
 * @param {any} ev - 事件对象
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
 * 判断是否移动
 * @param {number} threshold - 阈值
 * @param {PointerCoordinates} startCoord - 开始坐标
 * @param {PointerCoordinates} endCoord - 结束坐标
 * */
export function hasPointerMoved (threshold, startCoord, endCoord) {
  if (startCoord && endCoord) {
    const deltaX = (startCoord.x - endCoord.x)
    const deltaY = (startCoord.y - endCoord.y)
    const distance = deltaX * deltaX + deltaY * deltaY
    return distance > (threshold * threshold)
  }
  return false
}

/**
 * 判断元素是否在激活状态, 比如input
 * @param {HTMLElement} ele - 元素
 * @return {boolean}
 * */
export function isActive (ele) {
  return !!(ele && (document.activeElement === ele))
}

/**
 * 判断元素是否在focus状态, 比如input
 * @param {HTMLElement} ele - 元素
 * @return {boolean}
 * */
export function hasFocus (ele) {
  return isActive(ele) && (ele.parentElement.querySelector(':focus') === ele)
}

/**
 * 判断TEXTAREA或者INPUT是否可输入
 * @param {HTMLElement} ele - 元素
 * @return {boolean}
 * */
export function isTextInput (ele) {
  return !!ele &&
    (ele.tagName === 'TEXTAREA' ||
    ele.contentEditable === 'true' ||
    (ele.tagName === 'INPUT' && !(NON_TEXT_INPUT_REGEX.test(ele.type))))
}

export const NON_TEXT_INPUT_REGEX = /^(radio|checkbox|range|file|submit|reset|color|image|button)$/i

/**
 * 判断TEXTAREA或者INPUT是否在focus状态
 * @return {boolean}
 * */
export function hasFocusedTextInput () {
  const ele = document.activeElement // <HTMLElement>
  if (isTextInput(ele)) {
    return (ele.parentElement.querySelector(':focus') === ele)
  }
  return false
}

/**
 * blur out TEXTAREA或者INPUT的状态
 * @return {boolean}
 * */
export function focusOutActiveElement () {
  const activeElement = document.activeElement //  <HTMLElement>
  activeElement && activeElement.blur && activeElement.blur()
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
 * 参数后面的对象合并到第一个对象中，以最右面的对象中属性值为准, 如果提供了`Object.assign()`则使用这个
 *
 * @param {object} target  - 合并目标
 * @param {object} [source(s)] - 合并元
 *
 * @example assign({a:1},{b:10},{b:1,a:2}) => 返回第一个对象{a: 2, b: 1}
 */
export function assign (...args) {
  if (typeof Object.assign !== 'function') {
    // use the old-school shallow extend method
    return _baseExtend(args[0], [].slice.call(args, 1), false)
  }

  // use the built in ES6 Object.assign method
  return Object.assign.apply(null, args)
}

/**
 * 深度合并, 最后面的对象将有最高优先级, dst对象将存放最终结果, 使用的是迭代替换方法
 * @param {object} dst - 最终汇总的结果
 * @param {object} [source(s)] - 数据源
 * @return {object} - 最终结果
 */
export function merge (dst, ...args) {
  return _baseExtend(dst, [].slice.call(arguments, 1), true)
}

/**
 * 对象合并
 * @param {any} dst
 * @param {Array} objs
 * @param {boolean} deep
 * @private
 * */
function _baseExtend (dst, objs, deep) {
  const isObject = (val) => typeof val === 'object'
  const isFunction = (val) => typeof val === 'function'
  const isArray = Array.isArray
  for (var i = 0, ii = objs.length; i < ii; ++i) {
    var obj = objs[i]
    if ((!obj || !isObject(obj)) && !isFunction(obj)) continue
    var keys = Object.keys(obj)
    for (var j = 0, jj = keys.length; j < jj; j++) {
      var key = keys[j]
      var src = obj[key]

      if (deep && isObject(src)) {
        if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {}
        _baseExtend(dst[key], [src], true)
      } else {
        dst[key] = src
      }
    }
  }

  return dst
}
/**
 * 对象深度拷贝, 只处理对象, 使用: `JSON.parse(JSON.stringify(obj))`方法
 * @param {object} obj - 拷贝的对象
 * @return {object} - 复制品
 * */
export function deepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
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
  return (!!val && val.indexOf('px') > 0) ? parseInt(val, 10) : 0
}

/**
 * 从数组中移除某个item
 * @param {Array} array - 处理的数组
 * @param {*} item - 移除的元素
 * @return {Boolean} - 是否成功
 * */
export function removeArrayItem (array, item) {
  const index = array.indexOf(item)
  // ~index => index*(-1)-1
  // ~-1 => 0
  return !!~index && !!array.splice(index, 1)
}

/**
 * 常用正则
 * */
export const REGEXP = {
  // 整数(包含正负)
  integer: /^-?[1-9]\d*$/,
  // 正整数
  positiveInteger: /^[1-9]\d*$/,
  // 负整数
  negativeInteger: /^-[1-9]\d*$/,
  // 邮箱
  email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  // IP地址
  ip: /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/,
  // 身份证
  idCard (num) {
    if (!num) return false
    num = num.toUpperCase()
    const cityCode = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外 '
    }

    if (!cityCode[num.substr(0, 2)]) {
      console.debug('地址编码错误')
      return false
    }
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
      console.debug('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。')
      return false
    }
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    // 下面分别分析出生日期和校验位
    var re, len, arrSplit, dtmBirth, bGoodDay, arrInt, arrCh, nTemp, k
    len = num.length
    if (len === 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
      arrSplit = num.match(re)

      // 检查生日日期是否正确
      dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      bGoodDay = (dtmBirth.getYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
      if (!bGoodDay) {
        console.debug('输入的身份证号里出生日期不对！')
        return false
      } else {
        // 将15位身份证转成18位
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        nTemp = 0
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
        for (k = 0; k < 17; k++) {
          nTemp += num.substr(k, 1) * arrInt[k]
        }
        num += arrCh[nTemp % 11]
        return true
      }
    }
    if (len === 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
      arrSplit = num.match(re)

      // 检查生日日期是否正确
      dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      bGoodDay = (dtmBirth.getFullYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
      if (!bGoodDay) {
        console.debug('输入的身份证号里出生日期不对！')
        return false
      } else {
        // 检验18位身份证的校验码是否正确。
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var valnum
        arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        nTemp = 0
        for (k = 0; k < 17; k++) {
          nTemp += num.substr(k, 1) * arrInt[k]
        }
        valnum = arrCh[nTemp % 11]
        if (valnum !== num.substr(17, 1)) {
          console.debug('18位身份证的校验码不正确！应该为：' + valnum)
          return false
        }
        return true
      }
    }
    return false
  },
  // 密码需6-18位，以字母开头可含数字
  password: /^[a-zA-Z]\w{5,17}$/,
  // 国内电话, 正确格式为：XXXX-XXXXXXX，XXXX- XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。
  tel: /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/,
  // 国内手机号, 13/14/15/18/17开头
  mobile: /^((13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9]))\d{8}$/,
  // 验证汉字
  cn: /[\u4e00-\u9fa5]/,
  // 验证码, 至少4位
  securityCode: /^\d{4,}$/,
  // 昵称: 可由中英文字母、数字、"-"、"_"组成。
  nickName: /[A-Za-z0-9_\-\u4e00-\u9fa5]+/,
  // qq: 1-9开头，最少5位。
  qq: /^[1-9][0-9]{4,}$/,
  // 网址URL, 必须以(https|http|ftp|rtsp|mms)开头
  url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
}