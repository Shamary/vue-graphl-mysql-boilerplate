// IMPORTS
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Menu from '../components/Menu'
import Admin from '../components/AdminPanel'

Vue.use(Router)

// ROUTES
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
    meta: {
      title: 'Menu'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Admin'
    }
  }
]
// EXPORT ROUTER
export default new Router({
  mode: 'history',
  routes
})
