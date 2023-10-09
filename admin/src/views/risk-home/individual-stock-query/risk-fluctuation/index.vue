<template>
  <div class="rish-fluctuation-page">
    <div>
      <breadcrumb-bar title="风险波动概览"></breadcrumb-bar>
    </div>
    <div class="risk-container show-flex-box-c card scroll-y">
      <!-- 股份信息 -->
      <div class="short-crash-header">
        <div>
          {{ curStockInfo.name || '' }}
          <span>（{{ stockBasicInfo.stockCode || ''}}）</span>
        </div>
        <div class="pt-12">
          <share-header :show-list="stockBasicInfo" />
        </div>
        <div class="pt-16">
          <share-news :showDatum="stockPickerInfo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadcrumbBar from "../components/breadcrumb-bar.vue";
import ShareHeader from "../components/share-header.vue";
import ShareNews from "../components/share-news.vue";

import { summaryData, curStockInfo } from "./data";
export default {
  name: "risk-fluctuation",
  components: {
    BreadcrumbBar,
    ShareHeader,
    ShareNews
  },
  data() {
    return {
      stockBasicInfo: {},
      stockPickerInfo: {},
      curStockInfo
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
        // this.setShowContent();
        this.reqOverviewBasic();
    },
    reqOverviewBasic() {
      this.stockPickerInfo = summaryData;
      this.stockBasicInfo = summaryData.stockBasicInfo || {};
      console.log(summaryData)
    },
    setShowContent() {
      this.curStockInfo = this.$store.getters.CurWatchStock;
    }
  }
};
</script>

<style>
</style>