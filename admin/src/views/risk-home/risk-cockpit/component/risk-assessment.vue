<template>
  <!-- 风险评估分布组件 -->
  <div class="container">
    <div class="assessment-top">
      <div class="assessment-top-left">
        <div>风险评估分布</div>
        <el-select
          v-model="selectValue"
          placeholder="请选择"
          @change="selectChange"
        >
          <el-option
            v-for="item in selectOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="assessment-top-right">
        <div
          v-for="item in radioOpts"
          :key="item.value"
          :class="{ 'is-active': item.value === isActive }"
          @click="handleRadioClick(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="chart-container">
      <div id="barChart" class="chart-container-bar" />
      <div class="chart-container-table">
        <el-table
          tooltip-effect="dark"
          style="width: 100%"
          :data="tableData"
          :cell-style="cellStyle"
          :header-cell-style="rowClass"
          border
        >
          <template v-for="item in tableRow">
            <el-table-column
              :key="item.label"
              :prop="item.prop"
              :label="item.label"
              v-if="item.prop != 'rate'"
            />
            <el-table-column
              :key="item.label"
              :prop="item.prop"
              :label="item.label"
              v-if="item.prop == 'rate'"
            >
              <template slot-scope="scope">
                <span>{{ (scope.row["rate"] * 100).toFixed(0) + "%" }}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <div id="lineChart" class="line-chart" />
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getRiskment } from "@/api/risk-homepage/risk-cockpit";
export default {
  components: {},
  data() {
    return {
      selectValue: 0,
      selectOpts: [
        {
          value: 0,
          label: "全市场",
        },
        {
          value: 1,
          label: "两融标的",
        },
      ],
      tableData: [],
      tableRow: [
        {
          label: "五级分类",
          prop: "classify",
        },
        {
          label: "数量",
          prop: "number",
        },
        {
          label: "占比",
          prop: "rate",
        },
      ],
      radioOpts: [
        { label: "短期暴跌预警", value: 1 },
        { label: "长期趋势预警", value: 2 },
      ],
      isActive: 1,
      dqRate: {}, // 德勤折算率
      otherRate: {}, // 券商折算率
      stockRate: {}, // 股票质押率
      lineXaxis: [],
      barXaxis: [],
      barNumber: [],
      barData: [],
      series: [],
      lineChartInstance: null,
      barChartInstance: null
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.lineChartInstance = echarts.init(document.getElementById("lineChart"))
    this.barChartInstance = echarts.init(document.getElementById('barChart'))
    this.getRiskment();
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return "text-align: center;background: #f8f9fb;color: #86909c;height:48px";
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return "text-align: center;height: 60px;";
    },
    // 获取数据
    async getRiskment() {
      let params = {
        type: this.isActive,
        distribute: this.selectValue,
      };
      const res = await getRiskment(params);
      this.handleRes(res.data || {});
      this.initEchart();
    },
    handleRes(data) {
      const that = this;
      that.series = [];
      if (!!data.conversionRateDistribution) {
        const allSeries = data.conversionRateDistribution.series || [];
        const dqSeries = allSeries.map((item) => item[0]);
        const otherSeries = allSeries.map((item) => item[1]);
        that.dqRate = that.handleDqSeries(dqSeries);
        that.otherRate = that.handleOtherSeries(otherSeries);
        that.lineXaxis = data.conversionRateDistribution.xaxis;
        that.series = [that.otherRate, that.dqRate];
      }
      if (!!data.stockPledgeRateDistribution) {
        const stockSeries = data.stockPledgeRateDistribution.series || [];
        that.stockRate = that.handleStockSeries(stockSeries);
        that.lineXaxis = data.stockPledgeRateDistribution.xaxis;
        that.series = [that.stockRate];
      }
      if (!!data.longTermTrendDistribution) {
        const series = data.longTermTrendDistribution.series || [];
        const rateSeris = series.map((item) => (item["rate"] * 100).toFixed(2));
        const barnumber = series.map((item) => item["number"]);
        that.barXaxis = data.longTermTrendDistribution.xaxis || [];
        that.barData = rateSeris;
        that.barNumber = barnumber;
        const mergeData = series.map((item, index) => ({
          rate: item.rate,
          number: item.number,
          classify: that.barXaxis[index],
        }));
        that.tableData = mergeData;
      }
    },
    // 单选框点击
    handleRadioClick(value) {
      const that = this;
      that.isActive = value;
      that.getRiskment();
    },
    handleDqSeries(data) {
      return {
        name: "德勤折算率",
        data: data,
        type: "line",
        color: "#f59a23",
        itemStyle: {
          lineStyle: {
            width: 4,
          },
        },
      };
    },
    handleOtherSeries(data) {
      return {
        name: "其他券商折算率",
        data: data,
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#bdcff2",
              },
              {
                offset: 1,
                color: "#FFF",
              },
            ],
          },
        },
        itemStyle: {
          lineStyle: {
            width: 5,
          },
        },
      };
    },
    handleStockSeries(data) {
      return {
        name: "股票质押率",
        data: data,
        type: "line",
        color: "#f59a23",
        itemStyle: {
          lineStyle: {
            width: 4,
          },
        },
      };
    },
    selectChange() {
      this.getRiskment();
    },
    // 求和
    sum(arr) {
      return eval(arr.join("+"));
    },
    // 初始化echarts
    initEchart() {
      const that = this;
      that.initBarChart(that.barData, that.barXaxis, that.barNumber, "barChart");
      that.lineChartInstance.clear();
      that.lineChartInstance.setOption({
        title: {
          show: true,
          text: that.isActive == 1 ? "两融折算率分布图" : "股票质押率分布图",
          textStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          x: "center",
          y: "bottom",
        },
        legend: {
          orient: "horizontal",
          x: "right",
          y: "top",
          textStyle: {
            fontSize: 12,
          },
          data: that.series,
        },
        xAxis: {
          data: that.lineXaxis,
        },
        yAxis: {},
        series: that.series,
        tooltip: {
          trigger: "axis",
        },
      });
      window.addEventListener("resize", function () {
        that.lineChartInstance.resize();
      });
    },
    handleChartClick(params) {
      this.$router.push('/risk-home/individual-stocks/risk-inquiry')
    },
    initBarChart(data, barXasis, barNUmber, el) {
      const that = this
      const option = {
        title: {
          show: true,
          text: "短期下跌风险",
          textStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          x: "center",
          y: "bottom",
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            let dataIndex = params[0].dataIndex;
            let tooltipContent = params[0].name + "<br>";
            tooltipContent += "占比:" + params[0].data + "%<br>";
            tooltipContent += "数量:" + barNUmber[dataIndex] + "<br>";
            return tooltipContent;
          },
        },
        xAxis: {
          type: "category",
          data: barXasis,
          axisTick: { show: false },
          axisLabel: {
            interval: 0,
            color: "#666666",
          },
          axisLine: { lineStyle: { color: "#dddddd" } },
        },
        yAxis: {
          type: "value",
          name: "单位（%）",
          axisLabel: {
            formatter: "{value}%",
          },
        },
        series: [
          {
            name: "占比",
            type: "bar",
            data: data,
            barWidth: 20,
          },
        ],
      };
      option && that.barChartInstance.setOption(option);
      window.addEventListener("resize", function () {
        that.barChartInstance.resize();
      });
      that.barChartInstance.on('click', that.handleChartClick)
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input--medium .el-input__inner {
  height: 28px;
}
::v-deep .el-input__suffix {
  top: 4px;
}
.is-active {
  background-color: #fff;
  color: #00a3e0 !important;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .assessment-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .assessment-top-left {
      display: flex;
      align-items: center;
      & div {
        white-space: nowrap;
        font-weight: 500;
        font-size: 20px;
        color: #1d2129;
        margin-right: 10px;
      }
    }
    .assessment-top-right {
      white-space: nowrap;
      height: 36px;
      padding: 4px;
      background: #f2f3f5;
      border-radius: 3px;
      display: flex;
      align-items: center;
      & div {
        width: 50%;
        cursor: pointer;
        padding: 4px 24px;
        font-weight: 600;
        font-size: 14px;
        color: #4e5969;
      }
    }
  }
  .chart-container {
    width: 100%;
    height: 375px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    .chart-container-bar {
      width: 50%;
      height: 100%;
      margin-right: 30px;
    }
    .chart-container-table {
      width: 40%;
      padding-top: 38px;
    }
  }
  .line-chart {
    width: 100%;
    height: 400px;
  }
}
</style>
