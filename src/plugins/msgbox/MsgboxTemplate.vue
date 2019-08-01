<template>
  <div class="msgbox-wrapper">
    <transition name="msgbox">
      <div v-if="show" class="msgbox-container" :class="className">
        <header>{{title}} <span class="close" @click="cancelBtn"></span></header>
        <div class="content-body">
          <div>{{content}}</div>
        </div>
        <footer>
          <a v-if="cancel" href="javascript:;" @click="cancelBtn" class="btn">{{cancel}}</a>
          <a href="javascript:;" @click="successBtn" class="btn btn-primary">{{confirm}}</a>
        </footer>
      </div>
    </transition>
    <transition name="fade">
      <div class="shadow-cover"></div>
    </transition>
  </div>

</template>
<script>
export default {
  data() {
    return {
      show: false,
      title: '提示',
      content: '请自定义内容',
      confirm: '确定',
      cancel: '',
      className: '',
      time: 150
    }
  },
  watch: {
    show(val) {
      if (val) {
        if (!this.hasClass(document.body, "pop-mask")) {
          this.addClass(document.body, "pop-mask");
        }
      } else {
        this.removeClass(document.body, "pop-mask");
      }
    }
  },
  beforeMount() {
    //如果已经存在，则阻止出现第二次
    let node = document.querySelector('.msgbox-container')
    if (node && node.parentNode) {
      node.parentNode.removeChild(node)
    }
  },
  methods: {
    successBtn() {
      this.close()
    },
    cancelBtn() {
      this.close()
    },
    close() {
      this.show = false
      window.setTimeout(() => {
        this.$el.parentNode.removeChild(this.$el);
      }, this.time);
    },
    addClass(obj, cls) {
      var obj_class = obj.className,
        blank = (obj_class != '') ? ' ' : '';
      var added = obj_class + blank + cls;
      obj.className = added;
    },
    removeClass(obj, cls) {
      var obj_class = ' ' + obj.className + ' ';
      obj_class = obj_class.replace(/(\s+)/gi, ' ');
      var removed = obj_class.replace(' ' + cls + ' ', ' ');
      removed = removed.replace(/(^\s+)|(\s+$)/g, '');
      obj.className = removed;//替换原来的 class.
    },
    hasClass(obj, cls) {
      var obj_class = obj.className,
        obj_class_lst = obj_class.split(/\s+/);
      var x = 0;
      for (x in obj_class_lst) {
        if (obj_class_lst[x] == cls) {
          return true;
        }
      }
      return false;
    }
  }
}
</script>
<style lang="less" scoped>
.msgbox-wrapper {
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  vertical-align: middle;
  &::after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
}
@unit: 10px;
.shadow-cover {
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.msgbox-container {
  position: relative;
  z-index: 20;
  backface-visibility: hidden;
  overflow: hidden;
  display: inline-block;
  width: 41 * @unit;
  color: #555;
  text-align: left;
  vertical-align: middle;
  background: #fff;
  border-radius: 0.4 * @unit;
  animation-fill-mode: forwards;
  box-shadow: 0 0 0.5 * @unit rgba(0, 0, 0, 0.5);
  header {
    position: relative;
    margin: 0;
    padding: 1.2 * @unit 1.5 * @unit;
    color: #333;
    height: 2 * @unit;
    line-height: 2 * @unit;
    font-size: 1.7 * @unit;
    border-radius: 0.8 * @unit 0.8 * @unit 0 0;
    background: #fff;
    border-width: 0;
    .close {
      position: absolute;
      right: 1.2 * @unit;
      top: 1.2 * @unit;
      width: 2 * @unit;
      height: 2 * @unit;
      background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU5MjY5MTYwNDY2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5ODMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODk5LjE3NCAxNTQuNjAzbC0yOS43ODItMjkuNzgyLTM1Ny4zOTcgMzYxLjExNC0zNTcuMzk3LTM2MS4xMTQtMjkuNzgyIDI5Ljc4MiAzNjEuMTE0IDM1Ny4zOTctMzYxLjExNCAzNTcuMzk3IDI5Ljc4MiAyOS43ODIgMzU3LjM5Ny0zNjEuMTE0IDM1Ny4zOTcgMzYxLjExNCAyOS43ODItMjkuNzgyLTM2MS4xMTQtMzU3LjM5N3oiIHAtaWQ9IjE5ODQiIGZpbGw9IiM4YThhOGEiPjwvcGF0aD48L3N2Zz4=');
      background-size: cover;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU5MjY5MTYwNDY2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5ODMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODk5LjE3NCAxNTQuNjAzbC0yOS43ODItMjkuNzgyLTM1Ny4zOTcgMzYxLjExNC0zNTcuMzk3LTM2MS4xMTQtMjkuNzgyIDI5Ljc4MiAzNjEuMTE0IDM1Ny4zOTctMzYxLjExNCAzNTcuMzk3IDI5Ljc4MiAyOS43ODIgMzU3LjM5Ny0zNjEuMTE0IDM1Ny4zOTcgMzYxLjExNCAyOS43ODItMjkuNzgyLTM2MS4xMTQtMzU3LjM5N3oiIHAtaWQ9IjE5ODQiIGZpbGw9IiMzMzMiPjwvcGF0aD48L3N2Zz4=');
        transform: rotate(180deg);
      }
    }
  }
  .content-body {
    font-size: 1.5 * @unit;
    margin: 2 * @unit 1 * @unit;
    line-height: 2;
    max-height: 20 * @unit;
    overflow-y: auto;
    color: #666;
    > div {
      padding: 0 1 * @unit;
      text-align: justify;
      word-break: break-all;
    }
  }
  footer {
    overflow: hidden;
    padding: 1.2 * @unit 1.5 * @unit;
    text-align: right;
    .btn + .btn {
      margin-left: @unit;
    }
  }
}
// }
.btn {
  padding: .9 * @unit 1.5 * @unit;
  font-size: 1.2 * @unit;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: .1 * @unit solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  text-decoration: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  border-radius: .3 * @unit;
  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  &:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: none;
  }
}
.btn-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  &:hover {
    color: #fff;
    background: #66b1ff;
    border-color: #66b1ff;
  }
  &:active {
    color: #fff;
    background: #3a8ee6;
    border-color: #3a8ee6;
  }
}
.btn-danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
  &:hover {
    background: #f78989;
    border-color: #f78989;
    color: #fff;
  }
  &:active {
    background: #dd6161;
    border-color: #dd6161;
    color: #fff;
  }
}
.btn-warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
  &:hover {
    background: #cf9236;
    border-color: #cf9236;
    color: #fff;
  }
  &:active {
    background: #cf9236;
    border-color: #cf9236;
    color: #fff;
  }
}
.btn-success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
  &:hover {
    background: #85ce61;
    border-color: #85ce61;
    color: #fff;
  }
  &:active {
    background: #5daf34;
    border-color: #5daf34;
    color: #fff;
  }
}

// .msgbox-enter,
// .msgbox-leave-to {
//   transform: translate(-50%, -50%) scale(0, 0);
// }
// .msgbox-enter-active,
// .msgbox-leave-active {
//   transition: all 0.3s;
// }
// .msgbox-enter-to,
// .msgbox-leave {
//   transform: translate(-50%, -50%) scale(1, 1);
// }
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.msgbox-enter-active {
  animation: msgbox-fade-in 0.3s;
}
.msgbox-leave-active {
  animation: msgbox-fade-out 0.3s;
}
@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(0, -2 * @unit, 0);
    opacity: 0;
  }
  to {
    transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes msgbox-fade-out {
  0% {
    transform: translateZ(0);
    opacity: 1;
  }
  to {
    transform: translate3d(0, -2 * @unit, 0);
    opacity: 0;
  }
}
</style>