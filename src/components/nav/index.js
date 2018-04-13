export { default } from './nav.vue'
/**
 * @component Nav
 * @description
 *
 * ## 基础组件 / Nav组件
 *
 * 这里是Page组件的父容器, 而且转场动画也是在这里执行.
 *
 * ### 页面切换是否需要Indicator的问题
 *
 * 添加这个功能是因为在有些使用情况下, 跳转加载大页面时会有很长时间的空白无交互期, 因此加上Indicator给用户提示正在下载将要去的页面的资源, 这个默认不开启.
 *
 * @props {Boolean} [showIndicatorWhenPageChange=false] - 页面切换是否显示Indicator
 *
 * */
