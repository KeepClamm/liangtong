<template>
  <div class="component-container">
    <div class="component-header">
      <div class="component-header-desc">
        <div class="component-header-title">{{ labelObj.title }}</div>
        <div class="component-header-buttons">
          <div class="component-header-buttons-item">
            查询
          </div>
          <div class="component-header-buttons-item button-color">
            重置
          </div>
          <div class="component-header-buttons-item button-color">
            导出
          </div>
        </div>
      </div>
      <div class="component-select">
        <el-descriptions>
          <el-descriptions-item label="证券代码/名称">
            <el-input v-model="codeVal" placeholder="请输入代码/名称" />
          </el-descriptions-item>
          <el-descriptions-item label="五级分类">
            <el-select v-model="fiveClassifyVal">
              <el-option v-for="item in fiveClassifyOpt" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item :label="labelObj.rangeTitle">
            <div class="range-input">
              <el-input v-model="codeVal" placeholder="下限" />
              <div style="margin: 0px 4px">~</div>
              <el-input v-model="codeVal" placeholder="上限" />
            </div>
          </el-descriptions-item>
          <el-descriptions-item :label="labelObj.rangeOtherTitle">
            <div class="range-input">
              <el-input v-model="codeVal" placeholder="下限" />
              <div style="margin: 0px 4px">~</div>
              <el-input v-model="codeVal" placeholder="上限" />
            </div>
          </el-descriptions-item>
          <el-descriptions-item :label="labelObj.statusTitle">
            <el-select v-model="financeStatusVal">
              <el-option v-for="item in financeStatusOpts" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-descriptions-item>
        </el-descriptions>
      </div>   
    <div class="component-table">
      <el-table tooltip-effect="dark" style="width: 100%" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" border>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <template v-for="item in tableRow">
          <el-table-column
            :key="item.label"
            :prop="item.prop"
            :label="item.label
            "
          />
        </template>
      </el-table>
    </div>
    <pagination class="mt-24" :total="10" :current-page="1" :cur-limit="10" :showRecods="1"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/show-ui/table/pagination-comp.vue'
export default {
  name: 'Template',
  components: {
    pagination
  },
  props: {
    labelObj: {
      type: Object,
      required: true,
      default: () => { ({}) }
    },
    tableRow: {
      type: Array,
      required: true,
      default: () => { ([]) }
    },
    tableData: {
      type: Array,
      default: () => { ([]) }
    }
  },
  data() {
    return {
      codeVal: '', // 证券代码/名称
      fiveClassifyVal: '', // 五级分类
      financeStatusVal: '', // 融资状态
      fiveClassifyOpt: [
        {
          label: 'test01',
          value: 1
        },
        {
          label: 'test02',
          value: 2
        }
      ],
      financeStatusOpts: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '暂停',
          value: 2
        },
        {
          label: '作废',
          value: 3
        }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    rowClass({ row, rowIndex }) {
      return 'text-align: center;background: #f8f9fb;color: #86909c;height:48px'
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return 'text-align: center;height: 60px;'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-descriptions-item__container {
    align-items: center;
}
::v-deep .component-select .el-input--medium .el-input__inner {
    width: 160px;
    height: 28px;
    line-height: 28px;
}
::v-deep .range-input .el-input--medium .el-input__inner {
    width: 60px;
    height: 28px;
    line-height: 28px;
}
::v-deep .el-input__icon {
  line-height: inherit;
}
div {
    box-sizing: border-box;
}
.button-color {
    background-color: #E5E6EB !important;
    color: #012169 !important;
}
.component-container {
    width: 100%;
    .component-header {
        width: 100%;
        padding: 24px 20px;
        background-color: #fff;
        .component-header-desc {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .component-header-title {
                font-weight: 500;
                font-size: 20px;
            }
            .component-header-buttons {
                display: flex;
                .component-header-buttons-item {
                    padding: 6px 20px;
                    font-size: 14px;
                    background-color: #012169;
                    color: #fff;
                    border-radius: 3px;
                    cursor: pointer;
                    margin-right: 8px;
                }
            }
        }
        .component-select {
            margin-top: 30px;
            .range-input {
                display: flex;
                align-items: center;
            }
        }
    }
    .component-table {
        margin-top: 30px;
    }
}
</style>

