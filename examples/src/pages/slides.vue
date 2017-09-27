<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Slides</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content slidesPage">
            <h1>跑马灯组件</h1>
            <p>Slides组件是 <strong>Swiper插件</strong>
               的移植和拓展, Swiper初始化传递的属性对应Vue组件的props, Swiper属性中定义的钩子事件对应Vue组件的事件系统. 两者无缝对接, 使用上没有差异.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam consequuntur cumque earum exercitationem, id ipsa laboriosam laudantium magnam mollitia perferendis provident, quia quo recusandae reprehenderit saepe sunt totam vitae!</p>


            <h5>Async</h5>

            <Slides class="swiper async" @onTransitionEnd="onTransitionEndHandler">
                <!-- 幻灯内容 -->
                <Slide class="slide" v-for="(item,index) in asyncIimageList" :key="index">
                    <img :src="item" alt="asyncImg">
                </Slide>
            </Slides>

            <Grid no-padding>
                <Row justify-content-center>
                    <Button outline small @click="loadAsyncImg">Load Img</Button>
                </Row>
            </Grid>

            <h5>Default Setup</h5>
            <Slides class="swiper" ref="defaultSwiper">
                <!-- 幻灯内容 -->
                <Slide class="slide">Slide 1</Slide>
                <Slide class="slide">Slide 2</Slide>
                <Slide class="slide">Slide 3</Slide>
            </Slides>

            <h5>Responsive / Fullscreen + Pagination</h5>
            <Slides class="swiper"
                    pagination=".swiper-pagination"
                    :paginationClickable="true">
                <!-- 幻灯内容 -->
                <Slide class="slide">Slide 1</Slide>
                <Slide class="slide">Slide 2</Slide>
                <Slide class="slide">Slide 3</Slide>
            </Slides>

            <h5>Vertical Slides + Responsive / Fullscreen</h5>
            <Slides class="swiper"
                    pagination=".swiper-pagination"
                    direction="vertical"
                    :paginationClickable="true">
                <!-- 幻灯内容 -->
                <Slide class="slide">Slide 1</Slide>
                <Slide class="slide">Slide 2</Slide>
                <Slide class="slide">Slide 3</Slide>
            </Slides>

            <h5>Auto Slides Per View / Carousel Mode</h5>
            <Slides class="swiper grabCusor"
                    pagination=".swiper-pagination"
                    slidesPerView="auto"
                    :paginationClickable="true"
                    :spaceBetween="10">
                <!-- 幻灯内容 -->
                <Slide class="slide"><span>Slide 1</span></Slide>
                <Slide class="slide"><span>Slide 2</span></Slide>
                <Slide class="slide"><span>Slide 3</span></Slide>
                <Slide class="slide"><span>Slide 4</span></Slide>
                <Slide class="slide"><span>Slide 5</span></Slide>
                <Slide class="slide"><span>Slide 6</span></Slide>
                <Slide class="slide"><span>Slide 7</span></Slide>
                <Slide class="slide"><span>Slide 8</span></Slide>
                <Slide class="slide"><span>Slide 9</span></Slide>
                <Slide class="slide"><span>Slide 10</span></Slide>
            </Slides>

            <h5>Centered Slides + Auto Slides Per View</h5>
            <Slides class="swiper grabCusor"
                    pagination=".swiper-pagination"
                    slidesPerView="auto"
                    :centeredSlides="true"
                    :paginationClickable="true"
                    :spaceBetween="10">
                <!-- 幻灯内容 -->
                <Slide class="slide"><span>Slide 1</span></Slide>
                <Slide class="slide"><span>Slide 2</span></Slide>
                <Slide class="slide"><span>Slide 3</span></Slide>
                <Slide class="slide"><span>Slide 4</span></Slide>
                <Slide class="slide"><span>Slide 5</span></Slide>
                <Slide class="slide"><span>Slide 6</span></Slide>
                <Slide class="slide"><span>Slide 7</span></Slide>
                <Slide class="slide"><span>Slide 8</span></Slide>
                <Slide class="slide"><span>Slide 9</span></Slide>
                <Slide class="slide"><span>Slide 10</span></Slide>
            </Slides>


            <h5>Scrollbar</h5>
            <Slides class="swiper"
                    scrollbar=".swiper-scrollbar"
                    :centeredSlides="true"
                    :scrollbarHide="true"
                    slidesPerView="auto"
                    :spaceBetween="30"
                    :grabCursor="false">
                <!-- 幻灯内容 -->
                <Slide class="slide">
                    <img src="../../static/img/scenery_1.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_2.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_3.jpg">
                </Slide>
            </Slides>

            <h5>Loop Mode / Infinite Loop</h5>
            <Slides class="swiper"
                    nextButton=".swiper-button-next"
                    prevButton=".swiper-button-prev"
                    pagination=".swiper-pagination"
                    :paginationClickable="true"
                    :spaceBetween="30"
                    :loop="true">
                <!-- 幻灯内容 -->
                <Slide class="slide">
                    <img src="../../static/img/scenery_1.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_2.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_3.jpg">
                </Slide>
            </Slides>


            <!--<h5>Fade Effect</h5>-->
            <!--<small>这里有问题</small>-->
            <!--<Slides class="swiper"-->
            <!--nextButton=".swiper-button-next"-->
            <!--prevButton=".swiper-button-prev"-->
            <!--pagination=".swiper-pagination"-->
            <!--:paginationClickable="true"-->
            <!--:watchSlidesProgress="true"-->
            <!--effect="fade">-->
            <!--&lt;!&ndash; 幻灯内容 &ndash;&gt;-->
            <!--<Slide class="slide">-->
            <!--<img src="../../static/img/scenery_1.jpg">-->
            <!--</Slide>-->
            <!--<Slide class="slide">-->
            <!--<img src="../../static/img/scenery_2.jpg">-->
            <!--</Slide>-->
            <!--<Slide class="slide">-->
            <!--<img src="../../static/img/scenery_3.jpg">-->
            <!--</Slide>-->
            <!--</Slides>-->

            <!--<h5>3D Flip Effect</h5>-->
            <!--<small>这里有问题</small>-->
            <!--<Slides class="swiper flipEffect"-->
            <!--effect="flip"-->
            <!--nextButton=".swiper-button-next"-->
            <!--prevButton=".swiper-button-prev"-->
            <!--pagination=".swiper-pagination"-->
            <!--:watchSlidesProgress="true"-->
            <!--:grabCursor="false">-->
            <!--&lt;!&ndash; 幻灯内容 &ndash;&gt;-->
            <!--<Slide class="slide">-->
            <!--<img src="../../static/img/scenery_1.jpg">-->
            <!--</Slide>-->
            <!--<Slide class="slide">-->
            <!--<img src="../../static/img/scenery_2.jpg">-->
            <!--</Slide>-->
            <!--<Slide class="slide">-->
            <!--<img src="../../static/img/scenery_3.jpg">-->
            <!--</Slide>-->
            <!--</Slides>-->

            <h5>3D Cube Effect</h5>
            <Slides class="swiper cubeEffect"
                    :watchSlidesProgress="true"
                    :virtualTranslate="true"
                    :resistanceRatio="0"
                    effect="cube" @onInit="onInit">
                <!-- 幻灯内容 -->
                <Slide class="slide">
                    <img src="../../static/img/scenery_1.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_2.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_3.jpg">
                </Slide>
            </Slides>


            <h5>3D Coverflow Effect</h5>
            <Slides class="swiper coverflow"
                    effect="coverflow"
                    pagination=".swiper-pagination"
                    :centeredSlides="true"
                    :watchSlidesProgress="true"
                    :grabCursor="false"
                    slidesPerView="auto"
                    :coverflow="coverflow">
                <!-- 幻灯内容 -->
                <Slide class="slide">
                    <img src="../../static/img/scenery_1.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_2.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_3.jpg">
                </Slide>
            </Slides>


            <h5>Keyboard Control / Mousewheel Control</h5>
            <p>这部分在移动端不适用</p>

            <h5>Autoplay</h5>
            <Slides class="swiper"
                    nextButton=".swiper-button-next"
                    prevButton=".swiper-button-prev"
                    pagination=".swiper-pagination"
                    :paginationClickable="true"
                    :centeredSlides="true"
                    :autoplay="2500"
                    :autoplayDisableOnInteraction="false"
                    :spaceBetween="30">
                <!-- 幻灯内容 -->
                <Slide class="slide">
                    <img src="../../static/img/scenery_1.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_2.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_3.jpg">
                </Slide>
            </Slides>


            <h5>Dynamic Slides</h5>
            <Slides class="swiper" ref="dynamicSlides"
                    nextButton=".swiper-button-next"
                    prevButton=".swiper-button-prev"
                    pagination=".swiper-pagination"
                    :paginationClickable="true">
                <!-- 幻灯内容 -->
                <Slide class="slide" v-for="(item,index) in dynamicData" :key="index">
                    <span>{{item}}</span>
                </Slide>
            </Slides>

            <Grid no-padding>
                <Row justify-content-center>
                    <Button outline small @click="addSlide"> 末尾添加slide</Button>
                    <Button outline small @click="removeSlide"> 末尾删除slide</Button>
                </Row>
            </Grid>


            <h5>Hash导航</h5>
            <p>不建议使用, 因为切换hash会导致路由跳转</p>

            <h5>RTL Layout</h5>
            <Slides class="swiper" dir="rtl"
                    nextButton=".swiper-button-next"
                    prevButton=".swiper-button-prev"
                    pagination=".swiper-pagination"
                    :paginationClickable="true">
                <!-- 幻灯内容 -->
                <Slide class="slide">
                    <img src="../../static/img/scenery_1.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_2.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_3.jpg">
                </Slide>
            </Slides>


            <h5>Parallax</h5>
            <Slides class="swiper parallax"
                    :paginationClickable="true"
                    :watchSlidesProgress="true"
                    :parallax="true"
                    :speed="600"
                    nextButton=".swiper-button-next"
                    prevButton=".swiper-button-prev"
                    pagination=".swiper-pagination">

                <!-- 注意这里的slot -->
                <div class="parallax-bg" slot="parallax" data-swiper-parallax="-23%"></div>

                <!-- 幻灯内容 -->
                <Slide class="slide">
                    <div class="title" data-swiper-parallax="-100">Slide 1</div>
                    <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
                    <div class="text" data-swiper-parallax="-300">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
                    </div>
                </Slide>
                <Slide class="slide">
                    <div class="title" data-swiper-parallax="-100">Slide 2</div>
                    <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
                    <div class="text" data-swiper-parallax="-300">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
                    </div>
                </Slide>
                <Slide class="slide">
                    <div class="title" data-swiper-parallax="-100">Slide 3</div>
                    <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
                    <div class="text" data-swiper-parallax="-300">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
                    </div>
                </Slide>
            </Slides>


            <h5>Customized Pagination</h5>
            <Slides class="swiper customizedPagination "
                    :paginationClickable="true"
                    pagination=".swiper-pagination"
                    :paginationBulletRender="paginationBulletRender">
                <!-- 幻灯内容 -->
                <Slide class="slide">
                    <img src="../../static/img/scenery_1.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_2.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_3.jpg">
                </Slide>
            </Slides>

            <h5>Fraction Pagination</h5>
            <Slides class="swiper"
                    nextButton=".swiper-button-next"
                    prevButton=".swiper-button-prev"
                    pagination=".swiper-pagination"
                    paginationType="fraction">
                <!-- 幻灯内容 -->
                <Slide class="slide">
                    <img src="../../static/img/scenery_1.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_2.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_3.jpg">
                </Slide>
            </Slides>

            <h5>Progress Pagination</h5>
            <Slides class="swiper"
                    nextButton=".swiper-button-next"
                    prevButton=".swiper-button-prev"
                    pagination=".swiper-pagination"
                    paginationType="progress">
                <!-- 幻灯内容 -->
                <Slide class="slide">
                    <img src="../../static/img/scenery_1.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_2.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_3.jpg">
                </Slide>
            </Slides>


            <h5>Images Lazy Loading</h5>
            <Slides class="swiper"
                    nextButton=".swiper-button-next"
                    prevButton=".swiper-button-prev"
                    pagination=".swiper-pagination"
                    :paginationClickable="true"
                    :lazyLoading="true"
                    :preloadImages="false">
                <!-- 幻灯内容 -->
                <Slide class="slide black">
                    <!-- Required swiper-lazy class and image source specified in data-src attribute -->
                    <img data-src="http://lorempixel.com/1600/1200/nature/1" class="swiper-lazy">
                    <!-- Preloader image -->
                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </Slide>
                <Slide class="slide black">
                    <!-- Required swiper-lazy class and image source specified in data-src attribute -->
                    <img data-src="http://lorempixel.com/1600/1200/nature/2" class="swiper-lazy">
                    <!-- Preloader image -->
                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </Slide>
                <Slide class="slide black">
                    <!-- Required swiper-lazy class and image source specified in data-src attribute -->
                    <img data-src="http://lorempixel.com/1600/1200/nature/3" class="swiper-lazy">
                    <!-- Preloader image -->
                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </Slide>
                <Slide class="slide black">
                    <!-- Required swiper-lazy class and image source specified in data-src attribute -->
                    <img data-src="http://lorempixel.com/1600/1200/nature/4" class="swiper-lazy">
                    <!-- Preloader image -->
                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </Slide>
                <Slide class="slide black">
                    <!-- Required swiper-lazy class and image source specified in data-src attribute -->
                    <img data-src="http://lorempixel.com/1600/1200/nature/5" class="swiper-lazy">
                    <!-- Preloader image -->
                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </Slide>
            </Slides>

            <h5>Scroll Container</h5>
            <Slides class="scroll-swiper"
                    scrollbar=".swiper-scrollbar"
                    direction="vertical"
                    slidesPerView="auto"
                    :freeMode="true">
                <!-- 幻灯内容 -->
                <Slide class="scroll-slide">
                    <h2>Scroll Content</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, excepturi, obcaecati! Accusantium adipisci blanditiis ducimus eos esse excepturi facere, fugit ipsam laborum nobis odit recusandae, rerum ut vel, vitae voluptatum.</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, excepturi, obcaecati! Accusantium adipisci blanditiis ducimus eos esse excepturi facere, fugit ipsam laborum nobis odit recusandae, rerum ut vel, vitae voluptatum.</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, excepturi, obcaecati! Accusantium adipisci blanditiis ducimus eos esse excepturi facere, fugit ipsam laborum nobis odit recusandae, rerum ut vel, vitae voluptatum.</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, excepturi, obcaecati! Accusantium adipisci blanditiis ducimus eos esse excepturi facere, fugit ipsam laborum nobis odit recusandae, rerum ut vel, vitae voluptatum.</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, excepturi, obcaecati! Accusantium adipisci blanditiis ducimus eos esse excepturi facere, fugit ipsam laborum nobis odit recusandae, rerum ut vel, vitae voluptatum.</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, excepturi, obcaecati! Accusantium adipisci blanditiis ducimus eos esse excepturi facere, fugit ipsam laborum nobis odit recusandae, rerum ut vel, vitae voluptatum.</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, excepturi, obcaecati! Accusantium adipisci blanditiis ducimus eos esse excepturi facere, fugit ipsam laborum nobis odit recusandae, rerum ut vel, vitae voluptatum.</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad consequatur deserunt dolore doloremque ducimus eaque eos error facilis iure minima necessitatibus neque, porro praesentium provident quas quibusdam suscipit, voluptates!</p>
                </Slide>
            </Slides>

            <h5>Responsive Breakpoints</h5>
            <p>Error on slidesPerView and spaceBetween</p>
            <!--<Slides class="swiper"-->
            <!--pagination=".swiper-pagination"-->
            <!--:paginationClickable="true"-->
            <!--:slidesPerView="5"-->
            <!--:spaceBetween="50"-->
            <!--:breakpoints="breakpoints">-->
            <!--&lt;!&ndash; 幻灯内容 &ndash;&gt;-->
            <!--<Slide class="slide"><span>Slide 1</span></Slide>-->
            <!--<Slide class="slide"><span>Slide 2</span></Slide>-->
            <!--<Slide class="slide"><span>Slide 3</span></Slide>-->
            <!--<Slide class="slide"><span>Slide 4</span></Slide>-->
            <!--<Slide class="slide"><span>Slide 5</span></Slide>-->
            <!--<Slide class="slide"><span>Slide 6</span></Slide>-->
            <!--<Slide class="slide"><span>Slide 7</span></Slide>-->
            <!--<Slide class="slide"><span>Slide 8</span></Slide>-->
            <!--<Slide class="slide"><span>Slide 9</span></Slide>-->
            <!--<Slide class="slide"><span>Slide 10</span></Slide>-->
            <!--</Slides>-->

            <h5>Zoom</h5>
            <Slides class="swiper"
                    :zoom="true">
                <!-- 幻灯内容 -->
                <Slide class="slide">
                    <img src="../../static/img/scenery_1.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_2.jpg">
                </Slide>
                <Slide class="slide">
                    <img src="../../static/img/scenery_3.jpg">
                </Slide>
            </Slides>

        </Content>
    </Page>
