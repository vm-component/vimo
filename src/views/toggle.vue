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
          普通使用
        </ListHeader>
        <Item>
          Toggle Normal
          <Toggle slot="right"></Toggle>
        </Item>
        <Item>
          Red Toggle
          <Toggle slot="right" color="danger"></Toggle>
        </Item>
        <Item>
          Toggle Open
          <Toggle slot="right" :checked="true"></Toggle>
        </Item>
        <Item>
          Toggle Close
          <Toggle slot="right" :checked="false"></Toggle>
        </Item>
        <Item>
          Toggle Disabled
          <Toggle slot="right" :disabled="true"></Toggle>
        </Item>
      </List>

      <List>
        <ListHeader>
          高级用法
        </ListHeader>
        <Item>
          下方按钮控制
          <Toggle slot="right" :checked="checked" :disabled="disabled" @onChange="toggleChange"></Toggle>
        </Item>
      </List>

      <Grid>
        <Row>
          <Column>
            <Button type="block" @click="setToggle">设置开/闭</Button>
          </Column>
          <Column>
            <Button type="block" @click="setDisable">设置禁用/启用</Button>
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
        this.checked = val;
      },

      setDisable(){
        this.disabled = !this.disabled
      },
    },
    created(){},
    mounted(){},
    activated(){},
    components: {}
  }
</script>
