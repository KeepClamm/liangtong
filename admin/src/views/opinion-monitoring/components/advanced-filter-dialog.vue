<template>
  <el-dialog
    title="高级筛选"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="close"
  >
  <div class="content">
    <dt class="collapse select-section show-flex-box-r p-20 pb-0 normal-bg">
        <ul class="show-flex-box-c">
          <li
            class="show-flex-box-r"
            v-for="(item, index) in searchList"
            :key="index"
          >
            <span class="title mr-16 white-space" :class="{'time-picker-title': item.type == 'timePicker'}">{{item.title}}</span>
            <option-list-item
              :isExpand="true"
              :item="item"
              :index="index"
              @chooseAllType="chooseAllType"
              @choseItem="chooseThisItem"
            >
            </option-list-item>
          </li>
        </ul>
      </dt>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="handleConfirm">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import _ from "lodash";
import OptionListItem from '@/components/show-ui/search/option-list-item.vue';
export default {
  name: 'add-optional-combination-dialog',
  data() {
    return {
      dialogVisible: false,
      searchList: [
        {
          title: '五级分类',
          type: 'industry',
          options: [
            { id: 1, name: 'SR1', },
            { id: 2, name: 'SR2', },
            { id: 3, name: 'SR3', },
            { id: 4, name: 'SR4', },
            { id: 5, name: 'SR5', },
          ],
        },
        {
          title: '是否新增SR5',
          type: 'radio',
          options: [
            { id: 1, name: '是', },
            { id: 2, name: '否', },
          ],
        },
        {
          title: '是否财务类退市预警',
          type: 'radio',
          options: [
            { id: 1, name: '是', },
            { id: 2, name: '否', },
          ],
        },
        {
          title: '是否交易类退市预警',
          type: 'radio',
          options: [
            { id: 1, name: '是', },
            { id: 2, name: '否', },
          ],
        },
        {
          title: '关注程度',
          type: 'tag',
          options: [
            { id: 1, name: '轻度', },
            { id: 2, name: '中度', },
            { id: 3, name: '高度', },
          ],
        },
        {
          title: '上市板块',
          type: 'tag',
          options: [
            { id: 1, name: '主板', },
            { id: 2, name: '创业板', },
          ],
        },
        {
          title: '上市状态',
          type: 'tag',
          options: [
            { id: 1, name: '正常上市', },
            { id: 2, name: '暂停上市', },
            { id: 3, name: 'ST', },
            { id: 3, name: '*S', },
          ],
        },
        {
          title: '行情跌幅',
          type: 'tag',
          options: [
            { id: 1, name: '跌停', },
            { id: 2, name: '三日连续跌停', },
            { id: 3, name: '三日15%', },
          ],
        },{
          title: '舆情标签',
          type: 'tag',
          options: [
            { id: 1, name: '标签A', },
            { id: 2, name: '标签B', },
            { id: 3, name: '标签C', },
          ],
        },
      ]
    }
  },
  components: {
    OptionListItem
  },
  methods: {
    open(data) {
      this.dialogVisible = true;
      // this.searchList = _.cloneDeep(data);
      // console.log(this.searchList)
    },
    handleConfirm() {

    },
    // 选择全部的这一分类选项
    chooseAllType(item, index){
      let list = item.options || [];
      let newOptions = list.map(item=>{
        return Object.assign(item, { selected: false });
      });

      this.searchList[index].options = newOptions;
    },
    // 选中某一个选项
    chooseThisItem(index, subIndex, item, subItem){
      console.log(index, subIndex, item, subItem)
      const flag = !subItem.selected;
      this.changeThisItemSelectedStatus(index, subIndex, subItem);
    },
    changeThisItemSelectedStatus(index, subIndex, subItem){
      const flag = !subItem.selected;
      this.searchList[index].options[subIndex].selected = flag;

      this.$forceUpdate();
    },
    close() {
      this.dialogVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 400px;
  .select-section {
    .title {
      width: 130px;
    }
  }
}
</style>