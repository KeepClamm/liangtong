<template>
  <div class="peer-comparison-wrap">
    <div class="finance-bid-select-top">
      <div class="select-top-flex-box">
        <div class="margin-20">交易市场</div>
        <el-select v-model="marketValue">
          <el-option v-for="item in marketOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="select-top-flex-box">
        <div class="margin-20">上市板</div>
        <el-select v-model="intomarketValue">
          <el-option v-for="item in intomarketOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="select-top-flex-box">
        <div class="margin-20">交易制度</div>
        <el-select v-model="tradeSystemValue">
          <el-option v-for="item in tradeSystemOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="select-top-flex-box">
        <div class="margin-20">选择日期</div>
        <el-date-picker v-model="dateValue" type="date" placeholder="选择日期" />
      </div>
    </div>
    <div class="finance-bid-radio">
      <div class="radio-container">
        <div class="radio-container-content">
          <div v-for="item in radioOpts" :key="item.value" class="radio-container-content-text" :class="{'radio-active': radioActive === item.value}" @click="handleRadio(item)">{{ item.label }}</div>
        </div>
      </div>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-download"
        class="export-button-color"
        @click="handleExport"
      >数据导出</el-button>
    </div>
    <div class="table-container">
      <!-- 表格 -->
      <el-table tooltip-effect="dark" style="width: 100%" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" border>
        <el-table-column v-for="item in tableRow" :key="item.label" :prop="item.prop" :label="item.label" />
      </el-table>
      <!-- 分页 -->
      <el-pagination :current-page="page" :page-size="limit" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleLimitChange" @current-change="handlePageChange">
        1
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {

  components: {
  },
  props: {
    radioOpts: { type: Array, default: () => ([]) },
    source: { type: String, default: 'finaceBid' }
  },
  data() {
    return {
      marketValue: 0, // 交易市场
      marketOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '上交所'
        },
        {
          value: 2,
          label: '深交所'
        },
        {
          value: 3,
          label: '北交所'
        }
      ],
      intomarketValue: 0, // 上市板
      intomarketOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '主板'
        },
        {
          value: 2,
          label: '创业板'
        },
        {
          value: 3,
          label: '中小板'
        }
      ],
      tradeSystemValue: 0, // 交易制度
      tradeSystemOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '审批制'
        },
        {
          value: 2,
          label: '核准制'
        },
        {
          value: 3,
          label: '注册制'
        }
      ],
      dateValue: '', // 日期选择
      tableRow: [
        {
          label: '股票代码',
          prop: 'test01'
        },
        {
          label: '证券简称',
          prop: 'test02'
        },
        {
          label: '上市板',
          prop: 'test03'
        },
        {
          label: '交易制度',
          prop: 'test04'
        },
        {
          label: '是否交易所标的',
          prop: 'test05'
        },
        {
          label: '设为融资券的券商数',
          prop: 'test06'
        },
        {
          label: '平均融资保证金比例',
          prop: 'test07'
        },
        {
          label: '中信证券',
          prop: 'test08'
        }
      ],
      tableData: [],
      radioActive: 1, // 单选按钮高亮
      page: 1,
      limit: 5,
      total: 0
    }
  },
  computed: {
  },
  watch: {
    radioActive(newValue, oldValue) {
      const that = this
      that.source === 'finaceBid' ? that.handlefinaceBid() : that.source === 'marginAuction' ? that.handleMarginAuction() : that.handleDeposit()
    }
  },
  created() {
    console.log(this.source)
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return 'text-align: center;background: #f8f9fb;color: #86909c;height:48px'
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return 'text-align: center;height: 60px;'
    },
    handleExport() {
      // test
    },
    // 修改每页条数
    handleLimitChange(val) {
      this.limit = val
      this.getSupplyList()
    },
    // 修改页码
    handlePageChange(val) {
      this.page = val
      this.getSupplyList()
    },
    // 单选点击
    handleRadio(item) {
      this.radioActive = item.value
    },
    handlefinaceBid() {
      const that = this
      if (that.radioActive === 1) {
        that.tableRow.splice(5, 2, { label: '设为融资券的券商数', prop: 'test06' }, { label: '平均融资保证金比例', prop: 'test07' })
      } else if (that.radioActive === 2) {
        that.tableRow.splice(5, 2, { label: '融资调入券商数', prop: 'test06' }, { label: '融资调出券商数', prop: 'test07' })
      } else {
        that.tableRow.splice(5, 2, { label: '上调券商数', prop: 'test06' }, { label: '下调券商数', prop: 'test07' })
      }
    },
    handleMarginAuction() {

    },
    handleDeposit() {}
  }
}
</script>

  <style lang="scss" scoped>
  div {
    font-size: 14px;
    box-sizing: border-box;
  }
  .radio-active {
    color: #163475 !important;
    background-color: #fff;
    height: 100%;
    border-radius: 4px;
  }
  ::v-deep .el-select>.el-input {
    width: 120px;
  }
  ::v-deep .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 200px;
  }
  .export-button-color {
    background-color: #0f58d5;
  }
  .peer-comparison-wrap {
    width: 100%;
    height: 100%;
    .finance-bid-select-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .select-top-flex-box {
      display: flex;
      align-items: center;
        .margin-20 {
          margin-right: 20px;
        }
      }
    }
    .finance-bid-radio {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      .radio-container {
        height: 36px;
        padding: 4px;
        border-radius: 4px;
        background-color: #f2f3f5;
        cursor: pointer;
        .radio-container-content {
            height: 100%;
            display: flex;
            .radio-container-content-text {
                font-weight: 600;
                padding: 0px 24px 0px 24px;
                color: #68717f;
                display: flex;
                align-items: center;
            }
        }
      }
    }
    .table-container {
        height: 600px;
        width: 100%;
        background-color: #fff;
        padding: 16px;
        margin-top: 20px;
    }
  }
  </style>

