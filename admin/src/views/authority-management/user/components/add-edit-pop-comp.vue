<template>
  <div class="add-edit-pop-wrap">
    <el-dialog :title="popTitle" 
               :width="'380px'"
               :show-close="false"
               :label-position="'left'" 
               :visible.sync="addEditRoleUserPopShowStatus"
               :before-close="onBeforeClose">
      <div class="add-edit-handle-box form-line-wrap">
        <el-form ref="add_edit_pop_form" :model="roleUserForm" :rules="roleUserRules">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="roleUserForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工号：" prop="jobNumber">
            <el-input v-model="roleUserForm.jobNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门名称：" prop="departmentName">
            <el-input v-model="roleUserForm.departmentName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="岗位名称：" prop="postName">
            <el-input v-model="roleUserForm.postName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="roleUserForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色名称：" prop="role">
            <!-- multiple -->
            <el-select v-model="roleUserForm.role" placeholder="请选择">
              <el-option v-for="item in roleList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="confirm-btn show-flex-box-r">
          <el-button :loading="submitLoading" @click="close()">取 消</el-button>
          <el-button :loading="submitLoading" type="primary" @click="onConfirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { getRoleList } from '@/api/service/authority';

export default {
  name: "AddEditUserPop",
  components: {

  },
  data() {
    return {
      popTitle: '添加',
      addEditRoleUserPopShowStatus: false,
      roleList: [],
      roleUserRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        jobNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' },
        ],
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
        ],
        postName: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请选择角色名称', trigger: 'blur' },
        ],
      },
      roleUserForm: {
        name: '',
        jobNumber: '',
        departmentName: '',
        postName: '',
        phone: '',
        role: [],
      },
      submitLoading: false,
      openCallback: null,
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.getServiceRoleList();
  },
  methods: {
    open(callback) {
      this.addEditRoleUserPopShowStatus = true;
      this.openCallback = callback;
    },
    close() {
      this.$refs['add_edit_pop_form'].resetFields();
      
      this.addEditRoleUserPopShowStatus = false;
      this.submitLoading = false;
    },
    onBeforeClose() {

    },
    onConfirm() {
      this.$refs['add_edit_pop_form'].validate((valid) => {
        if (valid) {
          this.addEdit();
        } else {
          return false;
        }
      });
    },
    getServiceRoleList() {
      getRoleList().then((ret)=> {
        this.roleList = ret.data;
      }).catch((err)=> {
       
      })
    },
    addEdit() {
      this.submitLoading = true;

      let params = {
        name: this.roleUserForm.name,

      };
    },
  }
};
</script>

<style lang="scss" scoped>
  .add-edit-pop-wrap {
    .confirm-btn {
      margin-top: 20px;
      justify-content: flex-end;
    }
  }
</style>

<style lang="scss">
  .form-line-wrap {
    .el-form-item {
      display: flex;
      .el-form-item__content {
        flex-grow: 1;
        .el-select {
          width: 100%;
        }
      }
      .el-form-item__label {
        width: 95px;
        text-align: left;
      }
    }
  }
</style>
