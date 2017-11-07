<template>
    <vm-page>
        <vm-header>
            <vm-toolbar>
                <vm-buttons end slot="buttons">
                    <vm-button role="bar-button" type="solid" @click="closeModal">
                        Close
                    </vm-button>
                </vm-buttons>
                <vm-title>测试页面</vm-title>
            </vm-toolbar>
        </vm-header>
        <vm-content padding ref="content">
            <h5>说明</h5>
            <p>Hello, 这里是 Modal 测试页面, 这个页面具有Page组件的完整特性!</p>
            <vm-button block @click="closeModal">关闭Modal</vm-button>
            <vm-button block @click="scrollToBottom">滚动到底部</vm-button>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolore eveniet excepturi illum impedit in incidunt inventore minima, molestias obcaecati odio officia porro quam quidem quo recusandae repudiandae veritatis, vero.</p>
            <vm-button block @click="scrollToTop">滚动到顶部</vm-button>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolor dolore excepturi in itaque iure, magni minima nam officia porro possimus quaerat quos similique sint unde velit vero vitae voluptatibus.
            </p>
        </vm-content>
        <vm-footer>
            <vm-toolbar>
                <vm-title>Modal Toolbar Footer</vm-title>
            </vm-toolbar>
        </vm-footer>
    </vm-page>
</template>

<script type="text/javascript">
  export default {
    name: 'model-page',
    data () {
      return {}
    },
    computed: {
      content () {
        return this.$refs.content
      }
    },
    methods: {
      closeModal () {
        this.$modal.dismiss()
      },
      scrollToBottom () {
        this.content.scrollToBottom()
      },
      scrollToTop () {
        this.content.scrollToTop()
      }
    },
    mounted () {
      console.log('页面this')
      console.log(this)
    }
  }
</script>
<style scoped lang="less"></style>
