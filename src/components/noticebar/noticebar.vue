<template>
    <div class="vm-noticebar">
        <div class="vm-icon" v-if="typeClass" :class="typeClass"></div>
        <div class="vm-noticebar-wrap" ref="noticeBarWrap">
            <div class="vm-noticebar-content"
                 :style="styleObj"
                 :class="{'animate':shouldAnimate}"
                 ref="noticeBarContent">
                <slot></slot>
            </div>
        </div>
        <div class="vm-action" v-if="actionClass" @click="close" :class="actionClass"></div>
    </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script type="text/javascript">
  /**
   * @component NoticeBar
   * @description
   *
   * ## 通知组件(小喇叭) / NoticeBar
   *
   * ### 介绍
   *
   * 这个组件是在支付宝中看到, 且自己也在别的手机端H5项目中手写过, 因此这个组件比较有代表性, 这里进队组建行了归纳.
   *
   * ### Props说明
   *
   * - 组件左侧是类型type定义, 默认是'notice'(小喇叭图标), 如果是'warn'则为感叹号图标.
   * - 右侧是动作action定义, 默认是'close', 如果定义的是'direct', 则为向右的箭头. 不能什么类型, 点击都是关闭通知组件. 关闭动作注册在onDismiss中.
   *
   *
   * ### 如何引入
   * ```
   * // 引入
   * import { NoticeBar } from 'vimo'
   * // 安装
   * Vue.component(NoticeBar.name, NoticeBar)
   * // 或者
   * export default{
   *   components: {
   *     NoticeBar
   *  }
   * }
   * ```
   *
   * ### 如果获取组件实例
   *
   * - 通过ref标记获取
   *
   * ### 关于通知文字的长度
   *
   * 如果通知文字的长度比内容显示的宽度短, 则通知文本内容不进行滚动.
   *
   * @props {Number} [speed=30] - 指定对象动画的速度, 默认为30px/s, 传入值必须大于30
   * @props {Number} [delay=2] - 指定对象动画延迟的时间
   * @props {String} [type='notice'] - 左侧的icon类型, 可以是:  notice/warn/hide
   * @props {String} [action='close'] - 左侧的icon类型, 可以是:  close/direct/hide
   * @props {Function} [onDismiss] - 组件关闭的回调
   *
   *
   * @demo #/notice-bar
   * @usage
   *
   * <NoticeBar :onDismiss="onDismissHandler">这是一个很简短的通知, 不会滚动</NoticeBar>
   * <NoticeBar class="noticeBar" action="hide">
   *    国庆节期间余额宝收益和转出到账时间调整到节后, 给您带来不便, 敬请谅解!
   * </NoticeBar>
   *
   * */
  export default {
    name: 'NoticeBar',
    data () {
      return {
        shouldAnimate: false,
        duration: 9,
        typeClass: null,
        actionClass: null
      }
    },
    props: {
      speed: {
        type: Number,
        validator (value) {
          return value >= 30
        },
        default: 30 // 100px/s
      },
      delay: {
        type: Number,
        default: 2
      },
      type: {
        type: String,
        default: 'notice' // notice/warn/hide
      },
      action: {
        type: String,
        default: 'close' // close/direct/hide
      },
      onDismiss: Function
    },
    computed: {
      styleObj () {
        return {
          'animationDuration': `${this.duration}s`,
          'animationDelay': `${this.delay}s`
        }
      },
      noticeBarWrapElement () {
        return this.$refs.noticeBarWrap
      },
      noticeBarContentElement () {
        return this.$refs.noticeBarContent
      }
    },
    methods: {
      /**
       * @function close
       * @description
       * 关闭
       * */
      close () {
        this.onDismiss && this.onDismiss()
        this.$el.remove()
      }
    },
    created () {
      switch (this.type) {
        case 'notice':
          this.typeClass = 'vm-icon-notice'
          break
        case 'warn':
          this.typeClass = 'vm-icon-warn'
          break
        case 'hide':
          this.typeClass = ''
          break
        default:
          this.typeClass = ''
      }

      switch (this.action) {
        case 'close':
          this.actionClass = 'vm-icon-close'
          break
        case 'right':
          this.actionClass = 'vm-icon-right'
          break
        case 'hide':
          this.actionClass = ''
          break
        default:
          this.actionClass = ''
      }
    },
    mounted () {
      var wrapRect = this.noticeBarWrapElement.getBoundingClientRect()
      var contentRect = this.noticeBarContentElement.getBoundingClientRect()
      if (contentRect.width > wrapRect.width) {
        this.shouldAnimate = true
      }

      // 计算持续时间
      this.duration = contentRect.width * 0.87 / this.speed >> 0
    },
    components: {}
  }
</script>
