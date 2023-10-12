<template>
  <div class="change-pwd-dialog">
    <el-dialog
      title="修改密码"
      :visible.sync="changePwdPopStatus"
      width="380px"
      center
      append-to-body
      :show-close="showClose"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="editPwdRules"
        label-width="auto"
        label-position="right"
      >
        <div class="pop-form-item show-flex-box-r">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              ref="oldPassword"
              v-model="form.oldPassword"
              :type="oldPasswordType"
              placeholder="请输入原密码"
              name="oldPassword"
              tabindex="2"
              auto-complete="on"
            />
            <span :class="{'pwd-icon': true, 'show-pwd': !oldPasswordType}" @click="showOldPwd()"></span>
          </el-form-item>
        </div>
        <div class="pop-form-item show-flex-box-r">
          <el-form-item label="登录密码" prop="password">
            <el-input
              ref="password"
              v-model="form.password"
              :type="passwordType"
              placeholder="请输入登录密码"
              name="password"
              tabindex="2"
              auto-complete="on"
            />
            <span :class="{'pwd-icon': true, 'show-pwd': !passwordType}" @click="showPwd()"></span>
          </el-form-item>
        </div>
        <div class="pop-form-item show-flex-box-r">
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              ref="confirmPassword"
              v-model="form.confirmPassword"
              :type="confirmPasswordType"
              placeholder="请输入确认密码"
              name="confirmPassword"
              tabindex="2"
              auto-complete="on"
            />
            <span :class="{'pwd-icon': true, 'show-pwd': !confirmPasswordType}" @click="showConfirmPwd()"></span>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer">
        <el-button v-if="showClose" :loading="submitting" @click="changePwdPopStatus = false">取 消</el-button>
        <el-button type="primary" :loading="submitting" @click="confirmChangePwd('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Regex from '@/utils/regex';

import { userModifyPasswors } from '@/api/service/login';
import { locale } from 'moment';

export default {
  components: {},
  props: {
    showClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value) {
        if (Regex.isUserPassword(value)) {
          callback();
        } else {
          callback(new Error("请输入6-16位的密码"));
        }
      } else {
        callback(new Error("请输入确认密码"));
      }
    };
    const checkConfirmPwd = (rule, value, callback) => {
      if (value) {
        if (value == this.form.password) {
          callback();
        } else {
          callback(new Error("密码不一致，请检查密码"));
        }
      } else {
        callback(new Error("请输入确认密码"));
      }
    };

    return {
      changePwdPopStatus: false,
      oldPasswordType: 'password',
      passwordType: 'password',
      confirmPasswordType: 'password',
      form: {
        oldPassword: '',
        password: '',
        confirmPassword: '',
      },
      submitting: false,
      editPwdRules: {
        oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        password: [{ required: true,  validator: checkPassword, trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: checkConfirmPwd, trigger: 'blur' }],
      },
      openCallback: null,
    };
  },
  computed: {},
  watch: {

  },
  created() {},
  mounted() {
    
  },
  methods: {
    open(callback){
      this.changePopStatus(true);
      this.submitting = false;
      this.openCallback = callback;
    },
    close(){
      this.submitting = false;
      this.changePopStatus(false);
    },
    changePopStatus(status){
      this.changePwdPopStatus = status;
    },
    showOldPwd(){
      this.oldPasswordType = this.oldPasswordType == "password" ? "" : "password";

      this.$nextTick(() => {
        this.$refs.oldPassword.focus();
      });
    },
    showPwd() {
      this.passwordType = this.passwordType == "password" ? "" : "password";

      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    showConfirmPwd(){
      this.confirmPasswordType = this.confirmPasswordType == "password" ? "" : "password";

      this.$nextTick(() => {
        this.$refs.confirmPassword.focus();
      });
    },
    confirmChangePwd(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitting = true;

          let params = {
            oldPwd: this.form.oldPassword, //原密码
            newPwd: this.form.password, //登录密码
            confirmPwd: this.form.confirmPassword, 
          };

          userModifyPasswors(params)
            .then((ret)=> {
              this.openCallback && this.openCallback({type: 'success'});
            }).catch((err)=>{
              this.submitting = false;
              this.openCallback && this.openCallback({type: 'fail'});
            })
        } else {
          return false;
        }
      });
    },
    sendInfoOutside(){
      this.$emit('change-pwd');
    },


  },
}
</script>

<style lang="scss" scoped>
  .pop-form-item {
    width: 90%;
    justify-content: space-between;
    .el-form-item {
      width: 100%;
      padding-left: 20px;
    }
  }
    
  .pwd-icon {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 18px;
    background: url('~../../assets/images/login/pwd_icon.png') center center no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    user-select: none;
  }

  .show-pwd{
    width: 20px;
    height: 15px;
    background: url('~../../assets/images/login/show_pwd_icon.png') center center no-repeat;
    background-size: 100% 100%;
  }
  ::v-deep .el-dialog{
    border-radius: 20px;
  }
</style>@/api/template