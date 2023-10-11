<template>
  <el-dialog
    class="common-dialog-box"
    title="新建组合"
    :visible.sync="dialogStatus"
    width="920px"
    top="0"
    show-close
    :append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
  </el-dialog>
</template>
  
  <script>
export default {
  components: {},
  data() {
    return {
      dialogStatus: false,
      showInfo: null,
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
.common-dialog-box ::v-deep .el-dialog__body {
  padding: 20px;
}
.color-blue {
  color: #00a3e0 !important;
}
</style>