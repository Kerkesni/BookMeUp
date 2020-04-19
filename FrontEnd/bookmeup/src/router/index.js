import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Library from '../views/Library.vue'
import Book from '../views/Book.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'

import store from "../store/index"

Vue.use(VueRouter)

const loadTokenFromCookie = () => {
  const payload = Vue.$cookies.get("jwtPayload")
  if (payload !== null) {
    store.dispatch('updateUserData', payload)
    return true
  } else return false
}

const isLogged = () => store.getters.getLoggedIn || loadTokenFromCookie()

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'default',
      requiresAuth: true
    }
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search,
    meta: {
      layout: 'default',
      requiresAuth: true
    }
  },
  {
    path: '/Library',
    name: 'Library',
    component: Library,
    meta: {
      layout: 'default',
      requiresAuth: true
    }
  },
  {
    path: '/Book/:id',
    name: 'Book',
    component: Book,
    meta: {
      layout: 'default',
      requiresAuth: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'unauthenticated'
    }
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup,
    meta: {
      layout: 'unauthenticated'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLogged()) {
    next({
      name: 'Login',
      params: {
        nextUrl: to.fullPath
      },
    })
  } else if (to.matched.some((record) => record.meta.guest) && isLogged()) {
    next('/')
  } else next()
})

export default router