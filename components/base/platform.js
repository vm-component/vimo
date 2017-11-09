/**
 * @class Platform
 * @classdesc  **App平台级别**的初始化类
 *
 *
 * ## 说明
 *
 * 这个类用于从设备中获取平台信息, 比如设备种类/运行平台/设备方向/文字方向等, 以此使得代码适配所有机型. 此外, 还支持平台方法的注册, 使业务与平台解耦.
 *
 */

/**
 * 结构体定义
 *
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
 * */

import { defaults, isFunction, isObject, isPresent } from '../util/util'
import PLATFORM_DEFAULT_CONFIGS from './platform-default-configs'
import css from '../util/getCss'

class Platform {
  constructor () {
    // Ready的promise;
    this._readyPromise = new Promise((resolve, reject) => {
      this._readyResolve = resolve
      this._readyReject = reject
    })

    this._versions = {} // 当前平台的版本信息列表 PlatformVersion

    this._lang = null // string 文字;

    this._qp = null // QueryParams [[初始化时]]!!! 的url查询实例 {data:{}};

    this._bPlt = null // string 当前的浏览器平台,差不多是设备的类型 navigator.platform , 例如MacIntel;
    this._ua = null // string userAgent;

    this._default = null // string 如果rootNode不存则使用默认的配置
    this._platforms = [] // : string[] = []; 当前平台的key 例如: "mobile/ios/mobileweb"
    this._registry = null // {[name:string] : PlatformConfig}; platform-registry中的config列表->登记处

    this._pW = 0 // Portrait模式的设备Width
    this._pH = 0 // Portrait模式的设备Height
    this._lW = 0 // Landscape模式的设备Width
    this._lH = 0 // Landscape模式的设备Height
    this._isPortrait = null // boolean = null 横屏还是竖屏 Portrait=竖屏;

    this._nt = null // 记录网络类型

    this._networkChangeCallbacks = []

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
  }

  /**
   * 判断当前平台是否匹配
   * 目前支持的平台判断有: mobile/ios/android/wechat/alipay/dingtalk/qq
   * @param {string} platformName - 平台名称
   * @return {boolean}
   */
  is (platformName) {
    return this._platforms.indexOf(platformName) > -1
  }

  /**
   * 获取当前的平台信息, 大类为: 设备别(mobile)/操作系统(ios/andoid)/hybrid平台(wechat/alipay/..)
   * 例如在ios上的微信, 则返回: ['mobile','ios','wechat']
   * @returns {array} 平台的类别的数组
   */
  platforms () {
    return this._platforms
  }

  /**
   * 返回当前平台的全部版本信息
   * @returns {object}
   */
  versions () {
    return this._versions
  }

  /**
   * 返回当前平台有值的版本信息
   * @return {PlatformVersion}
   * @private
   */
  version () {
    for (var platformName in this._versions) {
      if (this._versions[platformName]) {
        return this._versions[platformName]
      }
    }
    return {}
  }

  // Ready相关
  // **********************************************

  /**
   * 当平台准备完毕触发promise的resolve方法, 可以在业务中像下面这样使用.
   * 例如微信, 当ready之后, 即可获取及配置config信息和bridge方法注册, 因为当前JSSdk都已加载完毕.
   *
   * ```
   *  this.$platform.ready().then((data) => {
   *    console.debug(data)
   *  })
   * ```
   * @returns {promise}
   */
  ready () {
    return this._readyPromise
  }

  /**
   * 当平台准备完毕的时执行resolve方法, 这段函数执行后, 执行ready
   * @param {string} readySource - resolve中传入的数据
   * @private
   */
  triggerReady (readySource) {
    this._readyResolve(readySource)
  }

  /**
   * 平台初始化失败的回调
   * @param {string} rejectSource - reject中传入的数据
   * @private
   */
  triggerFail (rejectSource) {
    this._readyReject(rejectSource)
  }

  /**
   * 这个函数是默认函数, 当平台没有initialize函数改写prepareReady的时候, 将使用这个.
   *
   * 平台在initialize函数中改写prepareReady是为了在App运行环境中做一些处理,
   * 比如必须的资源下载/请求后台给地址签名等. 等完毕后, 手动触发triggerReady函数
   *
   * 这部分不应该和业务相关, 比如获取用户数据才进入app, 这部分应该业务逻辑中处理
   *
   * !!!! platform配置中的initialize 只进行平台配置及注册签名等的代码, 而不进行和具体业务相关的代码!!!!
   * !!!! platform配置中的initialize 只进行平台配置及注册签名等的代码, 而不进行和具体业务相关的代码!!!!
   * !!!! platform配置中的initialize 只进行平台配置及注册签名等的代码, 而不进行和具体业务相关的代码!!!!
   *
   * @private
   */
  beforeReady () {
    this.triggerReady('H5 Initialization Process!')
  }

