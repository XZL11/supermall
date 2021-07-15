<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {itemListenerMixin} from "../../common/mixin";
  import {debounce} from "../../common/utils";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
    },

    // 混入
    mixins: [itemListenerMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
      //  联动效果
        themeTopY: [],
        getThemeTopY: null
      }
    },
    created() {
      // 1.保存获取iid
      this.iid = this.$route.params.iid;

    //  2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        // console.log(res);
        const data = res.result;
        this.topImages = res.result.itemInfo.topImages;

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取评论信息
        if (data.rate.list[0] !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })

      // 4.给gitThemeTopY赋值（对给this.themeTopY赋值的操作进行防抖）
      this.getThemeTopY = debounce(() => {
        this.themeTopY = []   //防止一开始还未加载完
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.param.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopY);
      },100)
    },
    mounted() {

    },
    methods: {
      imageLoad() {

        // 本质上这里等同于
        // const refresh = debounce(this.$refs.scroll.refresh, 300)
        // refresh()
        //这样的话refresh就会被多次赋值，增加没必要的重复,达不到防抖的效果
        //为此事先给refresh赋值，但由于多处用到refresh，所以可以用混入

        // 所以这里就可以直接
        this.newrefresh()
        // this.$refs.scroll.refresh()    会被执行多次


        // 联动效果
        this.getThemeTopY()
      },
      titleClick(index) {
        console.log('index的值：', index)
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;    /* 保证元素一直显示在最上面，要搭配定位使用 */
    background-color: rgba(233, 233, 233, 0.85);
    height: 100vh;   /* 视窗高度——始终保持高度与屏幕一致 */
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  /*scroll 必须要有高度*/
  .content {
    height: 300px;
  }


</style>

