<template>
    <div class="spinnerDemo">
        <h4>默认</h4>
        <ion-spinner></ion-spinner>
        <ion-spinner name="ios"></ion-spinner>
        <ion-spinner name="ios-small"></ion-spinner>
        <ion-spinner name="bubbles"></ion-spinner>
        <ion-spinner name="circles"></ion-spinner>
        <ion-spinner name="crescent"></ion-spinner>
        <ion-spinner name="dots"></ion-spinner>

        <h4>Mode</h4>
        <span>未指定</span>
        <ion-spinner></ion-spinner>
        <span>ios</span>
        <ion-spinner mode="ios"></ion-spinner>
        <span>md</span>
        <ion-spinner mode="md"></ion-spinner>
        <span>wp</span>
        <ion-spinner mode="wp"></ion-spinner>

        <h4>Color</h4>
        <ion-spinner></ion-spinner>
        <ion-spinner color="primary" name="ios"></ion-spinner>
        <ion-spinner color="secondary" name="ios-small"></ion-spinner>
        <ion-spinner color="light" name="bubbles"></ion-spinner>
        <ion-spinner color="dark" name="circles"></ion-spinner>
        <ion-spinner color="primary" name="crescent"></ion-spinner>
        <ion-spinner color="secondary" name="dots"></ion-spinner>

        <!--duration-->
        <h4>Duration 3000ms</h4>
        <ion-spinner duration="3000"></ion-spinner>
        <ion-spinner duration="3000" name="ios"></ion-spinner>
        <ion-spinner duration="3000" name="ios-small"></ion-spinner>
        <ion-spinner duration="3000" name="bubbles"></ion-spinner>
        <ion-spinner duration="3000" name="circles"></ion-spinner>
        <ion-spinner duration="3000" name="crescent"></ion-spinner>
        <ion-spinner duration="3000" name="dots"></ion-spinner>

        <!--paused-->
        <h4>Paused</h4>
        <ion-spinner :paused="true"></ion-spinner>
        <ion-spinner :paused="true" name="ios"></ion-spinner>
        <ion-spinner :paused="true" name="ios-small"></ion-spinner>
        <ion-spinner :paused="true" name="bubbles"></ion-spinner>
        <ion-spinner :paused="true" name="circles"></ion-spinner>
        <ion-spinner :paused="true" name="crescent"></ion-spinner>
        <ion-spinner :paused="true" name="dots"></ion-spinner>

    </div>
</template>
<style scoped lang="scss">
 .spinnerDemo{
     padding:15px;

 }
</style>
<script type="text/ecmascript-6">
    import Spinner from '../components/spinner';
    export default{
        data(){
            return{}
        },
        watch:{},
        computed:{},
        methods:{},
        created:function(){},
        mounted:function(){},
        activated:function(){},
        components:{
        	'ion-spinner':Spinner
        }
    }
</script>
