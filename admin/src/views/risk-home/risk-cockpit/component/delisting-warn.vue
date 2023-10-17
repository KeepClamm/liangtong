<template>
  <!-- 财务类退市预警&交易类退市预警 -->
  <div class="high-risk-warn-container">
    <div class="risk-wark-top">
      <div class="risk-warn-top-left">
        <div class="risk-warn-title">财务类退市预警&交易类退市预警</div>
      </div>
      <div class="risk-warn-top-right">
        <div class="risk-warn-top-right-radio">
          <div
            v-for="item in radioOpts"
            :key="item.value"
            :class="{ 'is-active': item.value === isActive }"
            @click="handleRadioClick(item.value)"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="component-header-buttons-item button-color" @click="exportExcel">导出</div>
      </div>
    </div>
    <div class="risk-warn-table">
      <el-table
        tooltip-effect="dark"
        style="width: 100%"
        :data="tableData"
        :cell-style="cellStyle"
        :header-cell-style="rowClass"
        id="out-table"
        border
      >
      <template v-for="item in tableRow">
        <el-table-column
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          v-if="item.prop != 'stockCode' && item.prop != 'stockAcronyms' && item.prop !='mainRisks'"
        />
        <el-table-column :key="item.label" :prop="item.prop" :label="item.label" v-if="item.prop == 'stockAcronyms'">
            <template slot-scope="scope">
              <span class="color-blue cursor-pointer">{{ scope.row['stockAcronyms'] }}</span>
            </template>
          </el-table-column>
          <el-table-column :key="item.label" :prop="item.prop" :label="item.label" v-if="item.prop == 'stockCode'">
            <template slot-scope="scope">
              <span class="color-blue cursor-pointer">{{ scope.row['stockCode'] }}</span>
            </template>
          </el-table-column>
          <el-table-column :key="item.label" :prop="item.prop" :label="item.label" v-if="item.prop == 'mainRisks'">
            <template slot-scope="scope">
              <el-popover trigger="hover" :content="scope.row.mainRisks" placement="top">
                <div slot="reference">
                  <div class="rownowrap">{{ scope.row["mainRisks"] }}</div>
                </div>
              </el-popover>
            </template>
          </el-table-column>
      </template>
      </el-table>
      <pagination class="mt-24" :total="total" :current-page="page" :cur-limit="limit" :showRecods="1" @post-cur-page="recieveCurNOP" @post-cur-limit="recieveCurLimit"></pagination>
    </div>
  </div>
</template>
  
<script>
import CommonUtils from '@/utils/commonUtils';
import pagination from '@/components/show-ui/table/pagination-comp.vue'
import {
  getFinancialDlistWarning,
  getTradeDlistWarning
} from "@/api/risk-homepage/risk-cockpit";
export default {
  props: {
  },
  components:{
    pagination
  },
  data() {
    return {
      page: 1,
      total: 0,
      limit: 10,
      dateValue: "",
      upgrateValue: 1,
      dateRange: "",
      tableRow: [
        {
          label: "股票代码",
          prop: "stockCode",
        },
        {
          label: "股票简称",
          prop: "stockShortName",
        },
        {
          label: "折算率",
          prop: "lossRate",
        },
        {
          label: "主要风险项",
          prop: "mainRisks",
        },
      ],
      radioOpts: [
        { label: "财务类退市预警个股展示", value: 1 },
        { label: "交易类退市预警个股展示", value: 2 },
      ],
      isActive: 1,
      tableData: []
    };
  },
  watch: {
    isActive: {
      handler(newval, oldVal) {
        newval == 1 ? this.getFinancialDlistWarning() : this.getTradeDlistWarning()
      },
      immediate: true
    }
  },
  created() {

  },
  methods: {
    rowClass({ row, rowIndex }) {
      return "text-align: center;background: #f8f9fb;color: #86909c;height:48px";
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return "text-align: center;height: 60px;";
    },
    // 单选框点击
    handleRadioClick(value) {
      const that = this;
      that.isActive = value;
    },
    // 财务退市预警
    async getFinancialDlistWarning() {
      let params = {
        page: this.page,
        limit: this.limit
      }
      const res = await getFinancialDlistWarning(params) 
      const data = res.data.items || []
      this.tableData = data
      this.total = res.data.total | 0
      console.log('财务退市预警', res)
    },
    // 交易类退市预警
    async getTradeDlistWarning() {
      let params = {
        page: this.page,
        limit: this.limit
      }
      const res = await getTradeDlistWarning(params) 
      const data = res.data.items || []
      this.tableData = data
      this.total = res.data.total | 0
      console.log('交易类退市预警', res)
    },
    recieveCurNOP(curNOP) {
      const info = {
        type: "pagination",
        page: this.page,
        limit: this.limit,
      };
      this.handlePage(info);
    },
    recieveCurLimit(curLimit) {
      const info = {
        type: "pagination",
        page: this.page,
        limit: curLimit,
      };
      this.handlePage(info);
    },
    handlePage(info) {
      this.page = info.page;
      this.limit = info.limit;
    },
    exportExcel() {
      // let title = this.radioOpts.filter(option => option.value == this.isActive).map(item => item.label)
      // CommonUtils.exportExcelNew('out-table', title)
    }
  },
};
</script>
  
  <style lang="scss" scoped>
::v-deep .risk-warn-top-right-date .el-input--medium .el-input__inner {
  background: #f2f3f5;
}
::v-deep .el-range-editor--medium.el-input__inner {
  background: #f2f3f5;
}
::v-deep.el-range-editor--medium .el-range-input {
  background: #f2f3f5;
}
::v-deep .risk-warn-top-left .el-select > .el-input {
  width: 120px;
}
::v-deep .risk-warn-top-left .el-input--medium .el-input__inner {
  height: 28px;
}
::v-deep .risk-warn-top-left .el-input--medium .el-input__icon {
  line-height: 28px;
}
.component-header-buttons-item {
  padding: 6px 20px;
  font-size: 14px;
  background-color: #012169;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 15px;
}
.is-active {
  background-color: #fff;
  color: #00a3e0 !important;
}
.high-risk-warn-container {
  width: 100%;
  height: 100%;
  .risk-wark-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .risk-warn-top-left {
      display: flex;
      align-items: center;
      .risk-warn-title {
        white-space: nowrap;
        font-weight: 500;
        font-size: 20px;
        color: #1d2129;
        margin-right: 10px;
      }
      .upgarte-container {
        margin-left: 10px;
      }
    }
    .risk-warn-top-right {
      display: flex;
      align-items: center;
      .risk-warn-top-right-radio {
        white-space: nowrap;
        height: 36px;
        padding: 4px;
        margin-left: 15px;
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
      .risk-warn-top-right-button {
        white-space: nowrap;
        padding: 4px 8px;
        background: #f2f3f5;
        border-radius: 3px;
        margin-left: 15px;
        line-height: 28px;
        cursor: pointer;
      }
    }
  }
  .risk-warn-table {
    margin-top: 30px;
  }
}
</style>
  