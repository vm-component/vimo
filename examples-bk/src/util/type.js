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
 * @function isArray
 * @description 判断传入值为 Array
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isArray = Array.isArray
/**
 * @function isObject
 * @description 判断传入值为 Object
 * @param {*} val - 判断值
 * @return {Boolean}
 * @static
 * */
export const isObject = val => typeof val === 'object'
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
