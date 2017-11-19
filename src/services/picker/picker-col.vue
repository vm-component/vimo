<template>
    <div class="picker-col"
         @touchstart="pointerStart"
         @touchmove="pointerMove"
         @touchend="pointerEnd"
         :style="{'maxWidth':col.columnWidth}"
         :class="[col.cssClass,{'picker-opts-right':(col.align=='right'),'picker-opts-left':(col.align=='left')}]">
        <!--prefix-->
        <div v-if="col.prefix"
             class="picker-prefix"
             :style="{'width':col.prefixWidth}">{{col.prefix}}
        </div>
        <div class="picker-opts" ref="colEle"
             :style="{'maxWidth':col.optionsWidth}">
            <button v-for="(o,index) in col.options" :key="index"
                    :class="{'picker-opt-disabled':o.disabled}"
                    class="picker-opt"
                    disable-activated
                    @click="optClick($event, index)">{{o.text}}</button>
        </div>
        <!--suffix-->
        <div v-if="col.suffix" class="picker-suffix" :style="{'width':col.suffixWidth}">{{col.suffix}}</div>
    </div>
</template>
<script type="text/javascript">
  import { pointerCoord, clamp, parsePxUnit } from '../../util/util'
  import css from '../../util/getCss'

  const PICKER_OPT_SELECTED = 'picker-opt-selected'
  const DECELERATION_FRICTION = 0.97
  const FRAME_MS = (1000 / 60)
  const MAX_PICKER_SPEED = 60
  export default {
    name: 'vm-picker-col',
    data () {
      return {
        isInit: false,
        rotateFactor: this.$config && this.$config.getNumber('pickerRotateFactor', 0) || 0,
        scaleFactor: this.$config && this.$config.getNumber('pickerScaleFactor', 1) || 1,
        pickerComponent: null,          // 父组件 Picker 实例

        y: 0,
        colHeight: 0,
        optHeight: 0,
        velocity: 0,
        pos: [],
        startY: null,
        rafId: 0,
        bounceFrom: 0,
        bounceFromTimer: null,
        minY: 0,
        maxY: 0,
        lastIndex: 0,
        lastTempIndex: 0               // 记录当前col选中的index
      }
    },
    props: {
      index: Number,    // 当前组件的序号
      col: Object       // 这一列的数据
    },
    computed: {
      colEle () {
        return this.$refs.colEle
      }
    },
    methods: {
      pointerStart(ev) {
        // We have to prevent default in order to block scrolling under the picker
        // but we DO NOT have to stop propagation, since we still want
        // some "click" events to capture
        ev.preventDefault();

        // cancel any previous raf's that haven't fired yet
        window.cancelAnimationFrame(this.rafId)

        // remember where the pointer started from`
        this.startY = pointerCoord(ev).y;

        // reset everything
        this.velocity = 0;
        this.pos.length = 0;
        this.pos.push(this.startY, Date.now());

        let options = this.col.options;
        let minY = (options.length - 1);
        let maxY = 0;
        for (var i = 0; i < options.length; i++) {
          if (!options[i].disabled) {
            minY = Math.min(minY, i);
            maxY = Math.max(maxY, i);
          }
        }

        this.minY = (minY * this.optHeight * -1);
        this.maxY = (maxY * this.optHeight * -1);
        return true;
      },

      pointerMove(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        let currentY = pointerCoord(ev).y;
        this.pos.push(currentY, Date.now());

        if (this.startY === null) {
          return;
        }

        // update the scroll position relative to pointer start position
        let y = this.y + (currentY - this.startY);

        if (y > this.minY) {
          // scrolling up higher than scroll area
          y = Math.pow(y, 0.8);
          this.bounceFrom = y;

        } else if (y < this.maxY) {
          // scrolling down below scroll area
          y += Math.pow(this.maxY - y, 0.9);
          this.bounceFrom = y;

        } else {
          this.bounceFrom = 0;
        }

        this.update(y, 0, false, false);

        let currentIndex = Math.max(Math.abs(Math.round(y / this.optHeight)), 0);
        if (currentIndex !== this.lastTempIndex) {
          this.lastTempIndex = currentIndex;
        }
      },

      pointerEnd(ev) {
        ev.preventDefault();

        if (this.startY === null) {
          return;
        }
        console.debug('picker, pointerEnd', ev.type);

        this.velocity = 0;

        if (this.bounceFrom > 0) {
          // bounce back up
          this.update(this.minY, 100, true, true);
          return;
        } else if (this.bounceFrom < 0) {
          // bounce back down
          this.update(this.maxY, 100, true, true);
          return;
        }

        let endY = pointerCoord(ev).y;

        this.pos.push(endY, Date.now());

        let endPos = (this.pos.length - 1);
        let startPos = endPos;
        let timeRange = (Date.now() - 100);

        // move pointer to position measured 100ms ago
        for (var i = endPos; i > 0 && this.pos[i] > timeRange; i -= 2) {
          startPos = i;
        }

        if (startPos !== endPos) {
          // compute relative movement between these two points
          var timeOffset = (this.pos[endPos] - this.pos[startPos]);
          var movedTop = (this.pos[startPos - 1] - this.pos[endPos - 1]);

          // based on XXms compute the movement to apply for each render step
          var velocity = ((movedTop / timeOffset) * FRAME_MS);
          this.velocity = clamp(-MAX_PICKER_SPEED, velocity, MAX_PICKER_SPEED);
        }

        if (Math.abs(endY - this.startY) > 3) {
          var y = this.y + (endY - this.startY);
          this.update(y, 0, true, true);
        }

        this.startY = null;
        this.decelerate();
      },

      decelerate() {
        let y = 0;

        if (isNaN(this.y) || !this.optHeight) {
          // fallback in case numbers get outta wack
          this.update(y, 0, true, true);
        } else if (Math.abs(this.velocity) > 0) {
          // still decelerating
          this.velocity *= DECELERATION_FRICTION;

          // do not let it go slower than a velocity of 1
          this.velocity = (this.velocity > 0)
            ? Math.max(this.velocity, 1)
            : Math.min(this.velocity, -1);

          y = Math.round(this.y - this.velocity);

          if (y > this.minY) {
            // whoops, it's trying to scroll up farther than the options we have!
            y = this.minY;
            this.velocity = 0;

          } else if (y < this.maxY) {
            // gahh, it's trying to scroll down farther than we can!
            y = this.maxY;
            this.velocity = 0;
          }

          var notLockedIn = (y % this.optHeight !== 0 || Math.abs(this.velocity) > 1);

          this.update(y, 0, true, !notLockedIn);


          if (notLockedIn) {
            // isn't locked in yet, keep decelerating until it is
            this.rafId = window.requestAnimationFrame(this.decelerate)
          }

        } else if (this.y % this.optHeight !== 0) {
          // needs to still get locked into a position so options line up
          var currentPos = Math.abs(this.y % this.optHeight);

          // create a velocity in the direction it needs to scroll
          this.velocity = (currentPos > (this.optHeight / 2) ? 1 : -1);
          this.decelerate();
        }

        let currentIndex = Math.max(Math.abs(Math.round(y / this.optHeight)), 0);
        this.lastTempIndex = currentIndex;
      },

      optClick(ev, index) {
        if (!this.velocity && !this.bounceFrom) {
          ev.preventDefault();
          ev.stopPropagation();

          this.setSelected(index, 150);
        }
      },

      setSelected(selectedIndex, duration) {
        // if there is a selected index, then figure out it's y position
        // if there isn't a selected index, then just use the top y position
        let y = (selectedIndex > -1) ? ((selectedIndex * this.optHeight) * -1) : 0;

        window.cancelAnimationFrame(this.rafId)
        this.velocity = 0;

        // so what y position we're at
        this.update(y, duration, true, true);
      },

      update(y, duration, saveY, emitChange) {
        // ensure we've got a good round number :)
        y = Math.round(y);

        let i
        let button
        let opt
        let optOffset
        let visible
        let translateX
        let translateY
        let translateZ
        let rotateX
        let transform
        let selected

        const parent = this.colEle;
        const children = parent.children;
        const length = children.length;
        const selectedIndex = this.col.selectedIndex = Math.min(Math.max(Math.round(-y / this.optHeight), 0), length - 1);

        const durationStr = (duration === 0) ? null : duration + 'ms';
        const scaleStr = `scale(${this.scaleFactor})`;

        for (i = 0; i < length; i++) {
          button = children[i];
          opt = this.col.options[i];
          optOffset = (i * this.optHeight) + y;
          visible = true;
          transform = '';

          if (this.rotateFactor !== 0) {
            rotateX = optOffset * this.rotateFactor;
            if (Math.abs(rotateX) > 90) {
              visible = false;
            } else {
              translateX = 0;
              translateY = 0;
              translateZ = 90;
              transform = `rotateX(${rotateX}deg) `;
            }
          } else {
            translateX = 0;
            translateZ = 0;
            translateY = optOffset;
            if (Math.abs(translateY) > 170) {
              visible = false;
            }
          }

          selected = selectedIndex === i;
          if (visible) {
            transform += `translate3d(0px,${translateY}px,${translateZ}px) `;
            if (this.scaleFactor !== 1 && !selected) {
              transform += scaleStr;
            }
          } else {
            transform = 'translate3d(-9999px,0px,0px)';
          }
          // Update transition duration
          if (duration !== opt._dur) {
            opt._dur = duration;
            button.style[css.transitionDuration] = durationStr
          }
          // Update transform
          if (transform !== opt._trans) {
            opt._trans = transform;
            button.style[css.transform] = transform;
          }
          // Update selected item
          if (selected !== opt._selected) {
            opt._selected = selected;
            if (selected) {
              button.classList.add(PICKER_OPT_SELECTED);
            } else {
              button.classList.remove(PICKER_OPT_SELECTED);
            }
          }
        }
        this.col.prevSelected = selectedIndex;

        if (saveY) {
          this.y = y;
        }

        if (emitChange) {
          if (this.lastIndex === undefined) {
            // have not set a last index yet
            this.lastIndex = this.col.selectedIndex;

          } else if (this.lastIndex !== this.col.selectedIndex) {
            // new selected index has changed from the last index
            // update the lastIndex and emit that it has changed
            this.lastIndex = this.col.selectedIndex;

            let selectedOption = this.col.options[this.col.selectedIndex]
            if (selectedOption) {
              let data = {
                text: selectedOption.text,
                value: selectedOption.value,
                disabled: selectedOption.disabled,
                columnIndex: this.index
              }
              this.isInit && this.$emit('onChange', data)
            }
          }
        }
      },

      refresh() {
        let min = this.col.options.length - 1;
        let max = 0;
        const options = this.col.options;
        for (var i = 0; i < options.length; i++) {
          if (!options[i].disabled) {
            min = Math.min(min, i);
            max = Math.max(max, i);
          }
        }

        const selectedIndex = clamp(min, this.col.selectedIndex, max);
        if (this.col.prevSelected !== selectedIndex) {
          var y = (selectedIndex * this.optHeight) * -1;
          window.cancelAnimationFrame(this.rafId)
          this.velocity = 0;
          this.update(y, 150, true, false);
        }
      },

      reset () {
        this.col.selectedIndex = 0
        window.setTimeout(() => {
          this.update(0, 0, true, false)
          this.refresh()
        }, 0)
      },

      getOptHeight () {
        // get the height of one option
        let height
        if (this.colEle && this.colEle.firstElementChild) {
          height = parsePxUnit(window.getComputedStyle(this.colEle.firstElementChild).height)
        } else {
          height = 0
        }
        return height
      },

      /**
       * @private
       * */
      init () {
        this.optHeight = this.getOptHeight()

        if (this.$parent.$options.name.toLowerCase() === 'vm-picker') {
          this.pickerComponent = this.$parent
        }
        console.assert(this.pickerComponent, 'PickerCol组件需要在Picker组件内部使用, 请检查.')
        this.pickerComponent.recordChildComponent(this)

        // set the scroll position for the selected option
        this.setSelected(this.col.selectedIndex, 0)
        this.isInit = true
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
