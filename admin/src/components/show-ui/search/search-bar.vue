<template>
  <div class="search-form-comp-box show-flex-box-r">
    <div class="show-flex-box-r slot-bar">
      <slot></slot>
      <div class="search-btn-bar">
        <div class="search" @click="onSearch()">查询</div>
        <div class="reset" @click="resetForm()">重置</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-bar-comp",
  methods: {
    onSearch() {
      this.sendInfoOutside("search");
    },
    resetForm() {
      this.sendInfoOutside("reset");
    },
    sendInfoOutside(type) {
      this.$emit("searchInfo", { type });
    }
  }
};
</script>
<style lang='scss' scoped>
.search-form-comp-box {
  padding: 10px 15px;
  box-sizing: border-box;
  margin-bottom: 20px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: #fafafa;
  > .slot-bar {
    margin-right: -20px;
    align-items: center;
    flex-wrap: wrap;
    > .search-item {
      display: flex;
      align-items: center;
      // margin-right: 26px;
      margin-right: 27px;
      margin-bottom: 20px;
      > span {
        white-space: nowrap;
        padding-right: 16px;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #003773;
      }
    }
  }
}

.search-btn-bar {
  display: flex;
  > div {
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 78px;
    height: 24px;
    border-radius: 2px;

    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
  > .search {
    margin-right: 12px;
    background: #012169;
    color: #ffffff;
  }
  > .reset {
    background: #e5e6eb;
    color: #012169;
  }
}

::v-deep .el-form-item {
  margin-bottom: 0;
  height: 50px;
}

::v-deep .el-input {
  width: 180px;
}

::v-deep .el-input__inner {
  padding: 0 10px;
  border: 1px solid #cadeed;
}
</style>