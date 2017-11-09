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
                    <vm-icon slot="item-start" name="apps"></vm-icon>
                    <span>根组件</span>
                    <vm-note slot="item-end">App</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'nav'}">
                    <vm-icon slot="item-start" name="navigate"></vm-icon>
                    <span>导航组件</span>
                    <vm-note slot="item-end">Nav</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'content'}">
                    <vm-icon slot="item-start" name="paper"></vm-icon>
                    <span>页面组件</span>
                    <vm-note slot="item-end">Page</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'grid'}">
                    <vm-icon slot="item-start" name="grid"></vm-icon>
                    <span>栅格</span>
                    <vm-note slot="item-end">Grid</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>基础服务/Service</vm-list-header>
                <vm-item button :to="{name:'config'}">
                    <vm-icon slot="item-start" name="settings"></vm-icon>
                    <span>配置参数</span>
                    <vm-note slot="item-end">Config</vm-note>
                </vm-item>
                <vm-item button :to="{name:'platform'}">
                    <vm-icon slot="item-start" md="logo-android" ios="logo-apple"></vm-icon>
                    <span>平台参数</span>
                    <vm-note slot="item-end">Platform</vm-note>
                </vm-item>
                <vm-item button :to="{name:'history'}">
                    <vm-icon slot="item-start" name="logo-buffer"></vm-icon>
                    <span>历史记录</span>
                    <vm-note slot="item-end">History</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>跨平台组件/Cross</vm-list-header>
                <vm-item button :to="{name:'crossPlatform'}">
                    <vm-icon slot="item-start" name="logo-javascript"></vm-icon>
                    <vm-label>
                        <h2>跨平台组件</h2>
                        <p>支付宝/钉钉/微信/自研Hybrid</p>
                    </vm-label>
                    <vm-note slot="item-end">Cross Platform</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <!--通用组件-->
                <vm-list-header>通用组件/Common</vm-list-header>
                <vm-item button :to="{name: 'button'}">
                    <vm-icon slot="item-start" name="download"></vm-icon>
                    <span>按钮</span>
                    <vm-note slot="item-end">Button</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'icon'}">
                    <vm-icon slot="item-start" name="ionitron"></vm-icon>
                    <span>图标</span>
                    <vm-note slot="item-end">Icon</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'spinner'}">
                    <vm-icon slot="item-start" name="medical"></vm-icon>
                    <span>菊花图</span>
                    <vm-note slot="item-end">Spinner</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'badge'}">
                    <vm-icon slot="item-start" name="ribbon"></vm-icon>
                    <span>徽章</span>
                    <vm-note slot="item-end">Badge</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'toolbar'}">
                    <vm-icon slot="item-start" name="briefcase"></vm-icon>
                    <span>工具条</span>
                    <vm-note slot="item-end">Toolbar</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'img'}">
                    <vm-icon slot="item-start" name="image"></vm-icon>
                    <span>图片</span>
                    <vm-note slot="item-end">Img</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'backdrop'}">
                    <vm-icon slot="item-start" name="barcode"></vm-icon>
                    <span>幕布</span>
                    <vm-note slot="item-end">Backdrop</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>数据录入/Data Entry</vm-list-header>
                <vm-item button :to="{name: 'toggle'}">
                    <vm-icon slot="item-start" name="swap"></vm-icon>
                    <span>开关</span>
                    <vm-note slot="item-end">Toggle</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'checkbox'}">
                    <vm-icon slot="item-start" name="checkbox"></vm-icon>
                    <span>复选框</span>
                    <vm-note slot="item-end">Checkbox</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'radio'}">
                    <vm-icon slot="item-start" name="radio-button-on"></vm-icon>
                    <span>单选框</span>
                    <vm-note slot="item-end">Radio</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'select'}">
                    <vm-icon slot="item-start" name="list-box"></vm-icon>
                    <span>选择弹层</span>
                    <vm-note slot="item-end">Select</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'input'}">
                    <vm-icon slot="item-start" name="backspace"></vm-icon>
                    <span>输入框</span>
                    <vm-note slot="item-end">Input</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'textarea'}">
                    <vm-icon slot="item-start" name="reorder"></vm-icon>
                    <span>多行输入</span>
                    <vm-note slot="item-end">Textarea</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'range'}">
                    <vm-icon slot="item-start" name="options"></vm-icon>
                    <span>范围选择</span>
                    <vm-note slot="item-end">Range</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'searchbar'}">
                    <vm-icon slot="item-start" name="search"></vm-icon>
                    <span>搜索栏</span>
                    <vm-note slot="item-end">SearchBar</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'feedback'}">
                    <vm-icon slot="item-start" name="archive"></vm-icon>
                    <span>反馈</span>
                    <vm-note slot="item-end">Feedback</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'chooseCity'}">
                    <vm-icon slot="item-start" name="boat"></vm-icon>
                    <span>城市选择</span>
                    <vm-note slot="item-end">ChooseCity</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'slideBox'}">
                    <vm-icon slot="item-start" name="key"></vm-icon>
                    <span>滑动验证</span>
                    <vm-note slot="item-end">SlideBox</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'picker'}">
                    <vm-icon slot="item-start" name="basket"></vm-icon>
                    <span>单多列选择器</span>
                    <vm-note slot="item-end">Picker</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'sheet'}">
                    <vm-icon slot="item-start" name="car"></vm-icon>
                    <span>弹出单</span>
                    <vm-note slot="item-end">Sheet</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'popSheet'}">
                    <vm-icon slot="item-start" name="car"></vm-icon>
                    <span>弹出窗</span>
                    <vm-note slot="item-end">PopSheet</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>数据加载/Data Loading</vm-list-header>
                <vm-item button :to="{name: 'infinite-scroll'}">
                    <vm-icon slot="item-start" name="arrow-dropup-circle"></vm-icon>
                    <span>无限滚动</span>
                    <vm-note slot="item-end">InfiniteScroll</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'refresher'}">
                    <vm-icon slot="item-start" name="arrow-dropdown-circle"></vm-icon>
                    <span>下拉刷新</span>
                    <vm-note slot="item-end">Refresher</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>内容展示/Content Display</vm-list-header>
                <vm-item button :to="{name: 'list'}">
                    <vm-icon slot="item-start" name="list"></vm-icon>
                    <span>列表</span>
                    <vm-note slot="item-end">List</vm-note>
                </vm-item>
                <vm-item button :to="{name:'list.collapse'}">
                    <vm-icon slot="item-start" name="list"></vm-icon>
                    <span>手风琴</span>
                    <vm-note slot="item-end">Collapse</vm-note>
                </vm-item>
                <vm-item button :to="{name:'list.slidingList'}">
                    <vm-icon slot="item-start" name="list"></vm-icon>
                    <span>侧滑操作</span>
                    <vm-note slot="item-end">SlidingItem</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'slides'}">
                    <vm-icon slot="item-start" name="photos"></vm-icon>
                    <span>轮播/跑马灯</span>
                    <vm-note slot="item-end">Slides</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'slidesLite'}">
                    <vm-icon slot="item-start" name="film"></vm-icon>
                    <span>轮播(Lite)</span>
                    <vm-note slot="item-end">SlidesLite</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'cards'}">
                    <vm-icon slot="item-start" name="calendar"></vm-icon>
                    <span>卡片</span>
                    <vm-note slot="item-end">Cards</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'scroll'}">
                    <vm-icon slot="item-start" name="flash"></vm-icon>
                    <span>滚动</span>
                    <vm-note slot="item-end">Scroll</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'separation'}">
                    <vm-icon slot="item-start" name="remove"></vm-icon>
                    <span>分割段</span>
                    <vm-note slot="item-end">Separation</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'deeplink'}">
                    <vm-icon slot="item-start" name="link"></vm-icon>
                    <span>跳转到App</span>
                    <vm-note slot="item-end">Deeplink</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'previewImage'}">
                    <vm-icon slot="item-start" name="image"></vm-icon>
                    <span>图片预览</span>
                    <vm-note slot="item-end">PreviewImage</vm-note>
                </vm-item>
                <vm-item button>
                    <vm-icon slot="item-start" name="star"></vm-icon>
                    <span>返回顶部(未完成)</span>
                    <vm-note slot="item-end">BackToTop</vm-note>
                </vm-item>
                <vm-item button>
                    <vm-icon slot="item-start" name="star"></vm-icon>
                    <span>评分(未完成)</span>
                    <vm-note slot="item-end">Rating</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>提示&操作/Notice&Action</vm-list-header>
                <vm-item button :to="{name: 'alert'}">
                    <vm-icon slot="item-start" name="alert"></vm-icon>
                    <span>对话框</span>
                    <vm-note slot="item-end">Alert</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'loading'}">
                    <vm-icon slot="item-start" name="refresh"></vm-icon>
                    <span>加载提示</span>
                    <vm-note slot="item-end">Loading</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'indicator'}">
                    <vm-icon slot="item-start" name="more"></vm-icon>
                    <span>指示器</span>
                    <vm-note slot="item-end">Indicator</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'modal'}">
                    <vm-icon slot="item-start" name="chatboxes"></vm-icon>
                    <span>弹出页</span>
                    <vm-note slot="item-end">Modal</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'toast'}">
                    <vm-icon slot="item-start" name="information-circle"></vm-icon>
                    <span>通知</span>
                    <vm-note slot="item-end">Toast</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'popover'}">
                    <vm-icon slot="item-start" name="text"></vm-icon>
                    <span>提示框</span>
                    <vm-note slot="item-end">Popover</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'actionSheet'}">
                    <vm-icon slot="item-start" name="list-box"></vm-icon>
                    <span>选择单</span>
                    <vm-note slot="item-end">ActionSheet</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'fab'}">
                    <vm-icon slot="item-start" name="basketball"></vm-icon>
                    <span>浮动按钮</span>
                    <vm-note slot="item-end">Fab</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'noticeBar'}">
                    <vm-icon slot="item-start" name="compass"></vm-icon>
                    <span>提示条</span>
                    <vm-note slot="item-end">NoticeBar</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>内容切换/Switch</vm-list-header>
                <vm-item button>
                    <vm-icon slot="item-start" name="book"></vm-icon>
                    <span>菜单</span>
                    <vm-note slot="item-end">Menus</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'segment'}">
                    <vm-icon slot="item-start" name="book"></vm-icon>
                    <span>小标签</span>
                    <vm-note slot="item-end">Segment</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'scrollSegment'}">
                    <vm-icon slot="item-start" name="egg"></vm-icon>
                    <span>滚动标签</span>
                    <vm-note slot="item-end">ScrollSegment</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'tabs'}">
                    <vm-icon slot="item-start" name="link"></vm-icon>
                    <span>大标签</span>
                    <vm-note slot="item-end">Tabs</vm-note>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>
                    <span>第三方模块/Third Part</span>
                </vm-list-header>
                <vm-item button :to="{name: 'storage'}">
                    <vm-icon slot="item-start" name="filing"></vm-icon>
                    <span>本地存储</span>
                    <vm-note slot="item-end">Storage</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'geo'}">
                    <vm-icon slot="item-start" name="pin"></vm-icon>
                    <span>获取位置</span>
                    <vm-note slot="item-end">Geolocation</vm-note>
                </vm-item>
                <vm-item button :to="{name: 'log'}">
                    <vm-icon slot="item-start" name="analytics"></vm-icon>
                    <span>日志</span>
                    <vm-note slot="item-end">Log</vm-note>
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
