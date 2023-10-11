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
          <el-descriptions-item label="交易市场">
            <el-select v-model="fiveClassifyVal">
              <el-option v-for="item in fiveClassifyOpt" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="融资/担保状态">
            <el-select v-model="fiveClassifyVal">
              <el-option v-for="item in fiveClassifyOpt" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="标的范围">
            <div class="range-input">
              <el-input v-model="codeVal" placeholder="下限" />
              <div style="margin: 0px 4px">~</div>
              <el-input v-model="codeVal" placeholder="上限" />
            </div>
          </el-descriptions-item>
          <el-descriptions-item :label="labelObj.originlvLabel">
            <el-select v-model="financeStatusVal">
              <el-option v-for="item in financeStatusOpts" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item :label="labelObj.newlvLabel">
            <el-select v-model="financeStatusVal">
              <el-option v-for="item in financeStatusOpts" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="原始折算率">
            <div class="range-input">
              <el-input v-model="codeVal" placeholder="下限" />
              <div style="margin: 0px 4px">~</div>
              <el-input v-model="codeVal" placeholder="上限" />
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="德勤折算率">
            <div class="range-input">
              <el-input v-model="codeVal" placeholder="下限" />
              <div style="margin: 0px 4px">~</div>
              <el-input v-model="codeVal" placeholder="上限" />
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div class="component-table">
      <el-table tooltip-effect="dark" style="width: 100%" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" border>
        <el-table-column prop="test01" label="序号" />
        <el-table-column prop="test02" label="交易市场" />
        <el-table-column prop="test03" label="证券代码" />
        <el-table-column :label="columnName.zuorifanwei ? '较昨日标的范围变动' : '标的范围' ">
          <el-table-column prop="test04" label="证券名称" />
          <el-table-column prop="test05" label="融资标的证券" />
          <el-table-column prop="test06" label="融券标的证券" />
          <el-table-column prop="test07" label="可冲抵保证金券" />
        </el-table-column>
        <el-table-column v-if="columnName.jizhongdubiandong" label="集中度变动">
          <el-table-column prop="test08" :label="columnName.jizhongdubiandong.yuanshipingji" />
          <el-table-column prop="test09" :label="columnName.jizhongdubiandong.dangqianmoxing" />
          <el-table-column prop="test10" :label="columnName.jizhongdubiandong.biandongyuanyin" />
        </el-table-column>
        <el-table-column v-if="columnName.jizhongdu" label="集中度">
          <el-table-column prop="test08" :label="columnName.jizhongdu.tiaozhengqian" />
          <el-table-column prop="test09" :label="columnName.jizhongdu.tiaozhenghou" />
          <el-table-column prop="test10" :label="columnName.jizhongdu.biandong" />
        </el-table-column>
        <el-table-column v-if="columnName.zhesuanlv" label="折算率变动">
          <el-table-column prop="test11" :label="columnName.zhesuanlv.yuanshi" />
          <el-table-column prop="test12" :label="columnName.zhesuanlv.deqin" />
          <el-table-column prop="test13" :label="columnName.zhesuanlv.yuanyin" />
          <el-table-column label="操作">
            <template>
              <el-button type="text">加自选</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-if="columnName.zhesuan" label="折算率">
          <el-table-column prop="test11" :label="columnName.zhesuan.tiaozhengqian" />
          <el-table-column prop="test12" :label="columnName.zhesuan.tiaozhenghou" />
          <el-table-column prop="test13" :label="columnName.zhesuan.biandong" />
        </el-table-column>
        <el-table-column v-if="columnName.reason" :label="columnName.reason" />
        <el-table-column v-if="columnName.date" :label="columnName.date" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Template',
  components: {

  },
  props: {
    labelObj: {
      type: Object,
      required: true,
      default: () => { ({}) }
    },
    columnName: {
      type: Object,
      required: true,
      default: () => { ({}) }
    }
    // tableRow: {
    //   type: Array,
    //   required: true,
    //   default: () => { ([]) }
    // }
  },
  data() {
    return {
      codeVal: '', // 证券代码/名称
      fiveClassifyVal: '', // 五级分类
      financeStatusVal: '', // 融资状态
      tableData: [{
        'test01': 1
      }],
      tableRow: [
        {
          label: '序号',
          prop: 'test01'
        },
        {
          label: '交易市场',
          prop: 'test02'
        },
        {
          label: '证券代码',
          prop: 'test03'
        }
      ],
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
      ],
      tradeFloorVal: '',
      listOfAdjustments: {}
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
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
  ::v-deep .el-input--medium .el-input__inner {
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
              .desc-label {
                text-align: justify;
                text-align-last: justify;
                display: inline-block;
                width: 200px;
                background-color: pink;
              }
          }
      }
      .component-table {
          margin-top: 30px;
      }
  }
  </style>

