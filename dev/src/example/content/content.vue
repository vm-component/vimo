<template>
    <Page>
        <Header>
            <Navbar>
                <Title ref="title">Content</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <h5>简介</h5>

                <Grid>
                    <Column>
                        <a href="zhihu://questions/34831949?utm_campaign=ge19&utm_content=m_banner">打开知乎</a>
                        <a href="twitter://timeline">打开twitter</a>
                    </Column>
                </Grid>

                <Grid>
                    <Column>
                        <Button @click="openZhihu">打开Zhihu</Button>
                        <Button @click="openTwitter">打开twitter</Button>
                    </Column>
                </Grid>

                <p>
                    Content组件是Vimo的基础布局组件, 属于三明治结构的中间层, 承接业务展示的部分. 其中, Header/Footer分别为基础布局的头和尾.
                </p>

                <p>
                    默认情况下, Content组件使用的原生scroll, 因此对组件监听: onScroll/onScrollStart/onScrollEnd 这三个事件
                    可以定制业务务求.
                </p>

                <p>
                    另外, Content组件也支持JsScroll, 这部分使用的better-scroll插件. 原生滚动具有全套事件, 但是jsScroll则没有事件系统
                </p>

            </div>

            <List>
                <ListHeader>Character</ListHeader>
                <Item detail-push :to="{name:'contentContext'}">文本</Item>
                <Item detail-push :to="{name:'contentFixed'}">内容固定</Item>
                <Item detail-push :to="{name:'contentFullscreen'}">全屏模式</Item>
                <Item detail-push :to="{name:'contentHideBars'}">隐藏头尾Bar</Item>
                <Item detail-push :to="{name:'contentSetBarStyle'}">设置Bar的样式</Item>
                <Item detail-push :to="{name:'contentScroll',query:{enableJsScroll:false}}">滚动内容(原生滚动)</Item>
                <Item detail-push :to="{name:'contentScroll',query:{enableJsScroll:true}}">滚动内容(JS滚动)</Item>
                <Item detail-push :to="{name:'contentCity'}">城市列表(原生滚动)</Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/javascript">
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  import './deeplink.js'

  export default{
    methods: {

      openZhihu () {
//        window.deeplink.launchiOS({
//          storeLink: '123',
//          urlScheme: 'zhihu://questions/34831949?utm_campaign=ge19&utm_content=m_banner',
//          iframe: true
//        })

        // for safari
//        window.location = 'zhihu://questions/34831949?utm_campaign=ge19&utm_content=m_banner'

        // ------ start, 这个代码在 safari 不行, 别的浏览器可以
        var url = 'zhihu://questions/34831949?utm_campaign=ge19&utm_content=m_banner'
        var iframe = document.createElement('iframe')
        iframe.style.cssText = 'display:none;width=0;height=0'
        iframe.src = url
        document.body.appendChild(iframe)
        // ------ end

//        timer = setTimeout(function () {
//          wondow.location.href = url
//        }, 500)

//        var ifr = document.createElement('iframe')
//        ifr.setAttribute('src', url)
//        ifr.setAttribute('style', 'display:none')
//        document.body.appendChild(ifr)
      },
      openTwitter () {
        window.location = 'twitter://timeline'
//        window.deeplink.launchiOS({
//          storeLink: 'https://itunes.apple.com/jp/app/twitter/id333903271?mt=8',
//          urlScheme: 'twitter://timeline',
//          iframe: true
//        })
      }
    },
    created () {
    },
    mounted () {
    },
    components: {
      List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider
    }
  }
</script>
