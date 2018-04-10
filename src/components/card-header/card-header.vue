<template>
  <div class="ion-card-header" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">

  import mixin from '../../mixins/card-mixin/index';

  export default {
    name: 'CardHeader',
    data() {
      return {
        componentName: 'card-header'
      };
    },
    extends: mixin
  };
</script>
