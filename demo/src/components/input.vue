<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Input</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <p>Input组件使用示例</p>
            </div>
            <List>
                <ListHeader>使用场景</ListHeader>
                <Item detail-push :to="{name:'inputNormal'}">普通用法</Item>
                <Item detail-push :to="{name:'inputValid'}">输入验证</Item>
                <Item detail-push :to="{name:'inputLimit'}">输入限制</Item>
                <Item detail-push :to="{name:'inputEvent'}">输入事件</Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputDemo'
  }
</script>
