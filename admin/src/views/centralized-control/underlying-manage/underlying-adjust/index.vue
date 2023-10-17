<template>
  <!-- 标的券调整 -->
  <div class="template">
    <div class="mb-40">
      <underlying-top
        :adjust-label="adjustLabel"
        :global-config="adjustmentToInitiationList"
      />
      <underlying-table
        :table-row="tableRowLanuch"
        :source="'adjustmentsInitiationList'"
      />
    </div>
    <div class="mb-40">
      <underlying-top
        :adjust-label="adjustExamLabel"
        :global-config="adjustmentToListPendingAudit"
        :pass-reject="passReject"
      />
      <underlying-table
        :adjust-table="adjustExamTable"
        :table-row="tableRowLanuch"
        :source="'adjustmentsPendingAudits'"
      />
    </div>
  </div>
</template>

<script>
import UnderlyingTable from "../component/underlying-table.vue";
import UnderlyingTop from "../component/underlying-top.vue";
import {
  adjustmentToInitiationList,
  adjustmentToListPendingAudit,
} from "../adjustment-config";
export default {
  name: "Template",
  components: {
    UnderlyingTop,
    UnderlyingTable,
  },
  data() {
    return {
      adjustmentToInitiationList: {},
      adjustLabel: {
        title: "标的券调整发起清单",
        adjustStatus: true,
      },
      adjustExamLabel: {
        title: "标的券调整待审核清单",
      },
      adjustExamTable: true,
      passReject: true,
      tableRowLanuch: {
        标的范围调整: [
          { label: "融资标的证券", prop: "rzStock" },
          { label: "融券标的证券", prop: "rqStock" },
          { label: "可冲抵保证金券", prop: "salryStock" },
        ],
        集中度调整: [
          { label: "调整前评级", prop: "originLv" },
          { label: "调整后评级  ", prop: "nowLv" },
          { label: "变动", prop: "changeReason" },
        ],
        保证金比例调整: [
          { label: "调整前保证金比例", prop: "oldConversionRate" },
          { label: "调整后保证金比例", prop: "dqConversionRate" },
          { label: "变动", prop: "rateChangeReason" },
        ],
        折算率调整: [
          { label: "调整前折算率", prop: "oldConversionRate" },
          { label: "调整后折算率", prop: "dqConversionRate" },
          { label: "变动", prop: "rateChangeReason" },
        ],
      },
    };
  },
  computed: {},
  created() {
    this.adjustmentToInitiationList = adjustmentToInitiationList;
    this.adjustmentToListPendingAudit = adjustmentToListPendingAudit;
  },
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.mb-40 {
  margin-bottom: 40px;
}
.pagination-container {
  width: 100%;
}
</style>

