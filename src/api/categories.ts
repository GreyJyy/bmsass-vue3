import request from '@/utils/request'
import {
  categoriesReq,
  attributesReq,
  addReq,
  deleteReq,
  editReq,
  addCategoriesReq
} from '@/types/categories'

export const getCategoriesAPI = (params?: categoriesReq) =>
  request({
    url: 'categories',
    params
  })

export const getAttributesAPI = (params: attributesReq) =>
  request({
    url: `categories/${params.id}/attributes`,
    params: {
      sel: params.sel
    }
  })

export const addAttributesAPI = (data: addReq) =>
  request({
    url: `categories/${data.id}/attributes`,
    method: 'POST',
    data
  })

export const deleteAttributesAPI = (data: deleteReq) =>
  request({
    url: `categories/${data.id}/attributes/${data.attrid}`,
    method: 'DELETE'
  })

export const editAttributesAPI = (data: editReq) =>
  request({
    url: `categories/${data.id}/attributes/${data.attrid}`,
    method: 'PUT',
    data: {
      attr_name: data.attr_name,
      attr_sel: data.attr_sel,
      attr_vals: data.attr_vals
    }
  })

export const addCategoriesAPI = (data: addCategoriesReq) =>
  request({
    url: 'categories',
    method: 'POST',
    data
  })
