<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      console.log(this.$route)
      return this.$route.path;
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /* min-height: calc(100vh - 50px); */
  height: calc(100vh - 80px);
  /* height: 100vh; */
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #F8F9FB;
}
.fixed-header+.app-main {
  padding-top: 80px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
