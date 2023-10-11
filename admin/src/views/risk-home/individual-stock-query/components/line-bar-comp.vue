<template>
  <div class='w100 h100' ref="line-echart-ref"></div>
</template>

<script>
const echarts = require("echarts");
const iconUrl = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5Ljk4ZDc5NDIsIDIwMjIvMDMvMjEtMTE6NDA6NTkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMUYwQUU5QjgxQzYxMUVEOThGOEQ4MUEwMjFFRDgxMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMUYwQUU5QzgxQzYxMUVEOThGOEQ4MUEwMjFFRDgxMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxRjBBRTk5ODFDNjExRUQ5OEY4RDgxQTAyMUVEODExIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxRjBBRTlBODFDNjExRUQ5OEY4RDgxQTAyMUVEODExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+haD4nwAAAERJREFUeNrs08EJACAMBMFEbMTy7L8AtQiVPGYh/+EgmWNGpVoUCwgICAgICOhy/dyyEBDQ4y9LCwEBAQEBAQH9awswAAsqAdexKbcsAAAAAElFTkSuQmCC';

export default {
  props: {
    axisTickLength: {
      type: String,
      default: '315',
    },
    unit: {
      type: String,
      default: '%',
    },
    axisLabelShow:  {
      type: Boolean,
      default: true,
    },
    top: {
      type: Number,
      default: 24,
    }
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
    setOption(info = {},markPoint=[]) {
      // this.lineEchart && this.lineEchart.clear();
      this.resizeEcharts();
      let unit = this.unit;
      let chartDom = this.$refs['line-echart-ref'];
      this.lineEchart = echarts.init(chartDom);
      let option = {
        grid: {
          top: this.top,
          left: "2",
          right: "0",
          bottom: 44,
          containLabel: true
        },
        legend: {
          bottom: 0,
          left: 0,
          itemWidth: 12,
          itemHeight: 12,
          fontWeight: 400,
          data: [
            {
              name: '企业数量占比',
              icon: 'rect',
            },
            {
              name: '指标分数',
              icon: iconUrl,
            }
          ]
        },
        tooltip: {
          trigger: 'axis',
          formatter: (list) => {
            // TODO -改为.  (21-7744,21-9742] -> (21.7744,21.9742]
            // let axisValue = list[0].axisValue.split('.').join('-')
            // let tooltip = `${axisValue}`

            let tooltip = list[0].axisValue;

            list.forEach(item => {
              item.marker = item.marker.replace('border-radius:10px', 'border-radius:2px;border: 1px solid #FFFFFF');
              let p = `<br /> ${item.marker} ${item.seriesName}: ${item.data}${item.seriesName == '企业数量累计占比'? unit : item.seriesName == '企业数量占比' ? unit: ''}`;
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
            length: this.axisTickLength,
            lineStyle: {
              color: '#DDE3EE',
              width: '0.5'
            }
          },
          // boundaryGap: false, // 不留白，从原点开始
          axisLabel: {
            show: this.axisLabelShow,
            formatter: '{value}'
          }
        },
        yAxis: [
          {
            max: 100,
            min: 0,
            alignTicks: true,
            splitNumber: 5,
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
            },
            axisLabel: {
              formatter: (params)=>{
                return params + this.unit;
              }
            }
          },
          {
            splitNumber: 5,
            splitLine: {
              lineStyle: {
                type: 'dashed'//虚线
              },
              show: true //隐藏
            },
            
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
            name: '企业数量占比',
            type: 'bar',
            color: '#A0DCFF',
            barWidth: 24,
            yAxisIndex: 0,
            markPoint: {
              data: [
                 ...markPoint
              ]
            },
            data: info.series.one || [],
          },
          {
            name: '指标分数',
            type: 'line',
            symbol: 'none', //去掉折线图的点
            color: '#012169',
            lineStyle: {
              width: 4, //设置线宽为0
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: '#bee3f8b3', // 0% 处的颜色
                }, {
                  offset: 1, color: '#bee3f800', // 100% 处的颜色
                }]
                ),  //背景渐变色 
              },
            },
            yAxisIndex: 1,
            data: info.series.two || []
          }
        ]
      };

      // if (info.legendData) {
      //   option.legend.data[0].name = info.legendData[0];
      //   option.legend.data[1].name = info.legendData[1];
      //   option.series[0].name = info.legendData[0];
      //   option.series[1].name = info.legendData[1];
      // }

      this.lineEchart.setOption(option);
    },
  },
}
</script>