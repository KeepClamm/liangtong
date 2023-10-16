<template>
  <div :class="classObj" class="app-wrapper">
    <div class="header">
      <navbar />
    </div>
    <div v-if="!sidebarHidden" class="slidebar">
      <sidebar class="sidebar-container" />
    </div>
    <div :class="{'main-content':true, 'full-main-content': sidebarHidden}">
      <app-main />
    </div>

    <!-- 原始 start -->
    <!-- <sidebar class="sidebar-container" />

    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>

      <app-main />
    </div> -->
    <!-- 原始 end -->
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
// import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  data() {
    return {
      sidebarHidden: false,
    }
  },
  // mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        this.setLayoutRenderType();
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted() {
    this.setLayoutRenderType();
  },
  methods: {
    // handleClickOutside() {
    //   this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    // }
    setLayoutRenderType() {
      const routeData = this.$route;
      const slidebarHidden = routeData.meta ? routeData.meta.sidebarHidden : false;
      
      this.sidebarHidden = slidebarHidden;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }

    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 3;
      height: $headerHeight;
      background: #f00;
    }
    .slidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: $sliderWidth;
      height: 100%;
      padding-top: $headerHeight;
      box-sizing: border-box;
      z-index: 2;
    }
    .main-content {
      padding-top: $headerHeight;
      padding-left: $sliderWidth;
      min-height: 100%;
      &.full-main-content {
        padding-left: 0;
      }
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 80px);
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
