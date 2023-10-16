<template>
  <div class="search-wrap show-flex-box-c">
    <el-card class="search-input">
      <div class="input-box show-flex-box-r">
        <el-input placeholder="主体名称/服务名称/服务代码..." v-model="searchKeyword" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="onSearch">
            搜索
          </el-button>
        </el-input>
      </div>
    </el-card>
    <el-card class="history-box">
      <div class="title show-flex-box-r">
        <h2>历史</h2>
        <el-button v-if="historyList && historyList.length > 0" 
                   type="danger" 
                   size="mini" 
                   icon="el-icon-delete"
                   @click="onHandleHistoryTag('clear')">
        </el-button>
      </div>
      <div v-if="historyList && historyList.length > 0" class="history-list">
        <el-tag v-for="(tag,index) in historyList"
                :key="index"
                closable
                :type="'info'"
                @click="onHandleHistoryTag('click',tag)"
                @close="onHandleHistoryTag('delete',tag)">
          {{index + 1}}.{{tag.name}}
        </el-tag>
      </div>
      <div v-else class="history-placeholder show-flex-box-r show-flex-center">
        <span>暂无搜索历史</span>
      </div>
    </el-card>
    <el-card class="result-box show-flex-box-c">
      <div class="title">
        <h2>结果</h2>
      </div>
      <div class="result-box">
        <div v-if="resultList && resultList.length > 0" class="list-box">
          <el-row :gutter="20" 
                  v-for="(item,index) in resultList"
                  :key="index"
                  class="list-row show-flex-box-r"
                  @click.native="toCompantyDetail(item)">
            <el-col :span="6"><span class="row-col-item hide-line1 code">{{ item.stockCode }}</span></el-col>
            <el-col :span="8"><span class="row-col-item hide-line1 name">{{ item.stockShortName }}</span></el-col>
            <el-col :span="4"><span class="row-col-item hide-line1">{{ item.industryName }}</span></el-col>
            <el-col :span="6"><span class="row-col-item hide-line1">{{ item.plateName }}</span></el-col>
          </el-row>
        </div>
        <div v-else class="placeholder-box show-flex-box-r show-flex-center">
          <el-empty :image="placeholderImage"
                    :image-size="150"
                    description="暂无相关搜索">
          </el-empty>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

import { getSearchHistory, setSearchHistory, removeSearchHistory } from '@/utils/auth';

import emptyImage from '@/assets/images/search/search_empty.png';

