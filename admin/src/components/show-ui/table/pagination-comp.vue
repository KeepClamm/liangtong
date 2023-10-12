<template>
  <div class="pagination-bar-comp-box">
    <el-pagination
      :class="`flex-${classType}`"
      :background="true"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="curLimit"
      :pager-count="5"
      layout="slot, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    <!-- layout="slot, prev, pager, next, sizes, jumper" -->
      <span :class="`left-total-record-span msg-${classType}`">{{ leftMsg }}</span>
    </el-pagination>
  </div>
</template>

<script>
/**
  * 使用方法
  * 需要传入的参数
  * @param    {number}    total    总数
  * @param    {number}    curLimit    每页显示数量
  * @param    {number}    currentPage    当前所在页数
  * @param    {string}    classType    class类 center end
  *
  * 组件调用方法 (调用后需要重新调用接口刷新数据)
  * @post-cur-page
  * @returns    {number}    val    当前所在页数
  * @post-cur-limit
  * @returns    {number}    val    当前每页显示数量
  */

export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    curLimit: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    classType: {
      type: String,
       default: 'left'
    },
    showRecods: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {}
  },
  computed: {
    leftMsg(){
      const msg1 = `显示 ${this.showRecods || 0} 条数据，`;
      const msg2 = `共 ${this.total || 0} 条数据`

      let leftTitle = '';

      switch (this.classType) {
        case 'end':
          leftTitle = `${msg1}${msg2}`;
          break;
        case 'center':
        case 'white-center':
          leftTitle = msg2;
          break;
        case 'left':
          leftTitle = `共 ${ this.total || 0 } 条数据`;
          break;
      }

      return leftTitle;
    }
  },
  mounted() {
    this.configData();
  },
  methods: {
    configData(){
      let paginationDomList = document.getElementsByClassName("el-pagination__jump");

      if (paginationDomList && paginationDomList.length > 0) {
        for (let i = 0; i < paginationDomList.length; i++) {
          paginationDomList[i].childNodes[0].nodeValue = '跳至';
        }
      }
    },
    handleSizeChange(val) {
      this.$emit('post-cur-limit', val)
    },
    handleCurrentChange(val) {
      this.$emit('post-cur-page', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-bar-comp-box{
  display: flex;
  width: 100%;
}
.flex-end,
.flex-left1{
  justify-content: flex-end;
}
.flex-center,
.flex-white-center{
  justify-content: center;
}
.flex-left {
  justify-content: flex-start;
  align-items: center;
}
.left-total-record-span {
  top: 6px;
  
  // height: 28px;
  height: 16px !important;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 12px !important;
  // line-height: 28px;
  line-height: 16px !important;
  color: #A5A3A9;
}

// .msg-end,
// .msg-left{
//   // position: absolute;
//   // left: 0;
// }
.msg-center,
.msg-white-center{
  margin-top: 6px;
  padding-right: 10px;
}
::v-deep .el-pagination{
  width: 100%;
  padding: 0;
  display: flex;
  position: relative;
}

::v-deep .btn-prev,
::v-deep .btn-next,
::v-deep .el-pager > li{
  background-color: transparent !important;
  border-radius: 2px !important;
  min-width: 28px !important;
  font-size: 12px !important;
  font-weight: 500 !important
}
.flex-white-center ::v-deep .btn-prev,
.flex-white-center ::v-deep .btn-next,
.flex-white-center ::v-deep .el-pager > li{
  background-color: #FFFFFF !important;
  color: #86909C !important;
}

// .flex-center ::v-deep .el-pager > li{
//   background-color: #FFF !important;
// }

.flex-center ::v-deep .el-pager > .active,
.flex-white-center ::v-deep .el-pager > .active{
  background-color: #012169 !important;
}
::v-deep .el-pager > .active{
  background-color: #012169 !important;
}

::v-deep .el-pagination__sizes .el-input__inner{
  // background: #F7F7F7;
  background-color: transparent !important;
  color: #86909C; 
  border-radius: 8px !important;
  border: none;
}
.flex-white-center ::v-deep .el-pagination__sizes .el-input__inner{
  background: #FFFFFF;
}

::v-deep .el-pagination__jump{
  margin: 0;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: normal;
  // color: #6E7275;
  color: #86909C;
}
::v-deep .el-pagination__jump .el-input{
  border: none;
  padding: 0;
  margin: 0 10px;
}
::v-deep .el-pagination__jump .el-input__inner{
  border: none;
  padding: 0;
  margin: 0;
  // background: #F7F7F7;
  background-color: transparent;
  border-radius: 8px;
  color: #86909C;
  line-height: 28px !important;
}
.flex-white-center ::v-deep .el-pagination__jump .el-input__inner{
  background: #FFFFFF;
}
::v-deep .el-input__suffix{
  height: 28px;
}
</style>
