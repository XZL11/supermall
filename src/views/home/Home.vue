<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行' , '新款' , '精选']"
                 ref="tabControl1"
                 @tabClick="tabClick"
                 class="tab-control"
                 v-show="isTabFixed"
    ></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行' , '新款' , '精选']"
                   ref="tabControl2"
                   @tabClick="tabClick"
      ></tab-control>

      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>   <!-- .native可以使得组件被直接监听 -->
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "network/home";

  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import HomeSwiper from './childComps/HomeSwiper';
  import {itemListenerMixin} from "../../common/mixin";


  export default {
    name:'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    // 混入
    mixins: [itemListenerMixin],
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroy');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },

    created() {
    // 1.请求多个数据
      this.getHomeMultidata()

    //  2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },

    mounted() {
      // // 防抖
      // const refresh = debounce(this.$refs.scroll.refresh, 300)
      //
      // //  3.监听item中图片加载完成
      // //  事件总线 ——监听、接收发送出来的信息
      // this.$bus.$on('itemImageLoad', () => {
      //   refresh()  //调用上面的refresh
      // })

      },
    methods: {
      /**
       *  事件监听相关方法
       */

      // 获取tabControl的offsetTop
      //  所有的组件都有一个属性$el：用于获取组件的元素
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      } ,

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },

      /**
       *  网络请求相关方法
       */

      getHomeMultidata() {
        getHomeMultidata().then(res => {
            console.log(res);
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1

          // 完成加载后结束，为第二次做准备
          this.$refs.scroll.finishPullUp()
        })
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
      //  1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

      //  2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        console.log('更新一次');
        // this.$refs.scroll.refresh()    //作用在于重新统计更新后滚动的长度
      },


    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;    /* 始终保持高度与屏幕一致 */
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    /*在使用浏览器原生滚动时，为的是让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/

  /*  z-index: 9;*/
  /*}*/

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
