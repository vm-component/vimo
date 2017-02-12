/**
 * Created by Hsiang on 2017/2/9.
 * @name Platform
 * @description
 *
 * The Platform service can be used to get information about your current device.
 * You can get all of the platforms associated with the device using the [platforms](#platforms)
 * method, including whether the app is being viewed from a tablet, if it's
 * on a mobile device or browser, and the exact platform (iOS, Android, etc).
 * You can also get the orientation of the device, if it uses right-to-left
 * language direction, and much much more. With this information you can completely
 * customize your app to fit any device.
 *
 * 这个类用于从设备中获取平台信息, 比如设备种类/运行平台/设备方向/文字方向等,
 * 以此使得代码适配所有机型
 *
 * @usage
 * ```ts
 * import { Platform } from 'ionic-angular';
 *
 * @Component({...})
 * export MyPage {
 *   constructor(platform: Platform) {
 *     this.platform = platform;
 *   }
 * }
 * ```
 * @demo /docs/v2/demos/src/platform/
 */

/**
 * @typedef {Object} PlatformConfig
 * {
 *    isEngine?: boolean;
 *    initialize?: Function;
 *    isMatch?: Function;
 *    superset?: string;
 *    subsets?: string[];
 *    settings?: any;
 *    versionParser?: any;
 * }
 *
 * @typedef {Object} PlatformVersion
 * {
 *    str?: string;
 *    num?: number;
 *    major?: number;
 *    minor?: number;
 * }
 *
 * @typedef {Object} BackButtonAction
 * {
 *    fn?: Function;
 *    priority?: number;
 * }
 */


// import { EventEmitter, NgZone, OpaqueToken } from '@angular/core';
import { QueryParams } from './query-params';
import { ready, windowDimensions, flushDimensionCache } from '../util/dom';
import { removeArrayItem } from '../util/util';
import { eventBus } from '../util/events'

export class Platform {
  _versions = {}; // {[name: string]: PlatformVersion}
  _dir; // string 文字方向 ;
  _lang; // string 文字;

  _qp; //QueryParams 初始化时的查询实例 {data:{}};

  _bPlt; //string 当前的浏览器平台,差不多是设备的类型 navigator.platform , 例如MacIntel;
  _ua; //string userAgent;

  _readyPromise; //Promise<any> Ready的promise;
  _readyResolve; //any;

  _resizeTm; //any setTimeout 定时过后执行_onResizes中的回调函数;
  _onResizes = []; //Array<Function> = [] resize时执行的回调列表;

  _bbActions = []; //BackButtonAction[] = [] 后退按钮上注册的回调列表;

  _default; //string 默认的平台模式 core/mobile/phablet/tablet/android/ios/ipad/iphone/windows/cordova等;
  _platforms = []; // : string[] = []; 当前平台的key 例如: "mobile/ios/mobileweb"
  _registry; //{[name:string] : PlatformConfig}; platform-registry中的config列表->登记处

  _pW = 0; // Portrait模式的设备Width
  _pH = 0; // Portrait模式的设备Height
  _lW = 0; // Landscape模式的设备Width
  _lH = 0; // Landscape模式的设备Height
  _isPortrait = null; //boolean = null 横屏还是竖屏 Portrait=竖屏;

  /** @private */

  constructor () {
    const _this = this;
    _this._readyPromise = new Promise(res => { _this._readyResolve = res; });

    // 监听后退事件
    // window.addEventListener("popstate", function(e) {
    //   console.debug('Event of popstate');
    //   _this.runBackButtonAction();
    // }, false);

    // this.backButton.subscribe(() => {
    //   // the hardware back button event has been fired
    //   console.debug('hardware back button');
    //
    //   // decide which backbutton action should run
    //   this.runBackButtonAction();
    // });
  }

  // Methods
  // **********************************************

