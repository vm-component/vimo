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
    let getPrototypeOf = Object.getPrototypeOf;
    let isArray = Array.isArray;
    let TYPED_ARRAY_REGEXP = /^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/;

    Object.assign(Vue.prototype, {
      $localStorage: _storageProvider('localStorage'),
      $sessionStorage: _storageProvider('sessionStorage')
    });


    /**
     * 初始存储类型
     * @param {string} storageType - 存储类型
     * */
    function _storageProvider (storageType) {
      let storageKeyPrefix;
      let prefixLength;
      let serializer = toJson;
      let deserializer = fromJson;
      let _webStorage;

      if (!!options && !!options.storageKeyPrefix) {
        storageKeyPrefix = options.storageKeyPrefix
      } else {
        storageKeyPrefix = 'vStorage-';
      }
      prefixLength = storageKeyPrefix.length;
      _webStorage = isStorageSupported(window, storageType); // 浏览器的存储对象(localStorage/sessionStorage)


      //$storage对象的方法,单例模式,返回对象
      //vue内部维护的storage对象
      let _storage = function () {
        //定义基础服务
        let _store = null;
        _store = {
          //重置全部后写入items => items保留其余重置
          $reset: function (items) {
            for (let k in _store) {
              '$' === k[0] || (delete _store[k] && _webStorage.removeItem(storageKeyPrefix + k));
            }
            return _store.$set(items);
          },
          //数据拉取(web本地storage->$storage内部)
          $fetch: function () {
            for (let i = 0, l = _webStorage.length, k; i < l; i++) {
              // #8, #10: `_webStorage.key(i)` may be an empty string (or throw an exception in IE9 if `_webStorage` is empty)
              (k = _webStorage.key(i)) && storageKeyPrefix === k.slice(0, prefixLength) && (_store[k.slice(prefixLength)] = deserializer(_webStorage.getItem(k)));
            }
          },
          //设置值
          $set: function () {
            let args = Array.prototype.slice.call(arguments);
            if (args.length === 1 && isObject(args[0])) {
              let obj = args[0];
              for (let k in obj) {
                _store[k] = copy(obj[k]);
                _webStorage.setItem(storageKeyPrefix + k, serializer(obj[k]));
              }
            } else if (args.length === 2) {
              let key = args[0];
              let value = args[1];
              (_store[key] = copy(value));
              _webStorage.setItem(storageKeyPrefix + key, serializer(value));
            }
            return _store;
          },
          $delete: function (key) {
            delete _store[key] && _webStorage.removeItem(storageKeyPrefix + key);
          },
          $supported: function () {
            return !!_webStorage;
          },
        };

        //初始化从本地拉数据
        _store.$fetch();


        return _store
      };
      return _storage()
    }

    //---------tools---------

    /**
     * 检查是否能使用存储功能
     * 如果可以返回存储对象,否则返回false
     * */
    function isStorageSupported (window, storageType) {

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

    function isDefined (value) {
      return typeof value !== 'undefined';
    }

    /**
     * @ngdoc function
     * @name angular.isFunction
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is a `Function`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `Function`.
     */
    function isFunction (value) {
      return typeof value === 'function';
    }

    /**
     * @private
     * @param {*} obj
     * @return {boolean} Returns true if `obj` is an array or array-like object (NodeList, Arguments,
     *                   String ...)
     */
    function isArrayLike (obj) {

      // `null`, `undefined` and `window` are not array-like
      if (obj == null) return false;

      // arrays, strings and jQuery/jqLite objects are array like
      // * jqLite is either the jQuery or jqLite constructor function
      // * we have to check the existence of jqLite first as this method is called
      //   via the forEach method when constructing the jqLite object in the first place
      if (isArray(obj) || isString(obj)) return true;

      // Support: iOS 8.2 (not reproducible in simulator)
      // "length" in obj used to prevent JIT error (gh-11508)
      let length = "length" in Object(obj) && obj.length;

      // NodeList objects (with `item` method) and
      // other objects with suitable length characteristics are array-like
      return isNumber(length) &&
        (length >= 0 && ((length - 1) in obj || obj instanceof Array) || typeof obj.item == 'function');

    }

    /**
     * @ngdoc function
     * @name angular.forEach
     * @module ng
     * @kind function
     *
     * @description
     * Invokes the `iterator` function once for each item in `obj` collection, which can be either an
     * object or an array. The `iterator` function is invoked with `iterator(value, key, obj)`, where `value`
     * is the value of an object property or an array element, `key` is the object property key or
     * array element index and obj is the `obj` itself. Specifying a `context` for the function is optional.
     *
     * It is worth noting that `.forEach` does not iterate over inherited properties because it filters
     * using the `hasOwnProperty` method.
     *
     * Unlike ES262's
     * [Array.prototype.forEach](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.18),
     * providing 'undefined' or 'null' values for `obj` will not throw a TypeError, but rather just
     * return the value provided.
     *
     ```js
     let values = {name: 'misko', gender: 'male'};
     let log = [];
     angular.forEach(values, function(value, key) {
       this.push(key + ': ' + value);
     }, log);
     expect(log).toEqual(['name: misko', 'gender: male']);
     ```
     *
     * @param {Object|Array} obj Object to iterate over.
     * @param {Function} iterator Iterator function.
     * @param {Object=} context Object to become context (`this`) for the iterator function.
     * @returns {Object|Array} Reference to `obj`.
     */

    function forEach (obj, iterator, context) {
      let key, length;
      if (obj) {
        if (isFunction(obj)) {
          for (key in obj) {
            // Need to check if hasOwnProperty exists,
            // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
            if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
              iterator.call(context, obj[key], key, obj);
            }
          }
        } else if (isArray(obj) || isArrayLike(obj)) {
          let isPrimitive = typeof obj !== 'object';
          for (key = 0, length = obj.length; key < length; key++) {
            if (isPrimitive || key in obj) {
              iterator.call(context, obj[key], key, obj);
            }
          }
        } else if (obj.forEach && obj.forEach !== forEach) {
          obj.forEach(iterator, context, obj);
        } else if (isBlankObject(obj)) {
          // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
          for (key in obj) {
            iterator.call(context, obj[key], key, obj);
          }
        } else if (typeof obj.hasOwnProperty === 'function') {
          // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              iterator.call(context, obj[key], key, obj);
            }
          }
        } else {
          // Slow path for objects which do not have a method `hasOwnProperty`
          for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
              iterator.call(context, obj[key], key, obj);
            }
          }
        }
      }
      return obj;
    }

    function isObject (value) {
      // http://jsperf.com/isobject4
      return value !== null && typeof value === 'object';
    }

    function isTypedArray (value) {
      return TYPED_ARRAY_REGEXP.test(toString.call(value));
    }

    function isBlankObject (value) {
      return value !== null && typeof value === 'object' && !getPrototypeOf(value);
    }

    /**
     * Set or clear the hashkey for an object.
     * @param obj object
     * @param h the hashkey (!truthy to delete the hashkey)
     */
    function setHashKey (obj, h) {
      if (h) {
        obj.$$hashKey = h;
      } else {
        delete obj.$$hashKey;
      }
    }

    /**
     * @ngdoc function
     * @name angular.copy
     * @module ng
     * @kind function
     *
     * @description
     * Creates a deep copy of `source`, which should be an object or an array.
     *
     * * If no destination is supplied, a copy of the object or array is created.
     * * If a destination is provided, all of its elements (for arrays) or properties (for objects)
     *   are deleted and then all elements/properties from the source are copied to it.
     * * If `source` is not an object or array (inc. `null` and `undefined`), `source` is returned.
     * * If `source` is identical to 'destination' an exception will be thrown.
     *
     * @param {*} source The source that will be used to make a copy.
     *                   Can be any type, including primitives, `null`, and `undefined`.
     * @param {(Object|Array)=} destination Destination into which the source is copied. If
     *     provided, must be of the same type as `source`.
     * */
    function copy (source, destination, stackSource, stackDest) {
      if (!destination) {
        destination = source;
        if (isObject(source)) {
          let index;
          if (stackSource && (index = stackSource.indexOf(source)) !== -1) {
            return stackDest[index];
          }

          // TypedArray, Date and RegExp have specific copy functionality and must be
          // pushed onto the stack before returning.
          // Array and other objects create the base object and recurse to copy child
          // objects. The array/object will be pushed onto the stack when recursed.
          if (isArray(source)) {
            return copy(source, [], stackSource, stackDest);
          } else if (isTypedArray(source)) {
            destination = new source.constructor(source);
          } else if (isDate(source)) {
            destination = new Date(source.getTime());
          } else if (isRegExp(source)) {
            destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
            destination.lastIndex = source.lastIndex;
          } else {
            let emptyObject = Object.create(getPrototypeOf(source));
            return copy(source, emptyObject, stackSource, stackDest);
          }

          if (stackDest) {
            stackSource.push(source);
            stackDest.push(destination);
          }
        }
      } else {
        if (source === destination) {
          console.log('cpi', "Can't copy! Source and destination are identical.");
          return
        }

        stackSource = stackSource || [];
        stackDest = stackDest || [];

        if (isObject(source)) {
          stackSource.push(source);
          stackDest.push(destination);
        }

        let result, key;
        if (isArray(source)) {
          destination.length = 0;
          for (let i = 0; i < source.length; i++) {
            destination.push(copy(source[i], null, stackSource, stackDest));
          }
        } else {
          let h = destination.$$hashKey;
          if (isArray(destination)) {
            destination.length = 0;
          } else {
            forEach(destination, function (value, key) {
              delete destination[key];
            });
          }
          if (isBlankObject(source)) {
            // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
            for (key in source) {
              destination[key] = copy(source[key], null, stackSource, stackDest);
            }
          } else if (source && typeof source.hasOwnProperty === 'function') {
            // Slow path, which must rely on hasOwnProperty
            for (key in source) {
              if (source.hasOwnProperty(key)) {
                destination[key] = copy(source[key], null, stackSource, stackDest);
              }
            }
          } else {
            // Slowest path --- hasOwnProperty can't be called as a method
            for (key in source) {
              if (hasOwnProperty.call(source, key)) {
                destination[key] = copy(source[key], null, stackSource, stackDest);
              }
            }
          }
          setHashKey(destination, h);
        }
      }
      return destination;
    }

    /**
     * @ngdoc function
     * @name angular.toJson
     * @module ng
     * @kind function
     *
     * @description
     * Serializes input into a JSON-formatted string. Properties with leading $$ characters will be
     * stripped since angular uses this notation internally.
     *
     * @param {Object|Array|Date|string|number} obj Input to be serialized into JSON.
     * @param {boolean|number} [pretty=2] If set to true, the JSON output will contain newlines and whitespace.
     *    If set to an integer, the JSON output will contain that many spaces per indentation.
     * @returns {string|undefined} JSON-ified string representing `obj`.
     */
    function toJson (obj, pretty) {
      if (typeof obj === 'undefined') return undefined;
      if (!isNumber(pretty)) {
        pretty = pretty ? 2 : null;
      }
      return JSON.stringify(obj, toJsonReplacer, pretty);
    }

    function toJsonReplacer (key, value) {
      let val = value;

      if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
        val = undefined;
      } else if (value && document === value) {
        val = '$DOCUMENT';
      }

      return val;
    }

    /**
     * @ngdoc function
     * @name angular.fromJson
     * @module ng
     * @kind function
     *
     * @description
     * Deserializes a JSON string.
     *
     * @param {string} json JSON string to deserialize.
     * @returns {Object|Array|string|number} Deserialized JSON string.
     */
    function fromJson (json) {
      return isString(json)
        ? JSON.parse(json)
        : json;
    }

    /**
     * @ngdoc function
     * @name angular.isString
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is a `String`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `String`.
     */
    function isString (value) {
      return typeof value === 'string';
    }

    /**
     * @ngdoc function
     * @name angular.isDate
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a value is a date.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `Date`.
     */
    function isDate (value) {
      return toString.call(value) === '[object Date]';
    }

    /**
     * Determines if a value is a regular expression object.
     *
     * @private
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `RegExp`.
     */
    function isRegExp (value) {
      return toString.call(value) === '[object RegExp]';
    }

    function isNumber (value) {
      return typeof value === 'number';
    }
  }
};
