<template>
  <div class="stock-list-item-comp">
    <template v-if="data.length">
      <div v-for="item in data" :key="item.id" class="list-item">
        <div>
          <p class="hide-line1">{{ item.stockName }}</p>
          <p class="f-12 gray-sed-text mt-10">{{ item.stockCode }}</p>
        </div>
        <span class="tag yellow ml-20 mr-20">SR4</span>
        <div class="f-12 show-flex-box-r">
          <span class="mr-4">{{ item.rate || 0 }}%</span>
          <div v-if="item.showIcon">
            <img class="icon" :src="item.rise ? iconList[0] : iconList[1]" />
          </div>
        </div>
      </div>
    </template>
    <no-data v-else></no-data>
  </div>
</template>

<script>
import NoData from "@/components/show-ui/no-data";
export default {
  name: 'stock-list-item-comp',
  components: {
    NoData,
  },
  props: {
    data: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      iconList: [
        require("@/assets/images/cockpit-risk/arrow-up.png"),
        require("@/assets/images/cockpit-risk/arrow-down.png")
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.stock-list-item-comp {
  .list-item {
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    border-bottom: 1px solid $grayBg;
  }
  .icon {
    width: 15px;
  }
}
</style>