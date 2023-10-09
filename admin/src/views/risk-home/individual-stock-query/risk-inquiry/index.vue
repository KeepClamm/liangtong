<template>
  <div class='card h100 risk-inquiry white-bg'>
    <div class="h100 show-flex-box-c">
      <header class="show-flex-box-c">
        <div class="header-top-content show-flex-box-r">
          <p class="page-title mb-24">个股风险查询</p>
        </div>

        <div class="search-box mb-42 fs-0" v-if="searchList.length > 0">
          <select-panel
            :showList="searchList"
            @handle-search="handleSearch"
          ></select-panel>
        </div>
      </header>

      <div class="stock-list-box show-flex-box-c fg-1">
        <basic-table
          :page="page"
          :limit="limit"
          :loading="tableLoading"
          :prop-list="propConfig"
          :table-data="tableListData"
          @handle-page="handlePage"
        >
          <template #shortClassificationLabel>
            <div class="show-flex-box-c height48 show-flex-center">
              <span class="table-label">短期五级分类</span>
              <span class="table-label">/持续天数</span>
            </div>
          </template>

          <template #longClassificationLabel>
            <div class="show-flex-box-c height48 show-flex-center">
              <span class="table-label">长期五级分类</span>
              <span class="table-label">/持续天数</span>
            </div>
          </template>
          <template #stockCode="{ row }">
            <span class="color-blue cursor-pointer" @click="openToShortCrash(row)">{{ row.stockCode }}</span>
          </template>
          <template #stknme="{ row }">
            <span class="color-blue cursor-pointer" @click="openToShortCrash(row)">{{ row.stockShortName }}</span>
          </template>
          <template #shortTermDurationDays="{ row }">
            <span>
              {{row.shortTermFiveLevelClassification || '--'}}/{{row.shortTermDurationDays|| 0}}天
            </span>
          </template>
          <template #conversionRate="{ row }">
            <span>
              {{row.conversionRate > 0 ? (row.conversionRate-0).toFixed(2) : 0 }}
            </span>
            
          </template>
          <template #stockPledgeRate="{ row }">
            <span>
              {{ row.stockPledgeRate === null ? '--' : row.stockPledgeRate.toFixed(2) }}
            </span>
          </template>
          <!-- toFixed() -->
          <template #longClassification="{ row }">
            <span>
              {{row.longTermFiveLevelClassification || '--'}}/{{row.longTermDurationDays|| 0}}天
            </span>
          </template>
          
          <template #SharePledgeRatio="{ row }">
            <span>{{ row.financingObjectInOutState || '--' }} / {{ row.marginLendingSubjectInOutState || '--' }} / {{ row.offsetMarginSecuritiesInOutState || '--' }}</span>
          </template>
        </basic-table>
      </div>
    </div>
  </div>
</template>

<script>
import SelectPanel from '@/components/show-ui/search/select-panel';
import BasicTable from '@/components/show-ui/table/basic-table';
export default {
  name: "IndividualStockQuery",
  components: {
    SelectPanel,
    BasicTable
  },
  data() {
    return {
      page: 1,
      limit: 10,
      filterForm: {},
      tableLoading: false,
      tableListData: {},
      propConfig: [
        { prop: 'stockCode', label: '股票代码',slotName: 'stockCode' },
        { prop: 'stockShortName', label: '证券简称', slotName: 'stknme' },
        { prop: 'industryName', label: '行业类型',  },
        { prop: 'plateName', label: '所属板块',  },
        { prop: 'shortTermDurationDays',slotName: 'shortTermDurationDays' , label: '短期五级分类/持续天数', width: "170px", hasLabel: true, labelField: 'shortClassificationLabel',  },
        { prop: 'conversionRate', label: '两融折算率', slotName: 'conversionRate' },
        { prop: 'longClassification', label: '长期五级分类/持续天数', width: "170px", slotName: 'longClassification', hasLabel: true, labelField: 'longClassificationLabel', },
        { prop: 'stockPledgeRate', label: '股票质押率',slotName: 'stockPledgeRate'  },
        { prop: 'sharePledgeRatio', label: '同业行为分析', width: 133  },
      ],
      searchList: [
        {
          title: '行业分类',
          type: 'industry',
          options: [
            { id: 1, name: '选项A', },
            { id: 2, name: '选项B', },
            { id: 3, name: '选项C', },
            { id: 4, name: '选项D', },
            { id: 5, name: '选项E', },
            { id: 6, name: '选项F', },
            { id: 7, name: '选项G', },
            { id: 8, name: '选项H', },
            { id: 9, name: '选项I', },
          ],
        },
        {
          title: '所属区域',
          type: 'region',
          options: [
            { id: 1, name: '选项A', },
            { id: 2, name: '选项B', },
            { id: 3, name: '选项C', },
            { id: 4, name: '选项D', },
          ],
        },
      ]
      
    };
  },
  methods: {
    init() {
      this.getTableData();
    },
    async getTableData(reload = true) {
      if (reload) {
        this.page = 1;
      }
      this.tableLoading = true;
      try {
        // const { code, data, message } = await getDictList({
        //   ...this.searchParams,
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
    handlePage(info) {
      this.page = info.page;
      this.limit = info.limit;
      this.getTableData(false);
    },
    handleSearch(params){
      console.log('搜索内容', params)
      this.filterForm = params;
      this.getTableData(true);
    },
    openToShortCrash() {}
  }
};
</script>

<style lang="scss" scoped>
.risk-inquiry {
  position: relative;
}
</style>