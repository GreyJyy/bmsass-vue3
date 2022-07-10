import request from '@/utils/request'

export const getSideMenuAPI = () =>
  request({
    url: 'menus',
    method: 'GET'
  })
