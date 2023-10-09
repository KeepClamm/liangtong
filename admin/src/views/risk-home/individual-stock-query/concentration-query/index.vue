<template>
  <div class='card h100 concentration-query white-bg'>
    <div class="h100 show-flex-box-c">
      <header class="show-flex-box-c">
        <div class="header-top-content show-flex-box-r">
          <p class="page-title mb-24">个股权益查询</p>
        </div>
      </header>
      <search-bar @searchInfo="searchInfo">
        <el-form :model="searchParams" inline>
          <el-form-item label="证券代码/名称：">
            <el-input v-model="searchParams.materialName" size="small" placeholder="请输入证券代码/名称"></el-input>
          </el-form-item>
          <el-form-item label="交易市场：" prop="userId">
              <el-select v-model="searchParams.dividendTypeOpts" placeholder="请选择分红类型">
                  <el-option
                      v-for="item in dividendTypeOpts"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :validate-event="false"
                  ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="是否两融标的证券：" prop="userId">
              <el-select v-model="searchParams.dividendTypeOpts" placeholder="请选择比例因子">
                  <el-option
                      v-for="item in dividendTypeOpts"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :validate-event="false"
                  ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="是否可冲抵保证金证券：" prop="userId">
              <el-select v-model="searchParams.dividendTypeOpts" placeholder="请选择比例因子">
                  <el-option
                      v-for="item in dividendTypeOpts"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :validate-event="false"
                  ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="选择日期：">
              <el-date-picker
                  v-model="daterange"
                  type="daterange"
                  size="small"
                  range-separator="至"
                  style="width: 250px"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="单一股票担保物比例比例：">
            <el-input-number :controls="false" v-model="searchParams.min" size="small" :min="0" :max="100" placeholder="上限"></el-input-number>
            <span class="ml-5 mr-5">~</span>
            <el-input-number :controls="false" v-model="searchParams.max" size="small" :min="0" :max="100" placeholder="下限"></el-input-number>
          </el-form-item>
          <el-form-item label="静态市盈率：">
            <el-input-number :controls="false" v-model="searchParams.min" size="small" :min="0" :max="100" placeholder="上限"></el-input-number>
            <span class="ml-5 mr-5">~</span>
            <el-input-number :controls="false" v-model="searchParams.max" size="small" :min="0" :max="100" placeholder="下限"></el-input-number>
          </el-form-item>
        </el-form>
      </search-bar>
      <div class="stock-list-box show-flex-box-c fg-1">
        <basic-table
          :page="page"
          :limit="limit"
          :loading="tableLoading"
          :prop-list="propConfig"
          :table-data="tableListData"
          @handle-page="handlePage"
        >
          <template #stockCode="{ row }">
            <span class="color-blue cursor-pointer" @click="openToShortCrash(row)">{{ row.stockCode }}</span>
          </template>
          <template #stknme="{ row }">
            <span class="color-blue cursor-pointer" @click="openToShortCrash(row)">{{ row.stockShortName }}</span>
          </template>
          <template #dividendYear="{ row }">
            <span>{{ row.dividendYear | dateformat('YYYY-MM-DD') }}</span>
          </template>
        </basic-table>
      </div>
    </div>
  </div>
</template>

<script>
import BasicTable from '@/components/show-ui/table/basic-table';
import SearchBar from '@/components/show-ui/search/search-bar';
import commonUtils from '@/utils/commonUtils';
export default {
  name: 'risk-inquiry',
  components: {
    BasicTable,
    SearchBar
  },
  data() {
    return {
      page: 1,
      limit: 10,
      searchParams: {},
      daterange: [],
      dividendTypeOpts: [],
      tableLoading: false,
      tableListData: {
        total: 0,
        items: []
      },
      propConfig: [
        { prop: 'stockCode', label: '股票代码',slotName: 'stockCode' },
        { prop: 'stockShortName', label: '股票简称', slotName: 'stknme' },
        { prop: 'dividendType', label: '交易市场' },
        { prop: 'dividendYear', label: '融资标的/融券标的/可充抵保证金证券' },
        { prop: 'publicDate', label: '单一股票担保物比例' },
        { prop: 'dividendPlain', label: '静态市盈率' },
      ],
    }
  },
  methods: {
    init() {
      this.getData();
    },
    async getData(reload = true) {
      if (reload) {
        this.page = 1;
      }
      this.tableLoading = true;
      const dateTimeRange = commonUtils.getStartAndEndTime(this.daterange);

      try {
        // const { code, data, message } = await getDictList({
        //   ...this.searchParams,
        //   startTime: dateTimeRange && dateTimeRange[0],
        //   endTime: dateTimeRange && dateTimeRange[1],
        //   page: this.page,
        //   limit: this.limit
        // });
        // if (code === 0) {
        //   this.tableListData = data;
        // } else {
        //   this.$message.error(message);
        // }
      } catch (e) {
        console.log(e)
      } finally {
        this.tableLoading = false;
      }
    },
    searchInfo({ type }) {
      if (type !== 'search') {
        this.searchParams = {};
        this.daterange = [];
      }
      this.getData(true);
    },
    handlePage(info) {
      this.page = info.page;
      this.limit = info.limit;
      this.getData(false);
    },
    handleSearch(params){
      console.log('搜索内容', params)
      this.filterForm = params;
      this.getData(true);
    },
    openToShortCrash() {}
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input-number {
    width: 60px !important;
    .el-input {
        width: 100%;
    }
}
</style>