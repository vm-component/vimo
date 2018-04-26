<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item>
                    <Label>
                        2017/07/01 ~ 2017/12/01
                    </Label>
                    <Datetime slot="item-right"
                              min="2017-07-01"
                              max="2017-12-01"
                    ></Datetime>
                </Item>
                <Item>
                    <Label>
                        2017/01/01 ~ 2017/12/01
                    </Label>
                    <Datetime slot="item-right"
                              min="2017-01-01"
                              max="2017-12-01"
                    ></Datetime>
                </Item>

                <Item>
                    <Label>
                        2017/01/15 ~ 2017/01/30
                    </Label>
                    <Datetime slot="item-right"
                              min="2017-01-15"
                              max="2017-01-30"
                    ></Datetime>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoRangePicker',
    i18n: {
      messages: {
        'zh-CN': {
          title: '日期范围选择'

        },
        'en-US': {
          title: 'RangePicker'

        }
      }
    }
  }
</script>
