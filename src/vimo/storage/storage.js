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

export class Storage {

  /**
   * @param {string} type - 存储类型
   * @param {string} config - 配置
   * */
  constructor (type, config) {
    /**
     * 完成初始化工作
     * config为参数配置
     * */

  }

  /**
   * 获取
   * @param {string} key -
   * @return {object}
   * */
  getItem (key) {

  }

  setItem (key, value) {

  }

  removeItem (key) {

  }

  clear () {

  }
}

/**
 * 初始化及安装Storage
 * @param {Object} config - 初始化的参数
 * @return {Object} - Storage实例对象
 * */
export function setupStorage (config) {
  // 保持单例对象
  if (!!window['VM'] && !!window['VM']['storage']) {
    return window['VM']['storage']
  } else {
    const sessionStorage = new Storage('sessionStorage', config);
    const localStorage = new Storage('localStorage', config);
    const storage = {sessionStorage, localStorage};
    // 全局注册
    const win = window;
    win['VM'] = win['VM'] || {};
    win['VM']['storage'] = storage;

    return storage;
  }
}
