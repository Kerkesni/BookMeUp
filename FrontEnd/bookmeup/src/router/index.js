import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Library from '../views/Library.vue'
import Book from '../views/Book.vue'

Vue.use(VueRouter)


const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'default',
    }
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search,
    meta: {
      layout: 'default',
    }
  },
  {
    path: '/Library',
    name: 'Library',
    component: Library,
    meta: {
      layout: 'default',
    }
  },
  {
    path: '/Book/:id',
    name: 'Book',
    component: Book,
    meta: {
      layout: 'default',
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router