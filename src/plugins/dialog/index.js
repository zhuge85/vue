import Vue from "vue";
import dialogComponent from "./DialogTemplate";

let dialog = (options = {}) => {
  let dialogConstructor = Vue.extend(dialogComponent);
  let instance = new dialogConstructor({
    el: document.createElement("div")
  });
  document.body.appendChild(instance.$el);
  // 将单个 confirm instance 的配置合并到默认值中
  Object.assign(instance.$data, options);
  return new Promise((resolve, reject) => {
    instance.show = true;
    let successBtn = instance.successBtn;
    let cancelBtn = instance.cancelBtn;
    instance.successBtn = () => {
      resolve(options.content);
      successBtn();
    };
    instance.cancelBtn = () => {
      reject();
      cancelBtn();
    };
  });
};

export default function(Vue) {
  // 添加全局API
  Vue.prototype.$dialog = dialog;
}


// 调用方法  引入 Dialog

// 原型调用
// import Dialog from './plugins/dialog/'
// ue.use(Dialog)
// this.$dialog({
//   title: '温馨提示',
//   cancel: '取消按钮',
//   confirm: '确定按钮',
//   content: '',
//   className: 'classname'
// }).then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log("点击取消");
// })
