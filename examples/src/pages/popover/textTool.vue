<template>
    <Content>
        <List radio-group v-model="fontFamily" @onChange="changeFontFamily">
            <Row no-padding>
                <Column no-padding>
                    <Item role="popover-dot" class="text-button popover-text-smaller"
                          @click.native="changeFontSize('smaller')">
                        <div text-center class="block">A</div>
                    </Item>
                </Column>
                <Column no-padding>
                    <Item role="popover-dot" class="text-button popover-text-larger"
                          @click.native="changeFontSize('larger')">
                        <div text-center class="block">A</div>
                    </Item>
                </Column>
            </Row>
            <Row no-padding class="row-dots">
                <Column no-padding>
                    <div class="popover-dot-box" :class="{'selected':background == 'white'}" @click="changeBackground('white')">
                        <Button role="popover-dot" class="popover-dot-white"></Button>
                    </div>
                </Column>
                <Column no-padding>
                    <div class="popover-dot-box" :class="{'selected':background == 'tan'}" @click="changeBackground('tan')">
                        <Button role="popover-dot" class="popover-dot-tan"></Button>
                    </div>
                </Column>
                <Column no-padding>
                    <div class="popover-dot-box" :class="{'selected':background == 'grey'}" @click="changeBackground('grey')">
                        <Button role="popover-dot" class="popover-dot-grey"></Button>
                    </div>
                </Column>
                <Column no-padding>
                    <div class="popover-dot-box" :class="{'selected':background == 'black'}" @click="changeBackground('black')">
                        <Button role="popover-dot" class="popover-dot-black"></Button>
                    </div>
                </Column>
            </Row>
            <ItemDivider color="dark">
                <Label>Font Family</Label>
            </ItemDivider>
            <Item class="text-athelas">
                <Label>Athelas</Label>
                <Radio slot="item-left" value="Athelas"></Radio>
            </Item>
            <Item class="text-charter">
                <Label>Charter</Label>
                <Radio slot="item-left" value="Charter"></Radio>
            </Item>
            <Item class="text-iowan">
                <Label>Iowan</Label>
                <Radio slot="item-left" value="Iowan"></Radio>
            </Item>
            <Item class="text-palatino">
                <Label>Palatino</Label>
                <Radio slot="item-left" value="Palatino"></Radio>
            </Item>
            <Item class="text-san-francisco">
                <Label>San Francisco</Label>
                <Radio slot="item-left" value="San Francisco"></Radio>
            </Item>
            <Item class="text-seravek">
                <Label>Seravek</Label>
                <Radio slot="item-left" value="Seravek"></Radio>
            </Item>
            <Item class="text-times-new-roman">
                <Label>Times New Roman</Label>
                <Radio slot="item-left" value="Times New Roman"></Radio>
            </Item>
        </List>
    </Content>
</template>
<style scoped lang="less">

    .block {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    [role="popover-dot"] {
        padding: 0;
    }

    .popover-dot-box{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /*
      Popover
    */

    .page-api-radio-popover .ion-row,
    .page-api-radio-popover .ion-col {
        padding: 0;
    }

    .popover-text-button {
        padding-left: 0;
        text-align: center;
        min-height: 20px;
        line-height: 18px;
    }

    .popover-text-button .item-inner {
        padding-right: 0;
    }

    .popover-text-smaller {
        font-size: 12px;
    }

    .popover-text-larger {
        font-size: 16px;
    }

    .popover-row-dots {
        text-align: center;
    }

    .popover-dot {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin: 10px auto;
        position: relative;
    }

    .popover-dot-white {
        background-color: rgb(255, 255, 255);
    }

    .popover-dot-tan {
        background-color: rgb(249, 241, 228);
    }

    .popover-dot-grey {
        background-color: rgb(76, 75, 80);
    }

    .popover-dot-black {
        background-color: rgb(0, 0, 0);
    }

    .selected .popover-dot {
        border-width: 2px !important;
        border-color: #327eff !important;
    }

    .popover-text-athelas {
        font-family: "Athelas";
    }

    .popover-text-charter {
        font-family: "Charter";
    }

    .popover-text-iowan {
        font-family: "Iowan";
    }

    .popover-text-palatino {
        font-family: "Palatino";
    }

    .popover-text-san-francisco {
        font-family: "San Francisco";
    }

    .popover-text-seravek {
        font-family: "Seravek";
    }

    .popover-text-times-new-roman {
        font-family: "Times New Roman";
    }

    /*
      iOS Popover
    */

    .ios .popover-text-smaller {
        border-right: 1px solid #c8c7cc;
    }

    .ios .popover-row-dots {
        border-bottom: 1px solid #c8c7cc;
    }

    .ios .popover-dot {
        border: 1px solid #c8c7cc;
    }

    .hairlines .popover-text-smaller,
    .hairlines .popover-row-dots,
    .hairlines .popover-dot {
        border-width: 0.55px;
    }

    /*
      Material Design Popover
    */

    .md .popover-text-smaller {
        border-right: 1px solid #dedede;
    }

    .md .popover-row-dots {
        border-bottom: 1px solid #dedede;
    }

    .md .popover-dot {
        border: 1px solid #dedede;
    }

</style>
<script type="text/javascript">
  export default{
    name: 'comp',
    data () {
      return {
        contentEle: null,
        fontFamily: '',
        background: '',
        colors: {
          'white': {
            'bg': 'rgb(255, 255, 255)',
            'fg': 'rgb(0, 0, 0)'
          },
          'tan': {
            'bg': 'rgb(249, 241, 228)',
            'fg': 'rgb(0, 0, 0)'
          },
          'grey': {
            'bg': 'rgb(76, 75, 80)',
            'fg': 'rgb(255, 255, 255)'
          },
          'black': {
            'bg': 'rgb(0, 0, 0)',
            'fg': 'rgb(255, 255, 255)'
          }
        }
      }
    },
    methods: {
      changeBackground (color) {
        this.background = color
        this.contentEle.style.backgroundColor = this.colors[color].bg
        this.contentEle.style.color = this.colors[color].fg
      },
      changeFontFamily () {
        if (this.fontFamily) this.contentEle.style.fontFamily = this.fontFamily
      },
      changeFontSize (direction) {
        this.contentEle.style.fontSize = direction
      },
      getColorName (background) {
        let colorName = 'white'
        if (!background) return 'white'
        for (var key in this.colors) {
          if (this.colors[key].bg === background) {
            colorName = key
          }
        }
        return colorName
      },
      setFontFamily () {
        if (this.contentEle.style.fontFamily) {
          this.fontFamily = this.contentEle.style.fontFamily.replace(/'/g, '')
        }
      }
    },
    created () {
      this.contentEle = this.$options.$data.contentEle
      this.background = this.getColorName(this.contentEle.style.backgroundColor)
      this.setFontFamily()
    }
  }
</script>
