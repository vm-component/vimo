<template>
    <App id="app">
        {{pageTransition}}
        <!--menu menu-->
        <Menus id="menu" side="left" type="reveal">
            <Page>
                <Header>
                    <Toolbar>
                        <Title>菜单</Title>
                    </Toolbar>
                </Header>
                <Content>
                    <List>
                        <!--开始-->
                        <ListHeader>
                            <span>开始</span>
                        </ListHeader>
                        <!--group-->
                        <ItemGroup>
                            <!--delay 表示等待关闭事件-->
                            <Item button :to="{name: 'introduce'}" delay>
                                <span>介绍</span>
                            </Item>
                            <Item button :to="{name: 'howToStart'}" delay>
                                <span>如何开始</span>
                            </Item>
                            <Item button :to="{name: 'equipment'}" delay>
                                <span>当前设备信息</span>
                            </Item>
                        </ItemGroup>
                    </List>
                    <Button @click="openOtherOne">开启另一个</Button>
                </Content>
            </Page>
        </Menus>
        <!--menu author-->
        <Menus id="author" side="right" type="overlay">
            <Page>
                <Header>
                    <Toolbar>
                        <Title>项目介绍</Title>
                    </Toolbar>
                </Header>
                <Content padding>
                    <h5>起源</h5>
                    <p>这里是介绍</p>
                    <h5>Vimo需要解决的问题</h5>
                    <p>这里是介绍</p>
                    <h5>团队成员</h5>
                    <p>这里是介绍</p>
                </Content>
                <Footer>
                    <Toolbar style="text-align:center;color:#444;"><p>Copyright © 2017(MIT)</p></Toolbar>
                </Footer>
            </Page>
        </Menus>
        <Nav>
            <transition :name="pageTransition">
                <router-view></router-view>
            </transition>
        </Nav>
    </App>
</template>
<script type="text/ecmascript-6">
  /**
   * @name App.vue
   * @description
   * 项目描述
   * */
  import { Menus } from 'vimo/components/menus'
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item } from 'vimo/components/item'
  export default {
    name: 'app-root',
    data () {
      return {
        pageTransitionName: this.$config.get('pageTransition'),
        pageTransitionDirection: '',
      }
    },
    computed: {
      pageTransition(){
        return !!this.pageTransitionDirection ? `${this.pageTransitionName}-${this.pageTransitionDirection}` : ''
      }
    },
    methods: {
      openOtherOne(){
        this.$menus.open('author')
      }
    },
    created(){
      this.$eventBus.$on('onNavEnter', ({to, from, next}) => {
        this.pageTransitionDirection = 'forward'
        next()
      })
      this.$eventBus.$on('onNavLeave', ({to, from, next}) => {
        this.pageTransitionDirection = 'backward'
        next()
      })
    },
    mounted(){

    },
    components: {
      Menus, List, ListHeader, ItemGroup, Item
    }
  }

