/**
 * Created by Hsiang on 2017/3/22.
 */
import { ready } from '../package/util/dom';
export default {
  ios:{
    settings: {}
  },
  android:{
    settings: {}
  },
  wechat:{
    settings: {
      hideNavBar: true,
      hideNavBar2: true,
      hideNavBar3: true,
    },
    initialize(p){
      // 在ready之前进行处理
      p.prepareReady = function () {
        let _userAgent = window.navigator.userAgent.toString().trim();
        let val;
        //alert('Wechat Init: from platform-registry.js')
        /**
         * 执行默认的domReady, 如果有定制化的初始化任务,
         * 手动执行p.triggerReady
         *
         * @example
         *
         *  ready(function () {
         *      p.triggerReady('Wechat Init Success!');
         *  });
         * */

        /**
         * 微信的userAgent中包含了网络类型和当前语言
         * */
        p.setUserAgent(_userAgent);

        // 获取网络类型
        // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
        val = _userAgent.match(/NetType\/(\w+) /i);
        if (!!val && val.length > 0 && !!val[1]) {
          p.setNetType(val[1].toString().toLowerCase());
        }

        // 获取语言类型
        // Language/zh-CN
        val = _userAgent.match(/Language\/(.+)/i);
        if (!!val && val.length > 0 && !!val[1]) {
          p.setLang(val[1].toString().toLowerCase(), true);
        }

        // 触发外层的ready
        ready(function () {
          // 触发
          p.triggerReady('Wechat Init Success!');
        })
      }
    },
  },
  alipay:{
    settings: {
      hideNavBar: true,
    },
    initialize(p){
      //alert('Alipay Init: from platform-registry.js');
      let _userAgent = window.navigator.userAgent.toString().trim();
      let val;

      /**
       * 支付宝的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      p.setUserAgent(_userAgent);

      // 获取网络类型
      val = _userAgent.match(/AlipayDefined\(nt:(\w+),/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setNetType(val[1].toString().toLowerCase());
      }

      // 获取语言类型
      // Language/zh-CN
      val = _userAgent.match(/Language\/(.+)/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setLang(val[1].toString().toLowerCase(), true);
      }

      // 触发外层的ready
      ready(function () {
        p.triggerReady('alipay Init Success!');
      })
    },
  },
  dingtalk:{
    initialize(p){
      //alert('Dingtalk Init: from platform-registry.js');
      let _userAgent = window.navigator.userAgent.toString().trim();
      let val;

      /**
       * 钉钉的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      p.setUserAgent(_userAgent);

      // 获取网络类型
      // dingtalk未给出

      // 获取语言类型
      // Language/zh-CN
      val = _userAgent.match(/language\/(.+)/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setLang(val[1].toString().toLowerCase(), true);
      }

      // 触发外层的ready
      ready(() => {
        p.triggerReady('dingtalk Init Success!');
      })
    },
    settings: {
      hideNavBar: true,
    },
  },
  qq:{
    initialize(p){
      //alert('QQ Init: from platform-registry.js');
      let _userAgent = window.navigator.userAgent.toString().trim();
      let val;

      p.setUserAgent(_userAgent);

      // 获取网络类型
      // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
      val = _userAgent.match(/NetType\/(\w+)/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setNetType(val[1].toString().toLowerCase());
      }

      // DOMReady后触发外层的ready
      ready(() => {
        p.triggerReady('qq Init Success!');
      })

    },
    settings: {
      hideNavBar: true,
    },
  },
  dtdream:{
    initialize(p){
      //alert('QQ Init: from platform-registry.js');
      let _userAgent = window.navigator.userAgent.toString().trim();
      let val;

      p.setUserAgent(_userAgent);

      // 获取网络类型
      // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
      val = _userAgent.match(/NetType\/(\w+)/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setNetType(val[1].toString().toLowerCase());
      }

      // DOMReady后触发外层的ready
      ready(() => {
        p.triggerReady('qq Init Success!');
      })

    },
    settings: {
      hideNavBar: true,
    },
  },
}