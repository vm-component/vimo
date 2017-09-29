<template>
    <Page>
        <Header>
            <Navbar>
                <Title>组件异步加载</Title>
            </Navbar>
            <Toolbar class="dashBox">
                <section class="dashLine">
                    <!--content-->
                    <Segment v-model="fruit" @onChange="onChangeHandler">
                        <SegmentButton v-for="(seg, index) in segmentList" :value="seg.value"
                                       @onSelect="onSelectHandler"
                                       :key="index">
                            <span>{{seg.name}}</span>
                        </SegmentButton>
                    </Segment>
                </section>
            </Toolbar>
        </Header>
        <Content padding>
            <h1>Title</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <div><strong>当前选择的结果: {{fruit}}</strong></div>
            <div><strong>onChange返回结果: {{onChangeValue}}</strong></div>
            <div><strong>onSelected返回结果: {{onSelectValue}}</strong></div>
            <Button block @click="getSegmentData">点击加载Segment</Button>
            <Button block @click="addSegmentBtn">增加一个按钮</Button>
            <Button block @click="fruit='orange'">设置为Orange</Button>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
        </Content>
    </Page>
</template>
<style lang="less">
    .dashBox {
        padding: 0;
    }

    .dashLine {
        height: 38px;
        width: 100%;
        margin: 3px 0;
        border: 1px dashed #000;
    }
</style>
<script type="text/javascript">
  export default{
    name: 'async',
    data () {
      return {
        segmentList: [],
        fruit: 'apple',
        onChangeValue: null,
        onSelectValue: null
      }
    },
    methods: {
      getSegmentData () {
        if (this.segmentList.length === 0) {
          this.segmentList = [
            {
              value: 'apple',
              name: 'Apple'
            },
            {
              value: 'orange',
              name: 'Orange'
            },
            {
              value: 'pear',
              name: 'Pear'
            }
          ]
        }
      },
      addSegmentBtn () {
        if (this.segmentList.length === 3) {
          this.segmentList.push({
            value: 'banana',
            name: 'Banana'
          })
        }
      },
      onChangeHandler (val) {
        console.debug('当前的Segment值发生变化: ' + val)
        this.onChangeValue = val
      },
      onSelectHandler (val) {
        console.debug('点击了SegmentButton按钮, 这个按钮的值: ' + val)
        this.onSelectValue = val
      }
    }
  }
</script>
