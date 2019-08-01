import router from './router'

const $ = (function() {
  const ajax = function(
    url,
    data,
    type = 'GET',
    async = true,
    timeout = 10000
  ) {
    const promise = new Promise(function(resolve, reject) {
      let that = this
      // 超时处理
      let timeoutFlag = null
      let token = ''
      if (sessionStorage.token2) {
        token = sessionStorage.token2
      }
      const handler = function() {
        timeoutFlag = window.setTimeout(() => {
          console.warn('请求超时！')
          ajax.abort()
          window.clearTimeout(timeoutFlag)
          reject('请求超时！')
        }, timeout)
        if (this.readyState !== 4) {
          window.clearTimeout(timeoutFlag)
          return
        }
        if (this.status === 200) {
          window.clearTimeout(timeoutFlag)
          try {
            resolve(this.response)
          } catch (e) {
            reject(e)
          }
        } else {
          window.clearTimeout(timeoutFlag)
          if (this.response && this.response.code == 403) {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('token2')
            reject(this.response)
            router.push('/login')
          }
          reject(this.response)
          // reject(new Error(this.statusText));
        }
      }
      let fs = type.toUpperCase()

      // 转换 data
      let str = ''
      if (typeof data == 'object') {
        for (var key in data) {
          str += key + '=' + data[key] + '&'
        }
        data = str.replace(/&$/, '')
      }

      // 用于清除缓存
      let random = Math.random()

      let ajax = null
      if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest()
      } else {
        ajax = new ActiveXObject('Microsoft.XMLHTTP')
      }

      // 判断 获取方式
      if (fs == 'GET') {
        if (data) {
          ajax.open('GET', url + '?' + data, async)
        } else {
          ajax.open('GET', url + '?t=' + random, async)
        }
        ajax.responseType = 'json'
        ajax.setRequestHeader('Accept', 'application/json')
        ajax.setRequestHeader('csktoken', token)
        ajax.send()
      } else if (fs == 'POST') {
        ajax.open('POST', url, async)
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        ajax.setRequestHeader(
          'Content-type',
          'application/x-www-form-urlencoded'
        )
        ajax.responseType = 'json'
        ajax.setRequestHeader('Accept', 'application/json')
        ajax.setRequestHeader(
          'csktoken',
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJCQUlEVV81NDY1ODEiLCJpYXQiOjE1NTc2NTM1MDEsIm5iZiI6MTU1NzY1MzUwMSwiZXhwIjoxNTU3NzM5OTAxLCJkYXRhIjp7InRvX2hvbWVfdXNlcm5hbWUiOiJ3emdwZGwyIiwidG9faG9tZV9pZCI6ODQsInRvX2hvbWVfbWFyayI6NjZ9fQ.ThpRUtKObzhitwyAWNVajylqpBwLiahWl5cZRgAz2nI'
        )
        // ajax.setRequestHeader('csktoken', token)
        ajax.send(data)
      }
      // 处理返回数据
      ajax.onreadystatechange = handler
    })
    return promise
  }
  return {
    ajax
  }
})()

export default $

// 调用方式：

// $.ajax(url, data, type, async).then(function(json) {
//   console.log(json);
// }, function(error) {
//   console.log('出错了', error);
// });
