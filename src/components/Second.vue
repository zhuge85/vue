<template>
  <div class="hello">
    <h1>子组件</h1>
    <p>{{ msg }}</p>
    <ul class="zhu-ul">
      <li v-for="item in users" :key="item.id">
        <p>{{ item.name }}</p>
        <p>{{ item.email }}</p>
      </li>
    </ul>
    <el-button @click="getUser" type="primary">获取数据</el-button>
    <el-button @click="clearUser" type="danger">清除数据</el-button>
    <Thrid></Thrid>
  </div>
</template>

<script>
export default {
  name: 'Second',
  props: {
    msg: String,
    users: Array,
  },
  data() {
    return {
    }
  },
  components: {
    Thrid: resolve => require(['@c/Thrid'], resolve)
  },
  methods: {
    getUser() {
      this.$emit('getUser');
    },
    clearUser() {
      this.$emit('clearUser');
    }
  }
};
</script>
<style scoped lang="less">
.msgBox {
  width: 600px;
  margin: 0 auto;
}
.zhu-ul {
  width: 100%;
  height: 200px;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-items: center;
  align-items: center;
  li {
    flex: 1;
  }
}
// .hello {
//   button {
//     border: 0;
//     margin: 0 5px;
//     padding: 3px 8px;
//     color: #fff;
//     background: rgba(2, 2, 2, 1);
//     border-radius: 3px;
//     &:hover {
//       background: rgba(2, 2, 2, 1);
//     }
//   }
// }
</style>
