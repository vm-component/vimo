<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Segment</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item detail-push :to="{name:'segmentNormal'}">普通用法</Item>
                <Item detail-push :to="{name:'segmentAnimate'}">使用animate切换</Item>
                <Item detail-push :to="{name:'segmentWithSwiper'}">使用手势切换</Item>
                <Item detail-push :to="{name:'segmentAsync'}">异步加载组件</Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {}
</script>
