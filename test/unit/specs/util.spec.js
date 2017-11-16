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
  isArray,
  isBlank,
  isBoolean,
  isCheckedProperty,
  isDate,
  isDefined,
  isFunction,
  isNumber,
  isObject,
  isPassive,
  isPlainObject,
  isPresent,
  isPrimitive,
  isRegexp,
  isString,
  isTrueProperty,
  isUndefined,
  parsePxUnit,
  pointerCoord,
  removeClass,
  setElementClass,
  transitionEnd} from '../../../components/util/util.js'
import { urlChange } from 'components/util/url-change'
import { registerListener } from 'components/util/register-listener'

// ,isString,isNumber,isFunction
describe('util', function () {
  it('isBoolean()', function () {
    expect(isBoolean(true)).to.ok
    expect(isBoolean(false)).to.ok
  })

  it('isString()', function () {
    expect(isString('123')).to.ok
    expect(isString(true)).to.not.ok
  })

  it('isNumber()', function () {
    expect(isNumber(123)).to.ok
    expect(isNumber(true)).to.not.ok
  })

  it('isFunction()', function () {
    expect(isFunction(function () {})).to.ok
    expect(isFunction(true)).to.not.ok
  })

  it('isDefined()', function () {
    expect(isDefined(1)).to.ok
    expect(isDefined(undefined)).to.not.ok
  })

  it('isUndefined()', function () {
    expect(isUndefined(1)).to.not.ok
    expect(isUndefined(undefined)).to.ok
  })

  it('isPresent()', function () {
    expect(isPresent(undefined)).to.not.ok
    expect(isPresent(null)).to.not.ok
    expect(isPresent('')).to.not.ok
  })

  it('isBlank()', function () {
    expect(isBlank(undefined)).to.ok
    expect(isBlank(null)).to.ok
  })

  it('isObject()', function () {
    expect(isObject({})).to.ok
  })

  it('isDate()', function () {
    expect(isDate(new Date())).to.ok
  })

  it('isRegexp()', function () {
    expect(isRegexp(/w/)).to.ok
  })

  it('isArray()', function () {
    expect(isArray([])).to.ok
  })

  it('isPlainObject()', function () {
    expect(isPlainObject({})).to.ok
  })

  it('isPrimitive()', function () {
    expect(isPrimitive('123')).to.ok
    expect(isPrimitive(123)).to.ok
    expect(isPrimitive(false)).to.ok
    expect(isPrimitive(true)).to.ok
  })

  it('isTrueProperty()', function () {
    expect(isTrueProperty('true')).to.ok
    expect(isTrueProperty('on')).to.ok
    expect(isTrueProperty('')).to.ok
  })

  it('isCheckedProperty()', function () {
    expect(isCheckedProperty(undefined, undefined)).to.ok
    expect(isCheckedProperty(undefined, null)).to.ok
    expect(isCheckedProperty(undefined, '')).to.ok

    expect(isCheckedProperty(null, undefined)).to.ok
    expect(isCheckedProperty(null, null)).to.ok
    expect(isCheckedProperty(null, '')).to.ok

    expect(isCheckedProperty('', undefined)).to.ok
    expect(isCheckedProperty('', null)).to.ok
    expect(isCheckedProperty('', '')).to.ok

    expect(isCheckedProperty(true, true)).to.ok
    expect(isCheckedProperty(true, 'true')).to.ok
    expect(isCheckedProperty('true', true)).to.ok
    expect(isCheckedProperty('true', 'true')).to.ok

    expect(isCheckedProperty(false, false)).to.ok
    expect(isCheckedProperty(false, 'false')).to.ok
    expect(isCheckedProperty('false', false)).to.ok
    expect(isCheckedProperty('false', 'false')).to.ok

    expect(isCheckedProperty(0, 0)).to.ok
    expect(isCheckedProperty(0, '0')).to.ok
    expect(isCheckedProperty('0', 0)).to.ok
    expect(isCheckedProperty('0', '0')).to.ok

    expect(isCheckedProperty('123', '123')).to.ok
    expect(isCheckedProperty('123', 123)).to.ok
  })

  it('transitionEnd()', function () {
    let res = transitionEnd(window, function () {})
    expect(isFunction(res)).to.ok
  })

  it('urlChange()', function () {
    let res = urlChange(function () {})
    expect(isFunction(res)).to.ok
  })

  it('registerListener()', function () {
    let res = registerListener(window, 'onload', function () {})
    expect(isFunction(res)).to.ok
  })

  it('isPassive()', function () {
    let res = isPassive(window, 'onload', function () {})
    expect(res).to.not.ok
  })

  it('docReady()', function () {
    let res = docReady()

    function getType (value) {
      return Object.prototype.toString.call(value).match(/^(\[object )(\w+)\]$/i)[2].toLowerCase()
    }

    expect(getType(res)).to.equal('object')
  })

  it('pointerCoord(ev):changedTouches', function () {
    let res = pointerCoord({
      changedTouches: [{
        clientX: 1,
        clientY: 2
      }]
    })
    expect(JSON.stringify(res)).to.equal('{"x":1,"y":2}')
  })

  it('pointerCoord(ev):pageX', function () {
    let res = pointerCoord({
      pageX: 1,
      pageY: 2
    })
    expect(JSON.stringify(res)).to.equal('{"x":1,"y":2}')
  })

  it('pointerCoord()', function () {
    let res = pointerCoord()
    expect(JSON.stringify(res)).to.equal('{"x":0,"y":0}')
  })

  it('isActive()', function () {
    let res = isActive(window)
    expect(res).to.be.not.ok
  })

  it('hasFocus()', function () {
    let res = hasFocus(window)
    expect(res).to.be.not.ok
  })

  it('hasClass()', function () {
    let ele = {
      className: 'className'
    }
    let res = hasClass(ele, 'className')
    expect(res).to.be.ok
  })

  it('addClass()', function () {
    let ele = {
      className: 'className'
    }
    addClass(ele, 'className12')
    expect(ele.className).to.equal('className className12')
  })

  it('removeClass()', function () {
    let ele = {
      className: 'className className12'
    }
    removeClass(ele, 'className12')
    expect(ele.className).to.equal('className')
  })

  it('setElementClass():add', function () {
    let ele = {
      className: 'className'
    }
    setElementClass(ele, 'className12', true)
    expect(ele.className).to.equal('className className12')
  })

  it('setElementClass():remove', function () {
    let ele = {
      className: 'className className12'
    }
    setElementClass(ele, 'className12', false)
    expect(ele.className).to.equal('className')
  })

  it('clamp():min', function () {
    let res = clamp(1, -10, 10)
    expect(res).to.equal(1)
  })

  it('clamp():mid', function () {
    let res = clamp(1, 5, 10)
    expect(res).to.equal(5)
  })

  it('clamp():max', function () {
    let res = clamp(1, 100, 10)
    expect(res).to.equal(10)
  })

  it('defaults()', function () {
    let res = defaults({a: 1}, {b: 1, a: 2}, {b: 10})
    expect(JSON.stringify(res)).to.equal('{"a":1,"b":10}')
  })

  it('firstUpperCase()', function () {
    let res = firstUpperCase('helloWorld')
    expect(res).to.equal('HelloWorld')
  })

  it('parsePxUnit()', function () {
    let res = parsePxUnit('10px')
    expect(res).to.equal(10)
  })
})
