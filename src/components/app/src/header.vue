<template>
    <div class="ion-header header" :class="[modeClass]">
        <slot></slot>
    </div>
</template>
<style  lang="scss">

</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {
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
                return `header-${this.mode}`
            },
        },
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