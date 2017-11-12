<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Fab</Title>
            </Navbar>
        </Header>
        <Content padding>
            <Fab slot="fixed" top right edge ref="fab1">
                <FabButton mini>
                    <Icon name="add"></Icon>
                </FabButton>
                <FabList side="bottom">
                    <FabButton @click="clickHandler($event,'facebook')">
                        <Icon name="logo-facebook"></Icon>
                    </FabButton>
                    <FabButton @click="clickHandler($event,'twitter')">
                        <Icon name="logo-twitter"></Icon>
                    </FabButton>
                    <FabButton @click="clickHandler($event,'vimeo')">
                        <Icon name="logo-vimeo"></Icon>
                    </FabButton>
                    <FabButton @click="clickHandler($event,'googleplus')">
                        <Icon name="logo-googleplus"></Icon>
                    </FabButton>
                </FabList>
            </Fab>

            <Fab slot="fixed" top left ref="fab2">
                <FabButton color="secondary">
                    <Icon name="arrow-dropright"></Icon>
                </FabButton>
                <FabList side="right">
                    <FabButton @click="clickHandler($event,'facebook')">
                        <Icon name="logo-facebook"></Icon>
                    </FabButton>
                    <FabButton @click="clickHandler($event,'twitter')">
                        <Icon name="logo-twitter"></Icon>
                    </FabButton>
                    <FabButton @click="clickHandler($event,'vimeo')">
                        <Icon name="logo-vimeo"></Icon>
                    </FabButton>
                </FabList>
                <FabList side="bottom">
                    <FabButton @click="clickHandler($event,'googleplus')">
                        <Icon name="logo-googleplus"></Icon>
                    </FabButton>
                </FabList>
            </Fab>

            <Fab slot="fixed" center middle ref="fab3">
                <FabButton color="danger">
                    <Icon name="md-share"></Icon>
                </FabButton>
                <FabList side="right">
                    <FabButton @click="clickHandler($event,'facebook')" color="danger">
                        <Icon name="logo-facebook"></Icon>
                    </FabButton>
                </FabList>
                <FabList side="bottom">
                    <FabButton @click="clickHandler($event,'googleplus')" color="secondary">
                        <Icon name="logo-googleplus"></Icon>
                    </FabButton>
                </FabList>
                <FabList side="top">
                    <FabButton @click="clickHandler($event,'vimeo')" color="primary">
                        <Icon name="logo-vimeo"></Icon>
                    </FabButton>
                </FabList>
                <FabList side="left">
                    <FabButton @click="clickHandler($event,'twitter')" color="dark">
                        <Icon name="logo-twitter"></Icon>
                    </FabButton>
                </FabList>
            </Fab>

            <Fab slot="fixed" bottom left ref="fab4">
                <FabButton color="dark">
                    <Icon name="arrow-dropup"></Icon>
                </FabButton>
                <FabList side="top">
                    <FabButton @click="clickHandler($event,'facebook')" color="danger">
                        <Icon name="logo-facebook"></Icon>
                    </FabButton>
                    <FabButton @click="clickHandler($event,'googleplus')" color="secondary">
                        <Icon name="logo-googleplus"></Icon>
                    </FabButton>
                    <FabButton @click="clickHandler($event,'twitter')" color="dark">
                        <Icon name="logo-twitter"></Icon>
                    </FabButton>
                    <FabButton @click="clickHandler($event,'vimeo')" color="primary">
                        <Icon name="logo-vimeo"></Icon>
                    </FabButton>
                </FabList>
            </Fab>


            <Fab slot="fixed" bottom right ref="fab5">
                <FabButton color="dark">
                    <Icon name="arrow-dropleft"></Icon>
                </FabButton>
                <FabList side="left">
                    <FabButton @click="clickHandler($event,'facebook')" color="danger">
                        <Icon name="logo-facebook"></Icon>
                    </FabButton>
                    <FabButton @click="clickHandler($event,'googleplus')" color="secondary">
                        <Icon name="logo-googleplus"></Icon>
                    </FabButton>
                    <FabButton @click="clickHandler($event,'twitter')" color="dark">
                        <Icon name="logo-twitter"></Icon>
                    </FabButton>
                    <FabButton @click="clickHandler($event,'vimeo')" color="primary">
                        <Icon name="logo-vimeo"></Icon>
                    </FabButton>
                </FabList>
            </Fab>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <h5>注意</h5>
            <p>Fab需要手动放置在fixed的slot中, 关闭使用ref获取组件示例之后执行close()方法.</p>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus explicabo laudantium nobis quas, quidem ratione recusandae vel! Assumenda blanditiis ducimus illum itaque molestiae ut. At culpa dolores modi quod vitae?</p>
        </Content>
    </Page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default {
    name: 'name',
    methods: {
      clickHandler (fabComponent, value) {
        fabComponent.close()
        console.log('当前点击的是: ' + value)
      }
    }
  }
</script>
