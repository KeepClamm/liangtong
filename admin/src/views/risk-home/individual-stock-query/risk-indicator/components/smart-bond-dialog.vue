<template>
  <div>
    <el-dialog
      class="common-dialog-box"
      :visible.sync="smartBondStatus"
      :title="`${curStockInfo.name}（${curStockInfo.id}）`"
      width="920px"
      top="5vh"
      show-close
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="detail-info-box">
        <div class="mb-4 quality-evaluate w100">
          <p class="mb-8">上市公司质量评估</p>
          <div class="quality-result show-flex-box-r w100">
            <div class="result-box show-flex-box-r">
              <p class="result-title">上市公司质量评估结果</p>
              <p class="result-content">{{smartBondRatingAnalysisDetails.evaluationResult || '--'}}</p>
            </div>
            <div class="result-box show-flex-box-r">
              <p class="result-title">评级日期</p>
              <p class="result-content" v-if="smartBondRatingAnalysisDetails.evaluationDate">{{smartBondRatingAnalysisDetails.evaluationDate | dateformat('YYYY-MM-DD')}}</p>
              <p v-else class="result-content">--</p>
            </div>
          </div>
        </div>

        <div class="mb-4 financial-target">
          <header class="show-flex-box-r mb-8">
            <p class="fg-1">重要财务指标</p>
            <div class="show-flex-box-r">
              <img width="16" height="16" src="@/assets/images/common/warning-fill.png" alt="">
              <p class="ml-4">更多信息请查看德勤智慧债券</p>
            </div>
          </header>

          <div class="show-flex-box-c mb-8">
            <basic-table
              :table-data="tableListData"
              :needScroll="false"
              :show-pagination="false"
              :prop-list="propConfig"
              :spanMethod="spanMethod"
            >
            </basic-table>
          </div>

          <footer class="show-flex-box-r">
            <img width="16" height="16" src="@/assets/images/common/warning-fill.png" alt="">
              <p class="ml-4">更多信息请查看德勤智慧债券</p>
              <span class="pl-4" @click='clickSkip'>点击跳转</span>
          </footer>
        </div>

        <div class="">
          <rating-distribution :replacementStatus="smartBondStatus" ref="ratingDistributionRef" :ratingDistribution="smartBondRatingAnalysisDetails" :general-information="generalInformation"/>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BasicTable from '@/components/show-ui/table/basic-table';
import ratingDistribution from './rating-distribution';

export default {
  components: {
    BasicTable,
    ratingDistribution
  },
  props: {},
  data() {
    return {
      smartBondStatus: false,
      spanArr: [],
      propConfig: [
        { prop: "indexType", label: "指标类型"},
        { prop: "indexName", label: "指标名称"},
        { prop: "twoOne", label: `${new Date().getFullYear() - 1}`, width: 80 ,},
        { prop: "twoZero", label: `${new Date().getFullYear() - 2}`, width: 80 },
        { prop: "oneNine", label: `${new Date().getFullYear() - 3}`, width: 80 },
        { prop: "oneEight", label: `${new Date().getFullYear() - 4}`, width: 80 }
      ],
      tableListData: {},

      curStockInfo: {},
      smartBondRatingAnalysisDetails: {},
      // 基本信息
      generalInformation: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.curStockInfo = this.$store.getters.CurWatchStock;
    this.curStockInfo = {
      id: "000001.SZ",
      name: "平安银行"
    }
  },
  methods: {
    open(info,generalInformation){
      this.generalInformation = generalInformation;
      this.reqSmartBondRatingAnalysis(info.indexCode);
    },
    close(){
      this.changeSmartBondStatus(false);
    },
    changeSmartBondStatus(status){
      this.smartBondStatus = status;
    },
    reqSmartBondRatingAnalysis(indexCode) {
      const params = {
        stockCode: this.curStockInfo.id,
        indexCode: indexCode,
      };
      // smartBondRatingAnalysis(params).then(res => {
      //   const data = res.data;

      //   this.smartBondRatingAnalysisDetails = data;
        
      //   const tree = data.importantFinancialIndexList || [];
      //   const list = [];
      //   let spanArr = []
      //   for (let i = 0; i < tree.length; i++) {
      //     const item = tree[i];
      //     if(item.child && item.child.length > 0) {
      //       spanArr.push(item.child.length)
      //       for (let j = 0; j < item.child.length; j++) {
      //         if (j<item.child.length-1) {
      //           spanArr.push(0);
      //         }
              
      //         const subItem = item.child[j];
      //         list.push({
      //           indexType: item.indexTypeName || '',
      //           indexName: subItem.name || '',
      //           twoOne: subItem.data && subItem.data[0] || '',
      //           twoZero: subItem.data && subItem.data[1] || '',
      //           oneNine: subItem.data && subItem.data[2] || '',
      //           oneEight: subItem.data && subItem.data[3] || '',
      //         })
      //       }
      //     } else {
      //       spanArr.push(1);
      //       list.push({
      //         indexType: item.indexTypeName || '',
      //         indexName: '',
      //         twoOne: '',
      //         twoZero: '',
      //         oneNine: '',
      //         oneEight: '',
      //       })
      //     }
      //   }

      //   this.spanArr = spanArr;
      //   this.tableListData.items = list;
      //   this.changeSmartBondStatus(true);
      // })
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    clickSkip(){
      window.open("https://ibond.deloitte.com.cn/user/login.html");
    }
  },
}
</script>

<style lang="scss" scoped src="@/styles/show-ui/common_dialog_style.scss"></style>

<style lang="scss" scoped>
.detail-info-box {
  border-radius: 4px;
  overflow: hidden;
  > div {
    background-color: #ffffff;
  }
  .quality-evaluate {
    padding: 16px 20px;
    border-radius: 4px;
    > p {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: #1D2129;
    }
    .quality-result {
      justify-content: space-between;
      .result-box {
        border: 1px solid #F2F3F5;
        width: calc(50% - 20px);
        border-radius: 4px;
        .result-title {
          width: 50%;
          border-right: 1px solid #F2F3F5;
          text-align: center;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 42px;
          color: #86909C;
        }
        .result-content {
          width: 50%;
          text-align: center;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 42px;
          color: #1D2129;
        }
      }
    }
  }
  .financial-target {
    padding: 16px 20px;
    border-radius: 4px;
    header {
      align-items: center;
      > p {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: #1D2129;
      }
      > div > p {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #86909C;
      }
    }
    footer {
      > p {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #86909C;
      }
      > span {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #00A3E0;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
::v-deep .el-dialog {
  height: 90vh;
}
.common-dialog-box ::v-deep .el-dialog__body{
  background: #F8F9FE;
  padding: 16px;
  overflow-y: unset;
}
</style>