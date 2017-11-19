import InfiniteScroll from './infinite-scroll.vue'
import InfiniteScrollContent from './infinite-scroll-content.vue'

InfiniteScroll.install = function (Vue) {
  Vue.component(InfiniteScroll.name, InfiniteScroll)
  Vue.component(InfiniteScrollContent.name, InfiniteScrollContent)
}

export default InfiniteScroll
