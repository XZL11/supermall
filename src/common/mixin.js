import {debounce} from 'common/utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newrefresh: null
    }
  },
  mounted() {
    // 防抖
    // const newrefresh = debounce(this.$refs.scroll.refresh, 300)
    this.newrefresh = debounce(this.$refs.scroll.refresh, 300)

    // 这下面的闭包函数不会引起上面refresh的多次赋值
   this.itemImgListener = () => {
      newrefresh()  //调用上面的newrefresh
    }
    //  3.监听item中图片加载完成
    //  事件总线 ——监听、接收发送出来的信息
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('我是混入的内容');
  }
}