  /**
   * @returns {boolean} returns true/false based on platform.
   * @description
   * Depending on the platform the user is on, `is(platformName)` will
   * return `true` or `false`. Note that the same app can return `true`
   * for more than one platform name. For example, an app running from
   * an iPad would return `true` for the platform names: `mobile`,
   * `ios`, `ipad`, and `tablet`. Additionally, if the app was running
   * from Cordova then `cordova` would be true, and if it was running
   * from a web browser on the iPad then `mobileweb` would be `true`.
   *
   * ```
   * import { Platform } from 'ionic-angular';
   *
   * @Component({...})
   * export MyPage {
   *   constructor(platform: Platform) {
   *     this.platform = platform;
   *
   *     if (this.platform.is('ios')) {
   *       // This will only print when on iOS
   *       console.log("I'm an iOS device!");
   *     }
   *   }
   * }
   * ```
   *
   * | Platform Name   | Description                        |
   * |-----------------|------------------------------------|
   * | android         | on a device running Android.       |
   * | cordova         | on a device running Cordova.       |
   * | core            | on a desktop device.               |
   * | ios             | on a device running iOS.           |
   * | ipad            | on an iPad device.                 |
   * | iphone          | on an iPhone device.               |
   * | mobile          | on a mobile device.                |
   * | mobileweb       | in a browser on a mobile device.   |
   * | phablet         | on a phablet device.               |
   * | tablet          | on a tablet device.                |
   * | windows         | on a device running Windows.       |
   *
   * @param {string} platformName
   * @return {boolean}
   */
  is (platformName) {
    return (this._platforms.indexOf(platformName) > -1);
  }

  /**
   * @returns {array} the array of platforms
   * @description
   * Depending on what device you are on, `platforms` can return multiple values.
   * Each possible value is a hierarchy of platforms. For example, on an iPhone,
   * it would return `mobile`, `ios`, and `iphone`.
   *
   * ```
   * import { Platform } from 'ionic-angular';
   *
   * @Component({...})
   * export MyPage {
   *   constructor(platform: Platform) {
   *     this.platform = platform;
   *
   *     // This will print an array of the current platforms
   *     console.log(this.platform.platforms());
   *   }
   * }
   * ```
   */
  platforms () {
    // get the array of active platforms, which also knows the hierarchy,
    // with the last one the most important
    return this._platforms;
  }

  /**
   * Returns an object containing version information about all of the platforms.
   *
   * ```
   * import { Platform } from 'ionic-angular';
   *
   * @Component({...})
   * export MyPage {
   *   constructor(platform: Platform) {
   *     this.platform = platform;
   *
   *     // This will print an object containing
   *     // all of the platforms and their versions
   *     console.log(platform.versions());
   *   }
   * }
   * ```
   *
   * @returns {object} An object containing all of the platforms and their versions. {[name: string]: PlatformVersion}
   */
  versions () {
    // get all the platforms that have a valid parsed version
    return this._versions;
  }

  /**
   * @private
   * @return {PlatformVersion}
   */
  version () {
    for (var platformName in this._versions) {
      if (this._versions[platformName]) {
        return this._versions[platformName];
      }
    }
    return {};
  }

  /**
   * Returns a promise when the platform is ready and native functionality
   * can be called. If the app is running from within a web browser, then
   * the promise will resolve when the DOM is ready. When the app is running
   * from an application engine such as Cordova, then the promise will
   * resolve when Cordova triggers the `deviceready` event.
   *
   * The resolved value is the `readySource`, which states which platform
   * ready was used. For example, when Cordova is ready, the resolved ready
   * source is `cordova`. The default ready source value will be `dom`. The
   * `readySource` is useful if different logic should run depending on the
   * platform the app is running from. For example, only Cordova can execute
   * the status bar plugin, so the web should not run status bar plugin logic.
   *
   * ```
   * import { Component } from '@angular/core';
   * import { Platform } from 'ionic-angular';
   *
   * @Component({...})
   * export MyApp {
   *   constructor(platform: Platform) {
   *     platform.ready().then((readySource) => {
   *       console.log('Platform ready from', readySource);
   *       // Platform now ready, execute any required native code
   *     });
   *   }
   * }
   * ```
   * @returns {promise}
   */
  ready () {
    return this._readyPromise;
  }

