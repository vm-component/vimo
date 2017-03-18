/**
 * Created by Hsiang on 2017/3/2.
 *
 * @module Storage
 * @description
 * @licence MIT
 * @author Hisang
 *
 * For more detail? please direct to [here](https://github.com/xiangsongtao/vm-storage)
 *
 * NOTICE: This is written by ES2015! You will need babel to compile or run `npm dev`.
 *
 * ### for Babel
 *
 * ```
 * npm install --global babel-cli
 * npm install --save-dev babel-preset-es2015
 *
 * ```
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
 * @class Storage
 * @description
 * Storage class to init instance
 * */
class Storage {

  /**
   * @param {string} storageType
   * @param {object} options
   * */
  constructor (storageType, options) {
    this._prefix = null; // storage profix
    this._storage = null; // current storage function, if not support, it will be false
    this._prefixLength = null; // prefix length
    this._storageType = null; // storage type: localStorage/sessionStorage

    this.length = 0;

    this._storageType = storageType;
    if (!!options && !!options.prefix) {
      this._prefix = options.prefix
    } else {
      this._prefix = 'vmStorage-';
    }
    this._prefixLength = this._prefix.length;
    this._storage = this._isStorageSupported(window, storageType); // return localStorage or sessionStorage

    // check whether support storage function, if not then use fallback function to handle
    if (!this._storage) {
      console.error('Current browser does not support sessionStorage and localStorage, ' +
        'system will fallback to use memory to cache key/value data! storage.js::<Class>Storage')
      this._storageFallback();
      // test again
      this._storage = this._isStorageSupported(window, storageType);
    }

    // init
    for (let i = 0, l = this._storage.length, k; i < l; i++) {
      // #8, #10: ` _storage.key(i)` may be an empty string (or throw an exception in IE9 if ` _storage` is empty)
      k = this._storage.key(i);
      if (this._prefix === k.slice(0, this._prefixLength)) {
        this.length++;
        this[k.slice(this._prefixLength)] = JSON.parse(this._storage.getItem(k))
      }
    }
  }

  /**
   * getItem
   * @param {string} key
   * */
  getItem (key) {
    return this[key]
  }

  /**
   * setItem
   * @param {string} key
   * @param {string} value
   * */
  setItem (key, value) {
    this[key] = JSON.parse(JSON.stringify(value));
    this.supported() && this._storage.setItem(this._prefix + key, JSON.stringify(value));
    this.length++;
  }

  /**
   * clear all
   * */
  clear () {
    const _this = this;
    this.length = 0;
    for (let k in _this) {
      '$' === k[0] || (delete _this[k] && this.supported() && _this._storage.removeItem(_this._prefix + k));
    }
  }

  /**
   * removeItem
   * @param {string} key
   * */
  removeItem (key) {
    this.length--;
    delete this[key] && this.supported() && this._storage.removeItem(this._prefix + key);
  }
  key (num) {
    let keys = Object.keys(this._storage);
    return keys[parseInt(num)]
  }
  /**
   * supported test
   * */
  supported () {
    return !!this._storage;
  }

  // -------- private --------

  /**
   * check whether storage is support or not
   * @param {object} window
   * @param {string} storageType - storage name: localStorage/sessionStorage
   * @return {object/boolean}  storage object, such as : window.localStorage/window.sessionStorage. if not support, return false
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
   * if not support, then rollback to use memory to catch key/value
   * */
  _storageFallback () {
    window.localStorage = new StorageFallback('localStorage');
    window.sessionStorage = new StorageFallback('sessionStorage');
  }

}

/**
 * @class StorageFallback
 * @description
 * fallback to use local memory to catch key/value
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
