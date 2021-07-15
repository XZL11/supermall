<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button  :is-check="isSelectAll" class="check-button"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate">
      去计算（{{checkLength}}）
    </div>
  </div>
</template>

<script>
  import CheckButtom from "../../../components/content/checkButton/CheckButton";
  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButtom
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item =>  item.checked).length
      },
      isSelectAll() {
        // 判断全选状态
        // 没有的时候默认为不选中
        if (this.cartList.length === 0) return false

        // 1.使用filter
        // return !(this.cartList.filter(item => !item.checked).length)

        // 2.使用find
        // return !this.cartList.find(item => !item.checked)

        // 3.普通遍历
        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eeeeee;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 40px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
  }

  .calculate {
    width: 90px;
    background: red;
    color: #ffffff;
    text-align: center;
  }
</style>
