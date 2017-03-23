<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Input</Title>
            </Navbar>
        </Header>
        <Content>

            <List>
                <ListHeader>
                    <span>Input</span>
                </ListHeader>
                <Item>
                    <Label color="primary">Inline Label Is In Line</Label>
                    <Input placeholder="Text Input"></Input>
                </Item>

                <Item>
                    <Label color="primary" fixed>Fixed Label With Long Name</Label>
                    <Input type="tel" placeholder="Tel Input"></Input>
                </Item>

                <Item>
                    <Input type="number" placeholder="Number Input with no label"></Input>
                </Item>

                <Item>
                    <Label color="primary" stacked>Stacked Label</Label>
                    <Input type="email" placeholder="Email Input"></Input>
                </Item>

                <Item>
                    <Label color="primary" stacked>Stacked Label</Label>
                    <Input type="password" placeholder="Password Input"></Input>
                </Item>

                <Item>
                    <Label color="primary" floating>Floating Label</Label>
                    <Input></Input>
                </Item>

                <Item>
                    <Input placeholder="Clear Input" :clearInput="true"></Input>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>Textarea</span>
                </ListHeader>
                <Item>
                    <Textarea placeholder="Enter a description"></Textarea>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>Textarea</span>
                </ListHeader>
                <Item>
                    <Textarea placeholder="Enter a description"></Textarea>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>测试</span>
                </ListHeader>
                <Item>
                    <Label color="primary">TestValue</Label>
                    <Input :debounce="500" :clearInput="true" placeholder="Text Input" v-model="testValue"
                           :disabled="testDisabled"></Input>
                </Item>
                <Item>
                    <span> 当前的值: {{testValue}}</span>
                </Item>
                <Item>
                    <Button @click="disableToggle">Disable Toggle</Button>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style lang="scss">
</style>
<script type="text/ecmascript-6">
  import { Input, Textarea } from 'vimo/components/input'
  import { List } from 'vimo/components/list'
  import { ListHeader, Item } from 'vimo/components/item'
  export default{
    name: 'name',
    data(){
      return {
        testValue: 'hello',
        testDisabled: false,
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      disableToggle(){
        this.testDisabled = !this.testDisabled;
      }
    },
    created(){},
    mounted(){},
    activated(){},
    components: {List, ListHeader, Item, Input, Textarea}
  }
</script>
