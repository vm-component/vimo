<template>
   <Page>
     <Header>
       <Navbar>
         <Title>Refresher</Title>
       </Navbar>
     </Header>
     <Content>

       <Refresher slot="refresher" @onRefresh="doRefresh($event)" @onPull="doPulling($event)">
         <RefresherContent
           pullingText="下拉刷新..."
           refreshingText="正在刷新...">
         </RefresherContent>
       </Refresher>

       <List>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
         <Item>1</Item>
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
        methods:{
          doRefresh($event){
            console.debug('doRefresh $event')

            setTimeout(()=>{
              $event.complete()
            },111000)

          },
          doPulling($event){

          }

        },
        created:function(){},
        mounted:function(){},
        activated:function(){},
        components:{}
    }
</script>