</script>
<style lang="scss">
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    $DURATION: 500ms;
    $EASING: cubic-bezier(0.36, 0.66, 0.04, 1);
    $TRANSFORM: -webkit-transform;
    $OPACITY: opacity;
    $OFF_RIGHT: 99.5%;
    $OFF_LEFT: -15%;
    $CENTER: 0%;
    $OFF_OPACITY: 0.8;
    $OPACITY_ZERO: 0.01;
    $BACK_BTN_TEXT_MOVE: 100px;

    /*-------- ios 进入动画(forward) --------*/
    /*    ios-transition-forward    */

    // 进入的页面
    .ios-transition-forward-enter {
        .ion-header {
            .ion-navbar {
                .back-button {
                    opacity: $OPACITY_ZERO;
                    .back-button-text {
                        transform: translateX($BACK_BTN_TEXT_MOVE);
                    }
                }
                .ion-buttons {
                    opacity: $OPACITY_ZERO;
                }
                .toolbar-background {
                    opacity: $OPACITY_ZERO;
                }
                .ion-title {
                    transform: translateX($OFF_RIGHT);
                    opacity: $OPACITY_ZERO;
                }
            }
        }
        .ion-header > *:not(.ion-navbar), .ion-footer > * {
            transform: translateX($OFF_RIGHT);
        }
        .ion-content {
            transform: translateX($OFF_RIGHT);
        }
    }

    .ios-transition-forward-enter-active {
        transition-duration: $DURATION;
        .ion-header {
            .ion-navbar {
                .back-button {
                    transition: $OPACITY $DURATION $EASING;
                    .back-button-text {
                        transition: $TRANSFORM $DURATION $EASING
                    }
                }
                .ion-buttons {
                    transition: $OPACITY $DURATION $EASING;
                }
                .toolbar-background {
                    transition: $OPACITY $DURATION $EASING;
                }
                .ion-title {
                    transition: $TRANSFORM $DURATION $EASING, $OPACITY $DURATION $EASING;
                }
            }
        }
        .ion-header > *:not(.ion-navbar), .ion-footer > * {
            transition: $TRANSFORM $DURATION $EASING;
        }
        .ion-content {
            transition: $TRANSFORM $DURATION $EASING;
        }
    }

    // 退出的页面
    .ios-transition-forward-leave-active {
        transition-duration: $DURATION;
        .ion-header {
            .ion-navbar {
                .back-button {
                    opacity: $OPACITY_ZERO;
                    transition: $OPACITY $DURATION $EASING;
                    .back-button-text {
                        opacity: $OPACITY_ZERO;
                        transition: $OPACITY $DURATION $EASING
                    }
                }
                .ion-buttons {
                    opacity: $OPACITY_ZERO;
                    transition: $OPACITY $DURATION $EASING;
                }
                .toolbar-background {
                    opacity: $OPACITY_ZERO;
                    transition: $OPACITY $DURATION $EASING;
                }
                .ion-title {
                    transform: translateX($OFF_LEFT);
                    opacity: $OPACITY_ZERO;
                    transition: $TRANSFORM $DURATION $EASING, $OPACITY $DURATION $EASING;
                }
            }
        }
        .ion-header > *:not(.ion-navbar), .ion-footer > * {
            opacity: $OFF_OPACITY;
            transform: translateX($OFF_LEFT);
            transition: $TRANSFORM $DURATION $EASING, $OPACITY $DURATION $EASING;
        }
        .ion-content {
            opacity: $OFF_OPACITY;
            transform: translateX($OFF_LEFT);
            transition: $TRANSFORM $DURATION $EASING, $OPACITY $DURATION $EASING;
        }
    }

    /*-------- ios 后退动画(backward) --------*/
    /*    ios-transition-backward    */

    // 进入的页面
    .ios-transition-backward-enter {
        .ion-header {
            .ion-navbar {
                .back-button {
                    opacity: $OPACITY_ZERO;
                    .back-button-text {
                        opacity: $OPACITY_ZERO;
                    }
                }
                .ion-buttons {
                    opacity: $OPACITY_ZERO;
                }
                .toolbar-background {
                    opacity: $OPACITY_ZERO;
                }
                .ion-title {
                    transform: translateX($OFF_LEFT);
                    opacity: $OPACITY_ZERO;
                }
            }
        }
        .ion-header > *:not(.ion-navbar), .ion-footer > * {
            opacity: $OFF_OPACITY;
            transform: translateX($OFF_LEFT);
        }
        .ion-content {
            opacity: $OFF_OPACITY;
            transform: translateX($OFF_LEFT);
        }
    }

    .ios-transition-backward-enter-active {
        transition-duration: $DURATION;
        .ion-header {
            .ion-navbar {
                .back-button {
                    transition: $OPACITY $DURATION $EASING;
                    .back-button-text {
                        transition: $OPACITY $DURATION $EASING
                    }
                }
                .ion-buttons {
                    transition: $OPACITY $DURATION $EASING;
                }
                .toolbar-background {
                    transition: $OPACITY $DURATION $EASING;
                }
                .ion-title {
                    transition: $TRANSFORM $DURATION $EASING, $OPACITY $DURATION $EASING;
                }
            }
        }
        .ion-header > *:not(.ion-navbar), .ion-footer > * {
            transition: $TRANSFORM $DURATION $EASING, $OPACITY $DURATION $EASING;
        }
        .ion-content {
            transition: $TRANSFORM $DURATION $EASING, $OPACITY $DURATION $EASING;
        }
    }

    // 退出的页面
    .ios-transition-backward-leave-active {
        transition-duration: $DURATION;
        .ion-header {
            .ion-navbar {
                .back-button {
                    opacity: $OPACITY_ZERO;
                    transition: $OPACITY $DURATION $EASING;
                    .back-button-text {
                        opacity: $OPACITY_ZERO;
                        transform: translateX($BACK_BTN_TEXT_MOVE);
                        transition: $TRANSFORM $DURATION $EASING, $OPACITY $DURATION $EASING;
                    }
                }
                .ion-buttons {
                    opacity: $OPACITY_ZERO;
                    transition: $OPACITY $DURATION $EASING;
                }
                .toolbar-background {
                    opacity: $OPACITY_ZERO;
                    transition: $OPACITY $DURATION $EASING;
                }
                .ion-title {
                    transform: translateX($OFF_RIGHT);
                    opacity: $OPACITY_ZERO;
                    transition: $TRANSFORM $DURATION $EASING, $OPACITY $DURATION $EASING;
                }
            }
        }
        .ion-header > *:not(.ion-navbar), .ion-footer > * {
            transform: translateX($OFF_RIGHT);
            transition: $TRANSFORM $DURATION $EASING;
        }
        .ion-content {
            transform: translateX($OFF_RIGHT);
            transition: $TRANSFORM $DURATION $EASING;
        }
    }


</style>