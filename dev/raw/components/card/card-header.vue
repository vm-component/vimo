<template>
    <div class="ion-card-header" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script>
  import mixin from './mixin'
  export default{
    name: 'CardHeader',
    data(){
      return {
        componentName: 'card-header'
      }
    },
    extend: mixin
  }
</script>
