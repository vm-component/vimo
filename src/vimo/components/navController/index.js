/**
 * Created by Hsiang on 2017/2/28.
 *
 * 初始化导航
 * Nav 内建历史记录数组, 类似于一个stack, 这个能正确反映当前app的浏览历史记录
 *
 * router路由在页面切换的时候会发出两个事件:
 *
 * onRouteChangeBefore(router.beforeEach): 路由器切换之前
 * onRouteChangeAfter(router.afterEach): 路由切换之后, 页面进入渲染阶段
 *
 * 需要根据上面的onRouteChangeBefore事件, 判断Nav级别(而不是页面的生命周期)的切换事件:
 *
 * onNavEnter: 导航前进
 * onNavLeave: 导航后退
 *
 * 完成的功能如下:
 *
 * 1. 内建导航记录,挂载方法
 * 2. 根据routeChange发出navChange相关事件
 * 3. $nav为标示当前导航状态及全局事件触发, 并不操作导航, 导航操作(go/back..)由$router进行
 *
 */

// 存储当前导航的历史记录, 内容为 route object（路由信息对象）
const NAVIGATION_STACK = [];

export class NavContorller {

  constructor (Vue) {
    const _this = this;

    // 监听路由变化, 维护本地历史记录
    Vue.prototype.$eventBus.$on('onRouteChangeBefore', function ({to, from}) {
      let stackLength = NAVIGATION_STACK.length;
      if (stackLength <= 1) {
        /**
         * 当本地维护的历时记录为空或, 意味着页面为首次进入, 并未初始化,
         * 此时, 可能我们是从app中的某个页面进入的,
         * 因此, 需要判断下history.length, 此时, 不显示back按钮
         *
         * 同理, length=1也同样处理
         * */
        _this._pushHistory(Vue, {to, from});
      } else {
        let _previous = NAVIGATION_STACK[stackLength - 2];
        if (to.name != _previous.name) {
          _this._pushHistory(Vue, {to, from});
        } else {
          _this._popHistory(Vue, {to, from});
        }
      }

      /**
       * sdfasdfasdf
       * */
      let a = [];
      NAVIGATION_STACK.forEach(function (item) {
        a.push(item.name)
      });
      console.debug(a);

    });

  }

  // -------- private --------
  /**
   * push to history
   * */
  _pushHistory (Vue, {to, from}) {
    NAVIGATION_STACK.push(to);
    if (this._isPageChange({to, from})) {
      console.debug('**** onNavEnter ****')
      !!Vue.prototype.$eventBus && Vue.prototype.$eventBus.$emit('onNavEnter', {to, from});
    }
  }

  /**
   * pop history record
   * */
  _popHistory (Vue, {to, from}) {
    //激活了浏览器的后退,这里只需要更新状态
    NAVIGATION_STACK.pop();
    if (this._isPageChange({to, from})) {
      console.debug('**** onNavLeave ****')
      !!Vue.prototype.$eventBus && Vue.prototype.$eventBus.$emit('onNavLeave', {to, from});
    }
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
   * */
  _isPageChange ({to, from}) {
    let _isFromPage = from.matched.length === 1;
    let _isToPage = to.matched.length === 1;
    return _isFromPage || _isToPage
  }

  // -------- public --------
  /**
   * 判断是否能返回
   * */
  canGoBack () {
    return NAVIGATION_STACK.length > 1
  }

  /**
   * 获取历史记录的第一个
   * */
  first () {
    return NAVIGATION_STACK[0]
  }

  /**
   * 获取当前激活的页面
   * 获取最后一个历史记录
   * */
  getActive () {
    return NAVIGATION_STACK[NAVIGATION_STACK.length - 1]
  }

  /**
   * 获取上一个历史记录
   * */
  getPrevious () {
    return NAVIGATION_STACK[NAVIGATION_STACK.length - 2]
  }

  getViews () {
    return NAVIGATION_STACK
  }

  indexOf (route) {

  }
}


