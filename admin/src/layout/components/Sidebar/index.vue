<template>
  <div :class="{ 'slide-item-box': true, 'has-logo': showLogo }">
    <!-- 原始 start -->
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <!-- <div :class="{'h100': true, 'border-box w100 pl-24 pr-24': !isCollapse}"> -->
    <!-- 原始 end -->
    <div :class="{ 'h100 border-box w100': true }">
      <el-scrollbar wrap-class="scrollbar-wrapper pt-24 pl-24 pr-24">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item
            classType="parent"
            v-for="route in permissionRoutes"
            :key="route.path + Math.random()"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      // return !this.sidebar.opened
      return false;
    },
    activeMenuName() {
      return this.$store.state.settings.activeMenuName;
    },
  },
  mounted() {
  },
  inject: ["isRouterAlive"],
  data() {
    return {
      permissionRoutes: [],
    };
  },
  watch: {
    permission_routes: {
      handler(newName, oldName) {
        this.checkIsNeedHidden();
      },
      deep: true,
    },
    $route(to, from) {
      this.checkIsNeedHidden();
    },
    isRouterAlive: {
      handler(value) {
        this.checkIsNeedHidden();
      },
      immediate: true,
      deep: true,
    },
    activeMenuName() {
      this.checkIsNeedHidden();
    },
  },
  methods: {
    checkIsNeedHidden() {
      // const curRouteName = this.$route.name || '/';
      let list = this.permission_routes;
      let routeList = [];

      list.forEach((item) => {
        if (item.hasOwnProperty("header")) {
          routeList.push(...item.children);
          // if (item.name == this.activeMenuName) {
          //   routeList.push(...item.children);
          // }
        } else {
          routeList.push(item);
        }
      });

      this.permissionRoutes = routeList;
    },
    getItemRoute(route) {},
  },
};
</script>
