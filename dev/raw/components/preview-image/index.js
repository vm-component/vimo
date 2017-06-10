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
 * @params {Number} current - 当前index
 * @params {Array} urls - 图片链接
 *
 * */
import { Modal } from '../modal'
import PreviewImageComponent from './preview-image.vue'
export function PreviewImage (options) {
  if (window.VM.platform.is('alipay')) {
    // alipay环境使用壳子方法
    window.ap && window.ap.previewImage({
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