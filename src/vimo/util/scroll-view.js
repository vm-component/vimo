import { assert } from './util';
import { pointerCoord, nativeRaf, cancelRaf, registerListener } from './dom';

const SCROLL_END_DEBOUNCE_MS = 80;
const MIN_VELOCITY_START_DECELERATION = 4;
const MIN_VELOCITY_CONTINUE_DECELERATION = 0.12;
const DECELERATION_FRICTION = 0.97;
const FRAME_MS = (1000 / 60);
const EVENT_OPTS = {
  passive: true
};

export class ScrollView {

  constructor () {

    this.isScrolling = false;       // 判断正在滚动
    this.initialized = false;       // 判断是否已完成初始化
    this.scrollStart = (ev) => {};  // 滚动开始的回调, 传入ev参数, 一般用于事件操作
    this.scroll = (ev) => {};       // 滚动进行的回调, 传入ev参数, 一般用于事件操作
    this.scrollEnd = (ev) => {};    // 滚动结束的回调, 传入ev参数, 一般用于事件操作

    this.transform = !!VM && !!VM.platform && !!VM.platform.css ? VM.platform.css.transform : 'webkitTransform';

    this._el = null;        // {HTMLElement} 当前滚动实例的元素
    this._js = true;       // 是否执行js滚动
    this._t = 0;            // {number} scrollTop临时存储值
    this._l = 0;            // {number} scrollLeft临时存储值
    this._lsn = null;       // {Function} 监听函数 listen
    this._endTmr = null;    // {Function} 事件记录 timeout

    // 滚动对象
    this.ev = {
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
      footerElement: null, // HTMLElement
    };
  }

  /**
   * 滚动对象初始化, 判断_js是否标记, 否则使用原生滚动
   * (这里应该判断是否是UIWebView, 并设置_js值)
   * @param {HTMLElement} ele
   * @param {number} contentTop
   * @param {number} contentBottom
   * */
  init (ele, contentTop, contentBottom) {
    if (!this.initialized) {
      this.initialized = true;

      assert(ele, 'scroll-view, element can not be null');
      this._el = ele;

      if (this._js) {
        this.enableJsScroll(contentTop, contentBottom);
      } else {
        this.enableNativeScrolling();
      }
    }
  }

