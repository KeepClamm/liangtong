<template>
    <div class='w100 h100' ref="line-category-stack"></div>
</template>
  
<script>
const echarts = require("echarts");
const ColorList = ['#012169', '#005587', '#0076A8', '#00A3E0', '#A0DCFF',];
import CommonUtils from '@/utils/commonUtils';

export default {
    props: {},
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
        setOption(info = {}, list = []) {
            this.lineEchart && this.lineEchart.clear();
            
            let chartDom = this.$refs['line-category-stack'];
            this.lineEchart = echarts.init(chartDom);

            let series = [];

            for (let i = 0; i < list.length; i++) {
              series.push({
                name: 'SR' + list[i],
                type: 'bar',
                stack: 'total',
                // barWidth: 18,
                barWidth: 16,
                color: ColorList[5-list[i]], // 柱子的颜色
                data: info[`data${list[i]}`]
              });
            }

            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: (item) => {
                        let data = item.data.data || {};
                        let averageLossRate = data.averageLossRate || 0;
                        let reduceRate =CommonUtils.dealShowPersent(data.reduceRate);

                        item.marker = item.marker.replace('border-radius:10px', 'border-radius:2px;border: 1px solid #FFFFFF');
                        return `板块平均折算率：${averageLossRate} <br />
                                <div style="display: flex;justify-content: space-between;">
                                    <span>${item.marker} ${item.seriesName}</span>${item.value}%
                                </div>`;
                                // 板块较前一日下调比例：${reduceRate} <br /><br />
                    },
                    axisPointer: {
                        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    },
                    borderWidth: 0,
                    padding: 16, // 提示框浮层内边距
                    textStyle: {
                        color: '#6E7B91',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: 14,
                    },// 提示框浮层的文本样式
                    extraCssText: 'box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);', // 额外附加到浮层的 css 样式
                },
                legend: {
                    show: false
                },
                grid: {
                    left: '120px',
                    right: '2%',
                    top: "24",
                    bottom: '1%',
                    // containLabel: true
                },
                xAxis: {
                    type: 'value',
                    splitNumber: 6,
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'//虚线
                        },
                        show: true //隐藏
                    }
                },
                yAxis: {
                    inverse: true,
                    type: 'category',
                    data: info.yAxis || [],
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,  // 是否显示,默认true
                        color: '#26292E', // 标签的颜色设置,默认取轴线的颜色 
                        fontSize: '14',
                        interval: '0',
                        textStyle: {
                            align: "left"
                        },
                        margin: 90,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#DDE3EE'
                        }
                    }
                },
                dataZoom: [
                    {
                      type: "slider", // slider表示有滑动块的，
                      show: true,
                      yAxisIndex: [0], //表示y轴折叠
                      startValue: 0,
                      end: 7,
                      minValueSpan: 7,
                      maxValueSpan: 7,
                      width: 0,
                      textStyle: {
                        color: 'transparent'
                      },
                      right: 10,
                      filterMode: "none",
                      animation: true,
                      throttle: 100,
                      zoomLock: true, // 是否只平移不缩放
                    },
                    {
                        type: 'inside',
                        yAxisIndex: 0,
                        zoomOnMouseWheel: false,  //滚轮是否触发缩放
                        moveOnMouseMove: true,  //鼠标滚轮触发滚动
                        moveOnMouseWheel: true
                    }
                ],
                series: series,
            };
            // console.log(JSON.stringify());
            this.lineEchart.setOption(option);

            //事件
            this.lineEchart.on('click', (params) => {
                if (params.componentType == 'series') {
                    this.$emit('clickInfo', params);
                }
            });
        },
    },
}
</script>
<style lang="scss" scoped>
// "<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#012169;"></span>"
.marker {
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 4px;
}
</style>