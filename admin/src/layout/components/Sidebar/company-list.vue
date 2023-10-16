<template>
  <div class="company-list-wrap">
    <el-tabs v-model="activeStock" @tab-click="handleStockClick">
      <el-tab-pane v-for="(item) in companyList" 
                   :key="item.id"
                   :label="item.name" 
                   :name="item.id">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getHeaderCompany, setHeaderCompany, removeHeaderCompany } from '@/utils/auth';

export default {
  name: "CompanyList",
  components: {
    
  },
  props: {},
  data() {
    return {
      jumpBaseUrl: '',
      activeStock: '',
      saveCount: 10,
      companyList: [
        {id: '1',name: '万科A000002.SZ',code: '1'},
        {id: '2',name: '紫光国微002049.SZ',code: '2'},
        {id: '3', name: '国华网安000004.SZ',code: '3'},
        // {name: 'ST星源000005.SZ',code: 4},
        // {name: '深振业A000006.SZ',code: 5},
        // {name: '*ST全新000007.SZ',code: 6},
        // {name: '神州高铁000008.SZ',code: 7},
      ],
    };
  },
  computed: {
    ...mapGetters([
      'permission_routes',
    ]),
    routeId() {
      return this.$route.query.id;
    },
    userInfo() {
      return this.$store.getters.userinfo;
    }
  },
  watch: {
    $route(to,from){
      // this.addCompany(to);
    },
  },
  mounted() {

  },
  mounted() {
    // removeHeaderCompany();
    this.setSwitchBasePath();
    // this.setShowCompanyList();
    // this.addCompany(this.$route);
  },
  methods: {
    setSwitchBasePath() {
      const routerName = 'IndividualStockDetail';
      let list = this.permission_routes;
      let currentRouter = null;

      for(let i=0; i<list.length; i++) {
        let itemData = list[i];

        if (itemData.name == routerName) {
          currentRouter = itemData;
          break;
        }
      }

      if (currentRouter) {
        this.jumpBaseUrl = currentRouter.children[0].path; // children一定存在
      }
      // list.forEach((item,index)=> {
      //   console.log(index);
      //   if (index > 3) {
      //     console.log("--Jinglai")
      //     break;
      //   }
      // })
      console.log(list)
    },
    addCompany(routeData) {
      const canAdd = this.isCompanyDetail(routeData);

      if (!canAdd) {
        return;
      }

      const saveCompany = this.getSaveCompanyById(this.routeId);

      if (saveCompany) {
        this.activeStock = saveCompany.id;
      } else {
        this.getCompanyDetailById((ret)=> {
          if (ret) {
            this.setCompanyListByUserId(ret);
            this.addCompany(routeData);
          }
        })
      }
    },
    setShowCompanyList() {
      this.companyList = this.getCompanyListByUserId();
    },
    getSaveCompanyById(id) {
      const list = this.getCompanyListByUserId();
      let companyData = null;

      list.forEach((item,index)=> {
        if (item.id == id) {
          companyData = item;
        }
      })

      return companyData;
    },
    getCompanyListByUserId() {
      const companyMap = getHeaderCompany() || {};
      const userId = this.userInfo.id;
      const userCompany = companyMap[userId];

      return userCompany || [];
    },
    isCompanyDetail(routeData) {
      const path = '/individual-stock-detail';
      const routePath = routeData.fullPath || routeData.path;

      return routePath.indexOf(path) >= 0;
    },
    setCompanyListByUserId(companyData) {
      const companyMap = getHeaderCompany() || {};
      const userId = this.userInfo.id;
      const userCompany = companyMap[userId] || [];
      const count = this.saveCount;
      let list = [];

      const addId = companyData.id;

      userCompany.forEach((item,index) => {
        if (item.id != addId) {
          list.push(item);
        }
      });

      list.unshift({id: addId, name: companyData.name,time: new Date().getTime()});
      list = list.length > count ? list.splice(0,count) : list;

      companyMap[userId] = list;
      setHeaderCompany(companyMap);
      this.setShowCompanyList();
    },
    getCompanyDetailById(callback) {
      let params = {
        id: this.routeId,
      };
      let testData = {
        1:{id: '1',name: '万科A000002.SZ',code: '1'},
        2:{id: '2',name: '紫光国微002049.SZ',code: '2'},
        3:{id: '3', name: '国华网安000004.SZ',code: '3'},
      };

      testData[this.routeId] && callback && callback(testData[this.routeId]);
    },
    handleStockClick(data) {
      const id = data.name;

      this.$router.push({
        path: this.jumpBaseUrl,
        query: {id: id}
      })
    }
  }
};
</script>

<style lang="scss">
  .company-list-wrap {
    height: 100%;
    .el-tabs {
      height: 100%;
      .el-tabs__header {
        margin: 0;
      }
      .el-tabs__nav-wrap::after {
        display: none;
      }
      .el-tabs__nav-prev,
      .el-tabs__nav-next {
        display: flex;
        align-items: center;
        height: 100%;
        transition: all 0.3s ease;
        color: #1065A0;
        &:hover {
          color: #000;
          transform: scale(1.2);
        }
      }
      .el-tabs__nav {
        display: flex;
        .el-tabs__item {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          padding: 0 10px;
          &:hover {
            color: #1065A0;
          }
          &.is-active {
            color: #1065A0;
          }
        }
        .el-tabs__active-bar {
          display: none!important;
          height: 3px;
          background-color: #1065A0;
        }
      }
    }
    .el-tabs,
    .el-tabs__header,
    .el-tabs__nav-wrap,
    .el-tabs__nav-scroll,
    .el-tabs__nav,
    .el-tabs__item {
      height: 100%;
    }
  }
</style>
