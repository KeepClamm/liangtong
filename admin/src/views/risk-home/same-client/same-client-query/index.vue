<template>
    <div class="box-container">
      <div class="search-top">
        <div class="search-top-row">
          <div
            class="search-top-item"
            v-for="item in checkBoxOptions"
            :key="item.bindValue"
          >
            <div class="search-top-row-label">{{ item.label }}</div>
            <div class="search-top-row-checkbox">
              <el-checkbox-group v-model="configObj[item.bindValue]">
                <el-checkbox
                  :label="option.label"
                  v-for="option in item.options"
                  :key="option.label"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="search-top-item">
            <div class="search-top-row-label">违约或黑名单标识：</div>
            <div class="search-top-row-checkbox">
              <el-radio v-model="radio" label="1">是</el-radio>
              <el-radio v-model="radio" label="2">否</el-radio>
            </div>
          </div>
          <div class="search-top-item">
            <div class="search-top-row-label">授信限额（万）：</div>
            <div class="search-top-row-checkbox" style="width: 200px">
              <el-slider v-model="value1" :min="0" :max="10000"></el-slider>
            </div>
          </div>
          <div class="search-top-item">
            <div class="search-top-row-label">公司搜索：</div>
            <div class="search-top-row-checkbox">
              <el-input
                v-model="searchVal"
                placeholder="公司名称/客户编号"
                size="mini"
              ></el-input>
            </div>
          </div>
          <div class="search-top-item">
            <div class="search-button" @click="showFlag = false">查询</div>
            <div class="search-button button-color" @click="showFlag = true">重置</div>
            <div class="search-button button-color">导出</div>
          </div>
        </div>
      </div>
      <div class="main-box">
        <principal-risks></principal-risks>
      </div>
    </div>
  </template>
  
  <script>
  import { jumpStockDetail } from '@/utils';
  import numberOfClients from '../component/number-of-clients.vue';
  import PrincipalRisks from '../component/principal-risks.vue';
  import { checkBoxOptions } from "../mainConfig";
  export default {
    components: { numberOfClients, PrincipalRisks },
    data() {
      return {
        radio: "",
        showFlag: true,
        searchVal: "",
        checkBoxOptions: [],
        value1: 100,
        configObj: {
          broadCategory: [],
          smallCategory: [],
          businessScope: [],
          natureClient: [],
          warnLevel: [],
        },
      };
    },
    created() {
      this.checkBoxOptions = checkBoxOptions || [];
    },
  };
  </script>
  
  <style lang="scss" scoped>
  div {
    box-sizing: border-box;
  }
  .button-color {
    background-color: #E5E6EB !important;
    color: #012169 !important;
  }
  .search-button {
    padding: 6px 20px;
    font-size: 14px;
    background-color: #012169;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 8px;
  }
  .box-container {
    width: 100%;
    height: 100%;
    padding: 12px 12px 0px 12px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .search-top {
      width: 100%;
      padding: 20px 24px 0px 24px;
      background-color: #fff;
      .search-top-row {
        display: flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        .search-top-item {
          display: flex;
          margin-right: 80px;
          margin-bottom: 30px;
          align-items: center;
          .search-top-row-label {
            margin-right: 10px;
            font-weight: 700;
            color: #606266;
            font-size: 14px;
            white-space: nowrap;
          }
        }
      }
    }
    .main-box {
      flex: 1;
    }
  }
  </style>
  