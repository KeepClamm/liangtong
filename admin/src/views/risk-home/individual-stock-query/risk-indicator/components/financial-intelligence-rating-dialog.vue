<template>
  <el-dialog
    class="common-dialog-box"
    :visible.sync="dialogStatus"
    :title="showTitle"
    width="920px"
    top="0vh"
    show-close
    :append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="financial-intelligence-rating-box w100 h100 scroll-y show-flex-box-c" v-if="yearList && yearList.length > 0">
      <div class="composite-risk-level-bar border-box w100 p-16 br-4 white-bg mb-4">
        <p class="dialog-title mb-8">综合风险等级</p>

        <ul class="show-flex-box-r w100">
          <li
            :class="`cursor-pointer show-flex-box-r ${typeMap[item.type]}-suspicious ${currentWatchYear == item.year ? 'is-selected' : ''}`"
            v-for="(item, index) in yearList"
            :key="index"
            @click="chooseThisYear(item.year)"
          >
            <div>
              <span>{{ item.year }}年</span>
            </div>
            <div>
              <strong>{{ item.typeText }}</strong>
            </div>
          </li>
        </ul>
      </div>

      <div class="financial-anomaly-analysis-bar border-box w100 p-16 br-4 white-bg"  v-if="financialAnalysisInfo">
        <header class="header show-flex-box-r show-flex-sb">
          <span class="dialog-title">财报异常分析</span>
          <div>
            <em></em>
            <span><span>{{ financialAnalysisInfo.big || '--'}}</span>个大类异常，其中<span>{{ financialAnalysisInfo.highRisk || '--'}}</span>个高危异常；<span>{{ financialAnalysisInfo.outliers || '--'}}</span>个异常点</span>
          </div>
        </header>

        <ul class="show-flex-box-c mt-8" v-if="financialAnalysisInfo.list.length > 0">
          <li
            :class="`show-flex-box-r ${typeMap[item.type]}-anomaly`"
            v-for="(item, index) in financialAnalysisInfo.list"
            :key="index"
          >
            <div class="show-flex-box-c">
              <h3 class="show-flex-box-r">
                <em></em>
                <span>{{ item.name }}</span>
              </h3>
              <ol>
                <li
                  v-for="(subItem, subIndex) in item.list"
                  :key="subIndex"
                >
                  <div>
                    <em :class="`${typeMap[item.type]}-em`"></em>
                    <span>{{ subItem.name }}</span>
                  </div>
                </li>
              </ol>
            </div>
          </li>
        </ul>
        <div class="more-info-bar show-flex-box-r pt-8">
          <em></em>
          <span>更多信息请查看德勤财报智评<span @click='clickSkip'>点击跳转</span></span>
        </div>
      </div>
    </div>
    <div class="w100" v-else>
      <el-empty :image-size="300"></el-empty>
    </div>
  </el-dialog>
</template>

<script>
// import { getComprehensiveRiskLevel, getFinancialStatementAnomalyAnalysis } from '@/api/http-api/individual-stock-risk-inquiry';

