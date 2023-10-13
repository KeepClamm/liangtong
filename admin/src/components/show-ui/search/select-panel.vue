<template>
  <div>
    <div class="br-2 search-bar-comp-box show-flex-box-c" :class="{'is-expanded': isExpand}">
      <dt class="collapse simple-search-bar show-flex-box-r p-20 pb-0 normal-bg">
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
                <span v-if="item.type == 'self'" class="expand-btn-bar">添加</span>
                <div v-if="item.showBtn" class="expand-btn-bar" :class="{ 'mr-20': index == 0 && !isExpand }">
                  <span v-if="item.isExpand" @click="changeClasslyItemExpandStatus(false, index)">收起</span>
                  <span v-else @click="changeClasslyItemExpandStatus(true, index)">展开</span>
                </div>

                <div class="search-btns" v-if="index == 0 && !isExpand">
                  <search-bar @sendInfoOutside="handleSearch"></search-bar>
                </div>
              </div>
            </option-list-item>
          </li>
        </ul>

        <div class="search-btns mb-20" v-show="isExpand">
          <search-bar @sendInfoOutside="handleSearch"></search-bar>
        </div>

        <div class="expand-btn" @click="changeExpandStatus()">
          <img :src="expandIconUrl" >
        </div>
      </dt>

      <selected-tags :selectedList="selectedList" @remove="removeChoosedTag" class="mt-30"></selected-tags>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import '@/../static/js/jquery.actual.js';
