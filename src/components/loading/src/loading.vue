<template>
    <div class="ion-loading">
        <ion-backdrop v-show="showBackdrop"></ion-backdrop>
        <div class="loading-wrapper">
            <div v-if="showSpinner" class="loading-spinner">
                <ion-spinner :name="spinner"></ion-spinner>
            </div>
            <div v-if="d.content" v-html="content" class="loading-content"></div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import './loading';
    @import './loading.ios';
    @import './loading.md';
    @import './loading.wp';


</style>
<script type="text/ecmascript-6">
    import Spinner from '../../spinner';


    export default{
        data(){
            return {}
        },
        watch: {},
        computed: {},
        methods: {},
        created: function () {
        },
        mounted: function () {
        },
        activated: function () {
        },
        components: {
        	'ion-spinner':Spinner
        }
    }
</script>
