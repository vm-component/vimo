export { default } from './searchbar.vue'
/**
 * @component Searchbar
 * @description
 * 搜索条
 *
 * ## 表单组件 / SearchBar搜索条组件
 *
 * 搜索组件, 一般是放在Header组件的Toolbar组件中, 当然也可以放置在任何位置
 *
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Searchbar } from 'vimo'
 * // 安装
 * Vue.component(Searchbar.name, Searchbar)
 * // 或者
 * export default{
   *   components: {
   *    Searchbar
   *  }
   * }
 * ```
 *
 * @props {String} [color]                        - 颜色
 * @props {String} [mode='ios']                   - 模式
 * @props {String} [cancelButtonText='Cancel']    - 取消按钮的文本
 * @props {Boolean} [showCancelButton=false]      - 是否显示cancelButton(只在focus状态才显示cancelBtn, 且cancelBtn只对组件作用, 如果要赋予业务能力, 请在右侧自己实现cancelBtn)
 * @props {Number} [debounce=0]                   - 等待多久触发onInput事件
 * @props {String} [placeholder='Search']         - 设置placeholder的值.
 * @props {String} [autocomplete]                 - 自动完成
 * @props {String} [autocorrect]                  - 自动纠错
 * @props {String|Boolean} [autofocus]            - 如果是boolean类型, 则立即判断, 如果是Number, 则等待dom完毕定时后自动focus
 * @props {Boolean} [spellcheck]                  - 拼写检查
 * @props {String} [type='search']                - 设置input配型, 可以是: "text", "password", "email", "number", "search", "tel", "url".
 * @props {Boolean} [animated=false]              - 是否启动点击动画
 *
 *
 * @fires component:Searchbar#onInput
 * @fires component:Searchbar#onFocus
 * @fires component:Searchbar#onBlur
 * @fires component:Searchbar#onClear
 * @fires component:Searchbar#onCancel
 *
 *
 * @demo #/searchbar
 *
 * @usage
 * <template>
 *    <Page>
 *    <Header>
 *        <Navbar>
 *            <Title>Searchbar</Title>
 *        </Navbar>
 *        <Toolbar>
 *            <Searchbar :animated="true"
 *                placeholder="Search"
 *                :debounce="0"
 *                v-model="myInput"
 *                :showCancelButton="true"
 *                cancelButtonText="取消"
 *                @onInput="onInput"
 *                @onFocus="onFocus"
 *                @onBlur="onBlur"
 *                @onCancel="onCancel"
 *                @onClear="onClear"></Searchbar>
 *         </Toolbar>
 *     </Header>
 *    <Content padding>
 *        <p>Search debounce: 100</p>
 *        <p>Search Value: {{myInput}}</p>
 *    </Content>
 *    </Page>
 * </template>
 * */
