<template>
    <vm-page>
        <!--content-->
        <vm-header>
            <!--menutoggle-->
            <vm-navbar hide-back-button>
                <!--menutoggle-->
                <vm-buttons right slot="buttons">
                    <vm-button @click="$menus.toggle('menu')" role="bar-button" menutoggle>
                        <span>菜单</span>
                    </vm-button>
                </vm-buttons>
                <vm-title @onTitleClick="onTitleClickHandler" :title="$t('index.title')"></vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding>
            <div class="index scrollContent">
                <vm-grid class="vimo">
                    <vm-row class="vimo__logo">
                        <vm-col text-center no-padding>
                            <div class="vimo__logo--img">
                                <img src="../assets/vimo.png">
                            </div>
                        </vm-col>
                    </vm-row>
                    <vm-row class="vimo__text">
                        <vm-col text-center>
                            <h1>VIMO</h1>
                            <p>v{{vimo.version}}</p>
                            <p class="message">{{$t('index.message')}}</p>
                            <a class="star" href="#"><img
                                    src="https://img.shields.io/github/stars/vm-component/vimo.svg?style=social&label=Star"
                                    alt="Star"></a>
                            <a class="star" href="#"><img
                                    src="https://img.shields.io/github/forks/vm-component/vimo.svg?style=social&label=Fork"
                                    alt="Fork"></a>
                        </vm-col>
                    </vm-row>
                    <vm-row class="vimo__btns">
                        <vm-button block solid @click="$router.push({'name':'components','meta':{newWindow:true}})">
                            {{$t('index.component')}}
                        </vm-button>
                        <vm-button block solid @click="$menus.open('menu')">
                            {{$t('index.menu')}}
                        </vm-button>
                    </vm-row>
                </vm-grid>
            </div>
        </vm-content>
        <vm-footer class="index inspired">
            <p class="inspired__name">INSPIRED BY</p>
            <div class="inspired__logos">
                <section>
                    <i class="inspired__logos--ionic"></i>
                </section>
                <section>
                    <i class="inspired__logos--vue"></i><span>Vue.js</span>
                </section>
            </div>
        </vm-footer>
    </vm-page>
</template>
<style scoped lang="less">
    .index.scrollContent {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        .vimo {
            display: flex;
            justify-content: center;
            align-content: center;
            flex-direction: column;
            /*padding-bottom: 45px;*/
            .vimo__logo {
                flex: 110px 0 0; /*no*/
                .vimo__logo--img {
                    height: 110px; /*no*/
                    flex: 110px 0 0; /*no*/
                    img {
                        height: 100%;
                    }
                }
            }
            .vimo__text {
                margin-top: 5px;
                margin-bottom: 5px;
                h1 {
                    font-weight: bold;
                }
                p {
                    margin: 5px 0;
                    font-size: 12px;
                    color: #2c3e50;
                }
                .message {
                    line-height: 22px;
                }
                .star {
                    line-height: 22px;
                }
            }
            .vimo__btns {

            }
        }
    }

    .index.inspired {
        width: 100%;
        height: 55px;
        position: absolute;
        bottom: 0;
        border-top: 1px solid #eee;
        text-align: center;
        background: rgba(256, 256, 256, 0.7);
        .inspired__name {
            font-size: 14px;
            line-height: 120%;
            padding: 5px 0;
            margin: 0;
            color: #919191;
        }
        .inspired__logos {
            display: flex;
            justify-content: center;
            align-content: center;
            & > section {
                display: flex;
                justify-content: center;
                align-content: center;
                i {
                    display: inline-block;
                    /*outline: 1px solid red;*/
                }
                & > span {
                    display: inline-block;
                    height: 100%;
                    font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;

                    font-size: 13px;
                    line-height: 154%;
                    color: #2c3e50;
                    font-weight: 500;
                }
                .inspired__logos--ionic {
                    height: 22px;
                    width: 80px;
                    background: transparent url(../assets/ionic.png) no-repeat top center/60px auto;
                }
                .inspired__logos--vue {
                    height: 22px;
                    width: 26px;
                    background: transparent url(../assets/vue.png) no-repeat top center/22px auto;
                }
            }
        }
    }
</style>
<script type="text/javascript">
  export default {
    name: 'IndexDemo',
    data () {
      return {
        vimo: window.VM
      }
    },
    methods: {
      onTitleClickHandler () {
        alert('你点击了标题')
      }
    },
    created () {},
    mounted () {}
  }
</script>