  // 平台方法
  // **********************************************

  /**
   * 退出app
   * @hidden
   */
  exitApp () {
    console.error('H5未实现此方法, 请检查调用!')
  }

  /**
   * 设置网络类型
   * @private
   * */
  setNetworkType (networkType) {
    this._nt = networkType
  }

  /**
   * 获取网络类型, 如果是在平台, 则使用平台方法
   * */
  networkType () {
    return this._nt
  }

  /**
   * 当网络环境发生变化时触发注册函数
   * @param {Function} fn - 注册函数, 回调参数返回网络类型
   * */
  onNetworkChange (fn) {
    if (
      isPresent(fn) &&
      isFunction(fn) &&
      this._networkChangeCallbacks.indexOf(fn) === -1
    ) {
      this._networkChangeCallbacks.push(fn)
    }
  }

  /**
   * @private
   */
  setCssProps () {
    this.css = css
    return this.css
  }

  /**
   * 获取UA
   * @return {string}
   */
  userAgent () {
    return this._ua || ''
  }

  /**
   * @param {string} userAgent
   * @private
   */
  setUserAgent (userAgent) {
    this._ua = userAgent
  }

  /**
   * Get the query string parameter
   * @private
   */
  getQueryParam (key) {
    return this._qp.get(key)
  }

  /**
   * @param {QueryParams} queryParams
   * @private
   */
  setQueryParams (queryParams) {
    this._qp = queryParams
  }

  /**
   * 获取浏览器信息
   * @return {string}
   */
  navigatorPlatform () {
    return this._bPlt || ''
  }

  /**
   * 设置浏览器平台的名称
   * @param {string} navigatorPlatform
   * @private
   */
  setNavigatorPlatform (navigatorPlatform) {
    this._bPlt = navigatorPlatform
  }

  /**
   * 在html标签中设置app语言类型
   * @param {string} language  Examples: `en-US`, `en-GB`, `ar`, `de`, `zh`, `es-MX`
   * @param {boolean} updateDocument
   * @private
   */
  setLang (language, updateDocument) {
    this._lang = language
    if (updateDocument) {
      document.documentElement.setAttribute('lang', language)
    }
  }

  /**
   * 返回app的语言类型
   * @returns {string}
   */
  lang () {
    return this._lang
  }

  // 屏幕尺寸及方向
  // **********************************************
  /**
   * 获取当前viewport的宽度
   * @return {number}
   */
  width () {
    this._calcDim()
    return this._isPortrait ? this._pW : this._lW
  }

  /**
   * 获取当前viewport的高度
   * @return {number}
   */
  height () {
    this._calcDim()
    return this._isPortrait ? this._pH : this._lH
  }

  /**
   * 判断是否为纵向
   * (landscape是横向，portrait是纵向)
   * @return {boolean}
   */
  isPortrait () {
    this._calcDim()
    return this._isPortrait
  }

  /**
   * 判断是否为横向
   * (landscape是横向，portrait是纵向)
   * @return {boolean}
   */
  isLandscape () {
    return !this.isPortrait()
  }

  /**
   * @private
   */
  _calcDim () {
    if (window.screen.width > 0 && window.screen.height > 0) {
      if (window['innerWidth'] < window['innerHeight']) {
        // the device is in portrait
        if (this._pW <= window['innerWidth']) {
          // console.debug('setting _isPortrait to true');
          this._isPortrait = true
          this._pW = window['innerWidth']
        }
        if (this._pH <= window['innerHeight']) {
          // console.debug('setting _isPortrait to true');
          this._isPortrait = true
          this._pH = window['innerHeight']
        }
      } else {
        if (this._lW > window['innerWidth']) {
          // Special case: keyboard is open and device is in portrait
          // console.debug('setting _isPortrait to true while keyboard is open and device is portrait');
          this._isPortrait = true
        }
        // the device is in landscape
        if (this._lW <= window['innerWidth']) {
          // console.debug('setting _isPortrait to false');
          this._isPortrait = false
          this._lW = window['innerWidth']
        }
        if (this._lH <= window['innerHeight']) {
          // console.debug('setting _isPortrait to false');
          this._isPortrait = false
          this._lH = window['innerHeight']
        }
      }
    }
  }

  // Platform Registry
  // **********************************************

