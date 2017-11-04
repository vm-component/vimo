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
 * - 此History是对router实例的拓展, 但是不会为router实例添加方法, 而是重新定义$history, 这个可在业务的this中访问到
 */

export class History {
  constructor (router, config, platform) {
    this._history = [] // 存储当前导航的历史记录, 内容为 route object（路由信息对象）
    this._direction = 'forward' // forward/backward
    this._router = router // vue-router实例
    this._config = config // config 实例
    this._platform = platform // platform 实例
    this.isReplace = false // 路由跳转是否是使用replace方法
    this.usePushWindow = this._config.getBoolean('usePushWindow', false) // 支付宝 和 钉钉 两个模式下路由跳转是否开启新页面

    // 监听路由变化, 维护本地历史记录
    // 路由切换前
    if (this._router) {
      const _this = this

      /**
       * 方法增强: replace()
       * */
      let replaceCopy = this._router.replace
      replaceCopy = replaceCopy.bind(this._router)
      this._router.replace = function () {
        let args = Array.from(arguments)
        let to = _this._router.resolve(args[0]).resolved
        let from = _this._history[_this.length - 1]
        if (to.fullPath !== from.fullPath || to.name !== from.name) {
          // replace时, 前后地址不一样的话才处理
          _this.isReplace = true
          replaceCopy.apply(null, arguments)
        }
      }

      if (this.usePushWindow) {
        /**
         * 方法增强: back()
         * */
        let backCopy = this._router.back
        backCopy = backCopy.bind(this._router)
        this._router.back = function () {
          let isHandled =
            _this._platform.popWindow && _this._platform.popWindow()
          if (!isHandled) {
            backCopy.apply(null, arguments)
          }
        }

        /**
         * 方法增强: go()
         * */
        let goCopy = this._router.go
        goCopy = goCopy.bind(this._router)
        this._router.go = function (n) {
          let isHandled = _this._platform.popTo && _this._platform.popTo(n)
          if (!isHandled) {
            goCopy.apply(null, arguments)
          }
        }
      }

      this._router.beforeEach((to, from, next) => {
        // 如果使用了replace, 则跳过当前拦截的路由信息, 并且将最后一个重置
        if (this.isReplace) {
          this.isReplace = false
          this._history.pop()
          this._history.push(to)
          next()
        } else if (this.length <= 1) {
          /**
           * 当本地维护的历时记录为空或, 意味着页面为首次进入, 并未初始化,
           * 此时, 可能我们是从app中的某个页面进入的,
           * 因此, 需要判断下history.length, 此时, 不显示back按钮
           *
           * 同理, length=1也同样处理
           * */
          this._pushHistory({ to, from, next })
        } else {
          // 向记录后方追溯, 如果有匹配可认为是go(-n)操作, 否则就是push操作
          for (let i = this.length - 2; i > -1; i--) {
            let _previous = this._history[i]
            if (to.name === _previous.name) {
              this._popHistory(next, i)
              return
            }
          }

          // 如果不在过去的历史记录, 则认为是新增加记录
          this._pushHistory({ to, from, next })
        }
      })
    }
  }

  get length () {
    return this._history.length
  }

  // -------- private --------
  /**
   * push to history
   * @private
   * */
  _pushHistory ({ to, from, next }) {
    if (to.fullPath === from.fullPath && to.name === from.name) {
      // 同地址同名称跳转不记录不处理
      return
    }

    let isHandled = false
    if (
      this.usePushWindow &&
      from.matched.length !== 0 &&
      to.matched.length !== 0
    ) {
      let url = ''
      let mode = this._router.mode
      if (mode === 'hash') {
        url = `${window.location.origin}${window.location.pathname}${window
          .location.search}#${to.fullPath}`
      } else {
        console.error('history.js::只支持 mode: "hash"')
      }
      isHandled = this._platform.pushWindow && this._platform.pushWindow(url)
    }

    if (!isHandled) {
      // fallback
      this._direction = 'forward'
      this._history.push(to)
      next()
    }
  }

  /**
   * pop history record
   * @private
   * */
  _popHistory (next, i = 0) {
    // 激活了浏览器的后退,这里只需要更新状态
    this._direction = 'backward'
    this._history = this._history.splice(0, i + 1)
    next()
  }

  /**
   * 获取当前的页面进行的方向
   * 只能是这两个值: forward || backward
   * @return {string}
   * */
  getDirection () {
    return this._direction
  }

  /**
   * 判断是否能返回
   * @return {Boolean}
   * */
  canGoBack () {
    return this.length > 1
  }

  /**
   * 获取当前的导航记录
   * @return {Array}
   * */
  getHistory () {
    return this._history
  }

  /**
   * 返回root页面(在路由信息中标示```route.meta.root=true```的页面)
   * @example
   * {
   *    path: '/',
   *    name: 'index',
   *    meta: {
   *      root: true
   *    },
   *    component: require('@/pages/index.vue')
   * }
   * */
  toRoot () {
    // 支付宝方式返回首页
    let isHandled = this._platform.popToRoot && this._platform.popToRoot()
    if (!isHandled) {
      if (this._router.options.routes) {
        let routes = this._router.options.routes
        for (let i = 0, len = routes.length; len > i; i++) {
          let route = routes[i]
          if (route && route.meta && route.meta.root) {
            console.log(route)
            this._direction = 'backward'
            this._router.replace(route)
            this._history = []
            return
          }
        }
      }

      if (!isHandled) {
        this._router.go(1 - this.length)
      }
    }
  }
}

export function setupHistory (router, config, platform) {
  return new History(router, config, platform)
}