  /**
   * @private
   * This should be triggered by the engine when the platform is
   * ready. If there was no custom prepareReady method from the engine,
   * such as Cordova or Electron, then it uses the default DOM ready.
   * @param {string} readySource
   */
  triggerReady (readySource) {
    this._readyResolve(readySource);
  }

  /**
   * @private
   * This is the default prepareReady if it's not replaced by an engine,
   * such as Cordova or Electron. If there was no custom prepareReady
   * method from an engine then it uses the method below, which triggers
   * the platform ready on the DOM ready event, and the default resolved
   * value is `dom`.
   */
  prepareReady () {
    ready(() => {
      this.triggerReady('dom');
    });
  }

  /**
   * 设置文字显示方向的,是从左向右 ltr (大部分),还是从右向左 rtl (很少的语言)
   * Set the app's language direction, which will update the `dir` attribute
   * on the app's root `<html>` element. We recommend the app's `index.html`
   * file already has the correct `dir` attribute value set, such as
   * `<html dir="ltr">` or `<html dir="rtl">`. This method is useful if the
   * direction needs to be dynamically changed per user/session.
   * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
   * @param {string} dir  Examples: `rtl`, `ltr`
   * @param {boolean} updateDocument
   */
  setDir (dir, updateDocument) {
    this._dir = (dir || '').toLowerCase();
    if (updateDocument) {
      document.documentElement.setAttribute('dir', dir);
    }
  }

  /**
   * Returns app's language direction.
   * We recommend the app's `index.html` file already has the correct `dir`
   * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
   * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
   * @returns {string}
   */
  dir () {
    return this._dir;
  }

  /**
   * Returns if this app is using right-to-left language direction or not.
   * We recommend the app's `index.html` file already has the correct `dir`
   * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
   * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
   * @returns {boolean}
   */
  isRTL () {
    return (this._dir === 'rtl');
  }

  /**
   * Set the app's language and optionally the country code, which will update
   * the `lang` attribute on the app's root `<html>` element.
   * We recommend the app's `index.html` file already has the correct `lang`
   * attribute value set, such as `<html lang="en">`. This method is useful if
   * the language needs to be dynamically changed per user/session.
   * [W3C: Declaring language in HTML](http://www.w3.org/International/questions/qa-html-language-declarations)
   * @param {string} language  Examples: `en-US`, `en-GB`, `ar`, `de`, `zh`, `es-MX`
   * @param {boolean} updateDocument
   */
  setLang (language, updateDocument) {
    this._lang = language;
    if (updateDocument) {
      document.documentElement.setAttribute('lang', language);
    }
  }

  /**
   * Returns app's language and optional country code.
   * We recommend the app's `index.html` file already has the correct `lang`
   * attribute value set, such as `<html lang="en">`.
   * [W3C: Declaring language in HTML](http://www.w3.org/International/questions/qa-html-language-declarations)
   * @returns {string}
   */
  lang () {
    return this._lang;
  }

  // Methods meant to be overridden by the engine
  // **********************************************
  // Provided NOOP methods so they do not error when
  // called by engines (the browser)that do not provide them

  /**
   * @private
   */
  exitApp () {}

  // Events meant to be triggered by the engine
  // **********************************************

  /**
   * @private
   */
  // backButton: EventEmitter<Event> = new EventEmitter < Event > ();
  // backButton: EventEmitter<Event> = new EventEmitter < Event > ();

  /**
   * The pause event emits when the native platform puts the application
   * into the background, typically when the user switches to a different
   * application. This event would emit when a Cordova app is put into
   * the background, however, it would not fire on a standard web browser.
   */
  // pause: EventEmitter<Event> = new EventEmitter < Event > ();
  // pause () {
  //   eventBus.$emit('app:pause')
  // }

