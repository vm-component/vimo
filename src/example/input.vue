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
                    <Label color="primary">Inline Label</Label>
                    <Input placeholder="Text Input"></Input>
                </Item>

                <Item>
                    <Label color="primary" fixed>Fixed Label</Label>
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
                    <Textarea @onBlur="onBlur($event)" @onFocus="onFocus($event)" @onInput="onInput($event)"
                              placeholder="Enter a description"></Textarea>
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
                    <Input :debounce="0" :clearInput="true" placeholder="Text Input" v-model="testValue"
                           :disabled="testDisabled"></Input>
                </Item>
                <Item>
                    <span> 当前的值: {{testValue}}</span>
                </Item>
                <Grid>
                    <Row justify-content-center>
                        <Button @click="disableToggle">Disable Toggle</Button>
                    </Row>
                </Grid>

            </List>
        </Content>
    </Page>
</template>
<style lang="scss">
</style>
<script type="text/ecmascript-6">
  import { Label } from 'vimo/components/label'
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
    methods: {
      onBlur($event){
        console.debug('onBlur')
      },
      onFocus($event){
        console.debug('onFocus')
        console.debug($event)
      },
      onInput($event){
        console.debug('onInput')
      },
      disableToggle(){
        this.testDisabled = !this.testDisabled;
      }
    },
    created(){},
    mounted(){},
    activated(){},
    components: {Label, List, ListHeader, Item, Input, Textarea}
  }
</script>
