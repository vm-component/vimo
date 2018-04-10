<template>
  <div class="ion-card-content" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">

  import mixin from '../card/mixin';

  export default {
    name: 'CardContent',
    data() {
      return {
        componentName: 'card-content'
      };
    },
    extends: mixin
  };
</script>
