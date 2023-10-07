<template>
  <div class="login-wrap show-flex-box-c">
    <div class="logo-box">
      <h1 class="logo">
        <img src="@/assets/logo.png">
      </h1>
    </div>
    <div class="login-form show-flex-box-r">
      <div class="login-box">
        <div class="title">
          <h2>登录</h2>
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
              <div class="code-image-box" @click="onCreateCode()">
                <verification-code ref="verification_code_ref" :contentWidth="100" :contentHeight="36" />
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div class="login-btn">
          <el-button type="primary" @click="confirmLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import verificationCode from './components/verification-code-comp';

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

      if (this.authTrueCode.toLowerCase() != value.toLowerCase()) {
        return callback(new Error('请输入正确的验证码'));
      }

      callback();
    };

    return {
      loginForm: {
        account: '',
        password: '',
        verificationCode: ''
      },
      authTrueCode: '',
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
    this.onCreateCode();
  },
  methods: {
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
    toLogin() {
      let params = {

      };

      console.log(JSON.stringify(params));
    },
  }
};
</script>

<style lang="scss" scoped>
  .login-wrap {
    overflow: hidden;
    height: 100%;
    background: #efefef;
    .logo-box {
      padding-top: 20px;
      padding-left: 20px;
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
