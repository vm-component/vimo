import CardContent from './card-content.vue'
import CardHeader from './card-header.vue'
import CardTitle from './card-title.vue'
import Card from './card.vue'

Card.install = function (Vue) {
  Vue.component(Card.name, Card)
  Vue.component(CardHeader.name, CardHeader)
  Vue.component(CardTitle.name, CardTitle)
  Vue.component(CardContent.name, CardContent)
}
/* istanbul ignore next */
export default Card