export default {
  components: {},
  data() {
    return {
      curStockInfo: {},
      showTitle: '',
      dialogStatus: false,
      indexCode: '',
      currentWatchYear: '', // 当前查看的年份
      yearList: [],
      suspicionDegree: { // 服务端的数据： 0-数据缺失 1-无明显异常 2-局部异常 3-高度可疑 4-极度可疑
        '0': '无明显异常',
        '1': '局部异常',
        '2': '高度可疑',
        '3': '极度可疑',
        '4': '数据缺失'
      },
      typeMap: { // 前端的数据：0-轻度可疑 1-中度可疑 2-高度可疑 3-重度可疑
        '0': 'lightly',
        '1': 'moderately',
        '2': 'highly',
        '3': 'seriously',
        '4': 'missingData'
      },
      financialAnalysisInfo: null, // 财报异常分析数据
      financialAnomalyAnalysisList: [], // 高危2 异常点1
    };
  },
  computed: {},
  watch: {},
  mounted() {
    // const info = this.$store.getters.CurWatchStock;
    const info = {
      id: "000001.SZ",
      name: "平安银行"
    }
    this.showTitle = `${info.name}（${info.id}）`;
    this.curStockInfo = info;
  },
  methods: {
    open(info) {
      this.indexCode = info.indexCode;

      if (this.indexCode) {
        this.reqComprehensiveRiskLevel();
      }
    },
    close(){
      this.setShowPopStatus(false);
    },
    // 改变弹窗状态
    setShowPopStatus(status) {
      this.dialogStatus = status;
    },
    // 获取综合风险等级信息
    reqComprehensiveRiskLevel(){
      const params = {
        stockCode: this.curStockInfo.id,
        indexCode: this.indexCode,
      };

      // getComprehensiveRiskLevel(params).then(ret=>{
      //   this.yearList = this.dealYearListInfo(ret.data || []);
      //   if (this.yearList.length > 0) {
      //     this.reqFinancialStatementAnomalyAnalysis(this.yearList[0].year);
      //   } else {
      //     this.setShowPopStatus(true);
      //   }
      // })
    },
    // 处理 综合风险等级 信息
    dealYearListInfo(list){
      const map = { // 服务端和前端定义的类型不一致 进行转换 
        '1': '0',
        '2': '1',
        '3': '2',
        '4': '3',
        '0': '4'
      };

      return list.map(item => {
        return {
          year: item.year,
          typeText: this.suspicionDegree[map[item.degreeOfSuspicion]],
          type: map[item.degreeOfSuspicion],
        };
      });
    },
    // 获取财报异常分析信息
    reqFinancialStatementAnomalyAnalysis(curYear){
      const params = {
        stockCode: this.curStockInfo.id,
        indexCode: this.indexCode,
        year: curYear,
      };

      // getFinancialStatementAnomalyAnalysis(params).then(ret=>{
      //   this.currentWatchYear = curYear;
      //   this.financialAnalysisInfo = this.dealFinancialAnalysisInfo(ret.data);
      //   this.setShowPopStatus(true);
      // })
    },
    dealFinancialAnalysisInfo(info){
      let result = {
        big: info.totalExceptionCategory || 0,
        highRisk: info.totalHighRiskExceptionCategory || 0,
        outliers: info.totalExceptionPoint || 0,
        list: this.dealFinancialAnomalyAnalysisList(info.item || []),
      };

      return result;
    },
    dealFinancialAnomalyAnalysisList(tree){
      return tree.map(item => {
        let obj = {
          code: item.code,
          name: item.name,
          type: item.status,
          list: item.child || []
        };
        if (obj.list.length > 0) {
          obj.list = this.dealFinancialAnomalyAnalysisList(obj.list);
        }
        return obj;
      });
    },
    chooseThisYear(year){
      this.reqFinancialStatementAnomalyAnalysis(year);
    },
    clickSkip(){
      window.open("https://ibond.deloitte.com.cn/official/index.html", "");
    }


  },
};
</script>

<style lang="scss" scoped src="@/styles/show-ui/common_dialog_style.scss"></style>

<style lang="scss" scoped>
::v-deep .el-dialog {
  max-height: 100vh;
  margin-top: 50vh !important;
  transform: translateY(-50%);
}

.common-dialog-box ::v-deep .el-dialog__body{
  background: #F8F9FE;
  padding: 16px;
  overflow-y: unset;
}

