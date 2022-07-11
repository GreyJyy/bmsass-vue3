import request from '@/utils/request'
import { loginReq, userListReq, addInfoReq, editInfoReq } from '@/types/user'

export const loginAPI = (data: loginReq) =>
  request({
    url: 'login',
    method: 'POST',
    data
  })

export const getUserListAPI = (params: userListReq) =>
  request({
    url: 'users',
    method: 'GET',
    params
  })

export const addUserInfoAPI = (data: addInfoReq) =>
  request({
    url: 'users',
    method: 'POST',
    data
  })

export const changeUserStatusAPI = (uId: number, type: boolean) =>
  request({
    url: `users/${uId}/state/${type}`,
    method: 'PUT'
  })

export const editUserInfoAPI = (data: editInfoReq) =>
  request({
    url: `users/${data.id}`,
    method: 'PUT',
    data
  })

export const getUserByIdAPI = (id: string) =>
  request({
    url: `users/${id}`,
    method: 'GET'
  })

export const deleteUserAPI = (id: number) =>
  request({
    url: `users/${id}`,
    method: 'DELETE'
  })
