/**
 * @component LandscapePrompt
 * @description
 *
 * ## 横屏提示组件 / LandscapePrompt组件
 *
 * ### 说明
 *
 * 组件在手机横屏的时候给出提示，提示用户H5需要在竖屏模式浏览。使用CSS的media参数如下：
 *
 * ```
 * min-aspect-ratio: 13 / 9
 * ```
 *
 * */
import landscapePrompt from './landscape-prompt.vue'

export default {
  install (Vue, options = {}) {
    if (this.installed) return
    let LandscapePrompt = Vue.extend(landscapePrompt)
    let el = document.body.appendChild(document.createElement('div'))
    // eslint-disable-next-line no-new
    new LandscapePrompt({el, propsData: options})
    this.installed = true
  }
}
