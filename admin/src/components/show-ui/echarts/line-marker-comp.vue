<template>
  <div class="w100 h100" style="position: relative; overflow: hidden;">
    <div class='w100 h100' ref="line-echart-ref"></div>

    <div class="handle-bar" v-if="lineEchart">
      <div class="left-bar">
        <ul>
          <li>
            <em></em>  
            <span>股票价格波动</span>
          </li>
          <li>
            <em></em>
            <span>五级分层波动</span>
          </li>
          <!-- <li>
            <em></em>
            <span>高风险舆情数量</span>
          </li> -->
        </ul>
      </div>
      
      <!-- <ul class="right-bar">
        <li @click="changeShowStatus()">
          <em :class="{'is-selected': showGreatConcern}"></em>
          <span>显示高度关注與情</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
const echarts = require("echarts");
const symbolUrl = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKjSURBVHgB7ZgxctQwFIZ/OVkKaPYIyw1yAsacgHFJBdxgqZhhMxOn2DBULCcg6ei8OUEMFwBOkHCCTcHQeMcPPZmAZ7OSniRvqnyNPWNJ8/vpvaffBu5JQyGVshqjwQEIE73apFs1W4HaHxjhO8riGgnEC5xVOZQ60ne5Z2QNUqeYPztDBOECWRjUBz3zIGSajvAVRvRUR/QqZFoWMhiH50c6ahfB4hje/rW6NGsEsCceaRamEunkePIc+Pr5i2SwTOBw4m4Qi/TnYFcMF9gFpHNyXtSuIYIcVJ+wK7ou4MQt8G318l9v88FVqnCq75bmXkbedQU7+66HyNQLSISBXt3aKvNyOkK+F+yiWFsfWyfyCbFWK/jErXUevbf0tjfVBCP1Td+NHatc4xc9xmL7iWPf4kbS61RpFcfws5Zew80YD+1RtgskQe5Jjq8HOic5Si727MEIO0n6KGEhsFkgj8DWngLxAocks79AFjPJwCkwrcbwUVYTbyW32couw0ajvZyPR/5Gq9cpvWOo/Wl7ZBfYVac7igpTpzvp3I+7l3KrOimswXA3aqKP/uNIm4jZcqKvZ8ZBM9yizDzK4ad2PXSbha7RXmKXNLpJO3qpu4p5IlGUVRdBdOxs9JC0mbVJ8qQPn61w7s2L0jfML7CL4jEGRxsMAfKPpsMlm9YcQ9Dq4jspppKh8pOkMW+cvtW8tb8FvfEvcoFDbTXbs4X8Yz7sLJ4XC8C4kzgEVbtJuFnY11stt/R9aknVbhIu0NgnKoLm8As1sqrdJM5u8dlJXqf8H3bVgVt7Q7wf5HyUnDKcd++K6LxNM6wjcC9z2bKovOuTJpDzsTH5eLttJORdn/QfmMy23yMelyJlmG8S/mjvFw3FF8Vu4b8Js3P/34h77pA/HbP5Nm3J0N4AAAAASUVORK5CYII=';
import CommonUtils from '@/utils/commonUtils';

