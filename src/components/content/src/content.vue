<template>
    <div class="outer-content ion-content content-ios">
        <div class="fixed-content" style="margin-top: 44px;">
            <!--<ng-content select="[ion-fixed],ion-fab"></ng-content>-->
        </div>
        <div class="scroll-content" style="margin-top: 44px;">
            <slot></slot>
            <!--<ng-content></ng-content>-->
        </div>
        <!--<ng-content select="ion-refresher"></ng-content>-->
    </div>
</template>
<style lang="scss">
    @import './content';
    @import './content.ios';


</style>
<script type="text/ecmascript-6">
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
        components: {}
    }
</script>
