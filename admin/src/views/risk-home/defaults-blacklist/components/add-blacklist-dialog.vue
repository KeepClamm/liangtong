<template>
  <el-dialog
    class="common-dialog-box"
    title="违约黑名单新增"
    :visible.sync="dialogStatus"
    width="600px"
    top="0"
    show-close
    :append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="form-container">
      <el-form
        ref="compositionForm"
        :model="compositionForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="主体名称：">
          <el-input v-model="compositionForm.name" placeholder="请输入主体名称"></el-input>
        </el-form-item>
        <el-form-item label="客户代码：">
          <el-input v-model="compositionForm.code" placeholder="请输入客户代码"></el-input>
        </el-form-item>
        <el-form-item label="违约时间：">
          <el-date-picker v-model="dateVal" type="date" placeholder="选择违约时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="业务名称：">
          <el-input v-model="compositionForm.serviceName" placeholder="请输入业务名称"></el-input>
        </el-form-item>
        <el-form-item label="业务编号：">
          <el-input v-model="compositionForm.num" placeholder="请输入业务编号"></el-input>
        </el-form-item>
        <el-form-item label="违约金额">
          <el-input v-model="compositionForm.money" placeholder="请输入违约金额"></el-input>
        </el-form-item>
        <el-form-item label="申请人" >
          <el-input v-model="compositionForm.person" placeholder="请输入申请人"></el-input>
        </el-form-item>
        <el-form-item label="申请原因描述：">
          <el-input v-model="compositionForm.reason" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="附件上传">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <div class="component-header-buttons-item" @click="submitForm">确认</div>
      <div class="component-header-buttons-item button-color" @click="close">取消</div>
    </div>
  </el-dialog>
</template>
  
  <script>
export default {
  components: {},
  data() {
    return {
      dialogStatus: false,
      showInfo: null,
      dateVal: '',
      fileList: [],
      compositionForm: {
        name: "",
        code: "",
        serviceName: '',
        num: '',
        money: '',
        person: '', 
        reason: '',
        tableData: [],
        status: 0,
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {
    // this.tableData = JSON.parse(localStorage.getItem('blackList'))
  },
  methods: {
    open() {
      this.setShowPopStatus(true);
    },
    close() {
      this.setShowPopStatus(false);
    },
    handlePreview() {},
    handleRemove() {},
    submitForm() {
      this.compositionForm.dateVal = this.dateVal
      this.compositionForm.id = Math.floor(10000 + Math.random() * 90000)
      this.$emit('addFormItem', this.compositionForm)
      this.$refs.compositionForm.resetFields()
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
::v-deep .el-button--primary {
  background-color: #012169;
  border-color: #012169;
}
::v-deep .el-dialog {
  margin-top: calc(54vh - 344px) !important;
}
.common-dialog-box ::v-deep .el-dialog__body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.color-blue {
  color: #00a3e0 !important;
}
.form-container {
  width: 80%;
  height: 100%;
  margin-top: 20px;
}
.button-color {
  background-color: #e5e6eb !important;
  color: #012169 !important;
}
.button-container {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .component-header-buttons-item {
    padding: 6px 20px;
    font-size: 14px;
    background-color: #012169;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 26px;
  }
}
</style>