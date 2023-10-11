<template>
  <div class='w100 h100' ref="line-echart-ref"></div>
</template>

<script>
const echarts = require("echarts");
export default {
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
    setOption(info = {}, color) {
      this.resizeEcharts();
      let chartDom = this.$refs['line-echart-ref'];
      this.lineEchart = echarts.init(chartDom);
      let option = {
        grid: {
          top: "30",
          left: "20",
          right: "20",
          bottom: "40",
          containLabel: true
        },
        legend: {
          data: ['指标值', '指标分数'],
          bottom: 0,
          left: 20,
          icon: '-',
          itemWidth: 12,
          itemHeight: 2,
          fontWeight: 400
        },
        tooltip: {
          trigger: 'axis',
          formatter: (list) => {
            let axisValue = list[0].axisValue.split('.').join('-')
            let tooltip = `${axisValue}`

            list.forEach(item => {
              item.marker = item.marker.replace('border-radius:10px', 'border-radius:2px;border: 1px solid #FFFFFF');
              let p = `<br /> ${item.marker} ${item.seriesName}: ${item.data} `;
              tooltip += p
            })
            return tooltip
          }
        },
        xAxis: {
          type: 'category',
          data: info.xAxis || [],
          axisTick: {
            show: true,
            alignWithLabel: true,
            inside: true,
            length: '222',
            lineStyle: {
              color: '#DDE3EE',
              width: '0.5'
            }
          },
          // boundaryGap: false, // 不留白，从原点开始
          axisLabel: {
            formatter: '{value}'
          }
        },
        yAxis: [
          {
            // type: 'category',
            type: 'value',
            // max: 0.18,
            // min: 0,
            splitNumber: 5,
            // data: [0, 0.05, 0.10, 0.15, 0.18],
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
            },
            axisLine: {
              show: false,
            }
          },
          {
            // type: 'category',
            type: 'value',
            max: 100,
            min: 0,
            // interval: 20,
            splitNumber: 5,
            // data: [0, 20, 40, 60, 100],
            // alignTicks: true,
            splitLine: {
              lineStyle: {
                type: 'dashed'//虚线
              },
              show: true //隐藏
            },
            axisLine: {
              show: false,
            }
          }
        ],
        dataZoom: [{
          type: 'inside',
          throttle: 50,
          // start: 0,
          // end: 33
          start: 0,
          end: 100
        }],
        series: [
          {
            name: '指标值',
            type: 'line',
            symbol: 'none',
            color: '#012169',
            lineStyle: { width: 4 },
            yAxisIndex: 0,
            data: info.series && info.series.one || [],
          },
          {
            name: '指标分数',
            type: 'line',
            smooth: false, // true
            symbol: 'none', //去掉折线图的点
            color: '#00A3E0',
            lineStyle: { width: 4 },
            yAxisIndex: 1,
            data: info.series && info.series.two || [],
          }
        ]
      };
      
      this.lineEchart.setOption(option);
    },
  },
}
</script>