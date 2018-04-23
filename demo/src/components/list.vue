<template>
    <Page>
        <Header>
            <Navbar>
                <Title>List</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>
                    <span>Demo</span>
                </ListHeader>
                <ItemGroup>
                    <Item detail-push to="listAll">{{$t('listAll')}}</Item>
                    <Item detail-push :to="{name:'listBasic'}">{{$t('listBasic')}}</Item>
                    <Item detail-push :to="{name:'listNoLine'}">{{$t('listNoLine')}}</Item>
                    <Item detail-push :to="{name:'listInset'}">{{$t('listInset')}}</Item>
                    <Item detail-push :to="{name:'listDividers'}">{{$t('listDividers')}}</Item>
                    <Item detail-push :to="{name:'listHeaders'}">{{$t('listHeaders')}}</Item>
                    <Item detail-push :to="{name:'listIcon'}">{{$t('listIcon')}}</Item>
                    <Item detail-push :to="{name:'listAvatar'}">{{$t('listAvatar')}}</Item>
                    <Item detail-push :to="{name:'listThumbnail'}">{{$t('listThumbnail')}}</Item>
                    <Item detail-push :to="{name:'listMulti'}">{{$t('listMulti')}}</Item>
                    <Item detail-push :to="{name:'listSliding'}">{{$t('listSliding')}}</Item>
                    <!--<Item detail-push :to="{name:'list.reorder'}">Reorder</Item>-->
                    <Item detail-push :to="{name:'listCollapse'}">{{$t('listCollapse')}}</Item>
                </ItemGroup>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .main {
    }
</style>
<script type="text/javascript">
  export default {
    name: 'DemoList',
    i18n: {
      messages: {
        'zh-CN': {
          listAll: '全特性',
          listBasic: '基础List',
          listNoLine: '没有Border',
          listInset: '嵌入模式',
          listDividers: 'List分隔符',
          listHeaders: 'ListHeader',
          listIcon: '带Icon的List',
          listAvatar: '圆形头像List',
          listThumbnail: '方形头像List',
          listMulti: '多行元素',
          listSliding: '滑动列表',
          listCollapse: '折叠列表'
        },
        'en-US': {
          listAll: 'All Feature',
          listBasic: 'Basic Usage',
          listNoLine: 'No Border',
          listInset: 'Inset Mode',
          listDividers: 'List Divider',
          listHeaders: 'List Header',
          listIcon: 'List Icon',
          listAvatar: 'With Avatar',
          listThumbnail: 'With Thumbnail',
          listMulti: 'Multi line',
          listSliding: 'Sliding List',
          listCollapse: 'Collapse List'
        }
      }
    }
  }
</script>