  /**
   * @private
   * 初始化原生滚动, 这里: 滚动时能监听滚动的状态
   * */
  enableNativeScrolling () {
    this._js = false;
    if (!this._el) {
      return;
    }

    console.debug(`ScrollView, enableNativeScrolling`);

    const self = this;
    const ev = self.ev;
    const positions = []; //: number[]

    /**
     * @param {UIEvent} scrollEvent
     * */
    function scrollCallback (scrollEvent) {
      ev.timeStamp = scrollEvent.timeStamp;

      // 获取当前的 scrollTop
      ev.scrollTop = self.getTop();

      // 获取当前的 scrollLeft
      ev.scrollLeft = self.getLeft();

      if (!self.isScrolling) {
        // scroll start
        self.isScrolling = true;

        // 记录开始的位置
        ev.startY = ev.scrollTop;
        ev.startX = ev.scrollLeft;

        // 开始前重置参数
        ev.velocityY = ev.velocityX = 0;
        ev.deltaY = ev.deltaX = 0;
        positions.length = 0;

        // 发送scrollStart事件, 传递ev值
        self.scrollStart(ev);
      }

      // actively scrolling
      positions.push(ev.scrollTop, ev.scrollLeft, ev.timeStamp);

      if (positions.length > 3) {
        // we've gotten at least 2 scroll events so far
        ev.deltaY = (ev.scrollTop - ev.startY);
        ev.deltaX = (ev.scrollLeft - ev.startX);

        var endPos = (positions.length - 1);
        var startPos = endPos;
        var timeRange = (ev.timeStamp - 100);

        // move pointer to position measured 100ms ago
        for (var i = endPos; i > 0 && positions[i] > timeRange; i -= 3) {
          startPos = i;
        }

        if (startPos !== endPos) {
          // compute relative movement between these two points
          var timeOffset = (positions[endPos] - positions[startPos]);
          var movedTop = (positions[startPos - 2] - positions[endPos - 2]);
          var movedLeft = (positions[startPos - 1] - positions[endPos - 1]);

          // based on XXms compute the movement to apply for each render step
          ev.velocityY = ((movedTop / timeOffset) * FRAME_MS);
          ev.velocityX = ((movedLeft / timeOffset) * FRAME_MS);

          // figure out which direction we're scrolling
          ev.directionY = (movedTop > 0 ? 'up' : 'down');
          ev.directionX = (movedLeft > 0 ? 'left' : 'right');
        }
      }

      function scrollEnd () {
        // 当停止滚动一段时间后触发scrollEnd事件
        self.isScrolling = false;

        // reset velocity, do not reset the directions or deltas
        ev.velocityY = ev.velocityX = 0;

        // 发送scrollEnd事件, 传递ev值
        self.scrollEnd(ev);

        self._endTmr = null;
      }

      // 发送每一次的scroll事件, 传递ev值
      self.scroll(ev);

      // 定时超时时间SCROLL_END_DEBOUNCE_MS, 如果超时则判断当前滚动结束, 发送scrollEnd事件
      window.clearTimeout(self._endTmr)
      self._endTmr = window.setTimeout(scrollEnd, SCROLL_END_DEBOUNCE_MS)
    }

    // 如果有则清楚之前绑定的事件
    self._lsn && self._lsn();

    // assign the raw scroll listener
    // note that it does not have a wrapping requestAnimationFrame on purpose
    // a scroll event callback will always be right before the raf callback
    // so there's little to no value of using raf here since it'll all ways immediately
    // call the raf if it was set within the scroll event, so this will save us some time
    self._lsn = registerListener(self._el, 'scroll', scrollCallback, EVENT_OPTS);

  }

