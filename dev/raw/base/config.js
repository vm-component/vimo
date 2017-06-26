/**
 * @class Config
 * @classdesc **App应用级别**的配置类
 *
 *
 * ### 说明
 *
 * Config初始化的实例能配置整个App, 也能根据使用的平台单独配置而互不影响. 另外, 配置信息也能自定义, 比如说存放合成变量.
 *
 * 获取过一次的配置会被缓存在实例中, 便于后续快速使用. 此外, 在业务中可用过this.$config获取已定义的变量, 比如:
 *
 * ```
 * this.$config.get('mode') => 'ios/md'
 * ```
 *
 * config的初始化Vimo安装的时候就搞定了, 实例会在`window.VM.config`中也留一份, 便于外部业务能访问到.
 *
 * ### 关于配置的优先级
 *
 * 也可以在url中传入配置参数, 通过url配置App的前后缀, 例如 http://xx.xx.com?vmMode=ios
 * 则参数mode的值为ios, 改变mode并无法改变真实的mode环境, 因为平台验证有自己的isMatch方法, 切记!!
 *
 * #### 优先级
 *
 * ** url获取配置信息(URL) > 用户自定义配置(Config) > 平台默认配置(Platform) **
 *
 * ```
 * 第一优先级(URL):
 * http://xx.xx.com?vmMode=ios
 *
 * 第二优先级(Config):
 * 在src/config/app-configs.js中的platforms字段中设置
 * export default {
 *    domain: '',
 *    platforms: {
 *        ios: {
 *          mode: 'md'
 *        }
 *    }
 * }
 *
 * 第三优先级(Config):
 * 在src/config/app-configs.js中根属性中设置
 * export default {
 *    domain: '',
 *    mode: 'ios'
 * }
 *
 * 第四优先级(Platform):
 * 如果当前的_platforms = ['mobile','ios','wechat']
 * 在src/config/platform-configs.js中设置
 * export default {
 *    wechat: {
 *        settings: {
 *          mode: 'md'
 *        }
 *    }
 * }
 *
 * 第五优先级(Platform):
 * 如果当前的_platforms = ['mobile','ios','wechat']
 * 在src/config/platform-configs.js中设置
 * export default {
 *    ios: {
 *        settings: {
 *          mode: 'md'
 *        }
 *    }
 * }
 * ```
 *
 * #### 可配置的参数有
 *
 * 参数 / params      | 默认值 / IOS      | 默认值 / Android   | 描述 / Description
 * -----------------|----------------|-----------------|------------------
 * mode             | ios            | md              | 模式
 * hideNavBar       | false          | false           | 是否隐藏navbar
 * toolbarMinHeight | 44             | 56              | toolbar的最小高度
 * iconMode         | ios            | md              | icon的模式
 * menuType         | reveal         | overlay         | menu展示方式
 * backButtonText   | ''             | ''              | 后退按钮文字
 * backButtonIcon   | ''             | ''              | 后退按钮图标icon
 * spinner          | ios            | crescent        | 菊花图配型
 * tabsHighlight    | false          | true            | tab是否有下划线
 * tabsPlacement    | bottom         | bottom          | tab的放置位置
 * pageTransition   | ios-transition | zoom-transition | 转场动画
 * showIndicatorWhenPageChange | true | true | 转场是否显示Indicator
 **/

const isFunction = (val) => typeof val === 'function'
const isDefined = (val) => typeof val !== 'undefined'
const isObject = (val) => typeof val === 'object'
const isArray = Array.isArray
// 通过url配置App的前后缀, 例如htttp://xx.xx.com?vmMode=ios
const URL_CONFIG_PREFIX = 'vm'

class Config {
  constructor () {
    /**
     * @private
     * */
    this._c = {} // cache 获取配置的缓存对象, 可用的config只有调用的时候才知道!
    this._s = {} // setting superlative 最高级配置 用户在初始化时自己的配置config
    this.plt = null // Platform 当前平台的实例
  }

  /**
   * 初始化配置信息, 传入用户自定义的配置, 生效的优先级如下:
   * ```
   * config.platforms.ios.key > config.key
   * ```
   * @param {any} config - 初始化的config配置信息, 用户自定义的配置(最高级配置)
   * @param {Platform} [plt] - 当前平台的platform实例, 可选
   * @private
   */
  init (config, plt) {
    this._s = config && isObject(config) && !isArray(config) ? config : {}
    this.plt = plt
  }

