<template>
  <!-- 风险评估分布组件 -->
  <div class="container">
    <div class="assessment-top">
      <div class="assessment-top-left">
        <div>风险评估分布</div>
        <el-select v-model="selectValue" placeholder="请选择">
          <el-option v-for="item in selectOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="assessment-top-right">
        <div v-for="item in radioOpts" :key="item.value" :class="{'is-active': item.value === isActive}" @click="handleRadioClick(item.value)">{{ item.label }}</div>
      </div>
    </div>
    <div class="chart-container">
      <div id="bar01" class="chart-container-bar" />
      <div class="chart-container-table">
        <el-table tooltip-effect="dark" style="width: 100%" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" border>
          <el-table-column v-for="item in tableRow" :key="item.label" :prop="item.prop" :label="item.label" />
        </el-table>
      </div>
    </div>
    <div id="lineChart" class="line-chart" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  components: {

  },
  data() {
    return {
      selectValue: '',
      selectOpts: [
        {
          value: 1,
          label: '全市场'
        },
        {
          value: 2,
          label: '两融标的'
        }
      ],
      tableData: [],
      tableRow: [
        {
          label: '五级分类',
          prop: 'wuji'
        },
        {
          label: '数量',
          prop: 'shuliang'
        },
        {
          label: '占比',
          prop: 'zhanbi'
        }
      ],
      radioOpts: [
        { label: '短期暴跌预警', value: 1 },
        { label: '长期趋势预警', value: 2 }
      ],
      testArr: [1000, 2400, 1200, 1400, 1600],
      isActive: 1
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.initEchart()
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return 'text-align: center;background: #f8f9fb;color: #86909c;height:48px'
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return 'text-align: center;height: 60px;'
    },
    // 单选框点击
    handleRadioClick(value) {
      const that = this
      that.isActive = value
    },
    // 求和
    sum(arr) {
      return eval(arr.join('+'))
    },
    // 初始化echarts
    initEchart() {
      const that = this
      const testValue = [...that.testArr]
      that.testArr = testValue.map(item => Math.round(parseFloat(item) / parseFloat(that.sum(testValue)) * 10000) / 100)
      const barEchart = echarts.init(document.getElementById('bar01'))
      const lineChart = echarts.init(document.getElementById('lineChart'))
      barEchart.setOption({
        title: {
          show: true,
          text: '短期下跌风险',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 18
          },
          x: 'center',
          y: 'bottom'
        },
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'cross',
        //     crossStyle: {
        //       color: '#999'
        //     }
        //   }
        // },
        xAxis: {
          type: 'category',
          data: ['SR1', 'SR2', 'SR3', 'SR4', 'SR5'],
          axisTick: { show: false },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#666666'
            }
          },
          axisLine: { lineStyle: { color: '#dddddd' }}
        },
        yAxis: {
          type: 'value',
          name: '单位（%）',
          nameGap: 35
        },
        series: [
          {
            name: '收入',
            type: 'bar',
            data: that.testArr,
            barWidth: 20,
            itemStyle: {
              emphasis: {
                label: {
                  show: true,
                  formatter: function(params) {
                    const num = Math.round(that.sum(testValue) * params.data / 100)
                    return `人数 ${num} 人 \n 占比 ${params.data}%`
                  },
                  backgroundColor: 'rgba(61,126,255,0.09)',
                  borderColor: '#3d7eff',
                  borderWidth: 0.5,
                  borderRadius: 2,
                  padding: 6,
                  position: 'top',
                  textStyle: {
                    fontSize: 14,
                    marginLeft: 0,
                    lineHeight: 20
                  }
                }
              }
            }
          }
        ]
      })
      lineChart.setOption({
        title: {
          show: true,
          text: '两融折算率分布图',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 18
          },
          x: 'center',
          y: 'bottom'
        },
        legend: {
          orient: 'horizontal',
          x: 'right',
          y: 'top',
          textStyle: {
            fontSize: 12
          },
          data: [
            {
              name: '德勤折算率'
            },
            {
              name: '其他券商折算率'
            }
          ]
        },
        xAxis: {
          data: ['A', 'B', 'C', 'D', 'E']
        },
        yAxis: {},
        series: [
          {
            name: '德勤折算率',
            data: [10, 22, 28, 23, 19],
            type: 'line',
            smooth: true,
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#bdcff2'
                    },
                    {
                      offset: 1,
                      color: '#FFF'
                    }
                  ]
                }
              }
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 5
                }
              }
            }
          },
          {
            name: '其他券商折算率',
            data: [1, 3, 0, 5, 2],
            type: 'line',
            color: '#00b3f6',
            smooth: true
          }
        ]
      })
      window.addEventListener('resize', function() {
        barEchart.resize()
        lineChart.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input--medium .el-input__inner {
    height: 28px;
}
::v-deep .el-input__suffix {
    top: 4px;
}
.is-active {
    background-color: #fff;
    color: #00a3e0 !important;
}
.container {
    width: 100%;
    height: 100%;
    position: relative;
    .assessment-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        .assessment-top-left {
            display: flex;
            align-items: center;
            & div{
              white-space: nowrap;
              font-weight: 500;
              font-size: 20px;
              color: #1d2129;
              margin-right: 10px;
            }
        }
        .assessment-top-right {
            white-space: nowrap;
            height: 36px;
            padding: 4px;
            background: #f2f3f5;
            border-radius: 3px;
            display: flex;
            align-items: center;
            & div {
                width: 50%;
                cursor: pointer;
                padding: 4px 24px;
                font-weight: 600;
                font-size: 14px;
                color: #4e5969;
            }
        }
    }
    .chart-container {
        width: 100%;
        height: 375px;
        margin-bottom: 40px;
        display: flex;
        justify-content: space-between;
        .chart-container-bar {
            width: 50%;
            height: 100%;
            margin-right: 30px;
        }
        .chart-container-table {
            width: 40%;
            padding-top: 38px;
        }
    }
    .line-chart {
        width: 100%;
        height: 400px;
    }
}
</style>
