<template>
  <div class="cnotainer">
    <div class="top-title">信用类业务</div>
    <div class="chart-box-credit">
      <div class="pie-chart" ref="pieChart"></div>
      <div class="line-col-chart" ref="lineColChart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { setPieOptionCredit, setBarLineChartOption } from "../mainConfig";
export default {
  data() {
    return {
      pieChartInstance: null,
      lineColChartInstance: null,
    };
  },
  mounted() {
    this.initEchart()
    this.setPieChartOption()
  },
  methods: {
    initEchart() {
      this.pieChartInstance = echarts.init(this.$refs.pieChart)
      this.lineColChartInstance = echarts.init(this.$refs.lineColChart)
    },
    setPieChartOption() {
      const that = this 
      that.pieChartInstance.setOption(setPieOptionCredit())
      that.lineColChartInstance.setOption(setBarLineChartOption())
      window.addEventListener("resize", function () {
        that.pieChartInstance.resize();
      });
      window.addEventListener("resize", function () {
        that.lineColChartInstance.resize();
      });
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.cnotainer {
  width: 100%;
  .top-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  .chart-box-credit {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    .pie-chart {
      width: 40%;
      height: 400px;
      margin-right: 30px;
    }
    .line-col-chart {
      width: 60%;
      height: 400px;
    }
  }
}
</style>
