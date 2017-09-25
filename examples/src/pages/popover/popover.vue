<template>
    <Page>
        <Header>
            <Navbar>
                <Title>this.$popover</Title>
                <!--menutoggle-->
                <Buttons slot="buttons" right>
                    <Button icon-only role="bar-button" menutoggle @click="openSetting($event)">
                        <Icon class="icon" name="more" color="dark"></Icon>
                    </Button>
                </Buttons>
            </Navbar>
        </Header>
        <Content padding class="outer-content" ref="content">

            <h5>简介</h5>
            <p>Popover组件是作用是,</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing <span class="specialText"
                                                                          @click="specialText($event,'elit')">elit</span>. Animi, asperiores delectus error hic maxime nemo quam quos voluptates! Excepturi molestiae nam quasi quo sed, ut? Dolorem illum possimus ratione repellat!
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. <span class="specialText"
                                                                                @click="specialText($event,'Animi')">Animi</span>, asperiores delectus error hic maxime nemo quam quos voluptates! Excepturi molestiae nam quasi quo sed, ut? Dolorem illum possimus ratione repellat!
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, asperiores delectus error hic maxime nemo quam quos voluptates! Excepturi molestiae nam quasi quo sed, ut? Dolorem illum possimus ratione  <span
                    class="specialText"
                    @click="specialText($event,'repellat')">repellat!</span></p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, asperiores delectus error hic maxime nemo quam quos voluptates! Excepturi molestiae nam <span
                    class="specialText"
                    @click="specialText($event,'quasi')">quasi</span>
                quo sed, ut? Dolorem illum possimus ratione repellat!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta libero officia quos sit. A amet atque delectus earum error fugit impedit labore libero nisi quam quos ratione similique tempore, veniam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta libero officia quos sit. A amet atque delectus earum error fugit impedit labore libero nisi quam quos ratione similique tempore, veniam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta libero officia quos sit. A amet atque delectus earum error fugit impedit labore libero nisi quam quos ratione similique tempore, veniam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta libero officia quos sit. A amet atque delectus earum error fugit impedit labore libero nisi quam quos ratione similique tempore, veniam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta libero officia quos sit. A amet atque delectus earum error fugit impedit labore libero nisi quam quos ratione similique tempore, veniam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, asperiores delectus error hic maxime nemo quam quos voluptates! Excepturi molestiae nam quasi <span
                    class="specialText"
                    @click="specialText($event,'quo')">quo</span> sed, ut? Dolorem illum possimus ratione repellat!</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, asperiores delectus error hic maxime nemo quam quos voluptates! Excepturi molestiae nam quasi quo sed, ut? Dolorem illum possimus ratione repellat!</p>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut corporis culpa dolor esse eveniet exercitationem fuga hic illum incidunt ipsa minima nam optio quia sint, tempore veritatis. Deleniti, rem.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut corporis culpa dolor esse eveniet exercitationem fuga hic illum incidunt ipsa minima nam optio quia sint, tempore veritatis. Deleniti, rem.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut corporis culpa dolor esse eveniet exercitationem fuga hic illum incidunt ipsa minima nam optio quia sint, tempore veritatis. Deleniti, rem.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut corporis culpa dolor esse eveniet exercitationem fuga hic illum incidunt ipsa minima nam optio quia sint, tempore veritatis. Deleniti, rem.</p>

        </Content>
    </Page>
</template>
<style scoped lang="less">
    .specialText {
        font-weight: bold;
        font-size: 1.5em;
    }
</style>
<script type="text/javascript">
  import TextTool from './textTool.vue'

  export default {
    methods: {
      openSetting ($event) {
        this.$popover.present({
          ev: $event,                           // 事件
          component: TextTool,                  // 传入组件
          data: {
            contentEle: this.$refs.content.$el  // 传入数据, 内部通过`this.$options.$data`获取这个data
          }
        })
      },
      specialText ($event, text) {
        this.$popover.present({
          ev: $event,
          component: `<p style="padding:0 14px;" text-center>You choose the word of <strong>${text}</strong>.</p>`,
          onDismiss () {
            this.$toast('dismiss from:' + text)
          }
        })
      }
    }
  }
</script>

