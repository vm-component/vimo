<template>
    <div class="ion-item" :class="[itemClass,listHeaderClass,colorClass]" @click="directTo($event)">
        <!--以下组件显示在此处：[item-left],ion-checkbox:not([item-right])-->
        <slot name="item-left"></slot>
        <div class="item-inner">
            <div class="input-wrapper">
                <!--如果是ion-label则单独显示，如果不是则显示在ion-label中-->
                <slot></slot>
                <!--<Label>-->
                <slot name="label"></slot>
                <!--</Label>-->
                <!--以下组件显示在此处：ion-select,ion-input,ion-textarea,ion-datetime,ion-range,[item-content]-->
                <slot name="content"></slot>
            </div>

            <!--以下组件显示在此处：[item-right],ion-radio,ion-toggle-->
            <slot name="item-right"></slot>
        </div>
    </div>
</template>
<style lang="less">
    @import "item";
    @import "item.ios.less";
    @import "item.md.less";
    @import "item-media";
    @import "item-reorder";
</style>
<script type="text/javascript">
  import { isTrueProperty, isPresent, isString } from '../util/util'
  import { Icon } from '../icon'
  import addItemAttr from '../util/addItemAttr.js'

  export default {
    data () {
      return {
        isInMenu: false, // 判断是否在menu组件中, 如果在menu中, 则
        labelComponent: null,

        shouldHaveReorder: false //
      }
    },
    props: {
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
      color: [String],

      // ------ vue-router ------
      /**
       * 指向跳转
       * 当被点击后，内部会立刻把 to 的值传到 router.push()
       * 所以这个值可以是一个字符串或者是描述目标位置的对象
       * */
      to: [String, Object],
      append: Boolean,
      /**
       * 设置 replace 属性的话，当点击时，会调用 router.replace()
       * 而不是 router.push()，于是导航后不会留下 history 记录。
       * */
      replace: Boolean
    },
    computed: {
      itemClass () {
        return `item-${this.mode}`
      },
      colorClass () {
        return this.color ? (`item-${this.mode}-${this.color}`) : ''
      }
    },
    methods: {
      /**
       * 类似于a标签跳转
       * */
      directTo ($event) {
        const _this = this
        const router = this.$router
        const current = this.$route
        let _to = this.to
        if (isPresent(router) && isPresent(current) && isPresent(_to)) {
          if (isString(_to)) {
            _to = {
              name: _to
            }
          }

          // 返回数据: {location, route, href}
          const {location} = router.resolve(_to, current, this.append)

          // 如果在menu跳转, 则需要等待menu关闭后再跳转
          if (this.isInMenu) {
            this.$menus.close()
            this.$eventBus && this.$eventBus.$on('onMenuClosed', directToHandler)
          } else {
            // 正常情况
            doRedirect()
          }

          // 事件处理函数
          // eslint-disable-next-line no-inner-declarations
          function directToHandler () {
            _this.$eventBus && _this.$eventBus.$off('onMenuClosed', directToHandler)
            doRedirect()
          }

          // 跳转
          // eslint-disable-next-line no-inner-declarations
          function doRedirect () {
            if (_this.replace) {
              router.replace(location)
            } else {
              router.push(location)
            }
          }
        } else {
          this.$emit('click', $event)
        }
      },

      /**
       * 获取组件类Label的文本
       * */
      getLabelText () {
        return this.labelComponent ? this.labelComponent.$el.innerText : ''
      }
    },
    mounted () {
      if (isTrueProperty(this.$el.getAttribute('wait'))) {
        this.isInMenu = true
      }

      addItemAttr(this.$slots)
    },
    components: {Icon}
  }
</script>
