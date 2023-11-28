<template>
  <div class="container">
    <div class="table-box">
      <div class="table-title">
        <div>违约及黑名单</div>
        <div style="display: flex">
          <div class="search-button" @click="addBlacklist">新增</div>
          <div class="search-button button-color">导出</div>
        </div>
      </div>
      <div>
        <el-table
          :data="tableData"
          :cell-style="cellStyle"
          :header-cell-style="rowClass"
        >
          <el-table-column label="主体名称" prop="name"></el-table-column>
          <el-table-column label="客户代码" prop="code">
            <template slot-scope="scope">
              <span style="color: #00a3e0; cursor: pointer">{{
                scope.row["code"]
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="违约时间" prop="dateVal">
            <template slot-scope="scope">
              <span>{{(scope.row.dateVal || '') |dateformat('YYYY-MM-DD') }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="业务名称"
            prop="serviceName"
          ></el-table-column>
          <el-table-column label="业务编号" prop="serviceNum"></el-table-column>
          <el-table-column label="违约金额（元）"></el-table-column>
          <el-table-column
            label="主体受信限额（元）"
            prop="limitNum"
          ></el-table-column>
          <el-table-column label="违约时已用额度占比"></el-table-column>
          <el-table-column label="本业务起始日" prop="sDate"></el-table-column>
          <el-table-column label="本业务到期日" prop="eDate"></el-table-column>
          <el-table-column label="审核" width="80" v-if="userAccount == 'admin'">
            <template slot-scope="scope">
              <div v-if="scope.row.status == 0">
                <el-popover placement="top" trigger="click">
                  <div style="display: flex; padding: 10px;">
                    <div class="button-table" @click="passCheck(scope.row)" style="margin-right: 8px;">通过</div>
                    <div class="button-table extra-button" @click="refuseCheck(scope.row)">驳回</div>
                  </div>
                  <span style="cursor: pointer;" slot="reference">审核</span>
                </el-popover>
              </div>
              <div v-else-if="scope.row.status == 2">
                <span style="color: #409EFF;">已通过</span>
              </div>
              <div v-else>
                <div style="color: #F56C6C;">未通过</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" v-if="userAccount == 'admin'" width="80">
            <template slot-scope="scope">
              <div class="el-icon-delete handle-delete" @click="hanldeDelete(scope.row)"></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <add-blacklist-dialog ref="addBlacklistDialog" @addFormItem="addFormItem"></add-blacklist-dialog>
  </div>
</template>

<script>
import { getDefaultsBlacklists } from "@/api/sameClient";
import addBlacklistDialog from "./components/add-blacklist-dialog.vue";
export default {
  components: { addBlacklistDialog },
  data() {
    return {
      tableData: [],
      userAccount: ''
    };
  },
  created() {
    this.getTableData()
    this.userAccount = localStorage.getItem('userAccount')
    // getDefaultsBlacklists().then((res) => {
    //   this.tableData = res.data;
    // });
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return "text-align: center;color: #86909c;height:48px";
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return "text-align: center;height: 60px;font-size:12px";
    },
    getTableData() {
      this.tableData = JSON.parse(localStorage.getItem('blackList'))
    },
    addBlacklist() {
      this.$refs.addBlacklistDialog.open();
    },
    addFormItem(data) {
      let tableData = JSON.parse(localStorage.getItem('blackList'))
      tableData.push(data)
      localStorage.setItem('blackList', JSON.stringify(tableData))
      this.getTableData()
    },
    passCheck(row) {
      this.$confirm(`确认通过「${row.name}」的审核吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let tableData = JSON.parse(localStorage.getItem('blackList'))
          tableData.forEach(item => {
            if(item.id == row.id) {
              item.status = 2
            } 
          })
          localStorage.setItem('blackList', JSON.stringify(tableData))
          this.getTableData()
        })
        .catch(() => {});
    },
    refuseCheck(row) {
      this.$confirm(`确认驳回「${row.name}」的审核吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let tableData = JSON.parse(localStorage.getItem('blackList'))
          tableData.forEach(item => {
            if(item.id == row.id) {
              item.status = 1
            } 
          })
          localStorage.setItem('blackList', JSON.stringify(tableData))
          this.getTableData()
        })
        .catch(() => {});
    },
    hanldeDelete(row) {
      this.$confirm(`确认删除「${row.name}」吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let tableData = JSON.parse(localStorage.getItem('blackList'))
          const newData = tableData.filter(item => item.id != row.id)
          localStorage.setItem('blackList', JSON.stringify(newData))
          this.getTableData()
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.handle-delete {
  color: #f56c6c;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
.button-table {
  padding: 3px 12px;
  background-color: #012169;
  font-size: 12px;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}
.extra-button {
  background: #e5e6eb !important;
  color: #012169 !important;
}
.container {
  padding: 12px;
  .table-box {
    background-color: #fff;
    padding: 20px;
    .table-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      & > div:first-child {
        font-size: 18px;
        font-weight: 700;
      }
      .button-color {
        background-color: #e5e6eb !important;
        color: #012169 !important;
      }
      .search-button {
        padding: 6px 20px;
        font-size: 14px;
        background-color: #012169;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
        margin-right: 8px;
      }
    }

    .handle-edit {
      color: #409eff;
      font-size: 16px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
