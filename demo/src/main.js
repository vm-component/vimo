import 'ionicons/dist/css/ionicons.css'
import Vue from 'vue'
import Root from './Root.vue'
import router from './router'
import register from './register'
import config from './config'

Vue.config.productionTip = false;

register();

new Vue({
  config,
  router,
  render: h => h(Root)
}).$mount('#app')
