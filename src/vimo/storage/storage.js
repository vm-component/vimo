/**
 * Created by Hsiang on 2017/3/2.
 *
 * @module Storage
 * @description
 *
 * 因为遇到了有些浏览器没开启本地存储导致app报错假死, 因此需要在
 *
 *```
 * window.sessionStorage.getItem
 * window.sessionStorage.removeItem
 * window.sessionStorage.setItem
 * window.sessionStorage.clear
 * ... sessionStorage/localStorage
 *
 * ```
 *
 * 提供的多种方法之前再次分装一层, 检测(try/catch)是否支持本地存储,
 * 如果不行, 给出提示
 *
 * sessionStorage/localstorage此时使用内存缓存处理(降级保证能运行).
 *
 *
 * 设计概要:
 * 2. config中能设置key的前缀
 * 3. $开头的变量为内存变量, 不在sessionStorage/localStorage中存储
 *
 */

module.exports = {
  install (Vue, options) {
    Object.assign(Vue.prototype, {
      $localStorage: new Storage('localStorage', options),
      $sessionStorage: new Storage('sessionStorage', options),
    })
  }
};

/**
 * @name Storage
 * @description
 *
 * 根据传入的storage名称, 这个类用于生成storage实例
 *
 * */
class Storage {

  /**
   * @param {string} storageType
   * @param {object} options
   * */
  constructor (storageType, options) {
    // 定义
    this._prefix = null; // 存储前缀
    this._storage = null; // 当前的storage函数(window.localStorage/window.sessionStorage), 如果不可用则返回false
    this._prefixLength = null; // 前缀长度
    this._storageType = null; // 存储类型名称

    this._storageType = storageType;
    if (!!options && !!options.prefix) {
      this._prefix = options.prefix
    } else {
      this._prefix = 'vStorage-';
    }
    this._prefixLength = this._prefix.length;
    this._storage = this._isStorageSupported(window, storageType); // 返回浏览器的存储对象(localStorage/sessionStorage)

    // 检测是否支持storage存储, 不支持则采用回退处理
    if (!this._storage) {
      console.error('Current browser does not support sessionStorage and localStorage, ' +
        'system will fallback to use memory to cache key/value data! storage.js::<Class>Storage')
      this._storageFallback();
      // 再次执行检测
      this._storage = this._isStorageSupported(window, storageType);
    }

    // 初始化
    if (!this.supported() || this._storageType !== 'localStorage') return;
    for (let i = 0, l = this._storage.length, k; i < l; i++) {
      // #8, #10: ` _storage.key(i)` may be an empty string (or throw an exception in IE9 if ` _storage` is empty)
      k = this._storage.key(i);
      if (this._prefix === k.slice(0, this._prefixLength)) {
        this[k.slice(this._prefixLength)] = JSON.parse(this._storage.getItem(k))
      }
    }
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
    this.supported() && this._storage.setItem(this._prefix + key, JSON.stringify(value));
  }

  /**
   * 清除全部指定前缀的键值对
   * */
  clear () {
    const _this = this;
    for (let k in _this) {
      '$' === k[0] || (delete _this[k] && this.supported() && _this._storage.removeItem(_this._prefix + k));
    }
  }

  /**
   * 移除
   * @param {string} key
   * */
  removeItem (key) {
    delete this[key] && this.supported() && this._storage.removeItem(this._prefix + key);
  }

  /**
   * 是否支持
   * */
  supported () {
    return !!this._storage;
  }

  // -------- private --------

  /**
   * 检查是否能使用存储功能
   *
   * @param {object} window
   * @param {string} storageType - 存储的对象名称: localStorage/sessionStorage
   * @return {object/boolean} 返回存储对象(window.localStorage/window.sessionStorage), 否则返回false
   * */
  _isStorageSupported (window, storageType) {

    // Some installations of IE, for an unknown reason, throw "SCRIPT5: Error: Access is denied"
    // when accessing window.localStorage. This happens before you try to do anything with it.
    // Catch that error and allow execution to continue.

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

  /**
   * 如果手机不支持storage的降级处理
   * */
  _storageFallback () {
    window.localStorage = new StorageFallback('localStorage');
    window.sessionStorage = new StorageFallback('sessionStorage');
  }

}

/**
 * @class StorageFallback
 * @description
 * 当storage不能正常工作时的降级处理, 即在内存维护一个能记录长度和获取key的键值对
 * */
class StorageFallback {
  constructor (storageType) {
    this._storageType = storageType;
    this._storage = {};
    this.length = 0;
  }

  getItem (key) {
    if (!key || !value) {return}
    key = key.toString();
    return this._storage[key]
  }

  setItem (key, value) {
    if (!key || !value) {return}
    key = key.toString();
    value = value.toString();
    this._storage[key] = value;
    this.length++;
  }

  clear () {
    this._storage = {};
    this.length = 0;
  }

  removeItem (key) {
    if (!key) {return}
    key = key.toString();
    delete this._storage[key];
    this.length--;
  }

  key (num) {
    let keys = Object.keys(this._storage);
    return keys[parseInt(num)]
  }
}
