/**
 * Created by Hsiang on 2017/1/14.
 */
import Vue from 'vue';
// 基本组件注册
import Header from './components/app/src/header.vue'
import Footer from './components/app/src/footer.vue'
import Content from './components/content'
import Button from './components/button'
import Icon from './components/icon'
import Nav from './components/nav'
import Navbar from './components/navbar'
import Page from './components/page'
import Label from './components/label'
import List from './components/list'
import {Item,ListhHeader,ItemDivider,ItemGroup} from './components/item'
import Note from './components/note'

Vue.component('ion-header', Header);
Vue.component('ion-footer', Footer);
Vue.component('ion-content', Content);
Vue.component('ion-button', Button);
Vue.component('ion-icon', Icon);
Vue.component('ion-nav', Nav);
Vue.component('ion-navbar', Navbar);
Vue.component('ion-page', Page);
Vue.component('ion-list', List);
Vue.component('ion-label', Label);
Vue.component('ion-item', Item);
Vue.component('ion-list-header', ListhHeader);
Vue.component('ion-item-divider', ItemDivider);
Vue.component('ion-item-group', ItemGroup);
Vue.component('ion-note', Note);


// toolbar
import Toolbar from './components/toolbar/src/toolbar.vue';
import Title from './components/toolbar/src/toolbar-title.vue';
import Buttons from './components/toolbar/src/toolbar-buttons.vue';
Vue.component('ion-toolbar', Toolbar);
Vue.component('ion-title', Title);
Vue.component('ion-buttons', Buttons);

//segment
import Segment from './components/segment/src/segment.vue';
import SegmentButton from './components/segment/src/segment-button.vue';
Vue.component('ion-segment', Segment);
Vue.component('ion-segment-button', SegmentButton);

//searchabr
import Searchbar from './components/searchbar'
Vue.component('ion-searchbar', Searchbar);

//toggle
import Toggle from './components/toggle'
Vue.component('ion-toggle', Toggle);