<template>
    <Page>
        <Header>
            <Navbar>
                <Title ref="title">Page</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item detail-push :to="{name:'contentContext'}">文本</Item>
                <!--<Item detail-push :to="{name:'contentFixed'}">流式布局</Item>-->
                <Item detail-push :to="{name:'contentBox'}">盒子布局</Item>
                <Item detail-push :to="{name:'contentHideBars'}">隐藏头尾Bar</Item>
                <Item detail-push :to="{name:'contentSetBarStyle'}">设置Bar的样式</Item>
                <Item detail-push :to="{name:'contentScroll'}">滚动监听</Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    components: {},
    mounted () {}
  }
</script>
