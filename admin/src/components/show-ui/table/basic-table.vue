<template>
  <div :class="`w100 h100 show-flex-box-c border-box table-${showType}`">
    <div class="table-box w100" :class="{'show-flex-grow-table': needScroll}">
      <el-table
        v-if="needScroll"
        ref="dataTable"
        class="w100 table-line"
        height="100%"
        v-loading="loading"
        header-row-class-name="custom-header-row"
        header-cell-class-name="custom-header-cell"
        :header-cell-style="{
          backgroundColor: '#F8F9FB',
          padding:'0px',
          'line-height':'130%',
          'font-size':'12px'
        }"
        :data="tableData.items"
        :span-method="spanMethod"
        tooltip-effect="dark"
        empty-text="暂无数据"
        :stripe="stripe"
        :border="border"
        @row-click="rowClick"
        @select="select"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column
          v-if="showSelectionColumn"
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="70"
        />
        <template v-for="(item, index) in propList">
          <el-table-column
            :key="index"
            :align="item.align || 'center'"
            :show-overflow-tooltip="!item.notOverflow"
            v-bind="item"
            :prop="item.prop || ''"
            :label="item.label"
          >
            <template slot="header" v-if="item.hasFilter">
              <slot :name="item.filterField"></slot>
            </template>
            <template slot="header" v-if="item.hasSort">
              <slot :name="item.sortField"></slot>
            </template>
            <template slot="header" v-if="item.hasLabel">
              <slot :name="item.labelField"></slot>
            </template>

            <template slot-scope="{ row }">
              <!-- #default="{ row }" -->
              <slot :name="item.slotName" :row="row">
                <span>{{ typeof row[item.prop] === 'number'
                  ? row[item.prop] || item.emptyInfo || 0
                  : row[item.prop] || item.emptyInfo || '--' }}</span>
              </slot>
            </template>
            
          </el-table-column>
        </template>

      </el-table>
      <el-table
        v-else-if="hasMaxHeight"
        ref="dataTable"
        class="w100 table-line"
        :max-height="maxHeightValue"
        header-row-class-name="custom-header-row"
        header-cell-class-name="custom-header-cell"
        :header-cell-style="{
          backgroundColor: '#F8F9FB',
          padding:'0px',
          'line-height':'130%',
          'font-size':'12px'
        }"
        :data="tableData.items"
        :span-method="spanMethod"
        tooltip-effect="dark"
        empty-text="暂无数据"
        :stripe="stripe"
        :border="border"
        @row-click="rowClick"
        @select="select"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column
          v-if="showSelectionColumn"
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="48"
        />
        <template v-for="(item, index) in propList">
          <el-table-column
            :key="index"
            :align="item.align || 'center'"
            :show-overflow-tooltip="!item.notOverflow"
            v-bind="item"
            :prop="item.prop || ''"
            :label="item.label"
          >
            <template slot="header" v-if="item.hasFilter">
              <slot :name="item.filterField"></slot>
            </template>
            <template slot="header" v-if="item.hasSort">
              <slot :name="item.sortField"></slot>
            </template>
            <template slot="header" v-if="item.hasLabel">
              <slot :name="item.labelField"></slot>
            </template>

            <template slot-scope="{ row }">
              <!-- #default="{ row }" -->
              <slot :name="item.slotName" :row="row">
                <span>{{ typeof row[item.prop] === 'number'
                  ? row[item.prop] || item.emptyInfo || 0
                  : row[item.prop] || item.emptyInfo || '--' }}</span>
              </slot>
            </template>
            
          </el-table-column>
        </template>

      </el-table>
      <el-table
        v-else
        ref="dataTable"
        class="w100 table-line"
        header-row-class-name="custom-header-row"
        header-cell-class-name="custom-header-cell"
        :header-cell-style="{
          backgroundColor: '#F8F9FB',
          padding:'0px',
          'line-height':'130%',
          'font-size':'12px'
        }"
        :data="tableData.items"
        :span-method="spanMethod"
        tooltip-effect="dark"
        empty-text="暂无数据"
        :stripe="stripe"
        :border="border"
        @row-click="rowClick"
        @select="select"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column
          v-if="showSelectionColumn"
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="70"
        />
        <template v-for="(item, index) in propList">
          <el-table-column
            :key="index"
            :align="item.align || 'center'"
            :show-overflow-tooltip="!item.notOverflow"
            v-bind="item"
            :prop="item.prop || ''"
            :label="item.label"
          >
            <template slot="header" v-if="item.hasFilter">
              <slot :name="item.filterField"></slot>
            </template>
            <template slot="header" v-if="item.hasSort">
              <slot :name="item.sortField"></slot>
            </template>
            <template slot="header" v-if="item.hasLabel">
              <slot :name="item.labelField"></slot>
            </template>

            <template slot-scope="{ row }">
              <!-- #default="{ row }" -->
              <slot :name="item.slotName" :row="row">
                <span>{{ typeof row[item.prop] === 'number'
                  ? row[item.prop] || item.emptyInfo || 0
                  : row[item.prop] || item.emptyInfo || '--' }}</span>
              </slot>
            </template>
            
          </el-table-column>
        </template>

      </el-table>
    </div>

    <div v-if="showPagination">
      <pagination
        class="mt-24"
        :class-type="classType"
        :total="tableData && tableData.total"
        :showRecods="tableData && tableData.items && tableData.items.length"
        :current-page="page"
        :cur-limit="limit"
        @post-cur-page="recieveCurNOP"
        @post-cur-limit="recieveCurLimit"
      />
    </div>
  </div>
