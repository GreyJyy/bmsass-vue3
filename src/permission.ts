import Vrouter from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useStore from './store'
const router = Vrouter
const whiteList = ['/login', '/404']
router.beforeEach((to, _, next) => {
  const { user } = useStore()
  nProgress.start()
  if (user.token) {
    to.name === 'login' ? next('/') : next()
    return
  }
  whiteList.includes(to.path) ? next() : next('/login')
})
router.afterEach(() => nProgress.done())
