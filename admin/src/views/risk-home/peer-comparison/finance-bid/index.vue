<template>
  <!-- 融资标的查询 -->
  <div class="container">
    <select-options :radio-opts="radioOpts" :source="'finaceBid'" />
  </div>
</template>

<script>
import SelectOptions from '../components/select-options.vue'
export default {
  name: 'FinanceBid',
  components: {
    SelectOptions
  },
  data() {
    return {
      radioOpts: [
        {
          label: '融资标的保证金比例',
          value: 1
        },
        {
          label: '调入调出',
          value: 2
        },
        {
          label: '融资标的保证金比例变动',
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
.container {
  width: 100%;
  height: 100%;
  padding: 32px 32px 0px 32px;
}
</style>
