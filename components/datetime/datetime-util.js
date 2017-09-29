/* eslint-disable camelcase */
/**
 * @typedef {Object} DateTimeData   - DateTimeData
 * @property {number} year - year
 * @property {number} month - month
 * @property {number} day - day
 * @property {number} hour - hour
 * @property {number} minute - minute
 * @property {number} second - second
 * @property {number} millisecond - millisecond
 * @property {number} tzOffset - tzOffset
 * */
/**
 * @typedef {Object} LocaleData   - LocaleData
 * @property {string[]} monthNames - monthNames
 * @property {string[]} monthShortNames - monthShortNames
 * @property {string[]} dayNames - dayNames
 * @property {string[]} dayShortNames - dayShortNames
 * */
/**
 * @module datetime-util
 * @description
 *
 * ## Datetime组件使用的日期工具
 *
 * @private
 * */
import { isBlank, isDate, isPresent, isString } from '../util/util'

const FORMAT_YYYY = 'YYYY'
const FORMAT_YY = 'YY'
const FORMAT_MMMM = 'MMMM'
const FORMAT_MMM = 'MMM'
const FORMAT_MM = 'MM'
const FORMAT_M = 'M'
const FORMAT_DDDD = 'DDDD'
const FORMAT_DDD = 'DDD'
const FORMAT_DD = 'DD'
const FORMAT_D = 'D'
const FORMAT_HH = 'HH'
const FORMAT_H = 'H'
const FORMAT_hh = 'hh'
const FORMAT_h = 'h'
const FORMAT_mm = 'mm'
const FORMAT_m = 'm'
const FORMAT_ss = 'ss'
const FORMAT_s = 's'
const FORMAT_A = 'A'
const FORMAT_a = 'a'

const FORMAT_KEYS = [
  {f: FORMAT_YYYY, k: 'year'},
  {f: FORMAT_MMMM, k: 'month'},
  {f: FORMAT_DDDD, k: 'day'},
  {f: FORMAT_MMM, k: 'month'},
  {f: FORMAT_DDD, k: 'day'},
  {f: FORMAT_YY, k: 'year'},
  {f: FORMAT_MM, k: 'month'},
  {f: FORMAT_DD, k: 'day'},
  {f: FORMAT_HH, k: 'hour'},
  {f: FORMAT_hh, k: 'hour'},
  {f: FORMAT_mm, k: 'minute'},
  {f: FORMAT_ss, k: 'second'},
  {f: FORMAT_M, k: 'month'},
  {f: FORMAT_D, k: 'day'},
  {f: FORMAT_H, k: 'hour'},
  {f: FORMAT_h, k: 'hour'},
  {f: FORMAT_m, k: 'minute'},
  {f: FORMAT_s, k: 'second'},
  {f: FORMAT_A, k: 'ampm'},
  {f: FORMAT_a, k: 'ampm'}
]

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const DAY_SHORT_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const MONTH_SHORT_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const VALID_AMPM_PREFIX = [
  FORMAT_hh,
  FORMAT_h,
  FORMAT_mm,
  FORMAT_m,
  FORMAT_ss,
  FORMAT_s
]

