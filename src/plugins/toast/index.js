import vue from 'vue'

//静态组件
import toastComponent from './Toast.vue'

// 返回一个扩展实力构造器
const ToastConstructor = vue.extend(toastComponent)

// 定义弹出组件的函数 两个参数 显示文本和显示时间
function showToast(options) {
  if (options === undefined || options === null) {
    options = {
      message: '请输入消息内容',
      time: 3000
    }
  } else if (typeof options === 'string' || typeof options === 'number') {
    options = {
      message: options,
      time: 3000
    }
  } else if (typeof options === 'object') {
    options = {
      message: options.message || '请输入消息内容',
      time: options.time || 3000
    }
  }
  options.showWrap = true // 是否显示组件
  options.showContent = true // 作用:在隐藏组件之前,显示隐藏动画
  const toastDom = new ToastConstructor({
    data: options
  }).$mount()

  // // 把实例化的toast.vue 添加到body中
  document.body.appendChild(toastDom.$el)
}

// 注册为全局组件的函数
// 将组件注册到 vue 的 原型链里去,
// 这样就可以在所有 vue 的实例里面使用 this.$toast()
// function Toast() {
//   vue.prototype.$toast = showToast
// }

//将注册在vue原型链改为调用showToast
const ToastFun = {
  showToast
}

export default ToastFun
export function Toast(message) {
  ToastFun.showToast(message)
}

// 调用方法

// 原型调用
// import Toast from './plugins/toast/'
// Vue.use(Toast)
// Vue.prototype.$toast = Toast.showToast
// this.$toast({
//   message: "自定义消息提示组件",
//   time: 2000
// });

// 全局调用
// import { Toast } from '../plugins/toast/'
// Toast("全局调用");
