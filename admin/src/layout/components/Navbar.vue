<template>
  <div class="navbar border-box w100 pl-0 pr-30 show-flex-box-r fs-0">
    <div class="w100 h100 show-flex-box-r show-flex-sb">
      <div class="logo-box">
        <logo />
      </div>
      <div class="route-menu">
        <header-menu />
      </div>
      <!-- <div class="test-box">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div> -->
      <div class="company-list-box">
        
      <div class="search-box">
        <el-input placeholder="请输入业务/产品名称/单一客户识别码/身份证/护照/企业统一社会信用码/工商注册号/组织机构代码/证券代码" v-model="keywords">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <!-- <div class="search-button" @click="toSearch">
          <img class="search-icon" :src="searchIcon">
        </div> -->
        <!-- <div class="search-input-box">
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
        </div> -->
      </div>
        <!-- <company-list></company-list> -->
      </div>
      

      <div class="right-menu show-flex-box-r fs-0">
        <img src="@/assets/images/layout/user-icon.png" class="user-avatar mr-10" />
        
        <el-dropdown trigger="click" @command="handleBtn">
          <div class="user-handle show-flex-box-r">
            <div class="name-bar show-flex-box-c fs-0">
              <strong class="hide-line1">{{ userAccount }}</strong>
              <span v-if="roleName" class="hide-line1">{{ roleName }}</span>
            </div>
            <img class="pull-down ml-12 mt-5 cursor-pointer" src="@/assets/images/layout/pull-down-icon.png">
          </div>

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
    <el-dialog title="操作提示"
               :visible.sync="logoutPopStatus"
               width="380px"
               center
               append-to-body>
      <span style="font-weight:bold;">确定退出当前登录的账号吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="logoutPopStatus = false">取 消</el-button>
        <el-button type="primary" @click="logout()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改密码 弹窗 -->
    <div>
      <change-pwd-dialog ref="change-pwd-ref" :showClose="!needChangePassword" @change-pwd="logout()" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Logo from './Sidebar/Logo';
import headerMenu from './Sidebar/header-menu';
import companyList from './Sidebar/company-list';
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
    headerMenu,
    companyList,
  },
  data() {
    return {
      searchIcon,
      logoutPopStatus: false,
      keywords: '',
      searchKeywordValueMap: {},
      options: [{
          value: '选项1',
          label: '电子**23**'
        }, {
          value: '选项2',
          label: '中叶**0**'
        }, {
          value: '选项3',
          label: '多多**01**'
        }],
        value: '选项1'
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
    roleName() {
      return this.userinfo.roleName || '';
    },
    needChangePassword() {
      const userInfo = this.userinfo;
      return userInfo && userInfo.account != 'admin' ? !userInfo.changePassword : false;
    },
    userAccount() {
      return localStorage.getItem('userAccount')
    }
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
          this.$refs['change-pwd-ref'].open(({ type }) => {
            switch (type) {
              case 'success':
                this.$message({
                  showClose: true,
                  message: '密码修改成功，需重新登录',
                  type: "success",
                });

                this.logout();
              break;
              case 'fail':
              
              break;
            }
          });
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
    toSearch(){
      // this.$router.push({
      //   path: '/search/home'
      // })
    },
    querySearchAsync(queryString, cb) {
      const params = { keywords: queryString };
      const cacheData = this.searchKeywordValueMap[queryString];

      if (cacheData && cacheData.length > 0) {
        cb(cacheData);
        return;
      }
    },
    handleSelect(row) {
      
    },
  }
};
</script>

<style lang="scss" scoped>
::v-deep .search-box .el-input {
  width: 100%;
  flex: 1;
}
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
    margin-left: -20px;
    padding-left: 50px;
    flex-shrink: 0;
    height: 100%;
    background: url("../../assets/images/common/header_1.png") left top no-repeat;
    background-size: auto 100%;
  }
  .company-list-box {
    position: relative;
    overflow: hidden;
    flex-grow: 1;
    justify-content: flex-end;
    width: 0;
    height: 100%;
    margin-left: 50px;
    margin-right: 20px;
    padding-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    // &:after {
    //   content: "";
    //   position: absolute;
    //   top: 50%;
    //   left: 0;
    //   width: 4px;
    //   height: 20px;
    //   border-radius: 20px;
    //   transform: translateY(-50%);
    //   background: #1065A0;
    // }
  }

  .search-box {
    width: 100%;
    flex-shrink: 0;
    padding-right: 20px;
    .search-button {
      padding: 5px;
      background: #fff;
      border-radius: 100%;
      cursor: pointer;
    }
    &>.search-input-box {
      width: 260px;
    }
  }

  .right-menu {
    flex-shrink: 0;

    &:focus {
      outline: none;
    }
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 100%;
    }
    .user-handle {
      height: 100%;
      align-items: center;
      cursor: pointer;
      .name-bar{
        max-width: 80px;
        flex-grow: 1;
        justify-content: center;
        &>strong {
          font-size: 14px;
          color: #1065A0;
        }
        &>span{
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 18px;
          color: #86909C;
        }
      }
      .pull-down{
        width: 16px;
        height: 16px;
      }
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

<style lang="scss">
  .test-box {
    width: 150px;
    margin-right: 10px;
    .el-select {
      input {
        background: none;
        color: #1065A0;
      }
    }
  }
</style>
