<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Picker</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <h5>简介</h5>
                <p>
                    Pick组件用于多列数据选择场景, 比如城市三级/时间选择/自定义多列选择等.
                </p>
            </div>
            <List>
                <ListHeader>Character</ListHeader>
                <Item detail-push :to="{name:'pickerBase'}">Picker基础组件</Item>
                <Item detail-push :to="{name:'pickerTime'}">日期选择</Item>
                <Item detail-push :to="{name:'pickerDatetime'}">日期范围选择</Item>
                <Item detail-push :to="{name:'pickerCity'}">城市联动</Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

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
