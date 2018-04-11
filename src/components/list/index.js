export { default } from './list.vue'
/**
 * @component List
 * @description
 *
 * ## 列表组件 / List
 *
 * ### 概述
 * list有多重种风格的样式，有ios/android等等,对应ios/md模式.
 *
 *
 * ### 拓展
 * 此外, List组件也是`radioGroup`的管理域. 因为单选的确定需要一个父集. radio的使用需要开启`radioGroup`. 同时, v-model/事件等才能正常运行. 因为, List组件是radio-group的受体, 当点击radio时, radio向外寻找到这里, 传递v-model信息.
 *
 * ### 如何使用
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
 * @props {string} [mode=ios]        - 样式模式
 * @props {Boolean} [radioGroup=false]  - 是否为radioGroup
 * @props {String} [value]  - 支持v-model
 * @props {Boolean} [disabled=false]  - 当前radio的禁用状态
 *
 * @usage
 * <!--普通使用-->
 * <template>
 *    <Page>
 *        <Header>
 *            <Navbar>
 *                <Title>List</Title>
 *            </Navbar>
 *         </Header>
 *        <Content class="outer-content">
 *            <List>
 *                <!--header-->
 *                <ListHeader>
 *                    <span>Contents</span>
 *                </ListHeader>
 *                <!--group-->
 *                <ItemGroup>
 *                    <Item button to="list.listForAll">ListForAll</Item>
 *                    <Item button :to="{name:'list.basicList'}">BasicList</Item>
 *                    <Item button :to="{name:'list.noLine'}">NoLine</Item>
 *                    <Item button :to="{name:'list.insetList'}">InsetList</Item>
 *                    <Item button :to="{name:'list.listDividers'}">ListDividers</Item>
 *                    <Item button :to="{name:'list.listHeaders'}">listHeaders</Item>
 *                    <Item button :to="{name:'list.iconList'}">IconList</Item>
 *                    <Item button :to="{name:'list.avatarList'}">AvatarList</Item>
 *                    <Item button :to="{name:'list.multi-lineList'}">Multi-lineList</Item>
 *                    <Item button :to="{name:'list.slidingList'}">SlidingList</Item>
 *                    <Item button :to="{name:'list.reorder'}">Reorder</Item>
 *                    <Item button :to="{name:'list.thumbnailList'}">ThumbnailList</Item>
 *                </ItemGroup>
 *            </List>
 *        </Content>
 *    </Page>
 * </template>
 *
 * <!--多列布局(两列三行)-->
 * <List>
 *    <ListHeader>
 *        <span>today</span>
 *    </ListHeader>
 *    <Item>
 *        <Avatar slot="item-left">
 *            <img src="./img/avatar-ts-woody.png">
 *        </Avatar>
 *        <Label>
 *            <h2>Woody</h2>
 *            <h3>Hello world</h3>
 *            <h4>This is third line</h4>
 *            <p>This town ain't big enough for the two of us!</p>
 *        </Label>
 *    </Item>
 *    <Item>
 *        <Avatar slot="item-left">
 *            <img src="./img/avatar-ts-buzz.png">
 *        </Avatar>
 *        <Label>
 *            <h2>Buzz Lightyear</h2>
 *            <h3>Hello world</h3>
 *            <p>My eyeballs could have been sucked from their sockets!</p>
 *        </Label>
 *    </Item>
 * </List>
 *
 * <!--Radio-->
 * <List radio-group v-model="fruits" :disabled="isListDisabled" @onChange="onChangeHandler">
 *    <ListHeader>Fruits</ListHeader>
 *    <Item>
 *        <Label>Apple</Label>
 *        <Radio value="apple" :disabled="isAppleDisabled" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *        <Label>Banana</Label>
 *        <Radio value="banana" color="danger" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *        <Label>Cherry (secondary color)</Label>
 *        <Radio value="cherry" color="secondary" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *        <Label>Disabled</Label>
 *        <Radio value="disabled" :disabled="true" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *        <Label>Default</Label>
 *        <Radio value="default" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 * </List>
 *
 * @fires component:List#onChange
 *
 * @see component:Item
 * @demo #/list
 */
