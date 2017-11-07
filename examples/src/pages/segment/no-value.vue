<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>普通用法</vm-title>
            </vm-navbar>
            <vm-toolbar>
                <!--content-->
                <vm-segment v-model="fruit" @onChange="onChangeHandler">
                    <vm-segment-button @onSelect="onSelectHandler">Apple</vm-segment-button>
                    <vm-segment-button @onSelect="onSelectHandler">Orange</vm-segment-button>
                    <vm-segment-button @onSelect="onSelectHandler">Pear</vm-segment-button>
                </vm-segment>
            </vm-toolbar>
        </vm-header>
        <vm-content padding>
            <h1>Title</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <div><strong>当前选择的结果: {{fruit}}</strong></div>
            <div><strong>onChange返回结果: {{onChangeValue}}</strong></div>
            <div><strong>onSelected返回结果: {{onSelectValue}}</strong></div>
            <vm-button block @click="fruit='Orange'">设置为Orange</vm-button>
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
        </vm-content>
    </vm-page>
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
