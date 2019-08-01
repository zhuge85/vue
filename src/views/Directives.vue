<template>
  <div>
    <div class="lighlight" v-highlight>
      <h2>自定义高亮插件</h2>
      <pre><code>&lt;!-- SortList --&gt;
&lt;template&gt;
  &lt;BaseList v-bind="$props" v-on="$listeners"&gt; &lt;!-- ... --&gt; &lt;/BaseList&gt;
&lt;/template&gt;
&lt;script&gt;
import BaseList from "./BaseList";
// 包含了基础的属性定义
import BaseListMixin from "./BaseListMixin";
// 封装了排序的逻辑
import sort from "./sort.js";
export default {
  props: BaseListMixin.props,
  components: {
    BaseList
  }
&lt;/script&gt;
      </code>
    </pre>
    </div>
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
