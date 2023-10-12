<template>
  <div class="table-container">
    <el-table tooltip-effect="dark" style="width: 100%" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" border>
      <el-table-column v-if="adjustTable" label="全选">
        <el-table-column type="selection" width="50" />
      </el-table-column>
      <el-table-column label="序号" />
      <el-table-column label="交易市场" />
      <el-table-column label="证券代码" />
      <el-table-column label="证券名称" />
      <template v-if="adjustQuery">
        <el-table-column label="当前标的类型" />
      </template>
      <template v-else>
        <el-table-column label="调整前标的类型" />
      </template>
      <el-table-column label="调整项" />
      <el-table-column label="标的范围调整">
        <el-table-column label="融资标的证券" />
        <el-table-column label="融券标的证券" />
        <el-table-column label="可冲抵保证金券" />
      </el-table-column>
      <el-table-column label="集中度调整">
        <el-table-column label="调整前评级" />
        <el-table-column label="调整后评级" />
        <el-table-column label="变动" />
      </el-table-column>
      <el-table-column label="保证金比例调整">
        <el-table-column label="调整前保证金比例" />
        <el-table-column label="调整后保证金比例" />
        <el-table-column label="变动" />
      </el-table-column>
      <el-table-column label="折算率调整">
        <el-table-column label="调整前折算率" />
        <el-table-column label="调整后折算率" />
        <el-table-column label="变动" />
      </el-table-column>
      <el-table-column label="调整原因（备注）" />
      <template v-if="adjustTable">
        <el-table-column label="调整人" />
        <el-table-column label="调整发起时间" />
        <el-table-column label="操作" />
      </template>
      <template v-else-if="adjustQuery">
        <el-table-column label="调整人" />
        <el-table-column label="审批人" />
        <el-table-column label="调整时间" />
      </template>
      <template v-else>
        <el-table-column label="状态" />
        <el-table-column label="调整时间" />
      </template>
    </el-table>
    <pagination class="mt-24" :total="10" :current-page="1" :cur-limit="10" :showRecods="1"></pagination>
  </div>
</template>
<script>
import pagination from '@/components/show-ui/table/pagination-comp.vue'
export default {
  name: 'Template',
  components: {
    pagination
  },
  props: {
    adjustTable: {
      type: Boolean
    },
    adjustQuery: {
      type: Boolean
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return 'text-align: center;background: #f8f9fb;color: #86909c;height:48px'
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return 'text-align: center;height: 60px;'
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  padding: 24px 20px;
  background-color: #fff;
}
</style>

