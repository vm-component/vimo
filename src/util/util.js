/**
 * Created by Hsiang on 2017/2/8.
 */
// TODO：关联到debug模式
const ASSERT_ENABLED = true; // 是否能使用断言，可以关联到debug模式

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
};

export const isTrueProperty = function(val) {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();
    return (val === 'true' || val === 'on' || val === '');
  }
  return !!val;
};
// 判断是否相等，比如：'true'和true，'0'和0
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
 * @param {Function} fn
 * @param {number} wait
 * @param {boolean} immediate
 * */
export function debounce (fn, wait, immediate = false) {
  var timeout, args, context, timestamp, result;
  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var later = function () {
      var last = Date.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) result = fn.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) result = fn.apply(context, args);
    return result;
  };
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
 * 重新排序，将from位置的元素放到to位置
 * @private
 * @typedef {object} IndexFromTo - 类型如为: {from: number, to: number}
 * @param {any} array
 * @param {IndexFromTo} indexes
 */
export function reorderArray(array, indexes){
  const element = array[indexes.from];
  array.splice(indexes.from, 1);
  array.splice(indexes.to, 0, element);
  return array;
}

/**
 * @private
 * @param {any} array
 * @param {any} item
 */
export function removeArrayItem(array, item) {
  const index = array.indexOf(item);
  // ~index => index*(-1)-1
  // ~-1 => 0
  return !!~index && !!array.splice(index, 1);
}


/**
 * 根据传入条件判断是否执行swipeReset
 * @private
 * @param {boolean} isResetDirection
 * @param {boolean} isMovingFast
 * @param {boolean} isOnResetZone
 * @return {boolean}
 */
export function swipeShouldReset(isResetDirection, isMovingFast, isOnResetZone) {
  // The logic required to know when the sliding item should close (openAmount=0)
  // depends on three booleans (isCloseDirection, isMovingFast, isOnCloseZone)
  // and it ended up being too complicated to be written manually without errors
  // so the truth table is attached below: (0=false, 1=true)
  // isCloseDirection | isMovingFast | isOnCloseZone || shouldClose
  //         0        |       0      |       0       ||    0
  //         0        |       0      |       1       ||    1
  //         0        |       1      |       0       ||    0
  //         0        |       1      |       1       ||    0
  //         1        |       0      |       0       ||    0
  //         1        |       0      |       1       ||    1
  //         1        |       1      |       0       ||    1
  //         1        |       1      |       1       ||    1
  // The resulting expression was generated by resolving the K-map (Karnaugh map):
  let shouldClose = (!isMovingFast && isOnResetZone) || (isResetDirection && isMovingFast);
  return shouldClose;
}


/**
 * 断言判断
 * @private
 * @param {any} actual 如果这个对象或者值为false，则当前程序位置出错，执行断言，开启debugger
 * @param {string} reason
 */
export function assert(actual, reason) {
  if (!actual && ASSERT_ENABLED === true) {
    let message = 'IONIC ASSERT: ' + reason;
    console.error(message);
    debugger; // tslint:disable-line
    throw new Error(message);
  }
}

/**
 * 在开发模式中运行，或者说在断言模式中运行
 * @param {Function} fn
 * */
export function runInDev(fn) {
  if (ASSERT_ENABLED === true) {
    return fn();
  }
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
