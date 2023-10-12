<template>
  <!-- 调整查询 -->
  <div class="template">
    <underlying-top :adjust-label="adjustLabel" :adjust-query="adjustQuery" :global-config="listOfAdjustmentsQuery"/>
    <underlying-table :adjust-query="adjustQuery" />
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
      listOfAdjustmentsQuery: {}
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

