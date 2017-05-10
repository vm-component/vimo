<template>
    <div class="wrapper">
        <div class="scroller">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .wrapper {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #ccc;
        overflow: hidden;
        .scroller {
            position: absolute;
            z-index: 1;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            width: 100%;
            -webkit-transform: translateZ(0);
            -moz-transform: translateZ(0);
            -ms-transform: translateZ(0);
            -o-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-text-size-adjust: none;
            -moz-text-size-adjust: none;
            -ms-text-size-adjust: none;
            -o-text-size-adjust: none;
            text-size-adjust: none;
        }
    }
</style>
<script type="text/javascript">
  /**
   * @component Scroll
   * @description
   *
   * ## 通用组件 / Scroll滚动组件
   *
   * Content组件也具有滚动属性, 但是Content组件的定位是页面基础布局的中间层, 也就是内容层, 但是内容层希望能有一个jsScroll的子组件这里就需要Scroll组件了.
   *
   * 比如:
   *
   * - 订单App, 左侧的菜单类别, 右侧类别详情(菜单详情).
   * - 滑动可切换的tab组件, 能更具我外接触发滚动祖选择等.
   * - 横向的跑马灯, 根据指令切换到某个位置.
   *
   * Scroll组件是对IScroll组件的封装, 组件书写完毕及初始化完毕, props就是传入的参数, 通过ref获取组件实例进行操作, 因此使用逻辑完全一致.
   *
   * */
  import IScroll from 'iscroll/build/iscroll'
  import { isPassive } from '../../util/util'
  let hasPointer = !!(window.PointerEvent || window.MSPointerEvent) // IE10 is prefixed
  let hasTouch = 'ontouchstart' in window
  export default{
    name: 'Scroll',
    data () {
      return {
        iScrollInstance: null
      }
    },
    props: {
      resizeScrollbars: {
        type: Boolean,
        default: true
      },
      mouseWheelSpeed: {
        type: Number,
        default: 20
      },
      snapThreshold: {
        type: Number,
        default: 0.334
      },
      disablePointer: {
        type: Boolean,
        default: hasPointer
      },
      disableTouch: {
        type: Boolean,
        default: hasPointer || hasTouch
      },
      disableMouse: {
        type: Boolean,
        default: hasPointer || hasTouch
      },
      startX: {
        type: Number,
        default: 0
      },
      startY: {
        type: Number,
        default: 0
      },
      scrollY: {
        type: Boolean,
        default: true
      },
      directionLockThreshold: {
        type: Number,
        default: 5
      },
      momentum: {
        type: Boolean,
        default: true
      },
      // bounce
      bounce: {
        type: Boolean,
        default: true
      },
      bounceTime: {
        type: Number,
        default: 600
      },
      bounceEasing: {
        type: String,
        default: ''
      },
      // prevent
      preventDefault: {
        type: Boolean,
        default: true
      },
      preventDefaultException: {
        type: Object,
        default () {
          return {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/}
        }
      },
      // 结构
      HWCompositing: {
        type: Boolean,
        default: true
      },
      useTransition: {
        type: Boolean,
        default: true
      },
      useTransform: {
        type: Boolean,
        default: true
      },
      bindToWrapper: {
        type: Boolean,
        default: typeof window.onmousedown === 'undefined'
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {
      // 初始化实例
      let propsData = JSON.parse(JSON.stringify(this.$options.propsData))
      this.iScrollInstance = new IScroll(this.$el, propsData)

      // 触摸滚动事件不向外传递
      this.$el.addEventListener('touchmove', function (e) { e.preventDefault() }, isPassive() ? {
        capture: false,
        passive: false
      } : false)
    }
  }
</script>
