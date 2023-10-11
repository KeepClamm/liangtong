<template>
  <div class="risk-fluctuation-page h100 show-flex-box-c">
    <breadcrumb-bar title="风险波动概览"></breadcrumb-bar>

    <div class="container">
      <!-- 股票信息 -->
      <div class="short-crash-header card">
        <div>
          {{ curStockInfo.name || '' }}
          <span>（{{ stockBasicInfo.stockCode || ''}}）</span>
        </div>
        <share-header :show-list="stockBasicInfo" class="pt-12" />
        <share-news :showDatum="stockPickerInfo" class="pt-16" />
      </div>
      <!-- 长期 / 短期 切换栏 -->
      <div class="check-tab-bar mt-30">
        <checkTabBar :tabList="tabList" @switchTab="switchTab" />
      </div>
      <!-- 历史行情波动 -->
      <div class="short-risk-overview card w100">
        <header class="header show-flex-box-r align-center">
          <span class="fg-1">历史行情波动</span>
        </header>
        <el-collapse-transition>
          <div class="pt-24">
            <overview
              :units-grade="type"
              :show-datum="historicalVolatilityData"
              :stocks-type="type"
            />
            <header class="header show-flex-box-r align-center pt-40">
              <span class="fg-1 sub-title">{{ type == 1 ? '短期五级分层结果' : '长期五级分层结果' }}&股价走势图</span>
              <div class="posi-re">
                <el-date-picker
                  v-model="monthPrice"
                  type="daterange"
                  value-format="timestamp"
                  size="small"
                  clearable
                  :editable="false"
                  range-separator="⇀"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeDate"
                ></el-date-picker>
                <i class="calender"></i>
              </div>
            </header>
            <div class="w100 mb-24" style="height: 247px">
              <lineMarkerComp
                ref="lineMarkerComp"
                :showType="type"
                @change-show="changeShowLineMarkerEcharts"
              />
            </div>
            <div class="pt-22">
              <div class="show-flex-box-r alent-center">
                <span class="subhead fg-1">实时{{ type == '1' ?'折算率': '质押率'}}</span>
                <div class="posi-re">
                  <el-date-picker
                    v-model="convertFil"
                    type="daterange"
                    value-format="timestamp"
                    size="small"
                    clearable
                    :editable="false"
                    range-separator="⇀"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeConversionRateTime"
                  ></el-date-picker>
                  <i class="calender"></i>
                </div>
              </div>
              <div class="pt-24 show-flex-box-r">
                <div class="coefficient-left">
                  <div class="emphasis">
                    <p>{{ type == '1' ?'折算率': '质押率'}}</p>
                    <div class="pt-12">{{ historicalVolatilityData.lossRate }}</div>
                    <div class="progress-text show-flex-box-r show-flex-sb pt-9 pb-4">
                      <span>0</span>
                      <span>{{ historicalVolatilityData.lossRate }}</span>
                    </div>
                    <el-progress
                      :percentage="coefficientProgress"
                      :show-text="false"
                      color="#012169"
                    ></el-progress>
                  </div>
                  <div class="emphasis mt-20">
                    <p class="show-flex-box-r">
                      暴跌概率
                      <el-popover placement="right" width="173" trigger="hover">
                        <span class="popover-text">未来5个交易日内发生估价大幅下跌的概率</span>
                        <img
                          slot="reference"
                          class="exclamation-circle ml-4"
                          src="@/assets/images/cockpit-risk/exclamation-circle.png"
                        />
                      </el-popover>
                    </p>
                    <div class="pt-12">{{ probabilityDefault }}%</div>
                    <div class="progress-text show-flex-box-r show-flex-sb pt-9 pb-4">
                      <span>0%</span>
                      <span>{{ probabilityDefault }}%</span>
                    </div>
                    <el-progress
                      :percentage="probabilityProgress"
                      :show-text="false"
                      color="#00A3E0"
                    ></el-progress>
                  </div>
                </div>
                <div class="coefficient-right fg-1 ml-24">
                  <lineEchartComp ref="convertibleBond" />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-transition>
      </div>

      <!-- 同业券商两融折算率 -->
      <div class="short-risk-overview mt-30 w100" v-if="type == '1'">
        <header class="header show-flex-box-r align-center">
          <span class="fg-1">同业券商两融折算率</span>
        </header>
        <el-collapse-transition>
          <div class="pt-24 show-flex-box-r">
            <div class="fs-0">
              <header class="subhead">同业券商当前折算率</header>
              <div class="dealer-echar mt-24">
                <barEchartComp ref="barEchartCompRef" />
              </div>
            </div>
            <div class="fg-1 pl-24" style="width: 0px">
              <header class="subhead">近30个交易日同业券商调整情况</header>
              <div class="show-flex-box-c fg-1 mt-24 height288">
                <basic-table
                  :table-data="tableListData"
                  :needScroll="true"
                  :showPagination="false"
                  :prop-list="propConfig"
                  @handle-page="handlePage"
                >
                  <template #Time="{ row }">
                    <span v-if="row.date">{{row.date | dateformat('YYYY-MM-DD') }}</span>
                    <span v-else>--</span>
                  </template>
                </basic-table>
              </div>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import BreadcrumbBar from "../components/breadcrumb-bar.vue";
