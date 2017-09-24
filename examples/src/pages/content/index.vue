<template>
    <Page>
        <Header>
            <Navbar>
                <Title ref="title">Page</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <h1>页面组件</h1>

                <p>Page组件是每个页面的根组件, 其中包含 <strong>Header/Content/Footer</strong> 三个组件.</p>

                <h4>Header组件/Footer</h4>
                <p>
                    Header组件用于填放Toolbar/Navbar等组件, 用于定义页面的头部, 可以控制组件实现显/隐操作.
                </p>
                <h4>Content组件</h4>
                <p>
                    Content组件是Vimo的基础布局组件, 属于三明治结构的中间层, 承接业务展示的部分. 正常情况页面面切换是不记录浏览位置的, 可以通过添加属性 <strong>record-position</strong>
                    开启. ontent组件使用的原生scroll, 因此对组件监听: <strong>onScroll / onScrollStart / onScrollEnd</strong> 这三个事件定制业务需求.
                </p>
            </div>
            <List>
                <ListHeader>Character</ListHeader>
                <Item button :to="{name:'contentContext'}">文本</Item>
                <Item button :to="{name:'contentFixed'}">内容固定</Item>
                <Item button :to="{name:'contentFullscreen'}">全屏模式</Item>
                <Item button :to="{name:'contentHideBars'}">隐藏头尾Bar</Item>
                <Item button :to="{name:'contentSetBarStyle'}">设置Bar的样式</Item>
                <Item button :to="{name:'contentScroll'}">滚动监听</Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less"></style>
<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    components: {},
    mounted () {}
  }
</script>
