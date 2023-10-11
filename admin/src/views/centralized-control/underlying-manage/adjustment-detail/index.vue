<template>
  <!-- 今日调整明细 -->
  <div class="template">
    <adjust-component :label-obj="labelObj" :column-name="columnName" />
    <div class="pagination-container">
      <pagination class="mt-24" :total="10" :current-page="1" :cur-limit="10" :showRecods="1"></pagination>
    </div>
    <div class="divide-div" />
    <adjust-component :label-obj="labelObjOther" :column-name="columnNameOther" />
    <div class="pagination-container">
      <pagination class="mt-24" :total="10" :current-page="1" :cur-limit="10" :showRecods="1"></pagination>
    </div>
  </div>
</template>

<script>
import AdjustComponent from '../component/adjust-component.vue'
import pagination from '@/components/show-ui/table/pagination-comp.vue'
export default {
  name: 'Template',
  components: {
    AdjustComponent,
    pagination

  },
  data() {
    return {
      labelObj: {
        title: '待调整清单',
        originlvLabel: '原始评级',
        newlvLabel: '当前模型评级'
      },
      labelObjOther: {
        title: '已调整明细',
        originlvLabel: '集中度变动',
        newlvLabel: '折算率变动'
      },
      columnName: {
        'zuorifanwei': true,
        'jizhongdubiandong': {
          'yuanshipingji': '原始评级',
          'dangqianmoxing': '当前模型评级',
          'biandongyuanyin': '变动原因'
        },
        'zhesuanlv': {
          'yuanshi': '原始折算率',
          'deqin': '德勤折算率',
          'yuanyin': '变动原因',
          'admin': '操作'
        }
      },
      columnNameOther: {
        'jizhongdu': {
          'tiaozhengqian': '调整前评级',
          'tiaozhenghou': '调整后评级',
          'biandong': '变动'
        },
        'zhesuan': {
          'tiaozhengqian': '调整前折算率',
          'tiaozhenghou': '调整后折算率',
          'biandong': '变动'
        },
        'reason': '调整原因（变动）',
        'date': '调整时间'
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.divide-div {
  height: 40px;
  width: 100%;
}
.pagination-container {
  width: 100%;
}
</style>

