import request from '@/utils/request'
import { RoleItem, setRoleData, grantReq } from '@/types/roles'
import { roleInfo } from '@/types/roles'
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

export const deleteCertainRightAPI = (roleId: number, rightId: number) =>
  request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'DELETE'
  })

export const rolesGrantAPI = (data: grantReq) =>
  request({
    url: `roles/${data.roleId}/rights`,
    method: 'POST',
    data
  })

export const addNewRoleAPI = (data: roleInfo) =>
  request({
    url: 'roles',
    method: 'POST',
    data
  })

export const deleteRoleAPI = (id: number) =>
  request({
    url: `roles/${id}`,
    method: 'DELETE'
  })
