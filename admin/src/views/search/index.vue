<template>
  <div class="search-wrap show-flex-box-c">
    <el-card class="search-input">
      <div class="input-box">
        <el-input placeholder="请输入内容" v-model="searchKeyword" class="input-with-select">
          <el-button slot="append" icon="el-icon-search">
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

      </div>
    </el-card>
    <el-card class="result-box">
      <div class="title">
        <h2>结果</h2>
      </div>
      <div class="result-list">
        
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "Search",
  components: {
    
  },
  data() {
    return {
      searchKeyword: ''
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    
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
    }
    .result-box {
      flex-grow: 1;
      margin-top: $cardMarginTop;
    }
  }
</style>
