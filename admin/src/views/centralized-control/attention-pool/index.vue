<template>
  <div class="attention-pool-container">
    <div class="pool-header">
      <div class="pool-header-flex">
        <div class="pool-header-flex-left">
          <div class="pool-header-title">关注组合列表</div>
          <div><el-input v-model="serachVal" placeholder="组合名称" prefix-icon="el-icon-search" /></div>
        </div>
        <div class="pool-header-flex-right" @click="openCompositionDialog">新建关注组合</div>
      </div>
    </div>
    <div class="table-box">
      <el-table tooltip-effect="dark" style="width: 100%" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" border>
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column label="组合名称" prop="groupName"></el-table-column>
          <el-table-column label="证券数量" prop="numOfSecurities"></el-table-column>
          <el-table-column label="创建人" prop="createName"></el-table-column>
          <el-table-column label="创建时间" prop="createName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <div class="table-handle-box show-flex-box-r show-flex-center">
                <span class="el-icon-delete handle-delete" @click="handleDelete(row)"></span>
                <span class="el-icon-edit-outline handle-edit" @click="handleEdit(row)"></span>
              </div>
            </template>
          </el-table-column>
      </el-table>
      <pagination class="mt-24" :total="10" :current-page="1" :cur-limit="10" :showRecods="1"></pagination>
    </div>
    <composition-dialog ref="compositionDialogRef"></composition-dialog>
  </div>
</template>

<script>
import BasicTable from '@/components/show-ui/table/basic-table.vue'
import CompositionDialog from './component/composition-dialog.vue'
import pagination from '@/components/show-ui/table/pagination-comp.vue'

export default {
  name: 'Template',
  components: {
    BasicTable,
    CompositionDialog,
    pagination
  },
  data() {
    return {
      page: 1,
      limit: 10,
      serachVal: '',
      tableData: [
        {'groupName': '组合A', 'numOfSecurities': 10, 'createName': 'admin'}
      ]
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
    },
    handlePage() {

    },
    // 打开弹窗
    openCompositionDialog() {
      this.$refs.compositionDialogRef.open()
    },
    // 删除
    handleDelete(row) {
      this.$confirm(`确认删除${row.name}吗？`, '提示', {
        confirmButtonText: "确定",
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {})
    },
    // 编辑
    handleEdit(row) {
      this.$refs.compositionDialogRef.open()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .pool-header .el-input--medium .el-input__inner {
    width: 160px;
    height: 28px;
    line-height: 28px;
}
::v-deep .el-input--medium .el-input__icon {
  line-height: 28px;
}
div {
  box-sizing: border-box;
}
.attention-pool-container {
  width: 100%;
  height: 100%;
  padding: 32px 32px 0px 32px;
  .pool-header {
    width: 100%;
    padding: 24px 20px;
    background-color: #fff;
    .pool-header-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .pool-header-flex-left {
        display: flex;
        align-items: center;
        .pool-header-title {
          font-weight: 500;
          font-size: 20px;
          margin-right: 20px;
        }
      }
      .pool-header-flex-right {
        padding: 6px 20px;
        font-size: 14px;
        background-color: #012169;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
        margin-right: 8px;
      }
    }
  }
  .table-handle-box {
        &>span {
          font-size: 20px;
          cursor: pointer;
          &.handle-delete {
            margin-right: 20px;
            color: #F56C6C;
          }
          &.handle-edit {
            color: #E6A23C;
          }
        }
  }
  .table-box {
    padding: 24px 20px;
    width: 100%;
    background-color: #fff;
  }
}
</style>

