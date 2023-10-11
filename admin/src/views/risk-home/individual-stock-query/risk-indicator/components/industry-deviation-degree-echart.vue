<template>
  <div class='industry-deviation-degree-echart-box border-box show-flex-box-r w100 h100'>
    <div class="left-bar">
      <div class='w100 h100' ref="radar-echart-ref"></div>
    </div>
    <div class="right-bar show-flex-box-r">
      <ul class="show-flex-box-c filter-bar">
        <li
          :class="{'w100 show-flex-box-r': true, 'choose-company': !item.fixed}"
          v-for="(item, index) in lineList"
          :key="index"
        >
          <em :class="{'is-selected': item.selected}" @click.stop="chooseThisItem(item, index)"></em>
          <div :class="{'show-flex-box-r': true, 'select-item-bar': !item.fixed}">
            <em :style="`background: ${item.color}`"></em>
            <strong v-if="item.fixed">{{item.name}}</strong>
            <div class="select-item show-flex-box-r" v-else>
              <el-autocomplete
                style="width: 100%;"
                :placeholder="`可对比公司${index-2}`"
                v-model="item.companyName"
                size="small"
                :clearable="true"
                filterable
                type="text"
                value-key="stockShortName"
                :trigger-on-focus="false"
                :fetch-suggestions="querySearchAsync"
                @select="changeSelectedCompany($event,index)"
              >
                <img
                  slot="prefix"
                  class="search-icon"
                  src="@/assets/images/individual-stocks/search-icon.png"
                >
              </el-autocomplete>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const echarts = require("echarts");
import CommonUtils from '@/utils/commonUtils';

