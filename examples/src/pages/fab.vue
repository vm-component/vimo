<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Fab</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding>
            <vm-fab slot="fixed" top right edge ref="fab1">
                <vm-fab-button mini color="vibrant">
                    <vm-icon name="add"></vm-icon>
                </vm-fab-button>
                <vm-fab-list side="bottom">
                    <vm-fab-button @click="clickHandler('facebook')">
                        <vm-icon name="logo-facebook"></vm-icon>
                    </vm-fab-button>
                    <vm-fab-button @click="clickHandler('twitter')">
                        <vm-icon name="logo-twitter"></vm-icon>
                    </vm-fab-button>
                    <vm-fab-button @click="clickHandler('vimeo')">
                        <vm-icon name="logo-vimeo"></vm-icon>
                    </vm-fab-button>
                    <vm-fab-button @click="clickHandler('googleplus')">
                        <vm-icon name="logo-googleplus"></vm-icon>
                    </vm-fab-button>
                </vm-fab-list>
            </vm-fab>

            <vm-fab slot="fixed" top left ref="fab2">
                <vm-fab-button color="secondary">
                    <vm-icon name="arrow-dropright"></vm-icon>
                </vm-fab-button>
                <vm-fab-list side="right">
                    <vm-fab-button @click="clickHandler('facebook')">
                        <vm-icon name="logo-facebook"></vm-icon>
                    </vm-fab-button>
                    <vm-fab-button @click="clickHandler('twitter')">
                        <vm-icon name="logo-twitter"></vm-icon>
                    </vm-fab-button>
                    <vm-fab-button @click="clickHandler('vimeo')">
                        <vm-icon name="logo-vimeo"></vm-icon>
                    </vm-fab-button>
                </vm-fab-list>
                <vm-fab-list side="bottom">
                    <vm-fab-button @click="clickHandler('googleplus')">
                        <vm-icon name="logo-googleplus"></vm-icon>
                    </vm-fab-button>
                </vm-fab-list>
            </vm-fab>

            <vm-fab slot="fixed" center middle ref="fab3">
                <vm-fab-button color="danger">
                    <vm-icon name="md-share"></vm-icon>
                </vm-fab-button>
                <vm-fab-list side="right">
                    <vm-fab-button @click="clickHandler('facebook')" color="danger">
                        <vm-icon name="logo-facebook"></vm-icon>
                    </vm-fab-button>
                </vm-fab-list>
                <vm-fab-list side="bottom">
                    <vm-fab-button @click="clickHandler('googleplus')" color="secondary">
                        <vm-icon name="logo-googleplus"></vm-icon>
                    </vm-fab-button>
                </vm-fab-list>
                <vm-fab-list side="top">
                    <vm-fab-button @click="clickHandler('vimeo')" color="primary">
                        <vm-icon name="logo-vimeo"></vm-icon>
                    </vm-fab-button>
                </vm-fab-list>
                <vm-fab-list side="left">
                    <vm-fab-button @click="clickHandler('twitter')" color="dark">
                        <vm-icon name="logo-twitter"></vm-icon>
                    </vm-fab-button>
                </vm-fab-list>
            </vm-fab>

            <vm-fab slot="fixed" bottom left ref="fab4">
                <vm-fab-button color="dark">
                    <vm-icon name="arrow-dropup"></vm-icon>
                </vm-fab-button>
                <vm-fab-list side="top">
                    <vm-fab-button @click="clickHandler('facebook')" color="danger">
                        <vm-icon name="logo-facebook"></vm-icon>
                    </vm-fab-button>
                    <vm-fab-button @click="clickHandler('googleplus')" color="secondary">
                        <vm-icon name="logo-googleplus"></vm-icon>
                    </vm-fab-button>
                    <vm-fab-button @click="clickHandler('twitter')" color="dark">
                        <vm-icon name="logo-twitter"></vm-icon>
                    </vm-fab-button>
                    <vm-fab-button @click="clickHandler('vimeo')" color="primary">
                        <vm-icon name="logo-vimeo"></vm-icon>
                    </vm-fab-button>
                </vm-fab-list>
            </vm-fab>


            <vm-fab slot="fixed" bottom right ref="fab5">
                <vm-fab-button color="dark">
                    <vm-icon name="arrow-dropleft"></vm-icon>
                </vm-fab-button>
                <vm-fab-list side="left">
                    <vm-fab-button @click="clickHandler('facebook')" color="danger">
                        <vm-icon name="logo-facebook"></vm-icon>
                    </vm-fab-button>
                    <vm-fab-button @click="clickHandler('googleplus')" color="secondary">
                        <vm-icon name="logo-googleplus"></vm-icon>
                    </vm-fab-button>
                    <vm-fab-button @click="clickHandler('twitter')" color="dark">
                        <vm-icon name="logo-twitter"></vm-icon>
                    </vm-fab-button>
                    <vm-fab-button @click="clickHandler('vimeo')" color="primary">
                        <vm-icon name="logo-vimeo"></vm-icon>
                    </vm-fab-button>
                </vm-fab-list>
            </vm-fab>

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
