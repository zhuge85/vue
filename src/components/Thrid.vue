<template>
  <div>
    <h1>孙组件</h1>
    <p>provide / inject用来做父组件给子组件或孙组件传值</p>
    <b>默认孙组件值</b>
    <p>title: {{title}}</p>
    <p>url: {{url}}</p>
    <el-button @click="fetch" type="primary">获取父组件的值</el-button>
    <el-button @click="clear" type="danger">清除数据</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '我是孙组件的值',
      url: 'www.zhujianbo.cn/mp3.html'
    }
  },
  inject: ['parent'],
  mounted() {
  },
  created() { },
  methods: {
    fetch() {
      this.title = this.parent.title
      this.url = this.parent.url
    },
    clear() {
      this.title = '我是孙组件的值'
      this.url = 'www.zhujianbo.cn/mp3.html'
    }
  }
}
</script>
