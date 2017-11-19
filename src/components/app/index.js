import App from './app.vue'

/* istanbul ignore next */
App.install = function (Vue) {
  Vue.component(App.name, App)
}

export default App
