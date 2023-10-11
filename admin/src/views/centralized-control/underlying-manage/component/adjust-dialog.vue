<template>
    <el-dialog
      class="common-dialog-box"
      title="单只标的调整"
      :visible.sync="dialogStatus"
      width="920px"
      top="0"
      show-close
      :append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
    <div class=" form-line-wrap">
        <el-form :model="adjustForm" :rules="adjustRules" >
            <el-form-item label="证券代码/名称" prop="stockCode">
                <el-input v-model="adjustForm.stockCode"></el-input>
            </el-form-item>
            <el-form-item label="设为融资标的证券" prop="financeLabel">
                <el-radio v-model="adjustForm.financeLabel" label="1">是</el-radio>
                <el-radio v-model="adjustForm.financeLabel" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="设为可冲抵保证金证券" prop="salaryLabel">
                <el-radio v-model="adjustForm.salaryLabel" label="1">是</el-radio>
                <el-radio v-model="adjustForm.salaryLabel" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="调整前集中度" prop="beforeConcentrate" disabled>
                <el-input v-model="adjustForm.beforeConcentrate"></el-input>
            </el-form-item>
            <el-form-item label="调整为（集中度）" prop="concentrateVal">
                <el-select v-model="adjustForm.concentrateVal">
                    <el-option></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="调整前保证金比例" prop="beforeMargin" disabled>
                <el-input v-model="adjustForm.beforeMargin"></el-input>
            </el-form-item>
            <el-form-item label="调整为（保证金比例）" prop="margin">
                <el-input v-model="adjustForm.margin" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="调整前折算率" prop="beforeRate">
                <el-input v-model="adjustForm.beforeRate"></el-input>
            </el-form-item>
            <el-form-item label="调整为（折算率）" prop="rate">
                <el-input v-model="adjustForm.rate" placeholder="请输入"></el-input>
            </el-form-item>
        </el-form>
        <div class="button-container">
            <div class="component-header-buttons-item ">确定</div>
            <div class="component-header-buttons-item button-color">取消</div>
        </div>
    </div>
    </el-dialog>
  </template>
    
    <script>
  export default {
    components: {},
    data() {
      return {
        dialogStatus: false,
        showInfo: null,
        adjustForm: {
            stockCode: '',
            financeLabel: '',
            salaryLabel: '',
            beforeConcentrate: '',
            concentrateVal: '',
            beforeMargin: '',
            margin: '',
            beforeRate: '',
            rate: ''
        },
        adjustRules: {
            stockCode: [
                { required: true, message: '请输入证券代码', trigger: 'blur' },
            ],
            financeLabel: [
                { required: true, message: '请选择', trigger: 'blur' },
            ],
            salaryLabel: [
                { required: true, message: '请选择', trigger: 'blur' },
            ],
            beforeConcentrate: [
                { required: true, message: '请选择', trigger: 'blur' },
            ],
            beforeMargin: [
                { required: true, message: '请选择', trigger: 'blur' },
            ],
            beforeRate: [
                { required: true, message: '请选择', trigger: 'blur' },
            ]
        }
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
    },
  };
  </script>
    
<style lang="scss" scoped src="@/styles/show-ui/common_dialog_style.scss"></style>

<style lang="scss" scoped>
  ::v-deep .el-dialog {
    height: 688px;
    margin-top: calc(50vh - 344px) !important;
  }
  ::v-deep .el-form-item {
    display: flex;
    justify-content: flex-start;
  }
  ::v-deep .el-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ::v-deep .el-form-item__label {
    width: 200px;
    text-align: left;
  }
  ::v-deep .el-form-item__content {
    flex: 1;
  }
  
  .button-container {
        width: 100%;
        display: flex;
        justify-content: center;
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
      background-color: #E5E6EB !important;
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
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .form-line-wrap {
        width: 100%;
        height: 100%;
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
  }
  </style>