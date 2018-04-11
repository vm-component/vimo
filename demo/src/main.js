import Vue from 'vue'
import Root from './Root.vue'
import router from './router'
import 'ionicons/dist/css/ionicons.css'

import {App, Content, Footer, Header, Nav, Navbar, Page} from 'vimo'

Vue.component(App.name, App)
Vue.component(Nav.name, Nav)
Vue.component(Header.name, Header)
Vue.component(Footer.name, Footer)
Vue.component(Navbar.name, Navbar)
Vue.component(Content.name, Content)
Vue.component(Page.name, Page)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(Root)
}).$mount('#app')
