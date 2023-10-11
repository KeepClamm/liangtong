<template>
  <div class="delete-confirm-pop-wrap">
    <el-dialog title="提示" 
               :width="'380px'"
               :show-close="false"
               :modal="false"
               :append-to-body="false"
               :label-position="'left'" 
               :visible.sync="deleteConfirmPopShowStatus"
               :before-close="onBeforeClose">
      <div class="content-box">
        <h3>您确定删除此账号？</h3>
        <div v-if="userData" class="delete-box show-flex-box-c show-flex-center">
          <span>{{ userData.realName }}</span>
          <span>{{ userData.employeeNo }}</span>
          <span>{{ userData.phone }}</span>
        </div>
        <div class="btn-box show-flex-box-r show-flex-center">
          <el-button size="mini" @click="onHandle('cancel')">取 消</el-button>
          <el-button class="dark-blue-primary-button" size="mini" type="primary" @click="onHandle('confirm')">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "deleteConfirmPop",
  components: {
    
  },
  data() {
    return {
      deleteConfirmPopShowStatus: false,
      openCallback: null,
      userData: null,
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    open(userData,callback) {
      this.userData = userData;
      this.openCallback = callback;
      this.deleteConfirmPopShowStatus = true;
    },
    close() {
      this.deleteConfirmPopShowStatus = false;
    },
    onBeforeClose() {

    },
    onHandle(type) {
      this.close();

      this.openCallback && this.openCallback({
        type: type
      })
    }
  }
};
</script>

<style lang="scss">
  .delete-confirm-pop-wrap {
    .el-dialog__body {
      padding: 0;
      .content-box {
        padding: 10px 30px 20px;
        .delete-box {
          margin-top: 10px;
          margin-bottom: 10px;
          padding-top: 30px;
          padding-bottom: 30px;
          background: #ebf3fb;
        }
      }
    }
  }
</style>
