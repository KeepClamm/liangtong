<template>
  <div class="risk-cockpit-wrap">
    <!-- 今日风险提示 -->
    <div class="risk-cockpit-top">
      <div class="risk-cockpit-top-text">今日风险提示</div>
      <el-row :gutter="20">
        <el-col v-for="item in waringData" :key="item.id" :span="5">
          <div class="risk-cockpit-top-content-item">
            <div class="content-item-top">{{ item.title }}</div>
            <div class="content-item-main">
              <template>
                <div class="content-item-main-num" v-if="item.id == 3">
                  {{ (item.today * 100).toFixed(0) + "%" }}
                </div>
                <div class="content-item-main-num" v-else-if="item.id == 4" :style="{cursor:(item.today > 0 ? 'pointer': '')}" @click="gotoMonitor(item.today)">
                  {{ item.today }}
                </div>
                <div class="content-item-main-num" v-else-if="item.id == 5" :style="{cursor:(item.today > 0 ? 'pointer': '')}" @click="gotoPeermission(item.today)">
                  {{ item.today }}
                </div>
                <div class="content-item-main-num" v-else>{{ item.today }}</div>
              </template>
              <div v-if="item.id <= 4" class="content-item-main-compare">
                <img :src="item.today > item.yesterday ? iconList[0] : iconList[1]" class="wh100"/>
              </div>
              <div class="content-item-main-compare-yestreday" v-if="item.id != 5 && item.id != 3">
                昨日 {{ item.yesterday }} 个
              </div>
              <div class="content-item-main-compare-yestreday" v-if="item.id == 3">
                昨日 {{ item.yesterday * 100 + "%" }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 风险评估分布 -->
    <div class="risk-assessment">
      <risk-assessment />
    </div>
    <!-- 高危预警&评级调整 -->
    <div class="high-risk-warn">
      <high-risk-warn />
    </div>
    <!-- 财务类退市预警&交易类退市预警 -->
    <div class="high-finrisk-warn">
      <delisting-warn />
    </div>
  </div>
</template>

<script>
import { getRiskWarning } from "@/api/risk-homepage/risk-cockpit";
import DelistingWarn from "./component/delisting-warn.vue";
import HighRiskWarn from "./component/high-risk-warn.vue";
import RiskAssessment from "./component/risk-assessment.vue";

export default {
  name: "RiskCockpit",
  components: {
    RiskAssessment,
    HighRiskWarn,
    DelistingWarn,
  },
  data() {
    return {
      iconList: [
        require("@/assets/images/cockpit-risk/arrow-up.png"),
        require("@/assets/images/cockpit-risk/arrow-down.png"),
      ],
      waringData: [
        { title: "评级下调个数", today: "", yesterday: "", id: 1 },
        { title: "评级上调个数", today: "", yesterday: "", id: 2 },
        { title: "当日全时长平均折算率", today: "", yesterday: "", id: 3 },
        { title: "负面舆情个数", today: "", yesterday: "", id: 4 },
        { title: "近一周调出标的券商数", today: "", id: 5 },
      ],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getRiskWarning();
  },
  methods: {
    // 风险提示
    async getRiskWarning() {
      const wariningData = await getRiskWarning();
      const info = wariningData.data;
      this.waringData[0].today = info.todayDowngradeNumber;
      this.waringData[0].yesterday = info.yesterdayDowngradeNumber;
      this.waringData[1].today = info.todayUpgradeNumber;
      this.waringData[1].yesterday = info.yesterdayUpgradeNumber;
      this.waringData[2].today = info.todayAverageLossRate;
      this.waringData[2].yesterday = info.yesterdayAverageLossRate;
      this.waringData[3].today = info.todayNegativePublicOpinionNumber;
      this.waringData[3].yesterday = info.yesterdayNegativePublicOpinionNumber;
      this.waringData[4].today = info.thisWeekOutUnderlyingBrokersNumber;
    },
    // 前往舆情监控 
    gotoMonitor(val) {
      if (val <= 0) {
        return
      }
      this.$router.push('/opinion-monitor/today')
    },
    // 前往同业对比
    gotoPeermission(val) {
      if (val <= 0) {
        return
      }
      this.$router.push('/risk-home/peer-comparison/statistical-analysis')
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.el-col-5 {
  width: 20%;
}
.wh100 {
  width: 100%;
  height: 100%;
}
.risk-cockpit-wrap {
  overflow: auto;
  padding: 30px;
  position: relative;
  width: 100%;
  height: 100%;
  .risk-cockpit-top {
    width: 100%;
    height: 188px;
    padding: 24px 20px;
    background-color: #fff;
    .risk-cockpit-top-text {
      width: 100%;
      font-size: 20px;
      font-weight: 500;
      padding-bottom: 24px;
    }
    .risk-cockpit-top-content-item {
      height: 90px;
      padding: 16px 24px;
      background: #f8f9fb;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .content-item-top {
        white-space: nowrap;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #1d2129;
      }
      .content-item-main {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        .content-item-main-num {
          white-space: nowrap;
          font-weight: 700;
          font-size: 28px;
          line-height: 28px;
          color: #1d2129;
          padding-right: 14px;
        }
        .content-item-main-compare {
          white-space: nowrap;
          font-weight: 400;
          font-size: 12px;
          line-height: 17px;
          color: #012169;
          margin-right: 10px;
          width: 18px;
          height: 18px;
        }
        .content-item-main-compare-yestreday {
          white-space: nowrap;
          font-weight: 400;
          font-size: 12px;
          line-height: 17px;
        }
      }
    }
  }
  .risk-assessment {
    width: 100%;
    height: 1000px;
    padding: 24px 20px;
    background-color: #fff;
    margin-top: 30px;
  }
  .high-risk-warn {
    width: 100%;
    padding: 24px 20px;
    background-color: #fff;
    margin-top: 30px;
    position: relative;
  }
  .high-finrisk-warn {
    width: 100%;
    padding: 24px 20px;
    background-color: #fff;
    margin-top: 30px;
    position: relative;
  }
}
</style>
