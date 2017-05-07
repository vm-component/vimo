<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Nav</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <p>Nav组件是在Page组件之上, 用于控制转场动画/转场的Indicator提示等. </p>


            <h4>当前Nav配置</h4>
            <Grid>
                <Row>
                    <Column col-4><strong>当前转场动画:</strong></Column>
                    <Column col-8>{{$config.get('pageTransition')}}</Column>
                </Row>
            </Grid>

        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .detailBox {
        margin-bottom: 5px;

        .detailBox__title {
            color: #000;
            font-weight: bold;
        }
        .detailBox__value {
            color: #333;
        }
    }
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

      this.$config.get('pageTransition')

    },
    activated () {},
    components: {}
  }
</script>
