<template>
  <div ref="life">
    <p>{{ number }}</p>
    <input type="text" name="btnSetNumber" v-model="number">
  </div>
</template>

<script>
export default {
  name: 'Lifecyclehook',
  data() {
    return {
      number: 1
    }
  },
  //生命周期函数/生命周期钩子  start
  beforeCreate() {
    console.log('beforeCreate', this.number)
    console.log('beforeCreate: ', document.getElementsByTagName('p')[0])
  },
  // 请求数据，操作dom , 放在这个里面
  created() {
    console.log('created', this.number)
    console.log('created: ', document.getElementsByTagName('p')[0])
    this.$nextTick(() => {
      console.log('created-nextTick', document.getElementsByTagName('p')[0])
    })
  },
  beforeMount() {
    console.log('beforeMount', this.number)
    console.log('beforeMount: ', document.getElementsByTagName('p')[0])
  },
  mounted() {
    console.log('mounted', this.number)
    console.log('mounted: ', document.getElementsByTagName('p')[0])
  },
  beforeUpdate() {
    console.log('beforeUpdate', this.number)
  },
  updated() {
    console.log('updated', this.number)
  },
  // 页面销毁的时候要保存一些数据，就可以监听这个销毁的生命周期函数
  beforeDestroy() {
    console.log('beforeDestroy', this.number)
  },
  destroyed() {
    console.log('destroyed', this.number)
  }
  //生命周期函数/生命周期钩子  end 
}
</script>


