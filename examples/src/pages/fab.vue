<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Fab</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding>
            <Fab slot="fixed" top right edge ref="fab1">
                <FabButton mini>
                    <vm-icon name="add"></vm-icon>
                </FabButton>
                <FabList side="bottom">
                    <FabButton @click="clickHandler('facebook')">
                        <vm-icon name="logo-facebook"></vm-icon>
                    </FabButton>
                    <FabButton @click="clickHandler('twitter')">
                        <vm-icon name="logo-twitter"></vm-icon>
                    </FabButton>
                    <FabButton @click="clickHandler('vimeo')">
                        <vm-icon name="logo-vimeo"></vm-icon>
                    </FabButton>
                    <FabButton @click="clickHandler('googleplus')">
                        <vm-icon name="logo-googleplus"></vm-icon>
                    </FabButton>
                </FabList>
            </Fab>

            <Fab slot="fixed" top left ref="fab2">
                <FabButton color="secondary">
                    <vm-icon name="arrow-dropright"></vm-icon>
                </FabButton>
                <FabList side="right">
                    <FabButton @click="clickHandler('facebook')">
                        <vm-icon name="logo-facebook"></vm-icon>
                    </FabButton>
                    <FabButton @click="clickHandler('twitter')">
                        <vm-icon name="logo-twitter"></vm-icon>
                    </FabButton>
                    <FabButton @click="clickHandler('vimeo')">
                        <vm-icon name="logo-vimeo"></vm-icon>
                    </FabButton>
                </FabList>
                <FabList side="bottom">
                    <FabButton @click="clickHandler('googleplus')">
                        <vm-icon name="logo-googleplus"></vm-icon>
                    </FabButton>
                </FabList>
            </Fab>

            <Fab slot="fixed" center middle ref="fab3">
                <FabButton color="danger">
                    <vm-icon name="md-share"></vm-icon>
                </FabButton>
                <FabList side="right">
                    <FabButton @click="clickHandler('facebook')" color="danger">
                        <vm-icon name="logo-facebook"></vm-icon>
                    </FabButton>
                </FabList>
                <FabList side="bottom">
                    <FabButton @click="clickHandler('googleplus')" color="secondary">
                        <vm-icon name="logo-googleplus"></vm-icon>
                    </FabButton>
                </FabList>
                <FabList side="top">
                    <FabButton @click="clickHandler('vimeo')" color="primary">
                        <vm-icon name="logo-vimeo"></vm-icon>
                    </FabButton>
                </FabList>
                <FabList side="left">
                    <FabButton @click="clickHandler('twitter')" color="dark">
                        <vm-icon name="logo-twitter"></vm-icon>
                    </FabButton>
                </FabList>
            </Fab>

            <Fab slot="fixed" bottom left ref="fab4">
                <FabButton color="dark">
                    <vm-icon name="arrow-dropup"></vm-icon>
                </FabButton>
                <FabList side="top">
                    <FabButton @click="clickHandler('facebook')" color="danger">
                        <vm-icon name="logo-facebook"></vm-icon>
                    </FabButton>
                    <FabButton @click="clickHandler('googleplus')" color="secondary">
                        <vm-icon name="logo-googleplus"></vm-icon>
                    </FabButton>
                    <FabButton @click="clickHandler('twitter')" color="dark">
                        <vm-icon name="logo-twitter"></vm-icon>
                    </FabButton>
                    <FabButton @click="clickHandler('vimeo')" color="primary">
                        <vm-icon name="logo-vimeo"></vm-icon>
                    </FabButton>
                </FabList>
            </Fab>


            <Fab slot="fixed" bottom right ref="fab5">
                <FabButton color="dark">
                    <vm-icon name="arrow-dropleft"></vm-icon>
                </FabButton>
                <FabList side="left">
                    <FabButton @click="clickHandler('facebook')" color="danger">
                        <vm-icon name="logo-facebook"></vm-icon>
                    </FabButton>
                    <FabButton @click="clickHandler('googleplus')" color="secondary">
                        <vm-icon name="logo-googleplus"></vm-icon>
                    </FabButton>
                    <FabButton @click="clickHandler('twitter')" color="dark">
                        <vm-icon name="logo-twitter"></vm-icon>
                    </FabButton>
                    <FabButton @click="clickHandler('vimeo')" color="primary">
                        <vm-icon name="logo-vimeo"></vm-icon>
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
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default{
    name: 'name',
    methods: {
      clickHandler (value) {
        for (let key in this.$refs) {
          this.$refs[key].close()
        }
        console.debug('当前点击的是: ' + value)
      }
    }
  }
</script>
