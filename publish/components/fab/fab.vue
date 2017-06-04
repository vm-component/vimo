<template>
    <div class="ion-fab"
         :top="top"
         :bottom="bottom"
         :left="left"
         :right="right"
         :middle="middle"
         :center="center"
         :edge="edge">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "./fab.scss";
    @import "./fab.ios.scss";
    @import "./fab.md.scss";
</style>
<script type="text/javascript">
  /**
   * @component Fab
   * @description
   *
   * ## 浮层组件 / FAB浮动按钮组件
   *
   * ### 简介
   *
   * FAB是Floating Action Buttons的缩写, 表示浮动按钮组件, 点击主按钮展开附属按钮用于选择操作. FAB组件悬浮在Content组件之上, 不随着内容滚动而变动位置.
   *
   * ### 组件关闭
   *
   * 组件关闭需要自己手动执行, 页面切换对关闭不起作用(只有弹出层对 popstate 有动作)
   *
   * ### 其他
   *
   * FAB可在四个方向展开, 此外, FAB可以放置在6中不同位置. 详情参考Demo. 另外, 为了保证组件悬浮在Content组件之上, `slot="fixed"` 属性不要忘记添加.
   *
   * ### 如何引入
   * ```
   * // 引入
   * import { Fab, FabButton, FabList } from 'vimo/components/fab'
   * // 安装
   * Vue.component(Fab.name, Fab)
   * Vue.component(FabButton.name, FabButton)
   * Vue.component(FabList.name, FabList)
   * // 或者
   * export default{
   *   components: {
   *     Fab, FabButton, FabList
   *  }
   * }
   * ```
   *
   * @usage
   * <Fab slot="fixed" bottom right ref="fab5">
   *    <FabButton color="dark">
   *        <Icon name="arrow-dropleft"></Icon>
   *    </FabButton>
   *    <FabList side="left">
   *        <FabButton @click="clickHandler('facebook')" color="danger">
   *            <Icon name="logo-facebook"></Icon>
   *        </FabButton>
   *        <FabButton @click="clickHandler('googleplus')" color="secondary">
   *            <Icon name="logo-googleplus"></Icon>
   *        </FabButton>
   *        <FabButton @click="clickHandler('twitter')" color="dark">
   *            <Icon name="logo-twitter"></Icon>
   *        </FabButton>
   *        <FabButton @click="clickHandler('vimeo')" color="primary">
   *            <Icon name="logo-vimeo"></Icon>
   *        </FabButton>
   *    </FabList>
   * </Fab>
   *
   *
   * @props {Boolean} top - 设置放置位置
   * @props {Boolean} bottom - 设置放置位置
   * @props {Boolean} left - 设置放置位置
   * @props {Boolean} right - 设置放置位置
   * @props {Boolean} middle - 设置放置位置
   * @props {Boolean} center - 设置放置位置
   * @props {Boolean} edge - 设置放置位置, 放在Header/Footer组件与Content组件交界处
   *
   *
   * @demo https://dtfe.github.io/vimo-demo/#/fab
   * */
  export default{
    name: 'Fab',
    data () {
      return {
        listsActive: false,             // 组件开闭状态
        mainFabButtonComponent: null,   // FAB的主要FabButton组件, 这个必须有
        fabListComponents: []           // FabList 组件
      }
    },
    props: {
      top: Boolean,
      bottom: Boolean,
      left: Boolean,
      right: Boolean,
      middle: Boolean,
      center: Boolean,
      edge: Boolean
    },
    methods: {

      /**
       * 主按钮点击后
       * @private
       * */
      clickHandler (ev) {
        if (this.canActivateList(ev)) {
          this.toggleList()
        }
      },

      /**
       * 主按钮点击后
       * @param {*} ev
       * @return {Boolean}
       * @private
       * */
      canActivateList (ev) {
        if (this.fabListComponents.length > 0 && this.mainFabButtonComponent && ev.target) {
          let ele = ev.target.closest('.ion-fab>[ion-fab]')
          return (ele && ele === this.mainFabButtonComponent.$el)
        }
        return false
      },

      /**
       * @private
       */
      toggleList () {
        this.setActiveLists(!this.listsActive)
      },

      /**
       * @param {Boolean} isActive
       * @private
       */
      setActiveLists (isActive) {
        if (isActive === this.listsActive) {
          return
        }
        for (let list of this.fabListComponents) {
          list.setVisible(isActive)
        }
        this.mainFabButtonComponent.setActiveClose(isActive)
        this.listsActive = isActive
      },

      // ------ public ------
      /**
       * @function close
       * @description
       * 关闭组件, 通过ref获组件示例. 一般点击主按钮关闭组件
       * */
      close () {
        this.setActiveLists(false)
      }
    },
    mounted () {
      this.$children.forEach((child) => {
        if (child.$options._componentTag.toLowerCase() === 'fabbutton') {
          this.mainFabButtonComponent = child
        }

        if (child.$options._componentTag.toLowerCase() === 'fablist') {
          this.fabListComponents.push(child)
        }
      })

      if (!this.mainFabButtonComponent || this.fabListComponents.length === 0) {
        console.error('The Fab component need at least one BabButton component and FabList component, please check!')
        return
      }

      // 给主按钮绑定click事件
      this.mainFabButtonComponent.$el.addEventListener('click', this.clickHandler.bind(this))
    }
  }
</script>
