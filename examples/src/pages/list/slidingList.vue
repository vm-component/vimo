<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>SlidingList</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">

            <vm-list>
                <vm-list-header>Demo填充数据</vm-list-header>
                <vm-item>填充数据</vm-item>
                <vm-item>填充数据</vm-item>
            </vm-list>


            <vm-list>
                <vm-list-header>
                    <span>SlidingList Demo</span>
                </vm-list-header>
                <vm-item-sliding>
                    <vm-item>
                        <vm-avatar slot="item-left">
                            <img src="./img/avatar-ts-woody.png">
                        </vm-avatar>
                        <vm-label>
                            <h2>两边都有按钮</h2>
                            <p>试试 ↔️️ 都滑动</p>
                        </vm-label>
                    </vm-item>
                    <vm-item-options side="left">
                        <vm-button color="primary" @click="clickText">
                            <vm-icon name="text"></vm-icon>
                            <span>Text</span>
                        </vm-button>
                        <vm-button color="secondary" @click="clickCall">
                            <vm-icon name="call"></vm-icon>
                            <span>Call</span>
                        </vm-button>
                    </vm-item-options>
                    <vm-item-options side="right">
                        <vm-button color="primary" @click="clickEmail">
                            <vm-icon name="mail"></vm-icon>
                            <span>Email</span>
                        </vm-button>
                    </vm-item-options>
                </vm-item-sliding>
                <vm-item-sliding>
                    <vm-item>
                        <vm-avatar slot="item-left">
                            <img src="./img/avatar-ts-buzz.png">
                        </vm-avatar>
                        <vm-label>
                            <h2>按钮在右边</h2>
                            <p>⬅️ 滑动出现按钮</p>
                        </vm-label>
                    </vm-item>
                    <vm-item-options side="right">
                        <vm-button color="primary" @click="clickEmail">
                            <vm-icon name="mail"></vm-icon>
                            <span>Email</span>
                        </vm-button>
                    </vm-item-options>
                </vm-item-sliding>
                <vm-item-sliding>
                    <vm-item>
                        <vm-avatar slot="item-left">
                            <img src="./img/avatar-ts-buzz.png">
                        </vm-avatar>
                        <vm-label>
                            <h2>按钮在左边</h2>
                            <p>➡️ 滑动出现按钮</p>
                        </vm-label>
                    </vm-item>
                    <vm-item-options side="left">
                        <vm-button color="primary" @click="clickText">
                            <vm-icon name="text"></vm-icon>
                            <span>Text</span>
                        </vm-button>
                        <vm-button color="secondary" @click="clickCall">
                            <vm-icon name="call"></vm-icon>
                            <span>Call</span>
                        </vm-button>
                    </vm-item-options>
                </vm-item-sliding>

                <vm-item-sliding>
                    <vm-item>
                        <vm-avatar slot="item-left">
                            <img src="./img/avatar-ts-hamm.png">
                        </vm-avatar>
                        <vm-label>
                            <h2>按钮在右边</h2>
                            <p>⬅️ 滑动出现按钮，再滑动则执行</p>
                        </vm-label>
                    </vm-item>

                    <vm-item-options side="right">
                        <vm-button expandable color="danger" @click="clickDelete">
                            <vm-icon name="trash"></vm-icon>
                            <span>Delete</span>
                        </vm-button>
                    </vm-item-options>
                </vm-item-sliding>

                <vm-item-sliding>
                    <vm-item>
                        <vm-avatar slot="item-left">
                            <img src="./img/avatar-ts-hamm.png">
                        </vm-avatar>
                        <vm-label>
                            <h2>Icon在左边的</h2>
                            <p>⬅️ 滑动出现按钮</p>
                        </vm-label>
                    </vm-item>

                    <vm-item-options side="right" icon-left>
                        <vm-button color="danger" @click="clickDelete">
                            <vm-icon name="trash"></vm-icon>
                            <span>Delete</span>
                        </vm-button>
                    </vm-item-options>
                </vm-item-sliding>

            </vm-list>

            <vm-list>
                <vm-list-header>测试</vm-list-header>
                <vm-item-sliding
                        :disabled="disabled"
                        ref="itemSlidingComponent"
                        @onDrag="slidingDrag"
                        @onSwipeLeft="slidingDragLeft"
                        @onSwipeRight="slidingDragRight"
                        @onSwipe="slidingSwipe">
                    <vm-item>
                        <vm-avatar slot="item-left">
                            <img src="./img/avatar-ts-woody.png">
                        </vm-avatar>
                        <vm-label>
                            <h2>事件监听</h2>
                            <p>↔️ 滑动出现按钮</p>
                        </vm-label>
                    </vm-item>
                    <vm-item-options side="left">
                        <vm-button expandable color="danger" @click="clickDelete">
                            <vm-icon name="trash"></vm-icon>
                            <span>Delete</span>
                        </vm-button>
                    </vm-item-options>
                    <vm-item-options side="right">
                        <vm-button color="danger" @click="clickDelete">
                            <vm-icon name="trash"></vm-icon>
                            <span>Delete</span>
                        </vm-button>
                    </vm-item-options>
                </vm-item-sliding>
            </vm-list>

            <div text-center>
                <p text-center>slidingPercent: {{slidingPercent}}</p>
                <p text-center>openAmount: {{openAmount}}</p>
                <p text-center>disabled: {{disabled}}</p>
                <vm-button @click="closeItem" outline small>closeItem</vm-button>
                <vm-button @click="openRightOptions" outline small>openRightOptions</vm-button>
                <vm-button @click="openLeftOptions" outline small>openLeftOptions</vm-button>
                <vm-button @click="getSlidingPercent" outline small>getSlidingPercent</vm-button>
                <vm-button @click="getOpenAmount" outline small>getOpenAmount</vm-button>
                <vm-button @click="disabled=!disabled" outline small>setDisabled</vm-button>
            </div>

            <vm-list>
                <vm-list-header>Demo填充数据</vm-list-header>
                <vm-item>填充数据</vm-item>
                <vm-item>填充数据</vm-item>
                <vm-item>填充数据</vm-item>
                <vm-item>填充数据</vm-item>
                <vm-item>填充数据</vm-item>
                <vm-item>填充数据</vm-item>
                <vm-item>填充数据</vm-item>
                <vm-item>填充数据</vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style lang="less">

