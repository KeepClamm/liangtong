<template>
  <div class="risk-cockpit-wrap">
    <!-- 今日风险提示 -->
    <div class="risk-cockpit-top">
      <div class="risk-cockpit-top-text">今日风险提示</div>
      <el-row :gutter="20">
        <el-col v-for="item in mockData" :key="item.id" :span="5">
          <div class="risk-cockpit-top-content-item">
            <div class="content-item-top">{{ item.title }}</div>
            <div class="content-item-main">
              <div class="content-item-main-num">{{ item.today }}</div>
              <div v-if="item.today && item.yesterday" class="content-item-main-compare">
                <img :src="item.today > item.yesterday ? iconList[0] : iconList[1]" class="wh100"/>
              </div>
              <div class="content-item-main-compare-yestreday" v-if="item.yesterday">昨日 {{ item.yesterday }} {{ typeof(item.yesterday) == 'number' ? '个' : ''}}</div>
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
      <high-risk-warn :table-data="tableData"/>
    </div>
    <!-- 财务类退市预警&交易类退市预警 -->
    <div class="high-risk-warn">
      <delisting-warn :table-data="delistingTableData"/>
    </div>
  </div>
</template>

<script>
import DelistingWarn from './component/delisting-warn.vue'
import HighRiskWarn from './component/high-risk-warn.vue'
import RiskAssessment from './component/risk-assessment.vue'

export default {
  name: 'RiskCockpit',
  components: {
    RiskAssessment,
    HighRiskWarn,
    DelistingWarn

  },
  data() {
    return {
      iconList: [
        require("@/assets/images/cockpit-risk/arrow-up.png"),
        require("@/assets/images/cockpit-risk/arrow-down.png")
      ],
      mockData: [
        { title: '评级下调个数', today: 120, yesterday: 10, id: 1 },
        { title: '评级上调个数', today: 20, yesterday: 50, id: 2 },
        { title: '当日全时长平均折算率', today: '66%', yesterday: '72%', id: 3 },
        { title: '负面舆情个数', today: 30, yesterday: 123, id: 4 },
        { title: '近一周调出标的券商数', today: 120, id: 5 }
      ],
      tableData: [
        {'stockCode': '000012.SZ', 'stockAcronyms': '南极A', 'currentRate': 'E', 'oldRate': 'A', 'mainRisk': '业务亏损，关联交易较多，资产负载率过高'},
        {'stockCode': '000012.SZ', 'stockAcronyms': '南极A', 'currentRate': 'E', 'oldRate': 'A', 'mainRisk': '业务亏损，关联交易较多，资产负载率过高'},
        {'stockCode': '000012.SZ', 'stockAcronyms': '南极A', 'currentRate': 'E', 'oldRate': 'A', 'mainRisk': '业务亏损，关联交易较多，资产负载率过高'},
        {'stockCode': '000012.SZ', 'stockAcronyms': '南极A', 'currentRate': 'E', 'oldRate': 'A', 'mainRisk': '业务亏损，关联交易较多，资产负载率过高'},
      ],
      delistingTableData: [
        {'stockCode': '000012.SZ', 'stockAcronyms': '南极A', 'currentRate': 'E', 'oldRate': 'A', 'mainRisk': '业务亏损，关联交易较多，资产负载率过高'},
        {'stockCode': '000012.SZ', 'stockAcronyms': '南极A', 'currentRate': 'E', 'oldRate': 'A', 'mainRisk': '业务亏损，关联交易较多，资产负载率过高'},
        {'stockCode': '000012.SZ', 'stockAcronyms': '南极A', 'currentRate': 'E', 'oldRate': 'A', 'mainRisk': '业务亏损，关联交易较多，资产负载率过高'},
        {'stockCode': '000012.SZ', 'stockAcronyms': '南极A', 'currentRate': 'E', 'oldRate': 'A', 'mainRisk': '业务亏损，关联交易较多，资产负载率过高'},        
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
}
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
    height: 500px;
    padding: 24px 20px;
    background-color: #fff;
    margin-top: 30px;
  }
}
</style>
