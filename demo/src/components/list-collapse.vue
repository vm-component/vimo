<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">

            <div padding>
                <strong>{{$t('notice')}}</strong>
                <p>{{$t('noticeInfo')}}</p>
            </div>
            <List>
                <ListHeader>{{$t('normalList')}}</ListHeader>
                <Item detail-push>
                    <span>Demo Text1</span>
                    <Note slot="item-right">Text1 Right</Note>
                </Item>
                <Item detail-push>
                    <span>Demo Text2</span>
                    <Note slot="item-right">Text2 Right</Note>
                </Item>
            </List>
            <List>
                <ListHeader>{{$t('collapseList')}}</ListHeader>
                <ItemCollapseGroup :selected="1">
                    <ItemCollapse title="Cars(Auto)" :itemKey="1">
                        <Icon slot="item-left" name="car"></Icon>
                        <Note slot="item-right">Please Choose</Note>
                        <Item detail-push>
                            <Icon slot="item-left" name="wifi"></Icon>
                            Wi-Fi
                            <Note slot="item-right">XXX-Office</Note>
                        </Item>
                        <Item>
                            <Icon slot="item-left" name="plane"></Icon>
                            <span>Flight Mode</span>
                            <Toggle slot="item-right" :checked="true"></Toggle>
                        </Item>
                    </ItemCollapse>
                    <ItemCollapse title="Apple(Auto)" :itemKey="2">
                        <Icon slot="item-left" name="logo-apple"></Icon>
                        <Note slot="item-right">Please Choose</Note>
                        <Item detail-push>MacBook Air</Item>
                        <Item detail-push>MacBook Pro</Item>
                        <Item detail-push>iPhone 8</Item>
                    </ItemCollapse>
                </ItemCollapseGroup>
            </List>
            <List>
                <ListHeader>{{$t('accordionList')}}</ListHeader>
                <ItemCollapseGroup accordion :selected="column2">
                    <ItemCollapse title="This Is Title1(Auto)" :itemKey="1">
                        <Item>subItem1</Item>
                        <Item>subItem2</Item>
                        <Item>subItem3</Item>
                    </ItemCollapse>
                    <ItemCollapse :itemKey="2">
                        <template slot="item-title">
                            This Is Title2 &ensp;
                            <Icon name="information-circle"></Icon>
                        </template>
                        <Item detail-push>subItem1</Item>
                        <Item detail-push>subItem2</Item>
                        <Item detail-push>subItem3</Item>
                    </ItemCollapse>
                    <ItemCollapse title="This Is Title3" :itemKey="3">
                        <Item detail-push>subItem1</Item>
                        <Item detail-push>subItem2</Item>
                        <Item detail-push>subItem3</Item>
                    </ItemCollapse>
                </ItemCollapseGroup>
            </List>
            <List>
                <ListHeader>{{$t('accordionList')}}</ListHeader>
                <Item>
                    JS Control(openId:{{openId}})
                    <Button slot="item-right" @click="choose(1)">1</Button>
                    <Button slot="item-right" @click="choose(2)">2</Button>
                    <Button slot="item-right" @click="choose(3)">3</Button>
                </Item>
                <ItemCollapseGroup accordion :selected="openId">
                    <ItemCollapse :itemKey="1">
                        <div slot="item-title">
                            Text 1
                        </div>
                        <Note slot="item-right">Show More</Note>
                        <section padding>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, aut autem dolor eligendi eum fugiat illo minima necessitatibus
                            obcaecati omnis quidem repellendus. Aperiam ipsa numquam perspiciatis quod saepe totam ullam.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, aut autem dolor eligendi eum fugiat illo minima necessitatibus
                            obcaecati omnis quidem repellendus. Aperiam ipsa numquam perspiciatis quod saepe totam ullam.
                        </section>
                    </ItemCollapse>
                    <ItemCollapse :itemKey="2">
                        <div slot="item-title">
                            Text 2
                        </div>
                        <Note slot="item-right">Show More</Note>
                        <section padding>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure
                            libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure
                            libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                        </section>
                    </ItemCollapse>
                    <ItemCollapse :itemKey="3">
                        <div slot="item-title">
                            Text 3(Auto)
                        </div>
                        <Note slot="item-right">Show More</Note>
                        <section padding>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure
                            libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deleniti dolores nostrum soluta. Aspernatur, dolorem explicabo iure
                            libero molestiae nesciunt nihil officia optio provident sapiente voluptates voluptatibus! Laborum, quaerat, repudiandae!
                        </section>
                    </ItemCollapse>
                </ItemCollapseGroup>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoListCollapse',
    data () {
      return {
        column2: [1, 2],
        openId: 3
      }
    },
    methods: {
      choose (id) {
        this.openId = id
      }
    },
    i18n: {
      messages: {
        'zh-CN': {
          title: '列表折叠',
          notice: '注意',
          noticeInfo: '折叠列表不支持重叠组合, 最多只有一级折叠. "Selected" 数据由外向内传递, 只用于展示, 请勿过分使用.',
          normalList: '普通列表',
          collapseList: '列表折叠',
          accordionList: '手风琴列表(只开启一个)',
        },
        'en-US': {
          title: 'ListCollapse',
          notice: 'Notice',
          noticeInfo: 'Collapsed lists do not support overlapping combinations. There is at most only one level of folding. "Selected" data is transmitted from outside to inside. For display only, DO NOT over use it.',
          normalList: 'Normal List',
          collapseList: 'Collapse List',
          accordionList: 'Accordion List (open only one)',
        }
      }
    }
  }
</script>
