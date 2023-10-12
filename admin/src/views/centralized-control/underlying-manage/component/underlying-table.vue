<template>
  <div class="table-container">
    <el-table tooltip-effect="dark" style="width: 100%" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" border>
      <el-table-column type="selection" width="50" v-if="source == 'adjustmentsPendingAudits'"/>
      <el-table-column label="序号" type="index" width="60"/>
      <el-table-column label="交易市场" />
      <el-table-column label="证券代码" />
      <el-table-column label="证券名称" />
      <el-table-column :label="source == 'adjustQuery' ? '当前标的类型' : '调整前标的类型'" />
      <el-table-column label="调整项" />
      <template v-for="(val, key, index) in tableRow">
          <el-table-column :key="index" :label="key">
            <template v-for="item in val">
              <el-table-column :key="item.prop" :label="item.label" :prop="item.prop" ></el-table-column>
            </template>
          </el-table-column>
      </template>
      <el-table-column label="调整原因（备注）" />
      <template v-if="source == 'adjustmentsInitiationList'">
        <el-table-column label="状态" />
        <el-table-column label="调整时间" />
      </template>
      <template v-else-if="source == 'adjustmentsPendingAudits'">
        <el-table-column label="调整人" />
        <el-table-column label="调整发起时间" />
        <el-table-column label="操作" />
      </template>
      <template v-else>
        <el-table-column label="调整人" />
        <el-table-column label="审批人" />
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
    tableRow: {
      type: Object,
    },
    source: {
      type: String,
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

