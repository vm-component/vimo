<template>
  <div>
    backdrop
  </div>

</template>
<style scoped lang="scss">
    body{
        background-color:#ff0000;
    }
</style>
<script type="text/ecmascript-6">
  import mixin from '../mixins/baseMethodMixin'

  export default{
    mixins: [mixin],
        data(){
            return{
                msg:'hello vue'
            }
        },

    }
</script>
