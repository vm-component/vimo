/**
 * Created by Hsiang on 2017/1/13.
 */
import app from './src/app.vue'
const DEFAULT = 0; // AppPortal.DEFAULT
const MODAL = 1; // AppPortal.MODAL
const ACTIVE_SCROLLING_TIME = 100;
const CLICK_BLOCK_BUFFER_IN_MILLIS = 64;
const CLICK_BLOCK_DURATION_IN_MILLIS = 700;

module.exports = {
  install: function (Vue, options) {
    /**
     * 全局事件总线（各个组件共用）
     * */
    let _eventBus = new Vue();

    // 全局注册组件
    Vue.component(app.name, app);
    console.log('appInstance');

    // 全局事件总线（各个组件共用）
    Vue.prototype.$eventBus = _eventBus;
    // 设置title
    Vue.prototype.$setTitle = _setTitle;
    // 获取title
    Vue.prototype.$getTitle = _getTitle;
    // 设置页面是否能点击
    Vue.prototype.$setEnabled = _setEnabled;
    // 设置页面滚动状态
    Vue.prototype.$disableScroll = _disableScroll;
    // 后退操作
    Vue.prototype.$goBack = _goBack;
    // 返回主视图(返回主页)
    Vue.prototype.$goRoot = _goRoot;

    /**
     * 记录弹出层的挂载位置，默认挂在到_overlayPortal，位置为ion-app组件中
     * Modals need their own overlay becuase we don't want an ActionSheet
     * or Alert to trigger lifecycle events inside a modal
     * 内部组件将使用该数据决定该组件实际挂在位置，如果下面的值为空，将挂在到document下。
     * */
    Vue.prototype.$portal = {
      $modal: null,
      $overlay: null,
      $loading: null,
      $toast: null,
    };

    // -------- functions --------

    /**
     * Sets the document title.
     * 这里会对微信/钉钉/支付宝内部的title设置做兼容性处理
     * @param {String} val - 设置的document.title值
     * @param {Boolean} sendEventToTitle - 设置了title是否通知ion-title组件更新显示
     * */
    function _setTitle (val, sendEventToTitle = false) {
      let iframe;
      if (!!val) {
        // 利用iframe的onload事件刷新页面
        document.title = val;
        iframe = document.createElement('iframe');
        iframe.src = ' '; // iframe.src = '/static/favicon.ico';
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
          Vue.nextTick(function () {
            document.body.removeChild(iframe);
          });
        };
        document.body.appendChild(iframe);

        // 修改ion-header的title
        if (sendEventToTitle) {
          this.$eventBus.$emit('$changeTitle', val)
        }
      }
    }

    /**
     * 获取title，以document.title为准
     * @return {String}
     * */
    function _getTitle () {
      return document.title
    }

    /**
     * 设置当前页面是否能点击滑动
     * 一般适用在像ActionSheet/Alert/Modal等弹出会出现transition动画
     * 当transition动画进行中，页面是锁定的不能点击，因此使用该函数设定此状态
     * @param {boolean} isEnabled `true` for enabled, `false` for disabled
     * @param {number} duration isEnabled=false的过期时间 当 `isEnabled` 设置为`false`,
     * 则duration之后，`isEnabled`将自动设为`true`
     * */
    function _setEnabled (isEnabled, duration = CLICK_BLOCK_DURATION_IN_MILLIS) {
      if (isEnabled) {
        // disable the click block if it's enabled, or the duration is tiny
        _clickBlock(false, CLICK_BLOCK_BUFFER_IN_MILLIS);
      } else {
        // show the click block for duration + some number
        _clickBlock(true, duration + CLICK_BLOCK_BUFFER_IN_MILLIS);
      }
    }

    /**
     * 定义clickBlock处理函数
     * @param {Boolean} shouldShow - 是否显示
     * @param {Number} expire - shouldShow=false设置的过期时间
     * @return {Object} 返回包含activate的对象方法
     * */
    function _clickBlock (shouldShow, expire = 100) {
      let _tmr;
      let _showing = false;

      // 闭包
      function activate () {
        window.clearTimeout(_tmr);
        if (shouldShow) {
          _activate(true);
        }
        _tmr = setTimeout(_activate.bind(this, false), expire);
      }

      function _activate (shouldShow) {
        if (_showing !== shouldShow) {
          _eventBus.$eventBus.$emit('$changeClickBlockActiveState', shouldShow);
          _showing = shouldShow;
        }
      }

      return activate()
    }

    /**
     * 是否点击滚动
     * @param {Boolean} isScrollDisable - 是否禁止滚动点击 true:禁止滚动/false:可以滚动
     * */
    function _disableScroll (isScrollDisable) {
      _eventBus.$emit('$changeScrollDisableState',isScrollDisable)
    }

    /**
     *
     * */
    function  _goBack() {

    }

    function _goRoot () {

    }

  }
}