</template>

<script>
import pagination from './pagination-comp';

export default {
  components: {
    pagination,
  },
  props: {
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    stripe: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectionColumn: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Object,
      default: () => {
        return {
          total: 0,
          items: [],
        }
      }
    },
    propList: Array,
    showPagination: {
      type: Boolean,
      default: true
    },
    needScroll: {
      type: Boolean,
      default: true
    },
    showType: {
      type: String,
      default: 'normal'
    },
    classType: String,
    chooseType: {
      type: String,
      default: 'single'
    }, // 多选框选择类型  single / multiple
    tableKey: {
      type: String,
      default: 'table'
    },
    spanMethod: {
      type: Function
    },
    hasMaxHeight: {
      type: Boolean,
      default: false
    },
    maxHeightValue: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {

    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    rowClick(row){
      const info = {
        type: 'row-click',
        data: {...row}
      };

      this.sendInfo(info, 'handle-table');
    },
    // 分页
    recieveCurNOP(curNOP){
      const info = {
        type: 'pagination',
        page: curNOP,
        limit: this.limit,
      };

      this.sendInfo(info, 'handle-page');
    },
    // 分页
    recieveCurLimit(curLimit){
      const info = {
        type: 'pagination',
        page: this.page,
        limit: curLimit,
      };

      this.sendInfo(info, 'handle-page');
    },
    sendInfo(info, func = 'clickInfo'){
      this.$emit(func, info);
    },
    select(selection, row) {
      if(this.chooseType === 'single') {
        // 取消所有勾选
        this.$refs.dataTable.clearSelection();
        // 都没被勾选返回
        if(selection.length == 0) return;
        this.$refs.dataTable.toggleRowSelection(row, true);
        this.$emit('handle-selection', row);
      }else {
        // 多选, row数组
        this.$emit('handle-selection', selection);
        return;
      }
    },
    clearTableSelection() {
      this.$refs.dataTable.clearSelection();
    },
    handleSelectionChange(val) {
      this.$emit('get-select-data', val);
    },
    sortChange(val){
      this.$emit('get-sort-data', val);
    }
  },
}
</script>

<style lang='scss' scoped>
  // .table-box {
  //   height: 0;
  // }
  .show-flex-grow-table {
    height: 0;
    flex-grow: 1;
  }
  ::v-deep tbody .el-tooltip > span{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 20px;
  }

  ::v-deep tbody .cell > div,
  ::v-deep tbody .cell > span,
  ::v-deep tbody .cell .table-span{
    // display: block;

    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #4A4F53;
  }

  ::v-deep .el-table .cell{
    line-height: 20px;
  }
  ::v-deep .el-table th.is-leaf,
  ::v-deep .el-table td{
    border-bottom: none;
    box-shadow: inset 0px -1px 0px #F1F1F1;
  }

  ::v-deep .el-table::before{
    background-color: transparent;
  }

  ::v-deep tbody .cell > .custom-item{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ::v-deep .custom-header-row{
    background-color: #F8F9FB;
    height: 48px;
  }
  ::v-deep .custom-header-cell:first-child{
    border-radius: 4px 0px 0px 0px;
  }
  ::v-deep .custom-header-cell:nth-last-child(2){
    border-radius: 0px 4px 0px 0px;
  }
  ::v-deep .custom-header-cell{
    font-family: 'PingFang SC';
    font-style: normal;
    background: transparent;
    font-weight: 400;
    font-size: 14px;
    line-height: 48px;
    font-size: 12px;
    color: #86909C;
    div {
      white-space: nowrap;
    }
  }
  .table-row-can-click ::v-deep tbody > tr{
    cursor: pointer;
  }
  ::v-deep .el-table__row {
    height: 60px;
  }
  .table-line {
    border: 1px solid #F2F3F5;
  }

  .table-no-hover ::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{
    background: transparent;
  }

  .table-height48 ::v-deep .el-table__row {
    height: 48px;
  }

  ::v-deep .el-table__header,
  ::v-deep .el-table__body{
    transition: width ease-in-out 0.5s;
  }


  ::v-deep .table-label{
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;
    text-align: center;
    color: #86909C;
  }
  ::v-deep .height48{
    height: 48px;
  }
  // 兼容safari列头与td对不齐问题
  ::v-deep .el-table__header, .el-table__body, .el-table__footer{
  width:100% !important;
  table-layout: fixed !important;
}

</style>