/**
 * @class ScrollView
 * @classdesc Content组件使用的滚动引擎
 *
 * 滚动引擎根使用原生滚动
 *
 * @private
 * */
import { isBoolean, isNumber, isPresent, registerListener } from './util'

const SCROLL_END_DEBOUNCE_MS = 80
const FRAME_MS = (1000 / 60)
const EVENT_OPTS = {passive: true}

export default class ScrollView {
  constructor () {
    this.isScrolling = false       // 判断正在滚动
    this.initialized = false       // 判断是否已完成初始化
    this.scrollStart = (ev) => {}  // 滚动开始的回调, 传入ev参数, 一般用于事件操作
    this.scroll = (ev) => {}       // 滚动进行的回调, 传入ev参数, 一般用于事件操作
    this.scrollEnd = (ev) => {}    // 滚动结束的回调, 传入ev参数, 一般用于事件操作

    this.transform = window.VM && window.VM.platform && window.VM.platform.css.transform

    this._el = null                   // scrollElement 当前滚动实例的元素

    this._lsn = null                  // 监听函数 listen, 用于nativeScrll
    this._endTmr = null               // 事件记录 timeout, 用于nativeScrll

    // 滚动对象
    this.ev = {
      timeStamp: 0,

      scrollLeft: 0,
      scrollTop: 0,

      scrollHeight: 0,
      scrollWidth: 0,

      contentHeight: 0,
      contentWidth: 0,
      contentTop: 0,      // 内容顶部到上边框的距离

      startY: 0,
      startX: 0,
      deltaY: 0,
      deltaX: 0,
      velocityY: 0,
      velocityX: 0,
      directionY: 'down',
      directionX: null,
      contentElement: null, // HTMLElement
      fixedElement: null, // HTMLElement
      scrollElement: null, // HTMLElement
      headerElement: null, // HTMLElement
      footerElement: null // HTMLElement
    }
  }

  /**
   * 滚动对象初始化
   * @private
   * */
  init () {
    if (!this.initialized) {
      this.initialized = true
      this._el = document.documentElement

      this.ev.scrollHeight = this._el.scrollHeight
      this.ev.scrollWidth = this._el.scrollWidth

      this.enableNativeScrolling()
    }
  }

