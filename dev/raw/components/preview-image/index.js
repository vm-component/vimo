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
  return Modal.present({
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