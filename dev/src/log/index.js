/**
 * Created by Hsiang on 2017/3/6.
 *    // APP日志监控 = 日志记录/发送 + 埋点记录/发送 服务(单向服务)
 *
 *    定位:
 *    $log用于搜集app对外的日志记录, 包括console级别的记录 + 埋点记录, 其中,console级别的记录根据
 *    console等级, 可以对外发布监控信息, 比如$log.error/$log.assert/$log.warn触发会对外发送错误记录
 *
 *    // 使用日志服务
 *
 * 1. 打印记录日志
 *    API:
 *    // 打开日志界面
 *    $log.init() // 初始化界面
 *    $log.open()
 *    $log.close()
 *    // 日志记录
 *
 *    // 常规
 *    $log.log(string)          // 信息输出
 *    $log.debug(string,script) // 调试信息, 不计入异常
 *    $log.info(string,script)  //
 *
 *    // 异常
 *    $log.warn(string,script)  // 警告, 但是不影响运行
 *    $log.error(string,script) // 错误, 可能终止运行
 *    $log.assert(true,string,script)  // 断言, 如果为false则报错, 不同于error
 *
 *    // 日志会截获系统的console
 *    截获console.log
 *    截获console.debug
 *    截获console.info
 *    截获console.error
 *    截获console.warn
 *    截获console.assert
 *
 *
 * 2. 提供埋点服务
 *    // 用户唯一的uuid提前获取
 *    $analytics('type', id, other) // 点击监听注册 data-analysis-id="_id" -> 处理方式
 *
 *    其余通过友盟的u-web完成(访问统计)
 *
 */
const HAS_CONSOLE = typeof window.console !== 'undefined'
// const isBoolean = (val) => typeof val === 'boolean'
// const isString = (val) => typeof val === 'string'
// const isNumber = (val) => typeof val === 'number'
// const isPresent = (val) => val !== undefined && val !== null
// const isBlank = (val) => val === undefined || val === null || val === ''
// const isObject = (val) => typeof val === 'object'
// const isPlainObject = (val) => isObject(val) && Object.getPrototypeOf(val) == Object.prototype
// const isArray = Array.isArray

export default{
  /**
   * @param {object} Vue - Vue
   * @param {object} options - 参数
   * @param {boolean=true} options.needLogPage  - 是否为开启日志界面
   * */
  install (Vue, options = {}) {
    let _ins = new Log(Vue, options)
    Vue.prototype.$log = _ins

    // 截获console
    // 正常log: log/debug/info
    // 异常log: error/warn/assert 等信息, 并用自己的方法存储记录
    if (HAS_CONSOLE) {
      let console = window.console
      let typeLists = ['log', 'debug', 'info', 'error', 'warn', 'assert']
      typeLists.forEach((type) => {
        let typeFn = console[type].bind(console)
        console[type] = function () {
          var args = Array.prototype.slice.call(arguments)
          // ---------- !注意! ---------
          // 这里不是console真正发出的位置
          // ---------- !注意! ---------
          typeFn.apply(null, arguments)
          _ins[type](...args)
        }
      })
    }

    /**
     * 监听全局的js文件错误
     * @param {String}  message   错误信息
     * @param {String}  script      出错的文件
     * @param {String}    line     出错代码的行号
     * @param {String}    column   出错代码的列号
     * @param {Object}  errorObj       错误的详细信息，Anything
     */
    window['onerror'] = function (message, script, line, column, errorObj) {
      _ins.error(normalizeError({
        message: message,
        name: !!errorObj && (errorObj.message || message.split(':')[1].trim()),
        script: script,
        line: line,
        stack: !!errorObj && errorObj.stack
      }))
      return true
    }

    // 这个错误一般发出: Script error.
    window.addEventListener('error', function (err) {
      _ins.error(normalizeError(err))
    })
  }
}

/**
 * @name Log
 * @description
 * 日志记录类
 * @param {object} options - 参数
 * */
class Log {
  constructor (Vue, options) {
    this._v = Vue
    this._isLogPageInit = false // 是否初始化了log页面
    this._logPageInstance = null // log页面的实例
    this._history = []// 日志记录数组

    if (options.needLogPage) {
      this.init()
    }
  }

  // -------- interface --------

  /**
   * 只有需要页面才初始化
   * */
  init () {
    if (!this._isLogPageInit) {
      let LogConstructor = this._v.extend(require('./log.vue'))
      this._isLogPageInit = true
      this._logPageInstance = new LogConstructor({
        // 放在body里面
        el: document.body.appendChild(document.createElement('div'))
      })
    }
    this._logPageInstance.setRecordList(this._history)
    return this._logPageInstance
  }

  /**
   * 打开日志记录信息页面
   * */
  open () {
    this._logPageInstance && this._logPageInstance.open()
  }

  /**
   * 关闭日志记录信息页面
   * */
  close () {
    this._logPageInstance && this._logPageInstance.close()
  }

  // -------- normal logs --------
  /**
   * 记录类型为log的日志
   * @param {any} msg - 传入的记录信息
   * @return {string} - 返回传入的msg
   * @example
   * ```js
   *  this.$log.log('这个是打log测试');
   * ```
   * */
  log (msg) {
    return this._recordTypeAssemble('log', msg)
  }

  /**
   * 记录类型为debug的日志
   * @param {any} msg - 传入的记录信息
   * @return {string} - 返回传入的msg
   * @example
   * ```js
   *  this.$log.debug('这个是打debug测试');
   * ```
   * */
  debug (msg) {
    return this._recordTypeAssemble('debug', msg)
  }

