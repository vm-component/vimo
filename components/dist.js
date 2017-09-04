import core from './core.js'
import { ActionSheet } from './action-sheet'
import { Alert } from './alert'
import { Avatar } from './avatar'
import { Backdrop } from './backdrop'
import { Badge } from './badge'
import { Button } from './button'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Checkbox } from './checkbox'
import { ChooseCity } from './choose-city'
import { CityPicker } from './city-picker'
import { Datetime } from './datetime'
import { Fab, FabButton, FabList } from './fab'
import { Feedback } from './feedback'
import { Column, Grid, Row } from './grid'
import { Icon } from './icon'
import { Img } from './img'
import { Indicator } from './indicator'
import { InfiniteScroll, InfiniteScrollContent } from './infinite-scroll'
import { Input, Textarea } from './input'
import { Item, ItemCollapse, ItemDivider, ItemGroup, ItemOptions, ItemSliding, ListHeader } from './item'
import { Label } from './label'
import { List } from './list'
import { Loading } from './loading'
import { Menus } from './menus'
import { Modal } from './modal'
import { Note } from './note'
import { NoticeBar } from './noticebar'
import { Picker } from './picker'
import { Popover } from './popover'
import { PreviewImage } from './preview-image'
import { Radio } from './radio'
import { Range } from './range'
import { Refresher, RefresherContent } from './refresher'
import { Scroll } from './scroll'
import { ScrollSegment, ScrollSegmentButton } from './scroll-segment'
import { Searchbar } from './searchbar'
import { Segment, SegmentButton } from './segment'
import { Option, Select } from './select'
import { Separation } from './separation'
import { Sheet } from './sheet'
import { SlideBox } from './slide-box'
import { Slide, Slides } from './slides'
import { Slide as SlideLite, Slides as SlidesLite } from './slides-lite'
import { Spinner } from './spinner'
import { Tab, Tabs } from './tabs'
import { Thumbnail } from './thumbnail'
import { Toast } from './toast'
import { Toggle } from './toggle'

var ENV = process.env.NODE_ENV;
if (ENV && ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
  console.warn('You are using a whole package of vimo, ' + 'please read docs https://dtfe.github.io/vimo/ to reduce app bundle size.');
}

// 通过script脚本使用, 资源全部打包, 不推荐
module.exports = {
  install (Vue, options = {}) {
    if (this.installed) return
    core(Vue, options)

    Vue.prototype.$actionSheet = ActionSheet
    Vue.prototype.$loading = Loading
    Vue.prototype.$alert = Alert
    Vue.prototype.$toast = Toast
    Vue.prototype.$modal = Modal
    Vue.prototype.$indicator = Indicator
    Vue.prototype.$chooseCity = ChooseCity
    Vue.prototype.$cityPicker = CityPicker
    Vue.prototype.$picker = Picker
    Vue.prototype.$popover = Popover
    Vue.prototype.$previewImage = PreviewImage

    Vue.component(Avatar.name, Avatar)
    Vue.component(Backdrop.name, Backdrop)
    Vue.component(Badge.name, Badge)
    Vue.component(Button.name, Button)
    Vue.component(Card.name, Card)
    Vue.component(CardContent.name, CardContent)
    Vue.component(CardHeader.name, CardHeader)
    Vue.component(CardTitle.name, CardTitle)
    Vue.component(Checkbox.name, Checkbox)
    Vue.component(Datetime.name, Datetime)
    Vue.component(Fab.name, Fab)
    Vue.component(FabButton.name, FabButton)
    Vue.component(FabList.name, FabList)
    Vue.component(Feedback.name, Feedback)
    Vue.component(Column.name, Column)
    Vue.component(Grid.name, Grid)
    Vue.component(Row.name, Row)
    Vue.component(Icon.name, Icon)
    Vue.component(Img.name, Img)
    Vue.component(InfiniteScroll.name, InfiniteScroll)
    Vue.component(InfiniteScrollContent.name, InfiniteScrollContent)
    Vue.component(Input.name, Input)
    Vue.component(Textarea.name, Textarea)
    Vue.component(Item.name, Item)
    Vue.component(ListHeader.name, ListHeader)
    Vue.component(ItemDivider.name, ItemDivider)
    Vue.component(ItemGroup.name, ItemGroup)
    Vue.component(ItemCollapse.name, ItemCollapse)
    Vue.component(ItemSliding.name, ItemSliding)
    Vue.component(ItemOptions.name, ItemOptions)
    Vue.component(Label.name, Label)
    Vue.component(List.name, List)
    Vue.component(Menus.name, Menus)
    Vue.component(Note.name, Note)
    Vue.component(NoticeBar.name, NoticeBar)
    Vue.component(Radio.name, Radio)
    Vue.component(Range.name, Range)
    Vue.component(Refresher.name, Refresher)
    Vue.component(RefresherContent.name, RefresherContent)
    Vue.component(Scroll.name, Scroll)
    Vue.component(ScrollSegment.name, ScrollSegment)
    Vue.component(ScrollSegmentButton.name, ScrollSegmentButton)
    Vue.component(Searchbar.name, Searchbar)
    Vue.component(Segment.name, Segment)
    Vue.component(SegmentButton.name, SegmentButton)
    Vue.component(Select.name, Select)
    Vue.component(Option.name, Option)
    Vue.component(Separation.name, Separation)
    Vue.component(Sheet.name, Sheet)
    Vue.component(SlideBox.name, SlideBox)
    Vue.component(Slides.name, Slides)
    Vue.component(Slide.name, Slide)
    Vue.component('SlidesLite', SlidesLite)
    Vue.component('SlideLite', SlideLite)
    Vue.component(Spinner.name, Spinner)
    Vue.component(Tabs.name, Tabs)
    Vue.component(Tab.name, Tab)
    Vue.component(Thumbnail.name, Thumbnail)
    Vue.component(Toggle.name, Toggle)

    this.installed = true
  }
}
