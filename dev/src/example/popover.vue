<template>
    <Page>
        <Header>
            <Navbar>
                <Title>popOver</Title>
            </Navbar>
        </Header>
        <Content padding>
            <Button color="primary" block @click="Inleft">Inleft</Button>
            <Button color="primary" block @click="Inright">Inright</Button>
            <Button color="primary" block @click="Incenter">Incenter</Button>
            <Button color="primary" block @click="width">width=200</Button>
            <Button color="primary" block @click="height">height=300</Button>
            <div @click="Inleft" class="iosmore left">
                <Icon color="primary" name="ios-more" class="size mr" :isActive="true"></Icon>
            </div>
            <div @click="Inleft" class="iosmore left">
                <Icon color="primary" name="ios-more" class="size mr" :isActive="true"></Icon>
            </div>
            <div @click="Inleft" class="iosmore left">
                <Icon color="primary" name="ios-more" class="size  mr" :isActive="true"></Icon>
            </div>
            <div @click="Inleft" class="iosmore left">
                <Icon color="primary" name="ios-more" class="size  mr" :isActive="true"></Icon>
            </div>
            <div @click="Inleft" class="iosmore left">
                <Icon color="primary" name="ios-more" class="size  mr" :isActive="true"></Icon>
            </div>
            <div @click="Inleft" class="iosmore left">
                <Icon color="primary" name="ios-more" class="size  mr" :isActive="true"></Icon>
            </div>
            <div @click="Inleft" class="iosmore left">
                <Icon color="primary" name="ios-more" class="size  mr" :isActive="true"></Icon>
            </div>
            <div @click="Inright" class="right iosmore">
                <Icon color="primary" name="ios-more" class="size" :isActive="true"></Icon>
            </div>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  import list from './list.vue'
  export default{
    data () {
      return {
        a: 1
      }
    },
    watch: {},
    computed: {},
    methods: {
      Inleft (e) {
        const _this = this
        _this.$popover.presentInAuto({
          template: list,
          source: e.target
        }, {
          direct: 'left'
        })
      },
      Inright (e) {
        const _this = this
        _this.$popover.presentInAuto({
          template: list,
          source: e.target
        }, {
          direct: 'right'
        })
      },
      Incenter (e) {
        const _this = this
        _this.$popover.presentInAuto({
          template: list,
          source: e.target
        }, {
          direct: 'center'
        })
      },
      width (e) {
        const _this = this
        _this.$popover.presentInAuto({
          template: list,
          source: e.target
        }, {
          direct: 'right',
          width: 200
        })
      },
      height (e) {
        const _this = this
        _this.$popover.presentInAuto({
          template: list,
          source: e.target
        }, {
          direct: 'right',
          height: 300
        })
      }
    },
    created () {
    },
    mounted () {
    },
    activated () {
    },
    deactivated () {}
  }
</script>
<style lang="scss">
    /* *{
       outline: 1px solid black;
    } */
    .size {
        font-size: 2em !important;
        cursor: pointer;
    }

    .right {
        float: right;
    }

    .mr {
        margin-right: 20px;
    }

    .left {
        float: left;
        margin-right: 20px;
    }

    .iosmore {
        width: 17.5px;
    }
</style>
