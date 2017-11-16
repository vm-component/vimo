<template>
    <div class="ion-range range" :class="[modeClass, colorClass,
        {'range-has-pin':pin,
        'range-pressed':pressed,
        'range-disabled':disabled}
        ]"
         @touchstart="pointerDown($event)"
         @touchmove="pointerMove($event)"
         @touchend="pointerUp($event)"
         @mousedown="pointerDown($event)"
         @mousemove="pointerMove($event)"
         @mouseup="pointerUp($event)">
        <slot name="range-left">
            <vm-label range-left>{{min}}</vm-label>
        </slot>
        <div class="range-slider">
            <div class="range-tick" :class="{'range-tick-active':tick.active}" role="presentation" v-for="(tick, index) in ticks" :style="'left:'+tick.left" v-if="snaps"></div>
            <div class="range-bar" role="presentation"></div>
            <div class="range-bar range-bar-active" role="presentation" :style="{left: barL, right: barR}"></div>
            <div class="range-knob-handle" role="slider" :aria-valuenow="valA" :aria-valuemin="min" :aria-valuemax="max" tabindex="0" :disabled="disabled" :style="{left: sliderA}">
                <div class="range-pin" role="presentation" v-if="pin">{{valA}}</div>
                <div class="range-knob" role="presentation"></div>
            </div>
            <div class="range-knob-handle" role="slider" :aria-valuenow="valB" :aria-valuemin="min" :aria-valuemax="max" tabindex="1" :disabled="disabled" :style="{left: sliderB}" v-if="dual">
                <div class="range-pin" role="presentation" v-if="pin">{{valB}}</div>
                <div class="range-knob" role="presentation"></div>
            </div>
        </div>
        <slot name="range-right">
            <vm-label range-right>{{max}}</vm-label>
        </slot>
    </div>
</template>

<style lang="scss">
    @import 'range';
    @import 'range.ios';
    @import 'range.md';
</style>

