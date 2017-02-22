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
           <Input placeholder="Text Input"></Input>
         </Item>

         <Item>
           <Label color="primary" fixed type="fixed">Fixed Label With Long Name</Label>
           <Input type="tel" placeholder="Tel Input"></Input>
         </Item>

         <Item>
           <Input type="number" placeholder="Number Input with no label"></Input>
         </Item>

         <Item>
           <Label color="primary" stacked type="stacked">Stacked Label</Label>
           <Input type="email" placeholder="Email Input"></Input>
         </Item>

         <Item>
           <Label color="primary" stacked type="stacked">Stacked Label</Label>
           <Input type="password" placeholder="Password Input"></Input>
         </Item>

         <Item>
           <Label color="primary" floating type="floating">Floating Label</Label>
           <Input></Input>
         </Item>

         <Item>
           <Input placeholder="Clear Input" clearInput></Input>
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
