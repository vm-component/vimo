<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Input</Title>
      </Navbar>
    </Header>
    <Content>

       <List>
         <Item>
           <Label color="primary">Inline Label Is In Line</Label>
           <Input placeholder="Text Input">
         </Item>

         <Item>
           <Label color="primary" fixed>Fixed Label With Long Name</Label>
           <Input type="tel" placeholder="Tel Input">
         </Item>

         <Item>
           <Input type="number" placeholder="Number Input with no label">
         </Item>

         <Item>
           <Label color="primary" stacked>Stacked Label</Label>
           <Input type="email" placeholder="Email Input">
         </Item>

         <Item>
           <Label color="primary" stacked>Stacked Label</Label>
           <Input type="password" placeholder="Password Input">
         </Item>

         <Item>
           <Label color="primary" floating>Floating Label</Label>
           <Input>
         </Item>

         <Item>
           <Input placeholder="Clear Input" clearInput>
         </Item>

         <!--<Item>-->
           <!--<Textarea placeholder="Enter a description"></Textarea>-->
         <!--</Item>-->
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
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created(){},
    mounted(){},
    activated(){},
    components: {}
  }
</script>
