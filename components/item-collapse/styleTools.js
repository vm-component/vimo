import { isObject, isString } from '../util/util'

/**
 * 获取元素样式
 * @private
 * */
export function getStyle (el, styleName) {
  return el.style[styleName]
    ? el.style[styleName]
    : el.currentStyle
      ? el.currentStyle[styleName]
      : window.getComputedStyle(el, null)[styleName]
}

/**
 * 单位转化
 * @private
 * */
export function getStyleNum (el, styleName) {
  return parseInt(getStyle(el, styleName).replace(/px|pt|em/gi, ''))
}

/**
 * 设置样式
 * @private
 * */
export function setStyle (el, obj) {
  if (isObject(obj)) {
    for (let s in obj) {
      let cssArrt = s.split('-')
      for (let i = 1; i < cssArrt.length; i++) {
        cssArrt[i] = cssArrt[i].replace(
          cssArrt[i].charAt(0),
          cssArrt[i].charAt(0).toUpperCase()
        )
      }
      let cssArrtnew = cssArrt.join('')
      el.style[cssArrtnew] = obj[s]
    }
  } else if (isString(obj)) {
    el.style.cssText = obj
  }
}

/**
 * 获取尺寸
 * @private
 * */
export function getSize (el) {
  if (getStyle(el, 'display') !== 'none') {
    return {
      width: el.offsetWidth || getStyleNum(el, 'width'),
      height: el.offsetHeight || getStyleNum(el, 'height')
    }
  }
  let addCss = { display: '', position: 'absolute', visibility: 'hidden' }
  let oldCss = {}
  for (let i in addCss) {
    oldCss[i] = getStyle(el, i)
  }
  setStyle(el, addCss)
  let width = el.clientWidth || getStyleNum(el, 'width')
  let height = el.clientHeight || getStyleNum(el, 'height')
  // eslint-disable-next-line no-unused-vars
  for (let i in oldCss) {
    setStyle(el, oldCss)
  }
  return { width, height }
}
