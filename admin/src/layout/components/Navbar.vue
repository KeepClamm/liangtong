<template>
  <div class="navbar border-box w100 pl-0 pr-50 show-flex-box-r fs-0">
    <div class="w100 h100 show-flex-box-r show-flex-sb">
      <div class="logo-box">
        <logo />
      </div>
      <div class="route-menu">
        <header-menu />
      </div>
      <div class="search-box">
        <el-autocomplete style="width: 100%;"
                         v-model="keywords"
                         placeholder="主体名称/服务名称/服务代码..."
                         size="normal"
                         :clearable="false"
                         type="text"
                         :maxlength="50"
                         :debounce="500"
                         value-key="stockShortName"
                         :trigger-on-focus="false"
                         :fetch-suggestions="querySearchAsync"
                         @select="handleSelect">
          <span slot="prefix" class="h100 show-flex-box-r show-flex-center">
            <img class="search-icon" :src="searchIcon">
          </span>
        </el-autocomplete>
      </div>

      <div class="right-menu show-flex-box-r fs-0">
        <img src="@/assets/images/layout/user-icon.png" class="user-avatar mr-20" />

        <div class="name-bar show-flex-box-c fs-0">
          <p class="show-flex-box-r hide-line1 align-center">{{ companyName }}</p>
          <span>{{ account }}</span>
        </div>
        
        <el-dropdown trigger="click" @command="handleBtn">
          <img class="pull-down ml-12 mt-5 cursor-pointer" src="@/assets/images/layout/pull-down-icon.png">

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- 确认退出登录弹窗 -->
    <el-dialog
      title="操作提示"
      :visible.sync="logoutPopStatus"
      width="380px"
      center
      append-to-body
    >
      <span style="font-weight:bold;">确定退出当前登录的账号吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="logoutPopStatus = false">取 消</el-button>
        <el-button type="primary" @click="logout()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改密码 弹窗 -->
    <div>
      <change-pwd-dialog ref="change-pwd-ref"
                         :showClose="!needChangePassword" 
                         @change-pwd="logout()" />
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Logo from './Sidebar/Logo';
import headerMenu from './Sidebar/header-menu';
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import changePwdDialog from './change-pwd-dialog';
const searchIcon = require('@/assets/images/layout/search-icon.png');


export default {
  components: {
    Logo,
    Breadcrumb,
    Hamburger,
    changePwdDialog,
    headerMenu
  },
  data() {
    return {
      searchIcon,
      logoutPopStatus: false,
      keywords: '',
      searchKeywordValueMap: {}
    };
  },
  computed: {
    ...mapGetters(["sidebar", "userinfo"]),
    companyName(){
      return this.userinfo.companyName || '';
    },
    account(){
      return this.userinfo.account || '';
    },
    needChangePassword() {
      const userInfo = this.userinfo;
      return userInfo && userInfo.account != 'admin' ? !userInfo.changePassword : false;
    },
  },
  inject: ['reload'],
  watch: {
    changePassword() {
      this.checkChangePasswordStatus();
    }
  },
  mounted() {
    this.checkChangePasswordStatus();
  },
  methods: {
    toggleSideBar() {
      // 该项目去除导航大小变化
      // this.$store.dispatch("app/toggleSideBar");
    },
    handleBtn(type){
      switch (type) {
        case 'changePwd': // 修改密码
          this.$refs['change-pwd-ref'].open();
          break;
        case 'logout': // 退出登录
          this.logoutPopStatus = true;
          break;
      }
    },
    async logout() {
      this.$store.dispatch("LOGOUT").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    checkChangePasswordStatus() {
      const needChange = this.needChangePassword;

      if (needChange) {
        this.$refs['change-pwd-ref'].open();
      }
    },
    // 搜索
    toSearch(){},
    querySearchAsync(queryString, cb) {
      const params = { keywords: queryString };
      const cacheData = this.searchKeywordValueMap[queryString];

      if (cacheData && cacheData.length > 0) {
        cb(cacheData);
        return;
      }
    },
    handleSelect(row) {
      this.keywords = '';
      const info = {
        id: row.stockCode,
        name: row.stockShortName,
      };

      if (this.$route.name == 'riskFluctuationOverview') {
        this.reload(); // 静默刷新（v-if原理）
        // location.reload(); // 页面刷新
      } else {
        this.$router.push({ path: '/individual-stocks/risk-fluctuation-overview' });
      }

      this.$store.dispatch("setCurWatchStockInfo", info);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@/layout/common.scss";

.navbar {
  overflow: hidden;
  height: 100%;
  background: #FFFFFF;
  border-left: 1px solid #F8F9FE;
  background: #D9ECFF;

  .logo-box {
    flex-shrink: 0;
    overflow: hidden;
    width: $logoWidth;
  }

  .route-menu {
    margin-left: -10px;
    margin-right: 10px;
    padding-left: 50px;
    flex-grow: 1;
    height: 100%;
    background: url("../../assets/images/common/header_1.png") left top no-repeat;
    background-size: auto 100%;
  }

  .search-box {
    flex-shrink: 0;
    width: 260px;
    margin-right: 25px;
  }

  .right-menu {
    flex-shrink: 0;

    &:focus {
      outline: none;
    }
    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: 100%;
    }
    .name-bar{
      height: 100%;
      justify-content: center;
      > p{
        padding: 0;
        margin: 0 0 6px 0;
        max-width: 200px;
        display: block;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #1D2129;
      }
      > span{
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        color: #86909C;
      }
    }
    .pull-down{
      width: 16px;
      height: 16px;
    }
  }
}
</style>

<style lang="scss" scoped>
.search-icon{
  width: 24px;
  height: 24px;
}
.input-bar ::v-deep{
  .el-input__inner{
    background: #F8F9FB;
    border-radius: 8px;
    border: none;
    padding: 0 52px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: normal;
    color: #012169;
  }
  .el-input__prefix{
    top: 8px;
    left: 20px;
    right: unset;
    height: 24px;
  }
}
</style>
