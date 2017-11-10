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
 * 如果是在支付宝环境，则使用支付宝的组件, 前提是
 *
 * @usage
 *
 * @props {Number} [current=0]     - 当前index
 * @props {Array} [urls]           - 图片链接
 * @props {Array} [isH5=false]     - 是否使用h5组件, false为自动, true为强制使用h5组件(isForceH5)
 *
 * @demo #/preview-image
 * @usage
 * import PreviewImage from 'vimo/lib/preview-image'
 * function openAlbum1 () {
 *    PreviewImage.present({
 *      current: 0,
 *      urls: [
 *        'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
 *        'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
 *        'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
 *      ]
 *    })
 *  }
 * */
import Modal from '../modal/index'
import PreviewImageComponent from './preview-image.vue'

function present (options) {
  let isHandled =
    !options.isH5 &&
    window.VM &&
    window.VM.platform &&
    window.VM.platform.previewImage &&
    window.VM.platform.previewImage(options)
  if (!isHandled) {
    console.debug('PreviewImage 组件使用H5模式!')
    Modal.present({
      component: PreviewImageComponent,
      animateName: 'zoom',
      data: {
        current: options.current || 0,
        urls: options.urls
      },
      showBackdrop: true,
      enableBackdropDismiss: true
    })
  }
}

export default {
  present
}
