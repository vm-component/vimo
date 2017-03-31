/**
 * Created by Hsiang on 2017/2/8.
 */

/** @module util/util */

export const isBoolean = (val) => typeof val === 'boolean';
export const isString = (val) => typeof val === 'string';
export const isNumber = (val) => typeof val === 'number';
export const isFunction = (val) => typeof val === 'function';
export const isDefined = (val) => typeof val !== 'undefined';
export const isUndefined = (val) => typeof val === 'undefined';
export const isPresent = (val) => val !== undefined && val !== null;
export const isBlank = (val) => val === undefined || val === null;
export const isObject = (val) => typeof val === 'object';
export const isArray = Array.isArray;
// 基础变量
export const isPrimitive = function(val) {
  return isString(val) || isBoolean(val) || (isNumber(val) && !isNaN(val));
}

/**
 * 判断元素属性是否存在设值
 * */
export const isTrueProperty = function(val) {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();
    return (val === 'true' || val === 'on' || val === '');
  }
  return !!val;
};

/**
 * 判断Checked属性的值
 * 判断是否相等，比如：'true'和true，'0'和0
 * */
export const isCheckedProperty = function(a, b) {
  if (a === undefined || a === null || a === '') {
    return (b === undefined || b === null || b === '');

  } else if (a === true || a === 'true') {
    return (b === true || b === 'true');

  } else if (a === false || a === 'false') {
    return (b === false || b === 'false');

  } else if (a === 0 || a === '0') {
    return (b === 0 || b === '0');
  }

  // not using strict comparison on purpose
  return (a == b); // tslint:disable-line
};

/**
 * Given a min and max, restrict the given number
 * to the range.
 * 如果n的大小在max和min之间，则返回n
 *
 * @param {number} min the minimum
 * @param  {number}n the value
 * @param {number} max the maximum
 */
export function clamp (min, n, max) {
  return Math.max(min, Math.min(n, max));
}

/**
 * The assign() method is used to copy the values of all enumerable own
 * properties from one or more source objects to a target object. It will
 * return the target object. When available, this method will use
 * `Object.assign()` under-the-hood.
 *
 * 参数后面的对象合并到第一个对象中，以最右面的对象中属性值为准
 *
 * @param target  The target object
 * @param source(s)  The source object
 * @example Object.assign({a:1},{b:10},{b:1,a:2}) => 返回第一个对象{a: 2, b: 1}
 */
export function assign (...args) {
  if (typeof Object.assign !== 'function') {
    // use the old-school shallow extend method
    return _baseExtend(args[0], [].slice.call(args, 1), false);
  }

  // use the built in ES6 Object.assign method
  return Object.assign.apply(null, args);
}

/**
 * Do a deep extend (merge). 深度合并
 *
 * @param {any} dst the destination
 * @param ... the param objects
 */
export function merge (dst, ...args) {
  return _baseExtend(dst, [].slice.call(arguments, 1), true);
}

export function deepClone (obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepClone)
  } else if (obj && typeof obj === 'object') {
    var cloned = {}
    var keys = Object.keys(obj)
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i]
      cloned[key] = deepClone(obj[key])
    }
    return cloned
  } else {
    return obj
  }
}

/**
 * Apply default arguments if they don't exist in
 * the first object.
 * 优先使用最左边的对象中的数据，即保持默认值，添加新值
 *
 * @example defaults({a:1},{b:1,a:2},{b:10}) => 返回第一个对象 {a: 1, b: 10}
 * @param {any} dest the destination to apply defaults to.
 */
export function defaults (dest, ...args) {
  for (var i = arguments.length - 1; i >= 1; i--) {
    var source = arguments[i];
    if (source) {
      for (var key in source) {
        if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }
    }
  }
  return dest;
}


/**
 * 对象合并
 * @param {any} dst
 * @param {any} objs
 * @param {boolean} deep
 * */
function _baseExtend (dst, objs, deep) {
  for (var i = 0, ii = objs.length; i < ii; ++i) {
    var obj = objs[i];
    if (!obj || !isObject(obj) && !isFunction(obj)) continue;
    var keys = Object.keys(obj);
    for (var j = 0, jj = keys.length; j < jj; j++) {
      var key = keys[j];
      var src = obj[key];

      if (deep && isObject(src)) {
        if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
        _baseExtend(dst[key], [src], true);
      } else {
        dst[key] = src;
      }
    }
  }

  return dst;
}