  /**
   * 设置config的 登记列表, platform-registry中的config就登记在这个位置
   * @param {PlatformConfig} platformConfigs {[key: string]: PlatformConfig}
   * @private
   */
  setPlatformConfigs (platformConfigs) {
    this._registry = platformConfigs || {}
  }

  /**
   * @param {string} platformName
   * @return {PlatformConfig} platformConfigs - {[key: string]: PlatformConfig}
   * @private
   */
  getPlatformConfig (platformName) {
    return this._registry[platformName] || {}
  }

  /**
   * 获得当前的登记列表
   * @private
   */
  registry () {
    return this._registry
  }

  /**
   * 设置默认的登记config名称
   * @param {string}
   * @private
   */
  setDefault (platformName) {
    this._default = platformName
  }

  /**
   * 判断 字符串是否在 长字符串中
   * @param {string} queryValue  ios;md;android;iphone
   * @param {string} queryTestValue  ios
   * @return {boolean}
   * @private
   */
  testQuery (queryValue, queryTestValue) {
    const valueSplit = queryValue.toLowerCase().split(';')
    return valueSplit.indexOf(queryTestValue) > -1
  }

  /**
   * 判断是否匹配当前的浏览器平台
   * @param {RegExp} navigatorPlatformExpression
   * @private
   */
  testNavigatorPlatform (navigatorPlatformExpression) {
    const rgx = new RegExp(navigatorPlatformExpression, 'i')
    return rgx.test(this._bPlt)
  }

  /**
   * 判断是否匹配当前的userAgent
   * @param {RegExp} userAgentExpression
   * @private
   */
  matchUserAgentVersion (userAgentExpression) {
    if (this._ua && userAgentExpression) {
      const val = this._ua.match(userAgentExpression)
      if (val) {
        return {
          major: val[1],
          minor: val[2],
          patch: val[3]
        }
      }
    }
  }

  /**
   * 判断是否匹配当前的userAgent
   * @param {RegExp} expression
   * @private
   */
  testUserAgent (expression) {
    if (this._ua) {
      return this._ua.indexOf(expression) >= 0
    }
    return false
  }

  /**
   *  this._qp为地址栏参数查询对象,
   *  1. 优先提取地址栏的platform值,判断是否匹配
   *  2. 否则由useragent判断userAgentAtLeastHas中是否有而userAgentMustNotHave中没有
   *
   * @param {string} queryStringName - 通过地址栏的platform参数查询名称
   * @param {array} userAgentAtLeastHas - 在useragent中查找的字段
   * @param {array} userAgentMustNotHave -  在useragent中排除的字段
   * @return {boolean}
   * @private
   */
  isPlatformMatch (
    queryStringName,
    userAgentAtLeastHas,
    userAgentMustNotHave = []
  ) {
    // platform可以取值的参数: ios/android/iphone/
    const queryValue = this._qp.get('platform')
    if (queryValue) {
      return this.testQuery(queryValue, queryStringName)
    }

    userAgentAtLeastHas = userAgentAtLeastHas || [queryStringName]

    const userAgent = this._ua.toLowerCase()

    for (var i = 0; i < userAgentAtLeastHas.length; i++) {
      if (userAgent.indexOf(userAgentAtLeastHas[i]) > -1) {
        for (var j = 0; j < userAgentMustNotHave.length; j++) {
          if (userAgent.indexOf(userAgentMustNotHave[j]) > -1) {
            return false
          }
        }
        return true
      }
    }

    return false
  }

