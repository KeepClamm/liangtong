<template>
  <div class="compare-peers-box w100 pt-30">
    <div class="compare-peers-container show-flex-box-c w100 h100">
      <div class="show-flex-box-r w100 mb-24">
        <div class="fg-1">{{ headerTitle }}</div>
        <el-switch
          v-model="viewOnlyRiskItem"
          active-color="#012169"
          inactive-color="#C9CDD4"
          @change="riskOnlyView">
        </el-switch>
        <p class="only-see ml-4">仅查看风险项</p>
      </div>

      <div class="show-flex-box-c">
          <basic-table
            :table-data="tableListData"
            :needScroll="false"
            :show-pagination="false"
            :prop-list="propConfig"
            :spanMethod="spanMethod"
            :border="true"
            showType="no-hover"
          >
            <template #ThirdIndex="{ row }">
              <div class="show-flex-box-r align-center">
                <span :class="`color-${row.fontColor}`" style="text-align: left;">{{ row.ThirdIndex }}</span>
                
                <span 
                  class="table-see" v-if="['财报造假嫌疑', '偿债能力'].includes(row.ThirdIndex)"
                  @click="handleTableSee(row.ThirdIndex, row)"
                  >查看</span>
                <el-popover
                    placement="right"
                    width="180"
                    trigger="hover">
                    <div class="popover-text">
                      <span class="center pt-8">{{ row.ThirdData.desc || '' }}</span>
                    </div>
                  <img slot="reference" class="img-popover ml-6 mt-5" src="@/assets/images/cockpit-risk/question-circle.png" />
                </el-popover>
              </div>
            </template>

            <template #indexScore="{ row }">
              <span>{{ row.indexScore }}</span>
            </template>
            <template #indexRanking="{ row }">
              <span>{{ row.indexRanking }}</span>
            </template>
            <template #averageIndexScore="{ row }">
              <span>{{ row.averageIndexScore }}</span>
            </template>
            <template #scoreStatistics="{ row }">
              <div class="table-line-echart w100 h100" @click="clickItem('scoreStatistics', row)">
                <table-line :ref="`line_Ref_${row.chartIndex}`" />
              </div>
            </template>
            <template #mainDistribution="{ row }">
              <div class="table-line-echart w100 h100" @click="clickItem('mainDistribution', row)">
                <table-pillar :ref="`pillar_Ref_${row.chartIndex}`" />
              </div>
            </template>
            
          </basic-table>
      </div>
    </div>
    <!-- 智慧债券评级弹窗 -->
    <smart-bond-dialog ref="smartBondDialogRef" />
    <earningsGrowthDialog ref="earningsGrowthRef" />
    <financialIntelligenceRatingDialog ref="financialIntelligenceRatingRef" />
  </div>
</template>

