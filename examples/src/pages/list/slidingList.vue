<template>
    <Page>
        <Header>
            <Navbar>
                <Title>SlidingList</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">

            <List>
                <ListHeader>Demo填充数据</ListHeader>
                <Item>填充数据</Item>
                <Item>填充数据</Item>
            </List>


            <List>
                <ListHeader>
                    <span>SlidingList Demo</span>
                </ListHeader>
                <ItemSliding>
                    <Item>
                        <Avatar slot="item-left">
                            <img src="./img/avatar-ts-woody.png">
                        </Avatar>
                        <Label>
                            <h2>两边都有按钮</h2>
                            <p>试试 ↔️️ 都滑动</p>
                        </Label>
                    </Item>
                    <ItemSlidingOptions side="left">
                        <Button color="primary" @click="clickText">
                            <Icon name="text"></Icon>
                            <span>Text</span>
                        </Button>
                        <Button color="secondary" @click="clickCall">
                            <Icon name="call"></Icon>
                            <span>Call</span>
                        </Button>
                    </ItemSlidingOptions>
                    <ItemSlidingOptions side="right">
                        <Button color="primary" @click="clickEmail">
                            <Icon name="mail"></Icon>
                            <span>Email</span>
                        </Button>
                    </ItemSlidingOptions>
                </ItemSliding>
                <ItemSliding>
                    <Item>
                        <Avatar slot="item-left">
                            <img src="./img/avatar-ts-buzz.png">
                        </Avatar>
                        <Label>
                            <h2>按钮在右边</h2>
                            <p>⬅️ 滑动出现按钮</p>
                        </Label>
                    </Item>
                    <ItemSlidingOptions side="right">
                        <Button color="primary" @click="clickEmail">
                            <Icon name="mail"></Icon>
                            <span>Email</span>
                        </Button>
                    </ItemSlidingOptions>
                </ItemSliding>
                <ItemSliding>
                    <Item>
                        <Avatar slot="item-left">
                            <img src="./img/avatar-ts-buzz.png">
                        </Avatar>
                        <Label>
                            <h2>按钮在左边</h2>
                            <p>➡️ 滑动出现按钮</p>
                        </Label>
                    </Item>
                    <ItemSlidingOptions side="left">
                        <Button color="primary" @click="clickText">
                            <Icon name="text"></Icon>
                            <span>Text</span>
                        </Button>
                        <Button color="secondary" @click="clickCall">
                            <Icon name="call"></Icon>
                            <span>Call</span>
                        </Button>
                    </ItemSlidingOptions>
                </ItemSliding>

                <ItemSliding>
                    <Item>
                        <Avatar slot="item-left">
                            <img src="./img/avatar-ts-hamm.png">
                        </Avatar>
                        <Label>
                            <h2>按钮在右边</h2>
                            <p>⬅️ 滑动出现按钮，再滑动则执行</p>
                        </Label>
                    </Item>

                    <ItemSlidingOptions side="right">
                        <Button expandable color="danger" @click="clickDelete">
                            <Icon name="trash"></Icon>
                            <span>Delete</span>
                        </Button>
                    </ItemSlidingOptions>
                </ItemSliding>

                <ItemSliding>
                    <Item>
                        <Avatar slot="item-left">
                            <img src="./img/avatar-ts-hamm.png">
                        </Avatar>
                        <label>
                            <h2>Icon在左边的</h2>
                            <p>⬅️ 滑动出现按钮</p>
                        </label>
                    </Item>

                    <ItemSlidingOptions side="right" icon-left>
                        <Button color="danger" @click="clickDelete">
                            <Icon name="trash"></Icon>
                            <span>Delete</span>
                        </Button>
                    </ItemSlidingOptions>
                </ItemSliding>

            </List>

            <List>
                <ListHeader>测试</ListHeader>
                <ItemSliding
                        :disabled="disabled"
                        ref="itemSlidingComponent"
                        @onDrag="slidingDrag"
                        @onSwipeLeft="slidingDragLeft"
                        @onSwipeRight="slidingDragRight"
                        @onSwipe="slidingSwipe">
                    <Item>
                        <Avatar slot="item-left">
                            <img src="./img/avatar-ts-woody.png">
                        </Avatar>
                        <Label>
                            <h2>事件监听</h2>
                            <p>↔️ 滑动出现按钮</p>
                        </Label>
                    </Item>
                    <ItemSlidingOptions side="left">
                        <Button expandable color="danger" @click="clickDelete">
                            <Icon name="trash"></Icon>
                            <span>Delete</span>
                        </Button>
                    </ItemSlidingOptions>
                    <ItemSlidingOptions side="right">
                        <Button color="danger" @click="clickDelete">
                            <Icon name="trash"></Icon>
                            <span>Delete</span>
                        </Button>
                    </ItemSlidingOptions>
                </ItemSliding>
            </List>

            <div text-center>
                <p text-center>slidingPercent: {{slidingPercent}}</p>
                <p text-center>openAmount: {{openAmount}}</p>
                <p text-center>disabled: {{disabled}}</p>
                <Button @click="closeItem" outline small>closeItem</Button>
                <Button @click="openRightOptions" outline small>openRightOptions</Button>
                <Button @click="openLeftOptions" outline small>openLeftOptions</Button>
                <Button @click="getSlidingPercent" outline small>getSlidingPercent</Button>
                <Button @click="getOpenAmount" outline small>getOpenAmount</Button>
                <Button @click="disabled=!disabled" outline small>setDisabled</Button>
            </div>

            <List>
                <ListHeader>Demo填充数据</ListHeader>
                <Item>填充数据</Item>
                <Item>填充数据</Item>
                <Item>填充数据</Item>
                <Item>填充数据</Item>
                <Item>填充数据</Item>
                <Item>填充数据</Item>
                <Item>填充数据</Item>
                <Item>填充数据</Item>
            </List>
        </Content>
    </Page>
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
