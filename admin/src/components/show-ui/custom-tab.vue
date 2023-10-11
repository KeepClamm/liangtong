<template>
  <div class="show-flex-box-r custom-container">
    <div class="custom-tab w100 show-flex-box-r show-flex-sb">
      <div
        @click="changeTab(item)"
        class="tab-title cursor-pointer" 
        v-for="item in showList" :key="item.id"
        :class="{'is-active': item.id == acitveId }">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showList: Array,
      replacement: Boolean
    },
    data() {
      return {
        acitveId: ''
      }
    },
    watch: {
      replacement(){
        this.configData();
      }
    },
    mounted() {
      this.configData();
    },
    methods: {
      configData(){
        this.acitveId = this.showList[0].id;
      },
      sendInfo(info, func) {
        this.$emit(func, info);
      },
      changeTab(val) {
        this.acitveId = val.id;
        this.sendInfo(val, 'handle-tab');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .custom-container {
    padding: 4px;
    background: #F2F3F5;
    border-radius: 3px;
    flex-shrink: 0;
    .custom-tab {
      .tab-title {
        padding: 4px 24px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #4E5969;
      }
      .tab-title:first-child {
        margin-right: 4px;
      }
      .is-active {
        background-color: #ffffff;
        color: #00A3E0;
      }
    }
  }
</style>