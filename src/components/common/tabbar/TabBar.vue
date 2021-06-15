<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name:'TabBar',
  }
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color: hsl(0, 0%, 96%);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0 -1px 1px rgba(100,100,200,.2);
  }

</style>