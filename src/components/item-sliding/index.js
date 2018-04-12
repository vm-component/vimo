export { default } from './item-sliding.vue'
/**
 * @component Item/ItemSliding
 * @description
 *
 * ## 列表组件 / ItemSliding滑动选择组件
 *
 * 这个组件是对Item组件的拓展, 当左右滑动时出现可选择的按钮, 这个组件在部分安卓机上卡顿明显, 使用起来效果不太好, 但是在IOS上很流畅.
 *
 *
 * ### 子组件ItemSlidingOptions
 *
 * ItemSlidingOptions只能在ItemSliding组件中使用
 *
 * ### 如何使用
 *
 * ```
 * // 引入
 * import { ItemSlidingOptions, ItemSliding } from 'vimo'
 * // 安装
 * export default{
   *   components: { ItemSlidingOptions, ItemSliding }
   * }
 * ```
 *
 *
 * @props {Boolean} disabled - 是否禁用
 *
 * @fires component:ItemSliding#onDrag
 * @fires component:ItemSliding#onSwipe
 * @fires component:ItemSliding#onSwipeRight
 * @fires component:ItemSliding#onSwipeLeft
 *
 * @demo #/slidingList
 * @see component:ItemOptions
 *
 * @usage
 *
 * <ItemSliding>
 *    <Item>
 *        <Avatar slot="item-left">
 *            <img src="./img/avatar-ts-woody.png">
 *        </Avatar>
 *        <Label>
 *            <h2>两边都有按钮</h2>
 *            <p>试试 ↔️️ 都滑动</p>
 *        </Label>
 *    </Item>
 *    <ItemSlidingOptions side="left">
 *        <Button color="primary" @click="clickText">
 *            <Icon name="text"></Icon>
 *            <span>Text</span>
 *        </Button>
 *        <Button color="secondary" @click="clickCall">
 *            <Icon name="call"></Icon>
 *            <span>Call</span>
 *        </Button>
 *     </ItemSlidingOptions>
 *     <ItemSlidingOptions side="right">
 *        <Button color="primary" @click="clickEmail">
 *            <Icon name="mail"></Icon>
 *            <span>Email</span>
 *        </Button>
 *    </ItemSlidingOptions>
 * </ItemSliding>
 * */
