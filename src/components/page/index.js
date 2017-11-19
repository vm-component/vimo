import Page from './page.vue'
import Header from './header.vue'
import Footer from './footer.vue'

Page.install = function (Vue) {
  Vue.component(Page.name, Page)
}

Header.install = function (Vue) {
  Vue.component(Header.name, Header)
}

Footer.install = function (Vue) {
  Vue.component(Footer.name, Footer)
}

export {Page, Header, Footer}
