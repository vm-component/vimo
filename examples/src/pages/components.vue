<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>组件列表</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content" record-position>
            <vm-list>
                <vm-list-header>布局/Layout</vm-list-header>
                <vm-item button :to="{path: '/app'}">
                    <vm-icon slot="item-left" name="apps"></vm-icon>
                    <span>根组件</span>
                    <vm-note slot="item-right">App</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'nav'}">
                    <vm-icon slot="item-left" name="navigate"></vm-icon>
                    <span>导航组件</span>
                    <vm-note slot="item-right">Nav</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'content'}">
                    <vm-icon slot="item-left" name="paper"></vm-icon>
                    <span>页面组件</span>
                    <vm-note slot="item-right">Page</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'grid'}">
                    <vm-icon slot="item-left" name="grid"></vm-icon>
                    <span>栅格</span>
                    <vm-note slot="item-right">Grid</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>基础服务/Service</vm-list-header>
                <vm-item button :to="{name:'config'}">
                    <vm-icon slot="item-left" name="settings"></vm-icon>
                    <span>配置参数</span>
                    <vm-note slot="item-right">Config</vm-note>
                </vm-item>
                <vm-item button :to="{name:'platform'}">
                    <vm-icon slot="item-left" md="logo-android" ios="logo-apple"></vm-icon>
                    <span>平台参数</span>
                    <vm-note slot="item-right">Platform</vm-note>
                </vm-item>
                <vm-item button :to="{name:'history'}">
                    <vm-icon slot="item-left" name="logo-buffer"></vm-icon>
                    <span>历史记录</span>
                    <vm-note slot="item-right">History</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>跨平台组件/Cross</vm-list-header>
                <vm-item button :to="{name:'crossPlatform'}">
                    <vm-icon slot="item-left" name="logo-javascript"></vm-icon>
                    <vm-label>
                        <h2>跨平台组件</h2>
                        <p>支付宝/钉钉/微信/自研Hybrid</p>
                    </vm-label>
                    <vm-note slot="item-right">Cross Platform</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <!--通用组件-->
                <vm-list-header>通用组件/Common</vm-list-header>
                <vm-item button :to="{name: 'button'}">
                    <vm-icon slot="item-left" name="download"></vm-icon>
                    <span>按钮</span>
                    <vm-note slot="item-right">Button</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'icon'}">
                    <vm-icon slot="item-left" name="ionitron"></vm-icon>
                    <span>图标</span>
                    <vm-note slot="item-right">Icon</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'spinner'}">
                    <vm-icon slot="item-left" name="medical"></vm-icon>
                    <span>菊花图</span>
                    <vm-note slot="item-right">Spinner</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'badge'}">
                    <vm-icon slot="item-left" name="ribbon"></vm-icon>
                    <span>徽章</span>
                    <vm-note slot="item-right">Badge</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'toolbar'}">
                    <vm-icon slot="item-left" name="briefcase"></vm-icon>
                    <span>工具条</span>
                    <vm-note slot="item-right">Toolbar</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'img'}">
                    <vm-icon slot="item-left" name="image"></vm-icon>
                    <span>图片</span>
                    <vm-note slot="item-right">Img</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'backdrop'}">
                    <vm-icon slot="item-left" name="barcode"></vm-icon>
                    <span>幕布</span>
                    <vm-note slot="item-right">Backdrop</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>数据录入/Data Entry</vm-list-header>
                <vm-item button :to="{name: 'toggle'}">
                    <vm-icon slot="item-left" name="swap"></vm-icon>
                    <span>开关</span>
                    <vm-note slot="item-right">Toggle</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'checkbox'}">
                    <vm-icon slot="item-left" name="checkbox"></vm-icon>
                    <span>复选框</span>
                    <vm-note slot="item-right">Checkbox</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'radio'}">
                    <vm-icon slot="item-left" name="radio-button-on"></vm-icon>
                    <span>单选框</span>
                    <vm-note slot="item-right">Radio</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'select'}">
                    <vm-icon slot="item-left" name="list-box"></vm-icon>
                    <span>选择弹层</span>
                    <vm-note slot="item-right">Select</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'input'}">
                    <vm-icon slot="item-left" name="backspace"></vm-icon>
                    <span>输入框</span>
                    <vm-note slot="item-right">Input</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'textarea'}">
                    <vm-icon slot="item-left" name="reorder"></vm-icon>
                    <span>多行输入</span>
                    <vm-note slot="item-right">Textarea</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'range'}">
                    <vm-icon slot="item-left" name="options"></vm-icon>
                    <span>范围选择</span>
                    <vm-note slot="item-right">Range</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'searchbar'}">
                    <vm-icon slot="item-left" name="search"></vm-icon>
                    <span>搜索栏</span>
                    <vm-note slot="item-right">SearchBar</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'feedback'}">
                    <vm-icon slot="item-left" name="archive"></vm-icon>
                    <span>反馈</span>
                    <vm-note slot="item-right">Feedback</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'chooseCity'}">
                    <vm-icon slot="item-left" name="boat"></vm-icon>
                    <span>城市选择</span>
                    <vm-note slot="item-right">ChooseCity</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'slideBox'}">
                    <vm-icon slot="item-left" name="key"></vm-icon>
                    <span>滑动验证</span>
                    <vm-note slot="item-right">SlideBox</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'picker'}">
                    <vm-icon slot="item-left" name="basket"></vm-icon>
                    <span>单多列选择器</span>
                    <vm-note slot="item-right">Picker</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'sheet'}">
                    <vm-icon slot="item-left" name="car"></vm-icon>
                    <span>弹出单</span>
                    <vm-note slot="item-right">Sheet</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'popSheet'}">
                    <vm-icon slot="item-left" name="car"></vm-icon>
                    <span>弹出窗</span>
                    <vm-note slot="item-right">PopSheet</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>数据加载/Data Loading</vm-list-header>
                <vm-item button :to="{name: 'infinite-scroll'}">
                    <vm-icon slot="item-left" name="arrow-dropup-circle"></vm-icon>
                    <span>无限滚动</span>
                    <vm-note slot="item-right">InfiniteScroll</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'refresher'}">
                    <vm-icon slot="item-left" name="arrow-dropdown-circle"></vm-icon>
                    <span>下拉刷新</span>
                    <vm-note slot="item-right">Refresher</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>内容展示/Content Display</vm-list-header>
                <vm-item button :to="{name: 'list'}">
                    <vm-icon slot="item-left" name="list"></vm-icon>
                    <span>列表</span>
                    <vm-note slot="item-right">List</vm-note>
                </vm-item>
                <vm-item button :to="{name:'list.collapse'}">
                    <vm-icon slot="item-left" name="list"></vm-icon>
                    <span>手风琴</span>
                    <vm-note slot="item-right">Collapse</vm-note>
                </vm-item>
                <vm-item button :to="{name:'list.slidingList'}">
                    <vm-icon slot="item-left" name="list"></vm-icon>
                    <span>侧滑操作</span>
                    <vm-note slot="item-right">SlidingItem</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'slides'}">
                    <vm-icon slot="item-left" name="photos"></vm-icon>
                    <span>轮播/跑马灯</span>
                    <vm-note slot="item-right">Slides</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'slidesLite'}">
                    <vm-icon slot="item-left" name="film"></vm-icon>
                    <span>轮播(Lite)</span>
                    <vm-note slot="item-right">SlidesLite</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'cards'}">
                    <vm-icon slot="item-left" name="calendar"></vm-icon>
                    <span>卡片</span>
                    <vm-note slot="item-right">Cards</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'scroll'}">
                    <vm-icon slot="item-left" name="flash"></vm-icon>
                    <span>滚动</span>
                    <vm-note slot="item-right">Scroll</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'separation'}">
                    <vm-icon slot="item-left" name="remove"></vm-icon>
                    <span>分割段</span>
                    <vm-note slot="item-right">Separation</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'deeplink'}">
                    <vm-icon slot="item-left" name="link"></vm-icon>
                    <span>跳转到App</span>
                    <vm-note slot="item-right">Deeplink</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'previewImage'}">
                    <vm-icon slot="item-left" name="image"></vm-icon>
                    <span>图片预览</span>
                    <vm-note slot="item-right">PreviewImage</vm-note>
                </vm-item>
                <vm-item button>
                    <vm-icon slot="item-left" name="star"></vm-icon>
                    <span>返回顶部(未完成)</span>
                    <vm-note slot="item-right">BackToTop</vm-note>
                </vm-item>
                <vm-item button>
                    <vm-icon slot="item-left" name="star"></vm-icon>
                    <span>评分(未完成)</span>
                    <vm-note slot="item-right">Rating</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>提示&操作/Notice&Action</vm-list-header>
                <vm-item button :to="{name: 'alert'}">
                    <vm-icon slot="item-left" name="alert"></vm-icon>
                    <span>对话框</span>
                    <vm-note slot="item-right">Alert</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'loading'}">
                    <vm-icon slot="item-left" name="refresh"></vm-icon>
                    <span>加载提示</span>
                    <vm-note slot="item-right">Loading</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'indicator'}">
                    <vm-icon slot="item-left" name="more"></vm-icon>
                    <span>指示器</span>
                    <vm-note slot="item-right">Indicator</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'modal'}">
                    <vm-icon slot="item-left" name="chatboxes"></vm-icon>
                    <span>弹出页</span>
                    <vm-note slot="item-right">Modal</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'toast'}">
                    <vm-icon slot="item-left" name="information-circle"></vm-icon>
                    <span>通知</span>
                    <vm-note slot="item-right">Toast</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'popover'}">
                    <vm-icon slot="item-left" name="text"></vm-icon>
                    <span>提示框</span>
                    <vm-note slot="item-right">Popover</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'actionSheet'}">
                    <vm-icon slot="item-left" name="list-box"></vm-icon>
                    <span>选择单</span>
                    <vm-note slot="item-right">ActionSheet</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'fab'}">
                    <vm-icon slot="item-left" name="basketball"></vm-icon>
                    <span>浮动按钮</span>
                    <vm-note slot="item-right">Fab</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'noticeBar'}">
                    <vm-icon slot="item-left" name="compass"></vm-icon>
                    <span>提示条</span>
                    <vm-note slot="item-right">NoticeBar</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>内容切换/Switch</vm-list-header>
                <vm-item button>
                    <vm-icon slot="item-left" name="book"></vm-icon>
                    <span>菜单</span>
                    <vm-note slot="item-right">Menus</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'segment'}">
                    <vm-icon slot="item-left" name="book"></vm-icon>
                    <span>小标签</span>
                    <vm-note slot="item-right">Segment</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'scrollSegment'}">
                    <vm-icon slot="item-left" name="egg"></vm-icon>
                    <span>滚动标签</span>
                    <vm-note slot="item-right">ScrollSegment</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'tabs'}">
                    <vm-icon slot="item-left" name="link"></vm-icon>
                    <span>大标签</span>
                    <vm-note slot="item-right">Tabs</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>
                    <span>第三方模块/Third Part</span>
                </vm-list-header>
                <vm-item button :to="{name: 'storage'}">
                    <vm-icon slot="item-left" name="filing"></vm-icon>
                    <span>本地存储</span>
                    <vm-note slot="item-right">Storage</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'geo'}">
                    <vm-icon slot="item-left" name="pin"></vm-icon>
                    <span>获取位置</span>
                    <vm-note slot="item-right">Geolocation</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'log'}">
                    <vm-icon slot="item-left" name="analytics"></vm-icon>
                    <span>日志</span>
                    <vm-note slot="item-right">Log</vm-note>
                </vm-item>
                <!--&lt;!&ndash;Demo&ndash;&gt;-->
                <!--<vm-list-header>-->
                <!--<span>Demo</span>-->
                <!--</vm-list-header>-->
                <!--&lt;!&ndash;group&ndash;&gt;-->
                <!--<vm-item-group>-->
                <!--<vm-item button :to="{name: 'demo'}">Demo</vm-item>-->
                <!--<vm-item button :to="{name: 'demo_banshi'}">办事指南</vm-item>-->
                <!--<vm-item button :to="{name: 'ghostvue'}">ghost</vm-item>-->
                <!--<vm-item button :to="{name: 'gl-input'}">GL-Input</vm-item>-->
                <!--<vm-item button :to="{name: 'log'}">Log</vm-item>-->
                <!--</vm-item-group>-->
            </vm-list>
        </vm-content>
    </vm-page>
</template>
