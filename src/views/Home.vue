<template>
  <div class="home">
    <h1>父组件</h1>
    <p>获取VUE_APP_BASEURL的值 -> {{ url }}</p>
    <Second class="msgBox" :msg="this.msg" :users="this.users" @getUser="getUser" @clearUser="clearUser" />

    <!-- <el-button @click="article" type="primary">获取数据</el-button> -->
  </div>
</template>

<script>
import api from '@/api';// 导入我们的api接口

// import Second from '@c/Second';
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      users: [],
      msg: 'xiaozhu',
      url: process.env.VUE_APP_BASEURL,
    }
  },
  provide: {
    parent: {
      title: '父组件的值',
      url: process.env.VUE_APP_BASEURL
    }
  },
  created() {
    if (!this.$store.state.homeinfo) {
      // this.$store.getters.homeinfo
      // this.$store.state.homeinfo
      this.fetchUser();
      // this.fetchUser2();
    } else {
      this.users = this.user;
    }
  },
  mounted() { },
  destroyed() { },
  props: {},
  components: {
    Second: resolve => require(['@c/Second'], resolve)
  },
  computed: {
    user() {
      return this.$store.getters.homeinfo;
    },
    user2() {
      return this.$store.state.homeinfo;
    }
  },
  methods: {
    fetchUser() {
      this.$axios('/api/user.json').then(res => {
        // console.log(res.data)
        this.$store.dispatch('setHomeinfo', res.data);
      });
    },
    fetchUser2() {
      api.apiUsers().then(res => {
        console.log(res)
      })
    },
    getUser() {
      this.fetchUser()
      this.users = this.user;
    },
    clearUser() {
      this.users = [];
    },
    article() {
      this.$axios('/index/article.php').then(res => {
        // console.log(res.data)
      });
    }
  },
  filters: {},
  watch: {}
};
</script>
<style lang="less">
.home {
  width: 600px;
  margin: 0 auto;
}
</style>
