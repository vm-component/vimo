<template>
    <Page>
        <Header>
            <Navbar>
                <Title>App</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" padding>
            <h2>{{ $t('service') }}</h2>
            <h5>this.$app.setDisabled(false, 3000)</h5>
            <p>{{ $t('setDisabledDesc') }}</p>
            <Button block @click="$app.setEnabled(false, 3000)">{{ $t('setDisabledBtn') }}</Button>

            <h5>this.$app.setDisableScroll(true,3000)</h5>
            <p>{{ $t('setDisableScrollDesc') }}</p>
            <Button block @click="$app.setDisableScroll(true,3000)">{{ $t('setDisableScrollBtn') }}</Button>

            <h5>this.$app.setDocTitle(val)</h5>
            <p>{{ $t('setDocTitleDesc') }}</p>
            <small>{{ $t('setDocTitleDesc2') }}</small>
            <Button block @click="$app.setDocTitle('TestTitle')">{{$t('setDocTitleBtn')}}</Button>

            <h5>this.$app.setClass(val, isAdd)</h5>
            <p>{{ $t('setClassDesc') }}</p>

            <Button block @click="$app.setClass('hello-vimo',toggle),toggle=!toggle">Toggle Class</Button>
            <section padding class="hello-vimo-here">
                <strong>{{$t('success')}}</strong>
            </section>

            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae
                    consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae
                    consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae
                    consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae
                    consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae
                    consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae
                    consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae
                    consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur in rerum saepe sed. Architecto beatae
                    consequuntur ea id, in ipsa maxime perspiciatis, praesentium quae quo repudiandae sit tempora unde ut.</p>

            </article>

            <section slot="fixed-bottom" class="stateBar">
                <Grid no-padding>
                    <Row no-padding>
                        <Column>
                            <strong text-danger>{{$t('appState')}}:</strong>
                            <p>isScrolling: {{$app.isScrolling}}</p>
                            <p>isEnabled: {{$app.isEnabled}}</p>
                            <p>isScrollDisabled: {{$app.isScrollDisabled}}</p>
                        </Column>
                    </Row>
                </Grid>
            </section>
        </Content>
    </Page>
</template>
<style lang="scss">
    .hello-vimo-here {
        text-align: center;
        color: red;
        display: none;
    }

    .hello-vimo {
        .hello-vimo-here {
            display: block;
        }
    }
</style>
<style scoped lang="scss">
    .stateBar {
        background: rgba(256, 256, 256, 0.9);
        padding: 10px 20px;
        width: 100%;
        p {
            margin: 5px 0;
        }
    }
</style>
<script type="text/javascript">
  export default {
    i18n: {
      messages: {
        'zh-CN': {
          service: 'App服务',
          setDisabledDesc: '3秒内页面无法点击',
          setDisabledBtn: '冷冻页面',

          setDisableScrollDesc: '3秒内页面无法滚动',
          setDisableScrollBtn: '禁止滚动',

          setDocTitleDesc: '设置Doc的Title',
          setDocTitleDesc2: '方法this.$app.setDocTitle(val)只能设置document.title的值, Header中的Title组件请额外处理. 比如下面的按钮.',
          setDocTitleBtn: '设置DocTitle',

          setClassDesc: '在根组件添加全局Class',
          success: '设置成功',
          appState: 'App状态'

        },
        'en-US': {
          service: 'App Service',
          setDisabledDesc: 'The page cannot be clicked within 3 seconds',
          setDisabledBtn: 'Frozen Page',

          setDisableScrollDesc: 'The page cannot be scrolled within 3 seconds',
          setDisableScrollBtn: 'Frozen Scroll',

          setClassDesc: 'Add a global class to the root component',

          setDocTitleDesc: 'Set document.title',
          setDocTitleDesc2: 'The method this.$app.setDocTitle(val) can only set the value of "document.title". The Title component in Header should be handled extra. For example, the following button.',
          setDocTitleBtn: 'Set DocTitle',

          success: 'Set Success!',
          appState: 'App State'
        }
      }
    },
    data () {
      return {
        toggle: true
      }
    }
  }
</script>