  /**
   * @private
   * JS Scrolling has been provided only as a temporary solution
   * until iOS apps can take advantage of scroll events at all times.
   * The goal is to eventually remove JS scrolling entirely. When we
   * no longer have to worry about iOS not firing scroll events during
   * inertia then this can be burned to the ground. iOS's more modern
   * WKWebView does not have this issue, only UIWebView does.
   * @param {number} contentTop
   * @param {number} contentBottom
   */
  enableJsScroll (contentTop, contentBottom) {
    const self = this;
    self._js = true;
    const ele = self._el;

    if (!ele) {
      return;
    }

    console.debug(`ScrollView, enableJsScroll`);

    const ev = self.ev; // 获取ev的引用
    const positions = []; // 每次滚动的位置记录
    let rafCancel; // 临时的requestAnimationFrame结果
    let max; //: number

    function setMax () {
      if (!max) {
        // ******** DOM READ ****************
        max = ele.scrollHeight - ele.parentElement.offsetHeight + contentTop + contentBottom;
      }
    };

    /**
     * @param {number} timeStamp
     * */
    function jsScrollDecelerate (timeStamp) {
      ev.timeStamp = timeStamp;

      console.debug(`scroll-view, decelerate, velocity: ${ev.velocityY}`);

      if (ev.velocityY) {
        ev.velocityY *= DECELERATION_FRICTION;

        // update top with updated velocity
        // clamp top within scroll limits
        setMax();
        self._t = Math.min(Math.max(self._t + ev.velocityY, 0), max);

        ev.scrollTop = self._t;

        // 发送每一次的scroll事件, 传递ev值
        self.scroll(ev);

        self.setTop(self._t);

        if (self._t > 0 && self._t < max && Math.abs(ev.velocityY) > MIN_VELOCITY_CONTINUE_DECELERATION) {
          rafCancel = nativeRaf((rafTimeStamp) => {
            jsScrollDecelerate(rafTimeStamp);
          })

        } else {
          // 当停止滚动一段时间后触发scrollEnd事件
          self.isScrolling = false;

          // reset velocity, do not reset the directions or deltas
          ev.velocityY = ev.velocityX = 0;

          // 发送scrollEnd事件, 传递ev值
          self.scrollEnd(ev);
        }
      }
    }

    /**
     * @param {TouchEvent} touchEvent
     * */
    function jsScrollTouchStart (touchEvent) {
      positions.length = 0;
      max = null;
      cancelRaf(rafCancel);
      positions.push(pointerCoord(touchEvent).y, touchEvent.timeStamp);
    }

    /**
     * @param {TouchEvent} touchEvent
     * */
    function jsScrollTouchMove (touchEvent) {
      if (!positions.length) {
        return;
      }

      ev.timeStamp = touchEvent.timeStamp;

      var y = pointerCoord(touchEvent).y;

      // ******** DOM READ ****************
      setMax();
      self._t -= (y - positions[positions.length - 2]);
      self._t = Math.min(Math.max(self._t, 0), max);

      positions.push(y, ev.timeStamp);

      if (!self.isScrolling) {
        // remember the start position
        ev.startY = self._t;

        // new scroll, so do some resets
        ev.velocityY = ev.deltaY = 0;

        self.isScrolling = true;

        // 发送scrollStart事件, 传递ev值
        self.scrollStart(ev);
      }

      // 算是立即停止吧
      self.setTop(self._t);
    }

    /**
     * @param {TouchEvent} touchEvent
     * */
    function jsScrollTouchEnd (touchEvent) {
      // figure out what the scroll position was about 100ms ago
      cancelRaf(rafCancel);
      if (!positions.length && self.isScrolling) {
        self.isScrolling = false;
        ev.velocityY = ev.velocityX = 0;

        // 发送scrollEnd事件, 传递ev值
        self.scrollEnd(ev);
        return;
      }

      var y = pointerCoord(touchEvent).y;

      positions.push(y, touchEvent.timeStamp);

      var endPos = (positions.length - 1);
      var startPos = endPos;
      var timeRange = (touchEvent.timeStamp - 100);

      // move pointer to position measured 100ms ago
      for (var i = endPos; i > 0 && positions[i] > timeRange; i -= 2) {
        startPos = i;
      }

      if (startPos !== endPos) {
        // compute relative movement between these two points
        var timeOffset = (positions[endPos] - positions[startPos]);
        var movedTop = (positions[startPos - 1] - positions[endPos - 1]);

        // based on XXms compute the movement to apply for each render step
        ev.velocityY = ((movedTop / timeOffset) * FRAME_MS);

        // verify that we have enough velocity to start deceleration
        if (Math.abs(ev.velocityY) > MIN_VELOCITY_START_DECELERATION) {

          setMax();

          rafCancel = nativeRaf((rafTimeStamp) => {
            jsScrollDecelerate(rafTimeStamp);
          });

        }

      } else {
        self.isScrolling = false;
        ev.velocityY = 0;
        // 发送scrollEnd事件, 传递ev值
        self.scrollEnd(ev);
      }

      positions.length = 0;
    }

    const unRegStart = registerListener(ele, 'touchstart', jsScrollTouchStart, EVENT_OPTS);
    const unRegMove = registerListener(ele, 'touchmove', jsScrollTouchMove, EVENT_OPTS);
    const unRegEnd = registerListener(ele, 'touchend', jsScrollTouchEnd, EVENT_OPTS);

    // 给父元素增加class
    ele.parentElement.classList.add('js-scroll');

    // stop listening for actual scroll events
    self._lsn && self._lsn();

    // create an unregister for all of these events
    self._lsn = () => {
      unRegStart();
      unRegMove();
      unRegEnd();
      ele.parentElement.classList.remove('js-scroll');
    };
  }

  /**
   * DOM READ
   */
  getTop () {
    if (this._js) {
      return this._t;
    }
    return this._t = this._el.scrollTop;
  }

