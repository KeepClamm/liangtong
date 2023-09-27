<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <!-- <h1 v-else class="sidebar-title">{{ title }}</h1> -->
      </router-link>

      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="longLogo" :src="longLogo" class="sidebar-logo" />
        <!-- <h1 class="sidebar-title">{{ title }}</h1> -->
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: "智慧股票",
      logo: require('@/assets/logo.png'),
      // longLogo: require('@/assets/long-logo.png'),
      longLogo: require('@/assets/header-logo.svg'),
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  // height: 50px;
  // line-height: 50px;
  // height: 156px;
  height: 110px;
  // line-height: 156px;
  background: #FFF;
  // text-align: center;
  overflow: hidden;
  display: flex;
  align-items: center;

  padding-bottom: 30px;

  & .sidebar-logo-link {
    width: 100%;
    // height: 65px;
    box-sizing: border-box;

    & .sidebar-logo {
      display: block;
      margin: 0 auto;
      // width: 56px;
      // height: 56px;
      // vertical-align: middle;
      // margin-right: 24px;
      // border-radius: 8px;
      // width: 165px;
      // height: 65px;
      // margin-left: 30px;
      // display: block;
    }

    & .sidebar-title {
      padding: 0;
      margin: 0;
      display: inline-block;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 30px;
      // line-height: 150%;
      letter-spacing: 2px;
      color: #151D48;
      vertical-align: middle;
    }
  }

  &.collapse {
    text-align: center;
    // height: 70px;
    .sidebar-logo-link{
      height: 56px;
    }

    & .sidebar-logo-link {
      padding-left: 0;
      .sidebar-logo {
        width: 56px;
        height: 56px;
      }
    }
  }
}
</style>