</style>
<script type="text/javascript">
  export default{
    data () {
      return {
        slidingPercent: 0,
        openAmount: 0,
        disabled: false

      }
    },
    watch: {},
    computed: {
      itemSlidingComponent () {
        return this.$refs.itemSlidingComponent
      }
    },
    methods: {
      clickText () {
        alert('clickText')
      },
      clickCall () {
        alert('clickCall')
      },
      clickEmail () {
        alert('clickEmail')
      },
      clickDelete () {
        alert('clickDelete')
      },
      // 事件监听
      slidingDrag (ins) {
        if (ins.state === 8) {
          console.log('正在拖动，向右滑动')
        } else if (ins.state === 16) {
          console.log('正在拖动，向左滑动')
        }
      },
      slidingSwipe (ins) {
        console.debug('触发了滑动的最大限度值，但不知道左右')
      },
      slidingDragLeft (ins) {
        console.debug('slidingDragLeft：向左滑动超过了swiper阈值')
      },
      slidingDragRight (ins) {
        console.debug('slidingDragRight：向右滑动超过了swiper阈值，500ms后会执行自动关闭')
        setTimeout(() => {
          ins.close()
        }, 500)
      },

      // 测试
      closeItem () {
        this.itemSlidingComponent.close()
      },
      openRightOptions () {
        this.itemSlidingComponent.openRightOptions()
      },
      openLeftOptions () {
        this.itemSlidingComponent.openLeftOptions()
      },
      getSlidingPercent () {
        this.slidingPercent = this.itemSlidingComponent.getSlidingPercent()
      },
      getOpenAmount () {
        this.openAmount = this.itemSlidingComponent.getOpenAmount()
      }
    },
    created () {},
    mounted () {
      console.debug(this.itemSlidingComponent)
    },
    activated () {}
  }
</script>
