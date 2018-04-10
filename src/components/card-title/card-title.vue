<template>
  <div class="ion-card-title" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">

  import mixin from '../../mixins/card-mixin/index';

  export default {
    name: 'CardTitle',
    data() {
      return {
        componentName: 'card-title'
      };
    },
    extends: mixin
  };
</script>
