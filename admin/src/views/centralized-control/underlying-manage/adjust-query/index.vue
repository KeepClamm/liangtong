<template>
  <!-- 调整查询 -->
  <div class="template">
    <underlying-top :adjust-label="adjustLabel" :adjust-query="adjustQuery" :global-config="listOfAdjustmentsQuery"/>
    <underlying-table :adjust-query="adjustQuery" :source="'adjustQuery'" :table-row="tableRow"/>
  </div>
</template>

<script>
import UnderlyingTable from '../component/underlying-table.vue'
import UnderlyingTop from '../component/underlying-top.vue'
import pagination from '@/components/show-ui/table/pagination-comp.vue'
import { listOfAdjustmentsQuery } from '../adjustment-config'
export default {
  name: 'Template',
  components: {
    UnderlyingTable,
    UnderlyingTop,
    pagination
  },
  data() {
    return {
      adjustQuery: true,
      adjustLabel: {
        title: '标的调整查询'
      },
      listOfAdjustmentsQuery: {},
      tableRow: {
        '标的范围调整': [
          { label: "融资标的证券", prop: "rzStock" },
          { label: "融券标的证券", prop: "rqStock" },
          { label: "可冲抵保证金券", prop: "salryStock" },
        ],
        '集中度调整': [
          { label: "调整前评级", prop: "originLv" },
          { label: "调整后评级  ", prop: "nowLv" },
          { label: "变动", prop: "changeReason" },
        ],
        '保证金比例调整': [
          { label: "调整前保证金比例", prop: "oldConversionRate" },
          { label: "调整后保证金比例", prop: "dqConversionRate" },
          { label: "变动", prop: "rateChangeReason" },
        ],
        '折算率调整': [
          { label: "调整前折算率", prop: "oldConversionRate" },
          { label: "调整后折算率", prop: "dqConversionRate" },
          { label: "变动", prop: "rateChangeReason" },
        ],
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.listOfAdjustmentsQuery = listOfAdjustmentsQuery
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

