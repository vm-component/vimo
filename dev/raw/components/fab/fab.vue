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
   *
   * @component Fab
   * @description
   *
   * ## 其他 / 浮动按钮组件(FAB)
   *
   * @props {Boolean} top - Places the container on the top of the content
   * @props {Boolean} bottom - Places the container on the bottom of the content
   * @props {Boolean} left - Places the container on the left
   * @props {Boolean} right - Places the container on the right
   * @props {Boolean} middle - Places the container on the middle vertically
   * @props {Boolean} center - Places the container on the center horizontally
   * @props {Boolean} edge - Used to place the container between the content and the header/footer
   *
   * */
  import { registerListener } from '../../util/util'
  export default{
    name: 'Fab',
    data () {
      return {
        unreg: null,                    // 页面切换则关闭组件的计时器
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

      /**
       * 页面切换关闭组件
       * @private
       * */
      dismissOnPageChangeHandler () {
        this.setActiveLists(false)
        this.unreg && this.unreg()
      },

      // ------ public ------
      /**
       *
       * */
      close () {
        this.setActiveLists(false)
      }
    },
    created () {
      this.unreg = registerListener(window, 'popstate', this.dismissOnPageChangeHandler, {capture: false})
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

    },
    activated () {},
    components: {}
  }
</script>
