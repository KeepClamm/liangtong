<template>
  <div class="container">
    <el-page-header @back="goBack" :content="mainComName"> </el-page-header>
    <el-card shadow="hover" style="margin-top: 20px;border-radius: 8px;">
      <div
        slot="header"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
      <span>关联关系查询</span>
      <div style="display: flex;">
        <div class="search-button" @click="openCheckDialog" v-if="userAccount == 'admin'">待审核列表</div>
        <div class="search-button" @click="serachRelation">查询</div>
      </div>
      </div>
      <div class="search-input">
        <div>
          <el-input
            class="centered-input"
            v-model="mainComName"
            placeholder="请输入主体信息"
            disabled
          ></el-input>
        </div>
        <div>&</div>
        <div>
          <el-input
            class="centered-input"
            v-model="searchName"
            placeholder="请输入主体信息"
          ></el-input>
        </div>
      </div>
    </el-card>
    <transition name="el-fade-in-linear" >
      <el-card style="margin-top: 20px; border-radius: 8px;" v-if="graphFlag">
        <div style="width: 100%; height: 400px">
            <RelationGraph v-show="showGraphFlag"
              ref="graphRef"
              :options="graphOptions"
              :on-node-click="onNodeClick"
              :on-line-click="onLineClick"/>
              <div v-show="!showGraphFlag">
                <el-empty description="暂无结果" v-if="userAccount == 'admin'"></el-empty>
                <div style="display: flex; justify-content: center; align-items: center;width: 100%;">
                  <div class="search-button" @click="realtionAdd">关联关系新增</div>
                </div>
              </div>
        </div>
      </el-card>
    </transition>
    <div class="main-title" style="border-radius: 8px;">
      <div>关联关系</div>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="rowClass"
        :cell-style="cellStyle"
      >
        <el-table-column label="关联主体" prop="relaClient"></el-table-column>
        <el-table-column label="关系类型" prop="relaType"></el-table-column>
        <el-table-column label="比例/金额" prop="rate"></el-table-column>
        <el-table-column label="预警等级" prop="mainrisk"></el-table-column>
        <el-table-column label="企业性质" prop="qualition"></el-table-column>
        <el-table-column label="所属行业" prop="sector"></el-table-column>
        <el-table-column
          label="在我司是否有信用类业务"
          prop="creditTask"
        ></el-table-column>
        <el-table-column label="信用类业务敞口规模" prop="scale"></el-table-column>
      </el-table>
    </div>
    <add-dialog ref="addDialog" :mainComName="mainComName" :searchName="searchName" @addRelation="addRelation"></add-dialog>
    <el-dialog class="common-dialog-box" title="待审核列表"
    :visible.sync="checkDialogStatus" width="900px"  top="0" show-close
    :append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false"> 
      <el-table :data="waitCheckData" style="width: 100%" :header-cell-style="rowClass" :cell-style="cellStyle">
        <el-table-column label="主体1" prop="mainComName"></el-table-column>
        <el-table-column label="主体2" prop="searchName"></el-table-column>
        <el-table-column label="关联关系" prop="relaType"></el-table-column>
        <el-table-column label="审核" width="80">
            <template slot-scope="scope">
              <div v-if="scope.row.status == 0">
                <el-popover placement="top" trigger="click">
                  <div style="display: flex; padding: 10px;">
                    <div class="button-table" style="margin-right: 8px;" @click="passClick(scope.row)">通过</div>
                    <div class="button-table extra-button" @click="refuseClick(scope.row)">驳回</div>
                  </div>
                  <span style="cursor: pointer;" slot="reference">审核</span>
                </el-popover>
              </div>
              <div v-else-if="scope.row.status == 2">
                <span style="color: #409EFF;">已通过</span>
              </div>
              <div v-else>
                <div style="color: #F56C6C;">未通过</div>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <div class="el-icon-delete handle-delete"></div>
            </template>
          </el-table-column> -->
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import RelationGraph from "relation-graph";
import AddDialog from './component/add-dialog.vue';
import { getRelationDetail } from '@/api/sameClient'
export default {
  data() {
    return {
      mainComName: "",
      searchName: "",
      userAccount: '',
      graphFlag: false,
      checkDialogStatus: false,
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: "border",
      },
      tableData: [],
      storeData: [],
      waitCheckData: [],
      showGraphFlag: false,
      newNode: {},
      newLine: {},
      lines: [
          { from: "b", to: "a", text: "股东", color: "#43a2f1" },
          { from: "c", to: "a", text: "股东", color: "#43a2f1" },
          { from: "d", to: "a", text: "股东", color: "#43a2f1" },
          { from: "e", to: "a", text: "股东", color: "#43a2f1" },
          { from: "f", to: "a", text: "对外投资", color: "#43a2f1" },
          { from: "g", to: "a", text: "对外投资", color: "#43a2f1" },
          { from: "h", to: "a", text: "对外投资", color: "#43a2f1" },
          { from: "i", to: "a", text: "对外投资", color: "#43a2f1" },
          { from: "j", to: "a", text: "对外担保", color: "#43a2f1" },
        ],
    };
  },
  computed: {
    nodes() {
      return  [
        { id: "a", text: this.mainComName, borderColor: "yellow", width: 100, height: 100 },
        { id: "b", text: "中华人民共和国财政部", width: 120, height: 120 },
        { id: "c", text: "中央汇金投资有限责任公司", width: 120, height: 120 },
        { id: "d", text: "梧桐树投资平台有限责任公司", width: 120, height: 120 },
        { id: "e", text: "全国社会保障基金理事会",  width: 120, height: 120},
        { id: "f", text: "海南航空控股股份有限公司",  width: 120, height: 120},
        { id: "g", text: "重庆燃气股份集团有限公司", width: 120, height: 120 },
        { id: "h", text: "吉林吉恩镍业股份有限公司", width: 120, height: 120 },
        { id: "i", text: "国开金融有限责任公司",width: 120, height: 120},
        { id: "j", text: "云南祥云飞龙再生科技股份有限公司",width: 120, height: 120},
      ]
    }
  },
  components: { RelationGraph, AddDialog },
  mounted() {
    this.mainComName = this.$route.query.companyName || ''
    this.userAccount = localStorage.getItem('userAccount')
    this.getRelationDetail()
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    rowClass({ row, rowIndex }) {
      return "text-align: center;color: #000;height:48px;font-size:14px;font-weight:700";
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return "text-align: center;height: 60px;";
    },
   async serachRelation() {
      if (!this.mainComName || !this.searchName) {
        this.$message.error("请输入完整的企业名称");
      } else {
        this.graphFlag = true;
        const findRes = this.storeData.find(item => item.relaClient == this.searchName)
        if (!!findRes) {
          this.showGraphFlag = true
          this.showGraph();
          this.tableData.splice(0, 1, findRes)
        } else {
          this.showGraphFlag = false
          this.tableData = []
        }
      }
    },
    passClick(row) {
      console.log('row', row)
      row.status = 2,
      this.nodes.push(this.newNode),
      this.lines.push(this.newLine)
      this.showGraphFlag = true
      this.showGraph()
      this.tableData.splice(0,1,row)
    },
    refuseClick(row) {
      row.status = 1
    },
    getRelationDetail() {
      const that = this 
      getRelationDetail().then(res => {
          that.storeData = res.data || []
      })
    },
    showGraph() {
      const jsonData = {
        rootId: "a",
        nodes: this.nodes,
        lines:this.lines,
      };
      this.$nextTick(function () {
        console.log(this.$refs.graphRef)
        this.$refs.graphRef.setJsonData(jsonData, (graphInstance) => {
        });
      });
    },
    openCheckDialog() {
      this.checkDialogStatus = true
    },
    onNodeClick(nodeObject, $event) {
      console.log("onNodeClick:", nodeObject);
    },
    onLineClick(lineObject, $event) {
      console.log("onLineClick:", lineObject);
    },
    realtionAdd() {
      this.$refs.addDialog.open()
    },
    addRelation(dataArray) {
      this.newNode = dataArray[0]
      this.newLine = dataArray[1]
      this.waitCheckData.push(dataArray[2])
    }
  },
};
</script>
<style lang="scss" scoped src="@/styles/show-ui/common_dialog_style.scss"></style>
<style lang="scss" scoped>
.container::v-deep .el-dialog {
  min-height: 600px;
  margin-top: calc(50vh - 344px) !important;
}
.centered-input {
  text-align: center !important;
}
.handle-delete {
  color: #f56c6c;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
.button-table {
  padding: 3px 12px;
  background-color: #012169;
  font-size: 12px;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}
.extra-button {
  background: #e5e6eb !important;
  color: #012169 !important;
}
.search-button {
  padding: 6px 20px;
  font-size: 14px;
  background-color: #012169;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 8px;
}
.container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 32px;
  .search-input {
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    & > div:first-child {
      width: 40%;
      height: 60px;
      display: flex;
      align-items: center;
    }
    & > div:last-child {
      width: 40%;
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
  .main-title {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    align-items: center;
    margin-top: 20px;
    padding: 20px 24px;
    & > div:first-child {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
