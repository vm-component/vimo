<template>
  <div class="ion-fab-list" :side="side" :style="sideMargin">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
  import { parsePxUnit, setElementClass } from '../../util/util';

  export default {
    name: 'FabList',
    inject: {
      fabComponent: {
        from: 'fabComponent',
        default() {
          if (process.env.NODE_ENV !== 'production') {
            console.error('[Component] FabList组件 需要与 Fab组件 组合使用!');
          }
          return null;
        }
      }
    },
    provide() {
      let _this = this;
      return {
        fabListComponent: _this
      };
    },
    data() {
      return {
        fabs: [],
        sideMargin: {},
        visible: false
      };
    },
    props: {
      side: {
        type: String,
        default: 'bottom',
        validator(val) {
          return ['top', 'bottom', 'left', 'right'].indexOf(val) > -1;
        }
      },
      mode: {
        type: String,
        default() {
          return this.$config && this.$config.get('mode');
        }
      }
    },
    methods: {
      /**
       * @param {Boolean} visible - val
       * @private
       */
      $_setVisible(visible) {
        let _this = this;
        if (visible === this.visible) {
          return;
        }
        this.visible = visible;

        let fabs = this.fabs;
        let interval = 16 * 3;

        if (visible) {
          this.$_setElementClass('fab-list-active', visible);
          let count = fabs.length;
          let i = 0;
          let step = () => {
            if (count > i) {
              window.requestAnimationFrame(() => {
                fabs[i].$_setElementClass('show', true);
                i++;
                window.setTimeout(() => {
                  step();
                }, interval);
              });
            }
          };

          window.setTimeout(() => {
            step();
          }, interval);
        } else {
          let count = fabs.length - 1;
          let i = -1;
          let step = () => {
            if (count > i) {
              window.requestAnimationFrame(() => {
                fabs[count].$_setElementClass('show', false);
                count--;
                window.setTimeout(() => {
                  step();
                }, interval);
              });
            } else {
              _this.$_setElementClass('fab-list-active', visible);
            }
          };

          step();
        }
      },

      /**
       * @param {String} className - className
       * @param {Boolean} add - whether
       * @private
       * */
      $_setElementClass(className, add) {
        setElementClass(this.$el, className, add);
      }
    },
    created() {
      this.fabComponent && this.fabComponent.fabListComponents.push(this);
    },
    mounted() {
      if (this.fabComponent) {
        let fabSize = parsePxUnit(window.getComputedStyle(this.fabComponent.$el).height);
        let fabContentMargin = this.fabComponent.fabContentMargin;
        this.sideMargin = {
          margin: `${fabSize + fabContentMargin}px 0`
        };

        if (this.side === 'left' || this.side === 'right') {
          this.sideMargin = {
            margin: `0 ${fabSize + fabContentMargin}px`
          };
        }
      }
    }
  };
</script>
