<template>
  <div class="containerBox">
    <div class="title">关联方查看</div>
    <div style="margin-top: 50px">
      <el-input placeholder="国家开发银行" size="small">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="content">
      <div class="title-box">
        <el-tabs v-model="activeName">
          <el-tab-pane label="外部关联方" name="third"></el-tab-pane>
        </el-tabs>
        <el-tree
          :data="treeData"
          :props="defaultProps"
          :default-expanded-keys="[1]"
          show-checkbox
          node-key="id"
        ></el-tree>
      </div>
      <div class="table-container">
        <basic-table :prop-list="porpConfig" :table-data="tableData">
        <template #clientFlag="{row}">
          <span :style="{ color: row.a7 === '是' ? '#409EFF' : '' }" v-if="row.a7 == '是'" style="cursor: pointer;" @click="goDetail(row.a1)">{{ row.a7 }}</span>
          <span  v-else>{{ row.a7 }}</span>
        </template>
      </basic-table>
      </div>
    </div>
  </div>
</template>

<script>
import BasicTable from '@/components/show-ui/table/basic-table';
export default {
  components: {BasicTable},
  data() {
    return {
      activeName: "third",
      tableData: {
        total: 0,
        items: []
      },
      treeData: [
        {
          id: 1,
          label: "外部关联方角色",
          children: [
            { label: "股东关系" },
            { label: "控制关系" },
            { label: "一致行动人关系" },
            { label: "担保关系" },
            { label: "任职关系" },
            { label: "亲友关系" },
            { label: "产品关系" },
            { label: "经济依存关系" },
            { label: "诉讼关系" },
            { label: "其他关系" },
          ],
        },
        {
          id: 2,
          label: '自建外部关联关系',
          children: []
        }
      ],
      porpConfig: [
        {label: '关联主体', prop: 'a1'},
        {label: '关系类型', prop: 'a2'},
        {label: '比例/金额', prop: 'a3'},
        {label: '预警等级', prop: 'a4'},
        {label: '企业性质', prop: 'a5'},
        {label: '所属行业', prop: 'a6'},
        {label: '是否为客户', prop: 'a7' ,slotName: 'clientFlag'}
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    search() {
      this.tableData = {
        total: 4,
        items: [
          { a1: '中华人民共和国财政部', a2: '股东', a3: '36.54%', a4: '低风险', a6: '政府机构', a7: '否'},
          { a1: '中央汇金投资有限责任公司', a2: '股东', a3: '34.68%', a4: '低风险', a6: '金控集团', a7: '是'},
          { a1: '海南航空控股股份有限公司', a2: '对外投资', a3: '2.07%', a4: '低风险', a6: '交通运输', a7: '是'},
          { a1: '重庆燃气股份有限公司', a2: '对外投资', a3: '5.15%', a4: '低风险', a6: '能源石油天然气', a7: '否'},
        ]
      }
    },
    goDetail(name) {
      this.$router.push({
        name: 'ClientDetail',
        query: {
          stockName: name
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input--small {
  width: 800px !important;
}
.containerBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 18px;
    font-weight: 600;
  }
  .content {
    margin-top: 50px;
    width: 100%;
    height: 800px;
    background-color: #fff;
    padding: 20px;
    display: flex;
    .title-box {
      width: 200px;
    }
    .table-container {
      flex: 1;
    }
  }
}
</style>