  /**
   * The resume event emits when the native platform pulls the application
   * out from the background. This event would emit when a Cordova app comes
   * out from the background, however, it would not fire on a standard web browser.
   */
  // resume: EventEmitter<Event> = new EventEmitter < Event > ();

  /**
   * The back button event is triggered when the user presses the native
   * platform's back button, also referred to as the "hardware" back button.
   * This event is only used within Cordova apps running on Android and
   * Windows platforms. This event is not fired on iOS since iOS doesn't come
   * with a hardware back button in the same sense an Android or Windows device
   * does.
   *
   * 点击设备物理的返回键的时候的处理,在后退的事件上注册额外的处理方法,比如关闭弹框
   *
   * Registering a hardware back button action and setting a priority allows
   * apps to control which action should be called when the hardware back
   * button is pressed. This method decides which of the registered back button
   * actions has the highest priority and should be called.
   *
   * @param {Function} callback Called when the back button is pressed, 点击后退的回调
   * if this registered action has the highest priority.
   * @param {number} priority Set the priority for this action. 只执行最高优先级的
   * Only the highest priority will execute. Defaults to `0`.
   * @returns {Function} A function that, when called, will unregister
   * the its back button action.
   */
  registerBackButtonAction (fn, priority = 0) {
    const action = {fn, priority};

    this._bbActions.push(action);

    // return a function to unregister this back button action
    return () => {
      removeArrayItem(this._bbActions, action);
    };
  }

  /**
   * @private
   */
  runBackButtonAction () {
    // decide which one back button action should run
    let winner = null; // BackButtonAction
    this._bbActions.forEach((action) => {
      if (!winner || action.priority >= winner.priority) {
        winner = action;
      }
    });

    // run the winning action if there is one
    winner && winner.fn && winner.fn();
  }

  // Getter/Setter Methods
  // **********************************************

  /**
   * @private
   * @param {string} userAgent
   */
  setUserAgent (userAgent) {
    this._ua = userAgent;
  }

  /**
   * @private
   * @param {QueryParams} queryParams
   */
  setQueryParams (queryParams) {
    this._qp = queryParams;
  }

  /**
   * @private
   * @return {string}
   */
  userAgent () {
    return this._ua || '';
  }

  /**
   * 设置浏览器平台的名称
   * @private
   * @param {string} navigatorPlatform
   */
  setNavigatorPlatform (navigatorPlatform) {
    this._bPlt = navigatorPlatform;
  }

  /**
   * @private
   * @return {string}
   */
  navigatorPlatform () {
    return this._bPlt || '';
  }

  /**
   * Gets the width of the platform's viewport using `window.innerWidth`.
   * Using this method is preferred since the dimension is a cached value,
   * which reduces the chance of multiple and expensive DOM reads.
   * 尺寸信息是被缓存的
   * @return {number}
   */
  width () {
    this._calcDim();
    return this._isPortrait ? this._pW : this._lW;
  }

  /**
   * Gets the height of the platform's viewport using `window.innerHeight`.
   * Using this method is preferred since the dimension is a cached value,
   * which reduces the chance of multiple and expensive DOM reads.
   * @return {number}
   */
  height () {
    this._calcDim();
    return this._isPortrait ? this._pH : this._lH;
  }

  /**
   * Returns `true` if the app is in portait mode.
   * landscape是横向，portrait是纵向
   * @return {boolean}
   */
  isPortrait () {
    this._calcDim();
    return this._isPortrait;
  }

  /**
   * Returns `true` if the app is in landscape mode.
   * landscape是横向，portrait是纵向
   * @return {boolean}
   */
  isLandscape () {
    return !this.isPortrait();
  }

