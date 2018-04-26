<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item>
                    <Label>Danger</Label>
                    <Checkbox slot="item-left" color="danger" v-model="displayData.danger"></Checkbox>
                    <Toggle slot="item-right"></Toggle>
                </Item>
                <Item>
                    <Label>Primary</Label>
                    <Checkbox slot="item-left" color="primary" v-model="displayData.primary"></Checkbox>
                </Item>
                <Item>
                    <Label>Dark</Label>
                    <Checkbox slot="item-left" color="dark" v-model="displayData.dark"></Checkbox>
                </Item>
                <Item>
                    <Label>Light</Label>
                    <Checkbox slot="item-left" color="light" v-model="displayData.light"></Checkbox>
                </Item>
                <Item>
                    <Label>Disabled</Label>
                    <Checkbox slot="item-left" :disabled="displayData.disabled"
                              v-model="displayData.disabled"></Checkbox>
                </Item>
            </List>

            <section padding>
                <p><strong>{{$t('usedAlone')}}</strong></p>
                <div class="customer-standalone">
                    <Checkbox color="danger" v-model="displayData.danger"></Checkbox>
                </div>
            </section>

            <List>
                <ListHeader>{{$t('itemNotice')}}</ListHeader>
                <Item>
                    <Label>Danger</Label>
                    <Checkbox slot="item-left" color="danger" v-model="testModal" :disabled="testDisabled"
                              @onChange="onCheckboxChange"></Checkbox>
                </Item>
            </List>
            <Grid>
                <Row justify-content-center>
                    <Column text-center>
                        <strong> Current Value: </strong>
                        <span>{{testModal}}</span>
                    </Column>
                    <Column text-center>
                        <strong> Disabled State: </strong>
                        <span>{{testDisabled}}</span>
                    </Column>
                </Row>
                <Row justify-content-center>
                    <Column col-1></Column>
                    <Column>
                        <Button block @click="testModal =!testModal">{{$t('open')}}</Button>
                    </Column>
                    <Column>
                        <Button block @click="testDisabled =!testDisabled">{{$t('disable')}}</Button>
                    </Column>
                    <Column col-1></Column>
                </Row>
            </Grid>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .customer-standalone {
        position: relative;
        height: 44px;
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #333;
        overflow: hidden;
        .ion-checkbox {
            position: static;
        }
    }
</style>
<script type="text/javascript">
  export default {
    name: 'DemoCheckBox',
    i18n: {
      messages: {
        'zh-CN': {
          title: '复选框',
          itemNotice: '下方按钮控制',
          usedAlone: '单独使用',
          open: '设置开/闭',
          disable: '设置禁用/启用'
        },
        'en-US': {
          title: 'Checkbox',
          itemNotice: 'Use button control',
          usedAlone: 'Use alone',
          open: 'Set on/off',
          disable: 'Set disabled/enabled',
          currentState: 'Current state'
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

        testModal: true,
        testDisabled: false
      }
    },
    props: {},
    watch: {
      displayData: {
        handler () {
          console.debug(JSON.parse(JSON.stringify(this.displayData)))
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      onCheckboxChange (val) {
        console.debug('onCheckboxChange:' + val)
      }
    },
    created () {},
    mounted () {},
    activated () {}
  }
</script>