const expandIconUrl = require('@/assets/images/cockpit-risk/expand-icon.png');
import CommonUtils from '@/utils/commonUtils';
import OptionListItem from './option-list-item.vue';
import SelectedTags from './selected-tags.vue';
import SearchBar from './search-bar.vue';
export default {
  props: {
    showList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      expandIconUrl,
      isExpand: false,
      searchList: [],
      selectedList: [],
      choosedTime: '',
      classlyItemHeightList: [],

    };
  },
  components: {
    SearchBar,
    SelectedTags,
    OptionListItem
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
  },
  watch: {
    showList(){
      this.setShowSearchList();
    },
    sidebar: {
      handler(newName, oldName) {
        this.windowResizeToResetCheck();
      },
      deep: true
    }
  },
  mounted() {
    window.onresize = () => {
      this.windowResizeToResetCheck();
    };

    this.setShowSearchList();
  },
  methods: {
    windowResizeToResetCheck(){
      setTimeout(() => {
        this.resetCheck();
      }, 300);
    },
    resetCheck(){
      $(`.simple-search-bar > ul > li`).each(function(i){
        let olDom = `.simple-search-bar > ul > li:eq(${i}) > .option-list-item-comp > .search-option-list`;
        $(olDom).css('max-height', 'unset');
        $(olDom).css('overflow-y', 'unset');
      });

      this.setCheckItemHeightIsOver();
    },
    setShowSearchList(notCheck){
      let circulationList = [];

      if (notCheck) {
        circulationList = this.searchList;
      } else {
        circulationList = this.showList;
      }

      let list = circulationList.map(item => {
        let options = item.options || [];

        let newOptions = options.map(subItem => {
          return Object.assign(subItem, { selected: false });
        });

        const obj = {
          ...item,
          showBtn: item.showBtn || false,
          isExpand: item.isExpand || false,
        };

        obj.options = newOptions;

        return obj;
      });

      this.searchList = list;

      if (!notCheck) {
        this.setCheckItemHeightIsOver();
      }
    },
    // 检查是否要显示'展开'或'收起'按钮栏
    setCheckItemHeightIsOver(){
      let list = JSON.parse(JSON.stringify(this.searchList));
      const _this = this;
      _this.classlyItemHeightList = [];
      
      this.$nextTick(()=>{
        $(`.simple-search-bar > ul > li`).each(function(i){
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
    // 展开和收起所有筛选栏
    changeExpandStatus(){
      $(`.simple-search-bar > ul > li`).each(function(i){
        let olDom = `.simple-search-bar > ul > li:eq(${i}) > .option-list-item-comp > .search-option-list`;
        $(olDom).css('max-height', 'unset');
        $(olDom).css('overflow-y', 'unset');
      });
      
      this.isExpand = !this.isExpand;
      this.setCheckItemHeightIsOver(true);
    },
    // 点击展开或者收起的按钮
    changeClasslyItemExpandStatus(isExpand, index){
      if (index == 0) {
        if (isExpand) {
          $('.simple-search-bar').css('max-height', this.classlyItemHeightList[0] + 24 + 'px');
        } else {
          $('.simple-search-bar').css('max-height', '64px');
        }
      }

      let curClickLiDom = `.simple-search-bar > ul > li:eq(${index}) > .option-list-item-comp > .search-option-list`;

      if (isExpand) {
        $(curClickLiDom).css('max-height', '800px'); // unset 200px
        $(curClickLiDom).css('overflow-y', 'unset');
      } else {
        $(curClickLiDom).css('max-height', '40px');
        $(curClickLiDom).css('overflow-y', 'hidden');
      }
      
      this.searchList[index].isExpand = isExpand;
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
    // 日期选择器
    changeChoosedTime(){},
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
    // 删除该分类的选项
    deleteThisTypeOptions(type){
      this.selectedList = this.selectedList.filter(item=>{
        return item.type != type;
      })
    },
    // 查询 重置
    handleSearch({ type }){
      if (type == 'search') {
        this.toSearch();
      } else {
        this.toReset();
      }
    },
    // 查询
    toSearch(){
      let params = {};

      let list = this.searchList;
      
      list.forEach(item => {
        let options = item.options || [];
        let selectedOptions = this.checkIsSelectedAll(options, true); // 是否有选中改分类的项
        if (selectedOptions.length > 0) {
          let ids = CommonUtils.getIdsFromList(selectedOptions, item.field || 'id');
          params[item.type] = ids;
        }
      });

      if (this.choosedTime) {
        params.warningDate = this.choosedTime;
      }

      this.sendInfoOutside(params);
    },
    // 重置
    toReset(){
      this.setShowSearchList(true);
      this.resetCheck();
      this.choosedTime = '';
      this.selectedList = [];
      this.sendInfoOutside({});
    },
    sendInfoOutside(info = {}){
      this.$emit('handle-search', info);
    }
  },
}
</script>

<style lang='scss' scoped>
  .search-bar-comp-box{
    .simple-search-bar{
      position: relative;
      max-height: 64px;
      transition: all 0.3s linear;
      > ul{
        > li{
          // display: none;
          visibility: hidden;
          opacity: 0;
          transition: all 0.3s linear;
          > .time-picker-title{
            line-height: 32px;
            height: 32px;
          }
        }
        > li:first-child{
          // display: flex;
          visibility: visible;
          opacity: 1;
        }
      }
      .expand-btn{
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        position: absolute;
        bottom: -18px;
        left: 50%;
        width: 100px;
        height: 18px;
        background: url('../../../assets/images/cockpit-risk/expand-bg-icon.png') center center no-repeat;
        background-size: 100% 100%;
        > img{
          width: 10px;
          height: 12px;
          transition: all ease-in-out 0.3s;
          transform: rotate(0deg);
          user-select:none;
        }
      }
    }
  }

  .is-expanded{
    .simple-search-bar{
      flex-direction: column;
      max-height: 3000px !important;
      > ul{
        > li{
          // display: flex;
          visibility: visible;
          opacity: 1;
        }
      }
    }
    > .simple-search-bar{
      > .expand-btn{
        > img{
          transform: rotate(180deg);
        }
      }
    }
  }

  .title{
    width: 130px;
    flex-shrink: 0;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    height: 24px;
    color: #3E3E3E;
  }

  .search-btns{
    .search-form-comp-box {
      padding: 0 10px 0 0 !important;
    }
  }

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
  
</style>