/**
 * Created by Hsiang on 2017/3/2.
 *
 * @name 获取地理位置信息
 * @description
 *
 * IOS10系统在http模式下无法使用HTML5 Geolocation API 获得用户的地理位置
 * 故需要一个能在http/https环境下都能获取用户位置的工具
 *
 * 参考的项目: https://github.com/zyf394/geo-for-http
 *
 * 设计概要:
 * 1. geolocation-registry.js传入配置信息
 * 2. 第一次getCurrentPosition时, 从配置信息初始化mapType对应的配置, 第二次则就不必初始化(懒加载)
 * 3. http模式下, ios10不能使用h5模式获取地理位置, 给出console.error提示
 * 4. 默认使用ali的模式(高德)
 *
 * 5. 有更好的建议可继续添加
 */
 import geo from './geo'

class Geolocation {

  /**
   * @private
   * */
  _registerList = []; // 已经注册的列表

  constructor (config) {
    /**
     * 完成初始化工作
     * type为参数配置
     * */
    //this._register(type);

  }

  /**
   * 获取当前的地理位置信息
   * getCurrentPosition(mapType, options)
   * @param {string} mapType - 地图类型
   * @param {object} options - 参数
   * @return {promise}
   * */
  getCurrentPosition (mapType, options) {
    if (this._registerList.indexOf(mapType) === -1) {
      this._register(mapType);
      //  ...
    } else {
      //  ...
    }
    return new Promise((resolve) => {})
  }

  /**
   * config注册
   * */
  _register (type) {
    this._getScript();
  }

  /**
   * 获取script脚本
   * */
  _getScript (mapJsUrl) {

  }
}

module.exports = Geolocation;