<template>
  <div class="company-list-wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item) in companyList" 
                   :key="item.code"
                   :label="item.name" 
                   :name="item.code">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: "CompanyList",
  components: {
    
  },
  props: {},
  data() {
    return {
      companyList: [
        {name: '电*源0******Z',code: 1},
        {name: '中**业0******Z',code: 2},
        {name: '多*多0******Z',code: 3},
        // {name: '小明*测试',code: 4},
        // {name: '小明*测试',code: 5},
        // {name: '小明*测试',code: 6},
        // {name: '小明*测试',code: 7},
      ],
    };
  },
  computed: {
    
  },
  watch: {
    $route(to,from){
      
    },
  },
  mounted() {

  },
  methods: {
    handleClick() {

    }
  }
};
</script>

<style lang="scss">
  .company-list-wrap {
    height: 100%;
    .el-tabs {
      height: 100%;
      .el-tabs__header {
        margin: 0;
      }
      .el-tabs__nav-wrap::after {
        display: none;
      }
      .el-tabs__nav-prev,
      .el-tabs__nav-next {
        display: flex;
        align-items: center;
        height: 100%;
        transition: all 0.3s ease;
        color: #1065A0;
        &:hover {
          color: #000;
          transform: scale(1.2);
        }
      }
      .el-tabs__nav {
        display: flex;
        .el-tabs__item {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          padding: 0 10px;
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
