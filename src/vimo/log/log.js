/**
 * Created by Hsiang on 2017/3/6.
 *    // 代码异常监控体系 = 日志记录/发送 + 埋点记录/发送 服务(单向服务,$http为双向)
 *
 *
 *
 *
 *    定位:
 *    $log用于搜集app对外的日志记录, 包括console级别的记录 + 埋点记录, 其中,console级别的记录根据
 *    console等级, 可以对外发布监控信息, 比如$log.error/$log.assert/$log.warn触发会对外发送错误记录
 *
 *    // 使用日志服务
 *
 *    angular的$log服务, 打印出来的信息不包含发出信息的原始位置
 *
 * 1. 打印记录日志
 *    API:
 *    // 打开
 *    $log.open()
 *    $log.close()
 *    // 日志记录
 *
 *    // 常规
 *    $log.log(string)          // 信息输出
 *    $log.debug(string,script) // 调试信息, 不计入异常
 *
 *    // 异常
 *    $log.warn(string,script)  // 警告, 但是不影响运行
 *    $log.error(string,script) // 错误, 可能终止运行
 *    $log.assert(true,string,script)  // 断言, 如果为false则报错, 不同于error
 *
 *    $log.send(object) // 包括当前的信息及之前节流的信息一并发送
 *    $log.clean() // 清楚历史记录
 *
 *
 * 2. 提供埋点服务
 *    // 用户唯一的uuid提前获取
 *    $log.analytics('type', id, other) // 点击监听注册 data-analysis-id="_id" -> 处理方式
 *
 *    其余通过友盟的u-web完成(访问统计)
 *
 */
import logComponent from './log.vue';

module.exports = {
  /**
   * @param {object} Vue -
   * @param {object} options - 参数
   * @param {boolean=true} options.dev - 是否为开发状态
   * @param {array} options.levels - 记录的等级, 如果为空, 则全部记录, 否则注册什么记录什么
   * */
  install (Vue, options = {}) {
    let _ins = new Log(Vue, options);

    Object.assign(Vue.prototype, {
      $log: _ins,
    });

    /**
     * @param {String}  errorMessage   错误信息
     * @param {String}  scriptURI      出错的文件
     * @param {Long}    lineNumber     出错代码的行号
     * @param {Long}    columnNumber   出错代码的列号
     * @param {Object}  errorObj       错误的详细信息，Anything
     */
    window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {



      console.log('window.onerror')
      console.log("errorMessage:"+errorMessage)
      console.log("scriptURI:"+scriptURI)
      console.log("lineNumber:"+lineNumber)
      console.log("columnNumber:"+columnNumber)
      console.log("errorObj:"+JSON.stringify(errorObj))
    }

    unknownVariable()

    // setTimeout(function () {
    //   // 变量名错误
    //   try{
    //     unknownVariable
    //   }catch(err){
    //
    //     console.debug(err)
    //
    //     console.debug('---')
    //     console.log(normalizeError(err))
    //     console.debug('---')
    //
    //
    //   }
    // },3000)


  }
};

/**
 * @name Log
 * @description
 * 日志记录类
 *
 * @param {object}        options               - 参数
 * @param {array}         options.showList      - 日志显示列列表, 移动端显示的分类
 * @param {boolean=true}  options.isDev           - 模式
 * @param {boolean=true}  options.needLogPage   - 需要日志页面
 *{isDev = true, needLogPage = true}
 * */
class Log {
  constructor (Vue, options) {
    this._isLogPageInit = false; // 是否初始化了log页面
    this._LogConstructor = null; // log页面的构造器
    this._logPageInstance = null; // log页面的实例
    this._dev = !!options.isDev;
    this._history = [];// 日志记录数组

    if (!!options.needLogPage) {
      this.initLogPage(Vue);
    }
  }

  // -------- interface --------

  /**
   * 只有需要页面才初始化
   * */
  initLogPage (Vue) {
    if (!this._logPageInstance || !this._isLogPageInit) {
      this._isLogPageInit = true;
      this._LogConstructor = Vue.extend(require('./log.vue'));
      this._logPageInstance = new this._LogConstructor({
        el: document.body.appendChild(document.createElement('div'))
      });
    } else {
      return this._logPageInstance
    }
  }

