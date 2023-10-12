<template>
  <!-- 担保品证券 -->
  <div class="template">
    <select-table :label-obj="labelObj" :table-row="tableRow" :table-data="tableData"/>
  </div>
</template>

<script>
import SelectTable from '../components/select-table.vue'
import pagination from '@/components/show-ui/table/pagination-comp.vue'
export default {
  name: 'Template',
  components: {
    SelectTable,
    pagination

  },
  data() {
    return {
      labelObj: {
        title: '可冲抵保证金证券',
        rangeTitle: '公司折算率',
        rangeOtherTitle: '德勤折算率',
        statusTitle: '担保状态'
      },
      tableData: [
        {'tradeMarket': '上交所', 'stockCode': '00000002', 'stockName': '平安证券', 'rzConversionRate': 0.3, 'rqConversionRate': 0.5},
        {'tradeMarket': '深交所', 'stockCode': '00000001', 'stockName': '平安证券', 'rzConversionRate': 0.6, 'rqConversionRate': 0.4},
        {'tradeMarket': '深交所', 'stockCode': '00000003', 'stockName': '平安证券', 'rzConversionRate': 0.5, 'rqConversionRate': 0.53},
        {'tradeMarket': '上交所', 'stockCode': '00000004', 'stockName': '平安证券', 'rzConversionRate': 0.4, 'rqConversionRate': 0.52},
        {'tradeMarket': '上交所', 'stockCode': '00000005', 'stockName': '平安证券', 'rzConversionRate': 0.5, 'rqConversionRate': 0.45},
      ],
      tableRow: [
        {
          label: '交易市场',
          prop: 'tradeMarket'
        },
        {
          label: '证券代码',
          prop: 'stockCode'
        },
        {
          label: '证券名称',
          prop: 'stockName'
        },
        {
          label: '监管要求折算率',
          prop: 'rzConversionRate'
        },
        {
          label: '公司折算率',
          prop: 'rqConversionRate'
        },
        {
          label: '德勤折算率',
          prop: 'test07'
        },
        {
          label: '担保状态',
          prop: 'test08'
        }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  width: 100%;
}
</style>
