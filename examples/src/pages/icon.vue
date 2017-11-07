<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Icon</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding class="iconDemo">
            <h1>Icon组件</h1>
            <p>Vimo的Icon可以使用ionicons或者自定义图标(需要以icon-开头)</p>

            <h4>关于状态</h4>
            <vm-grid>
                <vm-row>
                    <vm-col col-4 align-self-center>默认状态:</vm-col>
                    <vm-col col-8 align-self-center>
                        <vm-icon color="primary" name="book"></vm-icon>
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col col-4 align-self-center>激活状态:</vm-col>
                    <vm-col col-8 align-self-center>
                        <vm-icon color="primary" name="book" :isActive="true"></vm-icon>
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col col-4 align-self-center>非激活状态:</vm-col>
                    <vm-col col-8 align-self-center>
                        <vm-icon color="primary" name="book" :isActive="false"></vm-icon>
                    </vm-col>
                </vm-row>
            </vm-grid>

            <h4>自定义激活状态</h4>
            <vm-grid>
                <vm-row>
                    <vm-col col-4 align-self-center>激活状态:</vm-col>
                    <vm-col col-8 align-self-center>
                        <vm-icon color="primary" name="star" :isActive="true" activeName="ios-book"></vm-icon>
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col col-4 align-self-center>非激活状态:</vm-col>
                    <vm-col col-8 align-self-center>
                        <vm-icon color="primary" name="star" :isActive="false" activeName="ios-book"></vm-icon>
                    </vm-col>
                </vm-row>
            </vm-grid>


            <h4>自定义Icon</h4>

            <vm-icon name="icon-vue"></vm-icon>
            <vm-icon name="icon-vimo"></vm-icon>
            <vm-icon name="icon-alipay"></vm-icon>
            <vm-icon name="icon-wechat"></vm-icon>

            <h4>全平台显示一致</h4>
            <vm-icon name="md-star"></vm-icon>

            <h4>Logo Icons</h4>
            <vm-grid class="expo">
                <vm-row justify-content-center align-items-center v-for="(modeIcon,index1) in logoIconList" :key="index1">
                    <vm-col text-center v-for="(icon,index2) in modeIcon" :key="index2">
                        <vm-icon :name="'logo-'+icon"></vm-icon>
                        <p>logo-{{icon}}</p>
                    </vm-col>
                </vm-row>
            </vm-grid>

            <h4>Mode Icons</h4>
            <vm-grid class="expo">
                <vm-row justify-content-center align-items-center v-for="(modeIcon,index1) in modeIconList" :key="index1">
                    <vm-col text-center v-for="(icon,index2) in modeIcon" :key="index2">
                        <vm-icon :name="icon"></vm-icon>
                        <p>{{icon}}</p>
                    </vm-col>
                </vm-row>
            </vm-grid>
        </vm-content>
    </vm-page>
</template>
<style lang="less">
    .iconDemo .icon {
        font-size: 40px;
    }

    .icon-vue {
        height: 30px;
        width: 30px;
        background: url('../assets/vue.png') no-repeat center center/cover;
    }

    .icon-vimo {
        height: 30px;
        width: 30px;
        background: url('../assets/vimo.png') no-repeat center center/cover;
    }

    .icon-alipay {
        height: 30px;
        width: 40px;
        background: url('../assets/alipay.png') no-repeat center center/cover;
    }

    .icon-wechat {
        height: 30px;
        width: 36px;
        background: url('../assets/wechat.png') no-repeat center center/cover;
    }

    .expo {
        .ion-icon {
            font-size: 28px;
        }
        p {
            margin: 5px 0 0 0;
        }
    }
</style>
<script type="text/javascript">
  import modeIcons from 'ionicons/dist/data/mode-icons.json'
  import logoIcons from 'ionicons/dist/data/logo-icons.json'
  export default{
    data () {
      return {
        modeIconList: [],
        logoIconList: []
      }
    },
    methods: {
      getIcons (icons) {
        let count = 0
        let tmps = []
        let totals = []
        for (let key in icons) {
          count++
          if (count % 4 !== 0) {
            tmps.push(key)
          } else {
            totals.push(tmps)
            tmps = []
          }
        }
        return totals
      }
    },
    created () {
      this.modeIconList = this.getIcons(modeIcons)
      this.logoIconList = this.getIcons(logoIcons)
    },
    components: {}
  }
</script>