  /** @private */
  init () {
    // 计算屏幕尺寸
    this._calcDim()

    this._platforms = []
    let rootPlatformNode // 根节点Node;
    let enginePlatformNode // engine节点Node;
    // figure out the most specific platform and active engine
    let tmpPlatform // 临时缓存Node;

    // 找到rootPlatformNode
    // 找到enginePlatformNode
    for (let platformName in this._registry) {
      // 将platformName对用的配置转化为Node对象, 返回rootNode
      tmpPlatform = this.matchPlatform(platformName)
      if (tmpPlatform) {
        // we found a platform match!
        // check if its more specific than the one we already have

        if (tmpPlatform.isEngine) {
          // because it matched then this should be the active engine
          // you cannot have more than one active engine
          enginePlatformNode = tmpPlatform
        } else if (
          !rootPlatformNode ||
          tmpPlatform.depth > rootPlatformNode.depth
        ) {
          // only find the root node for platforms that are not engines
          // set this node as the root since we either don't already
          // have one, or this one is more specific that the current one
          rootPlatformNode = tmpPlatform
        }
      }
    }

    // 如果没找到根rootNode则使用默认的_default
    if (!rootPlatformNode) {
      rootPlatformNode = new PlatformNode(this._registry, this._default)
    }

    // build a Platform instance filled with the
    // hierarchy of active platforms and settings

    if (rootPlatformNode) {
      // check if we found an engine node (cordova/node-webkit/etc)
      // 如果是在壳子中,则将壳子的节点放置为rootNode
      if (enginePlatformNode) {
        // add the engine to the first in the platform hierarchy
        // the original rootPlatformNode now becomes a child
        // of the engineNode, which is not the new root
        enginePlatformNode.child = rootPlatformNode
        rootPlatformNode.parent = enginePlatformNode
        rootPlatformNode = enginePlatformNode
      }

      // 从根节点开始, 插入子Node
      let platformNode = rootPlatformNode
      while (platformNode) {
        insertSuperset(this._registry, platformNode)
        platformNode = platformNode.child
      }

      // make sure the root noot is actually the root
      // in case a node was inserted before the root
      platformNode = rootPlatformNode.parent
      while (platformNode) {
        rootPlatformNode = platformNode
        platformNode = platformNode.parent
      }

      platformNode = rootPlatformNode

      // 在这里初始化平台
      while (platformNode) {
        platformNode.beforeInitialize(this)

        platformNode.initialize(this)

        // 设置当前激活的平台信息, 最后一个是最重要的
        this._platforms.push(platformNode.name)

        // get the platforms version if a version parser was provided
        this._versions[platformNode.name] = platformNode.version(this)

        // go to the next platform child
        platformNode = platformNode.child
      }
    }
  }

  /**
   * 传入的名称匹配当前的平台,如果匹配则返回rootNode
   * @param {string} platformName
   * @return {PlatformNode}
   * @private
   */
  matchPlatform (platformName) {
    // build a PlatformNode and assign config data to it
    // use it's getRoot method to build up its hierarchy
    // depending on which platforms match
    let platformNode = new PlatformNode(this._registry, platformName)
    let rootNode = platformNode.getRoot(this)

    if (rootNode) {
      rootNode.depth = 0
      let childPlatform = rootNode.child
      while (childPlatform) {
        rootNode.depth++
        childPlatform = childPlatform.child
      }
    }
    return rootNode
  }
}

/**
 * @private
 * */
class PlatformNode {
  /**
   * 读取c中的配置信息
   * @param {PlatformConfig} registry
   * @param {string} platformName
   * */
  constructor (registry, platformName) {
    this.parent = null // 父节点
    this.child = null // 子节点
    this.depth = null // number 当前节点的深度;
    this.registry = registry
    this.c = registry[platformName] // platform-registry配置中的平台设置;
    this.name = platformName // 当前节点的名称;
    this.isEngine = this.c && this.c.isEngine // boolean; 是否是在壳子中
  }

  // 获取settings配置
  settings () {
    return this.c.settings || {}
  }

  // 获取父集的名称
  superset () {
    return this.c.superset
  }

  /**
   * 执行配置的匹配函数, 判断现在的node是否匹配当前运行平台
   * @param {Platform} p
   * @return {boolean}
   * */
  isMatch (p) {
    return this.c.isMatch && this.c.isMatch(p)
  }

  /**
   * 初始化之前执行的函数
   * @param {Platform} platform
   * */
  beforeInitialize (platform) {
    this.c.beforeInitialize && this.c.beforeInitialize(platform)
  }

  /**
   * 执行配置的初始化函数, 传入当前平台的参数
   * @param {Platform} platform
   * */
  initialize (platform) {
    this.c.initialize && this.c.initialize(platform)
  }

  /**
   * 传入当前的平台信息, 获得版本信息
   * @param {Platform} p
   * @return {PlatformVersion}
   * */
  version (p) {
    if (this.c.versionParser) {
      const v = this.c.versionParser(p)
      if (v) {
        if (!v.major) v.major = '0'
        if (!v.minor) v.minor = '0'
        if (!v.patch) v.patch = '0'
        const str = v.major + '.' + v.minor + (v.patch ? '.' + v.patch : '')
        return {
          str: str,
          num: parseFloat(str),
          major: parseInt(v.major, 10),
          minor: parseInt(v.minor, 10),
          patch: parseInt(v.patch, 10)
        }
      }
    }
  }

