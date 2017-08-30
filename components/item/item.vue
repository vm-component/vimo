<script type="text/javascript">
  /**
   * @component Item
   * @description
   *
   * ## 列表组件 / Item
   *
   * Item组件是List组件的子组件, 两者配合使用.
   *
   * ### 关于其余组件
   *
   * 列表组件中的每一个Item将在这里定义, 其中包括**Item/ListHeader/ItemGroup/ItemDivider**等, 他们的使用方式基本一样, 这里统一说明.
   *
   *
   * ### ItemDivider组件
   *
   * 加 `[sticky]` 属性可实现吸顶效果
   *
   * ### 如何使用
   *
   * ### Item组件
   *
   * - 加 `[no-lines]` 属性可去除边框
   * - 在item中的Icon上加属性`[large],[small]`可控制大小
   *
   * ### 关于跳转
   *
   * item组件将使用v-router的router-link组件中的部分同名方法, 并执行对应的跳转
   *
   * - props: to/append/replace
   *
   * ```
   * // 引入
   * import { List } from 'vimo/lib/list'
   * import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/lib/item'
   * // 安装
   * Vue.component(List.name, List)
   * Vue.component(ListHeader.name, ListHeader)
   * Vue.component(ItemGroup.name, ItemGroup)
   * Vue.component(Item.name, Item)
   * Vue.component(ItemSliding.name, ItemSliding)
   * Vue.component(ItemOptions.name, ItemOptions)
   * Vue.component(ItemDivider.name, ItemDivider)
   * // 或者
   * export default{
   *   components: {
   *    List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider
   *  }
   * }
   * ```
   *
   * @props {String} [mode='ios'] - 模式
   * @props {String} [color] - 颜色
   * @props {any} [to] - 路由, 这部分用法请参开vue-router, 这里是对其移植
   * @props {Boolean} [append] - 路由是否append
   * @props {Boolean} [replace] - 路由进行方式, 默认为push
   *
   *
   *
   * @slot 空 - 放置在中间, 默认位置
   * @slot item-left - 放置在左边
   * @slot item-right - 放置在左边
   *
   * @demo #/list
   * @see component:List
   * @see http://router.vuejs.org/zh-cn/index.html
   *
   * */
  import ItemMixin from './itemMixin.vue'

  export default {
    mixins: [ItemMixin],
    name: 'Item',
    data () {
      return {
        itemTypeName: 'item'
      }
    },
    computed: {
      listHeaderClass () {
        return `item-block`
      }
    }
  }
</script>
