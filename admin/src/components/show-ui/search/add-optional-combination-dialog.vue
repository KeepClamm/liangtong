<template>
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="600px"
  :before-close="close">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="handleConfirm">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  name: 'add-optional-combination-dialog',
  data() {
    return {
      dialogVisible: true,
    }
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    handleConfirm() {

    },
    close() {
      this.dialogVisible = false;
    }
  }
}
</script>

<style>

</style>