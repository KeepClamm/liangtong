<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'FinanceBid',
  components: {
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
.container {
  width: 100%;
  height: 100%;
  padding: 32px 32px 0px 32px;
}
</style>
