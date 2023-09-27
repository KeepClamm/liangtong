<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <animate-logo :collapse="collapse" ref="animateLogoRef" />
  </div>
</template>

<script>
import animateLogo from '@/components/show-ui/logo/animate-logo';

export default {
  name: "SidebarLogo",
  components: {
    animateLogo
  },
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 110px;
  background: #FFF;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding-bottom: 30px;
}
</style>