</template>

<style scoped lang="less">
    .swiper {
        width: 100%;
        min-width: 285px;
        height: 190px;
        margin: 20px auto;
        .slide {
            text-align: center;
            font-size: 18px;
            background: #fff;

            /* Center slide text vertically */
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
        }
        .black {
            background: #000;
        }
    }

    .scroll-swiper {
        width: 100%;
        height: 300px;
        background: #fff;
        .scroll-slide {
            /*font-size: 12px;*/
            height: auto;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding: 20px;
        }
    }


</style>
<style lang="less">
    .slidesPage .swiper-container {
        outline: 1px solid #ddd;
    }

    .async {
        background: #fff;
    }

    .customizedPagination {
        .swiper-pagination-bullet {
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            color: #000;
            opacity: 1;
            background: rgba(0, 0, 0, 0.2);
        }
        .swiper-pagination-bullet-active {
            color: #fff;
            background: #007aff;
        }
    }

    .parallax {
        height: 400px !important;
        color: #fff;
        .parallax-bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 130%;
            height: 100%;
            background: url(../../static/img/scenery_3.jpg) no-repeat center center/cover
        }
        .swiper-slide {
            background: transparent !important;
            flex-direction: column;
            display: flex;
        }
        .swiper-slide .title {
            font-size: 41px;
            font-weight: 300;
        }
        .swiper-slide .subtitle {
            font-size: 21px;
        }
        .swiper-slide .text {
            font-size: 14px;
            max-width: 400px;
            line-height: 1.3;
        }
    }

    .cubeEffect {

    }

    .flipEffect.swiper {
        width: 250px !important;
        /*height: 250px !important;*/
        padding: 40px !important;
        .slide {
            background-position: center;
            background-size: cover;
        }

        .swiper-wrapper {
            /*transform: translate3d(0px, 0, 0) !important;*/
        }
    }

    .coverflow {
        .slide {
            width: 50% !important;
            background: transparent !important;
            .slide-zoom {
                height: 100%;
                img {
                    height: 100%;
                    width: auto;
                }
            }
        }
    }

    .grabCusor {

        .slide:nth-child(2n) {
            width: 250px !important;
        }
        .slide:nth-child(3n) {
            width: 100px !important;
        }

    }

