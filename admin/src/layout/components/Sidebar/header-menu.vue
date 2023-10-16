<template>
  <div class="header-menu-wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item) in menuList" 
                   :key="item.name"
                   :label="item.meta.title" 
                   :name="item.name">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "HeaderMenu",
  components: {
    
  },
  props: {},
  data() {
    return {
      activeName: '',
      menuRouterMap: {},
      toRouter: null,
      menuList: [],
    };
  },
  computed: {
    ...mapGetters([
      'permission_routes',
    ]),
    activeMenuName() {
      return this.$store.state.settings.activeMenuName;
    },
  },
  mounted() {
    this.setMenuList();
    this.setMenuActiveByRoute(this.$route);
  },
  methods: {
    handleClick() {
      this.jumpPageByActiveName();
    },
    jumpPageByActiveName() {
      this.setCurrentActiveMenuName(this.activeName);
      this.$router.push({
        name: this.activeName
      })
    },
    setMenuActiveByRoute(to) {
      const toPath = to.path;
      const routeMap = this.menuRouterMap;
      let routeName = '';

      for(let key in routeMap) {
        if (routeMap.hasOwnProperty(key)) {
          let routeData = routeMap[key];

          if (toPath.indexOf(routeData.path) >= 0) {
            routeName = routeData.name;
            break;
          }
        }
      }
      this.setCurrentActiveMenuName(routeName);
    },
    getRouterPushPath(routerData,path) {
      let routerPath = path;

      if (routerData.children && routerData.children.length > 0) {
        return this.getRouterPushPath(routerData.children[0],routerData.path);
      } else {
        routerPath = routerData.path;
      }

      return routerPath;
    },
    setCurrentActiveMenuName(name) {
      this.activeName = name;
      this.$store.dispatch('settings/setActiveMenuName', name);
    },
    setMenuList() {
      let list = this.permission_routes;
      let menuList = [];

      list.forEach(item => {
        if (item.hasOwnProperty('header') && item.header) {
          let routerName = item.name;

          menuList.push(item);

          this.menuRouterMap[routerName] = item;
        }
      });

      this.menuList = menuList;
    }
  }
};
</script>

<style lang="scss">
  .header-menu-wrap {
    height: 100%;
    .el-tabs {
      height: 100%;
      .el-tabs__header {
        margin: 0;
      }
      .el-tabs__nav-wrap::after {
        display: none;
      }
      .el-tabs__nav {
        display: flex;
        .el-tabs__item {
          display: flex;
          align-items: center;
          font-size: $topMenuFontSize;
          font-weight: bold;
          &:hover {
            color: #1065A0;
          }
          &.is-active {
            color: #1065A0;
          }
        }
        .el-tabs__active-bar {
          height: 3px;
          background-color: #1065A0;
        }
      }
    }
    .el-tabs,
    .el-tabs__header,
    .el-tabs__nav-wrap,
    .el-tabs__nav-scroll,
    .el-tabs__nav,
    .el-tabs__item {
      height: 100%;
    }
  }
</style>
