/* eslint-disable no-undef,no-unused-expressions */
import regexp from '../regexp'

// ,isString,isNumber,isFunction
describe('regexp', function () {
  it('integer', function () {
    expect(regexp.integer.regexp.test(123)).toBeTruthy()
  })
  it('positiveInteger', function () {
    expect(regexp.positiveInteger.regexp.test(123)).toBeTruthy()
  })
  it('negativeInteger', function () {
    expect(regexp.negativeInteger.regexp.test(-1)).toBeTruthy()
  })
  it('email', function () {
    expect(regexp.email.regexp.test('123@163.com')).toBeTruthy()
  })
  it('ip', function () {
    expect(regexp.ip.regexp.test('255.255.255.255')).toBeTruthy()
  })
  it('idCard', function () {
    expect(regexp.idCard.regexp('112801199007153412')).toBeTruthy()
    expect(regexp.idCard.regexp('002801199007153412')).toBeFalsy()
    expect(regexp.idCard.regexp('0028011990071534')).toBeFalsy()
    expect(regexp.idCard.regexp('112801000000003412')).toBeFalsy()
    expect(regexp.idCard.regexp('112801199007153418')).toBeFalsy()
    expect(regexp.idCard.regexp('123')).toBeFalsy()
    expect(regexp.idCard.regexp('abc')).toBeFalsy()
    expect(regexp.idCard.regexp()).toBeFalsy()
  })
  it('password', function () {
    expect(regexp.password.regexp.test('avc123df')).toBeTruthy()
  })
  it('tel', function () {
    expect(regexp.tel.regexp.test('1234-1234567')).toBeTruthy()
    expect(regexp.tel.regexp.test('1234-12345678')).toBeTruthy()
    expect(regexp.tel.regexp.test('123-1234567')).toBeTruthy()
    expect(regexp.tel.regexp.test('123-12345678')).toBeTruthy()
    expect(regexp.tel.regexp.test('1234567')).toBeTruthy()
    expect(regexp.tel.regexp.test('12345678')).toBeTruthy()
  })
  it('mobile', function () {
    expect(regexp.mobile.regexp.test('18722221111')).toBeTruthy()
  })
  it('cn', function () {
    expect(regexp.cn.regexp.test('你好')).toBeTruthy()
  })
  it('securityCode', function () {
    expect(regexp.securityCode.regexp.test(1234)).toBeTruthy()
  })
  it('nickName', function () {
    expect(regexp.nickName.regexp.test('ABC23你好')).toBeTruthy()
  })
  it('qq', function () {
    expect(regexp.qq.regexp.test('1233221')).toBeTruthy()
  })
  it('url', function () {
    expect(regexp.url.regexp.test('http://xxx.xx.xx')).toBeTruthy()
  })
})
