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
 * @usage
 *
 * @props {Number} [current=0]     - 当前index
 * @props {Array} [urls]           - 图片链接
 * @props {Array} [isH5=false]     - 是否使用h5组件, false为自动, true为强制使用h5组件(isForceH5)
 *
 * @demo https://dtfe.github.io/vimo-demo/#/preview-image
 * @usage
 * import { PreviewImage } from 'vimo/components/preview-image'
 * function openAlbum1 () {
 *    PreviewImage({
 *      current: 0,
 *      urls: [
 *        'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
 *        'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
 *        'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
 *      ]
 *    })
 *  }
 * */
import { Modal } from '../modal/index'
import PreviewImageComponent from './preview-image.vue'

export function PreviewImage (options) {
  let isAlipayReady = !!window.VM && !!window.VM.platform && window.VM.platform.is('alipay') && window.AlipayJSBridge && window.ap && !options.isH5
  let isDingTalkReady = !!window.VM && !!window.VM.platform && window.VM.platform.is('dingtalk') && window.dd && !options.isH5
  let isDtDreamReady = !!window.VM && !!window.VM.platform && window.VM.platform.is('dtdream') && window.dd && !options.isH5
  // alipay模式只能显示完整url路径的图片, 不能显示base64格式的图片
  if (isAlipayReady) {
    // alipay环境使用壳子方法
    console.info('PreviewImage 组件使用Alipay模式!')
    window.ap && window.ap.previewImage({
      current: options.current || 0,
      urls: options.urls
    })
    return
  }

  if (isDingTalkReady) {
    // alipay环境使用壳子方法
    console.info('PreviewImage 组件使用 Dingtalk 模式!')
    window.dd.biz.util.previewImage({
      current: options.urls[options.current] || '',
      urls: options.urls
    })
    return
  }

  if (isDtDreamReady) {
    // alipay环境使用壳子方法
    console.info('PreviewImage 组件使用 DtDream 模式!')
    window.dd.biz.util.previewImage({
      current: options.urls[options.current] || '',
      urls: options.urls
    })
    return
  }

  console.info('PreviewImage 组件使用H5模式!')
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