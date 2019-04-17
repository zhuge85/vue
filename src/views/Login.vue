<template>
  <div class="login">
    <!-- <el-button @click="login" type="primary">登录</el-button> -->
    <div class="box">
      <h4 class="title">小朱vue-cli3.0</h4>
      <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
        </el-form-item>

        <div class="tiparea">
          <p>还没有账号？现在<router-link to='/register'>注册</router-link>
          </p>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginUser: {
        email: '',
        password: '',
        time: 0
      },
      rules: {
        email: [
          { type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.get('/user.json', this.loginUser).then(res => {
            // 342393950@qq.com  535233431@qq.com
            let { email, password } = this.loginUser
            const index = res.data.findIndex(item => item.email === email);

            if (index < 0) {
              this.$message.error('账号错误！');
            } else {
              if (res.data[index].password === password) { // 登录成功
                this.loginUser.time = parseInt(Date.now().toString().substr(0, 10)) + 3600
                // 存储数据
                this.$store.dispatch('setIsAutnenticated', !this.isEmpty(res.data[index].password));
                this.$store.dispatch('setUser', this.loginUser);
                sessionStorage.setItem('token', JSON.stringify(this.loginUser));
                // 页面跳转
                this.$router.push('/index');
                this.$message.success('登陆成功！');
              } else {
                this.$message.warning('密码错误！');
              }
            }
          });
        } else {
          this.$message('请输入正确格式的账号密码！');
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      );
    },
    login() {
      sessionStorage.setItem('token', 'login');
      // 页面跳转
      this.$router.push('/index');
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.box {
  width: 400px;
  height: 300px;
  padding: 20px;
  border: solid 1px #eee;
  .title {
    line-height: 50px;
    font-size: 16px;
    text-align: center;
  }
  button {
    width: 100%;
  }
}
</style>
