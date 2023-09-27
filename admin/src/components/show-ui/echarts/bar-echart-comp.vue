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
    barLength: {
      type: Number,
      default: 260 ////260'280'
    },
    barWidth: {
      type: Number,
      default: 14
    }
  },
  data() {
    return {
      barEchart: null,

    };
  },
  mounted() {
    window.onresize = () => {
      this.resizeEcharts();
    }
  },
  methods: {
    resizeEcharts() {
      this.barEchart && this.barEchart.resize();
    },
    setOption(info = {}, color) {
      let chartDom = this.$refs['bar-echart-ref'];
      this.barEchart = echarts.init(chartDom);

      let option = {
        title: {
          show: this.showTitle,
          text: this.title,
          left: "center",
          top: "10",
          textStyle: {
            fontSize: 15
          },
        },
        grid: {
          top: "8",
          left: "0",
          right: "8",
          bottom: "0",
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          // formatter: (list) => {
          //   const info = list[0];
          //   return `${info.name}<br />${info.marker} ${info.value}${this.unit}`;
          // },
          axisPointer: {
            type: 'shadow'
          },
          formatter: (data) => {
            const params = data[0];

            if(info.max) {
              let marker = `<span style=\"display:inline-block;margin-right:4px;border-radius:2px;border: 1px solid #FFFFFF;width:10px;height:10px;background-color:${params.color};\"></span>`

              return `${params.name}<br />主体数量：${info.numList[params.dataIndex]}<br />${marker}占比：${params.value}%`;
            }

            return `${params.name}<br />${params.marker} ${params.value}`;
          }
        },
        xAxis: {
          type: 'category',
          data: info.xAxis || [],
          axisTick: {
            show: true,
            alignWithLabel: true,
            inside: true,
            length: this.barLength,
            lineStyle: {
              color: '#DDE3EE',
              width: '1'
            }
          },
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
            formatter: (params) => {
              if(info.max) {
                return params + '%';
              }

              return params;
            }
          },
        },
        series: [{
          type: 'bar',
          barWidth: this.barWidth,
          color: color,
          with: this.barWidth,
          data: info.series || [],
          itemStyle: {
            normal: {
                //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
                barBorderRadius:[2, 2, 0, 0]
            }
          },
        },
      ]
      };

      if(info.title) {
        option.title = info.title;
      }

      if(info.grid) {
        option.grid = info.grid;
      }

      if(info.max) {
        option.yAxis.max = info.max;
        option.yAxis.min = info.min;
        option.yAxis.splitNumber = info.splitNumber;
      }


      this.barEchart.setOption(option);
    },
  },
}
</script>