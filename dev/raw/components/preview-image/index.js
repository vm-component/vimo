/**
 * @component PreviewImage
 * @description
 *
 * ## 图片组件 / PreviewImage组件
 *
 * ### 简介
 *
 * 点击图片显示预览效果
 *
 * ### 其他
 *
 * 如果实在支付宝环境，则使用支付宝的组件
 *
 * @params {Number} [current=0]     - 当前index
 * @params {Array} [urls]           - 图片链接
 * @params {Array} [isH5=false]     - 是否使用h5组件, false为自动, true为强制使用h5组件
 *
 * */
import { Modal } from '../modal'
import PreviewImageComponent from './preview-image.vue'
export function PreviewImage (options) {
  if (window.VM.platform.is('alipay') && window.AlipayJSBridge && !options.isH5) {
    // alipay环境使用壳子方法
    window.ap.previewImage({
      current: options.current || 0,
      urls: options.urls
    })
  } else {
    Modal.present({
      component: PreviewImageComponent,
      mode: 'zoom',
      data: {
        current: options.current || 0,
        urls: options.urls
      },
      showBackdrop: true,
      enableBackdropDismiss: true
    })
  }
}