<template>
  <div class='w100 h100' ref="pie-echart-ref"></div>
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
      pieEchart: null,

    };
  },
  mounted() {
    window.addEventListener('resize', this.resizeEcharts, true);
  },
  methods: {
    resizeEcharts() {
      this.pieEchart && this.pieEchart.resize();
    },
    setOption(list = [], color, customConfig) {
      let chartDom = this.$refs['pie-echart-ref'];
      this.pieEchart = echarts.init(chartDom);

      let option = {
        title: {
          show: this.showTitle,
          text: this.title,
          left: "center",
          bottom: "0",
          textStyle: {
            fontSize: 16,
            color: '#1D2129'
          },
        },
        color: color || [
          '#5470C6',
          '#9FE080',
          '#FFDC60',
          '#EE6666',
          '#73C0DE',
          '#40B27D',
          '#FF915A',
          '#9A60B4',
          '#EA7CCC',
          '#9991d2',
        ],
        tooltip: {
          trigger: 'item',
          borderWidth: 0,
          formatter: (info) => {
            info.marker = info.marker.replace('border-radius:10px', 'border-radius:2px;border: 1px solid #FFFFFF');
            // return `${info.name}<br />${info.marker} ${info.value}${this.unit} ${info.percent}%`;
            return `${info.name}<br />主体数量：${info.value}<br />${info.marker}占比：${info.percent}%`;
          }
        },
        legend: {
          // type: 'scroll',
          // // orient: 'vertical',
          icon: 'square',
          // left: 'center',
          // // bottom: '10px',
          // // top: '5%',
          // right: '8px'
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 'center',
          bottom: 20,
          itemHeight: 12,
          itemGap: 24,
          textStyle: {
            fontSize: 14,
            color: '#6E7B91'
          },
        },
        series: [{
          type: 'pie',
          top: '20px',
          radius: ['66%', '82%'],
          center: ['50%', '40%'],
          // avoidLabelOverlap: false,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
            length: 8,
            length2: 8
          },
          data: list || [],
          hoverAnimation: false,
          emphasis: {
            itemStyle: {
              // 改变阴影大小
              shadowBlur: 0,
              shadowOffsetX: 0,
            }
          }
        }]
      };

      if (customConfig) {
        if (customConfig.radius) {
          option.series[0].radius = customConfig.radius;
        }
        if (customConfig.itemStyle) {
          option.series[0].itemStyle = customConfig.itemStyle;
        }
        if (customConfig.roseType) {
          option.series[0].roseType = customConfig.roseType;
        }
      }

      this.pieEchart.setOption(option);
    },
  },
}
</script>