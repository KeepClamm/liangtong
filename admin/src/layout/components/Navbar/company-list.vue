<template>
  <div class="company-list-wrap">
    <el-tabs
      closable
      :value="activeStock.stockCode"
      @tab-remove="removeTab"
      @tab-click="handleStockClick"
    >
      <el-tab-pane v-for="(item) in stockList" 
                   :key="item.stockCode"
                   :label="item.stockName" 
                   :name="item.stockCode">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { jumpStockDetail } from '@/utils';

export default {
  name: "CompanyList",
  data() {
    return {
      activeStockCode: '',
      saveCount: 10
    };
  },
  computed: {
    ...mapGetters([
      'stockList',
      'activeStock'
    ])
  },
  watch: {
    $route(to,from){
      this.setActiveStockByRoute(to);
    },
  },
  mounted() {
  },
  methods: {
    handleStockClick(data) {
      const stockInfo = this.stockList.find(item => item.stockCode == data.name);
      jumpStockDetail(stockInfo.stockName, stockInfo.stockCode);
    },
    removeTab(code) {
      console.log('code', code)
      const hasStock = this.$store.dispatch('stock/removeStock', code);
      !hasStock && this.$router.go(-1);
    },
    setActiveStockByRoute() {
      if (this.$route.path.indexOf('client-detail') == -1) {
        this.$store.dispatch('stock/setActiveStock', {});
      } else if (!this.activeStock?.stockName) {
        console.log('set standby stock')
        this.$store.dispatch('stock/setStandByStock');
      }
    }
  }
};
</script>

<style lang="scss">
  .company-list-wrap {
    height: 100%;
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 4px;
      height: 20px;
      border-radius: 20px;
      transform: translateY(-50%);
      background: #1065A0;
    }
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
          font-size: 12px;
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
