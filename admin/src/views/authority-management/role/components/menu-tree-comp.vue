<template>
  <div class="menu-tree-wrap">
    <el-select v-model="showSelectedText" 
               placeholder="请选择"
               @focus="onChangeData">
      <el-option value="" style="height: 220px;background:#fff;">
        <div class="tree-options-box">
          <el-tree ref='menu_tree_ref'
                   :data="menuTreeList"
                   show-checkbox
                   :default-expand-all="true"
                   node-key="code"
                   :props="defaultProps"
                   :default-checked-keys="defaultSelectedList"
                   @check-change="onCheckChange()">
          </el-tree>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script>

export default {
  name: "MenuTree",
  props: {
    treeList: {
      type: Array,
      default: []
    },
    selected: {
      type: Array,
      default: [],
    }
  },
  components: {
    
  },
  data() {
    return {
      showSelectedText: '',
      menuTreeList: [],
      defaultSelectedList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

    };
  },
  computed: {

  },
  watch: {
    selected() {
      
    },
    treeList() {
      this.menuTreeList = this.treeList;
    }
  },
  mounted() {
    this.menuTreeList = this.treeList;
  },
  methods: {
    clearSelected() {
      this.$refs.menu_tree_ref.setCheckedKeys([]);
    },
    getSelectedTreeCode() {
      return this.$refs.menu_tree_ref.getCheckedKeys();
    },
    onCheckChange() {
      const selectedCodeList = this.getSelectedTreeCode();
      const listLength = selectedCodeList.length;

      this.showSelectedText = listLength > 0 ? `已授权：${listLength}` : '';
      this.sendData(selectedCodeList);
    },
    onChangeData() {
      this.$emit("update:selected", []);
    },
    sendData(list) {
      this.$emit("update:selected", list);
    },
  }
};
</script>

<style lang="scss">
  .tree-options-box {
    overflow-y: scroll;
    height: 100%;
  }
</style>