import { RADAR_CHART_DATA } from '../mock';
export default {
  props: {
    type: {
      type: [Number, String],
      default: 1
    }
  },
  components: {},
  data() {
    return {
      radarEchart: null,
      colorList: [],
      lineList: [
        { selected: true, color: '#ED8B00', name: '当前主体', fixed: true, },
        { selected: true, color: '#012169', name: '全市场中位数', fixed: true, },
        { selected: true, color: '#26890D', name: '行业中位数', fixed: true, },
        { selected: false, color: '#00A3E0', companyId: '',companyName: '', fixed: false, },
        { selected: false, color: '#CB2634', companyId: '',companyName: '', fixed: false, },
        { selected: false, color: '#722ED1', companyId: '',companyName: '', fixed: false, },
      ],
      companyList: [],
      companyListMap: {},
      curDegreeInfoMap: {},
      // 指标名称
      indicatorNames: []

    };
  },
  computed: {},
  watch: {
    type(){
      this.toDrawEcharts(true);
    }
  },
  created() {},
  mounted() {
    // this.curStockInfo = this.$store.getters.CurWatchStock;
    this.curStockInfo = {
        id: "000001.SZ",
        name: "平安银行"
      }
    this.toDrawEcharts(true);
  },
  methods: {
    resizeEcharts() {
      this.radarEchart && this.radarEchart.resize();
    },
    dealConpanyList(list){
      let result = [];
      let map = {};
      
      list.forEach(item => {
        result.push({
          id: item.stockCode,
          name: item.stockShortName,
        });

        map[item.stockCode] = item.stockShortName;
      })

      this.companyListMap = map;
      return result;
    },
    reqRiskIndicatorIndustryDeviationDegreeInfo(){
      let params = {
        type: this.type,
        stockCode: this.curStockInfo.id,
      };

      let selectedIds = this.getSelectedCompanyIds();
      if (selectedIds.length > 0) {
        params.stockCodeList = selectedIds;
      }
      
      let datum = RADAR_CHART_DATA;
      this.indicatorNames = this.disposeIndicator(datum.level2IndicatorNames);

      this.curDegreeInfoMap = this.dealList(datum.data.data || []);
      this.toDrawEcharts(false);
    },
    disposeIndicator(data = []) {
      let series = [];

      data.forEach(item => {
        series.push({
          name: item,
          max: 100
        })
      })
      return series;
    },
    getSelectedCompanyIds(){
      let ids = [];
      let list = this.lineList;

      list.forEach(item=>{
        if (item.selected && item.companyId) {
          ids.push(item.companyId);
        }
      });
      
      return ids;
    },
    dealList(list){
      let map = {};

      list.forEach(item => {
        map[item.name] = item.value;
      })

      return map;
    },
    toDrawEcharts(needGainData){ // 是否需要调接口
      if (needGainData) {
        this.reqRiskIndicatorIndustryDeviationDegreeInfo();
      } else {
        this.colorList = this.lineList.reduce((pre, cur)=>{
          return cur.selected ? [...pre, cur.color] : pre;
        }, []);
        
        this.drawRadarEchart();
      }
    },
    drawRadarEchart(){
      const curDegreeInfoMap = this.curDegreeInfoMap;
      const list = this.lineList;
      const titleNameList = [];
      const series = [];
      const NormalInfo = {
        symbolSize: 0,
        symbol: 'none',
      };
      list.forEach(item => {
        if (item.selected) {
          let itemName;
          if (item.fixed) {
            itemName = item.name;
          } else {
            itemName = this.companyListMap[item.companyId];
          }

          titleNameList.push(itemName);
          series.push({
            name: itemName,
            value: curDegreeInfoMap[itemName],
            ...NormalInfo,
          });
        }
      });
      
      this.setOption(series);
    },
    setOption(series){
      let chartDom = this.$refs['radar-echart-ref'];
      this.radarEchart = echarts.init(chartDom);

      let option = {
        tooltip: {
          trigger: 'item',
          transitionDuration: 0,
          // backgroundColor: "rgba(50, 50, 50, 0.7)",
          backgroundColor: "#FFF",
          borderColor: "#ccc",
          borderWidth: 0,
          padding: 5,
          textStyle: {
            // color: "#FFFFFF",
            color: "#1D2129",
            fontSize: "14px / 21px Microsoft YaHei",
            align: 'left'
          },
          formatter: (param) => {
            var str = param.name + "</br>";
            this.indicatorNames.forEach((res,index)=>{
              let p = res.name + '：' + CommonUtils.dealNum(param.value[index]) + "</br>";
              str += p
            })
            return str;
          },
        },
        color: this.colorList,
        legend: {
          show: false,
        },
        radar: {
          indicator: this.indicatorNames,
          axisName: {
            color: "#2D2D2D",
            fontStyle: "normal",
            fontWeight: 400,
            fontFamily: "Lato",
            fontSize: 12,
            lineHeight: 14,
          },
          nameGap: 10,
          splitNumber: 5,
          radius: 158,
          center: ['46%', '50%'],
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#E7EAEE',
              width: 1,
            }
          },
          splitLine: {
            lineStyle: {
              color: '#E7EAEE',
              width: 1,
            }
          },
        },
        series: [{
          type: 'radar',
          emphasis: {
            lineStyle: {
              width: 4
            }
          },
          data: series
        }]
      };

      this.radarEchart.setOption(option);
    },
    chooseThisItem(item, index){
      if (item.fixed) {
        this.lineList[index].selected = !this.lineList[index].selected;
        this.toDrawEcharts(false);
        return ;
      }

      if (!item.companyId && !item.selected) {
        this.$message({
          message: `请先添加对比公司${index-2}！`,
          type: 'warning'
        });
        return ;
      }

      this.lineList[index].selected = !this.lineList[index].selected;

      let needGainData = item.selected; // 如果是取消选中 就不调接口了

      this.toDrawEcharts(needGainData);
    },
    changeSelectedCompany(val, index){
      this.lineList[index].companyId = val.stockCode;
      if (val.stockCode) {
        let list = this.lineList.filter(item => {
          return item.companyId == val.stockCode;
        });
        if (list.length > 1) {
          this.$message({
            message: '请勿添加重复的公司进行对比！',
            type: 'warning'
          });
          this.lineList[index].companyName = '';
          this.lineList[index].companyId = '';
        } else if (this.lineList[index].selected) {
          this.toDrawEcharts(true);
        }
      }
    },
    querySearchAsync(queryString, cb){
      const params = {
        keywords: queryString
      };
      getRiskIndicatorSimpleStockList(params, false).then(res=>{
        this.companyList = this.dealConpanyList(res.data || []);
        cb(res.data);
      })
    },


  },
}
</script>
<style lang='scss' scoped>
  .industry-deviation-degree-echart-box{
    padding-left: 24px;
    > .left-bar{
      width: 472px;
      flex-shrink: 0;
    }
    > .right-bar{
      box-sizing: border-box;
      padding-top: 17.5px;
      padding-bottom: 17.5px;
      width: 0;
      flex-grow: 1;
      justify-content: center;
      > .filter-bar{
        width: 405px;
        justify-content: space-between;
        > li{
          box-sizing: border-box;
          align-items: center;
          padding: 0 10px;
          height: 39px;
          > em{
            cursor: pointer;
            width: 16px;
            height: 16px;
            margin-right: 10px;
            flex-shrink: 0;
            background: url('../../../../../assets/images/individual-stocks/checkbox-icon.png') center center no-repeat;
            background-size: 100% 100%;
          }
          > .is-selected{
            background: url('../../../../../assets/images/individual-stocks/selected-checkbox-icon.png') center center no-repeat;
            background-size: 100% 100%;
          }
          > div{
            background: #F8F9FB;
            flex-grow: 1;
            height: 100%;
            box-sizing: border-box;
            padding: 10px 16px;
            align-items: center;
            > em{
              width: 10px;
              height: 10px;
              border-radius: 100%;
              margin-right: 8px;
              flex-shrink: 0;
            }
            > strong{
              white-space: nowrap;
              font-family: 'Lato';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 19px;
              letter-spacing: 0.5px;
              color: #2D2D2D;
            }
            > .select-item{
              flex-grow: 1;
            }
          }
          > .select-item-bar{
            padding: 12px 16px;
          }
        }
        > li:nth-child(4),
        > li:nth-child(5),
        > li:nth-child(6){
          > em{
            cursor: pointer;
          }
        }
        > .choose-company{
          height: 56px;
        }
      }
    }
  }
  .search-icon{
    width: 16px;
    height: 16px;
  }
  .select-item ::v-deep .el-input__prefix{
    left: 12px;
    top: 8px;
    width: 16px;
    height: 16px;
  }
  .select-item ::v-deep .el-input__inner{
    padding-left: 36px;
    background: #FFFFFF;
    border: 1px solid #D0D5DD;
    border-radius: 0px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #2D2D2D;
  }
</style>