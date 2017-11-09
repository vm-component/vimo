<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Badage</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <div padding>
                <h5>
                    <vm-badge>组件</vm-badge>&ensp;简介
                </h5>
            </div>

            <vm-list>
                <vm-list-header>菜单</vm-list-header>
                <vm-item button>
                    <span>西红柿炒鸡蛋</span>
                    <vm-badge slot="item-end">new</vm-badge>
                </vm-item>
                <vm-item button>
                    <span>牛肉面</span>
                    <vm-badge slot="item-end" color="danger">Top5</vm-badge>
                </vm-item>
                <vm-item button>
                    <span>肉夹馍</span>
                    <vm-badge slot="item-end" color="secondary">陕西</vm-badge>
                </vm-item>
                <vm-item button>
                    <span>松鼠桂鱼</span>
                    <vm-badge slot="item-end" color="dark">江南</vm-badge>
                </vm-item>
                <vm-item button>
                    <span>酱骨</span>
                    <vm-note slot="item-end">我比较喜欢</vm-note>
                    <vm-badge slot="item-end" color="light">东北</vm-badge>
                </vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default {
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
    activated () {}
  }
</script>
