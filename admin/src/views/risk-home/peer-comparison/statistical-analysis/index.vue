<template>
  <div class="box-analysis-container">
    <!-- 表格 -->
    <div class="analysis-title">统计分析</div>
    <el-table tooltip-effect="dark" style="width: 100%" :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass" border>
      <el-table-column label="券商" prop="quanshang" />
      <el-table-column label="担保品证券数量" prop="shuliang" />
      <el-table-column label="担保品折算率分布图" prop="tu">
        <template slot-scope="scope">
          <div id="main" style="height: 150px; width: 200px;" />
        </template>
      </el-table-column>
      <el-table-column label="融资标的证券数量" prop="shuliang2" />
      <el-table-column label="融资标的保证金比例分布图" prop="tu2" />
      <el-table-column label="融券标的证券数量" prop="shuliang3" />
    </el-table>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      tableData: [{
        'quanshang': '中信证券',
        'shuliang': 6,
        'shuliang2': 10,
        'shuliang3': 312
      }]
    }
  },
  mounted() {
    this.getEcharts()
  },
  methods: {
    rowClass({ row, rowIndex }) {
      return 'text-align: center;background: #f8f9fb;color: #86909c;height:48px'
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return 'text-align: center;height: 60px;'
    },
    getEcharts() {
      setTimeout(() => {
        const myEchart = echarts.init(document.getElementById('main'))
        myEchart.setOption({
          grid: {
            left: '0',
            top: '10',
            right: '2',
            bottom: '0',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // 不显示x轴线
            show: true
          },
          yAxis: {
            type: 'value',
            show: true
          },
          series: [{
            data: [2, 3, 2, 1, 2, 3, 1],
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
                  width: 3
                }
              }
            }
          }]
        })
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-analysis-container {
  width: 100%;
  padding: 24px 20px;
  background-color: #fff;
  .analysis-title {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 20px;
  }
}
</style>
