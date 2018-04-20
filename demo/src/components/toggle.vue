<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item>
                    <span>Toggle Danger</span>
                    <Toggle slot="item-right" color="danger" v-model="displayData.danger"></Toggle>
                </Item>
                <Item>
                    <span>Toggle Primary</span>
                    <Toggle slot="item-right" color="primary" v-model="displayData.primary"></Toggle>
                </Item>
                <Item>
                    <span>Toggle Dark</span>
                    <Toggle slot="item-right" color="dark" v-model="displayData.dark"></Toggle>
                </Item>
                <Item>
                    <span>Toggle Light</span>
                    <Toggle slot="item-right" color="light" v-model="displayData.light"></Toggle>
                </Item>
                <Item>
                    <span>Toggle Disabled</span>
                    <Toggle slot="item-right" :disabled="displayData.disabled" v-model="displayData.disabled"></Toggle>
                </Item>
            </List>
            <section padding>
                <p><strong>Use alone</strong></p>
                <div class="customer-standalone">
                    <Toggle slot="item-right" color="danger" v-model="displayData.danger"></Toggle>
                </div>
            </section>
            <List>
                <ListHeader>
                    <span>Advance</span>
                </ListHeader>
                <Item>
                    <span>{{$t('itemNotice')}}</span>
                    <Toggle v-model="checked" slot="item-right" :disabled="disabled"
                            @onChange="toggleChange"></Toggle>
                </Item>
            </List>
            <Grid>
                <Row>
                    <Column>
                        <Button block @click="checked = !checked">{{$t('open')}}</Button>
                    </Column>
                    <Column>
                        <Button block @click="disabled = !disabled">{{$t('disable')}}</Button>
                    </Column>
                </Row>
                <Row justify-content-center>
                    <Column text-center col-12>{{$t('currentState')}}, checked: {{checked}}, disabled: {{disabled}}</Column>
                    <Column text-center col-12>* {{$t('notice')}}</Column>
                </Row>
            </Grid>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .customer-standalone {
        height: 44px;
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #333;
        overflow: hidden;
        position: relative;
    }
</style>
<script type="text/javascript">
  export default {
    name: 'DemoToggle',
    i18n: {
      messages: {
        'zh-CN': {
          title: '开关',
          itemNotice: '下方按钮控制',
          open: '设置开/闭',
          disable: '设置禁用/启用',
          currentState: '当前状态',
          notice: '使用v-model切换状态, 不支持checked属性'
        },
        'en-US': {
          title: 'Toggle',
          itemNotice: 'Use button control',
          open: 'Set on/off',
          disable: 'Set disabled/enabled',
          currentState: 'Current state',
          notice: 'Use v-model switch state, does not support checked attribute'
        }
      }
    },
    data () {
      return {
        displayData: {
          danger: false,
          primary: true,
          dark: false,
          light: true,
          disabled: true
        },
        checked: true,
        disabled: false
      }
    },
    watch: {
      displayData: {
        handler () {
          console.debug(JSON.parse(JSON.stringify(this.displayData)))
        },
        deep: true
      }
    },
    methods: {
      toggleChange (val) {
        console.debug('toogle changed, value:' + val)
      }
    }
  }
</script>
