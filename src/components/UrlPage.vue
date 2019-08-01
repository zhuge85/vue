<template>
  <div>
    <p><b>this.$route.params:</b></p>
    <p>{{this.$route.params}}</p>
    <p><b>this.$route.query:</b></p>
    <p>{{this.$route.query}}</p>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default: 1,
      required: true
    },
    keyword: {
      type: Object,
      required: true
    }
  },
  created() {
    this.$router.replace(`/route/url/${this.id}?name=${this.keyword.name}&age=${this.keyword.age}`)
  },
  watch: {
    'id': function (newVal, oldVal) {
      this.$router.replace(`/route/url/${this.id}?name=${this.keyword.name}&age=${this.keyword.age}`)
    },
    'keyword': {
      handler(curVal, oldVal) {
        this.$router.replace(`/route/url/${this.id}?name=${this.keyword.name}&age=${this.keyword.age}`)
      },
      // immediate deep
      deep: true
    }

  }
}
</script>
