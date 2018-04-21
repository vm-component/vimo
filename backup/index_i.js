import core from './core.js'
import App from './components/app'
import Footer from './components/footer'
import Header from './components/header'
import Content from './components/content'
import Nav from './components/nav'
import Navbar from './components/navbar'
import Page from './components/page'
import ActionSheet from './components/action-sheet'
import Alert from './components/alert'
import Avatar from './components/avatar'
import Backdrop from './components/backdrop'
import Badge from './components/badge'
import Button from './components/button'
import Card from './components/card'
import CardHeader from './components/card-header'
import CardTitle from './components/card-title'
import CardContent from './components/card-content'
import Checkbox from './components/checkbox'
import ChooseCity from './components/choose-city'
import CityPicker from './components/city-picker'
import Datetime from './components/datetime'
import Fab from './components/fab'
import FabButton from './components/fab-button'
import FabList from './components/fab-list'
import Feedback from './components/feedback'
import Column from './components/column'
import Row from './components/row'
import Grid from './components/grid'
import Icon from './components/icon'
import Img from './components/img'
import Indicator from './components/indicator'
import InfiniteScroll from './components/infinite-scroll'
import InfiniteScrollContent from './components/infinite-scroll-content'
import Input from './components/input'
import Textarea from './components/textarea'
import Item from './components/item'
import ItemDivider from './components/item-divider'
import ItemGroup from './components/item-group'
import ListHeader from './components/list-header'
import ItemCollapse from './components/item-collapse'
import ItemCollapseGroup from './components/item-collapse-group'
import ItemSliding from './components/item-sliding'
import ItemSlidingOptions from './components/item-sliding-options'
import Label from './components/label'
import LandscapePrompt from './components/landscape-prompt'
import List from './components/list'
import Loading from './components/loading'
import Menu from './components/menu'
import Modal from './components/modal'
import Note from './components/note'
import NoticeBar from './components/noticebar'
import Picker from './components/picker'
import Popover from './components/popover'
import PopSheet from './components/pop-sheet'
import PreviewImage from './components/preview-image'
import Radio from './components/radio'
import Range from './components/range'
import Refresher from './components/refresher'
import RefresherContent from './components/refresher-content'
import Scroll from './components/scroll'
import ScrollSegment from './components/scroll-segment'
import ScrollSegmentButton from './components/scroll-segment-button'
import Searchbar from './components/searchbar'
import Segment from './components/segment'
import SegmentButton from './components/segment-button'
import Select from './components/select'
import SelectOption from './components/select-option'
import Separation from './components/separation'
import Sheet from './components/sheet'
import SlideBox from './components/slide-box'
import Slide from './components/slide'
import Slides from './components/slides'
import SlideLite from './components/slide-lite'
import SlidesLite from './components/slides-lite'
import Spinner from './components/spinner'
import Tab from './components/tab'
import Tabs from './components/tabs'
import Thumbnail from './components/thumbnail'
import Toast from './components/toast'
import ToolbarButtons from './components/toolbar-buttons'
import ToolbarTitle from './components/toolbar-title'
import Toolbar from './components/toolbar'
import Toggle from './components/toggle'

var ENV = process.env.NODE_ENV
if (ENV && ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
  console.warn('You are using a whole package of vimo, ' + 'please read docs https://vm-component.github.io/vimo/ to reduce app bundle size.')
}

// 通过script脚本使用, 资源全部打包, 不推荐
export default {
  App,
  Footer,
  Header,
  Content,
  Nav,
  Navbar,
  Page,
  ActionSheet,
  Alert,
  Avatar,
  Backdrop,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  ChooseCity,
  CityPicker,
  Datetime,
  Fab,
  FabButton,
  FabList,
  Feedback,
  Column,
  Grid,
  Row,
  Icon,
  Img,
  Indicator,
  InfiniteScroll,
  InfiniteScrollContent,
  Input,
  Textarea,
  Item,
  ItemDivider,
  ItemGroup,
  ListHeader,
  ItemCollapse,
  ItemCollapseGroup,
  ItemSliding,
  ItemSlidingOptions,
  Label,
  LandscapePrompt,
  List,
  Loading,
  Menu,
  Modal,
  Note,
  NoticeBar,
  Picker,
  Popover,
  PopSheet,
  PreviewImage,
  Radio,
  Range,
  Refresher,
  RefresherContent,
  Scroll,
  ScrollSegment,
  ScrollSegmentButton,
  Searchbar,
  Segment,
  SegmentButton,
  Select,
  SelectOption,
  Separation,
  Sheet,
  SlideBox,
  Slides,
  Slide,
  SlideLite,
  SlidesLite,
  Spinner,
  Tab,
  Tabs,
  Thumbnail,
  Toast,
  ToolbarButtons,
  ToolbarTitle,
  Toolbar,
  Toggle,
  install (Vue, options = {}) {
    /* istanbul ignore if */
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
    Vue.component(ItemCollapseGroup.name, ItemCollapseGroup)
    Vue.component(ItemSliding.name, ItemSliding)
    Vue.component(ItemSlidingOptions.name, ItemSlidingOptions)
    Vue.component(Label.name, Label)
    Vue.component(List.name, List)
    Vue.component(Menu.name, Menu)
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
    Vue.component(SelectOption.name, SelectOption)
    Vue.component(Separation.name, Separation)
    Vue.component(Sheet.name, Sheet)
    Vue.component(PopSheet.name, PopSheet)
    Vue.component(SlideBox.name, SlideBox)
    Vue.component(Slides.name, Slides)
    Vue.component(Slide.name, Slide)
    Vue.component(SlidesLite.name, SlidesLite)
    Vue.component(SlideLite.name, SlideLite)
    Vue.component(Spinner.name, Spinner)
    Vue.component(Tabs.name, Tabs)
    Vue.component(Tab.name, Tab)
    Vue.component(Thumbnail.name, Thumbnail)
    Vue.component(ToolbarButtons.name, ToolbarButtons)
    Vue.component(ToolbarTitle.name, ToolbarTitle)
    Vue.component(Toolbar.name, Toolbar)
    Vue.component(Toggle.name, Toggle)

    this.installed = true
  }
}
