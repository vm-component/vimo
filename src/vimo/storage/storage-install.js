/**
 * Created by Hsiang on 2017/3/2.
 *
 * @name sessionStorage/localStorage本地存储
 * @description
 *
 * 因为遇到了有些浏览器没开启本地存储导致app报错假死, 因此需要在
 * window.sessionStorage.getItem
 * window.sessionStorage.removeItem
 * window.sessionStorage.setItem
 * window.sessionStorage.clear
 * ... sessionStorage/localStorage提供的多种方法
 *
 *
 * 之前再次分装一层, 检测(try/catch)是否支持本地存储, 如果不行, 给出提示,
 * sessionStorage/localstorage则使用内存缓存处理.
 *
 * 参考的项目: https://github.com/DTFE/vStorage
 *
 * 设计概要:
 * 1. 基本上是对vStorage翻版改写
 * 2. config中能设置key的前缀
 * 3. $开头的变量为内存变量, 不在了内地存储中驻村
 *
 */

module.exports = {
  install (Vue, options) {
    Object.assign(Vue.prototype, {
      $localStorage: new Storage('localStorage', options),
      $sessionStorage: new Storage('sessionStorage', options),
    });
  }
};

/**
 * @name Storage
 * @description
 *
 * 根据传入的storage名称, 这个类用于生成storage实例;
 *
 * */
class Storage {
  _prefix; // 存储前缀
  _storage; // 当前的storage函数(window.localStorage/window.sessionStorage), 如果不可用则返回false
  _prefixLength; // 前缀长度
  _storageType; // 存储类型名称

  /**
   * @param {string} storageType
   * @param {object} options
   * */
  constructor (storageType, options) {
    this._storageType = storageType;
    if (!!options && !!options.prefix) {
      this._prefix = options.prefix
    } else {
      this._prefix = 'vStorage-';
    }
    this._prefixLength = this._prefix.length;
    this._storage = this._isStorageSupported(window, storageType); // 返回浏览器的存储对象(localStorage/sessionStorage)

    // 初始化
    this._init();
  }

  /**
   * 取值
   * @param {string} key
   * */
  getItem (key) {
    return this[key]
  }

  /**
   * 设值
   * @param {string} key
   * @param {string} value
   * */
  setItem (key, value) {
    this[key] = JSON.parse(JSON.stringify(value));
    this._storage.setItem(this._prefix + key, JSON.stringify(value));
  }

  /**
   * 清除全部指定前缀的键值对
   * */
  clear () {
    const _this = this;
    for (let k in _this) {
      '$' === k[0] || (delete _this[k] && _this._storage.removeItem(_this._prefix + k));
    }
  }

  /**
   * 移除
   * @param {string} key
   * */
  removeItem (key) {
    delete this[key] && this._storage.removeItem(this._prefix + key);
  }

  /**
   * 是否支持
   * */
  supported () {
    return !!this._storage;
  }

  // -------- private --------

  /**
   * fetch data
   * 从localStorage中拉去记录
   * */
  _init () {
    if (this._storageType !== 'localStorage') return;
    for (let i = 0, l = this._storage.length, k; i < l; i++) {
      // #8, #10: ` _storage.key(i)` may be an empty string (or throw an exception in IE9 if ` _storage` is empty)
      k = this._storage.key(i);
      if (this._prefix === k.slice(0, this._prefixLength)) {
        this[k.slice(this._prefixLength)] = JSON.parse(this._storage.getItem(k))
      }
    }
  }

  /**
   * 检查是否能使用存储功能
   *
   * @param {object} window
   * @param {string} storageType - 存储的对象名称: localStorage/sessionStorage
   * @return {object} 返回存储对象(window.localStorage/window.sessionStorage), 否则返回false
   * */
  _isStorageSupported (window, storageType) {

    // Some installations of IE, for an unknown reason, throw "SCRIPT5: Error: Access is denied"
    // when accessing window.localStorage. This happens before you try to do anything with it. Catch
    // that error and allow execution to continue.

    // fix 'SecurityError: DOM Exception 18' exception in Desktop Safari, Mobile Safari
    // when "Block cookies": "Always block" is turned on
    let supported;
    try {
      supported = window[storageType];
    }
    catch (err) {
      supported = false;
    }

    // When Safari (OS X or iOS) is in private browsing mode, it appears as though localStorage and sessionStorage
    // is available, but trying to call .setItem throws an exception below:
    // "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to add something to storage that exceeded the quota."
    if (supported) {
      let key = '__' + Math.round(Math.random() * 1e7);
      try {
        window[storageType].setItem(key, key);
        window[storageType].removeItem(key, key);
      }
      catch (err) {
        supported = false;
      }
    }
    return supported;
  }

}
