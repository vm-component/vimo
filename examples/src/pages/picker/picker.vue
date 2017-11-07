<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Picker</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <div padding>
                <h5>简介</h5>
                <p>
                    Pick组件用于多列数据选择场景, 比如城市三级/时间选择/自定义多列选择等.
                </p>
            </div>
            <vm-list>
                <vm-list-header>Character</vm-list-header>
                <vm-item button :to="{name:'basicPicker'}">Picker基础组件</vm-item>
                <vm-item button :to="{name:'timePicker'}">日期选择</vm-item>
                <vm-item button :to="{name:'datetimeRangePicker'}">日期范围选择</vm-item>
                <vm-item button :to="{name:'cityPicker'}">城市联动</vm-item>
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
    components: {
    }
  }
</script>
