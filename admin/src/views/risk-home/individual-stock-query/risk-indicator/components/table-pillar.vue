<template>
  <div class='w100 h100' ref="bar-echart-ref"></div>
</template>

<script>

const echarts = require("echarts");

export default {
  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
    title: String,
    unit: {
      type: String,
      default: '个',
    },
  },
  data() {
    return {
      barEchart: null,

    };
  },
  mounted() {
    window.addEventListener('resize', this.resizeEcharts, true);
  },
  methods: {
    // info.xAxis    info.series    info.mainPillar
    formatSeries(xAxis, series, mainPillar) {
      let index = xAxis.findIndex(item => {
        return item === mainPillar.xAxis
      });
      
      series[index] = {
        value: series[index],
        itemStyle: {
            color: '#012169'
          }
      }
      return series;
    },
    resizeEcharts() {
      this.barEchart && this.barEchart.resize();
    },
    setOption(info = {}, color = '#01216920') {
      let chartDom = this.$refs['bar-echart-ref'];
      this.barEchart = echarts.init(chartDom);

      let option = {
        grid: {
          top: "6",
          left: "10",
          right: "10",
          bottom: "6",
          containLabel: false
        },
        xAxis: {
          show: false,
          type: 'category',
          data: info.xAxis || [],
          axisTick: {
            alignWithLabel: true
          },
          splitLine: {
            lineStyle: {
              type: 'solid'//虚线
            },
            show: true //隐藏
          },
          // boundaryGap: false,
          gridIndex: 0,
          axisLabel: {
            formatter: val => {
              let txt = val;
              if (val.length > 3) {
                txt = val.substr(0, 3) + '...';
              }

              return txt;
            }
          },
        },
        yAxis: {
          show: false,
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'//实线
            },
            show: true //隐藏
          },
          axisLine: {
            lineStyle: {
                color: '#DDE3EE'
            }
          },
          axisLabel: {
            show: true,  // 是否显示,默认true
            color: '#4B5468', // 标签的颜色设置,默认取轴线的颜色 
          },
        },
        series: [{
          type: 'bar',
          barWidth: 8,
          color: color,
          with: 8,
          data: this.formatSeries(info.xAxis, info.series, info.mainPillar) || [],
        }]
      };

      this.barEchart.setOption(option);
    },
  },
}
</script>