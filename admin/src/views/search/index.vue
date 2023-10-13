<template>
  <div class="search-wrap show-flex-box-c">
    <el-card class="search-input">
      <div class="input-box show-flex-box-r">
        <el-input placeholder="请输入内容" v-model="searchKeyword" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="onSearch">
            搜索
          </el-button>
        </el-input>
      </div>
    </el-card>
    <el-card class="history-box">
      <div class="title show-flex-box-r">
        <h2>历史</h2>
        <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
      </div>
      <div class="history-list">
        <el-tag v-for="(tag,index) in historyList"
                :key="index"
                closable
                :type="'info'"
                @click="onHandleHistoryTag('click',tag)"
                @close="onHandleHistoryTag('delete',tag)">
          {{tag.name}}
        </el-tag>
      </div>
    </el-card>
    <el-card class="result-box show-flex-box-c">
      <div class="title">
        <h2>结果</h2>
      </div>
      <div class="result-box">
        <div v-if="resultList && resultList.length > 0" class="list-box">

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

import emptyImage from '@/assets/images/search/search_empty.png';

export default {
  name: "Search",
  components: {
    
  },
  data() {
    return {
      searchKeyword: '',
      historyList: [
        {name: '万科'},
        {name: '紫光国微002'},
        {name: '国华网安'},
      ],
      resultList: [],
      placeholderImage: emptyImage
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    onSearch() {
      if (!this.searchKeyword) {
        return;
      }

      this.historyList.unshift({
        name: this.searchKeyword
      })
      console.log(this.searchKeyword);
    },
    // 历史记录 start
    onHandleHistoryTag(type,tag) {
      console.log(tag);
      switch (type) {
        case 'click':
          
        break;
        case 'delete':
        
        break;
      }
    },
    recordHistory(keyword) {

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
        width: 60%;
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
        }
      }
    }
    .result-box {
      flex-grow: 1;
      height: 0;
      margin-top: $cardMarginTop;
      .result-box {
        flex-grow: 1;
        overflow-y: scroll;
        .placeholder-box {
          
        }
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
