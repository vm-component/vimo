<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Sheet</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h1>Sheet组件</h1>
            <p>组件用于弹出进一步选择的弹出层, 比如选择尺码/支付方式/分享方式等.</p>
            <p>当前支付方式选择: {{type}}</p>

            <List>
                <ListHeader>特性</ListHeader>
                <Item>
                    <Label>显示背景</Label>
                    <Toggle v-model="showBackdrop"></Toggle>
                </Item>
                <Item>
                    <Label>点击背景关闭</Label>
                    <Toggle v-model="enableBackdropDismiss"></Toggle>
                </Item>
            </List>


            <List radio-group v-model="direction">
                <ListHeader>打开方向</ListHeader>
                <Item>
                    <Label>底部</Label>
                    <Radio value="bottom"></Radio>
                </Item>
                <Item>
                    <Label>顶部</Label>
                    <Radio value="top"></Radio>
                </Item>
            </List>

            <Button block @click="openPaySheet">选择支付方式</Button>

            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo minus odit praesentium rem. Alias consectetur cupiditate facere id ipsam maxime omnis repellendus sapiente. Enim facere incidunt ipsam numquam rerum!</p>
            </article>
            <!--paySheet-->
            <Sheet
                    ref="paySheet"
                    slot="fixed"
                    :direction="direction"
                    :showBackdrop="showBackdrop"
                    :enableBackdropDismiss="enableBackdropDismiss">
                <section class="pay-sheet">
                    <div class="pay-sheet-title">选择支付方式</div>
                    <div class="pay-sheet-container">
                        <div class="pay-sheet-content" @click="choose('alipay')">
                            <Icon class="pay-sheet-icon" name="icon-alipay"></Icon>
                            <p class="pay-sheet-name">支付宝</p>
                        </div>
                        <div class="pay-sheet-content" @click="choose('wechat')">
                            <Icon class="pay-sheet-icon" name="icon-wechat"></Icon>
                            <p class="pay-sheet-name">微信</p>
                        </div>
                        <div class="pay-sheet-content" @click="choose('unipay')">
                            <Icon class="pay-sheet-icon" name="icon-unionpay"></Icon>
                            <p class="pay-sheet-name">银联</p>
                        </div>
                    </div>
                    <div class="pay-sheet-buttons">
                        <Button full clear class="pay-sheet-button" @click="closePaySheet">取消</Button>
                    </div>
                </section>
            </Sheet>
            <!--shareSheet-->
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'SheetDemo',
    data () {
      return {
        type: '',
        direction: 'bottom',
        enableBackdropDismiss: true,
        showBackdrop: true
      }
    },
    computed: {
      paySheetCompoonent () {
        return this.$refs.paySheet
      }
    },
    methods: {
      openPaySheet () {
        return this.paySheetCompoonent.present()
      },
      closePaySheet () {
        return this.paySheetCompoonent.dismiss()
      },

      choose (type) {
        this.closePaySheet().then(() => {
          this.type = type
        })
      }
    },
    mounted () {}
  }
</script>
<style scoped lang="less">

    .icon-alipay {
        background: url('../assets/icon-alipay.png') no-repeat center center/auto 100%;
    }

    .icon-wechat {
        background: url('../assets/icon-wechat.png') no-repeat center center/auto 100%;
    }

    .icon-unionpay {
        background: url('../assets/icon-unionpay.png') no-repeat center center/auto 100%;
    }

    .pay-sheet {
        background: #fff;
        .pay-sheet-title {
            height: 44px;
            font-size: 16px;
            color: #666666;
            line-height: 44px;
            padding: 0 16px;
        }
        .pay-sheet-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid #f2f2f2; /*no*/
            border-bottom: 1px solid #f2f2f2; /*no*/
            .pay-sheet-content {
                padding: 36px 0 29px;
                min-width: 50px;
                text-align: center;
                flex: 1;
                .pay-sheet-icon {
                    height: 36px;
                    width: 60px;
                    /*border: 1px solid #ddd;*/
                }
                .pay-sheet-name {
                    margin: 0;
                    text-align: center;
                }
            }
        }
        .pay-sheet-buttons {
            .pay-sheet-button {
                margin: 0;
                height: 44px;
                line-height: 44px;
                font-size: 16px;
                color: #666666;
            }
        }
    }
</style>
