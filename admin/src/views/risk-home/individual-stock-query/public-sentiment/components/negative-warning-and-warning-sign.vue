<template>
  <div class='negative-warning-and-warning-sign-comp-box white-bg border-box'>
    <p class="page-title">负面预警&个股预警信号</p>

      <div class="handle-bar">
        <ul>
          <li
            v-for="(item, index) in handleBtnList"
            :key="index"
          >
            <div v-if="item.needLegend" :style="`border-color: ${item.color}; background: ${item.color};`"></div>
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </div>

    <div class="w100 fs-0 height104 mt-24 mb-24">
      <negative-warning-echart class="w100 h100" ref="negativeWarningEchartRef" />
    </div>

    <div>
      <basic-table
        :page="page"
        :limit="limit"
        :prop-list="propConfig"
        :showIndexColumn="true"
        :hasMaxHeight="true"
        maxHeightValue="648px"
        :needScroll="false"
        :table-data="tableListData"
        @handle-page="handlePage"
      >
        <template #Time="{row}">
          <span v-if="row.newsTime">{{ row.newsTime | dateformat('YYYY-MM-DD')}}</span>
          <span v-else>--</span>
        </template>
        <template #warningSign="{ row }">
          <span
            style="color: #007CB0;"
            class="cursor-pointer"
            @click="watchThisRecord(row)"
          >
          {{ row.newsTitle || '--'}}
        </span>
        </template>
        <template #importance="{ row }">
          <div class="w100 show-flex-center">
            <div :class="getImportanceClass(row.importantInfo)">
              <span>{{row.importantInfo }}</span> 
            </div>
          </div>
        </template>
      </basic-table>
    </div>

    <negativeNewsDialog ref="negativeNewsDialogRef" />
  </div>
</template>

<script>
import BasicTable from '@/components/show-ui/table/basic-table';
import negativeWarningEchart from './negative-warning-echart';
import CommonUtils from '@/utils/commonUtils';
import negativeNewsDialog from '@/components/show-ui/negative-news-dialog';
import { TABLE_DATA } from '../mock';

export default {
  components: {
    BasicTable,
    negativeWarningEchart,
    negativeNewsDialog,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      propConfig: [
        { prop: "newsTime", label: "时间", width: 125 ,slotName: 'Time'},
        { prop: "warningSign", label: "预警信号/负面舆情", align: 'left', slotName: 'warningSign'},
        { prop: 'importantInfo',label: "重要程度", slotName: 'importance', width: 125},
        { prop: "tag", label: "舆情类别/舆情标签", align: 'left', }, // 240
      ],
      tableListData: {},
      curStockInfo: {},
      handleBtnList: [
        { type: 'shortLevel', text: '低关注度', isChoosed: true, needLegend: true, color: '#A0DCFF' },
        { type: 'longLevel', text: '中关注度', isChoosed: true, needLegend: true, color: '#00A3E0' },
        { type: 'sharePrice', text: '高关注度', isChoosed: true, needLegend: true, color: '#012169' }
      ],

    };
  },
  filters: {
    importanceFilter(type){
      const importanceTypeMap = {
        '1': '重度关注',
        '2': '中度关注',
        '3': '轻度关注',
      };

      return importanceTypeMap[type];
    },
  },
  created() {},
  mounted() {
    this.configData();
  },
  methods: {
    configData(){
      // this.curStockInfo = this.$store.getters.CurWatchStock;
      this.reqNegativePublicOpinionList();
    },
    reqNegativePublicOpinionList(){
      // const params = {
      //   page: this.page,
      //   limit: this.limit,
      //   stockCode: this.curStockInfo.id
      // };
      this.tableListData = TABLE_DATA;
    },
    drawBarEcharts(info){
      this.$refs.negativeWarningEchartRef.setOption(info);
    },
    handlePage(info) {
      this.page = info.page;
      this.limit = info.limit;
      this.reqNegativePublicOpinionList();
    },
    // 1 重度 2中度 3轻度
    getImportanceClass(type){
      const classTypeMap = {
        '高度关注': 'serious',
        '中度关注': 'moderate',
        '一般关注': 'mild',
      };

      return `${classTypeMap[type]} importance-item`;
    },
    // 点击 预警信号/负面舆情    详情
    watchThisRecord(row){
      // this.$refs.earningsGrowthRef.open(row);
      // negativePublicOpinionDetail({ id: row.id }).then(res => {
        // let data = res.data;

      this.$refs.negativeNewsDialogRef.open({
        // title: data.newsTitle || '',
        // time: CommonUtils.formateDate(data.newsTime, 'YYYY-MM-DD'),
        // source: data.newsSource,
        // content: data.newsText
       });

      // }).catch(err => { })
    },
    
  },
}
</script>
<style lang='scss' scoped>
  .negative-warning-and-warning-sign-comp-box{
    padding: 24px 20px;
    .height272{
      height: 272px;
    }
    .height104{
      height: 104px;
    }

    .importance-item{
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 88px;
      height: 28px;
      > span{
        white-space: nowrap;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
      }
    }
    .serious{
      background: #FFECE8;
      > span{
        color: #DA291C;
      }
    }
    .moderate{
      background: #FFF7E8;
      > span{
        color: #ED8B00;
      }
    }
    .mild{
      background: #F8F9FE;
      > span{
        color: #00A3E0;
      }
    }
  }
.handle-bar{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  height: 20px;
  > ul{
    display: flex;
    flex-shrink: 0;
    align-items: center;
    > li{
      user-select: none;
      display: flex;
      align-items: center;
      margin-right: 24px;
      > div{
        width: 10px;
        height: 10px;
        flex-shrink: 0;
        border-radius: 100%;
        border-style: solid;
        border-width: 1px;
        margin-right: 4px;
      }
      > span{
        white-space: nowrap;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #6E7B91;
      }
    }
    > li:last-child{
      margin-right: 0;
    }
  }
}
</style>