  /**
   * 获得当前node的根node
   * @param {Platform} p
   * @return {PlatformNode}
   * */
  getRoot (p) {
    // 判断当前平台是否和当前的Node匹配
    if (this.isMatch(p)) {
      // 获得 父集名称 列表
      let parents = this.getSubsetParents(this.name)

      if (!parents.length) {
        return this
      }

      let platformNode = null // PlatformNode
      let rootPlatformNode = null // PlatformNode

      for (let i = 0; i < parents.length; i++) {
        platformNode = new PlatformNode(this.registry, parents[i])
        platformNode.child = this

        rootPlatformNode = platformNode.getRoot(p)
        if (rootPlatformNode) {
          this.parent = platformNode
          return rootPlatformNode
        }
      }
    }

    return null
  }

  /**
   * 获取 子集名称对应的父集列表
   * @param {string} subsetPlatformName
   * @return {array}
   * */
  getSubsetParents (subsetPlatformName) {
    const parentPlatformNames = []
    let platform = null // PlatformConfig
    for (let platformName in this.registry) {
      platform = this.registry[platformName]

      if (
        platform.subsets &&
        platform.subsets.indexOf(subsetPlatformName) > -1
      ) {
        parentPlatformNames.push(platformName)
      }
    }

    return parentPlatformNames
  }
}

/**
 * @param {any} registry
 * @param {PlatformNode} platformNode
 * @private
 * */
function insertSuperset (registry, platformNode) {
  let supersetPlatformName = platformNode.superset()
  if (supersetPlatformName) {
    // add a platform in between two exist platforms
    // so we can build the correct hierarchy of active platforms
    let supersetPlatform = new PlatformNode(registry, supersetPlatformName)
    supersetPlatform.parent = platformNode.parent
    supersetPlatform.child = platformNode
    if (supersetPlatform.parent) {
      supersetPlatform.parent.child = supersetPlatform
    }
    platformNode.parent = supersetPlatform
  }
}

/**
 * 获取url参数的类
 * @example
 * import {QueryParams} from './platform/query-params'
 * let a = (new QueryParams()).queryParams(location.href)
 * console.log(a.data);
 * => Object {a: "1", b: "3"}
 * @private
 */
export class QueryParams {
  /**
   * @param {string} url
   * */
  constructor (url = window.location.href) {
    this.data = {} // {[key: string]: any}
    this.parseUrl(url)
  }

  /**
   * @param {string} key
   * */
  get (key) {
    return this.data[key.toLowerCase()]
  }

  /**
   * @param {string} url
   * */
  parseUrl (url) {
    if (url) {
      const startIndex = url.indexOf('?')
      if (startIndex > -1) {
        const queries = url.slice(startIndex + 1).split('&')
        for (var i = 0; i < queries.length; i++) {
          if (queries[i].indexOf('=') > 0) {
            var split = queries[i].split('=')
            if (split.length > 1) {
              this.data[split[0].toLowerCase()] = split[1].split('#')[0]
            }
          }
        }
      }
    }
    return this.data
  }
}

/**
 * @param {object} config - 用户在外面定义的平台配置, 需要和默认配置整合
 * @private
 * */
export function setupPlatform (config = {}) {
  const p = new Platform()
  let _finalConf = PLATFORM_DEFAULT_CONFIGS

  for (let outerKey in config) {
    if (_finalConf[outerKey] && isObject(_finalConf[outerKey])) {
      let _cusConf = config[outerKey]
      let _defConf = _finalConf[outerKey]
      for (let innerKey in _cusConf) {
        let _tmp = {}
        _tmp = defaults(_cusConf[innerKey], _defConf[innerKey])
        _defConf[innerKey] = _tmp
      }
    } else {
      _finalConf[outerKey] = config[outerKey]
    }
  }

  // 更新 IOS/Android下的subsets属性, 可能存在subsets中未定义的平台
  let keys = Object.keys(_finalConf).filter(item => {
    return item !== 'mobile' && item !== 'android' && item !== 'ios'
  })
  _finalConf.android.subsets = keys
  _finalConf.ios.subsets = keys

  p.setDefault('core')
  p.setPlatformConfigs(_finalConf)
  p.setQueryParams(new QueryParams())
  !p.navigatorPlatform() && p.setNavigatorPlatform(window.navigator.platform)
  !p.userAgent() && p.setUserAgent(window.navigator.userAgent)
  !p.lang() && p.setLang('zh-CN', true)

  // 设置css类型
  p.setCssProps()

  p.init()

  // 触发ready, 一般情况下是dom ready,
  // 如果平台改写了prepareReady方法,
  // 则执行平台对应的ready处理
  p.beforeReady()
  return p
}
