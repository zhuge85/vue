import Vue from "vue";
import MessageDemo from "./Message.vue";

const messageBox = Vue.extend(MessageDemo);

MessageDemo.install = function(options, type) {
  if (options === undefined || options === null) {
    options = {
      content: "我只是默认提示！"
    };
  } else if (typeof options === "string" || typeof options === "number") {
    options = {
      content: options
    };
    if (type != undefined && options != null) {
      options.type = type;
    }
  }

  let instance = new messageBox({
    data: options
  }).$mount();

  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.visible = true;
  });
};

export default MessageDemo;
export function Message(options, type) {
  MessageDemo.install(options, type)
}
// 调用方法

// 原型调用    引入 Toast
// import Message from './plugins/message'
// Vue.prototype.$message = Message.install
// this.$message('自定义消息提示组件','success');

// 全局调用
// import { Message } from '../plugins/message'
// Message("全局调用",'success');
