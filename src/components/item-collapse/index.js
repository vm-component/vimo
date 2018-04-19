export { default } from './item-collapse.vue'
/**
 * @component Item/ItemCollapse
 * @description
 *
 * ## 列表组件 / ItemCollapse可伸缩Item组件
 *
 * 如果在属性中没有传入title, 则需要在`slot=item-title`中传出title结构. 手风琴模式需要在`ItemGroup`中定义`accordion`属性
 *
 * @props {String} title - 显示的名称
 * @props {String} [mode='ios'] - 显示的名称
 *
 * @slot 空 - 这部分将放置在伸缩盒子中
 * @slot item-title - 对属性title的拓展, 如果包含复杂的显示结构, 比如增加了ICON
 * @slot item-left - 这部分继承Item组件
 * @slot item-right - 这部分继承Item组件
 *
 * @usage
 * <List>
 *    <ListHeader>手风琴列表(只开启一个)</ListHeader>
 *    <ItemCollapseGroup accordion>
 *        <ItemCollapse title="This Is Title1">
 *            <Item>subItem1</Item>
 *            <Item>subItem2</Item>
 *            <Item>subItem3</Item>
 *        </ItemCollapse>
 *        <ItemCollapse>
 *            <template slot="item-title">
 *                This Is Title2 &ensp;
 *                <Icon name="information-circle"></Icon>
 *            </template>
 *            <Item detail-push>subItem1</Item>
 *            <Item detail-push>subItem2</Item>
 *            <Item detail-push>subItem3</Item>
 *        </ItemCollapse>
 *        <ItemCollapse title="This Is Title3">
 *            <Item detail-push>subItem1</Item>
 *            <Item detail-push>subItem2</Item>
 *            <Item detail-push>subItem3</Item>
 *        </ItemCollapse>
 *    </ItemCollapseGroup>
 * </List>
 *
 * @demo #/collapseList
 * */