  /**
   * 初始化原生滚动, 这里: 滚动时能监听滚动的状态
   * @private
   * */
  enableNativeScrolling () {
    const self = this
    const ev = self.ev
    const positions = [] // number[]

    /**
     * @param {UIEvent} scrollEvent
     * */
    function scrollCallback (scrollEvent) {
      ev.timeStamp = scrollEvent.timeStamp

      ev.scrollTop = self.getTop()
      ev.scrollLeft = self.getLeft()

      ev.scrollHeight = self.getHeight()
      ev.scrollWidth = self.getWidth()

      if (!self.isScrolling) {
        // scroll start
        self.isScrolling = true

        // 记录开始的位置
        ev.startY = ev.scrollTop
        ev.startX = ev.scrollLeft

        // 开始前重置参数
        ev.velocityY = ev.velocityX = 0
        ev.deltaY = ev.deltaX = 0
        positions.length = 0

        // 发送scrollStart事件, 传递ev值
        self.scrollStart(ev)
      }

      // actively scrolling
      positions.push(ev.scrollTop, ev.scrollLeft, ev.timeStamp)

      if (positions.length > 3) {
        // we've gotten at least 2 scroll events so far
        ev.deltaY = (ev.scrollTop - ev.startY)
        ev.deltaX = (ev.scrollLeft - ev.startX)

        var endPos = (positions.length - 1)
        var startPos = endPos
        var timeRange = (ev.timeStamp - 100)

        // move pointer to position measured 100ms ago
        for (var i = endPos; i > 0 && positions[i] > timeRange; i -= 3) {
          startPos = i
        }

        if (startPos !== endPos) {
          // compute relative movement between these two points
          var timeOffset = (positions[endPos] - positions[startPos])
          var movedTop = (positions[startPos - 2] - positions[endPos - 2])
          var movedLeft = (positions[startPos - 1] - positions[endPos - 1])

          // based on XXms compute the movement to apply for each render step
          ev.velocityY = ((movedTop / timeOffset) * FRAME_MS)
          ev.velocityX = ((movedLeft / timeOffset) * FRAME_MS)

          // figure out which direction we're scrolling
          ev.directionY = (movedTop > 0 ? 'up' : 'down')
          ev.directionX = (movedLeft > 0 ? 'left' : 'right')
        }
      }

      function scrollEnd () {
        // 当停止滚动一段时间后触发scrollEnd事件
        self.isScrolling = false

        // reset velocity, do not reset the directions or deltas
        ev.velocityY = ev.velocityX = 0

        // 发送scrollEnd事件, 传递ev值
        self.scrollEnd(ev)

        self._endTmr = null
      }

      // 发送每一次的scroll事件, 传递ev值
      self.scroll(ev)

      // 定时超时时间SCROLL_END_DEBOUNCE_MS, 如果超时则判断当前滚动结束, 发送scrollEnd事件
      window.clearTimeout(self._endTmr)
      self._endTmr = window.setTimeout(scrollEnd, SCROLL_END_DEBOUNCE_MS)
    }

    // 如果有则清楚之前绑定的事件
    self._lsn && self._lsn()

    // assign the raw scroll listener
    // note that it does not have a wrapping requestAnimationFrame on purpose
    // a scroll event callback will always be right before the raf callback
    // so there's little to no value of using raf here since it'll all ways immediately
    // call the raf if it was set within the scroll event, so this will save us some time
    self._lsn = registerListener(window, 'scroll', scrollCallback, EVENT_OPTS)
  }

  /**
   * 获取scrollHeight
   * @private
   * */
  getHeight () {
    return this._el.scrollHeight
  }

  /**
   * 获取scrollHeight
   * @private
   * */
  getWidth () {
    return this._el.scrollWidth
  }

  /**
   * 获取滚动的上边距
   * return {Number}
   * @private
   */
  getTop () {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  }

  /**
   * 获取滚动的左边距
   * return {Number}
   * @private
   */
  getLeft () {
    return document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft
  }

  /**
   * 设置滚动上部距离, 只在nativeScroll中用到
   * @param {number} top
   * @private
   */
  setTop (top) {
    window.scrollTo(0, top)
  }

  /**
   * 设置滚动左边距离, 只在nativeScroll中用到
   * @param {number} left
   * @private
   */
  setLeft (left) {
    window.scrollTo(left, 0)
  }

  /**
   * 停止滚动
   * @private
   * */
  stop () {
    this.isScrolling = false
  }

  /**
   * 销毁
   * @private
   */
  destroy () {
    this.stop()

    this._endTmr && window.clearTimeout(this._endTmr)
    this._lsn && this._lsn()
    this._lsn = null

    let ev = this.ev
    ev.contentElement = ev.fixedElement = ev.scrollElement = ev.headerElement = {}
    this._el = this.ev = ev = null
    this.scrollStart && (this.scrollStart = (ev) => {})
    this.scroll && (this.scrollStart = (ev) => {})
    this.scrollEnd && (this.scrollStart = (ev) => {})
  }

