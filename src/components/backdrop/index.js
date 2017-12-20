/**
 * @component Backdrop
 * @description
 *
 * ## 其他 / Backdrop背景暗化组件
 *
 * 一般是用来进行背景遮罩的. 比如Alert/Actionsheet组件等用到.
 *
 * @props {Boolean} [enableBackdropDismiss=true] - 是否能点击背景关闭操作, 设置`backdrop-no-tappable` 样式(不重要)
 * @props {Boolean} [isActive=false] - 组件是否激活
 * @props {Function} [bdClick=noop] - 点击背景的处理方式
 * @props {Number} [top=0] - 偏移量
 * @props {Number} [left=0] - 偏移量
 * @props {Boolean} [fixed=false] - 是否设置position：fixed, 防止滚动的时候幕布移动
 *
 * @fires component:Backdrop#onShown
 * @fires component:Backdrop#onHidden
 *
 * @demo #/backdrop
 *
 * @usage
 *
 * import { Backdrop } from 'vimo'
 *
 * <Backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss" :isActive="isActive"></Backdrop>
 * */
export { default } from './backdrop.vue'
