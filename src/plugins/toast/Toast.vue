<template>
  <div id="toast" class="toast" v-if="showWrap" :class="showContent ?'fadein':'fadeout'">{{message}}</div>
</template>
<script>
export default {
  mounted() {
    this.close()
  },
  methods: {
    close() {
      // window.setTimeout(() => {
      //   this.showContent = false
      //   this.$el.parentNode.removeChild(this.$el);
      // }, this.time);
      //隐藏
      window.setTimeout(() => {
        this.showContent = false
      }, this.time - 1250)
      // 过了 time 时间后隐藏整个组件
      window.setTimeout(() => {
        this.showWrap = false
        this.$el.parentNode.removeChild(this.$el)
      }, this.time)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 40%;
  background: rgba(0, 0, 0, 0.35);
  padding: 10px 20px;
  border-radius: 3px;
  transform: translate(-50%, -40%);
  color: #fff;
  font-size: 14px;
  text-align: justify;
  /* animation: animScale 0.25s;
  animation-fill-mode: forwards; */
}
/* @keyframes animScale {
  0% {
    opacity: 0;
    transform: translate3d(-50%, -30%, 0) scale3d(0.1, 0.6, 0.5);
  }
  100% {
    opacity: 1;
    transform: translate3d(-50%, -30%, 0) scale3d(1, 1, 1);
  }
} */

.fadein {
  animation: animate_in 0.25s;
}
.fadeout {
  animation: animate_out 0.25s;
  opacity: 0;
}
@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>