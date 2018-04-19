<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content padding>
            <h4>Default</h4>
            <Grid>
                <Row>
                    <Column class="spinner-box">
                        <Spinner></Spinner>
                        <span>default</span>
                    </Column>
                    <Column class="spinner-box">
                        <Spinner name="ios"></Spinner>
                        <span>ios</span>
                    </Column>
                    <Column class="spinner-box">
                        <Spinner name="ios-small"></Spinner>
                        <span>ios-small</span>
                    </Column>
                    <Column class="spinner-box">
                        <Spinner name="bubbles"></Spinner>
                        <span>bubbles</span>
                    </Column>
                    <Column class="spinner-box">
                        <Spinner name="circles"></Spinner>
                        <span>circles</span>
                    </Column>
                </Row>
                <Row>
                    <Column class="spinner-box">
                        <Spinner name="crescent"></Spinner>
                        <span>crescent</span>
                    </Column>
                    <Column class="spinner-box">
                        <Spinner name="dots"></Spinner>
                        <span>dots</span>
                    </Column>
                </Row>
            </Grid>

            <h4>Mode</h4>
            <Grid>
                <Row>
                    <Column class="spinner-box">
                        <Spinner></Spinner>
                        <span>default</span>
                    </Column>
                    <Column class="spinner-box">
                        <Spinner mode="ios"></Spinner>
                        <span>ios</span>
                    </Column>
                    <Column class="spinner-box">
                        <Spinner mode="md"></Spinner>
                        <span>md</span>
                    </Column>
                    <Column class="spinner-box">
                        <Spinner mode="wp"></Spinner>
                        <span>wp</span>
                    </Column>
                </Row>
            </Grid>

            <h4>Color</h4>
            <Grid>
                <Row>
                    <Column>
                        <Spinner></Spinner>
                    </Column>
                    <Column>
                        <Spinner color="primary" name="ios"></Spinner>
                    </Column>
                    <Column>
                        <Spinner color="secondary" name="ios-small"></Spinner>
                    </Column>
                    <Column>
                        <Spinner color="light" name="bubbles"></Spinner>
                    </Column>
                    <Column>
                        <Spinner color="dark" name="circles"></Spinner>
                    </Column>
                    <Column>
                        <Spinner color="primary" name="crescent"></Spinner>
                    </Column>
                    <Column>
                        <Spinner color="secondary" name="dots"></Spinner>
                    </Column>
                </Row>
            </Grid>

            <h4>Duration 3000ms</h4>
            <Grid>
                <Row>
                    <Column>
                        <Spinner :duration="3000"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :duration="3000" name="ios"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :duration="3000" name="ios-small"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :duration="3000" name="bubbles"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :duration="3000" name="circles"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :duration="3000" name="crescent"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :duration="3000" name="dots"></Spinner>
                    </Column>
                </Row>
            </Grid>

            <h4>Paused</h4>
            <Grid>
                <Row>
                    <Column>
                        <Spinner :paused="true"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :paused="true" name="ios"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :paused="true" name="ios-small"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :paused="true" name="bubbles"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :paused="true" name="circles"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :paused="true" name="crescent"></Spinner>
                    </Column>
                    <Column>
                        <Spinner :paused="true" name="dots"></Spinner>
                    </Column>
                </Row>
            </Grid>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .spinner-box {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        span {
            display: inline-block;
            margin-top: 5px;
        }
    }
</style>
<script type="text/javascript">
  export default {
    name: 'DemoSpinner',
    i18n: {
      messages: {
        'zh-CN': {
          title: '菊花图'
        },
        'en-US': {
          title: 'Spinner'
        }
      }
    }
  }
</script>