  /**
   * 获取配置信息
   * @param {string} [key] - 查找的key
   * @param {any} [fallbackValue] - 第二选择
   * @return {String}
   */
  get (key, fallbackValue = null) {
    const platform = this.plt

    // 如果已缓存则取缓存值
    if (!isDefined(this._c[key])) {
      if (!isDefined(key)) {
        // eslint-disable-next-line no-throw-literal
        throw 'config key is not defined'
      }

      // 如果查询的值之前查过, 则使用缓存值
      // 如果之前没查过, 则查询配置, 查询顺序如下:
      // url_params > config > plt._register[platform]
      let userPlatformValue //  config[platforms][platform][key]
      let userDefaultValue = this._s[key] // config[key]
      let platformValue // this.plt._registry[platformName].setting[key]
      let configObj = null

      if (platform) {
        // 如果配置信息是定义在queryParam中的话, 读取并注册到_c中, 查询的关键字key是小写
        var queryStringValue = platform.getQueryParam(URL_CONFIG_PREFIX + key)
        if (isDefined(queryStringValue)) {
          if (queryStringValue === 'true') {
            this._c[key] = true
          } else if (queryStringValue === 'false') {
            this._c[key] = false
          } else {
            this._c[key] = queryStringValue
          }
          return this._c[key]
        }

        // 获取激活的platform, 此时已经知道层级关系, 最后一个为最重要的, 例如: ['mobile','ios','wechat']
        var activePlatformKeys = platform.platforms()

        // 循环查询每一个激活的平台, 在config.platforms中定义的配置
        for (var i = 0, ilen = activePlatformKeys.length; i < ilen; i++) {
          if (this._s.platforms) {
            configObj = this._s.platforms[activePlatformKeys[i]]
            if (configObj) {
              if (isDefined(configObj[key])) {
                userPlatformValue = configObj[key]
              }
            }
          }

          // 获取在平台上的配置(platform-registry.js)
          // 在[mode].setting中
          configObj = platform.getPlatformConfig(activePlatformKeys[i])
          if (configObj && configObj.settings) {
            if (isDefined(configObj.settings[key])) {
              // found a setting for this platform
              platformValue = configObj.settings[key]
            }
          }
        }
      }

      // 缓存查询的的结果
      // 返回优先级: 用户自在config.platforms中定义 >  用户在config中定义   > platform中定义
      // eg: config[platforms][platformName][key] > config[key]  > this.plt._registry[platformName].setting[key]
      this._c[key] = isDefined(userPlatformValue) ? userPlatformValue : isDefined(userDefaultValue) ? userDefaultValue : isDefined(platformValue) ? platformValue : null
    }

    var rtnVal = this._c[key]
    // 如果返回函数则导入platform执行
    if (isFunction(rtnVal)) {
      rtnVal = rtnVal(platform)
    }

    return (rtnVal !== null ? rtnVal : fallbackValue)
  }

  /**
   * 和get()方法类似, 不过只返回boolean类型, 比如"true"返回true
   * @param {string} [key] - key值
   * @param {boolean} [fallbackValue] - 备选值
   * value was `null`. Fallback value defaults to `false`.
   * @return {Boolean}
   */
  getBoolean (key, fallbackValue = false) {
    const val = this.get(key)
    if (val === null) {
      return fallbackValue
    }
    if (typeof val === 'string') {
      return val === 'true'
    }
    return !!val
  }

  /**
   * 和get()方法类似, 不过只返回number类型
   * @param {string} [key] - key值
   * @param {number} [fallbackValue] - 备选值
   * value turned out to be `NaN`. Fallback value defaults to `NaN`.
   * @return {Number}
   */
  getNumber (key, fallbackValue = NaN) {
    const val = parseFloat(this.get(key))
    return isNaN(val) ? fallbackValue : val
  }

  /**
   * 修改config中定义的键值对, 可针对平台单独设置. 设置完毕后清楚配置缓存.
   * @param {string} [platform] - 平台类型, 可以是(either 'ios' or 'android'). 如果不填将对所有平台生效.
   * @param {string} [key] - key值
   * @param {string} [value] - 设置的值
   *
   * @example
   * set('key', 'value') = set key/value pair
   * set('ios', 'key', 'value') = set key/value pair for platform
   *
   * @return {this}
   */
  set (...args) {
    const arg0 = args[0]
    const arg1 = args[1]

    switch (args.length) {
      case 2:
        // set('key', 'value') = set key/value pair
        // arg1 = value
        this._s[arg0] = arg1
        delete this._c[arg0] // clear cache
        break

      case 3:
        // set('ios', 'key', 'value') = set key/value pair for platform
        // arg0 = platform
        // arg1 = key
        // arg2 = value
        this._s.platforms = this._s.platforms || {}
        this._s.platforms[arg0] = this._s.platforms[arg0] || {}
        this._s.platforms[arg0][arg1] = args[2]
        delete this._c[arg1] // clear cache
        break
    }

    return this
  }

  /**
   *
   * 全部重新设置
   * 1. 如果不传入参数则为获取_s的数据,
   * 2. 如果传递`settings({...})`, 则设置_s的值, 同时清空_c
   * 3. 如果传递`settings('ios', {...})`, 则清除_s.platforms['ios']下的值并设置新值, 同时清空_c
   *
   * @param {*} arg0 - 参数0
   * @param {*} arg1 - 参数1
   *
   * @example
   * settings()
   * settings({...})
   * settings('ios', {...})
   *
   */
  settings (arg0, arg1) {
    switch (arguments.length) {
      case 0:
        return this._s

      case 1:
        // settings({...})
        this._s = arg0
        this._c = {} // clear cache
        break

      case 2:
        // settings('ios', {...})
        this._s.platforms = this._s.platforms || {}
        this._s.platforms[arg0] = arg1
        this._c = {} // clear cache
        break
    }

    return this
  }
}

/**
 * @function setupConfig
 * @description Config类实例化
 * @private
 * */
export function setupConfig (config = {}, plt = {}) {
  if (!!window['VM'] && !!window['VM']['config']) {
    return window['VM']['config']
  } else {
    const c = new Config()
    c.init(config, plt)
    window['VM'] = window['VM'] || {}
    window['VM']['config'] = c
    return c
  }
}
