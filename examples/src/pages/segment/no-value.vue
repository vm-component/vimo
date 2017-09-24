<template>
    <Page>
        <Header>
            <Navbar>
                <Title>普通用法</Title>
            </Navbar>
            <Toolbar>
                <!--content-->
                <Segment v-model="fruit" @onChange="onChangeHandler">
                    <SegmentButton @onSelect="onSelectHandler">Apple</SegmentButton>
                    <SegmentButton @onSelect="onSelectHandler">Orange</SegmentButton>
                    <SegmentButton @onSelect="onSelectHandler">Pear</SegmentButton>
                </Segment>
            </Toolbar>
        </Header>
        <Content padding>
            <h1>Title</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <div><strong>当前选择的结果: {{fruit}}</strong></div>
            <div><strong>onChange返回结果: {{onChangeValue}}</strong></div>
            <div><strong>onSelected返回结果: {{onSelectValue}}</strong></div>
            <Button block @click="fruit='Orange'">设置为Orange</Button>
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

</style>
<script type="text/javascript">
  export default {
    name: 'no-value',
    data () {
      return {
        fruit: 'Apple',
        onChangeValue: null,
        onSelectValue: null
      }
    },
    methods: {
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
