/**
 * api接口统一管理
 */
import { get, post } from './axios'

const apiUsers = p => get('/user.json', p)

const api = {
  apiUsers
}

export default api
