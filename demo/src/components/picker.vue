<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Picker</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item detail-push :to="{name:'pickerBase'}">{{$t('basic')}}</Item>
                <Item detail-push :to="{name:'pickerTime'}">{{$t('pickerTime')}}</Item>
                <Item detail-push :to="{name:'pickerDatetime'}">{{$t('rangePicker')}}</Item>
                <Item detail-push :to="{name:'pickerCity'}">{{$t('cityPicker')}}</Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/javascript">
  export default {
    name: 'DemoPick',
    i18n: {
      messages: {
        'zh-CN': {
          basic: '基础使用',
          pickerTime: '日期事件选择',
          rangePicker: '日期范围选择',
          cityPicker: '城市选择'
        },
        'en-US': {
          basic: 'Basic Usage',
          pickerTime: 'DateTime Picker',
          rangePicker: 'Range Picker',
          cityPicker: 'City Picker'
        }
      }
    }
  }
</script>
