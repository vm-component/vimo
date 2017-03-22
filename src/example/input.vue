<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Input</Title>
      </Navbar>
    </Header>
    <Content>

      <List>
        <ListHeader>
          Input
        </ListHeader>
        <Item>
          <Label color="primary">Inline Label Is In Line</Label>
          <Input placeholder="Text Input"></Input>
        </Item>

        <Item>
          <Label color="primary" fixed>Fixed Label With Long Name</Label>
          <Input type="tel" placeholder="Tel Input"></Input>
        </Item>

        <Item>
          <Input type="number" placeholder="Number Input with no label"></Input>
        </Item>

        <Item>
          <Label color="primary" stacked>Stacked Label</Label>
          <Input type="email" placeholder="Email Input"></Input>
        </Item>

        <Item>
          <Label color="primary" stacked>Stacked Label</Label>
          <Input type="password" placeholder="Password Input"></Input>
        </Item>

        <Item>
          <Label color="primary" floating>Floating Label</Label>
          <Input></Input>
        </Item>

        <Item>
          <Input placeholder="Clear Input" :clearInput="true"></Input>
        </Item>
      </List>

      <List>
        <ListHeader>
          Textarea
        </ListHeader>
        <Item>
          <Textarea placeholder="Enter a description"></Textarea>
        </Item>
      </List>

      <List>
        <ListHeader>
          Textarea
        </ListHeader>
        <Item>
          <Textarea placeholder="Enter a description"></Textarea>
        </Item>
      </List>

      <List>
        <ListHeader>
          测试
        </ListHeader>
        <Item>
          <Label color="primary">TestValue</Label>
          <Input :debounce="500" :clearInput="true" placeholder="Text Input" v-model="testValue" :disabled="testDisabled"></Input>
        </Item>
        <Item>
          当前的值: {{testValue}}
        </Item>
        <Item>
          <Button @click="disableToggle">Disable Toggle</Button>
        </Item>
      </List>
    </Content>
  </Page>
</template>
<style lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'name',
    data(){
      return {
        testValue:'hello',
        testDisabled:false,
      }
    },
    props: {},
    watch: {


    },
    computed: {},
    methods: {
      disableToggle(){
        this.testDisabled = !this.testDisabled;
      }
    },
    created(){},
    mounted(){},
    activated(){},
    components: {}
  }
</script>
