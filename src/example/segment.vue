<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Segment</Title>
            </Navbar>
            <Toolbar>
                <!--content-->
                <Segment v-model="relationship9" @onChange="onChange">
                    <SegmentButton value="friend1" @onSelected="onSelected">friend1</SegmentButton>
                    <SegmentButton value="friend2" @onSelected="onSelected">friend2</SegmentButton>
                    <SegmentButton value="friend3" @onSelected="onSelected">friend3</SegmentButton>
                </Segment>
            </Toolbar>
        </Header>
        <Content padding>
            {{relationship9}}
            <p>这里是数据</p>
            <p>这里是数据</p>
            <Button type="block" @click="relationship9='friend2'">设置为第二个Segment</Button>
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
    methods: {
      onChange(val){
        console.debug('当前的Segment值发生变化: ' + val)
      },
      onSelected(val){
        console.debug('点击了Segment按钮, 这个按钮的值: ' + val)
      }

    },
    created () {},
    mounted () {},
    activated () {},
    components: {Segment, SegmentButton}
  }
</script>
