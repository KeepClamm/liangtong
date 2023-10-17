<template>
  <!-- 高危预警&&评级调整 -->
  <div class="high-risk-warn-container">
    <div class="risk-wark-top">
      <div class="risk-warn-top-left">
        <div class="risk-warn-title">高危预警&评级下调</div>
        <div style="width: 20px; height: 20px">
          <el-popover
            placement="right"
            width="200"
            trigger="hover"
            content="近期评级处于市场尾部且在标的和保证金池中的个股"
          >
            <img
              slot="reference"
              src="@/assets/images/common/warning-fill.png"
              alt=""
              style="width: 100%; height: 100%"
            />
          </el-popover>
        </div>
        <div v-if="isActive === 2" class="upgarte-container">
          <el-select
            v-model="upgrateValue"
            placeholder="请选择"
            @change="handleGradeChange"
          >
            <el-option
              v-for="item in upgradeOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="risk-warn-top-right">
        <div class="risk-warn-top-right-date">
          <el-date-picker
            v-if="isActive === 1"
            v-model="dateValue"
            type="date"
            value-format="timestamp"
            placeholder="选择日期"
            @change="handleDateChange"
          />
          <el-date-picker
            v-else
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            value-format="timestamp"
            @change="handleDateRangeChange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
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
            v-if="
              item.prop != 'mainRisks' &&
              item.prop != 'stockShortName' &&
              item.prop != 'stockCode' &&
              item.prop != 'alteredDate' &&
              item.prop != 'currentRating'
            "
          />
          <el-table-column
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            v-if="item.prop == 'alteredDate'"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row.alteredDate
                  ? $options.filters.dateformat(
                      scope.row.alteredDate,
                      "YYYY-MM-DD"
                    )
                  : "--"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            v-if="item.prop == 'mainRisks'"
          >
            <template slot-scope="scope">
              <el-popover
                trigger="hover"
                :content="scope.row.mainRisks"
                placement="top"
              >
                <div slot="reference">
                  <div class="rownowrap">{{ scope.row["mainRisks"] }}</div>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            v-if="item.prop == 'stockShortName'"
          >
            <template slot-scope="scope">
              <span class="color-blue cursor-pointer" @click="gotoIndividual">{{
                scope.row["stockShortName"]
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            v-if="item.prop == 'stockCode'"
          >
            <template slot-scope="scope">
              <span class="color-blue cursor-pointer">{{
                scope.row["stockCode"]
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            v-if="item.prop == 'currentRating'"
          >
            <template slot-scope="scope">
              <div class="currentRating-flex">
                <template v-if="isActive == 2">
                  <div>{{ scope.row["currentRating"] }}</div>
                  <div style="width: 20px; height: 20px">
                    <img
                      :src="upgrateValue == 2 ? iconList[0] : iconList[1]"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div>{{ scope.row["reduceRange"] }}</div>
                </template>
                <template v-else>
                  <div>{{ scope.row["currentRating"] }}</div>
                </template>
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <pagination
        class="mt-24"
        :total="total"
        :current-page="page"
        :cur-limit="limit"
        :showRecods="1"
        @post-cur-page="recieveCurNOP"
        @post-cur-limit="recieveCurLimit"
        v-if="isActive == 2"
      ></pagination>
    </div>
  </div>
</template>

<script>
import CommonUtils from '@/utils/commonUtils';
import pagination from "@/components/show-ui/table/pagination-comp.vue";
import {
  getDownGrade,
  getUpGrade,
  getHighRiskAlert,
} from "@/api/risk-homepage/risk-cockpit";
export default {
  props: {},
  components: {
    pagination,
  },
  data() {
    return {
      page: 1,
      total: 0,
      limit: 10,
      dateValue: "",
      upgrateValue: 1, // 评级上下调
      dateRange: "",
      tableRow: [],
      radioOpts: [
        { label: "高危预警个股展示", value: 1 },
        { label: "评级调整个股展示", value: 2 },
      ],
      upgradeOpts: [
        { label: "评级下调", value: 1 },
        { label: "评级上调", value: 2 },
      ],
      isActive: 1,
      tableData: [],
      iconList: [
        require("@/assets/images/cockpit-risk/arrow-up.png"),
        require("@/assets/images/cockpit-risk/arrow-down.png"),
      ],
    };
  },
  watch: {
    isActive: {
      handler(newVal, oldVal) {
        if (newVal == 1) {
          this.tableRow = [
            {
              label: "股票代码",
              prop: "stockCode",
            },
            {
              label: "股票简称",
              prop: "stockShortName",
            },
            {
              label: "当前评级",
              prop: "currentRating",
            },
            {
              label: "折算率",
              prop: "lossRate",
            },
            {
              label: "主要风险项",
              prop: "mainRisks",
            },
          ];
        } else {
          this.tableRow = [
            {
              label: "股票代码",
              prop: "stockCode",
            },
            {
              label: "股票简称",
              prop: "stockShortName",
            },
            {
              label: "当前评级(调整幅度)",
              prop: "currentRating",
            },
            {
              label: "原始评级",
              prop: "originalRating",
            },
            {
              label: "变动时间",
              prop: "alteredDate",
            },
            {
              label: "主要风险项",
              prop: "mainRisks",
            },
          ];
        }
      },
      immediate: true,
    },
  },
  created() {
    this.getHighRiskAlert();
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return "text-align: center;background: #f8f9fb;color: #86909c;height:48px";
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return "text-align: center;height: 60px;";
    },
    // 分页
    recieveCurNOP(curNOP) {
      const info = {
        type: "pagination",
        page: curNOP,
        limit: this.limit,
      };
      this.handlePage(info);
    },
    // 分页
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
      this.rateAdjust()
    },
    // 单选框点击
    handleRadioClick(value) {
      const that = this;
      that.isActive = value;
      that.isActive == 1
        ? that.handleRadioHighRisk()
        : that.handleRadioGradeAdjust();
    },
    handleRadioHighRisk() {
      this.dateValue = ""; // 重置数据
      this.getHighRiskAlert();
    },
    handleRadioGradeAdjust() {
      this.dateRange = ""; // 重置数据
      this.upgrateValue = 1;
      this.rateAdjust();
    },
    handleGradeChange(val) {
      this.rateAdjust();
    },
    handleDateChange() {
      let params = {
        startTime: this.dateValue,
      };
      this.getHighRiskAlert(params);
    },
    handleDateRangeChange() {
      this.rateAdjust();
    },
    // 高危预警个股展示
    async getHighRiskAlert(params) {
      const res = await getHighRiskAlert(params);
      const data = res.data || [];
      this.tableData = data;
    },
    // 评级调整
    async rateAdjust() {
      let params = {
        page: this.page,
        limit: this.limit,
      };
      let res = [];
      if (!!this.dateRange) {
        (params.startTime = this.dateRange[0]),
          (params.endTime = this.dateRange[1]);
      }
      if (this.upgrateValue == 1) {
        res = await getDownGrade(params);
      } else {
        res = await getUpGrade(params);
      }
      const tableData = res.data.items || [];
      this.total = res.data.total || 0;
      this.tableData = tableData;
    },
    // 跳转个股风险画像
    gotoIndividual() {
      //TODO:
    },
    // 评级上调
    async getUpGrade(params) {
      const res = await getUpGrade(params);
      const tableData = res.data.items || [];
      this.tableData = tableData;
    },
    // 评级下调
    async getDownGrade(params) {
      const res = await getDownGrade(params);
      const tableData = res.data.items || [];
      this.tableData = tableData;
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
.rownowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.currentRating-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  & div {
    margin-right: 5px;
  }
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
