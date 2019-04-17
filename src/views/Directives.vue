<template>
  <div>
    <h1>自定义指令: directives</h1>
    <p v-color>自定义颜色 v-color</p>
    <p>自动获取焦点 v-focus</p>
    <input type="text" v-focus>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '请输入密码'
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      }
    },
    color: {
      inserted: function (el) {
        el.style.color = "red";
      }
    }
  }
}
</script>
