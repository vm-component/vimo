<template>
    <Page>
        <Header>
            <Navbar>
                <Title>
                    Toggle
                  </Title>
            </Navbar>
        </Header>
        <Content>
            <List>
                <ListHeader>
                    <span>普通使用</span>
                </ListHeader>
                <Item>
                    <span>Toggle Normal</span>
                    <Toggle slot="item-right"></Toggle>
                </Item>
                <Item>
                    <span>Red Toggle</span>
                    <Toggle slot="item-right" color="danger"></Toggle>
                </Item>
                <Item>
                    <span>Toggle Open</span>
                    <Toggle slot="item-right" :checked="true"></Toggle>
                </Item>
                <Item>
                    <span>Toggle Close</span>
                    <Toggle slot="item-right" :checked="false"></Toggle>
                </Item>
                <Item>
                    <span>Toggle Disabled</span>
                    <Toggle slot="item-right" :disabled="true"></Toggle>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>高级用法</span>
                </ListHeader>
                <Item>
                    <span>下方按钮控制</span>
                    <Toggle v-model="checked" :checked="true" slot="item-right" :disabled="disabled"
                            @onChange="toggleChange"></Toggle>
                </Item>
            </List>

            <Grid>
                <Row>
                    <Column>
                        <Button block @click="setToggle">设置开/闭</Button>
                    </Column>
                    <Column>
                        <Button block @click="setDisable">设置禁用/启用</Button>
                    </Column>
                </Row>
                <Row justify-content-center>
                    <Column text-center col-12>当前状态, checked: {{checked}}, disabled: {{disabled}}</Column>
                    <Column text-center col-12>* checked数据不是双向绑定的, 因为vue的组件设计哲学是通过[事件]传递组件的状态变化</Column>
                </Row>
            </Grid>

        </Content>
    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/ecmascript-6">
  import { List } from 'vimo/components/list'
  import { ListHeader, Item } from 'vimo/components/item'
  import { Toggle } from 'vimo/components/toggle'
  export default{
    name: 'toggle',
    data(){
      return {
        checked: false,
        disabled: false,
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      setToggle(){
        this.checked = !this.checked
      },
      toggleChange(val){
        console.debug('toogle changed, value:' + val)
      },

      setDisable(){
        this.disabled = !this.disabled
      },
    },
    created(){},
    mounted(){},
    activated(){},
    components: {
      List, ListHeader, Item, Toggle
    }
  }
</script>
