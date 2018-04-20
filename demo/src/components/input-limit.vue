<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item>
                    <Label color="primary">{{$t('max10')}}</Label>
                    <Input :max="10" show-focus-highlight :placeholder="$t('placeholderText')" type="text" v-model="text" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('max10000')}}</Label>
                    <Input :max="10000" show-focus-highlight :placeholder="$t('placeholderNumber')" type="number" v-model="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('min3')}}</Label>
                    <Input :min="3" show-focus-highlight :placeholder="$t('placeholderNumber')" type="number" clearInput></Input>
                </Item>

                <Item>
                    <Label color="primary">{{$t('more3')}}</Label>
                    <Input :decimal="3" show-focus-highlight :placeholder="$t('placeholderNumber')" type="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('money100')}}</Label>
                    <Input :min="0" :max="100" show-focus-highlight placeholder="$t('placeholderNumber')" type="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('range_210')}}</Label>
                    <Input :min="-2" :max="10" show-focus-highlight placeholder="-2~10" type="number"
                           clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('range010')}}</Label>
                    <Input :min="0" :max="10" show-focus-highlight placeholder="0~10" type="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">{{$t('range210')}}</Label>
                    <Input :min="2" :max="10" show-focus-highlight placeholder="2~10" type="number" clearInput></Input>
                </Item>
                <Item>
                    <Label color="primary">Url</Label>
                    <Input show-focus-highlight placeholder="Input urls" type="url" clearInput></Input>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputLimitDemo',
    i18n: {
      messages: {
        'zh-CN': {
          title: '输入限制',
          max10: '最长10个字符',
          max10000: '最大数字为10000',
          min3: '最小数字为3',
          more3: '小数点后最多3位',
          money100: '金额(0~100)',
          range_210: '数字范围(-2~10)',
          range010: '数字范围(0~10)',
          range210: '数字范围(2~10)',
          placeholderText: '请输入输入文本',
          placeholderNumber: '请输入输入数字',
        },
        'en-US': {
          title: 'Limit',
          max10: 'Up to 10 characters',
          max10000: 'Up to 10000 characters',
          min3: 'The minimum number is 3',
          more3: 'Up to 3 digits after decimal point',
          money100: 'Amount (0~100)',
          range_210: 'Numerical range (-2~10)',
          range010: 'Numerical range (0~10)',
          range210: 'Numerical range (2~10)',
          placeholderText: 'Please input text',
          placeholderNumber: 'Please input number',
        }
      }
    },
    data () {
      return {
        text: null,
        number: null
      }
    }
  }
</script>
