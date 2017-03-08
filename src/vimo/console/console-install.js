/**
 * Created by Hsiang on 2017/3/6.
 *    // 使用日志服务
 *
 *    angular的$log服务, 打印出来的信息不包含发出信息的原始位置
 *
 * 1. 打印记录日志
 *    API:
 *    $console.info(string)
 *    $console.warn(string)
 *    $console.error(string)
 *    $console.log(string)
 *    $console.debug(string)
 *
 *
 * 2. 提供埋点服务
 *    $analysis.clickRegister() // 点击监听注册 data-analysis-id="_id" -> 处理方式
 *    $analysis.scrollRegister() // 滚动监听注册
 *    $analysis.stayRegister() // 停留时间注册
 *    $analysis.systemRegister() // 系统信息/app启动参数/系统
 *
 *    其余通过友盟的u-web完成
 *
 */
module.exports = {
  install (Vue, options) {
    Object.assign(Vue.prototype, {
      $log: new Log(options),
    });
  }
};

/**
 * @name Log
 * @description
 *
 *
 * */
class Log {
  constructor (options) {
    this._logs = [];// 日志记录数组
  }

  /**
   * log
   * */
  log () {

  }





  /**
   * 实例内部处理
   * */
  clear () {

  }

}
