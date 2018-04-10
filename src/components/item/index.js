export { default } from './item.vue';
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
 * ### 如何引入
 *
 * ```
 * // 引入
 * import { List, ListHeader, ItemGroup, Item, ItemDivider } from 'vimo'
 * // 安装
 * Vue.component(List.name, List)
 * Vue.component(ListHeader.name, ListHeader)
 * Vue.component(ItemGroup.name, ItemGroup)
 * Vue.component(Item.name, Item)
 * Vue.component(ItemDivider.name, ItemDivider)
 * // 或者
 * export default{
   *   components: {
   *    List, ListHeader, ItemGroup, Item, ItemDivider
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
 * @slot 空 - 放置在中间, 默认位置
 * @slot item-left - 放置在左边
 * @slot item-right - 放置在左边
 *
 * @demo #/list
 * @see component:List
 * @see http://router.vuejs.org/zh-cn/index.html
 *
 * @usage
 * <List>
 *    <ListHeader>
 *            setting
 *        <Button slot="item-right" clear>
 *            <Icon name="cog"></Icon>
 *        </Button>
 *    </ListHeader>
 *    <ItemGroup>
 *        <Item>
 *            <Icon slot="item-left" color="danger" name="plane"></Icon>
 *            <span>Airplane Mode</span>
 *            <Toggle slot="item-right" @ionChange="toggleChange"
 *                :checked="toggleValue"></Toggle>
 *        </Item>
 *    <Item button>
 *            <Icon slot="item-left" color="primary" name="wifi"></Icon>
 *                Wi-Fi
 *            <Note slot="item-right">The Interwebz</Note>
 *        </Item>
 *        <Item button>
 *            <Icon slot="item-left" color="primary" name="bluetooth"></Icon>
 *                Bluetooth
 *            <Note slot="item-right">Off</Note>
 *        </Item>
 *    </ItemGroup>
 *    <ItemDivider color="primary">
 *        Other Setting
 *        <Button slot="item-right" outline color="light">Clear</Button>
 *    </ItemDivider>
 *    <Item button>
 *            <Icon slot="item-left" color="secondary" name="call"></Icon>
 *            Cellular
 *    </Item>
 *    <Item button>
 *         <Icon slot="item-left" color="secondary" name="link"></Icon>
 *            Personal Hotspot
 *        <Note slot="item-right">Off</Note>
 *    </Item>
 * </List>
 *
 * */
