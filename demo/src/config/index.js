import Config from 'tp-config'
import Vue from 'vue'

const configs = {
  mode: 'ios'
};

const config = new Config(configs);
Vue.prototype.$config = config;
export default config
