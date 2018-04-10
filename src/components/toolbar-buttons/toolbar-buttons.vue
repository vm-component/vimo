<template>
  <div class="ion-buttons bar-buttons"
       :class="[modeClass]"
       :left="left"
       :right="right"
       :end="end">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'Buttons',
    props: {
      left: Boolean,
      right: Boolean,
      end: Boolean,
      mode: {
        type: String,
        default: 'ios'
      }
    },
    computed: {
      // 环境样式
      modeClass() {
        return `bar-buttons-${this.mode}`;
      }
    },
    methods: {
      /**
       * @private
       * */
      getPosition() {
        if (this.right || this.end) {
          return 'right';
        }
        return 'left';
      }
    }
  };
</script>
