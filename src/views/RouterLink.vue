<template>
  <div class="routelink">
    <h1>路由跳转</h1>
    <el-dropdown @command='routelink' style="margin-right:20px">
      <span class="el-dropdown-link">
        <el-button type="primary">router.push<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="p1">字符串</el-dropdown-item>
        <el-dropdown-item command="p2">对象</el-dropdown-item>
        <el-dropdown-item command="p3">带查询参数</el-dropdown-item>
        <el-dropdown-item command="p4">命名的路由</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown @command='routeurl' class="dropdown-demo">
      <span class="el-dropdown-link">
        <el-button type="primary">router.replace<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="r1">字符串</el-dropdown-item>
        <el-dropdown-item command="r2">对象</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'link',
  data() {
    return {
      text: '本页面值'
    }
  },
  components: {
  },
  created() {

  },
  mounted() {

  },
  methods: {
    routelink(cmditem) {
      switch (cmditem) {
        case 'p1':
          // 字符串
          this.$router.push('/route/link/p1')
          break;
        case 'p2':
          // 对象
          this.$router.push({ path: '/route/link/p2?url=p2' });
          break;
        case 'p3':
          // 带查询参数，变成/backend/order?selected=2
          this.$router.push({ path: '/route/link/p3', query: { selected: '2' } });
          break;
        case 'p4':
          // 命名的路由
          this.$router.push({ name: 'LinkPage', params: { userId: 123 } })
          break;
        default:
      }
    },
    routeurl(cmditem) {
      switch (cmditem) {
        case 'r1':
          this.$router.replace('/route/link/r1')
          break;
        case 'r2':
          this.$router.replace({ path: '/route/link/r2' })
          break;
        case 'r3':
          this.$router.push({ path: '/route/link/r3', replace: true })
          break;
        default:
      }
    }
  }
}
</script>