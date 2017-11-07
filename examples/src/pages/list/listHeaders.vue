<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>ListHeaders</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <vm-list-header>
                    Action-1
                </vm-list-header>
                <vm-item-group>
                    <vm-item>Terminator II</vm-item>
                    <vm-item>The Empire Strikes Back</vm-item>
                    <vm-item>Blade Runner</vm-item>
                </vm-item-group>

                <vm-list-header>
                    Action-2
                </vm-list-header>
                <vm-item-group>
                    <vm-item>Terminator II</vm-item>
                    <vm-item>The Empire Strikes Back</vm-item>
                    <vm-item>Blade Runner</vm-item>
                </vm-item-group>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {}
  }
</script>
