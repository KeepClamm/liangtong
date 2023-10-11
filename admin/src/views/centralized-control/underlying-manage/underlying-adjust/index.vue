<template>
  <!-- 标的券调整 -->
  <div class="template">
    <div class="mb-40">
      <underlying-top :adjust-label="adjustLabel" :global-config="adjustmentToInitiationList"/>
    </div>
    <div class="mb-40">
      <underlying-table />
      <div class="pagination-container">
        <pagination class="mt-24" :total="10" :current-page="1" :cur-limit="10" :showRecods="1"></pagination>
      </div>
    </div>
    <div class="mb-40">
      <underlying-top :adjust-label="adjustExamLabel" :global-config="adjustmentToListPendingAudit" :pass-reject="passReject"/>
    </div>
    <div>
      <underlying-table :adjust-table="adjustExamTable" />
      <div class="pagination-container">
        <pagination class="mt-24" :total="10" :current-page="1" :cur-limit="10" :showRecods="1"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import UnderlyingTable from '../component/underlying-table.vue'
import UnderlyingTop from '../component/underlying-top.vue'
import pagination from '@/components/show-ui/table/pagination-comp.vue'
import { adjustmentToInitiationList, adjustmentToListPendingAudit } from '../adjustment-config'
export default {
  name: 'Template',
  components: {
    UnderlyingTop,
    UnderlyingTable,
    pagination
  },
  data() {
    return {
      adjustmentToInitiationList: {},
      adjustLabel: {
        title: '标的券调整发起清单',
        adjustStatus: true
      },
      adjustExamLabel: {
        title: '标的券调整待审核清单'
      },
      adjustExamTable: true,
      passReject: true
    }
  },
  computed: {

  },
  created() {
    this.adjustmentToInitiationList = adjustmentToInitiationList
    this.adjustmentToListPendingAudit = adjustmentToListPendingAudit
  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.mb-40 {
  margin-bottom: 40px;
}
.pagination-container {
  width: 100%;
}
</style>

