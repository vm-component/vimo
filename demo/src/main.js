import 'ionicons/dist/css/ionicons.css'
import Vue from 'vue'
import Root from './Root.vue'
import router from './router'
import register from './register'
import appConfig from './config'
import appPlatform from './platform'
import Install from 'vimo/components/install.js'
import VueI18n from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

const i18n = new VueI18n({
  locale: 'ja', // set locale
  messages: messages // set locale messages
})

Vue.config.productionTip = false

Vue.use(Install, {
  custConf: appConfig,
  pltConf: appPlatform
})

register()

new Vue({
  i18n,
  router,
  render: h => h(Root)
}).$mount('#app')
