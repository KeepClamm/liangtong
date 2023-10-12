<template>
  <!-- 标的券调整 -->
  <div class="template">
    <div class="mb-40">
      <underlying-top :adjust-label="adjustLabel" :global-config="adjustmentToInitiationList"/>
      <underlying-table />
    </div>
    <div class="mb-40">
      <underlying-top :adjust-label="adjustExamLabel" :global-config="adjustmentToListPendingAudit" :pass-reject="passReject"/>
      <underlying-table :adjust-table="adjustExamTable" />
    </div>
  </div>
</template>

<script>
import UnderlyingTable from '../component/underlying-table.vue'
import UnderlyingTop from '../component/underlying-top.vue'
import { adjustmentToInitiationList, adjustmentToListPendingAudit } from '../adjustment-config'
export default {
  name: 'Template',
  components: {
    UnderlyingTop,
    UnderlyingTable,
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

