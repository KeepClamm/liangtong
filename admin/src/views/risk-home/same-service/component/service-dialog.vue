<template>
  <el-dialog
    class="common-dialog-box"
    title="业务编号"
    :visible.sync="dialogStatus"
    width="550px"
    top="0"
    show-close
    :append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="form-container">
      <el-form :model="formData" label-position="left" size="small">
        <el-form-item :label="item.label" v-for="item in dialogConfig" :key="item.label">
          <div>{{item.desc}}</div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
    
    <script>
export default {
  components: {},
  data() {
    return {
      formData: {},
      dialogStatus: false,
      dialogConfig: [
        {label: '业务小类：', desc: '债券投资'},
        {label: '业务品种类型：', desc: '企业债'},
        {label: '业务品种名称：', desc: '18山'},
        {label: '本笔敞口/规模（万元）：', desc: '200'},
        {label: '最近到期金额（万元）：', desc: '500'},
        {label: '最近到期日：', desc: '2020.12.21'},
        {label: '履约保障比例', desc: '--'},
        {label: '保证金', desc: '--'},
        {label: '维持担保比例', desc: '--'},
        {label: '持仓盈亏', desc: '--'},
        {label: '剩余未收回穿仓金额', desc: '--'},
      ]
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    open() {
      this.setShowPopStatus(true);
    },
    close() {
      this.setShowPopStatus(false);
    },
    setShowPopStatus(status) {
      this.dialogStatus = status;
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
::v-deep .el-form-item {
  display: flex;
  justify-content: flex-start;
  width: 360px;
}
::v-deep .el-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
::v-deep .el-form-item__label {
  width: 200px;
  text-align: left;
}


.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  .component-header-buttons-item {
    padding: 6px 20px;
    font-size: 14px;
    background-color: #012169;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 16px;
  }
}
.button-color {
  background-color: #e5e6eb !important;
  color: #012169 !important;
}
.common-dialog-box ::v-deep .el-dialog__body {
  padding: 20px;
}
.color-blue {
  color: #00a3e0 !important;
}
.form-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .row-item {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .item-label {
      font-weight: 700;
      font-size: 16px;
      color: #606266;
    }
    .item-content {
      font-weight: 400;
      font-size: 16px;
    }
  }
}
</style>