  /**
   * @private
   */
  _calcDim () {
    if (this._isPortrait === null) {
      const winDimensions = windowDimensions();
      const screenWidth = window.screen.width || winDimensions.width;
      const screenHeight = window.screen.height || winDimensions.height;

      if (screenWidth < screenHeight) {
        this._isPortrait = true;
        if (this._pW < winDimensions.width) {
          this._pW = winDimensions.width;
        }
        if (this._pH < winDimensions.height) {
          this._pH = winDimensions.height;
        }

      } else {
        this._isPortrait = false;
        if (this._lW < winDimensions.width) {
          this._lW = winDimensions.width;
        }
        if (this._lH < winDimensions.height) {
          this._lH = winDimensions.height;
        }
      }
    }
  }

  /**
   * @private
   */
  windowResize () {
    clearTimeout(this._resizeTm);

    this._resizeTm = setTimeout(() => {
      flushDimensionCache();
      this._isPortrait = null;
      // 等待时间后执行resize的注册事件列表
      for (let i = 0; i < this._onResizes.length; i++) {
        try {
          !!this._onResizes[i] && typeof this._onResizes[i] === 'function' && this._onResizes[i]();
        } catch (e) {
          console.error(e);
        }
      }
    }, 200);
  }

  /**
   * 注册resize事件的回调函数,存入_onResizes中
   * @private
   * @param {Function} cb
   * @return {Function}
   */
  onResize (cb) {
    const self = this;
    self._onResizes.push(cb);

    return function () {
      removeArrayItem(self._onResizes, cb);
    };
  }

  // Platform Registry
  // **********************************************

  /**
   * 设置config的 登记列表, platform-registry中的config就登记在这个位置
   * @private
   * @param {PlatformConfig} platformConfigs {[key: string]: PlatformConfig}
   */
  setPlatformConfigs (platformConfigs) {
    this._registry = platformConfigs || {};
  }

  /**
   * @private
   * @param {string} platformName
   * @return {PlatformConfig} platformConfigs - {[key: string]: PlatformConfig}
   */
  getPlatformConfig (platformName) {
    return this._registry[platformName] || {};
  }

  /**
   * 获得当前的登记列表
   * @private
   */
  registry () {
    return this._registry;
  }

  /**
   * 设置默认的登记config名称
   * @private
   * @param {string}
   */
  setDefault (platformName) {
    this._default = platformName;
  }

  /**
   * 判断 字符串是否在 长字符串中
   * @private
   * @param {string} queryValue
   * @param {string} queryTestValue
   * @return {boolean}
   */
  testQuery (queryValue, queryTestValue) {
    const valueSplit = queryValue.toLowerCase().split(';');
    return valueSplit.indexOf(queryTestValue) > -1;
  }

  /**
   * 根据RegExp的规则测试_bPlt
   * @private
   * @param {RegExp} navigatorPlatformExpression
   */
  testNavigatorPlatform (navigatorPlatformExpression) {
    const rgx = new RegExp(navigatorPlatformExpression, 'i');
    return rgx.test(this._bPlt);
  }

  /**
   * 根据传入的RegExp获取该平台的版本
   * @private
   * @param {RegExp} userAgentExpression
   */
  matchUserAgentVersion (userAgentExpression) {
    if (this._ua && userAgentExpression) {
      const val = this._ua.match(userAgentExpression);
      if (val) {
        return {
          major: val[1],
          minor: val[2]
        };
      }
    }
  }

  testUserAgent (expression) {
    if (this._ua) {
      return this._ua.indexOf(expression) >= 0;
    }
    return false;
  }

