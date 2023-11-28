<template>
  <div class="box-container">
    <div class="search-top" style="border-radius: 8px;">
      <div class="search-top-row">
        <div
          class="search-top-item"
          v-for="item in checkBoxOptions"
          :key="item.bindValue"
        >
          <div class="search-top-row-label">{{ item.label }}</div>
          <div class="search-top-row-checkbox">
            <el-checkbox-group v-model="configObj[item.bindValue]">
              <el-checkbox
                :label="option.label"
                v-for="option in item.options"
                :key="option.label"
              ></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="search-top-item">
          <div class="search-top-row-label">时间：</div>
          <div class="search-top-row-checkbox">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="mini"
            ></el-date-picker>
          </div>
        </div>
        <div class="search-top-item">
          <div class="search-top-row-label">敞口规模/业务规模（万元）：</div>
          <div class="search-top-row-checkbox" style="width: 200px">
            <el-slider v-model="value1" :min="0" :max="10000"></el-slider>
          </div>
        </div>
        <div class="search-top-item">
          <div class="search-button" @click="showFlag = false">查询</div>
          <div class="search-button button-color" @click="resetParams">
            重置
          </div>
          <div class="search-button button-color">导出</div>
        </div>
      </div>
    </div>
    <template v-if="showFlag">
      <div class="search-middle">
        <pie-chart-credit></pie-chart-credit>
      </div>
      <div class="search-middle">
        <pie-chart-nonchart></pie-chart-nonchart>
      </div>
    </template>
    <template v-else>
      <div class="table-container">
        <table-and-chart></table-and-chart>
      </div>
    </template>
  </div>
</template>

<script>
import pieChartCredit from './component/pie-chart-credit.vue';
import { checkBoxOptions, setPieOptionCredit } from "./mainConfig";
import PieChartNonchart from './component/pie-chart-nonchart.vue';
import TableAndChart from './component/table-and-chart.vue';
export default {
  components: { pieChartCredit, PieChartNonchart, TableAndChart },
  data() {
    return {
      radio: "",
      dateRange: '',
      showFlag: true,
      checkBoxOptions: [],
      value1: 100,
      configObj: {
        broadCategory: [],
        smallCategory: [],
        businessScope: [],
      },
    };
  },
  created() {
    this.checkBoxOptions = checkBoxOptions || [];
  },
  methods: {
    resetParams() {
      this.configObj = {
        broadCategory: [],
        smallCategory: [],
        businessScope: [],
      }
      this.showFlag = true
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.button-color {
  background-color: #e5e6eb !important;
  color: #012169 !important;
}
.search-button {
  padding: 6px 20px;
  font-size: 14px;
  background-color: #012169;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 8px;
}
.box-container {
  width: 100%;
  height: 100%;
  padding: 12px;
  overflow-y: auto;
  .search-top {
    width: 100%;
    padding: 20px 24px 0px 24px;
    background-color: #fff;
    .search-top-row {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      .search-top-item {
        display: flex;
        margin-right: 80px;
        margin-bottom: 30px;
        align-items: center;
        .search-top-row-label {
          margin-right: 10px;
          font-weight: 700;
          color: #606266;
          font-size: 14px;
          white-space: nowrap;
        }
      }
    }
  }
  .search-middle {
    margin-top: 30px;
    padding: 20px 24px 0px 24px;
    background-color: #fff;
    border-radius: 8px;
  }
  .table-container {
    width: 100%;
    margin-top: 30px;
    padding: 20px 24px 0px 24px;
    background-color: #fff;
  }
}
</style>
