/**
 * Created by Hsiang on 2017/3/2.
 * @module Storage
 * @description
 * @licence MIT
 * @author Hisang
 *
 * For more detail? please direct to [here](https://github.com/xiangsongtao/vm-storage)
 *
 * NOTICE: This is written by ES2015! You will need babel to compile or run `npm dev`.
 *
 * @property
 *
 * ## 安装
 *
 * ```
 * import storage from './storage/vm-storage'
 * Vue.use(storage, {
 *    prefix: 'vimo-'
  * })
 *
 * ```
 *
 * ## 方法
 *
 * ### set(key,[value])
 *
 * #### 1. 如果value有值, 且不为空
 *
 * 设置这个key-value值, 且value只能接受Object/Array/String(可序列化为Object或者Array的String).
 * 在浏览器中存储String, 在App中存储序列化后的Object/Array
 *
 * #### 2. 如果value为空
 *
 * 删除这个key对应的键值对, 类似于 `remove` 方法
 *
 * ### get([key])
 *
 * #### 1. 如果传入key
 *
 * 查询对应的值, 返回的值是序列化之后的值, 即Object/Array
 *
 * #### 2. 如果没传入key
 *
 * 返回全部存储数据
 *
 * ### clear()
 *
 * 清除全部
 *
 * ### remove(key)
 *
 * 移除键值对
 *
 * ### supported()
 *
 * 返回是否支持本地存储
 *
 * ## 回退处理
 *
 * 如果浏览器不支持, 会自动降级, 键值对将存在内存中, 效果类似于内存中的变量, 当app关闭, 存储值消失.
 *
 *
 */
