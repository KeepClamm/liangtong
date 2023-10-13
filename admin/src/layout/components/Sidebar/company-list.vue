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
      activeName: '',
      companyList: [
        {name: '万科A000002.SZ',code: '1'},
        {name: '紫光国微002049.SZ',code: '2'},
        {name: '国华网安000004.SZ',code: '3'},
        // {name: 'ST星源000005.SZ',code: 4},
        // {name: '深振业A000006.SZ',code: 5},
        // {name: '*ST全新000007.SZ',code: 6},
        // {name: '神州高铁000008.SZ',code: 7},
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
          display: none!important;
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