</style>
<script type="text/javascript">
  import scenery1 from '../../static/img/scenery_1.jpg'
  import scenery2 from '../../static/img/scenery_2.jpg'
  import scenery3 from '../../static/img/scenery_3.jpg'

  export default {
    name: 'name',
    data () {
      return {
        asyncIimageList: [],
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        paginationBulletRender: function (swiper, index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>'
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        },
        dynamicData: [
          'Slide 1',
          'Slide 2',
          'Slide 3'
        ]
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiperA
      },
      dynamicSlidesComponent () {
        return this.$refs.dynamicSlides.swiper
      },
      defaultSwiperComponent () {
        return this.$refs.defaultSwiper
      }
    },
    methods: {
      onTransitionEndHandler (swiper) {
        console.log('onTransitionEndHandler swiper instance:')
        console.log(swiper)
      },

      loadAsyncImg () {
        this.asyncIimageList = [scenery1, scenery2, scenery3]
      },
      // dynamic Slides
      addSlide () {
        let item = 'Slide ' + (this.dynamicData.length + 1)
        this.dynamicData.push(item)
        // 更新组件
        this.$nextTick(() => {
          this.dynamicSlidesComponent.update()
        })
      },
      removeSlide () {
        this.dynamicData.pop()
        this.$nextTick(() => {
          this.dynamicSlidesComponent.update(true)
        })
      },

      onInit (ins) {
//        console.debug('Swiper实例: ')
//        console.debug(ins)
      }
    },
    created () {},
    mounted () {},
    activated () {}
  }
</script>
