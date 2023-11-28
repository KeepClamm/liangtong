<template>
  <div class="login-wrap show-flex-box-c">
    <div class="logo-box">
      <h1 class="logo">
        <!-- <img src="@/assets/logo.png"> -->
      </h1>
    </div>
    <div class="login-form show-flex-box-r">
      <div class="login-box">
        <div class="title">
          <h2>信用风险管理系统</h2>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <el-form-item prop="account">
            <el-input v-model="loginForm.account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input show-password v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <div class="verification-code-box show-flex-box-r">
              <el-input v-model="loginForm.verificationCode" maxlength="4" placeholder="请输入验证码"></el-input>
              <div class="code-image-box" @click="updateAuthCode()">
                <img :src="authCodeUrl" />
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="rememberPassword">
            <div class="remember-pwd-checkbox show-flex-box-r">
              <el-checkbox v-model="rememberPasswordStatus">记住密码</el-checkbox>
            </div>
          </el-form-item>
        </el-form>
        <div class="login-btn">
          <el-button type="primary" :loading="loginLoading" @click="confirmLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getLoginVerifyImage, userLogin } from '@/api/service/login';
import verificationCode from './components/verification-code-comp';

import { setCTLogin, getCTLogin, removeCTLogin } from '@/utils/auth';
import { encrypt, decrypt } from './aes';
import router from '@/router';

export default {
  name: "Login",
  components: {
    verificationCode
  },
  data() {
    const checkCode = (rule,value,callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'));
      }

      callback();
    };

    return {
      authCodeUrl: '',
      loginLoading: false,
      loginForm: {
        account: '',
        password: '',
        verificationCode: ''
      },
      rememberPasswordStatus: false,
      loginRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        verificationCode: [
          { validator: checkCode, trigger: 'blur' }
        ],
      }
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.getAuthCodeImage();
    this.checkRememberPassword();
  },
  methods: {
    checkRememberPassword() {
      const loginData = this.getRememberPassword();

      if (!loginData) {
        return;
      }

      this.loginForm.account = loginData.account;
      this.loginForm.password = loginData.password;
      this.rememberPasswordStatus = true;
    },
    setRememberPassword() {
      let loginData = {
        "account": this.loginForm.account,
        "password": this.loginForm.password,
      };

      const encryptData = encrypt(loginData);
      setCTLogin(encryptData);
    },
    getRememberPassword() {
      const localLoginData = getCTLogin();
      let loginData = null;

      if (localLoginData) {
        const decryptData = decrypt(localLoginData);
        loginData = decryptData ? JSON.parse(decryptData) : null;
      }

      return loginData;
    },
    onCreateCode() {
      this.$refs.verification_code_ref.autoDraw(({ code })=> {
        this.authTrueCode = code;
      })
    },
    confirmLogin() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.toLogin();
        } else {
          return false;
        }
      });
    },
    updateAuthCode() {
      this.getAuthCodeImage();
    },
    getAuthCodeImage() {
      this.authCodeUrl = getLoginVerifyImage({
        width: 100,
        height: 36,
        codeCount: 4
      });
    },
    setRememberPasswordWithLoginSuccess() {
      if (this.rememberPasswordStatus) {
        this.setRememberPassword();
      } else {
        removeCTLogin();
      }
    },
    setBlackList() {
      const blackList = [
          {id: 1, name: 'test1', code: '21312313', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '1221000', sDate: '2023/08/09', eDate: '2023/09/22', status: 0},
          {id: 2, name: 'test2', code: '77432111', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '5631000', sDate: '2023/08/19', eDate: '2023/09/12', status: 1},
          {id: 3, name: 'test3', code: '12789033', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321200', sDate: '2023/08/02', eDate: '2023/10/09', status: 2},
          {id: 4, name: 'test4', code: '90532221', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '8621250', sDate: '2023/08/01', eDate: '2023/09/02', status: 0},
          {id: 5, name: 'test5', code: '36883232', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '9821000', sDate: '2023/08/09', eDate: '2023/09/27', status: 0},
          {id: 6, name: 'test6', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 2},
          {id: 7, name: 'test7', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 1},
          {id: 8, name: 'test8', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 0},
          {id: 9, name: 'test9', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 1},
          {id: 10, name: 'test10', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 0},
          {id: 11, name: 'test11', code: '24574345', serviceName: '约定购回', serviceNum: '124467883232', limitNum: '2321000', sDate: '2023/08/09', eDate: '2023/09/25', status: 0},
      ]
      localStorage.setItem('blackList', JSON.stringify(blackList))
    },
    toLogin() {
      let params = {
        "account": this.loginForm.account,
        "password": this.loginForm.password,
        "code": this.loginForm.verificationCode
      };
      if (['admin', 'test01'].includes(this.loginForm.account)) {
        localStorage.setItem('userAccount', this.loginForm.account)
        this.$store.dispatch('setToken',"eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsInN1YiI6IjEiLCJpYXQiOjE3MDA0NTgzODUsImV4cCI6MTcwMzA1MDM4NX0.d5_-Sukj8Z4pJDgQWGP-B0rQYYCV2mXC4DYhBeUJUFE");
        location.reload()
        // this.$router.push('/risk-home/same-client')
        this.loginLoading = true;
        this.setBlackList()
      } else {
        this.$message.error('请输入正确的用户名或者密码')
      }
      // userLogin(params)
      //   .then((ret)=> {
      //     const curData = ret.data;

      //     if (curData.token) {
      //       this.setRememberPasswordWithLoginSuccess();
      //       this.$store.dispatch('setToken',curData.token);
      //       location.reload();
      //     }
      //   }).catch((err)=> {
      //     this.loginLoading = false;
      //     this.updateAuthCode();
      //   })
    },
  }
};
</script>

<style lang="scss" scoped>
  .login-wrap {
    overflow: hidden;
    height: 100%;
    background: url("../../assets/login/logo_bg_1.png") left top no-repeat;
    background-size: 100% 100%;
    .logo-box {
      padding-top: 35px;
      padding-left: 50px;
      &>.logo {
        display: block;
        width: 200px;
        height: 60px;
        margin: 0;
        &>img {
          display: block;
          width: 100%;
        }
      }
    }
    .login-form {
      flex-grow: 1;
      justify-content: center;
      align-items: center;
      padding-bottom: 150px;
      user-select: none;
      .login-box {
        width: 325px;
        padding: 25px;
        box-sizing: border-box;
        border-radius: 8px;
        background: #fff;
        .title {
          margin-bottom: 35px;
          &>h2 {
            text-align: center;
            font-size: 18px;
          }
        }
        .verification-code-box {
          .code-image-box {
            overflow: hidden;
            flex-shrink: 0;
            width: 100px;
            height: 36px;
            margin-left: 10px;
            background: #afafaf;
          }
        }
        .remember-pwd-checkbox {
          justify-content: flex-end;
        }
        .login-btn {
          margin-top: 50px;
          button {
            width: 100%;
          }
        }
      }
    }
  }
</style>
