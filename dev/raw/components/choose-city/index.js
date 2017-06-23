/**
 * @component ChooseCity
 * @description
 *
 * ## 全国城市选择器 / ChooseCity组件
 *
 * ### 简述
 *
 */
import { Modal } from '../modal'
import cityComponent from './city.vue'
const ChooseCity = {
  present (options) {
    let finnalOptions = {}
    let defaultOptions = {
      showLocatedCity: false,                   // 是否显示当前定位城市，默认 false
      showHotCities: true,                      // 是否显示热门城市，默认 true
      cities: require('./cities.json'),         // 是否显示热门城市，默认 true
      hotCities: require('./hot-cities.json'),  // 是否显示热门城市，默认 true
      mode: 'fade',                             // 模式
      showBackdrop: true,                       // modal 是否显示背景色
      enableBackdropDismiss: true,              // modal 点击背景是否关闭
      isH5: false,                              // 是否强制使用H5模式
      ak: '8d1ba642a3a3046d1ee087e0f8b490a2',   // 如果是H5模式并且开启了'当前定位城市'，则使用高德地图定位，这个是AK
      onDismiss () {}
    }
    Object.assign(finnalOptions, defaultOptions, options)

    let isAlipayReady = window.VM.platform.is('alipay') && window.AlipayJSBridge && !options.isH5
    let isDingTalkReady = window.VM.platform.is('dingtalk') && window.dd && !options.isH5

    if (isAlipayReady) {
      window.ap && window.ap.chooseCity(finnalOptions, finnalOptions.onDismiss)
      return
    }

    Modal.present({
      mode: finnalOptions.mode,
      component: cityComponent,
      data: {
        showLocatedCity: finnalOptions.showLocatedCity,
        showHotCities: finnalOptions.showHotCities,
        hotCities: finnalOptions.hotCities,
        cities: finnalOptions.cities
      },
      showBackdrop: finnalOptions.showBackdrop,
      enableBackdropDismiss: finnalOptions.enableBackdropDismiss,
      onDismiss: finnalOptions.onDismiss
    })
  }
}
export { ChooseCity }