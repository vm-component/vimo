<template>
    <div :class="[{'item-collapse-open':isActive},collapseClass]" class="item-collapse">
        <div :class="[itemClass,colorClass]"
             class="ion-item item-block" @click="onPointerDownHandler">
            <slot name="item-left"></slot>
            <div class="item-inner">
                <div class="input-wrapper" v-if="title">
                    {{title}}
                </div>
                <div class="input-wrapper" v-else>
                    <slot name="item-title"></slot>
                </div>
                <div class="item-arrow"></div>
                <slot name="item-right"></slot>
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
<style lang="less">
    @import "item-collapse.less";
    @import "item-collapse.ios.less";
    @import "item-collapse.md.less";
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
  import addItemAttr from '../util/addSlotNameToAttr.js'
  import { getSize } from './styleTools'

  export default {
    name: 'ItemCollapse',
    data () {
      return {
        enable: true,               // 是否能点击
        isInit: false,              // 是否初始化
        itemGroupComponent: null,   // 父组件ItemGroup
        isActive: false,            // 当前组件状态
        height: null                // 未展开的内容高度
      }
    },
    props: {
      title: String,
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: String
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
      },
      colorClass () {
        return this.color ? (`item-${this.mode}-${this.color}`) : ''
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
      if (parentNodeIs(this, 'ItemCollapseGroup')) {
        this.itemGroupComponent = this.$parent
        this.itemGroupComponent.recordItemCollapse(this)
      }
    },
    mounted () {
      this.height = getSize(this.itemCollapseInnerElement).height
      this.isInit = true

      addItemAttr(this.$slots)
    }
  }

  function parentNodeIs (node, name = '') {
    return node && node.$parent && node.$parent.$options._componentTag.toLowerCase() === name.toLowerCase()
  }
</script>
