<template>
  <div class="w100 h100 scatter-echart-box">
    <div class="w100 h100" ref="scatter-echart-ref"></div>

    <div
      v-if="scatterEchart && lineInfo"
      class="clicktooltip show-flex-box-c"
      :style="`top: ${tooltipBoxTop}px; left: ${tooltipBoxLeft}px; display: ${showTooltipBox ? 'flex' : 'none'};`"
    >
      <header>
        <span>{{ lineInfo.date }}</span>
        <em @click.stop="closeTooltip()"></em>
      </header>
      <ul v-if="lineInfo.list && lineInfo.list.length > 0">
        <li
          v-for="(item, index) in lineInfo.list"
          :key="index"
        >
          <em :style="`background: ${negativeNewsColorMap[item.importantInfo]};`"></em>
          <p :class="{'can-click': item.canClick}" @click.stop="item.canClick && openNegativeNewsPop(item)
">{{ item.text }}</p>
        </li>
      </ul>
    </div>

    <div>
      <negativeNewsDialog ref="negativeNewsDialogRef" />
    </div>
  </div>
</template>

<script>
const echarts = require("echarts");
import negativeNewsDialog from '@/components/show-ui/negative-news-dialog';
import CommonUtils from '@/utils/commonUtils';

export default {
  props: {},
  components: {
    negativeNewsDialog,
  },
  data() {
    return {
      parentWidth: '',
      scatterEchart: null,
      showTooltipBox: false,
      tooltipBoxTop: 0,
      tooltipBoxLeft: 0,
      lineInfo: null,
      lineColorMap: {
        '1': '#A0DCFF', // 低关注度
        '2': '#00A3E0', // 中关注度
        '3': '#012169', // 高关注度
      },
      negativeNewsColorMap: {
        '一般关注': '#A0DCFF',
        '中度关注': '#00A3E0',
        '高度关注': '#012169'
      }

    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
  },
  watch: {
    sidebar: {
      handler(newName, oldName) {
        setTimeout(() => {
          this.resizeEcharts();
        }, 300);
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.parentWidth = this.$el.offsetWidth;

    window.addEventListener("resize", this.resizeEcharts, true);
  },
  methods: {
    resizeEcharts() {
      this.parentWidth = this.$el.offsetWidth;

      this.scatterEchart && this.scatterEchart.resize();
    },
    setOption(info = {}) {
      let chartDom = this.$refs["scatter-echart-ref"];
      this.scatterEchart = echarts.init(chartDom);

      const valueList = ['低关注度', '中关注度', '高关注度',];
      const colorList = ['#A0DCFF', '#00A3E0', '#012169',];
      const lineList = info.dataList || [];

      let option = {
        tooltip: {
          formatter: function (params) {
            const marker = `<span style=\"display:inline-block;margin-right:6px;margin-bottom:1px;border-radius:8px;width:8px;height:8px;background-color:${params.color};\"></span>`;
            let value = `${params.name}<br />
            <span style=\"display:inline-block;margin-right:6px;margin-bottom:1px;border-radius:8px;width:8px;height:8px;background-color:${colorList[0]};\"></span>低关注度：${params.value[4]}<br />
            <span style=\"display:inline-block;margin-right:6px;margin-bottom:1px;border-radius:8px;width:8px;height:8px;background-color:${colorList[1]};\"></span>中关注度：${params.value[5]}<br />
            <span style=\"display:inline-block;margin-right:6px;margin-bottom:1px;border-radius:8px;width:8px;height:8px;background-color:${colorList[2]};\"></span>高关注度：${params.value[6]}<br />`;

            return value;
          },
          padding: 10,
          textStyle: {
            color: "#1D2129",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: 14,
          },
          extraCssText: "box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);border-radius: 4px;border-color:white;background: rgba(255, 255, 255, 0.9);", // 额外附加到浮层的 css 样式
        },
        legend: { show: false },
        grid: {
          left: "0", // 24px
          right: "0",
          top: "0",
          bottom: "14px",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: info.xAxis || [],
          axisLabel: {
            show: true,
            color: "#4B5468",
            fontSize: "14",
            interval: "auto", // 0 强制显示所有标签
            overflow: "truncate",
            margin: 17
          },
          axisLine: {
            lineStyle: {
              color: "#4B5468",
            },
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            inside: true,
            length: '62',
            lineStyle: {
              color: '#DDE3EE',
              width: 1
            }
          },
          boundaryGap: true, // 两边留白
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 2,
          splitNumber: 2,
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
        },
        dataZoom: [
          {
            type: "slider", // slider表示有滑动块的，
            show: true,
            orient: "horizontal",
            xAxisIndex: [0], //表示x轴折叠
            start: 90,
            end: 100,
            bottom: 0,
            height: 6,
            moveHandleSize: 6,
            moveHandleStyle: {
              color : "#DDE3EE",
            },
            moveHandleSize: 6,
            moveHandleIcon: "none",
            textStyle: {
              color: "transparent",
            },
            emphasis: {
              moveHandleStyle: {
                color: "#DDE3EE"
              }
            },
            filterMode: "none",
            animation: true,
            throttle: 50,
            zoomLock: true, // 是否只平移不缩放
          },
          {
            type: "inside",
            xAxisIndex: 0,
            moveOnMouseWheel: true,
            zoomOnMouseWheel: true, // 滚轮是否触发缩放
            moveOnMouseMove: false, // 鼠标滚轮触发滚动
          },
        ],
        series: [
          {
            type: 'scatter',
            symbolSize: function (data) {
              let maxSize = 54; // 设置最大值为50
              let value =  Math.sqrt(data[2]) * 8;
              return value > maxSize ? maxSize : value; 
            },
            data: info.series || [],
            itemStyle: {
              normal: {
                color: (params)=>{
                  const yIndex = params.value[3];
                  return colorList[yIndex];
                }
              },
            },
            emphasis: {
              itemStyle: {
                borderColor: "#fff",
                borderWidth: 4,
                shadowBlur: 0,
                shadowOffsetX: 0,
              }
            },
          },
        ],
      };

      this.scatterEchart.setOption(option);

      //事件
      this.scatterEchart.on('click', (params) => {
        const eventX = params.event.offsetX;
        /**
         * offsetX 距离父级的距离 + 457px 弹窗的宽度
         * 如果 大于父级的宽度, 则减去父级的宽度即为超出的宽度
         * 如果 有超出, 就接着往左偏移
         */
        if (params.componentType == 'series') {
          let overWidth;
          if (eventX + 457 >= this.parentWidth) {
            overWidth = eventX + 457 - this.parentWidth;
          }
          this.showTooltipBox = true;
          this.tooltipBoxTop = params.event.offsetY - 61;
          this.tooltipBoxLeft = params.event.offsetX - 20;
          
          if (overWidth > 0) { // 超出
            this.tooltipBoxLeft -= overWidth;
          }

          let details = lineList.filter(res=>{
            if(params.name == res.date){
              return res
            }
          }) || [];
          
          const lineInfo = details[0];
          this.lineInfo = lineInfo;
        }
      });
    },
    openNegativeNewsPop(item){
      // negativePublicOpinionDetail({ id: item.id }).then(res => {
      //   const data = res.data;
      //   this.$refs.negativeNewsDialogRef.open({
      //     title: data.newsTitle || '',
      //     time: CommonUtils.formateDate(data.newsTime, 'YYYY-MM-DD'),
      //     source: data.newsSource,
      //     content: data.newsText
      //   });
      // })
    },
    closeTooltip(){
      this.showTooltipBox = false;
      this.tooltipBoxTop = 0;
      this.tooltipBoxLeft = 0;
      this.lineInfo = null;
    },


  },
};
</script>

<style lang='scss' scoped>
.scatter-echart-box{
  position: relative;
}

.clicktooltip{
  height: 122px;
  max-height: 140px;
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(14px);
  border-radius: 4px;
  box-sizing: border-box;
  width: 457px;
  padding: 16px;
  right: 20px;
  > header{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    > span{
      word-break: break-all;
      white-space: nowrap;
      flex-grow: 1;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
      color: #1D2129;
    }
    > em{
      cursor: pointer;
      width: 12px;
      height: 12px;
      flex-shrink: 0;
      background: url('../../../../../assets/images/upload/close-icon.png') center center no-repeat;
      background-size: 100% 100%;
    }
  }
  > ul{
    flex-grow: 1;
    overflow-y: scroll;
    > li{
      display: flex;
      margin-bottom: 10px;
      > em{
        width: 10px;
        height: 10px;
        border-radius: 8px;
        flex-shrink: 0;
        margin-top: 6px;
        margin-right: 8px;
      }
      > p{
        flex-grow: 1;
        word-break: break-all;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #6E7B91;
      }
      > .can-click{
        cursor: pointer;
        text-decoration: underline;
      }
    }
    > li:last-child{
      margin-bottom: 0;
    }
  }
}
</style>