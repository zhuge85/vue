<template>
  <div class="child">
    <h2>下面是子组件内容：</h2>
    {{text}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '子组件内容'
    }
  }
}
</script>