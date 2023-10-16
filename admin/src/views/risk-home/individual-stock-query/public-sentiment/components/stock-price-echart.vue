<template>
  <div class='stock-price-echart-comp-box white-bg border-box'>
    <div class="header-bar show-flex-box-r show-flex-sb">
      <p class="page-title">舆情股价走势图</p>

      <div class="handle-bar" v-if="lineEchart">
        <ul>
          <li
            v-for="(item, index) in handleBtnList"
            :key="index"
            @click="changeIsShowItem(item, index)"
          >
            <template v-if="item.needLegend">
              <em :class="{'is-selected': item.isChoosed}"></em>
              <div v-if="item.needLegend" :style="`border-color: ${item.color}`"></div>
              <span>{{ item.text }}</span>
            </template>
          </li>
        </ul>
      </div>
    </div>

    <div class="w100 fs-0 height296" style="position: relative;">
      <div class="w100 h100" ref="stock-price-echart-ref"></div>

      <div class="clicktooltip show-flex-box-c" :style="`top: ${tooltipBoxTop}px; left: ${tooltipBoxLeft}px; display: ${showTooltipBox ? 'flex' : 'none'};`" v-if="lineEchart && lineInfo">
        <header>
          <span>{{ lineInfo.date }}</span>
          <em @click.stop="closeTooltip()"></em>
        </header>
        <ul v-if="lineInfo.list && lineInfo.list.length > 0">
          <li
            v-for="(item, index) in lineInfo.list"
            :key="index"
          >
            <em :style="`background: ${lineColorMap[item.type]};`"></em>
            <p :class="{'can-click': item.canClick}" @click.stop="item.canClick && openNegativeNewsPop(item)">{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <negativeNewsDialog ref="negativeNewsDialogRef" />
    </div>
  </div>
</template>

<script>
const echarts = require("echarts");
import CommonUtils from '@/utils/commonUtils';
import negativeNewsDialog from '@/components/show-ui/negative-news-dialog';

export default {
  components: {
    negativeNewsDialog,
  },
  data() {
    return {
      parentWidth: '',
      curStockInfo: {},
      lineEchart: null,
      info: null,

      lineColorMap: {
        '0': '#A0DCFF',
        '1': '#ED8B00',
        '2': '#DA291C',
        '3': '#DA291C',
      },

      handleBtnList: [
        { type: 'sharePrice', text: '股价', isChoosed: true, needLegend: true, color: '#012169', field: 'sharePriceLineSeries', yAxisIndex: 0, },
        { type: 'showSevere', text: '显示高度关注與情', isChoosed: true, needLegend: true, color: '#DA291C' },
        { type: 'showModerate', text: '显示中度关注舆情', isChoosed: true, needLegend: true, color: '#ED8B00' },
        { type: '', text: '', isChoosed: true, needLegend: false, },
      ],

      showTooltipBox: false,
      tooltipBoxTop: 0,
      tooltipBoxLeft: 0,
      lineInfo: null,

    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
  },
  watch: {
    sidebar: {
      handler(newName, oldName) {
        setTimeout(() => {
          this.resizeEcharts();
        }, 300);
      },
      deep: true,
    },
  },
  mounted() {
    this.parentWidth = this.$el.offsetWidth;

    window.addEventListener("resize", this.resizeEcharts, true);
  },
  methods: {
    resizeEcharts(){
      this.parentWidth = this.$el.offsetWidth;

      this.lineEchart && this.lineEchart.resize();
    },
    drawEcharts(info){
      this.info = info;
      this.setOption();
    },
    setOption(){
      this.lineEchart && this.lineEchart.clear();

      const info = this.info || {};
      let chartDom = this.$refs["stock-price-echart-ref"];
      this.lineEchart = echarts.init(chartDom);
      const that = this;

      let lineList = [];
      const xAxis = info.xAxis;
      const redLineList = info.redLineList;
      const yellowLineList = info.yellowLineList;
      const showSevere = this.handleBtnList[1].isChoosed; // 高度关注
      const showModerate = this.handleBtnList[2].isChoosed; // 重度关注

      xAxis.forEach((item, index) => {
        const redItem = redLineList[index];
        const yellowItem = yellowLineList[index];
        let obj = {
          date: item,
          type: '',
          list: [],
        };

        if (redItem && yellowItem) {
          obj.type = '1';
          obj.list = this.getTextList(yellowItem);
          if (showSevere) {
            obj.type = '3';
            obj.list = this.getTextList(redItem);
          }
        } else if (redItem) {
          obj.type = '2';
          obj.list = this.getTextList(redItem);
        } else if (yellowItem) {
          obj.type = '1';
          obj.list = this.getTextList(yellowItem);
        }

        lineList.push(obj);
      });

      let series = [];

      this.handleBtnList.forEach(item => {
        if (item.needLegend && item.isChoosed) {
          series.push({
            name: item.text,
            type: 'line',
            smooth: false, // true 是否平滑
            symbol: 'none', // 去掉折线图的点
            color: item.color,
            lineStyle: { width: 2, },
            yAxisIndex: item.yAxisIndex,
            data: info[item.field] || []
          });
        }
      });

      let option = {
        grid: {
          top: "30",
          left: "24",
          right: "24",
          bottom: "0",
          containLabel: true,
          height: 268,
        },
        tooltip: {
          trigger: 'axis',
          formatter: (list) => {
            let hasLine = lineList.filter(item => {
              return item.date == list[0].name;
            });

            let axisValue = list[0].axisValue.split('.').join('-');
            let tooltip = `${axisValue}`;

            list.forEach(item => {
              item.marker = item.marker.replace('border-radius:10px', 'border-radius:10px;border: 1px solid #FFFFFF');
              let p = `<br /> ${item.marker} ${item.seriesName}: ${item.data || '-'} `;
              tooltip += p;
            });

            if(hasLine.length > 0){
              tooltip += `<br /> *点击事件线，显示详细事件列表`;
            }

            return tooltip;
          }
        },
        xAxis: {
          type: 'category',
          data: info.xAxis || [],
          axisTick: {
            show: true,
            alignWithLabel: true,
            inside: true,
            length: '237',
            lineStyle: {
              color: '#DDE3EE',
              width: '0.5'
            }
          },
          // boundaryGap: false, // 不留白，从原点开始
          axisLabel: {
            show: true,
            color: "#4B5468",
            fontSize: "14",
            interval: "auto", // 0 强制显示所有标签
            overflow: "truncate",
            margin: 17
          },
          axisLine: {
            lineStyle: {
              color: "#4B5468",
            },
          },
        },
        yAxis: [
          {
            // max: 12,
            // min: 0,
            scale: true,

            splitNumber: 4,
            alignTicks: true,
            splitLine: {
              show: true, // 显示
              lineStyle: {
                type: 'dashed'//虚线
              },
            },
            axisLabel: {
              show: true,  // 是否显示,默认true
              color: '#4B5468', // 标签的颜色设置,默认取轴线的颜色 
              formatter: function (value, index) {
                let category =  that.dealShowPersent(value/100)
                return category;
              }
            },
            axisLine: {
              show: false,
            }
          },
          {
            max: 5,
            min: 1,
            splitNumber: 4,
            inverse: true, //是否反向坐标轴(默认false)
            splitLine: {
              lineStyle: {
                type: 'dashed'//虚线
              },
              show: true //隐藏
            },
            axisLabel: {
              // formatter: 'R{value}'
              formatter: ''
            }
          }
        ],
        dataZoom: [{
          type: 'inside',
          throttle: 50,
          start: 0,
          end: 100
        }],
        series: [
         {
            "name":"111",
            "type":"line",
            "smooth":false,
            "symbol":"none",
            "color":"#000",
            "lineStyle":{
                "width":2
            },
            "yAxisIndex":1,
            "data":[
               
            ],
          },
          ...series,
          
        ],
      };

      let dataList = [];

      for (let i = 0; i < lineList.length; i++) {
        const item = lineList[i];
        const type = item.type;

        let line = [
          { coord: [item.date, 5], lineStyle: { color: this.lineColorMap[type]} },
          { coord: [item.date, 1] }
        ];

        if (!showSevere && !showModerate) {
          continue;
        }

        if (!showSevere) {
          if (type == 2) {
            continue;
          } else if (type == 3) {
            line[0].lineStyle.color = '#ED8B00';
          }
        }

        if (!showModerate) {
          if (type == 1) {
            continue;
          }
        }
        
        if(item.list.length) {
          dataList.push(line);
        }
      }

      if (this.handleBtnList[3].isChoosed) {
        const index = series.findIndex(item=>{
          return series.name = this.handleBtnList[0].text;
        });

        if (!option.series[index]) {
          return;
        }

        option.series[index].markLine = {
          // 中度关注舆情 - #ED8B00 高度关注舆情 - #DA291C
          // silent: true, // 是否不响应和触发鼠标事件
          symbol: ['none', 'none'],
          label: { show: false },
          lineStyle: {
            width: 2,
            type: 'dashed',
          },
          emphasis: {
            lineStyle: {
              width: 3,
            },
          },
          data: dataList,
        }
      }

      this.lineEchart.setOption(option);

      //事件
      this.lineEchart.on('click', (params) => {
        const eventX = params.event.offsetX;

        if (params.componentType == 'markLine') {
          let overWidth;
          if (eventX + 457 >= this.parentWidth - 10) { // 10 为冗余量
            overWidth = eventX + 457 - this.parentWidth;
          }

          this.showTooltipBox = true;
          this.tooltipBoxTop = params.event.offsetY - 10;
          this.tooltipBoxLeft = params.event.offsetX + 15; // x轴再多17px

          if (overWidth > 0) { // 超出
            this.tooltipBoxLeft = this.tooltipBoxLeft - 457 - 15 - 15;
          }

          const makeData = lineList.filter(item =>{
            return item.list && item.list.length > 0
          })

          const lineInfo = makeData[params.dataIndex];
          this.lineInfo = lineInfo;
        }
      });
    },
    getTextList(list){
      const map = {
        '低度关注': '0',
        '中度关注': '1',
        '高度关注': '2',
      };

      return list.map(item => {
        let obj = { ...item };
        obj.newsTime = CommonUtils.formateDate(obj.newsTime, 'YYYY-MM-DD');
        obj.text = obj.newsTitle;
        obj.canClick = true;
        obj.type = map[obj.importantInfo];
        return obj;
      });
    },
    changeIsShowItem(item, index){
      this.closeTooltip();
      item.isChoosed = !item.isChoosed;
      this.setOption();
    },
    closeTooltip(){
      this.showTooltipBox = false;
      this.tooltipBoxTop = 0;
      this.tooltipBoxLeft = 0;
      this.lineInfo = null;
    },
    openNegativeNewsPop(item){
      // negativePublicOpinionDetail({ id: item.id }).then(res => {
      //     const data = res.data;
      //     this.$refs.negativeNewsDialogRef.open({
      //       title: data.newsTitle || '',
      //       time: CommonUtils.formateDate(data.newsTime, 'YYYY-MM-DD'),
      //       source: data.newsSource,
      //       content: data.newsText
      //     });
      //   })
    },
    dealShowPersent(numerator){
      return CommonUtils.dealShowPersent(numerator,1,0) - 0;
    },
  },
}
</script>
<style lang='scss' scoped>
  .stock-price-echart-comp-box{
    // padding: 24px 20px;
    padding: 24px 0px;
    > .header-bar{
      box-sizing: border-box;
      width: 100%;
      padding: 0 20px;
      > .handle-bar{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-grow: 1;
        height: 20px;
        > ul{
          display: flex;
          flex-shrink: 0;
          align-items: center;
          > li{
            user-select: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-right: 24px;
            > em{
              width: 16px;
              height: 16px;
              flex-shrink: 0;
              margin-right: 4px;
              background: url('../../../../../assets/images/individual-stocks/checkbox-icon.png') center center no-repeat;
              background-size: 100% 100%;
            }
            > .is-selected{
              background: url('../../../../../assets/images/individual-stocks/selected-checkbox-icon.png') center center no-repeat;
              background-size: 100% 100%;
            }
            > div{
              width: 12px;
              height: 0;
              flex-shrink: 0;
              border-style: solid;
              border-width: 1px;
              margin-right: 4px;
            }
            > span{
              white-space: nowrap;
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              color: #6E7B91;
            }
          }
          > li:last-child{
            margin-right: 0;
          }
        }
      }
    }

    .height296{
      height: 296px;
    }
  }

  .clicktooltip{
    height: 122px;
    max-height: 140px;
    position: absolute;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(14px);
    border-radius: 4px;
    box-sizing: border-box;
    width: 457px;
    padding: 16px;
    right: 20px;
    > header{
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      > span{
        word-break: break-all;
        white-space: nowrap;
        flex-grow: 1;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        color: #1D2129;
      }
      > em{
        cursor: pointer;
        width: 12px;
        height: 12px;
        flex-shrink: 0;
        background: url('../../../../../assets/images/upload/close-icon.png') center center no-repeat;
        background-size: 100% 100%;
      }
    }
    > ul{
      flex-grow: 1;
      overflow-y: scroll;
      > li{
        display: flex;
        margin-bottom: 10px;
        > em{
          width: 10px;
          height: 10px;
          border-radius: 8px;
          flex-shrink: 0;
          margin-top: 6px;
          margin-right: 8px;
        }
        > p{
          flex-grow: 1;
          word-break: break-all;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #6E7B91;
        }
        > .can-click{
          cursor: pointer;
          text-decoration: underline;
        }
      }
      > li:last-child{
        margin-bottom: 0;
      }
    }
  }
</style>