/* eslint-disable no-undef,no-unused-expressions */
import {
  addClass,
  clamp,
  defaults,
  docReady,
  firstUpperCase,
  hasClass,
  hasFocus,
  isActive,
  parsePxUnit,
  pointerCoord,
  removeClass,
  setElementClass,
  transitionEnd
} from '../util.js'

import { urlChange } from '../url-change'
import registerListener from '../register-listener'
import {
  isArray,
  isBlank,
  isBoolean,
  isCheckedProperty,
  isDate,
  isDefined,
  isFunction,
  isNumber,
  isObject,
  isPlainObject,
  isPresent,
  isPrimitive,
  isRegexp,
  isString,
  isTrueProperty,
  isUndefined
} from '../type'

// ,isString,isNumber,isFunction
describe('util', function () {
  it('isBoolean()', function () {
    expect(isBoolean(true)).toBeTruthy()
    expect(isBoolean(false)).toBeTruthy()
  })

  it('isString()', function () {
    expect(isString('123')).toBeTruthy()
    expect(isString(true)).toBeFalsy()
  })

  it('isNumber()', function () {
    expect(isNumber(123)).toBeTruthy()
    expect(isNumber(true)).toBeFalsy()
  })

  it('isFunction()', function () {
    expect(isFunction(function () {})).toBeTruthy()
    expect(isFunction(true)).toBeFalsy()
  })

  it('isDefined()', function () {
    expect(isDefined(1)).toBeTruthy()
    expect(isDefined(undefined)).toBeFalsy()
  })

  it('isUndefined()', function () {
    expect(isUndefined(1)).toBeFalsy()
    expect(isUndefined(undefined)).toBeTruthy()
  })

  it('isPresent()', function () {
    expect(isPresent(undefined)).toBeFalsy()
    expect(isPresent(null)).toBeFalsy()
    expect(isPresent('')).toBeFalsy()
  })

  it('isBlank()', function () {
    expect(isBlank(undefined)).toBeTruthy()
    expect(isBlank(null)).toBeTruthy()
  })

  it('isObject()', function () {
    expect(isObject({})).toBeTruthy()
  })

  it('isDate()', function () {
    expect(isDate(new Date())).toBeTruthy()
  })

  it('isRegexp()', function () {
    expect(isRegexp(/w/)).toBeTruthy()
  })

  it('isArray()', function () {
    expect(isArray([])).toBeTruthy()
  })

  it('isPlainObject()', function () {
    expect(isPlainObject({})).toBeTruthy()
  })

  it('isPrimitive()', function () {
    expect(isPrimitive('123')).toBeTruthy()
    expect(isPrimitive(123)).toBeTruthy()
    expect(isPrimitive(false)).toBeTruthy()
    expect(isPrimitive(true)).toBeTruthy()
  })

  it('isTrueProperty()', function () {
    expect(isTrueProperty('true')).toBeTruthy()
    expect(isTrueProperty('on')).toBeTruthy()
    expect(isTrueProperty('')).toBeTruthy()
  })

  it('isCheckedProperty()', function () {
    expect(isCheckedProperty(undefined, undefined)).toBeTruthy()
    expect(isCheckedProperty(undefined, null)).toBeTruthy()
    expect(isCheckedProperty(undefined, '')).toBeTruthy()

    expect(isCheckedProperty(null, undefined)).toBeTruthy()
    expect(isCheckedProperty(null, null)).toBeTruthy()
    expect(isCheckedProperty(null, '')).toBeTruthy()

    expect(isCheckedProperty('', undefined)).toBeTruthy()
    expect(isCheckedProperty('', null)).toBeTruthy()
    expect(isCheckedProperty('', '')).toBeTruthy()

    expect(isCheckedProperty(true, true)).toBeTruthy()
    expect(isCheckedProperty(true, 'true')).toBeTruthy()
    expect(isCheckedProperty('true', true)).toBeTruthy()
    expect(isCheckedProperty('true', 'true')).toBeTruthy()

    expect(isCheckedProperty(false, false)).toBeTruthy()
    expect(isCheckedProperty(false, 'false')).toBeTruthy()
    expect(isCheckedProperty('false', false)).toBeTruthy()
    expect(isCheckedProperty('false', 'false')).toBeTruthy()

    expect(isCheckedProperty(0, 0)).toBeTruthy()
    expect(isCheckedProperty(0, '0')).toBeTruthy()
    expect(isCheckedProperty('0', 0)).toBeTruthy()
    expect(isCheckedProperty('0', '0')).toBeTruthy()

    expect(isCheckedProperty('123', '123')).toBeTruthy()
    expect(isCheckedProperty('123', 123)).toBeTruthy()
  })

  it('transitionEnd()', function () {
    let res = transitionEnd(window, function () {})
    expect(isFunction(res)).toBeTruthy()
  })

  it('urlChange()', function () {
    let res = urlChange(function () {})
    expect(isFunction(res)).toBeTruthy()
  })

  it('registerListener()', function () {
    let res = registerListener(window, 'onload', function () {})
    expect(isFunction(res)).toBeTruthy()
  })

  it('docReady()', function () {
    let res = docReady()

    function getType (value) {
      return Object.prototype.toString.call(value).match(/^(\[object )(\w+)\]$/i)[2].toLowerCase()
    }

    expect(getType(res)).toEqual('promise')
  })

  it('pointerCoord(ev):changedTouches', function () {
    let res = pointerCoord({
      changedTouches: [{
        clientX: 1,
        clientY: 2
      }]
    })
    expect(JSON.stringify(res)).toEqual('{"x":1,"y":2}')
  })

  it('pointerCoord(ev):pageX', function () {
    let res = pointerCoord({
      pageX: 1,
      pageY: 2
    })
    expect(JSON.stringify(res)).toEqual('{"x":1,"y":2}')
  })

  it('pointerCoord()', function () {
    let res = pointerCoord()
    expect(JSON.stringify(res)).toEqual('{"x":0,"y":0}')
  })

  it('isActive()', function () {
    let res = isActive(window)
    expect(res).toBeFalsy()
  })

  it('hasFocus()', function () {
    let res = hasFocus(window)
    expect(res).toBeFalsy()
  })

  it('hasClass()', function () {
    let ele = {
      className: 'className'
    }
    let res = hasClass(ele, 'className')
    expect(res).toBeTruthy()
  })

  it('addClass()', function () {
    let ele = {
      className: 'className'
    }
    addClass(ele, 'className12')
    expect(ele.className).toEqual('className className12')
  })

  it('removeClass()', function () {
    let ele = {
      className: 'className className12'
    }
    removeClass(ele, 'className12')
    expect(ele.className).toEqual('className')
  })

  it('setElementClass():add', function () {
    let ele = {
      className: 'className'
    }
    setElementClass(ele, 'className12', true)
    expect(ele.className).toEqual('className className12')
  })

  it('setElementClass():remove', function () {
    let ele = {
      className: 'className className12'
    }
    setElementClass(ele, 'className12', false)
    expect(ele.className).toEqual('className')
  })

  it('clamp():min', function () {
    let res = clamp(1, -10, 10)
    expect(res).toEqual(1)
  })

  it('clamp():mid', function () {
    let res = clamp(1, 5, 10)
    expect(res).toEqual(5)
  })

  it('clamp():max', function () {
    let res = clamp(1, 100, 10)
    expect(res).toEqual(10)
  })

  it('defaults()', function () {
    let res = defaults({a: 1}, {b: 1, a: 2}, {b: 10})
    expect(JSON.stringify(res)).toEqual('{"a":1,"b":10}')
  })

  it('firstUpperCase()', function () {
    let res = firstUpperCase('helloWorld')
    expect(res).toEqual('HelloWorld')
  })

  it('parsePxUnit()', function () {
    let res = parsePxUnit('10px')
    expect(res).toEqual(10)
  })
})
