<template>
  <!-- 今日调整明细 -->
  <div class="template">
    <adjust-component :label-obj="labelObj" :table-row="tableRow" :table-data="tabledata"/>
    <div class="divide-div" />
    <adjust-component :label-obj="labelObjOther" :table-row="tableRowed" :table-data="tabledata"/>
  </div>
</template>

<script>
import AdjustComponent from '../component/adjust-component.vue'
import pagination from '@/components/show-ui/table/pagination-comp.vue'
export default {
  name: 'Template',
  components: {
    AdjustComponent,
    pagination

  },
  data() {
    return {
      labelObj: {
        title: '待调整清单',
        originlvLabel: '原始评级',
        newlvLabel: '当前模型评级'
      },
      labelObjOther: {
        title: '已调整明细',
        originlvLabel: '集中度变动',
        newlvLabel: '折算率变动'
      },
      tabledata: [
        {'tradeFloor': '测试', 'stockCode': '00000001', 'originLv': 'C', 'nowLv': 'A', 'changeReason': '原因', 'oldConversionRate': '0.65', 'dqConversionRate': '0.3'},
        {'tradeFloor': '测试2', 'stockCode': '000000201', 'originLv': 'C', 'nowLv': 'E', 'changeReason': '原因2', 'oldConversionRate': '0.5', 'dqConversionRate': '0.66'},
        {'tradeFloor': '测试3', 'stockCode': '000000031', 'originLv': 'C', 'nowLv': 'B', 'changeReason': '原因3', 'oldConversionRate': '0.25', 'dqConversionRate': '0.34'},
        {'tradeFloor': '测试3', 'stockCode': '000000031', 'originLv': 'C', 'nowLv': 'B', 'changeReason': '原因3', 'oldConversionRate': '0.25', 'dqConversionRate': '0.34'},
        {'tradeFloor': '测试3', 'stockCode': '000000031', 'originLv': 'C', 'nowLv': 'B', 'changeReason': '原因3', 'oldConversionRate': '0.25', 'dqConversionRate': '0.34'},
      ],
      tableRow: {
        '较昨日标的范围变动': [
          {'label': '融资标的证券', 'prop': 'rzStock'},
          {'label': '融券标的证券', 'prop': 'rqStock'},
          {'label': '可冲抵保证金券', 'prop': 'salryStock'}
        ],
        '集中度变化': [
         {'label': '原始评级', 'prop': 'originLv'},
         {'label': '当前模型评级', 'prop': 'nowLv'}, 
         {'label': '变动原因', 'prop': 'changeReason'} 
        ],
        '折算率变动': [
          {'label': '原始折算率', 'prop': 'oldConversionRate'},
          {'label': '德勤折算率', 'prop': 'dqConversionRate'},
          {'label': '变动原因', 'prop': 'rateChangeReason'}
        ]
      },
      tableRowed: {
        '标的范围': [
          {'label': '融资标的证券', 'prop': 'rzStock'},
          {'label': '融券标的证券', 'prop': 'rqStock'},
          {'label': '可冲抵保证金券', 'prop': 'salryStock'}
        ],
        '集中度': [
         {'label': '调整前评级', 'prop': 'originLv'},
         {'label': '调整后评级', 'prop': 'nowLv'}, 
         {'label': '变动', 'prop': 'changeReason'} 
        ],
        '折算率': [
          {'label': '调整前折算率', 'prop': 'oldConversionRate'},
          {'label': '调整后折算率', 'prop': 'dqConversionRate'},
          {'label': '变动', 'prop': 'rateChangeReason'}
        ]
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.template {
  overflow-y: auto;
}
.divide-div {
  height: 40px;
  width: 100%;
}
</style>

