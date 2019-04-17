<template>
  <div>
    <h1>{{this.$route.params}}</h1>
    <p><b>router.push(location)</b></p>
    <p>在vue.js中想要跳转到不同的 URL，需要使用 router.push 方法。</p>
    <p>这个方法会向 history 栈添加一个新的记录，当用户点击浏览器后退按钮时，则回到之前的 URL。</p>
    <p v-pre>
      &lt;router-link :to="..."&gt; 等同于调用 router.push(...)
    </p>
    <p><b>声明式：</b></p>
    <pre>&lt;router-link :to="..."&gt;</pre>
    <p><b>编程式：router.push(...)//该方法的参数可以是一个字符串路径，或者一个描述地址的对象。</b></p>
    <pre>// 字符串
router.push('home')
// 对象
this.$router.push({path: '/login?url=' + this.$route.path});
// 带查询参数，变成/backend/order?selected=2
this.$router.push({path: '/backend/order', query: {selected: "2"}});
// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})</pre>
    <p><b>router.replace(location)</b></p>
    <p>设置 replace 属性（默认值: false）的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。即使点击返回按钮也不会回到这个页面。</p>
    <p>加上replace: true后，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。</p>
    <pre>//声明式：
&lt;router-link :to="..." replace&gt;&lt;/router-link&gt;
// 编程式:
router.replace(...)
//push方法也可以传replace
this.$router.push({path: '/home', replace: true})</pre>
  </div>
</template>
<script>
export default {
  name: 'LinkPage',
  data() {
    return {
      text: '本页面值'
    }
  }
}
</script>
