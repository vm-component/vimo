<template>
  <div class="ion-fab" :style="styleObj">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
  import { parsePxUnit } from '../../util/util';

  export default {
    name: 'Fab',
    provide() {
      let _this = this;
      return {
        fabComponent: _this
      };
    },
    data() {
      return {
        listsActive: false,             // 组件开闭状态
        fabListComponents: [],           // FabList 组件
        styleObj: {}
      };
    },
    props: {
      top: Boolean,
      bottom: Boolean,
      left: Boolean,
      right: Boolean,
      middle: Boolean,
      center: Boolean,
      edge: Boolean,
      fabContentMargin: {
        type: Number,
        default: 10
      }
    },
    methods: {
      /**
       * @private
       */
      $_toggleList() {
        this.$app && this.$app.setEnabled(false, 300);
        this.$_setActiveLists(!this.listsActive);
      },

      /**
       * @param {Boolean} isActive
       * @private
       */
      $_setActiveLists(isActive) {
        if (isActive === this.listsActive) {
          return;
        }
        for (let keyName in this.fabListComponents) {
          this.fabListComponents[keyName].$_setVisible(isActive);
        }
        this.listsActive = isActive;
      },

      /**
       * 尺寸计算
       * @private
       * */
      $_setPosition() {
        let fabContentMargin = this.fabContentMargin;
        let fabSize = parsePxUnit(window.getComputedStyle(this.$el).height);
        let style = {};

        if (this.top) {
          style.top = `${fabContentMargin}px`;
          if (this.edge) {
            style.top = `${-fabSize / 2}px`;
          }
        }

        if (this.bottom) {
          style.bottom = `${fabContentMargin}px`;
          if (this.edge) {
            style.bottom = `${-fabSize / 2}px`;
          }
        }

        if (this.left) {
          style.left = `${fabContentMargin}px`;
        }

        if (this.right) {
          style.right = `${fabContentMargin}px`;
        }

        if (this.center) {
          style.left = '50%';
          style.marginLeft = `${-fabSize / 2}px`;
        }

        if (this.middle) {
          style.top = '50%';
          style.marginLeft = `${-fabSize / 2}px`;
          style.position = 'fixed';
        }

        return style;
      },

      /**
       * @function close
       * @description
       * 关闭组件, 通过ref获组件示例. 一般点击主按钮关闭组件
       * */
      close() {
        this.$_setActiveLists(false);
      }
    },
    mounted() {
      this.styleObj = this.$_setPosition();
    }
  };
</script>