.financial-intelligence-rating-box {
  border-radius: 4px;
  .composite-risk-level-bar{
    > ul{
      justify-content: space-between;
      > li{
        width: calc(100% / 3 - 80px / 3);
        height: 44px;
        flex-shrink: 0;
        border: 1px solid #F2F3F5;
        border-radius: 4px;
        > div{
          width: 50%;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          > span{
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: #86909C;
          }
          > strong{
            padding: 4px 16px;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
          }
        }
        > div:first-child{
          border-right: 1px solid #F2F3F5;
        }
      }
      > .lightly-suspicious{
        > div{
          > strong{
            color: #000;
            background: rgba(0, 0, 0, 0.08);
          }
        }
      }
      > .moderately-suspicious{
        > div{
          > strong{
            color: #00A3E0;
            background: rgba(0, 163, 224, 0.08);
          }
        }
      }
      > .highly-suspicious{
        > div{
          > strong{
            color: #ED8B00;
            background: #FFF7E8;
          }
        }
      }
      > .seriously-suspicious{
        > div{
          > strong{
            color: #DA291C;
            background: #FFECE8;
          }
        }
      }
      > .missingData-suspicious{
        > div{
          > strong{
            color: #108485;
            background: #e0f6ff;
          }
        }
      }
      > .is-selected{
        background: rgba(0, 163, 224, 0.08);
        border: 1px solid #00A3E0;
        > div:first-child{
          border-right: 1px solid #00A3E0;
          > span{
            color: #00A3E0;
          }
        }
      }
    }
  }
 
  .financial-anomaly-analysis-bar{
    > ul{
      width: 100%;
      > li{
        box-sizing: border-box;
        width: 100%;
        border: 1px solid #F2F3F5;
        margin-bottom: 8px;
        > div{
          width: 100%;
          overflow: hidden;
          > h3{
            box-sizing: border-box;
            width: 100%;
            height: 42px;
            padding: 10px 16px;
            background: #F8F9FB;
            display: flex;
            align-items: center;
            > em{
              width: 12px;
              height: 12px;
              margin-right: 10px;
              flex-shrink: 0;
            }
            > span{
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              color: #37383B;
            }
          }
          > ol{
            // box-sizing: border-box;
            // width: 100%;
            padding: 0 80px;
            margin-right: -45px;
            display: flex;
            flex-wrap: wrap;
            > li{
              height: 42px;
              box-sizing: border-box;
              padding: 10px;
              flex-shrink: 0;
              margin-right: 45px;
              > div{
                height: 100%;
                display: flex;
                align-items: center;
                > em{
                  width: 12px;
                  height: 12px;
                  margin-right: 10px;
                  flex-shrink: 0;
                }
                > .highly-em{
                  background: #EC948D;
                }
                > .moderately-em{
                  background: #F6C580;
                }
                > span{
                  font-family: 'PingFang SC';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 22px;
                  color: #63728B;
                }
              }
            }
          }
        }
      }
      > li:last-child{
        margin-bottom: 0;
      }
      > .seriously-anomaly{}
      > .highly-anomaly{
        > div{
          > h3{
            > em{
              background: #DA291C;
            }
          }
          // > ol{
          //   > li{
          //     > div{
          //       > em{
          //         background: #EC948D;
          //       }
          //     }
          //   }
          // }
        }
      }
      > .moderately-anomaly{
        > div{
          > h3{
            > em{
              background: #ED8B00;
            }
          }
          // > ol{
          //   > li{
          //     > div{
          //       > em{
          //         background: #F6C580;
          //       }
          //     }
          //   }
          // }
        }
      }
    }
  }

  .behavior-anomaly-analysis-bar{
    > ul{
      > li{
        box-sizing: border-box;
        width: 100%;
        padding: 10px 16px;
        border: 1px solid #F2F3F5;
        margin-bottom: 20px;
        flex-shrink: 0;
        > .header-bar{
          width: 100%;
          margin-bottom: 10px;
          align-items: center;
          > span{
            margin-right: 10px;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: #37383B;
          }
          > strong{
            padding: 0 6px;
            background: #FFF0F0;
            flex-shrink: 0;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #DA291C;
          }
        }
        > .content-bar{
          width: 100%;
          word-break: break-all;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #63728B;
          > span{
            color: #00A3E0;
            > span{
              color: #63728B;
            }
          }
        }
      }
    }

  }

  .header{
    > div{
      display: flex;
      align-items: center;
      > em{
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        margin-right: 4px;
        background: url('../../../../../assets/images/dialog/warning-icon.png') center center no-repeat;
        background-size: 100% 100%;
      }
      > span{
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #86909C;
        > span{
          color: #DA291C;
        }
      }
    }
  }
}

.more-info-bar{
  display: flex;
  width: 100%;
  align-items: center;
  > em{
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    margin-right: 4px;
    background: url('../../../../../assets/images/dialog/warning-icon.png') center center no-repeat;
    background-size: 100% 100%;
  }
  > span{
    white-space: nowrap;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #86909C;
    > span{
      cursor: pointer;
      padding-left: 4px;
      color: #00A3E0;
    }
  }
}
</style>