/**
 * Created by Hsiang on 2017/2/9.
 *
 * @name Config类
 * @description
 *
 * Config初始化的实例能配置整个App, 也能根据使用的平台单独配置而互不影响.
 * 另外, 配置信息也能自定义
 *
 * 通过get/getBoolean/getNumber/set/settings方法设置当前平台的config
 *
 * 只有获取过的配置key会缓存到_c中, 清除_c缓冲可以使用:
 * settings({...})设置用户自定义配置
 *
 * config实例化后为单例对象,挂载点为: window.VM.config中
 *
 * Config使用的代码如下:
 * 初始化需要有平台信息, 故以下代码是依赖执行的.
 * @example
 *
 * 也可以在url中传入配置参数, 通过url配置App的前后缀, 例如htttp://xx.xx.com?vmMode=ios
 * 则配置mode将为ios, 改变mode并无法改变真实的mode环境, 因为平台验证有自己的isMatch方法, 切记!!
 *
 * 此配置将是最高优先级的配置(url获取配置信息 > 用户自定义配置 > 平台默认配置)
 * 因此这个方法将可以用于PC端测试
 *
 * 可通过set方法添加自定义的配置信息
 * config.set('ios', 'favoriteColor', 'green');
 * config.get('favoriteColor'); // 'green' when iOS
 *
 **/

const isFunction = (val) => typeof val === 'function';
const isDefined = (val) => typeof val !== 'undefined';
const isObject = (val) => typeof val === 'object';
const isArray = Array.isArray;
// 通过url配置App的前后缀, 例如htttp://xx.xx.com?vmMode=ios
const URL_CONFIG_PREFIX = 'vm';

export function setupConfig (config = {}, plt = {}) {
  if (!!window['VM'] && !!window['VM']['config']) {
    return window['VM']['config']
  } else {
    const c = new Config();
    c.init(config, plt);
    window['VM'] = window['VM'] || {};
    window['VM']['config'] = c;
    return c;
  }
}

class Config {
  constructor () {
    /**@private*/
    this._c = {}; // cache 获取配置的缓存对象, 可用的config只有调用的时候才知道!
    this._s = {}; // setting superlative 最高级配置 用户在初始化时自己的配置config
    this.plt; // Platform 当前平台的实例
  }

  /**
   * @function init
   * @description
   * 初始化配置信息, 传入用户自定义的配置, 生效的优先级如下:
   * ```
   * config.platforms.ios.key > config.key
   * ```
   *
   * @param {any} config - 初始化的config配置信息, 用户自定义的配置(最高级配置)
   * @param {Platform} [plt] - 当前平台的platform实例, 可选
   */
  init (config, plt) {
    this._s = config && isObject(config) && !isArray(config) ? config : {};
    this.plt = plt;
  }

  /**
   * @name get
   * @description
   * 获取配置信息
   * @param {string} [key] - 查找的key
   * @param {any} [fallbackValue] - 第二选择
   */
  get (key, fallbackValue = null) {
    const platform = this.plt;

    // 如果已缓存则取缓存值
    if (!isDefined(this._c[key])) {
      if (!isDefined(key)) {
        throw 'config key is not defined';
      }

      // 如果查询的值之前查过, 则使用缓存值
      // 如果之前没查过, 则查询配置, 查询顺序如下:
      // url_params > config > plt._register[platform]
      let userPlatformValue = undefined; //  config[platforms][platform][key]
      let userDefaultValue = this._s[key]; // config[key]
      let platformValue = undefined; // this.plt._registry[platformName].setting[key]
      let configObj = null;

      if (platform) {
        // 如果配置信息是定义在queryParam中的话, 读取并注册到_c中, 查询的关键字key是小写
        var queryStringValue = platform.getQueryParam(URL_CONFIG_PREFIX + key);
        if (isDefined(queryStringValue)) {
          return this._c[key] = (queryStringValue === 'true' ? true : queryStringValue === 'false' ? false : queryStringValue);
        }

        // 获取激活的platform, 此时已经知道层级关系, 最后一个为最重要的, 例如: ['mobile','ios','wechat']
        var activePlatformKeys = platform.platforms();

        // 循环查询每一个激活的平台, 在config.platforms中定义的配置
        for (var i = 0, ilen = activePlatformKeys.length; i < ilen; i++) {
          if (this._s.platforms) {
            configObj = this._s.platforms[activePlatformKeys[i]];
            if (configObj) {
              if (isDefined(configObj[key])) {
                userPlatformValue = configObj[key];
              }
            }
          }

          // 获取在平台上的配置(platform-registry.js)
          // 在[mode].setting中
          configObj = platform.getPlatformConfig(activePlatformKeys[i]);
          if (configObj && configObj.settings) {

            if (isDefined(configObj.settings[key])) {
              // found a setting for this platform
              platformValue = configObj.settings[key];
            }
          }
        }
      }

      // 缓存查询的的结果
      // 返回优先级: 用户自在config.platforms中定义 >  用户在config中定义   > platform中定义
      // eg: config[platforms][platformName][key] > config[key]  > this.plt._registry[platformName].setting[key]
      this._c[key] = isDefined(userPlatformValue) ? userPlatformValue :
        isDefined(userDefaultValue) ? userDefaultValue :
          isDefined(platformValue) ? platformValue :
            null;
    }

    var rtnVal = this._c[key];
    // 如果返回函数则导入platform执行
    if (isFunction(rtnVal)) {
      rtnVal = rtnVal(platform);
    }

    return (rtnVal !== null ? rtnVal : fallbackValue);
  }

