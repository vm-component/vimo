<template>
    <div class="ion-app" :class="[modeClass]">
        <!--app-root start-->
        <div id="viewport" ref="viewport" app-viewport></div>
        <div class="app-root">
            <slot></slot>
        </div>
        <!--modal portal-->
        <div id="modalPortal" ref="modalPortal" overlay-portal></div>
        <!--蒙层指示等 overlay portal-->
        <div id="overlayPortal" ref="overlayPortal" overlay-portal></div>
        <!--alert portal-->
        <div id="alertPortal" ref="alertPortal" overlay-portal></div>
        <!--loading portal-->
        <div id="loadingPortal" ref="loadingPortal" class="loading-portal" overlay-portal></div>
        <!--toast portal-->
        <div id="toastPortal" ref="toastPortal" class="toast-portal" overlay-portal></div>
        <!--<div ref="toastPortal" class="toast-portal" [overlay-portal]="10000"></div>-->
        <div class="click-block"></div>
    </div>
</template>
<style  lang="scss">
    @import './app';
    @import './app.ios';


</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                _viewport: '',
                _modalPortal: '',
                _overlayPortal: '',
                _loadingPortal: '',
                _toastPortal: '',
            }
        },
        props: {
            /**
             * The mode to apply to this component. Mode can be ios, wp, or md.
             * */
            mode: {
                type: String,
                default: 'ios',
            },
        },
        watch: {},
        computed: {
            // set the mode class name
            // ios/md/wp
            modeClass: function () {
                // const versions = this._platform.versions();
                // this._platform.platforms().forEach(platformName => {
                //     // platform-ios
                //     let platformClass = 'platform-' + platformName;
                //     this.setElementClass(platformClass, true);
                //
                //     let platformVersion = versions[platformName];
                //     if (platformVersion) {
                //         // platform-ios9
                //         platformClass += platformVersion.major;
                //         this.setElementClass(platformClass, true);
                //
                //         // platform-ios9_3
                //         this.setElementClass(platformClass + '_' + platformVersion.minor, true);
                //     }
                // });


                return `${this.mode} ios platform-mobile platform-ios platform-mobileweb`
            },
        },
        methods: {},
        created: function () {
        },
        mounted: function () {
            this._viewport = this.$refs.viewport;
            this._modalPortal = this.$refs.modalPortal;
            this._overlayPortal = this.$refs.overlayPortal;
            this._loadingPortal = this.$refs.loadingPortal;
            this._toastPortal = this.$refs.toastPortal;
        },
        activated: function () {
        },
        components: {}
    }
</script>
