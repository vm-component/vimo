import * as components from './components'
import * as services from './services'

import core from './core.js'
import { vueUse } from './util/plugins'

const VuePlugin = {
  // init: core,

  install: function (Vue, options = {}) {
    if (Vue._vimo_installed) {
      return
    }

    core(Vue, options)

    // Register component plugins
    for (let component in components) {
      if (component === 'install' || component === 'core') { continue }
      Vue.use(components[component])
    }

    // Register service plugins
    for (let plugin in services) {
      Vue.use(services[plugin])
    }

    var ENV = process.env.NODE_ENV
    if (ENV && ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
      console.warn('You are using a whole package of vimo, ' + 'please read docs https://nostaff.github.io/vimo/ to reduce app bundle size.')
    }

    Vue._vimo_installed = true
  }
}

// 通过script脚本使用, 资源全部打包, 不推荐
vueUse(VuePlugin)

components.install = VuePlugin.install
components.core = core

export default components
