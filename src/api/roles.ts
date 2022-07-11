import request from '@/utils/request'
import { RoleItem, setRoleData } from '@/types/roles'
export const getRolesListAPI = () =>
  request({
    url: 'roles',
    method: 'GET'
  })

export const commitRoleChangeAPI = (data: RoleItem) =>
  request({
    url: `roles/${data.id}`,
    method: 'PUT',
    data
  })

export const setUserRoleAPI = (data: setRoleData) =>
  request({
    url: `users/${data.id}/role`,
    method: 'PUT',
    data
  })
