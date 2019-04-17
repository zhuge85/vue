<template>
  <div class="refdemo">
    <h1>父组件的值</h1>
    <p ref="demoInfo">{{ text }}</p>
    <el-button @click="change" type="primary">ref改变值</el-button>
    <el-button @click="clear" type="danger">恢复子组件值</el-button>
    <RefChild ref="childInfo"></RefChild>
  </div>
</template>
<script>
// const  RefChild = resolve => require(['@c/RefChild'], resolve);
import RefChild from '@c/RefChild';
export default {
  name: 'Ref',
  data() {
    return {
      text: '本页面值'
    }
  },
  components: {
    RefChild: resolve => require(['@c/RefChild'], resolve)
  },
  // created （vue自动回掉）数据完成初始化，但是获取不到dom
  created() {
    console.log('create:', this.text)
    console.log('create 获取dom：', this.$refs.demoInfo)
  },
  // mounted （vue自动回掉）dom出生完成，可以获取不到dom  操作dom
  mounted() {
    // console.log('mounted:', this.text)
    this.$refs.demoInfo.innerHTML = 'mounted中改变'
    console.log('mounted 获取dom：', this.$refs.demoInfo.innerHTML);
    this.$nextTick(() => {
      // this.$refs.childInfo.$el.innerHTML = 'mounted中改变'
    })
  },
  methods: {
    change() {
      this.$refs.childInfo.text = '父组件中改变了子组件的值哦'
    },
    clear() {
      this.$refs.childInfo.text = '子组件内容'
    }
  }
}
</script>
