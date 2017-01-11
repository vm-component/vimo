<template>
    <div class="ion-buttons bar-buttons" :class="[modeClass]">
        <slot></slot>
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
            modeClass: function () {
                return `bar-buttons-${this.mode}`
            },
        },
        methods:{},
        created:function(){},
        mounted:function(){},
        activated:function(){},
        components:{}
    }
</script>
