<template>
    <Page>
        <Header>
            <Navbar hide-back-button>
                <Buttons right slot="buttons">
                    <Button @click="$menu.toggle('menu')" role="bar-button" menutoggle>
                        <Icon name="more"></Icon>
                    </Button>
                </Buttons>
                <Title @onTitleClick="onTitleClickHandler">Hello</Title>
            </Navbar>
        </Header>
        <Content>
            <article class="index scrollContent" padding>
                <Grid class="vimo">
                    <Row class="vimo__logo">
                        <Column text-center no-padding>
                            <div class="vimo__logo--img">
                                <img src="../assets/vimo.png">
                            </div>
                        </Column>
                    </Row>
                    <Row class="vimo__text">
                        <Column text-center>
                            <h1>VIMO</h1>
                            <p>v{{vimo.version}}</p>
                            <p class="message">基于Vue2.x的移动端Hybrid框架</p>
                            <a class="star" href="#"><img
                                    src="https://img.shields.io/github/stars/vm-component/vimo.svg?style=social&label=Star"
                                    alt="Star"></a>
                            <a class="star" href="#"><img
                                    src="https://img.shields.io/github/forks/vm-component/vimo.svg?style=social&label=Fork"
                                    alt="Fork"></a>
                        </Column>
                    </Row>
                    <Row class="vimo__btns">
                        <Button block solid @click="$router.push({'name':'components','meta':{newWindow:true}})">
                            Component
                        </Button>
                        <Button block solid @click="$menu.open('menu')">
                            Open Menu
                        </Button>
                    </Row>
                </Grid>
            </article>
        </Content>
        <Footer class="index inspired">
            <p class="inspired__name">INSPIRED BY</p>
            <div class="inspired__logos">
                <section>
                    <i class="inspired__logos--ionic"></i>
                </section>
                <section>
                    <i class="inspired__logos--vue"></i><span>Vue.js</span>
                </section>
            </div>
        </Footer>
    </Page>
</template>
<style scoped lang="scss">
    .index.scrollContent {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .vimo {
            display: flex;
            justify-content: center;
            align-content: center;
            flex-direction: column;
            padding-bottom: 45px;
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
        bottom: 0;
        border-top: 1px solid #eee;
        text-align: center;
        background: #fff;
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
  import { Title, Buttons, Grid, Row, Column, Button } from 'vimo'

  export default {
    name: 'IndexDemo',
    components: {Title, Buttons, Grid, Row, Column, Button},
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
