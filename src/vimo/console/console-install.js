/**
 * Created by Hsiang on 2017/3/6.
 *    // 使用日志服务
 *
 *    angular的$log服务, 打印出来的信息不包含发出信息的原始位置
 *
 *    API:
 *    $log.info(string)
 *    $log.warn(string)
 *    $log.error(string)
 *    $log.log(string)
 *    $log.debug(string)
 *    $log.assert(true)
 *
 *
 *
 *
 *
 *
 *
 App.controller('DemoController', ['$log', function ($log) {

            $log.info('普通信息');

            $log.warn('警告信息');

            $log.error('错误信息');

            $log.log('打印信息');

            $log.debug('调试信息');

        }]);
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
  _logs = []; // 日志记录数组

  constructor(options){

  }

  /**
   * log
   * */
  log(){

  }


  /**
   * 实例内部处理
   * */
  clear(){

  }


}
