<template>
    <div class="grid">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "grid.scss";
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Grid',
    data(){
      return {
      }
    },
    computed: {
    },
    mounted () {
    }
  }
</script>
