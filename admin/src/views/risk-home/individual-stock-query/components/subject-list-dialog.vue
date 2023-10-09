<template>
  <el-dialog
    class="common-dialog-box"
    title="主体名单"
    :visible.sync="dialogStatus"
    width="920px"
    top="0"
    show-close
    :append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="w100 h100 show-flex-box-c" v-if="showInfo">
      <basic-table
        :table-data="tableListData"
        :page="page"
        :limit="limit"
        :prop-list="propConfig"
        @handle-page="handlePage"
      >
        <template #stockCode="{ row }">
          <span
            class="color-blue cursor-pointer"
            @click="openToShortCrash(row)"
          >{{ row.stockCode }}</span>
        </template>
        <template #stockCodeAbbreviation="{ row }">
          <span
            class="color-blue cursor-pointer"
            @click="openToShortCrash(row)"
          >{{ row.stockShortName }}</span>
        </template>
        <template #concept="{ row }">
            <span class="color-dark-blue">{{ listToString(row.concept) }}</span>
        </template>
      </basic-table>
    </div>
  </el-dialog>
</template>

<script>
import basicTable from '@/components/show-ui/table/basic-table';
import CommonUtils from '@/utils/commonUtils';

export default {
  components: {
    basicTable,
  },
  data() {
    return {
      dialogStatus: false,
      showInfo: null,

      page: 1,
      limit: 10,
      tableListData: {},
      propConfig: [
        { prop: "stockCode", label: "股票代码", slotName: 'stockCode' },
        { prop: "stockShortName", label: "股票简称", slotName: 'stockCodeAbbreviation' },
        { prop: "shortTermRiskLevel", label: "短期暴跌风险等级"},
        { prop: "concept", label: "所属板块", slotName: 'concept'  },
      ],

    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    open(info) {
      this.showInfo = info;
      this.reqplateShowStock()
      this.setShowPopStatus(true);
    },
    close(){
      this.setShowPopStatus(false);
    },
    // 改变弹窗状态
    setShowPopStatus(status) {
      this.dialogStatus = status;
    },
    reqplateShowStock(){
      const params = {
        page: this.page,
        limit:  this.limit,
        plateCode: this.showInfo.name,
      };
      // plateShowStock(params).then(res => {
      //   this.tableListData = res.data;
      // })
    },
    handlePage(info) {
      this.page = info.page;
      this.limit = info.limit;
      this.reqplateShowStock()
    },
    listToString(list) {
      const findInfo = CommonUtils.listToString(list);
      return findInfo
    },
    openToShortCrash(row) {
      const info = {
        id: row.stockCode,
        name: row.stockShortName,
      };
      this.$store.dispatch("setCurWatchStockInfo", info);
      
      this.close();
      window.location.reload();
    },



  },
};
</script>

<style lang="scss" scoped src="@/styles/show-ui/common_dialog_style.scss"></style>

<style lang="scss" scoped>
::v-deep .el-dialog {
  height: 688px;
  margin-top: calc(50vh - 344px) !important;
}
.common-dialog-box ::v-deep .el-dialog__body {
  padding: 20px;
}
.color-blue {
  color: #00A3E0 !important;
}
</style>