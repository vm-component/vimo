<template>
    <div class="ion-card-title" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script>
  import mixin from './mixin'
  export default{
    name: 'CardTitle',
    data(){
      return {
        componentName: 'card-title'
      }
    },
    extend: mixin
  }
</script>
