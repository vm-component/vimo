<template>
    <div class="ion-title title" :class="[titleClass]">
        <div class="toolbar-title" :class="[toolbarTitleClass]"><slot></slot></div>
    </div>
</template>
<style lang="scss">

</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{}
        },
        props: {
            /**
             * mode 按钮风格 ios/window/android/we/alipay
             * */
            mode: {
                type: String,
                default: 'ios',
            },
        },
        watch:{

        },
        computed:{
            // 环境样式
            titleClass: function () {
                return `title-${this.mode}`
            },
            toolbarTitleClass: function () {
                return `toolbar-title-${this.mode}`
            },
        },
        methods:{},
        created:function(){},
        mounted:function(){},
        activated:function(){},
        components:{}
    }
</script>
