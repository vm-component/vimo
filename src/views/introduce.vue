<template>
    <ion-page>
        <ion-header>
            <ion-navbar>
                <ion-title slot="content">介绍</ion-title>
            </ion-navbar>
        </ion-header>
        <ion-content padding>
          这里是介绍

        </ion-content>
    </ion-page>
</template>
<style scoped lang="scss">
 .main{

 }
</style>
<script type="text/ecmascript-6">
  import mixin from '../mixins/baseMethodMixin'

  export default{
    mixins: [mixin],
        data(){
            return{}
        },
        watch:{},
        computed:{},
        methods:{},
        created:function(){},
        mounted:function(){},
        activated:function(){},
        components:{}
    }
</script>
