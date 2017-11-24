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
<style lang="less">
    .vm-noticebar {
        height: 35px;
        width: 100%;
        background: #fff9db;
        position: relative;
        padding: 0 3px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .vm-noticebar-wrap {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
            overflow: hidden;
            position: relative;
            flex: 1;
            .vm-noticebar-content {
                white-space: nowrap;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                opacity: 1;
                height: 100%;
                font-size: 14px;
                transition: opacity ease 100ms;

                &.animate {
                    animation-name: animations;
                    /*检索或设置对象所应用的动画名称*/
                    /*animation-duration: 9s;*/
                    /*检索或设置对象动画的持续时间*/
                    animation-timing-function: linear;
                    /*检索或设置对象动画的过渡类型*/
                    /*animation-delay: 2s;*/
                    /*检索或设置对象动画延迟的时间*/
                    animation-iteration-count: infinite;
                    /*检索或设置对象动画的循环次数*/
                    animation-direction: normal;
                    /*检索或设置对象动画在循环中是否反向运动*/
                    animation-fill-mode: none;
                    /*检索或设置对象动画时间之外的状态*/
                    animation-play-state: running;
                }
            }

            @keyframes animations {
                0% {
                    opacity: 1;
                    transform: translate(0);
                }
                10% {
                    opacity: 1;
                    transform: translate(0);
                }
                97% {
                    opacity: 1;
                    transform: translate(-110%);
                }
                97.000001% {
                    display: none;
                    opacity: 0;
                    visibility: hidden;
                }
                98.9999999999% {
                    transform: translate(0);
                }
                99% {
                    opacity: 0;
                    display: block;
                    visibility: visible;
                }
                100% {
                    opacity: 1;
                }
            }
        }

        .vm-icon, .vm-action {
            display: flex;
            flex: 0 0 26px;
            top: 0;
            height: 35px;
            justify-content: center;
            align-items: center;
            color: #ef4644;
        }
        .vm-icon {
            left: 0;
        }
        .vm-action {
            right: 0;
        }

        .vm-icon-notice {
            background: url(images/notice.png) no-repeat center center/15px 15px;
        }
        .vm-icon-warn {
            background: url(images/warn.png) no-repeat center center/15px 15px;
        }
        .vm-icon-right {
            background: url(images/right.png) no-repeat center center/15px 15px;
        }
        .vm-icon-close {
            background: url(images/close.png) no-repeat center center/15px 15px;
        }
    }
</style>
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
   * import NoticeBar from 'vimo/lib/noticebar'
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
