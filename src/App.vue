<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    document.documentElement.classList.add('loaded')
    setTimeout(() => {
      document.body.removeChild(document.getElementById('loader-wrapper'));
      document.documentElement.classList.remove('loaded')
    }, 1200)
    if (sessionStorage.token) {
      const decode = JSON.parse(sessionStorage.token);
      this.$store.dispatch('setIsAutnenticated', !this.isEmpty(decode));
      this.$store.dispatch('setUser', decode);
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      );
    }
  }
}
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
