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

        <h4>Color</h4>
        <ion-spinner></ion-spinner>
        <ion-spinner color="primary" name="ios"></ion-spinner>
        <ion-spinner color="secondary" name="ios-small"></ion-spinner>
        <ion-spinner color="light" name="bubbles"></ion-spinner>
        <ion-spinner color="dark" name="circles"></ion-spinner>
        <ion-spinner color="primary" name="crescent"></ion-spinner>
        <ion-spinner color="secondary" name="dots"></ion-spinner>



    </div>
</template>
<style scoped lang="scss">
 .spinnerDemo{

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
