<template>
  <div class="opinion-list-comp">
    <div v-if="data.items && data.items.length" class="font-weight-bold show-flex-box-c h100">
      <div class="flex-1 show-flex-box-c">
        <div v-for="item in data.items" :key="item.id" class="list-item">
          <div>
            <span class="tag mr-20">已读</span>
            <span class="hide-line1">{{ item.title }}</span>
          </div>
          <p class="gray-sed-text f-12 hide-line1 mt-8 mb-8">{{ item.desc }}</p>
          <div class="show-flex-box-r">
            <div class="stock-wrap color-sed f-12">
              <span class="point mr-5"></span>
              <span>{{ item.stockName }}</span>
              <span v-if="item.stockCode">（{{ item.stockCode }}）</span>
            </div>
            <span class="tag ml-4 yellow">SR4</span>
          </div>
        </div>
      </div>
      <pagination
        class="mt-24"
        :total="data.total"
        :showRecods="data.items.length"
        :current-page="page"
        :cur-limit="limit"
        @post-cur-page="changeCurPage"
        @post-cur-limit="changeLimit"
      />
    </div>
    <no-data v-else></no-data>
  </div>
</template>

<script>
import NoData from "@/components/show-ui/no-data";
import Pagination from "@/components/show-ui/table/pagination-comp";
export default {
  name: "opinion-list-comp",
  components: {
    NoData,
    Pagination
  },
  props: {
    data: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      page: 1,
      limit: 10
    };
  },
  methods: {
    changeCurPage(v) {
      this.page = v;
    },
    changeLimit(v) {
      this.limit = v;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.opinion-list-comp {
  height: 100%;
  .list-item {
    padding: 15px 20px;
    border-bottom: 1px solid $grayBg;
  }
  .stock-wrap {
    display: flex;
    align-items: center;
    font-weight: bold;
  }
}
</style>