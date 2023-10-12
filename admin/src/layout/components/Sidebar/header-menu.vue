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
  watch: {
    permission_routes: {
      handler(newName, oldName) {
        // this.setMenuList();
      },
      deep: true
    },
    $route(to,from){
      this.toRouter = to;
      console.log("---获取的路由信息---",to);
    },
  },
  mounted() {
    this.setMenuList();
  },
  methods: {
    handleClick(menuData) {
      this.setCurrentActiveMenuName(menuData.name);
      this.jumpPageByActiveName();
    },
    jumpPageByActiveName() {
      const routerData = this.menuRouterMap[this.activeName];
      const path = this.getRouterPushPath(routerData);
      
      console.log(this.toRouter);
      console.log(path);

      this.$router.push({
        path: path
      })
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
      this.$store.dispatch('settings/setActiveMenuName',name);
    },
    setMenuList() {
      let list = this.permission_routes;
      let menuList = [];

      list.forEach(item => {
        if (item.hasOwnProperty('header') && item.header) {
          let routerName = item.name;

          menuList.push(item);

          this.menuRouterMap[routerName] = item;
          this.activeName = this.activeMenuName || routerName;
        }
      });
      console.log("---路由信息----");
      console.log(this.menuRouterMap)
      this.menuList = menuList;
      this.setCurrentActiveMenuName(this.activeName);
      this.jumpPageByActiveName();
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
          font-size: 18px;
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
