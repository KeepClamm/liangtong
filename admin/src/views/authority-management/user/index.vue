<template>
  <div class="user-wrap show-flex-box-c">
    <div class="top-title-box show-flex-box-r">
      <h2>用户管理</h2>
      <el-button class="dark-blue-primary-button" size="mini" type="primary" icon="el-icon-plus" @click="onHandleTableCell('add')">添加账号</el-button>
    </div>
    <div class="table-box">
      <basic-table :propList="propConfig"
                   :table-data="userListData"
                   :showIndexColumn="true"
                   @handle-page="onHandlePage">
        <template #createdAt="{ row }">
          <span>{{ (row.createdAt / 1000) | dateformat('YYYY-MM-DD HH:ss') }}</span>
        </template>
        <template #handle="{ row }">
          <div class="table-handle-box show-flex-box-r show-flex-center">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="onHandleTableCell('delete',row)"></el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="onHandleTableCell('edit',row)"></el-button>
          </div>
        </template>
      </basic-table>
    </div>
    <add-edit-pop ref="add_edit_pop_ref"></add-edit-pop>
    <delete-confirm-pop ref="delete_confirm_pop_ref"></delete-confirm-pop>
  </div>
</template>

<script>

import { getAdminUser,deleteAdminUser } from '@/api/service/authority';

import BasicTable from '@/components/show-ui/table/basic-table';
import addEditPop from './components/add-edit-pop';
import deleteConfirmPop from './components/delete-confirm-pop';

export default {
  name: "AuthorityUser",
  components: {
    BasicTable,
    addEditPop,
    deleteConfirmPop
  },
  data() {
    return {
      propConfig: [
        { prop: 'realName', label: '姓名',  },
        { prop: 'employeeNo', label: '工号',  },
        { prop: 'departmentName', label: '部门名称',  },
        { prop: 'positionName', label: '岗位名称',  },
        { prop: 'phone', label: '手机号',  },
        { prop: 'roleName', label: '角色名称',  },
        { prop: 'createUserName', label: '创建人',  },
        { prop: 'createdAt', label: '创建时间',  slotName: 'createdAt'},
        { prop: 'handle', label: '操作',slotName: 'handle',width: 133  },
      ],
      userListData: {
        items: []
      },
      pageData: {
        page: 1,
        limit: 10,
      }
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.getUserList();
  },
  methods: {
    onHandleTableCell(type,row) {
      switch (type) {
        case 'add':
        case 'edit':
          this.$refs.add_edit_pop_ref.open((handleData)=> {
            const handleType = handleData.type;

            this.$message({
              showClose: true,
              message: row ? '编辑成功' : '添加成功',
              type: "success",
            });

            this.getUserList();
          },row || null)
        break;
        case 'delete':
          this.$refs.delete_confirm_pop_ref.open(row,({ type })=> {
            if (type == 'confirm') {
              this.deleteUserById(row.id);
            }
          })
        break;
      }
    },
    onHandlePage() {

    },
    getUserList() {
      let params = {
        page: this.pageData.page,
        limit: this.pageData.limit,
      };

      // if () {
      //   params.keywords
      // }

      getAdminUser(params)
        .then((ret)=> {
          console.log(JSON.stringify(ret));
          this.userListData.items = ret.data;
        }).catch((err)=> {
          
        })
    },
    deleteUserById(id) {
      deleteAdminUser({id: id})
        .then((ret)=> {
          this.getUserList();
          this.$message({
            showClose: true,
            message: '删除成功',
            type: "success",
          });
        }).catch((err)=> {})
    }
  }
};
</script>

<style lang="scss" scoped>
  .user-wrap {
    padding: 30px;
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

