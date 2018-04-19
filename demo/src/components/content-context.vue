<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('contentContext')}}</Title>
            </Navbar>
            <Toolbar>
                <Segment value="1">
                    <SegmentButton value="1">Chapter One</SegmentButton>
                    <SegmentButton value="2">Chapter Two</SegmentButton>
                    <SegmentButton value="3">Chapter Three</SegmentButton>
                </Segment>
            </Toolbar>
        </Header>
        <Content padding class="outer-content">
            <h1>This is the h1 tag</h1>
            <h1>This is the h1 tag</h1>
            <h2>This is the h2 tag</h2>
            <h3>This is the h3 tag</h3>
            <h4>This is the h4 tag</h4>
            <h5>This is the h5 tag</h5>
            <h6>This is the h6 tag</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum ex, excepturi fugiat inventore minus praesentium. Aperiam delectus, expedita illo
               necessitatibus repudiandae soluta tenetur! Culpa dolorem ipsam nemo, quas quibusdam suscipit!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum ex, excepturi fugiat inventore minus praesentium. Aperiam delectus, expedita illo
               necessitatibus repudiandae soluta tenetur! Culpa dolorem ipsam nemo, quas quibusdam suscipit!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum ex, excepturi fugiat inventore minus praesentium. Aperiam delectus, expedita illo
               necessitatibus repudiandae soluta tenetur! Culpa dolorem ipsam nemo, quas quibusdam suscipit!</p>
        </Content>
        <Footer>
            <Toolbar>
                <Segment value="1">
                    <SegmentButton value="1">Chapter One</SegmentButton>
                    <SegmentButton value="2">Chapter Two</SegmentButton>
                    <SegmentButton value="3">Chapter Three</SegmentButton>
                </Segment>
            </Toolbar>
        </Footer>
    </Page>
</template>
<style scoped lang="scss">
    .main {

    }
</style>
<script type="text/javascript">
  export default {
    name: 'DemoContext',
    i18n: {
      messages: {
        'zh-CN': {
          contentContext: '文本'
        },
        'en-US': {
          contentContext: 'Context'
        }
      }
    }
  }
</script>
