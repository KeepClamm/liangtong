<template>
  <div class="risk-indicator-page h100 show-flex-box-c">
    <breadcrumb-bar title="风险指标详情"></breadcrumb-bar>

    <div class="container">
      <!-- 股票信息 -->
      <div class="short-crash-header card">
        <div>
          {{ curStockInfo.name || '' }}
          <span>（{{ stockBasicInfo.stockCode || ''}}）</span>
        </div>
        <share-header :show-list="stockBasicInfo" class="pt-12" />
      </div>

      <!-- 长期 / 短期 切换栏 -->
      <div class="check-tab-bar mt-30">
        <checkTabBar :tabList="tabList" @switchTab="switchTab" />
      </div>

      <!-- 指标行业偏离度 -->
      <div v-show="type !== 4" class="short-risk-overview card">
        <header class="header show-flex-box-r align-center">
          <span class="fg-1">指标行业偏离度</span>
        </header>
        <el-collapse-transition>
          <div class="pt-24">
            <div class="w100 height420">
              <industryDeviationDegreeEcharts :type="type" />
            </div>
          </div>
        </el-collapse-transition>
      </div>

      <!-- 短期暴跌预警模型详情 -->
      
      <crash-warning-model
        v-show="type == 1 || type == 2"
        :header-title="`${type == 1 ? '短期' : '长期'}暴跌预警模型详情`"
        :type="type"
        ref="tableListDataShortCrashRef"
        :basic-information="stockBasicInfo"
        @change-show="changeShowRiskItem"
      />
      <finance-warning
        v-show="type == 3"
        header-title="财务类退市预警模型详情"
        :basic-information="{}"
      ></finance-warning>
      <trade-warning
        v-show="type == 4"
        header-title="交易类退市预警模型详情"
        :basic-information="{}"
      ></trade-warning>
    </div>
  </div>
</template>

<script>
import BreadcrumbBar from "../components/breadcrumb-bar.vue";
import ShareHeader from "../components/share-header.vue";
import checkTabBar from "../components/check-tab-bar.vue";
import TradeWarning from "./components/trade-warning.vue";
import FinanceWarning from "./components/finance-warning.vue";
import CrashWarningModel from "./components/crash-warning-model.vue";
import industryDeviationDegreeEcharts from "./components/industry-deviation-degree-echart";

import { summaryData } from "../risk-fluctuation/data";
import { TABLE_DATA } from "./mock";
export default {
  name: "risk-indicator",
  components: {
    BreadcrumbBar,
    ShareHeader,
    checkTabBar,
    TradeWarning,
    FinanceWarning,
    CrashWarningModel,
    industryDeviationDegreeEcharts,
  },
  data() {
    return {
      type: 1, // 1-短期 2-长期
      stockBasicInfo: {},
      viewOnlyRiskItem: true, //默认展开
      curStockInfo: {
        id: "000001.SZ",
        name: "平安银行"
      }
    };
  },
  computed: {
    tabList() {
      const list = [
        { type: 'short', title: '短期', val: 1 },
        { type: 'finance', title: '财务类退市预警', val: 3 },
        { type: 'trade', title: '交易类退市预警', val: 4 },
      ]
      const codeArr =
        this.stockBasicInfo.stockCode &&
        this.stockBasicInfo.stockCode.split(".");

      if (codeArr && codeArr[codeArr.length - 1] != "BJ") {
        list.splice(1, 0, { type: 'long', title: '长期', val: 2 });
      }

      return list;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.reqOverviewBasic();
      this.reqRiskIndicatorStpwmDetail();
    },
    reqOverviewBasic() {
      this.stockPickerInfo = summaryData;
      this.stockBasicInfo = summaryData.stockBasicInfo || {};
    },
    reqRiskIndicatorStpwmDetail(){
      let params = {
        stockCode: this.curStockInfo.id,
        type: this.type
      };

      if (this.viewOnlyRiskItem) {
        params.onlySeeRisk = 1;
      }

      const allPath = this.getAllPath(TABLE_DATA);
      const allTileList = this.getAllTileList(allPath);

      const info = {
        total: allTileList.length,
        items: allTileList,
      };
      console.log(info)
      this.$refs.tableListDataShortCrashRef.setData(info);
    },
    getAllPath(tree) {
      const paths = [];

      for (let i = 0; i < tree.length; i++) {
        if (tree[i].list && tree[i].list.length > 0) {
          const res = this.getAllPath(tree[i].list); //如果有子节点便继续深入，直到到达叶子节点
          for (let j = 0; j < res.length; j++) {
            paths.push([tree[i], ...res[j]]); //子节点返回后将其返回的路径与自身拼接
          }
        } else {
          paths.push([tree[i]]);
        }
      }

      return paths;
    },
    getAllTileList(list){
      let result = [];
      const fontColorMap = {
        '0': 'common',
        '1': 'light',
        '2': 'dark',
      };

      list.forEach((item, index) => {
        result.push({
          FirstIndex: item[0].name || '',
          FirstCode: item[0].code || '',
          FirstLevel: item[0].level || '',

          SecondIndex: item[1]?.name || '',
          SecondCode: item[1]?.code || '',
          SecondLevel: item[1]?.level || '',

          ThirdIndex: item[2]?.name || '',
          ThirdCode: item[2]?.code || '',
          ThirdLevel: item[2]?.level || '',

          indexData: item[2]?.dataNumber || 0,
          indexScore: item[2]?.score || 0,
          indexRanking: item[2] ? `${item[2].ranking || 0}/${item[2].brokerTotalNumber || 0}` : '',
          averageIndexScore: item[2]?.averageScore || 0,
          
          scoreStatistics: {
            xAxis: item[2]?.scoreAnalysis?.xaxis || [],
            series: item[2]?.scoreAnalysis?.series || [],
            mainPoint: {
              xAxis: item[2]?.currentScoreLinePointXAxis || 0,
              yAxis: item[2]?.currentScoreLinePointYAxis || 0,
            },
          },
          mainDistribution: {
            xAxis: item[2]?.subjectDistributionAnalysis?.xaxis || [],
            series: item[2]?.subjectDistributionAnalysis?.series || [],
            mainPillar: {
              xAxis: item[2]?.currentScoreBarPointXAxis || 0,
              yAxis: item[2]?.currentScoreBarPointYAxis || 0,
            },
          },

          fontColor: fontColorMap[item[2]?.isRisk] || 'common',
          chartIndex: index,

          ThirdData: item[2] || {}, // ...item[2]
        });
      });

      return result;
    },
    switchTab(info) {
      this.type = info.type;
    },
    changeShowRiskItem(status){
      this.viewOnlyRiskItem = status;
      this.reqRiskIndicatorStpwmDetail();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/show-ui/common_risk_style.scss";
</style>