<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Platform</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h1>平台参数</h1>
            <p>
                我们常会遇到一套代码在不同平台上跑的需求, 例如<strong>操作平台区别</strong>: IOS/Andriod, 或者是使用的<strong>HyBrid类型</strong>: Wechat/Alipay/DingTalk/QQ/DaHan等.
            </p>

            <h5>解耦</h5>
            <p>
                检测设备别及根据HyBrid初始化对应的方法变得很重要, 比如ChooseImg/ScanCode等. 保持业务与平台解耦. 使用平台方法之前需要等待平台初始化完毕, 这部分在$platform.ready()处理.</p>
            <Grid>
                <Row>
                    <Column col-4><strong>设备平台:</strong></Column>
                    <Column col-8>{{$platform._bPlt}}</Column>
                </Row>
                <Row>
                    <Column col-4><strong>文字方向:</strong></Column>
                    <Column col-8>{{$platform._dir}}</Column>
                </Row>
                <Row>
                    <Column col-4><strong>设备语言:</strong></Column>
                    <Column col-8>{{$platform._lang}}</Column>
                </Row>
                <Row>
                    <Column col-4><strong>网路类型:</strong></Column>
                    <Column col-8>{{$platform._nt || '未检测到'}}</Column>
                </Row>
                <Row>
                    <Column col-4><strong>屏幕方向:</strong></Column>
                    <Column col-8>
                        {{$platform._isPortrait === null ? '未检测到' : $platform._isPortrait === true ? '竖屏' : '横屏'}}
                    </Column>
                </Row>

                <!--屏幕尺寸-->
                <Row v-if="$platform._isPortrait !== null">
                    <Column col-4><strong>屏幕尺寸:</strong></Column>
                    <Column col-8 v-if="$platform._isPortrait">
                        <Row>高度: {{$platform._pH}}px</Row>
                        <Row>宽度: {{$platform._pW}}px</Row>
                    </Column>
                    <Column col-8 v-if="!$platform._isPortrait">
                        <Row>高度: {{$platform._lH}}px</Row>
                        <Row>宽度: {{$platform._lW}}px</Row>
                    </Column>
                </Row>

                <Row>
                    <Column col-4><strong>平台级别:</strong></Column>
                    <Column col-8>
                        <strong>{{$platform._platforms.join(' -> ')}}</strong>
                    </Column>
                </Row>

                <Row>
                    <Column col-4><strong>地址栏参数:</strong></Column>

                    <Column col-8 v-if="JSON.stringify($platform._qp.data) !== '{}'">
                        <div class="detailBox" v-for="(value,key) in $platform._qp.data">
                            <Row><span class="detailBox__title">{{key}}: </span><span
                                    class="detailBox__value">{{value}}</span></Row>
                        </div>
                    </Column>
                    <Column col-8 v-else>
                        <Row>无参数</Row>
                    </Column>
                </Row>

                <Row>
                    <Column col-4><strong>UserAgent:</strong></Column>
                    <Column col-8>{{$platform._ua}}</Column>
                </Row>
                <Row>
                    <Column col-4><strong>平台版本:</strong></Column>
                    <Column col-8>
                        <div class="detailBox" v-for="(value,key) in $platform._versions" v-if="!!value">
                            <Row><span class="detailBox__title">{{key}}: </span><span
                                    class="detailBox__value">{{value.str}}</span>
                            </Row>
                        </div>
                    </Column>
                </Row>
                <Row>
                    <Column col-4><strong>CSS属性:</strong></Column>
                    <Column col-8>
                        <div class="detailBox" v-for="(value,key) in $platform.css">
                            <Row><span class="detailBox__title"><strong>{{key}}:</strong></span></Row>
                            <Row><span class="detailBox__value">{{value}}</span></Row>
                        </div>
                    </Column>
                </Row>
            </Grid>
        </Content>
    </Page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default {
    name: 'name',
    data () {
      return {
        thisKeysOfRegisterMethod: []
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