import ShareHeader from "../components/share-header.vue";
import ShareNews from "../components/share-news.vue";
import checkTabBar from "../components/check-tab-bar.vue";
import overview from "../components/overview.vue";
import CommonUtils from "@/utils/commonUtils";
import BasicTable from "@/components/show-ui/table/basic-table.vue";
import barEchartComp from "@/components/show-ui/echarts/bar-echart-comp.vue";
import lineEchartComp from "@/components/show-ui/echarts/line-echart-comp.vue";
import lineMarkerComp from "@/components/show-ui/echarts/line-marker-comp.vue";

import {
  summaryData,
  curStockInfo,
  historyData,
  shortLine,
  longLine
} from "./data";
export default {
  name: "risk-fluctuation",
  components: {
    BreadcrumbBar,
    ShareHeader,
    ShareNews,
    checkTabBar,
    overview,
    BasicTable,
    barEchartComp,
    lineMarkerComp,
    lineEchartComp
  },
  data() {
    return {
      stockBasicInfo: {},
      stockPickerInfo: {},
      curStockInfo,
      monthPrice: [],
      convertFil: [],
      // 实时折算率
      realConversion: {
        xAxis: [],
        series: []
      },
      // 折算率%
      exchangRate: 0,
      // 违约概率
      probabilityDefault: 0,
      coefficientProgress: 0,
      probabilityProgress: 0,
      historicalVolatilityData: {}, // 历史行情波动
      type: 1, // tab 切换 1 短期 2 长期      
      page: 1,
      limit: 10,
      propConfig: [
        { prop: "brokerageName", label: "券商" },
        { prop: "adjustmentSituation", label: "调整情况" },
        { prop: "rating", label: "类型" },
        { prop: "date", label: "日期",slotName: "Time"},
      ],
      tableListData: {
        total: 0,
        items: [],
      },
    };
  },
  computed: {
    tabList() {
      const list = [
        { type: 'short', title: '短期', val: 1 }
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
      // this.setShowContent();
      this.reqOverviewBasic();
      this.reqConversionRateData();
      this.reqhistoricalStockFluctuations();
      this.reqIndividualStockRiskLayeredTrendChart();
    },
    reqOverviewBasic() {
      this.stockPickerInfo = summaryData;
      this.stockBasicInfo = summaryData.stockBasicInfo || {};
    },
    setShowContent() {
      this.curStockInfo = this.$store.getters.CurWatchStock;
    },
    switchTab(info) {
      this.type = info.type;
      //   this.reqConversionRateData();
      this.reqhistoricalStockFluctuations();
      this.reqIndividualStockRiskLayeredTrendChart();
    },
    // 个股历史行情波动 实时折算率、同行业券商两融折算率
    reqhistoricalStockFluctuations() {
      const params = {
        stockCode: this.curStockInfo.id,
        type: this.type
      };

      let data = historyData; // mock data

      this.historicalVolatilityData = data;

      this.probabilityDefault = this.dealShowPersent(data.plungeProbability);

      this.coefficientProgress = (100 / 70) * (data.lossRate - 0) * 100;
      this.probabilityProgress = (data.plungeProbability - 0) * 100;

      this.dealerData = {
        xAxis:
          (data.sameIndustryBrokerageCurrentConversionRate &&
            data.sameIndustryBrokerageCurrentConversionRate.xaxis) ||
          [],
        series:
          (data.sameIndustryBrokerageCurrentConversionRate &&
            data.sameIndustryBrokerageCurrentConversionRate.series) ||
          []
      };

      // 同行业券商当前折算率
      if (this.type == 1) {
        this.$refs.barEchartCompRef.setOption(this.dealerData, "#00A3E0");
      }
      this.tableListData = {
        total: 0,
        items: data.sameBrokerAdjustSituation
      };
    },
    // 短期五级分层结果&股价走势图
    reqIndividualStockRiskLayeredTrendChart() {
      let params = {
        type: this.type,
        stockCode: this.curStockInfo.id
      };

      if (this.monthPrice && this.monthPrice.length > 0) {
        const time = CommonUtils.getStartAndEndTime(this.monthPrice);
        params.startDate = time[0];
        params.endDate = time[1];
      }

      const data = longLine.data;

      const lineData = {
        xAxis: data.xaxis || [],
        series: {
          one: data.series[0].data || [],
          two: this.getLineData(data.series[1].data)
        }
      };

      this.lineData = lineData;

      this.$refs.lineMarkerComp.setOption(lineData, this.type);
    },
    // 处理 五级分层波动 列表数据
    getLineData(list) {
      let result = [];

      list.forEach(item => {
        result.push({
          value: item.currentRating,
          data: {
            currentRating: item.currentRating, // 6- item.currentRating
            originalRation: item.originalRation, // 6- item.currentRating
            changeState: item.changeState, // 1-增长 0-不变 -1-下降
            cause: item.cause
          }
        });
      });

      return result;
    },
    // 折算率数据
    reqConversionRateData() {
      let params = {
        type: this.type,
        stockCode: this.curStockInfo.id
      };
      if (this.convertFil && this.convertFil.length > 0) {
        const time = CommonUtils.getStartAndEndTime(this.convertFil);
        params.startDate = time[0];
        params.endDate = time[1];
      }
      let data = shortLine;
      this.realConversion = {
        xAxis: data.xaxis || [],
        series: data.series || []
      };
      this.reqPrice();
    },
    // 历史行情波动
    reqPrice() {
      // 实时折算率
      let yAxisCustom = {
        max: 0.7,
        min: 0
      };
      let seriesCustom = {
        color: "#012169",
        name: this.type == "1" ? "折算率" : "质押率"
      };
      this.$refs.convertibleBond.setOption(
        this.realConversion,
        yAxisCustom,
        seriesCustom
      );
    },
    // 折算率筛选时间
    changeConversionRateTime() {
      this.reqConversionRateData();
    },
    // 筛选时间
    changeDate() {
      this.reqIndividualStockRiskLayeredTrendChart();
    },
    changeShowLineMarkerEcharts() {
      this.$refs.lineMarkerComp.setOption(this.lineData);
    },
    dealShowPersent(numerator) {
      let result = CommonUtils.dealShowPersent(numerator, 1, "");
      return result;
    },
    handlePage(info) {
      this.page = info.page;
      this.limit = info.limit;
    },
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/show-ui/common_risk_style.scss";
.exclamation-circle {
  width: 14px;
  height: 14px;
}
.emphasis {
  > p {
    align-items: center;
  }
}
.popover-text {
  color: #86909c;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}
::v-deep .el-popover {
  padding: 10px !important;
}
.short-crash-header {
  padding: 24px 20px 16px;

  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #1d2129;
  .header {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #1d2129;
  }
}

.posi-re {
  position: relative;

  >.calender {
    position: absolute;
    width: 14px;
    height: 14px;
    background: url("../../../../assets/images/cockpit-risk/day_icon.png") no-repeat 0 0 / 100% 100%;
    top: 10px;
    right: 9px;
  }
}

</style>