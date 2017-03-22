<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Cards</Title>
      </Navbar>
    </Header>
    <Content>
      <List>
        <!--header-->
        <ListHeader>
          Contents
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name:'cards.basicCards'}">Basic Cards</Item>
          <Item button :to="{name:'cards.listsInCards'}">Lists In Cards</Item>
          <Item button :to="{name:'cards.advancedCards'}">Advanced Cards</Item>

        </ItemGroup>
      </List>
    </Content>
  </Page>
</template>
<style scoped lang="scss">
 .main{

 }
</style>
<script type="text/ecmascript-6">
    export default{
        name:'name',
        data(){
            return{}
        },
        props:{},
        watch:{},
        computed:{},
        methods:{},
        created:function(){},
        mounted:function(){},
        activated:function(){},
        components:{}
    }
</script>
