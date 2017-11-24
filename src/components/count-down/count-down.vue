<template>
    <span class="vm-count-down">{{theNum}}</span>
</template>
<script type="text/javascript">
  /**
   * @component CountDown
   * @description
   *
   * ## 倒计时组件 / CountDown组件
   *
   * ### 说明
   *
   * 就是一个向下计数的组件（倒计时），比如发送短信后的60s计时，当时间从```max```到```min```计数完毕后，触发```onEnd```时间。
   *
   * // TODO: 这里没有搞定，加上一些方法：？？？start/end/pause/reset
   *
   * step默认是1，且无法改动，从max开始倒计到min, 其中min不能大于max。
   *
   * @prop {Number} [max=10] - 倒计时最大值，整数无单位
   * @prop {Number} [min=0] - 倒计时最小值，整数无单位
   * @prop {Number} [interval=1000] - 倒计时间隔, 默认1s
   *
   * @fires component:CountDown#onEachStep
   * @fires component:CountDown#onEnd
   * @demo #/count-down
   * */
  export default {
    name: 'CountDown',
    props: {
      max: {
        type: Number,
        default: 10,
        required: true,
        validator (val) {
          return val > 0
        }
      },
      min: {
        type: Number,
        default: 0
      },
      interval: {
        type: Number,
        default: 1000,
        validator (val) {
          return val > 0
        }
      }
    },
    data () {
      return {
        theNum: null,
        theMax: null,
        theMin: null,
        timer: null
      }
    },
    methods: {
      init () {
        this.theNum = this.theMax
        this.timer && window.clearInterval(this.timer)
        this.timer = window.setInterval(() => {
          if (this.theNum <= this.theMin) {
            this.timer && window.clearInterval(this.timer)

            /**
             * @event component:CountDown#onEnd
             * @description 倒计时结束
             */
            this.$emit('onEnd')
          } else {
            this.theNum--
            /**
             * @event component:CountDown#onEachStep
             * @description 倒计时中
             */
            this.$emit('onEachStep')
          }
        }, this.interval)
      },
      /**
       * 重新开始
       * */
      reset () {
        this.init()
      },
      pause () {},
      start () {},
      stop () {}
    },
    mounted () {
      // 检查max和min
      if (this.max > this.min) {
        this.theMax = this.max
        this.theMin = this.min
      } else {
        this.theMax = this.min
        this.theMin = this.max
      }

      this.init()
    },
    destroyed () {
      this.timer && window.clearInterval(this.timer)
    }
  }
</script>
