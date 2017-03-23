<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Segment</Title>
            </Navbar>
            <Toolbar>
                <!--content-->
                <Segment :value="relationship9" slot="content">
                    <SegmentButton value="friend1">friend1</SegmentButton>
                    <SegmentButton value="friend2">friend2</SegmentButton>
                    <SegmentButton value="friend3">friend2</SegmentButton>
                </Segment>
            </Toolbar>
        </Header>
        <Content padding>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
            <p>这里是数据</p>
        </Content>
        <Footer>
            <Toolbar>
                <!--content-->
                <Segment :value="relationship9" slot="content">
                    <SegmentButton value="friend1">friend1</SegmentButton>
                    <SegmentButton value="friend2">friend2</SegmentButton>
                    <SegmentButton value="friend3">friend2</SegmentButton>
                </Segment>
            </Toolbar>
        </Footer>
    </Page>
</template>
<style lang="scss">

</style>
<script type="text/ecmascript-6">
  import { Segment, SegmentButton } from 'vimo/components/segment'
  export default{
    data(){
      return {
        relationship9: 'friend1'
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    components: {Segment, SegmentButton}
  }
</script>
