<template>
  <div class='check-tab-bar-comp'>
    <ul class="show-flex-box-r">
      <li
        :class="{'cursor-pointer': true, 'is-select': item.type == curTab}"
        v-for="(item, index) in tabList"
        :key="index"
        @click="chooseThisType(item, index)"
      >
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    tabList: {
      type: Array,
      default: () => [
        { type: 'short', title: '短期', val: 1 }
      ]
    },
    defaultTab: {
      type: String,
      default: 'short'
    }
  },
  data() {
    return {
      curTab: this.defaultTab
    };
  },
  methods: {
    chooseThisType(item, index){
      if (this.curTab == item.type) {
        return ;
      }

      this.curTab = item.type;
      this.$emit('switchTab', {
        type: item.val
      });
    },

  },
}
</script>
<style lang='scss' scoped>
  .check-tab-bar-comp{
    > ul{
      overflow: hidden;
      transform: translateX(-14px);
      user-select: none;
      > li{
        position: relative;
        width: 122px;
        height: 48px;
        flex-shrink: 0;
        background: #F2F3F5;
        transform: skewX(30deg);
        > span{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) skewX(-30deg);
          white-space: nowrap;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 28px;
          color: #4E5969;
        }
      }
      > li:first-child{
        width: 134px;
      }
      > .is-select{
        background: #FFF;
        > span{
          font-weight: 500;
          color: #00A3E0;
        }
      }
    }
  }
</style>