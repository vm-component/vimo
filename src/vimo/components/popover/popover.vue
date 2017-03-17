<template>
  <div class="popContainer" v-show="isActive" @click="_dismiss">
    <div class="shrill" id="shrill"></div>
    <div class="popContent" id="popContent" >
      
    </div>
  </div>
    
</template>
<style scoped lang="scss">
  @import './popover'; 
  .main {

  }
</style>
<script type="text/ecmascript-6">
  export default{
    name:'popover',
    data(){
      return {
        isActive:false
      }
    },
    watch: {
     
    },
    computed: {},
    methods: {
      _present(){
        const _this = this;
        _this.isActive = true;
      },
      _dismiss(e){ //
        if(e.target.className==="popContainer") this.isActive =false;
      }
    },
    created () {
    },
    mounted () {
    },
    activated () {
    }
  }
</script>
