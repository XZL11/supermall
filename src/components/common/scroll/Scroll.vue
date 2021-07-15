<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
    //  1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,     // 使得组件里面的点击事件可以正常发生
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      })

    //  2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',(position) => {
          this.$emit('scroll',position)
        })
      };

    //  3.监听滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp' , () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time=500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        console.log('refresh调用次数');
        this.scroll && this.scroll.refresh()      //重新统计滚动画面的长度
      },
      getScrollY(){
        this.scroll.y
      }
    }
  }
</script>

<style scoped>

</style>
