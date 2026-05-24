import request from '@/utils/request'

// 注册
export const userRegisterResver = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}
// 登录
export const userLoginResver = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}
