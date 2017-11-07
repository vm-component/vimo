<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>日期范围选择</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <vm-list-header>选择范围</vm-list-header>
                <vm-item>
                    <vm-label>
                        2017/07/01 ~ 2017/12/01
                    </vm-label>
                    <Datetime slot="item-right"
                              min="2017-07-01"
                              max="2017-12-01"
                    ></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>
                        2017/01/01 ~ 2017/12/01
                    </vm-label>
                    <Datetime slot="item-right"
                              min="2017-01-01"
                              max="2017-12-01"
                    ></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>
                        2017/01/15 ~ 2017/01/30
                    </vm-label>
                    <Datetime slot="item-right"
                              min="2017-01-15"
                              max="2017-01-30"
                    ></Datetime>
                </vm-item>
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
    mounted () {},
    activated () {},
    deactivate () {},
    destroyed () {}
  }
</script>
