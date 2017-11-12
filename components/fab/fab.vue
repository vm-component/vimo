<template>
    <div class="ion-fab" :style="styleObj">
        <slot></slot>
    </div>
</template>
<style lang="less">
    @import "./fab.less";
    @import "./fab.ios.less";
    @import "./fab.md.less";
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
   * import { Fab, FabButton, FabList } from 'vimo/lib/fab'
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
   * @props {Boolean} [top] - 设置放置位置
   * @props {Boolean} [bottom] - 设置放置位置
   * @props {Boolean} [left] - 设置放置位置
   * @props {Boolean} [right] - 设置放置位置
   * @props {Boolean} [middle] - 设置放置位置
   * @props {Boolean} [center] - 设置放置位置
   * @props {Boolean} [edge] - 设置放置位置, 放在Header/Footer组件与Content组件交界处
   * @props {Boolean} [fabContentMargin=10] - 靠边的距离, 默认是1opx
   *
   *
   * @demo #/fab
   * */

  import { parsePxUnit } from '../util/util'

  export default {
    name: 'Fab',
    data () {
      return {
        listsActive: false,             // 组件开闭状态
        fabListComponents: [],           // FabList 组件
        styleObj: {}
      }
    },
    props: {
      top: Boolean,
      bottom: Boolean,
      left: Boolean,
      right: Boolean,
      middle: Boolean,
      center: Boolean,
      edge: Boolean,
      fabContentMargin: {
        type: Number,
        default: 10
      }
    },
    inject: ['contentComponent'],
    provide () {
      let _this = this
      return {
        fabComponent: _this
      }
    },
    methods: {
      /**
       * @private
       */
      $_toggleList () {
        this.$app && this.$app.setEnabled(false, 300)
        this.$_setActiveLists(!this.listsActive)
      },

      /**
       * @param {Boolean} isActive
       * @private
       */
      $_setActiveLists (isActive) {
        if (isActive === this.listsActive) {
          return
        }
        for (let list of this.fabListComponents) {
          list.$_setVisible(isActive)
        }
        this.listsActive = isActive
      },

      /**
       * 尺寸计算
       * @private
       * */
      $_setPosition () {
        let fabContentMargin = this.fabContentMargin
        let fabSize = parsePxUnit(window.getComputedStyle(this.$el).height)
        let style = {}

        if (this.top) {
          style.top = `${this.contentComponent.headerBarHeight + fabContentMargin}px`
          if (this.edge) {
            style.top = `${this.contentComponent.headerBarHeight - fabSize / 2}px`
          }
        }

        if (this.bottom) {
          style.bottom = `${fabContentMargin}px`
          if (this.edge) {
            style.bottom = `${-fabSize / 2}px`
          }
        }

        if (this.left) {
          style.left = `${fabContentMargin}px`
        }

        if (this.right) {
          style.right = `${fabContentMargin}px`
        }

        if (this.center) {
          style.left = '50%'
          style.marginLeft = `${-fabSize / 2}px`
        }

        if (this.middle) {
          style.top = '50%'
          style.marginLeft = `${-fabSize / 2}px`
        }

        return style
      },

      /**
       * @function close
       * @description
       * 关闭组件, 通过ref获组件示例. 一般点击主按钮关闭组件
       * */
      close () {
        this.$_setActiveLists(false)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.styleObj = this.$_setPosition()
      })
    }
  }
</script>
