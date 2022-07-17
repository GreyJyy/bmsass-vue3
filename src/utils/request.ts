import axios from 'axios'
import useStore from '@/store'
import jsonBig from 'json-bigint'
declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

const timeout = 8000
const service = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout
})

//handle the bigint
service.defaults.transformResponse = [
  function (data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return {}
    }
  }
]

//request interceptors
const tokenTimeout = 3600 * 1000 * 2 //for token timeout validate
let prevTime: number
service.interceptors.request.use(
  (config) => {
    const { user } = useStore()
    if (!user.token) prevTime = +new Date()
    if (config.headers && user.token) {
      config.headers['Authorization'] = `${user.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

//response interceptors
service.interceptors.response.use(
  (response) => {
    if (Date.now() - prevTime > tokenTimeout) {
      const { user } = useStore()
      user.token = ''
      return Promise.reject(new Error('token已过期'))
    }
    const { data, meta } = response.data
    if (meta.status === 200 || meta.status === 201) {
      return data
    }
    ElMessage.error(meta.msg)
    return Promise.reject(new Error(meta.msg))
  },
  (error) => {
    ElMessage.error(error)
    //i don't know the status code for token failure...
    if (error.msg === '无效token') {
      const { user } = useStore()
      user.token = ''
    }
    return Promise.reject(error)
  }
)

export default service
