<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <h4>{{$t('notice')}}: </h4>
                <p>{{$t('noticeInfo')}}</p>
            </div>
            <div padding>
                <h5>Demo</h5>
            </div>
            <NoticeBar class="noticeBar">
                {{$t('noticeBar')}}
            </NoticeBar>
            <NoticeBar class="noticeBar" type="warn">
                {{$t('noticeBar')}}
            </NoticeBar>
            <NoticeBar class="noticeBar" type="hide">
                {{$t('noticeBar')}}
            </NoticeBar>
            <NoticeBar class="noticeBar" action="right">
                {{$t('noticeBar')}}
            </NoticeBar>
            <NoticeBar class="noticeBar" action="hide">
                {{$t('noticeBar')}}
            </NoticeBar>
            <NoticeBar class="noticeBar" type="hide" action="hide">
                {{$t('noticeBar')}}
            </NoticeBar>
            <div padding>
                <h5>{{$t('close')}}</h5>
            </div>
            <NoticeBar :onDismiss="onDismissHandler">{{$t('shoreNoticeBar')}}</NoticeBar>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .noticeBar {
        margin-bottom: 10px;
    }
</style>
<script type="text/javascript">
  export default {
    name: 'DemoNoticeBar',
    i18n: {
      messages: {
        'zh-CN': {
          title: '提示条',
          notice: '注意',
          noticeInfo: '这是一个通知条. 如果长度超过容器的宽度时, 则会自动滚动. 此时设置的speed和delay将会在这个情况生效. 其中speed属性的单位是px/s',
          noticeBar: '国庆节期间余额宝收益和转出到账时间调整到节后, 给您带来不便, 敬请谅解!',
          close: '关闭回调',
          shoreNoticeBar: '这是一个很简短的通知, 不会滚动'
        },
        'en-US': {
          title: 'Notice Bar',
          notice: 'Notice',
          noticeInfo: 'This is a notification bar. If the length exceeds the width of the container, it will automatically scroll. The speed and delay set at this time will take effect in this case. The unit of the speed attribute is px/s.',
          noticeBar: 'During the National Day, the balance of income and the time of transfer to the account are adjusted to the post-holiday period. This will cause inconvenience to you. Please understand!',
          close: 'Close callback',
          shoreNoticeBar: 'This is a very brief notification and will not scroll.'
        }
      }
    },
    methods: {
      onDismissHandler () {
        window.alert('这个NoticeBar关闭了')
      }
    }
  }
</script>