const VERSION = '0.1.6'
const isBoolean = (val) => typeof val === 'boolean'
const isString = (val) => typeof val === 'string'
const isNumber = (val) => typeof val === 'number'
const isPresent = (val) => val !== undefined && val !== null
const isBlank = (val) => val === undefined || val === null || val === ''
const isObject = (val) => typeof val === 'object'
const isPlainObject = (val) => isObject(val) && Object.getPrototypeOf(val) == Object.prototype
const isArray = Array.isArray
const serializer = (value) => {
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}
const deserializer = JSON.stringify

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
  constructor (storageType, options = {}) {
    this._v = VERSION
    this._c = {}
    this._p = '' // storage profix
    this._s = null // current storage function, if not support, it will be false
    this._pl = null // prefix length
    this._st = storageType // storage type: localStorage/sessionStorage

    if (isPresent(options.prefix)) {
      this._p = options.prefix.toString().trim()
    }

    if (this._p.charAt(0) === '_') {
      console.error('The vm-storage prefix shoule not start with "_"!')
      return
    }

    this._pl = this._p.length
    this._s = this._isStorageSupported(window, storageType) // return localStorage or sessionStorage

    // check whether support storage function, if not then use fallback function to handle
    if (!this.supported()) {
      console.warn(`Current browser does not support ${this._st}, system will fallback to use memory to cache key/value data! storage.js::<Class>Storage`)
    } else {
      // init
      for (let i = 0, l = this._s.length, k; i < l; i++) {
        // #8, #10: ` _s.key(i)` may be an empty string (or throw an exception in IE9 if ` _s` is empty)
        k = this._s.key(i)
        if (k.indexOf('_') !== 0 && this._p === k.slice(0, this._pl)) {
          let _v = serializer(this._s.getItem(k))
          if (isArray(_v) || isPlainObject(_v)) {
            this._c[k.slice(this._pl)] = _v
          }
        }
      }
      // addEventListener
      window.addEventListener && window.addEventListener('storage', (event) => {
        if (!event.key) {
          return
        }
        let doc = window.document
        if ((!doc.hasFocus || !doc.hasFocus()) && this._p === event.key.slice(0, this._pl)) {
          if (event.newValue) {
            this.set(event.key.slice(this._pl), event.newValue)
          } else {
            this.remove(event.key.slice(this._pl))
          }
        }
      })
    }
  }

  /**
   * get
   * @param {string} [key] - 查询制定的key, 如果key不存在则返回全部
   * return {array|object}
   * */
  get (key) {
    if (isBlank(key)) return this._c
    if (key.charAt(0) === '_') {
      console.warn('get()::The key should not start with "_"!')
      return null
    }
    return this._c[key]
  }

  /**
   * set
   * @param {string} key
   * @param {object|string|function} value - 设置的value值, 如果为空, 则删除这个key-value
   * */
  set (key, value) {
    if (!isString(key) || isBlank(key)) return

    // 如果set的value值为空,则认为是删除这个值
    if (isBlank(value)) {
      this.remove(key)
      return
    }

    if (key.charAt(0) === '_') {
      console.warn('set()::The key should not start with "_"!')
      return
    }

    // 可能的value类型: object array | sting | number boolean function
    if (isArray(value) || isPlainObject(value)) {
      // 数据源是合格的数据 object/array
      this._c[key] = value
      this.supported() && this._s.setItem(this._p + key, deserializer(value))
    } else if (isString(value)) {
      // 如果传入的是string, 尝试是否能序列化
      let _value = serializer(value)
      if (isArray(_value) || isPlainObject(_value)) {
        // 序列化是合格的数据 object/array, 则存储
        this._c[key] = _value
        this.supported() && this._s.setItem(this._p + key, value)
      } else {
        // 不合格的数据, 给出提示
        console.error('$storage 必须存入object/array, 或者能序列化的string!')
        return false
      }
    } else {
      // 不合格的数据, 给出提示
      console.error('$storage 必须存入object/array, 或者能序列化的string!')
      return false
    }
  }

  /**
   * clear all
   * */
  clear () {
    for (let k in this._c) {
      '$' === k.charAt(0) || (delete this._c[k] && this.supported() && this._s.removeItem(this._p + k))
    }
  }

  /**
   * remove
   * @param {string} key
   * */
  remove (key) {
    if (isBlank(key) || !isString(key)) return
    if (key.charAt(0) === '_') {
      console.warn('remove()::The key should not start with "_"!')
      return null
    }
    if (this.get(key)) {
      delete this._c[key] && this.supported() && this._s.removeItem(this._p + key)
    }
  }

  /**
   * supported test
   * */
  supported () {
    return !!this._s
  }

  // -------- private --------

  /**
   * check whether storage is support or not
   * @param {object} window
   * @param {string} storageType - storage name: localStorage/sessionStorage
   * @return {object/boolean}  storage object, such as : window.localStorage/window.sessionStorage. if not support,
   *   return false
   * */
  _isStorageSupported (window, storageType) {
    // Some installations of IE, for an unknown reason, throw "SCRIPT5: Error: Access is denied"
    // when accessing window.localStorage. This happens before you try to do anything with it.
    // Catch that error and allow execution to continue.

    // fix 'SecurityError: DOM Exception 18' exception in Desktop Safari, Mobile Safari
    // when "Block cookies": "Always block" is turned on
    let supported
    try {
      supported = window[storageType]
    }
    catch (err) {
      supported = false
    }

    // When Safari (OS X or iOS) is in private browsing mode, it appears as though localStorage and sessionStorage
    // is available, but trying to call .setItem throws an exception below:
    // "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to add something to storage that exceeded the quota."
    if (supported) {
      let key = '__' + Math.round(Math.random() * 1e7)
      try {
        window[storageType].setItem(key, key)
        window[storageType].removeItem(key, key)
      }
      catch (err) {
        supported = false
      }
    }
    return supported
  }
}

export default {
  version: VERSION,
  install (Vue, options) {
    Vue.prototype['$localStorage'] = new Storage('localStorage', options)
    Vue.prototype['$sessionStorage'] = new Storage('sessionStorage', options)
  }
}