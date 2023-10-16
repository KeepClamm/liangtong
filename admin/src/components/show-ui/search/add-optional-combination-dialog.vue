<template>
  <el-dialog
    title="添加自选组合"
    :visible.sync="dialogVisible"
    width="900px"
    :before-close="close"
  >
  <div class="content">
    <el-form :model="form" :rules="rules" inline>
      <el-form-item label="自选组合名称：">
        <el-input v-model="form.name" size="mini" placeholder="请输入组合名称"></el-input>
      </el-form-item>
    </el-form>
    <dt class="collapse select-section show-flex-box-r p-20 pb-0 normal-bg">
        <ul class="show-flex-box-c">
          <li
            class="show-flex-box-r"
            :class="`${isExpand ? 'mb-8' : 'mb-4'} ${item.type == 'timePicker' ? 'mb-24' : ''}`"
            v-for="(item, index) in searchList"
            :key="index"
          >
            <span class="title mr-16 white-space" :class="{'time-picker-title': item.type == 'timePicker'}">{{item.title}}</span>
            <option-list-item
              :isExpand="isExpand"
              :item="item"
              :index="index"
              @chooseAllType="chooseAllType"
              @choseItem="chooseThisItem"
            >
              <div class="handle-bar show-flex-box-r" v-if="item.type != 'timePicker'">
                <div v-if="item.showBtn" class="expand-btn-bar" :class="{ 'mr-20': index == 0 && !isExpand }">
                  <span v-if="item.isExpand" @click="changeClasslyItemExpandStatus(false, index)">收起</span>
                  <span v-else @click="changeClasslyItemExpandStatus(true, index)">展开</span>
                </div>
              </div>
            </option-list-item>
          </li>
        </ul>
      </dt>

      <selected-tags :selectedList="selectedList" @remove="removeChoosedTag" class="mt-30"></selected-tags>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="handleConfirm">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import $ from "jquery";
import _ from "lodash";
import '@/../static/js/jquery.actual.js';
import OptionListItem from './option-list-item.vue';
import SelectedTags from './selected-tags.vue';
export default {
  name: 'add-optional-combination-dialog',
  data() {
    return {
      dialogVisible: false,
      isExpand: false,
      selectedList: [],
      choosedTime: '',
      searchList: [],
      classlyItemHeightList: [],
      form: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入组合名称', trigger: 'blur' }]
      }
    }
  },
  components: {
    SelectedTags,
    OptionListItem
  },
  methods: {
    open(data) {
      this.dialogVisible = true;
      this.searchList = _.cloneDeep(data);
      console.log(this.searchList)
      this.setCheckItemHeightIsOver();
    },
    handleConfirm() {

    },
    setCheckItemHeightIsOver(){
      let list = JSON.parse(JSON.stringify(this.searchList));
      const _this = this;
      _this.classlyItemHeightList = [];
      
      this.$nextTick(()=>{
        $(`.select-section > ul > li`).each(function(i){
          let classlyItemHeight = $(this).actual('height');

          _this.classlyItemHeightList.push(classlyItemHeight);

          if (classlyItemHeight > 40) {
            list[i].showBtn = true;
          } else {
            list[i].showBtn = false;
          }

          _this.changeClasslyItemExpandStatus(list[i].isExpand, i);
        });

        this.searchList = list;
      });
    },
    // 选择全部的这一分类选项
    chooseAllType(item, index){
      let list = item.options || [];
      let newOptions = list.map(item=>{
        return Object.assign(item, { selected: false });
      });

      this.searchList[index].options = newOptions;
      this.deleteThisTypeOptions(item.type);
    },
    // 选中某一个选项
    chooseThisItem(index, subIndex, item, subItem){
      const flag = !subItem.selected;
      this.changeThisItemSelectedStatus(index, subIndex, subItem);
      this.setSelectedItem(flag, item.type, subItem.id, subItem.name);
    },
    changeThisItemSelectedStatus(index, subIndex, subItem){
      const flag = !subItem.selected;
      this.searchList[index].options[subIndex].selected = flag;

      this.$forceUpdate();
    },
    setSelectedItem(isSelected, type, id, name){
      if (isSelected) {
        this.selectedList.push({
          type: type,
          id: id,
          name: name,
        });
      } else {
        let list = this.selectedList;

        let index = list.findIndex(item => {
          return item.type == type && item.id == id;
        });

        this.selectedList.splice(index, 1);
      }
    },
    // 删除已选择项
    removeChoosedTag(tag, index){
      this.selectedList.splice(index, 1);
      
      let list = this.searchList;

      let firstIndex, secondIndex, optionItem;

      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (tag.type == item.type) {
          firstIndex = i;
          const options = item.options || [];
          for (let j = 0; j < options.length; j++) {
            const subItem = options[j];
            if (subItem.id == tag.id) {
              secondIndex = j;
              optionItem = subItem;
              break;
            }
          }
          break;
        }
      }

      this.changeThisItemSelectedStatus(firstIndex, secondIndex, optionItem);
    },
    // 点击展开或者收起的按钮
    changeClasslyItemExpandStatus(isExpand, index){
      let curClickLiDom = `.select-section > ul > li:eq(${index}) > .option-list-item-comp > .search-option-list`;

      if (isExpand) {
        $(curClickLiDom).css('max-height', '800px'); // unset 200px
        $(curClickLiDom).css('overflow-y', 'unset');
      } else {
        $(curClickLiDom).css('max-height', '40px');
        $(curClickLiDom).css('overflow-y', 'hidden');
      }
      
      this.searchList[index].isExpand = isExpand;
    },
    // 删除该分类的选项
    deleteThisTypeOptions(type){
      this.selectedList = this.selectedList.filter(item=>{
        return item.type != type;
      })
    },
    close() {
      this.dialogVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.expand-btn-bar{
  cursor: pointer;
  white-space: nowrap;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  color: #00A3E0;
}
.content {
  height: 500px;
}
</style>