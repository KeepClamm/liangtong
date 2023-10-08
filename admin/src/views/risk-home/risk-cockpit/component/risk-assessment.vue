<template>
  <!-- 风险评估分布组件 -->
  <div class="container">
    <div class="assessment-top">
      <div class="assessment-top-left">
        <div>风险评估分布</div>
        <el-select v-model="selectValue" placeholder="请选择">
          <el-option v-for="item in selectOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div style="width:20px;height:20px">
          <el-popover placement="right" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <img slot="reference" src="@/assets/images/common/warning-fill.png" alt="" style="width:100%;height:100%">
          </el-popover>
        </div>
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
    // 初始化echarts
    initEchart() {
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '收入',
            type: 'bar',
            data: [7000, 7100, 7200, 7300, 7400],
            barWidth: 20,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            }
          }
        ]
      })
      lineChart.setOption({
        xAxis: {
          data: ['A', 'B', 'C', 'D', 'E']
        },
        yAxis: {},
        series: [
          {
            data: [10, 22, 28, 23, 19],
            type: 'line',
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
        .assessment-top-left {
            display: flex;
            align-items: center;
            & div{
                font-weight: 500;
                font-size: 20px;
                color: #1d2129;
                margin-right: 10px;
            }
        }
        .assessment-top-right {
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
