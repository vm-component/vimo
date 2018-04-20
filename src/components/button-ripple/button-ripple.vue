<template>
    <div class="button-ripple" ref="buttonRipple" v-if="this.ripple">
        <div class="button-effect" :style="rippleStyle">
            <slot/>
        </div>
    </div>
</template>
<script type="text/javascript">
  import PointerEvents from 'tp-pointer-events'
  import { pointerCoord } from '../../util/util'
  import Css from '../../util/get-css'

  const TOUCH_DOWN_ACCEL = 300

  export default {
    name: 'ButtonRipple',
    data () {
      return {
        pointerEvents: null,

        clientRect: null, // 覆盖元素的尺寸
        startCoord: null, // 开始坐标

        rippleStyle: null,
        clientPointerX: null,
        clientPointerY: null,
        $_diameter: null,

        isMoved: false
      }
    },
    props: {
      ripple: {
        type: Boolean,
        default () {
          return this.$config && this.$config.get('ripple', false) || false
        }
      },
      diameter: {
        type: Number,
        validator (val) {
          return val > 64 && val < 240
        }
      }
    },
    computed: {
      buttonRippleElement () {
        return this.$refs.buttonRipple
      }
    },
    methods: {
      $_pointerDown (ev) {
        this.$emit('click', ev)

        this.clientRect = this.$el.getBoundingClientRect()

        this.startCoord = pointerCoord(ev)

        let clientPointerX = (this.startCoord.x - this.clientRect.left)
        let clientPointerY = (this.startCoord.y - this.clientRect.top)

        // ripple尺寸自适应, 延展最大空间计算(x,y的最大直径)
        let x = Math.max(Math.abs(this.clientRect.width - clientPointerX), clientPointerX) * 2
        let y = Math.max(Math.abs(this.clientRect.height - clientPointerY), clientPointerY) * 2

        let diameter = this.diameter
        if (typeof diameter === 'undefined') {
          diameter = Math.min(Math.max(Math.hypot(x, y), 64), 240) // 计算合适的圆形直径
        }

        clientPointerX -= diameter / 2
        clientPointerY -= diameter / 2

        this.clientPointerX = Math.round(clientPointerX)
        this.clientPointerY = Math.round(clientPointerY)
        this.$_diameter = Math.round(diameter)

        // Reset ripple
        // DOM WRITE
        const rippleStyle = {}
        rippleStyle.opacity = ''
        rippleStyle.left = this.clientPointerX + 'px'
        rippleStyle.top = this.clientPointerY + 'px'
        rippleStyle[Css.transform] = `scale(0)`
        rippleStyle[Css.transition] = ''
        this.rippleStyle = rippleStyle
        return true
      },
      $_pointerMove () {
        this.isMoved = true
      },
      $_pointerUp () {
        if (this.isMoved) {
          this.isMoved = false
          return
        }

        // Start ripple animation
        let radius = Math.sqrt(this.clientRect.width + this.clientRect.height)
        let scaleTransitionDuration = Math.max(1600 * Math.sqrt(radius / TOUCH_DOWN_ACCEL) + 0.5, 260)
        let opacityTransitionDuration = Math.round(scaleTransitionDuration * 0.7)
        let opacityTransitionDelay = Math.round(scaleTransitionDuration - opacityTransitionDuration)
        scaleTransitionDuration = Math.round(scaleTransitionDuration)

        let transform = `scale(1)`
        let transition = `transform ${scaleTransitionDuration}ms,opacity ${opacityTransitionDuration}ms ${opacityTransitionDelay}ms`

        // DOM WRITE
        this.$nextTick(() => {
          const rippleStyle = {}
          rippleStyle.width = this.$_diameter + 'px'
          rippleStyle.height = this.$_diameter + 'px'
          rippleStyle.left = this.clientPointerX + 'px'
          rippleStyle.top = this.clientPointerY + 'px'
          rippleStyle.opacity = '0'
          rippleStyle[Css.transform] = transform
          rippleStyle[Css.transition] = transition
          this.rippleStyle = rippleStyle
        })
      }
    },
    mounted () {
      if (!this.ripple) return

      this.pointerEvents = new PointerEvents(this.buttonRippleElement, this.$_pointerDown, this.$_pointerMove, this.$_pointerUp, {})
    },
    destroyed () {
      if (!this.ripple) return

      this.pointerEvents && this.pointerEvents.destroy()
    }
  }
</script>
