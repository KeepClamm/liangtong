<template>
  <!-- 两融标的证券 -->
  <div class="template">
    <select-table :label-obj="labelObj" :table-row="tableRow" :table-data="tableData"/>
  </div>
</template>

<script>
import SelectTable from '../components/select-table.vue'
export default {
  name: 'Template',
  components: {
    SelectTable
  },
  data() {
    return {
      labelObj: {
        title: '两融标的证券',
        rangeTitle: '融资保证金比例',
        rangeOtherTitle: '融券保证金比例',
        statusTitle: '融资状态'
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
          label: '短期五级分类',
          prop: 'shortClassify'
        },
        {
          label: '融资保证金比例',
          prop: 'rzConversionRate'
        },
        {
          label: '融券保证金比例',
          prop: 'rqConversionRate'
        },
        {
          label: '融资状态',
          prop: 'rzStatus'
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
</style>

