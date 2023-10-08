<template>
  <div class="high-risk-warn-container">
    <div class="risk-wark-top">
      <div class="risk-warn-top-left">
        <div class="risk-warn-title">高危预警&评级下调</div>
      </div>
      <div class="risk-warn-top-right">
        <div class="risk-warn-top-right-date">
          <el-date-picker v-if="isActive === 1" v-model="dateValue" type="date" placeholder="选择日期" />
          <el-date-picker v-else v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </div>
        <div class="risk-warn-top-right-radio">
          <div v-for="item in radioOpts" :key="item.value" :class="{'is-active': item.value === isActive}" @click="handleRadioClick(item.value)">{{ item.label }}</div>
        </div>
        <div class="risk-warn-top-right-button">导出</div>
      </div>
    </div>
    <div class="risk-warn-table">
      <el-table tooltip-effect="dark" style="width: 100%" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" border>
        <el-table-column v-for="item in tableRow" :key="item.label" :prop="item.prop" :label="item.label" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateValue: '',
      dateRange: '',
      tableData: [],
      tableRow: [
        {
          label: '股票代码',
          prop: 'daima'
        },
        {
          label: '股票简称',
          prop: 'jiancheng'
        },
        {
          label: '当前评级',
          prop: 'pingji'
        },
        {
          label: '原始评级',
          prop: 'yuanshi'
        },
        {
          label: '变动时间',
          prop: 'time'
        },
        {
          label: '主要风险项',
          prop: 'xiangmu'
        }
      ],
      radioOpts: [
        { label: '高危预警个股展示', value: 1 },
        { label: '评级调整个股展示', value: 2 }
      ],
      isActive: 1
    }
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return 'text-align: center;background: #f8f9fb;color: #86909c;height:48px'
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return 'text-align: center;height: 60px;'
    },
    // 单选框点击
    handleRadioClick(value) {
      const that = this
      that.isActive = value
    }
  }
}
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
                font-weight: 500;
                font-size: 20px;
                color: #1d2129;
                margin-right: 10px;
            }
        }
        .risk-warn-top-right {
            display: flex;
            align-items: center;
            .risk-warn-top-right-radio {
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
                padding: 4px 8px;
                background:#f2f3f5;
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
