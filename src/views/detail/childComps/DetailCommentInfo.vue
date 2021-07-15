<template>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" alt="">
        </div>
      </div>
    </div>
</template>

<script>
  import {formatDate} from "../../../common/utils"

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showDate(value) {
        // 1.将时间戳转成Date对象
        const date = new Date(value * 1000)

        // 2.将date进行格式化
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }

</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    border-bottom: 5px solid #f2f5f8;
    background-color: #ffffff;
    color: #333333;
  }

  .info-header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .info-user {
    padding: 6px 0 6px 0;
  }

  .info-user img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    left: 6px;
  }

  .info-detail {
    padding-bottom: 8px;
    font-size: 14px;
    color: #666666;
    line-height: 1.5;
  }

  .info-other {
    padding: 6px 0 6px 0;
    font-size: 10px;
    color: #666666;
  }

  .date {
    padding-right: 8px;
  }

  .info-imgs {
    display: flex;
    height: 60px;
    width: 60px;
  }

  .info-imgs img {
    margin-right: 6px;
    border-radius: 6%;
  }
</style>
