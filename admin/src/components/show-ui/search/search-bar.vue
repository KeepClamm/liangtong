<template>
  <div class="search-form-comp-box">
    <div class="search-section">
      <div class="show-flex-box-r">
        <div class="search-form">
          <slot></slot>
        </div>
        <div v-show="!isExpand || !showExpandIcon" class="search-btn-bar mt-6">
          <div class="reset" @click="resetForm()">重置</div>
          <div class="search" @click="onSearch()">查询</div>
        </div>
      </div>
      <div v-show="showExpandIcon" class="search-btn-bar mt-4">
        <div class="reset" @click="resetForm()">重置</div>
        <div class="search" @click="onSearch()">查询</div>
      </div>
    </div>
    <div class="expand-btn" v-show="showExpandIcon" :class="{ 'is-expand': isExpand }" @click="changeExpandStatus()">
      <img :src="expandIconUrl" >
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "@/../static/js/jquery.actual.js";
const expandIconUrl = require('@/assets/images/cockpit-risk/expand-icon.png');
export default {
  name: "search-bar-comp",
  data() {
    return {
      expandIconUrl,
      isExpand: true,
      showExpandIcon: false,
      searchCompHeight: 0
    }
  },
  mounted() {
    window.onresize = () => {
      this.listenWindowResize();
    };
    this.getSearchSectionHeight();
  },
  methods: {
    listenWindowResize() {
      this.getSearchSectionHeight();
    },
    getSearchSectionHeight() {
      const searchFormHeight = $('.search-form').actual("height");
      this.searchCompHeight = $('.search-form-comp-box').actual("height") + 40;
      this.showExpandIcon = searchFormHeight > 50;
      this.setExpandMaxHeight();
    },
    // 展开和收起所有筛选栏
    changeExpandStatus(){
      this.isExpand = !this.isExpand;
      if (this.isExpand) {
        this.setExpandMaxHeight();
      } else {
        $('.search-section').css('max-height', '40px');
      }
    },
    setExpandMaxHeight() {
      $('.search-section').css('max-height', `${ this.searchCompHeight }px`);
    },
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
  position: relative;
  padding: 10px 15px;
  box-sizing: border-box;
  flex-shrink: 0;
  // background-color: #fafafa;
  .search-section {
    overflow: hidden;
    transition: all 0.3s linear;
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
    font-size: 12px;
    line-height: 20px;
  }
  > .search {
    background: #012169;
    color: #ffffff;
  }
  > .reset {
    margin-right: 12px;
    background: #e5e6eb;
    color: #012169;
  }
}

.expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  position: absolute;
  bottom: -18px;
  left: 50%;
  width: 100px;
  height: 18px;
  background: url("../../../assets/images/cockpit-risk/expand-bg-icon.png")
    center center no-repeat;
  background-size: 100% 100%;
  > img {
    width: 10px;
    height: 12px;
    transition: all ease-in-out 0.3s;
    transform: rotate(0deg);
    user-select: none;
  }
  &.is-expand {
    img {
      transform: rotate(180deg);
    }
  }
}
::v-deep .el-form {
  .el-form-item {
    margin: 0 30px 10px 0;
    .el-form-item__label {
      font-size: 12px;
    }
    .el-input--mini {
      .el-input__inner {
        font-size: 12px !important;
        border: 1px solid #cadeed;
        &::placeholder {
          font-size: 12px !important;
        }
      }
    }
    .el-date-editor {
      width: 250px;
      .el-range-input {
        font-size: 12px;
        &::placeholder {
          font-size: 12px !important;
        }
      }
    }
  }
}
</style>