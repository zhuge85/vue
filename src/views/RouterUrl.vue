<template>
  <div class="routeurl">
    <h1>获取路由参数</h1>
    <el-button @click="param" type="primary">随机param</el-button>
    <el-button @click="query" type="danger">随机query</el-button>
    <UrlPage :id=id :keyword=keyword></UrlPage>
  </div>
</template>
<script>
export default {
  name: 'url',
  data() {
    return {
      word: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      id: 1,
      keyword: {
        name: 'zhu',
        age: 30
      }
    }
  },
  components: {
    UrlPage: resolve => require(['@c/UrlPage'], resolve)
  },
  methods: {
    param() {
      this.id = this.random(200)
    },
    query() {
      let len = this.word.length
      this.keyword.name = this.word[this.random(len)] + this.word[this.random(len)]
      this.keyword.age = this.random(50)
    },
    random(num) {
      return Math.floor(Math.random() * num)
    }
  }
}
</script>