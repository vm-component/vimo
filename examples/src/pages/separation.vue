<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Separation</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding class="outer-content">
            <h1>Separation组件</h1>
            <p>该组件用于分割内容区块, 或者尾部提示等位置使用.</p>
            <p><strong>例如:</strong></p>
            <vm-separation>
                <vm-icon name="logo-chrome" small></vm-icon>
                <span>I Love Chrome</span>
            </vm-separation>
            <vm-separation>
                <vm-icon name="logo-javascript" small></vm-icon>
                <span>Hello JS</span>
            </vm-separation>
            <vm-separation>
                <vm-icon name="heart" color="danger" small></vm-icon>
                <span>猜你喜欢</span>
            </vm-separation>
            <vm-separation>
                <vm-icon name="flame" color="danger" small></vm-icon>
                <span> 热门推荐</span>
            </vm-separation>
            <vm-separation>
                <vm-icon name="text" small></vm-icon>
                <span>亲, 看完了</span>
            </vm-separation>
            <vm-separation>分享</vm-separation>
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
    mounted () {},
    activated () {},
    deactivate () {},
    destroyed () {}
  }
</script>