  /**
   *  this._qp为地址栏参数查询对象,
   *  1. 优先提取地址栏的ionicplatform值,判断是否匹配
   *  2. 否则由useragent判断userAgentAtLeastHas中是否有而userAgentMustNotHave中没有
   *
   * @private
   * @param {string} queryStringName - 查询名称
   * @param {array} userAgentAtLeastHas - 在useragent中查找的字段
   * @param {array} userAgentMustNotHave -  在useragent中排除的字段
   * @return {boolean}
   */
  isPlatformMatch (queryStringName, userAgentAtLeastHas, userAgentMustNotHave = []) {
    const queryValue = this._qp.get('ionicplatform');
    if (queryValue) {
      return this.testQuery(queryValue, queryStringName);
    }

    userAgentAtLeastHas = userAgentAtLeastHas || [queryStringName];

    const userAgent = this._ua.toLowerCase();

    for (var i = 0; i < userAgentAtLeastHas.length; i++) {
      if (userAgent.indexOf(userAgentAtLeastHas[i]) > -1) {
        for (var j = 0; j < userAgentMustNotHave.length; j++) {
          if (userAgent.indexOf(userAgentMustNotHave[j]) > -1) {
            return false;
          }
        }
        return true;
      }
    }

    return false;
  }

  /** @private */
  init () {
    this._platforms = [];
    let rootPlatformNode;//PlatformNode;
    let enginePlatformNode;//PlatformNode;

    // figure out the most specific platform and active engine
    let tmpPlatform;//PlatformNode;
    for (let platformName in this._registry) {

      tmpPlatform = this.matchPlatform(platformName);
      if (tmpPlatform) {
        // we found a platform match!
        // check if its more specific than the one we already have

        if (tmpPlatform.isEngine) {
          // because it matched then this should be the active engine
          // you cannot have more than one active engine
          enginePlatformNode = tmpPlatform;

        } else if (!rootPlatformNode || tmpPlatform.depth > rootPlatformNode.depth) {
          // only find the root node for platforms that are not engines
          // set this node as the root since we either don't already
          // have one, or this one is more specific that the current one
          rootPlatformNode = tmpPlatform;
        }
      }
    }

    if (!rootPlatformNode) {
      rootPlatformNode = new PlatformNode(this._registry, this._default);
    }

    // build a Platform instance filled with the
    // hierarchy of active platforms and settings

    if (rootPlatformNode) {

      // check if we found an engine node (cordova/node-webkit/etc)
      if (enginePlatformNode) {
        // add the engine to the first in the platform hierarchy
        // the original rootPlatformNode now becomes a child
        // of the engineNode, which is not the new root
        enginePlatformNode.child = rootPlatformNode;
        rootPlatformNode.parent = enginePlatformNode;
        rootPlatformNode = enginePlatformNode;
      }

      let platformNode = rootPlatformNode;
      while (platformNode) {
        insertSuperset(this._registry, platformNode);
        platformNode = platformNode.child;
      }

      // make sure the root noot is actually the root
      // incase a node was inserted before the root
      platformNode = rootPlatformNode.parent;
      while (platformNode) {
        rootPlatformNode = platformNode;
        platformNode = platformNode.parent;
      }

      platformNode = rootPlatformNode;
      while (platformNode) {
        platformNode.initialize(this);

        // set the array of active platforms with
        // the last one in the array the most important
        this._platforms.push(platformNode.name);

        // get the platforms version if a version parser was provided
        this._versions[platformNode.name] = platformNode.version(this);

        // go to the next platform child
        platformNode = platformNode.child;
      }
    }

    // if (this._platforms.indexOf('mobile') > -1 && this._platforms.indexOf('cordova') === -1) {
    //   this._platforms.push('mobileweb');
    // }
  }

  /**
   * @private
   * @param {string} platformName
   * @return {PlatformNode}
   */
  matchPlatform (platformName) {
    // build a PlatformNode and assign config data to it
    // use it's getRoot method to build up its hierarchy
    // depending on which platforms match
    let platformNode = new PlatformNode(this._registry, platformName);
    let rootNode = platformNode.getRoot(this);

    if (rootNode) {
      rootNode.depth = 0;
      let childPlatform = rootNode.child;
      while (childPlatform) {
        rootNode.depth++;
        childPlatform = childPlatform.child;
      }
    }
    return rootNode;
  }
}

/**
 * @param {any} registry
 * @param {PlatformNode} platformNode
 * */
