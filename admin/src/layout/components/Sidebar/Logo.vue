<template>
  <div class="sidebar-logo-container">
    <span><img src="@/assets/logo.png" /></span>
  </div>
</template>

<script>

export default {
  name: "SidebarLogo",
  components: {
    
  },
  props: {},
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  &>span {
    display: block;
    width: 65%;
    &>img  {
      display: block;
      width: 100%;
    }
  }
}
</style>
