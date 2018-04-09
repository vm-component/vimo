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
