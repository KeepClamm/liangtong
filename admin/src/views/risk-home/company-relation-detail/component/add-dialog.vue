<template>
  <el-dialog
    class="common-dialog-box"
    title="新增关联关系"
    :visible.sync="dialogStatus"
    width="600px"
    top="0"
    show-close
    :append-to-body="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="form-container">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="主体一：">
          <el-input placeholder="请输入主体名称" v-model="mainComName" size="mini" disabled></el-input >
        </el-form-item>
        <el-form-item label="主体二：">
          <el-input placeholder="请输入主体名称" v-model="searchName" size="mini" disabled></el-input>
        </el-form-item>
        <el-form-item label="关系类型：">
          <el-select v-model="formData.relationTypeVal" size="mini">
            <el-option v-for="item in relationTypeOpt" :label="item.label" :value="item.value" :key="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比例金额：">
          <el-input placeholder="请输入比例金额" v-model="formData.rate" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="原因：">
          <el-input placeholder="请输入原因" v-model="formData.reason" size="mini" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="申请人：">
          <el-input placeholder="请输入申请人" v-model="formData.people" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="附件上传：">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <div class="component-header-buttons-item-upload">点击上传</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="button-container">
        <div class="component-header-buttons-item" @click="submitForm">确认</div>
        <div class="button-color component-header-buttons-item" @click="close">取消</div>
      </div>
    </div>
  </el-dialog>
</template>
    
<script>
export default {
  components: {},
  props: ['searchName', 'mainComName'],
  data() {
    return {
      formData: {
        relationTypeVal: null,
        rate: '',
        reason: '',
        people: ''
      },
      relationTypeOpt: [
        {
          label: '股东关系',
          value: 1
        },
        {
          label: '投资关系',
          value: 2
        }
      ],
      dialogStatus: false,
      fileList: [],
      dialogConfig: [
        {label: '主体1', desc: '债券投资'},
        {label: '主体2', desc: '企业债'},
        {label: '比例', desc: '18山'},
        {label: '关系类型', desc: '200'},
        {label: '原因', desc: '500'},
      ]
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    open() {
      this.setShowPopStatus(true);
    },
    close() {
      this.setShowPopStatus(false);
    },
    setShowPopStatus(status) {
      this.dialogStatus = status;
    },
    submitForm() {
      let nodeObj = {
        id: 'a' + Math.floor(10000 + Math.random() * 90000),
        text: this.searchName,
        width: 140,
        height: 140
      }
      let lineObj = {
        from: nodeObj.id,
        to: 'a',
        text: '股东',
        color: "#43a2f1"
      } 
      const typeVal = this.relationTypeOpt.find(item => item.value == this.formData.relationTypeVal) || {}
      console.log('typeVal', typeVal)
      let dataObj = {
        mainComName: this.mainComName,
        searchName: this.searchName,
        relaType: typeVal.label || '',
        status: 0,
        rate: this.formData.rate,
        relaClient: this.searchName,
      }
      this.$emit('addRelation', [nodeObj, lineObj, dataObj])
      this.setShowPopStatus(false);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
  },
};
</script>
    
<style lang="scss" scoped src="@/styles/show-ui/common_dialog_style.scss"></style>

<style lang="scss" scoped>
.common-dialog-box::v-deep .el-dialog {
  min-height: 700px;
  margin-top: calc(50vh - 344px) !important;
}
.component-header-buttons-item-upload {
    padding: 0px 10px;
    font-size: 12px;
    background-color: #012169;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 16px;
  }
.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  .component-header-buttons-item {
    padding: 6px 20px;
    font-size: 14px;
    background-color: #012169;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 16px;
  }
}
.button-color {
  background-color: #e5e6eb !important;
  color: #012169 !important;
}
.common-dialog-box ::v-deep .el-dialog__body {
  padding: 20px;
}
.color-blue {
  color: #00a3e0 !important;
}
.form-container {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between  ;
  .row-item {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
    .item-label {
      font-weight: 700;
      font-size: 16px;
      color: #606266;
      margin-right: 8px;
      white-space: nowrap;
    }
    .item-content {
      font-weight: 400;
      font-size: 16px;
    }
  }
}
</style>