<template>
  <div class="container">
    <el-page-header @back="goBack" content="公司"> </el-page-header>
    <div class="main-title">
      <div>全部负面舆情</div>
    </div>
    <div class="search-bar">
      <search-bar @searchInfo="searchInfo">
          <el-form :model="searchParams" inline>
            <el-form-item label="关联方：">
              <el-input  size="mini" placeholder="请输入客户名称" v-model="searchParams.codeVal"></el-input>
            </el-form-item>
            <el-form-item label="舆情标题：">
              <el-input  size="mini" placeholder="请输入关键字" v-model="searchParams.title"></el-input>
            </el-form-item>
            <el-form-item label="日期范围：">
              <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
            </el-form-item>
          </el-form>
      </search-bar>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%;" :header-cell-style="rowClass" :cell-style="cellStyle">
        <el-table-column label="舆情主体" prop="t1"></el-table-column>
        <el-table-column label="舆情标题" prop="t2"></el-table-column>
        <el-table-column label="内容摘要" prop="t3">
          <template slot-scope="scope">
            <span class="overflow-eclipse">{{ scope.row['t3'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关注程度" prop=""></el-table-column>
        <el-table-column label="标签" prop="t4"></el-table-column>
        <el-table-column label="类别" prop="t5"></el-table-column>
        <el-table-column label="日期" prop="t6"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/show-ui/search/search-bar.vue';
export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      dataValue: '',
      dateRange: '',
      searchParams: {},
      tableData: [{
        t1: '万达集团股份有限公司', t2: '16水城城投债（1680463）15时00分发生一笔偏离估值较大的价格异动', t3: '01月13日15时00分，16水城城投债（1680463）银行间债券市场显示最新成交价67.7001元，较前一交易日估值75.3390元，偏离-10.14%。 16水城城投债（1680463）最新债项评', t4: '标签1', t5: '新闻', t6: '2020/01/03'
      }],
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    rowClass({ row, rowIndex }) {
      return 'text-align: center;color: #000;height:48px;font-size:14px;font-weight:700'
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return 'text-align: center;height: 60px;'
    },
    searchInfo({ type }) {
      if (type !== 'search') {
        this.searchParams = {};
      }
    },
  }
}
</script>

<style lang="scss" scoped>
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
.overflow-eclipse {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.container {
  width: 100%;
  height: 100%;
  padding: 32px;
  .main-title {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    align-items: center;
    margin-top: 20px;
    padding: 20px 24px;
    &>div:first-child {
      font-size: 18px;
      font-weight: 700;
    }
  }
  .search-bar {
    padding: 0 20px;
    background-color: #fff;
  }
}
</style>