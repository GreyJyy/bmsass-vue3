import request from '@/utils/request'
import { loginReq } from '@/types/user'

export const loginAPI = (data: loginReq) =>
  request({
    url: 'login',
    method: 'POST',
    data
  })
