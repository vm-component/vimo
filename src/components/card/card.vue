<template>
    <div class="ion-card" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">

  import mixin from '../../mixins/card-mixin/index'

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
