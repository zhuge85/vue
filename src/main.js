// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from './axios'
// 注册后即可使用
Vue.prototype.$axios = axios

import echarts from 'vue-echarts'
// 注册后即可使用
Vue.prototype.$echarts = echarts

// vue-lazyload图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/img/b1.jpg'), //请求失败后显示的图片
  loading: require('@/assets/img/loading.gif'), //加载的loading过渡图片
  attempt: 1, // 加载图片数量
  listenEvents: ['scroll'] // ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
})

import {
  Button,
  Select,
  Option,
  Container,
  Header,
  Main,
  Footer,
  Form,
  FormItem,
  Input,
  Message,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Table,
  TableColumn,
  Popover,
  Tag,
  MessageBox,
  Dialog,
  Pagination,
  DatePicker,
  Upload
} from 'element-ui'
// 注册后即可使用
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Upload)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
