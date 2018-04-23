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
<script type="text/javascript">
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
