<template>
  <div>
    <p>404 no page</p>
    <el-button @click="home" type="danger">返回首页</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    home() {
      // 页面跳转
      this.$router.push('/index');
    }
  }
}
</script>
