<template>
  <div class="compare-peers-box w100">
    <div class="compare-peers-container show-flex-box-c w100 h100">
      <div class="show-flex-box-r w100 mb-24">
        <div class="fg-1">{{ headerTitle }}</div>
        <el-switch
          v-model="viewOnlyRiskItem"
          active-color="#012169"
          inactive-color="#C9CDD4"
          @change="riskOnlyView">
        </el-switch>
        <p class="only-see ml-4">仅查看风险项</p>
      </div>

      <div class="show-flex-box-c">
          <basic-table
            :table-data="tableListData"
            :needScroll="false"
            :show-pagination="false"
            :prop-list="propConfig"
            :border="true"
            showType="no-hover"
          >
          </basic-table>
      </div>
    </div>
  </div>
</template>

<script>
  import BasicTable from '@/components/show-ui/table/basic-table';

  export default {
    components: {
      BasicTable,
    },
    props: {
      showList: Array,
      headerTitle: String,
      headerTip: String,
      basicInformation: Object, //basic-information
    },
    data() {
      return {
        propConfig: [
          { prop: "FirstIndex", label: "交易类退市预警规则"},
          { prop: "SecondIndex", label: "预警情况"},
          { prop: "ThirdIndex", label: "是否预警", slotName: 'ThirdIndex', width: 190, notOverflow: true, },
          { prop: "indexScore", label: "预警进度图", slotName: 'indexScore'}
        ],
        viewOnlyRiskItem: true,
        tableListData: {},
      }
    },
    mounted() {},
    methods: {
      setData(info){
        this.tableListData = info;
      },
      riskOnlyView(info){
        this.$emit('change-show', info);
      },
    }
  }
</script>

<style lang="scss" scoped>
.table-see {
  padding: 0 8px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  margin-left: 6px;
  cursor: pointer;
  line-height: 20px !important;
  color: #FFFFFF !important;
  background-color: #012169;
  border-radius: 2px;
  flex-shrink: 0;
}
.table-line-echart {
  position: absolute;
  top: 0;
  left: 0;
}
.color-dark {
  color: #DA291C !important;
}
.color-light {
  color: #ED8B00 !important;
}
.compare-peers-box {
  background-color: #F8F9FE;
}
.compare-peers-container {
  padding: 24px 20px 20px;
  background-color: #ffffff;
  overflow: hidden;
  > div {
    align-items: center;
  }
}
.header-left {
  align-items: center;
  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #1D2129;
  }
}
.risk-box {
    height: 374px;
    div {
      width: 50%;
      height: 100%;
    }
}
.tip-li {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-transform: capitalize;
  > li {
    padding: 4px 16px;
    margin-right: 16px;
  }
}
.only-see {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #86909C;
}
.popover-text {
  font-weight: 400;
  font-size: 14px;
  // line-height: 14px;
  .headline {
    color: #1D2129;
  }
  .center {
    color: #86909C;
  }
}
.img-popover {
  width: 12px;
  height: 12px;
}

::v-deep canvas{
  cursor: pointer;
}
</style>