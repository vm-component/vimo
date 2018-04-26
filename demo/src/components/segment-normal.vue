<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
            <Toolbar>
                <!--content-->
                <Segment v-model="fruit" @onChange="onChangeHandler">
                    <SegmentButton value="apple" @onSelect="onSelectHandler">Apple</SegmentButton>
                    <SegmentButton value="orange" @onSelect="onSelectHandler">Orange</SegmentButton>
                    <SegmentButton value="disabled" :disabled="true" @onSelect="onSelectHandler">Disabled
                    </SegmentButton>
                </Segment>
            </Toolbar>
            <Toolbar color="primary">
                <!--content-->
                <Segment color="light" v-model="fruit" @onChange="onChangeHandler">
                    <SegmentButton value="apple" @onSelect="onSelectHandler">Apple</SegmentButton>
                    <SegmentButton value="orange" @onSelect="onSelectHandler">Orange</SegmentButton>
                    <SegmentButton value="disabled" :disabled="true" @onSelect="onSelectHandler">Disabled
                    </SegmentButton>
                </Segment>
            </Toolbar>
        </Header>
        <Content padding>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut blanditiis deserunt dolorem eos id maiores, modi neque nisi non, nostrum
                officia pariatur porro quo recusandae tenetur ullam ut vitae!</p>
            <div><strong>Current: {{fruit}}</strong></div>
            <div><strong>onChange: {{onChangeValue}}</strong></div>
            <div><strong>onSelected: {{onSelectValue}}</strong></div>
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
<script type="text/javascript">
  export default {
    name: 'DemoSegment',
    i18n: {
      messages: {
        'zh-CN': {
          title: '普通用法'
        },
        'en-US': {
          title: 'General usage'
        }
      }
    },
    data () {
      return {
        fruit: 'apple',
        onChangeValue: null,
        onSelectValue: null
      }
    },
    methods: {
      onChangeHandler (val) {
        this.onChangeValue = val
      },
      onSelectHandler (val) {
        this.onSelectValue = val
      }
    }
  }
</script>
