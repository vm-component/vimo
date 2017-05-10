<template>
    <div class="main">
        HELLO TEST
    </div>
</template>
<style scoped lang="scss">
    .main {
        background: #000;
        color: #fff;
        line-height: 150%;
        height: 50px;
    }
</style>
<script type="text/javascript">


  var myMixin = {
    created: function () {
      this.hello()
    },
    methods: {
      hello: function () {
        console.info('Test from mixin!')
        console.info('Test from mixin!')
        console.info('Test from mixin!')
      }
    }
  }

  export default{
    name: 'Test',
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created(){},
    mounted(){
      console.log('mounted Test')
      console.log(this)
    },
    activated(){
      console.log('activated Test')
      console.log(this)
    },
    components: {}
  }
</script>
