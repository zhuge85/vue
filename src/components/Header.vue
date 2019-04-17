<template>
  <el-header>
    <el-menu :default-active="$route.path" class="menu-demo" mode="horizontal" @select="handleSelect" router>
      <template v-for="item in items">
        <template v-if="item.children">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item :index="subItem.index" v-for="(subItem,i) in item.children" :key="i">{{ subItem.title }}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <el-dropdown @command='setInfo' class="dropdown-demo">
      <span class="el-dropdown-link">
        {{ user ? user.email : '' }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled command="info">个人信息</el-dropdown-item>
        <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      activemenu: '/index',
      items: [
        {
          title: "首页",
          index: "/index"
        },
        {
          title: "实例展示",
          index: "2",
          children: [
            { index: "/about", title: "echarts" },
            { index: "/banner", title: "banner" },
            { index: "/ref", title: "ref" },
            { index: "/nextTick", title: "nextTick" },
            { index: "/lifecyclehook", title: "lifecyclehook" },
            { index: "/table", title: "table" },
            { index: "/uploadpage", title: "uploadpage" },
            { index: "/aplayer", title: "aplayer" },
            { index: "/other", title: "other" }
          ]
        },
        {
          title: "路由",
          index: "3",
          children: [
            { index: "/route/link", title: "路由跳转" },
            { index: "/route/url", title: "获取路由参数" },
          ]
        },
        {
          title: "混入",
          index: "/mixins"
        },
        {
          title: "自定义指令",
          index: "/directives"
        },
      ]
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.activemenu = this.$route.path
    this.$nextTick(() => {
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    setInfo(cmditem) {
      if (!cmditem) {
        this.$message('菜单选项缺少command属性');
        return;
      }
      switch (cmditem) {
        case 'info':
          this.$router.push('/infoshow');
          break;
        case 'logout':
          sessionStorage.removeItem('token');
          this.$store.dispatch('clearCurrentState');
          // 页面跳转
          this.$router.push('/login');
          this.$message.success('退出成功！');
          break;
      }
    }
  }
}
</script>
<style lang="less" scoped>
.menu-demo {
  float: left;
  border-bottom: none;
}
.dropdown-demo {
  float: right;
  span {
    display: inline-block;
    line-height: 60px;
  }
}
</style>

