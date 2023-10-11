<template>
  <!-- 两融标的证券 -->
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
        title: '两融标的证券',
        rangeTitle: '融资保证金比例',
        rangeOtherTitle: '融券保证金比例',
        statusTitle: '融资状态'
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
          label: '短期五级分类',
          prop: 'test05'
        },
        {
          label: '融资保证金比例',
          prop: 'test06'
        },
        {
          label: '融券保证金比例',
          prop: 'test07'
        },
        {
          label: '融资状态',
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

