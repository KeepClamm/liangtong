<template>
  <div class="summary-box-comp">
    <div class="section" v-for="(item, i) in summaryConf" :key="i">
      <p class="name">{{ item.name }}</p>
      <div class="show-flex-box-r">
        <span class="num">{{ item.num }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'summary-box-comp',
  data() {
    return {
      summaryConf: [
        { name: '今日新闻舆情', num: 7, status: 'rise' },
        { name: '负面新闻', num: 2, status: 'down' },
        { name: '负面公告', num: 2, status: '' },
        { name: '高度关注舆情', num: 2, status: '' },
        { name: 'SR5级个股舆情', num: 2, status: '' },
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.summary-box-comp {
  display: flex;
  flex-wrap: nowrap;
  .section {
    padding: 16px 20px;
    margin-right: 20px;
    flex-grow: 1;
    background-color: #fff;
    .name {
      margin-bottom: 46px;
    }
    .num {
      margin-right: 4px;
      color: $primaryColor;
      font-size: 50px;
      font-weight: bold;
    }
    .icon {
      width: 20px;
      height: 20px;
      img {
        width: 100%;
      }
    }
  }
}
</style>