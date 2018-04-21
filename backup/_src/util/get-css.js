/**
 * 当前环境的可用CSS变量名称
 * 下方自动执行
 * @param {HTMLElement} docEle
 * @private
 * */
class CssGenerate {
  constructor () {
    this.css = {
      transform: null,
      transition: null,
      transitionDuration: null,
      transitionDelay: null,
      transitionTimingFn: null,
      transitionStart: null,
      transitionEnd: null,
      transformOrigin: null,
      animationDelay: null
    }

    if (!this.css.transform) {
      return this.getCss()
    } else {
      /* istanbul ignore next */
      return this.css
    }
  }

  getCss () {
    var docEle = document.documentElement
    var css = this.css
    // transform
    var i
    var keys = [
      'webkitTransform',
      '-webkit-transform',
      'webkit-transform',
      'transform'
    ]

    for (i = 0; i < keys.length; i++) {
      if (docEle.style[keys[i]] !== undefined) {
        css.transform = keys[i]
        break
      }
    }

    // transition
    keys = ['webkitTransition', 'transition']
    for (i = 0; i < keys.length; i++) {
      if (docEle.style[keys[i]] !== undefined) {
        css.transition = keys[i]
        break
      }
    }

    // The only prefix we care about is webkit for transitions.
    var isWebkit = css.transition.indexOf('webkit') > -1

    // transition duration
    css.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration'

    // transition timing function
    css.transitionTimingFn =
      (isWebkit ? '-webkit-' : '') + 'transition-timing-function'

    // transition delay
    css.transitionDelay = (isWebkit ? '-webkit-' : '') + 'transition-delay'

    // To be sure transitionend works everywhere, include *both* the webkit and non-webkit events
    css.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend'

    // transform origin
    css.transformOrigin = (isWebkit ? '-webkit-' : '') + 'transform-origin'

    // animation delay
    css.animationDelay = isWebkit ? 'webkitAnimationDelay' : 'animationDelay'
    return css
  }
}

export default new CssGenerate()
