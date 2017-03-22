<template>
  <Page>
    <Header>
      <Toolbar>
        <Title>菜单</Title>
      </Toolbar>
    </Header>
    <Content>
      <List>
        <!--开始-->
        <ListHeader>
          开始
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <!--delay 表示等待关闭事件-->
          <Item button :to="{name: 'introduce'}" delay>
            介绍
          </Item>
          <Item button :to="{name: 'howToStart'}" delay>
            如何开始
          </Item>
          <Item button :to="{name: 'equipment'}" delay>
            当前设备信息
          </Item>
        </ItemGroup>
      </List>
      <Button @click="openOtherOne">开启另一个</Button>
    </Content>
  </Page>
</template>
<style scoped lang="scss">
 .main{

 }
</style>
<script type="text/ecmascript-6">
    export default{
        name:'menu',
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
