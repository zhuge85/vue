import Vue from "vue";
import msgBoxComponent from "./MsgboxTemplate";

let msgBox = (options = {}) => {
  let msgBoxConstructor = Vue.extend(msgBoxComponent);
  let instance = new msgBoxConstructor({
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
      resolve();
      successBtn();
    };
    instance.cancelBtn = () => {
      reject();
      cancelBtn();
    };
  });
};

export default function(Vue) {
  // //添加全局API
  Vue.prototype.$msgbox = msgBox;
}



// 调用方法

// 原型调用
// import Msgbox from './plugins/msgbox'
// Vue.use(Msgbox)
// this.$msgbox({
//   title: '温馨提示',
//   cancel: '取消',
//   confirm: '确定按钮',
//   content: '这里是消息弹出内容',
//   className: 'pop-custom'
// }).then(() => {
//   console.log("我点击了确定按钮")
// }).catch((err) => {
//   console.log("点击取消");
// })
