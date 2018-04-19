<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
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
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum
                officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <div><strong>Current: {{fruit}}</strong></div>
            <div><strong>onChange: {{onChangeValue}}</strong></div>
            <div><strong>onSelected: {{onSelectValue}}</strong></div>
            <Button block @click="getSegmentData">Add Segment Async</Button>
            <Button block @click="addSegmentBtn">Add Btn</Button>
            <Button block @click="fruit='orange'">Set Orange</Button>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum
                officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum
                officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum
                officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum
                officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum
                officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum
                officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum
                officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum
                officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
        </Content>
    </Page>
</template>
<style lang="scss">
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
  export default {
    name: 'async',
    i18n: {
      messages: {
        'zh-CN': {
          title: '异步加载组件'
        },
        'en-US': {
          title: 'Async loading'
        }
      }
    },
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
            }
          ]
        }
      },
      addSegmentBtn () {
        if (this.segmentList.length === 2) {
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
