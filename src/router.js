// import Vue from 'vue'
// import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { Message } from 'element-ui'

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // '/filename/'
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: resolve => require(['@c/Container'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['@v/Home'], resolve)
        },
        {
          path: '/banner',
          component: resolve => require(['@v/Banner'], resolve)
        },
        {
          path: '/ref',
          component: resolve => require(['@v/Ref'], resolve)
        },
        {
          path: '/nextTick',
          component: resolve => require(['@v/NextTick'], resolve)
        },
        {
          path: '/lifecyclehook',
          component: resolve => require(['@v/Lifecyclehook'], resolve)
        },
        {
          path: '/table',
          component: resolve => require(['@v/Table'], resolve)
        },
        {
          path: '/uploadpage',
          component: resolve => require(['@v/Uploadpage'], resolve)
        },
        {
          path: '/aplayer',
          component: resolve => require(['@v/Aplayer'], resolve)
        },
        {
          path: '/about',
          component: resolve => require(['@v/About'], resolve)
        },
        {
          path: '/route',
          component: resolve => require(['@v/Route'], resolve),
          children: [
            {
              path: '/',
              redirect: '/route/link'
            },
            {
              path: '/route/link',
              component: resolve => require(['@v/RouterLink'], resolve),
              children: [
                {
                  name: 'LinkPage',
                  path: '/route/link/:id',
                  component: resolve => require(['@c/LinkPage'], resolve)
                }
              ]
            },
            {
              path: '/route/url',
              component: resolve => require(['@v/RouterUrl'], resolve),
              children: [
                {
                  path: '/',
                  redirect: '/route/url/1'
                },
                {
                  name: 'UrlPage',
                  path: '/route/url/:id',
                  component: resolve => require(['@c/UrlPage'], resolve)
                }
              ]
            }
          ]
        },
        {
          path: '/mixins',
          component: resolve => require(['@v/Mixins'], resolve)
        },
        {
          path: '/directives',
          component: resolve => require(['@v/Directives'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['@v/Login'], resolve)
    },
    {
      path: '*',
      component: resolve => require(['@v/404'], resolve)
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.token ? true : false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : [next('/login'), Message.warning('请先登录！')]
  }
})
// 路由跳转
Vue.prototype.$Go = function(index) {
  this.$router.push(index)
}

export default router