/**
 * @desc 首字母大写
 * @param {string} str
 * @return {string}
 * */
export function firstUpperCase (str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
}


/**
 * @param {string} val
 * @return {number}
 * */
export function parsePxUnit (val) {
  return (!!val && val.indexOf('px') > 0) ? parseInt(val, 10) : 0;
}


// RequestAnimationFrame的兼容腻子(Android 4.3 and below)
/*! @author Paul Irish */
/*! @source https://gist.github.com/paulirish/1579671 */
(function () {
  var rafLastTime = 0
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      var currTime = Date.now()
      var timeToCall = Math.max(0, 16 - (currTime - rafLastTime))

      var id = window.setTimeout(function () {
        callback(currTime + timeToCall)
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

// requestAnimationFrame/cancelAnimationFrame包装
export const nativeRaf = window.requestAnimationFrame.bind(window)
export const cancelRaf = window.cancelAnimationFrame.bind(window)

/**
 * transitionEnd事件注册，绑定的函数触发后会自动解绑
 * @param {HTMLElement} el 绑定的元素
 * @param {Function} callback 绑定的函数
 * @return {Function}  取消绑定的函数
 * */
export function transitionEnd (el, callback) {
  const unRegs = []

  function unregister () {
    unRegs.forEach(function (unReg) {
      unReg && unReg()
    })
  }

  function onTransitionEnd (ev) {
    if (el === ev.target) {
      unregister()
      callback(ev)
    }
  }

  if (el) {
    registerListener(el, 'webkitTransitionEnd', onTransitionEnd, {}, unRegs)
    registerListener(el, 'transitionend', onTransitionEnd, {}, unRegs)
  }

  return unregister
}

/**
 * @private
 *
 * 给addEventListener增加passive属性, 如果不支持将降级使用!!opts.capture
 *
 * @param {any} ele                                   - 监听的元素
 * @param {string} eventName                          - 监听的名称
 * @param {function} callback                         - 回调
 * @param {object=} opts EventListenerOptions          - addEventListener的第三个参数
 * @param {Function[]=} unregisterListenersCollection - 如果提供Function[], 则unReg将压如这个列表中
 *
 * @return {Function} 返回removeEventListener的函数
 *
 */
export function registerListener (ele, eventName, callback, opts, unregisterListenersCollection) {
  // Test via a getter in the options object to see if the passive property is accessed
  let uiEvtOpts;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function () {
        uiEvtOpts = true
      }
    })
    window.addEventListener('optsTest', null, opts)
  } catch (e) { }

  // use event listener options when supported
  // otherwise it's just a boolean for the "capture" arg
  const listenerOpts = uiEvtOpts ? {
    'capture': !!opts.capture,
    'passive': !!opts.passive,
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
 * urlChange注册，绑定的函数触发后会自动解绑
 * @param {function} callback
 * @return {function}
 * */
export function urlChange (callback) {
  const URL_EVENT = ['hashchange', 'popstate']
  URL_EVENT.forEach(function (eventName) {
    window.addEventListener(eventName, onEvent)
  })

  return unregister

  function unregister () {
    URL_EVENT.forEach(function (eventName) {
      window.removeEventListener(eventName, onEvent)
    })
  }

  /**
   * @param {UIEvent} ev
   * */
  function onEvent (ev) {
    // auto unregister
    unregister()
    callback(ev)
  }
}

/**
 * document的ready事件监听
 * @param {Function} callback - 回调函数
 * @return {Promise} 返回promise，completed后自动解绑
 * */
export function ready (callback) {
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
 * @return  {PointerCoordinates} - 坐标
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
    _addClass(ele, className)
  } else {
    _removeClass(ele, className)
  }

  /**
   * 元素的class操作
   * */
  function _hasClass (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  }

  function _addClass (obj, cls) {
    if (!_hasClass(obj, cls)) {
      obj.className += ' ' + cls
    }
  }

  function _removeClass (obj, cls) {
    if (_hasClass(obj, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
      obj.className = obj.className.replace(reg, ' ').trim()
    }
  }

}


// /**
//  * 驼峰命名
//  * hello-world -> helloWorld
//  * */
// export function camelCase (name) {
//   const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
//   const MOZ_HACK_REGEXP = /^moz([A-Z])/
//   return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
//     return offset ? letter.toUpperCase() : letter
//   }).replace(MOZ_HACK_REGEXP, 'Moz$1')
// }




