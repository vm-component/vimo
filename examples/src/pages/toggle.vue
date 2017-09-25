<template>
    <Page>
        <Header>
            <Navbar>
                <Title>
                    Toggle
                </Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>
                    <span>普通使用</span>
                </ListHeader>
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
                <h5>单独使用</h5>
                <div class="customer-standalone">
                    <Toggle slot="item-right" color="danger" v-model="displayData.danger"></Toggle>
                </div>
            </section>


            <List>
                <ListHeader>
                    <span>高级用法</span>
                </ListHeader>
                <Item>
                    <span>下方按钮控制</span>
                    <Toggle v-model="checked" slot="item-right" :disabled="disabled"
                            @onChange="toggleChange"></Toggle>
                </Item>
            </List>

            <Grid>
                <Row>
                    <Column>
                        <Button block @click="checked = !checked">设置开/闭</Button>
                    </Column>
                    <Column>
                        <Button block @click="disabled = !disabled">设置禁用/启用</Button>
                    </Column>
                </Row>
                <Row justify-content-center>
                    <Column text-center col-12>当前状态, checked: {{checked}}, disabled: {{disabled}}</Column>
                    <Column text-center col-12>* 使用v-model切换状态, 不支持checked属性</Column>
                </Row>
            </Grid>

        </Content>
    </Page>
</template>
<style scoped lang="less">
    .customer-standalone {
        height: 44px;
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #333;
    }
</style>
<script type="text/javascript">
  export default {
    name: 'toggle',
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
    props: {},
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
