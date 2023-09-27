<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
      isRouterAlive: this.isRouterAlive,
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;

      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  },

}
</script>
<style>
.el-tooltip__popper {
  max-width: 500px !important;
}
</style>
