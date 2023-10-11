<template>
  <!-- 担保品证券 -->
  <div class="template">
    <select-table :label-obj="labelObj" :table-row="tableRow" />
    <div class="pagination-container">
      <pagination class="mt-24" :total="10" :current-page="1" :cur-limit="10" :showRecods="1"></pagination>
    </div>
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
      tableRow: [
        {
          label: '序号',
          prop: 'test01'
        },
        {
          label: '交易市场',
          prop: 'test02'
        },
        {
          label: '证券代码',
          prop: 'test03'
        },
        {
          label: '证券名称',
          prop: 'test04'
        },
        {
          label: '监管要求折算率',
          prop: 'test05'
        },
        {
          label: '公司折算率',
          prop: 'test06'
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
