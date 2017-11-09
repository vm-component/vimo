<template>
    <div class="ion-segment segment" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<style lang="less">
    @import "segment";
    @import "segment.ios.less";
    @import "segment.md.less";
</style>
<script type="text/javascript">
  /**
   * @component Segment
   * @description
   *
   * ## 小标签 / Segment
   *
   * Segment组件可以说是联动的按钮组合, 他不负责路由, 只是按钮组合而已. 如果涉及路由, 请使用Tab组件, 或者自己集成路由部分.
   *
   * ### 父子组件组合
   *
   * Segment组件和SegmentButton组件是互相组合的模式, 不可分离. 父组件可使用`v-model`指令监听子组件当前的选中状态. 子组件支持异步载入, 当子组件的value没有指定, 则使用当前组件的内置文本作为其value.
   *
   * ### 父子组件通信过程
   *
   * 1. 初始化时, 子组件自己的this传递给父组件, recordChild()
   * 2. 子组件点击时, 调用父组件的 onChildChange 函数, 传递自己的value
   * 3. 父组件得到value触发onChange更新v-modal值, 之后遍历子组件, 触发组件的setChecked, 传递value
   * 4. 子组件根据传入的value设置自己的状态
   *
   * ### 异步加载子组件
   *
   * 父组件通过被动的的方式获取对子组件的控制权, 便于异步动态初始化子组件的情形. 子组件的value是子组件的标示, 当value没有值时, 通过SegmentButton组件中的text内容获取唯一标示.
   *
   * ### 支持`v-model`指令
   *
   * 如果不使用`v-model`指令, 通过`value`属性可设置初始选中状态, 但是使用了`v-model`指令时, 动态改变value将不会触发`onChange事件`, 因为事件的触发原则是组件内部变动通知外部, 但是外部改变value不是内部行为, 这点切记.
   *
   *
   * ### 如何使用
   *
   * ```
   * // 引入
   * import { Segment, SegmentButton } from 'vimo/lib/segment'
   * // 安装
   * Vue.component(Segment.name, Segment)
   * Vue.component(SegmentButton.name, SegmentButton)
   * ```
   *
   * @props {String} color - 颜色
   * @props {String} mode - 样式模式
   * @props {String} value - 当前Segment的value, 用于触发制定value的子组件
   *
   * @fires component:Segment#onChange
   * @demo #/segment
   *
   * @usage
   * <Header>
   *    <Navbar>
   *        <Title>普通用法</Title>
   *    </Navbar>
   *    <Toolbar>
   *        <!--content-->
   *        <Segment v-model="fruit" @onChange="onChangeHandler">
   *            <SegmentButton value="apple" @onSelect="onSelectHandler">Apple</SegmentButton>
   *            <SegmentButton value="orange" @onSelect="onSelectHandler">Orange</SegmentButton>
   *            <SegmentButton value="pear" @onSelect="onSelectHandler">Pear</SegmentButton>
   *            <SegmentButton value="disabled" :disabled="true" @onSelect="onSelectHandler">Disabled</SegmentButton>
   *        </Segment>
   *    </Toolbar>
   * </Header>
   *
   * */
  import debounce from 'lodash.debounce'

  export default {
    name: 'Segment',
    model: {
      prop: 'value',
      event: 'onChange'
    },
    props: {
      /**
       * 接收value信息
       * */
      value: [String, Number],
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: String,
      /**
       * mode 按钮风格 ios/android
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      disabled: Boolean
    },
    data () {
      return {
        // value的缓存值，因为props的value不能直接修改
        childComponents: [],
        theValue: this.value
      }
    },
    watch: {
      value (value) {
        // 更新子组件状态
        this.refreshChildState(value)
      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return `segment-${this.mode}`
      },
      // 颜色
      colorClass () {
        return this.color ? (`segment-${this.mode}-${this.color}`) : ''
      }
    },
    provide () {
      let _this = this
      return {
        /**
         * 记录子组件, 这个由子组件自己找到并调用
         * @param {Object} childComponent - 子组件实例(子组件的this)
         * @private
         * */
        recordChild (childComponent) {
          _this.childComponents.push(childComponent)
          debounce(() => {
            // 更新子组件状态
            _this.refreshChildState(_this.value)
          }, 0)()
        },

        /**
         * 子组件点击时操作此函数
         * @param {string} value - 当前子组件的点击值
         * @private
         * */
        onChildChange (value) {
          // 更新子组件状态
          _this.refreshChildState(value)
          /**
           * @event component:Segment#onChange
           * @description 子元素 样式更新后发送onChange事件，并传入value变化值
           * @property {string} value - 滚动事件对象
           */
          _this.$emit('onChange', value)
        }
      }
    },
    methods: {
      /**
       * 更新子组件状态
       * @private
       * */
      refreshChildState (value) {
        this.childComponents.forEach((childComponent) => {
          if (!childComponent.isDisabled) {
            childComponent.setState(value)
          }
        })
      }
    }
  }
</script>
