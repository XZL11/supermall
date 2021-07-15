<template>
  <div id="app">
<!--    kepp-alive的作用是当页面切换的时候，保留原页面不被销毁-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/mainTabbar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  /* 导入css */
  @import "assets/css/base.css";
</style>
