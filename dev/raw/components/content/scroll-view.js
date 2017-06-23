/**
 * @class ScrollView
 * @classdesc Content组件使用的滚动引擎
 *
 * 滚动引擎根据配置切换使用原生滚动或者使用js滚动, js滚动使用IScroll插件完成.
 *
 * @private
 * */
import JsScroll from 'better-scroll/build/bscroll.js'
// import JsScroll from 'iscroll/build/iscroll-probe'
import { isBoolean, isNumber, isPresent, registerListener } from '../../util/util'

const SCROLL_END_DEBOUNCE_MS = 80
const FRAME_MS = (1000 / 60)
const EVENT_OPTS = {passive: true}

export class ScrollView {
  constructor () {
    this.isScrolling = false       // 判断正在滚动
    this.initialized = false       // 判断是否已完成初始化
    this.scrollStart = (ev) => {}  // 滚动开始的回调, 传入ev参数, 一般用于事件操作
    this.scroll = (ev) => {}       // 滚动进行的回调, 传入ev参数, 一般用于事件操作
    this.scrollEnd = (ev) => {}    // 滚动结束的回调, 传入ev参数, 一般用于事件操作

    this.transform = window.VM.platform.css.transform

    this._el = null                   // scrollElement 当前滚动实例的元素
    this._cel = null                  // contentElement 当前滚动实例的元素
    this._js = false                  // 是否执行js滚动
    this._t = 0                       // {number} scrollTop临时存储值
    this._l = 0                       // {number} scrollLeft临时存储值

    this._lsn = null                  // 监听函数 listen, 用于nativeScrll
    this._endTmr = null               // 事件记录 timeout, 用于nativeScrll

    this._jsScrollInstance = null     // iscroll instance
    this._scrollToEndTimer = null     // scrollTo完毕的timer, 用于jsScroll部分的scrollTo函数
    // 滚动对象
    this.ev = {
      isJsScroll: false,
      timeStamp: 0,
      scrollTop: 0,
      scrollLeft: 0,
      scrollHeight: 0,
      scrollWidth: 0,
      contentHeight: 0,
      contentWidth: 0,
      contentTop: 0,
      contentBottom: 0,
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
   * 滚动对象初始化, 判断_js是否标记, 否则使用原生滚动
   * (这里应该判断是否是UIWebView, 并设置_js值)
   * @param {HTMLElement} ele
   * @private
   * */
  init (ele) {
    if (!this.initialized) {
      this.initialized = true
      console.assert(ele, 'scroll-view, element can not be null')
      this._el = ele
      this._cel = ele.parentElement
      if (this._js) {
        // this.enableIScroll()
        this.enableJsScroll()
      } else {
        this.enableNativeScrolling()
      }
    }
  }

  /**
   * 初始化原生滚动, 这里: 滚动时能监听滚动的状态
   * @private
   * */
  enableNativeScrolling () {
    if (!this._el) {
      return
    }

    const self = this
    const ev = self.ev
    const positions = [] // number[]
    self._js = false
    ev.isJsScroll = false
    console.debug(`ScrollView, enableNativeScrolling`)

    /**
     * @param {UIEvent} scrollEvent
     * */
    function scrollCallback (scrollEvent) {
      ev.timeStamp = scrollEvent.timeStamp

      // 获取当前的 scrollTop
      ev.scrollTop = self.getTop()

      // 获取当前的 scrollLeft
      ev.scrollLeft = self.getLeft()

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
    self._lsn = registerListener(self._el, 'scroll', scrollCallback, EVENT_OPTS)
  }

  /**
   * 使用bScroll的解决方案
   * jsScrol: Content组件支持, 但是不触发滚动相关的事件
   * @private
   * */
  enableJsScroll () {
    console.debug(`ScrollView, enableJsScroll`)
    // 给父元素增加class
    const contentElement = this._el.parentElement
    this._js = true
    this._el.parentElement.classList.add('js-scroll')
    let config = window.VM.config.get('jsScrollOptions', {})
    this._jsScrollInstance = new JsScroll(contentElement, config)
  }

  /**
   * 使用iScroll的解决方案
   * 备用的全套方案
   * @private
   * */
  enableIScroll () {
    console.debug(`ScrollView, enableIScroll`)

    // 给父元素增加class
    const contentElement = this._el.parentElement
    const self = this
    const ev = self.ev
    const positions = [] // number[]

    self._js = true
    ev.isJsScroll = true

    self._el.parentElement.classList.add('js-scroll')

    let config = window.VM.config.get('jsScrollOptions', {})
    self._jsScrollInstance = new JsScroll(contentElement, config)

    // scroll start
    self._jsScrollInstance.on('scrollStart', () => {
      // scroll start
      self.isScrolling = true

      // 记录开始的位置
      ev.startY = self._jsScrollInstance.y * -1 >> 0
      ev.startX = self._jsScrollInstance.x * -1 >> 0

      // 开始前重置参数
      ev.velocityY = ev.velocityX = 0
      ev.deltaY = ev.deltaX = 0
      positions.length = 0

      // 发送scrollStart事件, 传递ev值
      self.scrollStart(ev)
    })

    // scroll scrolling
    self._jsScrollInstance.on('scroll', () => {
      ev.timeStamp = new Date().getTime()

      // 获取当前的 scrollTop
      ev.scrollTop = self._jsScrollInstance.y * -1 >> 0

      // 获取当前的 scrollLeft
      ev.scrollLeft = self._jsScrollInstance.x * -1 >> 0

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
          // last direction (1 down/right, 0 still, -1  up/left)
          if (self._jsScrollInstance.options.scrollY) {
            let directionY = self._jsScrollInstance.directionY
            if (directionY === 0) {
              ev.directionY = (movedTop > 0 ? 'up' : 'down')
            } else if (directionY > 0) {
              ev.directionY = 'down'
            } else {
              ev.directionY = 'up'
            }
          } else {
            let directionX = self._jsScrollInstance.directionX
            if (directionX === 0) {
              ev.directionX = (movedLeft > 0 ? 'left' : 'right')
            } else if (directionX > 0) {
              ev.directionX = 'right'
            } else {
              ev.directionX = 'left'
            }
          }
        }
      }

      // 发送每一次的scroll事件, 传递ev值
      self.scroll(ev)
    })

    // scroll end
    self._jsScrollInstance.on('scrollEnd', () => {
      // 当停止滚动一段时间后触发scrollEnd事件
      self.isScrolling = false

      // reset velocity, do not reset the directions or deltas
      ev.velocityY = ev.velocityX = 0

      // 发送scrollEnd事件, 传递ev值
      self.scrollEnd(ev)
    })
  }

  /**
   * 获取scrollHeight
   * @private
   * */
  getHeight () {
    if (this._js) {
      return this._jsScrollInstance.scrollerHeight
    } else {
      return this._el && this._el.scrollHeight
    }
  }

  /**
   * 获取scrollHeight
   * @private
   * */
  getWidth () {
    if (this._js) {
      return this._jsScrollInstance.scrollerWidth
    } else {
      return this._el && this._el.scrollWidth
    }
  }

  /**
   * 获取滚动的上边距
   * return {Number}
   * @private
   */
  getTop () {
    if (this._js) {
      return this._jsScrollInstance.y * -1
    } else {
      return this._el && this._el.scrollTop
    }
  }

  /**
   * 获取滚动的左边距
   * return {Number}
   * @private
   */
  getLeft () {
    if (this._js) {
      return this._jsScrollInstance.x * -1
    } else {
      return this._el && this._el.scrollLeft
    }
  }

  /**
   * 设置滚动上部距离, 只在nativeScroll中用到
   * @param {number} top
   * @private
   */
  setTop (top) {
    this._el.scrollTop = top
  }

  /**
   * 设置滚动左边距离, 只在nativeScroll中用到
   * @param {number} left
   * @private
   */
  setLeft (left) {
    this._el.scrollLeft = left
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

    if (this._js) {
      this._jsScrollInstance.destroy()
      this._jsScrollInstance = null
    } else {
      this._endTmr && window.clearTimeout(this._endTmr)
      this._lsn && this._lsn()
      this._lsn = null
    }

    let ev = this.ev
    ev.contentElement = ev.fixedElement = ev.scrollElement = ev.headerElement = null
    this._el = this.ev = ev = null
    this.scrollStart && (this.scrollStart = null)
    this.scroll && (this.scrollStart = null)
    this.scrollEnd && (this.scrollStart = null)
  }

  // --------- public ---------
  /**
   * scrollTo
   * 滚动到, 绝对滚动
   * @param {number} [x=0] - 横轴位置
   * @param {number} [y=0] - 纵轴位置
   * @param {number} [duration=300] - 滚动时间
   * @param {Function} done
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
    if (!el) {
      // invalid element
      console.assert(el, 'The method of scrollTo() need scrollElement!')
      done()
      return promise
    }

    if (this._js) {
      this._jsScrollInstance.scrollTo(x, y * -1, duration)
      // iscroll do not has callback
      this._scrollToEndTimer && window.clearTimeout(this._scrollToEndTimer)
      this._scrollToEndTimer = window.setTimeout(() => {
        done()
        this._scrollToEndTimer = null
      }, duration)
    } else {
      // scroll animation loop w/ easing
      // credit https://gist.github.com/dezinezync/5487119
      if (duration < 32) {
        this.setTop(y)
        this.setLeft(x)
        done()
        return promise
      }

      const fromY = el.scrollTop
      const fromX = el.scrollLeft

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

        if (!this._el || stopScroll || attempts > maxAttempts) {
          this.isScrolling = false;
          (el.style)[transform] = ''
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
          // (el.style)[transform] = '';
          done()
        }
      }

      // 准备开始滚动循环
      this.isScrolling = true
      startTime = new Date().getTime()
      // 开始第一帧
      window.requestAnimationFrame(step)
    }

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
    let y = 0
    if (this._el) {
      if (this._js) {
        y = this.ev.scrollHeight - this._cel.clientHeight
      } else {
        y = this._el.scrollHeight - this._el.clientHeight
      }
    }
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
   * @param {number} [duration=300] - 滚动时间
   * @param {number|Boolean} [offsetX=0] - 元素位置距离屏幕顶部的距离
   * @param {number|Boolean} [offsetY=0] - 元素位置距离屏幕左侧的距离
   * @param {Function} [done]
   * @return {Promise}
   * */
  scrollToElement (el, duration = 300, offsetX = 0, offsetY = 0, done) {
    if (!el) {
      console.assert(el, 'The method scrollToElement() need element!')
      return false
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
        y -= ((this.ev.contentHeight - el.offsetHeight) / 2)
      }
    }

    return this.scrollTo(x, y, duration, done)
  }
}
