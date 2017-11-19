import ChooseCity from './chose-city.js'
import { vueUse } from '../../util/plugins'

ChooseCity.install = function (Vue) {
  Vue.prototype.$alert = ChooseCity
}

vueUse(ChooseCity)

export default ChooseCity