function insertSuperset (registry, platformNode) {
  let supersetPlaformName = platformNode.superset();
  if (supersetPlaformName) {
    // add a platform in between two exist platforms
    // so we can build the correct hierarchy of active platforms
    let supersetPlatform = new PlatformNode(registry, supersetPlaformName);
    supersetPlatform.parent = platformNode.parent;
    supersetPlatform.child = platformNode;
    if (supersetPlatform.parent) {
      supersetPlatform.parent.child = supersetPlatform;
    }
    platformNode.parent = supersetPlatform;
  }
}

/**
 * @private
 */
class PlatformNode {
  c; //PlatformConfig;
  parent; // PlatformNode
  child; // PlatformNode
  name; //string;
  isEngine; //boolean; 是否是在壳子中
  depth; //number;

  /**
   * @param {PlatformConfig} registry
   * @param {string} platformName
   * */
  constructor (registry, platformName) {
    this.c = registry[platformName];
    this.name = platformName;
    this.isEngine = this.c.isEngine;
  }

  settings () {
    return this.c.settings || {};
  }

  superset () {
    return this.c.superset;
  }

  /**
   * Platform
   * @param {Platform} p
   * @return {boolean}
   * */
  isMatch (p) {
    return this.c.isMatch && this.c.isMatch(p) || false;
  }

  /**
   * @param {Platform} platform
   * */
  initialize (platform) {
    this.c.initialize && this.c.initialize(platform);
  }

  /**
   * @param {Platform} p
   * @return {PlatformVersion}
   * */
  version (p) {
    if (this.c.versionParser) {
      const v = this.c.versionParser(p);
      if (v) {
        const str = v.major + '.' + v.minor;
        return {
          str: str,
          num: parseFloat(str),
          major: parseInt(v.major, 10),
          minor: parseInt(v.minor, 10)
        };
      }
    }
  }

  /**
   * @param {Platform} p
   * @return {PlatformNode}
   * */
  getRoot (p) {
    if (this.isMatch(p)) {

      let parents = this.getSubsetParents(this.name);

      if (!parents.length) {
        return this;
      }

      let platformNode = null; // PlatformNode
      let rootPlatformNode = null; // PlatformNode

      for (let i = 0; i < parents.length; i++) {
        platformNode = new PlatformNode(this.registry, parents[i]);
        platformNode.child = this;

        rootPlatformNode = platformNode.getRoot(p);
        if (rootPlatformNode) {
          this.parent = platformNode;
          return rootPlatformNode;
        }
      }
    }

    return null;
  }

  /**
   * 获取子集的父类名称数组
   * @param {string} subsetPlatformName
   * @return {array}
   * */
  getSubsetParents (subsetPlatformName) {
    const parentPlatformNames = [];
    let platform = null; // PlatformConfig
    for (let platformName in this.registry) {
      platform = this.registry[platformName];

      if (platform.subsets && platform.subsets.indexOf(subsetPlatformName) > -1) {
        parentPlatformNames.push(platformName);
      }
    }

    return parentPlatformNames;
  }

}

/**
 * @private
 * @param {PlatformConfig} platformConfigs
 * @param {QueryParams} queryParams
 * @param {string} userAgent
 * @param {string} navigatorPlatform
 * @param {string} docDirection
 * @param {string} docLanguage
 * @return {Platform}
 */
export function setupPlatform (platformConfigs, queryParams, userAgent, navigatorPlatform, docDirection, docLanguage) {
  if (!!window.platform) {
    return window.platform
  } else {
    const p = new Platform();
    p.setDefault('iphone');
    p.setPlatformConfigs(platformConfigs);
    p.setUserAgent(userAgent);
    p.setQueryParams(queryParams);
    p.setNavigatorPlatform(navigatorPlatform);
    p.setDir(docDirection, false);
    p.setLang(docLanguage, false);
    p.init();
    window.platform = p;
    return p;
  }
}