  /**
   * @function getBoolean
   * @description
   * 和get()方法类似, 不过只返回boolean类型, 比如"true"返回true
   *
   * @param {string} [key] - key值
   * @param {boolean} [fallbackValue] - 备选值
   * value was `null`. Fallback value defaults to `false`.
   */
  getBoolean (key, fallbackValue = false) {
    const val = this.get(key);
    if (val === null) {
      return fallbackValue;
    }
    if (typeof val === 'string') {
      return val === 'true';
    }
    return !!val;
  }

  /**
   * @function getNumber
   * @description
   * 和get()方法类似, 不过只返回number类型
   * @param {string} [key] - key值
   * @param {number} [fallbackValue] - 备选值
   * value turned out to be `NaN`. Fallback value defaults to `NaN`.
   */
  getNumber (key, fallbackValue = NaN) {
    const val = parseFloat(this.get(key));
    return isNaN(val) ? fallbackValue : val;
  }

  /**
   * @function set
   * @description
   * 对config设置键值, 可针对平台设置.
   * @param {string} [platform] - 平台类型, 可以是(either 'ios' or 'android'). 如果不填将对所有平台生效.
   * @param {string} [key] - key值
   * @param {string} [value] - 设置的值
   *
   * @example
   *  // set('key', 'value') = set key/value pair
   *  // setting('ios', 'key', 'value') = set key/value pair for platform
   *
   */
  set (...args) {
    const arg0 = args[0];
    const arg1 = args[1];

    switch (args.length) {
      case 2:
        // set('key', 'value') = set key/value pair
        // arg1 = value
        this._s[arg0] = arg1;
        delete this._c[arg0]; // clear cache
        break;

      case 3:
        // setting('ios', 'key', 'value') = set key/value pair for platform
        // arg0 = platform
        // arg1 = key
        // arg2 = value
        this._s.platforms = this._s.platforms || {};
        this._s.platforms[arg0] = this._s.platforms[arg0] || {};
        this._s.platforms[arg0][arg1] = args[2];
        delete this._c[arg1]; // clear cache
        break;

    }

    return this;
  }

  /**
   *
   * @function settings
   * @description
   * 1. 如果不传入参数则为获取_s的数据,
   * 2. 如果传递`settings({...})`, 则设置_s的值, 同时清空_c
   * 3. 如果传递`settings('ios', {...})`, 则清除_s.platforms['ios']下的值并设置新值, 同时清空_c
   * @name settings()
   * @description
   * // settings()
   * // settings({...})
   * // settings('ios', {...})
   */
  settings (arg0, arg1) {
    switch (arguments.length) {

      case 0:
        return this._s;

      case 1:
        // settings({...})
        this._s = arg0;
        this._c = {}; // clear cache
        break;

      case 2:
        // settings('ios', {...})
        this._s.platforms = this._s.platforms || {};
        this._s.platforms[arg0] = arg1;
        this._c = {}; // clear cache
        break;
    }

    return this;
  }
}
