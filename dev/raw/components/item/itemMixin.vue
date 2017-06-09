<template>
    <div class="ion-item" :class="[itemClass,listHeaderClass,colorClass]" @click="directTo()">
        <!--以下组件显示在此处：[item-left],ion-checkbox:not([item-right])-->
        <slot name="item-left"></slot>

        <!--<ng-content select="[item-left],ion-checkbox:not([item-right])"></ng-content>-->
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
            <!--<section class="ion-reorder"-->
            <!--v-show="shouldHaveReorder">-->
            <!--<Icon name="reorder"></Icon>-->
            <!--</section>-->
        </div>
        <!--<div class="button-effect"></div>-->
    </div>
</template>
<style lang="scss"></style>
<script type="text/javascript">
  /**
   * @component Item
   * @description
   *
   * ## 列表组件 / Item
   *
   * Item组件是List组件的子组件, 两者配合使用.
   *
   * ### 关于其余组件
   *
   * 列表组件中的每一个Item将在这里定义, 其中包括**Item/ListHeader/ItemGroup/ItemDivider**等, 他们的使用方式基本一样, 这里统一说明.
   *
   *
   * ### ItemDivider组件
   *
   * 加 `[sticky]` 属性可实现吸顶效果
   *
   * ### 如何使用
   *
   * ### Item组件
   *
   * - 加 `[no-lines]` 属性可去除边框
   * - 在item中的Icon上加属性`[large],[small]`可控制大小
   *
   * ### 关于跳转
   *
   * item组件将使用v-router的router-link组件中的部分同名方法, 并执行对应的跳转
   *
   * - props: to/append/replace
   *
   * ```
   * // 引入
   * import { List } from 'vimo/components/list'
   * import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
   * // 安装
   * Vue.component(List.name, List)
   * Vue.component(ListHeader.name, ListHeader)
   * Vue.component(ItemGroup.name, ItemGroup)
   * Vue.component(Item.name, Item)
   * Vue.component(ItemSliding.name, ItemSliding)
   * Vue.component(ItemOptions.name, ItemOptions)
   * Vue.component(ItemDivider.name, ItemDivider)
   * // 或者
   * export default{
   *   components: {
   *    List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider
   *  }
   * }
   * ```
   *
   * @props {String} [mode='ios'] - 模式
   * @props {String} [color] - 颜色
   * @props {any} [to] - 路由, 这部分用法请参开vue-router, 这里是对其移植
   * @props {Boolean} [append] - 路由是否append
   * @props {Boolean} [replace] - 路由进行方式, 默认为push
   *
   *
   *
   * @slot 空 - 放置在中间, 默认位置
   * @slot item-left - 放置在左边
   * @slot item-right - 放置在左边
   *
   * @demo https://dtfe.github.io/vimo-demo/#/list
   * @see component:List
   * @see http://router.vuejs.org/zh-cn/index.html
   *
   * */
  import { isTrueProperty, isPresent, isString } from '../../util/util'
  import { Icon } from '../icon'
  export default{
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
      directTo () {
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

      // 为slot="item-left"/slot="item-right"的沟槽设定属性
      if (this.$slots && this.$slots['item-left']) {
        this.$slots['item-left'].forEach(function (item) {
          item.elm.setAttribute('item-left', '')
        })
      }
      if (this.$slots && this.$slots['item-right']) {
        this.$slots['item-right'].forEach(function (item) {
          item.elm.setAttribute('item-right', '')
        })
      }
    },
    components: {Icon}
  }
</script>
