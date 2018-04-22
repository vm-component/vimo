export { default } from './refresher.vue'
/**
 * @component Refresher
 * @description
 *
 * ## 数据加载 / Refresher下拉刷新组件
 *
 * ### 说明
 *
 * Refresher组件是在Content组件下使用, 并提供了下拉刷新的功能. 使用前需要将Refresher组件放在Content组件内所有内容的前面, 并加上`slot="refresher"`属性. 如果Refresher组件使用完毕希望禁用, 请使用`enabled`属性, 而不是使用`v-if`指令.
 *
 * ### 事件
 *
 * 事件传递组件的this, 可用的两个方法为: complete/cancel. 当然可以使用ref获取组件的实例
 *
 * ### 注意
 *
 * 目前这个组件只适合在原生滚动下使用, 当使用js滚动时会异常
 *
 * ### 关于指示器RefresherContent
 *
 * 这个组件是可以定制化的
 *
 * @props {Number} [closeDuration=280] - 回复到 inactive 状态的动画时间
 * @props {Boolean} [enabled=true] - 组件是否可用
 * @props {Number} [pullMax=200] - 下拉的最大值, 超过则直接进入 refreshing状态
 * @props {Number} [pullMin=70] - 下拉进入refreshing状态的最小值
 * @props {Number} [snapbackDuration=280] - 回复到 refreshing 状态的动画时间
 *
 * @fires component:Refresher#onRefresh - 进入 refreshing 状态时触发, 事件传递组件的this
 * @fires component:Refresher#onPull - 下拉并且看到了refresher, 事件传递组件的this
 * @fires component:Refresher#onStart - 开始下拉的事件, 事件传递组件的this
 *
 * @slot 空 - 指示器RefresherContent组件的插槽
 *
 * @demo #/refresher
 * @see component:Content
 * @usage
 * <Page>
 *    <Header>
 *        <Navbar>
 *            <Title>Refresher</Title>
 *        </Navbar>
 *    </Header>
 *    <Content>
 *        <Refresher slot="refresher" @onRefresh="doRefresh($event)" @onPull="doPulling($event)">
 *            <RefresherContent pullingText="下拉刷新..." refreshingText="正在刷新..."></RefresherContent>
 *            </Refresher>
 *        <List>
 *            <Item v-for="i in list">{{i}}</Item>
 *        </List>
 *    </Content>
 * </Page>
 *
 *
 * // ...
 *
 * methods: {
   *    doRefresh(ins){
   *      let _start = this.i;
   *      setTimeout(() => {
   *        for (; (10 + _start) > this.i; this.i++) {
   *          this.list.unshift(`item - ${this.i}`)
   *        }
   *        // 当前异步完成
   *        ins.complete();
   *        console.debug('onInfinite-complete')
   *      }, 500)
   *    },
   *  },
 * */
