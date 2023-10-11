<template>
  <div class="role-wrap show-flex-box-c">
    <div class="top-title-box show-flex-box-r">
      <h2>账号管理</h2>
      <el-button type="primary" icon="el-icon-plus" @click="onHandleTableCell('add')">添加角色</el-button>
    </div>
    <div class="table-box">
      <basic-table :propList="propConfig"
                   :table-data="roleListData"
                   :showIndexColumn="true"
                   @handle-page="onHandlePage">
        <template #createdAt="{ row }">
          <span>{{ row.createdAt }}</span>
        </template>
        <template #handle="{ row }">
          <div class="table-handle-box show-flex-box-r show-flex-center">
            <span class="el-icon-delete handle-delete" @click="onHandleTableCell('delete',row)"></span>
            <span class="el-icon-edit-outline handle-edit" @click="onHandleTableCell('edit',row)"></span>
          </div>
        </template>
      </basic-table>
    </div>
    <add-edit-pop ref="add_edit_pop_ref" />
  </div>
</template>

<script>

import { getRoleList,deleteRole } from '@/api/service/authority';

import BasicTable from '@/components/show-ui/table/basic-table';
import addEditPop from './components/add-edit-pop-comp';
import { Loading } from 'element-ui';

export default {
  name: "AuthorityRole",
  components: {
    BasicTable,
    addEditPop,
  },
  data() {
    return {
      pageData: {
        page: 1,
        limit: 10,
      },
      propConfig: [
        { prop: 'name', label: '角色名称',  },
        { prop: 'createdAt', label: '创建时间', slotName: 'createdAt'},
        { prop: 'handle', label: '操作',slotName: 'handle',width: 133  },
      ],
      roleListData: {
        items: []
      },
      handleLoading: false,
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
    onHandleTableCell(type,row) {
      switch (type) {
        case 'add':
        case 'edit':
          this.$refs.add_edit_pop_ref.open((handleData)=> {
            const handleType = handleData.type;
            const msg = row ? '编辑成功' : '添加成功';

            this.$message({
              showClose: true,
              message: msg,
              type: "success",
            });
            // switch (handleType) {
            //   case :
                
            //   break;
            // }

            this.getServiceRoleList();
          },row ? {id: row.id} : null);
        break;
        case 'delete':
          this.$confirm(`确认删除角色「${row.name}」吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRoleById(row.id);
          }).catch(() => {});
        break;
      }
    },
    onHandlePage() {

    },
    getServiceRoleList() {
      let loadingInstance = Loading.service({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      getRoleList({
        page: this.pageData.page,
        limit: this.pageData.limit
      }).then((ret)=> {
        this.$set(this.roleListData,'items',ret.data);

        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      }).catch((err)=> {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      })
    },
    deleteRoleById(id) {
      this.handleLoading = true;

      let loadingInstance = Loading.service({
        lock: true,
        text: '删除中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      deleteRole({id:id})
        .then((ret)=> {
          this.handleLoading = false;

          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });

          this.$message({
            showClose: true,
            message: '删除成功',
            type: "success",
          });

          this.getServiceRoleList();
        }).catch((err)=> {
          this.handleLoading = false;
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
        })
    }
  }
};
</script>

<style lang="scss" scoped>
  .role-wrap {
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    .top-title-box,
    .table-box {
      padding: 15px 20px;
      box-sizing: border-box;
    }
    .top-title-box {
      flex-shrink: 0;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      &>h2 {
        font-size: 20px;
        font-weight: normal;
      }
    }
    .table-box {
      flex-grow: 1;
      margin-top: 20px;
      background: #fff;
      .table-handle-box {
        &>span {
          font-size: 20px;
          cursor: pointer;
          &.handle-delete {
            margin-right: 20px;
            color: #F56C6C;
          }
          &.handle-edit {
            color: #E6A23C;
          }
        }
      }
    }
  }



</style>
