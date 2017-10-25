# FAQ

这里说明使用Vimo时的常见问题, 不定时更新.



## 布局结构说明

```vue
<template>
    <!--根组件-->
    <App>
        <!--导航相关-->
        <Nav>
            <!--router-link-->
            <!--各个业务-->
            <!--example:-->
            <Page>
                <Header>
                    <Navbar>
                        <Title>Hello</Title>
                    </Navbar>
                </Header>
                <Content class="outer-content">
                    <p>Cotnent here</p>
                </Content>
                <Footer></Footer>
            </Page>
        </Nav>
    </App>
</template>
```


## 常见问题

#### 版本0.6.0+更新报错

部分vimo组件的```import```引入方式发生变更, 例如之前是```import {Button} from 'vimo/lib/button'```, 改为了 ```import Button from 'vimo/lib/button'```. 变更的组件范围[参考这里](https://github.com/vm-component/vimo/blob/master/components/dist.js). 
