/**
 * @class History
 * @classdesc 通过vue-router的onRouteChangeBefore事件构建本地历史记录
 *
 * ## 问题
 *
 * 单页应用的一个需求是需要知道路由切换是前进还是后退, 但是浏览器对路由切换只给了两个事件 `hashchange` 和 `popstate`, 故无从判断当前操作是后退还是前进.
 *
 * ## 解决方案
 *
 * 这个类通过vue-router的onRouteChangeBefore事件构建本地历史记录. 当路由切换时, 内建历史记录数组, 类似于一个stack, 这个能正确反映当前app的浏览历史记录.
 *
 * 完成的功能如下:
 *
 * - 内建导航记录
 * - 此History是对router实例的拓展, 但是不会为router实例添加方法, 而是从新定义$history, 这个可在业务的this中访问到
 */

export class History {
  constructor (router) {
    this._h = []                  // 存储当前导航的历史记录, 内容为 route object（路由信息对象）
    this._d = 'forward'           // forward/backward
    this._r = router              // vur-router实例
    this.length = 0

    // 监听路由变化, 维护本地历史记录
    // 路由切换前
    if (this._r) {
      this._r.beforeEach((to, from, next) => {
        let stackLength = this._h.length
        if (stackLength <= 1) {
          /**
           * 当本地维护的历时记录为空或, 意味着页面为首次进入, 并未初始化,
           * 此时, 可能我们是从app中的某个页面进入的,
           * 因此, 需要判断下history.length, 此时, 不显示back按钮
           *
           * 同理, length=1也同样处理
           * */
          this._pushHistory({to, from, next})
        } else {
          let _previous = this._h[stackLength - 2]
          if (to.name !== _previous.name) {
            this._pushHistory({to, from, next})
          } else {
            this._popHistory({to, from, next})
          }
        }
      })
    }
  }

  // -------- private --------
  /**
   * push to history
   * @private
   * */
  _pushHistory ({to, from, next}) {
    if (this._isPageChange({to, from})) {
      this._d = 'forward'
      this._h.push(to)
      next()
    } else {
      this._d = ''
      next()
    }
    // noinspection JSAnnotator
    this.length++
  }

  /**
   * pop history record
   * @private
   * */
  _popHistory ({to, from, next}) {
    // 激活了浏览器的后退,这里只需要更新状态
    if (this._isPageChange({to, from})) {
      this._d = 'backward'
      this._h.pop()
      next()
    } else {
      this._d = ''
      next()
    }
    // noinspection JSAnnotator
    this.length--
  }

  /**
   * 判断是否是主页面的切换
   * 默认主页面为第一级:
   * /#/page1
   * /#/page2
   *
   * 二级页面
   * /#/page1/tab1
   * /#/page1/modal1
   * @private
   * */
  _isPageChange ({to, from}) {
    let _isFromPage = from.matched.length === 1
    let _isToPage = to.matched.length === 1
    return (_isFromPage || _isToPage)
  }

  // -------- public --------

  /**
   * 获取当前的页面进行的方向
   * */
  getDirection () {
    return this._d
  }

  /**
   * 判断是否能返回
   * @return {Boolean}
   * */
  canGoBack () {
    return this._h.length > 1
  }

  /**
   * 获取历史记录的第一个
   * @return {location}
   * */
  first () {
    return this._h[0]
  }

  /**
   * 获取当前激活的页面
   * 获取最后一个历史记录
   * @return {location}
   * */
  getActive () {
    return this._h[this._h.length - 1]
  }

  /**
   * 获取上一个历史记录
   * @return {location}
   * */
  getPrevious () {
    return this._h[this._h.length - 2]
  }

  /**
   * 获取当前的导航记录
   * @return {Array}
   * */
  getHistory () {
    return this._h
  }

  /**
   * 返回传入的route是历史记录中的第几条
   * @return {Number}
   * */
  indexOf (route) {
    return this._h.indexOf(route)
  }

  /**
   * 返回root页面(进入的第一个页面)
   * */
  toRoot () {
    let firstRoute = this.first()
    if (firstRoute) {
      this._r.push({
        path: firstRoute.path
      })
    } else {
      this._r.push({
        path: '/'
      })
    }
  }
}

export function setupHistory (router) {
  if (window['VM'] && window['VM']['history']) {
    return window['VM']['history']
  } else {
    // 全局注册
    const history = new History(router)
    window['VM'] = window['VM'] || {}
    window['VM']['history'] = history
    window['VM']['router'] = router
    return history
  }
}
