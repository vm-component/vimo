<template>
    <div :class="[{'item-collapse-open':isActive},collapseClass]" class="item-collapse">
        <div :class="[itemClass,colorClass]"
             class="ion-item item-block" @click="onPointerDownHandler">
            <slot name="item-start"></slot>
            <div class="item-inner">
                <div class="input-wrapper" v-if="title">
                    {{title}}
                </div>
                <div class="input-wrapper" v-else>
                    <slot name="item-title"></slot>
                </div>
                <div class="item-arrow"></div>
                <slot name="item-end"></slot>
            </div>
        </div>
        <transition @before-enter="beforeEnter"
                    @enter="enter"
                    @before-leave="beforeLeave"
                    @leave="leave">
            <div class="item-collapse-inner" v-show="isActive" ref="itemCollapseInner">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<style lang="scss">
    @import "item-collapse";
    @import "item-collapse.ios";
    @import "item-collapse.md";
</style>
<script type="text/javascript">
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
   * @slot item-start - 这部分继承Item组件
   * @slot item-end - 这部分继承Item组件
   *
   * @usage
   * <vm-list>
   *    <vm-list-header>手风琴列表(只开启一个)</vm-list-header>
   *    <vm-item-collapse-group accordion>
   *        <vm-item-collapse title="This Is Title1">
   *            <vm-item>subItem1</vm-item>
   *            <vm-item>subItem2</vm-item>
   *            <vm-item>subItem3</vm-item>
   *        </vm-item-collapse>
   *        <vm-item-collapse>
   *            <template slot="item-title">
   *                This Is Title2 &ensp;
   *                <vm-icon name="information-circle"></vm-icon>
   *            </template>
   *            <vm-item detail-push>subItem1</vm-item>
   *            <vm-item detail-push>subItem2</vm-item>
   *            <vm-item detail-push>subItem3</vm-item>
   *        </vm-item-collapse>
   *        <vm-item-collapse title="This Is Title3">
   *            <vm-item detail-push>subItem1</vm-item>
   *            <vm-item detail-push>subItem2</vm-item>
   *            <vm-item detail-push>subItem3</vm-item>
   *        </vm-item-collapse>
   *    </vm-item-collapse-group>
   * </vm-list>
   *
   * @demo #/collapseList
   * */
  import addItemAttr from '../../util/addItemAttr.js'
  import { getSize } from './styleTools'

  export default {
    name: 'vm-item-collapse',
    data () {
      return {
        enable: true,               // 是否能点击
        isInit: false,              // 是否初始化
        itemGroupComponent: null,   // 父组件ItemGroup
        isActive: false,            // 当前组件状态
        height: null                // 未展开的内容高度
      }
    },
    computed: {
      itemCollapseInnerElement () {
        return this.$refs.itemCollapseInner
      },
      collapseClass () {
        return `collapse-${this.mode}`
      },
      itemClass () {
        return `item-${this.mode}`
      }
    },
    methods: {
      beforeEnter (el) {
        el.style.opacity = 0
        el.style.height = 0
        this.enable = false
      },
      enter (el, done) {
        window.setTimeout(() => {
          el.style.opacity = 1
          el.style.height = this.height + 'px'
          this.enable = false
          window.setTimeout(() => {
            this.enable = true
            done()
          }, 300)
        }, 16)
      },
      beforeLeave () {
        this.enable = false
      },
      leave (el, done) {
        window.setTimeout(() => {
          el.style.opacity = 0
          el.style.height = 0
          this.enable = false
          window.setTimeout(() => {
            this.enable = true
            done()
          }, 300)
        }, 16)
      },

      /**
       * 点击时
       * */
      onPointerDownHandler () {
        this.enable && this.itemGroupComponent.onItemCollapseChange(this._uid)
      }
    },
    created () {
      if (this.$parent && this.$parent.$options.name.toLowerCase() === 'vm-item-collapse-group') {
        this.itemGroupComponent = this.$parent
        this.itemGroupComponent.recordItemCollapse(this)
      }
    },
    mounted () {
      this.height = getSize(this.itemCollapseInnerElement).height
      this.isInit = true

      // 为slot="item-start"/slot="item-end"的沟槽设定属性
      if (this.$slots['item-start']) {
        this.$slots['item-start'].forEach(function (item) {
          item.elm.setAttribute('item-start', '')
        })
      }
      if (this.$slots['item-end']) {
        this.$slots['item-end'].forEach(function (item) {
          item.elm.setAttribute('item-end', '')
        })
      }    }
  }

  function parentNodeIs (node, name = '') {
    return node && this.$parent && this.$parent.$options.name.toLowerCase() === name.toLowerCase()
  }
</script>
