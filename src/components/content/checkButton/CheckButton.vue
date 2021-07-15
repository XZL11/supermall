<template>
  <div class="check-button" :class="{check: isCheked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButtom",
    props: {
      isCheked: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #a3a3a5;
  }

  .check {
    border-color: red;
    background-color: red;
  }
</style>
