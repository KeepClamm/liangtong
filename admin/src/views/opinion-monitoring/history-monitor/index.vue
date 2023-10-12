<template>
  <div class="history-monitor-page h100 show-flex-box-c">
    <div class="show-flex-box-r flex-1">
      <div class="card show-flex-box-c flex-1 mr-20">
        <header>
          <span class="f-17 color-primary">舆情列表</span>
          <div class="search-box">
            <div v-for="item in dateConf" :key="item.id" class="select-btn mr-8">
              {{ item.name }}
            </div>
            <el-date-picker
              v-model="daterange"
              type="daterange"
              size="mini"
              class="mr-8"
              range-separator="至"
              style="width: 250px"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <div class="select-btn">高级筛选</div>
            <el-select v-model="searchParams.sort" size="mini" placeholder="请选择排序规则" class="ml-8 mr-8">
                <el-option
                    v-for="item in sortTypeOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <div class="export-btn">
              <i class="el-icon-download"></i>
            </div>
          </div>
        </header>
        <div class="opinion-list flex-1">
          <opinion-list :data="opinionListData"></opinion-list>
        </div>
      </div>

      <div class="stock-wrap card">
        <header>
          <span class="f-17 color-primary">包含股票列表</span>
          <div class="export-btn">
            <i class="el-icon-download"></i>
          </div>
        </header>
        <div class="stock-list">
          <stock-list :data="stockListData"></stock-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OpinionList from '../components/opion-list.vue';
import StockList from '../components/stock-list.vue';
import CustomTab from '@/components/show-ui/custom-tab.vue';
export default {
  name: 'history-monitor',
  data() {
    return {
      opinionListData: {
        total: 1,
        items: [
          { id: 1, stockName: '左江科技', stockCode: '300799.SZ', title: '左江科技：延期披露2022年年度报告和2023年第一季度报告', desc: '左江科技公告，公司2022年年度、2023年第一季度报告延期至2023年4月28日披露。' }
        ]
      },
      searchParams: {},
      daterange: [],
      stockListData: [{ id: 1, stockName: '左江科技', stockCode: '300799.SZ', rate: 3.25, showIcon: true, rise: true }],
      sortTypeOpts: [
        { label: '按推送时间排序', value: 1 },
        { label: '按关注度排序', value: 2 },
        { label: '五级分类排序', value: 3 },
        { label: '按涨跌幅排', value: 4 },
      ],
      dateConf: [
        { id: 'today', name: '今日' },
        { id: 'week', name: '本周' },
        { id: 'month', name: '本月' },
      ]
    }
  },
  components: {
    StockList,
    CustomTab,
    OpinionList
  },
  methods: {
    changeDateTab() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.history-monitor-page {
  padding: 30px;
  .stock-wrap {
    width: 290px;
  }
  header {
    height: 68px;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    background-color: #F8F9FE;
  }
  .search-box {
    display: flex;
    align-items: center;
  }
}
</style>