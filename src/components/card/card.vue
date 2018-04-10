<template>
    <div class="ion-card" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">

  import mixin from './mixin'

  export default {
    name: 'Card',
    data () {
      return {
        componentName: 'card'
      }
    },
    extends: mixin
  }
</script>