  /**
   * 记录类型为info的日志
   * @param {any} msg - 传入的记录信息
   * @return {string} - 返回传入的msg
   * @example
   * ```js
   *  this.$log.debug('这个是打info测试');
   * ```
   * */
  info (msg) {
    return this._recordTypeAssemble('info', msg)
  }

  // -------- abnormal logs --------

  /**
   * 记录类型为error的日志
   * 1. 一个类型为object的normalizeError对象
   * 2. message
   * 3. message-errorName-script-line
   *
   * @example:
   *
   * try{
   *  a()
   * }catch(rawError){
   *  this.$log.error(rawError)
   * }
   *
   * this.$log.error('未获取到位置信息')
   *
   * // 参数顺序: msg/errName/script/line
   * this.$log.error('未得到ajax的数据','AJAX TIMEOUT/FAIL','./getData.js::<Function>getInfo()','12')
   *
   * */
  error () {
    return this._recordTypeAssemble('error', ...arguments)
  }

  /**
   * 记录类型为warn的日志
   * 传参类似error
   * 用法和error类似
   * */
  warn () {
    return this._recordTypeAssemble('warn', ...arguments)
  }

  /**
   * 断言
   * @param {boolean} isFalse - 如果错误
   * 传参类似error
   * */
  assert (isFalse) {
    if (!isFalse) {
      let args = Array.prototype.slice.call(arguments)
      args.shift()
      return this._recordTypeAssemble('assert', ...args)
    }
  }

  // -------- logs history --------

  /**
   * 获取当前全部的log记录
   * @return {array}
   * */
  getHistory () {
    return this._history
  }

  // -------- private --------

  /**
   * @private
   * 记录类型组装
   * @param {string} type             - 记录类型
   * @param {(any|object)} message    - 记录信息/err对象
   * @param {any=} errorName     - 错误的类型
   * @param {string=} script     - 错误位置, 一般是脚本的位置
   * @param {string=} line       - 出错代码的行号
   * @param {string=} stack     - 出错代码的列号
   * */
  _recordTypeAssemble (type, message, errorName, script, line, stack) {
    let args = Array.prototype.slice.call(arguments)
    if (args.length === 2) {
      if (type === 'error' || type === 'warn' || type === 'assert') {
        let abnormalType = Object.prototype.toString.call(args[1]).match(/^(\[object )(\w+)\]$/i)[2].toLowerCase()
        if (abnormalType === 'object' || abnormalType === 'error') {
          // _recordTypeAssemble('error', rawErr)
          let formatted = normalizeError(args[1])
          message = formatted['message']
          errorName = formatted['name']
          script = formatted['script']
          line = formatted['line']
          stack = formatted['stack']
        } else {
          message = args[1].toString()
        }
      }
    }

    if (args.length > 2) {
      // _recordTypeAssemble('error','未得到ajax的数据','AJAX TIMEOUT/FAIL','./getData.js::<Function>getInfo()','12')
      message = args[1]
      errorName = args[2]
      script = args[3]
      line = args[4]
      stack = args[5]
    }

    let _str = this._msgToString(message)
    !!_str && this._storeRecord({
      message: _str,                // The error message
      count: 1,                     // the same message count
      type: type,                   // 记录类型
      name: errorName,              // 错误类型名称
      time: (new Date()).getTime(), // record time
      script: script,               // The script file the error occured in
      stack: stack,                 // Stack trace (as a string)
      line: line                   // The line number the error occured on
    })

    return _str
  }

  /**
   * @private
   * 将传入的msg转为string类型
   * @param {any} msg - 传入的记录信息
   * @return {(string|boolean)} 如果穿入值为空则返回false
   * */
  _msgToString (msg) {
    if (!msg) {
      return false
    }

    if (typeof msg === 'object') {
      msg = JSON.stringify(msg, null, 2)
    }

    if (typeof msg !== 'string') {
      msg = msg.toString()
    }

    return msg
  }

  /**
   * @private
   * 记录console信息, 如果与上一条重复, 则计数器++
   * @param {object} record - 记录对象
   * @param {string} record.message - 记录的string信息
   * @param {string|number} record.count - 消息重复次数
   * @param {string} record.type - 消息类型
   * @param {string} record.time - 消息出时间, timestamp
   * */
  _storeRecord (record) {
    let _len = this._history.length
    if (_len > 0) {
      let _lastRecord = this._history.pop()
      if (_lastRecord.type === record.type && _lastRecord.message === record.message) {
        _lastRecord.time = record.time
        _lastRecord.count++
        this._history.push(_lastRecord)
      } else {
        this._history.push(_lastRecord)
        this._history.push(record)
      }
    } else {
      this._history.push(record)
    }

    this._logPageInstance && this._logPageInstance.setRecordList(this._history)
  }
}

// Normalize Error objects across all browsers into something semi-standard.
// Not all properties are will be available, but if they are, they'll at
// least have a predictable property name.
function normalizeError (err) {
  var o = {
    message: err.message,
    script: err.fileName || err.sourceURL || err.script,
    name: err.name,
    line: err.lineNumber || err.line,
    stack: err.stackTrace || err.stack
  }

  // Chrome doesn't provide script/line # properties in Error objects, and
  // only reports the script/line # of where an error was last rethrown (as
  // opposed to the original throw point).  So we scrape the stack trace to
  // get that info
  if (window.chrome && err.stack &&
    /(\w{3,5}:\/\/[^:]+):(\d+)/.test(err.stack)) {
    o.script = RegExp.$1
    o.line = RegExp.$2
  }
  // Clear out undefined properties
  for (var k in o) {
    if (o[k] === null || o[k] === undefined) {
      delete o[k]
    }
  }
  return o
}
