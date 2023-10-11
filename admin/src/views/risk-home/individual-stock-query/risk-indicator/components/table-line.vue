<template>
  <div class='w100 h100' ref="line-echart-ref"></div>
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
      default: '',
    },
  },
  data() {
    return {
      lineEchart: null,

    };
  },
  mounted() {
    window.addEventListener('resize', this.resizeEcharts, true);
  },
  methods: {
    resizeEcharts() {
      this.lineEchart && this.lineEchart.resize();
    },
    setOption(info = {}, yAxisCustom, seriesCustom) {
      let chartDom = this.$refs['line-echart-ref'];
      this.lineEchart = echarts.init(chartDom);

      let option = {
        title: {
          show: this.showTitle,
          text: this.title,
          left: "center",
          // top: "10",
          bottom: '0',
          textStyle: {
            fontSize: 16,
            color: '#1D2129'
          },
        },
        grid: {
          top: "6",
          left: "10",
          right: "10",
          bottom: "6",
          containLabel: false
        },
        tooltip: {
          show: false,
          triggerOn: 'none',
          // trigger: 'axis',
        },
        visualMap: {
          show: false,
          dimension: 0,
          inRange: {
            symbolSize: [12, 12]
          },
        },
        xAxis: {
          show: true,
          axisPointer: {
            value: info.mainPoint.xAxis,
            z: 1,
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#3C3FDC'
                }, {
                  offset: 1, color: '#B4BAC6'
                }],
                global: false // 缺省为 false
              },
              width: 1
            },
            label: {
              show: false,
            },
            handle: {
              show: true,
            }
          },
          type: 'category',
          data: info.xAxis || [],
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false
          },

          boundaryGap: false,// 不留白，从原点开始
        },
        yAxis: {
          show: false,
          type: 'value',
          ...yAxisCustom,
          splitLine: {
            lineStyle: {
              type: 'dashed'//虚线
            },
            show: true //隐藏
          },
          axisLabel: {
            show: true,  // 是否显示,默认true
            color: '#26292E', // 标签的颜色设置,默认取轴线的颜色
          }
        },
        series: [
          {
            data: info.series || [],
            markPoint: {
              symbol: "circle",
              symbolSize: 12,
              itemStyle: {
                borderWidth: 4,
                borderColor: '#FFFFFF'
              },
              data: [info.mainPoint]
            },
            type: 'line',
            // symbol: 'none',
            symbol: 'circle',
            showSymbol: false,
            lineStyle: {
              width: 2, // 4
            },
            ...seriesCustom,
          }
        ]
      };

      this.lineEchart.setOption(option);
    },
  },
}
</script>