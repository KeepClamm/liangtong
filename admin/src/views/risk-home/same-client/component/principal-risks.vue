<template>
  <div class="container">
    <div style="text-align: center;">主体业务及风险一览表</div>
    <el-table :data="tableData" style="width: 100%;" :header-cell-style="rowClass" :cell-style="cellStyle">
      <el-table-column label="客户代码" prop="num"></el-table-column>
      <el-table-column label="客户名称" prop="name" width="230">
        <template slot-scope="scope">
          <el-link type="primary" @click="gotoDetail(scope.row.name)">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="客户大类" prop="bigClass"></el-table-column>
      <el-table-column label="客户小类" prop="smallClass"></el-table-column>
      <el-table-column label="客户性质" prop="belong"></el-table-column>
      <el-table-column label="涉及业务范围" prop="serviceRange"></el-table-column>
      <el-table-column label="授信限额" prop="limitNum"></el-table-column>
      <el-table-column label="已用额度占比" prop="percentage"></el-table-column>
      <el-table-column label="预警等级" prop="mainrisks"></el-table-column>
      <el-table-column label="违约或黑名单标识" prop="blackFlag"></el-table-column>
      <el-table-column label="触发时间" prop="createTime"></el-table-column>
      <!-- <el-table-column label="行业" prop="sector"></el-table-column>
      <el-table-column label="地区" prop="region"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { getSameClientServiceRisk } from '@/api/sameClient'
export default {
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    getSameClientServiceRisk().then(res => {
      console.log('res',res)
      this.tableData = res.data ||[]
    })
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return 'text-align: center;color: #000;height:48px;font-size:12px;font-weight:700'
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return 'text-align: center;height: 60px;'
    },
    gotoDetail(name) {
      this.$router.push({
        name: 'ClientDetail',
        query: {
          title: name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding:  24px;
  background-color: #fff;
}
</style>