/* eslint-disable no-useless-escape */
const ISO_8601_REGEXP = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/
const TIME_REGEXP = /^((\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/

/* eslint-enable no-useless-escape */

/**
 * @param {string} template - template
 * @param {DateTimeData} value - value
 * @param {LocaleData} locale - locale
 * */
export function renderDateTime (template, value, locale) {
  if (isBlank(value)) {
    return ''
  }

  let tokens = []
  let hasText = false
  FORMAT_KEYS.forEach((format, index) => {
    if (template.indexOf(format.f) > -1) {
      var token = '{' + index + '}'
      var text = renderTextFormat(format.f, value[format.k], value, locale)

      if (!hasText && text && isPresent(value[format.k])) {
        hasText = true
      }

      tokens.push(token, text)

      template = template.replace(format.f, token)
    }
  })

  if (!hasText) {
    return ''
  }

  for (var i = 0; i < tokens.length; i += 2) {
    template = template.replace(tokens[i], tokens[i + 1])
  }

  return template
}

/**
 * @param {string} format - format
 * @param {*} value - value
 * @param {DateTimeData} date - date
 * @param {LocaleData} locale - locale
 * @return {string}
 * */
export function renderTextFormat (format, value, date, locale) {
  if (format === FORMAT_DDDD || format === FORMAT_DDD) {
    try {
      value = new Date(date.year, date.month - 1, date.day).getDay()

      if (format === FORMAT_DDDD) {
        return (isPresent(locale.dayNames) ? locale.dayNames : DAY_NAMES)[value]
      }

      return (isPresent(locale.dayShortNames)
        ? locale.dayShortNames
        : DAY_SHORT_NAMES)[value]
    } catch (e) {}
    return ''
  }

  if (format === FORMAT_A) {
    return date
      ? date.hour < 12 ? 'AM' : 'PM'
      : isPresent(value) ? value.toUpperCase() : ''
  }

  if (format === FORMAT_a) {
    return date ? (date.hour < 12 ? 'am' : 'pm') : isPresent(value) ? value : ''
  }

  if (isBlank(value)) {
    return ''
  }

  if (
    format === FORMAT_YY ||
    format === FORMAT_MM ||
    format === FORMAT_DD ||
    format === FORMAT_HH ||
    format === FORMAT_mm ||
    format === FORMAT_ss
  ) {
    return twoDigit(value)
  }

  if (format === FORMAT_YYYY) {
    return fourDigit(value)
  }

  if (format === FORMAT_MMMM) {
    return (isPresent(locale.monthNames) ? locale.monthNames : MONTH_NAMES)[value - 1]
  }

  if (format === FORMAT_MMM) {
    return (isPresent(locale.monthShortNames)
      ? locale.monthShortNames
      : MONTH_SHORT_NAMES)[value - 1]
  }

  if (format === FORMAT_hh || format === FORMAT_h) {
    if (value === 0) {
      return '12'
    }
    if (value > 12) {
      value -= 12
    }
    if (format === FORMAT_hh && value < 10) {
      return '0' + value
    }
  }

  return value.toString()
}

/**
 * @param {string} format - format
 * @param {DateTimeData} min - min
 * @param {DateTimeData} max - max
 * @return {Array}
 * */
export function dateValueRange (format, min, max) {
  let opts = []
  let i

  if (format === FORMAT_YYYY || format === FORMAT_YY) {
    // year
    i = max.year
    while (i >= min.year) {
      opts.push(i--)
    }
  } else if (
    format === FORMAT_MMMM ||
    format === FORMAT_MMM ||
    format === FORMAT_MM ||
    format === FORMAT_M ||
    format === FORMAT_hh ||
    format === FORMAT_h
  ) {
    // month or 12-hour
    for (i = 1; i < 13; i++) {
      opts.push(i)
    }
  } else if (
    format === FORMAT_DDDD ||
    format === FORMAT_DDD ||
    format === FORMAT_DD ||
    format === FORMAT_D
  ) {
    // day
    for (i = 1; i < 32; i++) {
      opts.push(i)
    }
  } else if (format === FORMAT_HH || format === FORMAT_H) {
    // 24-hour
    for (i = 0; i < 24; i++) {
      opts.push(i)
    }
  } else if (format === FORMAT_mm || format === FORMAT_m) {
    // minutes
    for (i = 0; i < 60; i++) {
      opts.push(i)
    }
  } else if (format === FORMAT_ss || format === FORMAT_s) {
    // seconds
    for (i = 0; i < 60; i++) {
      opts.push(i)
    }
  } else if (format === FORMAT_A || format === FORMAT_a) {
    // AM/PM
    opts.push('am', 'pm')
  }

  return opts
}

/**
 * @param {number} year - year
 * @param {number} month - month
 * @param {number} day - day
 * @return {number}
 * */
export function dateSortValue (year, month, day) {
  return parseInt(`1${fourDigit(year)}${twoDigit(month)}${twoDigit(day)}`, 10)
}

/**
 * @param {DateTimeData} data - data
 * @return {number}
 * */
export function dateDataSortValue (data) {
  if (data) {
    return dateSortValue(data.year, data.month, data.day)
  }
  return -1
}

/**
 * @param {number} month - month
 * @param {number} year - year
 * @return {number}
 * */
export function daysInMonth (month, year) {
  return month === 4 || month === 6 || month === 9 || month === 11
    ? 30
    : month === 2 ? (isLeapYear(year) ? 29 : 28) : 31
}

/**
 * @param {number} year - year
 * @return {boolean}
 * */
export function isLeapYear (year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * @param {*} val - val
 * @return {DateTimeData}
 * */
export function parseDate (val) {
  // manually parse IS0 cuz Date.parse cannot be trusted
  // ISO 8601 format: 1994-12-15T13:47:20Z
  // new Date()
  // new Date().toString()
  // new Date('2017/01/01')

  let parse
  if (isPresent(val)) {
    if (val !== '') {
      // try parsing for just time first, HH:MM
      parse = TIME_REGEXP.exec(val)
      if (isPresent(parse)) {
        // adjust the array so it fits nicely with the datetime parse
        parse.unshift(undefined, undefined)
        parse[2] = parse[3] = undefined
      } else {
        // try parsing for full ISO datetime
        parse = ISO_8601_REGEXP.exec(val)
      }

      // try to pase string to Date Object
      if (isBlank(parse)) {
        let dateValue = new Date(val)
        if (isPresent(dateValue)) {
          val = dateValue
        }
      }
    }

    // if val is a Date Object
    if (
      Object.prototype.toString
      .call(val)
      .match(/^(\[object )(\w+)\]$/i)[2]
      .toLowerCase() === 'date'
    ) {
      parse = [
        '',
        val.getFullYear(),
        val.getMonth() + 1,
        val.getDate(),
        val.getHours(),
        val.getMinutes(),
        val.getSeconds(),
        val.getMilliseconds()
      ]
    }
  }

  if (isBlank(parse)) {
    // wasn't able to parse the ISO datetime
    return null
  }

  // ensure all the parse values exist with at least 0
  for (var i = 1; i < 8; i++) {
    parse[i] = parse[i] !== undefined ? parseInt(parse[i], 10) : null
  }

  var tzOffset = 0
  if (isPresent(parse[9]) && isPresent(parse[10])) {
    // hours
    tzOffset = parseInt(parse[10], 10) * 60
    if (isPresent(parse[11])) {
      // minutes
      tzOffset += parseInt(parse[11], 10)
    }
    if (parse[9] === '-') {
      // + or -
      tzOffset *= -1
    }
  }

  return {
    year: parse[1],
    month: parse[2],
    day: parse[3],
    hour: parse[4],
    minute: parse[5],
    second: parse[6],
    millisecond: parse[7],
    tzOffset: tzOffset
  }
}

/**
 * @param {DateTimeData} existingData - existingData
 * @param {*} newData - newData
 * */
export function updateDate (existingData = {}, newData) {
  !existingData && (existingData = {})
  if (isPresent(newData) && newData !== '') {
    if (isString(newData) || isDate(newData)) {
      // new date is a string, and hopefully in the ISO format
      // convert it to our DateTimeData if a valid ISO
      newData = parseDate(newData)

      if (newData) {
        // successfully parsed the ISO string to our DateTimeData
        Object.assign(existingData, newData)
        return existingData
      }
    } else if (
      isPresent(newData.year) ||
      isPresent(newData.hour) ||
      isPresent(newData.month) ||
      isPresent(newData.day) ||
      isPresent(newData.minute) ||
      isPresent(newData.second)
    ) {
      // newData is from of a datetime picker's selected values
      // update the existing DateTimeData data with the new values

      // do some magic for 12-hour values
      if (isPresent(newData.ampm) && isPresent(newData.hour)) {
        if (newData.ampm.value === 'pm') {
          newData.hour.value =
            newData.hour.value === 12 ? 12 : newData.hour.value + 12
        } else {
          newData.hour.value =
            newData.hour.value === 12 ? 0 : newData.hour.value
        }
      }

      // merge new values from the picker's selection
      // to the existing DateTimeData values
      for (var k in newData) {
        existingData[k] = newData[k].value
      }

      return existingData
    }
    // eww, invalid data
    console.warn(
      `Error parsing date: "${newData}". Please provide a valid ISO 8601 datetime format: https://www.w3.org/TR/NOTE-datetime`
    )
  } else {
    // blank data, clear everything out
    for (let k in existingData) {
      delete existingData[k]
    }
  }

  return existingData
}

/**
 * @param {string} template - template
 * @retrun {array}
 * */
export function parseTemplate (template) {
  const formats = []

  template = template.replace(/[^\w\s]/gi, ' ')

  FORMAT_KEYS.forEach(format => {
    if (
      format.f.length > 1 &&
      template.indexOf(format.f) > -1 &&
      template.indexOf(format.f + format.f.charAt(0)) < 0
    ) {
      template = template.replace(format.f, ' ' + format.f + ' ')
    }
  })

  const words = template.split(' ').filter(w => w.length > 0)
  words.forEach((word, i) => {
    FORMAT_KEYS.forEach(format => {
      if (word === format.f) {
        if (word === FORMAT_A || word === FORMAT_a) {
          // this format is an am/pm format, so it's an "a" or "A"
          if (
            (formats.indexOf(FORMAT_h) < 0 && formats.indexOf(FORMAT_hh) < 0) ||
            VALID_AMPM_PREFIX.indexOf(words[i - 1]) === -1
          ) {
            // template does not already have a 12-hour format
            // or this am/pm format doesn't have a hour, minute, or second format immediately before it
            // so do not treat this word "a" or "A" as the am/pm format
            return
          }
        }
        formats.push(word)
      }
    })
  })

  return formats
}

/**
 * @param {DateTimeData} date - date
 * @param {string} format - format
 * */
export function getValueFromFormat (date, format) {
  if (format === FORMAT_A || format === FORMAT_a) {
    return date.hour < 12 ? 'am' : 'pm'
  }
  if (format === FORMAT_hh || format === FORMAT_h) {
    return date.hour > 12 ? date.hour - 12 : date.hour
  }
  return date[convertFormatToKey(format)]
}

/**
 * @param {string} format - format
 * @return {string}
 * */
export function convertFormatToKey (format) {
  for (var k in FORMAT_KEYS) {
    if (FORMAT_KEYS[k].f === format) {
      return FORMAT_KEYS[k].k
    }
  }
  return null
}

/**
 * @param {DateTimeData} data - data
 * @return {string}
 * */
export function convertDataToISO (data) {
  // https://www.w3.org/TR/NOTE-datetime
  let rtn = ''

  if (isPresent(data)) {
    if (isPresent(data.year)) {
      // YYYY
      rtn = fourDigit(data.year)

      if (isPresent(data.month)) {
        // YYYY-MM
        rtn += '-' + twoDigit(data.month)

        if (isPresent(data.day)) {
          // YYYY-MM-DD
          rtn += '-' + twoDigit(data.day)

          if (isPresent(data.hour)) {
            // YYYY-MM-DDTHH:mm:SS
            rtn += `T${twoDigit(data.hour)}:${twoDigit(data.minute)}:${twoDigit(
              data.second
            )}`

            if (data.millisecond > 0) {
              // YYYY-MM-DDTHH:mm:SS.SSS
              rtn += '.' + threeDigit(data.millisecond)
            }

            if (isBlank(data.tzOffset) || data.tzOffset === 0) {
              // YYYY-MM-DDTHH:mm:SSZ
              rtn += 'Z'
            } else {
              // YYYY-MM-DDTHH:mm:SS+/-HH:mm
              rtn +=
                (data.tzOffset > 0 ? '+' : '-') +
                twoDigit(Math.floor(data.tzOffset / 60)) +
                ':' +
                twoDigit(data.tzOffset % 60)
            }
          }
        }
      }
    } else if (isPresent(data.hour)) {
      // HH:mm
      rtn = twoDigit(data.hour) + ':' + twoDigit(data.minute)

      if (isPresent(data.second)) {
        // HH:mm:SS
        rtn += ':' + twoDigit(data.second)

        if (isPresent(data.millisecond)) {
          // HH:mm:SS.SSS
          rtn += '.' + threeDigit(data.millisecond)
        }
      }
    }
  }

  return rtn
}

/**
 * @param {number} val - val
 * @return {string}
 * */
function twoDigit (val) {
  return ('0' + (isPresent(val) ? Math.abs(val) : '0')).slice(-2)
}

/**
 * @param {number} val - val
 * @return {string}
 * */
function threeDigit (val) {
  return ('00' + (isPresent(val) ? Math.abs(val) : '0')).slice(-3)
}

/**
 * @param {number} val - val
 * @return {string}
 * */
function fourDigit (val) {
  return ('000' + (isPresent(val) ? Math.abs(val) : '0')).slice(-4)
}
