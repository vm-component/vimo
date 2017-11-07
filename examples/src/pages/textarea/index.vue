<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Textarea</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <div padding>
                <p>Textarea组件使用示例</p>
            </div>
            <vm-list>
                <vm-list-header>使用场景</vm-list-header>
                <vm-item button :to="{name:'textarea.normal'}">普通用法</vm-item>
                <vm-item button :to="{name:'textarea.event'}">输入事件</vm-item>
                <vm-item button :to="{name:'textarea.valid'}">验证</vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
  export default {
    name: 'TextareaDemo',
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
    components: {},
    destroyed () {}
  }
</script>
<style scoped lang="less">

</style>
