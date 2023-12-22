<template>
  <div class="container">
    <el-page-header @back="goBack" :content="stockName"> </el-page-header>
    <div class="main-content">
      <div class="container-table">
        <el-card style="border-radius: 16px;">
          <!-- <div style="font-size: 16px; font-weight: 700">业务详情</div> -->
          <div slot="header">
            <span>业务详情</span>
          </div>
          <div class="table-content">
            <div class="table-content-row">
              <div></div>
              <div class="bold-box">债券投资</div>
              <div class="bold-box">约定购回</div>
              <div class="bold-box">经济业务</div>
            </div>
            <div
              class="table-content-row"
              v-for="item in detailConfig"
              :key="item.label"
            >
              <div class="bold-box">{{ item.label }}</div>
              <div>{{ item.bondInvest }}</div>
              <div>{{ item.buyBack }}</div>
              <div>{{ item.brokerage }}</div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="container-card">
        <el-card style="border-radius: 16px;">
          <el-descriptions title="基本信息" style="margin-bottom: 20px">
            <el-descriptions-item label="行业"></el-descriptions-item>
            <el-descriptions-item label="预警等级">低风险</el-descriptions-item>
            <el-descriptions-item label="企业性质"
              >中央国有企业</el-descriptions-item
            >
            <el-descriptions-item label="外部评级">AAA</el-descriptions-item>
            <el-descriptions-item label="地区">北京市</el-descriptions-item>
            <el-descriptions-item label="内部评级"></el-descriptions-item>
            <el-descriptions-item label="主营业务"
              ></el-descriptions-item
            >
          </el-descriptions>
          <div class="relationship">
            <div class="relationship-title">
              <div>关联关系</div>
              <el-link type="primary" @click="goRelationDetail">>>详情</el-link>
            </div>
            <div class="relationship-content">
              <RelationGraph
                ref="graphRef"
                :options="graphOptions"
                :on-node-click="onNodeClick"
                :on-line-click="onLineClick"
              />
            </div>
          </div>
          <div class="relationship">
            <div class="relationship-title" style="margin-bottom: 15px">
              <div>负面舆情</div>
              <el-link type="primary" @click="goNegativeSentiment"
                >>>详情</el-link
              >
            </div>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="舆情1" name="1">
                <div>
                  测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。
                </div>
              </el-collapse-item>
              <el-collapse-item title="舆情2" name="2">
                <div>
                  测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。
                </div>
              </el-collapse-item>
              <el-collapse-item title="舆情3" name="3">
                <div>
                  测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。
                </div>
              </el-collapse-item>
              <el-collapse-item title="舆情4" name="4">
                <div>
                  测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试。
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import RelationGraph from "relation-graph";
export default {
  data() {
    return {
      stockName: '',
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: "border",
      },
      activeNames: [],
      detailConfig: [
        {
          label: "业务类型",
          bondInvest: "信用类",
          buyBack: "信用类",
          brokerage: "非信用类",
        },
        {
          label: "业务状态",
          bondInvest: "正常",
          buyBack: "正常",
          brokerage: "正常",
        },
        {
          label: "已用额度(万元)",
          bondInvest: "70000",
          buyBack: "1000",
          brokerage: "",
        },
        {
          label: "已用额度占授信限额比例",
          bondInvest: "100%",
          buyBack: "100%",
          brokerage: "",
        },
        {
          label: "敞口/业务规模(万元)",
          bondInvest: "60000",
          buyBack: "3000",
          brokerage: "2000",
        },
        { label: "固定收益部", bondInvest: "20000", buyBack: "", brokerage: "" },
        { label: "子公司1", bondInvest: "20000", buyBack: "", brokerage: "" },
        { label: "子公司2", bondInvest: "10000", buyBack: "", brokerage: "" },
        { label: "子公司3", bondInvest: "10000", buyBack: "", brokerage: "" },
      ],
    };
  },
  components: { RelationGraph },
  mounted() {
    console.log('--------------------------', this.$route.query)
    this.stockName = this.$route.query.stockName || ''
    this.showGraph();
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    handleChange() {},
    goRelationDetail() {
      this.$router.push({
        name: 'CompanyRelationDetail',
        query: {
          stockName: this.stockName
        }
      });
    },
    goNegativeSentiment() {
      this.$router.push("/risk-home/negative-sentiment");
    },
    showGraph() {
      const jsonData = {
        rootId: "a",
        nodes: [
          { id: "a", text: this.stockName, borderColor: "yellow", width: 100, height: 100 },
          { id: "b", text: "中华人民共和国财政部", borderColor: "yellow", width: 120, height: 120 },
          { id: "c", text: "中央汇金投资有限责任公司", borderColor: "yellow", width: 120, height: 120 },
          { id: "d", text: "梧桐树投资平台有限责任公司", width: 120, height: 120 },
          { id: "e", text: "全国社会保障基金理事会",  width: 120, height: 120},
          { id: "f", text: "海南航空控股股份有限公司",  width: 120, height: 120},
          { id: "g", text: "重庆燃气股份集团有限公司", width: 120, height: 120 },
          { id: "h", text: "吉林吉恩镍业股份有限公司", width: 120, height: 120 },
          { id: "i", text: "国开金融有限责任公司",width: 120, height: 120},
          { id: "j", text: "云南祥云飞龙再生科技股份有限公司",width: 120, height: 120},
        ],
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
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
      this.$refs.graphRef.setJsonData(jsonData, (graphInstance) => {
        // Called when the relation-graph is completed
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log("onNodeClick:", nodeObject);
    },
    onLineClick(lineObject, $event) {
      console.log("onLineClick:", lineObject);
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.bold-box {
  font-weight: 700;
}
.container {
  width: 100%;
  height: 100%;
  padding: 32px;
  overflow-y: auto;
  .main-content {
    margin-top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    .container-table {
      width: 50%;
      margin-right: 30px;
      .table-content {
        width: 100%;
        .table-content-row {
          display: flex;
          margin-bottom: 30px;
          & > div {
            flex: 1;
            text-align: center;
          }
        }
      }
    }
    .container-card {
      width: 50%;
      .relationship {
        margin-bottom: 15px;
        .relationship-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          & > div:first-child {
            font-size: 16px;
            font-weight: 700;
          }
        }
        .relationship-content {
          width: 100%;
          height: 350px;
          background-color: lightgray;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