  /**
   * DOM READ
   */
  getLeft () {
    if (this._js) {
      return 0;
    }
    return this._l = this._el.scrollLeft;
  }

  /**
   * DOM WRITE
   * @param {number} top
   */
  setTop (top) {
    this._t = top;

    if (this._js) {
      (this._el.style)[this.transform] = `translate3d(${this._l * -1}px,${top * -1}px,0px)`;

    } else {
      this._el.scrollTop = top;
    }
  }

  /**
   * DOM WRITE
   * @param {number} top
   */
  setLeft (left) {
    this._l = left;
    if (this._js) {
      (this._el.style)[this.transform] = `translate3d(${left * -1}px,${this._t * -1}px,0px)`;
    } else {
      this._el.scrollLeft = left;
    }
  }

  /**
   * DOM WRITE
   * @param {number} x
   * @param {number} y
   * @param {number} duration
   * @param {Function=} done
   * @return {Promise}
   */
  scrollTo (x = 0, y = 0, duration, done) {
    // scroll animation loop w/ easing
    // credit https://gist.github.com/dezinezync/5487119

    let promise;
    if (done === undefined) {
      // only create a promise if a done callback wasn't provided
      // done can be a null, which avoids any functions
      promise = new Promise(resolve => {
        done = resolve;
      });
    }

    const self = this;
    const el = self._el;
    if (!el) {
      // invalid element
      done();
      return promise;
    }

    if (duration < 32) {
      self.setTop(y);
      self.setLeft(x);
      done();
      return promise;
    }

    const fromY = el.scrollTop;
    const fromX = el.scrollLeft;

    const maxAttempts = (duration / 16) + 100;
    const transform = self.transform;

    let startTime; //number;
    let timeStamp;
    let attempts = 0;
    let stopScroll = false;

    // scroll loop
    function step () {
      attempts++;

      if (!self._el || stopScroll || attempts > maxAttempts) {
        self.isScrolling = false;
        (el.style)[transform] = '';
        done();
        return;
      }

      timeStamp = new Date().getTime();

      let time = Math.min(1, ((timeStamp - startTime) / duration));

      // where .5 would be 50% of time on a linear scale easedT gives a
      // fraction based on the easing method
      let easedT = (--time) * time * time + 1;

      if (fromY !== y) {
        self.setTop((easedT * (y - fromY)) + fromY);
      }

      if (fromX !== x) {
        self.setLeft(Math.floor((easedT * (x - fromX)) + fromX));
      }

      if (easedT < 1) {
        // do not use DomController here
        // must use nativeRaf in order to fire in the next frame
        nativeRaf(step)

      } else {
        stopScroll = true;
        self.isScrolling = false;
        (el.style)[transform] = '';
        done();
      }
    }

    // 准备开始滚动循环
    self.isScrolling = true;
    startTime = new Date().getTime();
    // 开始第一帧
    nativeRaf(step);

    return promise;
  }

  /**
   * @param {number} duration
   * @return {Promise}
   */
  scrollToTop (duration) {
    return this.scrollTo(0, 0, duration);
  }

  /**
   * @param {number} duration
   * @return {Promise}
   */
  scrollToBottom (duration) {
    let y = 0;
    if (this._el) {
      y = this._el.scrollHeight - this._el.clientHeight;
    }
    return this.scrollTo(0, y, duration);
  }

  stop () {
    this.isScrolling = false;
  }

  /**
   * @private
   */
  destroy () {
    this.stop();
    this._endTmr && window.clearTimeout(self._endTmr);
    this._lsn && this._lsn();

    this.scrollStart && (this.scrollStart = null);
    this.scroll && (this.scrollStart = null);
    this.scrollEnd && (this.scrollStart = null);

    let ev = this.ev;
    ev.contentElement = ev.fixedElement = ev.scrollElement = ev.headerElement = null;
    this._lsn = this._el = this.ev = ev = null;
  }

}
