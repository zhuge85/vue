import axios from 'axios'
import qs from 'query-string'

class UserManager {
  constructor() {
    this.$http = axios.create({
      baseUrl: 'https://api.forcs.com'
    })
    this.dataMethodDefaults = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [
        function(data) {
          return qs.stringify(data)
        }
      ]
    }
  }

  getUsersPageableList(page = 0, size = 20) {
    return this.$http.get(`/users?page=${page}&size=${size}`)
  }

  getUsersFullList() {
    return this.$http.get('/users/all')
  }

  getUser(id) {
    if (!id) {
      return Promise.reject(new Error(`getUser：id(${id})无效`))
    }
    return this.$http.get(`/users/${id}`)
  }

  createUser(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error('createUser：提交的数据无效'))
    }
    return this.$http.post('/users', data, { ...this.dataMethodDefaults })
  }

  updateUser(id, update = {}) {
    if (!update || !Object.keys(update).length) {
      return Promise.reject(new Error('updateUser：提交的数据无效'))
    }
    return this.$http.put(`/users/${id}`, update, {
      ...this.dataMethodDefaults
    })
  }

  deleteUser(id) {
    if (!id) {
      return Promise.reject(new Error(`deleteUser：id(${id})无效`))
    }
    return this.$http.delete(`/users/${id}`)
  }
}

export default new UserManager()