  /**
   * 打开日志记录信息页面
   * */
  open () {
    !!LogConstructor && LogConstructor.prototype.close()
  }

  /**
   * 关闭日志记录信息页面
   * */
  close () {
    !!LogConstructor && LogConstructor.prototype.close()
  }

  // -------- normal logs --------
  /**
   * 记录类型为log的日志
   * @param {any} msg - 传入的记录信息
   * */
  log (msg) {
    return this._recordTypeAssemble('log', msg)
  }

  /**
   * 记录类型为debug的日志
   * @param {any} msg - 传入的记录信息
   * */
  debug (msg) {
    return this._recordTypeAssemble('debug', msg)
  }

  // -------- abnormal logs --------

  /**
   * 记录类型为error的日志
   * @param {any} msg - 传入的记录信息
   * */
  error (msg) {
    return this._recordTypeAssemble('error', msg)
  }

  /**
   * 记录类型为warn的日志
   * @param {any} msg - 传入的记录信息
   * */
  warn (msg) {
    return this._recordTypeAssemble('warn', msg)
  }

  /**
   * 断言
   * @param {boolean} isFalse - 如果错误
   * @param {any}     msg     - 传入的记录信息
   * */
  assert (isFalse, msg) {
    if (isFalse) {
      return this._recordTypeAssemble('assert', msg)
    }

  }

  // -------- logs history --------

  /**
   * 实例内部处理
   * */
  clean () {
    this._history = [];
  }

  /**
   * 立即发送
   * data + 待发送的信息
   * @param {object=} data - 发送的错误信息
   * */
  send (data) {

  }

  /**
   * 获取当前全部的log记录
   * @return {array}
   * */
  getHistory () {

  }

  // -------- private --------

  /**
   * @private
   * 记录类型组装
   * @param {string} type - 记录类型
   * @param {any} message - 记录信息
   * @param {string} name - 错误类型
   * */
  _recordTypeAssemble (type, message, name) {
    let _str = this._msgToString(message);
    !!_str && this._storeRecord({
      message: _str,                // The error message
      count: 1,                     // the same message count
      type: type,                   // 记录类型
      name: name,                   // 错误类型名称
      time: (new Date()).getTime(), // record time
      script: '',                    // The script file the error occured in
      stack: '',                      // Stack trace (as a string)
      line: '',                      // The line number the error occured on
    });

    if (this._dev && typeof window.console !== 'undefined') {
      window.console[type](_str)
    }

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
      msg = JSON.stringify(msg);
    }

    if (typeof msg !== 'string') {
      msg = msg.toString();
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
    let _len = this._history.length;
    if (_len > 0) {
      let _lastRecord = this._history.pop();
      if (_lastRecord.type === record.type && _lastRecord.message === record.message) {
        _lastRecord.time = record.time;
        _lastRecord.count++;
        this._history.push(_lastRecord)
      } else {
        this._history.push(_lastRecord)
        this._history.push(record)
      }
    } else {
      this._history.push(record)
    }

    !!this._logPageInstance && this._logPageInstance.setRecordList(this._history)
  }
}


// Normalize Error objects across all browsers into something semi-standard.
// Not all properties are will be available, but if they are, they'll at
// least have a predictable property name.
function normalizeError(err) {
  var o = {
    line: err.lineNumber || err.line,
    message: err.message,
    type: 'error',
    name: err.name,
    script: err.fileName || err.sourceURL,
    stack: err.stackTrace || err.stack
  };

  // Chrome doesn't provide script/line # properties in Error objects, and
  // only reports the script/line # of where an error was last rethrown (as
  // opposed to the original throw point).  So we scrape the stack trace to
  // get that info
  if (!!window.chrome && err.stack &&
    /(\w{3,5}:\/\/[^:]+):(\d+)/.test(err.stack)) {
    o.script = RegExp.$1;
    o.line = RegExp.$2;
  }

  // Clear out undefined properties
  for (var k in o) {
    if (o[k] === null || o[k] === undefined) {
      delete o[k];
    }
  }
  return o;
}
