<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Segment</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <p>Segment组件可以理解为一个联动按钮组, 他不整合路由相关的部分, 因此, 如果要将路由切换与Segment组件绑定使用需要额外的代码.</p>
                <p>这里对Segment组件可能的组合及使用方式进行列举.</p>
            </div>
            <List>
                <ListHeader>使用场景</ListHeader>
                <Item button :to="{name:'segmentNormal'}">普通用法</Item>
                <Item button :to="{name:'segmentAnimate'}">使用animate切换</Item>
                <Item button :to="{name:'segmentWithSwiper'}">使用手势切换</Item>
                <Item button :to="{name:'segmentAsync'}">异步加载组件</Item>
                <Item button :to="{name:'segmentNoValue'}">没标注value</Item>
            </List>
        </Content>
    </Page>
</template>
<style lang="less">
</style>
<script type="text/javascript">
  export default{}
</script>
