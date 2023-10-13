<template>
  <div class="high-risk-warn-container">
    <div class="risk-wark-top">
      <div class="risk-warn-top-left">
        <div class="risk-warn-title">高危预警&评级下调</div>
        <div style="width: 20px; height: 20px">
          <el-popover
            placement="right"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
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
          <el-select v-model="upgrateValue" placeholder="请选择">
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
            placeholder="选择日期"
          />
          <el-date-picker
            v-else
            v-model="dateRange"
            type="daterange"
            range-separator="至"
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
        <div class="component-header-buttons-item button-color">导出</div>
      </div>
    </div>
    <div class="risk-warn-table">
      <el-table
        tooltip-effect="dark"
        style="width: 100%"
        :data="tableData"
        :cell-style="cellStyle"
        :header-cell-style="rowClass"
        border
      >
        <template v-for="item in tableRow">
          <el-table-column :key="item.label" :prop="item.prop" :label="item.label" v-if="item.prop != 'mainRisk'" />
          <el-table-column :key="item.label" :prop="item.prop" :label="item.label" v-if="item.prop == 'mainRisk'">
            <template slot-scope="scope">
              <el-popover trigger="hover" content="11111111" placement="top">
                <div slot="reference">  
                  <span>{{ scope.row['mainRisk'] }}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <pagination class="mt-24" :total="10" :current-page="1" :cur-limit="10" :showRecods="1"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/show-ui/table/pagination-comp.vue'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {[]},
    },
  },
  components:{
    pagination
  },
  data() {
    return {
      dateValue: "",
      upgrateValue: 1,
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
    };
  },
  created() {},
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
              prop: "stockAcronyms",
            },
            {
              label: "当前评级",
              prop: "currentRate",
            },
            {
              label: "折算率",
              prop: "conversionRate",
            },
            {
              label: "主要风险项",
              prop: "mainRisk",
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
              prop: "stockAcronyms",
            },
            {
              label: "当前评级(调整幅度)",
              prop: "currentRate",
            },
            {
              label: "原始评级",
              prop: "oldRate",
            },
            {
              label: "变动时间",
              prop: "time",
            },
            {
              label: "主要风险项",
              prop: "mainRisk",
            },
          ]
        }
      },
      immediate: true,
    },
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