  // --------- public ---------
  /**
   * scrollTo
   * 滚动到, 绝对滚动
   * @param {Number} [x=0] - 横轴位置
   * @param {Number} [y=0] - 纵轴位置
   * @param {Number} [duration=300] - 滚动时间
   * @param {Function} [done]
   * @return {Promise}
   */
  scrollTo (x = 0, y = 0, duration = 300, done) {
    const el = this._el
    let promise
    if (done === undefined) {
      // only create a promise if a done callback wasn't provided
      // done can be a null, which avoids any functions
      promise = new Promise(resolve => {
        done = resolve
      })
    }

    // scroll animation loop w/ easing
    // credit https://gist.github.com/dezinezync/5487119
    if (duration < 32) {
      this.setTop(y)
      this.setLeft(x)
      done()
      return promise
    }

    const fromY = this.getTop()
    const fromX = this.getLeft()

    const maxAttempts = (duration / 16) + 100
    const transform = this.transform

    let startTime // number
    let timeStamp
    let attempts = 0
    let stopScroll = false

    // scroll loop
    // eslint-disable-next-line no-inner-declarations
    let step = () => {
      attempts++

      if (stopScroll || attempts > maxAttempts) {
        this.isScrolling = false
        el.style[transform] = ''
        done()
        return
      }

      timeStamp = new Date().getTime()

      let time = Math.min(1, ((timeStamp - startTime) / duration))

      // where .5 would be 50% of time on a linear scale easedT gives a
      // fraction based on the easing method
      let easedT = (--time) * time * time + 1

      if (fromY !== y) {
        this.setTop((easedT * (y - fromY)) + fromY)
      }

      if (fromX !== x) {
        this.setLeft(Math.floor((easedT * (x - fromX)) + fromX))
      }

      if (easedT < 1) {
        // do not use DomController here
        // must use window.requestAnimationFrame in order to fire in the next frame
        window.requestAnimationFrame(step)
      } else {
        stopScroll = true
        this.isScrolling = false
        done()
      }
    }

    // 准备开始滚动循环
    this.isScrolling = true
    startTime = new Date().getTime()
    // 开始第一帧
    window.requestAnimationFrame(step)

    return promise
  }

  /**
   * @param {number} [duration=300] - 滚动时间
   * @return {Promise}
   */
  scrollToTop (duration = 300) {
    return this.scrollTo(0, 0, duration)
  }

  /**
   * @param {number} [duration=300] - 滚动时间
   * @return {Promise}
   */
  scrollToBottom (duration = 300) {
    let y = this.getHeight() - this._el.clientHeight
    return this.scrollTo(0, y, duration)
  }

  /**
   * scrollBy
   * 滚动到, 相对滚动
   * @param {number} [x=0] - 横轴位置
   * @param {number} [y=0] - 纵轴位置
   * @param {number} [duration=300] - 滚动时间
   * @param {Function} done
   * @return {Promise}
   */
  scrollBy (x = 0, y = 0, duration = 300, done) {
    y += this.getTop()
    x += this.getLeft()
    return this.scrollTo(x, y, duration, done)
  }

  /**
   * scrollToElement
   * 滚动到某个元素, 默认滚动到顶部对其, 如果offsetX/offsetY传入的是boolean类型, 且为true, 则滚动到屏幕中间
   * @param {Element} el - 元素Element
   * @param {Number} [duration=300] - 滚动时间
   * @param {Number|Boolean} [offsetX=0] - 元素位置距离屏幕顶部的距离
   * @param {Number|Boolean} [offsetY=0] - 元素位置距离屏幕左侧的距离
   * @param {Function} [done]
   * @return {Promise}
   * */
  scrollToElement (el, duration = 300, offsetX = 0, offsetY = 0, done) {
    if (!el) {
      console.assert(el, 'The method scrollToElement() need element!')
      return new Promise((resolve) => { resolve() })
    }

    let x = 0
    let y = el.offsetTop

    // Content组件默认是上下滚动, 如果offsetX没有别的值, 则不进行offsetX设置
    if (isPresent(offsetX)) {
      if (isNumber(offsetX) && offsetX !== 0) {
        x = el.offsetLeft + offsetX
      }

      if (isBoolean(offsetX) && offsetX) {
        x = el.offsetLeft + ((this.ev.contentWidth - el.offsetWidth) / 2)
      }
    }

    if (isPresent(offsetY)) {
      if (isNumber(offsetY)) {
        y -= offsetY
      }

      if (isBoolean(offsetY) && offsetY) {
        y -= ((window.innerHeight - el.offsetHeight) / 2)
      }
    }

    return this.scrollTo(x, y, duration, done)
  }
}
