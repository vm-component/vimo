<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Scroll</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <div padding>
                <p>Scroll组件是对better-scroll的包装, 因此使用参考它的API即可</p>
            </div>
            <vm-list>
                <vm-list-header>示例</vm-list-header>
                <vm-item button :to="{name:'normalScroll'}">简单示例</vm-item>
                <vm-item button :to="{name:'cityScroll'}">城市列表</vm-item>
                <vm-item button :to="{name:'userCenterScroll'}">用户中心</vm-item>
                <!--<vm-item>1</vm-item>-->
                <!--<vm-item>1</vm-item>-->
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default{
    name: 'name',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {
    },
    activated () {}
  }
</script>
