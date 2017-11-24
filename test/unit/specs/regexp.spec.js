/* eslint-disable no-undef,no-unused-expressions */
import regexp from '@util/regexp'

// ,isString,isNumber,isFunction
describe('regexp', function () {
  it('integer', function () {
    expect(regexp.integer.regexp.test(123)).to.be.ok
  })
  it('positiveInteger', function () {
    expect(regexp.positiveInteger.regexp.test(123)).to.be.ok
  })
  it('negativeInteger', function () {
    expect(regexp.negativeInteger.regexp.test(-1)).to.be.ok
  })
  it('email', function () {
    expect(regexp.email.regexp.test('123@163.com')).to.be.ok
  })
  it('ip', function () {
    expect(regexp.ip.regexp.test('255.255.255.255')).to.be.ok
  })
  it('idCard', function () {
    expect(regexp.idCard.regexp('112801199007153412')).to.be.ok
    expect(regexp.idCard.regexp('002801199007153412')).to.be.not.ok
    expect(regexp.idCard.regexp('0028011990071534')).to.be.not.ok
    expect(regexp.idCard.regexp('112801000000003412')).to.be.not.ok
    expect(regexp.idCard.regexp('112801199007153418')).to.be.not.ok
    expect(regexp.idCard.regexp('123')).to.be.not.ok
    expect(regexp.idCard.regexp('abc')).to.be.not.ok
    expect(regexp.idCard.regexp()).to.be.not.ok
  })
  it('password', function () {
    expect(regexp.password.regexp.test('avc123df')).to.be.ok
  })
  it('tel', function () {
    expect(regexp.tel.regexp.test('1234-1234567')).to.be.ok
    expect(regexp.tel.regexp.test('1234-12345678')).to.be.ok
    expect(regexp.tel.regexp.test('123-1234567')).to.be.ok
    expect(regexp.tel.regexp.test('123-12345678')).to.be.ok
    expect(regexp.tel.regexp.test('1234567')).to.be.ok
    expect(regexp.tel.regexp.test('12345678')).to.be.ok
  })
  it('mobile', function () {
    expect(regexp.mobile.regexp.test('18722221111')).to.be.ok
  })
  it('cn', function () {
    expect(regexp.cn.regexp.test('你好')).to.be.ok
  })
  it('securityCode', function () {
    expect(regexp.securityCode.regexp.test(1234)).to.be.ok
  })
  it('nickName', function () {
    expect(regexp.nickName.regexp.test('ABC23你好')).to.be.ok
  })
  it('qq', function () {
    expect(regexp.qq.regexp.test('1233221')).to.be.ok
  })
  it('url', function () {
    expect(regexp.url.regexp.test('http://xxx.xx.xx')).to.be.ok
  })
})
