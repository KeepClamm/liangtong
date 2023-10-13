<template>
  <div class="selected-tags-comp">
    <dd
      v-if="selectedList.length > 0"
      class="selected-item-list show-flex-box-r br-2 normal-bg"
    >
      <strong class="fs-0 white-space">已选择项</strong>
      <ul class="show-flex-box-r">
        <li class="tag" v-for="(item, index) in selectedList" :key="index">
          <strong class="mr-6 white-space">{{item.name}}</strong>
          <em class="fs-0 cursor-pointer" @click="handleRemove(item, index)"></em>
        </li>
      </ul>
    </dd>
  </div>
</template>

<script>
export default {
  name: "selected-tags-comp",
  props: {
    selectedList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleRemove(tag, index) {
      this.$emit("remove", tag, index);
    }
  }
};
</script>

<style lang="scss" scoped>
.selected-tags-comp {
  .selected-item-list {
    padding: 20px 20px 10px 20px;
    overflow: hidden;
    > strong {
      width: 76px;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #3e3e3e;
    }
    > ul {
      flex-wrap: wrap;
      margin-right: -20px;
      > .tag {
        display: flex;
        padding: 0 8px;
        height: 25px;
        margin: 0 20px 10px 0;
        align-items: center;
        background: rgba(0, 163, 224, 0.08);
        border-radius: 2px;
        > strong {
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          color: #00a3e0;
        }
        > em {
          width: 12px;
          height: 12px;
          background: url("../../../assets/images/cockpit-risk/close-icon.png")
            center center no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>