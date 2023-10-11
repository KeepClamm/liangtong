<template>
  <!-- 集中度查询 -->
  <div class="box-container">
    <select-options :radio-opts="radioOpts" :source="'finaceBid'" />
  </div>
</template>

<script>
import SelectOptions from '../../components/select-options.vue'
export default {
  name: 'FinanceBid',
  components: {
    SelectOptions
  },
  data() {
    return {
      radioOpts: [
        {
          label: '集中度',
          value: 1
        },
        {
          label: '集中度变动',
          value: 3
        }
      ]
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
div {
  font-size: 14px;
  box-sizing: border-box;
}
.box-container {
  width: 100%;
  height: 100%;
}
</style>
