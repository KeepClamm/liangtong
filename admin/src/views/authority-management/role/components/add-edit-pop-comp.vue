<template>
  <div class="add-edit-pop-wrap">
    <el-dialog :title="popTitle" 
               :width="'500px'"
               :show-close="false"
               :label-position="'left'" 
               :visible.sync="addEditRolePopShowStatus"
               :before-close="onBeforeClose">
      <div class="add-edit-handle-box form-line-wrap">
        <el-form ref="add_edit_pop_form" :model="roleForm" :rules="roleRules">
          <el-form-item label="角色名称：" prop="name">
            <el-input v-model="roleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单授权：" prop="tree">
            <menu-tree :treeList="permissionTree" :selected.sync="roleForm.tree" />
          </el-form-item>
          <el-form-item class="switch-form-item" prop="export" label-width="100px;" label="数据导出权限：">
            <el-switch v-model="roleForm.export" active-color="#13ce66" inactive-color="#909399"></el-switch>
          </el-form-item>
          <el-form-item class="switch-form-item" prop="initiate" label="标的调整发起权限：">
            <el-switch v-model="roleForm.initiate" active-color="#13ce66" inactive-color="#909399"></el-switch>
          </el-form-item>
          <el-form-item class="switch-form-item" prop="approve" label="标的调整审批权限：">
            <el-switch v-model="roleForm.approve" active-color="#13ce66" inactive-color="#909399"></el-switch>
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

import { getAuthTree,addRole,editRole } from '@/api/service/authority';

import menuTree from './menu-tree-comp';

export default {
  name: "AddEditPop",
  components: {
    menuTree
  },
  data() {
    return {
      popTitle: '添加',
      addEditRolePopShowStatus: false,
      roleRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        tree: [
          { required: true, message: '请选择授权菜单', trigger: 'change' },
        ],
        export: [
          { required: true, message: '请选择授权菜单', trigger: 'blur' },
        ],
        initiate: [
          { required: true, message: '请选择授权菜单', trigger: 'blur' },
        ],
        approve: [
          { required: true, message: '请选择授权菜单', trigger: 'blur' },
        ],
      },
      roleForm: {
        name: '',
        tree: [],
        export: false,
        initiate: false,
        approve: false,
      },
      permissionTree: [],
      submitLoading: false,
      openCallback: null,
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.getServiceAuthTree();
  },
  methods: {
    open(callback) {
      this.addEditRolePopShowStatus = true;
      this.openCallback = callback;
    },
    close() {
      this.$refs['add_edit_pop_form'].resetFields();
      
      this.addEditRolePopShowStatus = false;
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
    getServiceAuthTree() {
      getAuthTree()
        .then((ret)=> {
          this.permissionTree = ret.data;
        }).catch((err)=> {})
    },
    addEdit() {
      this.submitLoading = true;

      let params = {
        name: this.roleForm.name,
        permission: this.roleForm.tree,
      };
      
      addRole(params)
        .then((ret)=> {
          this.openCallback && this.openCallback({
            type: 'success',
            data: params
          })

          this.submitLoading = false;
          this.close();
        }).catch((err)=> {
          this.submitLoading = false;
        })
    },
  }
};
</script>

<style lang="scss" scoped>
  .add-edit-pop-wrap {
    .confirm-btn {
      margin-top: 10px;
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
      &.switch-form-item {
        margin-bottom: 0;
        .el-form-item__label {
          width: 150px;
          text-align: left;
        }
      }
    }
  }
</style>
