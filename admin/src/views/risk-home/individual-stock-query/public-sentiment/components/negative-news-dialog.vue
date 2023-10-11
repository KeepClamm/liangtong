<template>
  <el-dialog
    class="common-dialog-box"
    :title="showInfo && showInfo.title1 || '负面新闻'"
    :visible.sync="dialogStatus"
    width="920px"
    top="10vh"
    show-close
    :append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="negative-news-box w100 h100 show-flex-box-c" v-if="showInfo && dialogStatus">
      <header class="w100 fs-0 show-flex-box-c mb-20">
        <p class="title">{{showInfo.title}}</p>
        <div class="time-source-bar w100 show-flex-box-r">
          <span class="fs-0 mr-10">{{ showInfo.time }}</span>
          <p>来源：{{ showInfo.source }}</p>
        </div>
      </header>
      
      <div class="negative-news-box w100 fg-1 scroll-y">
        <div v-html="showInfo.content"></div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogStatus: false,
      showInfo: null,

    };
  },
  methods: {
    open(info) {
      this.showInfo = info;
      this.setShowPopStatus(true);
    },
    close(){
      this.setShowPopStatus(false);
    },
    // 改变弹窗状态
    setShowPopStatus(status) {
      this.dialogStatus = status;
    }
  },
};
</script>

<style lang="scss" scoped src="@/styles/show-ui/common_dialog_style.scss"></style>

<style lang="scss" scoped>
::v-deep .el-dialog {
  // height: 440px;
  height: 600px;
}
.common-dialog-box ::v-deep .el-dialog__header{
  height: 56px;
  border-bottom: 1px solid #F2F3F5;
  box-sizing: border-box;
}

.negative-news-box{
  .title{
    width: 100%;
    text-align: center;
    flex-shrink: 0;
    margin-bottom: 10px;
    word-break: break-all;
    font-family: 'PingFang SC'; 
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #1D2129;
  }
  .time-source-bar{
    justify-content: center;
    align-items: center;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    > span{
      color: #86909C;
    }
    > p{
      color: #4E5969;
    }
  }
  .negative-news-box{
    word-break: break-all;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.03em;
    color: #4E5969;
  }
}

</style>