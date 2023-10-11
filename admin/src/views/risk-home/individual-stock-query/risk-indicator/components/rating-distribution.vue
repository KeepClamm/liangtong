<template>
  <div class='rating-distribution-box'>
    <header>评级分布</header>
    <div class="w440 pt-8">
      <custom-tab :show-list="sortPlateList" @handle-tab="handleTabPlate" :replacement="replacementStatus"></custom-tab>
    </div>
    <div class="brief-introduction show-flex-box-r pt-8 pb-8" v-if="lineDataKey == 'wholeRatingDistribution'">
      <div class="fg-1">
        在
        <span v-if="ratingDistribution.evaluationDate">{{ ratingDistribution.evaluationDate | dateformat('YYYY') }}</span>
        <span v-else>--</span>
        评级年度，
        {{generalInformation.entityName || '--'}}的内部评级为{{ ratingDistribution.evaluationResult }}，
        在共{{ ratingDistribution.allEvaluationCompanyNumber || '--'}}家公司的内部评级中排前
        [{{ratingDistribution.allRankingRate && ratingDistribution.allRankingRate[0] || '--'}}，
        {{ratingDistribution.allRankingRate && ratingDistribution.allRankingRate[1] || '--'}}]，
        优于{{dealShowPersent(ratingDistribution.allBetterThanRatio)}}的公司。
      </div>
    </div>
    <div class="brief-introduction show-flex-box-r pt-8 pb-8" v-else-if="lineDataKey == 'industryRatingDistribution'">
      <div class="fg-1">
        从行业维度观察，{{generalInformation.entityName || '--'}}属于德勤行业分类中的{{generalInformation.industryName || '--'}}， 
        该行业共{{ ratingDistribution.industryEvaluationCompanyNumber || '--'}}家公司参与内部评级，
        {{generalInformation.entityName || '--'}}在该行业排前
        [{{ratingDistribution.industryRankingRate && ratingDistribution.industryRankingRate[0] || '--'}}，
        {{ratingDistribution.industryRankingRate && ratingDistribution.industryRankingRate[1] || '--'}}]，
        优于{{dealShowPersent(ratingDistribution.industryBetterThanRatio)}}该行业公司。
      </div>
      <div class="industry-involved">所属行业：<span>{{generalInformation.industryName || '--'}}</span></div>
    </div>
    <div class="brief-introduction show-flex-box-r pt-8 pb-8" v-else>
      <div class="fg-1">
        从地区维度观察，{{generalInformation.entityName || '--'}}属于{{generalInformation.area || '--'}}（注册地），
        该地区共{{ ratingDistribution.areaEvaluationCompanyNumber || '--'}}家公司参与内部评级，
        {{generalInformation.entityName || '--'}}在该地区排前
        [{{ratingDistribution.areaRankingRate && ratingDistribution.areaRankingRate[0] || '--'}}，
        {{ratingDistribution.areaRankingRate && ratingDistribution.areaRankingRate[1] || '--'}}]，
        优于{{dealShowPersent(ratingDistribution.areaBetterThanRatio)}}该地区公司
      </div>
      <div class="industry-involved">所属地区：<span>{{generalInformation.area || '--'}}</span></div>
    </div>
    <!-- 企业数量累计占比 -->
    <template>
      <div class="line-bar-comp-box">
        <line-bar-comp ref="lineBarCompRef" />
      </div>
    </template>
  </div>
</template>

<script>
import CustomTab from '@/components/show-ui/custom-tab.vue';
import lineBarComp from './line-bar-comp-self.vue';
import CommonUtils from '@/utils/commonUtils';

export default {
  props: {
    ratingDistribution: [Object,String],
    generalInformation: [Object,String],
    replacementStatus: Boolean
  },
  components: {
    CustomTab,
    lineBarComp
  },
  data() {
    return {
      sortPlateList: [
        { id: 'wholeRatingDistribution', name: '市场整体评级分布', },
        { id: 'industryRatingDistribution', name: '行业评级分布', },
        { id: 'areaRatingDistribution', name: '区域评级分布', }
      ],
      lineData: {
        xAxis: [],
        series: {
          one: [],
          two: []
        }
      },
      lineDataKey: 'wholeRatingDistribution',
      curStockInfo: {},

      markPointXAxis: 'CR-03',
      markPointYAxis: 89
    };
  },
  created() { },
  mounted() {
    this.configData();
  },
  methods: {
    configData() {
      this.curStockInfo = this.$store.getters.CurWatchStock;
      this.processingData(this.lineDataKey);
    },
    resizeEcharts() {
      this.$refs.lineBarCompRef && this.$refs.lineBarCompRef.resizeEcharts();
    },
    handleTabPlate(info) {
      this.lineDataKey = info.id;
      this.processingData(this.lineDataKey)
    },
    processingData(key){
      let data = this.ratingDistribution[key] || {};
      let wholeRatingDistributionLine = [];

      this.lineData = {
        xAxis: data.xaxis || [],
        series: {
          one: data.series && data.series[0].data || [],
          two: data.series && data.series[1].data || [],
        }
      };
      switch (this.lineDataKey) {
        case 'wholeRatingDistribution':
          this.markPointXAxis = this.ratingDistribution.wholeRatingDistributionCurrentPointXAxis || '';
          this.markPointYAxis = this.ratingDistribution.wholeRatingDistributionCurrentPointYAxis || '';
          break;
        case 'industryRatingDistribution':
          this.markPointXAxis = this.ratingDistribution.industryRatingDistributionCurrentPointXAxis || '';
          this.markPointYAxis = this.ratingDistribution.industryRatingDistributionCurrentPointYAxis || '';
          break;
        case 'areaRatingDistribution':
          this.markPointXAxis = this.ratingDistribution.areaRatingDistributionCurrentPointXAxis || '';
          this.markPointYAxis = this.ratingDistribution.areaRatingDistributionCurrentPointYAxis || '';
          break;
        default:
          break;
      }
      let markPoint = [
          {
          value: this.markPointYAxis, 
          xAxis: this.markPointXAxis, 
          yAxis: this.markPointYAxis,
          itemStyle: {
            color: "rgba(222, 27, 27, 1)",
            borderColor: "rgba(0, 0, 255, 1)",
            borderWidth: 0,
            borderCap: "square",
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10
          }
        },
      ]
      this.$refs.lineBarCompRef.setOption(this.lineData,markPoint);
    },
    dealShowPersent(numerator){
      if(!numerator){
        return '--';
      }
      return CommonUtils.dealShowPersent(numerator);
    },
    
  },
}
</script>
<style lang='scss' scoped>
.rating-distribution-box {
  padding: 16px 20px;
  font-size: 14px;
  background-color: #fff;

  >header {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: #1D2129;
  }

  .w440 {
    width: 440px;
  }

  .brief-introduction {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #86909C;

    .industry-involved {
      margin-left: 60px;
      flex-shrink: 0;

      >span {
        color: #00A3E0;
      }
    }
  }

  .line-bar-comp-box {
    width: 100%;
    height: 402px;
  }
}
</style>