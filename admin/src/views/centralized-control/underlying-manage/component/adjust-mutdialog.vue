<template>
  <el-dialog
    class="common-dialog-box"
    title="批量调整导入"
    :visible.sync="dialogStatus"
    width="600px"
    top="0"
    show-close
    :append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="form-container">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
        </div>
      </el-upload>
    </div>
    <div class="button-container">
      <div class="component-header-buttons-item">确认</div>
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
      compositionForm: {
        group: "",
        stockCode: "",
        chooseStock: "",
      },
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
  height: 388px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.button-color {
  background-color: #e5e6eb !important;
  color: #012169 !important;
}
.upload-demo {
  width: 350px;
}
.button-container {
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