<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>折叠列表</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">

            <div padding>
                <p>折叠列表不支持重叠组合, 最多只有一级折叠.</p>
            </div>
            <vm-list>
                <vm-list-header>普通Item</vm-list-header>
                <vm-item button>
                    <span>你好</span>
                    <vm-note slot="item-right">Hello</vm-note>
                </vm-item>
                <vm-item button>
                    <span>移动端组件库</span>
                    <vm-note slot="item-right">Vimo</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>折叠列表</vm-list-header>
                <vm-item-collapse-group>
                    <vm-item-collapse title="Cars">
                        <vm-icon slot="item-left" name="car"></vm-icon>
                        <vm-item button>
                            <vm-icon slot="item-left" name="wifi"></vm-icon>
                            Wi-Fi
                            <vm-note slot="item-right">XXX-Office</vm-note>
                        </vm-item>
                        <vm-item>
                            <vm-icon slot="item-left" name="plane"></vm-icon>
                            <span>飞行模式</span>
                            <vm-toggle slot="item-right" :checked="true"></vm-toggle>
                        </vm-item>
                    </vm-item-collapse>
                    <vm-item-collapse title="Apple">
                        <vm-icon slot="item-left" name="logo-apple"></vm-icon>
                        <vm-note slot="item-right">请选择</vm-note>
                        <vm-item button>MacBook Air</vm-item>
                        <vm-item button>MacBook Pro</vm-item>
                        <vm-item button>iPhone 8</vm-item>
                    </vm-item-collapse>
                </vm-item-collapse-group>
            </vm-list>

            <vm-list>
                <vm-list-header>纯文本</vm-list-header>
                <vm-item-collapse-group accordion>
                    <vm-item-collapse>
                        <div slot="item-title">
                            文本1
                        </div>
                        <section padding>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, aut autem dolor eligendi eum fugiat illo minima necessitatibus obcaecati omnis quidem repellendus. Aperiam ipsa numquam perspiciatis quod saepe totam ullam.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, aut autem dolor eligendi eum fugiat illo minima necessitatibus obcaecati omnis quidem repellendus. Aperiam ipsa numquam perspiciatis quod saepe totam ullam.
                        </section>
                    </vm-item-collapse>
                    <vm-item-collapse>
                        <div slot="item-title">
                            文本2
                        </div>
                        <section padding>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                        </section>
                    </vm-item-collapse>
                    <vm-item-collapse>
                        <div slot="item-title">
                            文本3
                        </div>
                        <section padding>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                        </section>
                    </vm-item-collapse>
                </vm-item-collapse-group>
            </vm-list>
            <vm-list>
                <vm-list-header>手风琴列表(只开启一个)</vm-list-header>
                <vm-item-collapse-group accordion>
                    <vm-item-collapse title="This Is Title1">
                        <vm-item>subItem1</vm-item>
                        <vm-item>subItem2</vm-item>
                        <vm-item>subItem3</vm-item>
                    </vm-item-collapse>
                    <vm-item-collapse>
                        <template slot="item-title">
                            This Is Title2 &ensp;
                            <vm-icon name="information-circle"></vm-icon>
                        </template>
                        <vm-item button>subItem1</vm-item>
                        <vm-item button>subItem2</vm-item>
                        <vm-item button>subItem3</vm-item>
                    </vm-item-collapse>
                    <vm-item-collapse title="This Is Title3">
                        <vm-item button>subItem1</vm-item>
                        <vm-item button>subItem2</vm-item>
                        <vm-item button>subItem3</vm-item>
                    </vm-item-collapse>
                </vm-item-collapse-group>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default {
    name: 'accordion',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