<script>
  /**
   *
   * @component Range
   * @description
   *
   * ## 表单组件 / Range滑块组件
   *
   *
   * ### 注意
   *
   * @props {String} [color] - 颜色
   * @props {Boolean} [disabled=false] - 是否禁用
   * @props {Boolean} [dual=false] - 选择的拖动按钮, 默认是一个, true为两个
   * @props {Number} [max=100] - range的最大值
   * @props {Number} [min=0] - range的最小值
   * @props {String} [mode='ios'] - 模式
   * @props {Boolean} [pin=false] - 当拖动knob时显示大头针提示
   * @props {Boolean} [snaps=false] - 类似于卡槽, 如果为true, 则在range上画标尺, 并且拖动中knob只能停留在标尺标记处
   * @props {Number} [step=1] - 移动的步伐/粒度
   * @props {String| Number| Object} [value] - v-model对应的值, 需要出发input事件
   *
   * @slot range-right - 在range组件右边, 一般放Icon
   * @slot range-left - 在range组件左边, 一般放Icon
   *
   * @demo #/range
   *
   * @usage
   * <vm-list>
   *    <vm-list-header>
   *        <span>Brightness</span>
   *        <vm-badge slot="item-end">{{brightness}}</vm-badge>
   *    </vm-list-header>
   *    <vm-item>
   *         <vm-range v-model="brightness">
   *            <vm-icon slot="range-left" small name="sunny"></vm-icon>
   *            <vm-icon slot="range-right" name="sunny"></vm-icon>
   *        </vm-range>
   *    </vm-item>
   * </vm-list>
   *
   * */
  import { setElementClass, pointerCoord, clamp, isNumber, isObject, isString } from '../../util/util'
  import ThemeMixins from '../../themes/theme.mixins';
  import VmLabel from "../label/label.vue";
  export default {
    components: {VmLabel},
    name: 'vm-range',
    mixins: [ThemeMixins],
    data() {
      return {
        ticks: [],
        rect: [],
        pressed: false,
        ratioA: 0,
        ratioB: 0,
        valA: 0,
        valB: 0,
        pressedA: false,
        pressedB: false,
        barL: '',
        barR: '',
        sliderA: '',
        sliderB: '',
      }
    },
    props: {
      value: {
        type: [Number, Object],
        default: 50
      },
      step: {
        type: Number,
        default: 1
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      pin: {
        type: Boolean,
        default: false
      },
      snaps: {
        type: Boolean,
        default: false
      },
      dual: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      /**
       * Returns the ratio of the knob's is current location, which is a number
       * between `0` and `1`. If two knobs are used, this property represents
       * the lower value.
       */
      ratio: function() {
        if (this.dual) {
          return Math.min(this.ratioA, this.ratioB);
        }
        return this.ratioA;
      },

      /**
       * Returns the ratio of the upper value's is current location, which is
       * a number between `0` and `1`. If there is only one knob, then this
       * will return `null`.
       */
      ratioUpper: function() {
        if (this.dual) {
          return Math.max(this.ratioA, this.ratioB);
        }
        return null;
      }

    },

    created() {
      this.inputUpdated();

      // build all the ticks if there are any to show
      this.createTicks();
    },
    mounted() {
      if (this.$parent.$options.name === 'vm-item') {
        this.$parent.$el.classList.add('item-range');
      }

      if (this.$slots['range-left']) {
        this.$slots['range-left'].forEach(function (item) {
          item.elm.setAttribute('range-left', '')
        })
      }
      if (this.$slots['range-right']) {
        this.$slots['range-right'].forEach(function (item) {
          item.elm.setAttribute('range-right', '')
        })
      }
    },
    methods: {
      pointerDown(ev) {
        if (this.disabled) {
          return false;
        }

        // prevent default so scrolling does not happen
        ev.preventDefault();
        ev.stopPropagation();

        // get the start coordinates
        const current = pointerCoord(ev);

        // get the full dimensions of the slider element
        const rect = this.rect = this.$el.getBoundingClientRect();

        // figure out which knob they started closer to
        const ratio = clamp(0, (current.x - rect.left) / (rect.width), 1);
        this.activeB = this.dual && (Math.abs(ratio - this.ratioA) > Math.abs(ratio - this.ratioB));

        // update the active knob's position
        this._updatePos(current, rect, true);

        // return true so the pointer events
        // know everything's still valid
        return true;
      },

      pointerMove(ev) {
        if (this.disabled) {
          return;
        }
        // prevent default so scrolling does not happen
        ev.preventDefault();
        ev.stopPropagation();

        // update the active knob's position
        this._updatePos(pointerCoord(ev), this.rect, true);
      },

      pointerUp(ev) {
        if (this.disabled) {
          return;
        }
        // prevent default so scrolling does not happen
        ev.preventDefault();
        ev.stopPropagation();

        // update the active knob's position
        this._updatePos(pointerCoord(ev), this.rect, false);
      },

      _updatePos(current, rect, isPressed) {
        // figure out where the pointer is currently at
        // update the knob being interacted with
        let ratio = clamp(0, (current.x - rect.left) / (rect.width), 1);
        let val = this._ratioToValue(ratio);

        if (this.snaps) {
          // snaps the ratio to the current value
          ratio = this._valueToRatio(val);
        }

        // update which knob is pressed
        this.pressed = isPressed;
        let valChanged = false;
        if (this.activeB) {
          // when the pointer down started it was determined
          // that knob B was the one they were interacting with
          this.pressedB = isPressed;
          this.pressedA = false;
          this.ratioB = ratio;
          valChanged = val === this.valB;
          this.valB = val;
        } else {
          // interacting with knob A
          this.pressedA = isPressed;
          this.pressedB = false;
          this.ratioA = ratio;
          valChanged = val === this.valA;
          this.valA = val;
        }
        this.updateBar();
        if (valChanged) {
          return false;
        }

        // value has been updated
        let value;
        if (this.dual) {
          // dual knobs have an lower and upper value
          value = {
            lower: Math.min(this.valA, this.valB),
            upper: Math.max(this.valA, this.valB)
          };

          console.debug(`range, updateKnob: ${ratio}, lower: ${this.value.lower}, upper: ${this.value.upper}`);

        } else {
          // single knob only has one value
          value = this.valA;
          console.debug(`range, updateKnob: ${ratio}, value: ${this.value}`);
        }

        // Update input value
        this.$emit('input', value)

        return true;
      },

      /** @internal */
      updateBar() {
        const ratioA = this.ratioA;
        const ratioB = this.ratioB;

        if (this.dual) {
          this.barL = `${(Math.min(ratioA, ratioB) * 100)}%`;
          this.barR = `${100-(Math.max(ratioA, ratioB) * 100)}%`;

          this.sliderA = `${(Math.min(ratioA, ratioB) * 100)}%`;
          this.sliderB = `${(Math.max(ratioA, ratioB) * 100)}%`;

        } else {
          this.barL = '';
          this.barR = `${100 - (ratioA * 100)}%`;

          this.sliderA = `${(ratioA * 100)}%`;
          this.sliderB = '';
        }

        this.updateTicks();
      },

      createTicks() {
        if (this.snaps) {
          this.ticks = [];
          for (var value = this.min; value <= this.max; value += this.step) {
            var ratio = this._valueToRatio(value);
            this.ticks.push({
              ratio: ratio,
              left: `${ratio * 100}%`,
            });
          }
          this.updateTicks();
        }

      },

      updateTicks() {
        const ticks = this.ticks;
        const ratio = this.ratio;

        if (this.snaps && ticks) {
          if (this.dual) {
            var upperRatio = this.ratioUpper;

            ticks.forEach(t => {
              t.active = (t.ratio >= ratio && t.ratio <= upperRatio);
            });

          } else {
            ticks.forEach(t => {
              t.active = (t.ratio <= ratio);
            });
          }
        }

      },

      inputUpdated() {
        const val = this.value;
        if (this.dual) {
          this.valA = val.lower;
          this.valB = val.upper;
          this.ratioA = this._valueToRatio(val.lower);
          this.ratioB = this._valueToRatio(val.upper);
        } else {
          this.valA = val;
          this.ratioA = this._valueToRatio(val);
        }

        this.updateBar();
      },

      _ratioToValue(ratio) {
        ratio = Math.round(((this.max - this.min) * ratio));
        ratio = Math.round(ratio / this.step) * this.step + this.min;
        return clamp(this.min, ratio, this.max);
      },

      _valueToRatio(value) {
        value = Math.round((value - this.min) / this.step) * this.step;
        value = value / (this.max - this.min);
        return clamp(0, value, 1);
      }
    }
  }
</script>