<template>
    <Page>
        <Header>
            <Navbar>
                <Title ref="title">Content</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <p>
                    Content组件是Vimo的基础布局组件, 属于三明治结构的中间层, 承接业务展示的部分. 其中, Header/Footer分别为基础布局的头和尾.
                </p>

                <p>
                    默认情况下, Content组件使用的原生scroll, 因此对组件监听: onScroll/onScrollStart/onScrollEnd 这三个事件
                    可以定制业务务求.
                </p>

                <p>
                    另外, Content组件也支持JsScroll, 这部分使用的IScroll插件.
                </p>

            </div>

            <List>
                <ListHeader>Character</ListHeader>
                <Item button :to="{name:'contentContext'}">文本</Item>
                <Item button :to="{name:'contentFixed'}">内容固定</Item>
                <Item button :to="{name:'contentFullscreen'}">全屏模式</Item>
                <Item button :to="{name:'contentHideBars'}">隐藏头尾Bar</Item>
                <Item button :to="{name:'contentSetBarStyle'}">设置Bar的样式</Item>
                <Item button :to="{name:'contentScroll'}">滚动内容(原生滚动)</Item>
                <Item button :to="{name:'contentJsScroll'}">滚动内容(集成jsScroll)</Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss"></style>
<script>
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  export default{
    components: {
      List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider
    }
  }
</script>
