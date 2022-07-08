import request from '@/utils/request'

const loginAPI = (data: any) =>
  request({
    url: 'login',
    method: 'POST',
    data
  })