export default {
  name: "Search",
  components: {
    
  },
  data() {
    return {
      searchKeyword: '',
      canSaveHistoryCount: 20,
      historyList: [],
      resultList: [
        {
            "stockCode": "000001.SZ",
            "stockShortName": "平安银行",
            "industryName": "银行",
            "plateName": "深股通,融资融券",
            "shortTermFiveLevelClassification": "SR1",
            "shortTermDurationDays": 392,
            "conversionRate": 0.7,
            "longTermFiveLevelClassification": "LR1",
            "longTermDurationDays": 392,
            "stockPledgeRate": 0.45,
            "financingObjectInOutState": null,
            "marginLendingSubjectInOutState": "调出",
            "offsetMarginSecuritiesInOutState": null
        },
        {
            "stockCode": "000001.SZ",
            "stockShortName": "平安银行平安银行平安银行平安银行平安银行平安银行平安银行",
            "industryName": "银行",
            "plateName": "深股通,融资融券",
            "shortTermFiveLevelClassification": "SR1",
            "shortTermDurationDays": 392,
            "conversionRate": 0.7,
            "longTermFiveLevelClassification": "LR1",
            "longTermDurationDays": 392,
            "stockPledgeRate": 0.45,
            "financingObjectInOutState": null,
            "marginLendingSubjectInOutState": "调出",
            "offsetMarginSecuritiesInOutState": null
        },
        {
            "stockCode": "000001.SZ",
            "stockShortName": "平安银行",
            "industryName": "银行",
            "plateName": "深股通,融资融券",
            "shortTermFiveLevelClassification": "SR1",
            "shortTermDurationDays": 392,
            "conversionRate": 0.7,
            "longTermFiveLevelClassification": "LR1",
            "longTermDurationDays": 392,
            "stockPledgeRate": 0.45,
            "financingObjectInOutState": null,
            "marginLendingSubjectInOutState": "调出",
            "offsetMarginSecuritiesInOutState": null
        }
      ],
      placeholderImage: emptyImage
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userinfo;
    }
  },
  watch: {

  },
  mounted() {
    this.getShowHistoryList();
  },
  methods: {
    // 搜索 start
    onSearch() {
      if (!this.searchKeyword) {
        return;
      }

      this.setHistoryListByUserId(this.searchKeyword);
      this.toSearch();
    },
    toSearch() {
      console.log("---去搜索---");
    },
    toCompantyDetail(data) {
      this.$router.push({
        path: '/risk-home/individual-stocks/risk-fluctuation' 
      })
    },
    // 搜索 end
    // 历史记录 start
    onHandleHistoryTag(type,tag) {
      const tagName = tag ? tag.name : '';

      switch (type) {
        case 'click':
          this.searchKeyword = tagName;
          this.toSearch();
        break;
        case 'delete':
          this.setHistoryListByUserId(tagName,true);
        break;
        case 'clear':
          this.clearHistoryById();
        break;
      }
    },
    getShowHistoryList() {
      this.historyList = this.getHistoryListByUserId();
    },
    getHistoryListByUserId() {
      const historyMap = getSearchHistory() || {};
      const userId = this.userInfo.id;
      const userHistory = historyMap[userId];

      return userHistory || [];
    },
    setHistoryListByUserId(keyword,isDelete) {
      if (!keyword) {
        return;
      }

      const historyMap = getSearchHistory() || {};
      const userId = this.userInfo.id;
      const userHistory = this.getHistoryListByUserId();
      const searchKeyword = keyword.trim();
      const count = this.canSaveHistoryCount;
      let list = [];

      userHistory.forEach((item,index) => {
        if (item.name != searchKeyword) {
          list.push(item);
        }
      });

      if (!isDelete) {
        list.unshift({name: searchKeyword,time: new Date().getTime()});
      }

      list = list.length > count ? list.splice(0,count) : list;

      this.historyList = list;
      historyMap[userId] = list;
      setSearchHistory(historyMap);
    },
    clearHistoryById() {
      const historyMap = getSearchHistory();
      const userId = this.userInfo.id;

      delete historyMap[userId];
      setSearchHistory(historyMap);

      this.getShowHistoryList();
    },
    // 历史记录 end
  }
};
</script>

<style lang="scss" scoped>
  $cardMarginTop: 15px;
  .search-wrap {
    overflow: hidden;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    .title {
      &>h2 {
        font-size: 18px;
        font-weight: normal;
      }
    }
    .search-input {
      .input-box {
        // width: 60%;
      }
    }
    .history-box {
      flex-shrink: 0;
      margin-top: $cardMarginTop;
      .title {
        justify-content: space-between;
      }
      .history-list {
        margin-top: 15px;
        margin-right: -5px;
        margin-bottom: -5px;
        .el-tag {
          margin-right: 5px;
          margin-bottom: 5px;
          cursor: pointer;
        }
      }
      .history-placeholder {
        &>span  {
          font-size: 14px;
          color: #909399;
        }
      }
    }
    .result-box {
      flex-grow: 1;
      height: 0;
      margin-top: $cardMarginTop;
      overflow-y: scroll;
      overflow-x: hidden;
      &>.list-box {
        .list-row {
          font-size: 14px;
          height: 35px;
          align-items: center;
          border-bottom: 1px solid #efefef;
          cursor: pointer;
          .row-col-item {
            display: block;
          }
          .code,.name {
            color: #1065A0;
          }
          &:hover {
            background: #efefef;
          }
          &:active {
            color: #fff;
            background: #1065A0;
            .code,.name {
              color: #fff;
            }
          }
        }
      }
      .placeholder-box {
        
      }
    }
  }
</style>
<style lang="scss">
  .result-box {
    .el-card__body {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
</style>
