<template>
    <div class="range-knob-handle" role="slider"
         :style="{left:left}"
         :class="{'range-knob-pressed':pressed,
       'range-knob-min':rangeKnobMin,'range-knob-max':rangeKnobMax}">
        <div class="range-pin" v-if="pin" role="presentation">{{val}}</div>
        <div class="range-knob" role="presentation"></div>
    </div>
</template>
<script type="text/javascript">
  export default{
    name: 'RangeKnobHandle',
    props: {
      ratio: {
        type: Number,
        default: 0
      },
      val: {
        type: Number,
        default: 0
      },
      pin: [Boolean],
      pressed: [Boolean],
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      disabled: [Boolean]
    },
    computed: {
      left () {
        return `${this.ratio * 100}%`
      },
      rangeKnobMin () {
        return this.val === this.min || this.val === undefined
      },
      rangeKnobMax () {
        return this.val === this.max
      }
    }
  }
</script>
