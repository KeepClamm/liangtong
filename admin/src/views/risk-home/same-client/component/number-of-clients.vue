<template>
  <div class="boxchart-container">
    <div>
      <div class="component-title">客户数量分布情况</div>
      <div class="component-main">
        <div class="client-total">总客户数：71419</div>
      </div>
      <circle-progress></circle-progress>
      <div class="top-client">
        <el-card style="width: 49%;">
          <div class="top-client-table">
            <div slot="header"><span>信用类业务已用额度占比前十大客户</span></div>
            <div style="width: 100%;">
              <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" stripe>
                <el-table-column  type="index" label="序号" width="60"></el-table-column>
                <el-table-column  label="客户名称" prop="name"></el-table-column>
                <el-table-column  label="已用额度占比" prop="percentage"></el-table-column>
                <el-table-column  label="预警等级" prop="mainRisks"></el-table-column>
                <el-table-column  label="外评" prop="outJudge"></el-table-column>
                <el-table-column  label="内评" prop="inJudge"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
        <el-card style="width: 49%;">
          <div class="top-client-table">
            <div slot="header">
              <span>非信用类业务前十大规模客户</span>
            </div>
            <div style="width: 100%;">
              <el-table :data="noCreditData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="rowClass" stripe>
                <el-table-column  type="index" label="序号" width="60"></el-table-column>
                <el-table-column  label="客户名称" prop="name"></el-table-column>
                <el-table-column  label="已用额度占比" prop="percentage"></el-table-column>
                <el-table-column  label="预警等级" prop="mainRisks"></el-table-column>
                <el-table-column  label="外评" prop="outJudge"></el-table-column>
                <el-table-column  label="内评" prop="inJudge"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getSameClientTopCredit, getSameClientTopNonCredit } from '@/api/sameClient'
import circleProgress from './circle-progress.vue'
export default {
  components: { circleProgress },
  data() {
    return {
      tableData: [],
      noCreditData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return 'text-align: center;color: #86909c;height:48px'
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return 'text-align: center;height: 60px;font-size:12px'
    },
    async getData() {
      const creditData = await getSameClientTopCredit()
      const noCreditData = await getSameClientTopNonCredit()

      console.log(creditData)
      // const noncreditData = await getSameClientTopNonCredit()
      this.tableData = creditData.data.items || []
      this.noCreditData = noCreditData.data.items || []
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep table.el-table__header {
  width: 100% !important;
}
::v-deep .el-table__empty-block {
  width: 100% !important;
}
img {
  object-fit: contain;
}
div {
  box-sizing: border-box;
}
.wh100 {
  width: 100%;
  height: 100%;
}
.boxchart-container {
  width: 100%;
  flex: 1;
  padding: 20px 24px 40px 24px;
  .component-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 18px;
    // color: #1d87e1;
  }
  .component-main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .client-total {
      font-size: 20px;
      font-style: italic;
      font-weight: 600;
      color: #626468;
    }
    .compare-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      position: relative;
      .abs-progress-right {
        width: 400px;
        background-color: #FFF;
        height: 30px;
        border-radius: 0 20px 20px 0;
        border: 2px solid #0070c0;
        position: relative;
        left: -10px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);  
        .abs-progress-child-right {
          position: absolute;
          width: 170px;
          height: 26px;
          top: 0px;
          left: -10px;
          background-color: #0070c0;
          border-radius: 0 20px 20px 0;
          .progress-numshow-right {
            position: absolute;
            bottom: 28px;
            right: 0px;
            font-style: italic;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
      .abs-progress {
        width: 400px;
        background-color: #FFF;
        height: 30px;
        border-radius: 20px 0 0 20px;
        border: 2px solid #0070c0;
        position: relative;
        left: 10px;
        box-shadow:  5px 5px 10px rgba(0, 0, 0, 0.2);
        .abs-progress-child {
          position: absolute;
          width: 100px;
          height: 26px;
          top: 0px;
          right: -20px;
          background-color: #0070c0;
          border-radius: 20px 0 0 20px;
          .progress-numshow {
            position: absolute;
            bottom: 29px;
            left: 0px;
            font-style: italic;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
      
    .circle {
      width: 100px;
      height: 100px;
      background-color: #0070c0; /* 外圈颜色 */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1000;
      .circle-text {
        z-index: 100;
        width: 50px; /* 内圈宽度 */
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
    }
    .circle::after {
      content: "";
      width: 80px; /* 内圈宽度 */
      height: 80px; /* 内圈高度 */
      background-color: white; /* 内圈颜色 */
      border-radius: 50%;
      position: absolute;
    }
    }
  }
  .top-client {
    display: flex;
    width: 100%;
    margin-top: 30px;
    justify-content: space-between;
  }
}
</style>
