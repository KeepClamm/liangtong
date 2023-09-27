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
    axisTickLength: {
      type: String,
      default: '242',
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
    setOption(info = {}, yAxisCustom, seriesCustom, grid = { top: "8", left: "32", right: "32", bottom: "0", containLabel: true }) {
      let chartDom = this.$refs['line-echart-ref'];
      this.lineEchart = echarts.init(chartDom);

      let option = {
        title: {
          show: this.showTitle,
          text: this.title,
          left: "center",
          bottom: '0',
          textStyle: {
            fontSize: 16,
            color: '#1D2129'
          },
        },
        grid: grid,
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              color: 'rgba(251, 251, 252, 0.6)',
            }
          },
          formatter: (list) => {
            const info = list[0];
            
            list.forEach(item => {
              item.marker = item.marker.replace('border-radius:10px', 'border-radius:2px;border: 1px solid #FFFFFF');
            })
            let showStr = '';
            if (list.length == 1) {
              showStr = `${info.name}<br />${info.marker}  ${info.seriesName} ${info.value}${this.unit}`;
            } else {
              showStr = `${info.name}<br />${info.marker}  ${info.seriesName} ${info.value}${this.unit}<br />${list[1].marker}  ${list[1].seriesName} ${list[1].value}${this.unit}`;
            }

            return showStr;
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          inRange: {
            symbolSize: [12, 12]
          },
        },
        xAxis: {
          type: 'category',
          data: info.xAxis || [],
          axisTick: {
            show: true,
            alignWithLabel: true,
            inside: true,
            length: this.axisTickLength,
            lineStyle: {
              color: '#DDE3EE',
              width: '1'
            }
          },
        },
        yAxis: {
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
          },
          axisLine: {
            lineStyle: {
              color: '#DDE3EE'
            }
          }
        },
        series: [
          {
            data: info.series || [],
            type: 'line',
            // symbol: 'none',
            symbol: 'circle',
            showSymbol: false,
            lineStyle: {
              width: 4, //设置线宽为0
            },
            itemStyle: {
              borderWidth: 4,
              borderColor: '#FFF',
            },
            ...seriesCustom,
          },
          {
            data: info.series2 || [],
            type: 'line',
            symbol: 'none',
            // symbol: 'circle',
            showSymbol: false,
            lineStyle: {
              width: 4, //设置线宽为0
            },
            color: '#00A3E0',
            name: '券商折算率主体数量：'
          }
        ]
      };

      this.lineEchart.setOption(option);
    },
  },
}
</script>