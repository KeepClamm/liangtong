<template>
  <div class="header-menu-wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in routerList" 
                   :key="index"
                   :label="item.title" 
                   :name="item.name">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: "HeaderMenu",
  components: {
    
  },
  props: {},
  data() {
    return {
      activeName: '',
      routerList: [
        {name: 'home',title: '风险首页'},
        {name: 'management',title: '持仓管理'},
        {name: 'control',title: '舆情监控'},
        {name: 'auth',title: '权限管理'},
      ]
    };
  },
  methods: {
    handleClick() {

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
