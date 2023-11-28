<template>
  <div class="container" style="border-radius: 8px;">
    <div class="left-chart">
      <div class="top-title">非信用类业务</div>
      <div class="chart-box-noncredit" ref="pieChartnonCredit"></div>
    </div>
    <div class="right-chart">
      <div class="top-title">总部/子公司</div>
      <div class="chart-box-both">
        <div ref="pieCreditScale"></div>
        <div ref="pieNonCreditScale"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { setPieOptionNonCredit, setPieOptionCreditScale, setPieOptionNonCreditScale } from "../mainConfig";
export default {
  data() {
    return {
      pieChartInstanceNonCredit: null,
      pieCreditScaleInstance: null,
      pieNonCreditScaleInstance: null
    };
  },
  mounted() {
    this.initEchart();
    this.setPieChartOption();
  },
  methods: {
    initEchart() {
      this.pieChartInstanceNonCredit = echarts.init(this.$refs.pieChartnonCredit);
      this.pieCreditScaleInstance = echarts.init(this.$refs.pieCreditScale)
      this.pieNonCreditScaleInstance = echarts.init(this.$refs.pieNonCreditScale)
    },
    setPieChartOption() {
      const that = this;
      that.pieChartInstanceNonCredit.setOption(setPieOptionNonCredit());
      that.pieCreditScaleInstance.setOption(setPieOptionCreditScale())
      that.pieNonCreditScaleInstance.setOption(setPieOptionNonCreditScale())
      window.addEventListener("resize", function () {
        that.pieChartInstanceNonCredit.resize();
      });
      window.addEventListener("resize", function () {
        that.pieCreditScaleInstance.resize();
      });
      window.addEventListener("resize", function () {
        that.pieNonCreditScaleInstance.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.container {
  width: 100%;
  display: flex;
  .left-chart {
    width: 50%;
    margin-right: 80px;
    .top-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 30px;
    }
    .chart-box-noncredit {
      width: 100%;
      height: 380px;
    }
  }
  .right-chart {
    width: 50%;
    height: 100%;
    .top-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 30px;
    }
    .chart-box-both {
      width: 100%;
      height: 380px;
      display: flex;
      flex-direction: row;
      align-items: center;
      &>div {
        flex: 1;
        width: 50%;
        height: 400px;
      }
    }
  }
}
</style>
