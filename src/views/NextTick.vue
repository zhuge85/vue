<template>
  <div>
    <h1>nextTick操作dom</h1>
    <el-button @click="getText" type="primary">获取 div 内容</el-button>
    <div ref="div" id="div" v-if="show">
      <p>这是一段文本</p>
      <input type="text" id="keywords">
    </div>
    <ol>
      <li v-for="(item,index) in list1" :key="index">{{item}}</li>
    </ol>
    <ol>
      <li v-for="(item,index) in list2" :key="index">{{item}}</li>
    </ol>
  </div>
</template>
<script>
export default {
  name: 'NextTick',
  data() {
    return {
      show: false,
      list1: [],
      list2: []
    }
  },
  created() {
    this.composeList1()
    this.composeList2()
    this.$nextTick(() => {
      // DOM 更新了
      console.log('finished test ' + new Date().toString())
      console.log(document.querySelectorAll('li').length)
    })
  },
  methods: {
    getText() {
      this.show = !this.show
      if (this.show) {
        this.$nextTick(() => {
          let text = document.getElementById('div').innerHTML
          let width = this.$refs.div.offsetWidth
          document.getElementById("keywords").focus()
          console.log(text)
          console.log(width)
        })
      }
    },
    composeList1() {
      let me = this
      let count = 5000
      for (let i = 0; i < count; i++) {
        Vue.set(me.list1, i, 'list1测试信息～～呜啦啦啦' + i)
      }
      console.log('finished list1 ' + new Date().toString())
      this.$nextTick(function () {
        // DOM 更新了
        console.log('finished tick1 ' + new Date().toString())
        console.log(document.querySelectorAll('li').length)
      })
    },
    composeList2() {
      let me = this
      let count = 5000
      for (let i = 0; i < count; i++) {
        Vue.set(me.list2, i, 'list2测试信息～～呜啦啦啦' + i)
      }
      console.log('finished list2 ' + new Date().toString())
      this.$nextTick(function () {
        // DOM 更新了
        console.log('finished tick2 ' + new Date().toString())
        console.log(document.querySelectorAll('li').length)
      })
    }
  }
}
</script>
