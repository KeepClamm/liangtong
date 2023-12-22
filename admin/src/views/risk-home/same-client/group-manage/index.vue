<template>
  <div class="container">
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in dataConfig" :key="index">
          <div class="top-item">
            <div class="content-item-top">{{ item.title }}</div>
            <div class="content-item-main">
              <div class="content-item-main-num">{{ item.num }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="group-table">
      <div class="table-title">同一客户列表</div>
      <div class="table-select">
        <search-bar @searchInfo="searchInfo">
          <el-form :model="searchParams" inline>
            <el-form-item label="同一客户号：">
              <el-input
                size="mini"
                placeholder="请输入"
                v-model="searchParams.keywords"
              ></el-input>
            </el-form-item>
            <el-form-item label="同一客户名称：">
              <el-input
                size="mini"
                placeholder="请输入"
                v-model="searchParams.kehu"
              ></el-input>
            </el-form-item>
            <el-form-item label="成员名称：">
              <el-input
                size="mini"
                placeholder="请输入"
                v-model="searchParams.cehngyuan"
              ></el-input>
            </el-form-item>
            <el-form-item label="同一客户组来源：">
              <el-select v-model="searchParams.checkItem" size="mini">
                <el-option
                  v-for="item in adjustItemOpt"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="同一客户组规则名称：">
              <el-select v-model="searchParams.rule" size="mini">
                <el-option
                  v-for="item in ruleName"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </search-bar>
      </div>
      <div style="width: 100%; height: 800px">
        <basic-table :prop-list="porpConfig" :table-data="tableData">
          <template #ticketCode="{ row }">
            <span class="color-blue cursor-pointer" @click="goDetail">{{
              row.a2
            }}</span>
          </template>
        </basic-table>
      </div>
    </div>
  </div>
</template>

<script>
import BasicTable from "@/components/show-ui/table/basic-table";
import SearchBar from "@/components/show-ui/search/search-bar.vue";
export default {
  components: { SearchBar, BasicTable },
  data() {
    return {
      dataConfig: [
        { title: "同一客户群组", num: 70786 },
        { title: "自然人同一客户群组", num: 66108 },
        { title: "法人同一客户群组", num: 4156 },
        { title: "产品同一客户群组", num: 627 },
      ],
      adjustItemOpt: [
        { label: "集团派系", value: 0 },
        { label: "控股股东", value: 1 },
        { label: "控股企业", value: 2 },
        { label: "一致行动人", value: 3 },
        { label: "亲属", value: 4 },
        { label: "产品管理人", value: 5 },
        { label: "分支机构母公司", value: 6 },
      ],
      ruleName: [
        { label: "集团", value: 0 },
        { label: "虚拟集团", value: 1 },
      ],
      porpConfig: [
        { label: "同一客户号", prop: "a1" },
        { label: "同一客户名称", prop: "a2", slotName: "ticketCode" },
        { label: "成员数量", prop: "a3" },
        { label: "客户数量", prop: "a4" },
        { label: "机构成员数量", prop: "a5" },
        { label: "产品成员数量", prop: "a6" },
        { label: "个人成员数量", prop: "a7" },
        { label: "同一客户组来源", prop: "a8" },
        { label: "同一客户组规则名称", prop: "a9" },
      ],
      tableData: {
        total: 0,
        items: [
          {
            a1: "A_23123123_C",
            a2: "客户A",
            a3: 3333,
            a4: 40,
            a5: 4444,
            a6: 0,
            a7: 8,
            a8: "规则-集团25%",
          },
        ],
      },
      searchParams: {},
    };
  },
  methods: {
    searchInfo({ type }) {
      if (type !== 'search') {
        this.searchParams = {
        };
      }
    },
    goDetail() {
      this.$router.push({
        name: "ClientDetail",
        query: {
          title: '',
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.color-blue {
  color: #00a3e0 !important;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px 20px 0px 20px;
  .top {
    width: 100%;
    height: 140px;
    padding: 24px 20px;
    background-color: #fff;
    margin-bottom: 30px;
    .top-item {
      height: 90px;
      padding: 16px 24px;
      background: #f8f9fb;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow-y: scroll;
      overflow-x: scroll;
      .content-item-top {
        white-space: nowrap;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #1d2129;
      }
      .content-item-main {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        .content-item-main-num {
          white-space: nowrap;
          font-weight: 700;
          font-size: 28px;
          line-height: 28px;
          color: #1d2129;
        }
      }
    }
  }
  .group-table {
    width: 100%;
    background-color: #fff;
    padding: 20px;
    flex: 1;
    .table-title {
      font-size: 22px;
      font-weight: 500;
      margin-bottom: 30px;
    }
    .table-select {
      width: 100%;
      display: flex;
    }
  }
}
</style>