<script>
  import BasicTable from '@/components/show-ui/table/basic-table';
  import TableLine from './table-line';
  import TablePillar from './table-pillar';
  import smartBondDialog from './smart-bond-dialog'
  import earningsGrowthDialog from '../../components/earnings-growth-dialog.vue';
  import financialIntelligenceRatingDialog from './financial-intelligence-rating-dialog.vue';
  const warningDarkIcon = require('@/assets/images/common/warning-fill-deep.png');
  const warningRedIcon = require('@/assets/images/common/warning-red.png');
  const warningOrangeIcon = require('@/assets/images/common/warning-orange.png');

  export default {
    components: {
      BasicTable,
      TableLine,
      TablePillar,
      smartBondDialog,
      earningsGrowthDialog,
      financialIntelligenceRatingDialog,
    },
    props: {
      showList: Array,
      headerTitle: String,
      headerTip: String,
      basicInformation: Object, //basic-information
      type: Number, // 1-短期 2-长期
    },
    data() {
      return {
        warningDarkIcon,
        warningRedIcon,
        warningOrangeIcon,
        viewOnlyRiskItem: true,
        spanArr: [],
        aaaArrSecondIndex: [],
        littleTip: [
          {id: 1, name: '智慧债券评级', style: { background: 'rgba(218, 41, 28, 0.08)', color: '#DA291C'},
            icon: require('@/assets/images/common/warning-red.png') },
          {id: 2, name: '每股收益增长率', style: { background: 'rgba(218, 41, 28, 0.08)', color: '#DA291C'},
            icon: require('@/assets/images/common/warning-red.png') },
          {id: 3, name: '每股营收收入增长率', style: { background: 'rgba(237, 139, 0, 0.08)', color: '#ED8B00'},
            icon: require('@/assets/images/common/warning-orange.png') }
        ],
        propConfig: [
          { prop: "FirstIndex", label: "指标类型"},
          { prop: "SecondIndex", label: "指标名称"},
          { prop: "ThirdIndex", label: "指标值", slotName: 'ThirdIndex', width: 190, notOverflow: true, },
          { prop: "indexScore", label: "指标分数", slotName: 'indexScore'},
          { prop: "indexRanking", label: "指标排名", slotName: 'indexRanking'},
          { prop: "averageIndexScore", label: "市场平均指标得分", slotName: 'averageIndexScore'},
          { prop: "scoreStatistics", label: "分数统计", slotName: 'scoreStatistics', notOverflow: true, width: '150px'},
          { prop: "mainDistribution", label: "主体分布", slotName: 'mainDistribution', notOverflow: true, width: '150px'},
        ],
        tableListData: {},
      }
    },
    mounted() {},
    methods: {
      setData(info){
        this.tableListData = info;

        this.spanArr = this.getSpanArr(info.items, 'FirstIndex');
        this.aaaArrSecondIndex = this.getSpanArr(info.items, 'SecondIndex');

        const yAxisCustom = {
          splitNumber: 5,
        }

        const seriesCustom = {
          color: '#012169',
          name: '平均折算率主体数量：',
        }

        this.$nextTick(() => {
          info.items.forEach(item => {
            this.$refs[`line_Ref_${item.chartIndex}`].setOption(item.scoreStatistics, yAxisCustom, seriesCustom);
            this.$refs[`pillar_Ref_${item.chartIndex}`].setOption(item.mainDistribution);
          })
        })

      },
      resizeEcharts(){
        setTimeout(() => {
          this.tableListData.items.forEach(item => {
            this.$refs[`line_Ref_${item.chartIndex}`] && this.$refs[`line_Ref_${item.chartIndex}`].resizeEcharts();

            this.$refs[`pillar_Ref_${item.chartIndex}`] && this.$refs[`pillar_Ref_${item.chartIndex}`].resizeEcharts();
          });
        }, 0);
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
        if(columnIndex === 1) {
          const _row = this.aaaArrSecondIndex[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      // 点击echarts
      clickItem(type, row){
        this.$refs.earningsGrowthRef.open({indexCode: row.ThirdCode, details: row, type: this.type});
      },
      handleTableSee(type, row = {}) {
        switch (type) {
          case '财报造假嫌疑':
            this.$refs.financialIntelligenceRatingRef.open({indexCode: row.ThirdCode,type: this.type});
            break;
          case '偿债能力':
            this.$refs.smartBondDialogRef.open({indexCode: row.ThirdCode,type: this.type},this.basicInformation);
            break;
          default:
            break;
        }
      },
      riskOnlyView(info){
        this.$emit('change-show', info);
      },

      // 根据某个字段进行排序 输出二维数组
      groupBy(data, params) {
        const groups = {};
        data.forEach(v => {
          const group = JSON.stringify(v[params]);
          groups[group] = groups[group] || [];
          groups[group].push(v);
        })

        return Object.values(groups);
      },
      // 计算 数据合并 索引
      getSpanArr(data, params) {
        let arr = []; // 接收重构数组
        let spanArr = []; // 控制合并的数组
        let pos = 0; // 设置索引

        // 排序
        this.groupBy(data, params).map(v => (arr = arr.concat(v)))

        arr.map(res => { // 双向绑定 把源数据改为arr
          data.shift();
          data.push(res);
        })

        const redata = arr.map(v => v[params]);

        redata.reduce((old, cur, i) => {
          if (cur === old) {
            spanArr[pos] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            pos = i;
          }

          return cur;
        }, {});

        return spanArr;
      }
    }
  }
</script>

<style lang="scss" scoped>
.table-see {
  padding: 0 8px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  margin-left: 6px;
  cursor: pointer;
  line-height: 20px !important;
  color: #FFFFFF !important;
  background-color: #012169;
  border-radius: 2px;
  flex-shrink: 0;
}
.table-line-echart {
  position: absolute;
  top: 0;
  left: 0;
}
.color-dark {
  color: #DA291C !important;
}
.color-light {
  color: #ED8B00 !important;
}
.compare-peers-box {
  background-color: #F8F9FE;
}
.compare-peers-container {
  padding: 24px 20px 20px;
  background-color: #ffffff;
  overflow: hidden;
  > div {
    align-items: center;
  }
}
.header-left {
  align-items: center;
  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #1D2129;
  }
}
.risk-box {
    height: 374px;
    div {
      width: 50%;
      height: 100%;
    }
}
.tip-li {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-transform: capitalize;
  > li {
    padding: 4px 16px;
    margin-right: 16px;
  }
}
.only-see {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #86909C;
}
.popover-text {
  font-weight: 400;
  font-size: 14px;
  // line-height: 14px;
  .headline {
    color: #1D2129;
  }
  .center {
    color: #86909C;
  }
}
.img-popover {
  width: 12px;
  height: 12px;
}

::v-deep canvas{
  cursor: pointer;
}
</style>