export default {
  props: {
    showType: {
      type: [Number, String],
      default: 1
    },
  },
  data() {
    return {
      lineEchart: null,
      showGreatConcern: true,

    };
  },
  mounted() {
    window.addEventListener('resize', this.resizeEcharts, true);
  },
  methods: {
    resizeEcharts() {
      this.lineEchart && this.lineEchart.resize();
    },
    setOption(info = {},type) {
      let chartDom = this.$refs['line-echart-ref'];
      this.lineEchart = echarts.init(chartDom);
      const that = this;

      let option = {
        grid: {
          top: "24",
          left: "2",
          right: "0",
          bottom: "30",
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter: (list) => {
            let axisValue = list[0].axisValue.split('.').join('-')
            let tooltip = `${axisValue}`
            // type: 1, // 1 短期 2 长期
            list.forEach(item => {
              let unit = item.seriesName == '五级分层波动' ? type == 1 ? 'SR': 'LR': '';
              item.marker = item.marker.replace('border-radius:10px', 'border-radius:2px;border: 1px solid #FFFFFF');
              let p = `<br /> ${item.marker} ${item.seriesName}: ${unit}${item.value} `;
              tooltip += p
            })
            return tooltip

            // let tooltip = '';
            // const data = list[1].data.data;

            // if (data.changeState == -1) {
            //   let cause = data.cause || [];
            //   const prefix = that.showType == 1 ? 'SR' : 'LR';
            //   let causeStr = '';

            //   cause.forEach(item => {
            //     causeStr += (`
            //       <p style="font-family: 'PingFang SC';font-style: normal;font-weight: 400;font-size: 14px;line-height: 14px;color: #86909C;margin-bottom: 8px;">${item}</p>
            //     `);
            //   });

            //   tooltip =
            //   ` <div style="display: flex;flex-direction: column;">
            //       <p style="font-family: 'PingFang SC';font-style: normal;font-weight: 400;font-size: 14px;line-height: 14px;color: #1D2129;margin-bottom: 12px;">${list[1].axisValueLabel} 短期五级分层从${prefix}${data.originalRation}下降到${prefix}${data.currentRating}</p>
            //       <p style="font-family: 'PingFang SC';font-style: normal;font-weight: 400;font-size: 12px;line-height: 12px;color: #86909C;margin-bottom: 8px;">下调原因:</p>
            //       ${causeStr}
            //     </div>
            //   `;
            // }

            // return tooltip;
          }
        },
        xAxis: {
          type: 'category',
          data: info.xAxis || [],
          axisTick: {
            show: true,
            alignWithLabel: true,
            inside: true,
            length: '172',
            lineStyle: {
              color: '#DDE3EE',
              width: '0.5'
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
        yAxis: [
          {
            // max: 12,
            // min: 13.43,
            scale: true,
            splitNumber: 4,
            alignTicks: true,
            type: 'value',
            splitLine: {
              show: true, // 显示
              lineStyle: {
                type: 'dashed'//虚线
              },
            },
            axisLabel: {
              show: true,  // 是否显示,默认true
              color: '#4B5468',
              formatter: function (value, index) {
                // let category =  that.dealShowPersent(value/100)
                // return category;
                // TODO y轴保留两位小数
                return value.toFixed(2);
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
              formatter(value){
                return `${that.showType == 1 ? 'SR' : 'LR'} ${value}`;
              }
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
            name: '股票价格波动',
            type: 'line',
            smooth: false, // true
            symbol: 'none', //去掉折线图的点
            // symbol: symbolUrl,
            // symbolSize: 20,
            // showSymbol: false,
            color: '#012169',
            lineStyle: {
              width: 4,
            },
            yAxisIndex: 0,
            data: info.series.one || [],
          },
          {
            name: '五级分层波动',
            type: 'line',
            symbol: symbolUrl,
            symbolSize: 20,
            showSymbol: false,
            symbolOffset: [0, -14],
            color: '#00A3E0',
            lineStyle: {
              width: 4, //设置线宽为0
            },
            yAxisIndex: 1,
            data: info.series.two || [],
          },
        ]
      };

      // option.series[1].markLine = {
      //   // 高度关注舆情 - #ED8B00
      //   // silent: true, // 是否不响应和触发鼠标事件
      //   symbol: ['none', 'none'],
      //       // yAxisIndex: 1,
      //   label: { show: false },
      //   lineStyle: {
      //     width: 2,
      //     type: 'dashed',
      //   },
      //   emphasis: {
      //     lineStyle: {
      //       width: 3,
      //     },
      //   },
      //   data: this.getLineList(info.xAxis || [], info.series.barList || []),
      // }

      this.lineEchart.setOption(option);
    },
    // 获取竖线的数据列表
    getLineList(xAxis, valueList){
      let dataList = [];

      for (let i = 0; i < xAxis.length; i++) {
        const date = xAxis[i];
        const canShow = valueList[i] > 0;

        if (!canShow) {
          continue;
        }

        if (!this.showGreatConcern) {
          continue;
        }

        let line = [
          { coord: [date, 5], lineStyle: { color: '#ED8B00'} },
          { coord: [date, 1] }
        ];
        
        dataList.push(line);
      }

      return dataList;
    },
    // 显示高度关注與情
    changeShowStatus(){
      this.showGreatConcern = !this.showGreatConcern;

      this.$emit('change-show');
    },
    dealShowPersent(numerator){
      return CommonUtils.dealShowPersent(numerator,1,0) - 0;
    },

  },
}
</script>

<style lang='scss' scoped>
  .handle-bar{
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 20px;
    > .left-bar{
      flex-grow: 1;
      align-items: center;
      height: 100%;
      > ul{
        display: flex;
        width: 100%;
        // justify-content: center;
        align-items: center;
        height: 100%;
        > li{
          user-select: none;
          display: flex;
          align-items: center;
          margin-right: 24px;
          > em{
            width: 12px;
            height: 0;
            flex-shrink: 0;
            border-top: 2px solid #012169;
            margin-right: 8px;
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
        > li:nth-child(2){
          > em{
            border-top: 2px solid #00A3E0;
          }
        }
        > li:nth-child(3){
          margin-right: 0;
          > em{
            border-top: 2px dashed #FFCD00;
          }
        }
      }
    }
    > .right-bar{
      display: flex;
      flex-shrink: 0;
      align-items: center;
      > li{
        user-select: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-left: 24px;
        > em{
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          margin-right: 4px;
          background: url('../../../assets/images/individual-stocks/checkbox-icon.png') center center no-repeat;
          background-size: 100% 100%;
        }
        > .is-selected{
          background: url('../../../assets/images/individual-stocks/selected-checkbox-icon.png') center center no-repeat;
          background-size: 100% 100%;
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
    }
  }
</style>