<template>
  <div class='breadcrumb-bar-comp-box w100'>
    <div class="breadcrumb-bar mb-16">
      <span class="cursor-pointer" @click="routeToHome()">个股风险查询</span>
      <em></em>
      <span v-if="curStockInfo">{{curStockInfo.name}}</span>
      <em v-if="curStockInfo"></em>
      <span class="is-current">{{title}}</span>
    </div>
  </div>
</template>

<script>
import { getCurWatchStockInfo, setCurWatchStockInfo } from '@/utils/auth';

export default {
  props: {
    title: String,
  },
  data() {
    return {
      curStockInfo: null,
    };
  },
  mounted(){
    this.setShowContent();
  },
  methods: {
    setShowContent(){
      this.curStockInfo = getCurWatchStockInfo();
    },
    // 跳转至 个股风险查询 首页
    routeToHome(){
      setCurWatchStockInfo(null);
      this.$router.push({path: '/individual-stocks'});
    },


  },
}
</script>
<style lang='scss' scoped>
  .breadcrumb-bar-comp-box{
    .breadcrumb-bar{
      display: flex;
      align-items: center;
      width: 100%;
      height: 24px;
      flex-shrink: 0;
      > span{
        flex-shrink: 0;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #4E5969;
      }
      > em{
        width: 12px;
        height: 12px;
        flex-shrink: 0;
        margin: 0 4px;
        background: url('../../../../assets/images/individual-stocks/separator-icon.png') center center no-repeat;
        background-size: 100% 100%;
      }
      > .is-current{
        font-weight: 500;
        color: #1D2129;
      }
    }
  }
</style>