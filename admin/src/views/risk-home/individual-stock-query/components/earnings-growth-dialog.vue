<template>
  <el-dialog
    class="common-dialog-box"
    :visible.sync="dialogStatus"
    width="920px"
    top="0"
    show-close
    :append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title" class="show-flex-box-r header-title-bar">
      <span class="el-dialog__title">{{riskDetails.ThirdIndex || '-'}}</span>
      <em></em>
      <span class="sub-title">{{ riskDetails.ThirdData && riskDetails.ThirdData.desc || '' }}</span>
    </div>
    
    <div class="earnings-growth-box w100 h100 scroll-y show-flex-box-c" v-if="indexCode">
      <div class="targeted-value-score-bar show-flex-box-c">
        <p class="dialog-title pl-20 pb-0">指标值&指标分数</p>

        <div class="height376 w100 mb-8 border-box pl-20 pr-20">
          <line-bar-comp ref="lineBarCompRef" axisTickLength="280" unit="%" :top="50" :axisLabelShow="false"/>
        </div>
      </div>

      <div class="history-targeted-value-score-bar w100 h100 show-flex-box-c">
        <p class="dialog-title pl-20">历史指标值&指标分数</p>

        <div class="height270 w100">
          <historyTargetedValueScore ref="historyTargetedValueScoreRef" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import lineBarComp from './line-bar-comp';
import historyTargetedValueScore from './history-targeted-value-score';
import CommonUtils from '@/utils/commonUtils';

export default {
  components: {
    lineBarComp,
    historyTargetedValueScore,
  },
  data() {
    return {
      dialogStatus: false,
      indexCode: '',

      curStockInfo: {},
      earningsGrowthDetails: {},
      // 指标值&指标分数
      indexValueAndScoreAnalysis: {},
      // 历史指标值&指标分数
      historyIndexValueAndScoreAnalysis: {},

      riskDetails: {},
      // 全市场前 分位数
      marketQuantile: 0,
      type: 1, // 1-短期 2-长期
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.curStockInfo = this.$store.getters.CurWatchStock;
  },
  methods: {
    reqEarningsPerShareGrowthRate() {
      let params = {
        stockCode: this.curStockInfo.id,
        indexCode: this.indexCode,
        type: this.type
      }
      // getEarningsPerShareGrowthRate(params).then(res => {
      //   const data = res.data;
        
      //   this.earningsGrowthDetails = data;
      //   this.indexValueAndScoreAnalysis = data.indexValueAndScoreAnalysis || {};
      //   this.historyIndexValueAndScoreAnalysis = data.historyIndexValueAndScoreAnalysis || {};

      //   this.setShowPopStatus(true);
      //   setTimeout(() => {
      //     // 指标值&指标分数
      //     const info2 = {
      //       legendData: ['企业数量', '指标分数'],
      //       xAxis: this.indexValueAndScoreAnalysis.xaxis || [],
      //       series: {
      //         one: this.indexValueAndScoreAnalysis.series && this.indexValueAndScoreAnalysis.series[0].data,
      //         two: this.indexValueAndScoreAnalysis.series && this.indexValueAndScoreAnalysis.series[1].data,
      //       }
      //     };
      //     let markPoint = [
      //        {
      //         value: data.currentScoreBarPointYAxis + '%' || '', 
      //         xAxis: data.currentScoreBarPointXAxis || '', 
      //         yAxis: data.currentScoreBarPointYAxis || '',
      //         itemStyle: {
      //           color: "rgba(222, 27, 27, 1)",
      //           borderColor: "rgba(0, 0, 255, 1)",
      //           borderWidth: 0,
      //           borderCap: "square",
      //           shadowColor: 'rgba(0, 0, 0, 0.5)',
      //           shadowBlur: 10
      //         },
      //         symbolSize: 80
      //       },
      //     ]

      //     this.$refs.lineBarCompRef.setOption(info2,markPoint);

      //     const info = {
      //       xAxis: this.historyIndexValueAndScoreAnalysis.xaxis,
      //       series: {
      //         one: this.historyIndexValueAndScoreAnalysis.series && this.historyIndexValueAndScoreAnalysis.series[0].data,
      //         two: this.historyIndexValueAndScoreAnalysis.series && this.historyIndexValueAndScoreAnalysis.series[1].data,
      //       },
      //     };
      //     this.$refs.historyTargetedValueScoreRef.setOption(info);
      //   }, 300)

        

      // }).catch(err => { })
    },
    open(info) {
      this.indexCode = info.indexCode;
      this.riskDetails = info.details;
      this.type = info.type;

      if (this.riskDetails && this.riskDetails.indexRanking) {
        let number = this.riskDetails.indexRanking.split('/');

        this.marketQuantile = this.dealShowPersent(number[0],number[1]);
      }
      this.reqEarningsPerShareGrowthRate();
    },
    close(){
      this.setShowPopStatus(false);
    },
    // 改变弹窗状态
    setShowPopStatus(status) {
      this.dialogStatus = status;
    },
    dealShowPersent(numerator, denominator, suffix){
        return CommonUtils.dealShowPersent(numerator,denominator,suffix)
    }


  },
};
</script>

<style lang="scss" scoped src="@/styles/show-ui/common_dialog_style.scss"></style>

<style lang="scss" scoped>
::v-deep .el-dialog {
  height: 100vh;
}

.common-dialog-box ::v-deep .el-dialog__body{
  background: #F8F9FE;
  padding: 16px 20px;
  overflow-y: unset;
}

.header-title-bar{
  display: flex;
  align-items: center;
  > em{
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    margin-left: 8px;
    margin-right: 4px;
    background: url('../../../../assets/images/dialog/warning-icon.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .sub-title{
    white-space: nowrap;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #86909C;
  }
}

.earnings-growth-box{
  .targeted-value-score-bar{
    padding: 16px 0;
    background: #FFFFFF;
    border-radius: 4px;
    margin-bottom: 4px;
    .height376{
      height: 376px;
      flex-shrink: 0;
    }
    .des{
      box-sizing: border-box;
      padding: 0 20px;
      word-break: break-all;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #86909C;
    }
  }

  .history-targeted-value-score-bar{
    padding: 16px 0;
    background: #FFFFFF;
    border-radius: 4px;
    .height270{
      height: 310px;
      flex-shrink: 0;
    }
  }
}
</style>