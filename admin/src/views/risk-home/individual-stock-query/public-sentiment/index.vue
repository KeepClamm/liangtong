<template>
  <div class="public-sentiment h100 show-flex-box-c">
    <breadcrumb-bar title="个股舆情预警"></breadcrumb-bar>
    <div class="container">
      <!-- 股票信息 -->
      <div class="short-crash-header card">
        <div>
          {{ curStockInfo.name || '' }}
          <span>（{{ stockBasicInfo.stockCode || ''}}）</span>
        </div>
        <share-header :show-list="stockBasicInfo" class="pt-12" />
      </div>

      <!-- 舆情股价走势图 -->
      <stockPriceEchart ref="stockPriceEchartRef" class="mb-30" />

      <!-- 负面预警&个股预警信号 -->
      <negative-warning-and-warning-sign ref="negativeWarningEchartRef" />
    </div>
  </div>
</template>

<script>
import breadcrumbBar from '../components/breadcrumb-bar';
import shareHeader from '../components/share-header';
import stockPriceEchart from './components/stock-price-echart';
import negativeWarningAndWarningSign from './components/negative-warning-and-warning-sign';
import CommonUtils from '@/utils/commonUtils';
import { BASIC_INFO } from "./mock";
export default {
  name: 'public-sentiment',
  components: {
    breadcrumbBar,
    shareHeader,
    stockPriceEchart,
    negativeWarningAndWarningSign
  },
  data() {
    return {
      stockBasicInfo: {},
      curStockInfo: {
        id: "000001.SZ",
        name: "平安银行"
      }
      
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.reqBasicInfo();
    },
    reqBasicInfo(){
      let params = {
        stockCode: this.curStockInfo.id,
      };

      const data = BASIC_INFO;

      this.stockBasicInfo = data.stockBasicInfo;
      this.dealStockPriceEchartInfo(data.publicOpinionAndStockPriceTrend);
      this.dealNegativeWarningEchartInfo(data.negativeAndWarningSignal);
    },

    dealStockPriceEchartInfo(info){
      let result = {
        xAxis: info.xaxis || [],
        shortLevelLineSeries: info.series[0].data || [],
        longLevelLineSeries: info.series[1].data || [],
        sharePriceLineSeries: info.series[2].data || [],
        redLineList: this.dealLineListData(info.series[3].data || []),
        yellowLineList: this.dealLineListData(info.series[4].data || []),
      };

      this.$refs.stockPriceEchartRef.drawEcharts(result);
    },
    dealNegativeWarningEchartInfo(info){
      let result = {
        xAxis: info.xaxis || [],
        series: this.getNegativeWarningEchartSeries(info.series || []),
        dataList: this.getDataList(info.xaxis || [], info.series || []),
      };

      this.$refs.negativeWarningEchartRef.drawBarEcharts(result);
    },
    getNegativeWarningEchartSeries(series){
      let result = [];
      const map = {
        '1': 2, // 高关注度
        '2': 1, // 中关注度
        '3': 0, // 低关注度
      };
      // TODO 气泡图处理数据
      for (let i = 0; i < series.length; i++) {
        const item = series[i];
        if (item.type && item.data && item.data.length > 0) {
          const lowArr = item.data.filter(item => item.importantInfo == '一般关注');
          const midArr = item.data.filter(item => item.importantInfo == '中度关注');
          const larArr = item.data.filter(item => item.importantInfo == '高度关注');
          result.push([i, 1, item.data.length, map[item.type], lowArr.length, midArr.length, larArr.length]);
        }
      }

      return result;
    },
    getDataList(xAxis, series){
      let list = [];

      series.forEach((item, index) => {
        list.push({
          date: xAxis[index],
          list: this.dealListItem(item.data || [])
        })
      });

      return list;
    },
    dealListItem(list){
      const map = {
        '低度关注': '1',
        '中度关注': '2',
        '高度关注': '3',
      };

      return list.map(item => {
        let obj = { ...item };
        obj.newsTime = CommonUtils.formateDate(obj.newsTime, 'YYYY-MM-DD');
        obj.text = obj.newsTitle;
        obj.canClick = true;
        obj.type = map[obj.importantInfo];
        return obj;
      });
    },
    dealLineListData(list){
      return list.map(item => {
        return item && item.length > 0 ? item : null;
      });
    },
  }
}
</script>

<style>
@import "~@/styles/show-ui/common_risk_style.scss";
</style>