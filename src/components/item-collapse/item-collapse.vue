<template>
    <div :class="[{'item-collapse-open':isActive},collapseClass]" class="item-collapse">
        <div :class="[itemClass,colorClass]"
             class="ion-item item-block" @click="onPointerDownHandler">
            <slot name="item-left"></slot>
            <div class="item-inner">
                <div class="input-wrapper" v-if="title">{{title}}</div>
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
<script type="text/javascript">
  import addItemAttr from '../../util/add-slot-name-to-attr.js'
  import { getSize } from '../../util/style-tools'
  export default {
    name: 'ItemCollapse',
    inject: {
      itemCollapseGroupComponent: {
        from: 'itemCollapseGroupComponent',
        default: null
      }
    },
    data () {
      return {
        enable: true,               // 是否能点击
        isInit: false,              // 是否初始化
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
        this.enable && this.itemCollapseGroupComponent && this.itemCollapseGroupComponent.onItemCollapseChange(this._uid)
      }
    },
    created () {
      if (this.itemCollapseGroupComponent) {
        this.itemCollapseGroupComponent = this.$parent
        this.itemCollapseGroupComponent.recordItemCollapse(this)
      }
    },
    mounted () {
      this.height = getSize(this.itemCollapseInnerElement).height
      this.isInit = true

      addItemAttr(this.$slots)
    }
  }
</script>
