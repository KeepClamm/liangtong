<template>
  <div class="role-wrap show-flex-box-c">
    <div class="top-title-box show-flex-box-r">
      <h2>账号管理</h2>
      <el-button type="primary" icon="el-icon-plus">添加角色</el-button>
    </div>
    <div class="table-box">
      <basic-table :propList="propConfig"
                   :table-data="roleListData"
                   :showIndexColumn="true"
                   @handle-page="onHandlePage">
        <template #handle="{ row }">
          <div class="table-handle-box show-flex-box-r show-flex-center">
            <span class="el-icon-delete handle-delete" @click="onHandleTableCell('delete',row)"></span>
            <span class="el-icon-edit-outline handle-edit" @click="onHandleTableCell('edit',row)"></span>
          </div>
        </template>
      </basic-table>
    </div>
  </div>
</template>

<script>

import BasicTable from '@/components/show-ui/table-comp';

export default {
  name: "AuthorityRole",
  components: {
    BasicTable
  },
  data() {
    return {
      propConfig: [
        { prop: 'roleName', label: '角色名称',  },
        { prop: 'createTime', label: '创建时间',  },
        { prop: 'handle', label: '操作',slotName: 'handle',width: 133  },
      ],
      roleListData: {
        items: [
          {roleName: 'aaa'}
        ]
      }
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    onHandleTableCell(type,row) {
      switch (type) {
        case 'delete':
          
        break;
        case 'edit':
          
        break;
      }
    },
    onHandlePage() {

    },
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
