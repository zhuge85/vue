<template>
  <el-container direction="vertical" class="test-wrapper">
    <Header class="test-header"></Header>
    <Main class="test-main"></Main>
    <Footer class="test-footer"></Footer>
  </el-container>
</template>
<script>
import Header from '@c/Header'
import Main from '@c/Main'
import Footer from '@c/Footer'
export default {
  name: 'Container',
  components: {
    Header,
    Main,
    Footer
  }
}
</script>
<style lang="less">
.test-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.test-header {
  overflow: hidden;
  border-bottom: solid 1px #e6e6e6;
}
.test-main {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.test-footer {
  line-height: 60px;
}
</style>
