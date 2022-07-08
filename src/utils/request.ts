import axios from 'axios'
const timeout = 8000
const service = axios.create({
  url: 'http://liufusong.top:8899/api/private/v1/',
  timeout
})
export default service
