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
      <div class="component-header-buttons-item button-color" @click="handleExport">导出</div>
    </div>
    <div class="table-container">
      <!-- 表格 -->
      <el-table tooltip-effect="dark" style="width: 100%" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" border>
        <template v-for="item in tableRow">
          <el-table-column v-if="item.prop !== 'test06' && item.prop !== 'test07'" :key="item.label" :prop="item.prop" :label="item.label" />
          <el-table-column v-if="item.prop == 'test06'" :key="item.label" :prop="item.prop" :label="item.label" sortable :filters="getfilterNameItem()" column-key="filterTag" :filter-method="filterChange">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right" content="测试测试测111试">
                <div slot="reference">
                  <span>{{ scope.row['test06'] }}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column v-if="item.prop == 'test07'" :key="item.label" :prop="item.prop" :label="item.label" sortable>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right" content="312321321">
                <div slot="reference">
                  <span>{{ scope.row['test07'] }}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <!-- 分页 -->
      <div class="page-container">
        <!-- <el-pagination :current-page="page" :page-size="limit" :total="total" layout="total,->,sizes, prev, pager, next, jumper" @size-change="handleLimitChange" @current-change="handlePageChange" /> -->
          <pagination class="mt-24" :total="10" :current-page="1" :cur-limit="10" :showRecods="1"></pagination>
      </div>
    </div>

  </div>
</template>

<script>
import pagination from '@/components/show-ui/table/pagination-comp.vue'
export default {

  components: {
    pagination
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
      tableData: [
        { 'test01': '000001', 'test02': '平安银行', 'test03': '主板', 'test04': '审批制', 'test06': 6, 'test07': 6 },
        { 'test01': '000002', 'test02': '平安银行', 'test03': '主板2', 'test04': '审批制', 'test06': 2, 'test07': 1 },
        { 'test01': '000003', 'test02': '平安银行', 'test03': '主板3', 'test04': '审批制', 'test06': 40, 'test07': 16 },
        { 'test01': '000004', 'test02': '平安银行', 'test03': '主板4', 'test04': '审批制', 'test06': 20, 'test07': 3 },
        { 'test01': '000001', 'test02': '平安银行', 'test03': '主板5', 'test04': '审批制', 'test06': 11, 'test07': 45 }
      ],
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
    // 表格的筛选
    getfilterNameItem() {
      const filterArr = [
        { text: '10', value: 10 },
        { text: '6', value: 6 },
        { text: '1', value: 1 },
        { text: '20', value: 20 }
      ]
      return filterArr
    },
    // 表格筛选结果
    filterChange(value, row, column) {
      const property = column['property']
      return row[property] === value
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
      console.log('tableRow', that.tableRow)
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
  ::v-deep .el-input--medium .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
  ::v-deep .el-input__icon {
    line-height: inherit;
  }

  ::v-deep .el-select>.el-input {
    width: 120px;
  }
  ::v-deep .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 200px;
  }
  .component-header-buttons-item {
      padding: 6px 20px;
      font-size: 14px;
      background-color: #012169;
      color: #fff;
      border-radius: 3px;
      cursor: pointer;
      margin-right: 8px;
  }
  .export-button-color {
    background-color: #0f58d5;
  }
  .peer-comparison-wrap {
    width: 100%;
    height: 100%;
    padding: 24px 20px;
    background-color: #fff;
    .finance-bid-select-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .select-top-flex-box {
      display: flex;
      align-items: center;
        .margin-20 {
          margin-right: 20px;
          min-width: 60px;
        }
      }
    }
    .finance-bid-radio {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
                white-space: nowrap;
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
        // padding: 16px;
        margin-top: 20px;
    }
    .page-container {
      margin-top: 20px;
    }
  }
  </style>

