<template>
  <div class="containeer">
    <div class="table-container">
      <div class="table-title">业务情况一览表</div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :cell-style="cellStyle"
          :header-cell-style="rowClass"
        >
          <el-table-column label="业务编号"  prop="num">
            <template slot-scope="scope">
              <span style="color: #409EFF;cursor: pointer;" @click="openDialog">{{ scope.row.num }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属业务小类" prop="smallClass"></el-table-column>
          <el-table-column label="主体名称" width="280" prop="name"></el-table-column>
          <el-table-column label="部门/子公司" prop="dept"></el-table-column>
          <el-table-column label="授信限额（万元）" prop="limitNum"></el-table-column>
          <el-table-column label="业务小类总敞口/业务规模（万）" prop="smallNum"></el-table-column>
          <el-table-column label="本笔业务敞口/规模（万元）" prop="curNum"></el-table-column>
          <el-table-column label="最近到期金额（万元）" prop="nearNum"></el-table-column>
          <el-table-column label="主体预警等级" prop="mainRisks"></el-table-column>
          <el-table-column label="违约或黑名单标识" prop="status"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="chart-container">
      <el-carousel
        trigger="click"
        height="800px"
        style="background-color: #f2f2f2;border-radius: 8px;"
        :autoplay="false"
        arrow="never"
      >
        <el-carousel-item style="display: flex;flex-direction: column;justify-content: space-around;">
          <div class="carousel-item-box">
            <div>信用类业务额度使用</div>
            <div class="carousel-item-main">
              <div>
                <div ref="carouselItemOne" class="carousel-item-one">
                  <div class="carousel-item-one-abs height-credit"></div>
                </div>
              </div>
              <div class="carousel-item-desc">
                <div>总授信限额（万）：3587333.2</div>
                <div>已占用额度（万）：1301352.03</div>
                <div>占用比例：36.28%</div>
                <div>总敞口规模（万）：773068.82</div>
              </div>
            </div>
          </div>
          <div class="carousel-item-box">
            <div style="margin: 0;"></div>
            <div class="carousel-item-main">
              <div>
                <div ref="carouselItemOne" class="carousel-item-one d96464-border">
                  <div class="carousel-item-one-abs d96464 height-risk"></div>
                </div>
              </div>
              <div class="carousel-item-desc">
                <div>高风险机构客户授信限额（万）：74622.99</div>
                <div>高风险机构客户已用限额（万）：13091.89</div>
                <div>高风险机构客户额度占用： 17.54%</div>
              </div>
            </div>
          </div>
          <div class="carousel-item-box">
            <div>非信用类业务规模情况</div>
            <div class="carousel-item-main">
              <div>
                <div
                  ref="carouselItemOne"
                  class="carousel-item-one ffc000-border"
                >
                  <div class="carousel-item-one-abs ffc000 height-noncredit"></div>
                </div>
              </div>
              <div class="carousel-item-desc">
                <div>非信用类总业务规模（万）：1787476.33</div>
                <div>高风险机构客户业务规模（万）：74622.99</div>
                <div>高风险机构客户业务规模占比：4.17%</div>
              </div>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="carousel-item-title">业务敞口/规模前三大部门/子公司</div>
          <div class="carousel-item-chart">
            <div ref="creditService" style="height: 380px; width: 450px"></div>
            <div
              ref="nonCreditService"
              style="height: 380px; width: 450px"
            ></div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <service-dialog ref="serviceDialog"></service-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getSameServiceData } from '@/api/sameService'
import serviceDialog from './service-dialog.vue';
export default {
  components: { serviceDialog },
  data() {
    return {
      tableData: [],
      creditServiceInstance: null,
      nonCreditServiceInstance: null,
    };
  },
  mounted() {
    getSameServiceData().then(res => {
      console.log('res', res)
      this.tableData = res.data || []
    })
    this.creditServiceInstance = echarts.init(this.$refs.creditService);
    this.nonCreditServiceInstance = echarts.init(this.$refs.nonCreditService);

    this.creditServiceInstance.setOption(this.setOptionCredit());
    this.nonCreditServiceInstance.setOption(this.setOptionNonCredit());
    this.$nextTick(_ => {

      window.addEventListener("resize", function () {
      // this.creditServiceInstance.resize();
      console.log('窗口改变')
      });
    })
    // window.addEventListener("resize", function () {
    //   this.nonCreditServiceInstance.resize();
    // });
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return "text-align: center;color: #86909c;height:48px";
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return "text-align: center;height: 60px;";
    },
    openDialog() {
      this.$refs.serviceDialog.open()
    },
    setOptionCredit() {
      return {
        title: {
          show: true,
          text: "信用类业务敞口规模（万元）",
          x: "center",
          y: "top",
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["固定收益部", "贸易金融部", "信用交易部"],
          axisLabel: {
            rotate: 270, // 设置标签的宽度，根据需要调整,
          },
        },
        series: [
          {
            name: "柱状图",
            type: "bar",
            data: [10, 20, 30],
          },
        ],
      };
    },
    setOptionNonCredit() {
      return {
        title: {
          show: true,
          text: "非信用类业务规模（万元）",
          x: "center",
          y: "top",
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["固定收益部", "贸易金融部", "信用交易部"],
          axisLabel: {
            rotate: 270, // 设置标签的宽度，根据需要调整
          },
        },
        series: [
          {
            name: "柱状图",
            type: "bar",
            data: [2000, 4000, 6000],
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.height-credit {
  height: calc(200px * 0.36) !important;
}
.height-risk {
  height: calc(200px * 0.17) !important;
}
.height-noncredit {
  height: calc(200px * 0.04) !important;
}
::v-deep .el-carousel__indicator button {
  background-color: #2b1b20;
}
.ffc000-border {
  border: 2px solid #ffc000 !important;
}
.d96464 {
  background-color: #d96464 !important;
}
.d96464-border {
  border: 2px solid #d96464 !important;
}
.ffc000 {
  background-color: #ffc000 !important;
}
.containeer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .table-container {
    width: 70%;
    margin-right: 50px;
    .table-title {
      width: 100%;
      font-size: 18px;
      font-weight: 700;
      text-align: center;
    }
    & > div:last-child {
      width: 100%;
    }
  }
  .chart-container {
    width: 500px;
    height: 100%;
    .carousel-item-box {
      padding-left: 20px;
      width: 100%;
      min-width: 480px;
      display: flex;
      flex-direction: column;
      align-items: center;
      & > div:first-child {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      .carousel-item-main {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        & > div:first-child {
          display: flex;
          justify-content: center;
          .carousel-item-one {
            height: 160px;
            width: 160px;
            border-radius: 50%;
            position: relative;
            border: 2px solid #1569c2;
            background-color: #fff;
            overflow: hidden;
            margin-right: 20px;
            .carousel-item-one-abs {
              height: 100px;
              width: 160px;
              position: absolute;
              bottom: -2px;
              left: -2px;
              background-color: #00a3e0;
            }
          }
        }
        .carousel-item-desc {
          width: 50%;
          display: flex;
          flex-direction: column;
          & > div {
            padding: 8px 0px;
            font-size: 12px;
            // text-overflow: ellipsis;
            // word-break: break-all;
            // white-space: nowrap;
            // overflow: hidden;
          }
        }
      }
    }

    .carousel-item-title {
      padding: 20px 0px 0px 20px;
      font-size: 18px;
      font-weight: 700;
    }
    .carousel-item-chart {
      height: 800px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
