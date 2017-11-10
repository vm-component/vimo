/**
 * 常用正则
 * */
export default {
  // 整数(包含正负)
  integer: {
    type: 'number',
    regexp: /^-?[1-9]\d*$/
  },
  // 正整数
  positiveInteger: {
    type: 'number',
    regexp: /^[1-9]\d*$/
  },
  // 负整数
  negativeInteger: {
    type: 'number',
    regexp: /^-[1-9]\d*$/
  },
  // 邮箱
  email: {
    type: 'email',
    regexp: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  },
  // IP地址
  ip: {
    type: 'number',
    regexp: /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/
  },
  // 身份证 text
  idCard: {
    type: 'text',
    regexp (num) {
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
      if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
        console.debug('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。')
        return false
      }
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      // 下面分别分析出生日期和校验位
      var re, len, arrSplit, dtmBirth, bGoodDay, arrInt, arrCh, nTemp, k
      len = num.length
      /* istanbul ignore if */
      if (len === 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
        arrSplit = num.match(re)

        // 检查生日日期是否正确
        dtmBirth = new Date(
          '19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]
        )
        bGoodDay =
          dtmBirth.getYear() === Number(arrSplit[2]) &&
          dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
          dtmBirth.getDate() === Number(arrSplit[4])
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
        bGoodDay =
          dtmBirth.getFullYear() === Number(arrSplit[2]) &&
          dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
          dtmBirth.getDate() === Number(arrSplit[4])
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
            console.debug('18位身份证的校验码不正确！应该为：' + num.substr(17, 1) + '->' + valnum)
            return false
          }
          return true
        }
      }
      /* istanbul ignore next */
      return false
    }
  },
  // 密码需6-18位，以字母开头可含数字
  password: {
    type: 'password',
    regexp: /^[a-zA-Z]\w{5,17}$/
  },
  // 国内电话, 正确格式为：XXXX-XXXXXXX，XXXX- XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。
  tel: {
    type: 'tel',
    regexp: /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
  },
  // 国内手机号, 13/14/15/18/17开头
  mobile: {
    type: 'tel',
    regexp: /^((13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9]))\d{8}$/
  },
  // 验证汉字
  cn: {
    type: 'text',
    regexp: /[\u4e00-\u9fa5]/
  },
  // 验证码, 至少4位
  securityCode: {
    type: 'number',
    regexp: /^\d{4,}$/
  },
  // 昵称: 可由中英文字母、数字、"-"、"_"组成。
  nickName: {
    type: 'text',
    regexp: /[A-Za-z0-9_\-\u4e00-\u9fa5]+/
  },
  // qq: 1-9开头，最少5位。
  qq: {
    type: 'number',
    regexp: /^[1-9][0-9]{4,}$/
  },
  // 网址URL, 必须以(https|http|ftp|rtsp|mms)开头
  url: {
    type: 'url',
    regexp: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
  }
}
