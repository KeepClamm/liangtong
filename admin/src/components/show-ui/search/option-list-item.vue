<template>
  <div class="option-list-item-comp show-flex-box-r">
    <ol class="search-option-list show-flex-box-r" v-if="item.type != 'timePicker'">
      <li
        :class="{'selected': checkIsSelectedAll(item.options)}"
        @click="!checkIsSelectedAll(item.options) && chooseAllType(item, index)"
      >
        <strong>全部</strong>
      </li>
      <li
        v-for="(subItem, subIndex) in item.options"
        :class="{'selected': subItem.selected}"
        :key="subIndex"
        @click="chooseItem(index, subIndex, item, subItem)"
      >
        <strong>{{subItem.name}}</strong>
      </li>
    </ol>
    <div v-if="item.type == 'timePicker'" class="fs-0 time-picker-bar">
      <el-date-picker
        style="width: 200px;"
        type="date"
        placeholder="请选择预警日期"
        v-model="choosedTime"
        :editable="false"
        size="small"
        clearable
        format="yyyy-MM-dd"
        value-format="timestamp"
        @change="changeChoosedTime"
      ></el-date-picker>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "option-list-item-comp",
  props: {
    isExpand: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      require: true
    }
  },
  methods: {
    // 是否是选中全部
    checkIsSelectedAll(options = [], returnList = false){
      let list = options || [];
      
      let result = list.filter(item => {
        return item.selected;
      });

      return returnList ? result : result.length == 0;
    },
    // 选择全部的这一分类选项
    chooseAllType(item, index){
      this.$emit('chooseAllType', item, index)
    },
    // 选中某一个选项
    chooseItem(index, subIndex, item, subItem){
      this.$emit('choseItem', index, subIndex, item, subItem)
    },
  }
};
</script>

<style lang="scss" scoped>
.option-list-item-comp {
  .search-option-list {
    // width: 0;
    flex-grow: 1;
    flex-wrap: wrap;
    transition: all 0.3s linear;
    > li {
      display: flex;
      margin-bottom: 16px;
      margin-right: 24px;
      > strong {
        cursor: pointer;
        box-sizing: border-box;
        white-space: nowrap;
        border: 1px solid #c9cdd4;
        border-radius: 2px;
        padding: 3px 12px;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #4e5969;
      }
    }
    > .selected {
      > strong {
        border: 1px solid transparent;
        background: #00a3e0;
        color: #ffffff;
      }
    }
  }
  .time-picker-bar ::v-deep .el-input__prefix{
    left: unset;
    top: 9px;
    right: 9px;
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/cockpit-risk/date-picker-icon.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .time-picker-bar ::v-deep .el-input__suffix{
    right: 24px;
  }
  .time-picker-bar ::v-deep .el-icon-date:before{
    content: '';
  }
  .time-picker-bar ::v-deep .el-input__inner{
    border: 1px solid #E5E6EB;
    background-color: #F8F9FB;
    border-radius: 0px;
    padding-left: 12px;
    padding-right: 0px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #86909C;
  }
}
</style>