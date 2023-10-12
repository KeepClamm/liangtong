<template>
  <div class="component-container">
    <div class="component-header">
      <div class="component-header-desc">
        <div class="component-header-title">{{ adjustLabel.title }}</div>
        <div class="component-header-buttons">
          <template v-if="adjustLabel.adjustStatus">
            <div class="component-header-buttons-item" @click="openAdjustDialog">
              单只标的调整
            </div>
            <div class="component-header-buttons-item button-color" @click="openMutAdjustDialog">
              批量调整
            </div>
          </template>
          <template v-if="adjustQuery">
            <div class="component-header-buttons-item button-color">
              导出
            </div>
          </template>
        </div>  
      </div>
      <div class="select-container">
        <template v-for="(val, key, index) in globalConfig">
          <div class="select-item" :key="index">
          <div class="select-container-label">
            {{val.label}}:
          </div>
          <div class="select-container-options">
            <template v-if="val.type == 'input'">
                <el-input v-model="selectVal[val.valName]" :placeholder="val.placeHolder" @change="handleChange"/>
            </template>
            <template v-if="val.type == 'select'">
              <el-select v-model="selectVal[val.valName]" @change="handleChange">
                <el-option v-for="item in val.selectOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </template>
            <template v-if="val.type == 'selectMut'">
              <el-select v-model="selectVal[val.valName]" multiple collapse-tags class="tags-select-input" @change="handleChange">
                <el-option v-for="item in val.selectOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </template>
            <template v-if="val.type == 'date'">
                <el-date-picker v-model="selectVal[val.valName]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
            </template>
          </div>
        </div>
        </template>
      </div>
    </div>
    <adjust-dialog ref="adjustDialog"></adjust-dialog>
    <adjust-mutdialog ref="adjustMutDialog"></adjust-mutdialog>
  </div>
</template>

<script>
import adjustDialog from './adjust-dialog.vue'
import AdjustMutdialog from './adjust-mutdialog.vue'
export default {
  components: { adjustDialog, AdjustMutdialog },
  name: 'Template',
  props: {
    adjustLabel: {
      type: Object,
      require: true,
      default: () => { ({}) }
    },
    adjustQuery: {
      type: Boolean
    },
    globalConfig: {
      type: Object,
      require: true,
      default: () => { ({}) }
    },
    passReject: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      testObj: {},
      selectVal: { // 筛选条件的所有值
        tradeFloorVal: 1, // 交易市场
        stockCodeVal: '', // 证券名称
        currentSubjectTypeVal: [], // 当前标的类型
        adjustmentItemVal: [], // 调整项
        adjustTimeVal: '', // 调整时间
        adjustmentStatuVal: '', //调整状态
      }
    }
  },
  computed: {

  },
  created() {
  },
  watch: {

  },
  methods: {
    rowClass({ row, rowIndex }) {
      return 'text-align: center;background: #f8f9fb;color: #86909c;height:48px'
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return 'text-align: center;height: 60px;'
    },
    handleChange() {
    },
    // 单只标的调整
    openAdjustDialog() {
      this.$refs.adjustDialog.open()
    },
    // 批量调整
    openMutAdjustDialog() {
      this.$refs.adjustMutDialog.open()
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
    ::v-deep .tags-select-input .el-select__tags {
        height: 28px;
        white-space: nowrap;
        overflow: hidden;
        flex-wrap: nowrap;
    }
    ::v-deep .tags-select-input .el-select__tags-text {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    ::v-deep .tags-select-input .el-input--medium .el-input__inner {
        width: 180px;
        height: 28px;
        line-height: 28px;
    }
    ::v-deep .el-range-editor--medium.el-input__inner {
        height: 28px;
    }
    ::v-deep .el-range-editor i.el-input__icon.el-range__icon.el-icon-date {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    ::v-deep .el-range-editor span.el-range-separator{
       line-height: 20px !important;
    }
    div {
        box-sizing: border-box;
    }
    .button-color {
        background-color: #E5E6EB !important;
        color: #012169 !important;
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
                .passAndReject {
                  display: flex;
                  margin-top: 10px;
                }
            }
            .select-container {
              margin-top: 36px;
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              .select-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-right: 36px;
                margin-bottom: 16px;
                .select-container-label {
                  color: #606266;
                  font-size: 14px;
                  white-space: nowrap;
                  margin-right: 10px;
                }
              }
            }
        }
    }
    </style>

