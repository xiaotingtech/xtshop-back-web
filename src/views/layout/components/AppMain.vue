<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
    <div class="bottom_slogan">
      <span class="slogan_text">
        XTSHOP
      </span>
     </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
<style>
  .bottom_slogan {
    color: #909399;
    height: 16px;
    line-height: 16px;
    background: none repeat scroll 0 0 rgba(255,255,255,0);;
    bottom: 0;
    right: 0;
    position: fixed;
    width: 5%;
    font-size: 14px;
    text-align: right;
    z-index:999999;
  }
  .slogan_text{
    display: block;
  }
</style>
